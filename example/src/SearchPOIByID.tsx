import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import MapxusSdk, {Poi, PoiSearchResult} from '@mapxus/react-native-mapxus-sdk';
import {Button, List, InputItem} from '@ant-design/react-native';
import ParamsScrollView from './ParamsScrollView';
import language from './utils/language';

export default function SearchPOIByID() {
	const [poiIds, setPoiIds] = useState('12602, 12620');
	const [markers, setMarkers] = useState<Array<any>>([]);

	async function handleClick() {
		if (poiIds.trim().length) {
			const ids: Array<string> = poiIds
				.split(poiIds.includes(',') ? ',' : '，')
				.map(id => id.trim());
			const data: PoiSearchResult = await MapxusSdk.poiSearchManager.poiSearchByIds({
				POIIds: ids
			});
			const pois: Array<Poi> = data?.pois;

			if (pois.length) {
				setMarkers([])
				const lang: string = (language === 'zh-Hans' && 'cn') || (language === 'zh-Hant' && 'zh') || language;
				const _markers: Array<any> = pois.map((poi: Poi | any) => (
					{
						coordinate: [Number(poi?.location?.longitude), Number(poi?.location?.latitude)],
						name: poi[`name_${lang}`] || poi.name_default,
						buildingId: poi.buildingId,
						floor: poi.floor
					}
				));
				setMarkers(_markers);
			}
		}
	}

	return (
		<View style={{flex: 1}}>
			<View style={{flex: 4}}>
				<MapxusSdk.MapxusMap mapOption={{buildingId: 'tsuenwanplaza_hk_369d01'}}>
					<MapxusSdk.MapView style={{flex: 1}}/>
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
									<MapxusSdk.Callout title={marker.name}/>
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
						value={poiIds}
						onChange={setPoiIds}
					>
						POIIds:
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

