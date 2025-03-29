document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchbar");
    const dogBoxes = document.querySelectorAll(".item-box");

    searchInput.addEventListener("input", function () {
        const searchText = searchInput.value.toLowerCase();

        dogBoxes.forEach((box) => {
            const productName = box.querySelector("p").innerText.toLowerCase();

            if (productName.includes(searchText)) {
                box.style.display = "block";
            } else {
                box.style.display = "none";
            }
        });
    });
});
