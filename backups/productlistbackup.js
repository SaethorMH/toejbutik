const params = new URLSearchParams(window.location.search);

const category = params.get("category");

console.log("category:", category);

let page = 0;
let pageNr = 1;

// const fetchUrl = category
// ? `https://kea-alt-del.dk/t7/api/products?category=${encodeURIComponent(category)}`
// : "https://kea-alt-del.dk/t7/api/products";

let listURL = category ? "https://kea-alt-del.dk/t7/api/products?category=" + category + "&limit=8&start=" + page : "https://kea-alt-del.dk/t7/api/products?limit=8&start=" + page;
let apiURL = "https://kea-alt-del.dk/t7/api/products?limit=44000";

const pContainer = document.querySelector("#p_container");
const pageCounter = document.querySelector("#pageCounter");
function getProducts() {
  listURL = category ? "https://kea-alt-del.dk/t7/api/products?category=" + category + "&limit=8&start=" + page : "https://kea-alt-del.dk/t7/api/products?limit=8&start=" + page;
  console.log("Get Produckt kører page er " + page + listURL);
  fetch(listURL).then((res) => res.json().then((products) => showProducts(products)));
}

function showProducts(products) {
  // Start med tom container
  //   pContainer.innerHTML = "";

  //   products.forEach((product) => {
  //     console.log(product.productdisplayname, product.price);
  //   });

  // products er et array af objekter
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

            <h3 class="pName">${product.productdisplayname}</h3>
            <p class="brand">${product.brandname}</p>
            <p class="price">${product.price}kr</p>
            <p class="sPrice">${oSP}kr</p>
            <div class="soldout">SOLD OUT</div>
            <div class="sale">${product.discount}kr OFF</div>
        </article>
    `;
  });
}

getProducts();
pageNumber();

const nextPage = document.querySelector("#next");
const prevPage = document.querySelector("#prev");

function nPage() {
  page += 8;
  pageNr++;
  //   const listURL = "https://kea-alt-del.dk/t7/api/products?limit=8&start=" + page;

  console.log("next page");
  console.log(listURL);

  pContainer.innerHTML = "";
  getProducts();
  pageNumber();
}

function pPage() {
  page -= 8;
  pageNr--;
  //   const listURL = "https://kea-alt-del.dk/t7/api/products?limit=8&start=" + page;

  console.log("prev page");
  console.log(listURL);

  pContainer.innerHTML = "";
  getProducts();
  pageNumber();
}

function pageNumber() {
  pageCounter.innerHTML = `Page ${pageNr} of 126`;
}
nextPage.addEventListener("click", nPage);
prevPage.addEventListener("click", pPage);
