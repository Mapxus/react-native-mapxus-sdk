package com.mapxus.map.events

import android.view.View
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap
import com.mapbox.mapboxsdk.geometry.LatLng
import com.mapxus.map.mapxusmap.api.map.model.IndoorBuilding

/**
 * Created by Edison on 3/31/21.
 * Describe:
 */
class MapxusMapClickEvent(
    view: View?,
    private val latLng: LatLng,
    private val eventType: String,
    private val floor: String?,
    private val building: IndoorBuilding?,
) : AbstractEvent(view, eventType) {
    override fun getPayload(): WritableMap {
        return WritableNativeMap().apply {
            putMap("coordinates", WritableNativeMap().apply {
                putDouble("latitude", latLng.latitude)
                putDouble("longitude", latLng.longitude)
                putDouble("elevation", latLng.altitude)
            })
            putString("floor", floor)
            if (building != null) {
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
            } else {
                putMap("building", WritableNativeMap())
            }

        }
    }

    override fun toJSON(): WritableMap {
        return Arguments.createMap().apply {
            putString("type", type)
            merge(payload)
        }
    }

    override fun getKey(): String = eventType

    override fun canCoalesce(): Boolean {
        // Make sure EventDispatcher never merges EventKeys.MAP_ONCHANGE events.
        // This event name is used to emit events with different
        // com.mapbox.rctmgl.events.constants.EventTypes which are dispatched separately on
        // the JS side
        return false
    }
}