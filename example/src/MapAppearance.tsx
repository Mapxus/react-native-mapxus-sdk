import React, {useState, useRef, useEffect, Fragment} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import MapxusSdk from '@mapxus/react-native-mapxus-sdk';
import {Switch, Button, Provider, Modal, List} from '@ant-design/react-native';
import ParamsScrollView from './ParamsScrollView';
import getStatusBarHeight from './utils/getStatusBarHeight';
import {find as _find} from 'lodash';

const Item = List.Item;
const mapStyles: Array<any> = [
	{
		name: '通用样式',
		style: MapxusSdk.MapxusMapStyle.COMMON
	},
	{
		name: '圣诞节样式',
		style: MapxusSdk.MapxusMapStyle.CHRISTMAS
	},
	{
		name: '万圣节样式',
		style: MapxusSdk.MapxusMapStyle.HALLOWMAS
	},
	{
		name: 'MAPPYBEE样式',
		style: MapxusSdk.MapxusMapStyle.MAPPYBEE
	},
	{
		name: 'MAPXUS样式',
		style: MapxusSdk.MapxusMapStyle.MAPXUS
	},
	{
		name: 'MAPXUS_V2',
		style: MapxusSdk.MapxusMapStyle.MAPXUS_V2
	}
];
const languages = [
	'default',
	'en',
	'zh-Hant',
	'zh-Hans',
	'ja',
	'ko'
];

function StyleList({setIsModalVisible, handleClick}: any) {
	return (
		<Fragment>
			<List style={{paddingHorizontal: 5}}>
				{
					mapStyles.map((style, idx) => {
						return (
							<Item key={idx}>
								<Button
									style={{borderWidth: 0}}
									onPress={() => handleClick('style', style.name)}
								>
									{style.name}
								</Button>
							</Item>
						);
					})
				}
			</List>
			<Button
				type='primary'
				style={[styles.button, styles.modal_cancel_button]}
				onPress={() => setIsModalVisible(false)}
			>
				Cancel
			</Button>
		</Fragment>
	);
}

function LanguageList({setIsModalVisible, handleClick}: any) {
	return (
		<Fragment>
			<List style={{paddingHorizontal: 5}}>
				{
					languages.map((lang, idx) => {
						return (
							<Item key={idx}>
								<Button
									style={{borderWidth: 0}}
									onPress={() => handleClick('language', lang)}
								>
									{lang}
								</Button>
							</Item>
						);
					})
				}
			</List>
			<Button
				type='primary'
				style={[styles.button, styles.modal_cancel_button]}
				onPress={() => setIsModalVisible(false)}
			>
				Cancel
			</Button>
		</Fragment>
	);
}

export default function MapAppearance() {
	const [statusBarHeight, setStatusBarHeight] = useState(
		StatusBar.currentHeight || 0,
	);
	const [checked, setChecked] = useState(false);
	const [outdoorHidden, setOutdoorHidden] = useState(false);
	const [isStyleLoaded, setIsStyleLoaded] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(true);
	const [content, setContent] = useState<Element | null>(null);
	const mapRef = useRef<MapxusSdk.MapxusMap>(null);

	useEffect(function initStatusBarHeight() {
		async function getBarHeight() {
			const height = await getStatusBarHeight();
			setStatusBarHeight(height);
		}

		getBarHeight();
	}, []);

	function handleCheck(checked: boolean) {
		setChecked(checked);
		setOutdoorHidden(!outdoorHidden);
	}

	function handleClick(type: string, value: string) {
		if (type === 'style') {
			const style = _find(mapStyles, s => s.name === value)?.style;
			mapRef.current?.setMapxusStyle(style);
		}
		if (type === 'language') {
			mapRef.current?.setMapLanguage(value);
		}
		setIsModalVisible(false);
	}

	function switchStyle() {
		if (isStyleLoaded) {
			setContent(<StyleList setIsModalVisible={setIsModalVisible} handleClick={handleClick}/>);
			setIsModalVisible(true);
		}
	}

	function switchLanguage() {
		setContent(<LanguageList setIsModalVisible={setIsModalVisible} handleClick={handleClick}/>);
		setIsModalVisible(true);
	}

	return (
		<Provider>
			<View style={{flex: 1}}>
				<View style={{flex: 5}}>
					<MapxusSdk.MapxusMap
						ref={mapRef}
						outdoorHidden={outdoorHidden}
						mapOption={{buildingId: 'tsuenwanplaza_hk_369d01'}}
					>
						<MapxusSdk.MapView
							style={{flex: 1}}
							onDidFinishLoadingStyle={() => setIsStyleLoaded(true)}
						/>
					</MapxusSdk.MapxusMap>
				</View>
				<ParamsScrollView>
					<View style={styles.controller}>
						<View style={styles.inner}>
							<Switch checked={checked} onChange={handleCheck}/>
							<Text style={styles.fontStyle}>isOutdoorHidden</Text>
						</View>
						<View style={styles.buttons_wrapper}>
							<Button
								type='primary'
								style={styles.button}
								onPress={switchStyle}
							>
								Style
							</Button>
							<Button
								type='primary'
								style={styles.button}
								onPress={switchLanguage}
							>
								Language
							</Button>
						</View>
					</View>
				</ParamsScrollView>
				{
					content && <Modal
						popup
						visible={isModalVisible}
						animationType='slide-up'
						style={[{paddingBottom: statusBarHeight}, styles.modal]}
					>
						{content}
					</Modal>
				}
			</View>
		</Provider>
	)
}

const styles = StyleSheet.create({
	controller: {
		backgroundColor: '#fff',
		paddingHorizontal: 20,
		marginTop: 15
	},
	inner: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	fontStyle: {
		marginLeft: 10,
		fontSize: 18
	},
	buttons_wrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10
	},
	button: {
		backgroundColor: '#74aded',
		borderWidth: 0,
		width: '48%',
		height: 'auto',
		paddingVertical: 8,
		paddingHorizontal: 10
	},
	modal: {
		paddingTop: 10,
		width: '96%',
		height: 'auto',
		marginHorizontal: '2%',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20
	},
	modal_cancel_button: {
		marginTop: 10,
		height: 42,
		alignSelf: 'center'
	}
});
