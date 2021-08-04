import React from 'react';
import {Image, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
	poi_icon: {
		width: 32,
		height: 32,
		marginRight: 12
	}
});

const poiType: any = {
	'beauty_spas.hair': <Image
		source={require('../assets/POIType/Beauty.png')}
		style={styles.poi_icon}
	/>,
	'facility.gate.entry': <Image
		source={require('../assets/POIType/Exit.png')}
		style={styles.poi_icon}
	/>,
	'shopping.luggage_bags': <Image
		source={require('../assets/POIType/Shopping.png')}
		style={styles.poi_icon}
	/>,
	'shopping.clothes.sport_swear': <Image
		source={require('../assets/POIType/Cloths.png')}
		style={styles.poi_icon}
	/>,
	'shopping.toys': <Image
		source={require('../assets/POIType/Toys.png')}
		style={styles.poi_icon}
	/>,
	'facility.connector.elevator': <Image
		source={require('../assets/POIType/Elevator.png')}
		style={styles.poi_icon}
	/>,
	'restaurants.western': <Image
		source={require('../assets/POIType/Restaurant.png')}
		style={styles.poi_icon}
	/>,
	'shopping': <Image
		source={require('../assets/POIType/Shopping.png')}
		style={styles.poi_icon}
	/>,
	'shopping.clothes': <Image
		source={require('../assets/POIType/Cloths.png')}
		style={styles.poi_icon}
	/>,
	'restaurants.desserts': <Image
		source={require('../assets/POIType/Desserts.png')}
		style={styles.poi_icon}
	/>,
	'beauty_spas': <Image
		source={require('../assets/POIType/Beauty.png')}
		style={styles.poi_icon}
	/>,
	'workplace.hotel_room': <Image
		source={require('../assets/POIType/Workplace.png')}
		style={styles.poi_icon}
	/>,
	'beauty_spas.spas': <Image
		source={require('../assets/POIType/Beauty.png')}
		style={styles.poi_icon}
	/>,
	'restaurants.fast_food': <Image
		source={require('../assets/POIType/Restaurant.png')}
		style={styles.poi_icon}
	/>,
	'facility.connector': <Image
		source={require('../assets/POIType/Facilities.png')}
		style={styles.poi_icon}
	/>,
	'facility.connector.escalator': <Image
		source={require('../assets/POIType/Escalator.png')}
		style={styles.poi_icon}
	/>,
	'workplace.lobby': <Image
		source={require('../assets/POIType/Workplace.png')}
		style={styles.poi_icon}
	/>,
	'shopping.clothes.womens_cloth': <Image
		source={require('../assets/POIType/Cloths.png')}
		style={styles.poi_icon}
	/>,
	'restaurants': <Image
		source={require('../assets/POIType/Restaurant.png')}
		style={styles.poi_icon}
	/>,
	'facility.information': <Image
		source={require('../assets/POIType/Information.png')}
		style={styles.poi_icon}
	/>,
	'facility.restroom.female': <Image
		source={require('../assets/POIType/RestroomFemale.png')}
		style={styles.poi_icon}
	/>,
	'facility.parking': <Image
		source={require('../assets/POIType/Parking.png')}
		style={styles.poi_icon}
	/>,
	'facility.mothersroom': <Image
		source={require('../assets/POIType/Nursery.png')}
		style={styles.poi_icon}
	/>,
	'facility.shuttle': <Image
		source={require('../assets/POIType/Facilities.png')}
		style={styles.poi_icon}
	/>,
	'restaurants.sushi': <Image
		source={require('../assets/POIType/Restaurant.png')}
		style={styles.poi_icon}
	/>,
	'facility.restroom.male': <Image
		source={require('../assets/POIType/RestroomMale.png')}
		style={styles.poi_icon}
	/>,
	'facility.restroom.disable': <Image
		source={require('../assets/POIType/Disable.png')}
		style={styles.poi_icon}
	/>,
	'restaurants.bakeries': <Image
		source={require('../assets/POIType/Restaurant.png')}
		style={styles.poi_icon}
	/>,
	'shopping.jewelry': <Image
		source={require('../assets/POIType/Jewelry.png')}
		style={styles.poi_icon}
	/>,
	'facility.parking.compact': <Image
		source={require('../assets/POIType/Parking.png')}
		style={styles.poi_icon}
	/>,
	'restaurants.cafes': <Image
		source={require('../assets/POIType/Restaurant.png')}
		style={styles.poi_icon}
	/>,
	'shopping.watches': <Image
		source={require('../assets/POIType/Watches.png')}
		style={styles.poi_icon}
	/>,
	'facility.gate': <Image
		source={require('../assets/POIType/Exit.png')}
		style={styles.poi_icon}
	/>,
	'facility.restroom': <Image
		source={require('../assets/POIType/Facilities.png')}
		style={styles.poi_icon}
	/>,
	'shopping.shoes': <Image
		source={require('../assets/POIType/Shoes.png')}
		style={styles.poi_icon}
	/>,
	'transport': <Image
		source={require('../assets/POIType/Transport.png')}
		style={styles.poi_icon}
	/>,
	'shopping.media': <Image
		source={require('../assets/POIType/Book.png')}
		style={styles.poi_icon}
	/>,
	'beauty_spas.beauty_parlor': <Image
		source={require('../assets/POIType/Beauty.png')}
		style={styles.poi_icon}
	/>,
	'facility.reception_desk': <Image
		source={require('../assets/POIType/Facilities.png')}
		style={styles.poi_icon}
	/>,
	'restaurants.chinese': <Image
		source={require('../assets/POIType/Restaurant.png')}
		style={styles.poi_icon}
	/>,
	'facility.connector.stairs': <Image
		source={require('../assets/POIType/Stairs.png')}
		style={styles.poi_icon}
	/>,
	'shopping.baby_gear': <Image
		source={require('../assets/POIType/BabyGear.png')}
		style={styles.poi_icon}
	/>,
	'facility.unspecified': <Image
		source={require('../assets/POIType/Facilities.png')}
		style={styles.poi_icon}
	/>,
	'shopping.perfume': <Image
		source={require('../assets/POIType/Shopping.png')}
		style={styles.poi_icon}
	/>,
	'shopping.clothes.child_cloth': <Image
		source={require('../assets/POIType/Cloths.png')}
		style={styles.poi_icon}
	/>,
	'transport.taxi_stations': <Image
		source={require('../assets/POIType/TaxiStation.png')}
		style={styles.poi_icon}
	/>,
	'facility': <Image
		source={require('../assets/POIType/Facilities.png')}
		style={styles.poi_icon}
	/>,
	'workplace': <Image
		source={require('../assets/POIType/Workplace.png')}
		style={styles.poi_icon}
	/>,
	'restaurants.panasian': <Image
		source={require('../assets/POIType/Restaurant.png')}
		style={styles.poi_icon}
	/>,
	'restaurants.hotpot': <Image
		source={require('../assets/POIType/Restaurant.png')}
		style={styles.poi_icon}
	/>,
	'professional_services': <Image
		source={require('../assets/POIType/ProfessionalServices.png')}
		style={styles.poi_icon}
	/>,
	'professional_services.company': <Image
		source={require('../assets/POIType/ProfessionalServices.png')}
		style={styles.poi_icon}
	/>,
	'shopping.opticians': <Image
		source={require('../assets/POIType/Opticians.png')}
		style={styles.poi_icon}
	/>,
	'facility.pillar_box': <Image
		source={require('../assets/POIType/Facilities.png')}
		style={styles.poi_icon}
	/>,
	'health_medical.pharmacy': <Image
		source={require('../assets/POIType/Pharmacy.png')}
		style={styles.poi_icon}
	/>,
	'shopping.supermarket': <Image
		source={require('../assets/POIType/Shopping.png')}
		style={styles.poi_icon}
	/>,
	'shopping.cosmetics': <Image
		source={require('../assets/POIType/Cosmetics.png')}
		style={styles.poi_icon}
	/>,
	'shopping.clothes.mens_cloth': <Image
		source={require('../assets/POIType/FittingRoom.png')}
		style={styles.poi_icon}
	/>,
	'shopping.sport_goods': <Image
		source={require('../assets/POIType/Sportgoods.png')}
		style={styles.poi_icon}
	/>,
	'facility.coin_locker': <Image
		source={require('../assets/POIType/CoinLockers.png')}
		style={styles.poi_icon}
	/>,
	'shopping.food': <Image
		source={require('../assets/POIType/Shopping.png')}
		style={styles.poi_icon}
	/>,
	'unspecified': <Image
		source={require('../assets/POIType/Others.png')}
		style={styles.poi_icon}
	/>,
	'restaurants.food_court': <Image
		source={require('../assets/POIType/Restaurant.png')}
		style={styles.poi_icon}
	/>,
	'shopping.grocery': <Image
		source={require('../assets/POIType/Shopping.png')}
		style={styles.poi_icon}
	/>,
	'professional_services.financial_services.banks': <Image
		source={require('../assets/POIType/Bank.png')}
		style={styles.poi_icon}
	/>,
	'shopping.accessories': <Image
		source={require('../assets/POIType/Shopping.png')}
		style={styles.poi_icon}
	/>,
	'shopping.beer_and_wine': <Image
		source={require('../assets/POIType/Shopping.png')}
		style={styles.poi_icon}
	/>,
	'shopping.stationery': <Image
		source={require('../assets/POIType/Stationery.png')}
		style={styles.poi_icon}
	/>,
	'shopping.electronics': <Image
		source={require('../assets/POIType/Electronics.png')}
		style={styles.poi_icon}
	/>,
	'facility.voice_atm': <Image
		source={require('../assets/POIType/Facilities.png')}
		style={styles.poi_icon}
	/>,
	'restaurants.bbq': <Image
		source={require('../assets/POIType/Restaurant.png')}
		style={styles.poi_icon}
	/>,
	'shopping.convenience': <Image
		source={require('../assets/POIType/Shopping.png')}
		style={styles.poi_icon}
	/>,
	'shopping.health_care': <Image
		source={require('../assets/POIType/Shopping.png')}
		style={styles.poi_icon}
	/>,
	'facility.exhibit': <Image
		source={require('../assets/POIType/Exhibit.png')}
		style={styles.poi_icon}
	/>,
	'facility.cashier': <Image
		source={require('../assets/POIType/Facilities.png')}
		style={styles.poi_icon}
	/>,
	'shopping.home_and_garden': <Image
		source={require('../assets/POIType/Furniture.png')}
		style={styles.poi_icon}
	/>,
	'health_medical': <Image
		source={require('../assets/POIType/HealthMedical.png')}
		style={styles.poi_icon}
	/>,
	'restaurants.japanese': <Image
		source={require('../assets/POIType/Restaurant.png')}
		style={styles.poi_icon}
	/>,
	'shopping.photographystores': <Image
		source={require('../assets/POIType/Shopping.png')}
		style={styles.poi_icon}
	/>,
	'shopping.souvenirs': <Image
		source={require('../assets/POIType/Shopping.png')}
		style={styles.poi_icon}
	/>,
	'facility.connector.ramp': <Image
		source={require('../assets/POIType/Ramp.png')}
		style={styles.poi_icon}
	/>,
	'professional_services.financial_services': <Image
		source={require('../assets/POIType/ProfessionalServices.png')}
		style={styles.poi_icon}
	/>,
};

export default poiType;
