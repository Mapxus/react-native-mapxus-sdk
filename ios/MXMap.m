//
//  MXMap.m
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/4/9.
//

#import "MXMap.h"
#import "RCTMGLMapView.h"
#import <React/UIView+React.h>
#import <YYModel/YYModel.h>
#import "MXPointAnnotationView.h"
#import "MXRouteView.h"
#import "RCTMXUserLocationProtocol.h"
#import "MXNavigationView.h"
#import "MXVisualNodeView.h"


@interface MXMap () <MapxusMapDelegate>

@property (nonatomic, strong) MapxusMap *mapxusMap;
@property (nonatomic, weak) RCTMGLMapView *mapRendererView;
@property (nonatomic, strong) NSMutableArray<NSLayoutConstraint *> *constraints;

@end

@implementation MXMap

- (instancetype)init {
    self = [super init];
    if (self) {
        self.reactSubviews = [NSMutableArray array];
        self.reactSelectorPosition = MXMSelectorPositionCenterLeft;
        self.reactSelectorPositionCustom = CGPointMake(-1, -1);
    }
    return self;
}

- (void)invalidate
{
    if (_reactSubviews.count == 0) {
        return;
    }
    for (int i = 0; i < _reactSubviews.count; i++) {
        [self removeFromMap:_reactSubviews[i]];
    }
}

- (void)addMXMPointAnnotations:(MXMPointAnnotation *)annotation {
    [self.mapxusMap addMXMPointAnnotations:@[annotation]];
}

- (void)removeMXMPointAnnotaions:(MXMPointAnnotation *)annotation {
    [self.mapxusMap removeMXMPointAnnotaions:@[annotation]];
}


- (void)addToMap:(id<RCTComponent>)subview
{
    if ([subview isKindOfClass:[RCTMGLMapView class]]) {
        RCTMGLMapView *mapView = (RCTMGLMapView*)subview;
        self.mapRendererView = mapView;
        self.mapxusMap = [[MapxusMap alloc] initWithMapView:mapView configuration:self.reactMapOption];
        [self delayedConfigurationMap];
    } else if ([subview isKindOfClass:[MXPointAnnotationView class]]) {
        MXPointAnnotationView *pointAnnotation = (MXPointAnnotationView *)subview;
        pointAnnotation.map = self.mapRendererView;
        pointAnnotation.mapxusMap = self;
    } else if ([subview isKindOfClass:[MXRouteView class]]) {
        MXRouteView *routeView = (MXRouteView *)subview;
        routeView.mapRendererView = self.mapRendererView;
    } else if ([subview conformsToProtocol:@protocol(RCTMXUserLocationProtocol)]) {
        id<RCTMXUserLocationProtocol> locationView = (id<RCTMXUserLocationProtocol>)subview;
        locationView.mapRendererView = self.mapRendererView;
    } else if ([subview isKindOfClass:[MXVisualNodeView class]]) {
        MXVisualNodeView *nodeView = (MXVisualNodeView *)subview;
        nodeView.mapRendererView = self.mapRendererView;
    } else {
        NSArray<id<RCTComponent>> *childSubviews = [subview reactSubviews];

        for (int i = 0; i < childSubviews.count; i++) {
            [self addToMap:childSubviews[i]];
        }
    }
}

- (void)removeFromMap:(id<RCTComponent>)subview
{
    if ([subview isKindOfClass:[RCTMGLMapView class]]) {
        self.mapxusMap = nil;
    } else if ([subview isKindOfClass:[MXPointAnnotationView class]]) {
        MXPointAnnotationView *pointAnnotation = (MXPointAnnotationView *)subview;
        pointAnnotation.map = nil;
        pointAnnotation.mapxusMap = nil;
    } else if ([subview isKindOfClass:[MXRouteView class]]) {
        MXRouteView *routeView = (MXRouteView *)subview;
        routeView.mapRendererView = nil;
    } else if ([subview conformsToProtocol:@protocol(RCTMXUserLocationProtocol)]) {
        id<RCTMXUserLocationProtocol> locationView = (id<RCTMXUserLocationProtocol>)subview;
        locationView.mapRendererView = nil;
    } else if ([subview isKindOfClass:[MXVisualNodeView class]]) {
        MXVisualNodeView *nodeView = (MXVisualNodeView *)subview;
        nodeView.mapRendererView = nil;
    } else {
        NSArray<id<RCTComponent>> *childSubViews = [subview reactSubviews];
        
        for (int i = 0; i < childSubViews.count; i++) {
            [self removeFromMap:childSubViews[i]];
        }
    }
}

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wobjc-missing-super-calls"
- (void)insertReactSubview:(id<RCTComponent>)subview atIndex:(NSInteger)atIndex {
    [self addToMap:subview];
    [_reactSubviews insertObject:(UIView *)subview atIndex:(NSUInteger) atIndex];
}
#pragma clang diagnostic pop

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wobjc-missing-super-calls"
- (void)removeReactSubview:(id<RCTComponent>)subview {
    // similarly, when the children are being removed we have to do the appropriate
    // underlying mapview action here.
    [self removeFromMap:subview];
    [_reactSubviews removeObject:(UIView *)subview];
    [(UIView *)subview removeFromSuperview];
}
#pragma clang diagnostic pop

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wobjc-missing-super-calls"
- (NSArray<id<RCTComponent>> *)reactSubviews {
    return _reactSubviews;
}
#pragma clang diagnostic pop

