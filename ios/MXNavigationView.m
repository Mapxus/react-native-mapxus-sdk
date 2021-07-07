//
//  MXNavigationView.m
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/4/21.
//

#import <YYModel/YYModel.h>
#import "MXNavigationView.h"


@interface MXNavigationView ()

@property (nonatomic, strong) MXMRoutePainter *routePainter;

@end

@implementation MXNavigationView

- (void)setMapRenderer:(MGLMapView *)mapRenderer {
    _mapRenderer = mapRenderer;
    if (mapRenderer) {
        self.routePainter = [[MXMRoutePainter alloc] initWithMapView:mapRenderer];
    }
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
