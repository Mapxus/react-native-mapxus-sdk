import React, {useState} from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import MapxusSdk from '@mapxus/react-native-mapxus-sdk';

export default function VisualMap() {
	const [active, setActive] = useState(false);

	return (
		<View style={{flex: 1}}>
			<MapxusSdk.MapxusMap mapOption={{buildingId: 'tsuenwanplaza_hk_369d01'}}>
				<MapxusSdk.MapView style={{flex: 1}}/>
			</MapxusSdk.MapxusMap>
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
	}
});
