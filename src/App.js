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
    Math.floor(Math.random() * 8000)
  );

  const labels = [
    "Janeiro de 2020",
    "Fevereiro de 2020",
    "Março de 2020",
    "Abril de 2020",
    "Maio de 2020",
    "Junho de 2020",
    "Julho de 2020",
    "Agosto de 2020",
    "Setembro de 2020",
    "Outubro de 2020",
    "Novembro de 2020",
    "Dezembro de 2020",
  ];

  return (
    <Container>
      <Component size="600" data={arr} color="#2a9d8f" labels={labels} />
    </Container>
  );
}

export default App;
