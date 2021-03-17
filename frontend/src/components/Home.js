import JoinCreate from './JoinCreate'
import RoomList from './RoomList'

const Home = (props) => {

    return (
      <>
        <h1>{props.logged_in? `Welcome, ${props.username}`: 'Please Log In'}</h1>
        <RoomList/>
        <JoinCreate/>
      </>

    )
}

export default Home;