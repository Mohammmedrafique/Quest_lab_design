import { ChevronDown, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center mb-8 p-4 bg-white rounded-full shadow-md">
      <nav className="flex items-center space-x-4">
        <h2 className="text-2xl font-bold font-Oswald text-black">braze</h2>
        <div className="hidden md:flex space-x-4">
          <Link
            to="/how-it-works"
            className="text-black font-bold hover:underline"
          >
            How It Works
          </Link>
          <Link to="/product" className="text-black font-bold hover:underline">
            Product
          </Link>
          <Link
            to="/solutions"
            className="text-black font-bold hover:underline"
          >
            Solutions
          </Link>
          <Link
            to="/customers"
            className="text-black font-bold hover:underline"
          >
            Customers
          </Link>
          <Link to="/success" className="text-black font-bold hover:underline">
            Success
          </Link>
          <Link to="/partners" className="text-black font-bold hover:underline">
            Partners
          </Link>
          <Link
            to="/resources"
            className="text-black font-bold hover:underline"
          >
            Resources
          </Link>
          <Link to="/company" className="text-black font-bold hover:underline">
            Company
          </Link>
        </div>
      </nav>
      <div className="flex items-center space-x-4">
        <button className="flex bg-gray-200 p-1 rounded-md">
          <Globe color="black" />
          <p className="text-black">US</p>
          <ChevronDown color="black" />
        </button>
        <button className="bg-white text-purple-600 px-4 py-2 rounded-full font-bold hover:bg-opacity-90">
          Login
        </button>
        <button className="bg-purple-700 text-white px-4 py-2 rounded-full font-bold hover:bg-purple-800">
          Get Started
        </button>
      </div>
    </header>
  );
};

export default Navbar;
