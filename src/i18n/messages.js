// src/i18n/messages.js
// Diccionarios i18n. La UI debe consumir solo claves (keys) y traducir con t().

export const messages = {
  es: {
    brand: {
      name: "ClassSync",
      subtitle: "Sincronización de clase en tiempo real",
    },

    common: {
      tapToSelect: "Toca para seleccionar",
    },

    status: {
      idle: "Estado: listo.",
      loading: "Procesando…",
      errorPrefix: "Error: ",
      session: "Sesión",
      code: "Código",
      open: "ABIERTA",
      closed: "CERRADA",
      copyCodeAria: "Copiar código",
      codeCopied: "Código copiado",
    },

    role: {
      title: "Selecciona tu perfil",
      teacher: "Docente",
      teacherDesc:
        "Crea y cierra sesiones, gestiona asistencia y participación.",
      student: "Estudiante",
      studentDesc:
        "Registra asistencia y responde participación en tiempo real.",
      changeProfile: "Cambiar perfil",
      teacherShort: "T",
      studentShort: "S",
    },

    teacher: {
      title: "Panel Docente",
      openSession: "Abrir sesión",
      closeSession: "Cerrar sesión",
      creating: "Creando sesión…",
      closing: "Cerrando sesión…",
      createdOk: "Sesión creada ✅",
      closedOk: "Sesión cerrada ✅",
    },

    student: {
      title: "Panel Estudiante",
      intro: "Ingresa el código para unirte a la sesión.",
      codeLabel: "Código de sesión",
      codePlaceholder: "Ejemplo: 170325",
      join: "Unirme",
      joining: "Uniéndome…",
      connectedAs: "Conectado a la sesión: {code}",
      notConnected: "Aún no estás conectado a una sesión.",
    },

    theme: { toggleAria: "Cambiar tema" },
    lang: { toggleAria: "Cambiar idioma", es: "ES", en: "EN" },

    activity: {
      title: "📋 Historial de acciones",
      empty: "Sin eventos aún.",
      clearBtn: "Limpiar historial",
      clearConfirm: "¿Estás seguro? Haz clic de nuevo para confirmar",
      justNow: "justo ahora",
      minutesAgo: "hace {n} min",
      hoursAgo: "hace {n} h",
      events: {
        role_selected: "Seleccionó perfil",
        language_changed: "Cambió idioma",
        theme_changed: "Cambió tema",
        session_opened: "Abrió sesión",
        session_closed: "Cerró sesión",
        code_copied: "Copió código",
        profile_changed: "Volvió a home",
      },
    },

    errors: {
      tempCreateSession: "Error temporal creando la sesión. Intenta de nuevo.",
      tempCloseSession: "Error temporal cerrando la sesión. Intenta de nuevo.",
      copyFailed: "No se pudo copiar. Copia manualmente.",
      unknown: "Ocurrió un error inesperado.",
      invalidCode: "Código inválido. Verifica e intenta de nuevo.",
    },
  },

  en: {
    brand: {
      name: "ClassSync",
      subtitle: "Real-time classroom synchronization",
    },

    common: {
      tapToSelect: "Tap to select",
    },

    status: {
      idle: "Status: ready.",
      loading: "Processing…",
      errorPrefix: "Error: ",
      session: "Session",
      code: "Code",
      open: "OPEN",
      closed: "CLOSED",
      copyCodeAria: "Copy code",
      codeCopied: "Code copied",
    },

    role: {
      title: "Choose your profile",
      teacher: "Teacher",
      teacherDesc:
        "Create and close sessions, manage attendance and participation.",
      student: "Student",
      studentDesc: "Check in attendance and answer participation in real time.",
      changeProfile: "Switch profile",
      teacherShort: "T",
      studentShort: "S",
    },

    teacher: {
      title: "Teacher Panel",
      openSession: "Open session",
      closeSession: "Close session",
      creating: "Creating session…",
      closing: "Closing session…",
      createdOk: "Session created ✅",
      closedOk: "Session closed ✅",
    },

    student: {
      title: "Student Panel",
      intro: "Enter the code to join the session.",
      codeLabel: "Session code",
      codePlaceholder: "Example: 170325",
      join: "Join",
      joining: "Joining…",
      connectedAs: "Connected to session: {code}",
      notConnected: "You are not connected to a session yet.",
    },

    theme: { toggleAria: "Toggle theme" },
    lang: { toggleAria: "Toggle language", es: "ES", en: "EN" },

    activity: {
      title: "📋 Activity log",
      empty: "No events yet.",
      clearBtn: "Clear history",
      clearConfirm: "Are you sure? Click again to confirm",
      justNow: "just now",
      minutesAgo: "{n}m ago",
      hoursAgo: "{n}h ago",
      events: {
        role_selected: "Selected profile",
        language_changed: "Changed language",
        theme_changed: "Changed theme",
        session_opened: "Opened session",
        session_closed: "Closed session",
        code_copied: "Copied code",
        profile_changed: "Returned to home",
      },
    },

    errors: {
      tempCreateSession:
        "Temporary error creating the session. Please try again.",
      tempCloseSession:
        "Temporary error closing the session. Please try again.",
      copyFailed: "Couldn't copy. Please copy manually.",
      unknown: "An unexpected error occurred.",
      invalidCode: "Invalid code. Please check and try again.",
    },
  },
};
