import {bindActionCreators} from 'redux';

export function bindActions(actions) {
  return dispatch => ({
    ...bindActionCreators(actions, dispatch)
  });
}

export function setServersStorage(servers) {
  const lServers = servers.map(server => {
    delete server['instance'];
    return server;
  });
  localStorage.setItem('servers', JSON.stringify(lServers));
}
