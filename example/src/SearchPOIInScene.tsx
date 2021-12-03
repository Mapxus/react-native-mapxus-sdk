import React, {useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import MapxusSdk, {MapRenderer, Poi, PoiSearchInIndoorSceneProps} from '@mapxus/react-native-mapxus-sdk';
import {ActivityIndicator, Button, InputItem, List} from '@ant-design/react-native';
import ParamsScrollView from './ParamsScrollView';
import language from './utils/language';

export default function SearchPOIInScene() {
	const [words, setWords] = useState('');
	const [category, setCategory] = useState('');
	const [buildingId, setBuildingId] = useState('tsuenwanplaza_hk_369d01');
	const [floor, setFloor] = useState('L3');
	const [offset, setOffset] = useState('10');
	const [page, setPage] = useState('1');
	const [loading, setLoading] = useState(false);
	const [markers, setMarkers] = useState<Array<any>>([]);
	const mapRef = useRef<MapxusSdk.MapxusMap>(null);

	async function handleClick() {
		setLoading(true);
		const pois: Array<Poi> = await getPOIs({
			buildingId: buildingId.trim(),
			floor: floor.trim(),
			keywords: words.trim(),
			category: category.trim(),
			offset: Number(offset.trim()),
			page: Number(page.trim())
		});
		if (pois.length) {
			setMarkers([])
			const lang: string = (language === 'zh-Hans' && 'cn') || (language === 'zh-Hant' && 'zh') || language;
			const _markers: Array<any> = pois.map((poi: Poi | any) => (
				{
					coordinate: [Number(poi?.location?.longitude), Number(poi?.location?.latitude)],
					name: poi[`name_${lang}`] || poi.name_default,
					buildingId: poi.buildingId,
					floor: poi.floor.code
				}
			));
			setMarkers(_markers);
			switchIndoorScene(buildingId.trim(), floor.trim());
		}
		setLoading(false);
	}

	function switchIndoorScene(buildingId: string, floor: string) {
		mapRef.current?.selectIndoorScene(
			MapxusSdk.MapxusZoomMode.ANIMATED,
			{top: 0, left: 0, bottom: 0, right: 0},
			buildingId,
			floor
		);
	}

	return (
		<View style={{flex: 1}}>
			<View style={{flex: 2}}>
				<MapxusSdk.MapxusMap
					ref={mapRef}
					mapOption={{buildingId: 'tsuenwanplaza_hk_369d01'}}
				>
					<MapRenderer.MapboxGL.MapView style={{flex: 1}}/>
					{
						markers.length
							? markers.map(marker => (
								<MapxusSdk.MapxusPointAnnotationView
									key={JSON.stringify(marker.coordinate)}
									id={JSON.stringify(marker.coordinate)}
									coordinate={marker.coordinate}
									buildingId={marker.buildingId}
									floor={marker.floor}
									title={marker.name}
								>
									<MapRenderer.MapboxGL.Callout title={marker.name}/>
								</MapxusSdk.MapxusPointAnnotationView>
							)) : null
					}
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
						value={category}
						onChange={setCategory}
					>
						category:
					</InputItem>
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
				<ActivityIndicator
					toast
					animating={loading}
					size='large'
				/>
			</View>
		</View>
	);
}

async function getPOIs(params: PoiSearchInIndoorSceneProps): Promise<Poi[]> {
	const data = await MapxusSdk.poiSearchManager.poiSearchInIndoorScene(params);
	return data?.pois || [];
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
		paddingVertical: 8
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
