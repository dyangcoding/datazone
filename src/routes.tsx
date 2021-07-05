import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import { About } from "./pages/about";
import { Help } from "./pages/help";
import { SearchHistory } from "./pages/search-history";
import { Tweets } from "./pages/tweets";

interface RouteProps {

}

export class Routes extends React.PureComponent<RouteProps> {
    constructor(props: RouteProps) {
        super(props);
    }

    public render(): React.ReactNode {
        return (
            <div className="container mx-auto px-4 max-w-screen-xl flex-1 p-10 text-2xl font-bold">
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={Tweets}/>
                        <Route path="/history" component={SearchHistory}/>
                        <Route path="/about" component={About}/>
                        <Route path="/help" component={Help}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}