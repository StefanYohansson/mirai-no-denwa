import { createStore } from 'redux';

let ACTIONS = {
  ADD_SERVER: ({ servers, ...state }, { server }) => ({
    servers: [...servers, {
      ...server
    }],
    ...state
  }),

  REMOVE_SERVER: ({ servers, ...state }, { number }) => ({
    servers: servers.filter( server => server.number !== number ),
    ...state
  }),

  UPDATE_CURRENT_SERVER: ({ currentServer, ...state }, { number }) => ({
    currentServer: number,
    ...state
  })
};

const INITIAL = {
  servers: (localStorage.getItem('servers') &&
	    JSON.parse(localStorage.getItem('servers'))) || [],
  currentServer: ""
};

export default createStore( (state, action) => (
  action && ACTIONS[action.type] ? ACTIONS[action.type](state, action) : state
), INITIAL, window.devToolsExtension && window.devToolsExtension());
