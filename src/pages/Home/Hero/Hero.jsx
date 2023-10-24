import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero shadow-lg py-5">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <h1 className="mb-3 text-4xl sm:text-6xl font-bold">Hello there</h1>
          <h3 className="mb-3 text-xl font-bold">Welcome to One Click</h3>
          <p className="mb-5">
            আমাদের ওয়েবসাইটে আপনাকে স্বাগতম। আমাদের কোন প্রোডাক্ট যদি আপনার
            পছন্দ হয় এবং আপনি যদি অর্ডার করতে চান তাহলে আপনি আমাকে{" "}
            <a
              className="text-primary"
              href="http://facebook.com/abuzafaremon"
              target="_blank"
              rel="noreferrer"
            >
              ফেসবুকে মেসেজ
            </a>
            <span> </span>
            দিতে পারেন, হোয়াটসএপে মেসেজ দিতে পারেন। অথবা সরাসরি কল দিতে পারেন।
            <span> </span>
            <a
              className="text-primary"
              href="tel:+8801707894381"
              target="_blank"
              rel="noreferrer"
            >
              01707894381
            </a>
          </p>
          <Link to="/products" className="btn">
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
