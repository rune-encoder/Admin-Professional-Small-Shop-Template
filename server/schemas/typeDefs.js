const typeDefs = `#graphql

# |==================== TYPES ====================|
type Admin {
    _id: ID
    username: String!
    email: String!
    #password: Does not return the password
    permission: String!
}

type Shop {
    _id: ID
    name: String!
    moto: String
    address: String
    city: String
    state: String
    zipCode: String
    phoneNumber: String
    email: String

    # !Revisit: Do we need to include the admin here?
    admin: Admin!
}

type Category {
    _id: ID
    name: String!
}

type Image {
    cloudinaryId: String
    url: String
}

type Product {
    _id: ID
    createdAt: String
    category: Category!
    name: String!
    shortDescription: String
    details: String
    price: Float!
    quantity: Int!
    image: Image
    isFeatured: Boolean
    inStock: Boolean
}

type Cart {
    product: Product
    quantity: Int
}

type Order {
    _id: ID
    purchaseDate: String
    products: [Cart]
    totalPrice: Float!
    status: String!
    contactFirstName: String!
    contactLastName: String!
    contactEmail: String!
    contactPhone: String!
    shippingAddress: String!
    paymentDetails: String!
    fullName: String
}

# !Revisit: Checkout 
type Checkout {
    session: ID
}

# <=== AUTHENTICATION: JWT TOKEN ===>
type Auth {
    token: ID!
    admin: Admin
}

# |==================== INPUTS ====================|
input CartInput {
    product: ID
    quantity: Int
}

input ImageInput {
    cloudinaryId: String
    url: String
}

# <=== FILTERS: INPUTS FOR QUERIES ===>
input AdminFilterInput {
    username: String
    email: String
    permission: String
}

input ProductFilterInput {
    createdAt: String
    category: ID
    name: String
    shortDescription: String
    details: String
    price: Float
    quantity: Int
    isFeatured: Boolean
    inStock: Boolean
}

input OrderFilterInput {
    purchaseDate: String
    products: [CartInput]
    totalPrice: Float
    status: String
    contactFirstName: String
    contactLastName: String
    contactEmail: String
    contactPhone: String
    shippingAddress: String
    paymentDetails: String
    fullName: String
}

# <=== INPUTS FOR MUTATIONS ===>
input ProductInput {
    category: ID
    name: String
    shortDescription: String
    details: String
    price: Float
    quantity: Int
    image: [String]
    isFeatured: Boolean
}

# |==================== QUERIES ====================|
type Query {
    getAdmin(_id: ID!): Admin
    getAdmins(filters: AdminFilterInput): [Admin]
    getCategories: [Category]
    getProduct(_id: ID!): Product
    getProducts(filters: ProductFilterInput): [Product]
    getOrder(_id: ID!): Order
    getOrders(filters: OrderFilterInput): [Order]

    # !Revisit: SHOP
    shop: Shop
}

# |==================== MUTATIONS ====================|
type Mutation {
    adminLogin(username: String!, password: String!): Auth
    adminCreate(username: String!, email: String!, password: String!, permission: String!): Admin
    adminUpdate(_id: ID!, username: String, email: String, password: String, permission: String): Admin
    adminDelete(_id: ID!): Admin

    createCategory(name: String!): Category
    updateCategory(_id: ID!, name: String!): Category
    deleteCategory(_id: ID!): Category

    createProduct(input: ProductInput!): Product
    updateProduct(_id: ID!, input: ProductInput!): Product
    deleteProduct(_id: ID!): Product
}
`;

module.exports = typeDefs;
