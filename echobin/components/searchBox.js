import React, { useState } from "react";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

export default function SearchBox(props) {
  const { selectPosition, setSelectPosition } = props;
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <input
            style={{ 
              width: "100%",
              padding: "8px 12px",
              border: "1px solid #ccc",
              borderRadius: "4px"
            }}
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", padding: "0px 20px" }}>
          <button
            style={{
              padding: "8px 16px",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
            onClick={() => {
              const params = {
                q: searchText,
                format: "json",
                addressdetails: 1,
                polygon_geojson: 0,
              };
              const queryString = new URLSearchParams(params).toString();
              const requestOptions = {
                method: "GET",
                redirect: "follow",
              };
              fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
                .then((response) => response.text())
                .then((result) => {
                  console.log(JSON.parse(result));
                  setListPlace(JSON.parse(result));
                })
                .catch((err) => console.log("err: ", err));
            }}
          >
            Search
          </button>
        </div>
      </div>
      <div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {listPlace.map((item) => (
            <div key={item?.place_id}>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px",
                  cursor: "pointer",
                  borderBottom: "1px solid #ddd"
                }}
                onClick={() => {
                  setSelectPosition(item);
                }}
              >
                <div style={{ marginRight: "16px" }}>
                  <img
                    src="./placeholder.png"
                    alt="Placeholder"
                    style={{ width: 38, height: 38 }}
                  />
                </div>
                <span>{item?.display_name}</span>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

