import { h, Component } from 'preact';
import ZeroUI from '../zeroui';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    let servers = localStorage.getItem('servers') &&
	JSON.parse(localStorage.getItem('servers'));

    if (!servers) {
      servers = [];
      localStorage.setItem('servers', JSON.stringify(servers));
    }

    this.state = {
      currentServer: '',
      servers,
      addServer: false,
    };
  }

  componentDidMount() {
    this.selectFirst();
  }

  selectFirst = () => {
    const { servers } = this.state;

    // select first if length >= 1
    if (servers.length) {
      this.selectServer(servers[0].number);
    } else {
      this.setState({
	...this.state,
	currentServer: ""
      });
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
    const { servers } = this.state;

    if (!servers.length) {
      return (
	<div className="server-list">
	  <ZeroUI
	    icon={{ name: "phone", scale: '48' }}
	    message="You don't register any extension yet"
	    note="If you want to, click the blue button below" />
	</div>
      );
    }

    return (
      <ul className="server-list">
	{this.state.servers.map(server => (
	  <li
	    className={server.number == this.state.currentServer ? "active" : ""}
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
    const { servers } = this.state;

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

    servers.push(server);
    this.setState({
      ...this.state,
      servers
    });

    if (this.state.currentServer == "") {
      this.selectFirst();
    }

    localStorage.setItem('servers', JSON.stringify(servers));

    this.toggleAddServer();
  };

  selectServer = number => {
    this.setState({
      ...this.state,
      currentServer: number
    });
  }

  removeServer = number => {
    if (!confirm('Do you want to remove selected server?'))
      return;

    const { servers } = this.state;

    const serverIndex = servers.findIndex(server => server.number == number);
    const server = servers.find(server => server.number == number);

    if (serverIndex == -1)
      return;

    const rServers = servers.splice(serverIndex, 1);

    this.setState({
      ...this.state,
      servers
    });

    if (serverIndex == 0 || this.state.currentServer == server.number)
      this.selectFirst();

    localStorage.setItem('servers', JSON.stringify(servers));
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
