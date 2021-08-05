//
//  MXRouteView.h
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/7/29.
//

#import <UIKit/UIKit.h>
#import <MapxusMapSDK/MapxusMapSDK.h>


NS_ASSUME_NONNULL_BEGIN

@interface MXRouteView : UIView

@property (nonatomic, weak) MGLMapView *mapRendererView;

@property (nonatomic, readonly) NSDictionary *reactPainterPathDto;

/// 室内线段颜色
@property (nonatomic, strong) UIColor *reactIndoorLineColor;

/// 室外线段颜色
@property (nonatomic, strong) UIColor *reactOutdoorLineColor;

/// 虚线段颜色
@property (nonatomic, strong) UIColor *reactDashLineColor;

/// 线路方向指示图标间隔
@property (nonatomic, strong) NSNumber *reactArrowSymbolSpacing;

/// 线路方向指示图标
@property (nonatomic, strong) NSString *reactArrowIcon;

/// 起点图标
@property (nonatomic, strong) NSString *reactStartIcon;

/// 终点图标
@property (nonatomic, strong) NSString *reactEndIcon;

/// 电梯上行图标
@property (nonatomic, strong) NSString *reactElevatorUpIcon;

/// 电梯下行图标
@property (nonatomic, strong) NSString *reactElevatorDownIcon;

/// 扶梯上行图标
@property (nonatomic, strong) NSString *reactEscalatorUpIcon;

/// 扶梯下行图标
@property (nonatomic, strong) NSString *reactEscalatorDownIcon;

/// 斜坡上行图标
@property (nonatomic, strong) NSString *reactRampUpIcon;

/// 斜坡下行图标
@property (nonatomic, strong) NSString *reactRampDownIcon;

/// 楼梯上行图标
@property (nonatomic, strong) NSString *reactStairsUpIcon;

/// 楼梯下行图标
@property (nonatomic, strong) NSString *reactStairsDownIcon;

/// 门口图标
@property (nonatomic, strong) NSString *reactBuildingGateIcon;

/// 添加起始点到路网起始端的虚线段
@property (nonatomic, assign) BOOL reactIsAddStartDash;

/// 添加终点到路网终端的虚线段
@property (nonatomic, assign) BOOL reactIsAddEndDash;

/// 隐藏未选中楼层上的路线，默认为 NO
@property (nonatomic, assign) BOOL reactHiddenTranslucentPaths;

- (void)reactPaintRouteUsingPath:(MXMPath *)path wayPoints:(NSArray<MXMIndoorPoint *> *)list;
- (void)reactCleanRoute;
- (void)reactChangeOnBuilding:(nullable NSString *)buildingId floor:(nullable NSString *)floor;
- (void)reactFocusOnKeys:(NSArray<NSString*> *)keys edgePadding:(UIEdgeInsets)insets;

@end

NS_ASSUME_NONNULL_END
