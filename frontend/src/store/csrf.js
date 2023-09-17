let csrfToken = null;


async function fetchCsrfToken() {
  let csrfToken = sessionStorage.getItem("X-CSRF-Token");
  if (!csrfToken) {
    try {
      const response = await fetch("http://localhost:5000/api/csrf", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      csrfToken = data.csrf_token;
      sessionStorage.setItem("X-CSRF-Token", csrfToken);
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
    }
  }
  return csrfToken;
}





async function csrfFetch(url, options = {}) {
  const csrfToken = await fetchCsrfToken();

  options.method = options.method || "GET";
  options.credentials = "include";
  options.headers = {
    ...options.headers,
    "Content-Type": "application/json",
    "X-CSRF-Token": csrfToken,
  };

  const response = await fetch(url, options);

  // if (response.status >= 400) {
  //     const errorData = await response.json();
  //     console.error("Complete error response:", errorData);

  //     // throw new Error(
  //     //   `Error from server: ${
  //     //     errorData.message || errorData.errors.join(", ") || "Unknown error"
  //     //   }`
  //     // );

  //     throw new Error(
  //       `Error from server: ${
  //         errorData.message ||
  //         (Array.isArray(errorData.errors)
  //           ? errorData.errors.join(", ")
  //           : errorData.errors) ||
  //         "Unknown error"
  //       }`
  //     );
  //   }

  //   return response;
  // }

  if (response.status >= 400) {
    let errorData;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      errorData = await response.json();
    } else {
      errorData = { message: await response.text() };
    }

    console.error("Complete error response:", errorData);

    throw new Error(
      `Error from server: ${
        errorData.message ||
        (Array.isArray(errorData.errors)
          ? errorData.errors.join(", ")
          : errorData.errors) ||
        "Unknown error"
      }`
    );
  }

  return response;
}




export default csrfFetch;
