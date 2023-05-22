import { useState } from "react";
import { QueryFunction, useQuery } from "react-query";
import { IEventsComponent } from "../interface/components.interface";
import { IEvent } from "../interface/event.interface";
import Spinner from "./Spinner";

const Events: React.FC<IEventsComponent> = ({
  onFailed,
  onPickEvent,
  onFilter,
  onSearch,
}) => {
  const getEvents: QueryFunction<IEvent[] | undefined> = async () => {
    try {
      const res = await fetch(
        "https://my-json-server.typicode.com/Code-Pop/Touring-Vue-Router/events"
      );

      if (!res.ok) {
        onFailed();
      }

      return res.json();
    } catch (error) {
      onFailed();
    }
  };
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  if (error) {
    onFailed();
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[200px]">
        <Spinner />
      </div>
    );
  }

  const filteredData = onFilter
    ? data?.filter((event) => event.petsAllowed === (onFilter === "yes"))
    : data;

  const searchedData = onSearch
    ? filteredData?.filter((event) =>
        event.title.toLowerCase().includes(onSearch.toLowerCase())
      )
    : filteredData;

  const ITEMS_PER_PAGE = 3; // Number of items per page

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = searchedData?.slice(startIndex, endIndex);

  const totalPages = Math.ceil((searchedData?.length || 0) / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
        {paginatedData?.map((event) => (
          <List key={event.id} event={event} onPickEvent={onPickEvent} />
        ))}
      </ul>

      <div className="flex justify-center mt-6">
        {totalPages > 1 &&
          Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                className={`${
                  page === currentPage
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-600"
                } mx-1 px-3 py-1 rounded-lg hover:bg-red-500 hover:text-white transition duration-300 ease-in-out`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            )
          )}
      </div>
    </>
  );
};

const List: React.FC<{
  event: IEvent;
  onPickEvent: (id: number) => void;
}> = ({ event, onPickEvent }) => {
  return (
    <li
      className="cursor-pointer bg-white items-center flex gap-4 p-2 rounded-lg hover:scale-105 transition duration-300 ease-in-out "
      onClick={() => {
        onPickEvent(event.id);
      }}
    >
      <div className="flex flex-col h-full justify-center gap-y-1 items-center bg-gray-200 rounded-md p-2">
        <p className="text-sm font-semibold text-gray-600">
          {new Date(event.date).toDateString()}
        </p>
        <p className="text-3xl font-bold text-gray-700">{event.time}</p>
      </div>
      <div className="flex-1">
        <h3 className="text-2xl font-semibold">{event.title}</h3>
        <p className="text-sm font-light text-gray-400">{event.organizer}</p>
      </div>
    </li>
  );
};

export default Events;
