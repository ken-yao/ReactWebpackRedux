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

        if(!(news && news.length)){
            return <p>没有内容</p>
        }

		return (
            <div>
                <h1>新闻中心</h1>
                <hr />
                <ul>
                    {
                        news.map((news) => {
                            return (
                                <li key={news.id}>{news.title}</li>
                            );
                        })
                    }
                </ul>
                <button onClick={() => this.fetchNews(2, this.props.page)}>加载更多</button>
            </div>
		);
	}
}