import axios from "axios";
import { useEffect, useState } from "react";

interface Testimonial {
  id: number;
  name: string;
  testimonial: string;
  photo_url: string;
}

const Testimonials = () => {
  const [data, setData] = useState<Testimonial[]>([]);

  useEffect(() => {
    axios
      .get("https://mocki.io/v1/d3066104-62c8-41ee-a455-3cdce0b544dd")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="my-10">
      <h1 className="text-3xl font-bold text-center my-5">Testimonials</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mx-3">
        {data.map((item) => (
          <div
            className="border p-5 rounded shadow-md cursor-pointer transition duration-300 transform hover:scale-105"
            key={item.id}
          >
            <span className="flex justify-start gap-x-4 mb-2">
              <img
                src={item.photo_url}
                className="w-10 h-10 rounded-full"
                alt=""
              />
              <p className="text-lg font-semibold mt-2"> {item.name}</p>
            </span>
            <p className="text-sm font-mono italic mb-2 ml-12">
              ⭐️⭐️⭐️⭐️⭐️
            </p>
            <p className="text-sm font-mono italic">{item.testimonial}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
