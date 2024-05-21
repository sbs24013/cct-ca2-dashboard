import "./App.css";
import styled from "styled-components";
import logo from "./assets/park-dashboard-logo.png";

// Plots
import { SimplePlot } from "./components/plots/SimplePlot";
import Box from "./components/ui/Box";
import TogglePlots from "./components/plots/TogglePlots";
// import { LinePlot } from "./components/LinePlot";
// import AnimatedMapPlot from "./components/AnimatedMapPlot";

function App() {
  return (
    <Layout className="layout">
      <Header>
        <img src={logo} alt="logo" className="logo" width={100} />
        <h1>
          Interactive Dashboard <br />
          <em>by</em> Jongsun Park
        </h1>
      </Header>

      <PlotContainer className="plot-container">
        {/* <AnimatedMapPlot />
        <SimplePlot />
        <LinePlot /> */}
        {/* FAO Dataset */}
        <TogglePlots
          path="/datasets/ireland_economy.csv"
          heading="Ireland Economic Statistics"
          selected_init={[1, 2]}
        />
        <TogglePlots
          path="/datasets/ireland_land_use.csv"
          heading="Ireland Land Use Statistics"
          selected_init={[0, 1, 2]}
        />
        <TogglePlots
          path="/datasets/ireland_population.csv"
          heading="Ireland Population Statistics"
          selected_init={[1, 3]}
        />

        <Row>
          <Box>Box</Box>
          <Box>Box</Box>
          <Box>Box</Box>
          <Box>Box</Box>
        </Row>
        <Row>
          <SimplePlot />
          <SimplePlot />
        </Row>
        <Row>
          <SimplePlot />
        </Row>
        <Row>
          <SimplePlot />
          <SimplePlot />
          <SimplePlot />
        </Row>
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

const PlotContainer = styled.div``;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;

  h1 {
    text-wrap: balance;
    font-size: 1.2rem;
    color: var(--dark-green);
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;
