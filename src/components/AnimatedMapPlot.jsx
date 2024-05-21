import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import * as d3 from "d3";

const AnimatedMapPlot = () => {
  const [data, setData] = useState(null);
  const [frames, setFrames] = useState([]);
  const [sliderSteps, setSliderSteps] = useState([]);

  useEffect(() => {
    d3.csv("/datasets/gapminder_with_codes.csv").then((rows) => {
      const filterAndUnpack = (rows, key, year) => {
        // console.log(rows);
        return rows.filter((row) => row["year"] == year).map((row) => row[key]);
      };

      let tempFrames = [];
      let tempSliderSteps = [];
      let num = 1952;
      const n = 11;

      // console.log(data?.length);

      for (let i = 0; i <= n; i++) {
        const z = filterAndUnpack(rows, "lifeExp", num);
        // console.log("z", z);
        const locations = filterAndUnpack(rows, "iso_alpha", num);
        // console.log("locations", locations);

        tempFrames[i] = {
          data: [{ z: z, locations: locations, text: locations }],
          name: num,
        };
        tempSliderSteps.push({
          label: num.toString(),
          method: "animate",
          args: [
            [num],
            {
              mode: "immediate",
              transition: { duration: 300 },
              frame: { duration: 300 },
            },
          ],
        });
        num += 5;
      }

      // console.log(data?.length);

      const initialData = [
        {
          type: "choropleth",
          locationmode: "world",
          locations: tempFrames[0].data[0].locations,
          z: tempFrames[0].data[0].z,
          text: tempFrames[0].data[0].locations,
          zauto: false,
          zmin: 30,
          zmax: 90,
        },
      ];

      setData(initialData);
      setFrames(tempFrames);
      setSliderSteps(tempSliderSteps);
    });
  }, []);

  // console.log(data?.length);

  if (!data) {
    return <div>Loading...</div>;
  }

  const layout = {
    title: "World Life Expectency 1952 - 2007",
    geo: {
      scope: "world",
      countrycolor: "rgb(255, 255, 255)",
      showland: true,
      landcolor: "rgb(217, 217, 217)",
      showlakes: true,
      lakecolor: "rgb(255, 255, 255)",
      subunitcolor: "rgb(255, 255, 255)",
      lonaxis: {},
      lataxis: {},
    },
    updatemenus: [
      {
        x: 0.1,
        y: 0,
        yanchor: "top",
        xanchor: "right",
        showactive: false,
        direction: "left",
        type: "buttons",
        pad: { t: 87, r: 10 },
        buttons: [
          {
            method: "animate",
            args: [
              null,
              {
                fromcurrent: true,
                transition: {
                  duration: 200,
                },
                frame: {
                  duration: 500,
                },
              },
            ],
            label: "Play",
          },
          {
            method: "animate",
            args: [
              [null],
              {
                mode: "immediate",
                transition: {
                  duration: 0,
                },
                frame: {
                  duration: 0,
                },
              },
            ],
            label: "Pause",
          },
        ],
      },
    ],
    sliders: [
      {
        active: 0,
        steps: sliderSteps,
        x: 0.1,
        len: 0.9,
        xanchor: "left",
        y: 0,
        yanchor: "top",
        pad: { t: 50, b: 10 },
        currentvalue: {
          visible: true,
          prefix: "Year:",
          xanchor: "right",
          font: {
            size: 20,
            color: "#666",
          },
        },
        transition: {
          duration: 300,
          easing: "cubic-in-out",
        },
      },
    ],
  };

  return (
    <Plot
      data={data}
      layout={layout}
      frames={frames}
      config={{ displayModeBar: false }}
    />
  );
};

export default AnimatedMapPlot;
