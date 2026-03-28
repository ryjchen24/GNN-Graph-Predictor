import { useState } from "react";
import { predictGraph } from "../services/api";

export default function Controls({ graph, setPredictions }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRun = async () => {
    if (!graph) return;
    setLoading(true);
    setError(null);
    try {
      const res = await predictGraph(graph);
      setPredictions(res.predictions);
    } catch {
      setError("Prediction failed. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="run-btn"
        onClick={handleRun}
        disabled={!graph || loading}
      >
        {loading ? <span className="spinner" /> : <span>▶</span>}
        {loading ? "Running…" : "Run GNN Model"}
      </button>
      {error && (
        <div className="error-msg">{error}</div>
      )}
    </>
  );
}
