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
                    <Route path="/movie/:id">
                        <Selected />
                    </Route>
                } <
        Route path="/404" >
                    <
        h1 > Page Not Found < /h1> <
        /Route> <
                            Redirect to="/404" />
                        <
        /Switch> <
        /Router>
    )
}