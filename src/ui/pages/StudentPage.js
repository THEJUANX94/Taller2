// src/ui/pages/StudentPage.js
// Panel del estudiante: captura el código de sesión y prepara el flujo para unirse (futuro async).

import { state, setUI, setState, resetApp } from "../../state/state.js";
import { triggerRender } from "../render.js";
import { t } from "../../i18n/i18n.js";
import { joinSession } from "../../services/session.service.js";

export function createStudentPage() {
  const container = document.createElement("main");
  container.className = "card";

  const title = document.createElement("div");
  title.className = "card__title";
  title.textContent = t("student.title");

  const intro = document.createElement("p");
  intro.textContent = t("student.intro");

  const info = document.createElement("div");
  info.className = "student-info";
  info.textContent = getStudentInfoText();

  const field = document.createElement("div");
  field.className = "field";

  const label = document.createElement("label");
  label.className = "field__label";
  label.textContent = t("student.codeLabel");

  const input = document.createElement("input");
  input.className = "input";
  input.type = "text";
  input.inputMode = "numeric";
  input.autocomplete = "one-time-code";
  input.placeholder = t("student.codePlaceholder");
  input.maxLength = 10;
  input.value = state.ui?.studentCodeDraft || "";

  input.addEventListener("input", (e) => {
    const rawVal = e.target.value ?? "";
    const hasNonNumbers = /\D/.test(rawVal);
    let sanitized = String(rawVal).replace(/\D/g, "");
    sanitized = sanitized.substring(0, 10);
    e.target.value = sanitized;

    const previousErrorKey = state.ui?.errorKey;
    setUI({ studentCodeDraft: sanitized });

    let newErrorKey = "";

    if (hasNonNumbers) {
      newErrorKey = "errors.onlyNumbers";
    } else if (sanitized.length > 0 && sanitized.length < 6) {
      newErrorKey = "errors.shortCode";
    }

    // Only update and re-render if the error state actually changed
    // OR if we need to clear an existing error.
    if (newErrorKey !== previousErrorKey) {
        setUI({
            errorKey: newErrorKey,
            errorParams: null
        });
        triggerRender();
        
        // After re-rendering, we need to restore focus to the input
        // since the whole page gets re-created.
        setTimeout(() => {
            const el = document.querySelector(".input");
            if (el) {
                el.focus();
                // move cursor to the end
                el.setSelectionRange(el.value.length, el.value.length);
            }
        }, 0);
    }
  });

  field.append(label, input);

  const btnJoin = document.createElement("button");
  btnJoin.className = "btn btn--primary";
  btnJoin.type = "button";
  btnJoin.textContent = t("student.join");
  btnJoin.disabled = state.ui?.isLoading || false;

  btnJoin.addEventListener("click", async () => {
    const draft = String(state.ui?.studentCodeDraft || "");
    const code = normalizeCode(draft);

    if (code.length === 0) {
        setUI({
            errorKey: "errors.emptyCode",
            errorParams: null,
            messageKey: "",
            messageParams: null,
        });
        triggerRender();
        return;
    }

    if (!isValidCode(code)) {
      setUI({
        errorKey: "errors.invalidCode",
        errorParams: null,
        messageKey: "",
        messageParams: null,
      });
      triggerRender();
      return;
    }

    // Flujo Async con loading
    setUI({
      isLoading: true,
      messageKey: "student.joining",
      errorKey: "",
    });
    triggerRender();

    try {
      const sessionData = await joinSession(code);
      // Éxito: Guardamos la sesión en el estado global y mostramos mensaje temporal
      setState({ session: sessionData });
      setUI({
        messageKey: "student.joinedOk",
        errorKey: "",
      });
    } catch (err) {
      // Error
      const key = err?.code || "errors.unknown";
      setUI({
        errorKey: key,
        messageKey: "",
      });
    } finally {
      // Ya no estamos cargando
      setUI({ isLoading: false });
      triggerRender();
    }
  });

  const btnBack = document.createElement("button");
  btnBack.className = "btn btn--ghost";
  btnBack.type = "button";
  btnBack.textContent = t("role.changeProfile");

  btnBack.addEventListener("click", () => {
    resetApp();
    setUI({ studentCodeDraft: "" });
    triggerRender();
  });

  container.append(title, intro, info, field, btnJoin, btnBack);
  return container;
}

function getStudentInfoText() {
  if (state.session?.code && state.session?.status === "open") {
    return t("student.connectedAs", { code: state.session.code });
  }
  return t("student.notConnected");
}

function normalizeCode(value) {
  // Mantenerlo simple para estudiantes: elimina espacios y deja solo dígitos.
  return String(value).trim().replace(/\s+/g, "").replace(/[^\d]/g, "");
}

function isValidCode(code) {
  // Validación mínima y didáctica: entre 6 y 10 dígitos.
  return typeof code === "string" && code.length >= 6 && code.length <= 10;
}
