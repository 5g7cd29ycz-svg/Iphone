/* Minimum JS: mobilní menu + odeslání formuláře (Formspree → záloha mailto) */
(function () {
  "use strict";

  /* ---------- mobilní menu ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("hlavni-menu");
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("open", open);
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* ---------- formulář ---------- */
  var form = document.getElementById("poptavka");
  if (!form) return;
  var status = form.querySelector(".form-status");
  var btn = form.querySelector('button[type="submit"]');
  var texts = {};
  try { texts = JSON.parse(document.getElementById("form-texts").textContent); } catch (e) {}

  var LABELS = {
    jmeno: "Jméno", telefon: "Telefon", email: "E-mail", obec: "Obec / adresa",
    typ_objektu: "Typ objektu", mam_sadu: "Má sadu", zprava: "Zpráva", souhlas_gdpr: "Souhlas GDPR"
  };

  function show(msg, cls) {
    status.textContent = msg;
    status.className = "form-status " + (cls || "");
  }

  function validate() {
    var firstBad = null;
    form.querySelectorAll("input, textarea").forEach(function (el) {
      if (el.type === "radio" || el.type === "hidden" || el.name === "_gotcha") return;
      var ok = el.checkValidity();
      el.setAttribute("aria-invalid", ok ? "false" : "true");
      if (!ok && !firstBad) firstBad = el;
    });
    if (firstBad) {
      var label = firstBad.type === "checkbox" ? "souhlas se zpracováním údajů" : (form.querySelector('label[for="' + firstBad.id + '"]') || {}).textContent;
      show("Zkontrolujte prosím pole: " + String(label || "").replace("*", "").trim() + ".", "err");
      firstBad.focus();
      return false;
    }
    return true;
  }

  function mailtoFallback(data) {
    var lines = [];
    Object.keys(LABELS).forEach(function (k) {
      var v = data.get(k);
      if (v) lines.push(LABELS[k] + ": " + v);
    });
    var href = "mailto:" + form.dataset.email +
      "?subject=" + encodeURIComponent(form.dataset.subject) +
      "&body=" + encodeURIComponent(lines.join("\n"));
    window.location.href = href;
  }

  form.addEventListener("input", function (e) {
    if (e.target.getAttribute("aria-invalid") === "true" && e.target.checkValidity()) {
      e.target.setAttribute("aria-invalid", "false");
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) return;
    var data = new FormData(form);
    if (data.get("_gotcha")) return; // spam

    var endpoint = form.dataset.endpoint;
    if (!endpoint) {
      show("Otevírám váš e-mail s vyplněnou zprávou – stačí ji odeslat.", "ok");
      mailtoFallback(data);
      return;
    }

    btn.disabled = true;
    show("Odesílám…");
    fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        form.reset();
        show(texts.ok || "Děkuji, odesláno.", "ok");
      })
      .catch(function () {
        show(texts.err || "Odeslání se nepovedlo.", "err");
        setTimeout(function () { mailtoFallback(data); }, 1200);
      })
      .then(function () { btn.disabled = false; });
  });
})();
