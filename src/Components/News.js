import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'



export class News extends Component {

static defaultProps = {
  country: 'US',
  pageSize: 8,
  category : 'general'
}

static propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category:PropTypes.string
}

capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

    constructor(props){
  super(props);
  this.state = {
    articles: [],      
    loading : false,
    page: 1,
    totalResults: 0
      }
        document.title = `${this.capitalizeFirstLetter(this.props.category)}- NewsApp`
    }


    async updateNews(){
       const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f6fa58bce60b4119b3d5206738467b02&page=${this.state.page}&pagesize=${this.props.pageSize}`;
       this.setState({loading : true});     
       let data = await fetch(url);
       let parsedData = await data.json()  
       console.log(parsedData);
       this.setState({articles:parsedData.articles,
           totalResults : parsedData.totalResults ,
            loading : false})
       }


   async componentDidMount(){
        // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2ee50aa6c0164ab4b8f3c2f850866a41&pagesize=${this.props.pageSize}`;
        //  this.setState({loading : true});
        // let data = await fetch(url); 
        // let parsedData = await data.json()  
        // console.log(parsedData);
        // this.setState({articles:parsedData.articles,
        //    totalResults : parsedData.totalResults ,
        //     loading : false})
        this.updateNews();
    }   


 handleNextClick = async()=>
{
  // console.log("Next");
  // if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)))
  //     {
  //       let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2ee50aa6c0164ab4b8f3c2f850866a41&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
  //       this.setState({loading : true});
  //       let data = await fetch(url);
  //       let parsedData = await data.json()  
  //       this.setState({loading : false});

  //             this.setState
  //             ({
  //             page:this.state.page+1,
  //             articles:parsedData.articles,
  //             loading : false
  //           })
  //     }
  this.setState({page : this.state.page+1})
  this.updateNews();

}

 handlePreviousClick = async()=>{
  //  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2ee50aa6c0164ab4b8f3c2f850866a41&page=${this.state.page-1}&pagesize=${this.props.pageSize}`;
  //  this.setState({loading : true});     
  //  let data = await fetch(url);
  //       let parsedData = await data.json()  
  //       console.log(parsedData);

  //       this.setState({
  //       page:this.state.page-1,
  //       articles:parsedData.articles,
  //       loading : false
  // })
    this.setState({page : this.state.page-1})
    this.updateNews();
}

  render() { 
    return (
      <div className="container my-3">
        <h2 className="text-center" style ={{ margin : '35px 0px', marginTop:'90px'}}>Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
       {this.state.loading && <Spinner/>} 
        <div className="row">
      {!this.state.loading && (this.state.articles || []).map((element) => {
    return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={element.description ? element.description.slice(0, 88) : ""}
                  imageUrl={element.urlToImage}
                  url={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source?.name || "Unknown"}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
          <button type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
