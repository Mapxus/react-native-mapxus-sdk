import React, {useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import MapxusSdk, {Building, BuildingSearchResult, MapRenderer} from '@mapxus/react-native-mapxus-sdk';
import {Button, List, InputItem} from '@ant-design/react-native';
import turfBbox from '@turf/bbox';
import {lineString as turfLineString} from '@turf/helpers';
import ParamsScrollView from './ParamsScrollView';
import language from './utils/language';

export default function SearchBuildingByID() {
	const [buildingIds, setBuildingIds] = useState('kolourtsuenwani_hk_098ch3, olympiancity3_hk_4cf450');
	const [markers, setMarkers] = useState<Array<any>>([]);
	const cameraRef = useRef<MapRenderer.MapboxGL.Camera>(null);

	async function handleClick() {
		if (buildingIds.trim().length) {
			setMarkers([])
			const ids: Array<string> = buildingIds
				.split(buildingIds.includes(',') ? ',' : '，')
				.map(id => id.trim());
			const data: BuildingSearchResult = await MapxusSdk.buildingSearchManager.buildingSearchByIds({
				buildingIds: ids
			});
			const buildings: Array<Building> = data?.buildings;

			if (buildings?.length) {
				let _coordinates: Array<number[]> = [];
				let _coordinate: Array<number> = [];
				let _markers: Array<any> = [];
				const lang: string = (language === 'zh-Hans' && 'cn') || (language === 'zh-Hant' && 'zh') || language;

				buildings.forEach((b: Building | any) => {
					_coordinate = [Number(b?.labelCenter?.longitude), Number(b?.labelCenter?.latitude)];
					_coordinates.push(_coordinate);
					_markers.push({coordinate: _coordinate, name: b[`name_${lang}`] || b.name_default});
				});

				setMarkers(_markers);

				if (buildings.length < 2) {
					cameraRef.current?.moveTo(_coordinates[0]);
				} else {
					const bounds = getBbox(_coordinates);
					const [southWestLon, southWestLat, northEastLon, northEastLat] = bounds;
					cameraRef.current?.fitBounds(
						[northEastLon, northEastLat],
						[southWestLon, southWestLat],
						50
					);
				}
			}
		}
	}

	return (
		<View style={{flex: 1}}>
			<View style={{flex: 4}}>
				<MapxusSdk.MapxusMap mapOption={{buildingId: 'tsuenwanplaza_hk_369d01'}}>
					<MapRenderer.MapboxGL.MapView style={{flex: 1}}>
						<MapRenderer.MapboxGL.Camera ref={cameraRef}/>
						{
							markers.length
								? markers.map((marker, idx) => (
									<MapRenderer.MapboxGL.PointAnnotation
										key={idx}
										id={`${idx}`}
										coordinate={marker.coordinate}
										title={marker.name}
									>
										<MapRenderer.MapboxGL.Callout title={marker.name}/>
									</MapRenderer.MapboxGL.PointAnnotation>
								)) : null
						}
					</MapRenderer.MapboxGL.MapView>
				</MapxusSdk.MapxusMap>
			</View>
			<ParamsScrollView>
				<List style={{marginTop: 10}}>
					<InputItem
						labelNumber={5}
						style={styles.input}
						value={buildingIds}
						onChange={setBuildingIds}
					>
						buildingIds:
					</InputItem>
				</List>
				<Button
					type={'primary'}
					style={styles.button}
					onPress={handleClick}
				>
					Search
				</Button>
			</ParamsScrollView>
		</View>
	);
}

function getBbox(coordinates: Array<number[]>): Array<number> {
	return turfBbox(turfLineString(coordinates));
}

const styles = StyleSheet.create({
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		paddingHorizontal: 5,
	},
	button: {
		height: 'auto',
		paddingVertical: 8,
		marginTop: 15,
		marginHorizontal: 15
	}
});
