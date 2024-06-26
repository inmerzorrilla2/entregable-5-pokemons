import React, { useEffect, useRef, useState } from 'react';
import PokeCard from '../components/pokedex/PokeCard.jsx';
import useFetch from '../hooks/useFetch.js';
import { useSelector } from 'react-redux';
import PokeSelect from '../components/pokedex/PokeSelect.jsx';
import './styles/pokedex.css';

const Pokedex = () => {
  const trainer = useSelector((store) => store.trainer);
  const [inputValue, setInputValue] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searchError, setSearchError] = useState('');

  const [pokemons, getPokemons, getType, nextPage, prevPage, nextCount, prevCount] = useFetch();

  useEffect(() => {
    if (typeFilter) {
      getType(typeFilter);
    } else {
      const url = 'https://pokeapi.co/api/v2/pokemon/?limit=10';
      getPokemons(url);
    }
  }, [typeFilter]);

  const textInput = useRef();

  const handleSearch = async (event) => {
    event.preventDefault();
    const query = textInput.current.value.trim().toLowerCase();
    setInputValue(query);
    textInput.current.value = '';

    if (query) {
      const url = `https://pokeapi.co/api/v2/pokemon/${query}`;
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setSearchResults([data]);
          setSearchError('');
        } else {
          setSearchResults(null);
          setSearchError('No Pokémon found.');
        }
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
        setSearchResults(null);
        setSearchError('Error fetching Pokémon.');
      }
    } else {
      setSearchResults(null);
      setSearchError('');
      setTypeFilter(''); // Reset the type filter when search input is cleared
    }
  };

  const handleNextPage = () => {
    if (nextPage) {
      getPokemons(nextPage);
      setSearchResults(null);
      setSearchError('');
      setTypeFilter(''); // Reset the type filter when changing pages
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      getPokemons(prevPage);
      setSearchResults(null);
      setSearchError('');
      setTypeFilter(''); // Reset the type filter when changing pages
    }
  };

  return (
    <>
      <div className='wave__container'>
        <h3 className="pokedex__wave">Pokedex</h3>
      </div>
      <div className="pokedex__container">
        <div className="wrapper__typing">
          <div className="typing-demo">Hi {trainer}! search a Pokémon!</div>
        </div>
        <div className='pokedex__search'>
          <form onSubmit={handleSearch}>
            <input ref={textInput} type="text" />
            <button>Search</button>
          </form>
          {searchError && <p className="pokedex__error">{searchError}</p>}
        </div>
        <PokeSelect setTypeFilter={setTypeFilter} />
        <div className="pokedex__pagination">
          {prevPage && (
            <button onClick={handlePrevPage}>
              Previous ({prevCount})
            </button>
          )}
          {nextPage && (
            <button onClick={handleNextPage}>
              Next ({nextCount})
            </button>
          )}
        </div>
        <div className="pokedex__grid">
          {searchResults ? (
            searchResults.map((poke) => (
              <PokeCard key={poke.id} url={`https://pokeapi.co/api/v2/pokemon/${poke.id}`} />
            ))
          ) : (
            pokemons?.results.map((poke) => (
              <PokeCard key={poke.url} url={poke.url} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Pokedex;