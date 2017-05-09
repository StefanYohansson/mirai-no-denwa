import { h, Component } from 'preact';
import ZeroUI from '../zeroui';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    const { servers } = props;

    if (!servers.length) {
      localStorage.setItem('servers', JSON.stringify(servers));
    }

    this.state = {
      addServer: false,
    };
  }

  componentDidMount() {
    if (!this.props.currentServer)
      this.selectFirst();
  }

  selectFirst = (optServers = []) => {
    const { servers, updateCurrentServer } = this.props;
    const selServers = optServers.length ? optServers : servers;

    // select first if length >= 1
    if (selServers.length) {
      this.selectServer(selServers[0].number);
    } else {
      updateCurrentServer("");
    }
  }

  toggleAddServer = e => {
    this.setState({
      ...this.state,
      addServer: !this.state.addServer
    });
  };

  renderAddButton = props => {
    return (
      <button className="add-server" onClick={this.toggleAddServer}>
	<i className="fa fa-plus"></i>
      </button>
    );
  };

  renderConfirmButtons = props => {
    return (
      <div>
	<button className="confirm-server-btn" onClick={e => {
	    this.saveServer();
	  }}>
	  <i className="fa fa-check"></i>
	</button>
        <button className="cancel-server-btn" onClick={e => {
	    this.resetInputs();
	    this.toggleAddServer(e);
	  }}>
	  <i className="fa fa-close"></i>
	</button>
      </div>
    );
  };

  renderForm = props => {
    return (
      <form className="form new-server-form">
	<div className="form-control">
	  <label>WS Address</label>
	  <input type="text" name="ws" ref={c => this.inputWs = c} className="input-text" />
	</div>
	<div className="form-control">
	  <label>Number(@domain)</label>
	  <input type="text" name="number" ref={c => this.inputNumber = c} className="input-text" />
	</div>
	<div className="form-control">
	  <label>Password</label>
	  <input type="text" name="password" ref={c => this.inputPassword = c} className="input-text" />
	</div>
      </form>
    );
  };

  renderList = props => {
    const { servers } = this.props;

    if (!servers.length) {
      return (
	<div className="server-list">
	  <ZeroUI
	    icon={{ name: "phone-square", scale: '48' }}
	    message="You don't register any extension yet"
	    note="If you want to, click the blue button below" />
	</div>
      );
    }

    return (
      <ul className="server-list">
	{this.props.servers.map(server => (
	  <li
	    className={server.number == this.props.currentServer ? "active" : ""}
	    onClick={() => this.selectServer(server.number)}>
	    {server.number}
	    <i onClick={(e) => {
		e.stopPropagation();
		this.removeServer(server.number);
	      }}
	      className="fa fa-close pull-right">
	    </i>
	  </li>
	))}
      </ul>
    );
  };

  resetInputs = () => {
    this.inputWs.value = "";
    this.inputNumber.value = "";
    this.inputPassword.value = "";
  };

  saveServer = () => {
    const { servers, currentServer, addServer } = this.props;

    if (this.inputNumber.value == "" || this.inputWs.value == "") {
      alert("You should provide Number and Webservice values.");
      return;
    }

    if (servers.some(server => server.number == this.inputNumber.value)) {
      alert("This number is already in use.");
      return;
    }

    const server = {
      ws: this.inputWs.value,
      number: this.inputNumber.value,
      password: this.inputPassword.value
    };

    addServer(server).then(newServers => {
      if (currentServer == "") {
	this.selectFirst(newServers);
      }

      localStorage.setItem('servers', JSON.stringify(newServers));

      this.toggleAddServer();
    });
  };

  selectServer = number => {
    const { updateCurrentServer } = this.props;

    updateCurrentServer(number);
    localStorage.setItem("currentServer", number);
  }

  removeServer = number => {
    if (!confirm('Do you want to remove selected server?'))
      return;

    const { servers, removeServer, updateCurrentServer } = this.props;

    const serverIndex = servers.findIndex(server => server.number == number);
    const server = servers.find(server => server.number == number);

    if (serverIndex == -1)
      return;

    const rServers = servers.splice(serverIndex, 1);
    removeServer(number).then(newServers => {
      if (serverIndex == 0 || this.props.currentServer == server.number)
	this.selectFirst();

      if (!newServers.length) {
	localStorage.setItem('currentServer', "");
	updateCurrentServer("");
      }

      localStorage.setItem('servers', JSON.stringify(newServers));
    });
  };

  render() {
    return (
      <aside className="sidebar">
	{this.state.addServer ? this.renderForm(this.props) : this.renderList(this.props)}
	<div className="wrapper-buttons">
	  {this.state.addServer ? this.renderConfirmButtons(this.props) : this.renderAddButton(this.props)}
	</div>
      </aside>
    );
  };
}
