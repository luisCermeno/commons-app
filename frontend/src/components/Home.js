const Home = (props) => {
    return (
        <h3>{props.logged_in? `Welcome, ${props.username}`: 'Please Log In'}</h3>
    )
}

export default Home;