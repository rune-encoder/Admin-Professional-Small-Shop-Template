const connection = require("../config/connection.js");

const { Admin, Category, Product, Order, Shop } = require("../models/index.js");
const {
  admin,
  categories,
  seedProductData,
  seedOrderData,
  seedShopData,
} = require("./data.js");

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
    await Admin.collection.insertOne(admin);
    const seededAdmin = await serializeData(Admin);
    logMessage(
      `CREATED ADMIN COLLECTION: SEEDED "${seededAdmin.length}" ADMIN!`,
      setGreen,
      setGreen
    );

    // SEED CATEGORY COLLECTION WITH CATEGORY DATA
    await Category.collection.insertMany(categories);
    const seededCategories = await serializeData(Category);
    logMessage(
      `CREATED CATEGORY COLLECTION: SEEDED "${seededCategories.length}" CATEGORIES!`,
      setGreen,
      setGreen
    );

    // SEED PRODUCT COLLECTION WITH PRODUCT DATA
    const products = seedProductData(seededCategories);
    await Product.collection.insertMany(products);
    const seededProducts = await serializeData(Product);

    logMessage(
      `CREATED PRODUCT COLLECTION: SEEDED "${seededProducts.length}" PRODUCTS!`,
      setGreen,
      setGreen
    );

    // SEED ORDER COLLECTION WITH ORDER DATA
    const orders = seedOrderData(seededProducts);
    await Order.collection.insertMany(orders);
    const seededOrders = await serializeData(Order);

    logMessage(
      `CREATED ORDER COLLECTION: SEEDED "${seededOrders.length}" ORDERS!`,
      setGreen,
      setGreen
    );

    // SEED SHOP COLLECTION WITH SHOP DATA
    const shop = seedShopData(
      seededAdmin,
      seededProducts,
      seededCategories,
      seededOrders
    );
    await Shop.collection.insertOne(shop);
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
