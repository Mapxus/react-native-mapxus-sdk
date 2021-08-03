import { NativeModules } from 'react-native';

const module = NativeModules.MXVisualSearchModule;

/**
 * Reverse geocoding (coordinate to address)
 */
class VisualSearchManager {

  async searchVisualDataInBuilding(params) {
    try {
      const result = await module.searchVisualDataInBuilding(params);
      return result;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
}

const visualSearchManager = new VisualSearchManager();

export default visualSearchManager;