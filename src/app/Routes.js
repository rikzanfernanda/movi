import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {MovieProvider} from "./Contexts/MovieContext";
import LayoutApp from "./Layouts/layoutApp";
import Home from "./Pages/home";
import Movies from "./Pages/movies";
import Games from "./Pages/games";
import DetailMovie from "./Pages/detail_movie";
import DetailGame from "./Pages/detail_game";
import Register from "./Pages/auth/register";
import AuthLayout from "./Layouts/authLayout";
import Login from "./Pages/auth/login";
import DashboardLayout from "./Layouts/dashboardLayout";
import Dashboard from "./Pages/dashboard/dashboard";
import Cookies from "js-cookie";
import MovieList from "./Pages/dashboard/movie_list";
import MoviesForm from "./Pages/dashboard/moviesForm";
import GameList from "./Pages/dashboard/game_list";
import GameForm from "./Pages/dashboard/gameForm";
import Account from "./Pages/dashboard/account";

const AuthRoute = ({...props}) => {
    if (Cookies.get('_TOKEN') === undefined) {
        return <Redirect to="/login"/>
    } else {
        return <Route {...props} />
    }
}

const Routes = () => {
    return (
        <Router>
            <MovieProvider>
                <Switch>
                    <Route path="/" exact>
                        <LayoutApp content={<Home/>}/>
                    </Route>
                    <Route path="/movies" exact>
                        <LayoutApp content={<Movies/>}/>
                    </Route>
                    <Route path="/movies/:id" exact>
                        <LayoutApp content={<DetailMovie/>}/>
                    </Route>
                    <Route path="/games" exact>
                        <LayoutApp content={<Games/>}/>
                    </Route>
                    <Route path="/games/:id" exact>
                        <LayoutApp content={<DetailGame/>}/>
                    </Route>
                    <Route path="/register" exact>
                        <AuthLayout content={<Register/>}/>
                    </Route>
                    <Route path="/login" exact>
                        <AuthLayout content={<Login/>}/>
                    </Route>
                    <AuthRoute exact path="/dashboard">
                        <DashboardLayout content={<Dashboard/>}/>
                    </AuthRoute>
                    <AuthRoute exact path="/movie-list">
                        <DashboardLayout content={<MovieList/>}/>
                    </AuthRoute>
                    <AuthRoute exact path="/create/movies">
                        <DashboardLayout content={<MoviesForm/>}/>
                    </AuthRoute>
                    <AuthRoute exact path="/edit/movies/:id">
                        <DashboardLayout content={<MoviesForm/>}/>
                    </AuthRoute>
                    <AuthRoute exact path="/game-list">
                        <DashboardLayout content={<GameList/>}/>
                    </AuthRoute>
                    <AuthRoute exact path="/create/games">
                        <DashboardLayout content={<GameForm/>}/>
                    </AuthRoute>
                    <AuthRoute exact path="/edit/games/:id">
                        <DashboardLayout content={<GameForm/>}/>
                    </AuthRoute>
                    <AuthRoute exact path="/account">
                        <DashboardLayout content={<Account/>}/>
                    </AuthRoute>
                </Switch>
            </MovieProvider>
        </Router>
    )
}

export default Routes