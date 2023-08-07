import React from "react";
import { Badge } from "antd";
const NewsItem = (props) => {


  let { title, description,author, imageUrl, newsUrl } = props;

  return (

    <div className="my-3">
      <div className="card glow-hover" >
      <Badge.Ribbon text={author} color="blue">
        <img src={imageUrl ? imageUrl : "https://www.deccanherald.com/sites/dh/files/articleimages/2023/07/13/ocean-g8697886aa1920-1-1236612-1689243141.jpg"} className="card-img-top" alt="..." />
       
        </Badge.Ribbon>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            {description}...
          </p>
          <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-success">
            Read More..
          </a>
          <div className="container text-right">
          </div>
        </div>
      
      </div>
    </div>
  );
}


export default NewsItem;
