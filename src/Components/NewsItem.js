import React, { Component } from 'react'

export class NewsItem extends Component {
    
  render() {
    let { title, description , imageUrl , url , author , date , source} = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style = {{left : '90%' , zIndex : '1'}}>{source} </span>
          <img src={!imageUrl ? "https://platform.theverge.com/wp-content/uploads/sites/2/2025/06/ankersoundcore1.jpg?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {!author? "UNKNOWN" :author} on {new Date (date).toGMTString()}</small></p>
            <a rel="noreferrer" href={url} target="_blank" className="btn btn-dark">Read more about this !</a>
          </div>
        </div>
      </div>
    )
  }
} 

export default NewsItem;
 