import { useEffect, useRef } from "react";
import cytoscape from "cytoscape";

export default function GraphView({ graph, predictions }) {
  const cyRef = useRef(null);

  useEffect(() => {
    if (!graph) return;

    const elements = [
      ...graph.nodes.map((n) => ({
        data: { id: n.id, label: n.label || n.id }
      })),
      ...graph.edges.map((e) => ({
        data: { source: e.source, target: e.target }
      }))
    ];

    const cy = cytoscape({
      container: cyRef.current,
      elements,
      style: [
        {
          selector: "node",
          style: {
            label: "data(label)",
            "background-color": "#666"
          }
        },
        {
          selector: "edge",
          style: {
            width: 2,
            "line-color": "#ccc"
          }
        }
      ],
      layout: { name: "cose" }
    });

    if (predictions) {
      cy.nodes().forEach((node) => {
        const pred = predictions[node.id()];
        node.style(
          "background-color",
          pred === 1 ? "red" : "blue"
        );
      });
    }

  }, [graph, predictions]);

  return <div ref={cyRef} style={{ height: "500px" }} />;
}