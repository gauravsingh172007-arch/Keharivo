function ProductCard({
  product,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onWishlist,
}) {
  return (
    <article className="product-card">

      <div className="product-image-wrapper">

        {product.badge && (
          <span className="product-badge">
            {product.badge}
          </span>
        )}

        <button
          className={
            isWishlisted
              ? "wishlist-btn liked"
              : "wishlist-btn"
          }
          onClick={() => onWishlist(product.id)}
        >
          {isWishlisted ? "♥" : "♡"}
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />

        <div className="quick-view">
          Quick View
        </div>
      </div>

      <div className="product-info">

        <div className="product-brand">
          {product.brand}
        </div>

        <h3>{product.name}</h3>

        <div className="rating-row">
          <span className="rating">
            ★ {product.rating}
          </span>

          <span className="reviews">
            ({product.reviews.toLocaleString()})
          </span>
        </div>

        <p className="product-description">
          Premium quality product with modern design,
          exceptional comfort and reliable performance.
        </p>

        <div className="price-row">
          <strong>
            ₹{product.price.toLocaleString("en-IN")}
          </strong>

          <del>
            ₹{product.oldPrice.toLocaleString("en-IN")}
          </del>

          <span className="discount">
            {product.discount}% OFF
          </span>
        </div>

        <div className="card-actions">

          <button
            className="add-cart-btn"
            onClick={() => onAddToCart(product)}
          >
            🛒 Add to Cart
          </button>

          <button
            className="buy-now-btn"
            onClick={() => onBuyNow(product)}
          >
            Buy Now
          </button>

        </div>

      </div>
    </article>
  );
}

export default ProductCard;