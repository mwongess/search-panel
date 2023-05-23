import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [searchString, setSearchString] = useState("");
  const [state, setState] = useState("");
  const [universities, setUniversities] = useState([]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setSearchString(value);
    setState("");
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setState(searchString);
    console.log(name);
  };

  useEffect(() => {
    const fetchCountries = async () => {
      if (!state) {
        setUniversities([]);
      } else {
        const url = `https://universitiesapi.onrender.com/v1/api/universities/${state}`;
        const res = await fetch(url);
        const data = await res.json();
        setUniversities(data);
      }
    };
    fetchCountries();
  }, [state]);

  return (
    <div className="container">
      <div className="home">
        <div className="search">
          <div>
            <h1>SEARCH PANEL</h1>
          </div>
          <form onSubmit={onSubmitHandler}>
            <div className="">
              <input
                type="searh"
                onChange={handleInput}
                placeholder="Search university using state"
                value={searchString}
                name="country"
              />
              <button type="submit">Search</button>
            </div>
          </form>
        </div>
      </div>
      <hr />
      <div className="main">
        <div className="count">
          <h3>
            {!state && !universities[0]
              ? "No results found"
              : universities.length + " Universities in " + searchString}
          </h3>
        </div>

        <div className="countries">
          {searchString &&
            universities.map((university, index) => (
              <div className="country" key={index}>
                <p>
                  <span>Name:</span>
                  {university.name}
                </p>
                <p>
                  <span>Web Pages:</span>
                  <a href={university.web_pages[0]}>
                    {university.web_pages[0]}
                  </a>
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
