🛒 Full Stack Amazon Clone (MERN)

A fully functional e-commerce web application built using the MERN Stack (MongoDB, Express, React, Node.js).
This project replicates core Amazon functionalities such as user authentication, product management, shopping cart, checkout flow, and an Admin Dashboard.

🚀 Features
🧑‍💻 Customer Features

Browse & Search Products
View products by category (Electronics, Books, Smartphones, etc.) or search for specific items.

Product Details Page
Detailed product view with high-quality images, ratings, and delivery information.

Shopping Cart
Add or remove products, view subtotal, and proceed to checkout.

Checkout Flow
Realistic checkout process with address management and simulated credit card payment.

Order History
Track previous purchases under the Returns & Orders section.

User Profile Management
Manage personal details and default shipping address (stored locally).

🛡️ Admin Dashboard Features

Dashboard Overview
View real-time statistics such as total revenue, total orders, and registered users.

Inventory Management
Perform full CRUD operations (Create, Read, Update, Delete) on products.

Category Management
Add and manage custom product categories dynamically.

Order Management
View all customer orders and update order status
(Processing → Shipped → Delivered).

User Management
View a list of all registered users.

🛠️ Tech Stack
Frontend

React.js

Tailwind CSS

Lucide React (Icons)

Backend

Node.js

Express.js

Database

MongoDB Atlas (Cloud)

State Management

React Context API

📂 Project Structure
amazon-clone/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # UI Components (Header, Banner, Product, etc.)
│   │   ├── Admin.js        # Admin Dashboard
│   │   ├── Checkout.js     # Checkout Logic
│   │   ├── Orders.js       # Order History
│   │   └── ...
│   └── public/             # Static assets (images, logos)
│
└── server/                 # Node/Express Backend
    ├── index.js            # Server entry point & API routes
    └── package.json        # Server dependencies

⚙️ Installation & Setup
✅ Prerequisites

Node.js installed

MongoDB Atlas account (Free tier)

🔧 Backend Setup

Navigate to the server folder:

cd server


Install dependencies:

npm install express mongoose cors dotenv nodemon


Open server/index.js and replace MONGO_URI with your MongoDB Atlas connection string.

Start the backend server:

npx nodemon index.js


✅ You should see: MongoDB Connected Successfully

🎨 Frontend Setup

Open a new terminal and navigate to the client folder:

cd client


Install dependencies:

npm install lucide-react


Start the React app:

npm start


Open in browser:

http://localhost:3000

🔑 Login Credentials
👑 Admin Access

Email: admin@gmail.com

Password: 123456

👉 Access the Admin Panel by clicking “ADMIN” in the header after login.

👤 Customer Access

Sign in using any valid email format (e.g., user@test.com)

A new customer account will be created automatically.

📸 Screenshots

Add screenshots of the homepage, product page, cart, checkout, and admin dashboard here.

🤝 Contributing

Contributions and feature requests are welcome!

Fork the project

Create your feature branch

git checkout -b feature/AmazingFeature


Commit your changes

git commit -m "Add AmazingFeature"


Push to the branch

git push origin feature/AmazingFeature


Open a Pull Request

📝 License

This project is licensed under the MIT License.
See the LICENSE file for more details.
