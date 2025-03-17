function createProductElement(name, description, price, imageUrl) {
    // Create the list item <li>
    const li = document.createElement("li");
    li.classList.add("list_item");

    // Create the anchor tag <a> for the link
    const a = document.createElement("a");
    a.href = "#"; // Add the correct link here
    a.classList.add("product_link");

    // Create the image element
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = name;
    img.classList.add("product_img");

    // Create the product info container <div>
    const itemInfo = document.createElement("div");
    itemInfo.classList.add("item_info");

    // Create the product info block
    const productInfo = document.createElement("div");
    productInfo.classList.add("product_info");

    // Product name
    const h3 = document.createElement("h3");
    h3.classList.add("product_name");
    h3.textContent = name;

    // Product description
    const pDescription = document.createElement("p");
    pDescription.classList.add("product_description");
    pDescription.textContent = description;

    // Product price
    const pPrice = document.createElement("p");
    pPrice.classList.add("product_price");
    pPrice.textContent = price;

    productInfo.appendChild(h3);
    productInfo.appendChild(pDescription);
    productInfo.appendChild(pPrice);

    // Create the icons block <div>
    const iconsBlock = document.createElement("div");
    iconsBlock.classList.add("product_icons");

    // Favorite icon
    const favoriteLink = document.createElement("a");
    favoriteLink.href = "#";
    favoriteLink.classList.add("icon_item");
    const favoriteIcon = document.createElement("span");
    favoriteIcon.classList.add("material-symbols-outlined");
    favoriteIcon.textContent = "favorite";
    favoriteLink.appendChild(favoriteIcon);

    // Cart icon
    const cartLink = document.createElement("a");
    cartLink.href = "#";
    cartLink.classList.add("icon_item");
    const cartIcon = document.createElement("span");
    cartIcon.classList.add("material-symbols-outlined");
    cartIcon.textContent = "shopping_cart";
    cartLink.appendChild(cartIcon);

    // Add event listeners for the icons
    favoriteLink.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default link action

        // Store product info in local storage under 'likedProducts'
        const productData = {
            name: name,
            description: description,
            price: price,
            imageUrl: imageUrl,
        };

        // Get existing liked products from localStorage or create an empty array
        let likedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];
        
        // Add the current product to the liked products array
        likedProducts.push(productData);
        
        // Save updated liked products array back to localStorage
        localStorage.setItem('likedProducts', JSON.stringify(likedProducts));

        console.log(`You liked the product: ${name}`);
    });

    // Add event listener for the "cart" button
    cartLink.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default link action

        // Store product info in local storage under 'cartItems'
        const productData = {
            name: name,
            description: description,
            price: price,
            imageUrl: imageUrl,
        };

        // Get existing cart items from localStorage or create an empty array
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        // Add the current product to the cart items array
        cartItems.push(productData);
        
        // Save updated cart items array back to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        console.log(`You added the product to the cart: ${name}`);
    });

    // Append the icons to the iconsBlock
    iconsBlock.appendChild(favoriteLink);
    iconsBlock.appendChild(cartLink);

    // Append the product info and icons block to the itemInfo container
    itemInfo.appendChild(productInfo);
    itemInfo.appendChild(iconsBlock);

    // Append the image and itemInfo to the anchor tag
    a.appendChild(img);
    a.appendChild(itemInfo);

    // Append the anchor tag to the list item
    li.appendChild(a);

    return li;
}

// Create product list container
let productList = document.querySelector(".products_list");
if (!productList) {
    productList = document.createElement("ul");
    productList.classList.add("products_list");
    document.body.appendChild(productList);
}

// Generate and append 8 products
for (let i = 1; i <= 8; i++) {
    const product = createProductElement(
        `Product ${i}`,
        `Description for Product ${i}`,
        "$120.00",
        `./assets/Products/image${i}.png`
    );
    productList.appendChild(product);
}
