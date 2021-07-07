import React from 'react';
import {View} from 'react-native';
import MapxusSdk from '@mapxus/react-native-mapxus-sdk';

export default function CreateMapByCoordinate() {
	return (
		<View style={{flex: 1}}>
			<MapxusSdk.MapxusMap>
				<MapxusSdk.MapView style={{flex: 1}}>
					<MapxusSdk.Camera
						zoomLevel={18}
						centerCoordinate={[114.111375, 22.370787]}
					/>
				</MapxusSdk.MapView>
			</MapxusSdk.MapxusMap>
		</View>
	)
}
