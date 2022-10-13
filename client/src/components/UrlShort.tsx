import React, { useEffect, useState } from "react";
import axios from "axios";
import { UrlObj } from "../UrlObj";
import styled from "styled-components";
import UrlBox from "./UrlBox";
import HistoryTable from "./HistoryTable";

const Container = styled.div`
  margin: auto;
  margin-top: 8%;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  font-size: 25px;
  padding: 5px;
`;

const UrlShort = () => {
  const [url, setUrl] = useState<string>("");
  const [urlsList, setUrlsList] = useState<UrlObj[]>();
  const [lastUrl, setLastUrl] = useState<UrlObj | null>();
  const [invalidUrl, setInvalidUrl] = useState<boolean>(false);
  const [urlExists, setUrlExists] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8080/").then((res) => {
      console.log("here1", res.data === null);

      setUrlsList(res.data);
    });
  }, [lastUrl]);

  const onSubmitHandler = () => {
    axios
      .post("http://localhost:8080/url-shortener", { url })
      .then((res) => {
        setLastUrl(res.data);
        setUrl("");
        if (invalidUrl || urlExists) {
          setInvalidUrl(false);
          setUrlExists(false);
        }
      })
      .catch((error) => {
        setLastUrl(null);
        if (error.response.status === 409) {
          setUrlExists(true);
          setInvalidUrl(false);
          return;
        }
        setInvalidUrl(true);
        setUrlExists(false);
      });
  };

  const deleteHistoryHsndler = () => {
    axios.get("http://localhost:8080/delete-history").then(() => {
      setUrlsList([]);
      setLastUrl(null);
      setUrlExists(false);
    });
  };
  return (
    <Container>
      <UrlBox
        type="create"
        title="ADD URL:"
        isValid={invalidUrl}
        label="URL LINK"
        value={url}
        setUrl={setUrl}
        onSubmitHandler={onSubmitHandler}
        buttonTitle="SHORTENER URL"
      />

      {lastUrl && !invalidUrl ? (
        <UrlBox
          type="result"
          isValid={invalidUrl}
          label="SHORTENER URL"
          value={lastUrl?.shortUrl}
          setUrl={setUrl}
          onSubmitHandler={onSubmitHandler}
          buttonTitle="Redirect to URL"
          redirectToUrl={lastUrl.url}
        />
      ) : (
        <Title style={{ color: "red" }}>
          {urlExists
            ? "URL LINK ALREADY EXISTS!"
            : invalidUrl
            ? "INVALID URL!"
            : null}
        </Title>
      )}
      {urlsList && urlsList?.length > 0 && (
        <HistoryTable
          urlsList={urlsList}
          deleteHistory={deleteHistoryHsndler}
        />
      )}
    </Container>
  );
};

export default UrlShort;
