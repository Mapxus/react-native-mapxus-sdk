import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapxusSdk from '@mapxus/react-native-mapxus-sdk';
import {Switch} from '@ant-design/react-native';
import ParamsScrollView from './ParamsScrollView';

export default function SwitchingBuildingGestures() {
	const [isAutoSwitch, setIsAutoSwitch] = useState(true);
	const [isGesturesSwitch, setIsGesturesSwitch] = useState(true);

	return (
		<View style={{flex: 1}}>
			<View style={{flex: 6}}>
				<MapxusSdk.MapxusMap
					autoChangeBuilding={isAutoSwitch}
					gestureSwitchingBuilding={isGesturesSwitch}
					mapOption={{buildingId: 'tsuenwanplaza_hk_369d01'}}>
					<MapxusSdk.MapView style={{flex: 1}}/>
				</MapxusSdk.MapxusMap>
			</View>
			<ParamsScrollView>
				<View style={styles.controller}>
					<View style={styles.inner}>
						<Switch checked={isAutoSwitch} onChange={setIsAutoSwitch}/>
						<Text style={styles.fontStyle}>auto switch</Text>
					</View>
					<View style={styles.inner}>
						<Switch checked={isGesturesSwitch} onChange={setIsGesturesSwitch}/>
						<Text style={styles.fontStyle}>gestures switch</Text>
					</View>
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
		marginLeft: 5,
		fontSize: 17
	},
	button: {
		backgroundColor: '#74aded',
		borderWidth: 0,
		height: 'auto',
		paddingVertical: 8,
		paddingHorizontal: 10
	}
});
