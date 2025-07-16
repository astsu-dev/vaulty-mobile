Pod::Spec.new do |s|
  s.name           = 'ExpoForegroundActions'
  s.version        = '1.0.0'
  s.summary        = 'Expo foreground actions'
  s.description    = 'Expo foreground actions'
  s.license        = 'MIT'
  s.author         = 'astsu'
  s.homepage       = 'homepage'
  s.platform       = :ios, '15.1'
  s.swift_version  = '5.4'
  s.source         = { git: 'https://github.com/astsu-dev/vaulty-mobile' }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'

  # Swift/Objective-C compatibility
  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
    'SWIFT_COMPILATION_MODE' => 'wholemodule'
  }

  s.source_files = "**/*.{h,m,swift}"
end
