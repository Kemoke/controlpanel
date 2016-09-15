import React from 'react';
import Card from '../components/card'

export default class IndexView extends React.Component{
    render(){
        return(
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-3"><Card number={4} text="text 1" linkText="Goto 1" color="card-red"/></div>
                        <div className="col-sm-3"><Card number={3} text="text 2" linkText="Goto 2" color="card-blue"/></div>
                        <div className="col-sm-3"><Card number={2} text="text 3" linkText="Goto 3" color="card-green"/></div>
                        <div className="col-sm-3"><Card number={1} text="text 4" linkText="Goto 4" color="card-purple"/></div>
                    </div>
                </div>
            </div>
        )
    }
}