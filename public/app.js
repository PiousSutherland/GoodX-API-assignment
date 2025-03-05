const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const targetUrl = 'https://dev_interview.qagoodx.co.za/api/session';

document
  .getElementById("login-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    if (!username || !password) {
      errorMessage.textContent = "Please fill in both fields.";
      errorMessage.style.display = "block";
      return;
    }

    const loginData = {
      model: { timeout: 259200 },
      auth: [["password", { username, password }]],
    };

    try {
      const response = await fetch(proxyUrl + targetUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);

      if (data.session_uid) {
        document.cookie = `session_uid=${data.session_uid}; path=/; max-age=86400; Secure;`;
        window.location.href = "dashboard.html";
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      errorMessage.textContent = "Invalid login. Try again.";
      errorMessage.style.display = "block";
      console.error("Login failed:", error);
    }
  });
