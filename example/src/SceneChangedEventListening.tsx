import React, {useRef, useState} from 'react';
import {View, Text} from 'react-native';
import MapxusSdk, {IndoorSceneChangeObject} from '@mapxus/react-native-mapxus-sdk';

export default function SceneChangedEventListening() {
	const [buildingName, setBuildingName] = useState('');
	const [floor, setFloor] = useState('');
	const mapRef = useRef<MapxusSdk.MapxusMap>(null);

	function handleClick(feature: IndoorSceneChangeObject) {
		setBuildingName(feature?.building?.name);
		setFloor(feature?.floor);
	}

	return (
		<View style={{flex: 1}}>
			<View style={{
				paddingVertical: 10,
				paddingHorizontal: 5,
				backgroundColor: '#fff',
				justifyContent: 'center'
			}}>
				<Text style={{fontSize: 18}}>BuildingName: {buildingName}</Text>
				<Text style={{fontSize: 18}}>Floor: {floor}</Text>
			</View>
			<View style={{flex: 1}}>
				<MapxusSdk.MapxusMap
					ref={mapRef}
					mapOption={{buildingId: 'tsuenwanplaza_hk_369d01', zoomInsets: {left: -60, right: -60}}}
					onIndoorSceneChange={handleClick}
				>
					<MapxusSdk.MapView style={{flex: 1}}/>
				</MapxusSdk.MapxusMap>
			</View>
		</View>
	)
}
