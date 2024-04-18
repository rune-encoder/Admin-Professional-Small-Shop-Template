# Admin-Professional-Small-Shop-Template [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<br> <p align="center">
[![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)](https://handlebarsjs.com/)
[![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/Overview.en.html)
[![SASS](https://img.shields.io/badge/Sass-CC6699.svg?style=for-the-badge&logo=Sass&logoColor=white)](https://sass-lang.com/documentation/)
[![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics)
[![React](https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black)](https://react.dev/)
[![Redux](https://img.shields.io/badge/Redux-764ABC.svg?style=for-the-badge&logo=Redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Express](https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white)](https://expressjs.com/)
[![GraphQL](https://img.shields.io/badge/GraphQL-E10098.svg?style=for-the-badge&logo=GraphQL&logoColor=white)](https://graphql.org/)
[![Apollo GraphQL](https://img.shields.io/badge/Apollo%20GraphQL-311C87.svg?style=for-the-badge&logo=Apollo-GraphQL&logoColor=white)](https://www.apollographql.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-880000.svg?style=for-the-badge&logo=Mongoose&logoColor=white)](https://mongoosejs.com/docs/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248.svg?style=for-the-badge&logo=MongoDB&logoColor=white)](https://www.mongodb.com/)
[![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![Node.js](https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en)

</p>

> **Note: Please note, as the project is in the alpha stage, features are being updated regularly**.

**[Admin Template Preview Video](https://www.youtube.com/watch?v=9j86O2YOHY0)**
<br> <p align="center"> [![Admin Template Preview Video](https://img.youtube.com/vi/9j86O2YOHY0/0.jpg)](https://www.youtube.com/watch?v=9j86O2YOHY0)

</p>

## Description

Admin-Professional-Small-Shop-Template is a comprehensive front-end web application template designed for hobby crafters, creative project creators, or small business owners who manufacture and sell products. It features an administrative login that enables admins to efficiently manage their inventory and orders on-the-go, particularly catering to mobile users to ensure seamless management directly from a smartphone. These changes will immediately reflect on the presented main shop or hobbist website where clients can see any updates immediately.

## Table of Contents

- [User Story](#user-story)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [Contribution](#contribution)
- [License](#license)
- [Screenshots](#screenshots)

## User Story

**As a crafter/artisan/creative entrepreneur:**

- **I want** a simple web interface that allows me to manage my products and orders easily from my mobile device.
- **I want** to see analytics of views of my site and views on my products.
- **So that** I can update my product listings, manage categories, track orders, and view analytics on-the-go, ensuring that my customers always have access to my latest offerings and updates.

## Technologies Used

The project leverages the following technologies:

- **Frontend:** React, Redux, Apollo Client, Embla Carousel React, React Icons
- **Backend:** Node.js, Express, Apollo Server Express, GraphQL, Mongoose
- **Authentication:** bcrypt, jsonwebtoken
- **Database:** MongoDB
- **Styling:** SASS, Vite
- **Development Tools:** ESLint, Stylelint, Nodemon, concurrently

## Usage

To properly set up and start using the Admin-Professional-Small-Shop-Template, follow these detailed steps:

### 1. Prerequisites

- **MongoDB Installed:** Ensure you have **MongoDB** installed and running on your system. If you don't have MongoDB installed, you can download it from the official MongoDB website or use a MongoDB cloud service like MongoDB Atlas.
  [**Get started with MongoDB**](https://www.mongodb.com/try/download/community)

- **Cloudinary Account:** You will need to set up a cloudinary account to use the upload and delete images feature, Sign up for a free Cloudinary account. Once registered, you will receive the credentials needed to configure your environment variables.  
  [**Get started with Cloudinary**](https://cloudinary.com/)

### 2. Clone the repository

Clone the repository to your local machine using the following command:

```bash
git clone [https://github.com/rune-encoder/Admin-Professional-Small-Shop-Template]
```

### 3. Install dependencies:

- From your `root` directory, run `npm install`.
- Navigate to the `server` directory and run `npm install`.
- Navigate to the `client` directory and perform the same operation.
- Ensure you have a `package-log.json` file on your `root`, `client`, and `server` directory after installation to verify that all dependencies have been correctly installed.

### 4. Seed the database with test data:

_Note: Ensure MongoDB is installed..._

- To seed the database, run `npm run seed` from the `root` directory.

### 5. Set up a `.env` file for Cloudinary and JWT Secret:

- You will need a `.env` file in the `root` directory to have access to upload or delete images in the cloudinary API.
- You will need the cloudinary id, cloudinary api key, and cloudinary api secret. Remember to keep sensitive information safe and private.
- For the JWT Secret that is any string you intend to use as the secret for JWT.
- The `.env` file should look like this.

```
CLOUD_NAME=CLOUDINARY_ID_VALUE
CLOUD_API_KEY=API_KEY_VALUE
CLOUD_API_SECRET=API_SECRET_VALUE
JWT_SECRET=JWT_SECRET_VALUE
```

### 5. Start the development server:

- Using `npm run dev` which concurrently runs both backend and frontend developments servers.

### 6. Login:

- In the seeded data there are preset admin users.
- They each have different privilages and access.
- Usernames are `owner`, `manager`, `editor`, and `viewer`.
- Default passwords for all seeded test users is `password1234`

This setup will allow you to make changes to the template and see updates in real-time, facilitating development and customization of the shop to your needs.

## Contribution

Contributions are welcome! Please fork the repository and open a pull request with your improvements. Ensure your PR adheres to the coding standards and guidelines of the project.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  
**The MIT License:** Please refer to the LICENSE in the repository for more details.

## Screenshots
