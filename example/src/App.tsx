import React, {useState, useEffect} from 'react';
import {View, StatusBar, Platform} from 'react-native';
import config from './utils/config';
import MapxusSdk from '@mapxus/react-native-mapxus-sdk';
import Menu from './Menu';
import SampleMap from './SampleMap';
import getStatusBarHeight from './utils/getStatusBarHeight';

MapxusSdk.registerWithApiKey(config.get('apiKey'), config.get('secret'));

export default function App() {
	const [stage, setStage] = useState(0);
	const [statusBarHeight, setStatusBarHeight] = useState(StatusBar.currentHeight || 0);
	const [navId, setNavId] = useState('map_creation');
	const [category, setCategory] = useState('');
	const [sampleId, setSampleId] = useState('');
	const [carouselSelectedIndex, setCarouselSelectedIndex] = useState(0);

	useEffect(function initStatusBarHeight() {
		async function getBarHeight() {
			const height = await getStatusBarHeight();
			setStatusBarHeight(height);
		}

		getBarHeight();

		if (Platform.OS == "android") {
			async function requestAndroidLocationPermissions() {
				await MapxusSdk.requestAndroidLocationPermissions();
			}
			requestAndroidLocationPermissions();
		}
	}, []);

	function handleClickMenu(navId: string) {
		setNavId(navId);
		setCarouselSelectedIndex(0);
	}

	function handleClickSample(category: string, id: string) {
		setCategory(category);
		setSampleId(id);
		setStage(1);
	}

	return (
		<View style={{flex: 1}}>
			{
				stage
					? <SampleMap
						statusBarHeight={statusBarHeight}
						category={category}
						sampleId={sampleId}
						setStage={setStage}
					/>
					: <Menu
						statusBarHeight={statusBarHeight}
						navId={navId}
						setNavId={handleClickMenu}
						carouselSelectedIndex={carouselSelectedIndex}
						setCarouselSelectedIndex={setCarouselSelectedIndex}
						getSampleInfo={handleClickSample}
					/>
			}
		</View>
	)
}
