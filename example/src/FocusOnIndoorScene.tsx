import React, {useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import MapxusSdk, { MapRenderer } from '@mapxus/react-native-mapxus-sdk';
import {Button, InputItem, List} from '@ant-design/react-native';
import ParamsScrollView from './ParamsScrollView';

export default function FocusOnIndoorScene() {
	const [buildingId, setBuildingId] = useState('harbourcity_hk_8b580b');
	const [floor, setFloor] = useState('L3');
	const mapRef = useRef<MapxusSdk.MapxusMap>(null);

	function handleClick() {
		mapRef.current?.selectIndoorScene(
			MapxusSdk.MapxusZoomMode.ANIMATED,
			{top: 0, left: 0, bottom: 0, right: 0},
			buildingId.trim(),
			floor.trim()
		);
	}

	return (
		<View style={{flex: 1}}>
			<View style={{flex: 3}}>
				<MapxusSdk.MapxusMap
					ref={mapRef}
					mapOption={{buildingId: 'tsuenwanplaza_hk_369d01'}}
				>
					<MapRenderer.MapboxGL.MapView style={{flex: 1}}/>
				</MapxusSdk.MapxusMap>
			</View>
			<ParamsScrollView>
				<List style={{marginTop: 10}}>
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
				</List>
				<Button
					type={'primary'}
					style={[styles.button, {marginTop: 15}]}
					onPress={handleClick}
				>
					Switch
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
		marginTop: 5,
		marginLeft: 15,
		marginRight: 15,
		paddingVertical: 8,
		textAlign: 'center'
	}
});
