import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [counterValue, setCounterValue] = useState(1);
  const [changeValue, setChangeValue] = useState(1);

  useEffect(async () => {
    // fetch("/data.json")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setCounterValue(data.counter);
    //     setChangeValue(data.changeValue);
    //   })
    //   .catch((err) => console.log(err));

    try {
      const response = await fetch("/data.json");
      const data = await response.json();

      setCounterValue(data.counter);
      setChangeValue(data.changeValue);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updateChangeValue = (e) => {
    setChangeValue(parseInt(e.target.value));
  };

  return (
    <div className="App">
      <input value={changeValue} type="number" onChange={updateChangeValue} />
      <div className="counter">
        <button
          onClick={() =>
            setCounterValue((prevValue) => prevValue + changeValue)
          }
        >
          +
        </button>
        <p>{counterValue}</p>
        <button
          onClick={() =>
            setCounterValue((prevValue) => prevValue - changeValue)
          }
        >
          -
        </button>
      </div>
    </div>
  );
}

export default App;
