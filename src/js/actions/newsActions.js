import axios from "axios";

export function fetchNews(pagesize, page){
	return function(dispatch){
		console.log("http://localhost:808/news?pagesize=" + pagesize + "&page=" + page);
		axios.get("http://localhost:808/news?pagesize=" + pagesize + "&page=" + page)
			.then((response) => {
				page = page + 1;
				dispatch(
					{
						type: "FETCH_NEWS_FULFILLED", 
						payload: {
							pagesize: pagesize,
							page: page,
							news: response.data
						}
					}
				)
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