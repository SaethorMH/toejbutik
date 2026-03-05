const params = new URLSearchParams(window.location.search);

let id = params.get("id");
const category = Number(params.get("category"));

if (id === null || id === "null" || id === "") {
  id = 1528;
}
console.log("id:", id);
console.log("category:", category);

// const id = 1528;

const productURL = "https://kea-alt-del.dk/t7/api/products/" + id;
const productcontainer = document.querySelector("#productContainer");

function getData() {
  fetch(productURL).then((res) => res.json().then((data) => show(data)));
  console.log("getter data");
}

function show(data) {
  if (data.discount > 0) {
    productcontainer.classList.add("onsale");
  }
  productcontainer.innerHTML = `
    <img id="ppImg" src="https://kea-alt-del.dk/t7/images/webp/1000/${id}.webp" alt="Produktbillede">
    
        <div class="sText">
            <h1 id="ppName">${data.productdisplayname}</h1>
            <div>
            <h3 id="ppPrice">${data.price}kr</h3>
            <h3 id="ppSale" class="hidden">${data.price - data.discount}kr</h3>
            
            </div>
            
            <div id="ppB">
                <h2 id="ppBrand">${data.brandname}</h2>
                <img id="ppBrandP" src="${data.brandimage}" alt="brand logo">
           </div>
                <p id="ppBrandB">${data.brandbio}</p>
                <p id="ppBrandD">${data.description}</p>
            
            <h2 id="ppSoldOut">SOLDOUT</h2>
            
            <button id="addCart">Add to basket</button>
            <p id="lager">1-2 tilbage på lager</p>
        </div>

  `;
  if (data.brandimage == null) {
    document.querySelector("#ppBrandP").classList.add("hidden");
  }
  if (data.soldout) {
    document.querySelector("#addCart").classList.add("hidden");
    document.querySelector("#lager").classList.add("hidden");
  } else {
    document.querySelector("#ppSoldOut").classList.add("hidden");
  }
  if (data.brandbio == null) {
    document.querySelector("#ppBrandD").classList.add("hidden");
  }
  if (data.discount != null) {
    document.querySelector("#ppPrice").classList.add("crossed");
    document.querySelector("#ppSale").classList.remove("hidden");
  }

  console.log("Data inputted");
}

getData();
