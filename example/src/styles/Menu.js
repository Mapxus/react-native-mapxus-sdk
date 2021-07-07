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
	sidebar_container: {
		borderWidth: 1,
		borderColor: 'blue'
	},
	sidebar_header: {
		backgroundColor: '#777a7d',
		paddingLeft: '5%',
		paddingRight: '5%',
		paddingBottom: 10,
		justifyContent: 'flex-end'
	},
	sidebar_title: {
		fontSize: 25,
		lineHeight: 40,
		color: 'white'
	},
	sidebar_subTitle: {
		fontSize: 15,
		color: 'white'
	},
	sidebar_item: {
		backgroundColor: 'white'
	},
	sidebar_item_active: {
		backgroundColor: 'rgb(16, 142, 233)'
	},
	sidebar_text: {
		color: 'black'
	},
	sidebar_text_active: {
		color: 'white'
	}
});

export default styles;
