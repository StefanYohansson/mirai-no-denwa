import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../util';
import reduce from '../reducers';
import * as actions from '../actions';

import Home from './home';
import Sidebar from './sidebar';

const REGISTER_EXTENSION_LABEL = "Please, register an extension to make a call.";
const REGISTER_CALL = "Make a call.";

@connect(reduce, bindActions(actions))
export default class App extends Component {
  render() {
    return (
      <div id="app">
	<input
	   type="text"
	   name="number"
	   disabled={this.props.currentServer === ""}
	   title={
	     this.props.currentServer == ""
	       ? REGISTER_EXTENSION_LABEL
	       : REGISTER_CALL
	   }
	   className="dial-input"
	   />
	<main className="content">
	  <Home />
	</main>
	<Sidebar
	   currentServer={this.props.currentServer}
	   servers={this.props.servers}
	   {...this.props}
	/>
      </div>
    );
  }
}
