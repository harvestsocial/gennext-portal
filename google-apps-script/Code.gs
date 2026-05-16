const SHEET_NAME = "registrations";
const ATTENDANCE_SHEET_NAME = "attendance_status";
const BOARD_PROGRESS_SHEET_NAME = "board_church_progress";
// Set this to your event end date/time in ISO format, e.g. "2026-03-12T17:30:00Z"
const EVENT_END_ISO = "2026-03-14T21:59:59Z";
const ID_PREFIX = "GN";
const ID_SUFFIX = "HRE";
// Example output: GN 001234567 HRE
const ID_DIGITS = 9;
const HEADERS = [
  "id",
  "First Name",
  "Last Name",
  "Gender",
  "Title",
  "Church",
  "City",
  "Country",
  "Phone",
  "Email",
  "Access Granted",
  "Payment Status",
  "Created At",
  "Confirm Token",
];
const ATTENDANCE_HEADERS = [
  "ID",
  "Name",
  "Church",
  "Canonical Church",
  "Board Church",
  "Board Members",
  "City",
  "Country",
  "Phone",
  "Email",
  "Access Granted",
  "Attendance Status",
  "Created At",
];
const BOARD_PROGRESS_HEADERS = [
  "Board Church",
  "Board Members",
  "Registered",
  "Attended",
  "Pending",
  "Attendance Progress %",
];
const TITLE_OPTIONS = [
  "Bishop",
  "Apostle",
  "Prophet",
  "Prophetess",
  "Overseer",
  "Snr Reverend",
  "Reverend",
  "Snr. Pastor",
  "Pastor",
  "Evangelist",
  "Minister",
  "Shephered",
  "Doctor",
  "Congregant",
];
const BOARD_CHURCHES = [
  {
    church: "Harvest House International Church",
    members: "Bishop Dr. Colin Nyathi and Bishop Dr. Sarah Nyathi",
  },
  {
    church: "Living In Victory International Church",
    members: "Apostle Bangira",
  },
  {
    church: "Glory Temple Ministries",
    members: "Reverend Ntobeko Mhlanga",
  },
  {
    church: "Oneness Pentecostal Church",
    members: "Bishop Elison Shava",
  },
  {
    church: "I Am Fellowship International",
    members: "Dr. Innocent Maja",
  },
  {
    church: "House of Prayer Generation International",
    members: "Bishop Joshua Nyava",
  },
  {
    church: "His Presence Ministries International",
    members: "Pastor Yasha Chiriseri",
  },
  {
    church: "Fellowship of the God Kind Church",
    members: "Reverend Hilton Moyo",
  },
];

function doGet(e) {
  try {
    const params = e.parameter || {};
    const action = params.action || "list";

    // Keep attendance tab statuses current on every read.
    rebuildAttendanceSheet_();

    if (action === "list") {
      return jsonResponse({ success: true, data: listRegistrations() });
    }

    if (action === "get") {
      const id = params.id;
      if (!id) return jsonResponse({ success: false, error: "Missing id" });
      const row = getRegistrationById(id);
      return jsonResponse({ success: true, data: row });
    }

    if (action === "boardProgress") {
      rebuildAttendanceSheet_();
      return jsonResponse({ success: true, data: listBoardProgress_() });
    }

    if (action === "setupSheets") {
      setupSheets_();
      return jsonResponse({ success: true, message: "Sheets initialized" });
    }

    if (action === "titleOptions") {
      return jsonResponse({ success: true, data: TITLE_OPTIONS });
    }

    if (action === "normalizeLegacyTitles") {
      const updated = normalizeLegacyCongregantTitles_();
      rebuildAttendanceSheet_();
      return jsonResponse({ success: true, updated: updated });
    }

    return jsonResponse({ success: false, error: "Invalid action" });
  } catch (error) {
    return jsonResponse({ success: false, error: String(error) });
  }
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData && e.postData.contents ? e.postData.contents : "{}");
    const action = body.action;

    if (action === "create") {
      const payload = body.data || {};
      const id = createRegistration(payload);
      return jsonResponse({ success: true, id });
    }

    if (action === "setAccess") {
      const id = body.id;
      const accessGranted = body.accessGranted === true;
      if (!id) return jsonResponse({ success: false, error: "Missing id" });
      setAccess(id, accessGranted);
      return jsonResponse({ success: true });
    }

    if (action === "archiveAndClear") {
      const result = archiveAndClearRegistrations_();
      return jsonResponse({ success: true, archived: result });
    }

    if (action === "createPending") {
      const payload = body.data || {};
      const result = createPendingRegistration_(payload);
      return jsonResponse({ success: true, id: result.id, token: result.token });
    }

    if (action === "confirmPayment") {
      const id = body.id;
      const token = body.token || "";
      if (!id) return jsonResponse({ success: false, error: "Missing id" });
      const registration = confirmPaymentById_(id, token);
      return jsonResponse({ success: true, data: registration });
    }

    return jsonResponse({ success: false, error: "Invalid action" });
  } catch (error) {
    return jsonResponse({ success: false, error: String(error) });
  }
}

