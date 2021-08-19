import React from 'react';
import { Route, Switch } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Diagram from './components/Diagram';
import NotFound from './components/NotFound';
import {
  getDiagramRoute,
  getHomeRoute,
} from './services/route';

import './styles/global';

/** Displays the application */
export default function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path={getHomeRoute()} component={Home} />
        <Route exact path={getDiagramRoute()} component={Diagram} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}
