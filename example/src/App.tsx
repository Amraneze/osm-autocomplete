import { OpeenStreetMap, OpenStreetMapAutocomplete } from "osm-autocomplete";

import "./App.css";

function App() {
  const handleOnOptionSelected = (
    field: string,
    option: OpeenStreetMap | null
  ) => {
    console.log(field, { option: option });
  };

  return (
    <div className="wrapper">
      <OpenStreetMapAutocomplete
        value={null}
        onChange={(option) => handleOnOptionSelected("First component", option)}
      />
      <OpenStreetMapAutocomplete
        value={{
          lat: "0",
          lon: "0",
          type: "0",
          class: "0",
          osm_id: 0,
          licence: "0",
          osm_type: "0",
          place_id: 0,
          importance: 0,
          display_name: "An existing street",
          boundingbox: [],
        }}
        onChange={(option) =>
          handleOnOptionSelected("Second component", option)
        }
      />
    </div>
  );
}

export default App;
