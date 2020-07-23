import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import ImageDetails from './components/ImageDetails/ImageDetails'
import Overlay from './components/Overlay/Overlay'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <div id='app'>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/image' component={Overlay} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
