import { useState } from "react";
import GraphView from "../components/GraphView";
import Controls from "../components/Controls";
import UploadGraph from "../components/UploadGraph";

export default function Home() {
  const [graph, setGraph] = useState(null);
  const [predictions, setPredictions] = useState(null);

  return (
    <div className="container">
      <h1>GNN Visualizer</h1>

      <UploadGraph setGraph={setGraph} />
      <Controls graph={graph} setPredictions={setPredictions} />

      <GraphView graph={graph} predictions={predictions} />
    </div>
  );
}