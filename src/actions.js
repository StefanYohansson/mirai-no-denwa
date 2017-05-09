
export function addServer(server) {
  return {
    type: 'ADD_SERVER',
    server
  };
}

export function removeServer(number) {
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
