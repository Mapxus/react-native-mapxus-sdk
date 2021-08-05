package com.mapxus.map.components.mapview

import android.annotation.SuppressLint
import android.graphics.Color
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import android.widget.Toast
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.views.view.ReactViewGroup
import com.mapbox.mapboxsdk.camera.CameraPosition
import com.mapbox.mapboxsdk.camera.CameraUpdateFactory
import com.mapbox.mapboxsdk.geometry.LatLngBounds
import com.mapbox.mapboxsdk.maps.Style
import com.mapbox.mapboxsdk.plugins.annotation.OnSymbolClickListener
import com.mapbox.mapboxsdk.plugins.annotation.OnSymbolDragListener
import com.mapbox.mapboxsdk.plugins.annotation.Symbol
import com.mapbox.mapboxsdk.plugins.annotation.SymbolManager
import com.mapxus.map.components.MapxusMapFeature
import com.mapxus.map.components.annotation.RCTMapxusNavigationView
import com.mapxus.map.components.annotation.RCTMapxusPointAnnotation
import com.mapxus.map.components.annotation.RCTMapxusRouteView
import com.mapxus.map.components.location.RCTMapxusLocation
import com.mapxus.map.components.location.RCTMapxusSimulateLocation
import com.mapxus.map.components.mapview.helpers.RCTMapxusMapHelper
import com.mapxus.map.components.mapview.helpers.RCTMapxusMapOptions
import com.mapxus.map.components.visual.RCTMapxusVisualNodeView
import com.mapxus.map.components.visual.RCTMapxusVisualView
import com.mapxus.map.events.MapxusMapBuildingChangeEvent
import com.mapxus.map.events.MapxusMapClickEvent
import com.mapxus.map.events.MapxusMapFloorChangeEvent
import com.mapxus.map.events.MapxusMapPoiClickEvent
import com.mapxus.map.events.constants.EventKeys
import com.mapxus.map.mapxusmap.api.map.MapViewProvider
import com.mapxus.map.mapxusmap.api.map.MapxusMap
import com.mapxus.map.mapxusmap.api.map.interfaces.OnMapxusMapReadyCallback
import com.mapxus.map.mapxusmap.api.map.model.IndoorBuilding
import com.mapxus.map.mapxusmap.api.map.model.LatLng
import com.mapxus.map.mapxusmap.api.map.model.Poi
import com.mapxus.map.mapxusmap.api.map.model.SelectorPosition
import com.mapxus.map.mapxusmap.api.services.BuildingSearch
import com.mapxus.map.mapxusmap.api.services.model.DetailSearchOption
import com.mapxus.map.mapxusmap.api.services.model.building.BuildingDetailResult
import com.mapxus.map.mapxusmap.impl.MapboxMapViewProvider
import com.mapxus.map.utils.ConvertUtils

/**
 * Created by Edison on 3/12/21.
 * Describe:
 */
