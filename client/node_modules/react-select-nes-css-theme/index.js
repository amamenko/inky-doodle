var themeStyles = {
  container: function(provided) {
    return Object.assign(provided, {
      boxShadow: '0 4px #212529,0 -4px #212529,4px 0 #212529,-4px 0 #212529',
    });
  },
  control: function(provided, state) {
    return Object.assign(provided, {
      boxShadow: 'none',
      border: 'none',
      '&:hover': {
        cursor: state.isFocused ? 'text' : 'pointer',
      },
    });
  },
  valueContainer: function(provided) {
    return Object.assign(provided, {
      padding: '.5rem 1rem',
    });
  },
  indicatorSeparator: function() {
    return ({
      display: 'none',
    });
  },
  dropdownIndicator: function() {
    return ({
      position: 'relative',
      width: '50px',
      height: '100%',
      '&::before': {
        position: 'absolute',
        top: 'calc(50% - 9.6px)',
        left: 'calc(50% + 9.6px)',
        width: '2px',
        height: '2px',
        content: '""',
        transform: 'scale(1.2) rotate(90deg)',
        boxShadow: '2px 2px 0 .020em, 4px 2px 0 .020em, 2px 4px 0 .020em, 4px 4px 0 .020em, 6px 4px 0 .020em, 8px 4px 0 .020em, 2px 6px 0 .020em, 4px 6px 0 .020em, 6px 6px 0 .020em, 8px 6px 0 .020em, 10px 6px 0 .020em, 2px 8px 0 .020em, 4px 8px 0 .020em, 6px 8px 0 .020em, 8px 8px 0 .020em, 10px 8px 0 .020em, 12px 8px 0 .020em, 2px 10px 0 .020em, 4px 10px 0 .020em, 6px 10px 0 .020em, 8px 10px 0 .020em, 10px 10px 0 .020em, 2px 12px 0 .020em, 4px 12px 0 .020em, 6px 12px 0 .020em, 8px 12px 0 .020em, 2px 14px 0 .020em, 4px 14px 0 .020em',
      },
      '& svg': {
        display: 'none',
      },
    });
  },
  placeholder: function(provided) {
    return Object.assign(provided, {
      marginLeft: '4px',
    });
  },
  menu: function(provided) {
    return Object.assign(provided, {
      marginTop: '4px',
      border: 'none',
      borderRadius: '0',
      boxShadow: '0 4px #212529,0 -4px #212529,4px 0 #212529,-4px 0 #212529',
    });
  },
  menuList: function(provided) {
    return Object.assign(provided, {
      padding: '0',
    });
  },
  option: function(provided, state) {
    return Object.assign(provided, {
      position: 'relative',
      paddingLeft: '24px',
      backgroundColor: 'white',
      cursor: 'pointer',
      color: '#212529',
      '&::before': (state.isSelected || state.isFocused) && {
        position: 'absolute',
        top: 'calc(50% - 9.6px)',
        left: '5.4px',
        width: '2px',
        height: '2px',
        content: '""',
        color: state.isSelected ? '#212529' : '#919599',
        boxShadow: '2px 2px 0 .020em, 4px 2px 0 .020em, 2px 4px 0 .020em, 4px 4px 0 .020em, 6px 4px 0 .020em, 8px 4px 0 .020em, 2px 6px 0 .020em, 4px 6px 0 .020em, 6px 6px 0 .020em, 8px 6px 0 .020em, 10px 6px 0 .020em, 2px 8px 0 .020em, 4px 8px 0 .020em, 6px 8px 0 .020em, 8px 8px 0 .020em, 10px 8px 0 .020em, 12px 8px 0 .020em, 2px 10px 0 .020em, 4px 10px 0 .020em, 6px 10px 0 .020em, 8px 10px 0 .020em, 10px 10px 0 .020em, 2px 12px 0 .020em, 4px 12px 0 .020em, 6px 12px 0 .020em, 8px 12px 0 .020em, 2px 14px 0 .020em, 4px 14px 0 .020em',
      },
    });
  },
};

module.exports = themeStyles;
