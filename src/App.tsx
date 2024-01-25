import "./App.css";
import Booking from "./components/bookingSection/Booking";
import Herosection from "./components/heroSection/Hero";
import Testimonials from "./components/testimonials/Testimonials";

function App() {
  return (
    <div className="App max-w-7xl mx-auto ">
      <Herosection />
      <Booking />
      <Testimonials />
    </div>
  );
}

export default App;
