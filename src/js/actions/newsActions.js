import axios from "axios";

export function fetchNews(pagesize, page){
	return function(dispatch){
		axios.get("http://localhost:808/news?pagesize=" + pagesize + "&page=" + page)
			.then((response) => {
				if(response.data.status && response.data.data.length){
					page = page + 1;
					dispatch(
						{
							type: "FETCH_NEWS_FULFILLED", 
							payload: {
								pagesize: pagesize,
								page: page,
								news: response.data,
								hasmore: (response.data.data.length >= pagesize) ? true : false
							}
						}
					)
				}else{
					dispatch(
						{
							type: "FETCH_NEWS_REJECTED", 
							payload: '数据请求不成功或没有数据'
						}
					)
				}
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