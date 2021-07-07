import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Carousel} from '@ant-design/react-native';
import styles from './styles/CarouselList';

interface ISample {
	id: string,
	category: string,
	menuImg: JSX.Element;
	header: string,
	title: string;
	subTitle: string,
	component: JSX.Element
}

interface ICarousel {
	samples: Array<ISample>,
	selectedIndex: number,
	setSelectedIndex: (index: number) => void,
	getSampleInfo: (category: string, id: string) => void
}

export default function CarouselList(props: ICarousel) {
	const {samples, selectedIndex, setSelectedIndex, getSampleInfo} = props;

	return (
		<View style={{margin: '5%', flex: 1}}>
			<View style={{flex: 3}}>
				<Carousel
					style={{height: '100%'}}
					selectedIndex={selectedIndex}
					dots={samples.length > 1}
					dotActiveStyle={{backgroundColor: '#78adcb'}}
					afterChange={setSelectedIndex}
				>
					{
						samples && samples.map((sample, index) => {
							return (
								<TouchableOpacity
									key={index}
									style={[styles.carousel_page]}
									onPress={() => getSampleInfo(sample.category, sample.id)}
								>
									<View style={styles.image_container}>{sample.menuImg}</View>
									<View style={styles.text_container}>
										<Text style={styles.title}>{sample.title}</Text>
										<Text style={styles.subTitle}>{sample.subTitle}</Text>
									</View>
								</TouchableOpacity>
							)
						})
					}
				</Carousel>
			</View>
			<View style={{flex: 2}}/>
		</View>
	)
}
