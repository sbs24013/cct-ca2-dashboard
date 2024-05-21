import PlotContainer from "./PlotContainer";

export function SimplePlot() {
  return (
    <PlotContainer
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
        title: "Placeholder Plot",
        width: "auto",
        height: "auto",
        paper_bgcolor: "",
        plot_bgcolor: "",
      }}
      config={{ responsive: true }}
    />
  );
}
