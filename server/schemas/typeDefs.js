const typeDefs = `#graphql

type Admin {
    _id: ID
    username: String!
    email: String!
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

    #!Revisit: Do we need to include the admin here?
    admin: Admin!

    products: [Product]
    categories: [Category]
    #guests: [Guest]
    orders: [Order]
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
    quantity: Int
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
    status: String
    contactFirstName: String!
    contactLastName: String!
    contactEmail: String!
    contactPhone: String!
    shippingAddress: String!
    paymentDetails: String!

    fullName: String
}

type Checkout {
    session: ID
}

type Auth {
    token: ID!
    admin: Admin
}

# ! Revisit: Response for Delete Mutation
type Response {
    data: String
    errors: [String]
}

# |=============== INPUTS ===============|
input CartInput {
    product: ID
    quantity: Int
}

input OrderFilterInput {
    _id: ID
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

# |=============== QUERIES ===============|
type Query {
    admin: Admin
    categories: [Category]
    product(_id: ID!): Product
    products(category: ID, name: String): [Product]
    order(_id: ID!): Order
    orders(filters: OrderFilterInput): [Order]

    shop: Shop
}

# |=============== MUTATIONS ===============|
type Mutation {
    adminLogin(username: String!, password: String!): Auth
}
`;

module.exports = typeDefs;
