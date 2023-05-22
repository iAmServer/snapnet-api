import { QueryFunction, useQuery } from "react-query";
import { IEventsComponent } from "../interface/components.interface";
import { IEvent } from "../interface/event.interface";
import Spinner from "./Spinner";

const Events: React.FC<IEventsComponent> = ({
  onFailed,
  onPickEvent,
  onFilter,
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
  const { data, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  if (error) {
    onFailed();
    return null;
  }

  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center min-h-[200px]">
        <Spinner />
      </div>
    );

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
      {onFilter
        ? data
            ?.filter((event) => {
              const filter = onFilter === "yes";

              return event.petsAllowed === filter;
            })
            .map((event) => (
              <List key={event.id} event={event} onPickEvent={onPickEvent} />
            ))
        : data?.map((event) => (
            <List key={event.id} event={event} onPickEvent={onPickEvent} />
          ))}
    </ul>
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
