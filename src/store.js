import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import WebphoneAdapter from './webphone';

let ACTIONS = {
  ADD_SERVER: ({
    servers,
    ...state
  }, {server}) => ({
    servers: [
      ...servers, {
        ...server
      }
    ],
    ...state
  }),

  REMOVE_SERVER: ({
    servers,
    ...state
  }, {number}) => ({
    servers: servers.filter(server => server.number !== number),
    ...state
  }),

  UPDATE_CURRENT_SERVER: ({
    currentServer,
    ...state
  }, {number}) => ({
    currentServer: number,
    ...state
  })
};

function initialStateServers(servers) {
  let lServers = servers && JSON.parse(servers) || [];
  const phoneAdapter = new WebphoneAdapter;
  lServers = lServers.map(server => {
    server['instance'] = phoneAdapter.set(server.type).new(server);
    return server;
  });

  return lServers;
}

const INITIAL = {
  servers: initialStateServers(localStorage.getItem('servers')),
  currentServer: localStorage.getItem('currentServer') || ""
};

export default createStore((state, action) => (action && ACTIONS[action.type]
  ? ACTIONS[action.type](state, action)
  : state), INITIAL, applyMiddleware(thunk));
