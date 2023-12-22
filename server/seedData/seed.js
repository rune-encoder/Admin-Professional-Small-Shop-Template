const connection = require("../config/connection.js");

// IMPORT THE MODELS
const { Admin, Category, Product, Order, Shop } = require("../models/index.js");

// IMPORT THE DATA (ADMIN AND CATEGORIES)
const { admin, categories } = require("./data.js");

// IMPORT THE HELPER FUNCTIONS TO SEED DATA (PRODUCTS, ORDERS, AND SHOP)
const {
  seedProductData,
  seedOrderData,
  seedShopData,
} = require("./seedUtils.js");

// IMPORT THE HELPER FUNCTIONS
const dropCollectionIfExists = require("./dropCollectionIfExists.js");
const serializeData = require("./serializeData.js");
const { logMessage, setRed, setGreen } = require("./logMessage.js");

// SEED THE DATABASE WITH RANDOM DATA
const seedDatabase = async () => {
  try {
    // WAIT FOR THE DATABASE CONNECTION TO OPEN BEFORE SEEDING THE DATABASE
    await new Promise((resolve) => {
      connection.once("open", resolve);
    });

    // LOG THAT THE DATABASE CONNECTION HAS OPENED
    logMessage(
      `DATABASE CONNECTION OPEN\n STATUS: ${connection.readyState}`,
      setGreen
    );

    // DROP EXISTING COLLECTIONS FROM THE DATABASE (IF ANY EXIST).
    await dropCollectionIfExists("admins");
    await dropCollectionIfExists("categories");
    await dropCollectionIfExists("products");
    await dropCollectionIfExists("guests");
    await dropCollectionIfExists("orders");
    await dropCollectionIfExists("shops");

    // SEED ADMIN COLLECTION WITH ADMIN DATA
    try {
      // Ensure validations are run on the data and default values are saved. (permissions)
      for (let adminData of admin) {
        const newAdmin = new Admin(adminData);
        await newAdmin.save();
      }
    } catch (error) {
      console.error(error);
    }

    const seededAdmin = await serializeData(Admin);

    logMessage(
      `CREATED ADMIN COLLECTION: SEEDED "${seededAdmin.length}" ADMINS!`,
      setGreen,
      setGreen
    );

    // SEED CATEGORY COLLECTION WITH CATEGORY DATA
    try {
      await Category.collection.insertMany(categories);
    } catch (error) {
      console.error(error);
    }

    const seededCategories = await serializeData(Category);

    logMessage(
      `CREATED CATEGORY COLLECTION: SEEDED "${seededCategories.length}" CATEGORIES!`,
      setGreen,
      setGreen
    );

    // SEED PRODUCT COLLECTION WITH PRODUCT DATA
    try {
      const products = seedProductData(seededCategories);

      // Ensure validations are run on the data and default values are saved. (createdAt, price)
      for (let productData of products) {
        const newProduct = new Product(productData);
        await newProduct.save();
      }
    } catch (error) {
      console.error(error);
    }

    const seededProducts = await serializeData(Product);

    logMessage(
      `CREATED PRODUCT COLLECTION: SEEDED "${seededProducts.length}" PRODUCTS!`,
      setGreen,
      setGreen
    );

    // SEED ORDER COLLECTION WITH ORDER DATA
    try {
      const orders = seedOrderData(seededProducts);

      // Ensure validations are run on the data and default values are saved. (totalPrice)
      for (let orderData of orders) {
        const newOrder = new Order(orderData);
        await newOrder.save();
      }
    } catch (error) {
      console.error(error);
    }

    const seededOrders = await serializeData(Order);

    logMessage(
      `CREATED ORDER COLLECTION: SEEDED "${seededOrders.length}" ORDERS!`,
      setGreen,
      setGreen
    );

    // SEED SHOP COLLECTION WITH SHOP DATA
    try {
      const shop = seedShopData(seededAdmin);

      // Ensure validations are run on the data and default values are saved.
      const newShop = new Shop(shop);
      await newShop.save();
    } catch (error) {
      console.error(error);
    }

    const seededShop = await serializeData(Shop);

    logMessage(
      `CREATED SHOP COLLECTION: SEEDED "${seededShop.length}" SHOP!`,
      setGreen,
      setGreen
    );

    // LOG THAT THE SEEDING PROCESS IS COMPLETE
    logMessage("SEEDING COMPLETE!", setGreen, setGreen);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  } finally {
    // CLOSE THE DATABASE CONNECTION
    connection.close();

    // LOG THAT THE DATABASE CONNECTION HAS CLOSED
    logMessage(
      `DATABASE CONNECTION CLOSED\n STATUS: ${connection.readyState}`,
      setRed
    );
  }
};

seedDatabase();
