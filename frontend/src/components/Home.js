const Home = (props) => {
    return (
        <h1>{props.logged_in? `Welcome, ${props.username}`: 'Please Log In'}</h1>
    )
}

export default Home;