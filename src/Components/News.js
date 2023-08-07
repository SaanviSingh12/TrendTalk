import React,{useEffect,useState} from 'react'
import PropTypes from 'prop-types'

import NewsItem from './NewsItem'


const News=(props)=> {
  const[articles,setArticles]=useState([]);
  const[loading,setLoading]=useState(true);
  const[page,setPage]=useState(0);
  const[totalResults,setTotalResults]=useState(0);

  const updateNews=async()=>{
    props.setProgress(10);
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data=await fetch(url);
    props.setProgress(40);
    let parsedData=await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  props.setProgress(100);
  }
  useEffect(()=>{
      document.title=`${props.category} - TrendTalk`
      updateNews();
      // eslint-disable-next-line
  },[])
 
  const handleNextClick=async()=>{
   updateNews();
   setPage(page+1);
    }
 const handlePreviousClick=async()=>{
      setPage(page-1)
    updateNews();
  } 
    return (
      <>
        <div className='container'>
        <h2 className='text-center text-light' style={{marginTop:'40px'}}>News - Top Headings</h2>
    
        <div className='row'>
           {!loading&&articles.map((element)=>{
               return <div className='col-md-3' key={element.url}>
               <NewsItem  author={element.author?element.author:"Trendy Talk"} title={element.title?element.title:""} description={element.description?element.description.slice(0,60):""} imageUrl={element?.urlToImage==null?"https://www.niddk.nih.gov/-/media/Images/Components/Default-Social-Media-Images/News-Card.png":element.urlToImage} newsUrl={element?.url}/>
              </div>
           })}

       </div>
        </div>
        <div className='d-flex justify-content-between my-3'>
        <button disabled={page<=1} type="button" className="btn btn-warning mx-3" onClick={handlePreviousClick}>&larr; Previous</button>
        <button disabled={page+1>Math.ceil(totalResults/20)} type="button" className="btn btn-warning mx-3"  onClick={handleNextClick}> Next &rarr;</button>
        </div>
       
      </>
    )
    }
News.defaultProps={
  country:'in',
  pageSize:8,
  category:'sports',
}
News.propTypes={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string,
}



export default News
