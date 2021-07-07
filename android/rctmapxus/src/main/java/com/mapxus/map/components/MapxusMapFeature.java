package com.mapxus.map.components;

import android.view.View;

import com.mapxus.map.components.mapview.RCTMapxusMap;

/**
 * Created by nickitaliano on 9/6/17.
 */

public interface MapxusMapFeature {
    void addToMap(RCTMapxusMap mapView);
    void removeFromMap(RCTMapxusMap mapView);
    View getMapxusChildView();
}
