//
//  MXVisualNodeView.m
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/7/30.
//

#import <MapxusComponentKit/MapxusComponentKit.h>
#import "MXVisualNodeView.h"

@interface MXVisualNodeView ()

@property (nonatomic, strong) MXMVisualFlagPainter *painter;

@end

@implementation MXVisualNodeView

- (void)setMapRendererView:(MGLMapView *)mapRendererView {
    _mapRendererView = mapRendererView;
    if (mapRendererView) {
        self.painter = [[MXMVisualFlagPainter alloc] initWithMapView:mapRendererView];
        
        __weak typeof(self) weakSelf = self;
        self.painter.circleOnClickBlock = ^(NodeDictionary * _Nonnull node) {
            if (weakSelf.onTappedFlag) {
                weakSelf.onTappedFlag(node);
            }
        };
    }
}

- (void)setOnTappedFlag:(RCTBubblingEventBlock)onTappedFlag {
    _onTappedFlag = [onTappedFlag copy];
    
    __weak typeof(self) weakSelf = self;
    self.painter.circleOnClickBlock = ^(NodeDictionary * _Nonnull node) {
        if (weakSelf.onTappedFlag) {
            weakSelf.onTappedFlag(node);
        }
    };
}

- (void)reactRenderFlagsUsingNodes:(NSArray<NSDictionary *> *)nodes {
    [self.painter renderFlagUsingNodes:nodes];
}

- (void)reactCleanLayer {
    [self.painter cleanLayer];
}

- (void)reactChangeOnBuilding:(NSString *)buildingId floor:(NSString *)floor {
    [self.painter changeOnBuilding:buildingId floor:floor];
}

@end
