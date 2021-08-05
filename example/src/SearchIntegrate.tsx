import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import MapxusSdk, {
	Category,
	GeoBuilding,
	IndoorSceneChangeObject,
	Poi,
	POICategorySearchProps
} from '@mapxus/react-native-mapxus-sdk';
import {Button} from '@ant-design/react-native';
import ParamsScrollView from './ParamsScrollView';
import language from './utils/language';
import poiType from './utils/poiTypeData';
import {map as _map} from 'lodash';

const lang: string = (language === 'zh-Hans' && 'cn') || (language === 'zh-Hant' && 'zh') || language;

export default function SearchIntegrate() {
	const [controllerStatus, setControllerStatus] = useState(0);
	const [buildingName, setBuildingName] = useState('');
	const [buildingId, setBuildingId] = useState('harbourcity_hk_8b580b');
	const [categories, setCategories] = useState<Array<Category | any>>([]);
	const [categoryType, setCategoryType] = useState('');
	const [categoryName, setCategoryName] = useState('');
	const [pois, setPois] = useState<Array<Poi | any>>([]);
	const [marker, setMarker] = useState<any>(null);

	const mapRef = useRef<MapxusSdk.MapxusMap>(null);
	const cameraRef = useRef<MapxusSdk.Camera>(null);

	useEffect(() => {
		if (controllerStatus === 1 && marker) {
			setMarker(null);
		}
	}, [controllerStatus]);

	function indoorSceneChange(feature: IndoorSceneChangeObject) {
		setBuildingId(feature?.building?.identifier);

		const building: GeoBuilding | any = feature?.building;
		setBuildingName(building ? building[`name_${lang}`] : '');
	}

	async function handleExplore() {
		setControllerStatus(controllerStatus + 1);

		const categories: Array<Category> = await getPOICategory({buildingId});
		setCategories(categories);
	}

	function handleClose() {
		setControllerStatus(controllerStatus - 1);
	}

	async function searchPOIs(category: string, name: string) {
		setCategoryType(category);
		setCategoryName(name);

		const total: number = await getPOIsTotal(buildingId, category);
		const pois = await searchPOIsByCategory(buildingId, category, total);
		setPois(pois);
		setControllerStatus(controllerStatus + 1);
	}

	function clickPOI(poi: Poi | any) {
		const buildingId = poi.buildingId;
		const floor = poi.floor;
		const coordinate = [poi.location.longitude, poi.location.latitude];

		setMarker({
			buildingId,
			floor,
			name: poi[`name_${lang}`],
			coordinate
		});

		mapRef.current?.selectIndoorScene(
			MapxusSdk.MapxusZoomMode.DISABLE,
			{top: 0, left: 0, bottom: 0, right: 0},
			buildingId,
			floor
		);

		cameraRef.current?.moveTo(coordinate);
		cameraRef.current?.zoomTo(19);
	}

	return (
		<View style={{flex: 1}}>
			<View style={{flex: controllerStatus ? 2 : 8}}>
				<MapxusSdk.MapxusMap
					ref={mapRef}
					mapOption={{buildingId: 'harbourcity_hk_8b580b'}}
					onIndoorSceneChange={indoorSceneChange}
				>
					<MapxusSdk.MapView style={{flex: 1}}>
						<MapxusSdk.Camera ref={cameraRef}/>
					</MapxusSdk.MapView>
					{
						marker
							? <MapxusSdk.MapxusPointAnnotationView
								key={JSON.stringify(marker.coordinate)}
								id={JSON.stringify(marker.coordinate)}
								coordinate={marker.coordinate}
								buildingId={marker.buildingId}
								floor={marker.floor}
								title={marker.name}
							>
								<MapxusSdk.Callout title={marker.name}/>
							</MapxusSdk.MapxusPointAnnotationView>
							: null
					}
				</MapxusSdk.MapxusMap>
			</View>
			<ParamsScrollView>
				{
					controllerStatus === 0
						? <Button
							type='primary'
							style={styles.button}
							onPress={handleExplore}
						>
							Explore Harbour City
						</Button>
						: <View style={{margin: 15}}>
							<View style={styles.category_header}>
								<TouchableOpacity
									style={styles.close_icon}
									onPress={handleClose}
								>
									<Image
										source={require('./assets/close.png')}
										style={styles.close_icon_img}
									/>
								</TouchableOpacity>
								<Text style={styles.building_name}>
									{
										controllerStatus === 1
											? buildingName
											: categoryName
									}
								</Text>
							</View>
							<View>
								{
									controllerStatus === 1
										? renderCategoriesList(categories, searchPOIs)
										: renderPOIsByCategory(pois, categoryType, categoryName, clickPOI)
								}
							</View>
						</View>
				}
			</ParamsScrollView>
		</View>
	)
}

