import { predictGraph } from "../services/api";

export default function Controls({ graph, setPredictions }) {
  const handleRun = async () => {
    if (!graph) return;

    const res = await predictGraph(graph);
    setPredictions(res.predictions);
  };

  return (
    <div>
      <button onClick={handleRun}>
        Run GNN Model
      </button>
    </div>
  );
}