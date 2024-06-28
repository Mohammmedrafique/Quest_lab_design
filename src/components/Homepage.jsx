import { Play } from "lucide-react";
import { useState } from "react";
import { Formsection } from "./Formsection";
const Homepage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <>
      <main className="flex flex-col md:flex-row items-center justify-between ml-5">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            There is never been a better time to be a better marketer.™
          </h1>
          <p className="mb-6">
            Data is flowing and channels are growing. Customers are demanding
            the world, while AI is already transforming it. Manage it all with
            the right customer engagement platform.
          </p>
          <div className="flex space-x-4">
            <button className="bg-white text-purple-600 px-6 py-3 rounded-full hover:bg-opacity-90">
              Get Started
            </button>
            <button className="flex items-center space-x-2 bg-transparent  px-6 py-3 rounded-full hover:bg-white hover:text-purple-600">
              <Play size={20} />
              <span>Watch Video</span>
            </button>
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <div className=" rounded-full p-4 md:p-8">
            <img
              src="mainimg.png"
              alt="People looking at device"
              className="rounded-full"
            />
          </div>
        </div>
      </main>

      <footer className="mt-16 bg-white w-full rounded-t-[35px] py-2">
        <h3 className="text-center mb-4 text-md uppercase text-gray-500 italic">
          Made to scale with companies of all sizes
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {[
            "elf",
            "intuit",
            "Going",
            "RakutenViber",
            "IBM",
            "BeautyCounter",
            "Stylt",
            "Gympass",
          ].map((company, index) => (
            <div
              key={index}
              className="bg-white text-gray-600 px-4 py-2 rounded"
            >
              {company}
            </div>
          ))}
          <div className="text-center ">
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-purple-700 text-white px-6 py-3 rounded-full hover:bg-purple-800"
            >
              Connect With Sales
            </button>
          </div>
        </div>
      </footer>
      {isFormOpen && <Formsection onClose={() => setIsFormOpen(false)} />}
    </>
  );
};

export default Homepage;
