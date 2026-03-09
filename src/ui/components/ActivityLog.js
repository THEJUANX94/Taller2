// src/ui/components/ActivityLog.js
// Componente que muestra el historial de acciones.
// Responsabilidades:
// - Renderizar lista de eventos recientes
// - Formatear timestamps de forma legible
// - Mostrar botón para limpiar historial
// - Traducción de tipos de eventos

import { getRecentActivityLogs, clearActivityLogs, getActivityLogCount } from "../../services/activity.service.js";
import { t } from "../../i18n/i18n.js";
import { triggerRender } from "../render.js";

export function createActivityLog() {
  const container = document.createElement("section");
  container.className = "activity-log";

  const header = document.createElement("div");
  header.className = "activity-log__header";

  const title = document.createElement("h3");
  title.className = "activity-log__title";
  title.textContent = t("activity.title");

  const count = document.createElement("span");
  count.className = "activity-log__count";
  count.textContent = getActivityLogCount();

  header.append(title, count);

  const list = document.createElement("div");
  list.className = "activity-log__list";

  const logs = getRecentActivityLogs(20);

  if (logs.length === 0) {
    const empty = document.createElement("p");
    empty.className = "activity-log__empty";
    empty.textContent = t("activity.empty");
    list.append(empty);
  } else {
    logs.forEach((event) => {
      const item = createActivityItem(event);
      list.append(item);
    });
  }

  const footer = document.createElement("div");
  footer.className = "activity-log__footer";

  const btnClear = document.createElement("button");
  btnClear.className = "btn btn--small btn--ghost";
  btnClear.type = "button";
  btnClear.textContent = t("activity.clearBtn");
  btnClear.dataset.intention = "idle"; // idle | confirm

  btnClear.addEventListener("click", () => {
    const intention = btnClear.dataset.intention || "idle";

    if (intention === "idle") {
      // Primer clic: cambiar a estado de confirmación
      btnClear.dataset.intention = "confirm";
      btnClear.textContent = t("activity.clearConfirm");
      btnClear.classList.add("activity-log__clear-confirm");

      // Revertir después de 3 segundos si no hay segundo clic
      setTimeout(() => {
        if (btnClear.dataset.intention === "confirm") {
          btnClear.dataset.intention = "idle";
          btnClear.textContent = t("activity.clearBtn");
          btnClear.classList.remove("activity-log__clear-confirm");
        }
      }, 3000);
    } else if (intention === "confirm") {
      // Segundo clic: ejecutar limpieza
      clearActivityLogs();
      btnClear.dataset.intention = "idle";
      btnClear.textContent = t("activity.clearBtn");
      btnClear.classList.remove("activity-log__clear-confirm");
      btnClear.disabled = true;
      
      // Re-renderizar para actualizar la lista vacía
      triggerRender();
    }
  });

  // Deshabilitar si no hay eventos
  if (logs.length === 0) {
    btnClear.disabled = true;
  }

  footer.append(btnClear);

  container.append(header, list, footer);
  return container;
}

/**
 * Crea un elemento individual del historial.
 */
function createActivityItem(event) {
  const item = document.createElement("div");
  item.className = "activity-log__item";
  item.dataset.type = event.type;

  // Timestamp formateado
  const time = document.createElement("span");
  time.className = "activity-log__time";
  time.textContent = formatTime(event.timestamp);
  time.title = new Date(event.timestamp).toLocaleString();

  // Tipo de evento traducido
  const typeLabel = document.createElement("span");
  typeLabel.className = "activity-log__event-type";
  const typeKey = `activity.events.${event.type}`;
  typeLabel.textContent = t(typeKey);

  // Detalles opcionales (si existen)
  let detail = null;
  if (event.details && Object.keys(event.details).length > 0) {
    detail = document.createElement("span");
    detail.className = "activity-log__detail";
    detail.textContent = formatDetails(event.details);
  }

  item.append(time, typeLabel);
  if (detail) item.append(detail);

  return item;
}

/**
 * Formatea el timestamp a un texto legible (ej: "hace 5 minutos", "10:30")
 */
function formatTime(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;

  // Menos de 1 minuto
  if (diff < 60000) {
    return t("activity.justNow");
  }

  // Menos de 1 hora
  if (diff < 3600000) {
    const mins = Math.floor(diff / 60000);
    return t("activity.minutesAgo", { n: mins });
  }

  // Menos de 24 horas
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000);
    return t("activity.hoursAgo", { n: hours });
  }

  // Más de 24 horas: mostrar fecha corta
  const date = new Date(timestamp);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Formatea los detalles del evento para mostrar en la UI.
 */
function formatDetails(details) {
  const parts = [];

  if (details.role) {
    parts.push(`role: ${t(`role.${details.role}`)}`);
  }

  if (details.language) {
    parts.push(`lang: ${details.language.toUpperCase()}`);
  }

  if (details.theme) {
    parts.push(`theme: ${details.theme}`);
  }

  if (details.code) {
    parts.push(`code: ${details.code}`);
  }

  return parts.length > 0 ? `(${parts.join(", ")})` : "";
}
