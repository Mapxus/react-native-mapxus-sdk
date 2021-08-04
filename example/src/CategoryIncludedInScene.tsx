import React, {useEffect, useState} from 'react';
import {View, StatusBar, StyleSheet, Text, ScrollView} from 'react-native';
import MapxusSdk, {Category, IndoorSceneChangeObject, POICategorySearchProps} from '@mapxus/react-native-mapxus-sdk';
import {Button, Provider, Modal, List, ActivityIndicator} from '@ant-design/react-native';
import ParamsScrollView from './ParamsScrollView';
import getStatusBarHeight from './utils/getStatusBarHeight';

const Item = List.Item;

export default function CategoryIncludedInScene() {
	const [statusBarHeight, setStatusBarHeight] = useState(
		StatusBar.currentHeight || 0,
	);
	const [buildingId, setBuildingId] = useState('tsuenwanplaza_hk_369d01');
	const [floor, setFloor] = useState('L1');
	const [visible, setVisible] = useState(false);
	const [content, setContent] = useState<Element | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(function initStatusBarHeight() {
		async function getBarHeight() {
			const height = await getStatusBarHeight();
			setStatusBarHeight(height);
		}

		getBarHeight();
	}, []);

	function handleIndoorChange(feature: IndoorSceneChangeObject) {
		setBuildingId(feature?.building?.identifier);
		setFloor(feature?.floor);
	}

	async function handleClick(buildingId: string, floor?: string) {
		setLoading(true);
		const categories: Array<Category> = await getPOICategory({buildingId, floor});
		setContent(showPOIsList(categories));
		setVisible(true);
		setLoading(false);
	}

	return (
		<Provider>
			<View style={{flex: 1}}>
				<View style={{flex: 6}}>
					<MapxusSdk.MapxusMap
						mapOption={{buildingId: 'tsuenwanplaza_hk_369d01'}}
						onIndoorSceneChange={handleIndoorChange}
					>
						<MapxusSdk.MapView style={{flex: 1}}/>
					</MapxusSdk.MapxusMap>
				</View>
				<ParamsScrollView>
					<View style={styles.buttonWrapper}>
						<Button
							type={'primary'}
							style={[styles.button, {height: 'auto'}]}
							onPress={() => handleClick(buildingId)}
						>
							Search In Building
						</Button>
						<Button
							type={'primary'}
							style={[styles.button, {height: 'auto'}]}
							onPress={() => handleClick(buildingId, floor)}
						>
							Search On Floor
						</Button>
					</View>
				</ParamsScrollView>
				<Modal
					popup
					visible={visible}
					animationType='slide-up'
					style={[{paddingBottom: statusBarHeight}, styles.modal]}
				>
					<View style={{height: '90%'}}>{content}</View>
					<Button
						type='primary'
						style={[styles.button, {marginTop: 10, height: 42, alignSelf: 'center'}]}
						onPress={() => setVisible(false)}
					>
						Close
					</Button>
				</Modal>
				<View style={[styles.loadingMask, {display: loading ? 'flex' : 'none'}]}>
					<ActivityIndicator toast animating={loading} size='large'/>
				</View>
			</View>
		</Provider>
	);
}

async function getPOICategory(params: POICategorySearchProps) {
	const data = await MapxusSdk.poiCategorySearchManager.poiCategorySearch(params);
	return data?.category || [];
}

function showPOIsList(categories: Array<Category>): Element {
	return (
		categories.length
			? <ScrollView
				automaticallyAdjustContentInsets={false}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
			>
				<List>
					{
						categories.map((category: Category, idx) => (
							<Item key={idx}>
								<Text>category: {category.category}</Text>
								<Text>title_en: {category.title_en}</Text>
								<Text>title_zh: {category.title_zh}</Text>
								<Text>title_cn: {category.title_cn}</Text>
							</Item>
						))
					}
				</List>
			</ScrollView>
			: <Text>No data</Text>
	)
}

const styles = StyleSheet.create({
	buttonWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 15
	},
	button: {
		width: '44%',
		paddingVertical: 8,
		paddingLeft: 0,
		paddingRight: 0
	},
	modal: {
		paddingTop: 10,
		height: '90%'
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
