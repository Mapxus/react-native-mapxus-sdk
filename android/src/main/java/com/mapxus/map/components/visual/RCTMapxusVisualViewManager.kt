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


private const val METHOD_LOAD_VISUALVIEW_WITH_FIRST_IMG = 1
private const val METHOD_UNLOAD_VISUALVIEW = 2
private const val METHOD_MOVE_TO_KEY = 3
private const val METHOD_MOVE_CLOSE_TO = 4
private const val METHOD_RESIZE = 5
private const val METHOD_GET_BEARING = 6
private const val METHOD_SET_BEARING = 7
private const val METHOD_GET_VISUAL_CENTER = 8
private const val METHOD_SET_VISUAL_CENTER = 9
private const val METHOD_GET_ZOOM = 10
private const val METHOD_SET_ZOOM = 11
private const val METHOD_ACTIVATE_BEARING = 12
private const val METHOD_DEACTIVATE_BEARING = 13
class RCTMapxusVisualViewManager(reactApplicationContext: ReactApplicationContext?) :
    AbstractEventEmitter<RCTMapxusVisualView?>(reactApplicationContext) {
    override fun customEvents(): Map<String, String>? {
        return MapBuilder.builder<String, String>()
            .put(EventKeys.VISUAL_ON_LOAD_FAIL, "onLoadFail")
            .put(EventKeys.VISUAL_ON_RENDER_COMPLETE, "onRenderComplete")
            .put(EventKeys.VISUAL_ON_LOADING_CHANGED, "onLoadingChanged")
            .put(EventKeys.VISUAL_ON_BEARING_CHANGED, "onBearingChanged")
            .put(EventKeys.VISUAL_ON_NODE_CHANGED, "onNodeChanged")
            .build()
    }

    override fun getCommandsMap(): Map<String, Int>? {
        return MapBuilder.builder<String, Int>()
            .put("loadVisualViewWithFirstImg", METHOD_LOAD_VISUALVIEW_WITH_FIRST_IMG)
            .put("unloadVisualView", METHOD_UNLOAD_VISUALVIEW)
            .put("moveToKey", METHOD_MOVE_TO_KEY)
            .put("moveCloseTo", METHOD_MOVE_CLOSE_TO)
            .put("resize", METHOD_RESIZE)
            .put("getBearing", METHOD_GET_BEARING)
            .put("setBearing", METHOD_SET_BEARING)
            .put("getVisualCenter", METHOD_GET_VISUAL_CENTER)
            .put("setVisualCenter", METHOD_SET_VISUAL_CENTER)
            .put("getZoom", METHOD_GET_ZOOM)
            .put("setZoom", METHOD_SET_ZOOM)
            .put("activateBearing", METHOD_ACTIVATE_BEARING)
            .put("deactivateBearing", METHOD_DEACTIVATE_BEARING)
            .build()
    }

    override fun getName(): String {
        return REACT_CLASS
    }

    override fun createViewInstance(reactContext: ThemedReactContext): RCTMapxusVisualView {
        return RCTMapxusVisualView(reactContext, this)
    }

    override fun receiveCommand(
        mapxusVisualView: RCTMapxusVisualView,
        commandID: Int,
        args: ReadableArray?
    ) {
        when (commandID) {
            METHOD_LOAD_VISUALVIEW_WITH_FIRST_IMG -> mapxusVisualView.loadVisualViewWithFirstImg(args)
            METHOD_UNLOAD_VISUALVIEW -> mapxusVisualView.unloadVisualView(args)
            METHOD_MOVE_TO_KEY -> mapxusVisualView.moveToKey(args)
            METHOD_MOVE_CLOSE_TO -> mapxusVisualView.moveCloseTo(args)
            METHOD_RESIZE -> mapxusVisualView.resize(args)
            METHOD_GET_BEARING -> mapxusVisualView.getBearing(args)
            METHOD_SET_BEARING -> mapxusVisualView.setBearing(args)
            METHOD_GET_VISUAL_CENTER -> mapxusVisualView.getVisualCenter(args)
            METHOD_SET_VISUAL_CENTER -> mapxusVisualView.setVisualCenter(args)
            METHOD_GET_ZOOM -> mapxusVisualView.getZoom(args)
            METHOD_SET_ZOOM -> mapxusVisualView.setZoom(args)
            METHOD_ACTIVATE_BEARING -> mapxusVisualView.activateBearing(args)
            METHOD_DEACTIVATE_BEARING -> mapxusVisualView.deactivateBearing(args)
        }
    }

    companion object {
        const val REACT_CLASS = "MXVisualView"
    }
}