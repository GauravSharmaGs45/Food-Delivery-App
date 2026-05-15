import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {

  try {

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: "receipt_order",
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order,
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: "Payment Failed",
    });
  }
};

export { createOrder };