function createRegistration(data) {
  const sheet = getSheet_();
  const gender = normalizeGenderStrict_(data.gender);
  const title = normalizeTitleStrict_(data.title);
  const id = generateRegistrationId_(sheet);
  const row = [
    id,
    safe(data.firstName),
    safe(data.lastName),
    gender,
    title,
    safe(data.church),
    safe(data.city),
    safe(data.country),
    safe(data.phone),
    safe(data.email),
    false,
    "confirmed",
    new Date().toISOString(),
  ];
  sheet.appendRow(row);
  rebuildAttendanceSheet_();
  return id;
}

function createPendingRegistration_(data) {
  const sheet = getSheet_();
  const gender = normalizeGenderStrict_(data.gender);
  const title = normalizeTitleStrict_(data.title);
  const id = generateRegistrationId_(sheet);
  const token = generateToken_();
  const row = [
    id,
    safe(data.firstName),
    safe(data.lastName),
    gender,
    title,
    safe(data.church),
    safe(data.city),
    safe(data.country),
    safe(data.phone),
    safe(data.email),
    false,
    "pending",
    new Date().toISOString(),
    token,
  ];
  sheet.appendRow(row);
  return { id: id, token: token };
}

function confirmPaymentById_(id, token) {
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) throw new Error("No registrations found");

  const headers = values[0].map(function (h) { return normalizeHeader_(h); });
  const idCol = getHeaderIndex_(headers, ["id"]);
  const paymentStatusCol = getHeaderIndex_(headers, ["paymentstatus", "payment_status"]);
  const confirmTokenCol = getHeaderIndex_(headers, ["confirmtoken", "confirm_token"]);

  if (idCol === -1 || paymentStatusCol === -1) throw new Error("Missing required columns");

  for (var r = 1; r < values.length; r++) {
    if (String(values[r][idCol]) === String(id)) {
      var currentStatus = String(values[r][paymentStatusCol] || "").toLowerCase();

      // Verify token when registration is still pending (skip check once already confirmed)
      if (currentStatus === "pending" && confirmTokenCol !== -1) {
        var storedToken = String(values[r][confirmTokenCol] || "");
        if (storedToken && storedToken !== String(token || "")) {
          throw new Error("Invalid confirmation token");
        }
      }

      if (currentStatus !== "confirmed") {
        sheet.getRange(r + 1, paymentStatusCol + 1).setValue("confirmed");
      }
      rebuildAttendanceSheet_();
      var registration = getRegistrationById(id);
      if (registration && currentStatus !== "confirmed") {
        sendReceiptEmail_(registration);
      }
      return registration;
    }
  }
  throw new Error("Registration not found");
}

