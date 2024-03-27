// |===== ADMIN COLLECTION DATA (TEST ADMIN) =====|
const admin = [
  {
    username: "owner",
    email: "owner@admin.com",
    password: "password1234",
    permission: "owner",
  },
  {
    username: "manager",
    password: "password1234",
    email: "manager@admin.com",
    permission: "manager",
  },
  {
    username: "editor",
    password: "password1234",
    email: "editor@admin.com",
    permission: "editor",
  },
  {
    username: "viewer",
    password: "password1234",
    email: "viewer@admin.com",
  },
];

// |===== CATEGORY COLLECTION DATA =====|
const categories = [
  { name: "Plates" },
  { name: "Bowls" },
  { name: "Cups" },
  { name: "Pots" },
];

//  |===== PRODUCT COLLECTION DATA =====|
const products = {
  platesProductNames: [
    "Dinner Plate",
    "Salad Plate",
    "Bread Plate",
    "Dessert Plate",
    "Appetizer Plate",
    "Dinner Plate Set",
    "Salad Plate Set",
    "Bread Plate Set",
    "Dessert Plate Set",
    "Appetizer Plate Set",
    "Dinner Plate Collection",
    "Salad Plate Collection",
    "Bread Plate Collection",
    "Dessert Plate Collection",
    "Appetizer Plate Collection",
  ],
  bowlsProductNames: [
    "Soup Bowl",
    "Salad Bowl",
    "Cereal Bowl",
    "Fruit Bowl",
    "Soup Bowl Set",
    "Salad Bowl Set",
    "Cereal Bowl Set",
    "Fruit Bowl Set",
    "Soup Bowl Collection",
    "Salad Bowl Collection",
    "Cereal Bowl Collection",
    "Fruit Bowl Collection",
    "Soup Bowl Collection",
  ],
  cupsProductNames: [
    "Coffee Cup",
    "Tea Cup",
    "Mug",
    "Coffee Cup Set",
    "Tea Cup Set",
    "Mug Set",
    "Coffee Cup Collection",
    "Tea Cup Collection",
    "Mug Collection",
    "Coffee Cup Collection",
    "Tea Cup Collection",
  ],
  potsProductNames: [
    "Sauce Pot",
    "Soup Pot",
    "Stock Pot",
    "Sauce Pot Set",
    "Soup Pot Set",
    "Stock Pot Set",
    "Sauce Pot Collection",
    "Soup Pot Collection",
    "Stock Pot Collection",
    "Sauce Pot Collection",
    "Soup Pot Collection",
  ],
};

const shortDescription = [
  "A beautiful handmade ceramic piece, perfect for everyday use.",
  "A work of art that you can use every day.",
  "Handmade with love and care.",
  "Something special for your home.",
  "Interesting and unique, just like you.",
  "Eye-catching and unique.",
  "Something Mysterious and beautiful.",
  "Something you'll love.",
  "Something you'll cherish.",
  "Something you'll treasure.",
  "Colorful and inspiring.",
  "A beautiful addition to your kitchen.",
  "Art you can use.",
];

const details =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nis";

// |===== ORDER COLLECTION DATA =====|
const statusSet = ["pending", "completed", "cancelled"];

const firstNameSet = [
  "Chris",
  "John",
  "Sarah",
  "Michael",
  "Michelle",
  "Robert",
  "Jennifer",
  "William",
  "Elizabeth",
  "David",
  "Mary",
];

const lastNameSet = [
  "Smith",
  "Johnson",
  "Williams",
  "Jones",
  "Brown",
  "Davis",
  "Miller",
  "Wilson",
  "Moore",
  "Taylor",
  "Anderson",
  "Thomas",
  "Jackson",
];

const userNames = {
  wordSetOne: [
    "Asteroid",
    "Astronaut",
    "Black-Hole",
    "Comet",
    "Constellation",
    "Cosmos",
    "Dark-Matter",
    "Galaxy",
    "Gravity",
    "Meteor",
    "Milky-Way",
    "Moon",
    "Nebula",
  ],
  wordSetTwo: [
    "Bacon",
    "Biscuit",
    "Burger",
    "Cake",
    "Candy",
    "Cheese",
    "Chips",
    "Chocolate",
    "Cookie",
    "Donut",
    "Fries",
    "Milkshake",
    "Nuggets",
  ],
};

const emailSet = [
  "@gmail.com",
  "@yahoo.com",
  "@hotmail.com",
  "@outlook.com",
  "@icloud.com",
  "@aol.com",
  "@zoho.com",
  "@protonmail.com",
];

module.exports = {
  admin,
  categories,
  products,
  shortDescription,
  details,
  statusSet,
  firstNameSet,
  lastNameSet,
  userNames,
  emailSet,
};
