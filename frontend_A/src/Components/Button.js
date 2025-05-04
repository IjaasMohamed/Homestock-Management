import React from "react";

function Button({ className, children, ...props }) {
    return React.createElement(
        'button',
        { className: `p-2 rounded ${className}`, ...props },
        children
    );
}

export default Button;
