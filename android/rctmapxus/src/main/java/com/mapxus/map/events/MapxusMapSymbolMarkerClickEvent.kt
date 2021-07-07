//package com.mapxus.map.events
//
//import android.graphics.PointF
//import android.view.View
//import com.facebook.react.bridge.WritableMap
//import com.facebook.react.bridge.WritableNativeMap
//import com.mapbox.mapboxsdk.geometry.LatLng
//import com.mapxus.map.events.constants.EventKeys
//import com.mapxus.map.utils.GeoJSONUtils
//import com.mapxus.map.mapxusmap.api.map.model.overlay.SymbolMarker
//
///**
// * Created by Edison on 3/31/21.
// * Describe:
// */
//class MapxusMapSymbolMarkerClickEvent(private val view: View?, private val latLng: LatLng, private val screenPoint: PointF,
//                                      private val symbolMarker: SymbolMarker) : AbstractEvent(view, EventKeys.MAP_MARKER_CLICK) {
//    override fun getKey(): String {
//        return EventKeys.MAP_MARKER_CLICK
//    }
//
//    override fun getPayload(): WritableMap? {
//        val properties: WritableMap = WritableNativeMap()
//        properties.putDouble("screenPointX", screenPoint.x.toDouble())
//        properties.putDouble("screenPointY", screenPoint.y.toDouble())
//        val map = GeoJSONUtils.toPointFeature(latLng, properties)
//        val poiMap: WritableMap = WritableNativeMap().apply {
//            putString("floor", symbolMarker.floor)
//            putString("buildingId", symbolMarker.buildingId)
//            putInt("icon", symbolMarker.icon)
//            putDouble("iconSize", symbolMarker.iconSize.toDouble())
//        }
//        map.putMap("symbolMarker", poiMap)
//        return map
//    }
//}