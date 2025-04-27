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
import EditBlog from './pages/EditBlog';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          {/* Public Routes (No login/register anymore) */}
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/blog" component={Home} />
          <Route path="/blog/:id" component={BlogView} />
          <Route path="/about" component={AboutMe} />
          <Route path="/connect" component={ConnectPage} />
          <Route path="/create" component={CreateBlog} />
          <Route path="/edit/:id" component={EditBlog} />
          {/* If no path matches, redirect to blog */}
          <Redirect to="/blog" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