function renderCategoriesList(
	data: Array<Category | any>,
	listItemOnClick: (category: string, categoryName: string) => void
) {
	return (
		_map(data, (d, index) => {
			return (
				<TouchableOpacity
					key={index}
					onPress={() => listItemOnClick(d.category, d[`title_${lang}`])}
				>
					<View style={styles.list_item}>
						{poiType[d.category || 'unspecified'] || poiType['unspecified']}
						<Text style={styles.category_name}>{d[`title_${lang}`]}</Text>
					</View>
				</TouchableOpacity>
			)
		})
	);
}

function renderPOIsByCategory(
	data: Array<Poi | any>,
	categoryType: string,
	categoryName: string,
	poiOnClick: (poi: Poi) => void
) {
	return (
		_map(data, (d, index) => {
			return (
				<TouchableOpacity
					key={index}
					onPress={() => poiOnClick(d)}
				>
					<View style={styles.list_item}>
						{poiType[categoryType || 'unspecified'] || poiType['unspecified']}
						<View>
							<Text style={styles.category_name}>{d[`name_${lang}`]}</Text>
							<Text
								style={styles.sub_name}>{`${categoryName} . ${d.floor}`}</Text>
						</View>
					</View>
				</TouchableOpacity>
			)
		})
	);
}

async function getPOICategory(params: POICategorySearchProps) {
	const data = await MapxusSdk.poiCategorySearchManager.poiCategorySearch(params);
	return data?.category || [];
}

async function getPOIsTotal(buildingId: string, category: string) {
	const data = await MapxusSdk.poiSearchManager.poiSearchInIndoorScene(
		{buildingId, category, offset: 1, page: 1}
	);
	return data.total || 0;
}

async function searchPOIsByCategory(buildingId: string, category: string, offset: number) {
	const data = await MapxusSdk.poiSearchManager.poiSearchInIndoorScene(
		{buildingId, category, offset, page: 1}
	);
	return data?.pois || [];
}

const styles = StyleSheet.create({
	controller: {
		backgroundColor: '#fff',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	inner: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	fontStyle: {
		marginLeft: 5,
		fontSize: 17
	},
	button: {
		backgroundColor: '#74aded',
		borderWidth: 0,
		borderRadius: 15,
		width: '90%',
		height: 'auto',
		marginTop: 15,
		paddingVertical: 8,
		paddingHorizontal: 10,
		alignSelf: 'center'
	},
	category_header: {
		position: 'relative',
		marginBottom: 8
	},
	building_name: {
		color: 'rgba(0, 0, 0, 0.9)',
		fontSize: 18,
		fontWeight: 'bold'
	},
	close_icon: {
		position: 'absolute',
		top: -6,
		right: -2,
		width: 32,
		height: 32,
		zIndex: 1
	},
	close_icon_img: {
		position: 'absolute',
		right: 0,
		width: '90%',
		height: '90%'
	},
	list_item: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderColor: '#d2d2d2'
	},
	category_name: {
		fontSize: 16
	},
	sub_name: {
		color: 'gray',
		fontSize: 13
	}
});
