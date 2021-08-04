import React, {useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import MapxusSdk, {Building} from '@mapxus/react-native-mapxus-sdk';
import {Button, InputItem, List} from '@ant-design/react-native';
import ParamsScrollView from './ParamsScrollView';
import turfBboxPolygon from '@turf/bbox-polygon';
import {BBox, Polygon} from '@turf/helpers';
import {Feature} from 'geojson';
import language from './utils/language';

export default function SearchBuildingInBound() {
	const [words, setWords] = useState('');
	const [southWest, setSouthWest] = useState('114.158608, 22.292540');
	const [northEast, setNorthEast] = useState('114.172422, 22.310600');
	const [offset, setOffset] = useState('10');
	const [page, setPage] = useState('1');
	const [markers, setMarkers] = useState<Array<any>>([]);
	const [boundPolygon, setBoundPolygon] = useState<GeoJSON.Feature | null>(null);
	const cameraRef = useRef<MapxusSdk.Camera>(null);

	async function handleClick() {
		const sw: Array<string> = southWest.split(southWest.includes(',') ? ',' : '，');
		const ne: Array<string> = northEast.split(northEast.includes(',') ? ',' : '，');

		if (sw.length === 2 && ne.length === 2) {
			const num_sw: Array<number> = sw.map(s => Number(s.trim()));
			const num_ne: Array<number> = ne.map(s => Number(s.trim()));

			const data = await MapxusSdk.buildingSearchManager.buildingSearchOnBbox({
				bbox: {
					min_longitude: num_sw[0],
					min_latitude: num_sw[1],
					max_longitude: num_ne[0],
					max_latitude: num_ne[1]
				},
				keywords: words.trim(),
				offset: Number(offset.trim()),
				page: Number(page.trim())
			});
			const buildings: Building[] = data?.buildings;

			if (buildings?.length) {
				const lang: string = (language === 'zh-Hans' && 'cn') || (language === 'zh-Hant' && 'zh') || language;
				const _markers: Array<any> = buildings.map((b: Building | any) => (
					{
						coordinate: [Number(b?.labelCenter?.longitude), Number(b?.labelCenter?.latitude)],
						name: b[`name_${lang}`]
					}
				));

				setMarkers(_markers);

				const bbox: BBox = [num_sw[0], num_sw[1], num_ne[0], num_ne[1]];
				const bboxPolygon: Feature<Polygon> = turfBboxPolygon(bbox);
				setBoundPolygon(bboxPolygon);

				cameraRef.current?.fitBounds(
					num_ne,
					num_sw,
					50
				);
			}
		} else {
			console.log('输入格式有误');
		}
	}

	return (
		<View style={{flex: 1}}>
			<View style={{flex: 2}}>
				<MapxusSdk.MapxusMap mapOption={{buildingId: 'tsuenwanplaza_hk_369d01'}}>
					<MapxusSdk.MapView style={{flex: 1}}>
						<MapxusSdk.Camera ref={cameraRef}/>
						{
							boundPolygon
								? <MapxusSdk.ShapeSource
									id={'customSourceSample'}
									shape={boundPolygon}
								>
									<MapxusSdk.FillLayer
										id={'customLayerSample'}
										style={{fillOpacity: 0.3}}
									/>
								</MapxusSdk.ShapeSource>
								: null
						}
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
						value={southWest}
						onChange={setSouthWest}
					>
						southWest:
					</InputItem>
					<InputItem
						labelNumber={5}
						style={styles.input}
						value={northEast}
						onChange={setNorthEast}
					>
						northEast:
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
		</View>
	)
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
		marginBottom: 10,
		marginHorizontal: 15
	},
});
