import styled from "styled-components";
import { UrlObj } from "../UrlObj";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  font-size: 25px;
  padding: 5px;
`;
const Button = styled.button`
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: right;
  margin: 20px auto;
`;
interface TableProps {
  urlsList: UrlObj[];
  deleteHistory: () => void;
}

const HistoryTable = ({ urlsList, deleteHistory }: TableProps) => {
  return (
    <>
      <Title>HISTORY</Title>
      <Button onClick={deleteHistory}>REMOVE ALL</Button>
      <TableContainer
        style={{ margin: "3% auto", overflow: "scroll", maxHeight: "450px" }}
        component={Paper}
        sx={{ maxWidth: "80%" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ORIGIN URL</TableCell>
              <TableCell>SHORT URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urlsList.map((row, i) => (
              <TableRow key={i}>
                <TableCell>
                  <a href={row.url} target="_blank" rel="noreferrer">
                    {row.url}
                  </a>
                </TableCell>
                <TableCell>
                  <a href={row.url} target="_blank" rel="noreferrer">
                    {row.shortUrl}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default HistoryTable;
