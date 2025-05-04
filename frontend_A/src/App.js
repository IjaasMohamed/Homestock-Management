import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import './App.css';
import StockManager from './Components/Stock Manager/StockManager';
import AddStock from './Components/Add Stock/AddStock';
import EditStock from './Components/Edit Stock/EditStock';
import StockAlerts from './Components/StockAlerts/StockAlerts';

function App() {
  return (
    <Router>

      <div>
      <Header/>
      <Routes>
      
      <Route path="/StockManager" element={<StockManager />} />
      <Route path="/AddStock" element={<AddStock/>} />
      <Route path="/EditStock/:id" element={<EditStock/>} />
      <Route path="/StockAlerts" element={<StockAlerts/>} />
      </Routes>
    </div>
    </Router>
    
  );
}

export default App;
