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
        const result = await module.buildingSearchGlobal(params);
        return result;
    }

    /**
     * Search within a rectangular area.
     * @param {*} params parameters for searching within a rectangular area: keywords (optional), bbox, offset, page.
     * @returns {Promise}
     */
    async buildingSearchOnBbox(params = {}) {
        const result = await module.buildingSearchOnBbox(params);
        return result;
    }

    /**
     * Search within a circular area.
     * @param {*} params parameters for searching within a circular area: keywords (optional), center, distance, offset, page. 
     * @returns {Promise}
     */
    async buildingSearchNearbyCenter(params) {
        const result = await module.buildingSearchNearbyCenter(params);
        return result;
    }

    /**
     * Search building by buildingId.
     * @param {*} params parameters for searching with buildingId: buildingIds.
     * @returns {Promise}
     */
    async buildingSearchByIds(params) {
        const result = await module.buildingSearchByIds(params);
        return result;
    }
}

const buildingSearchManager = new BuildingSearchManager();

export default buildingSearchManager;