function generateToken_() {
  var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  var token = "";
  for (var i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

function sendReceiptEmail_(registration) {
  var to = safe(registration.email);
  if (!to || to.indexOf("@") === -1) return;

  var fullName = [safe(registration.title), safe(registration.firstName), safe(registration.lastName)]
    .filter(function (p) { return p !== ""; }).join(" ");

  var subject = "GenNext 2026 — Payment Confirmed & Registration Receipt";

  var htmlBody =
    "<div style='font-family:sans-serif;max-width:560px;margin:0 auto;'>" +
    "<h2 style='color:#d4af37;'>Generation Next 2026</h2>" +
    "<p>Dear <strong>" + fullName + "</strong>,</p>" +
    "<p>Your payment of <strong>$10.00 USD</strong> has been confirmed and your registration is complete.</p>" +
    "<table style='border-collapse:collapse;width:100%;margin:16px 0;'>" +
    "<tr><td style='padding:6px 0;color:#6b7280;'>Registration ID</td><td style='padding:6px 0;font-weight:bold;'>" + safe(registration.id) + "</td></tr>" +
    "<tr><td style='padding:6px 0;color:#6b7280;'>Event</td><td style='padding:6px 0;'>Generation Next 5th Edition</td></tr>" +
    "<tr><td style='padding:6px 0;color:#6b7280;'>Date</td><td style='padding:6px 0;'>July 16–18, 2026</td></tr>" +
    "<tr><td style='padding:6px 0;color:#6b7280;'>Venue</td><td style='padding:6px 0;'>Celebration Centre, Borrowdale, Harare</td></tr>" +
    "<tr><td style='padding:6px 0;color:#6b7280;'>Church</td><td style='padding:6px 0;'>" + safe(registration.church) + "</td></tr>" +
    "</table>" +
    "<p>Please present your Registration ID or QR code at the entrance.</p>" +
    "<p style='color:#6b7280;font-size:13px;'>God bless you!<br/>GenNext Team</p>" +
    "</div>";

  MailApp.sendEmail({ to: to, subject: subject, htmlBody: htmlBody });
}

function listRegistrations() {
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return [];

  const headers = values[0].map(function (h) { return normalizeHeader_(h); });
  const firstNameIdx = getHeaderIndex_(headers, ["firstname", "first_name"]);
  const lastNameIdx = getHeaderIndex_(headers, ["lastname", "last_name"]);
  const genderIdx = getHeaderIndex_(headers, ["gender"]);
  const titleIdx = getHeaderIndex_(headers, ["title"]);
  const churchIdx = getHeaderIndex_(headers, ["church"]);
  const cityIdx = getHeaderIndex_(headers, ["city"]);
  const countryIdx = getHeaderIndex_(headers, ["country"]);
  const phoneIdx = getHeaderIndex_(headers, ["phone", "phonenumber"]);
  const emailIdx = getHeaderIndex_(headers, ["email", "emailaddress"]);
  const accessIdx = getHeaderIndex_(headers, ["accessgranted", "access"]);
  const paymentStatusIdx = getHeaderIndex_(headers, ["paymentstatus", "payment_status"]);
  const createdAtIdx = getHeaderIndex_(headers, ["createdat", "created_at"]);
  const idIdx = getHeaderIndex_(headers, ["id"]);

  const rows = values.slice(1)
    .filter(function (row) { return !isBlankRow_(row); })
    .map(function (row) {
      return {
      id: getByIndex_(row, idIdx),
      firstName: getByIndex_(row, firstNameIdx),
      lastName: getByIndex_(row, lastNameIdx),
      gender: getByIndex_(row, genderIdx),
      title: getByIndex_(row, titleIdx),
      church: getByIndex_(row, churchIdx),
      city: getByIndex_(row, cityIdx),
      country: getByIndex_(row, countryIdx),
      phone: getByIndex_(row, phoneIdx),
      email: getByIndex_(row, emailIdx),
      accessGranted: String(getByIndex_(row, accessIdx)).toLowerCase() === "true",
      paymentStatus: safe(getByIndex_(row, paymentStatusIdx)) || "confirmed",
      createdAt: getByIndex_(row, createdAtIdx),
      };
    });

  rows.sort(function (a, b) {
    const aTime = new Date(a.createdAt || 0).getTime();
    const bTime = new Date(b.createdAt || 0).getTime();
    return bTime - aTime;
  });

  return rows;
}

function getRegistrationById(id) {
  const all = listRegistrations();
  for (var i = 0; i < all.length; i++) {
    if (all[i].id === id) return all[i];
  }
  return null;
}

function setAccess(id, accessGranted) {
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return;
  const headers = values[0].map(function (h) { return normalizeHeader_(h); });
  const idCol = getHeaderIndex_(headers, ["id"]);
  const accessCol = getHeaderIndex_(headers, ["accessgranted", "access"]);
  if (idCol === -1 || accessCol === -1) throw new Error("Missing required columns");

  for (var r = 1; r < values.length; r++) {
    if (String(values[r][idCol]) === String(id)) {
      sheet.getRange(r + 1, accessCol + 1).setValue(accessGranted);
      rebuildAttendanceSheet_();
      return;
    }
  }
  throw new Error("Registration not found");
}

function generateRegistrationId_(sheet) {
  const values = sheet.getDataRange().getValues();
  const headers = values.length > 0 ? values[0].map(function (h) { return normalizeHeader_(h); }) : [];
  const idCol = getHeaderIndex_(headers, ["id"]);
  const existingIds = {};

  if (idCol !== -1) {
    for (var r = 1; r < values.length; r++) {
      existingIds[String(values[r][idCol] || "").trim()] = true;
    }
  }

  // Retry loop to avoid collisions.
  for (var i = 0; i < 2000; i++) {
    var raw = Math.floor(Math.random() * Math.pow(10, ID_DIGITS));
    var numberPart = String(raw).padStart(ID_DIGITS, "0");
    var candidate = ID_PREFIX + " " + numberPart + " " + ID_SUFFIX;
    if (!existingIds[candidate]) return candidate;
  }

  throw new Error("Could not generate a unique registration ID");
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  const values = sheet.getDataRange().getValues();
  if (values.length === 0) {
    sheet.appendRow(HEADERS);
  } else {
    const firstRow = values[0];
    if (firstRow.length !== HEADERS.length || firstRow.join("|") !== HEADERS.join("|")) {
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    }
  }
  return sheet;
}

function setupSheets_() {
  // Ensure all required tabs exist and are populated with headers/current data.
  getSheet_();
  rebuildAttendanceSheet_();
}

function normalizeLegacyCongregantTitles_() {
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return 0;

  const headers = values[0].map(function (h) { return normalizeHeader_(h); });
  const titleIdx = getHeaderIndex_(headers, ["title"]);
  if (titleIdx === -1) return 0;

  const titleValues = values.slice(1).map(function (row) {
    return [safe(getByIndex_(row, titleIdx))];
  });

  var updated = 0;
  for (var i = 0; i < titleValues.length; i++) {
    var normalizedTitle = normalizeExistingTitle_(titleValues[i][0]);
    if (normalizedTitle !== titleValues[i][0]) {
      titleValues[i][0] = normalizedTitle;
      updated += 1;
    }
  }

  if (updated > 0) {
    sheet.getRange(2, titleIdx + 1, titleValues.length, 1).setValues(titleValues);
  }

  return updated;
}

function getOrCreateAttendanceSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(ATTENDANCE_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(ATTENDANCE_SHEET_NAME);
  }
  return sheet;
}

function getOrCreateBoardProgressSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(BOARD_PROGRESS_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(BOARD_PROGRESS_SHEET_NAME);
  }
  return sheet;
}

