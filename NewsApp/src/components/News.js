import React, { Component } from 'react'
import Newsitem from './Newsitem';

export class News extends Component {
  
  constructor(){
    super();
    console.log("this is constructor");
     this.state = {
       articles: [''],
       loading: false
     }
  }
  async componentDidMount(){
    console.log('cdm');
    let url= "https://newsapi.org/v2/top-headlines?country=in&apiKey=8b4724243bb448789830b73144085a57&page=1&pageSize=20";
    let data =await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({articles: parsedData.articles, totalresults: parsedData.totalresults})
  }
  handlePrevClick = async ()=>{
    console.log('previous');
    let url= `https://newsapi.org/v2/top-headlines?country=in&apiKey=8b4724243bb448789830b73144085a57&page=${this.state.page - 1}&pageSize=20`;
    let data =await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
   
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles
    })

  }
  handleNextClick = async()=>{
    console.log('next');
    if(this.state.page +1 > Math.ceil(this.state.totalResults/20)){

    }
    else{
    let url= `https://newsapi.org/v2/top-headlines?country=in&apiKey=8b4724243bb448789830b73144085a57&page=${this.state.page + 1}&pageSize=20`;
    let data =await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
   
    this.setState({
      page: this.state.page +1,
      articles: parsedData.articles
    })
  }
    
  }

  render() {
    
    return (
      <div className="container my-4">
        <h2>MyNewes - Top Headlines</h2> 
        
        <div className="row">
        {this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
           <Newsitem  title={element.title} description={element.description} imageurl={element.urlToImage} newsurl={element.url}/>
         
           </div>
        })} 
            
            <div className="container d-flex justify-content-between">
            <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
            <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>
            </div>
           
        </div>      
        
      </div>
    );
  }
}

export default News;
