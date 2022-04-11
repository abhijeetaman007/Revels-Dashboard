import React from "react";

const Tag = ({ value, placeholder, setTag, tagid, disabled }) => {
    return (
        <input
          type="text"
          autoComplete="off"
          maxLength={40}
          disabled={disabled}
          className="m-1 h-25 rounded mx-0 text-dark font-light"
          placeholder={placeholder}
          style={{ width: '25%' }}
          value={value}
          onChange={(e) => setTag(e.target.value)}
        />
    )
}

export default Tag;