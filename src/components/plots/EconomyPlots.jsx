import { useEffect, useState } from "react";
import PlotContainer from "./PlotContainer";
import { csv as read_csv } from "d3";
import styled from "styled-components";

function modify_data(data = []) {
  let modified_data = {};

  data.forEach((row) => {
    // 'Variable', 'Year', 'Value', 'Unit']
    // console.log(row["Variable"]);
    if (!modified_data[row["Variable"]]) {
      modified_data[row["Variable"]] = {};
    }

    if (!modified_data[row["Variable"]]["X"]) {
      modified_data[row["Variable"]]["X"] = [];
    }
    modified_data[row["Variable"]]["X"].push(row["Year"]);

    if (!modified_data[row["Variable"]]["y"]) {
      modified_data[row["Variable"]]["y"] = [];
    }
    modified_data[row["Variable"]]["y"].push(row["Value"]);
  });

  return modified_data;
}

export function EconomyPlots() {
  const [data, setData] = useState({});
  const [selectedPlots, setSelectedPlots] = useState([0, 1, 2]);

  useEffect(() => {
    read_csv("/datasets/ireland_economy.csv").then((rows) => {
      setData(rows);
      let modified_data = modify_data(rows);
      setData(modified_data);

      console.log("success to read csv");
    });
  }, []);

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
      <h2>Ireland Economy Trends</h2>
      <div>
        {plots.map((plot, index) => {
          return (
            <Toggle
              key={plot.title}
              className={selectedPlots.includes(index) ? "active" : "inactive"}
              onClick={() => onToggleClick(index)}
            >
              {index} {plot.title}
            </Toggle>
          );
        })}
      </div>
      <EconomyPlotsContainer className="economy_plots">
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
      </EconomyPlotsContainer>
    </>
  );
}

const EconomyPlotsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;

  .plot-box {
    flex: 1;
  }
`;

const Toggle = styled.button`
  font-size: small;
  // font-weight: bold;
  border: 1px solid black;
  padding: 4px 8px;
  border-radius: 2px;
  margin: 0 2px 4px;
  cursor: pointer;

  &.active {
    background: var(--black);
    color: var(--white);
  }

  &.inactive {
    background: transparent;
    color: var(--black);
    // border-color: transparent;
  }
`;
