
// let csrfToken = null;

// export async function fetchCsrfToken() {
//   csrfToken = sessionStorage.getItem("X-CSRF-Token");
//   if (!csrfToken) {
//     try {
//       const response = await fetch("http://localhost:5000/api/csrf", {
//         method: "GET",
//         credentials: "include",
//       });
//       const data = await response.json();
//       csrfToken = data.csrf_token;
//       sessionStorage.setItem("X-CSRF-Token", csrfToken);
//     } catch (error) {
//       console.error("Error fetching CSRF token:", error);
//     }
//   }
//   console.log("CSRF Token:", csrfToken);

//   return csrfToken;
// }

// export async function csrfFetch(url, options = {}) {
//   try {
//     const csrfToken = await fetchCsrfToken();

//     options.method = options.method || "GET";
//     options.credentials = "include";
//     options.headers = {
//       ...options.headers,
//       "Content-Type": "application/json",
//       "X-CSRF-Token": csrfToken,
//     };

//     const response = await fetch(url, options);

//     if (response.status >= 400) {
//       let errorData;
//       const contentType = response.headers.get("content-type");
//       if (contentType && contentType.includes("application/json")) {
//         errorData = await response.json();
//       } else {
//         errorData = { message: await response.text() };
//       }

//       console.error("Complete error response:", errorData);

//       const errorMessage = `Error from server: ${
//         errorData.message ||
//         (Array.isArray(errorData.errors)
//           ? errorData.errors.join(", ")
//           : errorData.errors) ||
//         "Unknown error"
//       }`;

//       throw new Error(errorMessage);
//     }

//     return response;
//   } catch (error) {
//     console.error("Error in csrfFetch:", error);
//     throw error;
//   }
// }



async function csrfFetch(url, options = {}) {
  options.method = options.method || "GET";
  options.headers = options.headers || {};

  if (options.method.toUpperCase() !== "GET") {
    options.headers["Content-Type"] =
      options.headers["Content-Type"] || "application/json";
    options.headers["X-CSRF-Token"] = sessionStorage.getItem("X-CSRF-Token");
  }
  const res = await fetch(url, options);
  if (res.status >= 400) throw res;
  return res;
}


// export function storeCSRFToken(response) {
//   const csrfToken = response.headers.get("X-CSRF-Token");
//   if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
// }

// export async function restoreCSRF() {
//   const response = await csrfFetch("/api/session");
//   storeCSRFToken(response);
//   return response;
// }

export default csrfFetch;
