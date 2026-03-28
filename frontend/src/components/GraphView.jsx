import { useEffect, useRef } from "react";
import cytoscape from "cytoscape";

export default function GraphView({ graph, predictions }) {
  const cyRef = useRef(null);

  const status = !graph ? "empty" : predictions ? "predicted" : "loaded";
  const statusLabel = {
    empty: "No graph loaded",
    loaded: "Graph loaded",
    predicted: "Predictions ready",
  }[status];

  useEffect(() => {
    if (!graph) return;

    const elements = [
      ...graph.nodes.map((n) => ({
        data: { id: n.id, label: n.label || n.id },
      })),
      ...graph.edges.map((e) => ({
        data: { source: e.source, target: e.target },
      })),
    ];

    const cy = cytoscape({
      container: cyRef.current,
      elements,
      style: [
        {
          selector: "node",
          style: {
            label: "data(label)",
            "background-color": "#6e7681",
            color: "#e6edf3",
            "font-size": "10px",
            "text-valign": "center",
            "text-halign": "center",
            width: 32,
            height: 32,
            "border-width": 2,
            "border-color": "#30363d",
          },
        },
        {
          selector: "edge",
          style: {
            width: 1.5,
            "line-color": "#30363d",
            "curve-style": "bezier",
          },
        },
        {
          selector: "node:selected",
          style: {
            "border-color": "#58a6ff",
            "border-width": 3,
          },
        },
      ],
      layout: { name: "cose", animate: true },
    });

    if (predictions) {
      cy.nodes().forEach((node) => {
        const pred = predictions[node.id()];
        node.style("background-color", pred === 1 ? "#f85149" : "#58a6ff");
      });
    }

    return () => cy.destroy();
  }, [graph, predictions]);

  return (
    <div className="graph-panel">
      <div className="graph-toolbar">
        <span className="graph-toolbar-title">Graph Canvas</span>
        <span className={`status-pill ${status}`}>{statusLabel}</span>
      </div>
      <div className="graph-canvas-wrapper">
        {!graph && (
          <div className="empty-state">
            <span className="empty-state-icon">🕸️</span>
            <span className="empty-state-text">No graph loaded</span>
            <span className="empty-state-subtext">
              Upload a JSON file to get started
            </span>
          </div>
        )}
        <div ref={cyRef} className="graph-canvas" />
      </div>
    </div>
  );
}
