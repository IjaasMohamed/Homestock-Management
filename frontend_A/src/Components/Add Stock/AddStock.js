import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./AddStock.css";
import axios from "axios";


export default function AddStock() {
  const navigate = useNavigate(); // Initialize navigation

  const [categoryName, setCategoryname] = useState("");
  const [itemName, setItemname] = useState("");
  const [stockQuantity, setStockquantity] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [expiredDate, setExpiredDate] = useState("");
  const [manufactureDate, setManufactureDate] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");

  function sendData(e) {
    e.preventDefault();

    const newStock = {
      categoryName,
      itemName,
      stockQuantity,
      totalAmount,
      expiredDate,
      manufactureDate,
      purchaseDate,
    };

    axios
      .post("http://localhost:8070/stock/add", newStock)
      .then(() => {
        alert("Stock Added");
        setCategoryname("");// if input added successfully it will getting the blank
        setItemname("");
        setStockquantity("");
        setTotalAmount("");
        setExpiredDate("");
        setManufactureDate("");
        setPurchaseDate("");
        //navigate("/login"); // Redirect to Login page after successful signup
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container">
    
        <h1 style={{
          color: "#FF5733",
          fontWeight: "bold",
          fontSize: "2rem",
          textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
          textAlign:"center"
        }}>Add Stock</h1>
        <div className="form-container">
        <form onSubmit={sendData} style={{ overflowY: "auto" }}>
          <div className="form-group">
            <label htmlFor="categoryname">Category Name</label>
            <select
              
              className="form-control"
              id="categoryname"
              value={categoryName}
              
              onChange={(e) => setCategoryname(e.target.value)}
              required
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
            <label htmlFor="Itemname">Item Name</label>
            <input
              type="text"
              className="form-control"
              id="Itemname"
              placeholder="Enter Item name"
              onChange={(e) => setItemname(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              className="form-control"
              id="quantity"
              placeholder="Enter stock quantity"
              onChange={(e) => setStockquantity(e.target.value)}
              //required
            />
            
          </div>
          <div className="form-group">
            <label htmlFor="totalamount">Total Amount</label>
            <input
              type="totalamount"
              className="form-control"
              id="total amount"
              placeholder="Enter total amount"
              onChange={(e) => setTotalAmount(e.target.value)}
              
              
            />
          </div>
          
          <div className="form-group">
             <label htmlFor="block font-medium">Expiry Date:</label>
             <input 
               type="date" 
               className="expiryDate" 
               id="expiryDate"
               
               onChange={(e) => setExpiredDate(e.target.value)} 
                         
            />
          </div>
          {/* Manufacture Date */}
          <div>
            <label htmlFor="block font-medium">Manufacture Date:</label>
            <input 
               type="date" 
               name="manufactureDate" 
               
               onChange={(e) => setManufactureDate(e.target.value)} 
             />
         </div>
         {/* Purchase Date */}
         <div>
            <label htmlFor="block font-medium">Purchase Date: Date:</label>
            <input 
               type="date" 
               name="purchaseDate" 
                
               onChange={(e) => setPurchaseDate(e.target.value)} 
             />
         </div>
          <button type="submit" className="btn btn-primary w-100" style={{ marginBottom: "10px" }}>
            Submit
          </button>
          
        </form>
      </div>
    </div>
  );
}
