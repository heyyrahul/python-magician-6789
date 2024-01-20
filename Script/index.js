var swiper = new Swiper('.mySwiper', {
    loop: true,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    initialSlide: 4,
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 40,
        modifier: 2,
        slideShadows: false,
    },
    pagination: {
        el: ".swiper-pagination",
    },
});

let loginbtn = document.querySelector(".loginbtn");
loginbtn.addEventListener("click", () => {

    window.location.href = "login.html";
});

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

