import React from 'react'
import Logo from 'assets/logo.svg'
import {
  InsertChart, 
  PermMedia, 
  LibraryBooks, 
  SettingsApplications,
} from '@material-ui/icons';

const CustomIcon = (
  <div className={'MuiSvgIcon-root'}>
    <img alt='logo' src={Logo} style={{width:'1em', height: '1em'}}/>
  </div>
)

const documentationNest = [
  {title:'Patient Registration', path:'/documentation/registration'},
  {title:'Scheduling', path:'/documentation/scheduling'},
  {title:'Messaging', path:'/documentation/messaging'},
  {title:'myMonitor', path:'/documentation/mymonitor'},
  // {title:'iClinic Integration', path:'/documentation/iclinic'},
]

const settingsNest = [
  {title: 'Profile', path:'/settings/profile'},
  {title: 'General', path:'/settings/general'},
  {title: 'Schedule', path:'/settings/schedule'},
  {title: 'Live Preview', path:'/settings/preview'},
]

const MenuItems = [
  {id:1, title:'Dashboard', icon:<InsertChart color={'primary'}/>, path:'/dashboard'},
  {id:2, title: 'Documentation', icon:<LibraryBooks color={'primary'}/>, path:'/documentation', nest:documentationNest},
  {id:3, title: 'Settings', icon:<SettingsApplications color={'primary'}/>, path:'/settings', nest:settingsNest},
  {id:4, title: 'Media Resources', icon:<PermMedia color={'primary'}/>, path:'/mediaresources'},
  {id:5, title: 'About VIPHealth', icon: CustomIcon, path:'/about'},
]

export {MenuItems}