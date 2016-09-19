import axios from "axios";

export function fetchNews(){
	return function(dispatch){
		axios.get("http://localhost:808/news")
			.then((response) => {
				dispatch({type: "FETCH_NEWS_FULFILLED", payload: response.data})
			})
			.catch((err) => {
				dispatch({type: "FETCH_NEWS_REJECTED", payload: err})
			})
	}
}

export function addNews(id, text){
	return {
		type: 'ADD_NEWS',
		payload: {
			id,
			text,
		},
	}
}

export function updateNews(id, text){
	return {
		type: "UPDATE_NEWS",
		payload: {
			id,
			text,
		},
	}
}

export function deleteNews(id){
	return {
		type: 'DELETE_NEWS',
		payload: id
	}
}