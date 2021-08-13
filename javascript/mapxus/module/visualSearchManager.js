import { NativeModules } from 'react-native';

const module = NativeModules.MXVisualSearchModule;

/**
 * Visual data search service
 */
class VisualSearchManager {

  /**
   * Search visual data in building.
   * @param {VisualSearchProps} params parameters of visual data: buildingId: The buildingId which will search in; scope: The level of detail of the visual data.
   * @returns {Promise<VisualNodeGroup[]>} 
   */
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