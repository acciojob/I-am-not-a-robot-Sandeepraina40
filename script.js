// Image sources
const images = [
  "https://picsum.photos/id/237/200/200",
  "https://picsum.photos/id/238/200/200",
  "https://picsum.photos/id/239/200/200",
  "https://picsum.photos/id/240/200/200",
  "https://picsum.photos/id/241/200/200"
];

// DOM elements
const imageContainer = document.getElementById("image-container");
const heading = document.getElementById("h");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const resultPara = document.getElementById("para");

// State variables
let selectedImages = [];
let imageElements = [];

// Initialize the app
function init() {
  // Reset everything
  imageContainer.innerHTML = "";
  resultPara.textContent = "";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  selectedImages = [];
  imageElements = [];

  heading.textContent =
    "Please click on the identical tiles to verify that you are not a robot.";

  // Randomly choose one image to duplicate
  const duplicateIndex = Math.floor(Math.random() * images.length);
  const duplicateImage = images[duplicateIndex];

  // Create array of 6 images (5 unique + 1 duplicate)
  const allImages = [...images, duplicateImage];

  // Shuffle the images
  allImages.sort(() => Math.random() - 0.5);

  // Render images with classes img1, img2, ...
  allImages.forEach((imgSrc, index) => {
    const img = document.createElement("img");
    img.src = imgSrc;

    // Assign class for Cypress test
    img.classList.add(`img${index + 1}`);

    img.dataset.index = index;
    img.addEventListener("click", () => handleImageClick(img, imgSrc));
    imageContainer.appendChild(img);
    imageElements.push(img);
  });
}

// Handle image click
function handleImageClick(img, imgSrc) {
  if (selectedImages.length < 2 && !img.classList.contains("selected")) {
    img.classList.add("selected");
    selectedImages.push({ img, src: imgSrc });

    // Show Reset button when at least one image is clicked
    resetBtn.style.display = "inline-block";

    // Show Verify button when exactly two images are selected
    if (selectedImages.length === 2) {
      verifyBtn.style.display = "inline-block";
    }
  }
}

// Reset functionality
resetBtn.addEventListener("click", () => {
  init(); // Re-initialize
});

// Verify functionality
verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";

  if (selectedImages[0].src === selectedImages[1].src) {
    resultPara.textContent = "You are a human. Congratulations!";
  } else {
    resultPara.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

// Call init on page load
init();
