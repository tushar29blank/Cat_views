import React, { useState, useEffect } from 'react';
import './App.css';

const CatGallery = () => {
  const [cats, setCats] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCats = async (breedId = '') => {
    setLoading(true);
    try {
      const url = breedId ? `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breedId}` : 'https://api.thecatapi.com/v1/images/search?limit=10';
      const response = await fetch(url);
      const data = await response.json();
      setCats(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch cat images');
    } finally {
      setLoading(false);
    }
  };

  const fetchBreeds = async () => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/breeds');
      const data = await response.json();
      setBreeds(data);
    } catch (err) {
      console.error('Failed to fetch breeds');
    }
  };

  useEffect(() => {
    fetchCats();
    fetchBreeds();
  }, []);

  const handleBreedChange = (e) => {
    setSelectedBreed(e.target.value);
    fetchCats(e.target.value);
  };

  return (
    <div className="container">
      <h1 className="title">Random Cat Images Gallery</h1>

      <label htmlFor="breed-select">Filter by Breed:</label>
      <select id="breed-select" value={selectedBreed} onChange={handleBreedChange} className="breed-select">
        <option value="">All Breeds</option>
        {breeds.map((breed) => (
          <option key={breed.id} value={breed.id}>{breed.name}</option>
        ))}
      </select>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="gallery">
        {cats.map((cat) => (
          <img key={cat.id} src={cat.url} alt="Cat" className="cat-image" />
        ))}
      </div>
      <button onClick={() => fetchCats(selectedBreed)} className="load-more">Load More</button>

      <style jsx>{`
        .container {
          background-color:black;
          text-align: center;
          padding: 20px;
          width: 1530px;
          height:700px;
          font-family: Arial, sans-serif;
        }
        .title {

          font-size: 2rem;
          margin-bottom: 20px;
          color: pink;
        }
        .loading, .error {
          font-size: 1.2rem;
          color: #ff0000;
        }
        .breed-select {
          padding: 10px;
          font-size: 1rem;
          margin-bottom: 20px;
        }
        .gallery {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
          margin-bottom: 20px;
        }
        .cat-image {
          width: 100%;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .load-more {
          padding: 10px 20px;
          font-size: 1rem;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .load-more:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default CatGallery;
