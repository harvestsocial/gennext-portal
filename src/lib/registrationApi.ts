export interface RegistrationData {
    id: string;
    firstName: string;
    lastName: string;
    gender: string;
    title: string;
    church: string;
    city: string;
    country: string;
    phone: string;
    email: string;
    accessGranted: boolean;
    createdAt?: string;
}

export interface RegistrationFormInput {
    firstName: string;
    lastName: string;
    gender: string;
    title: string;
    church: string;
    city: string;
    country: string;
    phone: string;
    email: string;
}

const REG_API_URL = import.meta.env.VITE_REG_API_URL;

const assertApiConfigured = () => {
    if (!REG_API_URL) {
        throw new Error("Missing VITE_REG_API_URL. Add it to your .env file.");
    }
};

const normalizeGenderStrict = (value: string) => {
    const g = String(value || "").trim().toLowerCase();
    if (g === "male" || g === "m") return "Male";
    if (g === "female" || g === "f") return "Female";
    throw new Error("Gender must be Male or Female");
};

const parseResponse = async (res: Response) => {
    let payload: any = null;
    try {
        payload = await res.json();
    } catch (_error) {
        // no-op, handled below
    }

    if (!res.ok || !payload?.success) {
        const message = payload?.error || `API request failed with status ${res.status}`;
        throw new Error(message);
    }

    return payload;
};

export const createRegistration = async (data: RegistrationFormInput) => {
    assertApiConfigured();
    const payloadData = {
        ...data,
        gender: normalizeGenderStrict(data.gender),
    };

    const res = await fetch(REG_API_URL, {
        method: "POST",
        body: JSON.stringify({
            action: "create",
            data: payloadData,
        }),
    });

    const payload = await parseResponse(res);
    return payload.id as string;
};

export const getRegistrations = async () => {
    assertApiConfigured();
    const url = `${REG_API_URL}?action=list`;
    const res = await fetch(url, { method: "GET" });
    const payload = await parseResponse(res);
    return (payload.data || []) as RegistrationData[];
};

export const getRegistrationById = async (id: string) => {
    assertApiConfigured();
    const url = `${REG_API_URL}?action=get&id=${encodeURIComponent(id)}`;
    const res = await fetch(url, { method: "GET" });
    const payload = await parseResponse(res);
    return (payload.data || null) as RegistrationData | null;
};

export const setRegistrationAccess = async (id: string, accessGranted: boolean) => {
    assertApiConfigured();

    const res = await fetch(REG_API_URL, {
        method: "POST",
        body: JSON.stringify({
            action: "setAccess",
            id,
            accessGranted,
        }),
    });

    await parseResponse(res);
};
