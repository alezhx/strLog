import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { MainLayout, TabBarLayout, LoginLayout } from 'layouts';
import RouteWithLayout from 'basecomponents/RouteWithLayout'
import PrivateRoute from 'routes/PrivateRoute'
// import requiresAuth from 'routes/AuthHOC'

import {
  Dashboard,
  AboutVIPH,
  MediaResources,
  NotFound,
  Login,
  NeedHelp
} from '../views';

import { 
  ProfileSettings,
  GeneralSettings, 
  ScheduleSettings,
  PreviewSettings
} from '../views/VIPHSettings/views'

import {
  RegistrationDoc,
  MessagingDoc,
  SchedulingDoc,
  myMonitorDoc,
} from '../views/Documentation/views'

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from='/'
        to='/dashboard'
      />
      <PrivateRoute
        component={Dashboard}
        exact
        layout={MainLayout}
        path='/dashboard'
      />
      <PrivateRoute
        component={AboutVIPH}
        exact
        layout={MainLayout}
        path='/about'
      />
      <PrivateRoute
        component={MediaResources}
        exact
        layout={MainLayout}
        path='/mediaresources'
      />
      <Redirect
        exact
        from='/documentation'
        to='/documentation/registration' 
      />
        <PrivateRoute
          component={RegistrationDoc}
          exact
          layout={MainLayout}
          path='/documentation/registration'
        />
        <PrivateRoute
          component={SchedulingDoc}
          exact
          layout={MainLayout}
          path='/documentation/scheduling'
        />
        <PrivateRoute
          component={MessagingDoc}
          exact
          layout={MainLayout}
          path='/documentation/messaging'
        />
        <PrivateRoute
          component={myMonitorDoc}
          exact
          layout={MainLayout}
          path='/documentation/myMonitor'
        />


      <Redirect
        exact
        from='/settings'
        to='/settings/profile' 
      />
        <PrivateRoute
          component={ProfileSettings}
          exact
          layout={TabBarLayout}
          path='/settings/profile'
        />
        <PrivateRoute
          component={GeneralSettings}
          exact
          layout={TabBarLayout}
          path='/settings/general'
        />
        <PrivateRoute
          component={ScheduleSettings}
          exact
          layout={TabBarLayout}
          path='/settings/schedule'
        />
        <PrivateRoute 
          component={PreviewSettings}
          exact
          layout={TabBarLayout}
          path='/settings/preview'
        />

      <PrivateRoute
        component={NeedHelp}
        exact
        layout={MainLayout}
        path='/support'
      />
      <RouteWithLayout
        component={Login}
        // exact
        layout={LoginLayout}
        path='/login'
      />
      <RouteWithLayout
        component={NotFound}
        exact
        layout={LoginLayout}
        path='/not-found'
      />
      <Redirect to='/not-found' />
    </Switch>
  );
};

export default Routes;
