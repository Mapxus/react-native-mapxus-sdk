import React from 'react';
import {View} from 'react-native';
import MapxusSdk, { MapRenderer } from '@mapxus/react-native-mapxus-sdk';

export default function CreateMapByPOI() {
	return (
		<View style={{flex: 1}}>
			<MapxusSdk.MapxusMap mapOption={{poiId: '12608', zoomLevel: 20}}>
				<MapRenderer.MapboxGL.MapView style={{flex: 1}}/>
			</MapxusSdk.MapxusMap>
		</View>
	);
}
