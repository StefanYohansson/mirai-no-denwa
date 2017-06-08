import JsSIP from 'jssip';
import {addCall, removeCall} from '../actions';
import getInstance from './dispatcher';

// put a if here
JsSIP.debug.enable('JsSIP:*');

export default class JSIP {
  constructor(server) {
    const socket = new JsSIP.WebSocketInterface(server.ws);
    const configuration = {
      sockets: [socket],
      uri: `sip:${server.number}`,
      password: server.password,
      session_timers: false
    };

    this.ua = new JsSIP.UA(configuration);
    this.ua.start();

    this.number = server.number;

    this.registerEvents(this.ua);
  }

  registerEvents(ua) {
    ua.on('connected', (e) => {
      console.debug('connected', e);
    });

    ua.on('disconnected', (e) => {
      console.debug('disconnected', e);
    });

    ua.on('registered', (e) => {
      console.debug('registered', e);
    });

    ua.on('unregistered', (e) => {
      console.debug('unregistered', e);
    });

    ua.on('registrationFailed', (e) => {
      console.debug('registrationFailed', e);
    });

    this.registerCallEvents(ua);
  }

  registerCallEvents(ua) {
    ua.on('newRTCSession', (ev) => {
      const {session} = ev;

      const store = getInstance();
      const { dispatch } = store;

      const _call = {
        from: ev.request.from.toString(),
        to: ev.request.to.toString(),
        session
      };

      if (session.direction == "incoming") {
        console.log('store?', store, session, _call);
        dispatch(addCall(this.number, _call));
      }

      session.on('accepted', (e) => {});

      session.on('confirmed', (e) => {});

      session.on('ended', (e) => {
        dispatch(removeCall(this.number, _call));
      });

      session.on('failed', (e) => {
        dispatch(removeCall(this.number, _call));
      });
    });
  }

  callOptions(options) {
    const eventHandlers = {
      'progress': function(e) {
        console.log('call is in progress');
      },
      'failed': function(e) {
        console.log('call failed with cause: ', e);
      },
      'ended': function(e) {
        console.log('call ended with cause: ', e);
      },
      'confirmed': function(e) {
        console.log('call confirmed');
      }
    };

    return {
      'eventHandlers': eventHandlers,
      'mediaConstraints': {
        'audio': true,
        'video': false
      },
      ...options
    };
  }

  call(extension, options = {}) {
    const session = this.ua.call(extension, this.callOptions(options));
    console.debug('session', session);
  }
}
