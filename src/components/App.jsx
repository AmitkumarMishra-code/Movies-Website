import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import Home from './Home.jsx'
import Selected from './Selected'

export default function App() {

    return (<
        Router >
        <
        Switch >
            <
        Route exact path="/" >
                <
                    Home />
                <
        /Route> {
                    <Route path="/movie/:id" component={Selected} />

                }
                <
                    Redirect to="/" />
                <
        /Switch> <
        /Router>
    )
}