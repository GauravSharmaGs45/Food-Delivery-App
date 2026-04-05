import React, { useState } from "react";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
const Menu = () => {
  const [category, setCategory] = useState("All");
  const { searchText } = useContext(StoreContext);

  return (
    <div className="menu-page">
      <h2 style={{ textAlign: "center", margin: "40px 0" }}>
        Our Menu
      </h2>
      <FoodDisplay category={category} />
    </div>
  );
};

export default Menu;