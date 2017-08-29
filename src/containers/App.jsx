import React from 'react'
import MyLoadable from '../util/MyLoadable';
import TodoListContainer from './TodoListContainer'
import TodoAddContainer from './TodoAddContainer'
import TestButtonClick from '../components/TestButtonClick.jsx'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

const Home = () => (
    <div>
        <TodoAddContainer />
        <TodoListContainer />
        <TestButtonClick />
    </div>
)


const About = MyLoadable({
    loader: () => import('./AboutContainer')
})

const App = () => (
    <Router>
        <div>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
        </ul>

        <hr/>

        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        </div>
    </Router>
)

export default App