package com.mapxus.map.events.constants;

/**
 * Created by nickitaliano on 8/27/17.
 */

public class EventKeys {
    public static final String NAMESPACE = "rct.mapxus";

    // map events
    public static final String MAP_CLICK = ns("map.press");
    public static final String MAP_LONG_CLICK = ns("map.longpress");
    public static final String MAP_ONCHANGE = ns("map.change");
    public static final String MAP_ON_LOCATION_CHANGE = ns("map.location.change");
    public static final String MAP_ANDROID_CALLBACK = ns("map.androidcallback");
    public static final String MAP_USER_TRACKING_MODE_CHANGE = ns("map.usertrackingmodechange");

    // mapxus events
    public static final String MAPXUS_CLICK = ns("map.tapped.on.blank");
    public static final String MAPXUS_LONG_CLICK = ns("map.longpressed");
    public static final String MAP_POI_CLICK = ns("map.tapped.on.poi");
//    public static final String MAP_MARKER_CLICK = ns("map.marker.press");
    public static final String MAP_BUILDING_CHANGE = "map.building.change";
    public static final String MAP_FLOOR_CHANGE = "map.floor.change";

    // point annotation events
    public static final String POINT_ANNOTATION_SELECTED = ns("pointannotation.selected");
    public static final String POINT_ANNOTATION_DESELECTED = ns("pointannotation.deselected");
    public static final String POINT_ANNOTATION_DRAG_START = ns("pointannotation.dragstart");
    public static final String POINT_ANNOTATION_DRAG = ns("pointannotation.drag");
    public static final String POINT_ANNOTATION_DRAG_END = ns("pointannotation.dragend");

    // navi view  events
    public static final String NAVI_ON_ARRIVAL_AT_DESTINATION = ns("navi.arrival.at.destination");
    public static final String NAVI_ON_EXCESSIVE_DRIFT = ns("navi.excessive.drift");
    public static final String NAVI_ON_REFRESH_THE_ADSORPTION_LOCATION = ns("navi.refresh.the.adsorption.location");
    public static final String NAVI_ON_GET_NEWPATH = ns("navi.get.newpath");
    public static final String NAVI_ON_UPDATE = ns("navi.update");

    // source events
    public static final String SHAPE_SOURCE_LAYER_CLICK = ns("shapesource.layer.pressed");
    public static final String VECTOR_SOURCE_LAYER_CLICK = ns("vectorsource.layer.pressed");
    public static final String RASTER_SOURCE_LAYER_CLICK = ns("rastersource.layer.pressed");

    // images event
    public static final String IMAGES_MISSING = ns("images.missing");

    // location events
    public static final String USER_LOCATION_UPDATE = ns("user.location.update");
    public static final String MAPXUS_USER_LOCATION_UPDATE = ns("map.location.update");
    public static final String MAPXUS_USER_SIMULATE_LOCATION_UPDATE = ns("map.simulate.location.update");

    // visual node events
    public static final String VISUAL_ON_TAPPED_FLAG = ns("visual.node.on.tapped.flag");

    // visual events
    public static final String VISUAL_ON_LOAD_FAIL = ns("visual.on.load.fail");
    public static final String VISUAL_ON_RENDER_COMPLETE = ns("visual.on.render.complete");
    public static final String VISUAL_ON_LOADING_CHANGED = ns("visual.on.loading.changed");
    public static final String VISUAL_ON_BEARING_CHANGED = ns("visual.on.bearing.changed");
    public static final String VISUAL_ON_NODE_CHANGED = ns("visual.on.node.changed");

    private static String ns(String name) {
        return String.format("%s.%s", NAMESPACE, name);
    }
}
