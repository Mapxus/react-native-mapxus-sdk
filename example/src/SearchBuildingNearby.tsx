import React, {useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import MapxusSdk, {BuildingSearchResult, Building, BuildingSearchNearbyProps} from '@mapxus/react-native-mapxus-sdk';
import {Button, InputItem, List, ActivityIndicator} from '@ant-design/react-native';
import turfBbox from '@turf/bbox';
import {lineString as turfLineString} from '@turf/helpers';
import ParamsScrollView from './ParamsScrollView';
import language from './utils/language';

export default function SearchBuildingNearby() {
	const [words, setWords] = useState('');
	const [center, setCenter] = useState('114.111375, 22.370387');
	const [distance, setDistance] = useState('5');
	const [offset, setOffset] = useState('10');
	const [page, setPage] = useState('1');
	const [loading, setLoading] = useState(false);
	const [markers, setMarkers] = useState<Array<any>>([]);
	const cameraRef = useRef<MapxusSdk.Camera>(null);

	async function handleClick() {
		const coordinate = center.split(center.includes(',') ? ',' : '，');

		if (coordinate.length === 2) {
			const num_coordinate: Array<number> = coordinate.map(c => Number(c.trim()));

			setLoading(true);
			const buildings: Array<Building> = await getBuildingsNearby({
				center: {latitude: num_coordinate[1], longitude: num_coordinate[0]},
				distance: Number(distance.trim()),
				offset: Number(offset.trim()),
				page: Number(page.trim()),
				keywords: words.trim()
			});

			if (buildings?.length) {
				setMarkers([])
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

				const bounds = getBbox(_coordinates);
				const [southWestLon, southWestLat, northEastLon, northEastLat] = bounds;
				cameraRef.current?.fitBounds(
					[northEastLon, northEastLat],
					[southWestLon, southWestLat],
					50
				);
				setLoading(false);
			}
		}
	}

	return (
		<View style={{flex: 1}}>
			<View style={{flex: 2}}>
				<MapxusSdk.MapxusMap mapOption={{buildingId: 'tsuenwanplaza_hk_369d01'}}>
					<MapxusSdk.MapView style={{flex: 1}}>
						<MapxusSdk.Camera ref={cameraRef}/>
						{
							markers.length
								? markers.map((marker, idx) => (
									<MapxusSdk.PointAnnotation
										key={idx}
										id={`${idx}`}
										coordinate={marker.coordinate}
										title={marker.name}
									>
										<MapxusSdk.Callout title={marker.name}/>
									</MapxusSdk.PointAnnotation>
								)) : null
						}
					</MapxusSdk.MapView>
				</MapxusSdk.MapxusMap>
			</View>
			<ParamsScrollView>
				<List style={{marginTop: 10}}>
					<InputItem
						labelNumber={5}
						style={styles.input}
						value={words}
						onChange={setWords}
					>
						keywords:
					</InputItem>
					<InputItem
						labelNumber={5}
						style={styles.input}
						placeholder={'lon, lat'}
						value={center}
						onChange={setCenter}
					>
						center:
					</InputItem>
					<InputItem
						labelNumber={5}
						style={styles.input}
						value={distance}
						onChange={setDistance}
					>
						distance:
					</InputItem>
					<InputItem
						labelNumber={5}
						style={styles.input}
						value={offset}
						onChange={setOffset}
					>
						offset:
					</InputItem>
					<InputItem
						labelNumber={5}
						style={styles.input}
						value={page}
						onChange={setPage}
					>
						page:
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
			<View style={[styles.loadingMask, {display: loading ? 'flex' : 'none'}]}>
				<ActivityIndicator toast animating={loading} size='large'/>
			</View>
		</View>
	);
}

async function getBuildingsNearby(params: BuildingSearchNearbyProps): Promise<Building[]> {
	const data: BuildingSearchResult = await MapxusSdk.buildingSearchManager.buildingSearchNearbyCenter(params);
	return data?.buildings || [];
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
		marginTop: 15,
		marginBottom: 10,
		marginHorizontal: 15,
		paddingVertical: 8,
		textAlign: 'center'
	},
	loadingMask: {
		position: 'absolute',
		left: 0,
		top: 0,
		height: '100%',
		width: '100%',
		alignContent: 'center',
		justifyContent: 'center'
	}
});
