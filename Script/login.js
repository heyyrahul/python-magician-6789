
let registerBtn = document.getElementById('register');
let loginBtn = document.getElementById('login');
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});
document.getElementById("mainlogo").addEventListener("click", () => {
    window.location.href = "/index.html";
})
loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

function openCustomAlert() {
    var customAlert = document.getElementById("customAlert");
    customAlert.style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
    const signInForm = document.querySelector(".form-container.sign-in form");

    async function signIn(email, password) {
        try {
            const response = await fetch("https://kushagrapathak-mock-api-server.onrender.com/users");
            const users = await response.json();

            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem("loggedInUser", user.email);
                openCustomAlert();
                setTimeout(() => {
                    window.location.href = "./index.html";
                }, 1000);
            } else {
                alert("Invalid email or password. Please try again.");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    signInForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const signInEmail = document.getElementById("signInEmail").value;
        const signInPassword = document.getElementById("signInPassword").value;

        if (signInEmail && signInPassword) {
            signIn(signInEmail, signInPassword);
        } else {
            alert("Please fill in all fields for sign in.");
        }
    });
});
