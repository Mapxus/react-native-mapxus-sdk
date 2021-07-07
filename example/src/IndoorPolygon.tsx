import React, {useState} from 'react';
import {View} from 'react-native';
import MapxusSdk, {IndoorSceneChangeObject} from '@mapxus/react-native-mapxus-sdk';
import {polygon as turfPolygon} from '@turf/helpers'

const coordinates = [
	[
		[114.1108041, 22.3711275],
		[114.1111456, 22.3709456],
		[114.1112551, 22.371123],
		[114.1112959, 22.3711006],
		[114.1113776, 22.3712304],
		[114.1110644, 22.3713978],
		[114.1109566, 22.3713712],
		[114.1108041, 22.3711275]
	]
];
const data = {
	buildingId: 'tsuenwanplaza_hk_369d01',
	floor: 'L1',
	polygon: turfPolygon(coordinates)
};

export default function IndoorPolygon() {
	const [buildingId, setBuildingId] = useState<string | null | undefined>(null);
	const [floor, setFloor] = useState<string | null | undefined>(null);

	function listenIndoorInfo(feature: IndoorSceneChangeObject) {
		setBuildingId(feature?.building?.identifier);
		setFloor(feature?.floor);
	}

	return (
		<View style={{flex: 1}}>
			<MapxusSdk.MapxusMap
				mapOption={{
					buildingId: 'tsuenwanplaza_hk_369d01',
					zoomInsets: {left: -100, right: -100}
				}}
				onIndoorSceneChange={listenIndoorInfo}
			>
				<MapxusSdk.MapView style={{flex: 1}}>
					{
						data.buildingId === buildingId && data.floor === floor && (
							<MapxusSdk.ShapeSource
								id={'customSourceSample'}
								shape={data.polygon}
							>
								<MapxusSdk.FillLayer
									id={'customLayerSample'}
									style={{fillColor: 'red', fillOpacity: 0.3}}
								/>
							</MapxusSdk.ShapeSource>
						)
					}
				</MapxusSdk.MapView>
			</MapxusSdk.MapxusMap>
		</View>
	)
}
