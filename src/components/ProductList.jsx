import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardNavbar from "./DashboardNavbar";
import { useCart } from "./CartContext";

const products = [
  { id: 1, name: "Ceramic Plant Pot", price: 115, category: "Pots", image: "https://exclusivelane.com/cdn/shop/products/EL-021-081_A_6a752504-c9cb-4409-9be6-cf175b4ed743_720x.jpg?v=1740398368" },
  { id: 2, name: "Succulent Planter Set", price: 220, category: "Pots", image: "https://m.media-amazon.com/images/I/41M5OxNaIxL.jpg" },
  { id: 3, name: "LED Grow Lights", price: 140, category: "Decor", image: "https://s42814.pcdn.co/wp-content/uploads/2021/10/best_led_grow_light-scaled.jpg.optimal.jpg" },
  { id: 4, name: "Macrame Plant Hanger", price: 370, category: "Stands", image: "https://themacrameshop.in/wp-content/uploads/2023/12/4-1-9.jpg" },
  { id: 5, name: "Self-Watering Planter", price: 220, category: "Others", image: "https://eha.eco/wp-content/uploads/2024/08/26-18.jpg" },
  { id: 6, name: "Bamboo Plant Stand", price: 335, category: "Stands", image: "https://m.media-amazon.com/images/I/71GJkcIymvL._AC_UF894,1000_QL80_.jpg" },
  { id: 7, name: "Hanging Glass Terrarium", price: 218, category: "Stands", image: "https://apkainterior.gumlet.io/65038/631836d16b151_1.jpg?w=360&dpr=2.6" },
  { id: 8, name: "Garden Tool Set", price: 322, category: "Others", image: "https://images-na.ssl-images-amazon.com/images/I/81cF7B7C24L.jpg" },
  { id: 9, name: "Herb Garden Kit", price: 228, category: "Others", image: "https://gardeningforkids.co.uk/cdn/shop/products/GFKOBGB-24_1050x700.jpg?v=1718182748" },
  { id: 10, name: "Decorative Pebbles", price: 112, category: "Decor", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT961GjCFzIa0bNrYQQyEE2fI76mSbuENi9MA&s" },
  { id: 11, name: "Automatic Plant Watering Spikes", price: 215, category: "Others", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz_YqbEgAcJDim0ulSTpXybrmaXLEnPdgFgA&s" },
  { id: 12, name: "Metal Plant Holder", price: 332, category: "Stands", image: "https://www.homesake.in/cdn/shop/files/IH0C645_theme.jpg?v=1706080161" },
  { id: 13, name: "Wooden Stand", price: 225, category: "Stands", image: "https://cdn.agnicart.com/media/images/stores/ecf5a5ea/products/product/f12db797/1715945024968_ndkTMME.jpg" },
  { id: 14, name: "Wall Mounted Planter", price: 297, category: "Stands", image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1661525697-Ow8MYArray_11.jpg?crop=1xw:1.00xh;center,top&resize=980:*" },
  { id: 15, name: "Vintage Watering Can", price: 156, category: "Others", image: "https://images-cdn.ubuy.co.in/66a7df923124973a6c05ad75-small-watering-can-for-indoor-plants.jpg" },
  { id: 16, name: "Epsom Salt Fertilizer", price: 320, category: "Fertilizers", image: "https://lazygardener.in/cdn/shop/products/epsom-salt-magnesium-sulphate-fertilizer-for-plants-epsom-salt-lazygardener-470967_296x394.jpg?v=1705563961" },
  { id: 17, name: "Bloom Burst Spray (Flowering Spray)", price: 20, image: "https://lazygardener.in/cdn/shop/files/BloomSpray-481480_296x394.png?v=1736811046" },
  { id: 18, name: "Organic Banana Peel Fertilizer", price: 110, category: "Fertilizers", image: "https://lazygardener.in/cdn/shop/products/organic-banana-peel-powder-fertilizer-banana-peel-powder-lazygardener-506860_296x394.jpg?v=1689248739" },
  { id: 19, name: "Plant Care Kit", price: 270, category: "Fertilizers", image: "https://lazygardener.in/cdn/shop/files/pck_296x394.png?v=1701681796" },
  { id: 20, name: "Water soluble neem oil (pest control)", category: "Fertilizers", price: 20, image: "https://m.media-amazon.com/images/I/61f+BjHxgUL._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 21, name: "Bug remover spray", price: 120, category: "Fertilizers", image: "https://m.media-amazon.com/images/I/71iTTu-bHXL._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 22, name: "Herbal plant protector", price: 200, category: "Fertilizers", image: "https://m.media-amazon.com/images/I/51LOYPO-0XL._AC_UL480_FMwebp_QL65_.jpg" },
];

const ProductList = () => {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [buyerInfo, setBuyerInfo] = useState({ name: "", address: "", contact: "" });
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortOption, setSortOption] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const { addToCart } = useCart();

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setWishlist(savedWishlist);
    setCart(savedCart);
  }, []);

  const addToWishlist = (product) => {
    if (!wishlist.find((item) => item.id === product.id)) {
      const updatedWishlist = [...wishlist, product];
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    }
  };

  const handleBuy = (product) => setSelectedProduct(product);

  const handleOrder = (e) => {
    e.preventDefault();
    alert(`Order placed for ${selectedProduct.name} (${selectedProduct.price}$) by ${buyerInfo.name}`);
    setSelectedProduct(null);
    setBuyerInfo({ name: "", address: "", contact: "" });
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setBuyerInfo({ name: "", address: "", contact: "" });
  };

  // 🔍 Filtering and Sorting Logic
  useEffect(() => {
    let updated = [...products];

    if (categoryFilter !== "All") {
      updated = updated.filter((p) => p.category === categoryFilter);
    }

    if (sortOption === "lowToHigh") {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortOption === "highToLow") {
      updated.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updated);
  }, [sortOption, categoryFilter]);

  return (
    <div>
      <DashboardNavbar />
      <div style={{
        backgroundColor: "#FAE1DD",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}>
        <div className="container py-5">
          <h2 className="fw-bold text-light text-center py-3" style={{ backgroundColor: "#2C3E50", borderRadius: "8px" }}>
            Indoor Plant Decoration Items
          </h2>

          {/* Filters */}
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
            <select className="form-select w-auto me-2" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="All">All Categories</option>
              <option value="Fertilizers">Fertilizers</option>
              <option value="Pots">Pots</option>
              <option value="Stands">Stands</option>
              <option value="Decor">Decor</option>
              <option value="Others">Others</option>
            </select>

            <select className="form-select w-auto" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <option value="">Select</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>

          {/* Products Grid */}
          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col-12 col-sm-6 col-md-4">
                <div className="card shadow-sm border-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "contain", padding: "10px", backgroundColor: "#f8f9fa" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="text-muted">Price: ₹{product.price}</p>
                    <div className="text-center">
                      <button onClick={() => addToWishlist(product)} className="btn btn-warning btn-sm mb-2 w-75">
                        Add to Wishlist
                      </button>
                      <br />
                      <button onClick={() => addToCart(product)} className="btn btn-success btn-sm w-75">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal */}
          {selectedProduct && (
            <div className="modal show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
              <div className="modal-dialog">
                <div className="modal-content p-4">
                  <h4>Order {selectedProduct.name}</h4>
                  <p><strong>Amount:</strong> ₹{selectedProduct.price}</p>
                  <form onSubmit={handleOrder}>
                    <input type="text" className="form-control mb-2" placeholder="Name" required
                      onChange={(e) => setBuyerInfo({ ...buyerInfo, name: e.target.value })} />
                    <input type="text" className="form-control mb-2" placeholder="Address" required
                      onChange={(e) => setBuyerInfo({ ...buyerInfo, address: e.target.value })} />
                    <input type="text" className="form-control mb-2" placeholder="Contact Number" required
                      onChange={(e) => setBuyerInfo({ ...buyerInfo, contact: e.target.value })} />
                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-success w-100">Place Order</button>
                      <button type="button" className="btn btn-secondary w-100" onClick={handleClose}>Close</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProductList;