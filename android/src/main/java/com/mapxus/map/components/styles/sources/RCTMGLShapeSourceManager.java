package com.mapxus.map.components.styles.sources;

import android.util.Log;
import android.view.View;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.mapxus.map.components.AbstractEventEmitter;
import com.mapxus.map.events.constants.EventKeys;
import com.mapxus.map.utils.ExpressionParser;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.Map;

/**
 * Created by nickitaliano on 9/19/17.
 */

public class RCTMGLShapeSourceManager extends AbstractEventEmitter<RCTMGLShapeSource> {
    public static final String LOG_TAG = "RCTMGLShapeSourceManager";
    public static final String REACT_CLASS = "RCTMGLShapeSource";

    private ReactApplicationContext mContext;

    public RCTMGLShapeSourceManager(ReactApplicationContext context) {
        super(context);
        mContext = context;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected RCTMGLShapeSource createViewInstance(ThemedReactContext reactContext) {
        return new RCTMGLShapeSource(reactContext, this);
    }

    @Override
    public View getChildAt(RCTMGLShapeSource source, int childPosition) {
        return source.getLayerAt(childPosition);
    }

    @Override
    public int getChildCount(RCTMGLShapeSource source) {
        return source.getLayerCount();
    }

    @Override
    public void addView(RCTMGLShapeSource source, View childView, int childPosition) {
        source.addLayer(childView, getChildCount(source));
    }

    @Override
    public void removeViewAt(RCTMGLShapeSource source, int childPosition) {
        source.removeLayer(childPosition);
    }

    @ReactProp(name = "id")
    public void setId(RCTMGLShapeSource source, String id) {
        source.setID(id);
    }

    @ReactProp(name = "url")
    public void setURL(RCTMGLShapeSource source, String urlStr) {
        try {
            source.setURL(new URL(urlStr));
        } catch (MalformedURLException e) {
            Log.w(LOG_TAG, e.getLocalizedMessage());
        }
    }

    @ReactProp(name = "shape")
    public void setGeometry(RCTMGLShapeSource source, String geoJSONStr) {
        source.setShape(geoJSONStr);
    }

    @ReactProp(name = "cluster")
    public void setCluster(RCTMGLShapeSource source, int cluster) {
        source.setCluster(cluster == 1);
    }

    @ReactProp(name = "clusterRadius")
    public void setClusterRadius(RCTMGLShapeSource source, int radius) {
        source.setClusterRadius(radius);
    }

    @ReactProp(name = "clusterMaxZoomLevel")
    public void setClusterMaxZoomLevel(RCTMGLShapeSource source, int clusterMaxZoom) {
        source.setClusterMaxZoom(clusterMaxZoom);
    }

    @ReactProp(name = "maxZoomLevel")
    public void setMaxZoomLevel(RCTMGLShapeSource source, int maxZoom) {
        source.setMaxZoom(maxZoom);
    }

    @ReactProp(name = "buffer")
    public void setBuffer(RCTMGLShapeSource source, int buffer) {
        source.setBuffer(buffer);
    }

    @ReactProp(name = "tolerance")
    public void setTolerance(RCTMGLShapeSource source, double tolerance) {
        source.setTolerance(tolerance);
    }

    @ReactProp(name = "hasPressListener")
    public void setHasPressListener(RCTMGLShapeSource source, boolean hasPressListener) {
        source.setHasPressListener(hasPressListener);
    }

    @ReactProp(name="hitbox")
    public void setHitbox(RCTMGLShapeSource source, ReadableMap map) {
        source.setHitbox(map);
    }

    @Override
    public Map<String, String> customEvents() {
        return MapBuilder.<String, String>builder()
                .put(EventKeys.SHAPE_SOURCE_LAYER_CLICK, "onMapboxShapeSourcePress")
                .put(EventKeys.MAP_ANDROID_CALLBACK, "onAndroidCallback")
                .build();
    }

    //region React Methods
    public static final int METHOD_FEATURES = 103;

    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.<String, Integer>builder()
                .put("features", METHOD_FEATURES)
                .build();
    }

    @Override
    public void receiveCommand(RCTMGLShapeSource source, int commandID, @Nullable ReadableArray args) {
        switch (commandID) {
            case METHOD_FEATURES:
                source.querySourceFeatures(
                        args.getString(0),
                        ExpressionParser.from(args.getArray(1))
                        );
                break;
        }
    }
}
