//
//  MXRouteView.m
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/7/29.
//

#import <MapxusComponentKit/MapxusComponentKit.h>
#import <YYModel/YYModel.h>
#import <React/RCTConvert.h>
#import "MXRouteView.h"
#import "RCTMGLUtils.h"

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

- (void)setReactRouteAppearance:(NSDictionary *)reactRouteAppearance {
    
    NSArray<NSString*> *props = [reactRouteAppearance allKeys];
    for (NSString *prop in props) {

      if ([prop isEqualToString:@"isAddStartDash"]) {
          self.routePainter.isAddStartDash = [RCTConvert BOOL:reactRouteAppearance[prop]];
          
      } else if ([prop isEqualToString:@"isAddEndDash"]) {
          self.routePainter.isAddEndDash = [RCTConvert BOOL:reactRouteAppearance[prop]];

      } else if ([prop isEqualToString:@"hiddenTranslucentPaths"]) {
          self.routePainter.hiddenTranslucentPaths = [RCTConvert BOOL:reactRouteAppearance[prop]];

      } else if ([prop isEqualToString:@"indoorLineColor"]) {
          self.routePainter.indoorLineColor = [RCTConvert UIColor:reactRouteAppearance[prop]];
          
      } else if ([prop isEqualToString:@"outdoorLineColor"]) {
          self.routePainter.outdoorLineColor = [RCTConvert UIColor:reactRouteAppearance[prop]];

      } else if ([prop isEqualToString:@"dashLineColor"]) {
          self.routePainter.dashLineColor = [RCTConvert UIColor:reactRouteAppearance[prop]];

      } else if ([prop isEqualToString:@"arrowSymbolSpacing"]) {
          self.routePainter.arrowSymbolSpacing = [RCTConvert NSNumber:reactRouteAppearance[prop]];
          
      } else if ([prop isEqualToString:@"arrowIcon"]) {
          NSDictionary *valueDic = reactRouteAppearance[prop];
          __weak typeof(self) weakSelf = self;
          [self setImageWithValue:valueDic callback:^(UIImage *image) {
              weakSelf.routePainter.arrowIcon = image;
          }];
          
      } else if ([prop isEqualToString:@"startIcon"]) {
          NSDictionary *valueDic = reactRouteAppearance[prop];
          __weak typeof(self) weakSelf = self;
          [self setImageWithValue:valueDic callback:^(UIImage *image) {
              weakSelf.routePainter.startIcon = image;
          }];
          
      } else if ([prop isEqualToString:@"endIcon"]) {
          NSDictionary *valueDic = reactRouteAppearance[prop];
          __weak typeof(self) weakSelf = self;
          [self setImageWithValue:valueDic callback:^(UIImage *image) {
              weakSelf.routePainter.endIcon = image;
          }];
          
      } else if ([prop isEqualToString:@"elevatorUpIcon"]) {
          NSDictionary *valueDic = reactRouteAppearance[prop];
          __weak typeof(self) weakSelf = self;
          [self setImageWithValue:valueDic callback:^(UIImage *image) {
              weakSelf.routePainter.elevatorUpIcon = image;
          }];
          
      } else if ([prop isEqualToString:@"elevatorDownIcon"]) {
          NSDictionary *valueDic = reactRouteAppearance[prop];
          __weak typeof(self) weakSelf = self;
          [self setImageWithValue:valueDic callback:^(UIImage *image) {
              weakSelf.routePainter.elevatorDownIcon = image;
          }];
          
      } else if ([prop isEqualToString:@"escalatorUpIcon"]) {
          NSDictionary *valueDic = reactRouteAppearance[prop];
          __weak typeof(self) weakSelf = self;
          [self setImageWithValue:valueDic callback:^(UIImage *image) {
              weakSelf.routePainter.escalatorUpIcon = image;
          }];
          
      } else if ([prop isEqualToString:@"escalatorDownIcon"]) {
          NSDictionary *valueDic = reactRouteAppearance[prop];
          __weak typeof(self) weakSelf = self;
          [self setImageWithValue:valueDic callback:^(UIImage *image) {
              weakSelf.routePainter.escalatorDownIcon = image;
          }];
          
      } else if ([prop isEqualToString:@"rampUpIcon"]) {
          NSDictionary *valueDic = reactRouteAppearance[prop];
          __weak typeof(self) weakSelf = self;
          [self setImageWithValue:valueDic callback:^(UIImage *image) {
              weakSelf.routePainter.rampUpIcon = image;
          }];
          
      } else if ([prop isEqualToString:@"rampDownIcon"]) {
          NSDictionary *valueDic = reactRouteAppearance[prop];
          __weak typeof(self) weakSelf = self;
          [self setImageWithValue:valueDic callback:^(UIImage *image) {
              weakSelf.routePainter.rampDownIcon = image;
          }];
          
      } else if ([prop isEqualToString:@"stairsUpIcon"]) {
          NSDictionary *valueDic = reactRouteAppearance[prop];
          __weak typeof(self) weakSelf = self;
          [self setImageWithValue:valueDic callback:^(UIImage *image) {
              weakSelf.routePainter.stairsUpIcon = image;
          }];
          
      } else if ([prop isEqualToString:@"stairsDownIcon"]) {
          NSDictionary *valueDic = reactRouteAppearance[prop];
          __weak typeof(self) weakSelf = self;
          [self setImageWithValue:valueDic callback:^(UIImage *image) {
              weakSelf.routePainter.stairsDownIcon = image;
          }];
          
      } else if ([prop isEqualToString:@"buildingGateIcon"]) {
          NSDictionary *valueDic = reactRouteAppearance[prop];
          __weak typeof(self) weakSelf = self;
          [self setImageWithValue:valueDic callback:^(UIImage *image) {
              weakSelf.routePainter.buildingGateIcon = image;
          }];
          
      } else {
        // TODO throw exception
      }
    }
}

- (void)setImageWithValue:(NSDictionary *)value callback:(void (^)(UIImage *image))callback {
    NSString *imageURI = value[@"uri"];
    NSNumber *scale = value[@"scale"];
    [RCTMGLUtils fetchImage:_bridge url:imageURI scale:[scale doubleValue] callback:^(NSError *error, UIImage *image) {
      if (image != nil) {
        dispatch_async(dispatch_get_main_queue(), ^{
            callback(image);
        });
      }
    }];
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
