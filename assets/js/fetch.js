const searchForm = document.querySelector('.area2-form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = "b05c8cce";
const APP_key = "cb7ac662b9de5a8c8667ca5806216020";

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputValue = document.getElementById('area2-input').value;
  const obj = {title: inputValue};
  searchQuery = e.target.querySelector('input').value;
  posts(obj);
  console.log(obj);
})

const posts = (obj) => {
  axios.post('https://aiqfome2.herokuapp.com/post', obj)
    .then(response => {
      console.log(response)
      generateHTML(response.data)
    })
    .catch(error => {
      console.log(error);
    })
};

function generateHTML(results){
  let generatedHTML= '';
  results.map(result => {
    generatedHTML += `
    <div class="item">
      <img src="${result.urlImage}" alt="img">
      <div class="flex-container">
        <h1 class="title">${result.title}</h1>
        <a class="view-btn" target="_blank" href="${result.urlRecipe}">Receita</a>
      </div>
    </div>    `
  })
  searchResultDiv.innerHTML = generatedHTML;
};

