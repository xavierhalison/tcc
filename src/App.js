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

  const arr2 = Array.from({ length: 12 }, () =>
    Math.floor(Math.random() * 8000)
  );

  const arr3 = Array.from({ length: 12 }, () =>
    Math.floor(Math.random() * 8000)
  );

  const arr4 = Array.from({ length: 50 }, () =>
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

  const labels2 = [
    "Janeiro de 2017",
    "Fevereiro de 2017",
    "Março de 2017",
    "Abril de 2017",
    "Maio de 2017",
    "Junho de 2017",
    "Julho de 2017",
    "Agosto de 2017",
    "Setembro de 2017",
    "Outubro de 2017",
    "Novembro de 2017",
    "Dezembro de 2017",
    "Janeiro de 2018",
    "Fevereiro de 2018",
    "Março de 2018",
    "Abril de 2018",
    "Maio de 2018",
    "Junho de 2018",
    "Julho de 2018",
    "Agosto de 2018",
    "Setembro de 2018",
    "Outubro de 2018",
    "Novembro de 2018",
    "Dezembro de 2018",
    "Janeiro de 2019",
    "Fevereiro de 2019",
    "Março de 2019",
    "Abril de 2019",
    "Maio de 2019",
    "Junho de 2019",
    "Julho de 2019",
    "Agosto de 2019",
    "Setembro de 2019",
    "Outubro de 2019",
    "Novembro de 2019",
    "Dezembro de 2019",
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
    "Janeiro de 2021",
    "Fevereiro de 2021",
  ];

  return (
    <Container>
      <Component size="600" data={arr} color="#2a9d8f" labels={labels} />
      <Component size="500" data={arr2} color="#2a9d8f" labels={labels} />
      <Component size="400" data={arr3} color="#2a9d8f" labels={labels} />
      <Component size="600" data={arr4} color="#2a9d8f" labels={labels2} />
    </Container>
  );
}

export default App;
