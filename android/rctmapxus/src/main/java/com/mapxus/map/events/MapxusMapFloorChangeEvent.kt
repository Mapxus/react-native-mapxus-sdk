package com.mapxus.map.events

import android.view.View
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap
import com.mapxus.map.events.constants.EventKeys
import com.mapxus.map.mapxusmap.api.map.model.IndoorBuilding

/**
 * Created by Edison on 3/31/21.
 * Describe:
 */
class MapxusMapFloorChangeEvent(
    view: View?,
    private val indoorBuilding: IndoorBuilding,
    private val floor: String
) : AbstractEvent(view, EventKeys.MAP_FLOOR_CHANGE) {
    override fun getKey(): String {
        return EventKeys.MAP_FLOOR_CHANGE
    }

    override fun toJSON(): WritableMap? {
        return Arguments.createMap().apply {
            putString("type", type)
            merge(payload)
        }
    }

    override fun getPayload(): WritableMap {
        return WritableNativeMap().apply {
            putString("floor", floor)
            putMap("building", WritableNativeMap().apply {
                putString("identifier", indoorBuilding.buildingId)
                putString("building", indoorBuilding.type)
                putString("venueId", indoorBuilding.venueId)
                putString("name", indoorBuilding.buildingName)
                putString("name_en", indoorBuilding.nameEn)
                putString("name_cn", indoorBuilding.nameCn)
                putString("name_zh", indoorBuilding.nameZh)
                putString("name_ja", indoorBuilding.nameJa)
                putString("name_ko", indoorBuilding.nameKo)
                putString("ground_floor", indoorBuilding.groundFloor)
                putString("type", indoorBuilding.type)
                putArray("floors", WritableNativeArray().apply {
                    indoorBuilding.floorNames.forEach {
                        pushMap(WritableNativeMap().apply {
                            putString("code", it)
                            putString("floorId", indoorBuilding.floorNameIdMap[it])
                            putInt(
                                "ordinal",
                                indoorBuilding.ordinals[indoorBuilding.floorNames.indexOf(it)].toInt()
                            )
                            putBoolean("hasVisualMap", false)
                        })
                    }
                })
            })
        }
    }
}