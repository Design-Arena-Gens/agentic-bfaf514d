'use client'

import { useState } from 'react'

interface Product {
  id: number
  name: string
  price: number
  description: string
  icon: string
  category: string
}

interface CartItem extends Product {
  quantity: number
}

const products: Product[] = [
  { id: 1, name: 'Classic Cotton T-Shirt', price: 29.99, description: 'Comfortable everyday wear', icon: '👕', category: 'Tops' },
  { id: 2, name: 'Slim Fit Jeans', price: 79.99, description: 'Premium denim', icon: '👖', category: 'Bottoms' },
  { id: 3, name: 'Leather Jacket', price: 199.99, description: 'Genuine leather', icon: '🧥', category: 'Outerwear' },
  { id: 4, name: 'Summer Dress', price: 89.99, description: 'Light and breezy', icon: '👗', category: 'Dresses' },
  { id: 5, name: 'Casual Sneakers', price: 69.99, description: 'All-day comfort', icon: '👟', category: 'Footwear' },
  { id: 6, name: 'Wool Sweater', price: 59.99, description: 'Warm and cozy', icon: '🧶', category: 'Tops' },
  { id: 7, name: 'Formal Blazer', price: 149.99, description: 'Professional style', icon: '🎩', category: 'Outerwear' },
  { id: 8, name: 'Yoga Pants', price: 49.99, description: 'Flexible and comfortable', icon: '🩱', category: 'Activewear' },
  { id: 9, name: 'Denim Jacket', price: 89.99, description: 'Timeless classic', icon: '🧥', category: 'Outerwear' },
  { id: 10, name: 'Cotton Shorts', price: 34.99, description: 'Perfect for summer', icon: '🩳', category: 'Bottoms' },
  { id: 11, name: 'Hoodie', price: 54.99, description: 'Casual comfort', icon: '🧥', category: 'Tops' },
  { id: 12, name: 'Maxi Skirt', price: 64.99, description: 'Elegant and flowing', icon: '👗', category: 'Bottoms' },
]

const categories = [
  { name: 'Tops', icon: '👕', description: 'T-shirts, Shirts & More' },
  { name: 'Bottoms', icon: '👖', description: 'Jeans, Pants & Shorts' },
  { name: 'Dresses', icon: '👗', description: 'Casual & Formal Dresses' },
  { name: 'Outerwear', icon: '🧥', description: 'Jackets & Coats' },
  { name: 'Footwear', icon: '👟', description: 'Shoes & Sneakers' },
  { name: 'Activewear', icon: '🩱', description: 'Sports & Fitness' },
]

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products

  return (
    <>
      <header className="header">
        <nav className="nav">
          <a href="/" className="logo">FASHION</a>
          <ul className="nav-links">
            <li><a href="#categories">Categories</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="cart-icon" onClick={() => setIsCartOpen(true)}>
            🛒
            {getTotalItems() > 0 && <span className="cart-count">{getTotalItems()}</span>}
          </div>
        </nav>
      </header>

      <section className="hero">
        <h1>Welcome to Fashion Store</h1>
        <p>Discover the latest trends in premium clothing</p>
        <button className="cta-button" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
          Shop Now
        </button>
      </section>

      <div className="container">
        <section id="categories">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories">
            {categories.map((category) => (
              <div
                key={category.name}
                className="category-card"
                onClick={() => {
                  setSelectedCategory(selectedCategory === category.name ? null : category.name)
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
                }}
                style={{
                  border: selectedCategory === category.name ? '3px solid #667eea' : 'none'
                }}
              >
                <div className="category-icon">{category.icon}</div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="products">
          <h2 className="section-title">
            {selectedCategory ? `${selectedCategory}` : 'Featured Products'}
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                style={{
                  marginLeft: '1rem',
                  fontSize: '1rem',
                  background: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  cursor: 'pointer'
                }}
              >
                Clear Filter
              </button>
            )}
          </h2>
          <div className="products">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">{product.icon}</div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-footer">
                    <span className="product-price">${product.price}</span>
                    <button className="add-to-cart" onClick={() => addToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)} />
      <div className={`cart-modal ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-cart" onClick={() => setIsCartOpen(false)}>✕</button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">{item.icon}</div>
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-price">${item.price} x {item.quantity}</div>
                    <button className="remove-item" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <div className="cart-total-price">
                <span>Total:</span>
                <span>${getTotalPrice()}</span>
              </div>
              <button className="checkout-button" onClick={() => alert('Checkout functionality coming soon!')}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>Premium fashion for everyone. Quality clothing at affordable prices.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#categories">Categories</a></li>
              <li><a href="#products">Products</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Customer Service</h3>
            <ul>
              <li><a href="#shipping">Shipping Info</a></li>
              <li><a href="#returns">Returns</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#support">Support</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Connect</h3>
            <ul>
              <li><a href="#instagram">Instagram</a></li>
              <li><a href="#facebook">Facebook</a></li>
              <li><a href="#twitter">Twitter</a></li>
              <li><a href="#pinterest">Pinterest</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Fashion Store. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
