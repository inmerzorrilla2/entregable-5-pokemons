import axios from "axios";
import { useState } from "react";

const useFetch = () => {
  const [apiData, setApiData] = useState();
  const [nextPage, setNextPage] = useState('');
  const [prevPage, setPrevPage] = useState('');
  const [nextCount, setNextCount] = useState(0);
  const [prevCount, setPrevCount] = useState(0);

  const getApi = (url) => {
    axios.get(url)
      .then(res => {
        setApiData(res.data);
        setNextPage(res.data.next);
        setPrevPage(res.data.previous);
        setNextCount(res.data.next ? res.data.results.length : 0);
        setPrevCount(res.data.previous ? res.data.results.length : 0);
      })
      .catch(err => console.log(err));
  };

  const getType = (url) => {
    axios.get(url)
      .then(res => {
        const results = res.data.pokemon.map((poke) => poke.pokemon);
        setApiData({ results });
        setNextPage('');
        setPrevPage('');
        setNextCount(0);
        setPrevCount(0);
      })
      .catch(err => console.log(err));
  };

  return [apiData, getApi, getType, nextPage, prevPage, nextCount, prevCount];
};

export default useFetch;
