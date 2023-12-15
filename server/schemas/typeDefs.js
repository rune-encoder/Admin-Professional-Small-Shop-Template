const typeDefs = `#graphql

# |==================== TYPES ====================|
type Admin {
    _id: ID
    username: String!
    email: String!
    #password: String!
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
    category: ID!
    name: String!
    shortDescription: String
    details: String
    price: Float!
    quantity: Int!
    image: ImageInput
    isFeatured: Boolean
}

# |==================== QUERIES ====================|
type Query {
    admin(_id: ID!): Admin
    admins(filters: AdminFilterInput): [Admin]
    categories: [Category]
    product(_id: ID!): Product
    products(filters: ProductFilterInput): [Product]
    order(_id: ID!): Order
    orders(filters: OrderFilterInput): [Order]

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

    createProduct(product: ProductInput!): Product
    updateProduct(_id: ID!, product: ProductInput!): Product
    deleteProduct(_id: ID!): Product
}
`;

module.exports = typeDefs;
