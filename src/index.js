// // index.js
document.addEventListener("DOMContentLoaded", function () {
  main();
});

function main() {
  displayRamens();
  addSubmitListener();
}

function displayRamens() {
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(ramens => {
      const ramenMenu = document.getElementById('ramen-menu');
      ramens.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener('click', () => handleClick(ramen));
        ramenMenu.appendChild(img);
      });
    })
    .catch(error => console.error('Error fetching ramens:', error));
}

function handleClick(ramen) {
  const ramenDetail = document.getElementById('ramen-detail');
  ramenDetail.innerHTML = `
    <h2>${ramen.name}</h2>
    <p>${ramen.comment}</p>
    <p>Rating: ${ramen.rating}</p>
  `;
}

function addSubmitListener() {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(form);
    const newRamen = {
      name: formData.get('name'),
      image: formData.get('image'),
      comment: formData.get('comment'),
      rating: formData.get('rating')
    };
    displayNewRamen(newRamen);
    form.reset();
  });
}

function displayNewRamen(ramen) {
  const ramenMenu = document.getElementById('ramen-menu');
  const img = document.createElement('img');
  img.src = ramen.image;
  img.alt = ramen.name;
  img.addEventListener('click', () => handleClick(ramen));
  ramenMenu.appendChild(img);
}
