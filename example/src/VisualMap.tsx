import React, {useRef, useState, useEffect} from 'react';
import {View, TouchableOpacity, Image, StyleSheet, TouchableWithoutFeedback, Platform} from 'react-native';
import MapxusSdk, {
	BearingChangeObject,
	IndoorSceneChangeObject,
	MapRenderer,
	NodeChangeObject,
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
	const [nodesAndroid, setNodesAndroid] = useState<Array<VisualNodeGroup>>([]);
	const [lightMarker, setLightMarker] = useState<any>(null);
	const [visualViewShown, setVisualViewShown] = useState(false);
	const [isSwitched, setIsSwitched] = useState(false);
	const [floorControllerHidden, setFloorControllerHidden] = useState(false);
	const [isFirst, setIsFirst] = useState(true);

	const nodeViewRef = useRef<MapxusSdk.VisualNodeView>(null);
	const visualViewRef = useRef<MapxusSdk.VisualView>(null);
	const cameraRef = useRef<MapRenderer.MapboxGL.Camera>(null);

	useEffect(() => {
		initVisualData({buildingId, scope: 1});
	}, []);

	useEffect(() => {
		if (active && nodes.length) {
			if (Platform.OS === 'ios') {
				renderVisualNodes(nodes);
			} else {
				renderVisualNodesAndroid(nodesAndroid);
			}
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
		setNodesAndroid(data)
	}

	//in ios
	function renderVisualNodes(nodes: Array<VisualNode>) {
		nodeViewRef.current?.renderFlagUsingNodes(nodes);
	}

	//in Android
	function renderVisualNodesAndroid(nodes: Array<VisualNodeGroup>) {
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
		cameraRef.current?.moveTo([feature.longitude, feature.latitude]);

		const imgId: string = feature?.key;
		if (imgId) {
			renderVisualView(imgId);
			setVisualViewShown(true);
		}
	}

	function renderVisualView(imageId: string) {
		if (isFirst) {
			setIsFirst(false);
			visualViewRef.current?.loadVisualViewWithFirstImg(imageId);
		} else {
			visualViewRef.current?.moveToKey(imageId);
		}
	}

	function bearingChange(feature: BearingChangeObject) {
		setLightMarker(
			_assign({}, lightMarker, {bearing: feature.bearing})
		);
	}

	function nodeChanged(feature: NodeChangeObject) {
		setLightMarker(feature.node);
		cameraRef.current?.moveTo([feature.node.longitude, feature.node.latitude]);
	}

	function clickWindow(type: string) {
		if (type === 'visual') {
			setIsSwitched(true);
			setFloorControllerHidden(true);
		} else {
			setIsSwitched(false);
			setFloorControllerHidden(false);
		}

		visualViewRef.current?.resize();
	}

	return (
		<View style={{flex: 1}}>
			<TouchableWithoutFeedback {...isSwitched && {onPress: () => clickWindow('map')}}>
				<View style={isSwitched ? styles.container_small : styles.container_full}>
					<MapxusSdk.MapxusMap
						mapOption={{
							buildingId: 'tsuenwanplaza_hk_369d01',
							floor: 'L3',
							zoomInsets: {top: 0, left: 0, bottom: 0, right: 0}
						}}
						indoorControllerAlwaysHidden={floorControllerHidden}
						onIndoorSceneChange={indoorSceneChange}
					>
						<MapRenderer.MapboxGL.MapView
							style={{flex: 1}}
							compassEnabled={!isSwitched}
						>
							<MapRenderer.MapboxGL.Camera ref={cameraRef}/>
							{
								lightMarker && (
									Platform.OS == 'ios' ?
										<MapRenderer.MapboxGL.PointAnnotation
											key={lightMarker.key}
											id={lightMarker.key}
											coordinate={[lightMarker.longitude, lightMarker.latitude]}
										>
											<Image
												source={require('./assets/light.png')}
												style={{
													width: 50,
													height: 50,
													transform: [{rotate: `${lightMarker.bearing}deg`}]
												}}
											/>
										</MapRenderer.MapboxGL.PointAnnotation> : null
								)
							}
						</MapRenderer.MapboxGL.MapView>
						<MapxusSdk.VisualNodeView
							ref={nodeViewRef}
							onTappedFlag={clickNode}
						/>
					</MapxusSdk.MapxusMap>
				</View>
			</TouchableWithoutFeedback>
			<TouchableWithoutFeedback {...!isSwitched && {onPress: () => clickWindow('visual')}}>
				<View style={[
					isSwitched ? styles.container_full : styles.container_small,
					{display: visualViewShown ? 'flex' : 'none', opacity: visualViewShown ? 1 : 0}
				]}>
					<MapxusSdk.VisualView
						ref={visualViewRef}
						style={[styles.visualView, {borderRadius: isSwitched ? 0 : 5}]}
						onBearingChanged={bearingChange}
						onNodeChanged={nodeChanged}
					/>
				</View>
			</TouchableWithoutFeedback>
			{
				Platform.OS == 'android' ?
					<TouchableWithoutFeedback onPress={() => clickWindow(!isSwitched ? 'visual' : "map")}>
						<View style={[
							styles.container_small,
							{opacity: 0}
						]}>
						</View>
					</TouchableWithoutFeedback> : null
			}
			<TouchableOpacity
				style={[styles.iconArea, {display: isSwitched ? 'none' : 'flex'}]}
				onPress={() => setActive(!active)}
			>
				{
					active
						? <Image
							source={require('./assets/onIcon360.png')}
							style={{width: '100%', height: '100%', opacity: isSwitched ? 0 : 1}}
						/>
						: <Image
							source={require('./assets/offIcon360.png')}
							style={{width: '100%', height: '100%', opacity: isSwitched ? 0 : 1}}
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
	visualView: {
		flex: 1,
		overflow: 'hidden'
	},
	container_full: {
		width: '100%',
		height: '100%'
	},
	container_small: {
		position: 'absolute',
		left: 10,
		bottom: 40,
		width: 136,
		height: 136,
		padding: 8,
		borderRadius: 5,
		backgroundColor: 'white',
		zIndex: 1,
		elevation: 1
	}
});
