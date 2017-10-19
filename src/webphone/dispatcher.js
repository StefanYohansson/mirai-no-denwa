let store = null;

export default function getInstance(reduxStore) {
  if (!store && !reduxStore)
    throw "Store not initiated yet.";

  if (!store)
    store = reduxStore;

  return store;
}
