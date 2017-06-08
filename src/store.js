import _ from 'lodash';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import WebphoneAdapter from './webphone';

let ACTIONS = {
  ADD_SERVER: ({
    servers,
    ...state
  }, {server}) => ({
    ...state,
    servers: [
      ...servers, {
        ...server
      }
    ]
  }),

  REMOVE_SERVER: ({
    servers,
    ...state
  }, {number}) => ({
    ...state,
    servers: servers.filter(server => server.number !== number)
  }),

  UPDATE_CURRENT_SERVER: ({
    currentServer,
    ...state
  }, {number}) => ({
    ...state,
    currentServer: number
  }),

  ADD_CALL: ({
    calls,
    ...state
  }, {serverNumber, call}) => ({
    ...state,
    calls: {
      ...calls,
      [serverNumber]: [call, ...(calls[serverNumber] || [])]
    }
  }),

  REMOVE_CALL: ({
    calls,
    ...state
  }, {serverNumber, call}) => ({
    ...state,
    calls: _.reduce(calls, (acc, cl, number) => {
      if (serverNumber == number) {
        acc[number] = cl.filter(c => !_.isEqual(c, call));
      }
      return acc;
    }, {})
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
  currentServer: localStorage.getItem('currentServer') || "",
  calls: {}
};

export default createStore((state, action) => (action && ACTIONS[action.type]
  ? ACTIONS[action.type](state, action)
  : state), INITIAL, applyMiddleware(thunk));
