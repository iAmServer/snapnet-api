import { useState } from "react";
import Error from "./components/Error";
import Event from "./components/Event";
import Events from "./components/Events";

function App() {
  const [eventId, setEventId] = useState<number | null>(null);
  const [pet, setPet] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  return (
    <>
      <div className="relative  p-4">
        {error && <Error onRefresh={() => setError(false)} />}
        <h1 className="text-4xl font-medium my-6 text-center">
          Snapnet Events
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 transition-all duration-300 ease-in-out">
          <div
            className={`p-6 ${
              !eventId && "col-span-2 lg:w-2/3 xl:w-1/2 place-self-center"
            }`}
          >
            <div className="flex justify-between items-center">
              <p className="text-xs uppercase font-light text-gray-500 my-6">
                Latest Events
              </p>

              <select
                name="pet"
                id="pet"
                defaultValue={pet || ""}
                onChange={(e) => {
                  setPet(e.target.value);
                }}
              >
                <option value="">Filter Pets</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <Events
              onPickEvent={setEventId}
              onFailed={() => setError(true)}
              onFilter={pet}
            />
          </div>
          {eventId && (
            <Event
              id={eventId}
              onClose={() => setEventId(null)}
              onFailed={() => setError(true)}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
