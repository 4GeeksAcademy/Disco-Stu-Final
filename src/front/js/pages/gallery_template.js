import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import ReactPaginate from "react-paginate";

export const GalleryTemplate = () => {
  const { actions } = useContext(Context);
  const [articles, setArticles] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await actions.getAllArticles();
      setArticles(data);
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await actions.getAllArtists();
      setArtists(data);
    };
    fetchArticles();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <h1>Discos</h1>
      </div>
      <div className="row">
        {articles.map((article, index) => (
          <div key={index} className="col">
            <LazyLoadImage
              src={process.env.BACKEND_URL + "api/utils/images/" + article.url_imagen}
              width={200}
              height={200}
              effect="blur"
              alt={`Image ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <div className="row">
        <h1>Artistas</h1>
      </div>
      <div className="row">
        {artists.map((artist, index) => (
          <div key={index} className="col mt-3">
            <LazyLoadImage
              src={process.env.BACKEND_URL + "api/utils/images/" + artist.url_imagen}
              width={200}
              height={200}
              effect="blur"
              alt={`Image ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
