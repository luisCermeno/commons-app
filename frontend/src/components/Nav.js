import {Link} from 'react-router-dom'

const Nav = (props) => {
    //Logged out case
    const logged_out_nav = (
        <ul>
            <Link to='/'>
                <li>Home</li>
            </Link>
            <Link to='/login'>
                <li>Login</li>
            </Link>
            <Link to='/signup'>
                <li>Sign Up</li>
            </Link>
        </ul>
    )
    //Logged in case
    const logged_in_nav = (
        <ul>
          <li onClick={props.handle_logout}>Log out</li>
        </ul>
    )

    return (
    <div>
        {props.logged_in ? logged_in_nav : logged_out_nav}
    </div>
    );
}

export default Nav;