import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, hashHistory, IndexRoute,Link,Redirect} from 'react-router'
import App from './modules/App'
import Home from './modules/Home'
import NoMatch from './modules/NoMatch'
import Find from './modules/Find'
import Check from "./modules/Check"
import Display from './modules/Display'
import css from "./css/test.scss"
import 'whatwg-fetch'
import 'babel-polyfill'
injectTapEventPlugin();

ReactDOM.render((
  <Router history={hashHistory}>
    <Redirect from="/" to="/thing" />
    <Route path="/" component={App}>
      <Route path="thing"component={Home} >
        <Route path="check" component={Check}/>
      </Route>
      <Route path="blacklist" component={Display} />
      <Route path="find" component={Find} />
      <Route path="*" component={NoMatch} />
    </Route>
  </Router>
), document.getElementById('app'))
