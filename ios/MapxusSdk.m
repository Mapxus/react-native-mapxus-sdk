// MapxusSdk.m

#import "MapxusSdk.h"
#import "RCTMGLEventTypes.h"
#import "MGLOfflineModule.h"
#import "CameraMode.h"
#import "RCTMGLSource.h"
#import "MGLCustomHeaders.h"

@import MapxusBaseSDK;
@import MapxusMapSDK;


@implementation MapxusSdk

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

- (NSDictionary<NSString *, id> *)constantsToExport
{
    // style urls
    NSMutableDictionary *styleURLS = [[NSMutableDictionary alloc] init];
    [styleURLS setObject:[MGLStyle.streetsStyleURL absoluteString] forKey:@"Street"];
    [styleURLS setObject:[MGLStyle.darkStyleURL absoluteString] forKey:@"Dark"];
    [styleURLS setObject:[MGLStyle.lightStyleURL absoluteString] forKey:@"Light"];
    [styleURLS setObject:[MGLStyle.outdoorsStyleURL absoluteString] forKey:@"Outdoors"];
    [styleURLS setObject:[MGLStyle.satelliteStyleURL absoluteString] forKey:@"Satellite"];
    [styleURLS setObject:[MGLStyle.satelliteStreetsStyleURL absoluteString] forKey:@"SatelliteStreet"];

    // event types
    NSMutableDictionary *eventTypes = [[NSMutableDictionary alloc] init];
    [eventTypes setObject:RCT_MAPBOX_EVENT_TAP forKey:@"MapClick"];
    [eventTypes setObject:RCT_MAPBOX_EVENT_LONGPRESS forKey:@"MapLongClick"];
    [eventTypes setObject:RCT_MAPBOX_REGION_WILL_CHANGE_EVENT forKey:@"RegionWillChange"];
    [eventTypes setObject:RCT_MAPBOX_REGION_IS_CHANGING forKey:@"RegionIsChanging"];
    [eventTypes setObject:RCT_MAPBOX_REGION_DID_CHANGE forKey:@"RegionDidChange"];
    [eventTypes setObject:RCT_MAPBOX_WILL_START_LOADING_MAP forKey:@"WillStartLoadingMap"];
    [eventTypes setObject:RCT_MAPBOX_DID_FINISH_LOADING_MAP forKey:@"DidFinishLoadingMap"];
    [eventTypes setObject:RCT_MAPBOX_DID_FAIL_LOADING_MAP forKey:@"DidFailLoadingMap"];
    [eventTypes setObject:RCT_MAPBOX_WILL_START_RENDERING_FRAME forKey:@"WillStartRenderingFrame"];
    [eventTypes setObject:RCT_MAPBOX_DID_FINSIH_RENDERING_FRAME forKey:@"DidFinishRenderingFrame"];
    [eventTypes setObject:RCT_MAPBOX_DID_FINISH_RENDERING_FRAME_FULLY forKey:@"DidFinishRenderingFrameFully"];
    [eventTypes setObject:RCT_MAPBOX_WILL_START_RENDERING_MAP forKey:@"WillStartRenderingMap"];
    [eventTypes setObject:RCT_MAPBOX_DID_FINISH_RENDERING_MAP forKey:@"DidFinishRenderingMap"];
    [eventTypes setObject:RCT_MAPBOX_DID_FINISH_RENDERING_MAP_FULLY forKey:@"DidFinishRenderingMapFully"];
    [eventTypes setObject:RCT_MAPBOX_DID_FINISH_LOADING_STYLE forKey:@"DidFinishLoadingStyle"];
    
    // location module events
    NSMutableDictionary *locationModuleEvents = [[NSMutableDictionary alloc] init];
    [locationModuleEvents setObject:RCT_MAPBOX_USER_LOCATION_UPDATE forKey:@"Update"];

    // user tracking modes
    NSMutableDictionary *userTrackingModes = [[NSMutableDictionary alloc] init];
    [userTrackingModes setObject:[NSNumber numberWithInt:MGLUserTrackingModeNone] forKey:@"None"];
    [userTrackingModes setObject:[NSNumber numberWithInt:MGLUserTrackingModeFollow] forKey:@"Follow"];
    [userTrackingModes setObject:[NSNumber numberWithInt:MGLUserTrackingModeFollowWithHeading] forKey:@"FollowWithHeading"];
    [userTrackingModes setObject:[NSNumber numberWithInt:MGLUserTrackingModeFollowWithCourse] forKey:@"FollowWithCourse"];

    // user location vertical alignment
    NSMutableDictionary *userLocationVerticalAlignment = [[NSMutableDictionary alloc] init];
    [userLocationVerticalAlignment setObject:[NSNumber numberWithInt:MGLAnnotationVerticalAlignmentTop] forKey:@"Top"];
    [userLocationVerticalAlignment setObject:[NSNumber numberWithInt:MGLAnnotationVerticalAlignmentCenter] forKey:@"Center"];
    [userLocationVerticalAlignment setObject:[NSNumber numberWithInt:MGLAnnotationVerticalAlignmentBottom] forKey:@"Bottom"];

    // camera modes
    NSMutableDictionary *cameraModes = [[NSMutableDictionary alloc] init];
    [cameraModes setObject:[NSNumber numberWithInt:RCT_MAPBOX_CAMERA_MODE_FLIGHT] forKey:@"Flight"];
    [cameraModes setObject:[NSNumber numberWithInt:RCT_MAPBOX_CAMERA_MODE_EASE] forKey:@"Ease"];
    [cameraModes setObject:[NSNumber numberWithInt:RCT_MAPBOX_CAMERA_MODE_NONE] forKey:@"None"];

    // style sources
    NSMutableDictionary *styleSourceConsts = [[NSMutableDictionary alloc] init];
    [styleSourceConsts setObject:DEFAULT_SOURCE_ID forKey:@"DefaultSourceID"];

    // line layer constants
    NSMutableDictionary *lineJoin = [[NSMutableDictionary alloc] init];
    [lineJoin setObject:@(MGLLineJoinBevel) forKey:@"Bevel"];
    [lineJoin setObject:@(MGLLineJoinRound) forKey:@"Round"];
    [lineJoin setObject:@(MGLLineJoinMiter) forKey:@"Miter"];

    NSMutableDictionary *lineCap = [[NSMutableDictionary alloc] init];
    [lineCap setObject:@(MGLLineCapButt) forKey:@"Butt"];
    [lineCap setObject:@(MGLLineCapRound) forKey:@"Round"];
    [lineCap setObject:@(MGLLineCapSquare) forKey:@"Square"];

    NSMutableDictionary *lineTranslateAnchor = [[NSMutableDictionary alloc] init];
    [lineTranslateAnchor setObject:@(MGLLineTranslationAnchorMap) forKey:@"Map"];
    [lineTranslateAnchor setObject:@(MGLLineTranslationAnchorViewport) forKey:@"Viewport"];

    // circle layer constants
    NSMutableDictionary *circlePitchScale = [[NSMutableDictionary alloc] init];
    [circlePitchScale setObject:@(MGLCircleScaleAlignmentMap) forKey:@"Map"];
    [circlePitchScale setObject:@(MGLCircleScaleAlignmentViewport) forKey:@"Viewport"];

    NSMutableDictionary *circlePitchAlignment = [[NSMutableDictionary alloc] init];
    [circlePitchAlignment setObject:@(MGLCirclePitchAlignmentMap) forKey:@"Map"];
    [circlePitchAlignment setObject:@(MGLCirclePitchAlignmentViewport) forKey:@"Viewport"];

    NSMutableDictionary *circleTranslateAnchor = [[NSMutableDictionary alloc] init];
    [circleTranslateAnchor setObject:@(MGLCircleTranslationAnchorMap) forKey:@"Map"];
    [circleTranslateAnchor setObject:@(MGLCircleTranslationAnchorViewport) forKey:@"Viewport"];

    // fill extrusion layer constants
    NSMutableDictionary *fillExtrusionTranslateAnchor = [[NSMutableDictionary alloc] init];
    [fillExtrusionTranslateAnchor setObject:@(MGLFillExtrusionTranslationAnchorMap) forKey:@"Map"];
    [fillExtrusionTranslateAnchor setObject:@(MGLFillExtrusionTranslationAnchorViewport) forKey:@"Viewport"];

    // fill layer constants
    NSMutableDictionary *fillTranslateAnchor = [[NSMutableDictionary alloc] init];
    [fillTranslateAnchor setObject:@(MGLFillTranslationAnchorMap) forKey:@"Map"];
    [fillTranslateAnchor setObject:@(MGLFillTranslationAnchorViewport) forKey:@"Viewport"];

    // symbol layer constants
    NSMutableDictionary *iconRotationAlignment = [[NSMutableDictionary alloc] init];
    [iconRotationAlignment setObject:@(MGLIconRotationAlignmentAuto) forKey:@"Auto"];
    [iconRotationAlignment setObject:@(MGLIconRotationAlignmentMap) forKey:@"Map"];
    [iconRotationAlignment setObject:@(MGLIconRotationAlignmentViewport) forKey:@"Viewport"];

    NSMutableDictionary *iconTextFit = [[NSMutableDictionary alloc] init];
    [iconTextFit setObject:@(MGLIconTextFitNone) forKey:@"None"];
    [iconTextFit setObject:@(MGLIconTextFitWidth) forKey:@"Width"];
    [iconTextFit setObject:@(MGLIconTextFitHeight) forKey:@"Height"];
    [iconTextFit setObject:@(MGLIconTextFitBoth) forKey:@"Both"];

    NSMutableDictionary *iconAnchor = [[NSMutableDictionary alloc] init];
    [iconAnchor setObject:@(MGLIconAnchorCenter) forKey:@"Center"];
    [iconAnchor setObject:@(MGLIconAnchorTop) forKey:@"Top"];
    [iconAnchor setObject:@(MGLIconAnchorBottom) forKey:@"Bottom"];
    [iconAnchor setObject:@(MGLIconAnchorLeft) forKey:@"Left"];
    [iconAnchor setObject:@(MGLIconAnchorRight) forKey:@"Right"];
    [iconAnchor setObject:@(MGLIconAnchorTopLeft) forKey:@"TopLeft"];
    [iconAnchor setObject:@(MGLIconAnchorTopRight) forKey:@"TopRight"];
    [iconAnchor setObject:@(MGLIconAnchorBottomLeft) forKey:@"BottomLeft"];
    [iconAnchor setObject:@(MGLIconAnchorBottomRight) forKey:@"BottomRight"];

    NSMutableDictionary *iconTranslateAnchor = [[NSMutableDictionary alloc] init];
    [iconTranslateAnchor setObject:@(MGLIconTranslationAnchorMap) forKey:@"Map"];
    [iconTranslateAnchor setObject:@(MGLIconTranslationAnchorViewport) forKey:@"Viewport"];

    NSMutableDictionary *iconPitchAlignment = [[NSMutableDictionary alloc] init];
    [iconPitchAlignment setObject:@(MGLIconPitchAlignmentAuto) forKey:@"Auto"];
    [iconPitchAlignment setObject:@(MGLIconPitchAlignmentMap) forKey:@"Map"];
    [iconPitchAlignment setObject:@(MGLIconPitchAlignmentViewport) forKey:@"Viewport"];

    NSMutableDictionary *symbolPlacement = [[NSMutableDictionary alloc] init];
    [symbolPlacement setObject:@(MGLSymbolPlacementLine) forKey:@"Line"];
    [symbolPlacement setObject:@(MGLSymbolPlacementPoint) forKey:@"Point"];

    NSMutableDictionary *textAnchor = [[NSMutableDictionary alloc] init];
    [textAnchor setObject:@(MGLTextAnchorCenter) forKey:@"Center"];
    [textAnchor setObject:@(MGLTextAnchorLeft) forKey:@"Left"];
    [textAnchor setObject:@(MGLTextAnchorRight) forKey:@"Right"];
    [textAnchor setObject:@(MGLTextAnchorTop) forKey:@"Top"];
    [textAnchor setObject:@(MGLTextAnchorBottom) forKey:@"Bottom"];
    [textAnchor setObject:@(MGLTextAnchorTopLeft) forKey:@"TopLeft"];
    [textAnchor setObject:@(MGLTextAnchorTopRight) forKey:@"TopRight"];
    [textAnchor setObject:@(MGLTextAnchorBottomLeft) forKey:@"BottomLeft"];
    [textAnchor setObject:@(MGLTextAnchorBottomRight) forKey:@"BottomRight"];

    NSMutableDictionary *textJustify = [[NSMutableDictionary alloc] init];
    [textJustify setObject:@(MGLTextJustificationCenter) forKey:@"Center"];
    [textJustify setObject:@(MGLTextJustificationLeft) forKey:@"Left"];
    [textJustify setObject:@(MGLTextJustificationRight) forKey:@"Right"];

    NSMutableDictionary *textPitchAlignment = [[NSMutableDictionary alloc] init];
    [textPitchAlignment setObject:@(MGLTextPitchAlignmentAuto) forKey:@"Auto"];
    [textPitchAlignment setObject:@(MGLTextPitchAlignmentMap) forKey:@"Map"];
    [textPitchAlignment setObject:@(MGLTextPitchAlignmentViewport) forKey:@"Viewport"];

    NSMutableDictionary *textRotationAlignment = [[NSMutableDictionary alloc] init];
    [textRotationAlignment setObject:@(MGLTextRotationAlignmentAuto) forKey:@"Auto"];
    [textRotationAlignment setObject:@(MGLTextRotationAlignmentMap) forKey:@"Map"];
    [textRotationAlignment setObject:@(MGLTextRotationAlignmentViewport) forKey:@"Viewport"];

    NSMutableDictionary *textTransform = [[NSMutableDictionary alloc] init];
    [textTransform setObject:@(MGLTextTransformNone) forKey:@"None"];
    [textTransform setObject:@(MGLTextTransformLowercase) forKey:@"Lowercase"];
    [textTransform setObject:@(MGLTextTransformUppercase) forKey:@"Uppercase"];

    NSMutableDictionary *textTranslateAnchor = [[NSMutableDictionary alloc] init];
    [textTranslateAnchor setObject:@(MGLTextTranslationAnchorMap) forKey:@"Map"];
    [textTranslateAnchor setObject:@(MGLTextTranslationAnchorViewport) forKey:@"Viewport"];

    // light constants
    NSMutableDictionary *lightAnchor = [[NSMutableDictionary alloc] init];
    [lightAnchor setObject:@(MGLLightAnchorMap) forKey:@"Map"];
    [lightAnchor setObject:@(MGLLightAnchorViewport) forKey:@"Viewport"];

    // offline module callback names
    NSMutableDictionary *offlineModuleCallbackNames = [[NSMutableDictionary alloc] init];
    [offlineModuleCallbackNames setObject:RCT_MAPBOX_OFFLINE_CALLBACK_ERROR forKey:@"Error"];
    [offlineModuleCallbackNames setObject:RCT_MAPBOX_OFFLINE_CALLBACK_PROGRESS forKey:@"Progress"];

    NSMutableDictionary *offlinePackDownloadState = [[NSMutableDictionary alloc] init];
    [offlinePackDownloadState setObject:@(MGLOfflinePackStateInactive) forKey:@"Inactive"];
    [offlinePackDownloadState setObject:@(MGLOfflinePackStateActive) forKey:@"Active"];
    [offlinePackDownloadState setObject:@(MGLOfflinePackStateComplete) forKey:@"Complete"];
    
    NSMutableDictionary *mapxusStyle = [NSMutableDictionary dictionary];
    [mapxusStyle setObject:@(MXMStyleMAPXUS_V2) forKey:@"MAPXUS_V2"];
    [mapxusStyle setObject:@(MXMStyleMAPXUS) forKey:@"MAPXUS"];
    [mapxusStyle setObject:@(MXMStyleCOMMON) forKey:@"COMMON"];
    [mapxusStyle setObject:@(MXMStyleCHRISTMAS) forKey:@"CHRISTMAS"];
    [mapxusStyle setObject:@(MXMStyleHALLOWMAS) forKey:@"HALLOWMAS"];
    [mapxusStyle setObject:@(MXMStyleMAPPYBEE) forKey:@"MAPPYBEE"];
    
    NSMutableDictionary *mapxusSelectorPosition = [NSMutableDictionary dictionary];
    [mapxusSelectorPosition setObject:@(MXMSelectorPositionCenterLeft) forKey:@"CENTER_LEFT"];
    [mapxusSelectorPosition setObject:@(MXMSelectorPositionCenterRight) forKey:@"CENTER_RIGHT"];
    [mapxusSelectorPosition setObject:@(MXMSelectorPositionBottomLeft) forKey:@"BOTTOM_LEFT"];
    [mapxusSelectorPosition setObject:@(MXMSelectorPositionBottomRight) forKey:@"BOTTOM_RIGHT"];
    [mapxusSelectorPosition setObject:@(MXMSelectorPositionTopLeft) forKey:@"TOP_LEFT"];
    [mapxusSelectorPosition setObject:@(MXMSelectorPositionTopRight) forKey:@"TOP_RIGHT"];

    NSMutableDictionary *mapxusZoomMode = [NSMutableDictionary dictionary];
    [mapxusZoomMode setObject:@(MXMZoomDisable) forKey:@"DISABLE"];
    [mapxusZoomMode setObject:@(MXMZoomAnimated) forKey:@"ANIMATED"];
    [mapxusZoomMode setObject:@(MXMZoomDirect) forKey:@"DIRECT"];

    return @{
         @"StyleURL": styleURLS,
         @"EventTypes": eventTypes,
         @"UserTrackingModes": userTrackingModes,
         @"UserLocationVerticalAlignment": userLocationVerticalAlignment,
         @"CameraModes": cameraModes,
         @"StyleSource": styleSourceConsts,
         @"LineJoin": lineJoin,
         @"LineCap": lineCap,
         @"LineTranslateAnchor": lineTranslateAnchor,
         @"CirclePitchScale": circlePitchScale,
         @"CircleTranslateAnchor": circleTranslateAnchor,
         @"CirclePitchAlignment": circlePitchAlignment,
         @"FillExtrusionTranslateAnchor": fillExtrusionTranslateAnchor,
         @"FillTranslateAnchor": fillTranslateAnchor,
         @"IconRotationAlignment": iconRotationAlignment,
         @"IconTextFit": iconTextFit,
         @"IconTranslateAnchor": iconTranslateAnchor,
         @"IconAnchor": iconAnchor,
         @"IconPitchAlignment": iconPitchAlignment,
         @"SymbolPlacement": symbolPlacement,
         @"TextAnchor": textAnchor,
         @"TextJustify": textJustify,
         @"TextPitchAlignment": textPitchAlignment,
         @"TextRotationAlignment": textRotationAlignment,
         @"TextTransform": textTransform,
         @"TextTranslateAnchor": textTranslateAnchor,
         @"LightAnchor": lightAnchor,
         @"OfflineCallbackName": offlineModuleCallbackNames,
         @"OfflinePackDownloadState": offlinePackDownloadState,
         @"LocationCallbackName": locationModuleEvents,
         @"MapxusMapStyle": mapxusStyle,
         @"MapxusSelectorPosition": mapxusSelectorPosition,
         @"MapxusZoomMode": mapxusZoomMode,
    };
}

 
RCT_EXPORT_METHOD(registerWithApiKey:(NSString *)apiKey secret:(NSString *)secret)
{
    MXMMapServices *services = [MXMMapServices sharedServices];
    [services registerWithApiKey:apiKey secret:secret];
}

@end
