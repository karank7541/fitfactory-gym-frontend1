const Plans = () => {
  return (
    <section id="plans" className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Membership Plans</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* 1 Month Basic Plan */}
          <div className="bg-white shadow-lg p-8 rounded-2xl border hover:scale-105 transition">
            <h3 className="text-2xl font-bold mb-4">Basic Plan</h3>
            <p className="text-gray-600 mb-4">
              Affordable plan for beginners. 
            </p>

            <p className="text-4xl font-extrabold text-blue-600 mb-6">₹1499</p>

            <ul className="space-y-3 text-gray-700">
              <li>✔ Full Gym Access</li>
              <li>✔ Weight Training</li>
              <li>✔ Trainer Assistance</li>
              <li>✔ Locker Facility</li>
              <li>✖ Cardio</li>
            </ul>

            <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
              Choose Plan
            </button>
          </div>

          {/* 3 Month Basic Plus Plan */}
          <div className="bg-white shadow-lg p-8 rounded-2xl border hover:scale-105 transition">
            <h3 className="text-2xl font-bold mb-4">Basic Plus (3 Months)</h3>
            <p className="text-gray-600 mb-4">
              Best value plan for long-term fitness.
            </p>

            <p className="text-4xl font-extrabold text-blue-600 mb-6">₹2999</p>

            <ul className="space-y-3 text-gray-700">
              <li>✔ Full Gym Access</li>
              <li>✔ Weight Training</li>
              <li>✔ Trainer Assistance</li>
              <li>✔ Locker Facility</li>
              <li>✖ Cardio</li>
            </ul>

            <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
              Choose Plan
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-white shadow-lg p-8 rounded-2xl border-2 border-blue-600 hover:scale-105 transition">
            <h3 className="text-2xl font-bold mb-4">Premium Plan (3 Months)</h3>
            <p className="text-gray-600 mb-4">
              Full access with dedicated cardio zone.
            </p>

            <p className="text-4xl font-extrabold text-blue-600 mb-6">₹3999</p>

            <ul className="space-y-3 text-gray-700">
              <li>✔ Full Gym Access</li>
              <li>✔ Weight Training</li>
              <li>✔ Trainer Support</li>
              <li>✔ Locker Facility</li>
              <li>✔ Cardio Access</li>
            </ul>

            <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
              Choose Plan
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Plans;