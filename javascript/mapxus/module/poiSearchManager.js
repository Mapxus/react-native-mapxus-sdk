import { NativeModules } from 'react-native';

const module = NativeModules.MXPoiSearchModule;

/**
 * Use poiSearchManager to search the indoor POI we offer and get the POI details.
 */
class PoiSearchManager {

    /**
     * Search by Building Information
     * @param {*} params parameters for POIs searching in the specified building: keywords (optional), 
     * buildingId, floor (optional), offset, page, category(optional).
     * @returns {Promise}
     */
    async poiSearchInIndoorScene(params) {
        try {
            const result = await module.poiSearchInIndoorScene(params);
            return result;
        } catch (err) {
            console.log(err);
            return {};
        }
    }

    /**
     * Search within a rectangular area.
     * @param {*} params parameters for searching within a rectangular area: keywords (optional), bbox, 
     * offset, page, category(optional).
     * @returns {Promise}
     */
    async poiSearchOnBbox(params) {
        try {
            const result = await module.poiSearchOnBbox(params);
            return result;
        } catch (err) {
            console.log(err);
            return {};
        }

    }

    /**
     * Search within a circular area.
     * @param {*} params parameters for searching within a circular area: keywords (optional), center, 
     * meterDistance, offset, page, category (optional).
     * @returns {Promise}
     */
    async poiSearchNearbyCenter(params) {
        try {
            const result = await module.poiSearchNearbyCenter(params);
            return result;
        } catch (err) {
            console.log(err);
            return {};
        }

    }

    /**
     * Search POI by POIId.
     * @param {*} params parameters for searching with POIId: POIIds.
     * @returns {Promise}
     */
    async poiSearchByIds(params) {
        try {
            const result = await module.poiSearchByIds(params);
            return result;
        } catch (err) {
            console.log(err);
            return {};
        }

    }

    /**
     * Query the angle of the nearby POI relative to the center point. Through this function, you can 
     * view the nearby POI in relative orientation and provide the user with a positioning reference.
     * @param {*} params parameters for searching: angle, distanceSearchType, buildingId, floor, center, distance.
     * @returns {Promise}
     */
    async orientationPoiSearch(params) {
        try {
            const result = await module.orientationPoiSearch(params);
            return result;
        } catch (err) {
            console.log(err);
            return {};
        }

    }
}

const poiSearchManager = new PoiSearchManager();

export default poiSearchManager;