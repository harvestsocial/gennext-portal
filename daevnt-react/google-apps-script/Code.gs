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
  "Created At",
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

    return jsonResponse({ success: false, error: "Invalid action" });
  } catch (error) {
    return jsonResponse({ success: false, error: String(error) });
  }
}

function createRegistration(data) {
  const sheet = getSheet_();
  const gender = normalizeGenderStrict_(data.gender);
  const id = generateRegistrationId_(sheet);
  const row = [
    id,
    safe(data.firstName),
    safe(data.lastName),
    gender,
    safe(data.title),
    safe(data.church),
    safe(data.city),
    safe(data.country),
    safe(data.phone),
    safe(data.email),
    false,
    new Date().toISOString(),
  ];
  sheet.appendRow(row);
  rebuildAttendanceSheet_();
  return id;
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