@SuppressLint("ViewConstructor")
@SuppressWarnings("MissingPermission")
class RCTMapxusMap(val reactContext: ReactContext?, val mManager: RCTMapxusMapManager) :
    ReactViewGroup(reactContext!!), OnMapxusMapReadyCallback, MapxusMap.OnBuildingChangeListener,
    MapxusMap.OnFloorChangeListener,
    MapxusMap.OnMapClickListener,
    MapxusMap.OnMapLongClickListener, MapxusMap.OnIndoorPoiClickListener {

    var mMapview: RCTMGLMapView? = null
    private var mFeatures: MutableList<MapxusMapFeature>? = mutableListOf()
    private var mQueuedFeatures: MutableList<MapxusMapFeature>? = mutableListOf()
    private var mLifeCycleListener: LifecycleEventListener? = null

    private var mapViewProvider: MapViewProvider? = null
    var mMapxusMap: MapxusMap? = null
    private var mLocation: RCTMapxusLocation? = null
    private var mFakeLocation: RCTMapxusSimulateLocation? = null
    private var mNavigationView: RCTMapxusNavigationView? = null
    private var mRouteView: RCTMapxusRouteView? = null
    private var mPointAnnotation: RCTMapxusPointAnnotation? = null
    private var mVisualView : RCTMapxusVisualView? = null
    private var mVisualNodeView: RCTMapxusVisualNodeView? = null

    //settings
    var rctMapxusMapOptions: RCTMapxusMapOptions? = null

    private var mGestureSwitchingBuildingEnabled: Boolean? = null
    private var mAutoChangeBuildingEnabled: Boolean? = null
    private var mIndoorControllerAlwaysHidden: Boolean? = null
    private var mOutdoorHidden: Boolean? = null
    private var mSelectFontColor: String? = null
    private var mSelectBoxColor: String? = null
    private var mFontColor: String? = null
    private var mSelectorPosition: Int? = null
    private var mSelectorPositionCustom: ReadableMap? = null
    private var mLogoBottomMargin: Int? = null
    private var mOpenStreetSourceBottomMargin: Int? = null
    private var switchFloorFromSelectIndoorScene: String? = null
    private var switchBuildingIdSelectIndoorScene: String? = null

    /**annotation
     *
     */
    private var mOffscreenAnnotationViewContainer: ViewGroup? = null

    var symbolManager: SymbolManager? = null

    private var mAnnotationClicked = false

    private var mActiveMarkerID: Long = -1

    private val mPointAnnotations: MutableMap<String, RCTMapxusPointAnnotation> = mutableMapOf()

    fun setMapOption(mapOption: ReadableMap?) {
        rctMapxusMapOptions = ConvertUtils.convert(mapOption, RCTMapxusMapOptions::class.java)
    }

    private fun setLifecycleListeners() {
        mLifeCycleListener = object : LifecycleEventListener {
            override fun onHostResume() {
                mMapxusMap?.onResume()
            }

            override fun onHostPause() {
                mMapxusMap?.onPause()
            }

            override fun onHostDestroy() {
                dispose()
            }
        }
        reactContext?.addLifecycleEventListener(mLifeCycleListener)
    }

    @Synchronized
    fun dispose() {
        mMapxusMap?.onPause()
        mapViewProvider?.onDestroy()
        reactContext?.removeLifecycleEventListener(mLifeCycleListener)
    }

    fun addFeature(childView: View, childPosition: Int) {
        var feature: MapxusMapFeature? = null
        when (childView) {
            is RCTMapxusLocation -> {
                mLocation = childView
                feature = childView
            }
            is RCTMapxusSimulateLocation -> {
                mFakeLocation = childView
                feature = childView
            }
            is RCTMapxusNavigationView -> {
                mNavigationView = childView
                feature = childView
            }
            is RCTMapxusRouteView -> {
                mRouteView = childView
                feature = childView
            }
            is RCTMapxusVisualNodeView -> {
                mVisualNodeView = childView
                feature = childView
            }
            is RCTMapxusVisualView -> {
                mVisualView = childView
                feature = childView
            }
            is RCTMapxusPointAnnotation -> {
                mPointAnnotation = childView
                mPointAnnotations[mPointAnnotation!!.iD!!] = mPointAnnotation!!
                feature = childView
            }
            is RCTMGLMapView -> {
                mMapview = childView
                feature = childView

                mapViewProvider = if (rctMapxusMapOptions != null) MapboxMapViewProvider(
                    context,
                    mMapview,
                    RCTMapxusMapHelper.getMapxusMapOptions(rctMapxusMapOptions)
                ) else MapboxMapViewProvider(
                    context,
                    mMapview,
                )
                mapViewProvider?.getMapxusMapAsync(this)
            }
            is ViewGroup -> {
                addView(childView, childPosition)
                for (i in 0 until childView.childCount) {
                    addFeature(childView.getChildAt(i), childPosition)
                }
            }
        }
        if (feature != null) {
            if (mQueuedFeatures == null) {
                feature.addToMap(this)
                mFeatures?.add(childPosition, feature)
            } else {
                mQueuedFeatures?.add(childPosition, feature)
            }
        }
    }

    private fun addQueuedFeatures() {
        if (mQueuedFeatures != null && mQueuedFeatures!!.size > 0) {
            for (i in mQueuedFeatures!!.indices) {
                val feature = mQueuedFeatures!![i]
                feature.addToMap(this)
                mFeatures!!.add(feature)
            }
            mQueuedFeatures = null
        }
    }

    fun removeFeature(childPosition: Int) {
        val feature: MapxusMapFeature = features()[childPosition]

        if (feature is RCTMapxusPointAnnotation) {
            if (feature.mapboxID == mActiveMarkerID) {
                mActiveMarkerID = -1
            }
            mPointAnnotations.remove(feature.iD)
        }

        feature.removeFromMap(this)
        features().remove(feature)
    }

    fun features(): MutableList<MapxusMapFeature> {
        return if (mQueuedFeatures != null && mQueuedFeatures!!.size > 0) {
            mQueuedFeatures!!
        } else {
            mFeatures!!
        }
    }

    init {
        setLifecycleListeners()
    }

    override fun onMapxusMapReady(mapxusMap: MapxusMap?) {
        mapxusMap?.let {
            mMapxusMap = it
            mMapview?.mapboxMap?.getStyle {
                createSymbolManager(it)
                addQueuedFeatures()
            }
            updateSettings()
            it.addOnBuildingChangeListener(this)
            it.addOnFloorChangeListener(this)
            it.addOnMapLongClickListener(this)
            it.addOnMapClickListener(this)
            it.addOnIndoorPoiClickListener(this)
        }
    }

    override fun onBuildingChange(indoorBuilding: IndoorBuilding?) {
        mManager.handleEvent(MapxusMapBuildingChangeEvent(this, indoorBuilding))
        if (indoorBuilding != null && switchBuildingIdSelectIndoorScene != null && indoorBuilding.buildingId == switchBuildingIdSelectIndoorScene && switchFloorFromSelectIndoorScene != null) {
            mMapxusMap?.switchFloor(switchFloorFromSelectIndoorScene)
            switchBuildingIdSelectIndoorScene = null
            switchFloorFromSelectIndoorScene = null
        }
    }

    override fun onFloorChange(indoorBuilding: IndoorBuilding, floorName: String) {
        mManager.handleEvent(MapxusMapFloorChangeEvent(this, indoorBuilding, floorName))
    }

    override fun onMapClick(latLng: LatLng, floor: String?, buildingId: String?, floorId: String?) {
        if (mAnnotationClicked) {
            mAnnotationClicked = false
            return
        }
        var isInBudilding = false
        mMapxusMap?.currentIndoorBuilding?.bbox?.let {
            isInBudilding = LatLngBounds.from(it.maxLat, it.maxLon, it.minLat, it.minLon)
                .contains(com.mapbox.mapboxsdk.geometry.LatLng(latLng.latitude, latLng.longitude))
        }
        mManager.handleEvent(
            MapxusMapClickEvent(
                this,
                com.mapbox.mapboxsdk.geometry.LatLng(latLng.getLatitude(), latLng.getLongitude()),
                EventKeys.MAPXUS_CLICK,
                floor,
                if (isInBudilding) mMapxusMap?.currentIndoorBuilding else null,
            )
        )
    }

    override fun onMapLongClick(
        latLng: LatLng,
        floor: String?,
        buildingId: String?,
        floorId: String?
    ) {
        if (mAnnotationClicked) {
            mAnnotationClicked = false
            return
        }
        var isInBudilding = false
        mMapxusMap?.currentIndoorBuilding?.bbox?.let {
            isInBudilding = LatLngBounds.from(it.maxLat, it.maxLon, it.minLat, it.minLon)
                .contains(com.mapbox.mapboxsdk.geometry.LatLng(latLng.latitude, latLng.longitude))
        }
        mManager.handleEvent(
            MapxusMapClickEvent(
                this,
                com.mapbox.mapboxsdk.geometry.LatLng(latLng.getLatitude(), latLng.getLongitude()),
                EventKeys.MAPXUS_LONG_CLICK,
                floor,
                if (isInBudilding) mMapxusMap?.currentIndoorBuilding else null,
            )
        )
    }

    override fun onIndoorPoiClick(poi: Poi) {
        mManager.handleEvent(
            MapxusMapPoiClickEvent(
                this,
                mMapxusMap?.currentIndoorBuilding!!,
                poi
            )
        )
    }

    //settings
    fun setSelectFontColor(color: String) {
        mSelectFontColor = color
        mMapxusMap?.mapxusUiSettings?.setSelectFontColor(Color.parseColor(mSelectFontColor))
    }

    fun setSelectBoxColor(color: String) {
        mSelectBoxColor = color
        mMapxusMap?.mapxusUiSettings?.setSelectBoxColor(Color.parseColor(mSelectBoxColor))
    }

    fun setFontColor(color: String) {
        mFontColor = color
        mMapxusMap?.mapxusUiSettings?.setFontColor(Color.parseColor(mFontColor))
    }

    fun setSelectorPosition(position: Int) {
        mSelectorPosition = ConvertUtils.getMapxusPosition(position)
        mMapxusMap?.mapxusUiSettings?.setSelectorPosition(
            mSelectorPosition ?: SelectorPosition.CENTER_LEFT
        )
    }

    fun setSelectorPositionCustom(position: ReadableMap) {
        mSelectorPositionCustom = position
        if (mSelectorPositionCustom != null && mMapxusMap?.mapxusUiSettings?.isSelectorEnabled == true) {
            val pixelDensity = context.resources.displayMetrics.density.toInt()
            val left: Int =
                mSelectorPositionCustom!!.getInt("x") * pixelDensity
            val top: Int = mSelectorPositionCustom!!.getInt("y") * pixelDensity
            mMapxusMap?.mapxusUiSettings?.setSelectorPosition(
                FrameLayout.LayoutParams(
                    LayoutParams.WRAP_CONTENT,
                    LayoutParams.WRAP_CONTENT
                ).apply {
                    setMargins(left, top, left, top)
                })
        }
    }

    fun setLogoBottomMargin(margin: Int) {
        mLogoBottomMargin = margin
        mMapxusMap?.mapxusUiSettings?.setLogoBottomMargin(margin)
    }

    fun setOpenStreetSourceBottomMargin(margin: Int) {
        mOpenStreetSourceBottomMargin = margin
        mMapxusMap?.mapxusUiSettings?.setOpenStreetSourceBottomMargins(margin)
    }

    fun setAutoChangeBuilding(enabled: Boolean) {
        mAutoChangeBuildingEnabled = enabled
        mapViewProvider?.setBuildingAutoSwitch(enabled)
    }

    fun setGestureSwitchingBuilding(enabled: Boolean) {
        mGestureSwitchingBuildingEnabled = enabled
        mapViewProvider?.setBuildingGestureSwitch(enabled)
    }

    fun setIndoorControllerAlwaysHidden(enabled: Boolean) {
        mIndoorControllerAlwaysHidden = enabled
        mMapxusMap?.mapxusUiSettings?.isSelectorEnabled = !enabled
    }

    fun setOutdoorHidden(enabled: Boolean) {
        mOutdoorHidden = enabled
        mMapxusMap?.isHiddenOutdoor = enabled
    }

    private fun updateSettings() {
        if (mMapxusMap == null) return
        mGestureSwitchingBuildingEnabled?.let { mapViewProvider?.setBuildingGestureSwitch(it) }
        mAutoChangeBuildingEnabled?.let { mapViewProvider?.setBuildingAutoSwitch(it) }
        mIndoorControllerAlwaysHidden?.let {
            if (it != mMapxusMap?.mapxusUiSettings?.isSelectorEnabled) {
                mMapxusMap?.mapxusUiSettings?.isSelectorEnabled = !it
            }
        }
        mOutdoorHidden?.let {
            if (it != mMapxusMap?.isHiddenOutdoor) mMapxusMap?.isHiddenOutdoor = it
        }
        mSelectFontColor?.let {
            mMapxusMap?.mapxusUiSettings?.setSelectFontColor(Color.parseColor(it))
        }
        mSelectBoxColor?.let {
            mMapxusMap?.mapxusUiSettings?.setSelectBoxColor(Color.parseColor(it))
        }
        mFontColor?.let {
            mMapxusMap?.mapxusUiSettings?.setFontColor(Color.parseColor(it))
        }
        mSelectorPosition?.let {
            mMapxusMap?.mapxusUiSettings?.setSelectorPosition(it)
        }
        mSelectorPositionCustom?.let {
            if (mSelectorPositionCustom != null && mMapxusMap?.mapxusUiSettings?.isSelectorEnabled == true) {
                val pixelDensity = context.resources.displayMetrics.density.toInt()
                val left: Int =
                    mSelectorPositionCustom!!.getInt("x") * pixelDensity
                val top: Int = mSelectorPositionCustom!!.getInt("y") * pixelDensity
                mMapxusMap?.mapxusUiSettings?.setSelectorPosition(
                    FrameLayout.LayoutParams(
                        LayoutParams.WRAP_CONTENT,
                        LayoutParams.WRAP_CONTENT
                    ).apply {
                        setMargins(left, top, left, top)
                    })
            }
        }
        mLogoBottomMargin?.let {
            mMapxusMap?.mapxusUiSettings?.setLogoBottomMargin(it)
        }
        mOpenStreetSourceBottomMargin?.let {
            mMapxusMap?.mapxusUiSettings?.setOpenStreetSourceBottomMargins(it)
        }
    }

    //method
    fun setMapxusStyle(args: ReadableArray?) {
        mapViewProvider?.style = args?.getInt(1)
    }

    fun setMapxusStyleWithString(args: ReadableArray?) {
        mapViewProvider?.setCustomStyle(args?.getString(1))
    }

    fun setMapLanguage(args: ReadableArray?) {
        mapViewProvider?.setLanguage(args?.getString(1))
    }

    fun selectIndoorScene(args: ReadableArray?) {
        val buildingId = args?.getString(1)
        val floor = args?.getString(2)
        val mode = args?.getString(3)
        val insets = args?.getMap(4)
        switchBuildingIdSelectIndoorScene = buildingId
        BuildingSearch.newInstance().apply {
            setBuildingSearchResultListener(object :
                BuildingSearch.BuildingSearchResultListenerAdapter() {
                override fun onGetBuildingDetailResult(buildingDetailResult: BuildingDetailResult) {
                    if (buildingDetailResult.status != 0) {
                        Toast.makeText(
                            reactContext,
                            buildingDetailResult.error.toString(),
                            Toast.LENGTH_LONG
                        ).show()
                        return
                    }
                    if (buildingDetailResult.indoorBuildingList.isNullOrEmpty()) {
                        Toast.makeText(reactContext, "Building not found", Toast.LENGTH_LONG).show()
                        return
                    }
                    if (mode == "ZoomDisable") {
                        mMapxusMap?.switchBuilding(buildingId)
                    }
                    switchingIndoorScenes(
                        mode ?: "ZoomDisable",
                        floor ?: buildingDetailResult.indoorBuildingInfo.groundFloor, insets,
                        com.mapbox.mapboxsdk.geometry.LatLng(
                            buildingDetailResult.indoorBuildingInfo.labelCenter.lat,
                            buildingDetailResult.indoorBuildingInfo.labelCenter.lon
                        )
                    )

                }
            })
            searchBuildingDetail(DetailSearchOption().ids(mutableListOf(buildingId)))
        }
    }

    private fun switchingIndoorScenes(
        zoomMode: String,
        floor: String,
        insets: ReadableMap?,
        latLng: com.mapbox.mapboxsdk.geometry.LatLng
    ) {
        val top = insets?.getDouble("top") ?: 0.0
        val left = insets?.getDouble("left") ?: 0.0
        val bottom = insets?.getDouble("bottom") ?: 0.0
        val right = insets?.getDouble("right") ?: 0.0
        when (zoomMode) {
            "DISABLE" -> {
                mMapview?.mapboxMap?.easeCamera(
                    CameraUpdateFactory.newLatLngPadding(
                        latLng,
                        left,
                        top,
                        right,
                        bottom
                    )
                )
                mMapview?.mapboxMap?.cancelTransitions()
            }
            "ANIMATED" -> {
                val cameraPosition1 = CameraPosition.Builder()
                    .target(latLng)
                    .tilt(20.0)
                    .padding(
                        left,
                        top,
                        right,
                        bottom
                    )
                    .build()
                mMapview?.mapboxMap?.animateCamera(
                    CameraUpdateFactory.newCameraPosition(cameraPosition1),
                    7500
                )
            }
            "DIRECT" -> mMapview?.mapboxMap?.moveCamera(
                CameraUpdateFactory.newLatLngPadding(
                    latLng,
                    left,
                    top,
                    right,
                    bottom
                )
            )
        }
        switchFloorFromSelectIndoorScene = floor
    }

    /**
     * Annotation
     */

    private fun selectAnnotation(annotation: RCTMapxusPointAnnotation) {
        mActiveMarkerID = annotation.mapboxID
        annotation.onSelect(true)
    }

    private fun deselectAnnotation(annotation: RCTMapxusPointAnnotation) {
        mActiveMarkerID = -1
        annotation.onDeselect()
    }

    fun getPointAnnotationByID(annotationID: String?): RCTMapxusPointAnnotation? {
        if (annotationID == null) {
            return null
        }
        for (key in mPointAnnotations.keys) {
            val annotation: RCTMapxusPointAnnotation? = mPointAnnotations[key]
            if (annotation != null && annotationID == annotation.iD) {
                return annotation
            }
        }
        return null
    }

    fun getPointAnnotationByMarkerID(markerID: Long): RCTMapxusPointAnnotation? {
        for (key in mPointAnnotations.keys) {
            val annotation: RCTMapxusPointAnnotation? = mPointAnnotations[key]
            if (annotation != null && markerID == annotation.mapboxID) {
                return annotation
            }
        }
        return null
    }


    private fun onMarkerClick(symbol: Symbol) {
        mAnnotationClicked = true
        val selectedMarkerID = symbol.id
        var activeAnnotation: RCTMapxusPointAnnotation? = null
        var nextActiveAnnotation: RCTMapxusPointAnnotation? = null
        for (key in mPointAnnotations.keys) {
            val annotation: RCTMapxusPointAnnotation? = mPointAnnotations.get(key)
            val curMarkerID = annotation?.mapboxID
            if (mActiveMarkerID == curMarkerID) {
                activeAnnotation = annotation
            }
            if (selectedMarkerID == curMarkerID && mActiveMarkerID != curMarkerID) {
                nextActiveAnnotation = annotation
            }
        }
        activeAnnotation?.let { deselectAnnotation(it) }
        nextActiveAnnotation?.let { selectAnnotation(it) }
    }

    private fun createSymbolManager(style: Style?) {
        symbolManager = SymbolManager(mMapview!!, mMapview?.mapboxMap!!, style!!)
        symbolManager?.iconAllowOverlap = true
        symbolManager?.addClickListener(OnSymbolClickListener { symbol: Symbol ->
            onMarkerClick(symbol)
            false
        })
        symbolManager?.addDragListener(object : OnSymbolDragListener {
            override fun onAnnotationDragStarted(symbol: Symbol) {
                mAnnotationClicked = true
                val selectedMarkerID = symbol.id
                getPointAnnotationByMarkerID(selectedMarkerID)?.onDragStart()
            }

            override fun onAnnotationDrag(symbol: Symbol) {
                val selectedMarkerID = symbol.id
                getPointAnnotationByMarkerID(selectedMarkerID)?.onDrag()
            }

            override fun onAnnotationDragFinished(symbol: Symbol) {
                mAnnotationClicked = false
                val selectedMarkerID = symbol.id
                getPointAnnotationByMarkerID(selectedMarkerID)?.onDragEnd()
            }
        })
    }

    /**
     * PointAnnotations are rendered to a canvas, but react native Image component is
     * implemented on top of Fresco, and fresco will not load images when their view is
     * not attached to the window. So we'll have an offscreen view where we add those views
     * so they can rendered full to canvas.
     */
    fun offscreenAnnotationViewContainer(): ViewGroup? {
        if (mOffscreenAnnotationViewContainer == null) {
            mOffscreenAnnotationViewContainer = FrameLayout(context)
            val flParams = FrameLayout.LayoutParams(0, 0)
            flParams.setMargins(-10000, -10000, -10000, -10000)
            mOffscreenAnnotationViewContainer?.layoutParams = flParams
            addView(mOffscreenAnnotationViewContainer)
        }
        return mOffscreenAnnotationViewContainer
    }
}