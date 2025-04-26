import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

// === Redux Slice ===
const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    increaseQty: (state, action) => {
      const item = state.find(i => i.id === action.payload);
      if (item) item.quantity++;
    },
    decreaseQty: (state, action) => {
      const item = state.find(i => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity--;
    },
    deleteFromCart: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    }
  }
});

const { addToCart, increaseQty, decreaseQty, deleteFromCart } = cartSlice.actions;
const store = configureStore({ reducer: { cart: cartSlice.reducer } });

const plants = [
  {
    id: 1,
    name: 'Fiddle Leaf Fig',
    price: 25,
    img: 'https://via.placeholder.com/300x300.png?text=Fiddle+Leaf+Fig', // Placeholder image
    description: 'A popular indoor plant with large, violin-shaped leaves.',
    careLevel: 'Moderate',
    light: 'Bright indirect light',
    water: 'Allow soil to dry between waterings'
  },
  {
    id: 2,
    name: 'Snake Plant',
    price: 18,
    img: 'https://via.placeholder.com/300x300.png?text=Snake+Plant', // Placeholder image
    description: 'A hardy succulent with upright, sword-shaped leaves.',
    careLevel: 'Easy',
    light: 'Low to bright indirect light',
    water: 'Drought tolerant, water sparingly'
  },
  {
    id: 3,
    name: 'Peace Lily',
    price: 22,
    img: 'https://via.placeholder.com/300x300.png?text=Peace+Lily', // Placeholder image
    description: 'Elegant white flowers and glossy leaves that purify the air.',
    careLevel: 'Easy',
    light: 'Low to medium indirect light',
    water: 'Keep soil consistently moist'
  },
  {
    id: 4,
    name: 'Spider Plant',
    price: 15,
    img: 'https://via.placeholder.com/300x300.png?text=Spider+Plant', // Placeholder image
    description: 'Fast-growing plant with arching leaves and baby plantlets.',
    careLevel: 'Easy',
    light: 'Bright indirect light',
    water: 'Allow top soil to dry between waterings'
  },
  {
    id: 5,
    name: 'Rubber Plant',
    price: 28,
    img: 'https://via.placeholder.com/300x300.png?text=Rubber+Plant', // Placeholder image
    description: 'Glossy, leathery leaves and impressive height when mature.',
    careLevel: 'Easy to moderate',
    light: 'Medium to bright indirect light',
    water: 'Allow top soil to dry between waterings'
  },
  {
    id: 6,
    name: 'Aloe Vera',
    price: 12,
    img: 'https://via.placeholder.com/300x300.png?text=Aloe+Vera', // Placeholder image
    description: 'Medicinal succulent with fleshy, serrated leaves.',
    careLevel: 'Easy',
    light: 'Bright direct to indirect light',
    water: 'Drought tolerant, water sparingly'
  }
];


// === Header Component ===
function Header() {
  const cart = useSelector(state => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo" onClick={() => navigate('/')}>
          <span className="logo-text">GREEN</span>
          <span className="logo-highlight">HAVEN</span>
        </div>
        <nav className="main-nav">
          <Link to="/products" className="nav-link">Explore</Link>
          <Link to="/cart" className="nav-link cart-link">
            <div className="cart-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
}

// === Landing Page ===
function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="page landing-page">
      <Header />
      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Elevate Your Space with <span className="highlight">Nature</span>
          </h1>
          <p className="hero-subtitle">Premium houseplants delivered to your doorstep</p>
          <button
            className="cta-button"
            onClick={() => navigate('/products')}
          >
            Explore Collection
          </button>
        </div>
      </div>

      <div className="features">
        <div className="feature">
          <div className="feature-icon">🌱</div>
          <h3>Sustainable</h3>
          <p>Eco-friendly growing practices</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🚚</div>
          <h3>Free Shipping</h3>
          <p>On orders over $50</p>
        </div>
        <div className="feature">
          <div className="feature-icon">💧</div>
          <h3>Care Guides</h3>
          <p>Expert plant care included</p>
        </div>
      </div>
    </div>
  );
}

// === Product Card Component ===
function ProductCard({ plant, onAddToCart }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image-container">
        <img src={plant.img} alt={plant.name} className="product-image" />
        <div className={`product-overlay ${isHovered ? 'visible' : ''}`}>
          <button
            className="add-to-cart-button"
            onClick={() => onAddToCart(plant)}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{plant.name}</h3>
        <p className="product-description">{plant.description}</p>
        <div className="product-price">${plant.price}</div>
      </div>
    </div>
  );
}

// === Products Page ===
function ProductsPage() {
  const dispatch = useDispatch();

  const handleAddToCart = (plant) => {
    dispatch(addToCart(plant));
  };

  return (
    <div className="page products-page">
      <Header />
      <div className="products-hero">
        <h2>Our Collection</h2>
        <p>Handpicked plants to bring life to your space</p>
      </div>
      <div className="product-grid">
        {plants.map(plant => (
          <ProductCard
            key={plant.id}
            plant={plant}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

// === Cart Item Component ===
function CartItem({ item, onIncrease, onDecrease, onDelete }) {
  return (
    <div className="cart-item">
      <img src={item.img} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-price">${item.price}</p>
      </div>
      <div className="cart-item-controls">
        <div className="quantity-control">
          <button className="quantity-btn" onClick={() => onDecrease(item.id)}>−</button>
          <span className="quantity">{item.quantity}</span>
          <button className="quantity-btn" onClick={() => onIncrease(item.id)}>+</button>
        </div>
        <button className="remove-btn" onClick={() => onDelete(item.id)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// === Cart Summary Component ===
function CartSummary({ totalItems, subtotal, shipping, tax, total }) {
  return (
    <div className="cart-summary">
      <h3>Order Summary</h3>
      <div className="summary-row">
        <span>Subtotal ({totalItems} items)</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <span>Shipping</span>
        <span>${shipping.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <span>Tax</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div className="summary-row total">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <button className="checkout-button">Proceed to Checkout</button>
    </div>
  );
}

// === Cart Page ===
function CartPage() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleIncreaseQty = (id) => dispatch(increaseQty(id));
  const handleDecreaseQty = (id) => dispatch(decreaseQty(id));
  const handleDeleteItem = (id) => dispatch(deleteFromCart(id));

  if (cart.length === 0) {
    return (
      <div className="page cart-page">
        <Header />
        <div className="empty-cart">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any plants to your cart yet.</p>
          <button
            className="cta-button"
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page cart-page">
      <Header />
      <div className="cart-content">
        <h2>Your Cart</h2>

        <div className="cart-container">
          <div className="cart-items">
            {cart.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={handleIncreaseQty}
                onDecrease={handleDecreaseQty}
                onDelete={handleDeleteItem}
              />
            ))}

            <button
              className="continue-shopping"
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </button>
          </div>

          <CartSummary
            totalItems={totalItems}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}

// === App Component ===
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;