import React from "react";

interface FormData {
  name: string;
  age: number;
  city: string;
  phone: string;
}
interface BookingModalProps {
  formData: FormData;
  selectedDoctor: string;
}

const BookingModal: React.FC<BookingModalProps> = ({
  formData,
  selectedDoctor,
}) => {
  return (
    <div className=" flex flex-col">
      <h1 className="text-3xl text-center font-bold italic my-3">
        Thank you for booking
      </h1>
      <img
        src="/Success.gif"
        className="w-1/3 h-2/6 mx-auto bg-transparent"
        alt=""
      />
      <div>
        <p className="text-center">
          We have received your booking request. We will get back to you within
          24 hours
        </p>
      </div>
      <div className="flex justify-between items-center mt-3">
        <p className="text-xl font-semibold">
          Doctor Assigned : {selectedDoctor}
        </p>
        <span>
          <p>Patient Name : {formData.name}</p>
          <p>Patient Age : {formData.age}</p>
          <p>Patient City : {formData.city}</p>
          <p>Patient Phone : {formData.phone}</p>
        </span>
      </div>
    </div>
  );
};

export default BookingModal;
