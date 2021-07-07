import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapxusSdk from '@mapxus/react-native-mapxus-sdk';
import {Switch, Button} from '@ant-design/react-native';
import ParamsScrollView from './ParamsScrollView';

export default function IndoorControls() {
	const [checked, setChecked] = useState(false);
	const [position, setPosition] = useState(MapxusSdk.MapxusSelectorPosition.CENTER_LEFT);
	const [hidden, setHidden] = useState(false);

	function handleCheck(checked: boolean) {
		setChecked(checked);
		setHidden(!hidden);
	}

	function handleClick() {
		setPosition(position > 4 ? 0 : position + 1);
	}

	return (
		<View style={{flex: 1}}>
			<View style={{flex: 6}}>
				<MapxusSdk.MapxusMap
					indoorControllerAlwaysHidden={hidden}
					selectorPosition={position}
					mapOption={{buildingId: 'tsuenwanplaza_hk_369d01'}}
				>
					<MapxusSdk.MapView style={{flex: 1}}/>
				</MapxusSdk.MapxusMap>
			</View>
			<ParamsScrollView>
				<View style={styles.controller}>
					<View style={styles.inner}>
						<Switch checked={checked} onChange={handleCheck}/>
						<Text style={styles.fontStyle}>isAlwaysHidden</Text>
					</View>
					<Button
						type='primary'
						style={styles.button}
						onPress={handleClick}
					>
						Position
					</Button>
				</View>
			</ParamsScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	controller: {
		backgroundColor: '#fff',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	inner: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	fontStyle: {
		marginLeft: 10,
		fontSize: 18
	},
	button: {
		backgroundColor: '#74aded',
		borderWidth: 0,
		height: 'auto',
		paddingVertical: 8,
		paddingHorizontal: 10
	}
});