// 未生成地图前设置的配置需要需要在生成后重新设置进去
- (void)delayedConfigurationMap {
    self.mapxusMap.delegate = self;
    if (self.reactSelectFontColor) {
        self.mapxusMap.floorBar.selectFontColor = self.reactSelectFontColor;
    }
    if (self.reactSelectBoxColor) {
        self.mapxusMap.floorBar.selectBoxColor = self.reactSelectBoxColor;
    }
    if (self.reactFontColor) {
        self.mapxusMap.floorBar.fontColor = self.reactFontColor;
    }
    if (self.reactIndoorControllerAlwaysHidden) {
        self.mapxusMap.indoorControllerAlwaysHidden = [self.reactIndoorControllerAlwaysHidden boolValue];
    }
    if (self.reactLogoBottomMargin) {
        self.mapxusMap.logoBottomMargin = [self.reactLogoBottomMargin floatValue];
    }
    if (self.reactOpenStreetSourceBottomMargin) {
        self.mapxusMap.openStreetSourceBottomMargin = [self.reactOpenStreetSourceBottomMargin floatValue];
    }
    if (self.reactOutdoorHidden) {
        self.mapxusMap.outdoorHidden = [self.reactOutdoorHidden boolValue];
    }
    if (self.reactGestureSwitchingBuilding) {
        self.mapxusMap.gestureSwitchingBuilding = [self.reactGestureSwitchingBuilding boolValue];
    }
    if (self.reactAutoChangeBuilding) {
        self.mapxusMap.autoChangeBuilding = [self.reactAutoChangeBuilding boolValue];
    }
    
    self.mapxusMap.selectorPosition = self.reactSelectorPosition;
    if (!CGPointEqualToPoint(self.reactSelectorPositionCustom, CGPointMake(-1, -1))) {
        [self setReactSelectorPositionCustom:self.reactSelectorPositionCustom];
    }
}

- (void)setReactSelectFontColor:(UIColor *)reactSelectFontColor {
    _reactSelectFontColor = reactSelectFontColor;
    self.mapxusMap.floorBar.selectFontColor = reactSelectFontColor;
}

- (void)setReactSelectBoxColor:(UIColor *)reactSelectBoxColor {
    _reactSelectBoxColor = reactSelectBoxColor;
    self.mapxusMap.floorBar.selectBoxColor = reactSelectBoxColor;
}

- (void)setReactFontColor:(UIColor *)reactFontColor {
    _reactFontColor = reactFontColor;
    self.mapxusMap.floorBar.fontColor = reactFontColor;
}

- (void)setReactIndoorControllerAlwaysHidden:(NSNumber *)reactIndoorControllerAlwaysHidden {
    _reactIndoorControllerAlwaysHidden = reactIndoorControllerAlwaysHidden;
    self.mapxusMap.indoorControllerAlwaysHidden = [reactIndoorControllerAlwaysHidden boolValue];
}

- (void)setReactSelectorPosition:(MXMSelectorPosition)reactSelectorPosition {
    _reactSelectorPosition = reactSelectorPosition;
    self.mapxusMap.selectorPosition = reactSelectorPosition;
}

