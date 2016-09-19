import React from "react";
import {createStore} from 'redux';

import { connect } from 'react-redux';

import {fetchNews} from "../actions/newsActions";
import {fetchUser} from "../actions/userActions";

//连接react和redux
@connect((store) => {
    return {
        news: store.news.news,
        pagesize: store.news.pagesize,
        page: store.news.page,
        fetching: store.news.fetching,
        fetched: store.news.fetched,
        hasmore: store.news.hasmore,
    }
})

export default class News extends React.Component {
    componentWillMount() {
        // console.log(this.props);
    }

    componentDidMount(){
        this.fetchNews(this.props.pagesize, this.props.page);
    }

    fetchNews(pagesize, page){
        this.props.dispatch(fetchNews(pagesize, page));
    }

	render(){
        const {news} = this.props;


        var loadingHtml = '';
        if(this.props.fetching){
            loadingHtml = <p>正在拼命加载中...</p>;
        }

        if(!this.props.fetched){
            loadingHtml = <p>正在拼命加载中...</p>;
        }

        if(!news.length && this.props.fetched){
            return <p>没有内容</p>
        }


        var loadMoreHtml = '';
        if(this.props.hasmore){
            loadMoreHtml = <span className="loadMoreBtn" onClick={() => this.fetchNews(4, this.props.page)}>加载更多</span>
        }



		return (
            <div>
                <h1>新闻中心</h1>
                <hr />
                <ul className="newsList">
                    {
                        news.map((news) => {
                            return (
                                <li key={news.id}>
                                    {news.title}
                                    
                                    
                                </li>
                            );
                        })
                    }
                </ul>

                {loadingHtml}

                {loadMoreHtml}
                
            </div>
		);
	}
}