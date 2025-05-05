import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Link
        to={"/circlek"}
        className="hover:border-gray-200 hover:rounded-3xl hover:border p-3 "
      >
        go to print page
      </Link>
    </div>
  );
};

export default HomePage;
