/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import PlotContainer from "./PlotContainer";
import { csv as read_csv } from "d3";
import styled from "styled-components";
import ToggleButtons from "../ui/ToggleButtons";
import modify_data from "../../utils/modify_data";
import { colors } from "../../utils/colors";

export default function TogglePlots({
  path = "/datasets/ireland_land_use.csv",
  heading = "Ireland Economic Statistics",
  selected_init = [0, 1, 2],
}) {
  const [data, setData] = useState({});
  const [selectedPlots, setSelectedPlots] = useState(selected_init);

  useEffect(() => {
    read_csv(path).then((rows) => {
      setData(rows);
      let modified_data = modify_data(rows);
      setData(modified_data);

      console.log("success to read csv");
    });
  }, [path]);

  let plots = [];

  for (let key in data) {
    plots.push({
      title: key,
      X: data[key]["X"],
      y: data[key]["y"],
    });
  }

  return (
    <>
      {heading && <h2>{heading}</h2>}

      <ToggleButtons
        plots={plots}
        selectedPlots={selectedPlots}
        setSelectedPlots={setSelectedPlots}
        // onToggleClick={onToggleClick}
      />

      <LandUsePlotContainer className="economy_plots">
        {selectedPlots.map((plotIndex) => {
          if (!plots[plotIndex]) return;
          const { title, X, y } = plots[plotIndex];
          return (
            <PlotContainer
              key={title}
              title={title}
              data={[
                {
                  x: X,
                  y: y,
                  type: "bar",
                  marker: {
                    color: colors.blue_600,
                  },
                },
              ]}
              layout={{
                width: "auto",
                height: "300",
              }}
              config={{ responsive: true }}
            />
          );
        })}
      </LandUsePlotContainer>
    </>
  );
}

const LandUsePlotContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;

  .plot-box {
    flex: 1;
  }
`;
