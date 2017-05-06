import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../util';
import reduce from '../reducers';
import * as actions from '../actions';
import TodoItem from './todo-item';

import Home from './home';
import Sidebar from './sidebar';

@connect(reduce, bindActions(actions))
export default class App extends Component {
  render() {
    return (
      <div id="app">
	<input type="text" name="number" className="dial-input" />
	<main className="content">
	  <Home />
	</main>
	<Sidebar />
      </div>
    );
  }
}
