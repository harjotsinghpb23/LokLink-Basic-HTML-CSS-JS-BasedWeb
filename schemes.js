document.addEventListener("DOMContentLoaded", function () {
    const searchBtn = document.querySelector(".scheme-search button");
    const schemeCards = document.querySelectorAll(".scheme-card");

    if (searchBtn) {
        searchBtn.addEventListener("click", function () {
            const searchInput = document.querySelector(".scheme-search input");
            const category = document.querySelector(".scheme-search select");
            const keyword = (searchInput?.value || "").trim().toLowerCase();
            const selected = (category?.value || "").toLowerCase();

            schemeCards.forEach(function (card) {
                const cardText = card.textContent.toLowerCase();
                const matchesKeyword = !keyword || cardText.includes(keyword);
                const matchesCategory = !selected || selected === "select category" || cardText.includes(selected);

                card.style.display = matchesKeyword && matchesCategory ? "block" : "none";
            });
        });
    }

    document.querySelectorAll(".details-btn").forEach(function (button) {
        button.addEventListener("click", function () {
            alert("Scheme details are available on the official government portal.");
        });
    });
});
