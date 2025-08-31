//your code here

const imageContainer = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("h");
const result = document.getElementById("para");

let images = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/200/300?grayscale",
  "https://picsum.photos/200/300/",
  "https://picsum.photos/200/300.jpg"
];

let selectedImages = [];
let imageElements = [];

// Function to shuffle an array
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Initialize game
function init() {
  imageContainer.innerHTML = "";
  selectedImages = [];
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  result.textContent = "";
  message.textContent = "Please click on the identical tiles to verify that you are not a robot.";

  // Duplicate one random image
  let duplicateIndex = Math.floor(Math.random() * images.length);
  let duplicatedImage = images[duplicateIndex];
  let allImages = [...images, duplicatedImage];

  // Shuffle images
  allImages = shuffleArray(allImages);

  // Render images
  allImages.forEach((imgSrc, index) => {
    const img = document.createElement("img");
    img.src = imgSrc;
    img.dataset.index = index;
    img.addEventListener("click", () => handleImageClick(img, imgSrc));
    imageContainer.appendChild(img);
    imageElements.push(img);
  });
}

// Handle image click
function handleImageClick(imgElement, imgSrc) {
  if (selectedImages.length < 2 && !imgElement.classList.contains("selected")) {
    imgElement.classList.add("selected");
    selectedImages.push(imgSrc);

    resetBtn.style.display = "inline-block";

    if (selectedImages.length === 2) {
      verifyBtn.style.display = "inline-block";
    }
  }
}

// Reset state
resetBtn.addEventListener("click", () => {
  selectedImages = [];
  imageElements.forEach(img => img.classList.remove("selected"));
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  result.textContent = "";
});

// Verify selection
verifyBtn.addEventListener("click", () => {
  if (selectedImages.length === 2) {
    if (selectedImages[0] === selectedImages[1]) {
      result.textContent = "You are a human. Congratulations!";
    } else {
      result.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
    verifyBtn.style.display = "none";
  }
});

// Start game
init();

