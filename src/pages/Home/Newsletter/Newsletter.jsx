const Newsletter = () => {
  return (
    <section className="p-3 sm:p-4 md:p-5">
      <div className="flex flex-col md:flex-row justify-center gap-3 md:items-center border-2 w-fit mx-auto p-10 rounded-3xl">
        <div>
          <span className="footer-title">Newsletter</span>
          <h3 className="text-3xl font-bold text-slate-700">
            Subscribe to Lets Make
          </h3>
          <p className="text-lg">
            Get all the latest posts delivered straight to your inbox.
          </p>
        </div>
        <div>
          <span className="text-lg text-slate-700">
            Enter your Email address
          </span>
          <div className="relative">
            <input
              type="text"
              placeholder="username@site.com"
              className="input input-bordered w-full pr-16"
            />
            <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
