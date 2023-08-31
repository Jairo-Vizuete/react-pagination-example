import React, { useEffect, useState } from "react";
import "./App.css";

const PAGE_SIZE = 10; // Number of items to display per page

function App() {
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const getCountries = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all", {
      method: "GET",
    }).then((data) => data.json());
    console.log(response);
    setCountries(response);
  };

  const startIndex = currentPage * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  console.log({ startIndex: startIndex, endIndex: endIndex });

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div>
      {/* {countries.map((country) => {
        return <div key={country.area}>{country.name.official}</div>;
      })} */}
      <div>
        <h1>Country Data</h1>
        <ul>
          {countries.slice(startIndex, endIndex).map((country) => (
            <li key={country.area}>{country.name.official}</li>
          ))}
        </ul>

        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Previous Page
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={endIndex >= countries.length}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default App;
