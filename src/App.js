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

Array.from({ length: 40 }, () => Math.floor(Math.random() * 40));


const datasets = [
  Array.from({ length: 12 }, () => Math.floor(Math.random() * 1000)),
  Array.from({ length: 12 }, () => Math.floor(Math.random() * 1000)),
  Array.from({ length: 12 }, () => Math.floor(Math.random() * 1000)),
];

const labels = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

const colors = ["#071013", "#EB5160", "#b7999c"];

function App() {
  return (
    <Container>
      <Component size="600" datasets={datasets} labels={labels} colors={colors} />
    </Container>
  );
}

export default App;
