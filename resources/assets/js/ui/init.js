import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router'
import Index from './views/index'
import Servers from './views/servers'
import ServerIndex from './views/Servers/index'
import ServerInfo from './views/Servers/info'
import ServerFtp from './views/Servers/ftp'
import NotFound from './views/notfound'
import Footer from './components/Footer'

var app = document.getElementById('app');

class App extends React.Component{
    logOut(e){
        e.preventDefault();
        $('#logout-form').submit();
    }
    render(){
        return(
            <div>
                <div style={{width: "100%", height: "51px"}}></div>
                <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
                        <p className="navbar-brand">Control Panel</p>
                        <ul className="nav navbar-nav">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/servers">Servers</Link></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right" style={{marginRight: '0'}}>
                            <li>
                                <a href="/logout"
                                   onClick={this.logOut.bind(this)}>
                                    Logout
                                </a>
                            </li>
                        </ul>
                </nav>
                {this.props.children}
                <Footer/>
            </div>
        )
    }
}

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Index}/>
            <Route path="servers" component={Servers}>
                <IndexRoute component={ServerIndex} />
                <Route path=":id/info" component={ServerInfo}/>
                <Route path=":id/ftp" component={ServerFtp}/>
            </Route>
            <Route path="*" component={NotFound}/>
        </Route>
    </Router>
), app);