package com.mapxus.map.events

import android.view.View
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.mapxus.map.events.constants.EventKeys

/**
 * Created by Edison on 3/31/21.
 * Describe:
 */
class MapxusMapLocationEvent(
    view: View?,
    eventType: String,
    private val payLoad: WritableMap = Arguments.createMap()
) : AbstractEvent(view, eventType) {

    override fun getKey(): String = EventKeys.MAPXUS_USER_LOCATION_UPDATE

    override fun getPayload(): WritableMap {
        val payloadClone = Arguments.createMap()
        payloadClone.merge(payLoad)
        return payloadClone
    }

    override fun canCoalesce(): Boolean {
        // Make sure EventDispatcher never merges EventKeys.MAP_ONCHANGE events.
        // This event name is used to emit events with different
        // com.mapbox.rctmgl.events.constants.EventTypes which are dispatched separately on
        // the JS side
        return false
    }
}