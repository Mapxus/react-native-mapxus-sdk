import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar, Platform, StyleSheet} from 'react-native';
import {Button} from '@ant-design/react-native';
import MapxusSdk, {AndroidLocation, MapboxGLEvent} from '@mapxus/react-native-mapxus-sdk';
import getStatusBarHeight from './utils/getStatusBarHeight';

export default function DisplayLocation() {
	const [statusBarHeight, setStatusBarHeight] = useState(
		StatusBar.currentHeight || 0,
	);
	const [followModelNumber, setFollowModelNumber] = useState(0);
	const [isFollow, setIsFollow] = useState(false);
	const [followModel, setFollowModel] = useState<'normal' | 'compass' | 'course' | undefined>(undefined);
	const [buttonTitle, setButtonTitle] = useState<'None' | 'Follow' | 'Heading'>('None');

	const [floor, setFloor] = useState('N/A');
	const [lat, setLat] = useState(0);
	const [lon, setLon] = useState(0);
	const [accuracy, setAccuracy] = useState(0);

	useEffect(function initStatusBarHeight() {
		async function getBarHeight() {
			const height = await getStatusBarHeight();
			setStatusBarHeight(height);
		}

		getBarHeight();
	}, []);

	useEffect(() => {
		switch (followModelNumber) {
			case 0: {
				setButtonTitle('None');
				setIsFollow(false);
				break;
			}
			case 1: {
				setButtonTitle('Follow');
				setIsFollow(true);
				setFollowModel('normal');
				break;
			}
			case 2: {
				setButtonTitle('Heading');
				setIsFollow(true);
				setFollowModel('compass');
				break;
			}
			default: {
				break;
			}
		}
	}, [followModelNumber])

	// For iOS
	function handleUpdate(location: MapxusSdk.Location) {
		setLat(location.coords.latitude);
		setLon(location.coords.longitude);
		setAccuracy(location.coords.accuracy ? location.coords.accuracy : 0);
		setFloor(location.coords.ordinal ? String(location.coords.ordinal) : 'N/A');
	}

	// For Android
	function handleChange(location: AndroidLocation) {
		setLat(location.latitude);
		setLon(location.longitude);
		setAccuracy(location.accuracy);
		setFloor(location.floor ? location.floor : "0");
	}

	function handleUserTrackingModeChange(e: MapboxGLEvent<'usertrackingmodechange',
		{
			followUserLocation: boolean;
			followUserMode: 'normal' | 'compass' | 'course' | null;
		}>) {
		var mIsFollow = e.nativeEvent.payload.followUserLocation;
		var mFollowModel = e.nativeEvent.payload.followUserMode;
		if (mIsFollow) {
			if (mFollowModel === 'normal') {
				setButtonTitle('Follow');
			} else {
				setButtonTitle('Heading');
			}
		} else {
			setButtonTitle('None');
		}
	}

	function handleButtonOnPress() {
		setFollowModelNumber((followModelNumber + 1) % 3)
	}

	return (
		<View style={{flex: 1}}>
			<View style={styles.container}>
				<Text style={styles.text}>lat: {lat}</Text>
				<Text style={styles.text}>lon: {lon}</Text>
				<Text style={styles.text}>floor: {floor}</Text>
				<Text style={styles.text}>accuracy: {accuracy}</Text>
			</View>
			<View style={{flex: 1}}>
				<MapxusSdk.MapxusMap mapOption={{
					buildingId: 'tsuenwanplaza_hk_369d01',
					zoomInsets: {left: -100, right: -100}
				}}>
					<MapxusSdk.MapView style={{flex: 1}}>
						{
							Platform.OS == 'ios'
								? <View>
									<MapxusSdk.Camera
										followUserMode={followModel}
										followUserLocation={isFollow}
										onUserTrackingModeChange={handleUserTrackingModeChange}
									/>
									<MapxusSdk.UserLocation
										renderMode={'native'}
										visible={true}
										showsUserHeadingIndicator={true}
										onUpdate={handleUpdate}
									/>
								</View>
								: null
						}

					</MapxusSdk.MapView>
					{
						Platform.OS == 'android'
							? <MapxusSdk.MapxusMapLocation
								followUserMode={(followModelNumber === 0) ? 0 : ((followModelNumber === 1) ? 1 : 3)}
								onLocationStarted={() => {
									// console.log("start")
								}}
								onLocationStopped={() => {
									// console.log("stop")
								}}
								onLocationError={(data) => {
									// console.log(data)
								}}
								onCompassChange={(data) => {
									// console.log(data)
								}}
								onLocationChange={handleChange}
							/>
							: null
					}
				</MapxusSdk.MapxusMap>
			</View>
			<Button
				type={'primary'}
				style={[styles.button, {bottom: 10 + statusBarHeight}]}
				onPress={handleButtonOnPress}
			>
				{buttonTitle}
			</Button>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
		paddingHorizontal: 10,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between'
	},
	text: {
		width: '48%',
		fontSize: 18
	},
	button: {
		position: 'absolute',
		right: 10,
		height: 'auto',
		paddingVertical: 8,
		paddingHorizontal: 10
	}
});
