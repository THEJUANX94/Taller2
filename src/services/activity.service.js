// src/services/activity.service.js
// Servicio de Activity Log: registra eventos del usuario y del sistema.
// Responsabilidades:
// - Registrar eventos con timestamp y detalles
// - Persistir en localStorage
// - Recuperar eventos
// - Limpiar historial

const STORAGE_KEY = "activity_log";
const MAX_EVENTS = 100; // Limitar tamaño del historial

/**
 * Tipos de eventos disponibles (claves estables).
 */
export const ActivityEventType = {
  ROLE_SELECTED: "role_selected",
  LANGUAGE_CHANGED: "language_changed",
  THEME_CHANGED: "theme_changed",
  SESSION_OPENED: "session_opened",
  SESSION_CLOSED: "session_closed",
  CODE_COPIED: "code_copied",
  PROFILE_CHANGED: "profile_changed",
};

/**
 * Registra un evento en el Activity Log.
 * @param {string} eventType - Tipo de evento (usar ActivityEventType)
 * @param {object} details - Detalles opcionales (código, idioma, etc.)
 * @returns {object} El evento registrado
 */
export function logActivity(eventType, details = {}) {
  const event = {
    id: generateId(),
    type: eventType,
    timestamp: Date.now(),
    details: details || {},
  };

  const logs = getActivityLogs();
  logs.unshift(event); // Agregar al inicio (más reciente primero)

  // Limitar tamaño
  if (logs.length > MAX_EVENTS) {
    logs.splice(MAX_EVENTS);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  return event;
}

/**
 * Obtiene todos los eventos del Activity Log.
 * @returns {array} Array de eventos (ordenado: más reciente primero)
 */
export function getActivityLogs() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    console.warn("Error reading activity logs from localStorage");
    return [];
  }
}

/**
 * Obtiene los últimos N eventos.
 * @param {number} limit - Cantidad de eventos (default: 20)
 * @returns {array} Array de eventos
 */
export function getRecentActivityLogs(limit = 20) {
  return getActivityLogs().slice(0, limit);
}

/**
 * Limpia el historial completo.
 * @returns {boolean} true si la limpieza fue exitosa
 */
export function clearActivityLogs() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch {
    console.warn("Error clearing activity logs");
    return false;
  }
}

/**
 * Obtiene la cantidad total de eventos registrados.
 * @returns {number}
 */
export function getActivityLogCount() {
  return getActivityLogs().length;
}

/**
 * Genera un ID único para cada evento (timestamp + random).
 * @private
 */
function generateId() {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
