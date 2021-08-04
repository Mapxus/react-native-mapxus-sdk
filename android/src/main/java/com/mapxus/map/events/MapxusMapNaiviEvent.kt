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
class MapxusMapNaiviEvent(
    view: View?,
    private val eventType: String,
    private val data: WritableNativeMap = WritableNativeMap(),
) : AbstractEvent(view, eventType) {
    override fun getPayload(): WritableMap {
        return data
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