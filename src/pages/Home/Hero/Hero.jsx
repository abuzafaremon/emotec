import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero shadow py-5">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <h1 className="mb-3 text-4xl sm:text-6xl font-bold">Hello there</h1>
          <h3 className="mb-3 text-xl font-bold">Welcome to Lets Make Blog</h3>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <Link to="/addPost" className="btn">
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
