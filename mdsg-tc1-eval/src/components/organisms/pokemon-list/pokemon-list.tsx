import { FC, useCallback, useEffect, useState } from 'react'
import './pokemon-list.scss'
import Card from '../../molecules/card/card'
import { useAppContext } from '../../../context/app-context'
import { PokemonService } from '../../../services/pokemon-service/pokemon-service'

interface PokemonListProps {
  searchedPokemon?: string
}

const PokemonList : FC<PokemonListProps> = ({searchedPokemon}) => {
  const { pokemonReducer } = useAppContext()
  const { pokemonState, pokemonDispatch } = pokemonReducer
  const { pokemons} = pokemonState
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(50)


  const getPokemons = useCallback(async () => {
    try {
      const data = await PokemonService.getPokemons(limit.toString(),offset.toString())
      pokemonDispatch({ type: 'getPokemons', payload: data })
    }catch(e) {
    }
  }, [pokemonDispatch, offset])

  useEffect(() => {
    if(searchedPokemon === ''){
      getPokemons()
    }
  }, [getPokemons])

  useEffect(() => {
    const  handleOnScroll = () => {
      if(window.innerHeight + window.scrollY >= document.body.offsetHeight){
        setOffset(offset + 50)
        setLimit(limit + 50)
      }

    }
    window.addEventListener('scroll', handleOnScroll)
    return () => {
      window.removeEventListener('scroll', handleOnScroll)
    }
  }, [offset, limit])


  return (
    <>
    <div className="pokemon-list">
    {
        pokemons.length === 0 && (
          <div className="pokemon-list__not-found">
            <p className="pokemon-list__not-found__text">No Existen Pokemons</p>
          </div>
        )
      }
      {pokemons.map(((pokemon, index) => (
        <div className="pokemon-list__cards" key={index}>
          <Card
            card={pokemon}
          />
        </div>
      )))}
    </div>
    </>
  )
}

export default PokemonList