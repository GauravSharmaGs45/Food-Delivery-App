import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {

  const navigate = useNavigate();

  const {
    getTotalCartAmount,
    token,
    food_list,
    cartItems,
    url,
  } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // ================= INPUT HANDLER =================

  const onChangeHandler = (event) => {

    const name = event.target.name;
    const value = event.target.value;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= RAZORPAY PAYMENT =================

  const handlePayment = async (event) => {

    event.preventDefault();

    try {

      let orderItems = [];

      food_list.map((item) => {

        if (cartItems[item._id] > 0) {

          let itemInfo = { ...item };

          itemInfo["quantity"] = cartItems[item._id];

          orderItems.push(itemInfo);
        }
      });

      const totalAmount =
        getTotalCartAmount() === 0
          ? 0
          : getTotalCartAmount() + 2;

      // ================= CREATE ORDER =================

      const response = await axios.post(
        `${url}/api/payment/create-order`,
        {
          amount: totalAmount,
        }
      );

      if (!response.data.success) {

        toast.error("Failed to create payment");

        return;
      }

      const order = response.data.order;

      // ================= RAZORPAY OPTIONS =================

      const options = {

        key: "rzp_test_SpX35e3AI2lbJT",

        amount: order.amount,

        currency: order.currency,

        name: "Food Delivery",

        description: "Food Order Payment",

        order_id: order.id,

        handler: async function (response) {

          toast.success("Payment Successful ✅");

          // ================= SAVE ORDER =================

          let orderData = {

            address: data,

            items: orderItems,

            amount: totalAmount,

            paymentId: response.razorpay_payment_id,
          };

          const saveOrder = await axios.post(
            `${url}/api/order/place`,
            orderData,
            {
              headers: { token },
            }
          );

          if (saveOrder.data.success) {

            navigate("/myorders");

          } else {

            toast.error("Order save failed");
          }
        },

        prefill: {

          name:
            data.firstName + " " + data.lastName,

          email: data.email,

          contact: data.phone,
        },

        notes: {
          address: data.street,
        },

        theme: {
          color: "#ff6347",
        },
      };

      const razor = new window.Razorpay(options);

      razor.open();

    } catch (error) {

      console.log(error);

      toast.error("Payment Failed");
    }
  };

  // ================= CHECK USER =================

  useEffect(() => {

    if (!token) {

      toast.error("Please Login First");

      navigate("/cart");

    } else if (getTotalCartAmount() === 0) {

      toast.error("Please Add Items");

      navigate("/cart");
    }

  }, [token]);

  return (

    <form
      className="place-order"
      onSubmit={handlePayment}
    >

      {/* LEFT SIDE */}

      <div className="place-order-left">

        <p className="title">
          Delivery Information
        </p>

        <div className="multi-fields">

          <input
            required
            name="firstName"
            value={data.firstName}
            onChange={onChangeHandler}
            type="text"
            placeholder="First name"
          />

          <input
            required
            name="lastName"
            value={data.lastName}
            onChange={onChangeHandler}
            type="text"
            placeholder="Last name"
          />

        </div>

        <input
          required
          name="email"
          value={data.email}
          onChange={onChangeHandler}
          type="email"
          placeholder="Email Address"
        />

        <input
          required
          name="street"
          value={data.street}
          onChange={onChangeHandler}
          type="text"
          placeholder="Street"
        />

        <div className="multi-fields">

          <input
            required
            name="city"
            value={data.city}
            onChange={onChangeHandler}
            type="text"
            placeholder="City"
          />

          <input
            required
            name="state"
            value={data.state}
            onChange={onChangeHandler}
            type="text"
            placeholder="State"
          />

        </div>

        <div className="multi-fields">

          <input
            required
            name="zipcode"
            value={data.zipcode}
            onChange={onChangeHandler}
            type="text"
            placeholder="Zip Code"
          />

          <input
            required
            name="country"
            value={data.country}
            onChange={onChangeHandler}
            type="text"
            placeholder="Country"
          />

        </div>

        <input
          required
          name="phone"
          value={data.phone}
          onChange={onChangeHandler}
          type="text"
          placeholder="Phone"
        />

      </div>

      {/* RIGHT SIDE */}

      <div className="place-order-right">

        <div className="cart-total">

          <h2>Cart Totals</h2>

          <div>

            <div className="cart-total-details">

              <p>Subtotal</p>

              <p>${getTotalCartAmount()}</p>

            </div>

            <hr />

            <div className="cart-total-details">

              <p>Delivery Fee</p>

              <p>
                ${getTotalCartAmount() === 0 ? 0 : 2}
              </p>

            </div>

            <hr />

            <div className="cart-total-details">

              <b>Total</b>

              <b>
                $
                {getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + 2}
              </b>

            </div>

          </div>

          <button type="submit">

            PROCEED TO PAYMENT

          </button>

        </div>

      </div>

    </form>
  );
};

export default PlaceOrder;