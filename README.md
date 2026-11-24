# ShopLIft — AI-Powered Multi-Category Marketplace

**Good finds. Better everyday.**

ShopLIft is a responsive, eight-page e-commerce marketplace demonstration created for an AI-powered web development assignment. It uses HTML5, CSS3 and vanilla JavaScript, with product data and cart state handled in the browser.

## Store categories

- Electronics
- Fashion
- Home & Kitchen
- Beauty
- Books & Stationery
- Sports & Fitness

Prices are illustrative sample prices in Indian Rupees (₹). The project includes 12 sample products.

## Website pages

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Marketplace landing page and featured products |
| Shop | `products.html` | Product catalogue, search, category filtering and sorting |
| Product details | `product.html` | Selected product information and quantity selector |
| Cart | `cart.html` | View items, change quantities and remove items |
| Checkout | `checkout.html` | Validated demonstration checkout |
| About | `about.html` | Project concept and technology overview |
| Contact | `contact.html` | Demonstration contact form |
| Account | `login.html` | Login and account-creation form demonstrations |

## Technology

- **HTML5** — page structure and semantic content
- **CSS3** — responsive layouts, styling, grid, flexbox and transitions
- **Vanilla JavaScript** — product rendering, search, filters, sorting, navigation, form validation and cart interactions
- **localStorage** — keeps the sample cart in the current browser
- **SVG** — locally stored sample product illustrations and favicon

No build tools, package installation, framework or backend server are required.

## Project structure

```text
ShopLIft/
├── index.html
├── products.html
├── product.html
├── cart.html
├── checkout.html
├── about.html
├── contact.html
├── login.html
├── styles.css
├── script.js
├── README.md
├── ShopLIft_AI_Development_Prompt.txt
└── assets/
    ├── favicon.svg
    └── images/ (12 sample product SVG illustrations)
```

## Run locally

1. Download or clone this repository.
2. Open the project folder in Visual Studio Code.
3. Open `index.html`.
4. Start the page with the VS Code **Live Server** extension, or open the HTML file directly in a browser.
5. Browse categories, search for products, open product details and try the cart.

## Publish with GitHub Pages

1. Open this repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch **main** and folder **/(root)**, then save.
5. Wait for GitHub Pages to finish its deployment. The public URL will be shown in the Pages settings. It normally follows this pattern:

   `https://pycognition.github.io/ShopLIft/`

The repository root contains `index.html`, so the root publishing folder is the correct source.

## Important demo limitations

This is a **front-end learning demonstration**, not a production online store.

- Login and signup forms only demonstrate browser-side validation; they do not create accounts or authenticate users.
- The contact form displays a demo confirmation; it does not send or store messages.
- Checkout displays a sample confirmation; it does not process payments or create a server-side order.
- Product data, prices, stock and ratings are sample data, not live inventory.
- The cart is stored in the browser using `localStorage`; clearing browser site data removes it.
- No customer personal or payment information should be entered.

A production marketplace would require a secure backend, database, authentication, payment integration, inventory management and order processing.

## Assignment evidence checklist

- [ ] Desktop homepage
- [ ] Product listing with a category filter
- [ ] Search results
- [ ] Product details
- [ ] Cart with quantity changes
- [ ] Checkout demo and form validation
- [ ] Login/signup validation demonstration
- [ ] Contact form demo confirmation
- [ ] Mobile/responsive layout
- [ ] GitHub repository root showing all project files
- [ ] GitHub Pages settings and deployed public URL

---

Built as a learning project using HTML, CSS and JavaScript.
