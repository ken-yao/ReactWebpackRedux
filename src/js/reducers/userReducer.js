export default function reducer(state={
	users: [],
	fetching: false,
	fetched: false,
	error: null,
	initState: true,
	addUserStatus: null,
	deleteUserStatus: null,
	queryUser:{},
	updateUserStatus:null
}, action){
	switch(action.type){
		case "FETCH_USER":
			return {...state, fetching: true}
		case "FETCH_USER_PENDING":
			return {...state, fetching: true}
		case "FETCH_USER_REJECTED":
			return {...state, fetching: false, fetched: true, error: true}
		case "FETCH_USER_FULFILLED":
			return {
				...state,
				fetching: false,
				fetched: true,
				users: action.payload.data
			}

		case "CREATE_USER":
			return {...state, fetching: true}
		case "CREATE_USER_PENDING":
			return {...state, fetching: true}
		case "CREATE_USER_REJECTED":
			return {...state, fetching: false, fetched: true, addUserStatus: false, initState: false}
		case "CREATE_USER_FULFILLED":
			var newAllUsers = [...state.users].concat(action.payload.data);
			return {
				...state,
				fetching: false,
				fetched: true,
				users: newAllUsers,
				addUserStatus: true,
				initState: false
			}

		case "DELETE_USER":
			return {...state, fetching: true}
		case "DELETE_USER_PENDING":
			return {...state, fetching: true}
		case "DELETE_USER_REJECTED":
			return {...state, fetching: false, fetched: true, deleteUserStatus: false, initState: false}
		case "DELETE_USER_FULFILLED":
			var newUser = [];
			state.users.map(function(user){
				if(user.id === action.payload.config.id){
					return ;
				}else{
					newUser.push(user);
				}
			})
			return {
				...state,
				fetching: false,
				fetched: true,
				users: newUser,
				deleteUserStatus: true,
				initState: false
			}

		case "FETCH_ONE_USER":
			return {...state, fetching: true}
		case "FETCH_ONE_USER_PENDING":
			return {...state, fetching: true}
		case "FETCH_ONE_USER_REJECTED":
			return {...state, fetching: false, fetched: true, initState: false}
		case "FETCH_ONE_USER_FULFILLED":
			return {
				...state,
				fetching: false,
				fetched: true,
				queryUser: action.payload.data
			}

		case "UPDATE_USER":
			return {...state, fetching: true}
		case "UPDATE_USER_PENDING":
			return {...state, fetching: true}
		case "UPDATE_USER_REJECTED":
			console.log(action.payload);
			return {...state, fetching: false, fetched: true, updateUserStatus: false, initState: false}
		case "UPDATE_USER_FULFILLED":
			var newAllUsers = [];
			console.log(action.payload);

			console.log(state.users);
			console.log(action.payload.config.data);
			console.log(JSON.parse(action.payload.config.data).name);

			for(var i=0; i<state.users.length; i++){
				if(state.users[i].id === JSON.parse(action.payload.config.data).id){
					state.users[i].name = JSON.parse(action.payload.config.data).name;
					console.log(state.users[i]);
				}
				newAllUsers.push(state.users[i]);
			}

			console.log(newAllUsers);

			return {
				...state,
				fetching: false,
				fetched: true,
				users: state.users,
				updateUserStatus: true,
				initState: false
			}
	}
	return state;
}