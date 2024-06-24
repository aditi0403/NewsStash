import React from 'react'

// export class NewsItem extends Component 
const NewsItem = (props) => {
  // render() {
    let {title, description, imageUrl, newsUrl, author, date, source}= props;
    return (
      <div className='my-2'>
        <div className="card text-center" style={{width: "18rem"}}>
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-secondary" style={{left: "90%", zIndex: "1"}}>
                  {source}
            </span>
            <img src={!imageUrl? "https://imgs.search.brave.com/mgID5Uw3yQNrUvHRTTM6mnHIJ_ddQ72hjsus1DqLJK4/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zdDQu/ZGVwb3NpdHBob3Rv/cy5jb20vMTMzMjQy/NTYvMjMzODkvaS80/NTAvZGVwb3NpdHBo/b3Rvc18yMzM4OTg0/MzAtc3RvY2stcGhv/dG8tY3JvcHBlZC1p/bWFnZS1qb3VybmFs/aXN0LWhvbGRpbmct/bmV3c3BhcGVyLmpw/Zw": imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="by">By {author} on {new Date(date).toGMTString()}</small></p>
                <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
            </div>
            </div>
      </div>
    )
}


export default NewsItem
