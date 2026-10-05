export function setToken(token) {
  document.cookie = `access_token=${token}; path=/; max-age=86400; SameSite=Strict`;
}

export function getToken() {
  const cookies = document.cookie.split("; ");

  const tokenCookie = cookies.find((cookie) =>
    cookie.startsWith("access_token="),
  );

  return tokenCookie?.split("=")[1];
}
