import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
const url = "https://food-delivery-app-zl53.onrender.com/api";

  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");

  // 🔍 NEW SEARCH STATE
  const [searchText, setSearchText] = useState("");

  // ================= FETCH FOOD =================
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      if (response.data.success) {
        setFoodList(response.data.data);
      } else {
        toast.error("Failed to fetch food list");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error while fetching foods");
    }
  };

  // ================= LOAD CART =================
  const loadCartData = async (userToken) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { token: userToken } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ================= ADD TO CART =================
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] + 1,
      }));
    }

    if (token) {
      try {
        const response = await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } }
        );

        if (response.data.success) {
          toast.success("Item added to cart");
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.log(error);
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
        const response = await axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { token } }
        );

        if (response.data.success) {
          toast.success("Item removed from cart");
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // ================= TOTAL CART AMOUNT =================
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find(
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
    const loadData = async () => {
      await fetchFoodList();

      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await loadCartData(savedToken);
      }
    };

    loadData();
  }, []);

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

    // 🔍 ADD THESE
    searchText,
    setSearchText,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;