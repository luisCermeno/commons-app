import {useState}  from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BorderColorTwoToneIcon from '@material-ui/icons/BorderColorTwoTone';
import DeckTwoToneIcon from '@material-ui/icons/DeckTwoTone';
import MeetingRoomTwoToneIcon from '@material-ui/icons/MeetingRoomTwoTone';
import ContactMailTwoToneIcon from '@material-ui/icons/ContactMailTwoTone';

const CustomBottomNavigation= () => {
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      style={{width: "100vw", position: "absolute", bottom: "0"}}
    >
      <BottomNavigationAction label="Home" icon={<DeckTwoToneIcon/>} />
      <BottomNavigationAction label="Create" icon={<BorderColorTwoToneIcon/>} />
      <BottomNavigationAction label="ID" icon={<ContactMailTwoToneIcon/>} />
      <BottomNavigationAction label="Logout" icon={<MeetingRoomTwoToneIcon/>} />
    </BottomNavigation>
  );
}

export default CustomBottomNavigation