/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { csv as read_csv } from "d3";
import PlotContainer from "./PlotContainer";
import styled from "styled-components";
import { Toggle } from "../ui/ToggleButtons";
import { colors } from "../../utils/colors";

const string_to_array = (array_string = "") => {
  let temp = array_string.replaceAll(" ", ",");
  temp = temp.replace(/'/g, '"');
  temp = JSON.parse(temp);
  return temp;
};

const string_to_array_country = (array_string = "") => {
  let temp = array_string.replaceAll(" ", "");
  temp = temp.replaceAll("\n", "");
  temp = temp.replaceAll("''", "','");
  temp = temp.replace(/'/g, '"');
  temp = JSON.parse(temp);
  return temp;
};

const num_array_to_str_array = (num_array) => {
  return num_array.map((num) => num.toString());
};

/* eslint-disable react/prop-types */
export default function TradePlots({ heading = "" }) {
  const [showImports, setShowImports] = useState(false);
  const [showExports, setShowExports] = useState(true);

  return (
    <TradePlotsContrainer>
      <h2>{heading}</h2>

      <div className="toggle_bottons">
        <Toggle
          className={showImports ? "active" : "inactive"}
          onClick={() => setShowImports((show) => !show)}
        >
          Imports from Ireland to World
        </Toggle>
        <Toggle
          className={showExports ? "active" : "inactive"}
          onClick={() => setShowExports((show) => !show)}
        >
          Exports from Ireland to World
        </Toggle>
      </div>

      {showImports && (
        <TradePlot
          path="/datasets/agri_imports.csv"
          heading="Ireland Imports Statistics Map"
        />
      )}

      {showExports && (
        <TradePlot
          path="/datasets/agri_exports.csv"
          heading="Ireland Exports Statistics Map"
        />
      )}
    </TradePlotsContrainer>
  );
}

function TradePlot({
  heading = "",
  path = "/public/datasets/agri_imports.csv",
}) {
  const [data, setData] = useState(null);
  const [frames, setFrames] = useState([]);
  const [sliderSteps, setSliderSteps] = useState([]);

  let tempFrames = [];
  let tempSliderSteps = [];

  useEffect(() => {
    read_csv(path).then((rows) => {
      rows.forEach((row) => {
        let row_year = Number(row["Year"]);
        let row_z = num_array_to_str_array(string_to_array(row["z"]));
        let row_country = string_to_array_country(row["Country"]);
        // let row_code = string_to_array(row["Code"]);

        // frames
        tempFrames.push({
          name: row_year,
          data: [
            {
              z: row_z,
              locations: row_country,
              text: row_country,
              locationmode: "country names",
            },
          ],
        });

        // slide
        tempSliderSteps.push({
          label: row_year.toString(),
          method: "animate",
          args: [
            [row_year],
            {
              mode: "immediate",
              transition: { duration: 300 },
              frame: { duration: 300 },
            },
          ],
        });
      });

      // init data
      const initialData = [
        {
          type: "choropleth",
          locationmode: "world",
          locations: tempFrames[0].data[0].locations,
          z: tempFrames[0].data[0].z,
          text: tempFrames[0].data[0].locations,
          zauto: false,
          zmin: 0,
          zmax: 300_000,
          colorscale: [
            ["0.0", colors.white],
            ["0.2", colors.blue_200],
            ["0.4", colors.blue_400],
            ["0.6", colors.blue_400],
            ["0.8", colors.blue_600],
            ["1", colors.blue_600],
          ],
        },
      ];

      setData(initialData);
      setFrames(tempFrames);
      setSliderSteps(tempSliderSteps);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  const layout = {
    title: "",
    width: "auto",
    height: "auto",
    paper_bgcolor: "transparent",
    margin: {
      t: 20,
    },
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
      projection: {
        type: "natural earth",
      },
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
    <PlotContainer
      title={heading}
      data={data}
      layout={layout}
      frames={frames}
      config={{ responsive: true }}
    />
  );
}

const TradePlotsContrainer = styled.div`
  .plot-box {
    margin-bottom: 1rem;
  }
  .toggle_bottons {
    margin-bottom: 1rem;
  }
`;
