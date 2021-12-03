import React, {useRef, useState} from 'react';
import {View, Text} from 'react-native';
import MapxusSdk, {IndoorStatusChangeObject, MapRenderer} from '@mapxus/react-native-mapxus-sdk';

export default function IndoorSceneInAndOutListening() {
	const [isIndoor, setIsIndoor] = useState(true);
	const mapRef = useRef<MapxusSdk.MapxusMap>(null);

	function handleClick(feature: IndoorStatusChangeObject) {
		setIsIndoor(feature?.flag);
	}

	return (
		<View style={{flex: 1}}>
			<View style={{
				paddingVertical: 10,
				paddingHorizontal: 10,
				backgroundColor: '#fff',
				justifyContent: 'center'
			}}>
				<Text style={{fontSize: 18}}>{isIndoor ? 'Indoor' : 'Outdoor'} now</Text>
			</View>
			<View style={{flex: 1}}>
				<MapxusSdk.MapxusMap
					ref={mapRef}
					mapOption={{buildingId: 'tsuenwanplaza_hk_369d01'}}
					onIndoorStatusChange={handleClick}
				>
					<MapRenderer.MapboxGL.MapView style={{flex: 1}}/>
				</MapxusSdk.MapxusMap>
			</View>
		</View>
	)
}
