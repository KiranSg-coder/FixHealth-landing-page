import axios from "axios";
import React, { useEffect, useState } from "react";
import BookingModal from "../bookingModal/BookingModal";
import { useLocation } from "react-router-dom";
interface FormData {
  name: string;
  phone: string;
  age: number;
  city: string;
  chiefComplaints: string;
  previousExpreience: boolean;
  company: string;
}

interface Doctor {
  id: number;
  name: string;
  gender: string;
  specialist: string;
  city: string;
  experience: number;
  photo_url: string;
}

const Form = () => {
  const location = useLocation();
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    age: 0,
    city: "",
    company: "",
    chiefComplaints: "",
    previousExpreience: false,
  });
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [filteredData, setFilteredData] = useState<Doctor[]>([]);
  const [data, setData] = useState<Doctor[]>([]);

  const [city, setCity] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedDoctor == "") {
      return alert("please select doctor");
    }
    if (
      formData.name == "" ||
      formData.phone == "" ||
      formData.city == "" ||
      formData.chiefComplaints == "" ||
      formData.company == "" ||
      formData.age == 0
    ) {
      return alert("please fill all details");
    }
    setFormStep(formStep + 1);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "city") {
      setSelectedDoctor("");
      const filteredData =
        value == "" ? data : data.filter((doctor) => doctor.city === value);
      setFilteredData(filteredData);
    }
  };

  useEffect(() => {
    axios
      .get("https://mocki.io/v1/539dc73e-d1af-4d2e-9280-c967a19da35a")
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data);
        setCity(
          Array.from(new Set(res.data.map((doctor: Doctor) => doctor.city)))
        );

        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const cityName = new URLSearchParams(location.search).get("city");

    if (cityName) {
      setFormData((prevData) => ({
        ...prevData,
        city: cityName,
      }));
      const cityData = data.filter((doctor) => doctor.city === cityName);
      setFilteredData(cityData);
      if (!city.includes(cityName)) {
        setCity([...city, cityName]);
      }
    }
  }, [location.search, data, city]);

  return (
    <>
      <form
        className="border p-3 rounded-lg mx-5 flex flex-col items-center "
        onSubmit={handleSubmit}
      >
        {formStep === 1 && (
          <>
            <div className="w-2/3 flex flex-col gap-2 my-2">
              <label className="font-bold">Enter Name</label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="p-2 border rounded-md"
                required
              />
            </div>

            <div className="w-2/3 flex flex-col gap-2 my-2">
              <label className="font-bold">Phone Number</label>
              <input
                type="number"
                placeholder="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="p-2 border rounded-md"
                required
              />
            </div>

            <div className="w-2/3 flex flex-col gap-2 my-2">
              <label className="font-bold">Age</label>

              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
                className="p-2 border rounded-md"
                required
              />
            </div>
          </>
        )}

        {formStep === 2 && (
          <>
            <div className="w-2/3 flex flex-col gap-2 my-2">
              <label className="font-bold">City</label>
              <select
                className="p-2 border rounded-md"
                name="city"
                required
                onChange={handleChange}
                value={formData.city}
              >
                <option value="">Choose City</option>
                {city.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-2/3 flex flex-col gap-2 my-2">
              <label className="font-bold">Company Name</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company"
                className="p-2 border rounded-md"
                required
              />
            </div>
          </>
        )}

        {formStep === 3 && (
          <>
            <div className="w-2/3 flex flex-col gap-2 my-2">
              <label className="font-bold">Chief Complaint</label>
              <textarea
                placeholder="Chief Complaint"
                onChange={handleChange}
                rows={5}
                value={formData.chiefComplaints}
                name="chiefComplaints"
                className="p-2 border rounded-md w-full my-2"
                required
              />
            </div>

            {formData.age >= 40 && (
              <div className="w-2/3 flex gap-4 my-2 ">
                <input
                  type="checkbox"
                  name="previousExpreience"
                  onChange={handleChange}
                  checked={formData.previousExpreience}
                />
                <label htmlFor="">
                  Any previous experience with physiotherapy
                </label>
              </div>
            )}
          </>
        )}

        {formStep === 4 && (
          <div className="">
            <p className="mb-2 text-xl text-center font-bold">
              Available doctors in {formData.city}
            </p>
            <label className="italic">Choose Doctor</label>

            <div className=" max-h-[500px] overflow-auto">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <div
                    className={` border mb-5 flex justify-around items-center p-2 cursor-pointer ${
                      selectedDoctor === item.name ? "border-red-500" : ""
                    } `}
                    key={item.id}
                    onClick={() => setSelectedDoctor(item.name)}
                  >
                    <img
                      src={item.photo_url}
                      className="w-20 h-20 rounded-full"
                      alt=""
                    />

                    <div className="flex gap-5">
                      <span>
                        <p>Name: {item.name}</p>
                        <p>Specialist : {item.specialist}</p>
                      </span>
                      <span>
                        <p>City : {item.city}</p>
                        <p>Experience : {item.experience} years</p>
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No data found</p>
              )}
            </div>
          </div>
        )}

        {formStep === 5 && (
          <BookingModal formData={formData} selectedDoctor={selectedDoctor} />
        )}

        <div className="w-2/3 flex justify-between">
          {formStep > 1 && formStep <= 4 && (
            <button
              type="button"
              onClick={() => setFormStep(formStep - 1)}
              className="bg-red-500 text-white px-5 py-2 rounded"
            >
              Back
            </button>
          )}

          {formStep <= 3 && (
            <button
              type="button"
              onClick={() => setFormStep(formStep + 1)}
              className="bg-green-500 text-white px-5 py-2 rounded"
            >
              Next
            </button>
          )}

          {formStep == 4 && filteredData.length > 0 && (
            <button
              type="submit"
              className="bg-blue-500 text-white px-5 py-2 rounded"
            >
              Book
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default Form;
