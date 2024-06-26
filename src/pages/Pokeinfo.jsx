import React, { useEffect } from 'react'
import useFetch from '../hooks/useFetch'
import { useParams } from 'react-router-dom'
import './styles/pokeInfo.css'

const Pokeinfo = () => {

  const [pokemon, getPokemon] = useFetch()

  const { id } = useParams()

// console.log(pokemon)

  useEffect(() => {
    getPokemon(`https://pokeapi.co/api/v2/pokemon/${id}`)
  }, [])

  return (
    <section className='pokeinfo'>
      <h2 className='pokemon__name'>{pokemon?.name.toUpperCase()}</h2>
      <figure className='pokeinfo_img'>
        <img src={pokemon?.sprites.other['official-artwork'].front_default} alt="pokemon" />
      </figure>
      <ul className='pokeinfo_stat'>
        {
          pokemon?.stats.map(stat => (
            <li className='pokeinfo_stat-item' key={stat.stat.url}>
              <span>{stat.stat.name}</span><span>{stat.base_stat}/250</span>
              <div className='outbar'>
                <div className='inbar' style={{ width: `${(stat.base_stat/2.5)}%`, }}></div>
              </div>
            </li>
          ))
        }
      </ul>
    </section>
  );
}

export default Pokeinfo;