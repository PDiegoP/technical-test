import "./App.css";
import "./styles/JSONVisualizer.css";
import "./styles/CustomNode.css";
import "./styles/Tooltip.css";
import JSONVisualizer from "./components/JSONVisualizer/JSONVisualizer";
import { useState } from "react";

function App() {
  const [jsonData, setJsonData] = useState();
  return (
    <>
      <textarea
      placeholder="Please, enter your JSON data here..." className="Visualizer-TextArea"
        onChange={(e) => {
          setJsonData(e.target?.value);
        }}
      />
      <JSONVisualizer className='Visualizer-Canvas' source={jsonData} />
    </>
  );
}

export default App;
