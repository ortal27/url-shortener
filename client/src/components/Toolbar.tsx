import styled from "styled-components";

const Container = styled.div`
  height: 70px;
  background-color: darkblue;
`;

const Title = styled.div`
  font-family: sans-serif;
  font-size: 20px;
  color: white;
  padding: 20px;
`;
const Toolbar = () => {
  return (
    <Container>
      <Title>URL SHOTENER</Title>
    </Container>
  );
};

export default Toolbar;
