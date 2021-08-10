import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import MapxusSdk, {
	OrientationPoiSearchProps,
	Poi,
	PoiSearchResult,
	ReverseGeoCodeSearchProps,
	GeocodeSearchResult,
	InputLocation
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
	const [distance, setDistance] = useState('30');
	const [markers, setMarkers] = useState<Array<any>>([]);
	const [sort, setSort] = useState('Point');
	const [location, setLocation] = useState<PageLocation | null>(null);
	const [isIndoor, setIsIndoor] = useState(false);
	const [ordinal, setOrdinal] = useState('0');
	const [coordinate, setCoordinate] = useState('114.111375, 22.370787');
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
			locationRef.current?.setSimulateLocation(simulate);
			setCenterCoordinate(num_coordinate);
		}
	}

	function handleUpdate(feature: MapxusSdk.Location) {
		setLocation({
			lat: feature.coords.latitude,
			lon: feature.coords.longitude,
			ordinal: feature.coords.ordinal,
			angle: feature.coords.heading,
		})
	}

	async function getPoisNearby(params: OrientationPoiSearchProps): Promise<Poi[]> {
		const data: PoiSearchResult = await MapxusSdk.poiSearchManager.orientationPoiSearch(params);
		return data?.pois || [];
	}

	async function getReverseGeoCode(params: ReverseGeoCodeSearchProps): Promise<GeocodeSearchResult> {
		const data: GeocodeSearchResult = await MapxusSdk.geocodeSearchManager.reverseGeoCode(params);
		// console.log(data);
		
		return data || {};
	}

	async function handleSearch() {

		if (isIndoor && location) {
			if (Platform.OS == 'ios') {
				const scenes: GeocodeSearchResult = await getReverseGeoCode({
					location: { latitude: location.lat, longitude: location.lon },
					ordinalFloor: location.ordinal!
				});
				// console.log(scenes);

				if (scenes.floor != null) {
					setLocation({
						lat: location.lat,
						lon: location.lon,
						angle: location.angle,
						ordinal: location.ordinal,
						buildingId: scenes.building.buildingId,
						floor: scenes.floor.code
					})
					
					// console.log(location);
					
				}
			}
			if (Platform.OS == 'android') {
				setLocation({
					lat: location.lat,
					lon: location.lon,
					floor: location.floor,
					buildingId: location.buildingId,
					angle: location.angle
				})
			}
			// console.log(location);
			
			const pois: Array<Poi> = await getPoisNearby({
				center: { latitude: location.lat!, longitude: location.lon! },
				distance: Number(distance.trim()),
				buildingId: location.buildingId!,
				floor: location.floor!,
				angle: location.angle!,
				distanceSearchType: sort
			});

			let _markers: Array<any> = [];
			if (pois.length) {
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
							name: poi[`name_${lang}`] || poi.name_default + sub,
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
				<MapxusSdk.MapxusMap onIndoorStatusChange={object => setIsIndoor(object.flag)}>
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
					<InputItem
						labelNumber={5}
						style={styles.input}
						value={ordinal}
						onChange={setOrdinal}
					>
						ordinal:
					</InputItem>
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
