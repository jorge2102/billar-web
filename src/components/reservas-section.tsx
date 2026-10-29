"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { publicApi, todayLocalDate, toLocalDateTimeString } from "@/lib/public-api";

// Mismo intervalo que usa el panel de administración para refrescar el estado de las mesas.
const REFRESH_MS = 15_000;
const START_HOURS = [
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];
const DURATION_OPTIONS = [
  { value: "1", label: "1 Hora" },
  { value: "2", label: "2 Horas" },
  { value: "3", label: "3+ Horas" },
] as const;

function formatTime(iso: string) {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function getBadge(isSelected: boolean, isOccupied: boolean) {
  if (isSelected) {
    return { text: "Activa", className: "bg-primary text-on-primary font-extrabold" };
  }
  if (isOccupied) {
    return { text: "Ocupada", className: "bg-surface-bright text-on-surface-variant font-bold" };
  }
  return { text: "Libre", className: "bg-secondary-container text-on-secondary-container font-bold" };
}

export function ReservasSection() {
  const { data: tables, mutate: mutateTables } = useSWR("public-tables", () => publicApi.tables(), {
    refreshInterval: REFRESH_MS,
  });
  const { data: documentTypes } = useSWR("public-document-types", () => publicApi.documentTypes());
  const { data: settings } = useSWR("public-settings", () => publicApi.settings());

  const [rawSelectedTableId, setSelectedTableId] = useState<string | null>(null);
  // Mientras el usuario no haya tocado el plano, se asume la primera mesa activa que llegue.
  const selectedTableId = rawSelectedTableId ?? tables?.[0]?.id ?? null;

  const [date, setDate] = useState(todayLocalDate());
  const [startHour, setStartHour] = useState("20:00");
  const [duration, setDuration] = useState<"1" | "2" | "3">("1");

  const { data: slots, mutate: mutateSlots } = useSWR(
    selectedTableId ? ["public-slots", selectedTableId, date] : null,
    () => publicApi.slots(selectedTableId!, date),
    { refreshInterval: REFRESH_MS },
  );

  const [documentTypeId, setDocumentTypeId] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [lookupStatus, setLookupStatus] = useState<"idle" | "checking" | "found" | "not-found">("idle");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Búsqueda de cliente por documento exacto, con una pequeña pausa para no disparar una
  // consulta por cada tecla.
  useEffect(() => {
    const handle = setTimeout(async () => {
      if (!documentTypeId || documentNumber.trim().length < 3) {
        setLookupStatus("idle");
        return;
      }
      setLookupStatus("checking");
      try {
        const result = await publicApi.lookupClient(documentTypeId, documentNumber.trim());
        if (result.found) {
          setName(result.name ?? "");
          setPhone(result.phone ?? "");
          setEmail(result.email ?? "");
          setLookupStatus("found");
        } else {
          setLookupStatus("not-found");
        }
      } catch {
        setLookupStatus("idle");
      }
    }, 500);
    return () => clearTimeout(handle);
  }, [documentTypeId, documentNumber]);

  const selectedTable = useMemo(
    () => tables?.find((t) => t.id === selectedTableId) ?? null,
    [tables, selectedTableId],
  );

  const durationHours = parseInt(duration, 10);

  const isHourAvailable = useCallback(
    (hour: string) => {
      const [h, m] = hour.split(":").map(Number);
      const start = new Date(`${date}T00:00:00`);
      start.setHours(h, m, 0, 0);
      if (start.getTime() < Date.now() - 5 * 60_000) return false;

      const end = new Date(start);
      end.setHours(end.getHours() + durationHours);

      if (!slots) return true;
      return !slots.some((slot) => {
        const slotStart = new Date(slot.startTime);
        const slotEnd = new Date(slot.endTime);
        return start < slotEnd && slotStart < end;
      });
    },
    [date, durationHours, slots],
  );

  const totalCost = settings ? durationHours * settings.pricePerHourAmount : 0;
  const currencyCode = settings?.pricePerHourCurrencyCode ?? "";

  const canSubmit =
    !!selectedTableId &&
    !!documentTypeId &&
    documentNumber.trim().length > 0 &&
    name.trim().length > 0 &&
    isHourAvailable(startHour) &&
    !submitting;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!selectedTableId || !canSubmit) return;

    setSubmitting(true);
    setErrorMessage(null);
    try {
      const result = await publicApi.createReservation({
        poolTableId: selectedTableId,
        startTime: toLocalDateTimeString(date, startHour),
        endTime: toLocalDateTimeString(date, startHour, durationHours),
        documentTypeId,
        documentNumber: documentNumber.trim(),
        name: name.trim(),
        phone: phone.trim() || undefined,
        email: email.trim() || undefined,
      });
      setSubmitted(`${result.poolTableName} · ${formatTime(result.startTime)} hrs`);
      mutateTables();
      mutateSlots();
    } catch (err) {
      setErrorMessage(
        err instanceof Error && err.message
          ? err.message
          : "No se pudo completar la reserva. Intenta con otro horario.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="w-full bg-surface py-space-xl relative" id="reservas">
      <div className="max-w-[1320px] mx-auto px-gutter-mobile lg:px-margin">
        <div className="mb-space-xl">
          <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary block mb-space-xs">
            Sistema en Tiempo Real
          </span>
          <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg uppercase text-on-surface">
            Reserva de Mesa
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1">
            Selecciona tu mesa en el plano arquitectónico, verifica las franjas horarias y confirma tu
            sesión sin costo previo.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-6 flex flex-col gap-space-md">
            <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-xl">
              <div className="flex items-center justify-between mb-space-md flex-wrap gap-space-sm">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-[20px]">floor_lamp</span>
                  <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface">
                    Plano del Black Dog Billar Bar
                  </span>
                </div>
                <div className="flex items-center gap-space-md font-label-sm text-label-sm uppercase">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <span className="text-on-surface">Seleccionada</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                    <span className="text-on-surface-variant">Disponible</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-surface-bright" />
                    <span className="text-on-surface-variant">Ocupada</span>
                  </div>
                </div>
              </div>
              <div className="relative bg-surface-container-low rounded-lg p-space-md min-h-[380px] flex flex-col justify-between overflow-hidden">
                <div className="w-full bg-surface-container-high py-2.5 px-space-md rounded flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm uppercase mb-space-md">
                  <span className="flex items-center gap-space-xs text-primary font-bold">
                    <span className="material-symbols-outlined text-[17px]">local_bar</span>
                    BARRA PRINCIPAL &amp; TAPS (ZONA NORTE)
                  </span>
                  <span className="text-outline font-semibold">ACCESO NORTE</span>
                </div>
                <div className="grid grid-cols-2 gap-space-md my-auto">
                  {!tables ? (
                    <p className="col-span-2 text-center font-label-sm text-label-sm uppercase text-outline py-space-lg">
                      Cargando mesas…
                    </p>
                  ) : tables.length === 0 ? (
                    <p className="col-span-2 text-center font-label-sm text-label-sm uppercase text-outline py-space-lg">
                      No hay mesas disponibles por el momento.
                    </p>
                  ) : (
                    tables.map((table) => {
                      const isSelected = table.id === selectedTableId;
                      const badge = getBadge(isSelected, table.isOccupiedNow);
                      return (
                        <button
                          key={table.id}
                          className={`table-btn relative group p-space-sm rounded transition-all text-left shadow-md ${
                            isSelected
                              ? "bg-surface-container-high ring-2 ring-primary"
                              : "bg-surface-container-high hover:bg-surface-bright"
                          }`}
                          onClick={() => setSelectedTableId(table.id)}
                          type="button"
                        >
                          <div className="w-full h-24 rounded bg-surface-container-lowest p-2 flex flex-col justify-between shadow-inner">
                            <div className="w-full h-full bg-[#d8c3a5]/80 rounded-sm relative flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
                              <span className="text-[#241a14] font-label-sm text-label-sm font-bold tracking-widest uppercase">
                                {table.name}
                              </span>
                              <div className="absolute w-2 h-2 rounded-full bg-[#241a14] top-1 left-1" />
                              <div className="absolute w-2 h-2 rounded-full bg-[#241a14] top-1 right-1" />
                              <div className="absolute w-2 h-2 rounded-full bg-[#241a14] bottom-1 left-1" />
                              <div className="absolute w-2 h-2 rounded-full bg-[#241a14] bottom-1 right-1" />
                            </div>
                          </div>
                          <div className="mt-space-xs">
                            <span className="font-headline-sm text-[16px] text-on-surface block leading-tight">
                              {table.name}
                            </span>
                            <span
                              className={`font-label-sm text-label-sm uppercase ${
                                isSelected ? "text-primary font-bold" : "text-secondary"
                              }`}
                            >
                              {table.isOccupiedNow && table.occupiedUntil
                                ? `Ocupada hasta ${formatTime(table.occupiedUntil)}`
                                : (table.description ?? "Disponible")}
                            </span>
                          </div>
                          <div
                            className={`absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-label-sm uppercase ${badge.className}`}
                          >
                            {badge.text}
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
                <div className="w-full bg-surface-container-high py-2 px-space-md rounded flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm uppercase mt-space-md">
                  <span className="flex items-center gap-space-xs text-primary font-bold">
                    <span className="material-symbols-outlined text-[17px]">album</span>
                    CABINA DE VINILOS &amp; SONIDO CLÁSICO
                  </span>
                  <span className="text-outline font-semibold">ZONA SUR</span>
                </div>
              </div>
              <div className="mt-space-md p-space-md rounded bg-surface-container-high/60">
                <div className="flex items-center justify-between mb-space-xs gap-space-sm flex-wrap">
                  <span className="font-label-sm text-label-sm uppercase text-primary tracking-wider">
                    Horarios · {selectedTable ? selectedTable.name : "Mesa"}
                  </span>
                  <input
                    className="px-space-sm py-1 rounded bg-surface-container-low text-on-surface font-label-sm text-label-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
                    min={todayLocalDate()}
                    onChange={(event) => setDate(event.target.value)}
                    type="date"
                    value={date}
                  />
                </div>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 pt-space-xs">
                  {START_HOURS.map((hour) => {
                    const available = isHourAvailable(hour);
                    const isActive = hour === startHour;
                    return (
                      <button
                        key={hour}
                        type="button"
                        disabled={!available}
                        onClick={() => setStartHour(hour)}
                        className={
                          !available
                            ? "p-1 rounded text-center bg-surface-bright/50 text-outline font-label-sm text-[11px] line-through cursor-not-allowed"
                            : isActive
                              ? "p-1 rounded text-center bg-primary-container text-on-primary-container font-label-sm text-[11px] font-bold"
                              : "p-1 rounded text-center bg-surface-container text-secondary font-label-sm text-[11px]"
                        }
                      >
                        {hour}
                        <br />
                        <span className={available && !isActive ? "text-primary font-bold" : ""}>
                          {available ? "Libre" : "Ocupado"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-xl flex flex-col justify-between">
              <div className="border-b border-surface-container-high pb-space-sm mb-space-md flex items-center justify-between gap-space-sm flex-wrap">
                <div>
                  <span className="font-label-sm text-label-sm uppercase text-primary">
                    Paso 2 • Datos de la Reserva
                  </span>
                  <h3 className="font-headline-sm text-headline-sm uppercase text-on-surface">
                    Completa Tu Registro
                  </h3>
                </div>
                <div className="text-right">
                  <span className="font-label-sm text-label-sm text-secondary uppercase block">
                    Mesa en Proceso:
                  </span>
                  <span className="font-label-md text-label-md text-primary font-bold uppercase">
                    {selectedTable ? selectedTable.name : "—"}
                  </span>
                </div>
              </div>
              <form className="space-y-space-md" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  <div>
                    <label className="block font-label-sm text-label-sm uppercase text-secondary mb-1">
                      Fecha del Encuentro
                    </label>
                    <input
                      className="w-full px-space-sm py-2 rounded bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
                      min={todayLocalDate()}
                      onChange={(event) => setDate(event.target.value)}
                      required
                      type="date"
                      value={date}
                    />
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm uppercase text-secondary mb-1">
                      Hora de Comienzo
                    </label>
                    <select
                      className="w-full px-space-sm py-2 rounded bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
                      onChange={(event) => setStartHour(event.target.value)}
                      required
                      value={startHour}
                    >
                      {START_HOURS.map((hour) => (
                        <option key={hour} value={hour}>
                          {hour} hrs {isHourAvailable(hour) ? "(Disponible)" : "(Ocupado)"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm uppercase text-secondary mb-1.5">
                    Duración Estimada
                  </label>
                  <div className="grid grid-cols-3 gap-space-xs">
                    {DURATION_OPTIONS.map((option) => (
                      <label className="cursor-pointer" key={option.value}>
                        <input
                          checked={duration === option.value}
                          className="peer sr-only"
                          name="duration"
                          onChange={() => setDuration(option.value)}
                          type="radio"
                          value={option.value}
                        />
                        <div className="p-space-xs text-center rounded bg-surface-container-low peer-checked:bg-primary-container peer-checked:text-on-primary-container font-label-sm text-label-sm uppercase transition-colors text-on-surface-variant">
                          {option.label}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
                  <div>
                    <label className="block font-label-sm text-label-sm uppercase text-secondary mb-1">
                      Tipo Doc.
                    </label>
                    <select
                      className="w-full px-space-sm py-2 rounded bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
                      onChange={(event) => setDocumentTypeId(event.target.value)}
                      required
                      value={documentTypeId}
                    >
                      <option value="" disabled>
                        Selecciona
                      </option>
                      {documentTypes?.map((docType) => (
                        <option key={docType.id} value={docType.id}>
                          {docType.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-label-sm text-label-sm uppercase text-secondary mb-1">
                      Nº de Documento
                      {lookupStatus === "checking" && (
                        <span className="text-primary font-normal normal-case"> · buscando…</span>
                      )}
                      {lookupStatus === "found" && (
                        <span className="text-tertiary font-normal normal-case"> · cliente reconocido ✓</span>
                      )}
                    </label>
                    <input
                      className="w-full px-space-sm py-2 rounded bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
                      onChange={(event) => setDocumentNumber(event.target.value)}
                      placeholder="Ej: 72918234"
                      required
                      type="text"
                      value={documentNumber}
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm uppercase text-secondary mb-1">
                    Nombre y Apellidos
                  </label>
                  <input
                    className="w-full px-space-sm py-2 rounded bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Ej: Robert Plant"
                    required
                    type="text"
                    value={name}
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm uppercase text-secondary mb-1">
                    Celular{" "}
                    <span className="text-outline font-normal normal-case">
                      (Opcional para confirmación por WhatsApp)
                    </span>
                  </label>
                  <div className="flex gap-space-xs">
                    <span className="px-space-sm py-2 rounded bg-surface-container-high text-secondary font-label-sm text-label-sm flex items-center font-bold">
                      +56
                    </span>
                    <input
                      className="w-full px-space-sm py-2 rounded bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="9 8765 4321"
                      type="tel"
                      value={phone}
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm uppercase text-secondary mb-1">
                    Correo Electrónico{" "}
                    <span className="text-outline font-normal normal-case">(Opcional)</span>
                  </label>
                  <input
                    className="w-full px-space-sm py-2 rounded bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="huesped@blackdogbillarbar.com"
                    type="email"
                    value={email}
                  />
                  <div className="mt-2.5 p-space-sm rounded bg-surface-container-high/70 flex items-start gap-space-xs">
                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                      verified_user
                    </span>
                    <p className="font-body-sm text-[12px] text-on-surface-variant leading-tight">
                      <strong className="text-primary font-semibold">Promesa Cero Spam:</strong>{" "}
                      Tu dirección jamás será compartida ni utilizada con fines publicitarios invasivos.
                      Solo recibirás el código de confirmación de tu mesa y promociones si lo solicitas.
                    </p>
                  </div>
                </div>
                <div className="pt-space-sm">
                  <div className="p-space-sm rounded bg-surface-container flex items-center justify-between mb-space-sm gap-space-sm flex-wrap">
                    <div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase block">
                        Total Previsto
                      </span>
                      <span className="font-headline-sm text-headline-sm text-primary font-black">
                        {totalCost.toFixed(2)} {currencyCode}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-label-sm text-label-sm text-on-surface block">
                        Pago al culminar en el salón
                      </span>
                      <span className="font-label-sm text-label-sm text-outline">
                        Sin penalización por cancelación
                      </span>
                    </div>
                  </div>
                  {errorMessage && (
                    <div className="mb-space-sm p-space-sm rounded bg-error-container text-on-error-container font-body-sm text-[12px]">
                      {errorMessage}
                    </div>
                  )}
                  <button
                    className="w-full py-space-md bg-primary-container hover:bg-primary text-on-primary-container font-label-lg text-label-lg uppercase rounded shadow-lg transition-all flex items-center justify-center gap-space-xs disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary-container"
                    disabled={!canSubmit}
                    type="submit"
                  >
                    <span className="material-symbols-outlined text-[20px]">sports_score</span>
                    <span>{submitting ? "Reservando…" : "Confirmar Reserva de Mesa"}</span>
                  </button>
                </div>
              </form>
              {submitted ? (
                <div className="mt-space-md p-space-md rounded bg-secondary-container text-on-secondary-container shadow-xl">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[24px]">task_alt</span>
                    <span className="font-headline-sm text-headline-sm uppercase">
                      ¡Reserva Registrada en el Black Dog Billar Bar!
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm mt-1 leading-relaxed">
                    {submitted} — tu turno ha sido bloqueado en el sistema del club. Te esperamos en la
                    barra para darte la bienvenida y asignarte tu mesa. ¡Buen juego y buena música!
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
