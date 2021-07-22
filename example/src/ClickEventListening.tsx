import React from 'react';
import {View, Text} from 'react-native';
import MapxusSdk, {LongPressedObject, TappedOnBlankObject, TappedOnPoiObject} from '@mapxus/react-native-mapxus-sdk';
import {Provider, Modal} from '@ant-design/react-native';
import ParamsScrollView from './ParamsScrollView';

export default function ClickEventListening() {
	function handlePress(feature: LongPressedObject) {
		showModal(
			'building',
			'You have long pressed at',
			`[${feature?.coordinates?.latitude}, ${feature?.coordinates?.longitude}]`,
			feature?.floor,
			feature?.building?.name
		);
	}

	function handleClick(feature: TappedOnPoiObject) {
		showModal(
			'poi',
			'You have tapped on',
			feature?.poi?.name,
			feature?.floor,
			feature?.building?.name
		)
	}

	function handleClickBlank(feature: TappedOnBlankObject) {
		showModal(
			'building',
			'You have tapped on',
			`[${feature?.coordinates?.latitude}, ${feature?.coordinates?.longitude}]`,
			feature?.floor,
			feature?.building?.name
		);
	}

	function showModal(object: string, title: string, coordinateOrPOIName: string, floor: string, buildingName: string) {
		const content = object === 'building'
			? `coordinate ${coordinateOrPOIName} \n${floor}, ${buildingName}`
			: `POI: ${coordinateOrPOIName}, \n${floor}, ${buildingName}`;

		Modal.alert(
			title,
			content,
			[{text: 'OK'}]
		);
	}

	return (
		<Provider>
			<View style={{flex: 1}}>
				<View style={{flex: 8}}>
					<MapxusSdk.MapxusMap
						mapOption={{
							buildingId: 'tsuenwanplaza_hk_369d01',
							zoomInsets: {left: -60, right: -60}
						}}
						onLongPressed={handlePress}
						onTappedOnPoi={handleClick}
						onTappedOnBlank={handleClickBlank}
					>
						<MapxusSdk.MapView style={{flex: 1}}/>
					</MapxusSdk.MapxusMap>
				</View>
				<ParamsScrollView>
					<Text style={{fontSize: 18, paddingHorizontal: 8}}>Please long press or click on the map.</Text>
				</ParamsScrollView>
			</View>
		</Provider>
	)
}
