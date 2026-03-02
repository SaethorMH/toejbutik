const listURL = "https://kea-alt-del.dk/t7/api/categories";

const cContainer = document.querySelector("#c_container");

function getCategories() {
  //   listURL = "https://kea-alt-del.dk/t7/api/products?limit=8&start=" + page;
  //   console.log("Get Produckt kører page er " + page + listURL);
  fetch(listURL).then((res) => res.json().then((catas) => showCategories(catas)));
}

function showCategories(catas) {
  catas.forEach((a) => {
    console.log(a);
    cContainer.innerHTML += `
        <a href="./productlist.html?category=${a.category}" class="catagory">${a.category}</a>
    `;
  });
}
getCategories();
