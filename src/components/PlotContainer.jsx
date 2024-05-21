/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import Plot from "react-plotly.js";

import Loader from "./Loader";
import Box from "./Box";

export default function PlotContainer({
  data = [],
  layout = {},
  config = {},
  frames = [],
}) {
  const boxRef = useRef(null);
  const [plotW, setPlotW] = useState("100%");

  // https://stackoverflow.com/questions/70247542/how-to-rerender-a-page-using-useeffect-hook-on-window-innerwidth-in-react
  const plot_resize = () => {
    if (boxRef == null || boxRef.current == null) {
      return;
    } else {
      const { width } = boxRef.current.getBoundingClientRect();
      setPlotW(width);
      // console.log("resized", width);
      // TODO: Optimization Required
    }
  };

  // first load
  useEffect(() => {
    plot_resize();
  });

  // when window size changed
  window.addEventListener("resize", plot_resize);

  if (!data) {
    return (
      <Box ref={boxRef} className="plot-box">
        <Loader />
      </Box>
    );
  }

  return (
    <Box ref={boxRef} className="plot-box">
      <Plot
        data={data}
        layout={{ ...layout, width: plotW }}
        config={config}
        frames={frames}
      />
    </Box>
  );
}
