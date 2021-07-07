package com.mapxus.map.events

import android.view.View
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap
import com.mapxus.map.events.constants.EventKeys
import com.mapxus.map.mapxusmap.api.map.model.IndoorBuilding

/**
 * Created by Edison on 3/31/21.
 * Describe:
 */
class MapxusMapBuildingChangeEvent(
    view: View?,
    private val indoorBuilding: IndoorBuilding?
) : AbstractEvent(view, EventKeys.MAP_BUILDING_CHANGE) {

    override fun getKey(): String {
        return EventKeys.MAP_BUILDING_CHANGE
    }

    override fun toJSON(): WritableMap? {
        return Arguments.createMap().apply {
            putString("type", type)
            merge(payload)
        }
    }

    override fun getPayload(): WritableMap {
        return WritableNativeMap().apply {
            putString("buildingId", indoorBuilding?.buildingId)
            putString("floor", indoorBuilding?.groundFloor)
            putBoolean("flag", indoorBuilding != null)
        }
    }
}