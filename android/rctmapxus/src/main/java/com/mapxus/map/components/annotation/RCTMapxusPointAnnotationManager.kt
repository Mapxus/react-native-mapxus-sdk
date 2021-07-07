package com.mapxus.map.components.annotation

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.mapxus.map.components.AbstractEventEmitter
import com.mapxus.map.events.constants.EventKeys
import com.mapxus.map.utils.GeoJSONUtils

/**
 * Created by nickitaliano on 9/27/17.
 */
class RCTMapxusPointAnnotationManager(reactApplicationContext: ReactApplicationContext?) :
    AbstractEventEmitter<RCTMapxusPointAnnotation?>(reactApplicationContext) {
    override fun customEvents(): Map<String, String>? {
        return MapBuilder.builder<String, String>()
            .put(EventKeys.POINT_ANNOTATION_SELECTED, "onMapboxPointAnnotationSelected")
            .put(EventKeys.POINT_ANNOTATION_DESELECTED, "onMapboxPointAnnotationDeselected")
            .put(EventKeys.POINT_ANNOTATION_DRAG_START, "onMapboxPointAnnotationDragStart")
            .put(EventKeys.POINT_ANNOTATION_DRAG, "onMapboxPointAnnotationDrag")
            .put(EventKeys.POINT_ANNOTATION_DRAG_END, "onMapboxPointAnnotationDragEnd")
            .build()
    }

    override fun getCommandsMap(): Map<String, Int>? {
        return MapBuilder.builder<String, Int>()
            .put("refresh", METHOD_REFRESH)
            .build()
    }

    override fun getName(): String {
        return REACT_CLASS
    }

    override fun createViewInstance(reactContext: ThemedReactContext): RCTMapxusPointAnnotation {
        return RCTMapxusPointAnnotation(reactContext, this)
    }

    @ReactProp(name = "id")
    fun setId(annotation: RCTMapxusPointAnnotation, id: String) {
        annotation.iD = id
    }

    @ReactProp(name = "coordinate")
    fun setCoordinate(annotation: RCTMapxusPointAnnotation, geoJSONStr: String?) {
        annotation.setCoordinate(GeoJSONUtils.toPointGeometry(geoJSONStr))
    }

    @ReactProp(name = "anchor")
    fun setAnchor(annotation: RCTMapxusPointAnnotation, map: ReadableMap) {
        annotation.setAnchor(map.getDouble("x").toFloat(), map.getDouble("y").toFloat())
    }

    @ReactProp(name = "draggable")
    fun setDraggable(annotation: RCTMapxusPointAnnotation, draggable: Boolean) {
        annotation.setDraggable(draggable)
    }

    @ReactProp(name = "buildingId")
    fun setBuildingId(annotation: RCTMapxusPointAnnotation, buildingId: String?) {
        annotation.setBuildingId(buildingId)
    }

    @ReactProp(name = "floor")
    fun setFloor(annotation: RCTMapxusPointAnnotation, floor: String?) {
        annotation.setFloor(floor)
    }

    override fun receiveCommand(
        rctMapxusPointAnnotation: RCTMapxusPointAnnotation,
        commandID: Int,
        args: ReadableArray?
    ) {
        when (commandID) {
            METHOD_REFRESH -> rctMapxusPointAnnotation.refresh()
        }
    }

    companion object {
        const val REACT_CLASS = "MXPointAnnotationView"

        //region React Methods
        const val METHOD_REFRESH = 2
    }
}