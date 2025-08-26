import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Filter.css'; // New CSS file

const Filter = ({ items }) => {
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [durationRange, setDurationRange] = useState([1, 15]);

  return (
    <div className="filter-card">
      <h2 className="filter-title">Filters</h2>

      {/* Price Filter */}
      <div className="filter-section">
        <label className="filter-label">Price Range</label>
        <Slider
          range
          min={0}
          max={100000}
          step={1000}
          value={priceRange}
          onChange={setPriceRange}
          trackStyle={[{ backgroundColor: '#ff6b6b' }]}
          handleStyle={[
            { borderColor: '#ff6b6b', backgroundColor: '#fff' },
            { borderColor: '#ff6b6b', backgroundColor: '#fff' }
          ]}
          railStyle={{ backgroundColor: '#ddd' }}
        />
        <p className="filter-value">
          ₹{priceRange[0]} - ₹{priceRange[1]}
        </p>
      </div>

      {/* Duration Filter */}
      <div className="filter-section">
        <label className="filter-label">Duration (Days)</label>
        <Slider
          range
          min={1}
          max={15}
          step={1}
          value={durationRange}
          onChange={setDurationRange}
          trackStyle={[{ backgroundColor: '#4ecdc4' }]}
          handleStyle={[
            { borderColor: '#4ecdc4', backgroundColor: '#fff' },
            { borderColor: '#4ecdc4', backgroundColor: '#fff' }
          ]}
          railStyle={{ backgroundColor: '#ddd' }}
        />
        <p className="filter-value">
          {durationRange[0]} - {durationRange[1]} days
        </p>
      </div>
    </div>
  );
};

export default Filter;
