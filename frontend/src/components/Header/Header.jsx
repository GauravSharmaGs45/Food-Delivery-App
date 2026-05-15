import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();

  return (
    <div className="header">

      <div className="header-contents">

        <h2>Order your favourite food here</h2>

        <p>
          Discover delicious meals from top restaurants near you.
          Fast delivery, fresh ingredients, and amazing taste —
          only on YumHub.
        </p>

        <button onClick={() => navigate("/menu")}>
          View Menu
        </button>

      </div>

    </div>
  );
};

export default Header;