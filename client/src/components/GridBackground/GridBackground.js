import React from "react";
import "./GridBackground.css"

const GridBackground = ({ children }) => {
    return (
        <div className="grid-back">
            {children}
        </div>
    )
}

export default GridBackground;