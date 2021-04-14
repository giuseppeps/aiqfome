const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = "b05c8cce";
const APP_key = "cb7ac662b9de5a8c8667ca5806216020";
// console.log(container)
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector('input').value;
  fetchAPI();
})

async function fetchAPI(){
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`;
  const response = await fetch(baseURL); 
  const data = await response.json();
  generateHTML(data.hits)
  console.log(data);
}

function generateHTML(results){
  container.classList.remove('initial');
  let generatedHTML= '';
  results.map(result => {
    generatedHTML += `
      <div class="item">
        <img src="${result.recipe.image}" alt="img">
        <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
          <a class="view-btn" target="_blank" href="${result.recipe.url}">Receita</a>
        </div>
        <p class="item-data">Calorias: ${result.recipe.calories.toFixed(2)}</p>
        <p class="item-data">Etiqueta de dieta: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'Não Encontrado'}</p>
        <p class="item-data">Etiqueta de saúde: ${result.recipe.healthLabels}</p>
      </div>
    `
  })
  searchResultDiv.innerHTML = generatedHTML;
}