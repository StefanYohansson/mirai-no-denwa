import { h, Component } from 'preact';
import Icon from './icon';

export default class ZeroUI extends Component {
  render() {
    const props = this.props;
    
    const icon = {
      scale: '24',
      ...props.icon
    };
    const hasIcon = !!Object.keys(props.icon).length;
    return (
      <div className="zero-ui-container">
        {
          (hasIcon)
            ? <Icon {...icon} />
            : null
        }
        { (props.message) ? <h1 className="zero-ui-message">{props.message}</h1> : null }
        { (props.note) ? <p className="zero-ui-note">{props.note}</p> : null }
      </div>
    );
  }
}