- (void)setReactSelectorPositionCustom:(CGPoint)reactSelectorPositionCustom {
    _reactSelectorPositionCustom = reactSelectorPositionCustom;
    if (self.mapxusMap) {
        if (self.constraints.count == 0) {
            [self.mapxusMap.buildingSelectButton removeFromSuperview];
            [self.mapxusMap.floorBar removeFromSuperview];
            [self.mapRendererView addSubview:self.mapxusMap.buildingSelectButton];
            [self.mapRendererView addSubview:self.mapxusMap.floorBar];
        }
        MXMFloorSelectorBar *floorBar = self.mapxusMap.floorBar;
        UIButton *buildingButton = self.mapxusMap.buildingSelectButton;
        CGFloat x = MAX(reactSelectorPositionCustom.x, 0);
        CGFloat y = MAX(reactSelectorPositionCustom.y, 0);
        
        NSMutableArray *updatedConstraints = [NSMutableArray array];
        
        [updatedConstraints addObject:[buildingButton.bottomAnchor constraintEqualToAnchor:floorBar.topAnchor constant:-4]];
        [updatedConstraints addObject:[buildingButton.centerXAnchor constraintEqualToAnchor:floorBar.centerXAnchor]];
        
        switch (self.mapxusMap.selectorPosition) {
            case MXMSelectorPositionTopLeft:
            case MXMSelectorPositionCenterLeft:
                [updatedConstraints addObject:[buildingButton.topAnchor constraintEqualToAnchor:self.mapRendererView.topAnchor constant:y]];
                [updatedConstraints addObject:[buildingButton.leadingAnchor constraintEqualToAnchor:self.mapRendererView.leadingAnchor constant:x]];
                break;
            case MXMSelectorPositionTopRight:
            case MXMSelectorPositionCenterRight:
                [updatedConstraints addObject:[buildingButton.topAnchor constraintEqualToAnchor:self.mapRendererView.topAnchor constant:y]];
                [updatedConstraints addObject:[self.mapRendererView.trailingAnchor constraintEqualToAnchor:buildingButton.trailingAnchor constant:x]];
                break;
            case MXMSelectorPositionBottomLeft:
                [updatedConstraints addObject:[self.mapRendererView.bottomAnchor constraintEqualToAnchor:floorBar.bottomAnchor constant:y]];
                [updatedConstraints addObject:[buildingButton.leadingAnchor constraintEqualToAnchor:self.mapRendererView.leadingAnchor constant:x]];
                break;
            case MXMSelectorPositionBottomRight:
                [updatedConstraints addObject:[self.mapRendererView.bottomAnchor constraintEqualToAnchor:floorBar.bottomAnchor constant:y]];
                [updatedConstraints addObject: [self.mapRendererView.trailingAnchor constraintEqualToAnchor:buildingButton.trailingAnchor constant:x]];
                break;
        }
        
        [NSLayoutConstraint deactivateConstraints:self.constraints];
        [self.constraints removeAllObjects];
        [NSLayoutConstraint activateConstraints:updatedConstraints];
        [self.constraints addObjectsFromArray:updatedConstraints];
    }
}

- (void)setReactLogoBottomMargin:(NSNumber *)reactLogoBottomMargin {
    _reactLogoBottomMargin = reactLogoBottomMargin;
    self.mapxusMap.logoBottomMargin = [reactLogoBottomMargin floatValue];
}

- (void)setReactOpenStreetSourceBottomMargin:(NSNumber *)reactOpenStreetSourceBottomMargin {
    _reactOpenStreetSourceBottomMargin = reactOpenStreetSourceBottomMargin;
    self.mapxusMap.openStreetSourceBottomMargin = [reactOpenStreetSourceBottomMargin floatValue];
}

- (void)setReactOutdoorHidden:(NSNumber *)reactOutdoorHidden {
    _reactOutdoorHidden = reactOutdoorHidden;
    self.mapxusMap.outdoorHidden = [reactOutdoorHidden boolValue];
}

- (void)setReactGestureSwitchingBuilding:(NSNumber *)reactGestureSwitchingBuilding {
    _reactGestureSwitchingBuilding = reactGestureSwitchingBuilding;
    self.mapxusMap.gestureSwitchingBuilding = [reactGestureSwitchingBuilding boolValue];
}

- (void)setReactAutoChangeBuilding:(NSNumber *)reactAutoChangeBuilding {
    _reactAutoChangeBuilding = reactAutoChangeBuilding;
    self.mapxusMap.autoChangeBuilding = [reactAutoChangeBuilding boolValue];
}

