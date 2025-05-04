import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditStock() {
  const { id } = useParams(); // Get stock ID from the URL
  const navigate = useNavigate(); // Hook for navigation
  const [stock, setStock] = useState({
    categoryName: "",
    itemName: "",
    stockQuantity: "",
    totalAmount: "",
    expiredDate: "",
    manufactureDate: "",
    purchaseDate: "",
  });

  useEffect(() => {
    // Fetch stock data by ID
    axios
      .get(`http://localhost:8070/stock/${id}`) // Update endpoint to match your backend
      .then((res) => {
        setStock(res.data); // Set stock data to state
      })
      .catch((err) => {
        alert(err.message); // Handle error
      });
  }, [id]);

  function handleUpdate(e) {
    e.preventDefault();

    // Update stock data
    axios
      .put(`http://localhost:8070/stock/${id}`, stock) // Update endpoint to match your backend
      .then(() => {
        alert("Stock updated successfully!");
        navigate("/"); // Redirect back to the All Stocks page
      })
      .catch((err) => {
        alert(err.message); // Handle error
      });
  }

  return (
    <div
      className="container"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        className="form-container"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Edit Stock</h1>
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label> Category Name</label>
            <select
              className="form-control"
              value={stock.categoryName}
              onChange={(e) =>
                setStock({ ...stock, categoryName: e.target.value })
              }
            >
              <option value="">Select Category</option>
              <option value="Food and Beverages">Food and Beverages</option>
              <option value="Toiletries & Personal">Toiletries & Personal</option>
              <option value="electronics">Electronics</option>
              <option value="Kitchen Essentials">Kitchen Essentials</option>
              <option value="Medical Supplies">Medical Supplies</option>
            </select>
          </div>
          <div className="form-group">
            <label>Item Name</label>
            <input
              type="text"
              className="form-control"
              value={stock.itemName}
              onChange={(e) =>
                setStock({ ...stock, itemName: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Stock Quantity</label>
            <input
              type="text"
              className="form-control"
              value={stock.stockQuantity}
              onChange={(e) =>
                setStock({ ...stock, stockQuantity: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Total Amount</label>
            <input
              type="number"
              className="form-control"
              value={stock.totalAmount}
              onChange={(e) =>
                setStock({ ...stock, totalAmount: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Expiry Date</label>
            <input
              type="date"
              className="form-control"
              value={stock.expiredDate}
              onChange={(e) =>
                setStock({ ...stock, expiredDate: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Manufacture Date</label>
            <input
              type="date"
              className="form-control"
              value={stock.manufactureDate}
              onChange={(e) =>
                setStock({ ...stock, manufactureDate: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Purchase Date</label>
            <input
              type="date"
              className="form-control"
              value={stock.purchaseDate}
              onChange={(e) =>
                setStock({ ...stock, purchaseDate: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className="btn btn-success w-100"
            style={{ marginTop: "10px" }}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
