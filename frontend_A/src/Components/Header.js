import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        background: "linear-gradient(to right,rgb(247, 250, 247),rgb(248, 248, 248))",
        color: "white",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div className="container">
        {/* Link to the home page */}
        <Link
          to="/"
          className="navbar-brand"
          style={{
            fontWeight: "bold",
            color: "black",
            fontSize: "1.5rem",
            letterSpacing: "1px",
          }}
        >
          🌱 Home Stock
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {[
              { label: "Home" },
              { label: "My Stocks",path:"/StockManager" },
              { label: "My Budget" },
              { label: "Blog"},
              { label: "Help & Support" },
            ].map((item, index) => (
              <li className="nav-item" key={index}>
                <Link
                  to={item.path}
                  className="nav-link"
                  style={{
                    fontWeight: "500",
                    color: "Black",
                    margin: "0 10px",
                    fontSize: "1rem",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "red")}
                  onMouseLeave={(e) => (e.target.style.color = "black")}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
