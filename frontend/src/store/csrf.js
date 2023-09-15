export const restoreSession = async () => {
  try {
    let res = await fetch("/api/session");
    if (!res.ok) {
      throw new Error("Network response was not ok " + res.statusText);
    }
    let token = res.headers.get("X-CSRF-Token");
    sessionStorage.setItem("X-CSRF-Token", token);
    let data = await res.json();
    sessionStorage.setItem("currentUser", JSON.stringify(data.user));
  } catch (error) {
    console.error("Error during session restoration:", error);
  }
};

export const csrfFetch = async (url, options = {}) => {
  try {
    options.method ||= "GET";
    options.headers ||= {};
    options.credentials = "include";  

    // will need to modify this when using formData to attach resources like photos
    // can't have a Content-Type header
    if (options.method.toUpperCase() !== "GET") {
      options.headers["Content-Type"] = "application/json";
      options.headers["X-CSRF-Token"] = sessionStorage.getItem("X-CSRF-Token");
    }

    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error("Network response was not ok " + res.statusText);
    }
    return res;
  } catch (error) {
    console.error("Error during fetch operation:", error);
    throw error;
  }
};

