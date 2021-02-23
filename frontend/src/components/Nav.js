import React from 'react';
import PropTypes from 'prop-types';

const Nav = (props) => {
    //Logged out case
    const logged_out_nav = (
        <ul>
            <li onClick={() => props.display_form('login')}>login</li>
            <li onClick={() => props.display_form('signup')}>signup</li>
        </ul>
    )
    //Logged in case
    const logged_in_nav = (
        <ul>
          <li onClick={props.handle_logout}>logout</li>
        </ul>
    )


    return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Nav;

//type verification: helps debugging
Nav.propTypes = {
    logged_in: PropTypes.bool.isRequired,
    display_form: PropTypes.func.isRequired,
    handle_logout: PropTypes.func.isRequired
  };