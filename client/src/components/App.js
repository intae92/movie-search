import React, { useState, useEffect } from "react";
import Axios from "axios";
import MovieList from "./MovieList";
import KeywordMovieList from "./KeywordMovieList";
import GetMovies from "./GetMovies";

const App = () => {
  // const keywords = ["사랑", "드라마", "우정", "멜로", "전쟁", "액션"];
  const keywords = ["드라마", "사랑"];
  const [keywordMovies, setKeywordMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [word, setWord] = useState("");

  const clientID = "vFBGIXMpis1ZnssI_xjS";
  const clientSecret = "iGwoRj5Y4a";
  const url = "/v1/search/movie.json";

  const getMovies = async () => {
    const {
      data: { items },
    } = await Axios.get(url, {
      params: { query: word, display: 10 },
      headers: {
        "X-Naver-Client-Id": clientID,
        "X-Naver-Client-Secret": clientSecret,
      },
    });

    setMovies(items);

    console.log(items);
    console.dir(items);
  };

  const onChange = (evnet) => {
    const {
      target: { value },
    } = evnet;
    setWord(value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    getMovies();
  };

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="movie search"
          required
          onChange={onChange}
        />
        <button>search</button>
      </form>
      <div>
        {keywords.map((keyword) => (
          <GetMovies key={keyword} keyword={keyword} />
        ))}
      </div>
      <div>
        {movies.map((items) => (
          <MovieList
            key={items.link}
            link={items.link}
            actor={items.actor}
            director={items.director}
            image={items.image}
            pubDate={items.pubDate}
            subtitle={items.subtitle}
            title={items.title}
            userRating={items.userRating}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
