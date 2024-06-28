import Navbar from "./Navbar";
import Homepage from "./Homepage";

// Main component
const BrazeHomepageWithForm = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-orange-400 text-white p-4 md:p-8 relative">
      <Navbar />
      <Homepage />
    </div>
  );
};

export default BrazeHomepageWithForm;
