import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
	carousel_page: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center'
	},
	image_container: {
		width: '100%',
		height: '50%'
	},
	text_container: {
		width: '100%',
		paddingTop: '10%',
		paddingLeft: '5%',
		paddingBottom: '5%' ,
		borderBottomWidth: 1,
		borderColor: '#e9e9e9',
		justifyContent: 'center'
	},
	title: {
		fontWeight: 'bold',
		fontSize: 18,
		color: 'rgba(0, 0, 0, .65)',
		marginBottom: 10
	},
	subTitle: {
		fontSize: 15,
		color: 'rgba(0, 0, 0, .5)'
	}
});

export default styles;
