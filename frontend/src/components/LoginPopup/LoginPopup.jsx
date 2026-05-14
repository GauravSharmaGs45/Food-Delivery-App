import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin }) => {

  const { url, setToken } = useContext(StoreContext);

  const [currentState, setCurrentState] = useState("Login");

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ================= INPUT CHANGE =================

  const onChangeHandler = (event) => {

    const name = event.target.name;
    const value = event.target.value;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ================= LOGIN / SIGNUP =================

  const onLogin = async (event) => {

    event.preventDefault();

    setLoading(true);

    try {

      let newUrl = url;

      if (currentState === "Login") {
        newUrl += "/api/user/login";
      } else {
        newUrl += "/api/user/register";
      }

      console.log("API URL:", newUrl);
      console.log("Sending Data:", data);

      toast.info(
        "Server waking up... please wait 30-60 seconds"
      );

      const response = await axios.post(
        newUrl,
        data,
        {
          timeout: 120000,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response.data);

      if (response.data.success) {

        setToken(response.data.token);

        localStorage.setItem(
          "token",
          response.data.token
        );

        toast.success(
          currentState === "Login"
            ? "Login Successful"
            : "Account Created Successfully"
        );

        setShowLogin(false);

      } else {

        toast.error(
          response.data.message ||
          "Something went wrong"
        );
      }

    } catch (error) {

      console.log("FULL ERROR:", error);

      if (error.code === "ECONNABORTED") {

        toast.error(
          "Server is still waking up. Try again in 30 seconds."
        );

      } else if (error.response) {

        toast.error(
          error.response.data.message ||
          "Backend Error"
        );

      } else if (error.request) {

        toast.error(
          "Backend server not responding"
        );

      } else {

        toast.error("Something went wrong");
      }

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="login-popup">

      <form
        onSubmit={onLogin}
        className="login-popup-container"
      >

        {/* TITLE */}

        <div className="login-popup-title">

          <h2>{currentState}</h2>

          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />

        </div>

        {/* INPUTS */}

        <div className="login-popup-inputs">

          {currentState === "Sign Up" && (

            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />

          )}

          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />

        </div>

        {/* BUTTON */}

        <button type="submit" disabled={loading}>

          {loading
            ? "Please wait..."
            : currentState === "Sign Up"
            ? "Create Account"
            : "Login"}

        </button>

        {/* TERMS */}

        <div className="login-popup-condition">

          <input type="checkbox" required />

          <p>
            By continuing, I agree to the terms of
            use & privacy policy.
          </p>

        </div>

        {/* SWITCH LOGIN / SIGNUP */}

        {currentState === "Login" ? (

          <p>
            Create a new account?{" "}

            <span
              onClick={() =>
                setCurrentState("Sign Up")
              }
            >
              Click here
            </span>

          </p>

        ) : (

          <p>
            Already have an account?{" "}

            <span
              onClick={() =>
                setCurrentState("Login")
              }
            >
              Login here
            </span>

          </p>

        )}

      </form>

    </div>
  );
};

export default LoginPopup;