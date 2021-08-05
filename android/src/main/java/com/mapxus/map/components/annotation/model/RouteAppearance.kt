package com.mapxus.map.components.annotation.model

import com.facebook.react.bridge.ReadableMap

/**
 * Created by Edison on 2021/8/2.
 * Describe:
 */
data class RouteAppearance(
    var isAddStartDash: Boolean? = null,
    var isAddEndDash: Boolean? = null,
    var hiddenTranslucentPaths: Boolean? = null,
    var indoorLineColor: Any? = null,
    var outdoorLineColor: Any? = null,
    var dashLineColor: Any? = null,
    var arrowSymbolSpacing: Int? = null,
    var arrowIcon: String? = null,
    var startIcon: String? = null,
    var endIcon: String? = null,
    var elevatorUpIcon: String? = null,
    var elevatorDownIcon: String? = null,
    var escalatorUpIcon: String? = null,
    var escalatorDownIcon: String? = null,
    var rampUpIcon: String? = null,
    var rampDownIcon: String? = null,
    var stairsUpIcon: String? = null,
    var stairsDownIcon: String? = null,
    var buildingGateIcon: String? = null,
) {
    fun initData(args: ReadableMap?){
        isAddStartDash = args?.getBoolean("isAddStartDash")
        isAddEndDash = args?.getBoolean("isAddEndDash")
        hiddenTranslucentPaths = args?.getBoolean("hiddenTranslucentPaths")
        indoorLineColor = args?.getInt("hiddenTranslucentPaths")
        outdoorLineColor = args?.getInt("outdoorLineColor")
        dashLineColor = args?.getInt("dashLineColor")
        arrowSymbolSpacing = args?.getInt("arrowSymbolSpacing")
        arrowIcon = args?.getString("arrowIcon")
        startIcon = args?.getString("startIcon")
        endIcon = args?.getString("endIcon")
        elevatorUpIcon = args?.getString("elevatorUpIcon")
        elevatorDownIcon = args?.getString("elevatorDownIcon")
        escalatorUpIcon = args?.getString("escalatorUpIcon")
        escalatorDownIcon = args?.getString("escalatorDownIcon")
        rampUpIcon = args?.getString("rampUpIcon")
        rampDownIcon = args?.getString("rampDownIcon")
        stairsUpIcon = args?.getString("stairsUpIcon")
        stairsDownIcon = args?.getString("stairsDownIcon")
        buildingGateIcon = args?.getString("buildingGateIcon")
    }
}
