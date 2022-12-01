
import React, { Component } from 'react'

export default class NewsItem extends Component {
    
  render() {
   let {title,description,imageUrl,newsUrl,author,date,source} = this.props;
    return (
      <div className='my-3'>
        <div className="card">
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          right: '0'
          }}>
        
        <span className="badge rounded-pill bg-danger"> {source}    
        </span>
        </div>
          <img src={!imageUrl?"https://images.livemint.com/img/2022/11/23/600x338/2f207fa0-43c7-11ed-ba19-8df254a5ed78_1668918944972_1668918944972_1669190820462_1669190820462.jpg":imageUrl} className="card-img-top" alt="..."/>
           <div className="card-body">
           <h5 className="card-title">{title} </h5>
           <p className="card-text">{description}</p>
           <p className="card-text"><small className="text-muted">By {!author? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
           <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More..</a>
              </div>
                </div>
      </div>
      
    )
  }
}
