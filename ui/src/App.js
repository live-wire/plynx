import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import cookie from 'react-cookies';
import PropTypes from 'prop-types';
import Header from './components/header';
import LogIn from './components/LogIn';
import Welcome from './components/Welcome';
import Dashboard from './components/dashboard';
import NodeRouter from './components/NodeRouter';
import FileRouter from './components/FileRouter';
import GraphRouter from './components/GraphRouter';
import NotFound from './components/NotFound';
import FeedbackButton from './components/FeedbackButton';
import APIDialog from './components/Dialogs/APIDialog';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.reloadOnChangePath = true;
    this.state = {};
  }

  getPathTuple(path) {
    const pathParts = path.split('/').concat(['', '']);
    return pathParts;
  }

  componentDidUpdate(prevProps) {
    /* A trick: reload the page every time when the url does not end with '$'*/
    const prevPathTuple = this.getPathTuple(prevProps.location.pathname);
    const pathTuple = this.getPathTuple(this.props.location.pathname);
    if (this.props.location !== prevProps.location) {
      if (this.props.location.pathname.endsWith("$")) {
        this.reloadOnChangePath = false;
        this.props.history.replace(this.props.location.pathname.replace(/\$+$/, ''));
      } else if (this.reloadOnChangePath &&
                 prevPathTuple[1] === pathTuple[1] &&
                 prevPathTuple[2] !== pathTuple[2] &&
                 prevPathTuple[2] !== '' &&
                 pathTuple[2] !== '' &&
                 prevPathTuple[2] !== 'new') {
        window.location.reload();
      } else {
        this.reloadOnChangePath = true;
      }
    }
  }

  handleAPIDialogClick() {
    this.setState({showApiDialog: true});
  }

  handleAPIDialogClose() {
    this.setState({showApiDialog: false});
  }

  render() {
    return (
      <div className="App">
        <Header onAPIDialogClick={() => this.handleAPIDialogClick()}/>
        {cookie.load('username') &&
          <FeedbackButton/>
        }
        <div className="Content">
          {this.state.showApiDialog && <APIDialog onClose={() => this.handleAPIDialogClose()}/>}
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/welcome" component={Welcome} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/nodes" component={NodeRouter}/>
            <Route path="/files" component={FileRouter}/>
            <Route path="/graphs" component={GraphRouter}/>
            <Route exact path="/login" component={LogIn} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(App);
