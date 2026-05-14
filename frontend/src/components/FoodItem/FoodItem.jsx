import React, { useContext } from "react";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, image }) => {
  const { cartItems, addToCart, url } = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={`${url}/uploads/${image}`}
          alt={name}
        />

        <button
          className="add-btn"
          onClick={() => addToCart(id)}
        >
          +
        </button>
      </div>

      <div className="food-item-info">
        <h3>{name}</h3>
        <p className="food-item-price">₹ {price}</p>
      </div>
    </div>
  );
};

export default FoodItem;