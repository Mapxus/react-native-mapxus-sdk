import React from 'react';
import {View} from 'react-native';
import MapxusSdk, { MapRenderer } from '@mapxus/react-native-mapxus-sdk';

export default function CreateMapByCoordinate() {
	return (
		<View style={{flex: 1}}>
			<MapxusSdk.MapxusMap>
				<MapRenderer.MapboxGL.MapView style={{flex: 1}}>
					<MapRenderer.MapboxGL.Camera
						zoomLevel={18}
						centerCoordinate={[114.111375, 22.370787]}
					/>
				</MapRenderer.MapboxGL.MapView>
			</MapxusSdk.MapxusMap>
		</View>
	)
}
