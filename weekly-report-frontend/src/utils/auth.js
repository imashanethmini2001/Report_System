export const saveAuth = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.role);
  localStorage.setItem("name", data.name);
  localStorage.setItem("email", data.email);
};

export const logout = () => {
  localStorage.clear();
  window.location.href = "/login";
};

export const getRole = () => {
  return localStorage.getItem("role");
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getName = () => {
  return localStorage.getItem("name") || "User";
};