const admins = [
    { username: "heyyrahul", password: "Rahul@9870", name: "Rahul" },
    { username: "kushpathak", password: "Kush@4563", name: "Kushagra" },
    { username: "bansalnaman", password: "Bansal@6969", name: "Naman Bansal" },
    { username: "kadampranoti", password: "kadam@pranoti", name: "Pranoti Kadam" }
];

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (event) => handleLogin(event));
});

function handleLogin(event) {
    // event.preventDefault();

    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const loginMessage = document.getElementById('loginMessage');

    const matchedAdmin = admins.find(admin => admin.username === usernameInput && admin.password === passwordInput);

    if (matchedAdmin) {
        loginMessage.textContent = "Login successful!";
        loginMessage.style.color = "green";

        localStorage.setItem('loggedInAdmin', JSON.stringify(matchedAdmin));
        window.location.replace('admin.html');
        usernameInput = "";
        passwordInput = "";
        loginMessage = "";
    } else {
        loginMessage.textContent = "Invalid username or password. Please try again.";
        loginMessage.style.color = "red";
    }
}


let loginbtn = document.getElementById("loginbtn");

loginbtn.addEventListener("click", () => {

    window.location.href = "login.html";
});

document.getElementById("mainlogo").addEventListener("click", () => {
    window.location.href = "./index.html";
})