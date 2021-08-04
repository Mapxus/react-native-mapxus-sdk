import React, {useRef, useState, useEffect} from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import MapxusSdk, {
	BearingChangeObject,
	IndoorSceneChangeObject,
	VisualNode, VisualNodeGroup,
	VisualSearchProps
} from '@mapxus/react-native-mapxus-sdk';
import {assign as _assign} from 'lodash';

async function getVisualNodes(params: VisualSearchProps) {
	const data: Array<VisualNodeGroup> = await MapxusSdk.visualSearchManager.searchVisualDataInBuilding(params);
	return data;
}

export default function VisualMap() {
	const [buildingId, setBuildingId] = useState<string>('tsuenwanplaza_hk_369d01');
	const [floor, setFloor] = useState<string>('');
	const [active, setActive] = useState(false);
	const [nodes, setNodes] = useState<Array<VisualNode>>([]);
	const [lightMarker, setLightMarker] = useState<any>(null);
	const [visualViewShown, setVisualViewShown] = useState(false);
	const [isSwitched, setIsSwitched] = useState(false);
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
			setLightMarker(null);
			setVisualViewShown(false);
			visualViewRef.current?.unloadVisualView();
		}
	}, [active]);

	useEffect(() => {
		if (active) {
			filterVisualNodes(buildingId, floor);
			setLightMarker(null);
			setVisualViewShown(false);
			visualViewRef.current?.unloadVisualView();
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
		const data: Array<VisualNodeGroup> = await getVisualNodes(params);
		const _nodes = data.length
			? data.reduce((pre: Array<VisualNodeGroup | any>, cur) => pre.concat(cur.nodes), [])
			: [];

		setNodes(_nodes);
	}

	function renderVisualNodes(nodes: Array<VisualNode>) {
		nodeViewRef.current?.renderFlagUsingNodes(nodes);
	}

	function filterVisualNodes(buildingId: string, floor: string) {
		nodeViewRef.current?.changeOn(buildingId, floor);
	}

	function indoorSceneChange(feature: IndoorSceneChangeObject) {
		setBuildingId(feature?.building?.identifier || '');
		setFloor(feature?.floor || '');
	}

	function clickNode(feature: VisualNode) {
		setLightMarker(feature);

		const imgId: string = feature?.key;
		if (imgId) {
			renderVisualView(imgId);
			setVisualViewShown(true);
		}
	}

	function renderVisualView(imageId: string) {
		visualViewRef.current?.loadVisualViewWithFirstImg(imageId);
	}

	function bearingChange(feature: BearingChangeObject) {
		setLightMarker(
			_assign({}, lightMarker, {bearing: feature.bearing})
		);
	}

	return (
		<View style={{flex: 1}}>
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
									style={{width: 50, height: 50, transform: [{rotate: `${lightMarker.bearing}deg`}]}}
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
			<TouchableOpacity onPress={() => setIsSwitched(!isSwitched)}>
				<View style={[
					styles.visualView_container_small,
					{display: visualViewShown ? 'flex' : 'none'}
				]}>
					<MapxusSdk.VisualView
						ref={visualViewRef}
						style={styles.visualView}
						onBearingChanged={bearingChange}
					/>
				</View>
			</TouchableOpacity>
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
	visualView_container_small: {
		position: 'absolute',
		left: 20,
		bottom: 40,
		padding: 8,
		borderRadius: 5,
		backgroundColor: 'white'
	},
	visualView_container_big: {
		position: 'absolute',
		left: 0,
		bottom: 740,
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
