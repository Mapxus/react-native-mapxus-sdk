import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import MapxusSdk, {
	OrientationPoiSearchProps,
	Poi,
	PoiSearchResult,
	ReverseGeoCodeSearchProps,
	GeocodeSearchResult,
	InputLocation,
	AndroidSimulateLocation,
	AndroidInputLocation
} from '@mapxus/react-native-mapxus-sdk';
import ParamsScrollView from './ParamsScrollView';
import { Button, InputItem, List } from '@ant-design/react-native';
import language from './utils/language';


interface PageLocation {
	lat: number;
	lon: number;
	ordinal?: number;
	angle?: number;
	buildingId?: string;
	floor?: string;
}

export default function SurroundingIdentification() {
	const [ordinal, setOrdinal] = useState('0');
	const [floor, setFloor] = useState('L1');
	const [buildingId, setBuildingId] = useState('tsuenwanplaza_hk_369d01');
	const [coordinate, setCoordinate] = useState('114.111375, 22.370787');

	const [distance, setDistance] = useState('30');
	const [sort, setSort] = useState('Point');

	const [markers, setMarkers] = useState<Array<any>>([]);
	const [location, setLocation] = useState<PageLocation | null>(null);

	const [centerCoordinate, setCenterCoordinate] = useState([0, 0]);

	const refSortButton = useRef(null);
	const locationRef = useRef<MapxusSdk.SimulateLocationManager>(null);

	function handleSort(ref: any) {
		setSort(ref?.props.children === 'Point' && 'Polygon' || 'Point');
	}

	function handleShow() {
		const coor = coordinate.split(coordinate.includes(',') ? ',' : '，');

		if (coor.length === 2) {
			const num_coordinate: Array<number> = coor.map(c => Number(c.trim()));
			var simulate: InputLocation = {
				ordinal: Number(ordinal),
				latitude: num_coordinate[1],
				longitude: num_coordinate[0]
			}
			var simulateAndroid: AndroidInputLocation = {
				floor: floor,
				buildingId: buildingId,
				latitude: num_coordinate[1],
				longitude: num_coordinate[0]
			}
			if (Platform.OS == 'android') {
				locationRef.current?.setSimulateLocation(simulateAndroid);
			} else {
				locationRef.current?.setSimulateLocation(simulate);
			}
			setCenterCoordinate(num_coordinate);
		}
	}

	function handleUpdate(feature: any) {
		if ('buildingId' in feature) {
			const location: AndroidSimulateLocation = feature
			setLocation({
				lat: location.latitude,
				lon: location.longitude,
				angle: location.orientation,
				buildingId: location.buildingId,
				floor: location.floor
			})
		} else {
			const location: MapxusSdk.Location = feature
			setLocation({
				lat: location.coords.latitude,
				lon: location.coords.longitude,
				ordinal: location.coords.ordinal,
				angle: location.coords.heading,
			})
		}
	}

	async function getPoisNearby(params: OrientationPoiSearchProps): Promise<Poi[]> {		
		const data: PoiSearchResult = await MapxusSdk.poiSearchManager.orientationPoiSearch(params);
		return data?.pois || [];
	}

	async function getReverseGeoCode(params: ReverseGeoCodeSearchProps): Promise<GeocodeSearchResult> {
		const data: GeocodeSearchResult = await MapxusSdk.geocodeSearchManager.reverseGeoCode(params);
		return data || {};
	}

	async function handleSearch() {
		if (location) {
			var locationParams: PageLocation = {lat: 0.0, lon: 0.0};

			if (Platform.OS == 'ios') {
				const scenes: GeocodeSearchResult = await getReverseGeoCode({
					location: { latitude: location.lat, longitude: location.lon },
					ordinalFloor: location.ordinal!
				});
				
				if (scenes.floor != null) {					
					locationParams = {
						lat: location.lat,
						lon: location.lon,
						buildingId: scenes.building.buildingId,
						floor: scenes.floor.code,
						angle: location.angle,
					};
				}
			}
			if (Platform.OS == 'android') {
				locationParams = {
					lat: location.lat,
					lon: location.lon,
					floor: location.floor,
					buildingId: location.buildingId,
					angle: location.angle
				};
			}			

			const pois: Array<Poi> = await getPoisNearby({
				center: { latitude: locationParams.lat!, longitude: locationParams.lon! },
				distance: Number(distance.trim()),
				buildingId: locationParams.buildingId!,
				floor: locationParams.floor!,
				angle: locationParams.angle!,
				distanceSearchType: sort
			});

			let _markers: Array<any> = [];
			if (pois.length) {
				setMarkers([])
				const lang: string = (language === 'zh-Hans' && 'cn') || (language === 'zh-Hant' && 'zh') || language;
				pois.forEach((poi: Poi | any) => {
					let sub: string = '';
					if (poi.angle > 315 || poi.angle <= 44) {
						sub = "In the front";
					} else if (poi.angle > 44 && poi.angle <= 134) {
						sub = "On the right";
					} else if (poi.angle > 134 && poi.angle <= 224) {
						sub = "In the back";
					} else if (poi.angle > 224 && poi.angle <= 314) {
						sub = "On the left";
					}
					_markers = _markers.concat(
						{
							coordinate: [Number(poi?.location?.longitude), Number(poi?.location?.latitude)],
							name: poi[`name_${lang}`] + sub || poi.name_default + sub,
							buildingId: poi.buildingId,
							floor: poi.floor
						}
					);
				});
			}
			setMarkers(_markers);
		}
	}

	return (
		<View style={{ flex: 1 }}>
			<View style={{ flex: 2 }}>
				<MapxusSdk.MapxusMap>
					<MapxusSdk.MapView style={{ flex: 1 }} >
						<MapxusSdk.Camera
							centerCoordinate={centerCoordinate}
							zoomLevel={19}
						/>
					</MapxusSdk.MapView>
					<MapxusSdk.SimulateLocationManager
						showsUserHeadingIndicator={true}
						ref={locationRef}
						onUpdate={handleUpdate}
					/>
					{
						markers.length
							? markers.map((marker, idx) => (
								<MapxusSdk.MapxusPointAnnotationView
									key={idx}
									id={`${idx}`}
									coordinate={marker.coordinate}
									buildingId={marker.buildingId}
									floor={marker.floor}
									title={marker.name}
								>
									<MapxusSdk.Callout title={marker.name} />
								</MapxusSdk.MapxusPointAnnotationView>
							)) : null
					}
				</MapxusSdk.MapxusMap>
			</View>
			<ParamsScrollView>
				<List style={{ marginTop: 10 }}>
					{
						Platform.OS == 'ios'
							?
							<InputItem
								labelNumber={5}
								style={styles.input}
								value={ordinal}
								onChange={setOrdinal}
							>
								ordinal:
							</InputItem>
							:
							<View>
								<InputItem
									labelNumber={5}
									style={styles.input}
									value={buildingId}
									onChange={setBuildingId}
								>
									buildingId:
								</InputItem>
								<InputItem
									labelNumber={5}
									style={styles.input}
									value={floor}
									onChange={setFloor}
								>
									floor:
								</InputItem>
							</View>
					}

					<InputItem
						labelNumber={5}
						style={styles.input}
						placeholder={'lon, lat'}
						value={coordinate}
						onChange={setCoordinate}
					>
						coordinate:
					</InputItem>
					<Button
						type={'primary'}
						style={[styles.button, { marginBottom: 10 }]}
						onPress={handleShow}
					>
						Show Simulate Location
					</Button>
					<InputItem
						labelNumber={5}
						style={styles.input}
						value={distance}
						onChange={setDistance}
					>
						distance:
					</InputItem>
				</List>
				<View style={styles.sort_container}>
					<Text style={styles.text}>distanceSearchType:</Text>
					<Button
						ref={refSortButton}
						type={'primary'}
						style={[styles.button, { flex: 1 }]}
						onPress={() => handleSort(refSortButton.current)}
					>
						{sort}
					</Button>
				</View>
				<Button
					type={'primary'}
					style={[styles.button, { marginBottom: 10 }]}
					onPress={handleSearch}
				>
					Search
				</Button>
			</ParamsScrollView>
		</View>
	);
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
	},
	text: {
		marginLeft: 15,
		marginRight: 10,
		fontSize: 18
	},
	sort_container: {
		flexDirection: 'row',
		alignItems: 'center'
	}
});
