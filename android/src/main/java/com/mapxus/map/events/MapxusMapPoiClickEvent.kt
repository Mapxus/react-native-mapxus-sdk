package com.mapxus.map.events

import android.view.View
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap
import com.mapxus.map.events.constants.EventKeys
import com.mapxus.map.mapxusmap.api.map.model.IndoorBuilding
import com.mapxus.map.mapxusmap.api.map.model.Poi

/**
 * Created by Edison on 3/31/21.
 * Describe:
 */
class MapxusMapPoiClickEvent(
    view: View?,
    private val building: IndoorBuilding,
    private val poi: Poi
) : AbstractEvent(view, EventKeys.MAP_POI_CLICK) {
    override fun getKey(): String {
        return EventKeys.MAP_POI_CLICK
    }

    override fun getPayload(): WritableMap {
        return WritableNativeMap().apply {
            putString("floor", poi.floorName)
            putMap("coordinates", WritableNativeMap().apply {
                putDouble("latitude", poi.latitude)
                putDouble("longitude", poi.longitude)
                putDouble("elevation", 0.0)
            })
            putMap("building", WritableNativeMap().apply {
                putString("identifier", building.buildingId)
                putString("building", building.type)
                putString("venueId", building.venueId)
                putString("name", building.buildingName)
                putString("name_en", building.nameEn)
                putString("name_cn", building.nameCn)
                putString("name_zh", building.nameZh)
                putString("name_ja", building.nameJa)
                putString("name_ko", building.nameKo)
                putString("ground_floor", building.groundFloor)
                putString("type", building.type)
                putArray("floors", WritableNativeArray().apply {
                    building.floorNames.forEach {
                        pushMap(WritableNativeMap().apply {
                            putString("code", it)
                            putString("floorId", building.floorNameIdMap[it])
                            putInt(
                                "ordinal",
                                building.ordinals[building.floorNames.indexOf(it)].toInt()
                            )
                            putBoolean("hasVisualMap", false)
                        })
                    }
                })
            })
            putMap("poi", WritableNativeMap().apply {
                putString("identifier", poi.id)
                putString("buildingId", poi.buildingId)
                putString("floor", poi.floorName)
                putString("floorId", poi.floor)
                putString("ordinal", poi.ordinal)
                putMap("coordinates", WritableNativeMap().apply {
                    putDouble("latitude", poi.latitude)
                    putDouble("longitude", poi.longitude)
                    putDouble("elevation", 0.0)
                })
                putString("name", poi.name)
                putString("name_en", poi.nameEn)
                putString("name_cn", poi.nameCn)
                putString("name_zh", poi.nameZh)
                putString("name_ja", poi.nameJa)
                putString("name_ko", poi.nameKo)

                putString("accessibilityDetail", poi.accessibilityDetail)
                putString("accessibilityDetail_en", poi.accessibilityDetailEn)
                putString("accessibilityDetail_cn", poi.accessibilityDetailCn)
                putString("accessibilityDetail_zh", poi.accessibilityDetailZh)
                putString("accessibilityDetail_ja", poi.accessibilityDetailJa)
                putString("accessibilityDetail_ko", poi.accessibilityDetailKo)
                putArray("category", WritableNativeArray().apply {
                    pushString(poi.type)
                })
            })
        }
    }

    override fun toJSON(): WritableMap {
        return Arguments.createMap().apply {
            putString("type", type)
            merge(payload)
        }
    }

    override fun canCoalesce(): Boolean {
        // Make sure EventDispatcher never merges EventKeys.MAP_ONCHANGE events.
        // This event name is used to emit events with different
        // com.mapbox.rctmgl.events.constants.EventTypes which are dispatched separately on
        // the JS side
        return false
    }
}