document.addEventListener("DOMContentLoaded", function () {
    const levelCards = document.querySelectorAll(".level-card");

    levelCards.forEach(function (card, index) {
        card.style.transition = "transform 0.25s ease, box-shadow 0.25s ease";
        card.style.transform = "translateY(12px)";
        card.style.opacity = "0";

        setTimeout(function () {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, 120 * index);

        card.addEventListener("click", function () {
            card.classList.toggle("active");
        });
    });

    const flowSteps = document.querySelectorAll(".flow-step");
    flowSteps.forEach(function (step) {
        step.addEventListener("click", function () {
            step.classList.toggle("selected");
        });
    });
});
