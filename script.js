const authForm = document.getElementById("authForm");
const title = document.getElementById("title");
const toggleText = document.getElementById("toggleText");
const toggleLink = document.getElementById("toggleLink");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

let isLogin = false;

// Toggle between Register and Login
toggleLink.addEventListener("click", (e) => {
  e.preventDefault();
  isLogin = !isLogin;

  if (isLogin) {
    title.textContent = "Login";
    submitBtn.textContent = "Login";
    toggleText.innerHTML = `Don't have an account? <a href="#" id="toggleLink">Register here</a>`;
  } else {
    title.textContent = "Register";
    submitBtn.textContent = "Register";
    toggleText.innerHTML = `Already have an account? <a href="#" id="toggleLink">Login here</a>`;
  }
});

// Handle Form Submission
authForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === "" || password === "") {
    message.style.color = "red";
    message.textContent = "Please fill in all fields.";
    return;
  }

  if (isLogin) {
    loginUser(username, password);
  } else {
    registerUser(username, password);
  }
});

function registerUser(username, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userExists = users.some((user) => user.username === username);

  if (userExists) {
    message.style.color = "red";
    message.textContent = "Username already exists. Try another.";
    return;
  }

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));

  message.style.color = "green";
  message.textContent = "Registration successful. Please login now!";
  document.getElementById("authForm").reset();
}

function loginUser(username, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const validUser = users.find(
    (user) => user.username === username && user.password === password
  );

  if (validUser) {
    message.style.color = "green";
    message.textContent = "Login successful. Welcome, " + username + "!";
    document.getElementById("authForm").reset();
  } else {
    message.style.color = "red";
    message.textContent = "Invalid username or password.";
  }
}
