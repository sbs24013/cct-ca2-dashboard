import Plot from "react-plotly.js";

export function SimplePlot() {
  return (
    <Plot
      data={[
        {
          x: [1, 2, 3],
          y: [2, 6, 3],
          type: "scatter",
          mode: "lines+markers",
          marker: { color: "red" },
        },
        { type: "bar", x: [1, 2, 3], y: [2, 5, 3] },
      ]}
      layout={{
        title: "A Fancy Plot",
        width: 600,
        height: 400,
        paper_bgcolor: "transparent",
        plot_bgcolor: "transparent",
      }}
      config={{ responsive: true }}
    />
  );
}
