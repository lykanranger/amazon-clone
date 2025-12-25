Full Stack Amazon Clone

A fully functional e-commerce web application built using the MERN Stack (MongoDB, Express, React, Node.js). This project replicates core Amazon functionalities, including user authentication, product management, shopping cart, checkout, and a comprehensive Admin Dashboard.

🚀 Features

🛒 Customer Features

Browse & Search: View products by category (Electronics, Books, Smartphones, etc.) or search for specific items.

Product Details: Detailed product view with high-quality images, ratings, and delivery info.

Shopping Cart: Add/remove items, view subtotal, and proceed to checkout.

Checkout Flow: Realistic checkout form with address management and simulated credit card payment processing.

Order History: Track past orders in the "Returns & Orders" section.

User Profile: Manage personal details and default shipping address (persisted locally).

🛡️ Admin Dashboard

Dashboard Overview: View real-time statistics (Total Revenue, Orders, Users).

Inventory Management: Full CRUD (Create, Read, Update, Delete) operations for products.

Category Management: Add custom product categories dynamically.

Order Management: View all customer orders and update their status (e.g., Processing -> Shipped -> Delivered).

User Management: View list of registered users.

🛠️ Tech Stack

Frontend: React.js, Tailwind CSS, Lucide React (Icons)

Backend: Node.js, Express.js

Database: MongoDB Atlas (Cloud)

State Management: React Context API

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
    ├── index.js            # Server entry point & API Routes
    └── package.json        # Server dependencies


⚙️ Installation & Setup

Prerequisites

Node.js installed on your machine.

A MongoDB Atlas account (free tier works).

1. Backend Setup

Navigate to the server folder:

cd server


Install dependencies:

npm install express mongoose cors dotenv nodemon


Open server/index.js and replace the MONGO_URI with your own MongoDB connection string.

Start the server:

npx nodemon index.js


You should see: ✅ MongoDB Connected Successfully

2. Frontend Setup

Open a new terminal and navigate to the client folder:

cd client


Install dependencies:

npm install lucide-react
# (And any other dependencies if listed in package.json)


Start the React app:

npm start


Open http://localhost:3000 in your browser.

🔑 Login Credentials

Admin Access

Email: admin@gmail.com

Password: 123456

Access the Admin Panel by clicking the "ADMIN" link in the header after logging in.

Customer Access

You can sign in with any valid email format (e.g., user@test.com) to create a new customer account automatically.

📸 Screenshots

(You can add screenshots of your project here)

🤝 Contributing

Contributions, issues, and feature requests are welcome!

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📝 License

Distributed under the MIT License. See LICENSE for more information.
