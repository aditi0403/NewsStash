import React, {useEffect, useState} from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => { 

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    //

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase()+string.slice(1);
    }
    
    const updateNews = async () => {
        props.setProgress(8);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=eef4ea5c94e3465ab317d8344ccd4661&page=${page}&pageSize=${props.pageSize}`
        setLoading(true);
        let data= await fetch(url);
        let parsedData= await data.json();
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
        document.title= `${capitalizeFirstLetter(props.category)}- NewsStash`;
    }

    useEffect (() => {
         document.title= `${capitalizeFirstLetter(props.category)}- NewsStash`;
        updateNews();
    }, []);

    
    // const handlePrevClick= async () => {
    //     if (page > 1) {
    //         setPage(page-1)
    //         updateNews();
    //     }
    // }
    // const handleNextClick= async () => {
    //     if ((page + 1) <= Math.ceil(totalResults / props.pageSize)) {
    //         setPage(page+1)
    //         updateNews();
    //     }
    //     }

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=eef4ea5c94e3465ab317d8344ccd4661&page=${page+1}&pageSize=${props.pageSize}`
        setPage(page+1)
        let data= await fetch(url);
        let parsedData= await data.json()
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        };

    
        return (
            <>
            <h1 className="text-center" style={{ marginTop: '90px' }}>NewsStash- Top Headlines from {capitalizeFirstLetter(props.category)}</h1>

            {loading && <Spinner/>}
            
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner/>}
                >

            <div className="container">
            
                <div className="row">
                    {articles.map((element)=>{
                        return <div className="col md-4" key={element.url}>
                                    <NewsItem title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 85):""} 
                                    imageUrl={element.urlToImage} newsUrl={element.url} author={element.author? element.author: "Unknown"} date={element.publishedAt}
                                    source={element.source.name}/>
                                </div>      
                    })}           
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
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}


export default News
