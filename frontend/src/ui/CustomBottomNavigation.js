import {useState}  from 'react';
import {Link} from 'react-router-dom'

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import BorderColorTwoToneIcon from '@material-ui/icons/BorderColorTwoTone';
import DeckTwoToneIcon from '@material-ui/icons/DeckTwoTone';
import MeetingRoomTwoToneIcon from '@material-ui/icons/MeetingRoomTwoTone';
import ContactMailTwoToneIcon from '@material-ui/icons/ContactMailTwoTone';



const CustomBottomNavigation= (props) => {
  // ******** STATE HOOKS ********
  const [value, setValue] = useState(0);
  // ******** RENDER ********
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      style={{width: "100vw", position: "absolute", bottom: "0"}}
    >
      <BottomNavigationAction label="Home" icon={<DeckTwoToneIcon/>} component={Link} to="/"/>
      <BottomNavigationAction label="Create" component={Link} to="/create" icon={<BorderColorTwoToneIcon/>} />
      <BottomNavigationAction label="ID" component={Link} to={`/profile/${props.username}`} icon={<ContactMailTwoToneIcon/>} />
      <BottomNavigationAction label="Logout" onClick = {props.handle_logout} icon={<MeetingRoomTwoToneIcon/>} />
    </BottomNavigation>
  );
}

export default CustomBottomNavigation