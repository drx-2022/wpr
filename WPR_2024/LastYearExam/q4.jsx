import React, { useState } from "react";

// MyToggleButton Component
function MyToggleButton({ toggleValue, onToggle }) {
  return (
    <button onClick={onToggle}>
      Toggle
    </button>
  );
}

// MyApp Component
function MyApp() {
  const [isOn, setIsOn] = useState(false);

  // Toggle the boolean value
  const handleToggle = () => {
    setIsOn((prevState) => !prevState);
  };

  return (
    <div>
      <h1>{isOn ? "ON" : "OFF"}</h1>
      <MyToggleButton toggleValue={isOn} onToggle={handleToggle} />
    </div>
  );
}

export default MyApp;
