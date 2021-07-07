import React from 'react';
import {View} from 'react-native';
import MapxusSdk, {MapxusPointAnnotationViewProps} from '@mapxus/react-native-mapxus-sdk';

const pois: Array<MapxusPointAnnotationViewProps> = [
	{
		id: '12608',
		coordinate: [114.1112401, 22.3709189],
		buildingId: 'tsuenwanplaza_hk_369d01',
		floor: 'L1',
		title: '百老匯戲院售票處'
	},
	{
		id: '12620',
		coordinate: [114.1115583, 22.370798],
		buildingId: 'tsuenwanplaza_hk_369d01',
		floor: 'L1',
		title: '周生生'
	},
	{
		id: '16856',
		coordinate: [114.1113111, 22.3709482],
		buildingId: 'tsuenwanplaza_hk_369d01',
		floor: 'L2',
		title: 'bread n butter'
	},
	{
		id: '24135',
		coordinate: [114.1109644, 22.3710719],
		buildingId: 'tsuenwanplaza_hk_369d01',
		floor: 'L4',
		title: '一田百貨'
	}
];

export default function IndoorMarker() {
	return (
		<View style={{flex: 1}}>
			<MapxusSdk.MapxusMap mapOption={{
				buildingId: 'tsuenwanplaza_hk_369d01',
				zoomInsets: {left: -100, right: -100}
			}}>
				<MapxusSdk.MapView style={{flex: 1}}/>
				{
					pois.map((poi: MapxusPointAnnotationViewProps) => (
						<MapxusSdk.MapxusPointAnnotationView
							key={poi.id}
							id={poi.id}
							coordinate={poi.coordinate}
							buildingId={poi.buildingId}
							floor={poi.floor}
							title={poi.title}
						>
							<MapxusSdk.Callout title={poi.title}/>
						</MapxusSdk.MapxusPointAnnotationView>
					))
				}
			</MapxusSdk.MapxusMap>
		</View>
	)
}
