<h1 id="top">Eventum - Back end</h1>

Eventum is an application designed to optimize and automate the process of creating, managing, and confirming events at **Marina de Empresas**. Its main purpose is to improve operational efficiency and provide a more convenient user experience for participants who wish to attend our events.

## Table of Contents

1. [Structure](#1-structure)
2. [Installation](#2-installation)
   - [Main Dependencies](#21-main-dependencies)
   - [Secondary Dependencies](#22-secondary-dependencies)
   - [Development Dependencies](#23-development-dependencies)
3. [Usage](#3-usage)
   - [Start the Server](#31-start-the-server)
   - [Make HTTP Requests](#32-make-http-requests)
4. [Configuration](#4-configuration)
5. [Status](#5-status)
6. [Requirements](#6-requirements)
7. [FAQ](#7-faq)
8. [Relevant Links](#8-relevant-links)
9. [README Update](#9-readme-update)
10. [Contribution](#10-contribution)
11. [Credits](#11-credits)

## 1. Structure

The choice to structure our project using the Model-View-Controller (MVC) pattern is based on the pursuit of an efficient and visually organized approach for our application. MVC divides the application into three core components: the Model, responsible for data management and business logic; the View, handling visual representation and the user interface; and the Controller, managing control logic and user interaction. This separation of responsibilities not only simplifies collaborative development but also enhances maintainability by enabling developers to work on specific parts of the project without affecting the whole. Furthermore, it facilitates code reuse, potentially speeding up development, and ensures that the application is scalable and adaptable as it evolves, resulting in a more robust and visually appealing final product. Ultimately, the choice of MVC contributes to a more efficient and successful development experience for our project.

<div align="right">
  <a href="#top">↑ Back to the top</a>
</div>

## 2. Installation

### 2.1. Main Dependencies

**Express** 

Express is a highly popular and widely used web application framework in the Node.js ecosystem. Express simplifies the creation of web servers and APIs by providing an organized structure for handling routes, HTTP requests, and responses. It facilitates the building of efficient and scalable web applications.

```
npm install express
```

**Sequelize**

Sequelize is an Object-Relational Mapping (ORM) library that simplifies interaction with relational databases in Node.js. Sequelize abstracts the complexity of writing SQL queries directly and allows developers to interact with the database through JavaScript models and objects. It makes creating, reading, updating, and deleting data in a SQL database more object-oriented.

```
npm install sequelize
```

**mysql2**

Database drivers are necessary for connecting and communicating with a specific database. In the context of Sequelize, you need a compatible database driver for Sequelize to connect to and manage your SQL database. In this case, mysql2 is mentioned because it is commonly used for MySQL databases. Depending on the database you are using (e.g., PostgreSQL, SQLite, etc.), you will need to install the corresponding driver.

```
npm install mysql2
```

Estas dependencias son esenciales para construir una aplicación de Node.js que interactúa de manera eficiente con una base de datos SQL utilizando Sequelize y para crear un servidor web o una API utilizando Express. Simplifican el desarrollo al proporcionar herramientas y abstracciones que ahorran tiempo y esfuerzo a los desarrolladores.

<div align="right">
  <a href="#top">↑ Back to the top</a>
</div>

### 2.2. Secondary Dependencies

Below is a list of dependencies used in this backend project along with a brief explanation of their functionality and how to install them.

1. **axios** (`^1.5.0`): Axios is a library for making HTTP requests in Node.js and the browser. It can be installed with:

```
npm install axios
```

2. **bcryptjs** (`^2.4.3`): Bcryptjs is a library for secure password hashing. It can be installed with:

```
npm install bcryptjs
```

3. **cors** (`^2.8.5`): Cors is an Express middleware that allows communication between different domains. It can be installed with:

```
npm install cors
```

4. **dotenv** (`^16.3.1`): Dotenv is used to load environment variables from a `.env` file. This is useful for storing sensitive configurations. It can be installed with:

```
npm install dotenv
```

5. **jsonwebtoken** (`^9.0.2`): Jsonwebtoken is used to generate and verify JSON Web Tokens (JWTs) used in authentication. It can be installed with:

```
npm install jsonwebtoken
```

6. **multer** (`^1.4.5-lts.1`): Multer is middleware for handling forms and file uploads in Express. It can be installed with:

```
npm install multer
```

7. **nodemailer** (`^6.9.5`): Nodemailer is used to send emails from a Node.js application. It can be installed with:

```
npm install nodemailer
```

8. **sequelize-cli** (`^6.6.1`): Sequelize CLI is a command-line tool for Sequelize. It can be installed with:

```
npm install sequelize-cli
```

9. **swagger-jsdoc** (`^6.2.8`): Swagger JSDoc is used to generate Swagger documentation from JSDoc comments in your code. It can be installed with:

```
npm install swagger-jsdoc
```

10. **swagger-ui-express** (`^5.0.0`): Swagger UI Express provides a user interface for exploring and testing generated Swagger documentation. It can be installed with:

```
npm install swagger-ui-express
```

11. **tedious** (`^16.4.0`): Tedious is a driver for Microsoft SQL Server in Node.js. It can be installed with:

```
npm install tedious
```

12. **uuidv4** (`^6.2.13`): Uuidv4 is used to generate universally unique identifiers (UUIDs) following the UUIDv4 specification. It can be installed with:

```
npm install uuidv4
```

13. **ws** (`^8.14.2`): WS provides WebSocket functionality for both client and server in Node.js. It can be installed with:

```
npm install ws
```

<div align="right">
  <a href="#top">↑ Back to the top</a>
</div>

### 2.3 .Development Dependencies

Below is a list of development dependencies used in this project along with a brief explanation of their functionality and how to install them.

1. **eslint** (`^8.49.0`): Eslint is a linting tool that helps maintain clean and consistent JavaScript code. It can be installed with:

```
npm install -d eslint
```

2. **jest** (`^29.7.0`): Jest is a unit testing framework for JavaScript. It is used to write and run unit tests for your code. It can be installed with:

```
npm install -d jest
```

3. **nodemon** (`^3.0.1`): Nodemon is a tool that watches for changes in your project files and automatically restarts the Node.js server when changes are detected. It can be installed with:

```
npm install -d nodemon
```

4. **supertest** (`^6.3.3`): Supertest is a library used for performing integration tests on HTTP/Express applications. It can be installed with:

```
npm install -d supertest
```

Make sure to run these commands in your project directory to install the dependencies correctly.

<div align="right">
  <a href="#top">↑ Back to the top</a>
</div>

## 3. Usage

Once you have installed the main and secondary dependencies in your project, you can start using the Eventum backend. Here are the basic steps for using it:

### 3.1. Start the Server

To start the Eventum server, you can use the following command:

```
npm start
```

This command will start the server and get it up and running. Make sure the server is running before making any requests.

### 3.2. Make HTTP Requests

The Eventum backend exposes various API endpoints that you can use to interact with the application. Here are some examples of HTTP requests you can make:

#### Get all Events

```
GET http://localhost:3001/events/getall
```

#### Create an Event

```
POST http://localhost:3001/events/create

Body JSON:

{
    "dateTime": 10/12/2023,
    "duration_min": 60,
    "type": "event",
    "banner": "test.jpg",
    "description": "Come see the EDEM musical. Free admission!!!",
    "title": "Musical".
}
```

#### Update an Event

```
PUT http://localhost:3001/events/update/1

Body JSON:

{
    "dateTime": 12/12/2023,
    "duration_min": 90,
    "type": "event",
    "banner": "test.jpg",
    "description": "Come see the EDEM musical. Free admission!!!",
    "title": "Musical".
}
```

#### Delete an Event

```
DELETE http://localhost:3001/events/delete/1
```

If you need more information about the API, feel free to visit our [Postman documentation](https://grey-meadow-86508.postman.co/workspace/poppaBack~40055b61-3f05-4b79-852e-054c752905f0/collection/28231572-60a28a80-ae6a-46a1-a63b-db457685977e?action=share&creator=28231572&active-environment=28231572-0744ac4e-249a-4509-8a21-792b6de4c867).

<div align="right">
  <a href="#top">↑ Back to the top</a>
</div>

## 4. Configuration

### 4.1 Database Connection

In order to establish a connection to the MySQL database, it is necessary to first configure the credentials for proper connectivity. This involves defining the database details such as the host address, username, password, and database name. All the required parameters for the connection can be found in the example.env file, and all the user needs to do is set up the connection with their own data.

### 4.2 Deployment

Our project has been deployed on the Amazon Web Service (AWS) platform due to its flexibility and reliability. It offers a wide range of services and a global infrastructure to enhance performance and availability. Here are the steps we had to take to successfully deploy the project:

1. **Assign Permissions to the PEM File**

   Use the chmod command to assign specific permissions to the PEM file located in the AWS folder of the repository. This enhances security.

2. **Connect to the EC2 Instance**

   Utilize SSH to connect to your EC2 instance. Specify the PEM key and the IP address or public domain name of the EC2 instance.

3. **Launch the Backend with PM2**

   Once connected to the EC2 instance, use PM2 to start your Node.js application as a daemon process. This ensures that the application runs in the background and automatically restarts in case of errors.

4. **Nginx Configuration**

   Configure Nginx to redirect incoming web traffic to your Node.js application. Create a configuration file in /etc/nginx/sites-available/ with the appropriate settings. Then, create a symbolic link in sites-enabled and restart Nginx to apply the changes.

### 4.3 Credentials

The project must have an .env file, which will contain all the environment variables used for both database connection and project deployment configuration. Among our files, you will find an example.env file that you can use as a template to input your own data if you wish to continue the development of this project.

<div align="right">
  <a href="#top">↑ Back to the top</a>
</div>

## 5. Status

As of now, the project is in active development, with the following recent updates:

**Sep 27, 2023**

- Resolved User Data Controller bug.

**Sep 26, 2023**

- Fixed issue with image uploads using multer. Enhanced code security and cleanliness.
- Implemented dash controller.

**Sep 25, 2023**

- Implemented dynamic QR code reader.
- Project deployment on **AWS**.

**Sep 24, 2023**

- Minor bug fixes.
- Added a QR code generator.
- Updated and fixed CORS configuration.

**Sep 23, 2023**

- Added necessary endpoints for the front end.

**Sep 22, 2023**

- Fixed minor bugs in endpoints.
- Modified some endpoints for front-end usage.

**Sep 20, 2023**

- Implemented new validations.
- Created isAdmin feature.

**Sep 18, 2023**

- Created new controllers and CRUD operations.
- Solved issues with relationships and tables.

**Sep 16, 2023**

- Created the database with models and migrations.
- Added relationships between tables.

**Sep 15, 2023**

- Project started by installing dependencies.

<div align="right">
  <a href="#top">↑ Back to the top</a>
</div>

## 6. Requirements

**Minimum Requirements:**

1. **Operating System:**
   - No specific operating system is required; the project is compatible with various operating systems such as Windows, macOS, and various Linux distributions.

2. **Node.js:**
   - You must have Node.js installed on your system. The latest LTS version of Node.js is recommended.

3. **Database:**
   - This project uses a MySQL database. Ensure you have access to a MySQL instance or set it up as per the project's specifications.

4. **Web Browser:**
   - To access the API documentation and test the functionalities, it's recommended to use a modern web browser like Google Chrome or Mozilla Firefox.

5. **Node.js Dependencies:**
   - Install project dependencies using the `npm install` command in the project's root to ensure that all required libraries are available.

6. **Code Editor (Optional):**
   - To customize the project or make code modifications, you can use a code editor of your choice, such as Visual Studio Code or Sublime Text.


<div align="right">
  <a href="#top">↑ Back to the top</a>
</div>

## 7. FAQ

- **How do I start the project?**

You can start the project by running the command `npm start` or `npm run dev` if you are in development mode. Make sure you have installed the dependencies beforehand with `npm install`.

- **Where do I configure the database credentials?**

You need to configure the database credentials in a file named `.env` at the root of the project. You can use the `example.env` file as a reference.

- **How do I access the API documentation?**

You can access the API documentation through [Postman documentation](https://grey-meadow-86508.postman.co/workspace/poppaBack~40055b61-3f05-4b79-852e-054c752905f0/collection/28231572-60a28a80-ae6a-46a1-a63b-db457685977e?action=share&creator=28231572&active-environment=28231572-0744ac4e-249a-4509-8a21-792b6de4c867).

- **What should I do if I encounter an error when starting the project?**

If you encounter errors when starting the project, make sure you have installed all the dependencies with `npm install`, and that the database credentials in the `.env` file are correct. Also, verify that Node.js is in the appropriate version.

- **What should I do if I want to deploy the project in production?**

To deploy the project in production, you need to set up a web server (such as Nginx) and ensure that production credentials are configured in the `.env` file. Additionally, make sure the database is configured correctly in the production environment.

- **How can I customize the routes and controllers for my specific application?**

You can customize the routes and controllers by modifying the source code in the `src` folder. Add or modify routes in `src/routes` and controllers in `src/controllers` according to your needs.

- **What can I do if I need additional support or encounter specific issues?**

If you need additional support or encounter specific issues related to the project, you can seek help in the official documentation of the dependencies used or in development forums related to Node.js and MySQL. You can also reach out to the project's development team if they are available.

<div align="right">
  <a href="#top">↑ Back to the top</a>
</div>

## 8. Relevant links
**Download**

[NodeJS](https://nodejs.org/es/download)

[MySQL](https://www.mysql.com/downloads/)


<div align="right">
  <a href="#top">↑ Back to the top</a>
</div>

## 9. README update

**27/09/2023**
Creation of the first Readme

<div align="right">
  <a href="#top">↑ Back to the top</a>
</div>

## 10. Contribution

We welcome contributions from the community to help improve Eventum. If you wish to contribute, please follow these guidelines:

1. **Fork the Repository**

   To get started, fork the Eventum repository to your GitHub account. This will create a copy of the project that you can freely experiment with.

2. **Clone the Repository**

   Clone your forked repository to your local development environment using the following command (replace `[your_username]` with your GitHub username):

   ```
   git clone https://github.com/[your_username]/Eventum.git
   ```

**Create a new branch**
Before making any changes, create a new branch for your contribution. This helps keep the main branch clean and allows for a focused contribution:

```
git checkout -b my-contribution
```

**Make Changes and Commit**
Make the necessary changes or additions to the codebase. Once you're satisfied with your changes, commit them using descriptive commit messages:

```
git commit -m "Add feature: [your feature description]"
```

**Push to Your Fork**
Push your changes to your forked repository on GitHub:

```
git push origin my-contribution
```

<div align="right">
  <a href="#top">↑ Back to the top</a>
</div>

## 11. Credits
**Special Thanks to the Development Team**

I want to express my profound gratitude to the entire development team, as well as every member of the design team, the talented data experts, and the dedicated cybersecurity professionals. Your collaboration and collective effort have made it possible for this project to become a reality in record time.

The experience of working on this project has been truly unforgettable. We cannot ignore that it was also a challenging and stressful period, but thanks to your hard work and dedication, the results achieved have far exceeded our initial expectations.

Each one of you has played a crucial role in this collective achievement. The development team, with its technical expertise and tireless commitment, has turned our ideas into concrete and functional solutions. The design team has added a touch of creativity and aesthetics that has taken our platform to a higher level. Data specialists have brought clarity and meaning to our numbers, and the cybersecurity team has ensured the integrity and protection of our platform.

The challenges we faced during this project not only showcased your professionalism but also your resilient spirit and ability to overcome obstacles. Each of you contributed to creating a positive and collaborative working environment that was essential to our success.

I cannot express how grateful I am for your commitment and dedication. This project is a testament to what we can achieve when we work together as a team and strive for common goals.

In summary, thank you very much to all of you for your hard work and dedication. This project would not be possible without each one of you. I am excited about what the future holds, and I am confident that we will continue to achieve great things together.

**Our fullstack team**

<div style="display: flex; justify-content: center; align-items: center;">
  <div style="text-align: center; margin-right: 20px;">
    <img src="https://avatars.githubusercontent.com/u/134106748?v=4" alt="Sara Oriola" width="50" height="50" style="border-radius: 50%;">
    <br>
    <a href="https://github.com/saraoriola">Sara Oriola</a>
  </div>

  <div style="text-align: center; margin-right: 20px;">
    <img src="https://avatars.githubusercontent.com/u/45803399?v=4" alt="Patricia Gonzalez" width="50" height="50" style="border-radius: 50%;">
    <br>
    <a href="https://github.com/patrigarcia">Patricia Gonzalez</a>
  </div>

  <div style="text-align: center; margin-right: 20px;">
    <img src="https://avatars.githubusercontent.com/u/102881802?v=4" alt="Victor Macedo" width="50" height="50" style="border-radius: 50%;">
    <br>
    <a href="https://github.com/victorcodigos">Victor Macedo</a>
  </div>

  <div style="text-align: center;">
    <img src="https://avatars.githubusercontent.com/u/133784147?v=4" alt="Adrián Ramírez" width="50" height="50" style="border-radius: 50%;">
    <br>
    <a href="https://github.com/AdrianRgGit">Adrián Ramírez</a>
  </div>
</div>



<div align="right">
  <a href="#top">↑ Back to the top</a>
</div>
