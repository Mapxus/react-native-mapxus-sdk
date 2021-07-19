import React from 'react';
import {Image, Text} from 'react-native';
import CreateMapByCoordinate from '../CreateMapByCoordinate';
import CreateMapByBuilding from '../CreateMapByBuilding';
import CreateMapByPOI from '../CreateMapByPOI';
import IndoorControls from '../IndoorControls';
import MapAppearance from '../MapAppearance';
import SwitchingBuildingGestures from '../SwitchingBuildingGestures';
import FocusOnIndoorScene from '../FocusOnIndoorScene';
import ClickEventListening from '../ClickEventListening';
import SceneChangedEventListening from '../SceneChangedEventListening';
import IndoorSceneInAndOutListening from '../IndoorSceneInAndOutListening'
import IndoorMarker from '../IndoorMarker';
import IndoorPolygon from '../IndoorPolygon';
import DisplayLocation from '../DisplayLocation';
import SearchBuildingGlobal from '../SearchBuildingGlobal';
import SearchBuildingInBound from '../SearchBuildingInBound';
import SearchBuildingNearby from '../SearchBuildingNearby';
import SearchBuildingByID from '../SearchBuildingByID';
import CategoryIncludedInScene from '../CategoryIncludedInScene';
import SearchPOIInScene from '../SearchPOIInScene';
import SearchPOIInBound from '../SearchPOIInBound';
import SearchPOINearby from '../SearchPOINearby';
import SearchPOIByID from '../SearchPOIByID';
import SurroundingIdentification from '../SurroundingIdentification';
import Route from '../Route';
import VisualMap from '../VisualMap';
import SearchIntegrate from '../SearchIntegrate';

