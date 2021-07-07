//
//  MXPointAnnotationView.m
//  react-native-mapxus-sdk
//
//  Created by chenghao guo on 2021/4/16.
//

#import "MXPointAnnotationView.h"
#import "MXMap.h"
#import "RCTMGLUtils.h"


@implementation MXPointAnnotationView

@synthesize map = _map;
@synthesize reactCoordinate = _reactCoordinate;

- (void)setMap:(MGLMapView *)map {
    _map = map;
}

- (void)setReactCoordinate:(NSString *)reactCoordinate
{
    _reactCoordinate = reactCoordinate;
    [self _updateCoordinate];
}

- (void)_updateCoordinate
{
    if (_reactCoordinate == nil) {
        return;
    }
    
    MGLPointFeature *feature = (MGLPointFeature *)[RCTMGLUtils shapeFromGeoJSON:_reactCoordinate];
    if (feature == nil) {
        return;
    }
    
    __weak typeof(self) weakSelf = self;
    dispatch_async(dispatch_get_main_queue(), ^{
        weakSelf.coordinate = feature.coordinate;
        weakSelf.relatedAnnotation.coordinate = CLLocationCoordinate2DMake(feature.coordinate.latitude, feature.coordinate.longitude);

    });
}

- (void)setMapxusMap:(MXMap *)mapxusMap {
    if (mapxusMap == nil) {
        [_mapxusMap removeMXMPointAnnotaions:self.relatedAnnotation];
        _mapxusMap = nil;
    } else {
        _mapxusMap = mapxusMap;
        
        // prevents annotations from flying in from the top left corner
        // if the frame hasn't been set yet
        if (![self _isChildrenFrameSet]) {
            return;
        }
        
        [self _addAnnotation];
    }
}

- (void)setReactTitle:(NSString *)reactTitle {
    [super setReactTitle:reactTitle];
    self.relatedAnnotation.title = reactTitle;
}

- (void)_addAnnotation
{
    self.relatedAnnotation = [[MXRNPointAnnotation alloc] init];
    self.relatedAnnotation.buildingId = self.reactBuildingId;
    self.relatedAnnotation.floor = self.reactFloor;
    self.relatedAnnotation.annotationView = self;
    self.relatedAnnotation.coordinate = self.coordinate;
    self.relatedAnnotation.title = self.reactTitle;
    
    if ([_mapxusMap.reactMXMAnnotations containsObject:self.relatedAnnotation]) {
        return;
    }
    
    [_mapxusMap addMXMPointAnnotations:self.relatedAnnotation];
    if (self.reactSelected) {
        [_map selectAnnotation:self.relatedAnnotation animated:NO completionHandler:nil];
    }
}

- (BOOL)_isChildrenFrameSet
{
    return self.frame.size.width > 0 && self.frame.size.height > 0;
}

@end
