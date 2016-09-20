export default function reducer(state={
	news: [],
	pagesize: 4,
	page: 1,
	hasmore: true,
	fetching: false,
	fetched: false,
	error: null,
}, action){
	switch(action.type){
		case "FETCH_NEWS": 
			return {...state, fetching: true}
		case "FETCH_NEWS_REJECTED":
			return {...state, fetching: false, error: action.payload}
		case "FETCH_NEWS_FULFILLED":
			var allNews = [...state.news].concat(action.payload.news.data);
			return {
				...state,
				fetching: false,
				fetched: true,
				pagesize: action.payload.pagesize,
				page: action.payload.page,
				news: allNews,
				hasmore: action.payload.hasmore
			}
		case "ADD_NEWS":
			return {
				news: [...state.news, action.payload],
			}
		case "UPDATE_NEWS":
			const {id, text} = action.payload;
			const newNews = [...state.news];
			const newsToUpdate = newNews.findIndex(news => news.id === id);
			newNews[newsToUpdate] = action.payload;
			return {
				...state,
				news: state.news.filter(news => news.id !== action.payload),
			}
	}
	return state;
}