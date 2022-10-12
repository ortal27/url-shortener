import styled from "styled-components";
import { TextField } from "@mui/material";

const Container = styled.div`
  width: 60%;
  margin: 20px auto;
  max-width: 758px;
  box-shadow: 0 1px 4px #ccc;
  border-radius: 2px;
  padding: 25px;
  background: #fff;
  text-align: center;
`;
const Input = styled.div`
  display: flex;
`;

const Title = styled.div`
  width: 20%;
  display: flex;
  font-size: 25px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 0 5px;
`;

interface Box {
  type: string;
  title?: string;
  isValid: boolean;
  label: string;
  value: string | undefined;
  onSubmitHandler: () => void;
  setUrl: (val: string) => void;
  buttonTitle: string;
  redirectToUrl?: string | undefined;
}

const UrlBox = ({
  type,
  title,
  isValid,
  label,
  value,
  onSubmitHandler,
  setUrl,
  buttonTitle,
  redirectToUrl,
}: Box) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Input>
        <TextField
          error={isValid}
          id="outlined-basic"
          label={label}
          variant="outlined"
          value={value}
          onChange={(e) => setUrl(e.target.value)}
          fullWidth
        />
        {type === "result" && value ? (
          <>
            <Button type="submit">
              <a href={redirectToUrl} target="_blank" rel="noreferrer">
                {buttonTitle}
              </a>
            </Button>
          </>
        ) : (
          <Button type="submit" onClick={onSubmitHandler}>
            {buttonTitle}
          </Button>
        )}
      </Input>
    </Container>
  );
};

export default UrlBox;
