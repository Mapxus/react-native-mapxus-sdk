package com.mapxus.map.events;

import android.graphics.PointF;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.mapbox.mapboxsdk.geometry.LatLng;
import com.mapxus.map.components.annotation.RCTMGLPointAnnotation;
import com.mapxus.map.components.annotation.RCTMapxusNavigationView;
import com.mapxus.map.components.annotation.RCTMapxusPointAnnotation;
import com.mapxus.map.events.constants.EventKeys;
import com.mapxus.map.events.constants.EventTypes;
import com.mapxus.map.utils.GeoJSONUtils;

public class MapxusPointAnnotationDragEvent extends MapClickEvent {
    RCTMapxusPointAnnotation mView;
    private LatLng mTouchedLatLng;
    private PointF mScreenPoint;

    public MapxusPointAnnotationDragEvent(RCTMapxusPointAnnotation view, @NonNull LatLng latLng, @NonNull PointF screenPoint, String eventType) {
        super(view, latLng, screenPoint, eventType);
        mView = view;
        mTouchedLatLng = latLng;
        mScreenPoint = screenPoint;
    }

    @Override
    public String getKey() {
        String eventType = getType();

        if (eventType.equals(EventTypes.ANNOTATION_DRAG_START)) {
            return EventKeys.POINT_ANNOTATION_DRAG_START;
        }
        if (eventType.equals(EventTypes.ANNOTATION_DRAG_END)) {
            return EventKeys.POINT_ANNOTATION_DRAG_END;
        }

        return EventKeys.POINT_ANNOTATION_DRAG;
    }

    @Override
    public WritableMap getPayload() {
        WritableMap properties = new WritableNativeMap();
        properties.putString("id", mView.getID());
        properties.putDouble("screenPointX", mScreenPoint.x);
        properties.putDouble("screenPointY", mScreenPoint.y);
        return GeoJSONUtils.toPointFeature(mTouchedLatLng, properties);
    }
}
