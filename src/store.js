import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

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
  currentServer: localStorage.getItem('currentServer') || ""
};

export default createStore( (state, action) => (
  action && ACTIONS[action.type] ? ACTIONS[action.type](state, action) : state
), INITIAL, applyMiddleware(thunk));