function rebuildAttendanceSheet_() {
  const attendanceSheet = getOrCreateAttendanceSheet_();
  const registrations = listRegistrations();

  const rows = registrations.map(function (r) {
    const boardMatch = matchBoardChurch_(r.church);
    const fullName = [safe(r.title), safe(r.firstName), safe(r.lastName)]
      .filter(function (part) { return part !== ""; })
      .join(" ");

    return [
      safe(r.id),
      fullName,
      safe(r.church),
      canonicalizeChurch_(r.church),
      boardMatch ? boardMatch.church : "",
      boardMatch ? boardMatch.members : "",
      safe(r.city),
      safe(r.country),
      safe(r.phone),
      safe(r.email),
      r.accessGranted === true,
      attendanceStatusFor_(r.accessGranted),
      safe(r.createdAt),
    ];
  });

  attendanceSheet.clearContents();
  attendanceSheet.getRange(1, 1, 1, ATTENDANCE_HEADERS.length).setValues([ATTENDANCE_HEADERS]);
  if (rows.length > 0) {
    attendanceSheet.getRange(2, 1, rows.length, ATTENDANCE_HEADERS.length).setValues(rows);
  }

  rebuildBoardProgressSheet_(registrations);
}

function rebuildBoardProgressSheet_(registrations) {
  const boardSheet = getOrCreateBoardProgressSheet_();
  const stats = {};

  BOARD_CHURCHES.forEach(function (entry) {
    stats[entry.church] = {
      church: entry.church,
      members: entry.members,
      registered: 0,
      attended: 0,
    };
  });

  registrations.forEach(function (r) {
    const match = matchBoardChurch_(r.church);
    if (!match) return;
    const bucket = stats[match.church];
    bucket.registered += 1;
    if (r.accessGranted === true) bucket.attended += 1;
  });

  const rows = BOARD_CHURCHES.map(function (entry) {
    const row = stats[entry.church];
    const pending = Math.max(row.registered - row.attended, 0);
    const progress = row.registered > 0 ? Math.round((row.attended / row.registered) * 100) : 0;
    return [row.church, row.members, row.registered, row.attended, pending, progress];
  });

  boardSheet.clearContents();
  boardSheet.getRange(1, 1, 1, BOARD_PROGRESS_HEADERS.length).setValues([BOARD_PROGRESS_HEADERS]);
  boardSheet.getRange(2, 1, rows.length, BOARD_PROGRESS_HEADERS.length).setValues(rows);
}

