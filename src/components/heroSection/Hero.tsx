const Hero = () => {
  return (
    <section className="mt-5">
      <div className="flex justify-between px-5">
        <img
          src="https://ik.imagekit.io/tcfp7i31d/logo_with_yp_black_urUeyjKwY.svg"
          alt="fixhealth"
          className="h-10 sm:h-fit"
        />
      </div>

      <div className="grid grid-cols-1 place-content-between  sm:grid-cols-2">
        <div className="flex flex-col items-start justify-center p-5 order-2 sm:order-1">
          <h1 className="text-6xl font-bold my-2">
            <label htmlFor="" className="text-blue-500">
              Empowering health
            </label>{" "}
            choices for a vibrant life, your trusted.
          </h1>
          <p className="text-lg text-gray-500 my-2">
            Health carely is a new way to get health insurance quotes. We offer
            tools similar to those provided by insurance companies for free and
            prices are based on donations and not restrictive health plan
            networks.
          </p>
          {/* <button className="bg-blue-500 text-white px-5 py-2 rounded">
            Book now
          </button> */}
        </div>
        <div className="order-1 flex justify-end sm:order-2 ">
          <img
            src="/hero1.png"
            className="max-sm:w-2/3 max-sm:mx-auto "
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
