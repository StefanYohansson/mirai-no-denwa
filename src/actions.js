import WebphoneAdapter from './webphone';

function add(server) {
  return {
    type: 'ADD_SERVER',
    server
  };
}

function remove(number) {
  return {
    type: 'REMOVE_SERVER',
    number
  };
}

export function updateCurrentServer(number) {
  return {
    type: 'UPDATE_CURRENT_SERVER',
    number
  };
}

export function addCall(serverNumber, call) {
  return {
    type: 'ADD_CALL',
    serverNumber,
    call
  };
}

export function removeCall(serverNumber, call) {
  return {
    type: 'REMOVE_CALL',
    serverNumber,
    call
  };
}

export function addServer(server) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const phoneAdapter = new WebphoneAdapter;
      server['instance'] = phoneAdapter.set('jssip').new(server);
      server['type'] = 'jssip';
      dispatch(add(server));
      resolve(getState().servers);
    });
  };
}

export function removeServer(number) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(remove(number));
      resolve(getState().servers);
    });
  };
}