function listBoardProgress_() {
  const sheet = getOrCreateBoardProgressSheet_();
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return [];
  return values.slice(1).map(function (r) {
    return {
      church: safe(r[0]),
      members: safe(r[1]),
      registered: Number(r[2] || 0),
      attended: Number(r[3] || 0),
      pending: Number(r[4] || 0),
      progress: Number(r[5] || 0),
    };
  });
}

function attendanceStatusFor_(accessGranted) {
  if (accessGranted === true) return "Attended";
  const eventEnded = new Date().getTime() >= new Date(EVENT_END_ISO).getTime();
  return eventEnded ? "Did Not Attend" : "Not Yet Arrived";
}

function safe(v) {
  return v == null ? "" : String(v).trim();
}

function canonicalizeChurch_(value) {
  const normalized = String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\b(hq|city\s*hub|hub|branch|main\s*branch|campus|assembly|center|centre|local|zone|district)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return normalized
    .replace(/\b(international|church|ministries|ministry|fellowship)\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function matchBoardChurch_(churchValue) {
  const source = canonicalizeChurch_(churchValue);
  if (!source) return null;

  for (var i = 0; i < BOARD_CHURCHES.length; i++) {
    var board = BOARD_CHURCHES[i];
    var target = canonicalizeChurch_(board.church);
    if (!target) continue;
    if (
      source === target ||
      source.indexOf(target) !== -1 ||
      target.indexOf(source) !== -1
    ) {
      return board;
    }
  }
  return null;
}

function normalizeGenderStrict_(value) {
  var g = String(value || "").trim().toLowerCase();
  if (g === "male" || g === "m") return "Male";
  if (g === "female" || g === "f") return "Female";
  throw new Error("Gender must be Male or Female");
}

function normalizeTitleStrict_(value) {
  var input = String(value || "").trim();
  for (var i = 0; i < TITLE_OPTIONS.length; i++) {
    if (input.toLowerCase() === TITLE_OPTIONS[i].toLowerCase()) {
      return TITLE_OPTIONS[i];
    }
  }
  throw new Error("Invalid title. Use one of the configured title options.");
}

function isLegacyCongregantTitle_(value) {
  var normalized = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\./g, "");
  return normalized === "mr" || normalized === "miss" || normalized === "ms" || normalized === "mrs";
}

function normalizeExistingTitle_(value) {
  var input = safe(value);
  if (!input) return input;

  if (isLegacyCongregantTitle_(input)) return "Congregant";

  var normalized = input
    .trim()
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/\s+/g, " ");

  if (normalized === "snr reverend" || normalized === "senior reverend") return "Snr Reverend";
  if (normalized === "dr" || normalized === "doctor") return "Doctor";

  for (var i = 0; i < TITLE_OPTIONS.length; i++) {
    if (normalized === TITLE_OPTIONS[i].toLowerCase().replace(/\./g, "")) {
      return TITLE_OPTIONS[i];
    }
  }

  return input;
}

function normalizeHeader_(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function getHeaderIndex_(normalizedHeaders, aliases) {
  for (var i = 0; i < aliases.length; i++) {
    var idx = normalizedHeaders.indexOf(aliases[i]);
    if (idx !== -1) return idx;
  }
  return -1;
}

function getByIndex_(row, idx) {
  if (idx < 0 || idx >= row.length) return "";
  return row[idx];
}

function isBlankRow_(row) {
  for (var i = 0; i < row.length; i++) {
    if (String(row[i] || "").trim() !== "") return false;
  }
  return true;
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function fixTitlesNow() {
  const updated = normalizeLegacyCongregantTitles_();
  rebuildAttendanceSheet_();
  return updated;
}

// Run this directly in the GAS editor to archive all registrations and clear the sheet.
function archiveAndClearNow() {
  const result = archiveAndClearRegistrations_();
  Logger.log("Archived " + result + " registrations to 'Pre-Registration Archive' sheet.");
}

function archiveAndClearRegistrations_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const source = getSheet_();
  const allValues = source.getDataRange().getValues();

  if (allValues.length <= 1) return 0;

  const archiveName = "Pre-Registration Archive";
  let archive = ss.getSheetByName(archiveName);
  if (!archive) {
    archive = ss.insertSheet(archiveName);
  } else {
    archive.clearContents();
  }

  archive.getRange(1, 1, allValues.length, allValues[0].length).setValues(allValues);

  // Clear registrations sheet — keep header row only.
  source.clearContents();
  source.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);

  rebuildAttendanceSheet_();

  return allValues.length - 1;
}
