import React, { useEffect, useState } from "react";
import QRScanner from "../components/QRScanner";

const Dashboard = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  const token = localStorage.getItem("token");

  const [showScanner, setShowScanner] = useState(false);
  const [scanResult, setScanResult] = useState("");
  const [scanLocked, setScanLocked] = useState(false);

  // ----------------------------
  // Fetch LIVE USER DATA
  // ----------------------------
  const fetchUserData = async () => {
    try {
      const res = await fetch("https://fitfactory-backend1-production.up.railway.app/api/auth/dashboard", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
    } catch (error) {
      console.log("Dashboard fetch error:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // ---------------------------
  // Subscription Info
  // ---------------------------
  const subscriptionStart = user.startDate;
  const subscriptionEnd = user.expiryDate;

  const [timeLeft, setTimeLeft] = useState({
    expired: true,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = () => {
    if (!subscriptionEnd || subscriptionEnd === "-") return { expired: true };

    const now = new Date();
    const expiry = new Date(subscriptionEnd);
    const diff = expiry - now;

    if (diff <= 0) return { expired: true };

    return {
      expired: false,
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [subscriptionEnd]);

  // ---------------------------
  // Logout
  // ---------------------------
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  // ---------------------------
  // QR SCAN HANDLER
  // ---------------------------
  const handleQR = async (qrText) => {
    if (scanLocked) return;

    setScanLocked(true);
    setScanResult(qrText);
    setShowScanner(false);

    try {
      const res = await fetch("https://fitfactory-backend1-production.up.railway.app/api/auth/scan-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ qrCode: qrText }),
      });

      const data = await res.json();
      alert(data.message);

      fetchUserData();
    } catch (error) {
      alert("Scan error! Backend not responding.");
    }

    setTimeout(() => setScanLocked(false), 2000);
  };

  // ---------------------------
  // Status Badge
  // ---------------------------
  const StatusBadge = () => {
    return timeLeft.expired ? (
      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
        Expired
      </span>
    ) : (
      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
        Active
      </span>
    );
  };

  return (
    <div className="pt-28 min-h-screen bg-gray-100 px-4 flex justify-center">
      <div className="bg-white p-8 shadow-xl rounded-2xl w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome, {user.name || "User"} 👋
        </h2>
        <p className="text-center text-gray-600">{user.email}</p>

        <div className="text-center mt-3">
          <StatusBadge />
        </div>

        <div className="bg-gray-50 p-5 mt-6 rounded-xl shadow space-y-2">
          <p><strong>Phone:</strong> {user.phone || "Not Added"}</p>
          <p><strong>Plan:</strong> {user.plan || "None"}</p>
          <p><strong>Status:</strong> {timeLeft.expired ? "Expired" : "Active"}</p>
          <p><strong>Start Date:</strong> {subscriptionStart || "-"}</p>
          <p><strong>End Date:</strong> {subscriptionEnd || "-"}</p>
        </div>

        <div className="bg-gray-100 p-5 mt-6 rounded-xl text-center shadow-inner">
          {!timeLeft.expired ? (
            <>
              <h3 className="text-xl font-semibold mb-2">⏳ Time Remaining</h3>
              <div className="flex justify-center gap-4 text-lg font-bold text-blue-600">
                <div>{timeLeft.days}d</div>
                <div>{timeLeft.hours}h</div>
                <div>{timeLeft.minutes}m</div>
                <div>{timeLeft.seconds}s</div>
              </div>
            </>
          ) : (
            <h3 className="text-xl font-bold text-red-600">❌ Subscription Expired</h3>
          )}
        </div>

        {!timeLeft.expired && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowScanner(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              📷 Scan QR & Enter Gym
            </button>
          </div>
        )}

        {scanResult && (
          <p className="text-center mt-4 text-gray-700">
            Last Scan: <strong>{scanResult}</strong>
          </p>
        )}

        {showScanner && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded-xl shadow-xl w-[90%] max-w-md relative">

              <button
                onClick={() => setShowScanner(false)}
                className="absolute top-2 right-3 text-xl"
              >
                ✖
              </button>

              <h3 className="text-xl mb-4 font-semibold text-center">
                Scan Gym QR Code
              </h3>

              <QRScanner onScan={handleQR} />
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white mt-8 py-3 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Dashboard;