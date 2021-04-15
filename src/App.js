import Component from "./visualizations/line";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;

  > * {
    margin-top: 30px;
  }
`;

const datasets = [
  [15, 20, 30],
  [10, 300, 15436],
  [7, 23, 75],
];

const labels = ["A", "B", "C"];

function App() {
  return (
    <Container>
      <Component size="600" datasets={datasets} labels={labels} />
    </Container>
  );
}

export default App;
