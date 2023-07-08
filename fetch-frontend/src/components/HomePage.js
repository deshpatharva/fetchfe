import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Card, CardContent, CardMedia, Box, TextField, Button, Typography, Container, Grid, MenuItem, Drawer} from '@mui/material';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [searchParam, setSearchParam] = useState('');
  const [dogs, setDogs] = useState([]);
  const [breedList, setBreedList] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [zipcode, setZipcode] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    fetchBreedList();
  }, []);

  const fetchBreedList = async () => {
    try {
      const response = await axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds', {
        withCredentials: true,
      });
      setBreedList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchParamChange = (event) => {
    setSearchParam(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        `https://frontend-take-home-service.fetch.com/dogs/search?${searchParam}=${search}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      const resultIds = response.data.resultIds;

      axios
        .post('https://frontend-take-home-service.fetch.com/dogs', resultIds, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          setDogs(response.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleRecommendation = async () => {
    try {
      const response = await axios.post(
        'https://frontend-take-home-service.fetch.com/dogs/match',
        dogs.map((dog) => dog.id),
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      setRecommendation(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterOpen = () => {
    setFilterOpen(true);
  };

  const handleFilterClose = () => {
    setFilterOpen(false);
  };

  const handleApplyFilter = () => {
    // Handle filtering logic here
    console.log('Zip Code:', zipcode);
    console.log('Sort Option:', sortOption);
    // Perform additional API requests or data manipulation based on filters
    handleFilterClose();
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Fetch Dog Data
      </Typography>
      <Box component="form" onSubmit={handleSearch} sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              select
              id="searchParam"
              label="Search By:"
              value={searchParam}
              onChange={handleSearchParamChange}
              fullWidth
              variant="outlined"
              sx={{ minWidth: '100%' }}
            >
              <MenuItem value="breeds">Breed</MenuItem>
              <MenuItem value="zipCodes">Zip Code</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Autocomplete
                id="search"
                options={breedList}
                value={search}
                onChange={(event, newValue) => setSearch(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Search..." fullWidth variant="outlined" sx={{ minWidth: '300%' }}/>
                )}
              />
              <IconButton type="submit" sx={{ marginLeft: '230px' }}>
                <SearchIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={2}>
        {dogs.map((dog) => (
          <Grid item xs={12} sm={6} md={4} key={dog.id}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardMedia
                component="img"
                sx={{ height: 200, objectFit: 'cover' }}
                image={dog.img}
                alt={dog.name}
              />
              <CardContent>
                <Typography variant="h6" component="h2">
                  {dog.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Breed: {dog.breed}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Zip Code: {dog.zip_code}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Age: {dog.age}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Drawer anchor="right" open={filterOpen} onClose={handleFilterClose}>
        <Box sx={{ width: '300px', padding: '16px' }}>
          <Typography variant="h6" gutterBottom>
            Filter Options
          </Typography>
          <TextField
            id="zipcode"
            label="Zip Code"
            value={zipcode}
            onChange={(event) => setZipcode(event.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            select
            id="sortOption"
            label="Sort Option"
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </TextField>
          <Button variant="contained" onClick={handleApplyFilter}>
            Apply
          </Button>
        </Box>
      </Drawer>
      <Button variant="contained" onClick={handleFilterOpen} sx={{ mt: 4 }}>
        Filter
      </Button>


    </Container>
  );
};



export default HomePage;
