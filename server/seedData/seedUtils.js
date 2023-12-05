// |===== IMPORTS FOR SEED DATA =====|
const { find } = require("../models/Admin");
const {
  products,
  shortDescription,
  details,
  statusSet,
  firstNameSet,
  lastNameSet,
  userNames,
  emailSet,
} = require("./data");

// HELPER FUNCTION: GET A RANDOM ITEM FROM AN ARRAY
const getRandomItem = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// HELPER FUNCTION: GENERATE A RANDOM PRICE
const getRandomPrice = () => {
  // Generate a random price between 0 and 130.00
  const randomPrice = +(Math.random() * 130).toFixed(2);
  return randomPrice;
};

// HELPER FUNCTION: GENERATE A RANDOM USERNAME
const getRandomUsername = () => {
  const randomSetOne = getRandomItem(userNames.wordSetOne);
  const randomSetTwo = getRandomItem(userNames.wordSetTwo);

  // Generate a random number between 10 and 99 after the generated username
  const username =
    randomSetTwo + randomSetOne + Math.floor(Math.random() * 90 + 10);

  return username;
};

// HELPER FUNCTION: GENERATE A RANDOM EMAIL
const getRandomEmail = (username) => {
  const randomEmailDomain = getRandomItem(emailSet);
  const email = username.toLowerCase() + randomEmailDomain;

  return email;
};

// HELPER FUNCTION: GENERATE A RANDOM PHONE NUMBER
const getRandomPhoneNumber = () => {
  const phoneNumber =
    Math.floor(Math.random() * 900 + 100) + // Area code (3 digits)
    "-" +
    Math.floor(Math.random() * 900 + 100) + // Prefix (3 digits)
    "-" +
    Math.floor(Math.random() * 9000 + 1000); // Suffix (4 digits)

  return phoneNumber;
};

// |===== SEED PRODUCT DATA TO PRODUCT COLLECTION =====|
const seedProductData = (categories) => {
  const productData = [];

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    const categoryName = category.name.toLowerCase();

    // GET THE PRODUCT NAMES FOR THE CATEGORY
    const productNames = products[`${categoryName}ProductNames`];

    // LOOP THROUGH THE PRODUCT NAMES
    for (let j = 0; j < productNames.length; j++) {
      const productName = productNames[j];
      const product = {
        category: category._id,
        name: productName,
        shortDescription: getRandomItem(shortDescription),
        details: details,
        price: getRandomPrice(), // Between 0 and 500
        quantity: Math.floor(Math.random() * 10), // Between 0 and 10
        image: {
          cloudinaryId: "seed",
          url: "https://res.cloudinary.com/dzcmadjl1/image/upload/v1616458918/seed.png",
        },
        isFeatured: Math.random() > 0.9, // 10% chance of being featured
      };

      productData.push(product);
    }
  }
  return productData;
};

// HELP FUNCTION: GET RANDOM PRODUCTS FOR THE CART IN THE ORDER COLLECTION
const getRandomCartProducts = (products) => {
  const randomProducts = [];
  const numberOfProducts = Math.floor(Math.random() * 3 + 1); // Between 1 and 3

  for (let i = 0; i < numberOfProducts; i++) {
    let orderedProduct = getRandomItem(products);

    const randomProduct = {
      product: orderedProduct._id,
      quantity: Math.floor(Math.random() * 5 + 1), // Between 1 and 5
    };

    randomProducts.push(randomProduct);
  }

  return randomProducts;
};

// |===== SEED ORDER DATA TO ORDER COLLECTION =====|
const seedOrderData = (seededProducts) => {
  const orderData = [];

  for (let i = 0; i < 35; i++) {
    // 35 orders
    const firstName = getRandomItem(firstNameSet);
    const lastName = getRandomItem(lastNameSet);
    const username = getRandomUsername();
    const email = getRandomEmail(username);
    const phoneNumber = getRandomPhoneNumber();
    const status = getRandomItem(statusSet);
    const productIds = getRandomCartProducts(seededProducts);

    // HELPER FUNCTION TO MATCH ID WITH SEEDED PRODUCT
    const findProductById = (productId) => {
      return seededProducts.find((product) => product._id === productId);
    };

    // HELPER FUNCTION: CALCULATE THE TOTAL PRICE OF THE ORDER
    const calculateTotalPrice = () => {
      let orderedProducts = []

      for (let i = 0; i < productIds.length; i++) {
        let product = findProductById(productIds[i].product);
        orderedProducts.push(product);
      }

      let products = orderedProducts.map((product) => {
        return {
          product: product,
          quantity: productIds.find((item) => item.product === product._id)
            .quantity,
        };
      });

      return products
        .reduce(
          (totalPrice, products) =>
            totalPrice + products.product.price * products.quantity,
          0
        )
        .toFixed(2);
    };

    const order = {
      products: productIds,
      totalPrice: calculateTotalPrice(),
      status: status,
      contactFirstName: firstName,
      contactLastName: lastName,
      contactEmail: email,
      contactPhone: phoneNumber,
      shippingAddress: "123 Main St, Anytown, USA",
      paymentDetails: "Credit Card",
    };

    orderData.push(order);
  }
  return orderData;
};

// |===== SEED SHOP DATA TO SHOP COLLECTION =====|
const seedShopData = (
  seededAdmin,
  seededProducts,
  seededCategories,
  seededOrders
) => {
  const shopData = {
    name: "My Shop Template",
    moto: "The convenient shop template for your business!",
    address: "123 Fake Street",
    city: "Fake City",
    state: "Fake State",
    zipCode: "12345",
    phoneNumber: "123-456-7890",
    email: "myshop@email.com",
    admin: seededAdmin[0]._id,
    products: seededProducts.map((product) => product._id),
    categories: seededCategories.map((category) => category._id),
    guests: [],
    orders: seededOrders.map((order) => order._id),
  };
  return shopData;
};

module.exports = {
  seedProductData,
  seedOrderData,
  seedShopData,
};
