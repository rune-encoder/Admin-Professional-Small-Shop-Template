const Sidebar = () => {
    return (
      <aside
        style={{
          position: 'absolute',
          width: '72px',
          backgroundColor: '#1c212c',
          minHeight: '100vh',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '5px',
          paddingBottom: '2px',
          gap: '7px',
        }}
      >
        {/* menu items */}
        <a
          href="/"
          style={{
            marginBottom: '3px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '2px solid #ffffff',
            paddingBottom: '6px',
            outline: 'none',
          }}
        >
          <img
            id="te-logo"
            style={{ marginRight: '1px', width: '24px' }}
            src="../assets/white-logo.svg"
            alt="Logo"
            draggable="false"
          />
        </a>
  
        {/* employee name */}
        <p
          style={{
            fontSize: '0.75rem',
            color: '#8c8c8c',
            textAlign: 'center',
            fontStyle: 'italic',
            fontWeight: 'bold',
            marginX: '2px',
          }}
        >
          Welcome 
        </p>
  
        {/* Menu */}
        <div style={{ width: '100%', paddingRight: '3px', display: 'flex', flexDirection: 'column', gap: '1px', color: '#8c8c8c', fill: '#8c8c8c', fontSize: '0.875rem' }}>
          <div style={{ paddingLeft: '4px', color: '#666666', fontSize: '11px', textTransform: 'uppercase' }}>Menu</div>
          
          {/* menu item newsletter */}
          {/* ... (similar structure for other menu items) */}
        </div>
  
        {/* Profile */}
        <div style={{ width: '100%', paddingRight: '3px', display: 'flex', flexDirection: 'column', gap: '1px', color: '#8c8c8c', fill: '#8c8c8c', fontSize: '0.875rem' }}>
          <div style={{ paddingLeft: '4px', color: '#666666', fontSize: '11px', textTransform: 'uppercase' }}>Profile</div>
          
          {/* menu item logout */}
          {/* ... (similar structure for other profile items) */}
        </div>
      </aside>
    );
  };
  
  export default Sidebar;