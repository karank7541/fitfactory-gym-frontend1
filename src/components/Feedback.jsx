import React, { useState } from "react";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      return alert("Please login to submit feedback.");
    }

    try {
      const res = await fetch("https://fitfactory-backend1-production.up.railway.app/api/feedback/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          feedback,
          rating,
        }),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.message);

      alert("Thank you for your feedback! ❤️");

      setFeedback("");
      setRating(5);

    } catch (err) {
      alert("Network Error!");
      console.error(err);
    }
  };

  return (
    <section
      id="feedback"
      className="min-h-screen px-6 md:px-16 py-20 bg-white"
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center">
        Share Your Feedback 📝
      </h2>

      <p className="text-gray-600 text-center mt-2 md:w-2/3 mx-auto">
        Help us improve your gym experience — your feedback matters!
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-gray-100 p-8 mt-12 rounded-2xl shadow-lg space-y-5"
      >
        {/* Rating */}
        <div>
          <label className="font-semibold">Rate Our Gym</label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full p-3 border rounded-lg mt-1"
          >
            <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
            <option value="4">⭐⭐⭐⭐ Good</option>
            <option value="3">⭐⭐⭐ Average</option>
            <option value="2">⭐⭐ Poor</option>
            <option value="1">⭐ Very Bad</option>
          </select>
        </div>

        {/* Feedback Text */}
        <div>
          <label className="font-semibold">Your Feedback</label>
          <textarea
            required
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="4"
            placeholder="Share your thoughts..."
            className="w-full p-3 border rounded-lg mt-1"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-bold"
        >
          Submit Feedback
        </button>
      </form>
    </section>
  );
};

export default Feedback;