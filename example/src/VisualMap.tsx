import React, {useRef, useState, useEffect} from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import MapxusSdk, {IndoorSceneChangeObject, VisualSearchProps} from '@mapxus/react-native-mapxus-sdk';

async function getVisualNodes(params: VisualSearchProps) {
	const data: Array<any> = await MapxusSdk.visualSearchManager.searchVisualDataInBuilding(params);
	return data;
}

export default function VisualMap() {
	const [buildingId, setBuildingId] = useState<string>('tsuenwanplaza_hk_369d01');
	const [floor, setFloor] = useState<string>('');
	const [active, setActive] = useState(false);
	const [nodes, setNodes] = useState<Array<any>>([]);
	const [lightMarker, setLightMarker] = useState<any>(null);
	const nodeViewRef = useRef<MapxusSdk.VisualNodeView>(null);
	const visualViewRef = useRef<MapxusSdk.VisualView>(null);

	useEffect(() => {
		initVisualData({buildingId, scope: 1});
	}, []);

	useEffect(() => {
		if (active && nodes.length) {
			renderVisualNodes(nodes);
			filterVisualNodes(buildingId, floor);
		} else {
			nodeViewRef.current?.cleanLayer();
		}
	}, [active]);

	useEffect(() => {
		if (active) {
			filterVisualNodes(buildingId, floor);
		}
	}, [floor]);

	useEffect(() => {
		if (buildingId.length && active) {
			initVisualData({buildingId, scope: 1});
		} else {
			nodeViewRef.current?.cleanLayer();
		}
	}, [buildingId]);

	async function initVisualData(params: VisualSearchProps) {
		const data: Array<any> = await getVisualNodes(params);
		const _nodes = data.length ? data.reduce((pre, cur) => pre.concat(cur.nodes), []) : [];
		setNodes(_nodes);
	}

	function renderVisualNodes(nodes: Array<any>) {
		nodeViewRef.current?.renderFlagUsingNodes(nodes);
	}

	function filterVisualNodes(buildingId: string, floor: string) {
		nodeViewRef.current?.changeOn(buildingId, floor);
	}

	function indoorSceneChange(feature: IndoorSceneChangeObject) {
		setBuildingId(feature?.building?.identifier || '');
		setFloor(feature?.floor || '');
	}

	function clickNode(feature: any) {
		setLightMarker(feature);

		const imgId: string = feature?.key;
		if (imgId) {
			renderVisualView(imgId);
		}
	}

	function renderVisualView(imageId: string) {
		visualViewRef.current?.loadVisualViewWithFristImg(imageId);
	}

	return (
		<View style={{flex: 1, position: 'relative'}}>
			<MapxusSdk.MapxusMap
				mapOption={{buildingId}}
				onIndoorSceneChange={indoorSceneChange}
			>
				<MapxusSdk.MapView style={{flex: 1}}>
					{
						lightMarker && (
							<MapxusSdk.PointAnnotation
								key={lightMarker.key}
								id={lightMarker.key}
								coordinate={[lightMarker.longitude, lightMarker.latitude]}
							>
								<Image
									source={require('./assets/light.png')}
									style={{width: 50, height: 50, transform: [{rotate:`${lightMarker.bearing}deg`}]}}
								/>
							</MapxusSdk.PointAnnotation>
						)
					}
				</MapxusSdk.MapView>
				<MapxusSdk.VisualNodeView
					ref={nodeViewRef}
					onTappedFlag={clickNode}
				/>
			</MapxusSdk.MapxusMap>
			<View style={styles.visualView_container}>
				<MapxusSdk.VisualView ref={visualViewRef} style={styles.visualView}/>
			</View>
			<TouchableOpacity
				style={styles.iconArea}
				onPress={() => setActive(!active)}
			>
				{
					active
						? <Image
							source={require('./assets/onIcon360.png')}
							style={{width: '100%', height: '100%'}}
						/>
						: <Image
							source={require('./assets/offIcon360.png')}
							style={{width: '100%', height: '100%'}}
						/>
				}
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	iconArea: {
		position: 'absolute',
		left: 10,
		top: 60,
		width: 40,
		height: 40
	},
	visualView_container: {
		position: 'absolute',
		left: 20,
		bottom: 40,
		padding: 8,
		borderRadius: 5,
		backgroundColor: 'white'
	},
	visualView: {
		width: 120,
		height: 120,
		borderRadius: 5,
		overflow: 'hidden'
	}
});
