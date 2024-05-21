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
        <h1>Interactive Dashboard by Jongsun Park</h1>
      </Header>

      <div className="plots">
        <AnimatedMapPlot />
        <SimplePlot />
        <LinePlot />
      </div>
    </Layout>
  );
}

export default App;

const Layout = styled.div`
  max-width: 1024px;
  height: 100%;
  margin: 1rem auto;
`;

const Header = styled.header`
  display: flex;
  align-items: center;

  h1 {
  }
`;
