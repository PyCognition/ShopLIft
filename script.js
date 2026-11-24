// ShopLIft sample catalogue. In a real marketplace, product data would come from an API.
const PRODUCTS = [{"id":"nova-phone","name":"Nova X Smartphone","category":"Electronics","price":24999,"oldPrice":27999,"rating":4.8,"reviews":214,"badge":"Bestseller","description":"A crisp display, dependable battery life and a clean design make Nova X a smart everyday phone.","image":"nova-phone.svg"},{"id":"sonic-buds","name":"Sonic Wireless Earbuds","category":"Electronics","price":2499,"oldPrice":3299,"rating":4.6,"reviews":186,"badge":"Deal","description":"Compact wireless earbuds with a comfortable fit, clear calls and an easy charging case.","image":"sonic-buds.svg"},{"id":"pulse-watch","name":"Pulse Smart Watch","category":"Electronics","price":3999,"oldPrice":4999,"rating":4.5,"reviews":98,"badge":"Popular","description":"Track everyday activity, check notifications and keep your routine on track with Pulse.","image":"pulse-watch.svg"},{"id":"urban-backpack","name":"Urban Everyday Backpack","category":"Fashion","price":1599,"oldPrice":1999,"rating":4.7,"reviews":142,"badge":"Bestseller","description":"A versatile everyday backpack with a padded laptop section and useful organised pockets.","image":"urban-backpack.svg"},{"id":"classic-sneakers","name":"Classic Street Sneakers","category":"Fashion","price":2299,"oldPrice":2799,"rating":4.4,"reviews":76,"badge":"","description":"Comfortable low-profile sneakers designed to pair easily with everyday outfits.","image":"classic-sneakers.svg"},{"id":"linen-shirt","name":"Linen Blend Casual Shirt","category":"Fashion","price":1199,"oldPrice":1499,"rating":4.3,"reviews":64,"badge":"New","description":"A relaxed-fit casual shirt with a breathable linen blend for easy everyday styling.","image":"linen-shirt.svg"},{"id":"glow-lamp","name":"Glow Minimal Desk Lamp","category":"Home & Kitchen","price":1899,"oldPrice":2299,"rating":4.6,"reviews":81,"badge":"","description":"A clean, compact desk lamp that adds warm light to a study table or bedside corner.","image":"glow-lamp.svg"},{"id":"ceramic-set","name":"Ceramic Coffee Mug Set","category":"Home & Kitchen","price":899,"oldPrice":1199,"rating":4.5,"reviews":53,"badge":"Value pick","description":"A pair of simple ceramic mugs for coffee, tea and slow weekend mornings.","image":"ceramic-set.svg"},{"id":"daily-skincare","name":"Daily Skin Care Kit","category":"Beauty","price":1299,"oldPrice":1599,"rating":4.4,"reviews":117,"badge":"","description":"A simple sample skincare set for a fresh daily routine. Check product labels for ingredients.","image":"daily-skincare.svg"},{"id":"notebook-pack","name":"Essential Notebook Pack","category":"Books & Stationery","price":499,"oldPrice":649,"rating":4.7,"reviews":91,"badge":"Value pick","description":"A pack of practical notebooks for notes, lists, planning and everyday writing.","image":"notebook-pack.svg"},{"id":"yoga-mat","name":"FlexGrip Yoga Mat","category":"Sports & Fitness","price":999,"oldPrice":1299,"rating":4.6,"reviews":73,"badge":"","description":"A lightweight exercise mat with a textured surface for home workouts and stretching.","image":"yoga-mat.svg"},{"id":"steel-bottle","name":"Hydra Steel Bottle","category":"Sports & Fitness","price":699,"oldPrice":899,"rating":4.5,"reviews":88,"badge":"Popular","description":"A reusable stainless-steel bottle sized for commuting, workouts and daily hydration.","image":"steel-bottle.svg"}];
const CART_KEY = 'shoplift-cart-v1';
const money = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
const byId = (id) => document.getElementById(id);

function readCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => PRODUCTS.some((product) => product.id === item.id) && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 10);
  } catch (error) {
    console.warn('Cart storage could not be read; starting with an empty cart.', error);
    return [];
  }
}
function writeCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}
function updateCartCount() {
  const count = readCart().reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('.cart-count').forEach((element) => { element.textContent = String(count); });
}
function showToast(message) {
  const toast = byId('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2500);
}
function addToCart(productId, quantity = 1) {
  const product = PRODUCTS.find((item) => item.id === productId);
  if (!product) return;
  const safeQuantity = Math.max(1, Math.min(10, Number(quantity) || 1));
  const cart = readCart();
  const existing = cart.find((item) => item.id === productId);
  if (existing) existing.quantity = Math.min(10, existing.quantity + safeQuantity);
  else cart.push({ id: productId, quantity: safeQuantity });
  writeCart(cart);
  showToast(`${product.name} added to your cart.`);
}
function productCard(product) {
  const badge = product.badge ? `<span class="product-badge">${product.badge}</span>` : '';
  return `<article class="product-card">
    <a class="product-image-wrap" href="product.html?id=${encodeURIComponent(product.id)}" aria-label="View ${product.name}">${badge}<img class="product-image" src="assets/images/${product.image}" alt="${product.name}" loading="lazy"></a>
    <div class="product-info"><span class="product-category">${product.category}</span><h3 class="product-title"><a href="product.html?id=${encodeURIComponent(product.id)}">${product.name}</a></h3>
    <div class="product-rating">★ ${product.rating.toFixed(1)} <span>(${product.reviews} reviews)</span></div>
    <div class="product-price-row"><strong class="product-price">${money(product.price)}</strong><span class="old-price">${money(product.oldPrice)}</span></div>
    <div class="product-card-actions"><a class="button button-secondary" href="product.html?id=${encodeURIComponent(product.id)}">Details</a><button class="button button-primary" type="button" data-add="${product.id}">Add to cart</button></div></div></article>`;
}
function renderProductLists() {
  const featured = byId('featured-products');
  if (featured) featured.innerHTML = PRODUCTS.filter((item) => ['nova-phone', 'urban-backpack', 'glow-lamp', 'sonic-buds'].includes(item.id)).map(productCard).join('');
  const list = byId('all-products');
  if (!list) return;
  const search = byId('product-search');
  const category = byId('category-filter');
  const sort = byId('sort-filter');
  const noProducts = byId('no-products');
  const params = new URLSearchParams(window.location.search);
  if (search && params.get('q')) search.value = params.get('q');
  if (category && params.get('category')) {
    const option = [...category.options].find((item) => item.value === params.get('category') || item.textContent === params.get('category'));
    if (option) category.value = option.value;
  }
  const filter = () => {
    const query = (search?.value || '').trim().toLowerCase();
    const selected = category?.value || 'all';
    let matches = PRODUCTS.filter((product) => `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(query) && (selected === 'all' || product.category === selected));
    if (sort?.value === 'price-low') matches.sort((a, b) => a.price - b.price);
    if (sort?.value === 'price-high') matches.sort((a, b) => b.price - a.price);
    if (sort?.value === 'rating') matches.sort((a, b) => b.rating - a.rating);
    list.innerHTML = matches.map(productCard).join('');
    if (noProducts) noProducts.classList.toggle('hidden', matches.length !== 0);
    const count = byId('result-count');
    if (count) count.textContent = `${matches.length} product${matches.length === 1 ? '' : 's'} found`;
  };
  search?.addEventListener('input', filter);
  category?.addEventListener('change', filter);
  sort?.addEventListener('change', filter);
  byId('clear-filters')?.addEventListener('click', () => { if (search) search.value = ''; if (category) category.value = 'all'; if (sort) sort.value = 'featured'; filter(); });
  filter();
}
function renderProductDetail() {
  const container = byId('product-detail');
  if (!container) return;
  const id = new URLSearchParams(window.location.search).get('id') || PRODUCTS[0].id;
  const product = PRODUCTS.find((item) => item.id === id);
  if (!product) {
    container.innerHTML = '<div class="empty-state"><h2>Product not found</h2><p>This product may have been removed from the sample collection.</p><a class="button button-primary" href="products.html">Browse products</a></div>';
    return;
  }
  container.innerHTML = `<div class="detail-layout"><div class="detail-image-panel"><img src="assets/images/${product.image}" alt="${product.name}"></div><div class="detail-copy"><p class="eyebrow">${product.category.toUpperCase()}</p><h1>${product.name}</h1><div class="product-rating">★ ${product.rating.toFixed(1)} <span>(${product.reviews} sample reviews)</span></div><p>${product.description}</p><div class="detail-price">${money(product.price)} <span class="detail-old">${money(product.oldPrice)}</span></div><div class="detail-quantity"><label for="detail-quantity">Quantity</label><input id="detail-quantity" type="number" min="1" max="10" value="1"><button class="button button-primary" type="button" data-detail-add="${product.id}">Add to cart <span>→</span></button></div><p class="detail-meta">Sample product · Demo pricing in Indian Rupees · No real inventory connected</p><a class="text-link" href="products.html">← Back to all products</a></div></div>`;
}
function productForCart(item) { return PRODUCTS.find((product) => product.id === item.id); }
function subtotal(cart) { return cart.reduce((sum, item) => { const product = productForCart(item); return sum + (product ? product.price * item.quantity : 0); }, 0); }
function renderCart() {
  const container = byId('cart-content');
  if (!container) return;
  const cart = readCart();
  if (!cart.length) {
    container.innerHTML = '<div class="empty-state"><h2>Your cart is waiting</h2><p>Explore the collection and add something you like.</p><a class="button button-primary" href="products.html">Start shopping <span>→</span></a></div>';
    return;
  }
  const rows = cart.map((item) => {
    const product = productForCart(item);
    return `<article class="cart-row"><img src="assets/images/${product.image}" alt="${product.name}"><div><h3>${product.name}</h3><p>${product.category} · ${money(product.price)} each</p><div class="qty-controls"><button type="button" data-quantity="${product.id}" data-change="-1" aria-label="Decrease ${product.name} quantity">−</button><strong>${item.quantity}</strong><button type="button" data-quantity="${product.id}" data-change="1" aria-label="Increase ${product.name} quantity">+</button></div></div><div class="cart-row-end"><strong>${money(product.price * item.quantity)}</strong><br><button class="remove-button" type="button" data-remove="${product.id}">Remove</button></div></article>`;
  }).join('');
  const total = subtotal(cart);
  const shipping = total >= 1999 ? 0 : 99;
  container.innerHTML = `<div class="cart-layout"><div class="cart-list">${rows}<a class="text-link" href="products.html">← Continue shopping</a></div><aside class="summary-card"><h2>Order summary</h2><div class="summary-line"><span>Items (${cart.reduce((sum, item) => sum + item.quantity, 0)})</span><span>${money(total)}</span></div><div class="summary-line"><span>Demo delivery</span><span>${shipping ? money(shipping) : 'FREE'}</span></div><div class="summary-line summary-total"><span>Total</span><span>${money(total + shipping)}</span></div><p class="form-hint">Free demo delivery on sample carts of ₹1,999 or more.</p><a class="button button-primary" href="checkout.html">Proceed to checkout <span>→</span></a></aside></div>`;
}
function renderCheckoutSummary() {
  const summary = byId('checkout-summary');
  if (!summary) return;
  const cart = readCart();
  if (!cart.length) {
    summary.innerHTML = '<h2>Order summary</h2><p>Your cart is empty.</p><a class="button button-secondary" href="products.html">Browse products</a>';
    const form = byId('checkout-form');
    if (form) form.classList.add('hidden');
    return;
  }
  const total = subtotal(cart);
  const shipping = total >= 1999 ? 0 : 99;
  summary.innerHTML = `<h2>Order summary</h2>${cart.map((item) => { const product = productForCart(item); return `<div class="summary-line"><span>${product.name} × ${item.quantity}</span><strong>${money(product.price * item.quantity)}</strong></div>`; }).join('')}<div class="summary-line"><span>Delivery</span><span>${shipping ? money(shipping) : 'FREE'}</span></div><div class="summary-line summary-total"><span>Total</span><span>${money(total + shipping)}</span></div>`;
}
function setUpForms() {
  byId('contact-form')?.addEventListener('submit', (event) => { event.preventDefault(); showToast('Demo message checked. Nothing was sent.'); event.currentTarget.reset(); });
  byId('login-form')?.addEventListener('submit', (event) => { event.preventDefault(); showToast('Demo only: no real sign-in is connected.'); event.currentTarget.reset(); });
  byId('signup-form')?.addEventListener('submit', (event) => { event.preventDefault(); showToast('Demo only: no account was created or saved.'); event.currentTarget.reset(); });
  byId('checkout-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const cart = readCart();
    if (!cart.length) { showToast('Your cart is empty.'); return; }
    const orderTotal = money(subtotal(cart) + (subtotal(cart) >= 1999 ? 0 : 99));
    writeCart([]);
    event.currentTarget.classList.add('hidden');
    byId('checkout-summary')?.classList.add('hidden');
    const success = byId('order-success');
    if (success) { success.textContent = `Demo order completed. Sample total: ${orderTotal}. No payment was taken and no order was sent to a server.`; success.classList.remove('hidden'); }
  });
  document.querySelectorAll('[data-auth-tab]').forEach((tab) => tab.addEventListener('click', () => {
    const selected = tab.dataset.authTab;
    document.querySelectorAll('[data-auth-tab]').forEach((item) => { const active = item === tab; item.classList.toggle('active', active); item.setAttribute('aria-selected', String(active)); });
    document.querySelectorAll('[data-auth-form]').forEach((form) => form.classList.toggle('hidden', form.dataset.authForm !== selected));
  }));
}
function setUpNavigation() {
  document.querySelectorAll('.menu-toggle').forEach((button) => button.addEventListener('click', () => {
    const nav = button.parentElement.querySelector('.site-nav');
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    nav?.classList.toggle('open', !expanded);
  }));
  const current = location.pathname.split('/').pop() || 'index.html';
  const key = current === 'index.html' ? 'home' : current.replace('.html', '');
  document.querySelector(`[data-nav="${key}"]`)?.classList.add('active');
}
// Event delegation handles Add to cart, quantity and Remove buttons rendered by JavaScript.
document.addEventListener('click', (event) => {
  const add = event.target.closest('[data-add]');
  if (add) addToCart(add.dataset.add);
  const detailAdd = event.target.closest('[data-detail-add]');
  if (detailAdd) { const qty = Math.max(1, Math.min(10, Number(byId('detail-quantity')?.value || 1))); addToCart(detailAdd.dataset.detailAdd, qty); }
  const quantity = event.target.closest('[data-quantity]');
  if (quantity) { const cart = readCart(); const item = cart.find((entry) => entry.id === quantity.dataset.quantity); if (item) item.quantity = Math.max(1, Math.min(10, item.quantity + Number(quantity.dataset.change))); writeCart(cart); renderCart(); }
  const remove = event.target.closest('[data-remove]');
  if (remove) { writeCart(readCart().filter((item) => item.id !== remove.dataset.remove)); showToast('Item removed from your cart.'); renderCart(); }
});
document.querySelectorAll('.current-year').forEach((element) => { element.textContent = String(new Date().getFullYear()); });
setUpNavigation(); updateCartCount(); renderProductLists(); renderProductDetail(); renderCart(); renderCheckoutSummary(); setUpForms();
