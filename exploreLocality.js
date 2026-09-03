document.addEventListener("DOMContentLoaded", function () {
    const searchBtn = document.getElementById("searchLocalityBtn");
    const villageInput = document.getElementById("villageInput");
    const districtInput = document.getElementById("districtInput");
    const stateInput = document.getElementById("stateInput");

    const localityName = document.getElementById("localityName");
    const localityLocation = document.getElementById("localityLocation");
    const populationValue = document.getElementById("populationValue");
    const governmentType = document.getElementById("governmentType");
    const districtValue = document.getElementById("districtValue");
    const blockValue = document.getElementById("blockValue");
    const representativeName = document.getElementById("representativeName");
    const representativePosition = document.getElementById("representativePosition");

    const fallbackData = {
        name: "Example Village",
        district: "Patiala",
        state: "Punjab",
        country: "India",
        population: "12,500",
        government: "Gram Panchayat",
        block: "Example Block",
        representative: "Representative Name",
        position: "Sarpanch / Local Head"
    };

    function updateLocality(data) {
        if (!data) return;

        localityName.textContent = "📍 " + (data.name || fallbackData.name);
        localityLocation.textContent = [
            data.district || fallbackData.district,
            data.state || fallbackData.state,
            data.country || fallbackData.country
        ].filter(Boolean).join(", ");

        populationValue.textContent = data.population || fallbackData.population;
        governmentType.textContent = data.government || fallbackData.government;
        districtValue.textContent = data.district || fallbackData.district;
        blockValue.textContent = data.block || fallbackData.block;
        representativeName.textContent = data.representative || fallbackData.representative;
        representativePosition.textContent = data.position || fallbackData.position;
    }

    async function fetchLocationData() {
        const village = (villageInput?.value || "").trim();
        const district = (districtInput?.value || "").trim();
        const state = (stateInput?.value || "").trim();

        const query = [village, district, state].filter(Boolean).join(", ");

        if (!query) {
            alert("Please enter a village, district, or state.");
            return;
        }

        const apiUrl = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(query)}`;

        try {
            const response = await fetch(apiUrl, {
                headers: {
                    "Accept-Language": "en"
                }
            });

            if (!response.ok) {
                throw new Error("Location lookup failed");
            }

            const results = await response.json();

            if (!results || results.length === 0) {
                updateLocality(fallbackData);
                alert("No location match found. Showing sample locality data.");
                return;
            }

            const place = results[0];
            const address = place.address || {};

            updateLocality({
                name: village || address.village || address.city || address.town || fallbackData.name,
                district: district || address.county || address.city_district || fallbackData.district,
                state: state || address.state || fallbackData.state,
                country: address.country || fallbackData.country,
                population: "12,500",
                government: address.city ? "Municipality" : "Gram Panchayat",
                block: district || "Example Block",
                representative: "Representative Name",
                position: "Sarpanch / Local Head"
            });
        } catch (error) {
            updateLocality(fallbackData);
            alert("Unable to fetch live data right now. Showing sample locality information.");
        }
    }

    searchBtn?.addEventListener("click", fetchLocationData);

    [villageInput, districtInput, stateInput].forEach((input) => {
        input?.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                fetchLocationData();
            }
        });
    });
});
