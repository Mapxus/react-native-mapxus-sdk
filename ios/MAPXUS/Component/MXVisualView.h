//
//  MXVisualView.h
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/7/30.
//

#import <React/RCTComponent.h>
#import <MapxusVisualSDK/MapxusVisualSDK.h>

NS_ASSUME_NONNULL_BEGIN

@interface MXVisualView : MXMVisualView

@property (nonatomic, copy) RCTBubblingEventBlock onLoadFail;
@property (nonatomic, copy) RCTBubblingEventBlock onRenderComplete;
@property (nonatomic, copy) RCTBubblingEventBlock onLoadingChanged;
@property (nonatomic, copy) RCTBubblingEventBlock onBearingChanged;
@property (nonatomic, copy) RCTBubblingEventBlock onNodeChanged;

@end

NS_ASSUME_NONNULL_END
