package com.mapxus.map.components.annotation.model

import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableMap

/**
 * Created by Edison on 2021/8/2.
 * Describe:
 */
data class RouteAppearance(
    var isAddStartDash: Boolean? = null,
    var isAddEndDash: Boolean? = null,
    var hiddenTranslucentPaths: Boolean? = null,
//    var indoorLineColor: Any? = null,
//    var outdoorLineColor: Any? = null,
//    var dashLineColor: Any? = null,
//    var arrowSymbolSpacing: Int? = null,
//    var arrowIcon: Int? = null,
//    var startIcon: Int? = null,
//    var endIcon: Int? = null,
//    var elevatorUpIcon: Int? = null,
//    var elevatorDownIcon: Int? = null,
//    var escalatorUpIcon: Int? = null,
//    var escalatorDownIcon: Int? = null,
//    var rampUpIcon: Int? = null,
//    var rampDownIcon: Int? = null,
//    var stairsUpIcon: Int? = null,
//    var stairsDownIcon: Int? = null,
//    var buildingGateIcon: Int? = null,
) {
    fun initData(context: ReactContext, args: ReadableMap?) {
        if (args?.hasKey("isAddStartDash") == true) {
            isAddStartDash = args.getBoolean("isAddStartDash")
        }
        if (args?.hasKey("isAddEndDash") == true) {
            isAddEndDash = args.getBoolean("isAddEndDash")
        }
        if (args?.hasKey("hiddenTranslucentPaths") == true) {
            hiddenTranslucentPaths = args.getBoolean("hiddenTranslucentPaths")
        }
//        if (args?.hasKey("indoorLineColor") == true) {
//            indoorLineColor = args.getInt("indoorLineColor")
//        }
//        if (args?.hasKey("outdoorLineColor") == true) {
//            outdoorLineColor = args.getInt("outdoorLineColor")
//        }
//        if (args?.hasKey("dashLineColor") == true) {
//            dashLineColor = args?.getInt("dashLineColor")
//        }
//        if (args?.hasKey("arrowSymbolSpacing") == true) {
//            arrowSymbolSpacing = args?.getInt("arrowSymbolSpacing")
//        }
//        if (args?.hasKey("arrowIcon") == true) {
//            arrowIcon = args?.getInt("arrowIcon")
//        }
//        if (args?.hasKey("startIcon") == true) {
//            thread {
//                BitmapUtils.loadImageFromNetwork(args.getMap("startIcon")?.getString("uri"))
//                context.runOnUiQueueThread {
//                    startIcon = identifier
//
//                }
//            }
//        }
//        if (args?.hasKey("endIcon") == true) {
//            endIcon = args?.getInt("endIcon")
//        }
//        if (args?.hasKey("elevatorUpIcon") == true) {
//            elevatorUpIcon = args?.getInt("elevatorUpIcon")
//        }
//        if (args?.hasKey("elevatorDownIcon") == true) {
//            elevatorDownIcon = args?.getInt("elevatorDownIcon")
//        }
//        if (args?.hasKey("escalatorUpIcon") == true) {
//            escalatorUpIcon = args?.getInt("escalatorUpIcon")
//        }
//        if (args?.hasKey("escalatorDownIcon") == true) {
//            escalatorDownIcon = args?.getInt("escalatorDownIcon")
//        }
//        if (args?.hasKey("rampUpIcon") == true) {
//            rampUpIcon = args?.getInt("rampUpIcon")
//        }
//        if (args?.hasKey("rampDownIcon") == true) {
//            rampDownIcon = args?.getInt("rampDownIcon")
//        }
//        if (args?.hasKey("stairsUpIcon") == true) {
//            stairsUpIcon = args?.getInt("stairsUpIcon")
//        }
//        if (args?.hasKey("stairsDownIcon") == true) {
//            stairsDownIcon = args?.getInt("stairsDownIcon")
//        }
//        if (args?.hasKey("buildingGateIcon") == true) {
//            buildingGateIcon = args?.getInt("buildingGateIcon")
//        }

    }
}
