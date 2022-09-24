yarn build
RM .\public\build\bundle_old.js
mv .\public\build\bundle.js .\public\build\bundle_old.js -Force
yarn javascript-obfuscator  .\public\build\bundle_old.js --output  .\public\build\bundle.js --config JsObfuscator.js
 yarn sirv public --single --port 8888