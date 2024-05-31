const mealDetails = document.querySelector("#mealDetails");
const loadAll = () => {
  const searchBtn = document.querySelector("#searchBtn");
  searchBtn.addEventListener("click", () => {
    mealDetails.style.display = "none";
    const mealName = document.querySelector("#mealName").value;
    console.log(mealName);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.meals);
        showMeals(data.meals);
      });
  });
};
const showMeals = (meals) => {
  const mealContainer = document.querySelector("#meals");
  mealContainer.innerHTML = " ";
  if (meals == null) {
    console.log("NO MEALS ");
    mealContainer.innerHTML = `
    <h4 class="text-muted">Meal Not Found, try again!</h4>
  `;
  } else {
    meals.forEach((meal) => {
      console.log(meal);
      const div = document.createElement("div");
      div.classList.add("col-lg-4");
      div.innerHTML = `

    <button type="button" class="card m-4" data-bs-toggle="modal" data-bs-target="#modal-${
      meal.idMeal
    }">

    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
      <p class="card-title text-info">${meal.strMeal}</p>
    </div>

   </button>

    <!-- Modal -->

    <div class="modal fade" id="modal-${
      meal.idMeal
    }" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modal-${
        meal.idMeal
      }-label" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modal-${meal.idMeal}-label">${
        meal.strMeal
      }</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Add modal content here -->
            <div class="card-body">

            <p class="card-text">${meal.strInstructions.slice(0, 250)} ...</p>
            <ul class="list-group list-group-flush">
            <li class="list-group-item">${meal.strIngredient1}</li>
            <li class="list-group-item">${meal.strIngredient2}</li>
            <li class="list-group-item">${meal.strIngredient3}</li>
            <li class="list-group-item">${meal.strIngredient4}</li>
          </ul>
          </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

          </div>
        </div>
      </div>
    </div>
  `;
      mealContainer.appendChild(div);
    });
  }
};

loadAll();
