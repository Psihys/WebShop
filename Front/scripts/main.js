function createProductElement(name, description, price, imageUrl) {
    const li = document.createElement("li");
    li.classList.add("list_item");

    const a = document.createElement("a");
    a.href = "#"; // Add the correct link here
    a.classList.add("product_link");

    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = name;
    img.classList.add("product_img");

    const itemInfo = document.createElement("div");
    itemInfo.classList.add("item_info");

    // Create product info
    const productInfo = document.createElement("div");
    productInfo.classList.add("product_info");

    const h3 = document.createElement("h3");
    h3.classList.add("product_name");
    h3.textContent = name;

    const pDescription = document.createElement("p");
    pDescription.classList.add("product_description");
    pDescription.textContent = description;

    const pPrice = document.createElement("p");
    pPrice.classList.add("product_price");
    pPrice.textContent = price;

    productInfo.appendChild(h3);
    productInfo.appendChild(pDescription);
    productInfo.appendChild(pPrice);

    // Create product icons block
    const iconsBlock = document.createElement("div");
    iconsBlock.classList.add("product_icons");

    // Create product icons (Favorite and Cart)
    const favoriteLink = document.createElement("a");
    favoriteLink.href = "#";
    favoriteLink.classList.add("icon_item");
    const favoriteIcon = document.createElement("span");
    favoriteIcon.classList.add("material-symbols-outlined");
    favoriteIcon.textContent = "favorite";
    favoriteLink.appendChild(favoriteIcon);

    const cartLink = document.createElement("a");
    cartLink.href = "#";
    cartLink.classList.add("icon_item");
    const cartIcon = document.createElement("span");
    cartIcon.classList.add("material-symbols-outlined");
    cartIcon.textContent = "shopping_cart";
    cartLink.appendChild(cartIcon);

    favoriteLink.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default link action
        console.log(`You liked the product: ${name}`);
    });

    cartLink.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default link action
        console.log(`You added the product to the cart: ${name}`);
    });
    
    // Append icons to the itemInfo div
    iconsBlock.appendChild(favoriteLink);
    iconsBlock.appendChild(cartLink);

    // Append icons block and productInfo to the itemInfo div
    itemInfo.appendChild(productInfo);
    itemInfo.appendChild(iconsBlock);
    

    // Append image and product info to the anchor tag
    a.appendChild(img);
    a.appendChild(itemInfo);

    // Append the anchor tag to the list item
    li.appendChild(a);

    return li;
}

// Create product list
let productList = document.querySelector(".products_list");
if (!productList) {
    productList = document.createElement("ul");
    productList.classList.add("products_list");
    document.body.appendChild(productList);
}

// Generate 8 products
for (let i = 1; i <= 8; i++) {
    const product = createProductElement(
        `Product ${i}`,
        `Description for Product ${i}`,
        "$120.00",
        `./assets/Products/image${i}.png`
    );
    productList.appendChild(product);
}
