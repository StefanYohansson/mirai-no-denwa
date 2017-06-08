import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import getInstance from './webphone/dispatcher';
import store from './store';
import App from './components/app';
import './style';

getInstance(store);

render((
  <div id="outer">
    <Provider store={store}>
      <App />
    </Provider>
  </div>
), document.body);
