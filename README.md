# Admin-Professional-Small-Shop-Template [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<br> <p align="center">
[![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)](https://www.w3schools.com/html/)
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

Admin Professional Small Shop Template is a comprehensive front-end web application template designed for hobby crafters, creative project creators, or small business owners who manufacture and sell products.

It features an administrative login that enables admins to efficiently manage their inventory and orders on-the-go, particularly catering to mobile users to ensure seamless management directly from a smartphone. Updates are immediately reflected on the presented main shop or hobbyist website where clients can see any updates immediately.

## Table of Contents

- [User Story](#user-story)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Quick Start](#quick-start)
- [Detailed Usage Instructions](#detailed-usage-instructions)
- [Contribution](#contribution)
- [License](#license)

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

## Features

This template is designed to provide a comprehensive suite of tools for small shop administrators and hobby crafters. Here are some of the key features that make managing your online shop efficient and user-friendly:

### Complete Management of Products and Categories

- **Full CRUD Capabilities**: Create, Read, Update, and Delete (CRUD) functionalities for products and categories. Changes made in the admin portal are immediately reflected on the shop site, keeping your product listings and categories up-to-date in real-time.

### Advanced Admin Control

- **Admin Management**: If you are designated as the owner, you can manage other admin roles, adjusting their privileges as necessary. This feature allows for the tailored distribution of responsibilities among team members.

### Order Tracking and Management

- **Order Status Updates**: View and modify the status of orders with options such as pending, completed, and canceled. This allows for meticulous management of order processing from a single dashboard.

### Enhanced Data Interaction Tools

- **Dynamic Data Tools**: Leverage powerful filtering, sorting, and viewing capabilities to manage large sets of data efficiently. These tools are integrated with state management solutions to ensure a responsive and seamless user experience.

### Analytics

- **Traffic and Engagement Metrics**: Gain insights into your shop's performance with analytics features. Track how many people visit your site and view specific products, enabling data-driven decisions to boost engagement and sales.

These features are designed to enhance the functionality and usability of your online presence, ensuring you have the tools you need to manage your business effectively.

## Quick Start Guide

Follow these steps to quickly set up and start using the Admin Template:

### Prerequisites

- Ensure **MongoDB** is installed and running on your system. [Get started with MongoDB](https://www.mongodb.com/try/download/community).
- Sign up for a **Cloudinary** account to manage image uploads. [Get started with Cloudinary](https://cloudinary.com/).

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/rune-encoder/Admin-Professional-Small-Shop-Template
   ```

2. **Install Dependencies:**
   Run `npm install` in the `root`, `server`, and `client` directories.

3. **Configure Environment:**
   Create a `.env` file in the `root` directory with the following:

   ```
   CLOUD_NAME=Cloudinary_ID_VALUE
   CLOUD_API_KEY=API_KEY_VALUE
   CLOUD_API_SECRET=API_SECRET_VALUE
   JWT_SECRET=JWT_SECRET_VALUE
   ```

4. **Set Up Cloudinary:**
   Navigate to the Cloudinary dashboard and **create an upload preset named Shop-Template** under the settings.

5. **Seed the Database:**
   Run `npm run seed` from the `root` directory to populate your database with initial data.

6. **Start the Server:**
   Execute `npm run dev` to start both backend and frontend servers concurrently.

7. **Log In:**
   Use predefined credentials such as _owner_, _manager_, _editor_ or _viewer_ with the password _password1234_ to access different admin roles.

## Detailed Usage Instructions

For those who need more detailed guidance or want to understand the setup process more deeply, this section provides comprehensive instructions and additional context on setting up and using the Admin Template.

### Prerequisites Details

Ensure you have **MongoDB** installed and operational, as it is crucial for database operations:

- [Download MongoDB here](https://www.mongodb.com/try/download/community) if it's not installed.
- Alternatively, you can use MongoDB Atlas for a cloud-based solution, which simplifies some of the local setup requirements.

Setting up a **Cloudinary** account is essential for handling image uploads:

- [Sign up for Cloudinary](https://cloudinary.com/) to obtain the necessary API credentials.
- This account will manage all media uploads, crucial for product and category images.

### Cloudinary Setup Details

To manage and organize photos uploaded to Cloudinary effectively, it's essential to set up an upload preset. This preset helps keep your project's media files organized, especially if you use Cloudinary for multiple projects. Follow these steps to create an upload preset named "Shop-Template" which the application requires for proper integration:

#### Steps to Create an Upload Preset in Cloudinary:

1. **Log In to Your Cloudinary Account:**

   - Navigate to the Cloudinary dashboard.

2. **Access Settings:**

   - Find the **_Settings_** option, typically located at the bottom left side of the sidebar.

3. **Navigate to the Upload Tab:**

   - Click on the **_Upload_** tab within the Settings menu.

4. **Create the Upload Preset:**

   - Scroll down to the **_Upload Presets_** section and click on **_Add Upload Preset_**.

5. **Configure Your Upload Preset:**

   - In the **_Upload preset name_** field, enter `Shop-Template`.
   - Set the **_Folder_** name to `Shop-Template` to ensure all uploaded files go into this specific directory.
   - Leave all other settings at their default values unless specific changes are required for your project.

6. **Save the Preset:**
   - Click **Save** to finalize the creation of your upload preset.

## Contribution

Contributions are welcome! Please fork the repository and open a pull request with your improvements. Ensure your PR adheres to the coding standards and guidelines of the project.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  
**The MIT License:** Please refer to the LICENSE in the repository for more details.
