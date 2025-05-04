import React, { useEffect, useState } from "react";
import "./StockAlerts.css";

export default function StockAlerts() {
    const [expiredItems, setExpiredItems] = useState([]);
    const [lowStockItems, setLowStockItems] = useState([]);

    useEffect(() => {
        // Fetch low stock items
        fetch("http://localhost:8070/stock/low-stock")
            .then(response => response.json())
            .then(data => setLowStockItems(data.sort((a, b) => a.stock - b.stock))) // Sort by lowest stock
            .catch(error => console.error("Error fetching low stock items:", error));

        // Fetch expiring soon items
        fetch("http://localhost:8070/stock/expiring-soon")
            .then(response => response.json())
            .then(data => setExpiredItems(data.sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate)))) // Sort by expiry date
            .catch(error => console.error("Error fetching expiring items:", error));
    }, []);

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4"> Stock Alerts</h2>

            {/* Expired Stock Table */}
            <h3 className="text-lg font-semibold text-red-500 mb-2">🔴 Expired Stock</h3>
            <table className="w-full border-collapse border border-gray-300 mb-6">
                <thead>
                    <tr className="bg-red-100">
                        <th className="border p-2">🏷 Item Name</th>
                        <th className="border p-2">📅 Expiry Date</th>
                        <th className="border p-2">⚠ Status</th>
                    </tr>
                </thead>
                <tbody>
                    {expiredItems.length > 0 ? (
                        expiredItems.map((item) => (
                            <tr key={item._id} className="border">
                                <td className="border p-2">{item.name}</td>
                                <td className="border p-2">{new Date(item.expiryDate).toLocaleDateString()}</td>
                                <td className="border p-2 text-red-500">Expired</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center p-2">✅ No expired items</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Low Stock Table */}
            <h3 className="text-lg font-semibold text-yellow-500 mb-2">🟡 Low Stock</h3>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-yellow-100">
                        <th className="border p-2">🏷 Item Name</th>
                        <th className="border p-2">📦 Current Stock</th>
                        <th className="border p-2">⚠ Status</th>
                    </tr>
                </thead>
                <tbody>
                    {lowStockItems.length > 0 ? (
                        lowStockItems.map((item) => (
                            <tr key={item._id} className="border">
                                <td className="border p-2">{item.name}</td>
                                <td className="border p-2">{item.stock} units</td>
                                <td className="border p-2 text-yellow-500">Low Stock</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center p-2">✅ Stock levels are good</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
