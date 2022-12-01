import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
        static defaultProps = {
               country: "in",
               pageSize: 6,
               category:"general"
        }
        static propTypes = {
              country: PropTypes.string,
              pageSize:PropTypes.number,
              category:PropTypes.string
        }
        capitalizeFirstLetter = (string)=>{
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

    constructor(props){
        super(props);
        console.log("Hello I am constructor from news component");
        this.state= {   
            articles: [],
            loading: false,
            page:1,
            totalResults:0
          }
          document.title = `${this.capitalizeFirstLetter(this.props.category)} - News`;
    }

    async updateNews(){        
        this.props.setProgress(10);
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=8f4041c8b99e4c93934ca6a187b3bc4b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        this.props.setProgress(50);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles,
                       totalResults:parsedData.totalResults,
                       loading: false})
        this.props.setProgress(100);               
    }

    async componentDidMount(){
        // console.log("cdn");
        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=8f4041c8b99e4c93934ca6a187b3bc4b&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({articles: parsedData.articles,
        //                totalResults:parsedData.totalResults,
        //                loading: false})
        this.updateNews();
    }
    handlePreviousClick = async() =>{
        // console.log("previous clicked");
        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=8f4041c8b99e4c93934ca6a187b3bc4b&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({
        // page: this.state.page - 1,
        // articles:parsedData.articles,
        // loading:false
        // })
        this.setState({page:this.state.page-1})
        this.updateNews();
    }

    handleNextClick = async() =>{
    //    console.log("next clicked");
    //    if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    //    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=8f4041c8b99e4c93934ca6a187b3bc4b&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
    //    this.setState({loading:true});
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     this.setState({
    //     page: this.state.page + 1,
    //     articles:parsedData.articles,
    //     loading: false
    //    })
    //   }
    this.setState({page:this.state.page+1})
    this.updateNews();
    }
    fetchMoreData = async() => {
        this.setState({page: this.state.page + 1})
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=8f4041c8b99e4c93934ca6a187b3bc4b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles:this.state.articles.concat(parsedData.articles),
                       totalResults:parsedData.totalResults,
                       loading: false})
      };

  render() {
    return (
        <>    
        <h1 className='text-center' style={{margin:'25px 0px'}}>News-Monkey Top HeadLines - {this.capitalizeFirstLetter(this.props.category)} </h1>  
        <InfiniteScroll
        dataLength={this.state.articles.length}
        next={this.fetchMoreData}
        hasMore={this.state.articles.length !== this.state.totalResults}
        loader={<Spinner/>}
        >
        <div className='container'>
        <div className='row'>
               { this.state.articles.map((element)=>{
            return <div className='col-md-4' key={element.url}>
             <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
             </div>
        })}                 
           </div>
      </div>
        </InfiniteScroll>    
        </>
    )}}

export default News