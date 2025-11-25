import React, { useEffect, useState } from "react";

const AdminFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const adminToken = localStorage.getItem("adminToken");

  // Fetch feedback from backend
  const fetchFeedback = async () => {
    try {
      const res = await fetch("https://fitfactory-backend1-production.up.railway.app/api/admin/feedback", {
        headers: { Authorization: adminToken },
      });

      const data = await res.json();
      if (!res.ok) {
        setError("Failed to load feedback!");
        setLoading(false);
        return;
      }

      setFeedbackList(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Server Error");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  // Delete Feedback
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this feedback?");
    if (!confirm) return;

    try {
      const res = await fetch(`https://fitfactory-backend1-production.up.railway.app/api/admin/feedback/${id}`, {
        method: "DELETE",
        headers: { Authorization: adminToken },
      });

      const data = await res.json();
      if (!res.ok) return alert(data.message);

      alert("Feedback deleted successfully!");

      // Remove from UI
      setFeedbackList(feedbackList.filter((fb) => fb._id !== id));
    } catch (err) {
      alert("Error deleting feedback");
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 text-center text-xl">
        Loading feedback...
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 text-center text-red-600 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="flex-1 pt-24 px-4 sm:px-6 md:px-16 bg-gray-100 min-h-screen">

      <h2 className="text-3xl font-bold mb-6">User Feedback 📝</h2>

      {/* If no feedback */}
      {feedbackList.length === 0 ? (
        <p className="text-gray-700 text-lg">No feedback submitted yet.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-xl p-6 shadow">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Message</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {feedbackList.map((fb) => (
                  <tr key={fb._id} className="border-b hover:bg-gray-100">
                    <td className="p-3">{fb.name}</td>
                    <td className="p-3">{fb.email}</td>
                    <td className="p-3">{fb.message}</td>
                    <td className="p-3">
                      <button
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        onClick={() => handleDelete(fb._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-5 mt-6">
            {feedbackList.map((fb) => (
              <div key={fb._id} className="bg-white p-5 rounded-xl shadow">
                <h3 className="text-xl font-bold">{fb.name}</h3>
                <p className="text-gray-700">{fb.email}</p>

                <p className="mt-3 text-gray-800">
                  <strong>Feedback:</strong> {fb.message}
                </p>

                <button
                  className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                  onClick={() => handleDelete(fb._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminFeedback;