import { useEffect, useState } from "react";
import useAuthContext from "../context/AuthContext";
import axios from "../api/axios";

import NewsCard from "../components/NewsCard";
import HomeHeaderText from "../components/HomeHeaderText";

import loadingGif from "../assets/spinner.gif";
import "../assets/css/index.css";

const Home = () => {
  const { csrf } = useAuthContext();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    try {
      await csrf();
      const { data } = await axios.get("/api/news/news-api");
      setArticles(data.news_api);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching articles:", error);
      // Handle error state or display error message
      setLoading(false); // Set loading to false in case of an error
    }
  };

  return (
    <>
      <div className="page-title">
        <HomeHeaderText />
      </div>

      <div className="page-line"></div>

      {loading ? (
        <div className="loading-container">
          <img src={loadingGif} alt="Loading" className="loading-gif" />
        </div>
      ) : (
        <section className="card-container">
          {articles.map((singleArticle, i) => (
            <NewsCard key={i} article={singleArticle} />
          ))}
        </section>
      )}
    </>
  );
};

export default Home;
