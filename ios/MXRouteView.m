//
//  MXRouteView.m
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/7/29.
//

#import <MapxusComponentKit/MapxusComponentKit.h>
#import <YYModel/YYModel.h>
#import "MXRouteView.h"

@interface MXRouteView()

@property (nonatomic, strong) MXMRoutePainter *routePainter;

@end

@implementation MXRouteView

- (void)setMapRendererView:(MGLMapView *)mapRendererView {
    _mapRendererView = mapRendererView;
    if (mapRendererView) {
        self.routePainter = [[MXMRoutePainter alloc] initWithMapView:mapRendererView];
    }
}

- (void)setReactIndoorLineColor:(UIColor *)reactIndoorLineColor {
    _reactIndoorLineColor = reactIndoorLineColor;
    self.routePainter.indoorLineColor = reactIndoorLineColor;
}

- (void)setReactOutdoorLineColor:(UIColor *)reactOutdoorLineColor {
    _reactOutdoorLineColor = reactOutdoorLineColor;
    self.routePainter.outdoorLineColor = reactOutdoorLineColor;
}

- (void)setReactDashLineColor:(UIColor *)reactDashLineColor {
    _reactDashLineColor = reactDashLineColor;
    self.routePainter.dashLineColor = reactDashLineColor;
}

- (void)setReactArrowSymbolSpacing:(NSNumber *)reactArrowSymbolSpacing {
    _reactArrowSymbolSpacing = reactArrowSymbolSpacing;
    self.routePainter.arrowSymbolSpacing = reactArrowSymbolSpacing;
}

- (void)setReactIsAddStartDash:(BOOL)reactIsAddStartDash {
    _reactIsAddStartDash = reactIsAddStartDash;
    self.routePainter.isAddStartDash = reactIsAddStartDash;
}

- (void)setReactIsAddEndDash:(BOOL)reactIsAddEndDash {
    _reactIsAddEndDash = reactIsAddEndDash;
    self.routePainter.isAddEndDash = reactIsAddEndDash;
}

- (void)setReactHiddenTranslucentPaths:(BOOL)reactHiddenTranslucentPaths {
    _reactHiddenTranslucentPaths = reactHiddenTranslucentPaths;
    self.routePainter.hiddenTranslucentPaths = reactHiddenTranslucentPaths;
}

- (NSDictionary *)reactPainterPathDto {
    NSMutableDictionary *dic = [NSMutableDictionary dictionary];
    dic[@"startPoint"] = [self.routePainter.dto.startPoint yy_modelToJSONObject];
    dic[@"endPoint"] = [self.routePainter.dto.endPoint yy_modelToJSONObject];
    dic[@"keys"] = self.routePainter.dto.keys;
    dic[@"paragraphs"] = [self.routePainter.dto.paragraphs yy_modelToJSONObject];
    return dic;
}

- (void)reactPaintRouteUsingPath:(MXMPath *)path wayPoints:(NSArray<MXMIndoorPoint *> *)list {
    [self.routePainter paintRouteUsingPath:path wayPoints:list];
}

- (void)reactCleanRoute {
    [self.routePainter cleanRoute];
}

- (void)reactChangeOnBuilding:(nullable NSString *)buildingId floor:(nullable NSString *)floor {
    [self.routePainter changeOnBuilding:buildingId floor:floor];
}

- (void)reactFocusOnKeys:(NSArray<NSString *> *)keys edgePadding:(UIEdgeInsets)insets {
    [self.routePainter focusOnKeys:keys edgePadding:insets];
}

@end
