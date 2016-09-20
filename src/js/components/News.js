import React from "react";
import {createStore} from 'redux';
import { connect } from 'react-redux';
import {fetchNews} from "../actions/newsActions";
import {fetchUser} from "../actions/userActions";

var pagesize = 3;

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
    componentDidMount(){
        this.fetchNews(pagesize, this.props.page);
    }

    fetchNews(pagesize, page){
        this.props.dispatch(fetchNews(pagesize, page));
    }

	render(){
        const {news} = this.props;

        var loadingHtml = '';
        if(this.props.fetching){
            loadingHtml = <div className="loading"><img src="img/loading.gif" /></div>;
        }

        if(!news.length && this.props.fetched){
            return <p>没有内容</p>
        }

        var loadMoreHtml = '';
        if(this.props.hasmore){
            loadMoreHtml = <span className="loadMoreBtn" onClick={() => this.fetchNews(pagesize, this.props.page)}>加载更多</span>
        }

        var formatDate = function(dateStr){
            var dateObj = new Date(Date.parse(dateStr.replace(/-/g, "/")));
            return dateObj.getFullYear() + '/' + (dateObj.getMonth()+1) + '/' + dateObj.getDate();
        };

		return (
            <div>
                <h1>新闻中心</h1>
                <ul className="newsList">
                    {
                        news.map((news) => {
                            return (
                                <li key={news.id}>
                                    <div className="newsItemImg">
                                        <img src={news.featured_img} alt={news.title} />
                                    </div>

                                    <div className="newsItem">
                                        <h3>{news.title}</h3>
                                        {
                                            news.keyword.split(',').map((keyword) => {
                                                return (
                                                    <span className="keyword">{keyword}</span>
                                                );
                                            })
                                        }
                                        <p>{news.description}</p>
                                        <span className="date">{formatDate(news.update_time)}</span>
                                    </div>
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