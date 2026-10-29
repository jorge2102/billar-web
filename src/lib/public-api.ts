// Cliente liviano para los endpoints públicos (sin login) del backend de Billar. Nada de esto
// requiere autenticación: son los mismos endpoints que consume la página pública de reservas.
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5159";

export type PublicTable = {
  id: string;
  name: string;
  description: string | null;
  isOccupiedNow: boolean;
  occupiedUntil: string | null;
};

export type BookingSlot = {
  startTime: string;
  endTime: string;
  status: string;
};

export type DocumentTypeOption = {
  id: string;
  name: string;
};

export type PublicSettings = {
  pricePerHourAmount: number;
  pricePerHourCurrencyCode: string;
};

export type ClientLookupResult = {
  found: boolean;
  clientId: string | null;
  name: string | null;
  phone: string | null;
  email: string | null;
};

export type CreateReservationPayload = {
  poolTableId: string;
  startTime: string;
  endTime: string;
  documentTypeId: string;
  documentNumber: string;
  name: string;
  phone?: string;
  email?: string;
};

export type CreateReservationResult = {
  bookingId: string;
  poolTableId: string;
  poolTableName: string;
  startTime: string;
  endTime: string;
  chargedAmount: number;
  currencyCode: string;
  clientId: string;
};

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Error ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const publicApi = {
  tables: () => getJson<PublicTable[]>("/api/public/tables"),
  slots: (tableId: string, date: string) =>
    getJson<BookingSlot[]>(`/api/public/tables/${tableId}/slots?date=${date}`),
  documentTypes: () => getJson<DocumentTypeOption[]>("/api/public/document-types"),
  settings: () => getJson<PublicSettings>("/api/public/settings"),
  lookupClient: (documentTypeId: string, documentNumber: string) => {
    const params = new URLSearchParams({ documentTypeId, documentNumber });
    return getJson<ClientLookupResult>(`/api/public/clients/lookup?${params.toString()}`);
  },
  createReservation: async (payload: CreateReservationPayload): Promise<CreateReservationResult> => {
    const res = await fetch(`${API_URL}/api/public/reservations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(text || `Error ${res.status}`);
    }
    return res.json() as Promise<CreateReservationResult>;
  },
};

/** Arma un datetime "naive" (sin zona horaria) a partir de una fecha (YYYY-MM-DD) y una hora
 * (HH:mm), sumando horas si hace falta. Importante: NO usar `.toISOString()` acá — eso fuerza UTC
 * y desfasaría la hora real según la zona horaria del navegador. El backend guarda y compara las
 * horas tal cual, en hora local del negocio, así que el string que mandamos debe ser igual de
 * "ingenuo" (sin "Z" ni offset). */
export function toLocalDateTimeString(dateISO: string, hour: string, addHours = 0): string {
  const [h, m] = hour.split(":").map(Number);
  const d = new Date(`${dateISO}T00:00:00`);
  d.setHours(h + addHours, m, 0, 0);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
}

export function todayLocalDate(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
