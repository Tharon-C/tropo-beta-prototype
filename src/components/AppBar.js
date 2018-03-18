import React from 'react';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import UserIcon from 'material-ui/svg-icons/action/account-circle';
import SearchBar from './SearchBar';

export default () => (
  <header
    style={{
      position: "relative",
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 56,
      background: '#006ca9',
      zIndex: 9999,
      fontSize: '20px',
      color: 'white',
      padding: '0 16px',
      boxShadow: '1px 1px 3px 1px rgba(0,0,0,.3)',
    }}
  > 
    <div style={{display: 'flex', alignItems: 'center'}}>
      <div style={{ display: 'flex', width: '235px' }}>
        <MenuIcon color="white" style={{ marginRight: '32px' }} /> Image Catalog
      </div>
      <SearchBar style={{ opacity: 0.3, width: '600px' }} />
    </div>
    <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px', fontWeight: '300', padding: '8px' }}>
      <UserIcon style={{ marginRight: '16px' }} color="white" /> JohnD
    </div>
  </header>
);
