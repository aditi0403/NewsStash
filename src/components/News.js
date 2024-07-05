import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    const updateNews = async () => {
      props.setProgress(8);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true);
      try {
        const response = await fetch(url);
        const parsedData = await response.json();
        if (parsedData.articles) {
          setArticles(parsedData.articles);
          setTotalResults(parsedData.totalResults);
        } else {
          console.error('No articles found in response');
        }
        setLoading(false);
        props.setProgress(100);
        document.title = `${capitalizeFirstLetter(props.category)} - NewsStash`;
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    document.title = `${capitalizeFirstLetter(props.category)} - NewsStash`;
    setPage(1);  // Reset page to 1 when category changes
    updateNews(); // Call updateNews initially

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.category]); // Depend only on props.category

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${pageNumber}&pageSize=${props.pageSize}`;
    console.log(url); // Log the URL to verify
    
    try {
      const response = await fetch(url);
      const parsedData = await response.json();
      if (parsedData.articles) {
        setArticles((prevArticles) => [...prevArticles, ...parsedData.articles]);
        setTotalResults(parsedData.totalResults);
        setPage(nextPage);
      } else {
        console.error('No articles found in response');
      }
    } catch (error) {
      console.error('Error fetching more news:', error);
    }
  };

  return (
    <>
      <h1 className="text-center" style={{ marginTop: '90px' }}>NewsStash- Top Headlines from {capitalizeFirstLetter(props.category)}</h1>

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={element.description ? element.description.slice(0, 85) : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author ? element.author : "Unknown"}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: 'general'
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
