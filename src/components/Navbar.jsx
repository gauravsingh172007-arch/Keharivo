import { useState } from "react";

function Navbar({
  cartCount,
  wishlistCount,
  search,
  setSearch,
  activeCategory,
  setActiveCategory,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const categories = [
    { name: "All", icon: "✨" },
    { name: "Electronics", icon: "🎧" },
    { name: "Fashion", icon: "👕" },
    { name: "Footwear", icon: "👟" },
    { name: "Watches", icon: "⌚" },
  ];

  return (
    <>
      <div className="sale-bar">
        <span>⚡ FESTIVAL SALE</span>
        <span>Extra 10% OFF with HDFC & SBI Cards</span>
        <strong>CODE: KEHARI10</strong>
      </div>

      <header className="navbar">
        <div className="nav-container">

          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <div className="brand">
            <div className="brand-logo">🦁</div>

            <div className="brand-text">
              <div>
                <strong>KEHARI</strong>
                <span>VO</span>
              </div>
              <small>ROYAL STORE</small>
            </div>
          </div>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button>🔍</button>
          </div>

          <div className="nav-actions">

            <button className="nav-action">
              <span className="action-icon">👤</span>
              <span className="action-text">Account</span>
            </button>

            <button className="nav-action wishlist-action">
              <span className="action-icon">♡</span>
              <span className="action-text">Wishlist</span>

              {wishlistCount > 0 && (
                <span className="count-badge">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button className="nav-action cart-action">
              <span className="action-icon">🛒</span>
              <span className="action-text">Cart</span>

              <span className="cart-badge">
                {cartCount}
              </span>
            </button>

          </div>
        </div>

        <div className="category-nav">
          <div className="category-container">
            {categories.map((category) => (
              <button
                key={category.name}
                className={
                  activeCategory === category.name
                    ? "category-btn active"
                    : "category-btn"
                }
                onClick={() => setActiveCategory(category.name)}
              >
                <span>{category.icon}</span>
                {category.name === "All"
                  ? "All Products"
                  : category.name}
              </button>
            ))}
          </div>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => {
                  setActiveCategory(category.name);
                  setMenuOpen(false);
                }}
              >
                {category.icon}{" "}
                {category.name === "All"
                  ? "All Products"
                  : category.name}
              </button>
            ))}
          </div>
        )}
      </header>
    </>
  );
}

export default Navbar;