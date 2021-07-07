import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import getStatusBarHeight from './utils/getStatusBarHeight';

export default function ParamsScrollView({children}: any) {
	const [statusBarHeight, setStatusBarHeight] = useState(
		StatusBar.currentHeight || 0,
	);

	useEffect(function initStatusBarHeight() {
		async function getBarHeight() {
			const height = await getStatusBarHeight();
			setStatusBarHeight(height);
		}

		getBarHeight();
	}, []);

	return (
		<SafeAreaView style={{flex: 1, paddingBottom: statusBarHeight}}>
			<ScrollView style={{marginVertical: 10}}>
				{children}
			</ScrollView>
		</SafeAreaView>
	);
}
