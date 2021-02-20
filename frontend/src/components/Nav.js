import React from 'react';
import PropTypes from 'prop-types';

function Nav(props) {
    //navbar for logged out
    const logged_out_nav = (
        <ul>
            <li onClick={() => props.display_form('login')}>login</li>
            <li onClick={() => props.display_form('signup')}>signup</li>
        </ul>
    );
    //navbar for logged in
    const logged_in_nav = (
        <ul>
          <li onClick={props.handle_logout}>logout</li>
        </ul>
    );


    return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Nav;

//type verification: helps debuggin
Nav.propTypes = {
    logged_in: PropTypes.bool.isRequired,
    display_form: PropTypes.func.isRequired,
    handle_logout: PropTypes.func.isRequired
  };