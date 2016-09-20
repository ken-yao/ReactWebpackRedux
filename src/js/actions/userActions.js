import axios from "axios";

export function fetchUser(){
	return function(dispatch){
		dispatch({type: 'FETCH_USER', payload: axios.get("http://localhost:3000/users")});
	}
}

export function createUser(userid, username){
	return function(dispatch){
		dispatch({type: 'CREATE_USER', payload: axios.post("http://localhost:3000/users", {
			id: userid,
			name: username
		})})
	}
}
export function deleteUser(userid){
	return function(dispatch){
		dispatch({type: 'DELETE_USER', payload: axios.delete("http://localhost:3000/users/" + userid, {
			id: userid
		})})
	}
}

export function fetchOneUser(userid){
	return function(dispatch){
		dispatch({type: 'FETCH_ONE_USER', payload: axios.get("http://localhost:3000/users/" + userid, {
			id: userid
		})})
	}
}

export function updateUser(userid, username){
	return function(dispatch){
		dispatch({type: 'UPDATE_USER', payload: axios.put("http://localhost:3000/users/" + userid, {
			id: userid,
			name: username
		})})
	}
}