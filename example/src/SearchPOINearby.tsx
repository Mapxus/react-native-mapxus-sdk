import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapxusSdk, {Poi, PoiSearchNearbyProps} from '@mapxus/react-native-mapxus-sdk';
import {ActivityIndicator, Button, InputItem, List} from '@ant-design/react-native';
import ParamsScrollView from './ParamsScrollView';
import {map as _map} from 'lodash';
import language from './utils/language';

export default function SearchPOINearby() {
	const [words, setWords] = useState('');
	const [category, setCategory] = useState('');
	const [buildingId, setBuildingId] = useState('tsuenwanplaza_hk_369d01');
	const [ordinal, setOrdinal] = useState('0');
	const [center, setCenter] = useState('114.111375, 22.370787');
	const [distance, setDistance] = useState('10');
	const [offset, setOffset] = useState('10');
	const [page, setPage] = useState('1');
	const [sort, setSort] = useState('AbsoluteDistance');
	const [loading, setLoading] = useState(false);
	const [markers, setMarkers] = useState<Array<any>>([]);
	const refSortButton = useRef(null);

	async function handleClick() {
		setLoading(true);

		const [lon, lat] = _map(
			center.split(center.includes(',') ? ',' : '，'),
			s => Number(s.trim())
		);
		const pois: Array<Poi> = await getPOIs({
			offset: Number(offset.trim()),
			page: Number(page.trim()),
			keywords: words.trim(),
			category: category.trim(),
			center: {longitude: lon, latitude: lat},
			meterDistance: Number(distance.trim()),
			buildingId: buildingId.trim(),
			ordinal: Number(ordinal.trim()),
			sort
		});

		if (pois.length) {
			const lang: string = (language === 'zh-Hans' && 'cn') || (language === 'zh-Hant' && 'zh') || language;
			const _markers: Array<any> = pois.map((poi: Poi | any) => (
				{
					coordinate: [Number(poi?.location?.longitude), Number(poi?.location?.latitude)],
					name: poi[`name_${lang}`],
					buildingId: poi.buildingId,
					floor: poi.floor
				}
			));

			setMarkers(_markers);
			setLoading(false);
		}
	}

	function handleSort(ref: any) {
		setSort(ref?.props.children === 'ActualDistance' && 'AbsoluteDistance' || 'ActualDistance');
	}

	return (
		<View style={{flex: 1}}>
			<View style={{flex: 2}}>
				<MapxusSdk.MapxusMap mapOption={{buildingId: 'tsuenwanplaza_hk_369d01'}}>
					<MapxusSdk.MapView style={{flex: 1}}/>
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
				</MapxusSdk.MapxusMap>
			</View>
			<ParamsScrollView>
				<List>
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
						value={ordinal}
						onChange={setOrdinal}
					>
						ordinal:
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
						labelNumber={7}
						style={styles.input}
						value={distance}
						onChange={setDistance}
					>
						meterDistance:
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
				<View style={styles.sort_container}>
					<Text style={styles.text}>sort:</Text>
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
					style={[styles.button, {marginTop: 15}]}
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

async function getPOIs(params: PoiSearchNearbyProps): Promise<Poi[]> {
	const data = await MapxusSdk.poiSearchManager.poiSearchNearbyCenter(params);
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
		marginTop: 5,
		marginLeft: 15,
		marginRight: 15,
		paddingVertical: 8,
		textAlign: 'center'
	},
	text: {
		fontSize: 18,
		marginHorizontal: 15
	},
	sort_container: {
		flexDirection: 'row',
		alignItems: 'center'
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
