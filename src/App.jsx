import React, { useState, useEffect } from "react";
import RoadmapCreator from "./components/RoadmapCreator";
import RoadmapCreatorOld from "./components/RoadmapCreatorOld/index.js";
import "./App.css";
function App() {
  // Return the App component.
  const modes = ["Demo Version", "Development Version (in infancy)"];
  const [mode, setMode] = useState("Demo Version");
  return (
    <>
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-around",
          padding: ".5rem",
        }}
      >
        {modes.map((eachVersion) => (
          <div
            style={{
              padding: "1rem",
              background: "orange",
              color: "white",
              borderRadius: "3px",
              cursor: "pointer",
              border:
                mode === eachVersion ? "3px solid red" : "3px solid orange",
              boxSizing: "border-box",
            }}
            onClick={() => {
              setMode(eachVersion);
            }}
          >
            {eachVersion}
          </div>
        ))}
      </div>
      {mode === "Demo Version" ? <RoadmapCreatorOld /> : <RoadmapCreator />}
    </>
  );
}

export default App;
