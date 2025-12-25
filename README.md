
                FULL STACK AMAZON CLONE (MERN)
==============================================================

A FULLY FUNCTIONAL E-COMMERCE WEB APPLICATION BUILT USING THE
MERN STACK (MONGODB, EXPRESS, REACT, NODE.JS).

THIS PROJECT REPLICATES CORE AMAZON FEATURES INCLUDING
AUTHENTICATION, PRODUCT MANAGEMENT, SHOPPING CART,
CHECKOUT FLOW, ORDER TRACKING, AND AN ADMIN DASHBOARD.

=====================================================================


-------------------------------
            FEATURES
-------------------------------

[ CUSTOMER FEATURES ]

• BROWSE & SEARCH PRODUCTS BY CATEGORY
  (ELECTRONICS, BOOKS, SMARTPHONES, ETC.)

• PRODUCT DETAILS PAGE
  IMAGES, RATINGS, PRICE, AND DELIVERY INFO

• SHOPPING CART
  ADD / REMOVE ITEMS, UPDATE QUANTITY, VIEW SUBTOTAL

• CHECKOUT FLOW
  ADDRESS MANAGEMENT + SIMULATED CARD PAYMENT

• ORDER HISTORY
  VIEW PREVIOUS ORDERS IN "RETURNS & ORDERS"

• USER PROFILE MANAGEMENT
  MANAGE PERSONAL DETAILS & SHIPPING ADDRESS


[ ADMIN DASHBOARD FEATURES ]

• DASHBOARD OVERVIEW
  REAL-TIME STATS (REVENUE, ORDERS, USERS)

• INVENTORY MANAGEMENT
  FULL CRUD OPERATIONS FOR PRODUCTS

• CATEGORY MANAGEMENT
  ADD & MANAGE CUSTOM PRODUCT CATEGORIES

• ORDER MANAGEMENT
  STATUS FLOW:
  PROCESSING → SHIPPED → DELIVERED

• USER MANAGEMENT
  VIEW ALL REGISTERED USERS


-------------------------------
            TECH STACK
-------------------------------

FRONTEND
- REACT.JS
- TAILWIND CSS
- LUCIDE-REACT (ICONS)

BACKEND
- NODE.JS
- EXPRESS.JS

DATABASE
- MONGODB ATLAS (CLOUD)

STATE MANAGEMENT
- REACT CONTEXT API


-------------------------------
        INSTALLATION & SETUP
-------------------------------

[ PREREQUISITES ]

- NODE.JS INSTALLED
- MONGODB ATLAS ACCOUNT (FREE TIER)


[ BACKEND SETUP ]

$ cd server
$ npm install express mongoose cors dotenv nodemon

- OPEN server/index.js
- REPLACE MONGO_URI WITH YOUR OWN CONNECTION STRING

$ npx nodemon index.js

EXPECTED OUTPUT
✓ MongoDB Connected Successfully


[ FRONTEND SETUP ]

$ cd client
$ npm install lucide-react
$ npm start

OPEN IN BROWSER
http://localhost:3000


-------------------------------
         LOGIN CREDENTIALS
-------------------------------

[ ADMIN ACCESS ]

EMAIL    : admin@gmail.com
PASSWORD : 123456

NOTE
CLICK "ADMIN" IN HEADER AFTER LOGIN


[ CUSTOMER ACCESS ]

- LOGIN WITH ANY VALID EMAIL
  (e.g., user@test.com)

- ACCOUNT IS CREATED AUTOMATICALLY


-------------------------------
            SCREENSHOTS
-------------------------------

ADD SCREENSHOTS OF
- HOMEPAGE
- PRODUCT LISTING
- PRODUCT DETAILS
- SHOPPING CART
- CHECKOUT PAGE
- ADMIN DASHBOARD


-------------------------------
           CONTRIBUTING
-------------------------------

1. FORK THE PROJECT
2. CREATE FEATURE BRANCH
   $ git checkout -b feature/AmazingFeature
3. COMMIT CHANGES
   $ git commit -m "Add AmazingFeature"
4. PUSH TO BRANCH
   $ git push origin feature/AmazingFeature
5. OPEN A PULL REQUEST


-------------------------------
              LICENSE
-------------------------------

LICENSE : MIT
SEE LICENSE FILE FOR DETAILS


=====================================================================
                         END OF DOCUMENT
=====================================================================
