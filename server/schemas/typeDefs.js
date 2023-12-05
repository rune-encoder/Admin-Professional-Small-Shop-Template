const typeDefs = `#graphql

type Admin {
    _id: ID
    username: String!
    email: String!
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
    admin: Admin

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
    totalPrice: Float
    status: String
    contactFirstName: String
    contactLastName: String
    contactEmail: String
    contactPhone: String
    shippingAddress: String
    paymentDetails: String

    #calculateTotalPrice: Float
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

# TODO: The input type for the products being passed to the checkout session

type Query {
    admin: Admin
    categories: [Category]
    product(_id: ID!): Product
    products(category: ID, name: String): [Product]
    order(_id: ID!): Order
    orders: [Order]

    shop: Shop
}

type Mutation {
    adminLogin(username: String!, password: String!): Auth
}
`;

module.exports = typeDefs;
