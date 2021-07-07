import { NativeModules } from 'react-native';

const module = NativeModules.MXPoiCategorySearchModule;

/**
 * POI category search
 */
class PoiCategorySearchManager {

  /**
   * POI category search, which allows you to know what type of POI is in a building floor. 
   * @param {*} params The POI category search request parameters is as follows: buildingId, floor.
   * @returns {Promise}
   */
  async poiCategorySearch(params) {
    const result = await module.poiCategorySearch(params);
    return result;
  }
}

const poiCategorySearchManager = new PoiCategorySearchManager();

export default poiCategorySearchManager;