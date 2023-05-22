import { useState, useEffect } from "react";
import { QueryFunction, useQuery } from "react-query";
import { IEventComponent } from "../interface/components.interface";
import { IEvent } from "../interface/event.interface";
import Spinner from "./Spinner";

const Event: React.FC<IEventComponent> = ({ id, onClose, onFailed }) => {
  const getEvent: QueryFunction<IEvent | undefined> = async (
    query
  ): Promise<IEvent | undefined> => {
    try {
      const res = await fetch(
        `https://my-json-server.typicode.com/Code-Pop/Touring-Vue-Router/events/${query.queryKey[1]}`
      );

      if (!res.ok) {
        onFailed();
      }

      return res.json();
    } catch (error) {
      onFailed();
    }
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["event", id],
    queryFn: getEvent,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, id]);

  if (error) {
    onFailed();
    return null;
  }

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center min-h-[200px] order-1 md:order-last">
        <Spinner />
      </div>
    );

  return (
    <>
      {data ? (
        <div className="p-6 flex flex-col gap-y-6 order-first md:order-last">
          <button
            onClick={() => onClose()}
            className="bg-red-700 text-white p-1 px-3 rounded-lg hover:bg-red-600 w-fit transition duration-300 ease-linear mx-auto"
          >
            Close
          </button>
          <div className="my-6">
            <h2 className="text-4xl text-center font-bold">{data?.title}</h2>
            <p className="text-center text-lg mt-2">{data?.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Category</p>
              <h4 className="text-xl text-gray-700 font-medium">
                {data?.category}
              </h4>
            </div>
            <div>
              <p className="text-sm text-gray-500">Organizer</p>
              <h4 className="text-xl text-gray-700 font-medium">
                {data?.organizer}
              </h4>
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <h4 className="text-xl text-gray-700 font-medium">
                {data?.location}
              </h4>
            </div>
            <div>
              <p className="text-sm text-gray-500">Pet Allowed?</p>
              <h4>{data?.petsAllowed ? "Yes" : "No"}</h4>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <h4 className="text-xl text-gray-700 font-medium">
                {new Date(data?.date!).toDateString()}
              </h4>
            </div>
            <div>
              <p className="text-sm text-gray-500">Time</p>
              <h4 className="text-xl text-gray-700 font-medium">
                {data?.time}
              </h4>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <h3 className="text-3xl font-semibold">No Record</h3>
          <p className="text-lg ">Please try again</p>
        </div>
      )}
    </>
  );
};

export default Event;
