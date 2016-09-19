import React from "react";
import ReactDOM from "react-dom";

import { Provider } from 'react-redux';
import store from "./store";

import Index from './components/Index';
import Hello from './components/Hello';

const app = document.getElementById('app');
// ReactDOM.render(<Hello name="ken yao" />, app);

ReactDOM.render(
	<Provider store={store}>
  		<Index />
  	</Provider>,
  app
);