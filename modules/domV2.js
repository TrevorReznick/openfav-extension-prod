import { applicationObj } from "./config/applicationObj.js";
import { logger } from "./utils/utils.js";

export function updateResourceTypesList(envName) {

  const resourceList = document.querySelector(".resource-list");
  resourceList.innerHTML = ""; // Clear previous resources
  logger.info("environment resources", envName);

  const selectedEnv = applicationObj.environments.find(
    (env) => env.name === envName
  );

  if (selectedEnv && selectedEnv.resourceTypes.length > 0) {

    logger.log('Resources exists!')
    logger.log('Resource types', selectedEnv.resourceTypes)
    selectedEnv.resourceTypes.forEach((resource) => {
      const resourceItem = document.createElement("div");
      resourceItem.className = "resource-item";

      const resourceIcon = document.createElement("div");
      resourceIcon.className = "resource-icon";
      resourceIcon.textContent = resource.name.charAt(0).toUpperCase();

      const resourceName = document.createElement("div");
      resourceName.className = "resource-name";
      resourceName.textContent = resource.label || resource.description;

      const resourceCheckbox = document.createElement("input");
      resourceCheckbox.type = "checkbox";
      resourceCheckbox.className = "resource-checkbox";

      resourceItem.appendChild(resourceIcon);
      resourceItem.appendChild(resourceName);
      resourceItem.appendChild(resourceCheckbox);
      resourceList.appendChild(resourceItem);
    });
  } else {
    resourceList.innerHTML =
      "<p>No resources available for this environment.</p>";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  
  const envButtons = document.querySelectorAll(".env-btn");
  const functionList = document.querySelector(".function-list");

  function updateFunctionList(envName) {
    functionList.innerHTML = "";
    logger.info("environment functions", envName);

    const selectedEnv = applicationObj.environments.find(
      (env) => env.name === envName
    );

    logger.log('founded env', selectedEnv)

    if (selectedEnv && selectedEnv.functionsTypes.length > 0) {
      selectedEnv.functionsTypes.forEach((func) => {
        const functionItem = document.createElement("div");
        functionItem.className = "function-item";

        const functionIcon = document.createElement("div");
        functionIcon.className = "function-icon";
        functionIcon.textContent = func.name.charAt(0).toUpperCase();

        const functionName = document.createElement("div");
        functionName.className = "function-name";
        functionName.textContent = func.description || func.name;

        const functionCheckbox = document.createElement("input");
        functionCheckbox.type = "checkbox";
        functionCheckbox.className = "function-checkbox";

        functionItem.appendChild(functionIcon);
        functionItem.appendChild(functionName);
        functionItem.appendChild(functionCheckbox);
        functionList.appendChild(functionItem);
      });
    } else {
      functionList.innerHTML =
        "<p>No functions available for this environment.</p>";
    }
  }

  // Set up initial environment, functions and resources
  let currentEnv = "Production";
  const activeButton = document.querySelector(
    `.env-btn[data-env="${currentEnv}"]`
  );
  activeButton.classList.add("active");
  updateFunctionList(currentEnv);
  updateResourceTypesList(currentEnv);

  // Handle environment button clicks
  envButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const envName = button.getAttribute("data-env");
      if (envName !== currentEnv) {
        document.querySelector(".env-btn.active").classList.remove("active");
        button.classList.add("active");
        currentEnv = envName;
        updateFunctionList(envName);
        updateResourceTypesList(envName);
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
