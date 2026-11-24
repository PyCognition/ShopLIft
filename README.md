# ShopLIft — AI-Powered E-Commerce Website

ShopLIft is a responsive, eight-page, multi-category marketplace demonstration built with HTML5, CSS3 and vanilla JavaScript. It is designed for a beginner AI-powered web development assignment and can be hosted as a static site using GitHub Pages.

## Store concept

**ShopLIft — Good finds. Better everyday.**

Categories: Electronics, Fashion, Home & Kitchen, Beauty, Books & Stationery, and Sports & Fitness. Product prices use Indian Rupees (₹).

## Pages

1. `index.html` — home, category links and featured products
2. `products.html` — search, category filtering and sorting
3. `product.html` — product details (`?id=product-id`)
4. `cart.html` — add/remove/update items and totals
5. `checkout.html` — validated demo delivery form and sample order summary
6. `about.html` — project and brand information
7. `contact.html` — validated demonstration contact form
8. `login.html` — login and signup form demonstrations

## Files

- `styles.css` — shared responsive styling
- `script.js` — product catalogue, search/filter/sort, cart, localStorage, form handling and navigation
- `assets/images/` — locally hosted SVG product illustrations
- `ShopLIft_AI_Development_Prompt.txt` — the master prompt used to define the project requirements

## Run locally in VS Code

1. Extract the ZIP file.
2. Open the extracted `ShopLIft_Website` folder in Visual Studio Code (**File → Open Folder**).
3. Open the Extensions panel and install **Live Server**.
4. Open `index.html` and click **Go Live** in the bottom status bar.
5. Test the navigation, category links, search, filters, sorting, product details, add-to-cart, cart quantity buttons, remove, checkout validation, contact form and login/signup tabs.

The cart is stored in this browser using `localStorage`. Clearing browser site data will clear the sample cart.

## Publish with GitHub Pages

1. Sign in to GitHub and create a new public repository named `shoplift-marketplace` (or another available name).
2. Extract the ZIP. Open the `ShopLIft_Website` folder and upload its **contents** to the repository root. Do not upload only the outer ZIP file. `index.html` must be at the repository root.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch **main** and folder **/(root)**, then click **Save**.
6. Wait for the deployment status to become successful and open the website URL shown in the Pages settings. A project site URL normally follows `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

## Important scope note

This is a static front-end learning project. Login and signup do not authenticate users. The contact form does not send messages. Checkout does not take payment or create a server-side order. Product information is sample data in JavaScript and is not connected to live inventory. A production marketplace needs a secure backend, database, authentication, payment provider, inventory and order management. GitHub Pages hosts the static front end; it does not run a Node.js/Express backend.

## Assignment evidence to capture

- ShopLIft homepage in desktop view
- Product listing with a category filter applied
- Product detail page
- Cart showing at least two items and changed quantity
- Checkout validation and demo confirmation
- Mobile/responsive layout
- GitHub repository file list
- GitHub Pages Settings showing deployment source and the live public website
