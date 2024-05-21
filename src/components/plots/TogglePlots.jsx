/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import PlotContainer from "./PlotContainer";
import { csv as read_csv } from "d3";
import styled from "styled-components";
import ToggleButtons from "../ui/ToggleButtons";
import modify_data from "../../utils/modify_data";

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

  const onToggleClick = (plot_index) => {
    if (selectedPlots.includes(plot_index)) {
      setSelectedPlots([
        ...selectedPlots.filter((index) => index !== plot_index),
      ]);
    } else {
      setSelectedPlots([...selectedPlots, plot_index]);
    }
  };

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
        onToggleClick={onToggleClick}
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
