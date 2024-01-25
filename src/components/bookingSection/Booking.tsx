import Form from "./Form";

const Booking = () => {
  return (
    <div className="flex flex-col justify-center py-5 relative">
      <h1 className="text-4xl font-bold mb-6 text-center">Book a visit</h1>
      <div className="w-3/6 mx-auto">
        <Form />
      </div>
    </div>
  );
};

export default Booking;
