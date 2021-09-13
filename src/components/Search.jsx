import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import listOfFilms from '../listOfFilms';
import axios from "axios";
import dotenv from 'dotenv';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    }, 
    table: {
        minWidth: 650,
      },
  }));


export default function Search() {
  const classes = useStyles();
  const [genre, setGenre] = useState('');
  const [films, setFilms] = useState([]);

  const handleChange = (event) => {
    setGenre(event.target.value);
    let listOfGenre = listOfFilms.filter(film => film.genre === event.target.value);
    setFilms(listOfGenre);
  };

  //We need to be subscribe to the API.
  const options = {
    method: 'GET',
    url: `https://netflix-unofficial.p.rapidapi.com/api/${genre}`,
    headers: {
      'x-rapidapi-host': 'netflix-unofficial.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_API_KEY
    }
  };

  //axios must to be npm installed. It will fetch all data. After that we can manipulate and display the
  //data as we want in the UI. We can modify as we want. For exammple add to a new state 
  //the exactly data we want to use. 

  const fetchFilmData = () => {
    axios.request(options).then(function (response) {
    console.log(response.data);
      }).catch(function (error) {
          console.error(error);
      });
    }

    return (
     <>
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Film Genre</InputLabel>
            <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={genre}
            onChange={handleChange}
            label="Genre"
            >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            <MenuItem value={'Comedy'}>Comedy</MenuItem>
            <MenuItem value={'Horror'}>Horror</MenuItem>
            <MenuItem value={'Romance'}>Romance</MenuItem>
            <MenuItem value={'Thriller'}>Thriller</MenuItem>
            <MenuItem value={'Western'}>Western</MenuItem>
            </Select>
        </FormControl>

        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Gender</TableCell>
                <TableCell align="right">Year</TableCell>
                <TableCell align="right"></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {films.map((film, indx) => (
                <TableRow key={indx}>
                <TableCell component="th" scope="row">{film.Title}
                </TableCell>
                <TableCell align="right">{film.genre}</TableCell>
                <TableCell align="right">{film.year}</TableCell>
                <TableCell align="right"></TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>      

     </>
    )
} 