import React from 'react'

class Icon extends React.Component{
    render(){
        return(
            <i className={"fa fa-"+this.props.name}/>
        )
    }
}
Icon.propTypes = {
    name: React.PropTypes.string
};

export default Icon;