- (NSArray<MXMPointAnnotation *> *)reactMXMAnnotations {
    return self.mapxusMap.MXMAnnotations;
}

- (void)reactSetMapSytle:(MXMStyle)style {
    [self.mapxusMap setMapSytle:style];
}

- (void)reactSetMapStyleWithName:(NSString *)styleName {
    [self.mapxusMap setMapStyleWithName:styleName];
}

- (void)reactSetMapLanguage:(NSString *)language {
    [self.mapxusMap setMapLanguage:language];
}

- (void)reactSelectBuilding:(nullable NSString *)buildingId
                      floor:(nullable NSString *)floor
                   zoomMode:(MXMZoomMode)zoomMode
                edgePadding:(UIEdgeInsets)insets {
    [self.mapxusMap selectBuilding:buildingId floor:floor zoomMode:zoomMode edgePadding:insets];
}




#pragma mark - MapxusMapDelegate

- (void)mapView:(MapxusMap *)mapView didSingleTappedOnPOI:(MXMGeoPOI *)poi atCoordinate:(CLLocationCoordinate2D)coordinate onFloor:(NSString *)floorName inBuilding:(MXMGeoBuilding *)building {
    if (!self.onTappedOnPoi) {
        return;
    }
    
    NSMutableDictionary *dic = [NSMutableDictionary dictionary];
    dic[@"poi"] = [poi yy_modelToJSONObject];
    dic[@"coordinates"] = @{
        @"latitude": [NSNumber numberWithDouble: coordinate.latitude],
        @"longitude": [NSNumber numberWithDouble: coordinate.longitude]
    };
    dic[@"floor"] = floorName;
    dic[@"building"] = [building yy_modelToJSONObject];
    
    self.onTappedOnPoi(dic);
}

- (void)mapView:(MapxusMap *)mapView didSingleTappedOnMapBlank:(CLLocationCoordinate2D)coordinate onFloor:(NSString *)floorName inBuilding:(MXMGeoBuilding *)building {
    if (!self.onTappedOnBlank) {
        return;
    }
    
    NSMutableDictionary *dic = [NSMutableDictionary dictionary];
    dic[@"coordinates"] = @{
        @"latitude": [NSNumber numberWithDouble: coordinate.latitude],
        @"longitude": [NSNumber numberWithDouble: coordinate.longitude]
    };
    dic[@"floor"] = floorName;
    dic[@"building"] = [building yy_modelToJSONObject];
    
    self.onTappedOnBlank(dic);
}

- (void)mapView:(MapxusMap *)mapView didLongPressedAtCoordinate:(CLLocationCoordinate2D)coordinate onFloor:(NSString *)floorName inBuilding:(MXMGeoBuilding *)building {
    if (!self.onLongPressed) {
        return;
    }
    
    NSMutableDictionary *dic = [NSMutableDictionary dictionary];
    dic[@"coordinates"] = @{
        @"latitude": [NSNumber numberWithDouble: coordinate.latitude],
        @"longitude": [NSNumber numberWithDouble: coordinate.longitude]
    };
    dic[@"floor"] = floorName;
    dic[@"building"] = [building yy_modelToJSONObject];
    
    self.onLongPressed(dic);
}

- (void)mapView:(MapxusMap *)mapView didChangeFloor:(NSString *)floorName atBuilding:(MXMGeoBuilding *)building {
    if (!self.onIndoorSceneChange) {
        return;
    }
    
    NSMutableDictionary *dic = [NSMutableDictionary dictionary];
    dic[@"floor"] = floorName;
    dic[@"building"] = [building yy_modelToJSONObject];
    
    self.onIndoorSceneChange(dic);
}

- (void)mapView:(MapxusMap *)mapView indoorMapWithIn:(BOOL)flag building:(NSString *)buildingId floor:(NSString *)floor {
    if (!self.onIndoorStatusChange) {
        return;
    }
    
    NSMutableDictionary *dic = [NSMutableDictionary dictionary];
    dic[@"flag"] = @(flag);
    dic[@"floor"] = floor;
    dic[@"buildingId"] = buildingId;
    
    self.onIndoorStatusChange(dic);
}

- (NSArray<__kindof NSLayoutConstraint *> *)constraints {
    if (!_constraints) {
        _constraints = [NSMutableArray array];
    }
    return _constraints;
}

@end
