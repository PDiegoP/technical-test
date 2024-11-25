import "./App.css";
import "./styles/JSONVisualizer.css";
import "./styles/CustomNode.css";
import "./styles/Tooltip.css";
import JSONVisualizer from "./components/JSONVisualizer/JSONVisualizer";
const BASE_URL = import.meta.env.VITE_API_URL;

function App() {
  return (
    <>
      <JSONVisualizer />
    </>
  );
}

export default App;
