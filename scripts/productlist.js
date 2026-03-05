const params = new URLSearchParams(window.location.search);

let category = params.get("category");
let start = Number(params.get("start"));
let limit = Number(params.get("limit"));
let sorter = document.querySelector("#sortSelect");
let discountCheck = document.querySelector("#discountBox");

let discountChecked = false;

let allProducts = [];
let sortedProducts = [];

if (limit == 0) {
  limit = 8;
}
if (start == 0) {
  start = 0;
}

let listURL;

//console.log("category:", category);
//console.log("start:", start);
//console.log("limit:", limit);
let page = 0;
let pageNr = start / limit + 1;
let temp = 0;

discountCheck.addEventListener("change", changeDiscount);

function changeDiscount() {
  if (!discountChecked) {
    discountChecked = true;
    //console.log("discount check true");
    getProducts();
  } else {
    discountChecked = false;
    //console.log("discount check false");
    getProducts();
  }
}

// document.querySelectorAll('input[name="gender"]').forEach((input) => {
//   input.addEventListener("click", getProducts);
// });
document.querySelector("#gender").addEventListener("change", getProducts);

if (category == null || category == "null") {
  document.querySelector("#cName").innerHTML = "All Products";
} else {
  document.querySelector("#cName").innerHTML = category;
}

const pContainer = document.querySelector("#p_container");
const pageCounter = document.querySelector("#pageCounter");
function getProducts() {
  // listURL = category
  //   ? "https://kea-alt-del.dk/t7/api/products?category=" + category + "&limit=" + limit + "&start=" + start
  //   : "https://kea-alt-del.dk/t7/api/products?limit=" + limit + "&start=" + start;

  if (category === null || category === "null" || category === "") {
    listURL = "https://kea-alt-del.dk/t7/api/products?limit=" + limit + "&start=" + start;
  } else {
    listURL = "https://kea-alt-del.dk/t7/api/products?category=" + category + "&limit=" + limit + "&start=" + start;
  }
  //console.log("Get Produckt kører page er " + page + listURL);

  fetch(listURL).then((res) =>
    res.json().then((products) => {
      allProducts = products;
      showProducts(allProducts);

      //console.log(allProducts);

      //console.log("Sorted by price products: " + sortedProducts);
      //console.log(sortedProducts);
    }),
  );
}

function showProducts(products) {
  // Start med tom container
  pContainer.innerHTML = "";

  //   products.forEach((product) => {
  //     //console.log(product.productdisplayname, product.price);
  //   });
  ////////////////////////////////////////
  let genderSelect = document.querySelector("#gender");

  console.log("gender selected: " + genderSelect.value);

  if (genderSelect.value != "null") {
    products = products.filter((product) => product.gender == String(genderSelect.value));
  }

  //////////////////////////////////////

  //////////////
  if (discountChecked) {
    console.log("discount er checked");
    products = products.filter((product) => product.discount != null);
  } else {
    console.log("discount er  ikke checked");
  }

  products.forEach((product) => {
    let sO;
    let oS;
    let oSP;

    if (product.soldout == 1) {
      sO = "outsold";
    }

    if (product.discount != null) {
      oS = "onsale";
      oSP = product.price - product.discount;
    }

    pContainer.innerHTML += `
        <article class="product ${sO} ${oS}">
            <a href="./product.html?id=${product.id}" class="pImg">
                <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="billede af produkt">
            </a>
            <h3 class="brand">${product.brandname}</h3>
            <p class="pName">${product.productdisplayname}</p>
            
            <p class="price">${product.price}kr</p>
            <p class="sPrice">${oSP}kr</p>
            <div class="soldout">SOLD OUT</div>
            <div class="sale">-${Math.round(product.discount / (product.price / 100))}% discount</div>
        </article>
    `;
  });
}

const bContainer = document.querySelector("#buttonContainer");

function pageButtons() {
  let nStart = start + limit;
  let pStart = start - limit;

  bContainer.innerHTML = `
  <a class="button" id="prev" href="./productlist.html?category=${category}&limit=${limit}&start=${pStart}">Prev</a>
  <a class="button" id="next" href="./productlist.html?category=${category}&limit=${limit}&start=${nStart}">Next</a>

`;
  if (start == 0) {
    document.querySelector("#prev").classList.add("hidden");
  }
}

pageButtons();
getProducts();
// getCategories();

let limitor = document.querySelector("#limitSelect");
//console.log(limitor.value);
limitor.addEventListener("change", changelimit);
function changelimit() {
  limit = limitor.value;
  //console.log("limit is now: " + limitor.value);
  location.href = `./productlist.html?category=${category}&limit=${limit}&start=0`;
  limitor.value = limit;
}

//console.log(sorter.value);
sorter.addEventListener("change", changeSort);

function changeSort() {
  sort = sorter.value;
  //console.log("sort is now: " + sorter.value);

  sortedProducts = [...allProducts].sort((a, b) => eval(sorter.value));
  //console.log("Sorted by price products: ");
  //console.log(sortedProducts);

  showProducts(sortedProducts);
}
/*********************************************************************************************/
/********************************************************************************************/
/********************************* DET HER DRÆBRER LOADTIME **********************************/
let apiURL = `https://kea-alt-del.dk/t7/api/products?category=${category}&limit=9999`;
fetch(apiURL).then((res) => res.json().then((products) => howMany(products)));
function howMany(products) {
  const total = products.count;
  //console.log(total);

  let totpages = Math.ceil(products.length / limit);

  if (category == null || category == "null") {
    totpages = Math.ceil(44000 / limit);
  }
  pageCounter.innerHTML = `Page ${pageNr} of ${totpages}`;
  //console.log("Der er " + products.length + "objecter i katagorien " + category);
}

/*********************************************************************************************/
/*********************************************************************************************/
/*********************************************************************************************/

// const catURL = "https://kea-alt-del.dk/t7/api/categories";
// function getCategories() {
//   fetch(catURL).then((res) => res.json().then((catas) => showCategories(catas)));
// }
// function showCategories(catas) {
//   catas.forEach((cat) => {
//     //console.log("HVAD CAT ER: " + cat.category + " catagory er: " + category);

//     if (String(category) == String(cat.category)) {
//       temp++;
//     }
//     //console.log("temp is : " + temp);
//   });
// }
// if (temp != 1) {
//   category = null;
// }

// const fetchUrl = category
// ? `https://kea-alt-del.dk/t7/api/products?category=${encodeURIComponent(category)}`
// : "https://kea-alt-del.dk/t7/api/products";
