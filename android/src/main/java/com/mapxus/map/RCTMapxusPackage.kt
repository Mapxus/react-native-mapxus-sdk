package com.mapxus.map

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.JavaScriptModule
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.mapxus.map.components.annotation.*
import com.mapxus.map.components.camera.RCTMGLCameraManager
import com.mapxus.map.components.images.RCTMGLImagesManager
import com.mapxus.map.components.location.RCTMGLNativeUserLocationManager
import com.mapxus.map.components.location.RCTMapxusLocationManager
import com.mapxus.map.components.location.RCTMapxusSimulateLocationManager
import com.mapxus.map.components.mapview.RCTMGLAndroidTextureMapViewManager
import com.mapxus.map.components.mapview.RCTMGLMapViewManager
import com.mapxus.map.components.mapview.RCTMapxusMapManager
import com.mapxus.map.components.styles.layers.*
import com.mapxus.map.components.styles.light.RCTMGLLightManager
import com.mapxus.map.components.styles.sources.RCTMGLImageSourceManager
import com.mapxus.map.components.styles.sources.RCTMGLRasterSourceManager
import com.mapxus.map.components.styles.sources.RCTMGLShapeSourceManager
import com.mapxus.map.components.styles.sources.RCTMGLVectorSourceManager
import com.mapxus.map.modules.*

/**
 * Created by nickitaliano on 8/18/17.
 */
class RCTMapxusPackage : ReactPackage {
    override fun createNativeModules(reactApplicationContext: ReactApplicationContext): List<NativeModule> {
        return listOf(
            RCTMapxusModule(reactApplicationContext),
            RCTMGLOfflineModule(reactApplicationContext),
            RCTMGLSnapshotModule(reactApplicationContext),
            RCTMGLLocationModule(reactApplicationContext),
            RCTMGLLogging(reactApplicationContext),
            RCTMapxusBuildlingSearchModule(reactApplicationContext),
            RCTMapxusPoiSearchModule(reactApplicationContext),
            RCTMapxusPoiCategorySearchModule(reactApplicationContext),
            RCTMapxusRouteSearchModule(reactApplicationContext),
        )
    }

    @Deprecated("", ReplaceWith("emptyList()"))
    fun createJSModules(): List<Class<out JavaScriptModule?>> {
        return emptyList()
    }

    override fun createViewManagers(reactApplicationContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return listOf(
            //mapxus
            RCTMapxusMapManager(reactApplicationContext),
            RCTMapxusLocationManager(reactApplicationContext),
            RCTMapxusNavigationViewManager(reactApplicationContext),
            RCTMapxusPointAnnotationManager(reactApplicationContext),
            RCTMapxusSimulateLocationManager(reactApplicationContext),
            RCTMapxusRouteViewManager(reactApplicationContext),
            // components
            RCTMGLCameraManager(reactApplicationContext),
            RCTMGLMapViewManager(reactApplicationContext),
            RCTMGLMarkerViewManager(reactApplicationContext),
            RCTMGLAndroidTextureMapViewManager(reactApplicationContext),
            RCTMGLLightManager(),
            RCTMGLPointAnnotationManager(reactApplicationContext),
            RCTMGLCalloutManager(),
            RCTMGLNativeUserLocationManager(),

            // sources
            RCTMGLVectorSourceManager(reactApplicationContext),
            RCTMGLShapeSourceManager(reactApplicationContext),
            RCTMGLRasterSourceManager(reactApplicationContext),
            RCTMGLImageSourceManager(),

            // images
            RCTMGLImagesManager(reactApplicationContext),

            // layers
            RCTMGLFillLayerManager(),
            RCTMGLFillExtrusionLayerManager(),
            RCTMGLHeatmapLayerManager(),
            RCTMGLLineLayerManager(),
            RCTMGLCircleLayerManager(),
            RCTMGLSymbolLayerManager(),
            RCTMGLRasterLayerManager(),
            RCTMGLBackgroundLayerManager()
        )
    }
}