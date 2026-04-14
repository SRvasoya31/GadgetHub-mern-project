import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import "./products.css";

const categories = ["Mobile", "Laptops", "Audio", "Accessories", "Gaming"];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [form, setForm] = useState({
    name: "",
    category: "Mobile",
    price: "",
    oldPrice: "",
    discount: "",
    bestseller: false,
    stock: "",
    image: null
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const result = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
    setCurrentPage(1);
  }, [search, products]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/products");
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err.message);
    }
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN").format(price);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({
        ...form,
        [name]: type === "checkbox" ? checked : value
      });
    }

    if (name === "price" || name === "oldPrice") {
      const price = name === "price" ? value : form.price;
      const oldPrice = name === "oldPrice" ? value : form.oldPrice;

      if (price && oldPrice) {
        const discount = Math.round(
          ((oldPrice - price) / oldPrice) * 100
        );
        setForm((prev) => ({ ...prev, discount }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    if (editProduct) {
      await axios.put(
        `http://localhost:5000/api/products/${editProduct._id}`,
        formData
      );
    } else {
      await axios.post(
        "http://localhost:5000/api/products",
        formData
      );
    }

    resetForm();
    fetchProducts();
  };

  const resetForm = () => {
    setShowModal(false);
    setEditProduct(null);
    setForm({
      name: "",
      category: "Mobile",
      price: "",
      oldPrice: "",
      discount: "",
      bestseller: false,
      stock: "",
      image: null
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete product?")) {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    }
  };

  const handleEdit = (p) => {
    setEditProduct(p);
    setForm({ ...p, image: null });
    setShowModal(true);
  };

  const indexOfLast = currentPage * itemsPerPage;
  const currentItems = filtered.slice(indexOfLast - itemsPerPage, indexOfLast);

  return (
    <div className="products-page">

      {/* TOP BAR */}
      <div className="top-bar">
        <h1>Products</h1>

        <input
          type="text"
          placeholder="Search product..."
          className="search-box"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="add-btn" onClick={() => setShowModal(true)}>
          <FaPlus /> Add Product
        </button>
      </div>

      {/* TABLE */}
      <div className="product-table">

        <div className="table-head">
          <span>PRODUCT</span>
          <span>CATEGORY</span>
          <span>PRICE</span>
          <span>STOCK</span>
          <span>ACTIONS</span>
        </div>

        {currentItems.map((p) => (
          <div className="table-row" key={p._id}>
            <div className="product-info">
              <img
                src={`http://localhost:5000/uploads/${p.image}`}
                alt={p.name}
              />
              <span>{p.name}</span>
            </div>

            <span>{p.category}</span>
            <span>₹{formatPrice(p.price)}</span>
            <span>{p.stock}</span>

            <div className="actions">
              <FaEdit onClick={() => handleEdit(p)} />
              <FaTrash onClick={() => handleDelete(p._id)} />
            </div>
          </div>
        ))}

      </div>

      {/* PAGINATION */}
      <div className="pagination">
        {[...Array(Math.ceil(filtered.length / itemsPerPage))].map((_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">

            <h2>{editProduct ? "Edit" : "Add"} Product</h2>

            <form onSubmit={handleSubmit} className="product-form">

              <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />

              <select name="category" value={form.category} onChange={handleChange}>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
              <input name="oldPrice" placeholder="Old Price" value={form.oldPrice} onChange={handleChange} />

              <input name="discount" placeholder="Discount %" value={form.discount} readOnly />

              <input name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} required />

              <input type="file" name="image" onChange={handleChange} />

              <label>
                <input type="checkbox" name="bestseller" checked={form.bestseller} onChange={handleChange} />
                Bestseller
              </label>

              <div className="modal-actions">
                <button type="button" onClick={resetForm}>Cancel</button>
                <button type="submit">Save</button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default Products;