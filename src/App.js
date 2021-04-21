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
  Array.from({ length: 12 }, () => Math.floor(Math.random() * 300)),
  Array.from({ length: 12 }, () => Math.floor(Math.random() * 300)),
  Array.from({ length: 12 }, () => Math.floor(Math.random() * 300)),
];

const labels = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

const colors = ["#9bbfeb", "#e62e43", "#7be893"];

function App() {
  return (
    <Container>
      {/* <Component
        size="500"
        datasets={datasets}
        labels={labels}
        colors={colors}
      /> */}
      <input
        type="text"
        value="http://csrv.tv:80/get.php?username=D6UJkPZCtW&password=1718225948&output=ts&type=m3u"
      />
    </Container>
  );
}

export default App;
