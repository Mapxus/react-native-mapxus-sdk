package com.mapxus.map.components.visual

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.ThemedReactContext
import com.mapxus.map.components.AbstractEventEmitter
import com.mapxus.map.events.constants.EventKeys

/**
 * Created by nickitaliano on 9/27/17.
 */

private const val METHOD_RENDER_FLAG_USING_NODES = 1
private const val METHOD_CLEAN_LAYER = 2
private const val METHOD_CHANGEON = 3
private const val METHOD_UPDATE_MARKER_ROTATE = 4
private const val METHOD_SET_MAP_MARKER = 5

class RCTMapxusVisualNodeViewManager(reactApplicationContext: ReactApplicationContext?) :
    AbstractEventEmitter<RCTMapxusVisualNodeView?>(reactApplicationContext) {
    override fun customEvents(): Map<String, String>? {
        return MapBuilder.builder<String, String>()
            .put(EventKeys.VISUAL_ON_TAPPED_FLAG, "onTappedFlag")
            .build()
    }

    override fun getCommandsMap(): Map<String, Int>? {
        return MapBuilder.builder<String, Int>()
            .put("renderFlagUsingNodes", METHOD_RENDER_FLAG_USING_NODES)
            .put("cleanLayer", METHOD_CLEAN_LAYER)
            .put("changeOn", METHOD_CHANGEON)
            .put("updateMarkerRotate", METHOD_UPDATE_MARKER_ROTATE)
            .put("setMapMarker", METHOD_SET_MAP_MARKER)
            .build()
    }

    override fun getName(): String {
        return REACT_CLASS
    }

    override fun createViewInstance(reactContext: ThemedReactContext): RCTMapxusVisualNodeView {
        return RCTMapxusVisualNodeView(reactContext, this)
    }

    override fun receiveCommand(
        mapxusVisualNodeView: RCTMapxusVisualNodeView,
        commandID: Int,
        args: ReadableArray?
    ) {
        when (commandID) {
            METHOD_RENDER_FLAG_USING_NODES -> mapxusVisualNodeView.renderFlagUsingNodes(args)
            METHOD_CLEAN_LAYER -> mapxusVisualNodeView.cleanLayer()
            METHOD_CHANGEON -> mapxusVisualNodeView.changeOn(args)
            METHOD_UPDATE_MARKER_ROTATE -> mapxusVisualNodeView.updateMarkerRotate(args)
            METHOD_SET_MAP_MARKER -> mapxusVisualNodeView.setMapMarker(args)
        }
    }

    companion object {
        const val REACT_CLASS = "MXVisualNodeView"
    }
}