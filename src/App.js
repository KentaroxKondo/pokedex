import { useEffect, useState } from 'react';
import './App.css';
import { getPokemonData } from './utils/pokemon.js';
import Card from './components/Card/Card.js';
import Header from './components/Header/Header.js';

function App() {
  const initialURL = 'https://pokeapi.co/api/v2/pokemon';
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');

  useEffect(() => {
    const fetchPokemonData = async () => {
      let res = await getPokemonData(initialURL); // 全てのポケモンデータを取得。

      loadPokemon(res.results);
      setNextUrl(res.next);
      setPrevUrl(res.previous);
      setLoading(false);
    };

    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemonData(pokemon.url);
        return pokemonRecord;
      })
    );

    setPokemonData(_pokemonData);
  };

  const handleNextPage = async () => {
    setLoading(true);

    let data = await getPokemonData(nextUrl);
    await loadPokemon(data.results);

    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const handlePrevPage = async () => {
    setLoading(true);

    let data = await getPokemonData(prevUrl);
    await loadPokemon(data.results);

    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  return (
    <>
      <Header />

      <div className="App">
        {loading ? (
          <p style={{ textAlign: 'center', fontWeight: '600' }}>ロード中・・・</p>
        ) : (
          <>
            <div className='pokemonCardContainer'>
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />
              })}
            </div>

            <div className='buttons'>
              {prevUrl === null ? '' : (
                <button onClick={handlePrevPage}>前へ</button>
              )}
              {nextUrl === null ? '' : (
                <button onClick={handleNextPage}>次へ</button>
              )}
            </div>
          </>
        )}
      </div >
    </>
  );
}

export default App;