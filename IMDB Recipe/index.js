const searchInput = document.getElementById("searchInput");
const result = document.getElementById("results");

const api_url = "https://www.themealdb.com/api/json/v1/1/search.php";

let typetime;  // throttling time
const typeInterval = 300; //delay time when typing the user in search

searchInput.addEventListener("input", () => {
  clearTimeout(typetime); // clear pervious time and again reset throttling time
  typetime = setTimeout(search, typeInterval); // set new set time when the user stop typing and then search  function call and triggred api call to fetch recipes

});

async function search() {
  const searchTerm = searchInput.value;

  if (!searchTerm) {
    result.innerHTML = "";  // search term empty the result clear and avoid api call
    return;
  }

  const response = await fetch(`${api_url}?s=${searchTerm}`);
  const data = await response.json();

  displayRecipes(data.meals); // call diaplayRecipe for api 

  // console.log(data)
}
// display data 

function displayRecipes(recipes) {
  result.innerHTML = "";

  //  no recipes (meals) in the data
  if (!recipes) {
    result.innerHTML = "<h3>No recipes found.</h3>";
    return;
  }

  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("div"); // create new div for recipeCard 
    recipeCard.classList.add("recipe-card"); // add new div class in div

    recipeCard.innerHTML = `
      <h4>${recipe.strCategory}</h4>
      <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
      <h3>${recipe.strMeal}</h3>
      
      
    `;

    result.appendChild(recipeCard); // display in web page
  });
}
