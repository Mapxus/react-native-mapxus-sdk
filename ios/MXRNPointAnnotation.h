//
//  MXRNPointAnnotation.h
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/4/19.
//

#import <MapxusMapSDK/MapxusMapSDK.h>

@class MXPointAnnotationView;


NS_ASSUME_NONNULL_BEGIN

@interface MXRNPointAnnotation : MXMPointAnnotation

@property (nonatomic, weak) MXPointAnnotationView *annotationView;

@end

NS_ASSUME_NONNULL_END
