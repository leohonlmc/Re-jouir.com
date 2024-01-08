import React, { useEffect, useState, useRef } from "react";
import "../../SearchBar.css";

function SearchBar() {
  const [filter, setFilter] = useState("");
  const [country, setCountry] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const countryList = [
    "Global",
    "Argentina",
    "Australia",
    "Austria",
    "Belgium",
    "Brazil",
    "Canada",
    "Chile",
    "Colombia",
    "Costa Rica",
    "Denmark",
    "Ecuador",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "Hong Kong SAR",
    "Iceland",
    "India",
    "Indonesia",
    "Ireland",
    "Italy",
    "Jamaica",
    "Japan",
    "Kenya",
    "Lebanon",
    "Luxembourg",
    "Mexico",
    "Netherlands",
    "New Zealand",
    "Norway",
    "Panama",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Romania",
    "Russia",
    "South Africa",
    "South Korea",
    "Spain",
    "Sweden",
    "Switzerland",
    "Turkey",
    "Taiwan",
    "Ukraine",
    "United Kingdom",
    "United States",
    "Venezuela",
    "Zimbabwe",
  ];

  const countryEmojiMap = {
    Global: "🌍",
    Argentina: "🇦🇷",
    Australia: "🇦🇺",
    Austria: "🇦🇹",
    Belgium: "🇧🇪",
    Brazil: "🇧🇷",
    Canada: "🇨🇦",
    Chile: "🇨🇱",
    Colombia: "🇨🇴",
    "Costa Rica": "🇨🇷",
    Denmark: "🇩🇰",
    Ecuador: "🇪🇨",
    Finland: "🇫🇮",
    France: "🇫🇷",
    Germany: "🇩🇪",
    Greece: "🇬🇷",
    Hungary: "🇭🇺",
    "Hong Kong SAR": "🇭🇰",
    Iceland: "🇮🇸",
    India: "🇮🇳",
    Indonesia: "🇮🇩",
    Ireland: "🇮🇪",
    Italy: "🇮🇹",
    Jamaica: "🇯🇲",
    Japan: "🇯🇵",
    Kenya: "🇰🇪",
    Lebanon: "🇱🇧",
    Luxembourg: "🇱🇺",
    Mexico: "🇲🇽",
    Netherlands: "🇳🇱",
    "New Zealand": "🇳🇿",
    Norway: "🇳🇴",
    Panama: "🇵🇦",
    Peru: "🇵🇪",
    Philippines: "🇵🇭",
    Poland: "🇵🇱",
    Portugal: "🇵🇹",
    "Puerto Rico": "🇵🇷",
    Romania: "🇷🇴",
    Russia: "🇷🇺",
    "South Africa": "🇿🇦",
    "South Korea": "🇰🇷",
    Spain: "🇪🇸",
    Sweden: "🇸🇪",
    Switzerland: "🇨🇭",
    Turkey: "🇹🇷",
    Taiwan: "🇹🇼",
    Ukraine: "🇺🇦",
    "United Kingdom": "🇬🇧",
    "United States": "🇺🇸",
    Venezuela: "🇻🇪",
    Zimbabwe: "🇿🇼",
  };

  const handleSSelectChange = (e, index) => {
    setFilter(`?sort=${e.target.value}`);
    localStorage.setItem("selectedFilter", e.target.value);
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry ? `?country=${selectedCountry}` : "");
    localStorage.setItem("selectedCountry", selectedCountry);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    localStorage.setItem("searchQuery", e.target.value);
  };

  return (
    <div className="parent-div">
      <div className="card-body">
        <div>
          <div className="input-group input--large">
            <label className="label">Keywords</label>
            <input
              className="input--style-1"
              type="text"
              placeholder="Type here..."
              name="going"
              onChange={handleSearchChange}
            />
          </div>
          <div className="input-group input--medium">
            <label className="label">Filter</label>
            <select
              className="form-select"
              aria-label=".form-select-sm example"
              value={filter.replace("?sort=", "")}
              onChange={(e) => handleSSelectChange(e, 0)}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="likes">Likes ❤️</option>
            </select>
          </div>
          <div className="input-group input--medium">
            <label className="label">Location</label>
            <select
              className="form-select"
              id="exampleFormControlSelect1"
              aria-label=".form-select-sm example"
              value={localStorage.getItem("selectedCountry")}
              onChange={(e) => handleCountryChange(e)}
            >
              {countryList.map((country, index) => (
                <option value={country} key={country._id}>
                  {`${country} ${countryEmojiMap[country]}`}
                </option>
              ))}
            </select>
          </div>

          <button
            className="btn-submit reset"
            type="submit"
            onClick={() => {
              localStorage.setItem("selectedFilter", "newest");
              localStorage.setItem("selectedCountry", "Global");
              localStorage.setItem("searchQuery", "");
              localStorage.setItem("currentPage", 1);
              window.location.reload();
            }}
            style={{ marginRight: "10px", marginBottom: "10px" }}
          >
            Reset
          </button>
          <button
            className="btn-submit"
            type="submit"
            onClick={() => window.location.reload()}
            style={{ marginBottom: "10px" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-search"
              style={{ color: "white" }}
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
