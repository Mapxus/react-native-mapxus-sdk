import { NativeModules } from 'react-native';

const module = NativeModules.MXRouteSearchModule;

/**
 * Use RouteSearchManager to planning the route.
 */
class RouteSearchManager {

    /**
     * Searh for the route planning
     * @param {*} params parameters for route planning: fromBuilding (optional), fromFloor (optional), fromLon, 
     * fromLat, toBuilding (optional), toFloor (optional), toLon, toLat, vehicle (optional), locale, toDoor (optional).
     * @returns 
     */
    async routeSearch(params) {
        try {
            const result = module.routeSearch(params);
            return result;

        } catch (err) {
            console.log(err);
            return {};
        }
    }
}

const routeSearchManager = new RouteSearchManager()

export default routeSearchManager;