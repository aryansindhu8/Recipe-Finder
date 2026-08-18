const form = document.querySelector(".nav-bar-search-form");
const input = document.getElementById("search-form-input");
const errorContainer = document.querySelector(".error-text");
const resultsView = document.querySelector(".results-view");
const detailedView = document.querySelector(".detailed-view");
const resultsContainer = document.querySelector(".search-results-cards");
const TRANSITION_DURATION = 320;

// if (!form || !input || !errorContainer) {
//     return;
// }

// This is a simple form-validation, which checks if the user has entered any search terms or not.
const showError = (message) => {
    errorContainer.innerHTML = "";
    const errorText = document.createElement("p");
    errorText.id = "error";
    errorText.textContent = message;
    errorContainer.appendChild(errorText);
};

const clearError = () => {
    errorContainer.innerHTML = "";
};

const wait = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

const animateIn = async (element) => {
    element.classList.remove("is-hidden", "is-exit");
    element.classList.add("is-enter");

    requestAnimationFrame(() => {
        element.classList.remove("is-enter");
    });

    await wait(TRANSITION_DURATION);
};

const animateOut = async (element) => {
    element.classList.remove("is-enter");
    element.classList.add("is-exit");

    await wait(TRANSITION_DURATION);

    element.classList.add("is-hidden");
    element.classList.remove("is-exit");
};

const switchView = async (fromElement, toElement) => {
    if (!fromElement.classList.contains("is-hidden")) {
        await animateOut(fromElement);
    }

    if (toElement.classList.contains("is-hidden")) {
        await animateIn(toElement);
    }
};

const animateResultsRefresh = () => {
    resultsContainer.classList.remove("cards-refresh");

    requestAnimationFrame(() => {
        resultsContainer.classList.add("cards-refresh");
    });
};

// Fetch recipes from TheMealDB API
const fetchRecipes = async (query) => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();
        return data.meals;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        return null;
    }
};

// Show loading spinner
const showLoadingSpinner = () => {
    resultsContainer.innerHTML = '<div class="spinner"><div class="spinner-circle"></div></div>';
};

// Hide loading spinner
const hideLoadingSpinner = () => {
    const spinner = document.querySelector(".spinner");
    if (spinner) {
        spinner.remove();
    }
};

// Display recipe cards
const displayRecipes = (meals) => {
    hideLoadingSpinner();
    resultsContainer.innerHTML = "";

    if (!meals || meals.length === 0) {
        const noResults = document.createElement("p");
        noResults.className = "search-error";
        noResults.textContent = "Oops! No recipes found. Try another search term.";
        resultsContainer.appendChild(noResults);
        animateResultsRefresh();
        return;
    }

    meals.forEach((meal) => {
        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");
        img.src = meal.strMealThumb;
        img.alt = meal.strMeal;

        const cardText = document.createElement("div");
        cardText.className = "card-text";

        const mealHeading = document.createElement("h2");
        mealHeading.textContent = meal.strMeal;

        const category = document.createElement("span");
        category.textContent = meal.strCategory;

        cardText.appendChild(mealHeading);
        cardText.appendChild(category);

        card.appendChild(img);
        card.appendChild(cardText);

        // Add click event to show detailed view
        card.addEventListener("click", () => {
            fetchMealDetails(meal.idMeal);
        });

        resultsContainer.appendChild(card);
    });

    animateResultsRefresh();
};

// Fetch detailed meal information by ID
const fetchMealDetails = async (mealId) => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await response.json();
        if (data.meals && data.meals.length > 0) {
            displayMealDetail(data.meals[0]);
        }
    } catch (error) {
        console.error("Error fetching meal details:", error);
    }
};

// Display detailed meal information
const displayMealDetail = async (meal) => {

    detailedView.innerHTML = "";

    // Back button
    const backDiv = document.createElement("div");
    backDiv.className = "detailed-back";
    const backButton = document.createElement("button");
    backButton.className = "back-button";
    backButton.innerHTML = '<i class="fa-solid fa-arrow-left-long"></i> Back to Results';
    backButton.addEventListener("click", async () => {
        await switchView(detailedView, resultsView);
    });
    backDiv.appendChild(backButton);

    // Left section with image
    const detailedLeft = document.createElement("div");
    detailedLeft.className = "detailed-left";
    const mealImg = document.createElement("img");
    mealImg.src = meal.strMealThumb;
    mealImg.alt = meal.strMeal;
    detailedLeft.appendChild(mealImg);

    // Right section with details
    const detailedRight = document.createElement("div");
    detailedRight.className = "detailed-right";

    // Meal name
    const detailedName = document.createElement("div");
    detailedName.className = "detailed-name";
    const heading1 = document.createElement("h1");
    heading1.textContent = meal.strMeal;
    detailedName.appendChild(heading1);

    // Category and Area
    const detailedType = document.createElement("div");
    detailedType.className = "detailed-type";
    const categorySpan = document.createElement("span");
    categorySpan.className = "meat";
    categorySpan.textContent = meal.strCategory;
    const areaSpan = document.createElement("span");
    areaSpan.className = "cuisine";
    areaSpan.textContent = meal.strArea;
    detailedType.appendChild(categorySpan);
    detailedType.appendChild(areaSpan);

    // Ingredients
    const detailedIngredients = document.createElement("div");
    detailedIngredients.className = "detailed-ingredients";
    const ingredientsH2 = document.createElement("h2");
    ingredientsH2.textContent = "Ingredients";
    const ingredientsList = document.createElement("ul");

    // Extract ingredients and measurements
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim()) {
            const li = document.createElement("li");
            li.textContent = `${measure} ${ingredient}`;
            ingredientsList.appendChild(li);
        }
    }

    detailedIngredients.appendChild(ingredientsH2);
    detailedIngredients.appendChild(ingredientsList);

    // Instructions
    const detailedInstructions = document.createElement("div");
    detailedInstructions.className = "detailed-instructions";
    const instructionsH2 = document.createElement("h2");
    instructionsH2.textContent = "Instructions";
    const instructionsP = document.createElement("p");
    instructionsP.textContent = meal.strInstructions;
    detailedInstructions.appendChild(instructionsH2);
    detailedInstructions.appendChild(instructionsP);

    // YouTube link
    const ytLink = document.createElement("a");
    ytLink.className = "yt-link";
    ytLink.href = meal.strYoutube || "#";
    ytLink.target = "_blank";
    ytLink.innerHTML = '<i class="fa-regular fa-circle-play"></i>  Watch on YouTube';

    // Append all to detailedRight
    detailedRight.appendChild(detailedName);
    detailedRight.appendChild(detailedType);
    detailedRight.appendChild(detailedIngredients);
    detailedRight.appendChild(detailedInstructions);
    detailedRight.appendChild(ytLink);

    // Append all to detailedView
    detailedView.appendChild(backDiv);
    detailedView.appendChild(detailedLeft);
    detailedView.appendChild(detailedRight);

    await switchView(resultsView, detailedView);
};

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = input.value.trim();

    if (!query) {
        showError("Please Enter a Search Term");
        return;
    }

    clearError();

    if (resultsView.classList.contains("is-hidden")) {
        await switchView(detailedView, resultsView);
    }

    showLoadingSpinner();

    const meals = await fetchRecipes(query);
    displayRecipes(meals);
});

