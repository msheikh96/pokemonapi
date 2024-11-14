import React, { useEffect, useState } from "react";

function PokemonList() {
  const [data, setData] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20");
        
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        
        const result = await response.json();
        setData(result.results);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handlePokemonClick = async (url) => {
    setLoadingDetails(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch Pokémon details");
      }
      const details = await response.json();
      setSelectedPokemon(details);
      setLoadingDetails(false);
    } catch (error) {
      setError(error.message);
      setLoadingDetails(false);
    }
  };

  if (loading) return <div>Loading Pokémon list...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Pokémon List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {data.map((pokemon, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</td>
              <td>
                <button onClick={() => handlePokemonClick(pokemon.url)}>
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {loadingDetails && <div>Loading details...</div>}

      {selectedPokemon && (
        <div>
          <h2>Details for {selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1)}</h2>
          <p><strong>ID:</strong> {selectedPokemon.id}</p>
          <p><strong>Height:</strong> {selectedPokemon.height}</p>
          <p><strong>Weight:</strong> {selectedPokemon.weight}</p>
          <p><strong>Abilities:</strong> {selectedPokemon.abilities.map((ability) => ability.ability.name).join(", ")}</p>
          <p><strong>Base Experience:</strong> {selectedPokemon.base_experience}</p>
          
          <h3>Images</h3>
          <div style={{ display: "flex", gap: "10px" }}>
            <img src={selectedPokemon.sprites.front_default} alt="Front view" />
            <img src={selectedPokemon.sprites.back_default} alt="Back view" />
            <img src={selectedPokemon.sprites.front_shiny} alt="Shiny front view" />
          </div>
        </div>
      )}
    </div>
  );
}

export default PokemonList;
