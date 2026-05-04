import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Parts() {
  const { id } = useParams();
  const [parts, setParts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/vehicles/${id}/parts`)
      .then(res => {
        setParts(res.data);
        setFiltered(res.data);
        // Get unique categories
        const cats = ['All', ...new Set(res.data.map(p => p.category))];
        setCategories(cats);
      })
      .catch(err => console.log(err));
  }, [id]);

  // Search and filter logic
  useEffect(() => {
    let result = parts;
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    if (search.trim() !== '') {
      result = result.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFiltered(result);
  }, [search, activeCategory, parts]);

  return (
    <div className="parts">
      <button onClick={() => navigate('/')}>← Back to Vehicles</button>
      <h2>Vehicle Parts</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search parts..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Category Filter Buttons */}
      <div className="filter-buttons">
        {categories.map(cat => (
          <button
            key={cat}
            className={activeCategory === cat ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Parts Grid */}
      {filtered.length === 0 ? (
        <p className="no-results">No parts found. Try a different search!</p>
      ) : (
        <div className="parts-grid">
          {filtered.map(part => (
            <div
              key={part.id}
              className="part-card"
              onClick={() => navigate(`/parts/${part.id}`)}
            >
              <h3>{part.name}</h3>
              <p>{part.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Parts;
 