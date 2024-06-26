import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import { useNavigate } from 'react-router-dom';
import './styles/pokeCard.css'

const PokeCard = ({ url }) => {
  const [pokemon, getPokemon] = useFetch();

  const navigate = useNavigate()

  useEffect(() => {
    getPokemon(url);
  }, []);

  const handleClick = () => {
      navigate(`/pokedex/${pokemon.id}`)
  }

  console.log(pokemon)
  return (
    <article className='pokecard' onClick={handleClick}>
      <div className={`pokecard__back ${pokemon?.types[0].type.name}`}></div>
      <figure className='pokecard__img'>
        <img src={pokemon?.sprites.other['official-artwork'].front_default} alt="pokemon" />
      </figure>
      <h3 className='pokecard__name'>{pokemon?.name}</h3>
      <span className='pokecard__span'>type</span>
      <ul className='pokecard__types'>
        {
          pokemon?.types.map((type, i) => (
            <li className={`slot${type.slot}`} key={type.type.url}>
              {type.type.name}
            </li>
          ))
        }
      </ul>
      <hr className='pokecard__hr' />
      <ul className='pokecard__stats'>
        {
          pokemon?.stats.map(stat => (
            stat.stat.name.includes('special') && (
              <li key={stat.stat.url}>
                <span>{stat.stat.name}</span>
                <span>{stat.base_stat}</span>
              </li>
            )
          ))
        }
      </ul>
    </article>
  )
  }
  
  export default PokeCard;
  