import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import MapxusSdk, {
	OrientationPoiSearchProps,
	Poi,
	PoiSearchResult,
	ReverseGeoCodeSearchProps,
	GeocodeSearchResult, AndroidLocation
} from '@mapxus/react-native-mapxus-sdk';
import ParamsScrollView from './ParamsScrollView';
import {Button, InputItem, List} from '@ant-design/react-native';
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
	const [androidAngle, setAndroidAngle] = useState(0.0);

	const refSortButton = useRef(null);

	function handleSort(ref: any) {
		setSort(ref?.props.children === 'Point' && 'Polygon' || 'Point');
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
		if (isIndoor && location) {
			if (Platform.OS == 'ios') {
				const scenes: GeocodeSearchResult = await getReverseGeoCode({
					location: {latitude: location.lat, longitude: location.lon},
					ordinalFloor: location.ordinal!
				});

				if (scenes.floor != null) {
					setLocation({
						lat: location.lat,
						lon: location.lon,
						angle: location.angle,
						buildingId: scenes.building.buildingId,
						floor: scenes.floor.code
					})
				}
			}
			if (Platform.OS == 'android') {
				setLocation({
					lat: location.lat,
					lon: location.lon,
					floor: location.floor,
					buildingId: location.buildingId,
					angle: androidAngle
				})
			}

			const pois: Array<Poi> = await getPoisNearby({
				center: {latitude: location.lat, longitude: location.lon},
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
							name: poi[`name_${lang}`] + sub,
							buildingId: poi.buildingId,
							floor: poi.floor
						}
					);
				});
			}
			setMarkers(_markers);
		}
	}

	function handleUpdate(location: MapxusSdk.Location) {
		setLocation({
			lat: location.coords.latitude,
			lon: location.coords.longitude,
			ordinal: location.coords.ordinal,
			angle: location.coords.heading
		});
	}

	function handleChange(location: AndroidLocation) {
		setLocation({
			lat: location.latitude,
			lon: location.longitude,
			floor: location.floor,
			buildingId: location.buildingId,
			angle: androidAngle,
		});
	}

	return (
		<View style={{flex: 1}}>
			<View style={{flex: 3}}>
				<MapxusSdk.MapxusMap onIndoorStatusChange={object => setIsIndoor(object.flag)}>
					<MapxusSdk.MapView style={{flex: 1}}>
						{
							Platform.OS == 'ios'
								? <View>
									<MapxusSdk.Camera
										followUserMode={'normal'}
										followUserLocation={true}
									/>
									<MapxusSdk.UserLocation
										renderMode={'native'}
										visible={true}
										showsUserHeadingIndicator={true}
										onUpdate={handleUpdate}
									/>
								</View>
								: null
						}
					</MapxusSdk.MapView>
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
									<MapxusSdk.Callout title={marker.name}/>
								</MapxusSdk.MapxusPointAnnotationView>
							)) : null
					}
					{
						Platform.OS == 'android'
							? <MapxusSdk.MapxusMapLocation
								followUserMode={1}
								onLocationStarted={() => {
									// console.log("start")
								}}
								onLocationStopped={() => {
									// console.log("stop")
								}}
								onLocationError={data => {
									// console.log(data)
								}}
								onCompassChange={data => setAndroidAngle(data.orientation)}
								onLocationChange={handleChange}
							/>
							: null
					}
				</MapxusSdk.MapxusMap>
			</View>
			<ParamsScrollView>
				<List style={{marginTop: 10}}>
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
						style={[styles.button, {flex: 1}]}
						onPress={() => handleSort(refSortButton.current)}
					>
						{sort}
					</Button>
				</View>
				<Button
					type={'primary'}
					style={[styles.button, {marginBottom: 10}]}
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
