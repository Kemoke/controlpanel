import React from 'react'
import {Link} from 'react-router'

class Card extends React.Component{
    render(){
        return(
            <div className={"card " + this.props.color}>
                <div className="card-body">
                    <h2>{this.props.number}</h2>
                    <p>{this.props.text}</p>
                </div>
                <Link to={this.props.link}>{this.props.linkText}</Link>
            </div>
        )
    }
}
Card.propTypes = {
    link: React.PropTypes.string,
    linkText: React.PropTypes.string,
    number: React.PropTypes.number,
    text: React.PropTypes.string,
    color: React.PropTypes.string
};
Card.defaultProps = {
    link: "#",
    linkText: "Link Text",
    number: '0',
    text: 'text',
    color: ''
};

export default Card;