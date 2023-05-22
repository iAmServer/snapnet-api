import { useQuery } from "react-query";
import { IErrorComponent } from "../interface/components.interface";

const Error: React.FC<IErrorComponent> = ({ onRefresh }) => {
  const { refetch } = useQuery("events");

  const handleRefresh = async () => {
    await refetch();
    onRefresh();
  };

  return (
    <>
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-gray-200 h-screen flex flex-col justify-center items-center">
        <h3 className="text-3xl font-semibold">Error</h3>
        <p className="text-lg ">Please try again</p>

        <button
          className="mt-6 bg-red-700 text-white p-1 px-3 rounded-lg hover:bg-red-600 w-fit transition duration-300 ease-linear mx-auto"
          onClick={handleRefresh}
        >
          Refresh
        </button>
      </div>
    </>
  );
};

export default Error;
