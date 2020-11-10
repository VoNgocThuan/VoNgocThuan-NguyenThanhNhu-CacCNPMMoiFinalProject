// import React from 'react';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import { Container } from 'react-bootstrap';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import CategoryList from './pages/categories/CategoryList';
import CategoryCreate from './pages/categories/CategoryCreate';
import CategoryView from './pages/categories/CategoryView';
import { PUBLIC_URL } from "../constants";
import BookEdit from './pages/books/BookEdit';
import BookView from './pages/books/BookView';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import { checkIfAuthenticated } from '../services/AuthService';
import AuthenticatedRoutes from './AuthenticatedRoutes';

class App extends Component {
    state = {
        user: {},
        isLoggedIn: false,
    };

    componentDidMount() {
        if (checkIfAuthenticated()) {
            this.setState({
                user: checkIfAuthenticated(),
                isLoggedIn: true,
            });
        }
    }
    render() {
        return (
            <div>
                <Router>
                    <Header
                        authData={this.state}
                    />
                    <div>
                        <Container className="p-4">
                            <Switch>
                                <Route path={`${PUBLIC_URL}about`}
                                    exact={true}
                                    component={About}
                                />
                                <Route path={`${PUBLIC_URL}contact`}
                                    exact={true}
                                    component={Contact}
                                />
                                <Route path={`${PUBLIC_URL}books/view/:id`}
                                    exact={true}
                                    component={BookView}
                                />
                                <Route path={`${PUBLIC_URL}books/update/:id`}
                                    exact={true}
                                    component={BookEdit}
                                />
                                <AuthenticatedRoutes path={`${PUBLIC_URL}categories/view/:id`}
                                    exact={true}
                                    authed={this.state.isLoggedIn}
                                    component={CategoryView}
                                />
                                <AuthenticatedRoutes path={`${PUBLIC_URL}categories/create`}
                                    exact={true}
                                    authed={this.state.isLoggedIn}
                                    component={CategoryCreate}
                                />
                                <AuthenticatedRoutes path={`${PUBLIC_URL}categories`}
                                    exact={true}
                                    authed={this.state.isLoggedIn}
                                    component={CategoryList}
                                />
                                <Route path={`${PUBLIC_URL}register`}
                                    exact={true}
                                    component={Register}
                                />
                                <Route path={`${PUBLIC_URL}login`}
                                    exact={true}
                                    component={Login}
                                />
                                <Route path={`${PUBLIC_URL}`}
                                    exact={true}
                                    component={Home}
                                />
                            </Switch>
                            <Footer></Footer>
                        </Container>
                    </div>
                </Router>
            </div>

        );
    }
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
