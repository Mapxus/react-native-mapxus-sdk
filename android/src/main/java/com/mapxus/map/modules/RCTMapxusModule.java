package com.mapxus.map.modules;

import android.os.Handler;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.module.annotations.ReactModule;
import com.mapbox.mapboxsdk.style.layers.Property;
import com.mapxus.map.components.camera.constants.CameraMode;
import com.mapxus.map.components.styles.RCTMGLStyleValue;
import com.mapxus.map.components.styles.sources.RCTSource;
import com.mapxus.map.events.constants.EventTypes;
import com.mapxus.map.location.UserLocationVerticalAlignment;
import com.mapxus.map.location.UserTrackingMode;
import com.mapxus.map.mapxusmap.api.map.MapxusMapContext;
import com.mapxus.map.mapxusmap.api.map.MapxusMapZoomMode;
import com.mapxus.map.utils.SharedPreferencesUtil;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by nickitaliano on 8/18/17.
 */

@ReactModule(name = RCTMapxusModule.REACT_CLASS)
public class RCTMapxusModule extends ReactContextBaseJavaModule {
    public static final String REACT_CLASS = "MapxusSdk";

    private static boolean customHeaderInterceptorAdded = false;

    private Handler mUiThreadHandler;
    private ReactApplicationContext mReactContext;

    public RCTMapxusModule(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
        mReactContext = reactApplicationContext;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    @Nullable
    public Map<String, Object> getConstants() {
        Map<String, String> mapxusEventTypes = new HashMap<>();
        mapxusEventTypes.put("OnLocationChange", EventTypes.MAP_ON_LOCATION_CHANGE);
        mapxusEventTypes.put("OnLocationStarted", EventTypes.MAP_ON_LOCATION_STARTED);
        mapxusEventTypes.put("OnLocationStopped", EventTypes.MAP_ON_LOCATION_STOPPED);
        mapxusEventTypes.put("OnLocationError", EventTypes.MAP_ON_LOCATION_ERROR);
        mapxusEventTypes.put("OnCompassChange", EventTypes.MAP_ON_LOCATION_COMPASS_CHANGE);

        Map<String, Integer> selectorPosition = new HashMap<>();
        selectorPosition.put("CENTER_LEFT", 0);//SelectorPosition.CENTER_LEFT
        selectorPosition.put("CENTER_RIGHT", 1);//SelectorPosition.CENTER_RIGHT
        selectorPosition.put("BOTTOM_LEFT", 2);//SelectorPosition.BOTTOM_LEFT
        selectorPosition.put("BOTTOM_RIGHT", 3);//SelectorPosition.BOTTOM_RIGHT
        selectorPosition.put("TOP_LEFT", 4);//SelectorPosition.TOP_LEFT
        selectorPosition.put("TOP_RIGHT", 5);//SelectorPosition.TOP_RIGHT

        Map<String, Integer> mapxusZoomMode = new HashMap<>();
        mapxusZoomMode.put("DISABLE", MapxusMapZoomMode.ZoomDisable);
        mapxusZoomMode.put("ANIMATED", MapxusMapZoomMode.ZoomAnimated);
        mapxusZoomMode.put("DIRECT", MapxusMapZoomMode.ZoomDirect);

        Map<String, Integer> mapxusStyle = new HashMap<>();
        mapxusStyle.put("MAPXUS", com.mapxus.map.mapxusmap.api.map.model.Style.MAPXUS);
        mapxusStyle.put("MAPPYBEE", com.mapxus.map.mapxusmap.api.map.model.Style.MAPPYBEE);
        mapxusStyle.put("CHRISTMAS", com.mapxus.map.mapxusmap.api.map.model.Style.CHRISTMAS);
        mapxusStyle.put("HALLOWMAS", com.mapxus.map.mapxusmap.api.map.model.Style.HALLOWMAS);
        mapxusStyle.put("COMMON", com.mapxus.map.mapxusmap.api.map.model.Style.COMMON);

        return MapBuilder.<String, Object>builder()
                .put("MapxusEventTypes", mapxusEventTypes)
                .put("MapxusSelectorPosition", selectorPosition)
                .put("MapxusZoomMode", mapxusZoomMode)
                .put("MapxusMapStyle", mapxusStyle)
                .build();
    }

    @ReactMethod
    private void registerWithApiKey(String appid, String secret) {
        SharedPreferencesUtil.INSTANCE.put(mReactContext, "appid", appid, "UserToken");
        SharedPreferencesUtil.INSTANCE.put(mReactContext, "secret", secret, "UserToken");
        mReactContext.runOnUiQueueThread(() -> MapxusMapContext.init(mReactContext, appid, secret));
    }
}
