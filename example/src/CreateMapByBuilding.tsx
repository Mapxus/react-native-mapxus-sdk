import React from 'react';
import {View} from 'react-native';
import MapxusSdk from '@mapxus/react-native-mapxus-sdk';

export default function CreateMapByBuilding() {
	return (
		<View style={{flex: 1}}>
			<MapxusSdk.MapxusMap mapOption={{
				buildingId: 'tsuenwanplaza_hk_369d01',
				floor: 'L3',
				zoomInsets: {top: 0, left: 0, bottom: 0, right: 0}
			}}>
				<MapxusSdk.mapRender.MapView style={{flex: 1}}/>
			</MapxusSdk.MapxusMap>
		</View>
	);
}
