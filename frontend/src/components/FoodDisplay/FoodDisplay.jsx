import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list, searchText } = useContext(StoreContext);

  // 🔍 Filter logic
  const filteredList = food_list.filter((item) => {
    const matchesCategory =
      category === "All" || category === item.category;

    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="food-display">

      {/* 🔥 HEADING */}
      <h2 style={{ margin: "20px 0" }}>
        {searchText
          ? `Search results for "${searchText}"`
          : "Explore our menu"}
      </h2>

      {/* 🔥 FOOD LIST */}
      <div className="food-display-list">
        {filteredList.length > 0 ? (
          filteredList.map((item) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%" }}>
            No food found 😢
          </p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;