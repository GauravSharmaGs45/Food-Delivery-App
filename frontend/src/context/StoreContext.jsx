import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

  // ================= BACKEND URL =================

  const url = "https://food-delivery-app-zl53.onrender.com";

  // ================= STATES =================

  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  // ================= FETCH FOOD LIST =================

  const fetchFoodList = async () => {

    try {

      console.log("Fetching food list from:", url);

      const response = await axios.get(
        `${url}/api/food/list`,
        {
          timeout: 30000,
        }
      );

      console.log("FOOD RESPONSE:", response.data);

      if (response.data.success) {

        setFoodList(response.data.data);

      } else {

        toast.error("Failed to load food items");

      }

    } catch (error) {

      console.log("FOOD ERROR:", error);

      if (error.code === "ECONNABORTED") {

        toast.info(
          "Server waking up... please wait 30-60 seconds"
        );

      } else if (error.response) {

        toast.error(
          error.response.data.message || "Server Error"
        );

      } else {

        toast.error("Backend server not responding");

      }

    } finally {

      setLoading(false);

    }
  };

  // ================= LOAD CART =================

  const loadCartData = async (userToken) => {

    try {

      const response = await axios.post(
        `${url}/api/cart/get`,
        {},
        {
          headers: {
            token: userToken,
          },
        }
      );

      console.log("CART RESPONSE:", response.data);

      if (response.data.success) {

        setCartItems(response.data.cartData);

      }

    } catch (error) {

      console.log("CART ERROR:", error);

    }
  };

  // ================= ADD TO CART =================

  const addToCart = async (itemId) => {

    if (!cartItems[itemId]) {

      setCartItems((prev) => ({
        ...prev,
        [itemId]: 1,
      }));

    } else {

      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] + 1,
      }));

    }

    if (token) {

      try {

        await axios.post(
          `${url}/api/cart/add`,
          { itemId },
          {
            headers: {
              token,
            },
          }
        );

      } catch (error) {

        console.log("ADD CART ERROR:", error);

      }
    }
  };

  // ================= REMOVE FROM CART =================

  const removeFromCart = async (itemId) => {

    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));

    if (token) {

      try {

        await axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          {
            headers: {
              token,
            },
          }
        );

      } catch (error) {

        console.log("REMOVE CART ERROR:", error);

      }
    }
  };

  // ================= TOTAL CART =================

  const getTotalCartAmount = () => {

    let totalAmount = 0;

    for (const item in cartItems) {

      if (cartItems[item] > 0) {

        let itemInfo = food_list.find(
          (product) => product._id === item
        );

        if (itemInfo) {

          totalAmount += itemInfo.price * cartItems[item];

        }
      }
    }

    return totalAmount;
  };

  // ================= LOAD INITIAL DATA =================

  useEffect(() => {

    async function loadData() {

      await fetchFoodList();

      const savedToken = localStorage.getItem("token");

      if (savedToken) {

        setToken(savedToken);

        await loadCartData(savedToken);

      }
    }

    loadData();

  }, []);

  // ================= CONTEXT VALUE =================

  const contextValue = {

    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    searchText,
    setSearchText,
    loading,

  };

  return (

    <StoreContext.Provider value={contextValue}>

      {props.children}

    </StoreContext.Provider>

  );
};

export default StoreContextProvider;