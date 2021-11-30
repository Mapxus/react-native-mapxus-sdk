import { NativeModules } from 'react-native';

const module = NativeModules.MXGeocodeSearchModule;

/**
 * Reverse geocoding (coordinate to address)
 */
class GeocodeSearchManager {

  /**
   * Convert the positioning coordinates to the specific building and floor, providing users with more 
   * detailed and more user-friendly positioning information.
   * 
   * @param {*} params parameters of reverse geocode: location, ordinalFloor.
   * @returns {Promise}
   */
  async reverseGeoCode(params) {
    try {
      const result = await module.reverseGeoCode(params);
      return result;
    } catch (err) {
      console.log(err);
      return {};
    }
  }
}

const geocodeSearchManager = new GeocodeSearchManager();

export default geocodeSearchManager;