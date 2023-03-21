import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex items-center gap-1">
        <h1 className="text-3xl font-medium">404</h1>
        <span className="text-3xl">|</span>
        <p className="text-lg">Page not found</p>
      </div>
      <Link
        to="/"
        className="bg-slate-500 text-white px-2 py-1 rounded-full inline-block mt-2"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
