import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MapxusSdk, {
	GeoPoint,
	TappedOnBlankObject,
	TappedOnPoiObject,
	MapxusPointAnnotationViewProps,
	RouteSearchResult,
	IndoorSceneChangeObject,
} from '@mapxus/react-native-mapxus-sdk';
import { Switch, SegmentedControl, WhiteSpace, Button } from '@ant-design/react-native';
import ParamsScrollView from './ParamsScrollView';
import { map as _map, assign as _assign, find as _find } from 'lodash';
import language from './utils/language';

export default function Route() {
	const [startEndClicked, setStartEndClicked] = useState('');
	const [isToDoor, setIsToDoor] = useState(false);
	const [start, setStart] = useState<GeoPoint | null>(null);
	const [end, setEnd] = useState<GeoPoint | null>(null);
	const [fromBuilding, setFromBuilding] = useState('');
	const [fromFloor, setFromFloor] = useState('');
	const [toBuilding, setToBuilding] = useState('');
	const [toFloor, setToFloor] = useState('');
	const [vehicle, setVehicle] = useState('foot');
	const [markers, setMarkers] = useState<Array<MapxusPointAnnotationViewProps>>([]);
	const routeRef = useRef<MapxusSdk.RouteView>(null);
	const naviRef = useRef<MapxusSdk.NavigationView>(null);
	const mapRef = useRef<MapxusSdk.MapxusMap>(null);

	useEffect(function updateStartMarker() {
		if (start) {
			setMarkers(updateMarker(markers, start, 'start', fromBuilding, fromFloor));
		}
	}, [start]);

	useEffect(function updateEndMarker() {
		if (end) {
			setMarkers(updateMarker(markers, end, 'end', toBuilding, toFloor));
		}
	}, [end]);

	async function handleSearch() {
		if (start && end) {
			const result: RouteSearchResult = await MapxusSdk.routeSearchManager.routeSearch({
				fromBuilding,
				fromFloor,
				fromLon: start.longitude,
				fromLat: start.latitude,
				toBuilding,
				toFloor,
				toLon: end.longitude,
				toLat: end.latitude,
				locale: language,
				vehicle,
				toDoor: isToDoor
			});
			renderPath(result);
			setMarkers([]);
		}
	}

	function selectPoint(feature: TappedOnBlankObject | TappedOnPoiObject) {
		if (startEndClicked === 'start') {
			setFromBuilding(feature?.building?.identifier);
			setFromFloor(feature?.floor);
			setStart(feature?.coordinates);
		}
		if (startEndClicked === 'end') {
			setToBuilding(feature?.building?.identifier);
			setToFloor(feature?.floor);
			setEnd(feature?.coordinates);
		}
	}

	function updateMarker(
		markers: Array<MapxusPointAnnotationViewProps>,
		point: GeoPoint,
		type: string,
		buildingId?: string,
		floor?: string
	): Array<MapxusPointAnnotationViewProps> {
		let arr: Array<MapxusPointAnnotationViewProps> = [...markers];

		if (!markers.length || (markers.length && !_find(markers, m => m.id === type))) {
			arr = arr.concat({
				id: type,
				coordinate: [point?.longitude, point?.latitude],
				buildingId,
				floor
			});
		} else {
			arr = _map(markers, m => {
				return m.id === type
					? _assign(m, { coordinate: [point?.longitude, point?.latitude] })
					: m;
			});
		}

		return arr;
	}

	async function renderPath(result: RouteSearchResult) {
		routeRef.current?.paintRouteUsingPath(
			result?.paths[0],
			result?.wayPointList
		);
		naviRef.current?.updatePath(
			result?.paths[0],
			result?.wayPointList
		)
		var dto = await routeRef.current?.getPainterPathDto();
		for (const key in dto?.paragraphs) {
			if (dto?.paragraphs.hasOwnProperty(key) && !key.includes('outdoor')) {
				var paragraph = dto.paragraphs[key];
				mapRef.current?.selectIndoorScene(MapxusSdk.MapxusZoomMode.DISABLE, { top: 0, left: 0, bottom: 0, right: 0 }, paragraph.buildingId, paragraph.floor);
				routeRef.current?.focusOn([key], { top: 130, left: 30, bottom: 110, right: 80 })
				break;
			}
		}
	}

	function handelIndoorSceneChange(feature: IndoorSceneChangeObject) {
		routeRef.current?.changeOn(feature.building.identifier, feature.floor);
	}

	function handleGo() {
		naviRef.current?.start()
	}



	return (
		<View style={{ flex: 1 }}>
			<View style={styles.container}>
				<View>
					<Button
						style={[styles.button, styles.button_white]}
						{...startEndClicked === 'start' ? { type: 'primary' } : {}}
						onPress={() => setStartEndClicked(startEndClicked === 'start' ? '' : 'start')}
					>
						{startEndClicked === 'start' ? 'Tap screen for Start' : 'Start'}
					</Button>
					<WhiteSpace />
					<Button
						style={[styles.button, styles.button_white]}
						{...startEndClicked === 'end' ? { type: 'primary' } : {}}
						onPress={() => setStartEndClicked(startEndClicked === 'end' ? '' : 'end')}
					>
						{startEndClicked === 'end' ? 'Tap screen for End' : 'End'}
					</Button>
				</View>
				<View style={styles.button_blue_wrapper}>
					<Button
						type={'primary'}
						style={[styles.button, { marginRight: 15 }]}
						onPress={handleSearch}
					>
						Search
					</Button>
					<Button
						type={'primary'}
						style={[styles.button, { marginRight: 15 }]}
						onPress={handleGo}
					>
						Go
					</Button>
				</View>
			</View>
			<View style={{ flex: 5 }}>
				<MapxusSdk.MapxusMap
					ref={mapRef}
					mapOption={{
						buildingId: 'tsuenwanplaza_hk_369d01',
						zoomInsets: { left: -100, right: -100 }
					}}
					onTappedOnBlank={selectPoint}
					onTappedOnPoi={selectPoint}
					onIndoorSceneChange={handelIndoorSceneChange}
				>
					<MapxusSdk.MapView style={{ flex: 1 }} />
					{
						markers.map((marker: MapxusPointAnnotationViewProps) => (
							<MapxusSdk.MapxusPointAnnotationView
								key={marker.id}
								id={marker.id}
								coordinate={marker.coordinate}
								buildingId={marker.buildingId}
								floor={marker.floor}
							>
								<TouchableOpacity style={styles.marker}>
									<Image
										source={require('./assets/startPoint.png')}
										style={{ width: '100%', height: '100%' }}
									/>
								</TouchableOpacity>
							</MapxusSdk.MapxusPointAnnotationView>
						))
					}
					<MapxusSdk.RouteView ref={routeRef} />
					<MapxusSdk.NavigationView
						ref={naviRef}
						adsorbable={true}
						shortenable={true}
					/>
				</MapxusSdk.MapxusMap>
			</View>
			<ParamsScrollView>
				<View style={styles.controller}>
					<SegmentedControl
						values={['foot', 'wheelchair']}
						onValueChange={setVehicle}
					/>
					<WhiteSpace />
					<View style={styles.inner}>
						<Text style={styles.fontStyle}>toDoor</Text>
						<Switch checked={isToDoor} onChange={setIsToDoor} />
					</View>
				</View>
			</ParamsScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
		paddingHorizontal: 10,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around'
	},
	button: {
		borderWidth: 0,
		height: 'auto',
		paddingVertical: 8,
		justifyContent: 'center'
	},
	button_white: {
		width: 192,
		borderWidth: 1,
		borderColor: '#ccc',
	},
	button_white_active: {
		backgroundColor: '#7393e7'
	},
	button_blue_wrapper: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	controller: {
		backgroundColor: '#fff',
		paddingHorizontal: 60,
		marginTop: 15
	},
	inner: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	fontStyle: {
		fontSize: 18,
		marginRight: 10
	},
	marker: {
		width: 30,
		height: 85
	}
});
