# react-native-mapxus-sdk.podspec

require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

TargetsToChangeToDynamic = ['YYModel', 'AFNetworking']

$RNMapxus = Object.new

def $RNMapxus.post_install(installer)
  installer.pod_targets.each do |pod|
    if TargetsToChangeToDynamic.include?(pod.name)
      if pod.send(:build_type) != Pod::BuildType.dynamic_framework
        pod.instance_variable_set(:@build_type,Pod::BuildType.dynamic_framework)
        puts "* Changed #{pod.name} to `#{pod.send(:build_type)}`"
        fail "Unable to change build_type" unless mobile_events_target.send(:build_type) == Pod::BuildType.dynamic_framework
      end
    end
  end
end

def $RNMapxus.pre_install(installer)
  installer.aggregate_targets.each do |target|
    target.pod_targets.select { |p| TargetsToChangeToDynamic.include?(p.name) }.each do |mobile_events_target|
      mobile_events_target.instance_variable_set(:@build_type,Pod::BuildType.dynamic_framework)
      puts "* Changed #{mobile_events_target.name} to #{mobile_events_target.send(:build_type)}"
      fail "Unable to change build_type" unless mobile_events_target.send(:build_type) == Pod::BuildType.dynamic_framework
    end
  end
end

Pod::Spec.new do |s|
  s.name         = "react-native-mapxus-sdk"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = <<-DESC
                  react-native-mapxus-sdk
                   DESC
  s.homepage     = "https://github.com/Mapxus/react-native-mapxus-sdk"
  s.license    = { :type => "MIT", :file => "LICENSE" }
  s.authors      = { "Mapxus" => "developer@maphive.io" }
  s.platforms    = { :ios => "9.0" }
  s.source       = { :git => "https://github.com/Mapxus/react-native-mapxus-sdk.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,c,cc,cpp,m,mm,swift}"
  s.requires_arc = true

  s.dependency 'MapxusBaseSDK'
  s.dependency 'MapxusMapSDK'
  s.dependency "MapxusVisualSDK"
  s.dependency 'MapxusComponentKit'
  s.dependency "React"
  s.dependency 'React-Core'

end