const samples: any = {
	map_creation: [
		{
			id: 'create_map_by_coordinate',
			category: 'map_creation',
			menuImg: <Image
				source={require('../assets/CreateMapByCoordinate.png')}
				style={{height: '100%', width: '100%'}}
			/>,
			header: 'Create map by coordinate',
			title: 'Create a map (with the central point)',
			subTitle: 'The map will initial display centered on the specified coordinate.',
			component: <CreateMapByCoordinate/>
		},
		{
			id: 'create_map_by_building',
			category: 'map_creation',
			menuImg: <Image
				source={require('../assets/CreateMapByBuilding.png')}
				style={{height: '100%', width: '100%'}}
			/>,
			header: 'Create map by building',
			title: 'Create a map（with the building, floor and zoom insets）',
			subTitle: 'The map will initial display positioned at the specified zoom insets to the specified floor of building.',
			component: <CreateMapByBuilding/>
		},
		{
			id: 'create_map_by_poi',
			category: 'map_creation',
			menuImg: <Image
				source={require('../assets/CreateMapByPOI.png')}
				style={{height: '100%', width: '100%'}}
			/>,
			header: 'Create map by POI',
			title: 'Create a map（with the POI and zoom level）',
			subTitle: 'The map will initial display positioned at the specified zoom level to the POI.',
			component: <CreateMapByPOI/>
		},
	],
	map_interaction: [
		{
			id: 'indoor_controls',
			category: 'map_interaction',
			menuImg: <Image
				source={require('../assets/IndoorControls.png')}
				style={{height: '100%', width: '100%'}}
			/>,
			header: 'Indoor controls',
			title: 'Indoor map controllers interaction',
			subTitle: 'Set the map floor controller\'s position and whether it is displayed.',
			component: <IndoorControls/>
		},
		{
			id: 'map_appearance',
			category: 'map_interaction',
			menuImg: <Image
				source={require('../assets/MapAppearance.png')}
				style={{height: '100%', width: '100%'}}
			/>,
			header: 'Map appearance',
			title: 'Set the appearance of the map',
			subTitle: 'Set the map style, language and whether to display the outdoor map.',
			component: <MapAppearance/>
		},
/*		{
			id: 'switching_building_gestures',
			category: 'map_interaction',
			menuImg: <Image
				source={require('../assets/SwitchingBuildingGestures.png')}
				style={{height: '100%', width: '100%'}}
			/>,
			header: 'Switching building gestures',
			title: '切换建筑的手势交互',
			subTitle: '设置切换建筑手势。',
			component: <SwitchingBuildingGestures/>
		},*/
		{
			id: 'focus_on_indoor_scene',
			category: 'map_interaction',
			menuImg: <Image
				source={require('../assets/FocusOnIndoorScene.png')}
				style={{height: '100%', width: '100%'}}
			/>,
			header: 'Focus on indoor scene',
			title: 'Functions interaction (switching indoor scenes)',
			subTitle: 'Call the function to focus on the specified indoor scenes.',
			component: <FocusOnIndoorScene/>
		},
		{
			id: 'click_event_listening',
			category: 'map_interaction',
			menuImg: <Image
				source={require('../assets/ClickEventListening.png')}
				style={{height: '100%', width: '100%'}}
			/>,
			header: 'Click event listening',
			title: 'Events interaction（click events listening）',
			subTitle: 'Listen for map click and long press events, and POI click events.',
			component: <ClickEventListening/>
		},
		{
			id: 'scene_changed_event_listening',
			category: 'map_interaction',
			menuImg: <Image
				source={require('../assets/SceneChangedEventListening.png')}
				style={{height: '100%', width: '100%'}}
			/>,
			header: 'Scene changed event listening',
			title: 'Events interaction（indoor scenes changed events listening）',
			subTitle: 'Listen for map indoor scenes changed events.',
			component: <SceneChangedEventListening/>
		},
		{
			id: 'indoor_scene_in_and _out_listening',
			category: 'map_interaction',
			menuImg: <Image
				source={require('../assets/IndoorSceneInAndOutListening.png')}
				style={{height: '100%', width: '100%'}}
			/>,
			header: 'Indoor scene in and out listening',
			title: 'Events interaction（in or out the building）',
			subTitle: 'Listen to whether the map is indoors or outdoors.',
			component: <IndoorSceneInAndOutListening/>
		}
	],
	map_drawing: [
		{
			id: 'indoor_marker',
			category: 'map_drawing',
			menuImg: <Image
				source={require('../assets/IndoorMarker.png')}
				style={{height: '100%', width: '100%'}}
			/>,
			header: 'Indoor marker',
			title: 'Draw the POIs by floor',
			subTitle: 'The indoor map just shows the POIs of current floor.',
			component: <IndoorMarker/>
		},
		{
			id: 'indoor_polygon',
			category: 'map_drawing',
			menuImg: <Image
				source={require('../assets/IndoorPolygon.png')}
				style={{height: '100%', width: '100%'}}
			/>,
			header: 'Indoor polygon',
			title: 'Draw polygons by floor',
			subTitle: 'The indoor map just shows the polygons of current floor.',
			component: <IndoorPolygon/>
		}
	],
	map_location: [
		{
			id: 'display_location',
			category: 'map_location',
			menuImg: <Image
				source={require('../assets/DisplayLocation.png')}
				style={{height: '100%', width: '100%'}}
			/>,
			header: 'Display location',
			title: 'Indoor positioning',
			subTitle: 'The map shows the indoor positioning and the map following.',
			component: <DisplayLocation/>
		}
	],
	map_search: [
		{
			id: 'search_building_global',
			category: 'map_search',
			menuImg: <Image
				source={require('../assets/SearchBuildingGlobal.png')}
				style={{height: '100%', width: '100%'}}
			/>,
			header: 'Search building global',
			title: 'Buildings global search',
			subTitle: 'Search the specified buildings all over the world.',
			component: <SearchBuildingGlobal/>
		},
		{
			id: 'search_building_in_bound',
			category: 'map_search',
			menuImg: <Image
				source={require('../assets/SearchBuildingInBound.png')}
				style={{height: '100%', width: '100%'}}
			/>,
			header: 'Search building in bound',
			title: 'Search buildings in a bbox',
			subTitle: 'Search buildings from the specified rectangular area.',
			component: <SearchBuildingInBound/>
		},
		{
			id: 'search_building_nearby',
			category: 'map_search',
			menuImg: <Image
				source={require('../assets/SearchBuildingNearby.png')}
				style={{height: '100%', width: '100%'}}
			/>,
			header: 'Search building nearby',
			title: 'Search buildings nearby',
			subTitle: 'Search buildings from the specified square of a point.',
			component: <SearchBuildingNearby/>
		},
		{
			id: 'search_building_by_ID',
			category: 'map_search',
			menuImg: <Image
				source={require('../assets/SearchBuildingByID.png')}
				style={{height: '100%', width: '100%'}}
			/>,
			header: 'Search building by ID',
			title: 'Search buildings by IDs',
			subTitle: 'Accurately search for specific buildings by IDs.',
			component: <SearchBuildingByID/>
		},
		{
			id: 'category_included_in_scene',
			category: 'map_search',
			menuImg: <Image
				source={require('../assets/CategoryIncludedInScene.png')}
				style={{height: '100%', width: '100%'}}
			/>,
			header: 'Category included in scene',
			title: 'Search POI categories of the specified indoor scene',
			subTitle: 'Search all POI categories of the floor of a building or the whole building.',
			component: <CategoryIncludedInScene/>
		},
		{
			id: 'search_POI_in_scene',
			category: 'map_search',
			menuImg: <Image
				source={require('../assets/SearchPOIInScene.png')}
				style={{height: '100%', width: '100%'}}
			/>,
			header: 'Search POI in scene',
			title: 'Search POIs in the specified indoor scene',
			subTitle: 'Search POIs from the specified floor of a building。',
			component: <SearchPOIInScene/>
		},
		{
			id: 'search_POI_in_bound',
			category: 'map_search',
			menuImg: <Image
				source={require('../assets/SearchPOIInBound.png')}
				style={{height: '100%', width: '100%'}}
			/>,
			header: 'Search POIs in bound',
			title: 'Search POIs in a bbox',
			subTitle: 'Search POIs from the specified rectangular area.',
			component: <SearchPOIInBound/>
		},
		{
			id: 'search_POI_nearby',
			category: 'map_search',
			menuImg: <Image
				source={require('../assets/SearchPOINearby.png')}
				style={{height: '100%', width: '100%'}}
			/>,
			header: 'Search POI nearby',
			title: 'Search POIs nearby',
			subTitle: 'Search POIs near the specified center by building or ordinal.',
			component: <SearchPOINearby/>
		},
		{
			id: 'search_POI_by_ID',
			category: 'map_search',
			menuImg: <Image
				source={require('../assets/SearchPOIByID.png')}
				style={{height: '100%', width: '100%'}}
			/>,
			header: 'Search POI by ID',
			title: 'Search POIs by IDs',
			subTitle: 'Accurately search for specific POIs by IDs.',
			component: <SearchPOIByID/>
		},
	],
	map_cases: [
		{
			id: 'surrounding_identification',
			category: 'map_cases',
			menuImg: <Image
				source={require('../assets/SurroundingIdentification.png')}
				style={{height: '100%', width: '100%'}}
			/>,
			header: 'Surrounding identification',
			title: 'Surrounding identification',
			subTitle: 'Make the virtual positioning and identify the POIs surrounding.',
			component: <SurroundingIdentification/>
		},
		{
			id: 'route',
			category: 'map_cases',
			menuImg: <Image
				source={require('../assets/Route.png')}
				style={{height: '100%', width: '100%'}}
			/>,
			header: 'Route',
			title: 'Route planning',
			subTitle: 'Search for routes between the two places by different modes of transportation.',
			component: <Route/>
		},
/*		{
			id: 'visual_map',
			category: 'map_cases',
			menuImg: <Image
				source={require('../assets/VisualMap.png')}
				style={{height: '100%', width: '100%'}}
			/>,
			header: 'Visual map',
			title: 'Visual map',
			subTitle: '介绍Visual的集成。',
			component: <VisualMap/>
		},
		{
			id: 'search_integrate',
			category: 'map_cases',
			menuImg: <Image
				source={require('../assets/SearchIntegrate.png')}
				style={{height: '100%', width: '100%'}}
			/>,
			header: 'Search integrate',
			title: 'Explore 搜索',
			subTitle: '介绍建筑内POI常见搜索的集成。',
			component: <SearchIntegrate/>
		},*/
	]
};

const navs: any[] = [
	{
		id: 'map_creation',
		text: 'Map Creation'
	},
	{
		id: 'map_interaction',
		text: 'Map Interaction'
	},
	{
		id: 'map_drawing',
		text: 'Draw on the Map'
	},
	{
		id: 'map_location',
		text: 'Map Positioning'
	},
	{
		id: 'map_search',
		text: 'Map Search'
	},
	{
		id: 'map_cases',
		text: 'Map Cases'
	}
];

export {navs, samples};
