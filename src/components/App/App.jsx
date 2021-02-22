// React, Redux, Router
import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useDispatch } from "react-redux";

// Literally the one CSS file
import "./App.css";

// Fresh yung components
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AboutPage from "../AboutPage/AboutPage";
import UserDashboard from "../UserDashboard/UserDashboard";
import LandingPage from "../LandingPage/LandingPage";
import MealHistory from "../MealHistory/MealHistory";
import AddMeal from "../AddMeal/AddMeal";
import MealDetails from "../MealDetails/MealDetails";
import MealEdit from "../MealEdit/MealEdit";
import Trends from "../Trends/Trends";

function App() {
  
  // Hook - dispatch
  const dispatch = useDispatch();

  // useEffect for GET user
  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <div className="background">
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserDashboard />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows MealHistory else shows LoginPage
            exact
            path="/mealhistory"
          >
            <MealHistory />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows AddMeal else shows LoginPage
            exact
            path="/addmeal"
          >
            <AddMeal />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows AddMeal else shows LoginPage
            exact
            path="/details/:id"
          >
            <MealDetails />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows AddMeal else shows LoginPage
            exact
            path="/edit/:id"
          >
            <MealEdit />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows AddMeal else shows LoginPage
            exact
            path="/trends"
          >
            <Trends />
          </ProtectedRoute>

          {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LandingPage at "/home"
            exact
            path="/home"
            authRedirect="/user"
          >
            <LandingPage />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <img
              src="https://http.cat/404.jpg"
              alt="404 Cat Not Found"
              style={{ width: "100%" }}
            /> {/* Cat stuff */}
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
