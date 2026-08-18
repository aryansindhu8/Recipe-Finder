# 🍜 Recipe Finder

A single-page recipe search application built with **HTML, CSS, and vanilla JavaScript**, powered by **TheMealDB API** and deployed on **Google Cloud Run**.

## 🚀 Live Demo

👉 **[View the Live Recipe Finder](https://recipe-finder-42553282238.us-central1.run.app/)**

---

## 📌 About the Project

**Recipe Finder** allows users to search for meals and explore detailed recipe information through an interactive single-page interface.

The application retrieves recipe data from **TheMealDB REST API** using JavaScript's **Fetch API** with `async/await`. It is containerized with **Docker**, served using **NGINX**, and deployed on **Google Cloud Run**.

## ✨ Features

- 🔍 Search for recipes by meal name
- 🍽️ Display search results as interactive recipe cards
- 🖼️ View recipe images, names, and categories
- 📖 Open a detailed recipe view
- 🥕 Display ingredients with their measurements
- 🌎 View recipe category and cuisine/area
- 📝 Read complete cooking instructions
- ▶️ Open available recipe videos on YouTube
- ⬅️ Return to previous search results without losing them
- ⏳ Display a loading state while retrieving recipes
- ⚠️ Validate empty search input
- 🚫 Show a user-friendly message when no recipes are found
- 🔄 Smooth transitions between search results and recipe details

## 🛠️ Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **Fetch API**
- **Async/Await**
- **DOM Manipulation**
- **TheMealDB REST API**
- **Docker**
- **NGINX**
- **Google Cloud Run**
- **Font Awesome**
- **Google Fonts**

## 🌐 API

Recipe data is retrieved from the free [TheMealDB API](https://www.themealdb.com/api.php).

### Search Recipes

```text
https://www.themealdb.com/api/json/v1/1/search.php?s={query}
```

### Recipe Details

```text
https://www.themealdb.com/api/json/v1/1/lookup.php?i={mealId}
```

No API key is required.

## 📁 Project Structure

```text
Recipe-Finder/
│
├── index.html
│
├── css/
│   └── styles.css
│
├── js/
│   └── app.js
│
├── Dockerfile
├── nginx.conf
└── README.md
```

## 🚀 Running Locally

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/recipe-finder.git
```

### 2. Navigate to the Project

```bash
cd recipe-finder
```

### 3. Run the Application

You can open `index.html` directly in your browser.

Alternatively, you can use a local development server such as **VS Code Live Server**.

## 🐳 Running with Docker

### Build the Docker Image

```bash
docker build -t recipe-finder .
```

### Run the Container

```bash
docker run -p 8080:8080 recipe-finder
```

Open the application at:

```text
http://localhost:8080
```

## ☁️ Deployment

The application is containerized using **Docker** and served using **NGINX on port 8080**.

It is deployed on **Google Cloud Run** and is publicly accessible at:

### 🌐 [Recipe Finder – Live Application](https://recipe-finder-42553282238.us-central1.run.app/)

## 📸 Screenshots

### Search Page

_Add a screenshot of the initial Recipe Finder search page here._

### Search Results

_Add a screenshot showing recipe search results here._

### Recipe Details

_Add a screenshot showing the detailed recipe view here._

## 💡 What I Learned

Through this project, I gained hands-on experience with:

- Consuming REST APIs using the Fetch API
- Working with asynchronous JavaScript using `async/await`
- Parsing and displaying JSON API responses
- Dynamically creating and updating DOM elements
- Building a Single Page Application without a frontend framework
- Managing loading, validation, and no-result states
- Creating interactive UI components and transitions
- Containerizing a frontend application with Docker
- Configuring NGINX to serve a web application
- Deploying a containerized web application to Google Cloud Run

## 👤 Author

**YOUR NAME**

- **LinkedIn:** [LinkedIn Profile](https://www.linkedin.com/in/aryansindhu/)
- **GitHub:** [GitHub Profile](https://github.com/aryansindhu8/)

---

⭐ If you found this project useful, feel free to star the repository.
