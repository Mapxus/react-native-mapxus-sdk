//
//  MXMap.h
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/4/9.
//

#import <UIKit/UIKit.h>
#import <React/RCTComponent.h>
#import <React/RCTBridge.h>

@import MapxusMapSDK;


NS_ASSUME_NONNULL_BEGIN

@interface MXMap : UIView <RCTInvalidating>

@property (nonatomic, strong) NSMutableArray<id<RCTComponent>> *reactSubviews;

// 初始化参数
@property (nonatomic, strong, nullable) MXMConfiguration *reactMapOption;

@property (nonatomic, strong) UIColor *reactSelectFontColor;
@property (nonatomic, strong) UIColor *reactSelectBoxColor;
@property (nonatomic, strong) UIColor *reactFontColor;
@property (nonatomic, strong) NSNumber *reactIndoorControllerAlwaysHidden;
@property (nonatomic, assign) MXMSelectorPosition reactSelectorPosition;
@property (nonatomic, assign) CGPoint reactSelectorPositionCustom;
@property (nonatomic, strong) NSNumber *reactLogoBottomMargin;
@property (nonatomic, strong) NSNumber *reactOpenStreetSourceBottomMargin;

@property (nonatomic, strong) NSNumber *reactOutdoorHidden;
@property (nonatomic, strong) NSNumber *reactGestureSwitchingBuilding;
@property (nonatomic, strong) NSNumber *reactAutoChangeBuilding;

#warning 未决定是否对js开放
@property (nonatomic, readonly) NSArray<MXMPointAnnotation *> *reactMXMAnnotations;

@property (nonatomic, copy) RCTBubblingEventBlock onTappedOnPoi;
@property (nonatomic, copy) RCTBubblingEventBlock onTappedOnBlank;
@property (nonatomic, copy) RCTBubblingEventBlock onLongPressed;
@property (nonatomic, copy) RCTBubblingEventBlock onIndoorSceneChange;
@property (nonatomic, copy) RCTBubblingEventBlock onIndoorStatusChange;

- (void)reactSetMapSytle:(MXMStyle)style;
- (void)reactSetMapStyleWithName:(NSString *)styleName;
- (void)reactSetMapLanguage:(NSString *)language;
- (void)reactSelectBuilding:(nullable NSString *)buildingId
                      floor:(nullable NSString *)floor
                   zoomMode:(MXMZoomMode)zoomMode
                edgePadding:(UIEdgeInsets)insets;


- (void)addMXMPointAnnotations:(MXMPointAnnotation *)annotation;
- (void)removeMXMPointAnnotaions:(MXMPointAnnotation *)annotation;

@end

NS_ASSUME_NONNULL_END
