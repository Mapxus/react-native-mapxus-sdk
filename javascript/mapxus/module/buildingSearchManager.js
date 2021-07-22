import { NativeModules } from 'react-native';

const module = NativeModules.MXBuildingSearchModule;

/**
 * Use buildingSearchManager to search the indoor buildings we offer and get the building details.
 */
class BuildingSearchManager {

    /**
     * Search for buildings worldwide.
     * @param {*} params parameters of the global search: keywords (optional), offset, page.
     * @returns {Promise}
     */
    async buildingSearchGlobal(params = {}) {
        try {
            const result = await module.buildingSearchGlobal(params);
            return result;
        } catch (err) {
            console.log(err);
            return {};
        }
    }

    /**
     * Search within a rectangular area.
     * @param {*} params parameters for searching within a rectangular area: keywords (optional), bbox, offset, page.
     * @returns {Promise}
     */
    async buildingSearchOnBbox(params = {}) {
        try {
            const result = await module.buildingSearchOnBbox(params);
            return result;
        } catch (err) {
            console.log(err);
            return {};
        }
    }

    /**
     * Search within a circular area.
     * @param {*} params parameters for searching within a circular area: keywords (optional), center, distance, offset, page. 
     * @returns {Promise}
     */
    async buildingSearchNearbyCenter(params) {
        try {
            const result = await module.buildingSearchNearbyCenter(params);
            return result;
        } catch (err) {
            console.log(err);
            return {};
        }
    }

    /**
     * Search building by buildingId.
     * @param {*} params parameters for searching with buildingId: buildingIds.
     * @returns {Promise}
     */
    async buildingSearchByIds(params) {
        try {
            const result = await module.buildingSearchByIds(params);
            return result;
        } catch (err) {
            console.log(err);
            return {};
        }
    }
}

const buildingSearchManager = new BuildingSearchManager();

export default buildingSearchManager;