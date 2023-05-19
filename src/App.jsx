import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [state, setState] = useState("");
  const [universities, setUniversities] = useState([]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setState(value);
  };
  const searchHandler = (e) => {
    e.preventDefault();
    console.log(universities);
  };

  useEffect(() => {
    const fetchCountries = async () => {
      if(!state){
        setUniversities([])
      }else{
        const url = `http://universities.hipolabs.com/search?country=${state}`;
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
            <h1>SearchpaneL</h1>
          </div>
          <form>
            <div className="">
              <input
                type="search"
                placeholder="Search university using state"
                onChange={onChangeHandler}
              />
              <button onClick={searchHandler}>Search</button>
            </div>
          </form>
        </div>
      </div>
      <hr />
      <div className="main">
        <div className="count">
          <h3>{universities.length==0 ? 'No results found': universities.length + ' Universities ' + state}</h3>
        </div>

        <div className="countries">
          {(state) &&
          universities.map((university, index) => (
            <div className="country" key={index}>
              <p>
                <span>Name:</span>
                {university.name}
              </p>
              <p>
                <span>Domains:</span>
                {university.domains[0]}
              </p>
              <p>
                <span>Web Pages:</span>
                {university.web_pages[0]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
