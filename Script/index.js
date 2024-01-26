let loginbtn = document.querySelector(".loginbtn");
        loginbtn.addEventListener("click", () => {
            window.location.href = "login.html";
        });


        document.addEventListener("DOMContentLoaded", async function () {
            try {
                const response = await fetch("https://kushagrapathak-mock-api-server.onrender.com/users");
                const users = await response.json();
                const loggedInUser = localStorage.getItem("loggedInUser");

                if (loggedInUser) {
                    const user = users.find(u => u.email === loggedInUser);
                    if (user) {
                        // Update the username in the navbar
                        const loginBtn = document.querySelector(".loginbtn");

                        if (loginBtn) {
                            loginBtn.innerHTML = `<i class="fas fa-user"></i> ${capitalizeFirstLetter(user.username)}`;
                            loginBtn.addEventListener("click", () => {
                                window.location.href = "./profile.html";
                            });
                        } else {
                            console.error("Login button not found.");
                        }
                    }
                }
            } catch (error) {
                console.error("Error checking login status:", error);
            }
        });

        function capitalizeFirstLetter(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Testimonial
var swiper = new Swiper('.mySwiper', {
    loop: true,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 80,
        modifier: 1,
        slideShadows: false,
    },
    pagination: {
        el: ".swiper-pagination",
    },   
});

//steps
const steps = document.querySelectorAll('.step');
    let currentStep = 1;

    function setActiveStep(stepNumber) {
        steps.forEach(s => s.classList.remove('active'));
        steps[stepNumber - 1].classList.add('active');
    }

    function autoChangeStep() {
        setActiveStep(currentStep);
        currentStep = (currentStep % steps.length) + 1;
    }
    setInterval(autoChangeStep, 3000);

    const serviceItems = document.querySelectorAll('.service > div');
    let currentServiceItem = 0;

    function showNextServiceItem() {
        serviceItems[currentServiceItem].classList.remove('active');
        currentServiceItem = (currentServiceItem + 1) % serviceItems.length;
        serviceItems[currentServiceItem].classList.add('active');
    }
    setInterval(showNextServiceItem, 3000);

    document.addEventListener('DOMContentLoaded', function () {
        const hamburgerBtn = document.querySelector('.hamburger-btn');
        const menuItems = document.querySelector('.menues');

        hamburgerBtn.addEventListener('click', function () {
            menuItems.style.display = menuItems.style.display === 'flex' ? 'none' : 'flex';
        });
    });
   
    
document.getElementById("mainlogo").addEventListener("click", () => {
    window.location.href = "./index.html";
})
