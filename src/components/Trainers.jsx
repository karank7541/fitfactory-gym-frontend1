import React from "react";
import ratneshPic from "../assets/ratnesh.jpg";
import sanjayPic from "../assets/sanjay.jpg";
import arvindPic from "../assets/arvind.jpg";

const Trainers = () => {
  const trainerData = [
    {
      name: "Ratnesh",
      role: "Strength & Conditioning Expert",
      img: ratneshPic,
      adjust: true,   // needs object-top
    },
    {
      name: "Sanjay",
      role: "Calisthenics & Fat Loss Specialist",
      img: sanjayPic,
      adjust: false,  // original perfect
    },
    {
      name: "Arvind",
      role: "Yoga & Flexibility Coach",
      img: arvindPic,
      adjust: true,   // needs object-top
    },
  ];

  return (
    <section
      id="trainers"
      className="min-h-screen px-6 md:px-16 py-20 bg-gray-50"
    >
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Meet Our Trainers 💪
        </h2>
        <p className="text-gray-600 mt-3 md:w-2/3 mx-auto text-lg">
          Highly skilled & certified professionals ready to guide your fitness journey.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
        {trainerData.map((trainer, index) => (
          <div
            key={index}
            className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200"
          >
            <div className="overflow-hidden rounded-xl">
              <img
                src={trainer.img}
                alt={trainer.name}
                className={`w-full rounded-xl transition-all duration-500 
                  ${trainer.adjust 
                    ? "h-72 object-cover object-top group-hover:scale-105" 
                    : "h-64 object-cover group-hover:scale-105"
                  }`}
              />
            </div>

            <h3 className="text-2xl font-bold mt-5 text-gray-800">
              {trainer.name}
            </h3>
            <p className="text-gray-600 mt-1">{trainer.role}</p>

            <div className="h-[3px] mt-4 bg-blue-600 w-0 group-hover:w-full transition-all duration-500 rounded-full"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trainers;