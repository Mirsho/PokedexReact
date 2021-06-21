/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { toFirstCharUppercase } from './constants';
import { CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const Pokemon = (props) => {
  const { history, match } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonJSX = () => {
    const { id, name, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;

    return (

      <React.Fragment>
        <Typography variant="h1" marked="center" align="center">
          {`#${id} ${toFirstCharUppercase(name)}`}
          <img alt={toFirstCharUppercase(species.name)} src={front_default} />
        </Typography>
        <Typography variant="body2" align="center">
          <img alt={toFirstCharUppercase(species.name)} style={{ width: "300px", height: "300px" }} src={fullImageUrl} />
          <Typography variant="h3">Pokemon Information</Typography>
          <Typography>
            {"Species: "}
            <Link href={species.url}>{toFirstCharUppercase(species.name)}</Link>
          </Typography>
          <Typography>Height: {height / 10} meters</Typography>
          <Typography>Weight: {weight / 10} kilograms</Typography>
          <Typography variant="h6">Types: </Typography>
          {types.map((typeInfo) => {
            const { type } = typeInfo;
            const { name } = type;
            return <Typography key={name}>{`${name}`}</Typography>
          })}
        </Typography>
      </React.Fragment>
    );
  }

  //Data States:
  //1. Pokémon data is undefined - we are gettng the info -> return loading spinner
  //2. Pokémon data is good - we've gotten the info -> return actual info 
  //3. Pokémon data is bad / false -> return pokemon not found

  return (
    <React.Fragment>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX()}
      {pokemon === false && <Typography>Pokémon not found</Typography>}
      <Container>
        <Grid container spacing={8}>
          <Grid item justify="space-between">
            <Button variant="contained" color="primary" onClick={() => history.push('/')}>
              Back to Pokedex
            </Button>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Pokemon;