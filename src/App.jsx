import "./App.css";
import styled from "styled-components";

import logo from "./assets/park-dashboard-logo.png";

// Plots
import { SimplePlot } from "./components/SimplePlot";
import { LinePlot } from "./components/LinePlot";
import AnimatedMapPlot from "./components/AnimatedMapPlot";

function App() {
  return (
    <Layout className="layout">
      <Header>
        <img src={logo} alt="logo" className="logo" width={150} />
        <h1>
          Interactive Dashboard <br />
          <em>by</em> Jongsun Park
        </h1>
      </Header>

      <PlotContainer className="plot-container">
        <AnimatedMapPlot />
        <SimplePlot />
        <LinePlot />
      </PlotContainer>
    </Layout>
  );
}

export default App;

const Layout = styled.div`
  padding: 1rem;
  max-width: 90vw;
  @media (max-width: 900px) {
    max-width: 100%;
  }
  height: 100%;
  margin: 1rem auto;
`;

const PlotContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  .plot-container {
    overflow: hidden;
    border-radius: 5px;
    box-shadow: 0px 10px 1rem rgba(0, 0, 0, 0.05);
    background-color: var(--white);
    padding: 0.5rem;

    .js-plotly-plot {
      width: 100%;
      height: 100%;
    }
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;

  h1 {
    text-wrap: balance;
    color: var(--dark-green);
  }
`;
