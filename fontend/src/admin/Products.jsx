// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
// import "./products.css";

// const categories = ["Mobile", "Laptops", "Audio", "Accessories", "Gaming"];

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editProduct, setEditProduct] = useState(null);
//   const [search, setSearch] = useState("");

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   const [form, setForm] = useState({
//     name: "",
//     category: "Mobile",
//     price: "",
//     oldPrice: "",
//     discount: "",
//     bestseller: false,
//     stock: "",
//     image: null
//   });

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     const result = products.filter((p) =>
//       p.name.toLowerCase().includes(search.toLowerCase())
//     );
//     setFiltered(result);
//     setCurrentPage(1);
//   }, [search, products]);

//   const fetchProducts = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:5000/api/products");
//       setProducts(data);
//     } catch (err) {
//       console.error("Error fetching products:", err.message);
//     }
//   };

//   const formatPrice = (price) =>
//     new Intl.NumberFormat("en-IN").format(price);

//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;

//     if (type === "file") {
//       setForm({ ...form, image: files[0] });
//     } else {
//       setForm({
//         ...form,
//         [name]: type === "checkbox" ? checked : value
//       });
//     }

//     if (name === "price" || name === "oldPrice") {
//       const price = name === "price" ? value : form.price;
//       const oldPrice = name === "oldPrice" ? value : form.oldPrice;

//       if (price && oldPrice) {
//         const discount = Math.round(
//           ((oldPrice - price) / oldPrice) * 100
//         );
//         setForm((prev) => ({ ...prev, discount }));
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     Object.keys(form).forEach((key) => {
//       formData.append(key, form[key]);
//     });

//     if (editProduct) {
//       await axios.put(
//         `http://localhost:5000/api/products/${editProduct._id}`,
//         formData
//       );
//     } else {
//       await axios.post(
//         "http://localhost:5000/api/products",
//         formData
//       );
//     }

//     resetForm();
//     fetchProducts();
//   };

//   const resetForm = () => {
//     setShowModal(false);
//     setEditProduct(null);
//     setForm({
//       name: "",
//       category: "Mobile",
//       price: "",
//       oldPrice: "",
//       discount: "",
//       bestseller: false,
//       stock: "",
//       image: null
//     });
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Delete product?")) {
//       await axios.delete(`http://localhost:5000/api/products/${id}`);
//       fetchProducts();
//     }
//   };

//   const handleEdit = (p) => {
//     setEditProduct(p);
//     setForm({ ...p, image: null });
//     setShowModal(true);
//   };

//   const indexOfLast = currentPage * itemsPerPage;
//   const currentItems = filtered.slice(indexOfLast - itemsPerPage, indexOfLast);

//   return (
//     <div className="products-page">

//       {/* TOP BAR */}
//       <div className="top-bar">
//         <h1>Products</h1>

//         <input
//           type="text"
//           placeholder="Search product..."
//           className="search-box"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <button className="add-btn" onClick={() => setShowModal(true)}>
//           <FaPlus /> Add Product
//         </button>
//       </div>

//    <div className="table-container">
//   <div className="product-table">

//     <div className="table-head-2">
//       <span>IMAGE</span>
//       <span>NAME</span>
//       <span>CATEGORY</span>
//       <span>PRICE</span>
//       <span>STOCK</span>
//       <span>ACTIONS</span>
//     </div>

//     {currentItems.map((p) => (
//       <div className="table-row-2" key={p._id}>
//         <img
//           src={`http://localhost:5000/uploads/${p.image}`}
//           alt=""
//           className="product-img"
//         />

//         <span>{p.name}</span>
//         <span>{p.category}</span>
//         <span>₹{p.price}</span>
//         <span>{p.stock}</span>

//         <div className="actions">
//           <FaEdit onClick={() => handleEdit(p)} />
//           <FaTrash onClick={() => handleDelete(p._id)} />
//         </div>
//       </div>
//     ))}
//   </div>
// </div>

//       {/* PAGINATION */}
//       <div className="pagination">
//         {[...Array(Math.ceil(filtered.length / itemsPerPage))].map((_, i) => (
//           <button key={i} onClick={() => setCurrentPage(i + 1)}>
//             {i + 1}
//           </button>
//         ))}
//       </div>

//       {/* MODAL */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal">

//             <h2>{editProduct ? "Edit" : "Add"} Product</h2>

//             <form onSubmit={handleSubmit} className="product-form">

//               <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />

//               <select name="category" value={form.category} onChange={handleChange}>
//                 {categories.map((c) => (
//                   <option key={c}>{c}</option>
//                 ))}
//               </select>

//               <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
//               <input name="oldPrice" placeholder="Old Price" value={form.oldPrice} onChange={handleChange} />

//               <input name="discount" placeholder="Discount %" value={form.discount} readOnly />

//               <input name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} required />

//               <input type="file" name="image" onChange={handleChange} />

//               <label>
//                 <input type="checkbox" name="bestseller" checked={form.bestseller} onChange={handleChange} />
//                 Bestseller
//               </label>

//               <div className="modal-actions">
//                 <button type="button" onClick={resetForm}>Cancel</button>
//                 <button type="submit">Save</button>
//               </div>

//             </form>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default Products;

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
      console.error(err);
    }
  };

  // ✅ FIXED HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setForm({ ...form, image: files[0] });
      return;
    }

    const updated = {
      ...form,
      [name]: type === "checkbox" ? checked : value
    };

    // correct discount calculation
    if (updated.price && updated.oldPrice) {
      updated.discount = Math.round(
        ((updated.oldPrice - updated.price) / updated.oldPrice) * 100
      );
    }

    setForm(updated);
  };

  // ✅ FIXED SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      if (key === "image") {
        if (form.image) formData.append("image", form.image);
      } else {
        formData.append(key, form[key]);
      }
    });

    try {
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
    } catch (err) {
      console.error(err);
    }
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

  // ✅ FIXED EDIT
  const handleEdit = (p) => {
    setEditProduct(p);

    setForm({
      name: p.name || "",
      category: p.category || "Mobile",
      price: p.price || "",
      oldPrice: p.oldPrice || "",
      discount: p.discount || "",
      bestseller: p.bestseller || false,
      stock: p.stock || "",
      image: null
    });

    setShowModal(true);
  };

  const indexOfLast = currentPage * itemsPerPage;
  const currentItems = filtered.slice(
    indexOfLast - itemsPerPage,
    indexOfLast
  );

  return (
    <div className="products-page">

      {/* TOP */}
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
      <div className="table-container">
        <div className="product-table">

          <div className="table-head-2">
            <span>IMAGE</span>
            <span>NAME</span>
            <span>CATEGORY</span>
            <span>PRICE</span>
            <span>STOCK</span>
            <span>ACTIONS</span>
          </div>

          {currentItems.map((p) => (
            <div className="table-row-2" key={p._id}>
              <img
                src={`http://localhost:5000/uploads/${p.image}`}
                alt=""
                className="product-img"
              />

              <span>{p.name}</span>
              <span>{p.category}</span>
              <span>₹{p.price}</span>
              <span>{p.stock}</span>

              <div className="actions">
                <FaEdit onClick={() => handleEdit(p)} />
                <FaTrash onClick={() => handleDelete(p._id)} />
              </div>
            </div>
          ))}
        </div>
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
          <div className="modal-1">

            {/* HEADER */}
            <div className="modal-header">
              <h2>{editProduct ? "Edit Product" : "Add Product"}</h2>
              <button onClick={resetForm}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="product-form">

              {/* IMAGE PREVIEW */}
              {editProduct && editProduct.image && (
                <div className="image-preview">
                  <img
                    src={`http://localhost:5000/uploads/${editProduct.image}`}
                    alt=""
                  />
                </div>
              )}

              <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />

              <select name="category" value={form.category} onChange={handleChange}>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <div className="row">
                <input name="price" value={form.price} onChange={handleChange} placeholder="Price" required />
                <input name="oldPrice" value={form.oldPrice} onChange={handleChange} placeholder="Old Price" />
              </div>

              <input name="discount" value={form.discount} readOnly placeholder="Discount %" />

              <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" required />

              <input type="file" name="image" onChange={handleChange} />

              <label className="checkbox">
                <input type="checkbox" name="bestseller" checked={form.bestseller} onChange={handleChange} />
                Bestseller
              </label>

              <div className="modal-actions">
                <button type="button" onClick={resetForm}>Cancel</button>
                <button type="submit">
                  {editProduct ? "Update" : "Save"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Products;