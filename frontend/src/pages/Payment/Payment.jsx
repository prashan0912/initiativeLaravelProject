import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/cart");
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + parseFloat(item.price),
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:8000/api/checkout", {
        amount: totalPrice,
        payment_details: form,
      });

      alert("Payment Successful 🎉");
      navigate("/success");
    } catch (error) {
      alert("Payment Failed ");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-slate-900 flex items-center justify-center p-8">
      <div className="grid lg:grid-cols-2 gap-10 w-full max-w-6xl">
        
        {/* Payment Form */}
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-6">
            💳 Payment Details
          </h2>

          <form onSubmit={handlePayment} className="space-y-5">
            <input
              type="text"
              name="cardName"
              placeholder="Cardholder Name"
              value={form.cardName}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-slate-800 text-white outline-none focus:ring-2 focus:ring-purple-500"
            />

            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={form.cardNumber}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-slate-800 text-white outline-none focus:ring-2 focus:ring-purple-500"
            />

            <div className="flex gap-4">
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={form.expiry}
                onChange={handleChange}
                required
                className="w-1/2 p-3 rounded-xl bg-slate-800 text-white outline-none focus:ring-2 focus:ring-purple-500"
              />

              <input
                type="password"
                name="cvv"
                placeholder="CVV"
                value={form.cvv}
                onChange={handleChange}
                required
                className="w-1/2 p-3 rounded-xl bg-slate-800 text-white outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-xl text-white font-semibold hover:opacity-90 transition-all"
            >
              {loading ? "Processing..." : `Pay $${totalPrice.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-6">
            🛒 Order Summary
          </h2>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-slate-300 border-b border-slate-700 pb-2"
              >
                <span>{item.title}</span>
                <span>${item.price}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-xl font-bold text-white mt-6">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

      </div>
    </div>
  );
}