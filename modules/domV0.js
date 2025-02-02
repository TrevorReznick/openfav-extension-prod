import { applicationObj } from "./config/applicationObj.js";
import { logger } from "./utils/utils.js";

export function greet(name) {
  return `Hello, ${name}! Welcome to Openfav.`;
}

export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

document.addEventListener("DOMContentLoaded", () => {
  const envButtons = document.querySelectorAll(".env-btn");
  const functionList = document.querySelector(".function-list");

  // Function to update the function list based on selected environment
  function updateFunctionList(envName) {
    functionList.innerHTML = ""; // Clear previous functions
    logger.info("enviroment", envName);

    const selectedEnv = applicationObj.environments.find(
      (env) => env.name === envName
    );

    if (selectedEnv && selectedEnv.functionsTypes.length > 0) {
      selectedEnv.functionsTypes.forEach((func) => {
        const functionItem = document.createElement("div");
        functionItem.className = "function-item";

        const functionIcon = document.createElement("div");
        functionIcon.className = "function-icon";
        functionIcon.textContent = func.name.charAt(0).toUpperCase();

        const functionName = document.createElement("div");
        functionName.className = "function-name";
        functionName.textContent = func.label || func.name;

        const functionCheckbox = document.createElement("input");
        functionCheckbox.type = "checkbox";
        functionCheckbox.className = "function-checkbox";

        functionItem.appendChild(functionIcon);
        functionItem.appendChild(functionName);
        functionItem.appendChild(functionCheckbox); // Append checkbox last for alignment
        functionList.appendChild(functionItem);
      });
    } else {
      functionList.innerHTML =
        "<p>No functions available for this environment.</p>";
    }
  }

  // Set up initial environment and functions
  let currentEnv = "Production";
  const activeButton = document.querySelector(
    `.env-btn[data-env="${currentEnv}"]`
  );
  activeButton.classList.add("active");
  updateFunctionList(currentEnv);

  // Handle environment button clicks
  envButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const envName = button.getAttribute("data-env");
      if (envName !== currentEnv) {
        document.querySelector(".env-btn.active").classList.remove("active");
        button.classList.add("active");
        currentEnv = envName;
        updateFunctionList(envName);
      }
    });
  });

  // Rating system logic
  const ratingStars = document.querySelectorAll(".rating-star");
  let selectedRating = null;

  ratingStars.forEach((star) => {
    star.addEventListener("click", () => {
      const rating = parseInt(star.dataset.rating);
      selectedRating = rating;
      updateRatingStars();
    });

    star.addEventListener("mouseover", () => {
      const rating = parseInt(star.dataset.rating);
      highlightStars(rating);
    });

    star.addEventListener("mouseout", () => {
      if (selectedRating !== null) {
        updateRatingStars();
      } else {
        unhighlightStars();
      }
    });
  });

  function highlightStars(rating) {
    ratingStars.forEach((star, index) => {
      if (index < rating) {
        star.classList.add("active");
      } else {
        star.classList.remove("active");
      }
    });
  }

  function unhighlightStars() {
    ratingStars.forEach((star) => {
      star.classList.remove("active");
    });
  }

  function updateRatingStars() {
    ratingStars.forEach((star, index) => {
      if (index < selectedRating) {
        star.classList.add("active");
      } else {
        star.classList.remove("active");
      }
    });
  }

  // Save button functionality
  const saveButton = document.querySelector(".save-button");
  saveButton.addEventListener("click", () => {
    alert("Settings saved!");
  });
});
