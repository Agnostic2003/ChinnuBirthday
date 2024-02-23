document.addEventListener("DOMContentLoaded", function () {
    // Load wishes from local storage on page load
    loadWishes("special-wishes-list");
});

function submitWish() {
    const nameInput = document.getElementById("name");
    const messageInput = document.getElementById("message");
    const imageInput = document.getElementById("image");
    const specialWishesList = document.getElementById("special-wishes-list");

    // Check if wishes are not blank
    if (nameInput.value.trim() === "" || messageInput.value.trim() === "") {
        alert("Please fill in both your name and birthday message.");
        return; // Stop the function if wishes are blank
    }

    // Create a new list item for the wish
    const wishItem = document.createElement("li");
    wishItem.innerHTML = `<strong>${nameInput.value}:</strong> ${messageInput.value}`;
    
    // Add image if provided
    if (imageInput.value.trim() !== "") {
        const image = document.createElement("img");
        image.src = imageInput.value;
        wishItem.appendChild(image);
    }

    // Add delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", function () {
        deleteWish(wishItem, specialWishesList);
    });
    wishItem.appendChild(deleteButton);

    // Add the wish to the special wishes list
    specialWishesList.appendChild(wishItem);

    // Save wishes to local storage
    saveWishes("special-wishes-list");

    // Clear the form inputs
    nameInput.value = "";
    messageInput.value = "";
    imageInput.value = "";
}

// ... (rest of the code remains unchanged)


function loadWishes(listId) {
    const wishesList = document.getElementById(listId);
    const savedWishes = localStorage.getItem(listId);

    if (savedWishes) {
        wishesList.innerHTML = savedWishes;
        // Add delete buttons to loaded wishes
        const deleteButtons = wishesList.querySelectorAll("li button");
        deleteButtons.forEach((button) => {
            button.addEventListener("click", function () {
                deleteWish(button.parentElement, wishesList);
            });
        });
    }
}

function saveWishes(listId) {
    const wishesList = document.getElementById(listId);
    localStorage.setItem(listId, wishesList.innerHTML);
}

function deleteWish(wishItem, wishesList) {
    wishItem.parentElement.removeChild(wishItem);
    saveWishes("special-wishes-list");
}
