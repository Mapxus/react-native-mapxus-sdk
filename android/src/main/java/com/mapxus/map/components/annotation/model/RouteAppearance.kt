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
    fun initData(args: ReadableMap?) {
        if (args?.hasKey("isAddStartDash") == true) {
            isAddStartDash = args.getBoolean("isAddStartDash")
        }
        if (args?.hasKey("isAddEndDash") == true) {
            isAddEndDash = args.getBoolean("isAddEndDash")
        }
        if (args?.hasKey("hiddenTranslucentPaths") == true) {
            hiddenTranslucentPaths = args.getBoolean("hiddenTranslucentPaths")
        }
        if (args?.hasKey("indoorLineColor") == true) {
            indoorLineColor = args.getInt("indoorLineColor")
        }
        if (args?.hasKey("outdoorLineColor") == true) {
            outdoorLineColor = args.getInt("outdoorLineColor")
        }
        if (args?.hasKey("dashLineColor") == true) {
            dashLineColor = args?.getInt("dashLineColor")
        }
        if (args?.hasKey("arrowSymbolSpacing") == true) {
            arrowSymbolSpacing = args?.getInt("arrowSymbolSpacing")
        }
        if (args?.hasKey("arrowIcon") == true) {
            arrowIcon = args?.getString("arrowIcon")
        }
        if (args?.hasKey("startIcon") == true) {
            startIcon = args?.getString("startIcon")
        }
        if (args?.hasKey("endIcon") == true) {
            endIcon = args?.getString("endIcon")
        }
        if (args?.hasKey("elevatorUpIcon") == true) {
            elevatorUpIcon = args?.getString("elevatorUpIcon")
        }
        if (args?.hasKey("elevatorDownIcon") == true) {
            elevatorDownIcon = args?.getString("elevatorDownIcon")
        }
        if (args?.hasKey("escalatorUpIcon") == true) {
            escalatorUpIcon = args?.getString("escalatorUpIcon")
        }
        if (args?.hasKey("escalatorDownIcon") == true) {
            escalatorDownIcon = args?.getString("escalatorDownIcon")
        }
        if (args?.hasKey("rampUpIcon") == true) {
            rampUpIcon = args?.getString("rampUpIcon")
        }
        if (args?.hasKey("rampDownIcon") == true) {
            rampDownIcon = args?.getString("rampDownIcon")
        }
        if (args?.hasKey("stairsUpIcon") == true) {
            stairsUpIcon = args?.getString("stairsUpIcon")
        }
        if (args?.hasKey("stairsDownIcon") == true) {
            stairsDownIcon = args?.getString("stairsDownIcon")
        }
        if (args?.hasKey("buildingGateIcon") == true) {
            buildingGateIcon = args?.getString("buildingGateIcon")
        }

    }
}
