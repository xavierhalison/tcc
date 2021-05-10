import Component from "./visualizations/bars";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;

  > * {
    margin-top: 30px;
  }
`;

Array.from({ length: 40 }, () => Math.floor(Math.random() * 40));

const datasets = [
  Array.from({ length: 12 }, () => Math.floor(Math.random() * 300)),
  Array.from({ length: 12 }, () => Math.floor(Math.random() * 300)),
  Array.from({ length: 12 }, () => Math.floor(Math.random() * 300)),
];

const labels = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

const colors = ["#9bbfeb", "#e62e43", "#7be893"];

function App() {
  return (
    <Container>
      <Component
        size="500"
        data={datasets[0]}
        labels={labels}
        colors={colors}
      />
    </Container>
  );
}

export default App;
