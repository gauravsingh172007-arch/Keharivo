import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import products from "./products";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [productCatalog, setProductCatalog] = useState(products);
  const [catalogSource, setCatalogSource] = useState("loading");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    let isActive = true;

    fetch("/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Product API is unavailable");
        }

        return response.json();
      })
      .then(({ products: apiProducts, source }) => {
        if (!Array.isArray(apiProducts)) {
          throw new Error("Product API returned an invalid catalog");
        }

        if (isActive) {
          setProductCatalog(apiProducts);
          setCatalogSource(source);
        }
      })
      .catch(() => {
        if (isActive) {
          setCatalogSource("demo");
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    let result = productCatalog.filter((product) => {
      const categoryMatch =
        activeCategory === "All" ||
        product.category === activeCategory;

      const searchMatch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.brand
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.category
          .toLowerCase()
          .includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [productCatalog, search, activeCategory, sort]);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const exists = currentCart.find(
        (item) => item.id === product.id
      );

      if (exists) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    alert(`${product.name} added to cart!`);
  };

  const buyNow = (product) => {
    addToCart(product);
    setShowCart(true);
  };

  const toggleWishlist = (id) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const removeFromCart = (id) => {
    setCart((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const cartTotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const cartItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const categories = [
    {
      title: "Electronics",
      subtitle: "Smart gadgets & audio",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85",
    },
    {
      title: "Fashion",
      subtitle: "Trending styles",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=85",
    },
    {
      title: "Footwear",
      subtitle: "Step into style",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    },
    {
      title: "Watches",
      subtitle: "Timeless luxury",
      image:
        "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85",
    },
  ];

  return (
    <div className="app">

      <Navbar
        cartCount={cartItems}
        wishlistCount={wishlist.length}
        search={search}
        setSearch={setSearch}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* HERO */}
      <section className="hero">

        <div className="hero-content">

          <span className="hero-small">
            THE ROYAL COLLECTION 2026
          </span>

          <h1>
            ELEVATE
            <br />
            YOUR LIFESTYLE
          </h1>

          <p>
            Premium products. Extraordinary quality.
            <br />
            Made for those who expect more.
          </p>

          <div className="hero-buttons">
            <button
              className="hero-primary"
              onClick={() => {
                setActiveCategory("All");
                window.scrollTo({
                  top: 700,
                  behavior: "smooth",
                });
              }}
            >
              Shop Collection →
            </button>

            <button
              className="hero-secondary"
              onClick={() => {
                setActiveCategory("Electronics");
                window.scrollTo({
                  top: 700,
                  behavior: "smooth",
                });
              }}
            >
              Explore Deals
            </button>
          </div>

          <div className="hero-features">
            <span>✓ Premium Quality</span>
            <span>✓ Secure Payments</span>
            <span>✓ Fast Delivery</span>
          </div>

        </div>

        <div className="hero-visual">
          <div className="hero-circle"></div>

          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=90"
            alt="Luxury Watch"
          />

          <div className="floating-card">
            <span>ROYAL PICK</span>
            <strong>Premium Collection</strong>
            <small>Starting ₹999</small>
          </div>
        </div>

      </section>

      {/* TRUST STRIP */}
      <section className="trust-strip">

        <div>
          <span>🚚</span>
          <div>
            <strong>Free Delivery</strong>
            <small>On orders above ₹999</small>
          </div>
        </div>

        <div>
          <span>🔒</span>
          <div>
            <strong>Secure Payments</strong>
            <small>100% secure checkout</small>
          </div>
        </div>

        <div>
          <span>↩️</span>
          <div>
            <strong>Easy Returns</strong>
            <small>7 day return policy</small>
          </div>
        </div>

        <div>
          <span>💎</span>
          <div>
            <strong>Premium Quality</strong>
            <small>Curated products</small>
          </div>
        </div>

      </section>

      {/* CATEGORIES */}
      <section className="section categories-section">

        <div className="section-heading">
          <div>
            <span className="eyebrow">
              SHOP BY CATEGORY
            </span>

            <h2>
              Find Your
              <span> Royal Style</span>
            </h2>
          </div>

          <p>
            Explore our carefully curated collection
            of premium products.
          </p>
        </div>

        <div className="category-grid">

          {categories.map((category) => (
            <button
              className="category-card"
              key={category.title}
              onClick={() =>
                setActiveCategory(category.title)
              }
            >
              <img
                src={category.image}
                alt={category.title}
              />

              <div className="category-overlay">
                <span>{category.subtitle}</span>
                <h3>{category.title}</h3>
                <b>Shop Now →</b>
              </div>
            </button>
          ))}

        </div>

      </section>

      {/* DEAL BANNER */}
      <section className="deal-banner">

        <div>
          <span>LIMITED TIME OFFER</span>

          <h2>
            Up to <strong>70% OFF</strong>
          </h2>

          <p>
            Premium essentials at royal prices.
          </p>
        </div>

        <button
          onClick={() => {
            setActiveCategory("All");
            window.scrollTo({
              top: 1250,
              behavior: "smooth",
            });
          }}
        >
          Shop Deals →
        </button>

      </section>

      {/* PRODUCTS */}
      <section className="section products-section">

        <div className="products-header">

          <div>
            <span className="eyebrow">
              OUR COLLECTION
            </span>

            <h2>
              Trending
              <span> Products</span>
            </h2>

            <p>
              Showing {filteredProducts.length} premium
              products
              <span className={`catalog-status ${catalogSource}`} role="status">
                {catalogSource === "mongodb"
                  ? "Live inventory"
                  : catalogSource === "shared-catalog"
                    ? "Backend online - MongoDB offline"
                    : catalogSource === "loading"
                      ? "Connecting to backend..."
                      : "Backend offline - demo catalog"}
              </span>
            </p>
          </div>

          <div className="sort-box">
            <label>Sort by</label>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="featured">
                Featured
              </option>

              <option value="low">
                Price: Low to High
              </option>

              <option value="high">
                Price: High to Low
              </option>

              <option value="rating">
                Customer Rating
              </option>
            </select>
          </div>

        </div>

        <div className="products-layout">

          <aside className="filter-sidebar">

            <div className="filter-title">
              <h3>Filters</h3>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setSearch("");
                }}
              >
                Clear
              </button>
            </div>

            <div className="filter-group">

              <h4>Categories</h4>

              {[
                "All",
                "Electronics",
                "Fashion",
                "Footwear",
                "Watches",
              ].map((category) => (
                <button
                  key={category}
                  className={
                    activeCategory === category
                      ? "filter-option selected"
                      : "filter-option"
                  }
                  onClick={() =>
                    setActiveCategory(category)
                  }
                >
                  <span>
                    {activeCategory === category
                      ? "●"
                      : "○"}
                  </span>

                  {category === "All"
                    ? "All Products"
                    : category}
                </button>
              ))}

            </div>

            <div className="filter-group">

              <h4>Price</h4>

              <label>
                <input type="checkbox" />
                Under ₹1,000
              </label>

              <label>
                <input type="checkbox" />
                ₹1,000 - ₹2,000
              </label>

              <label>
                <input type="checkbox" />
                ₹2,000 - ₹5,000
              </label>

              <label>
                <input type="checkbox" />
                Above ₹5,000
              </label>

            </div>

            <div className="filter-group">

              <h4>Customer Rating</h4>

              <label>
                <input type="checkbox" />
                ⭐ 4★ & above
              </label>

              <label>
                <input type="checkbox" />
                ⭐ 3★ & above
              </label>

            </div>

          </aside>

          <div className="product-grid">

            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onBuyNow={buyNow}
                  isWishlisted={wishlist.includes(
                    product.id
                  )}
                  onWishlist={toggleWishlist}
                />
              ))
            ) : (
              <div className="no-products">
                <div>🔎</div>
                <h3>No products found</h3>
                <p>
                  Try searching for another product.
                </p>
              </div>
            )}

          </div>

        </div>

      </section>

      {/* NEWSLETTER */}
      <section className="newsletter">

        <div>
          <span>KEHARIVO ROYAL CLUB</span>

          <h2>
            Get the royal treatment.
          </h2>

          <p>
            Join our community and receive exclusive
            offers, early access and style inspiration.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you for joining Keharivo Royal Club!");
          }}
        >
          <input
            type="email"
            placeholder="Enter your email address"
            required
          />

          <button>
            Join Now →
          </button>
        </form>

      </section>

      {/* FOOTER */}
      <footer className="footer">

        <div className="footer-main">

          <div className="footer-brand">

            <div className="footer-logo">
              🦁
            </div>

            <h3>
              KEHARI<span>VO</span>
            </h3>

            <p>
              Premium products for a premium lifestyle.
              Discover quality, elegance and innovation
              under one royal roof.
            </p>

            <div className="socials">
              <button>f</button>
              <button>𝕏</button>
              <button>◎</button>
              <button>in</button>
            </div>

          </div>

          <div className="footer-column">
            <h4>Shop</h4>
            <a>Electronics</a>
            <a>Fashion</a>
            <a>Footwear</a>
            <a>Watches</a>
            <a>New Arrivals</a>
          </div>

          <div className="footer-column">
            <h4>Customer Care</h4>
            <a>Contact Us</a>
            <a>Track Order</a>
            <a>Shipping Policy</a>
            <a>Returns</a>
            <a>FAQs</a>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <a>About Keharivo</a>
            <a>Careers</a>
            <a>Privacy Policy</a>
            <a>Terms & Conditions</a>
            <a>Affiliate Program</a>
          </div>

        </div>

        <div className="footer-bottom">
          <span>
            © 2026 Keharivo Royal Store. All rights reserved.
          </span>

          <span>
            Made with ♡ for modern India
          </span>
        </div>

      </footer>

      {/* CART DRAWER */}
      {showCart && (
        <div
          className="cart-overlay"
          onClick={() => setShowCart(false)}
        >

          <aside
            className="cart-drawer"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="cart-header">
              <div>
                <span>Your Shopping Bag</span>
                <h2>{cartItems} Items</h2>
              </div>

              <button
                onClick={() => setShowCart(false)}
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <div>🛒</div>
                <h3>Your bag is empty</h3>
                <p>
                  Add something premium to your cart.
                </p>
              </div>
            ) : (
              <>
                <div className="cart-items">

                  {cart.map((item) => (
                    <div
                      className="cart-item"
                      key={item.id}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div>
                        <h4>{item.name}</h4>

                        <span>
                          Qty: {item.quantity}
                        </span>

                        <strong>
                          ₹
                          {(
                            item.price *
                            item.quantity
                          ).toLocaleString("en-IN")}
                        </strong>

                        <button
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}

                </div>

                <div className="cart-summary">

                  <div>
                    <span>Subtotal</span>
                    <strong>
                      ₹{cartTotal.toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <div>
                    <span>Delivery</span>
                    <strong>FREE</strong>
                  </div>

                  <hr />

                  <div className="cart-total">
                    <span>Total</span>
                    <strong>
                      ₹{cartTotal.toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <button className="checkout-btn">
                    Proceed to Checkout →
                  </button>

                </div>
              </>
            )}

          </aside>
        </div>
      )}

      <button
        className="floating-cart"
        onClick={() => setShowCart(true)}
      >
        🛒
        {cartItems > 0 && (
          <span>{cartItems}</span>
        )}
      </button>

    </div>
  );
}

export default App;