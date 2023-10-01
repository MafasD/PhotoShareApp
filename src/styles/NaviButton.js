//CSS for navigation buttons
import { StyleSheet } from 'react-native';

const NaviButtonStyles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default NaviButtonStyles;
