import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	header: {
		width: '100%',
		backgroundColor: '#898c8f'
	},
	header_content: {
		height: 50,
		justifyContent: 'center'
	},
	title: {
		fontSize: 20,
		color: 'white',
		textAlign: 'center'
	},
	menu_button:  {
		width: 30,
		height: 30,
		position: 'absolute',
		left: '3%',
		right: '3%'
	},
});

export default styles;
