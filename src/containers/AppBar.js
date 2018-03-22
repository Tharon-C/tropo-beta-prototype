import React from 'react';
import {withRouter} from 'react-router-dom';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import UserIcon from 'material-ui/svg-icons/action/account-circle';
import SearchBar from '../components/SearchBar';

const AppBar = ({location}) => {
  const appName = location.pathname.slice(1).replace(/-/g, " ")
  return (
  <header
    style={{
      position: "relative",
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 56,
      background: '#006ca9',
      zIndex: 900,
      fontSize: '20px',
      color: 'white',
      padding: '0 16px',
      boxShadow: '1px 1px 3px 1px rgba(0,0,0,.3)',
      textTransform: "capitalize",
    }}
  > 
    <div style={{display: 'flex', alignItems: 'center'}}>
      <div style={{ display: 'flex', minWidth: '235px', paddingRight: "16px" }}>
        <MenuIcon color="white" style={{ marginRight: '32px' }} /> {appName ? appName : "Dashboard"}
      </div>
      <SearchBar style={{ opacity: 0.3, width: '600px' }} /> 
    </div>
    <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px', fontWeight: '300', padding: '8px' }}>
      <UserIcon style={{ marginRight: '16px' }} color="white" /> JohnD
    </div>
  </header>
)};
export default withRouter(AppBar)
