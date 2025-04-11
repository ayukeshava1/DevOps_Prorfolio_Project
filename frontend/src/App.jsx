// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AboutMe from './pages/AboutMe';
import ConnectPage from './pages/ConnectPage';
import Home from './pages/Home';
import BlogView from './pages/BlogView';
import CreateBlog from './pages/CreateBlog';
import Register from './pages/Register';
import Login from './pages/Login';
import { useAuth, AuthProvider } from './contexts/AuthContext';
import EditBlog from './pages/EditBlog';
// Protected Route Component
function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

// Routes Based on Auth
function Routes() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="App">
        <Navbar />

        <Switch>
          {/* Public Routes */}
          {!user && (
            <>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Redirect to="/register" /> {/* Default to Register */}
            </>
          )}

          {/* Private Routes */}
          {user && (
            <>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute exact path="/blog" component={Home} />
              <PrivateRoute path="/blog/:id" component={BlogView} />
              <PrivateRoute path="/about" component={AboutMe} />
              <PrivateRoute path="/connect" component={ConnectPage} />
              <PrivateRoute path="/create" component={CreateBlog} />
              <Redirect to="/blog" /> {/* Default to blog if path doesn't match */}
              <Route path="/edit/:id" component={EditBlog} />
            </>
          )}
        </Switch>
      </div>
    </Router>
  );
}

// Root App Component with AuthProvider
function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
