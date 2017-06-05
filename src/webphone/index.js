import JSIP from './jssip-adapter';

const typeMap = {
  'jssip': JSIP,
  'verto': null
};

export default class WebphoneAdapter {
  set(type) {
    if (!Object.keys(typeMap).includes(type)) {
      throw "Not implemented.";
    }
    this.type = type;
    return this;
  }

  new(server) {
    if (!this.type) {
      throw "No type provided.";
    }

    const cl = typeMap[this.type];
    return new cl(server);
  }
}
