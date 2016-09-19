import React from "react";
import {createStore} from 'redux';

import { connect } from 'react-redux';

import {fetchNews} from "../actions/newsActions";
import {fetchUser} from "../actions/userActions";

//连接react和redux
@connect((store) => {
    return {
        user: store.user.user,
        userFetched: store.user.fetched,
        news: store.news.news,
    }
})

export default class Index extends React.Component {
    componentWillMount() {
        this.props.dispatch(fetchUser());
    }

    fetchNews(){
        this.props.dispatch(fetchNews());

    }

	render(){
        const {user, news} = this.props;

        if(!(news.data && news.data.length)){
            return <button onClick={this.fetchNews.bind(this)}>加载</button>
        }

		return (
            <div>
                <h1>Index PAGE</h1>
                <h2>{user.name}</h2>
                <h2>{user.age}</h2>
            </div>
		);
	}
}