import JsSIP from 'jssip';

// put a if here
JsSIP.debug.enable('JsSIP:*');

export default class JSIP {
  constructor(server) {
    const socket = new JsSIP.WebSocketInterface(server.ws);
    const configuration = {
      sockets: [socket],
      uri: `sip:${server.number}`,
      password: server.password
    };

    this.ua = new JsSIP.UA(configuration);
    this.ua.start();

    this.registerEvents(this.ua);
  }

  registerEvents(ua) {
    ua.on('connected', function(e) {
      console.debug('connected', e);
    });

    ua.on('disconnected', function(e) {
      console.debug('disconnected', e);
    });

    ua.on('registered', function(e) {
      console.debug('registered', e);
    });

    ua.on('unregistered', function(e) {
      console.debug('unregistered', e);
    });

    ua.on('registrationFailed', function(e) {
      console.debug('registrationFailed', e);
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
        'video': true
      },
      ...options
    };
  }

  call(extension, options = {}) {
    const session = this.ua.call(extension, this.callOptions(options));
    console.debug('session', session);
  }
}
