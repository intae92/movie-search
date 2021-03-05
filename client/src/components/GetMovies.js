import React, { useState, useEffect } from "react";
import Axios from "axios";
import MovieList from "./MovieList";

const GetMovies = ({ keyword }) => {
  console.log("keyword", keyword);
  const [movies, setMovies] = useState([]);

  const clientID = "vFBGIXMpis1ZnssI_xjS";
  const clientSecret = "iGwoRj5Y4a";
  const url = "/v1/search/movie.json";

  useEffect(() => {
    Axios.get(url, {
      params: { query: keyword, display: 3 },
      headers: {
        "X-Naver-Client-Id": clientID,
        "X-Naver-Client-Secret": clientSecret,
      },
    }).then((res) => {
      const {
        data: { items },
      } = res;
      //   console.log(items);
      setMovies(items);
    });
  }, []);
  console.log("GetMovies", keyword, movies);

  //   const getMovies = async () => {
  //     try {
  //       const {
  //         data: { items },
  //       } = await Axios.get(url, {
  //         params: { query: keyword, display: 3 },
  //         headers: {
  //           "X-Naver-Client-Id": clientID,
  //           "X-Naver-Client-Secret": clientSecret,
  //         },
  //       });
  //       return items;
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   getMovies().then((movies) => {
  //     console.log(keyword);
  //     setMovies(movies);
  //   });

  return (
    <>
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
    </>
  );
};

export default GetMovies;
