import React from "react";

function Card({ className, children }) {
    return (
        <div className={`rounded-lg shadow-md p-4 ${className}`}>
            {children}
        </div>
    );
}

export default Card;
