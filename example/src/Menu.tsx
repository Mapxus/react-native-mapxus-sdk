import React, {useState} from 'react';
import {
	ScrollView,
	Text,
	View,
	TouchableOpacity,
	Image,
	SafeAreaView
} from 'react-native';
import {Drawer, List} from '@ant-design/react-native';
import {navs, samples} from './utils/navData';
import styles from './styles/Menu';
import CarouselList from './CarouselList';

const Sidebar = (props: any) => {
	const {statusBarHeight, navId, setNavId} = props;

	return (
		<ScrollView>
			<View style={[styles.sidebar_header, {height: statusBarHeight + 120}]}>
				<Text style={styles.sidebar_title}>Mapxus Map SDK</Text>
				<Text style={styles.sidebar_subTitle}>React Native examples</Text>
			</View>
			<List>
				{navs.map((nav: any, index: number) => (
					<List.Item
						key={index}
						onPress={() => setNavId(nav.id)}
						style={nav.id === navId && styles.sidebar_item_active || styles.sidebar_item}
					>
						<Text style={nav.id === navId && styles.sidebar_text_active || styles.sidebar_text}>
							{nav.text}
						</Text>
					</List.Item>
				))}
			</List>
		</ScrollView>
	)
};

export default function Menu(props: any) {
	const {statusBarHeight, navId, setNavId, carouselSelectedIndex, setCarouselSelectedIndex, getSampleInfo} = props;
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Drawer
			sidebar={Sidebar({statusBarHeight, navId, setNavId})}
			position='left'
			open={isOpen}
			onOpenChange={setIsOpen}
			drawerBackgroundColor='white'
		>
			<View style={styles.container}>
				<View style={styles.header}>
					<SafeAreaView style={{height: statusBarHeight}}/>
					<View style={styles.header_content}>
						<Text style={styles.title}>Mapxus Map</Text>
						<TouchableOpacity
							style={styles.menu_button}
							onPress={() => setIsOpen(true)}
						>
							<Image
								source={require('./assets/menu.png')}
								style={{width: '100%', height: '100%'}}
							/>
						</TouchableOpacity>
					</View>
				</View>
				<View style={{flex: 1}}>
					{
						samples[navId] && (
							<CarouselList
								key={navId}
								samples={samples[navId]}
								selectedIndex={carouselSelectedIndex}
								setSelectedIndex={setCarouselSelectedIndex}
								getSampleInfo={getSampleInfo}
							/>
						)
					}
				</View>
			</View>
		</Drawer>
	)
}
