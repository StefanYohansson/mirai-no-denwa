import { h, Component } from 'preact';

export default class Icon extends Component {
  render() {
    const { props } = this;
    return (<i className={`fa fa-${props.name} x${props.scale}`}></i>);
  }
}
