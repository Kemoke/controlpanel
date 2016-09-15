import React from 'react'
import {Link} from 'react-router'

class Portlet extends React.Component{
    render(){
        return(
            <div className={"portlet " + this.props.className}>
                <div className="portlet-title">
                    <div className="caption">
                        {this.props.icon}
                        <span className="caption-subject text-uppercase">{this.props.title}</span>
                        <span className="caption-helper">{this.props.subtitle}</span>
                        <span className="pull-right">{this.props.icon2}</span>
                    </div>
                </div>
                <div className="portlet-body">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
Portlet.propTypes = {
    icon: React.PropTypes.element,
    title: React.PropTypes.string,
    subtitle: React.PropTypes.string,
    icon2: React.PropTypes.element
};
Portlet.defaultProps = {
};

export default Portlet;