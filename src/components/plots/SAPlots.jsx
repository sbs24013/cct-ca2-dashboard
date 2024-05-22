/* eslint-disable react/prop-types */
import { csv as read_csv } from "d3";
import { useEffect, useState } from "react";
import PlotContainer from "./PlotContainer";
import styled from "styled-components";

const SASummary = ({ summary }) => {
  if (!summary) return "";

  const data = [
    {
      labels: Object.keys(summary),
      values: Object.values(summary),
      textinfo: "label+percent",
      textposition: "outside",
      automargin: true,
      hole: 0.6,
      type: "pie",
    },
  ];

  return <PlotContainer data={data} />;
};

const SAHistoGram = ({ data = [] }) => {
  const trace = {
    y: data,
    type: "scatter",
    mode: "markers",
    cliponaxis: false,
    marker: {
      opacity: 0.5,
      color: data,
      cmin: -1,
      cmax: 1,
      colorscale: "RdBu",
    },
  };

  return <PlotContainer data={[trace]} />;
};

export default function SAPlots() {
  const [summary, setSummary] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    read_csv("/datasets/sa_ireland_uk_food_summary.csv").then((rows) => {
      let sa_summary = {};
      rows.forEach((row) => {
        sa_summary[row["label"]] = row["values"];
      });
      setSummary(sa_summary);
    });
  }, []);

  useEffect(() => {
    read_csv("/datasets/sa_ireland_uk_food.csv").then((rows) => {
      let temp_data = rows.map((row) => Number(row.compound));
      setData(temp_data);
    });
  }, []);

  return (
    <>
      <h2>Sentiment Analysis - r/ireland?uk+food</h2>
      <SAContainer className="sa_container">
        <SASummary summary={summary} />
        <SAHistoGram data={data} />
      </SAContainer>
    </>
  );
}

const SAContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
