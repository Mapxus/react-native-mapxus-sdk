import React from 'react'
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native'
import styles from './styles/SampleMap';
import {samples} from './utils/navData';

export default function SampleMap(props: any) {
	const {sampleId, category, statusBarHeight, setStage} = props;
	const sample = samples[category].find((sample: any) => sample.id === sampleId);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<SafeAreaView style={{height: statusBarHeight}}/>
				<View style={styles.header_content}>
					<Text style={styles.title}>{sample?.header}</Text>
					<TouchableOpacity
						style={styles.menu_button}
						onPress={() => setStage(0)}
					>
						<Image
							source={require('./assets/back.png')}
							style={{width: '100%', height: '100%'}}
						/>
					</TouchableOpacity>
				</View>
			</View>
			<View style={{flex: 1}}>
				{sample?.component}
			</View>
		</View>
	)
}
