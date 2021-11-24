//
//  MXModel+json.m
//  react-native-mapxus-sdk
//
//  根据YYModel的使用规则（你可以把一个或一组 json key (key path) 映射到一个或多个属性。如果一个属性没有映射关系，那默认会使用相同属性名作为映射。
//  在 model->json 的过程中：如果一个属性对应了多个 json key (key path)，那么转换过程仅会处理第一个 json key (key path)；如果多个属性对应了同一个 json
//  key，则转换过过程会使用其中任意一个不为空的值。）解析成json通过函数覆盖重写model转出json的映射
//
//  Created by chenghao guo on 2021/6/3.
//

#import "MXModel+json.h"


@implementation MXMNodeGroup (json)

- (NSDictionary<NSString*, id> *)toJson {
    NSMutableDictionary *dic = [NSMutableDictionary dictionary];
    dic[@"floor"] = self.floor;
    
    NSMutableArray *arr = [NSMutableArray array];
    for (MXMNode *n in self.nodes) {
        NSDictionary *nd = [n toJson];
        [arr addObject:nd];
    }
    dic[@"nodes"] = [arr copy];
    
    return [dic copy];
}

@end
