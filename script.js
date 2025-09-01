// ✅ Get all important elements from the HTML
const imageContainer = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("h");
const result = document.getElementById("para");

// ✅ 5 unique image URLs
const images = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/200/300?grayscale",
  "https://picsum.photos/200/300/",
  "https://picsum.photos/200/300.jpg"
];

// ✅ To store which two images the user clicks
let selectedImages = [];
let imageElements = [];

// ✅ Shuffle function (randomizes image order)
function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// ✅ Initialize the game
function startGame() {
  imageContainer.innerHTML = ""; // Clear old images
  selectedImages = []; // Reset selected images
  imageElements = []; // Clear previous image elements

  resetBtn.style.display = "none"; // Hide Reset button
  verifyBtn.style.display = "none"; // Hide Verify button
  result.textContent = ""; // Clear result message
  message.textContent = "Please click on the identical tiles to verify that you are not a robot.";

  // ✅ Step 1: Pick a random image to duplicate
  const randomIndex = Math.floor(Math.random() * images.length);
  const duplicateImage = images[randomIndex];

  // ✅ Step 2: Create a new array with 6 images (5 unique + 1 duplicate)
  let allImages = [...images, duplicateImage];

  // ✅ Step 3: Shuffle the images randomly
  allImages = shuffleArray(allImages);

  // ✅ Step 4: Display all 6 images on the page
  allImages.forEach((imgSrc) => {
    const img = document.createElement("img");
    img.src = imgSrc;

    // ✅ When user clicks an image
    img.addEventListener("click", () => handleImageClick(img, imgSrc));

    // Add image to container
    imageContainer.appendChild(img);

    // Store image element in an array
    imageElements.push(img);
  });
}

// ✅ Handle image click
function handleImageClick(imgElement, imgSrc) {
  // ✅ Allow only 2 images to be selected
  if (selectedImages.length < 2 && !imgElement.classList.contains("selected")) {
    imgElement.classList.add("selected"); // Highlight selected image
    selectedImages.push(imgSrc); // Add image source to selected list

    resetBtn.style.display = "inline-block"; // Show Reset button

    // ✅ Show Verify button only after 2 images are clicked
    if (selectedImages.length === 2) {
      verifyBtn.style.display = "inline-block";
    }
  }
}

// ✅ Reset button click
resetBtn.addEventListener("click", () => {
  // Remove selection
  selectedImages = [];
  imageElements.forEach(img => img.classList.remove("selected"));

  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  result.textContent = "";
});

// ✅ Verify button click
verifyBtn.addEventListener("click", () => {
  if (selectedImages.length === 2) {
    if (selectedImages[0] === selectedImages[1]) {
      result.textContent = "You are a human. Congratulations!";
    } else {
      result.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
    verifyBtn.style.display = "none"; // Hide Verify after check
  }
});

// ✅ Start the game on page load
startGame();
