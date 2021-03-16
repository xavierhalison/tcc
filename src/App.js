import Component from "./visualizations/bar";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;

  > * {
    margin-top: 30px;
  }
`;

function App() {
  const arr = Array.from({ length: 12 }, () =>
    Math.floor(Math.random() * 10000)
  );

  const labels = [
    "jan",
    "fev",
    "mar",
    "abr",
    "mai",
    "jun",
    "jul",
    "ago",
    "set",
    "out",
    "nov",
    "dez",
  ];

  return (
    <Container>
      <Component size="600" data={arr} color="#2a9d8f" labels={labels} />
    </Container>
  );
}

export default App;
