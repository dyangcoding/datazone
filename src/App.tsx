import React from "react";
import "./index.css";
import { HomeIcon, InformationCircleIcon, QuestionMarkCircleIcon, ClipboardListIcon } from "@heroicons/react/outline";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import { About } from "./pages/about";
import { Help } from "./pages/help";
import { SearchHistory } from "./pages/search-history";
import { Tweets } from "./pages/tweets";

interface AppProps {

}

interface AppState {

}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
    this.state = {}
  }

  public render(): React.ReactNode {
    return (
      <div className="App">
        <div className="relative min-h-screen md:flex">

          <div className="bg-gray-800 text-gray-100 flex justify-between md:hidden">
            <a href="#" className="block p-4 text-white font-bold">Data Zone</a>

            <button className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          <Router>
            {this.renderSidebar()}
            {this.renderContent()}
          </Router>
        </div>
      </div>
    );
  }

  private renderSidebar(): React.ReactNode {
    return (
      <div className="sidebar bg-blue-800 text-blue-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 
        transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
          <a href="#" className="text-white flex items-center space-x-2 px-4">
              <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <span className="text-2xl font-extrabold">Data Zone</span>
          </a>

          <nav>
            <Link to="/" className="flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
                <HomeIcon className="h-6 w-6" aria-hidden="true" />
                <span>Tweets</span>
            </Link>
            <Link to="/history" className="flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
                <ClipboardListIcon className="h-6 w-6" aria-hidden="true" />
                <span>History</span>
            </Link>
            <Link to="/about" className="flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
                <InformationCircleIcon className="h-6 w-6" aria-hidden="true" />
                <span>About</span>
            </Link>
            <Link to="/help" className="flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
                <QuestionMarkCircleIcon className="h-6 w-6" aria-hidden="true" />
                <span>Help</span>
            </Link>
          </nav>
      </div>
    );
  }

  private renderContent(): React.ReactNode {
    return (
      <div className="container mx-auto px-4 max-w-screen-xl flex-1 p-10 text-2xl font-bold">
        <Switch>
            <Route exact path="/" component={Tweets} />
            <Route exact path="/history" component={SearchHistory} />
            <Route exact path="/about" component={About} />
            <Route exact path="/help" component={Help} />
        </Switch>
      </div>
    );
  }
}
