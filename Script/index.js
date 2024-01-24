let loginbtn = document.querySelector(".loginbtn");
loginbtn.addEventListener("click", () => {
    window.location.href = "login.html";
});

// Check if the user is already logged in
document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("https://kushagrapathak-mock-api-server.onrender.com/users");
        const users = await response.json();
        const loggedInUser = localStorage.getItem("loggedInUser");

        if (loggedInUser) {
            const user = users.find(u => u.email === loggedInUser);
            if (user) {
                const loginBtn = document.querySelector(".loginbtn");
        
                loginBtn.style.boxShadow = "none !important";
                loginBtn.style.backgroundColor = "#7FC1B1 !important";
                loginBtn.style.border = "none !important";
        
                loginBtn.innerHTML = `<i class="fas fa-user"></i>  ${user.username}`;
                loginBtn.addEventListener("click", () => {
                    window.location.href = "./profile.html";
                });
            }
        }
        
        
        
    } catch (error) {
        console.error("Error checking login status:", error);
    }
});
