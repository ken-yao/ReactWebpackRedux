import React from "react";
import {createStore} from 'redux';

const reducer = (state, action) => {
    switch (action.type){
        case "TEST":
            state = state + 1;
            break;
        case "HELLO":
            state = state + "hello";
            break; 
        default:
            
    }
    return state;
}

const store = createStore(reducer, 1);

store.subscribe(() => {
    console.log("状态已改变：", store.getState());
});

store.dispatch({
    type: 'TEST'
})

export default class Index extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            num: 1
        }
    }

	render(){
		return (
			<h1>Index PAGE {this.state.num}</h1>
		);
	}
}