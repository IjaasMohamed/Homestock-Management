import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./StockManager.css";
import StockAlerts from '../StockAlerts/StockAlerts';
import { FaPlus, FaEdit, FaTrash, FaFileAlt } from "react-icons/fa";

export default function StockManager() {
  const [showStockAlerts, setShowStockAlerts] = useState(false);

  const [stocks, setStocks] = useState([]);
  const [editingStock, setEditingStock] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    function getStocks() {
      axios
        .get("http://localhost:8070/stock")
        .then((res) => {
          setStocks(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });

    }
    
    getStocks();
  }, []);

  const categories = [
    "Food and Beverages",
    "Toiletries & Personal",
    "Electronics",
    "Kitchen Essentials",
    "Medical Supplies",
  ];

  function handleEdit(stock) {
    setEditingStock(stock);
    navigate(`/EditStock/${stock._id}`);
  }

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this stock?")) {
      axios
        .delete(`http://localhost:8070/stock/${id}`)
        .then(() => {
          alert("Stock deleted successfully!");
          setStocks(stocks.filter((stock) => stock._id !== id));
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  }
  const [searchQuery, setSearchQuery] = useState("");
  function handleSearch(event) {
    setSearchQuery(event.target.value.toLowerCase());
  }
  const [selectedCategory, setSelectedCategory] = useState("");

  
  const handleButtonClick = () => {
    setShowStockAlerts(true);
  };
  return (
    <div className="stock-manager">
      <header>
        <h1> My Stock Manager</h1>
        <div className="stats">
          <div className="stat-box">
            <h2>18 STOCK ITEMS</h2>
            <p>TOTAL ITEMS: 20</p>
            
          </div>
          <button className="secondary-btn">💰 Budget Planner</button>
          <div className="action-buttons">
            <Link to="/AddStock">
              <button className="primary-btn"><FaPlus /> Add Items</button>
            </Link>
            <Link to="/StockAlerts">
              <button className="primary-btn"onClick={handleButtonClick}>⚠️ Stock Alerts</button>
              {showStockAlerts && <StockAlerts />}
            </Link>
            
          </div>
        </div>
      </header>

      <div className="filters">
      <select onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">CATEGORY</option>
        {categories.map((cat, index) => (
        <option key={index} value={cat}>{cat}</option>
        ))}
       </select>
        <select>
          <option>STATUS </option>
          <option>In Stock</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>
        </select>
        <input type="text" 
          placeholder="🔍 Search items..." 
          className="search-box" 
          value={searchQuery} 
           onChange={handleSearch} />
        </div>

      <div className="stock-table-container">
        <table>
          <thead>
            <tr>
              <th>CATEGORY</th>
              <th>Item Name</th>
              <th>Stock Quantity</th>
              <th>Total Amount</th>
              <th>Expiry Date</th>
              <th>Manufacture Date</th>
              <th>Purchase Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {stocks
            .filter(item => item.itemName.toLowerCase().includes(searchQuery))
            .filter(item => selectedCategory === "" || item.categoryName === selectedCategory)
            .map((item, index) => (


              <tr key={index}>
                <td>{item.categoryName}</td>
                <td>{item.itemName}</td>
                <td>{item.stockQuantity}</td>
                <td>{item.totalAmount}</td>
                <td>{item.expiredDate}</td>
                <td>{item.manufactureDate}</td>
                <td>{item.purchaseDate}</td>
                <td>
                  <div className="action-icons">
                    <button className="edit-btn" onClick={() => handleEdit(item)}><FaEdit /></button>
                    <button className="delete-btn" onClick={() => handleDelete(item._id)}><FaTrash /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="reports-section">
        
        
        <button className="report-btn"><FaFileAlt /> Generate Report</button>
      </div>
    </div>
  );
}
