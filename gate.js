/* A Student's Notebook — a small front-end gate.
   Added 2026-10-17 at Mike's request: a password modal with a 30-day
   cookie, purely as a bit of obscurity while privacy questions are
   being considered. This is NOT real access control — the password is
   right here in plain sight and view-source defeats the gate at once.
   To remove it: delete this file and its <script> tag from each page. */
(function () {
  "use strict";
  var COOKIE_NAME = "notebook_gate";
  var COOKIE_VALUE = "open";
  var DAYS = 30;
  var PASSWORD = "Koda";

  function hasPass() {
    return document.cookie.split(";").some(function (part) {
      return part.trim() === COOKIE_NAME + "=" + COOKIE_VALUE;
    });
  }
  if (hasPass()) return;

  var css = [
    "html.gated body { visibility: hidden; }",
    "#gate-overlay { visibility: visible; position: fixed; inset: 0; z-index: 9999;",
    "  background: #faf7f1; color: #23201c;",
    "  font-family: Georgia, 'Times New Roman', serif;",
    "  display: flex; align-items: center; justify-content: center; padding: 1.25rem; }",
    "#gate-card { max-width: 24rem; width: 100%; text-align: center; }",
    "#gate-card h1 { font-size: 1.65rem; font-weight: normal; margin: 0 0 0.5rem; }",
    "#gate-card p { color: #55504a; margin: 0.4rem 0 1.2rem; line-height: 1.6; }",
    "#gate-form { display: flex; gap: 0.5rem; justify-content: center; }",
    "#gate-password { font: inherit; font-size: 1rem; padding: 0.45rem 0.6rem;",
    "  border: 1px solid #ddd5c7; border-radius: 4px; background: #fff; width: 11rem; }",
    "#gate-form button { font: inherit; font-size: 1rem; padding: 0.45rem 1rem;",
    "  border: 1px solid #0b4f57; border-radius: 4px; background: #0b4f57; color: #faf7f1; cursor: pointer; }",
    "#gate-form button:hover { background: #0e6572; }",
    "#gate-error { color: #8c2f1b; min-height: 1.6em; margin-top: 0.6rem; }"
  ].join("\n");

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
  document.documentElement.classList.add("gated");

  function unlock() {
    var expires = new Date(Date.now() + DAYS * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = COOKIE_NAME + "=" + COOKIE_VALUE +
      "; expires=" + expires + "; path=/; SameSite=Lax";
    var overlay = document.getElementById("gate-overlay");
    if (overlay) overlay.parentNode.removeChild(overlay);
    document.documentElement.classList.remove("gated");
    if (style.parentNode) style.parentNode.removeChild(style);
  }

  function build() {
    var overlay = document.createElement("div");
    overlay.id = "gate-overlay";
    overlay.innerHTML =
      '<div id="gate-card">' +
      "<h1>A Student&rsquo;s Notebook</h1>" +
      "<p>This notebook is resting behind a small gate for a while.<br>" +
      "If you were given the password, come on in.</p>" +
      '<form id="gate-form">' +
      '<input id="gate-password" type="password" placeholder="Password" autocomplete="off" aria-label="Password">' +
      '<button type="submit">Enter</button>' +
      "</form>" +
      '<p id="gate-error" role="alert"></p>' +
      "</div>";
    document.body.appendChild(overlay);
    var input = document.getElementById("gate-password");
    input.focus();
    document.getElementById("gate-form").addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (input.value === PASSWORD) {
        unlock();
      } else {
        document.getElementById("gate-error").textContent = "That\u2019s not it \u2014 try again.";
        input.value = "";
        input.focus();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
