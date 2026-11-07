/**
 * Açelya — oturum ve kullanıcılar
 */
(function () {
  "use strict";

  const USERS = {
    acelya: "ilovemyfather",
    serkan: "ilovemydaughter",
  };

  const USER_KEY = "acelya-user";
  const LOGIN_KEY = "loggedIn";

  function normalize(name) {
    return String(name || "").trim().toLowerCase();
  }

  function verify(username, password) {
    const u = normalize(username);
    return USERS[u] && USERS[u] === password;
  }

  function setSession(username, remember) {
    const u = normalize(username);
    sessionStorage.setItem(USER_KEY, u);
    sessionStorage.setItem(LOGIN_KEY, "true");
    if (remember) {
      localStorage.setItem(USER_KEY, u);
      localStorage.setItem(LOGIN_KEY, "true");
    }
  }

  function clearSession() {
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(LOGIN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(LOGIN_KEY);
  }

  function getCurrentUser() {
    return sessionStorage.getItem(USER_KEY) || localStorage.getItem(USER_KEY) || null;
  }

  function isLoggedIn() {
    return (
      sessionStorage.getItem(LOGIN_KEY) === "true" ||
      localStorage.getItem(LOGIN_KEY) === "true"
    );
  }

  window.AcelyaAuth = {
    USERS,
    PLAYER_NAMES: Object.keys(USERS),
    normalize,
    verify,
    setSession,
    clearSession,
    getCurrentUser,
    isLoggedIn,
  };
})();
