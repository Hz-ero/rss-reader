import React from 'react'
import TodoListContainer from './TodoListContainer'
import TodoAddContainer from './TodoAddContainer'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import Bundle from '../components/Bundle.jsx'

const Home = () => (
    <div>
        <TodoAddContainer />
        <TodoListContainer />
    </div>
)

const About = (props) => (
    <Bundle load={() => import('./AboutContainer.js')}>
        {(About) => <About {...props}/>}
    </Bundle>
)

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