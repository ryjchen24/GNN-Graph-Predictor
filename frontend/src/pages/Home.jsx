import { useState } from "react";
import GraphView from "../components/GraphView";
import Controls from "../components/Controls";
import UploadGraph from "../components/UploadGraph";

export default function Home() {
  const [graph, setGraph] = useState(null);
  const [predictions, setPredictions] = useState(null);

  const nodeCount = graph?.nodes?.length ?? 0;
  const edgeCount = graph?.edges?.length ?? 0;
  const class1Count = predictions
    ? Object.values(predictions).filter((v) => v === 1).length
    : 0;

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="header-icon">🔬</div>
        <span className="header-title">GNN Visualizer</span>
        <span className="header-badge">Graph Neural Network</span>
      </header>

      <div className="app-body">
        <aside className="sidebar">
          <div className="sidebar-section">
            <span className="sidebar-section-label">Data Source</span>
            <UploadGraph setGraph={setGraph} setPredictions={setPredictions} />
          </div>

          <div className="sidebar-section">
            <span className="sidebar-section-label">Model</span>
            <Controls graph={graph} setPredictions={setPredictions} />
          </div>

          {graph && (
            <>
              <div className="sidebar-section">
                <span className="sidebar-section-label">Graph Stats</span>
                <div className="stats-grid">
                  <div className="stat-card">
                    <span className="stat-value">{nodeCount}</span>
                    <span className="stat-label">Nodes</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-value">{edgeCount}</span>
                    <span className="stat-label">Edges</span>
                  </div>
                  {predictions && (
                    <>
                      <div className="stat-card">
                        <span className="stat-value">{class1Count}</span>
                        <span className="stat-label">Class 1</span>
                      </div>
                      <div className="stat-card">
                        <span className="stat-value">{nodeCount - class1Count}</span>
                        <span className="stat-label">Class 0</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="sidebar-section">
                <span className="sidebar-section-label">Legend</span>
                <div className="legend">
                  <div className="legend-item">
                    <div className="legend-dot default" />
                    <span>No prediction</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-dot class-0" />
                    <span>Class 0</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-dot class-1" />
                    <span>Class 1</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </aside>

        <GraphView graph={graph} predictions={predictions} />
      </div>
    </div>
  );
}
