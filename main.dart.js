(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b,c){"use strict"
function generateAccessor(b0,b1,b2){var g=b0.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var a0
if(g.length>1)a0=true
else a0=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a1=d&3
var a2=d>>2
var a3=f=f.substring(0,e-1)
var a4=f.indexOf(":")
if(a4>0){a3=f.substring(0,a4)
f=f.substring(a4+1)}if(a1){var a5=a1&2?"r":""
var a6=a1&1?"this":"r"
var a7="return "+a6+"."+f
var a8=b2+".prototype.g"+a3+"="
var a9="function("+a5+"){"+a7+"}"
if(a0)b1.push(a8+"$reflectable("+a9+");\n")
else b1.push(a8+a9+";\n")}if(a2){var a5=a2&2?"r,v":"v"
var a6=a2&1?"this":"r"
var a7=a6+"."+f+"=v"
var a8=b2+".prototype.s"+a3+"="
var a9="function("+a5+"){"+a7+"}"
if(a0)b1.push(a8+"$reflectable("+a9+");\n")
else b1.push(a8+a9+";\n")}}return f}function defineClass(a4,a5){var g=[]
var f="function "+a4+"("
var e="",d=""
for(var a0=0;a0<a5.length;a0++){var a1=a5[a0]
if(a1.charCodeAt(0)==48){a1=a1.substring(1)
var a2=generateAccessor(a1,g,a4)
d+="this."+a2+" = null;\n"}else{var a2=generateAccessor(a1,g,a4)
var a3="p_"+a2
f+=e
e=", "
f+=a3
d+="this."+a2+" = "+a3+";\n"}}if(supportsDirectProtoAccess)d+="this."+"$deferredAction"+"();"
f+=") {\n"+d+"}\n"
f+=a4+".builtin$cls=\""+a4+"\";\n"
f+="$desc=$collectedClasses."+a4+"[1];\n"
f+=a4+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a4+".name=\""+a4+"\";\n"
f+=g.join("")
return f}var z=supportsDirectProtoAccess?function(d,e){var g=d.prototype
g.__proto__=e.prototype
g.constructor=d
g["$is"+d.name]=d
return convertToFastObject(g)}:function(){function tmp(){}return function(a1,a2){tmp.prototype=a2.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a1.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var a0=e[d]
g[a0]=f[a0]}g["$is"+a1.name]=a1
g.constructor=a1
a1.prototype=g
return g}}()
function finishClasses(a5){var g=init.allClasses
a5.combinedConstructorFunction+="return [\n"+a5.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a5.combinedConstructorFunction)(a5.collected)
a5.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var a0=d.name
var a1=a5.collected[a0]
var a2=a1[0]
a1=a1[1]
g[a0]=d
a2[a0]=d}f=null
var a3=init.finishedClasses
function finishClass(c2){if(a3[c2])return
a3[c2]=true
var a6=a5.pending[c2]
if(a6&&a6.indexOf("+")>0){var a7=a6.split("+")
a6=a7[0]
var a8=a7[1]
finishClass(a8)
var a9=g[a8]
var b0=a9.prototype
var b1=g[c2].prototype
var b2=Object.keys(b0)
for(var b3=0;b3<b2.length;b3++){var b4=b2[b3]
if(!u.call(b1,b4))b1[b4]=b0[b4]}}if(!a6||typeof a6!="string"){var b5=g[c2]
var b6=b5.prototype
b6.constructor=b5
b6.$isb=b5
b6.$deferredAction=function(){}
return}finishClass(a6)
var b7=g[a6]
if(!b7)b7=existingIsolateProperties[a6]
var b5=g[c2]
var b6=z(b5,b7)
if(b0)b6.$deferredAction=mixinDeferredActionHelper(b0,b6)
if(Object.prototype.hasOwnProperty.call(b6,"%")){var b8=b6["%"].split(";")
if(b8[0]){var b9=b8[0].split("|")
for(var b3=0;b3<b9.length;b3++){init.interceptorsByTag[b9[b3]]=b5
init.leafTags[b9[b3]]=true}}if(b8[1]){b9=b8[1].split("|")
if(b8[2]){var c0=b8[2].split("|")
for(var b3=0;b3<c0.length;b3++){var c1=g[c0[b3]]
c1.$nativeSuperclassTag=b9[0]}}for(b3=0;b3<b9.length;b3++){init.interceptorsByTag[b9[b3]]=b5
init.leafTags[b9[b3]]=false}}b6.$deferredAction()}if(b6.$isf)b6.$deferredAction()}var a4=Object.keys(a5.pending)
for(var e=0;e<a4.length;e++)finishClass(a4[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var a0=d.charCodeAt(0)
var a1
if(d!=="^"&&d!=="$reflectable"&&a0!==43&&a0!==42&&(a1=g[d])!=null&&a1.constructor===Array&&d!=="<>")addStubs(g,a1,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(d,e){var g
if(e.hasOwnProperty("$deferredAction"))g=e.$deferredAction
return function foo(){if(!supportsDirectProtoAccess)return
var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}d.$deferredAction()
f.$deferredAction()}}function processClassData(b2,b3,b4){b3=convertToSlowObject(b3)
var g
var f=Object.keys(b3)
var e=false
var d=supportsDirectProtoAccess&&b2!="b"
for(var a0=0;a0<f.length;a0++){var a1=f[a0]
var a2=a1.charCodeAt(0)
if(a1==="w"){processStatics(init.statics[b2]=b3.w,b4)
delete b3.w}else if(a2===43){w[g]=a1.substring(1)
var a3=b3[a1]
if(a3>0)b3[g].$reflectable=a3}else if(a2===42){b3[g].$D=b3[a1]
var a4=b3.$methodsWithOptionalArguments
if(!a4)b3.$methodsWithOptionalArguments=a4={}
a4[a1]=g}else{var a5=b3[a1]
if(a1!=="^"&&a5!=null&&a5.constructor===Array&&a1!=="<>")if(d)e=true
else addStubs(b3,a5,a1,false,[])
else g=a1}}if(e)b3.$deferredAction=finishAddStubsHelper
var a6=b3["^"],a7,a8,a9=a6
var b0=a9.split(";")
a9=b0[1]?b0[1].split(","):[]
a8=b0[0]
a7=a8.split(":")
if(a7.length==2){a8=a7[0]
var b1=a7[1]
if(b1)b3.$S=function(b5){return function(){return init.types[b5]}}(b1)}if(a8)b4.pending[b2]=a8
b4.combinedConstructorFunction+=defineClass(b2,a9)
b4.constructorsList.push(b2)
b4.collected[b2]=[m,b3]
i.push(b2)}function processStatics(a4,a5){var g=Object.keys(a4)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a4[e]
var a0=e.charCodeAt(0)
var a1
if(a0===43){v[a1]=e.substring(1)
var a2=a4[e]
if(a2>0)a4[a1].$reflectable=a2
if(d&&d.length)init.typeInformation[a1]=d}else if(a0===42){m[a1].$D=d
var a3=a4.$methodsWithOptionalArguments
if(!a3)a4.$methodsWithOptionalArguments=a3={}
a3[e]=a1}else if(typeof d==="function"){m[a1=e]=d
h.push(e)}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a1=e
processClassData(e,d,a5)}}}function addStubs(b6,b7,b8,b9,c0){var g=0,f=g,e=b7[g],d
if(typeof e=="string")d=b7[++g]
else{d=e
e=b8}if(typeof d=="number"){f=d
d=b7[++g]}b6[b8]=b6[e]=d
var a0=[d]
d.$stubName=b8
c0.push(b8)
for(g++;g<b7.length;g++){d=b7[g]
if(typeof d!="function")break
if(!b9)d.$stubName=b7[++g]
a0.push(d)
if(d.$stubName){b6[d.$stubName]=d
c0.push(d.$stubName)}}for(var a1=0;a1<a0.length;g++,a1++)a0[a1].$callName=b7[g]
var a2=b7[g]
b7=b7.slice(++g)
var a3=b7[0]
var a4=(a3&1)===1
a3=a3>>1
var a5=a3>>1
var a6=(a3&1)===1
var a7=a3===3
var a8=a3===1
var a9=b7[1]
var b0=a9>>1
var b1=(a9&1)===1
var b2=a5+b0
var b3=b7[2]
if(typeof b3=="number")b7[2]=b3+c
if(b>0){var b4=3
for(var a1=0;a1<b0;a1++){if(typeof b7[b4]=="number")b7[b4]=b7[b4]+b
b4++}for(var a1=0;a1<b2;a1++){b7[b4]=b7[b4]+b
b4++}}var b5=2*b0+a5+3
if(a2){d=tearOff(a0,f,b7,b9,b8,a4)
b6[b8].$getter=d
d.$getterStub=true
if(b9)c0.push(a2)
b6[a2]=d
a0.push(d)
d.$stubName=a2
d.$callName=null}}function tearOffGetter(d,e,f,g,a0){return a0?new Function("funcs","applyTrampolineIndex","reflectionInfo","name","H","c","return function tearOff_"+g+y+++"(x) {"+"if (c === null) c = "+"H.dp"+"("+"this, funcs, applyTrampolineIndex, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(d,e,f,g,H,null):new Function("funcs","applyTrampolineIndex","reflectionInfo","name","H","c","return function tearOff_"+g+y+++"() {"+"if (c === null) c = "+"H.dp"+"("+"this, funcs, applyTrampolineIndex, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(d,e,f,g,H,null)}function tearOff(d,e,f,a0,a1,a2){var g
return a0?function(){if(g===void 0)g=H.dp(this,d,e,f,true,[],a1).prototype
return g}:tearOffGetter(d,e,f,a1,a2)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.bA=function(){}
var dart=[["","",,H,{"^":"",ns:{"^":"b;a"}}],["","",,J,{"^":"",
dt:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bT:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.ds==null){H.mc()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.a(P.cf("Return interceptor for "+H.e(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$cX()]
if(v!=null)return v
v=H.mg(a)
if(v!=null)return v
if(typeof a=="function")return C.a6
y=Object.getPrototypeOf(a)
if(y==null)return C.M
if(y===Object.prototype)return C.M
if(typeof w=="function"){Object.defineProperty(w,$.$get$cX(),{value:C.x,enumerable:false,writable:true,configurable:true})
return C.x}return C.x},
f:{"^":"b;",
M:function(a,b){return a===b},
gD:function(a){return H.b1(a)},
k:["dH",function(a){return"Instance of '"+H.br(a)+"'"}],
"%":"ANGLEInstancedArrays|ANGLE_instanced_arrays|AnimationEffectReadOnly|AnimationEffectTiming|AnimationEffectTimingReadOnly|AnimationTimeline|AnimationWorkletGlobalScope|AudioListener|AudioTrack|AudioWorkletGlobalScope|AudioWorkletProcessor|AuthenticatorAssertionResponse|AuthenticatorAttestationResponse|AuthenticatorResponse|BackgroundFetchFetch|BackgroundFetchManager|BackgroundFetchSettledFetch|BarProp|BarcodeDetector|Bluetooth|BluetoothCharacteristicProperties|BluetoothRemoteGATTServer|BluetoothRemoteGATTService|BluetoothUUID|Body|BudgetService|BudgetState|CSS|CSSVariableReferenceValue|Cache|CacheStorage|CanvasGradient|CanvasPattern|Client|Clients|CookieStore|Coordinates|Credential|CredentialUserData|CredentialsContainer|Crypto|CryptoKey|CustomElementRegistry|DOMError|DOMFileSystem|DOMFileSystemSync|DOMImplementation|DOMMatrix|DOMMatrixReadOnly|DOMParser|DOMQuad|DOMStringMap|DataTransfer|DataTransferItem|Database|DeprecatedStorageInfo|DeprecatedStorageQuota|DeprecationReport|DetectedBarcode|DetectedFace|DetectedText|DeviceRotationRate|DirectoryEntry|DirectoryEntrySync|DirectoryReader|DirectoryReaderSync|DocumentOrShadowRoot|DocumentTimeline|EXTBlendMinMax|EXTColorBufferFloat|EXTColorBufferHalfFloat|EXTDisjointTimerQuery|EXTDisjointTimerQueryWebGL2|EXTFragDepth|EXTShaderTextureLOD|EXTTextureFilterAnisotropic|EXT_blend_minmax|EXT_frag_depth|EXT_sRGB|EXT_shader_texture_lod|EXT_texture_filter_anisotropic|EXTsRGB|Entry|EntrySync|External|FaceDetector|FederatedCredential|FileEntry|FileEntrySync|FileReaderSync|FileWriterSync|FontFace|FontFaceSource|FormData|GamepadPose|Geolocation|HTMLAllCollection|HTMLHyperlinkElementUtils|Headers|IDBFactory|IDBIndex|IDBKeyRange|IDBObserver|IDBObserverChanges|IdleDeadline|ImageBitmap|ImageBitmapRenderingContext|ImageCapture|InputDeviceCapabilities|IntersectionObserver|IntersectionObserverEntry|InterventionReport|Iterator|KeyframeEffect|KeyframeEffectReadOnly|MediaCapabilities|MediaCapabilitiesInfo|MediaDeviceInfo|MediaError|MediaKeyStatusMap|MediaKeySystemAccess|MediaKeys|MediaKeysPolicy|MediaMetadata|MediaSession|MediaSettingsRange|MemoryInfo|MessageChannel|Metadata|Mojo|MojoHandle|MojoWatcher|MutationObserver|MutationRecord|NFC|NavigationPreloadManager|Navigator|NavigatorAutomationInformation|NavigatorConcurrentHardware|NavigatorCookies|NavigatorUserMediaError|NodeFilter|NodeIterator|NonDocumentTypeChildNode|NonElementParentNode|NoncedElement|OESElementIndexUint|OESStandardDerivatives|OESTextureFloat|OESTextureFloatLinear|OESTextureHalfFloat|OESTextureHalfFloatLinear|OESVertexArrayObject|OES_element_index_uint|OES_standard_derivatives|OES_texture_float|OES_texture_float_linear|OES_texture_half_float|OES_texture_half_float_linear|OES_vertex_array_object|OffscreenCanvasRenderingContext2D|OverconstrainedError|PagePopupController|PaintRenderingContext2D|PaintSize|PaintWorkletGlobalScope|PasswordCredential|Path2D|PaymentAddress|PaymentManager|PaymentResponse|PerformanceEntry|PerformanceLongTaskTiming|PerformanceMark|PerformanceMeasure|PerformanceNavigation|PerformanceNavigationTiming|PerformanceObserver|PerformanceObserverEntryList|PerformancePaintTiming|PerformanceResourceTiming|PerformanceServerTiming|PerformanceTiming|PeriodicWave|Permissions|PhotoCapabilities|Position|PositionError|Presentation|PresentationReceiver|PublicKeyCredential|PushManager|PushMessageData|PushSubscription|PushSubscriptionOptions|RTCCertificate|RTCIceCandidate|RTCLegacyStatsReport|RTCRtpContributingSource|RTCRtpReceiver|RTCRtpSender|RTCSessionDescription|RTCStatsResponse|Range|RelatedApplication|Report|ReportBody|ReportingObserver|Request|ResizeObserver|ResizeObserverEntry|Response|SQLError|SQLResultSet|SQLTransaction|SVGAnimatedAngle|SVGAnimatedBoolean|SVGAnimatedEnumeration|SVGAnimatedInteger|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedPreserveAspectRatio|SVGAnimatedRect|SVGAnimatedString|SVGAnimatedTransformList|SVGMatrix|SVGPreserveAspectRatio|SVGUnitTypes|Screen|ScrollState|ScrollTimeline|Selection|SharedArrayBuffer|SpeechRecognitionAlternative|SpeechSynthesisVoice|StaticRange|StorageManager|StyleMedia|StylePropertyMap|StylePropertyMapReadonly|SubtleCrypto|SyncManager|TaskAttributionTiming|TextDetector|TextMetrics|TrackDefault|TreeWalker|TrustedHTML|TrustedScriptURL|TrustedURL|URLSearchParams|USBAlternateInterface|USBConfiguration|USBDevice|USBEndpoint|USBInTransferResult|USBInterface|USBIsochronousInTransferPacket|USBIsochronousInTransferResult|USBIsochronousOutTransferPacket|USBIsochronousOutTransferResult|USBOutTransferResult|UnderlyingSourceBase|VRCoordinateSystem|VRDisplayCapabilities|VREyeParameters|VRFrameData|VRFrameOfReference|VRPose|VRStageBounds|VRStageParameters|VTTRegion|ValidityState|VideoPlaybackQuality|VideoTrack|WEBGL_compressed_texture_atc|WEBGL_compressed_texture_etc1|WEBGL_compressed_texture_pvrtc|WEBGL_compressed_texture_s3tc|WEBGL_debug_renderer_info|WEBGL_debug_shaders|WEBGL_depth_texture|WEBGL_draw_buffers|WEBGL_lose_context|WebGL|WebGL2RenderingContext|WebGL2RenderingContextBase|WebGLActiveInfo|WebGLCanvas|WebGLColorBufferFloat|WebGLCompressedTextureASTC|WebGLCompressedTextureATC|WebGLCompressedTextureETC|WebGLCompressedTextureETC1|WebGLCompressedTexturePVRTC|WebGLCompressedTextureS3TC|WebGLCompressedTextureS3TCsRGB|WebGLDebugRendererInfo|WebGLDebugShaders|WebGLDepthTexture|WebGLDrawBuffers|WebGLExtensionLoseContext|WebGLFramebuffer|WebGLGetBufferSubDataAsync|WebGLLoseContext|WebGLProgram|WebGLQuery|WebGLRenderbuffer|WebGLRenderingContext|WebGLSampler|WebGLShader|WebGLShaderPrecisionFormat|WebGLSync|WebGLTexture|WebGLTimerQueryEXT|WebGLTransformFeedback|WebGLUniformLocation|WebGLVertexArrayObject|WebGLVertexArrayObjectOES|WebKitMutationObserver|WindowClient|WorkerLocation|WorkerNavigator|Worklet|WorkletAnimation|WorkletGlobalScope|XMLSerializer|XPathEvaluator|XPathExpression|XPathNSResolver|XPathResult|XSLTProcessor|mozRTCIceCandidate|mozRTCSessionDescription"},
hN:{"^":"f;",
k:function(a){return String(a)},
gD:function(a){return a?519018:218159},
$isaK:1},
dV:{"^":"f;",
M:function(a,b){return null==b},
k:function(a){return"null"},
gD:function(a){return 0},
gL:function(a){return C.ag},
$isN:1},
cY:{"^":"f;",
gD:function(a){return 0},
k:["dJ",function(a){return String(a)}]},
ic:{"^":"cY;"},
bP:{"^":"cY;"},
bo:{"^":"cY;",
k:function(a){var z=a[$.$get$dE()]
if(z==null)return this.dJ(a)
return"JavaScript function for "+H.e(J.bW(z))},
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}}},
bn:{"^":"f;$ti",
l:function(a,b){if(!!a.fixed$length)H.aa(P.h("add"))
a.push(b)},
E:function(a,b){var z
if(!!a.fixed$length)H.aa(P.h("remove"))
for(z=0;z<a.length;++z)if(J.a5(a[z],b)){a.splice(z,1)
return!0}return!1},
cC:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(!b.$1(w))z.push(w)
if(a.length!==y)throw H.a(P.a2(a))}v=z.length
if(v===y)return
this.si(a,v)
for(x=0;x<z.length;++x)a[x]=z[x]},
aI:function(a,b){return new H.aH(a,b,[H.z(a,0)])},
cS:function(a,b,c){return new H.c2(a,b,[H.z(a,0),c])},
eL:function(a,b){var z,y
if(!!a.fixed$length)H.aa(P.h("addAll"))
for(z=b.length,y=0;y<b.length;b.length===z||(0,H.bi)(b),++y)a.push(b[y])},
C:function(a){this.si(a,0)},
q:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.a(P.a2(a))}},
bU:function(a,b,c){return new H.c7(a,b,[H.z(a,0),c])},
fA:function(a,b){var z,y,x
z=a.length
if(z===0)throw H.a(H.hK())
y=a[0]
for(x=1;x<z;++x){y=b.$2(y,a[x])
if(z!==a.length)throw H.a(P.a2(a))}return y},
bQ:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.a(P.a2(a))}return y},
fb:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x))return x
if(a.length!==z)throw H.a(P.a2(a))}return c.$0()},
A:function(a,b){return a[b]},
ah:function(a,b,c){var z=a.length
if(b>z)throw H.a(P.as(b,0,a.length,"start",null))
if(c==null)c=a.length
else if(c<b||c>a.length)throw H.a(P.as(c,b,a.length,"end",null))
if(b===c)return H.d([],[H.z(a,0)])
return H.d(a.slice(b,c),[H.z(a,0)])},
du:function(a,b,c,d,e){var z,y,x
if(!!a.immutable$list)H.aa(P.h("setRange"))
P.e3(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
y=J.Z(d)
if(e+z>y.gi(d))throw H.a(H.hL())
if(e<b)for(x=z-1;x>=0;--x)a[b+x]=y.h(d,e+x)
else for(x=0;x<z;++x)a[b+x]=y.h(d,e+x)},
ax:function(a,b,c,d){return this.du(a,b,c,d,0)},
gdf:function(a){return new H.e4(a,[H.z(a,0)])},
gR:function(a){return a.length===0},
gO:function(a){return a.length!==0},
k:function(a){return P.cU(a,"[","]")},
gJ:function(a){return new J.cF(a,a.length,0)},
gD:function(a){return H.b1(a)},
gi:function(a){return a.length},
si:function(a,b){if(!!a.fixed$length)H.aa(P.h("set length"))
if(b<0)throw H.a(P.as(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.a(H.aL(a,b))
if(b>=a.length||b<0)throw H.a(H.aL(a,b))
return a[b]},
j:function(a,b,c){if(!!a.immutable$list)H.aa(P.h("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.a(H.aL(a,b))
if(b>=a.length||b<0)throw H.a(H.aL(a,b))
a[b]=c},
m:function(a,b){var z,y
z=C.a.m(a.length,b.gi(b))
y=H.d([],[H.z(a,0)])
this.si(y,z)
this.ax(y,0,a.length,a)
this.ax(y,a.length,z,b)
return y},
$iso:1,
$aso:I.bA,
$isk:1,
$isj:1,
$isl:1,
w:{
hM:function(a,b){if(typeof a!=="number"||Math.floor(a)!==a)throw H.a(P.cE(a,"length","is not an integer"))
if(a<0||a>4294967295)throw H.a(P.as(a,0,4294967295,"length",null))
return J.dT(new Array(a),b)},
dT:function(a,b){return J.bG(H.d(a,[b]))},
bG:function(a){a.fixed$length=Array
return a}}},
nr:{"^":"bn;$ti"},
cF:{"^":"b;a,b,c,0d",
gv:function(a){return this.d},
t:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.a(H.bi(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aW:{"^":"f;",
eV:function(a,b){var z
if(typeof b!=="number")throw H.a(H.av(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gb0(b)
if(this.gb0(a)===z)return 0
if(this.gb0(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gb0:function(a){return a===0?1/a<0:a<0},
ag:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.a(P.h(""+a+".toInt()"))},
cX:function(a){var z,y
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){z=a|0
return a===z?z:z-1}y=Math.floor(a)
if(isFinite(y))return y
throw H.a(P.h(""+a+".floor()"))},
a5:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.a(P.h(""+a+".round()"))},
b6:function(a,b){var z
if(b>20)throw H.a(P.as(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gb0(a))return"-"+z
return z},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gD:function(a){return a&0x1FFFFFFF},
aK:function(a){return-a},
m:function(a,b){if(typeof b!=="number")throw H.a(H.av(b))
return a+b},
a1:function(a,b){if(typeof b!=="number")throw H.a(H.av(b))
return a-b},
c6:function(a,b){if(typeof b!=="number")throw H.a(H.av(b))
return a*b},
a7:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
dP:function(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.cF(a,b)},
I:function(a,b){return(a|0)===a?a/b|0:this.cF(a,b)},
cF:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.a(P.h("Result of truncating division is "+H.e(z)+": "+H.e(a)+" ~/ "+H.e(b)))},
eA:function(a,b){return b>31?0:a<<b>>>0},
bA:function(a,b){var z
if(a>0)z=this.eB(a,b)
else{z=b>31?31:b
z=a>>z>>>0}return z},
eB:function(a,b){return b>31?0:a>>>b},
ao:function(a,b){if(typeof b!=="number")throw H.a(H.av(b))
return a<b},
bb:function(a,b){if(typeof b!=="number")throw H.a(H.av(b))
return a>b},
av:function(a,b){if(typeof b!=="number")throw H.a(H.av(b))
return a<=b},
$isD:1,
$isE:1},
cW:{"^":"aW;",
aK:function(a){return-a},
$isA:1},
dU:{"^":"aW;"},
bH:{"^":"f;",
e3:function(a,b){if(b>=a.length)throw H.a(H.aL(a,b))
return a.charCodeAt(b)},
m:function(a,b){if(typeof b!=="string")throw H.a(P.cE(b,null,null))
return a+b},
c9:function(a,b,c){if(c==null)c=a.length
if(b>c)throw H.a(P.d6(b,null,null))
if(c>a.length)throw H.a(P.d6(c,null,null))
return a.substring(b,c)},
dB:function(a,b){return this.c9(a,b,null)},
eY:function(a,b,c){if(c>a.length)throw H.a(P.as(c,0,a.length,null,null))
return H.mq(a,b,c)},
gO:function(a){return a.length!==0},
k:function(a){return a},
gD:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gi:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.a(H.aL(a,b))
if(b>=a.length||b<0)throw H.a(H.aL(a,b))
return a[b]},
$iso:1,
$aso:I.bA,
$isn:1}}],["","",,H,{"^":"",
hK:function(){return new P.b5("No element")},
hL:function(){return new P.b5("Too few elements")},
iM:function(a,b){H.bM(a,0,J.a6(a)-1,b)},
bM:function(a,b,c,d){if(c-b<=32)H.iL(a,b,c,d)
else H.iK(a,b,c,d)},
iL:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.Z(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.ab(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.j(a,w,y.h(a,v))
w=v}y.j(a,w,x)}},
iK:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.a.I(c-b+1,6)
y=b+z
x=c-z
w=C.a.I(b+c,2)
v=w-z
u=w+z
t=J.Z(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.ab(d.$2(s,r),0)){n=r
r=s
s=n}if(J.ab(d.$2(p,o),0)){n=o
o=p
p=n}if(J.ab(d.$2(s,q),0)){n=q
q=s
s=n}if(J.ab(d.$2(r,q),0)){n=q
q=r
r=n}if(J.ab(d.$2(s,p),0)){n=p
p=s
s=n}if(J.ab(d.$2(q,p),0)){n=p
p=q
q=n}if(J.ab(d.$2(r,o),0)){n=o
o=r
r=n}if(J.ab(d.$2(r,q),0)){n=q
q=r
r=n}if(J.ab(d.$2(p,o),0)){n=o
o=p
p=n}t.j(a,y,s)
t.j(a,w,q)
t.j(a,x,o)
t.j(a,v,t.h(a,b))
t.j(a,u,t.h(a,c))
m=b+1
l=c-1
if(J.a5(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.h(a,k)
i=d.$2(j,r)
if(i===0)continue
if(i<0){if(k!==m){t.j(a,k,t.h(a,m))
t.j(a,m,j)}++m}else for(;!0;){i=d.$2(t.h(a,l),r)
if(i>0){--l
continue}else{h=l-1
if(i<0){t.j(a,k,t.h(a,m))
g=m+1
t.j(a,m,t.h(a,l))
t.j(a,l,j)
l=h
m=g
break}else{t.j(a,k,t.h(a,l))
t.j(a,l,j)
l=h
break}}}}f=!0}else{for(k=m;k<=l;++k){j=t.h(a,k)
if(d.$2(j,r)<0){if(k!==m){t.j(a,k,t.h(a,m))
t.j(a,m,j)}++m}else if(d.$2(j,p)>0)for(;!0;)if(d.$2(t.h(a,l),p)>0){--l
if(l<k)break
continue}else{h=l-1
if(d.$2(t.h(a,l),r)<0){t.j(a,k,t.h(a,m))
g=m+1
t.j(a,m,t.h(a,l))
t.j(a,l,j)
m=g}else{t.j(a,k,t.h(a,l))
t.j(a,l,j)}l=h
break}}f=!1}e=m-1
t.j(a,b,t.h(a,e))
t.j(a,e,r)
e=l+1
t.j(a,c,t.h(a,e))
t.j(a,e,p)
H.bM(a,b,m-2,d)
H.bM(a,l+2,c,d)
if(f)return
if(m<y&&l>x){for(;J.a5(d.$2(t.h(a,m),r),0);)++m
for(;J.a5(d.$2(t.h(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.h(a,k)
if(d.$2(j,r)===0){if(k!==m){t.j(a,k,t.h(a,m))
t.j(a,m,j)}++m}else if(d.$2(j,p)===0)for(;!0;)if(d.$2(t.h(a,l),p)===0){--l
if(l<k)break
continue}else{h=l-1
if(d.$2(t.h(a,l),r)<0){t.j(a,k,t.h(a,m))
g=m+1
t.j(a,m,t.h(a,l))
t.j(a,l,j)
m=g}else{t.j(a,k,t.h(a,l))
t.j(a,l,j)}l=h
break}}H.bM(a,m,l,d)}else H.bM(a,m,l,d)},
k:{"^":"j;$ti"},
bK:{"^":"k;$ti",
gJ:function(a){return new H.dX(this,this.gi(this),0)},
q:function(a,b){var z,y
z=this.gi(this)
for(y=0;y<z;++y){b.$1(this.A(0,y))
if(z!==this.gi(this))throw H.a(P.a2(this))}},
gR:function(a){return this.gi(this)===0},
aI:function(a,b){return this.dI(0,b)},
bU:function(a,b,c){return new H.c7(this,b,[H.a4(this,"bK",0),c])},
c1:function(a,b){var z,y
z=H.d([],[H.a4(this,"bK",0)])
C.b.si(z,this.gi(this))
for(y=0;y<this.gi(this);++y)z[y]=this.A(0,y)
return z},
c0:function(a){return this.c1(a,!0)}},
dX:{"^":"b;a,b,c,0d",
gv:function(a){return this.d},
t:function(){var z,y,x,w
z=this.a
y=J.Z(z)
x=y.gi(z)
if(this.b!==x)throw H.a(P.a2(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.A(z,w);++this.c
return!0}},
dZ:{"^":"j;a,b,$ti",
gJ:function(a){return new H.i0(J.S(this.a),this.b)},
gi:function(a){return J.a6(this.a)},
gR:function(a){return J.cD(this.a)},
$asj:function(a,b){return[b]},
w:{
i_:function(a,b,c,d){if(!!J.y(a).$isk)return new H.fZ(a,b,[c,d])
return new H.dZ(a,b,[c,d])}}},
fZ:{"^":"dZ;a,b,$ti",$isk:1,
$ask:function(a,b){return[b]}},
i0:{"^":"cV;0a,b,c",
t:function(){var z=this.b
if(z.t()){this.a=this.c.$1(z.gv(z))
return!0}this.a=null
return!1},
gv:function(a){return this.a}},
c7:{"^":"bK;a,b,$ti",
gi:function(a){return J.a6(this.a)},
A:function(a,b){return this.b.$1(J.f6(this.a,b))},
$ask:function(a,b){return[b]},
$asbK:function(a,b){return[b]},
$asj:function(a,b){return[b]}},
aH:{"^":"j;a,b,$ti",
gJ:function(a){return new H.ch(J.S(this.a),this.b)}},
ch:{"^":"cV;a,b",
t:function(){var z,y
for(z=this.a,y=this.b;z.t();)if(y.$1(z.gv(z)))return!0
return!1},
gv:function(a){var z=this.a
return z.gv(z)}},
c2:{"^":"j;a,b,$ti",
gJ:function(a){return new H.h6(J.S(this.a),this.b,C.T)},
$asj:function(a,b){return[b]}},
h6:{"^":"b;a,b,c,0d",
gv:function(a){return this.d},
t:function(){var z,y,x
z=this.c
if(z==null)return!1
for(y=this.a,x=this.b;!z.t();){this.d=null
if(y.t()){this.c=null
z=J.S(x.$1(y.gv(y)))
this.c=z}else return!1}z=this.c
this.d=z.gv(z)
return!0}},
iS:{"^":"j;a,b,$ti",
gJ:function(a){return new H.iT(J.S(this.a),this.b,!1)}},
iT:{"^":"cV;a,b,c",
t:function(){if(this.c)return!1
var z=this.a
if(!z.t()||!this.b.$1(z.gv(z))){this.c=!0
return!1}return!0},
gv:function(a){var z
if(this.c)return
z=this.a
return z.gv(z)}},
h_:{"^":"b;",
t:function(){return!1},
gv:function(a){return}},
cP:{"^":"j;a,b,$ti",
gJ:function(a){return new H.ha(J.S(this.a),this.b)},
gi:function(a){return J.a6(this.a)+J.a6(this.b)},
gR:function(a){return J.cD(this.a)&&J.cD(this.b)},
gO:function(a){return J.bV(this.a)||J.bV(this.b)},
w:{
cQ:function(a,b,c){if(H.al(b,"$isk",[c],"$ask"))return new H.fY(a,b,[c])
return new H.cP(a,b,[c])}}},
fY:{"^":"cP;a,b,$ti",$isk:1},
ha:{"^":"b;a,b",
t:function(){if(this.a.t())return!0
var z=this.b
if(z!=null){z=J.S(z)
this.a=z
this.b=null
return z.t()}return!1},
gv:function(a){var z=this.a
return z.gv(z)}},
dO:{"^":"b;",
si:function(a,b){throw H.a(P.h("Cannot change the length of a fixed-length list"))},
l:function(a,b){throw H.a(P.h("Cannot add to a fixed-length list"))},
E:function(a,b){throw H.a(P.h("Cannot remove from a fixed-length list"))},
C:function(a){throw H.a(P.h("Cannot clear a fixed-length list"))}},
e4:{"^":"bK;a,$ti",
gi:function(a){return J.a6(this.a)},
A:function(a,b){var z,y
z=this.a
y=J.Z(z)
return y.A(z,y.gi(z)-1-b)}}}],["","",,H,{"^":"",
cv:function(a){var z=init.mangledGlobalNames[a]
if(typeof z==="string")return z
z="minified:"+a
return z},
m6:function(a){return init.types[a]},
eY:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.y(a).$isq},
e:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.bW(a)
if(typeof z!=="string")throw H.a(H.av(a))
return z},
b1:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
br:function(a){return H.ig(a)+H.eM(H.aO(a),0,null)},
ig:function(a){var z,y,x,w,v,u,t,s,r
z=J.y(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
v=w==null
if(v||z===C.a_||!!z.$isbP){u=C.B(a)
if(v)w=u
if(u==="Object"){t=a.constructor
if(typeof t=="function"){s=String(t).match(/^\s*function\s*([\w$]*)\s*\(/)
r=s==null?null:s[1]
if(typeof r==="string"&&/^\w+$/.test(r))w=r}}return w}w=w
return H.cv(w.length>1&&C.m.e3(w,0)===36?C.m.dB(w,1):w)},
b0:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
io:function(a){var z=H.b0(a).getUTCFullYear()+0
return z},
il:function(a){var z=H.b0(a).getUTCMonth()+1
return z},
ih:function(a){var z=H.b0(a).getUTCDate()+0
return z},
ii:function(a){var z=H.b0(a).getUTCHours()+0
return z},
ik:function(a){var z=H.b0(a).getUTCMinutes()+0
return z},
im:function(a){var z=H.b0(a).getUTCSeconds()+0
return z},
ij:function(a){var z=H.b0(a).getUTCMilliseconds()+0
return z},
aL:function(a,b){var z
if(typeof b!=="number"||Math.floor(b)!==b)return new P.ay(!0,b,"index",null)
z=J.a6(a)
if(b<0||b>=z)return P.C(b,a,"index",null,z)
return P.d6(b,"index",null)},
m2:function(a,b,c){if(a>c)return new P.cb(0,c,!0,a,"start","Invalid value")
if(b!=null)if(b<a||b>c)return new P.cb(a,c,!0,b,"end","Invalid value")
return new P.ay(!0,b,"end",null)},
av:function(a){return new P.ay(!0,a,null,null)},
ak:function(a){if(typeof a!=="number")throw H.a(H.av(a))
return a},
a:function(a){var z
if(a==null)a=new P.c9()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.f4})
z.name=""}else z.toString=H.f4
return z},
f4:function(){return J.bW(this.dartException)},
aa:function(a){throw H.a(a)},
bi:function(a){throw H.a(P.a2(a))},
ap:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.ms(a)
if(a==null)return
if(a instanceof H.dM)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.a.bA(x,16)&8191)===10)switch(w){case 438:return z.$1(H.cZ(H.e(y)+" (Error "+w+")",null))
case 445:case 5007:return z.$1(H.e1(H.e(y)+" (Error "+w+")",null))}}if(a instanceof TypeError){v=$.$get$ea()
u=$.$get$eb()
t=$.$get$ec()
s=$.$get$ed()
r=$.$get$eh()
q=$.$get$ei()
p=$.$get$ef()
$.$get$ee()
o=$.$get$ek()
n=$.$get$ej()
m=v.a4(y)
if(m!=null)return z.$1(H.cZ(y,m))
else{m=u.a4(y)
if(m!=null){m.method="call"
return z.$1(H.cZ(y,m))}else{m=t.a4(y)
if(m==null){m=s.a4(y)
if(m==null){m=r.a4(y)
if(m==null){m=q.a4(y)
if(m==null){m=p.a4(y)
if(m==null){m=s.a4(y)
if(m==null){m=o.a4(y)
if(m==null){m=n.a4(y)
l=m!=null}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0
if(l)return z.$1(H.e1(y,m))}}return z.$1(new H.j_(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.e6()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.ay(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.e6()
return a},
ao:function(a){var z
if(a instanceof H.dM)return a.b
if(a==null)return new H.eC(a)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.eC(a)},
m4:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.j(0,a[y],a[x])}return b},
mf:function(a,b,c,d,e,f){switch(b){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw H.a(new P.ko("Unsupported number of arguments for wrapped closure"))},
am:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,H.mf)
a.$identity=z
return z},
fy:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.y(d).$isl){z.$reflectionInfo=d
x=H.iD(z).r}else x=d
w=e?Object.create(new H.iN().constructor.prototype):Object.create(new H.cK(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(e)v=function static_tear_off(){this.$initialize()}
else{u=$.ad
$.ad=u+1
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
if(!e){t=f.length==1&&!0
s=H.dC(a,z,t)
s.$reflectionInfo=d}else{w.$static_name=g
s=z
t=!1}if(typeof x=="number")r=function(h,i){return function(){return h(i)}}(H.m6,x)
else if(typeof x=="function")if(e)r=x
else{q=t?H.dz:H.cL
r=function(h,i){return function(){return h.apply({$receiver:i(this)},arguments)}}(x,q)}else throw H.a("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=s,o=1;o<u;++o){n=b[o]
m=n.$callName
if(m!=null){n=e?n:H.dC(a,n,t)
w[m]=n}if(o===c){n.$reflectionInfo=d
p=n}}w["call*"]=p
w.$R=z.$R
w.$D=z.$D
return v},
fv:function(a,b,c,d){var z=H.cL
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
dC:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.fx(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.fv(y,!w,z,b)
if(y===0){w=$.ad
$.ad=w+1
u="self"+H.e(w)
w="return function(){var "+u+" = this."
v=$.bk
if(v==null){v=H.bY("self")
$.bk=v}return new Function(w+H.e(v)+";return "+u+"."+H.e(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.ad
$.ad=w+1
t+=H.e(w)
w="return function("+t+"){return this."
v=$.bk
if(v==null){v=H.bY("self")
$.bk=v}return new Function(w+H.e(v)+"."+H.e(z)+"("+t+");}")()},
fw:function(a,b,c,d){var z,y
z=H.cL
y=H.dz
switch(b?-1:a){case 0:throw H.a(H.iH("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
fx:function(a,b){var z,y,x,w,v,u,t,s
z=$.bk
if(z==null){z=H.bY("self")
$.bk=z}y=$.dy
if(y==null){y=H.bY("receiver")
$.dy=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.fw(w,!u,x,b)
if(w===1){z="return function(){return this."+H.e(z)+"."+H.e(x)+"(this."+H.e(y)+");"
y=$.ad
$.ad=y+1
return new Function(z+H.e(y)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
z="return function("+s+"){return this."+H.e(z)+"."+H.e(x)+"(this."+H.e(y)+", "+s+");"
y=$.ad
$.ad=y+1
return new Function(z+H.e(y)+"}")()},
dp:function(a,b,c,d,e,f,g){var z,y
z=J.bG(b)
y=!!J.y(d).$isl?J.bG(d):d
return H.fy(a,z,c,y,!!e,f,g)},
mp:function(a,b){var z=J.Z(b)
throw H.a(H.fs(a,z.c9(b,3,z.gi(b))))},
me:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.y(a)[b]
else z=!0
if(z)return a
H.mp(a,b)},
dq:function(a){var z
if("$S" in a){z=a.$S
if(typeof z=="number")return init.types[z]
else return a.$S()}return},
bR:function(a,b){var z
if(a==null)return!1
if(typeof a=="function")return!0
z=H.dq(J.y(a))
if(z==null)return!1
return H.eL(z,null,b,null)},
lT:function(a){var z,y
z=J.y(a)
if(!!z.$isc){y=H.dq(z)
if(y!=null)return H.f2(y)
return"Closure"}return H.br(a)},
mr:function(a){throw H.a(new P.fI(a))},
eW:function(a){return init.getIsolateTag(a)},
J:function(a){return new H.r(a)},
d:function(a,b){a.$ti=b
return a},
aO:function(a){if(a==null)return
return a.$ti},
oB:function(a,b,c){return H.bh(a["$as"+H.e(c)],H.aO(b))},
aN:function(a,b,c,d){var z=H.bh(a["$as"+H.e(c)],H.aO(b))
return z==null?null:z[d]},
a4:function(a,b,c){var z=H.bh(a["$as"+H.e(b)],H.aO(a))
return z==null?null:z[c]},
z:function(a,b){var z=H.aO(a)
return z==null?null:z[b]},
f2:function(a){return H.aJ(a,null)},
aJ:function(a,b){if(a==null)return"dynamic"
if(a===-1)return"void"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return H.cv(a[0].builtin$cls)+H.eM(a,1,b)
if(typeof a=="function")return H.cv(a.builtin$cls)
if(a===-2)return"dynamic"
if(typeof a==="number"){if(b==null||a<0||a>=b.length)return"unexpected-generic-index:"+H.e(a)
return H.e(b[b.length-a-1])}if('func' in a)return H.lJ(a,b)
if('futureOr' in a)return"FutureOr<"+H.aJ("type" in a?a.type:null,b)+">"
return"unknown-reified-type"},
lJ:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
if("bounds" in a){z=a.bounds
if(b==null){b=H.d([],[P.n])
y=null}else y=b.length
x=b.length
for(w=z.length,v=w;v>0;--v)b.push("T"+(x+v))
for(u="<",t="",v=0;v<w;++v,t=", "){u=C.m.m(u+t,b[b.length-v-1])
s=z[v]
if(s!=null&&s!==P.b)u+=" extends "+H.aJ(s,b)}u+=">"}else{u=""
y=null}r=!!a.v?"void":H.aJ(a.ret,b)
if("args" in a){q=a.args
for(p=q.length,o="",n="",m=0;m<p;++m,n=", "){l=q[m]
o=o+n+H.aJ(l,b)}}else{o=""
n=""}if("opt" in a){k=a.opt
o+=n+"["
for(p=k.length,n="",m=0;m<p;++m,n=", "){l=k[m]
o=o+n+H.aJ(l,b)}o+="]"}if("named" in a){j=a.named
o+=n+"{"
for(p=H.m3(j),i=p.length,n="",m=0;m<i;++m,n=", "){h=p[m]
o=o+n+H.aJ(j[h],b)+(" "+H.e(h))}o+="}"}if(y!=null)b.length=y
return u+"("+o+") => "+r},
eM:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.da("")
for(y=b,x="",w=!0,v="";y<a.length;++y,x=", "){z.a=v+x
u=a[y]
if(u!=null)w=!1
v=z.a+=H.aJ(u,c)}return"<"+z.k(0)+">"},
cp:function(a){var z,y,x,w
z=J.y(a)
if(!!z.$isc){y=H.dq(z)
if(y!=null)return y}x=z.constructor
if(a==null)return x
if(typeof a!="object")return x
w=H.aO(a)
if(w!=null){w=w.slice()
w.splice(0,0,x)
x=w}return x},
bh:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
al:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.aO(a)
y=J.y(a)
if(y[b]==null)return!1
return H.eS(H.bh(y[d],z),null,c,null)},
eS:function(a,b,c,d){var z,y
if(c==null)return!0
if(a==null){z=c.length
for(y=0;y<z;++y)if(!H.a9(null,null,c[y],d))return!1
return!0}z=a.length
for(y=0;y<z;++y)if(!H.a9(a[y],b,c[y],d))return!1
return!0},
oz:function(a,b,c){return a.apply(b,H.bh(J.y(b)["$as"+H.e(c)],H.aO(b)))},
a9:function(a,b,c,d){var z,y,x,w,v,u,t,s,r
if(a===c)return!0
if(c==null||c===-1||c.builtin$cls==="b"||c===-2)return!0
if(a===-2)return!0
if(a==null||a===-1||a.builtin$cls==="b"||a===-2){if(typeof c==="number")return!1
if('futureOr' in c)return H.a9(a,b,"type" in c?c.type:null,d)
return!1}if(typeof a==="number")return!1
if(typeof c==="number")return!1
if(a.builtin$cls==="N")return!0
if('func' in c)return H.eL(a,b,c,d)
if('func' in a)return c.builtin$cls==="nk"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
if('futureOr' in c){x="type" in c?c.type:null
if('futureOr' in a)return H.a9("type" in a?a.type:null,b,x,d)
else if(H.a9(a,b,x,d))return!0
else{if(!('$is'+"a1" in y.prototype))return!1
w=y.prototype["$as"+"a1"]
v=H.bh(w,z?a.slice(1):null)
return H.a9(typeof v==="object"&&v!==null&&v.constructor===Array?v[0]:null,b,x,d)}}u=typeof c==="object"&&c!==null&&c.constructor===Array
t=u?c[0]:c
if(t!==y){s=t.builtin$cls
if(!('$is'+s in y.prototype))return!1
r=y.prototype["$as"+s]}else r=null
if(!u)return!0
z=z?a.slice(1):null
u=c.slice(1)
return H.eS(H.bh(r,z),b,u,d)},
eL:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("bounds" in a){if(!("bounds" in c))return!1
z=a.bounds
y=c.bounds
if(z.length!==y.length)return!1}else if("bounds" in c)return!1
if(!H.a9(a.ret,b,c.ret,d))return!1
x=a.args
w=c.args
v=a.opt
u=c.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
for(p=0;p<t;++p)if(!H.a9(w[p],d,x[p],b))return!1
for(o=p,n=0;o<s;++n,++o)if(!H.a9(w[o],d,v[n],b))return!1
for(o=0;o<q;++n,++o)if(!H.a9(u[o],d,v[n],b))return!1
m=a.named
l=c.named
if(l==null)return!0
if(m==null)return!1
return H.mk(m,b,l,d)},
mk:function(a,b,c,d){var z,y,x,w
z=Object.getOwnPropertyNames(c)
for(y=z.length,x=0;x<y;++x){w=z[x]
if(!Object.hasOwnProperty.call(a,w))return!1
if(!H.a9(c[w],d,a[w],b))return!1}return!0},
oA:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
mg:function(a){var z,y,x,w,v,u
z=$.eX.$1(a)
y=$.co[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.cr[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.eR.$2(a,z)
if(z!=null){y=$.co[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.cr[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.cs(x)
$.co[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.cr[z]=x
return x}if(v==="-"){u=H.cs(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.f_(a,x)
if(v==="*")throw H.a(P.cf(z))
if(init.leafTags[z]===true){u=H.cs(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.f_(a,x)},
f_:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.dt(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
cs:function(a){return J.dt(a,!1,null,!!a.$isq)},
mj:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return H.cs(z)
else return J.dt(z,c,null,null)},
mc:function(){if(!0===$.ds)return
$.ds=!0
H.md()},
md:function(){var z,y,x,w,v,u,t,s
$.co=Object.create(null)
$.cr=Object.create(null)
H.m8()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.f1.$1(v)
if(u!=null){t=H.mj(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
m8:function(){var z,y,x,w,v,u,t
z=C.a3()
z=H.bf(C.a0,H.bf(C.a5,H.bf(C.A,H.bf(C.A,H.bf(C.a4,H.bf(C.a1,H.bf(C.a2(C.B),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.eX=new H.m9(v)
$.eR=new H.ma(u)
$.f1=new H.mb(t)},
bf:function(a,b){return a(b)||b},
mq:function(a,b,c){var z=a.indexOf(b,c)
return z>=0},
iC:{"^":"b;a,b,c,d,e,f,r,0x",w:{
iD:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z=J.bG(z)
y=z[0]
x=z[1]
return new H.iC(a,z,(y&2)===2,y>>2,x>>1,(x&1)===1,z[2])}}},
iY:{"^":"b;a,b,c,d,e,f",
a4:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
w:{
ah:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=H.d([],[P.n])
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.iY(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
ce:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
eg:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
i9:{"^":"U;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.e(this.a)
return"NullError: method not found: '"+z+"' on null"},
w:{
e1:function(a,b){return new H.i9(a,b==null?null:b.method)}}},
hO:{"^":"U;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.e(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.e(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.e(this.a)+")"},
w:{
cZ:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.hO(a,y,z?null:b.receiver)}}},
j_:{"^":"U;a",
k:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
dM:{"^":"b;"},
ms:{"^":"c:10;a",
$1:function(a){if(!!J.y(a).$isU)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
eC:{"^":"b;a,0b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z},
$isbu:1},
c:{"^":"b;",
k:function(a){return"Closure '"+H.br(this).trim()+"'"},
gdm:function(){return this},
gdm:function(){return this}},
e9:{"^":"c;"},
iN:{"^":"e9;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+H.cv(z)+"'"}},
cK:{"^":"e9;a,b,c,d",
M:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.cK))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gD:function(a){var z,y
z=this.c
if(z==null)y=H.b1(this.a)
else y=typeof z!=="object"?J.ax(z):H.b1(z)
return(y^H.b1(this.b))>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.e(this.d)+"' of "+("Instance of '"+H.br(z)+"'")},
w:{
cL:function(a){return a.a},
dz:function(a){return a.c},
bY:function(a){var z,y,x,w,v
z=new H.cK("self","target","receiver","name")
y=J.bG(Object.getOwnPropertyNames(z))
for(x=y.length,w=0;w<x;++w){v=y[w]
if(z[v]===a)return v}}}},
fr:{"^":"U;a",
k:function(a){return this.a},
w:{
fs:function(a,b){return new H.fr("CastError: "+H.e(P.cO(a))+": type '"+H.lT(a)+"' is not a subtype of type '"+b+"'")}}},
iG:{"^":"U;a",
k:function(a){return"RuntimeError: "+H.e(this.a)},
w:{
iH:function(a){return new H.iG(a)}}},
r:{"^":"b;a,0b,0c,0d",
gaS:function(){var z=this.b
if(z==null){z=H.f2(this.a)
this.b=z}return z},
k:function(a){return this.gaS()},
gD:function(a){var z=this.d
if(z==null){z=C.m.gD(this.gaS())
this.d=z}return z},
M:function(a,b){if(b==null)return!1
return b instanceof H.r&&this.gaS()===b.gaS()},
$isbO:1},
c6:{"^":"hW;a,0b,0c,0d,0e,0f,r,$ti",
gi:function(a){return this.a},
gR:function(a){return this.a===0},
gO:function(a){return!this.gR(this)},
ga9:function(a){return new H.hQ(this,[H.z(this,0)])},
eZ:function(a,b){var z,y
if(typeof b==="string"){z=this.b
if(z==null)return!1
return this.cp(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return this.cp(y,b)}else return this.fl(b)},
fl:function(a){var z=this.d
if(z==null)return!1
return this.b_(this.aO(z,this.aZ(a)),a)>=0},
h:function(a,b){var z,y,x,w
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.aA(z,b)
x=y==null?null:y.b
return x}else if(typeof b==="number"&&(b&0x3ffffff)===b){w=this.c
if(w==null)return
y=this.aA(w,b)
x=y==null?null:y.b
return x}else return this.fm(b)},
fm:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.aO(z,this.aZ(a))
x=this.b_(y,a)
if(x<0)return
return y[x].b},
j:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.bq()
this.b=z}this.cd(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.bq()
this.c=y}this.cd(y,b,c)}else this.fo(b,c)},
fo:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.bq()
this.d=z}y=this.aZ(a)
x=this.aO(z,y)
if(x==null)this.bz(z,y,[this.br(a,b)])
else{w=this.b_(x,a)
if(w>=0)x[w].b=b
else x.push(this.br(a,b))}},
b3:function(a,b,c){var z
if(this.eZ(0,b))return this.h(0,b)
z=c.$0()
this.j(0,b,z)
return z},
E:function(a,b){if(typeof b==="string")return this.cB(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cB(this.c,b)
else return this.fn(b)},
fn:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.aO(z,this.aZ(a))
x=this.b_(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.cG(w)
return w.b},
C:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.bp()}},
q:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.a(P.a2(this))
z=z.c}},
cd:function(a,b,c){var z=this.aA(a,b)
if(z==null)this.bz(a,b,this.br(b,c))
else z.b=c},
cB:function(a,b){var z
if(a==null)return
z=this.aA(a,b)
if(z==null)return
this.cG(z)
this.cr(a,b)
return z.b},
bp:function(){this.r=this.r+1&67108863},
br:function(a,b){var z,y
z=new H.hP(a,b)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.bp()
return z},
cG:function(a){var z,y
z=a.d
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.bp()},
aZ:function(a){return J.ax(a)&0x3ffffff},
b_:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a5(a[y].a,b))return y
return-1},
k:function(a){return P.dY(this)},
aA:function(a,b){return a[b]},
aO:function(a,b){return a[b]},
bz:function(a,b,c){a[b]=c},
cr:function(a,b){delete a[b]},
cp:function(a,b){return this.aA(a,b)!=null},
bq:function(){var z=Object.create(null)
this.bz(z,"<non-identifier-key>",z)
this.cr(z,"<non-identifier-key>")
return z}},
hP:{"^":"b;a,b,0c,0d"},
hQ:{"^":"k;a,$ti",
gi:function(a){return this.a.a},
gR:function(a){return this.a.a===0},
gJ:function(a){var z,y
z=this.a
y=new H.hR(z,z.r)
y.c=z.e
return y}},
hR:{"^":"b;a,b,0c,0d",
gv:function(a){return this.d},
t:function(){var z=this.a
if(this.b!==z.r)throw H.a(P.a2(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
m9:{"^":"c:10;a",
$1:function(a){return this.a(a)}},
ma:{"^":"c:14;a",
$2:function(a,b){return this.a(a,b)}},
mb:{"^":"c;a",
$1:function(a){return this.a(a)}}}],["","",,H,{"^":"",
m3:function(a){return J.dT(a?Object.keys(a):[],null)}}],["","",,H,{"^":"",
ml:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",
dk:function(a){var z,y,x
if(!!J.y(a).$iso)return a
z=a.length
y=new Array(z)
y.fixed$length=Array
for(x=0;x<z;++x)y[x]=a[x]
return y},
i6:function(a){return new Int8Array(H.dk(a))},
aj:function(a,b,c){if(a>>>0!==a||a>=c)throw H.a(H.aL(b,a))},
lG:function(a,b,c){var z
if(!(a>>>0!==a))if(b==null)z=a>c
else z=b>>>0!==b||a>b||b>c
else z=!0
if(z)throw H.a(H.m2(a,b,c))
if(b==null)return c
return b},
e_:{"^":"f;",$ise_:1,$isfo:1,"%":"ArrayBuffer"},
d5:{"^":"f;",$isd5:1,"%":"DataView;ArrayBufferView;d4|ew|ex|e0|ey|ez|aD"},
d4:{"^":"d5;",
gi:function(a){return a.length},
$iso:1,
$aso:I.bA,
$isq:1,
$asq:I.bA},
e0:{"^":"ex;",
h:function(a,b){H.aj(b,a,a.length)
return a[b]},
j:function(a,b,c){H.aj(b,a,a.length)
a[b]=c},
$isk:1,
$ask:function(){return[P.D]},
$asm:function(){return[P.D]},
$isj:1,
$asj:function(){return[P.D]},
$isl:1,
$asl:function(){return[P.D]},
"%":"Float64Array"},
aD:{"^":"ez;",
j:function(a,b,c){H.aj(b,a,a.length)
a[b]=c},
$isk:1,
$ask:function(){return[P.A]},
$asm:function(){return[P.A]},
$isj:1,
$asj:function(){return[P.A]},
$isl:1,
$asl:function(){return[P.A]}},
i5:{"^":"e0;","%":"Float32Array"},
nI:{"^":"aD;",
h:function(a,b){H.aj(b,a,a.length)
return a[b]},
"%":"Int16Array"},
nJ:{"^":"aD;",
h:function(a,b){H.aj(b,a,a.length)
return a[b]},
"%":"Int32Array"},
nK:{"^":"aD;",
h:function(a,b){H.aj(b,a,a.length)
return a[b]},
"%":"Int8Array"},
nL:{"^":"aD;",
h:function(a,b){H.aj(b,a,a.length)
return a[b]},
"%":"Uint16Array"},
i7:{"^":"aD;",
h:function(a,b){H.aj(b,a,a.length)
return a[b]},
"%":"Uint32Array"},
nM:{"^":"aD;",
gi:function(a){return a.length},
h:function(a,b){H.aj(b,a,a.length)
return a[b]},
"%":"CanvasPixelArray|Uint8ClampedArray"},
i8:{"^":"aD;",
gi:function(a){return a.length},
h:function(a,b){H.aj(b,a,a.length)
return a[b]},
ah:function(a,b,c){return new Uint8Array(a.subarray(b,H.lG(b,c,a.length)))},
dA:function(a,b){return this.ah(a,b,null)},
"%":";Uint8Array"},
ew:{"^":"d4+m;"},
ex:{"^":"ew+dO;"},
ey:{"^":"d4+m;"},
ez:{"^":"ey+dO;"}}],["","",,P,{"^":"",
jX:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.lU()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.am(new P.jZ(z),1)).observe(y,{childList:true})
return new P.jY(z,y,x)}else if(self.setImmediate!=null)return P.lV()
return P.lW()},
on:[function(a){self.scheduleImmediate(H.am(new P.k_(a),0))},"$1","lU",4,0,11],
oo:[function(a){self.setImmediate(H.am(new P.k0(a),0))},"$1","lV",4,0,11],
op:[function(a){P.dc(C.W,a)},"$1","lW",4,0,11],
dc:function(a,b){var z=C.a.I(a.a,1000)
return P.lm(z<0?0:z,b)},
cR:function(a,b,c){var z
if(a==null)a=new P.c9()
z=$.p
if(z!==C.e)z.toString
z=new P.R(0,z,[c])
z.cg(a,b)
return z},
hg:function(a,b,c){var z=new P.R(0,$.p,[c])
P.iX(a,new P.hh(z,b))
return z},
cS:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
s=[P.l,d]
r=[s]
y=new P.R(0,$.p,r)
z.a=null
z.b=0
z.c=null
z.d=null
x=new P.hj(z,b,!1,y)
try{for(q=a.length,p=0,o=0;p<a.length;a.length===q||(0,H.bi)(a),++p){w=a[p]
v=o
w.c_(new P.hi(z,v,y,b,!1,d),x,null)
o=++z.b}if(o===0){r=new P.R(0,$.p,r)
r.cf(C.a7)
return r}r=new Array(o)
r.fixed$length=Array
z.a=H.d(r,[d])}catch(n){u=H.ap(n)
t=H.ao(n)
if(z.b===0||!1)return P.cR(u,t,s)
else{z.c=u
z.d=t}}return y},
lI:function(a,b,c){$.p.toString
a.Y(b,c)},
lP:function(a,b){if(H.bR(a,{func:1,args:[P.b,P.bu]}))return b.d9(a)
if(H.bR(a,{func:1,args:[P.b]}))return a
throw H.a(P.cE(a,"onError","Error handler must accept one Object or one Object and a StackTrace as arguments, and return a a valid result"))},
lN:function(){var z,y
for(;z=$.be,z!=null;){$.by=null
y=z.b
$.be=y
if(y==null)$.bx=null
z.a.$0()}},
oy:[function(){$.dm=!0
try{P.lN()}finally{$.by=null
$.dm=!1
if($.be!=null)$.$get$dh().$1(P.eU())}},"$0","eU",0,0,4],
eP:function(a){var z=new P.eo(a)
if($.be==null){$.bx=z
$.be=z
if(!$.dm)$.$get$dh().$1(P.eU())}else{$.bx.b=z
$.bx=z}},
lS:function(a){var z,y,x
z=$.be
if(z==null){P.eP(a)
$.by=$.bx
return}y=new P.eo(a)
x=$.by
if(x==null){y.b=z
$.by=y
$.be=y}else{y.b=x.b
x.b=y
$.by=y
if(y.b==null)$.bx=y}},
f3:function(a){var z=$.p
if(C.e===z){P.aI(null,null,C.e,a)
return}z.toString
P.aI(null,null,z,z.bC(a))},
e7:function(a,b,c,d,e,f){return e?new P.lh(0,b,c,d,a,[f]):new P.k1(0,b,c,d,a,[f])},
cn:function(a){return},
lO:[function(a,b){var z=$.p
z.toString
P.bQ(null,null,z,a,b)},function(a){return P.lO(a,null)},"$2","$1","lX",4,2,8],
ox:[function(){},"$0","eT",0,0,4],
iX:function(a,b){var z=$.p
if(z===C.e){z.toString
return P.dc(a,b)}return P.dc(a,z.bC(b))},
bQ:function(a,b,c,d,e){var z={}
z.a=d
P.lS(new P.lQ(z,e))},
eN:function(a,b,c,d){var z,y
y=$.p
if(y===c)return d.$0()
$.p=c
z=y
try{y=d.$0()
return y}finally{$.p=z}},
eO:function(a,b,c,d,e){var z,y
y=$.p
if(y===c)return d.$1(e)
$.p=c
z=y
try{y=d.$1(e)
return y}finally{$.p=z}},
lR:function(a,b,c,d,e,f){var z,y
y=$.p
if(y===c)return d.$2(e,f)
$.p=c
z=y
try{y=d.$2(e,f)
return y}finally{$.p=z}},
aI:function(a,b,c,d){var z=C.e!==c
if(z)d=!(!z||!1)?c.bC(d):c.eP(d)
P.eP(d)},
jZ:{"^":"c:6;a",
$1:function(a){var z,y
z=this.a
y=z.a
z.a=null
y.$0()}},
jY:{"^":"c;a,b,c",
$1:function(a){var z,y
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
k_:{"^":"c;a",
$0:function(){this.a.$0()}},
k0:{"^":"c;a",
$0:function(){this.a.$0()}},
ll:{"^":"b;a,0b,c",
dT:function(a,b){if(self.setTimeout!=null)this.b=self.setTimeout(H.am(new P.ln(this,b),0),a)
else throw H.a(P.h("`setTimeout()` not found."))},
w:{
lm:function(a,b){var z=new P.ll(!0,0)
z.dT(a,b)
return z}}},
ln:{"^":"c;a,b",
$0:function(){var z=this.a
z.b=null
z.c=1
this.b.$0()}},
k8:{"^":"ci;a,$ti"},
ka:{"^":"eq;dx,0dy,0fr,x,0a,0b,0c,d,e,0f,0r",
bs:function(){},
bt:function(){}},
k9:{"^":"b;aj:c<,$ti",
gay:function(a){return new P.k8(this,this.$ti)},
gep:function(){return this.c<4},
cD:function(a,b,c,d){var z,y,x
if((this.c&4)!==0){if(c==null)c=P.eT()
z=new P.kk($.p,0,c)
z.ex()
return z}z=$.p
y=new P.ka(0,this,z,d?1:0)
y.cc(a,b,c,d)
y.fr=y
y.dy=y
y.dx=this.c&1
x=this.e
this.e=y
y.dy=null
y.fr=x
if(x==null)this.d=y
else x.dy=y
if(this.d===y)P.cn(this.a)
return y},
cz:function(a){},
cA:function(a){},
dW:function(){if((this.c&4)!==0)return new P.b5("Cannot add new events after calling close")
return new P.b5("Cannot add new events while doing an addStream")},
l:function(a,b){if(!this.gep())throw H.a(this.dW())
this.ai(b)},
$isd9:1},
en:{"^":"k9;a,b,c,0d,0e,0f,0r,$ti",
ai:function(a){var z
for(z=this.d;z!=null;z=z.dy)z.bg(new P.cj(a))}},
a1:{"^":"b;$ti"},
hh:{"^":"c;a,b",
$0:function(){var z,y,x,w
try{x=this.b.$0()
this.a.aN(x)}catch(w){z=H.ap(w)
y=H.ao(w)
P.lI(this.a,z,y)}}},
hj:{"^":"c:7;a,b,c,d",
$2:function(a,b){var z,y
z=this.a
y=--z.b
if(z.a!=null){z.a=null
if(z.b===0||this.c)this.d.Y(a,b)
else{z.c=a
z.d=b}}else if(y===0&&!this.c)this.d.Y(z.c,z.d)}},
hi:{"^":"c;a,b,c,d,e,f",
$1:function(a){var z,y,x
z=this.a
y=--z.b
x=z.a
if(x!=null){x[this.b]=a
if(y===0)this.c.cm(x)}else if(z.b===0&&!this.e)this.c.Y(z.c,z.d)},
$S:function(){return{func:1,ret:P.N,args:[this.f]}}},
ep:{"^":"b;$ti",
eW:[function(a,b){if(a==null)a=new P.c9()
if(this.a.a!==0)throw H.a(P.cc("Future already completed"))
$.p.toString
this.Y(a,b)},function(a){return this.eW(a,null)},"bH","$2","$1","gcL",4,2,8]},
dg:{"^":"ep;a,$ti",
as:function(a,b){var z=this.a
if(z.a!==0)throw H.a(P.cc("Future already completed"))
z.cf(b)},
Y:function(a,b){this.a.cg(a,b)}},
eF:{"^":"ep;a,$ti",
as:function(a,b){var z=this.a
if(z.a!==0)throw H.a(P.cc("Future already completed"))
z.aN(b)},
Y:function(a,b){this.a.Y(a,b)}},
kr:{"^":"b;0a,b,c,d,e",
fp:function(a){if(this.c!==6)return!0
return this.b.b.bZ(this.d,a.a)},
fg:function(a){var z,y
z=this.e
y=this.b.b
if(H.bR(z,{func:1,args:[P.b,P.bu]}))return y.fG(z,a.a,a.b)
else return y.bZ(z,a.a)}},
R:{"^":"b;aj:a<,b,0ew:c<,$ti",
c_:function(a,b,c){var z=$.p
if(z!==C.e){z.toString
if(b!=null)b=P.lP(b,z)}return this.eH(a,b,c)},
a_:function(a,b){return this.c_(a,null,b)},
eH:function(a,b,c){var z=new P.R(0,$.p,[c])
this.ce(new P.kr(z,b==null?1:3,a,b))
return z},
ce:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){z=this.c
y=z.a
if(y<4){z.ce(a)
return}this.a=y
this.c=z.c}z=this.b
z.toString
P.aI(null,null,z,new P.ks(this,a))}},
cv:function(a){var z,y,x,w,v,u
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;v=w.a,v!=null;w=v);w.a=x}}else{if(y===2){y=this.c
u=y.a
if(u<4){y.cv(a)
return}this.a=u
this.c=y.c}z.a=this.aR(a)
y=this.b
y.toString
P.aI(null,null,y,new P.kz(z,this))}},
aQ:function(){var z=this.c
this.c=null
return this.aR(z)},
aR:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.a
z.a=y}return y},
aN:function(a){var z,y
z=this.$ti
if(H.al(a,"$isa1",z,"$asa1"))if(H.al(a,"$isR",z,null))P.ck(a,this)
else P.es(a,this)
else{y=this.aQ()
this.a=4
this.c=a
P.bd(this,y)}},
cm:function(a){var z=this.aQ()
this.a=4
this.c=a
P.bd(this,z)},
Y:[function(a,b){var z=this.aQ()
this.a=8
this.c=new P.bX(a,b)
P.bd(this,z)},function(a){return this.Y(a,null)},"fP","$2","$1","ge6",4,2,8],
cf:function(a){var z
if(H.al(a,"$isa1",this.$ti,"$asa1")){this.e1(a)
return}this.a=1
z=this.b
z.toString
P.aI(null,null,z,new P.ku(this,a))},
e1:function(a){var z
if(H.al(a,"$isR",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.aI(null,null,z,new P.ky(this,a))}else P.ck(a,this)
return}P.es(a,this)},
cg:function(a,b){var z
this.a=1
z=this.b
z.toString
P.aI(null,null,z,new P.kt(this,a,b))},
$isa1:1,
w:{
es:function(a,b){var z,y,x
b.a=1
try{a.c_(new P.kv(b),new P.kw(b),null)}catch(x){z=H.ap(x)
y=H.ao(x)
P.f3(new P.kx(b,z,y))}},
ck:function(a,b){var z,y
for(;z=a.a,z===2;)a=a.c
if(z>=4){y=b.aQ()
b.a=a.a
b.c=a.c
P.bd(b,y)}else{y=b.c
b.a=2
b.c=a
a.cv(y)}},
bd:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=v.a
v=v.b
y.toString
P.bQ(null,null,y,u,v)}return}for(;t=b.a,t!=null;b=t){b.a=null
P.bd(z.a,b)}y=z.a
s=y.c
x.a=w
x.b=s
v=!w
if(v){u=b.c
u=(u&1)!==0||u===8}else u=!0
if(u){u=b.b
r=u.b
if(w){q=y.b
q.toString
q=q==null?r==null:q===r
if(!q)r.toString
else q=!0
q=!q}else q=!1
if(q){y=y.b
v=s.a
u=s.b
y.toString
P.bQ(null,null,y,v,u)
return}p=$.p
if(p==null?r!=null:p!==r)$.p=r
else p=null
y=b.c
if(y===8)new P.kC(z,x,b,w).$0()
else if(v){if((y&1)!==0)new P.kB(x,b,s).$0()}else if((y&2)!==0)new P.kA(z,x,b).$0()
if(p!=null)$.p=p
y=x.b
if(!!J.y(y).$isa1){if(y.a>=4){o=u.c
u.c=null
b=u.aR(o)
u.a=y.a
u.c=y.c
z.a=y
continue}else P.ck(y,u)
return}}n=b.b
o=n.c
n.c=null
b=n.aR(o)
y=x.a
v=x.b
if(!y){n.a=4
n.c=v}else{n.a=8
n.c=v}z.a=n
y=n}}}},
ks:{"^":"c;a,b",
$0:function(){P.bd(this.a,this.b)}},
kz:{"^":"c;a,b",
$0:function(){P.bd(this.b,this.a.a)}},
kv:{"^":"c:6;a",
$1:function(a){var z=this.a
z.a=0
z.aN(a)}},
kw:{"^":"c:33;a",
$2:function(a,b){this.a.Y(a,b)},
$1:function(a){return this.$2(a,null)}},
kx:{"^":"c;a,b,c",
$0:function(){this.a.Y(this.b,this.c)}},
ku:{"^":"c;a,b",
$0:function(){this.a.cm(this.b)}},
ky:{"^":"c;a,b",
$0:function(){P.ck(this.b,this.a)}},
kt:{"^":"c;a,b,c",
$0:function(){this.a.Y(this.b,this.c)}},
kC:{"^":"c;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{w=this.c
z=w.b.b.dg(w.d)}catch(v){y=H.ap(v)
x=H.ao(v)
if(this.d){w=this.a.a.c.a
u=y
u=w==null?u==null:w===u
w=u}else w=!1
u=this.b
if(w)u.b=this.a.a.c
else u.b=new P.bX(y,x)
u.a=!0
return}if(!!J.y(z).$isa1){if(z instanceof P.R&&z.gaj()>=4){if(z.gaj()===8){w=this.b
w.b=z.gew()
w.a=!0}return}t=this.a.a
w=this.b
w.b=z.a_(new P.kD(t),null)
w.a=!1}}},
kD:{"^":"c:21;a",
$1:function(a){return this.a}},
kB:{"^":"c;a,b,c",
$0:function(){var z,y,x,w
try{x=this.b
this.a.b=x.b.b.bZ(x.d,this.c)}catch(w){z=H.ap(w)
y=H.ao(w)
x=this.a
x.b=new P.bX(z,y)
x.a=!0}}},
kA:{"^":"c;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.fp(z)&&w.e!=null){v=this.b
v.b=w.fg(z)
v.a=!1}}catch(u){y=H.ap(u)
x=H.ao(u)
w=this.a.a.c
v=w.a
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w
else s.b=new P.bX(y,x)
s.a=!0}}},
eo:{"^":"b;a,0b"},
d8:{"^":"b;$ti",
gi:function(a){var z,y
z={}
y=new P.R(0,$.p,[P.A])
z.a=0
this.bT(new P.iQ(z,this),!0,new P.iR(z,y),y.ge6())
return y}},
iQ:{"^":"c;a,b",
$1:function(a){++this.a.a},
$S:function(){return{func:1,ret:P.N,args:[H.a4(this.b,"d8",0)]}}},
iR:{"^":"c;a,b",
$0:function(){this.b.aN(this.a.a)}},
iP:{"^":"b;"},
d9:{"^":"b;$ti"},
eD:{"^":"b;aj:b<,$ti",
gay:function(a){return new P.ci(this,this.$ti)},
geq:function(){if((this.b&8)===0)return this.a
return this.a.gb8()},
e9:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.eE(0)
this.a=z}return z}y=this.a
y.gb8()
return y.gb8()},
gcE:function(){if((this.b&8)!==0)return this.a.gb8()
return this.a},
e_:function(){if((this.b&4)!==0)return new P.b5("Cannot add event after closing")
return new P.b5("Cannot add event while adding a stream")},
l:function(a,b){var z=this.b
if(z>=4)throw H.a(this.e_())
if((z&1)!==0)this.ai(b)
else if((z&3)===0)this.e9().l(0,new P.cj(b))},
cD:function(a,b,c,d){var z,y,x,w
if((this.b&3)!==0)throw H.a(P.cc("Stream has already been listened to."))
z=$.p
y=new P.eq(this,z,d?1:0)
y.cc(a,b,c,d)
x=this.geq()
z=this.b|=1
if((z&8)!==0){w=this.a
w.sb8(y)
w.fE(0)}else this.a=y
y.ez(x)
y.ee(new P.la(this))
return y},
cz:function(a){if((this.b&8)!==0)C.z.hf(this.a)
P.cn(this.e)},
cA:function(a){if((this.b&8)!==0)C.z.fE(this.a)
P.cn(this.f)},
$isd9:1},
la:{"^":"c;a",
$0:function(){P.cn(this.a.d)}},
li:{"^":"b;",
ai:function(a){this.gcE().dZ(0,a)}},
k2:{"^":"b;",
ai:function(a){this.gcE().bg(new P.cj(a))}},
k1:{"^":"eD+k2;0a,b,0c,d,e,f,r,$ti"},
lh:{"^":"eD+li;0a,b,0c,d,e,f,r,$ti"},
ci:{"^":"lb;a,$ti",
gD:function(a){return(H.b1(this.a)^892482866)>>>0},
M:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.ci))return!1
return b.a===this.a}},
eq:{"^":"kb;x,0a,0b,0c,d,e,0f,0r",
bs:function(){this.x.cz(this)},
bt:function(){this.x.cA(this)}},
kb:{"^":"b;aj:e<",
cc:function(a,b,c,d){var z,y
z=this.d
z.toString
this.a=a
y=b==null?P.lX():b
if(H.bR(y,{func:1,ret:-1,args:[P.b,P.bu]}))this.b=z.d9(y)
else if(H.bR(y,{func:1,ret:-1,args:[P.b]}))this.b=y
else H.aa(P.aP("handleError callback must take either an Object (the error), or both an Object (the error) and a StackTrace."))
this.c=c==null?P.eT():c},
ez:function(a){if(a==null)return
this.r=a
if(a.c!=null){this.e=(this.e|64)>>>0
a.bc(this)}},
dZ:function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.ai(b)
else this.bg(new P.cj(b))},
bs:function(){},
bt:function(){},
bg:function(a){var z,y
z=this.r
if(z==null){z=new P.eE(0)
this.r=z}z.l(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.bc(this)}},
ai:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.di(this.a,a)
this.e=(this.e&4294967263)>>>0
this.ci((z&4)!==0)},
ee:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.ci((z&4)!==0)},
ci:function(a){var z,y,x
z=this.e
if((z&64)!==0&&this.r.c==null){z=(z&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){y=this.r
y=y==null||y.c==null}else y=!1
else y=!1
if(y){z=(z&4294967291)>>>0
this.e=z}}for(;!0;a=x){if((z&8)!==0){this.r=null
return}x=(z&4)!==0
if(a===x)break
this.e=(z^32)>>>0
if(x)this.bs()
else this.bt()
z=(this.e&4294967263)>>>0
this.e=z}if((z&64)!==0&&z<128)this.r.bc(this)}},
lb:{"^":"d8;",
bT:function(a,b,c,d){return this.a.cD(a,d,c,!0===b)},
bS:function(a){return this.bT(a,null,null,null)}},
kf:{"^":"b;0d5:a*"},
cj:{"^":"kf;B:b>,0a",
fv:function(a){a.ai(this.b)}},
kW:{"^":"b;aj:a<",
bc:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.f3(new P.kX(this,a))
this.a=1}},
kX:{"^":"c;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gd5(x)
z.b=w
if(w==null)z.c=null
x.fv(this.b)}},
eE:{"^":"kW;0b,0c,a",
l:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sd5(0,b)
this.c=b}},
C:function(a){if(this.a===1)this.a=3
this.c=null
this.b=null}},
kk:{"^":"b;a,aj:b<,c",
ex:function(){if((this.b&2)!==0)return
var z=this.a
z.toString
P.aI(null,null,z,this.gey())
this.b=(this.b|2)>>>0},
h0:[function(){var z=(this.b&4294967293)>>>0
this.b=z
if(z>=4)return
this.b=(z|1)>>>0
this.a.dh(this.c)},"$0","gey",0,0,4]},
bX:{"^":"b;a,b",
k:function(a){return H.e(this.a)},
$isU:1},
lv:{"^":"b;"},
lQ:{"^":"c;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.c9()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.a(z)
x=H.a(z)
x.stack=y.k(0)
throw x}},
l0:{"^":"lv;",
dh:function(a){var z,y,x
try{if(C.e===$.p){a.$0()
return}P.eN(null,null,this,a)}catch(x){z=H.ap(x)
y=H.ao(x)
P.bQ(null,null,this,z,y)}},
fJ:function(a,b){var z,y,x
try{if(C.e===$.p){a.$1(b)
return}P.eO(null,null,this,a,b)}catch(x){z=H.ap(x)
y=H.ao(x)
P.bQ(null,null,this,z,y)}},
di:function(a,b){return this.fJ(a,b,null)},
eQ:function(a){return new P.l2(this,a)},
eP:function(a){return this.eQ(a,null)},
bC:function(a){return new P.l1(this,a)},
eR:function(a,b){return new P.l3(this,a,b)},
h:function(a,b){return},
fF:function(a){if($.p===C.e)return a.$0()
return P.eN(null,null,this,a)},
dg:function(a){return this.fF(a,null)},
fI:function(a,b){if($.p===C.e)return a.$1(b)
return P.eO(null,null,this,a,b)},
bZ:function(a,b){return this.fI(a,b,null,null)},
fH:function(a,b,c){if($.p===C.e)return a.$2(b,c)
return P.lR(null,null,this,a,b,c)},
fG:function(a,b,c){return this.fH(a,b,c,null,null,null)},
fB:function(a){return a},
d9:function(a){return this.fB(a,null,null,null)}},
l2:{"^":"c;a,b",
$0:function(){return this.a.dg(this.b)}},
l1:{"^":"c;a,b",
$0:function(){return this.a.dh(this.b)}},
l3:{"^":"c;a,b,c",
$1:function(a){return this.a.di(this.b,a)},
$S:function(){return{func:1,ret:-1,args:[this.c]}}}}],["","",,P,{"^":"",
hS:function(a,b,c,d,e){return new H.c6(0,0,[d,e])},
d0:function(a,b,c){return H.m4(a,new H.c6(0,0,[b,c]))},
L:function(a,b){return new H.c6(0,0,[a,b])},
hT:function(){return new H.c6(0,0,[null,null])},
dW:function(a,b,c,d){return new P.kL(0,0,[d])},
dS:function(a,b,c){var z,y
if(P.dn(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bz()
y.push(a)
try{P.lK(a,z)}finally{y.pop()}y=P.e8(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
cU:function(a,b,c){var z,y,x
if(P.dn(a))return b+"..."+c
z=new P.da(b)
y=$.$get$bz()
y.push(a)
try{x=z
x.a=P.e8(x.gap(),a,", ")}finally{y.pop()}y=z
y.a=y.gap()+c
y=z.gap()
return y.charCodeAt(0)==0?y:y},
dn:function(a){var z,y
for(z=0;y=$.$get$bz(),z<y.length;++z)if(a===y[z])return!0
return!1},
lK:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=J.S(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.t())return
w=H.e(z.gv(z))
b.push(w)
y+=w.length+2;++x}if(!z.t()){if(x<=5)return
v=b.pop()
u=b.pop()}else{t=z.gv(z);++x
if(!z.t()){if(x<=4){b.push(H.e(t))
return}v=H.e(t)
u=b.pop()
y+=v.length+2}else{s=z.gv(z);++x
for(;z.t();t=s,s=r){r=z.gv(z);++x
if(x>100){while(!0){if(!(y>75&&x>3))break
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.e(t)
v=H.e(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
hU:function(a,b){var z,y
z=P.dW(null,null,null,b)
for(y=0;y<5;++y)z.l(0,a[y])
return z},
dY:function(a){var z,y,x
z={}
if(P.dn(a))return"{...}"
y=new P.da("")
try{$.$get$bz().push(a)
x=y
x.a=x.gap()+"{"
z.a=!0
J.ac(a,new P.hY(z,y))
z=y
z.a=z.gap()+"}"}finally{$.$get$bz().pop()}z=y.gap()
return z.charCodeAt(0)==0?z:z},
nx:[function(a){return a},"$1","lZ",4,0,10],
hX:function(a,b,c,d){var z,y
for(z=0;z<2;++z){y=b[z]
a.j(0,P.lZ().$1(y),d.$1(y))}},
kL:{"^":"kE;a,0b,0c,0d,0e,0f,r,$ti",
gJ:function(a){return P.ev(this,this.r)},
gi:function(a){return this.a},
gR:function(a){return this.a===0},
gO:function(a){return this.a!==0},
eX:function(a,b){var z
if(typeof b==="number"&&(b&0x3ffffff)===b){z=this.c
if(z==null)return!1
return z[b]!=null}else return this.e7(b)},
e7:function(a){var z=this.d
if(z==null)return!1
return this.bn(this.cs(z,a),a)>=0},
l:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.di()
this.b=z}return this.cj(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.di()
this.c=y}return this.cj(y,b)}else return this.e4(0,b)},
e4:function(a,b){var z,y,x
z=this.d
if(z==null){z=P.di()
this.d=z}y=this.cn(b)
x=z[y]
if(x==null)z[y]=[this.bj(b)]
else{if(this.bn(x,b)>=0)return!1
x.push(this.bj(b))}return!0},
E:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.ck(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.ck(this.c,b)
else return this.e5(0,b)},
e5:function(a,b){var z,y,x
z=this.d
if(z==null)return!1
y=this.cs(z,b)
x=this.bn(y,b)
if(x<0)return!1
this.cl(y.splice(x,1)[0])
return!0},
C:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.bi()}},
cj:function(a,b){if(a[b]!=null)return!1
a[b]=this.bj(b)
return!0},
ck:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.cl(z)
delete a[b]
return!0},
bi:function(){this.r=this.r+1&67108863},
bj:function(a){var z,y
z=new P.kM(a)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.bi()
return z},
cl:function(a){var z,y
z=a.c
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.bi()},
cn:function(a){return J.ax(a)&0x3ffffff},
cs:function(a,b){return a[this.cn(b)]},
bn:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a5(a[y].a,b))return y
return-1},
w:{
di:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
kM:{"^":"b;a,0b,0c"},
kN:{"^":"b;a,b,0c,0d",
gv:function(a){return this.d},
t:function(){var z=this.a
if(this.b!==z.r)throw H.a(P.a2(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}},
w:{
ev:function(a,b){var z=new P.kN(a,b)
z.c=a.e
return z}}},
kE:{"^":"iI;"},
c5:{"^":"b;$ti",
q:function(a,b){var z
for(z=this.gJ(this);z.t();)b.$1(z.gv(z))},
gi:function(a){var z,y
z=this.gJ(this)
for(y=0;z.t();)++y
return y},
gR:function(a){return!this.gJ(this).t()},
gO:function(a){return!this.gR(this)},
k:function(a){return P.dS(this,"(",")")}},
m:{"^":"b;$ti",
gJ:function(a){return new H.dX(a,this.gi(a),0)},
A:function(a,b){return this.h(a,b)},
q:function(a,b){var z,y
z=this.gi(a)
for(y=0;y<z;++y){b.$1(this.h(a,y))
if(z!==this.gi(a))throw H.a(P.a2(a))}},
gR:function(a){return this.gi(a)===0},
gO:function(a){return this.gi(a)!==0},
bQ:function(a,b,c){var z,y,x
z=this.gi(a)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.h(a,x))
if(z!==this.gi(a))throw H.a(P.a2(a))}return y},
l:function(a,b){var z=this.gi(a)
this.si(a,z+1)
this.j(a,z,b)},
E:function(a,b){var z
for(z=0;z<this.gi(a);++z)if(J.a5(this.h(a,z),b)){this.e2(a,z,z+1)
return!0}return!1},
e2:function(a,b,c){var z,y,x
z=this.gi(a)
y=c-b
for(x=c;x<z;++x)this.j(a,x-y,this.h(a,x))
this.si(a,z-y)},
C:function(a){this.si(a,0)},
m:function(a,b){var z=H.d([],[H.aN(this,a,"m",0)])
C.b.si(z,C.a.m(this.gi(a),b.gi(b)))
C.b.ax(z,0,this.gi(a),a)
C.b.ax(z,this.gi(a),z.length,b)
return z},
f9:function(a,b,c,d){var z
P.e3(b,c,this.gi(a),null,null,null)
for(z=b;z<c;++z)this.j(a,z,d)},
gdf:function(a){return new H.e4(a,[H.aN(this,a,"m",0)])},
k:function(a){return P.cU(a,"[","]")}},
hW:{"^":"O;"},
hY:{"^":"c:7;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.e(a)
z.a=y+": "
z.a+=H.e(b)}},
O:{"^":"b;$ti",
q:function(a,b){var z,y
for(z=J.S(this.ga9(a));z.t();){y=z.gv(z)
b.$2(y,this.h(a,y))}},
gf4:function(a){return J.fc(this.ga9(a),new P.hZ(a),[P.d2,H.aN(this,a,"O",0),H.aN(this,a,"O",1)])},
gi:function(a){return J.a6(this.ga9(a))},
gO:function(a){return J.bV(this.ga9(a))},
k:function(a){return P.dY(a)},
$isP:1},
hZ:{"^":"c;a",
$1:function(a){var z,y
z=this.a
y=J.Z(z)
return new P.d2(a,y.h(z,a),[H.aN(y,z,"O",0),H.aN(y,z,"O",1)])},
$S:function(){var z,y,x
z=this.a
y=J.y(z)
x=H.aN(y,z,"O",0)
return{func:1,ret:[P.d2,x,H.aN(y,z,"O",1)],args:[x]}}},
iJ:{"^":"b;$ti",
gR:function(a){return this.a===0},
gO:function(a){return this.a!==0},
C:function(a){this.fC(this.c0(0))},
fC:function(a){var z,y
for(z=a.length,y=0;y<a.length;a.length===z||(0,H.bi)(a),++y)this.E(0,a[y])},
c1:function(a,b){var z,y,x,w
z=H.d([],this.$ti)
C.b.si(z,this.a)
for(y=P.ev(this,this.r),x=0;y.t();x=w){w=x+1
z[x]=y.d}return z},
c0:function(a){return this.c1(a,!0)},
k:function(a){return P.cU(this,"{","}")},
$isk:1,
$isj:1},
iI:{"^":"iJ;"}}],["","",,P,{"^":"",
h5:function(a){if(a instanceof H.c)return a.k(0)
return"Instance of '"+H.br(a)+"'"},
bp:function(a,b,c,d){var z,y,x
z=J.hM(a,d)
if(a!==0&&!0)for(y=z.length,x=0;x<y;++x)z[x]=b
return z},
d1:function(a,b,c){var z,y
z=H.d([],[c])
for(y=J.S(a);y.t();)z.push(y.gv(y))
return z},
cO:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.bW(a)
if(typeof a==="string")return JSON.stringify(a)
return P.h5(a)},
hV:function(a,b,c,d){var z,y,x
z=new Array(a)
z.fixed$length=Array
y=H.d(z,[d])
for(x=0;x<a;++x)y[x]=b.$1(x)
return y},
f0:function(a){H.ml(H.e(a))},
aK:{"^":"b;"},
"+bool":0,
c_:{"^":"b;a,b",
l:function(a,b){return P.fJ(C.a.m(this.a,b.ghb()),!0)},
gd4:function(){return this.a},
M:function(a,b){if(b==null)return!1
if(!(b instanceof P.c_))return!1
return this.a===b.a&&!0},
gD:function(a){var z=this.a
return(z^C.a.bA(z,30))&1073741823},
k:function(a){var z,y,x,w,v,u,t,s
z=P.fK(H.io(this))
y=P.bE(H.il(this))
x=P.bE(H.ih(this))
w=P.bE(H.ii(this))
v=P.bE(H.ik(this))
u=P.bE(H.im(this))
t=P.fL(H.ij(this))
s=z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t+"Z"
return s},
w:{
fJ:function(a,b){var z,y
z=new P.c_(a,!0)
if(Math.abs(a)<=864e13)y=!1
else y=!0
if(y)H.aa(P.aP("DateTime is outside valid range: "+z.gd4()))
return z},
fK:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+z
if(z>=10)return y+"00"+z
return y+"000"+z},
fL:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bE:function(a){if(a>=10)return""+a
return"0"+a}}},
D:{"^":"E;"},
"+double":0,
aB:{"^":"b;a",
m:function(a,b){return new P.aB(this.a+b.a)},
a1:function(a,b){return new P.aB(this.a-b.a)},
c6:function(a,b){return new P.aB(C.a.a5(this.a*b))},
ao:function(a,b){return this.a<b.a},
bb:function(a,b){return C.a.bb(this.a,b.gfR())},
av:function(a,b){return this.a<=b.a},
M:function(a,b){if(b==null)return!1
if(!(b instanceof P.aB))return!1
return this.a===b.a},
gD:function(a){return this.a&0x1FFFFFFF},
k:function(a){var z,y,x,w,v
z=new P.fX()
y=this.a
if(y<0)return"-"+new P.aB(0-y).k(0)
x=z.$1(C.a.I(y,6e7)%60)
w=z.$1(C.a.I(y,1e6)%60)
v=new P.fW().$1(y%1e6)
return""+C.a.I(y,36e8)+":"+H.e(x)+":"+H.e(w)+"."+H.e(v)},
aK:function(a){return new P.aB(0-this.a)}},
fW:{"^":"c;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
fX:{"^":"c;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
U:{"^":"b;"},
c9:{"^":"U;",
k:function(a){return"Throw of null."}},
ay:{"^":"U;a,b,c,d",
gbm:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gbl:function(){return""},
k:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.e(z)
w=this.gbm()+y+x
if(!this.a)return w
v=this.gbl()
u=P.cO(this.b)
return w+v+": "+H.e(u)},
w:{
aP:function(a){return new P.ay(!1,null,null,a)},
cE:function(a,b,c){return new P.ay(!0,a,b,c)}}},
cb:{"^":"ay;e,f,a,b,c,d",
gbm:function(){return"RangeError"},
gbl:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.e(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.e(z)
else if(x>z)y=": Not in range "+H.e(z)+".."+H.e(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.e(z)}return y},
w:{
d6:function(a,b,c){return new P.cb(null,null,!0,a,b,"Value not in range")},
as:function(a,b,c,d,e){return new P.cb(b,c,!0,a,d,"Invalid value")},
e3:function(a,b,c,d,e,f){if(0>a||a>c)throw H.a(P.as(a,0,c,"start",f))
if(a>b||b>c)throw H.a(P.as(b,a,c,"end",f))
return b}}},
hJ:{"^":"ay;e,i:f>,a,b,c,d",
gbm:function(){return"RangeError"},
gbl:function(){if(J.cw(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.e(z)},
w:{
C:function(a,b,c,d,e){var z=e!=null?e:J.a6(b)
return new P.hJ(b,z,!0,a,c,"Index out of range")}}},
j0:{"^":"U;a",
k:function(a){return"Unsupported operation: "+this.a},
w:{
h:function(a){return new P.j0(a)}}},
iZ:{"^":"U;a",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"},
w:{
cf:function(a){return new P.iZ(a)}}},
b5:{"^":"U;a",
k:function(a){return"Bad state: "+this.a},
w:{
cc:function(a){return new P.b5(a)}}},
fB:{"^":"U;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.e(P.cO(z))+"."},
w:{
a2:function(a){return new P.fB(a)}}},
e6:{"^":"b;",
k:function(a){return"Stack Overflow"},
$isU:1},
fI:{"^":"U;a",
k:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+z+"' during its initialization"}},
ko:{"^":"b;a",
k:function(a){return"Exception: "+this.a}},
A:{"^":"E;"},
"+int":0,
j:{"^":"b;$ti",
fc:function(a,b){var z=H.a4(this,"j",0)
if(H.al(this,"$isk",[z],"$ask"))return H.cQ(this,b,z)
return new H.cP(this,b,[z])},
bU:function(a,b,c){return H.i_(this,b,H.a4(this,"j",0),c)},
aI:["dI",function(a,b){return new H.aH(this,b,[H.a4(this,"j",0)])}],
cS:function(a,b,c){return new H.c2(this,b,[H.a4(this,"j",0),c])},
q:function(a,b){var z
for(z=this.gJ(this);z.t();)b.$1(z.gv(z))},
gi:function(a){var z,y
z=this.gJ(this)
for(y=0;z.t();)++y
return y},
gR:function(a){return!this.gJ(this).t()},
gO:function(a){return!this.gR(this)},
A:function(a,b){var z,y,x
if(b<0)H.aa(P.as(b,0,null,"index",null))
for(z=this.gJ(this),y=0;z.t();){x=z.gv(z)
if(b===y)return x;++y}throw H.a(P.C(b,this,"index",null,y))},
k:function(a){return P.dS(this,"(",")")}},
cV:{"^":"b;"},
l:{"^":"b;$ti",$isk:1,$isj:1},
"+List":0,
P:{"^":"b;$ti"},
d2:{"^":"b;a,B:b>,$ti",
k:function(a){return"MapEntry("+H.e(this.a)+": "+H.e(this.b)+")"}},
N:{"^":"b;",
gD:function(a){return P.b.prototype.gD.call(this,this)},
k:function(a){return"null"}},
"+Null":0,
E:{"^":"b;"},
"+num":0,
b:{"^":";",
M:function(a,b){return this===b},
gD:function(a){return H.b1(this)},
k:function(a){return"Instance of '"+H.br(this)+"'"},
gL:function(a){return new H.r(H.cp(this))},
toString:function(){return this.k(this)}},
bu:{"^":"b;"},
n:{"^":"b;"},
"+String":0,
da:{"^":"b;ap:a<",
gi:function(a){return this.a.length},
C:function(a){this.a=""},
k:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
gO:function(a){return this.a.length!==0},
w:{
e8:function(a,b,c){var z=J.S(b)
if(!z.t())return a
if(c.length===0){do a+=H.e(z.gv(z))
while(z.t())}else{a+=H.e(z.gv(z))
for(;z.t();)a=a+c+H.e(z.gv(z))}return a}}},
bO:{"^":"b;"}}],["","",,W,{"^":"",
mm:function(a,b){var z,y
z=new P.R(0,$.p,[b])
y=new P.dg(z,[b])
a.then(H.am(new W.mn(y),1),H.am(new W.mo(y),1))
return z},
dP:function(a,b,c){return W.hH(a,null,null,b,null,null,null,c).a_(new W.hG(),P.n)},
hH:function(a,b,c,d,e,f,g,h){var z,y,x,w
z=W.cT
y=new P.R(0,$.p,[z])
x=new P.dg(y,[z])
w=new XMLHttpRequest()
C.Z.fu(w,"GET",a,!0)
if(f!=null)w.responseType=f
W.Y(w,"load",new W.hI(w,x),!1)
W.Y(w,"error",x.gcL(),!1)
w.send()
return y},
jd:function(a,b){return new WebSocket(a)},
cl:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
eu:function(a,b,c,d){var z,y
z=W.cl(W.cl(W.cl(W.cl(0,a),b),c),d)
y=536870911&z+((67108863&z)<<3)
y^=y>>>11
return 536870911&y+((16383&y)<<15)},
eK:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.ke(a)
if(!!J.y(z).$isF)return z
return}else return a},
eQ:function(a,b){var z=$.p
if(z===C.e)return a
return z.eR(a,b)},
mn:{"^":"c:3;a",
$1:function(a){return this.a.as(0,a)}},
mo:{"^":"c:3;a",
$1:function(a){return this.a.bH(a)}},
V:{"^":"c1;","%":"HTMLAudioElement|HTMLBRElement|HTMLBaseElement|HTMLBodyElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLEmbedElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLFrameSetElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLIFrameElement|HTMLImageElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMediaElement|HTMLMenuElement|HTMLMetaElement|HTMLModElement|HTMLOListElement|HTMLObjectElement|HTMLOptGroupElement|HTMLParagraphElement|HTMLPictureElement|HTMLPreElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSlotElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTimeElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|HTMLVideoElement;HTMLElement"},
mt:{"^":"d7;0n:x=,0p:y=","%":"Accelerometer|LinearAccelerationSensor"},
mu:{"^":"f;0i:length=",
E:function(a,b){return a.remove(b)},
"%":"AccessibleNodeList"},
mv:{"^":"V;",
k:function(a){return String(a)},
"%":"HTMLAnchorElement"},
mx:{"^":"V;",
k:function(a){return String(a)},
"%":"HTMLAreaElement"},
cH:{"^":"a7;",$iscH:1,"%":"BeforeUnloadEvent"},
cJ:{"^":"f;",$iscJ:1,"%":";Blob"},
mC:{"^":"f;0B:value=","%":"BluetoothRemoteGATTDescriptor"},
mD:{"^":"V;0B:value=","%":"HTMLButtonElement"},
cM:{"^":"V;",
dq:function(a,b,c){return a.getContext(b)},
dn:function(a,b){return this.dq(a,b,null)},
$iscM:1,
"%":"HTMLCanvasElement"},
fq:{"^":"f;",
fa:function(a,b,c,d,e){a.fillText(b,c,d)},
a3:function(a,b,c,d){return this.fa(a,b,c,d,null)},
"%":"CanvasRenderingContext2D"},
mE:{"^":"H;0i:length=","%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
fu:{"^":"a7;",$isfu:1,"%":"CloseEvent"},
mF:{"^":"bD;0B:value=","%":"CSSKeywordValue"},
fF:{"^":"bD;",
l:function(a,b){return a.add(b)},
"%":";CSSNumericValue"},
mG:{"^":"bZ;0i:length=","%":"CSSPerspective"},
mH:{"^":"bD;0n:x=,0p:y=","%":"CSSPositionValue"},
mI:{"^":"bZ;0bB:angle},0n:x=,0p:y=","%":"CSSRotation"},
aT:{"^":"f;",$isaT:1,"%":"CSSCharsetRule|CSSConditionRule|CSSFontFaceRule|CSSGroupingRule|CSSImportRule|CSSKeyframeRule|CSSKeyframesRule|CSSMediaRule|CSSNamespaceRule|CSSPageRule|CSSRule|CSSStyleRule|CSSSupportsRule|CSSViewportRule|MozCSSKeyframeRule|MozCSSKeyframesRule|WebKitCSSKeyframeRule|WebKitCSSKeyframesRule"},
mJ:{"^":"bZ;0n:x=,0p:y=","%":"CSSScale"},
mK:{"^":"kc;0i:length=",
c5:function(a,b){var z=a.getPropertyValue(this.e0(a,b))
return z==null?"":z},
e0:function(a,b){var z,y
z=$.$get$dD()
y=z[b]
if(typeof y==="string")return y
y=this.eF(a,b)
z[b]=y
return y},
eF:function(a,b){var z
if(b.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,function(c,d){return d.toUpperCase()}) in a)return b
z=P.fR()+b
if(z in a)return z
return b},
gbD:function(a){return a.bottom},
gbG:function(a){return a.clear},
gaf:function(a){return a.height},
gal:function(a){return a.left},
gbY:function(a){return a.right},
gaH:function(a){return a.top},
ga6:function(a){return a.width},
C:function(a){return this.gbG(a).$0()},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
fG:{"^":"b;",
gbG:function(a){return this.c5(a,"clear")},
gal:function(a){return this.c5(a,"left")},
C:function(a){return this.gbG(a).$0()}},
bD:{"^":"f;","%":"CSSImageValue|CSSResourceValue|CSSURLImageValue;CSSStyleValue"},
bZ:{"^":"f;","%":"CSSMatrixComponent|CSSSkew;CSSTransformComponent"},
mL:{"^":"bD;0i:length=","%":"CSSTransformValue"},
mM:{"^":"bZ;0n:x=,0p:y=","%":"CSSTranslation"},
mN:{"^":"fF;0B:value=","%":"CSSUnitValue"},
mO:{"^":"bD;0i:length=","%":"CSSUnparsedValue"},
mQ:{"^":"V;0B:value=","%":"HTMLDataElement"},
mR:{"^":"f;0i:length=",
cH:function(a,b,c){return a.add(b,c)},
l:function(a,b){return a.add(b)},
C:function(a){return a.clear()},
E:function(a,b){return a.remove(b)},
h:function(a,b){return a[b]},
"%":"DataTransferItemList"},
mS:{"^":"f;0n:x=,0p:y=","%":"DeviceAcceleration"},
mT:{"^":"f;",
k:function(a){return String(a)},
"%":"DOMException"},
mU:{"^":"fU;",
gn:function(a){return a.x},
gp:function(a){return a.y},
"%":"DOMPoint"},
fU:{"^":"f;",
gn:function(a){return a.x},
gp:function(a){return a.y},
"%":";DOMPointReadOnly"},
mV:{"^":"kh;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.C(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.h("Cannot resize immutable List."))},
A:function(a,b){return a[b]},
$iso:1,
$aso:function(){return[[P.Q,P.E]]},
$isk:1,
$ask:function(){return[[P.Q,P.E]]},
$isq:1,
$asq:function(){return[[P.Q,P.E]]},
$asm:function(){return[[P.Q,P.E]]},
$isj:1,
$asj:function(){return[[P.Q,P.E]]},
$isl:1,
$asl:function(){return[[P.Q,P.E]]},
"%":"ClientRectList|DOMRectList"},
fV:{"^":"f;",
k:function(a){return"Rectangle ("+H.e(a.left)+", "+H.e(a.top)+") "+H.e(this.ga6(a))+" x "+H.e(this.gaf(a))},
M:function(a,b){var z
if(b==null)return!1
if(!H.al(b,"$isQ",[P.E],"$asQ"))return!1
z=J.an(b)
return a.left===z.gal(b)&&a.top===z.gaH(b)&&this.ga6(a)===z.ga6(b)&&this.gaf(a)===z.gaf(b)},
gD:function(a){return W.eu(a.left&0x1FFFFFFF,a.top&0x1FFFFFFF,this.ga6(a)&0x1FFFFFFF,this.gaf(a)&0x1FFFFFFF)},
gbD:function(a){return a.bottom},
gaf:function(a){return a.height},
gal:function(a){return a.left},
gbY:function(a){return a.right},
gaH:function(a){return a.top},
ga6:function(a){return a.width},
gn:function(a){return a.x},
gp:function(a){return a.y},
$isQ:1,
$asQ:function(){return[P.E]},
"%":";DOMRectReadOnly"},
mW:{"^":"kj;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.C(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.h("Cannot resize immutable List."))},
A:function(a,b){return a[b]},
$iso:1,
$aso:function(){return[P.n]},
$isk:1,
$ask:function(){return[P.n]},
$isq:1,
$asq:function(){return[P.n]},
$asm:function(){return[P.n]},
$isj:1,
$asj:function(){return[P.n]},
$isl:1,
$asl:function(){return[P.n]},
"%":"DOMStringList"},
mX:{"^":"f;0i:length=,0B:value=",
l:function(a,b){return a.add(b)},
E:function(a,b){return a.remove(b)},
"%":"DOMTokenList"},
c1:{"^":"H;",
k:function(a){return a.localName},
gd7:function(a){return new W.er(a,"click",!1,[W.d3])},
$isc1:1,
"%":";Element"},
a7:{"^":"f;",$isa7:1,"%":"AbortPaymentEvent|AnimationEvent|AnimationPlaybackEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|BackgroundFetchClickEvent|BackgroundFetchEvent|BackgroundFetchFailEvent|BackgroundFetchedEvent|BeforeInstallPromptEvent|BlobEvent|CanMakePaymentEvent|ClipboardEvent|CustomEvent|DeviceMotionEvent|DeviceOrientationEvent|ErrorEvent|ExtendableEvent|ExtendableMessageEvent|FetchEvent|FontFaceSetLoadEvent|ForeignFetchEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamTrackEvent|MojoInterfaceRequestEvent|MutationEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PaymentRequestEvent|PaymentRequestUpdateEvent|PopStateEvent|PresentationConnectionAvailableEvent|PresentationConnectionCloseEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCPeerConnectionIceEvent|RTCTrackEvent|SecurityPolicyViolationEvent|SensorErrorEvent|SpeechRecognitionError|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|SyncEvent|TrackEvent|TransitionEvent|USBConnectionEvent|VRDeviceEvent|VRDisplayEvent|VRSessionEvent|WebGLContextEvent|WebKitTransitionEvent;Event|InputEvent"},
F:{"^":"f;",
cI:["dE",function(a,b,c,d){if(c!=null)this.dX(a,b,c,!1)}],
dX:function(a,b,c,d){return a.addEventListener(b,H.am(c,1),!1)},
$isF:1,
"%":"AccessibleNode|Animation|ApplicationCache|BackgroundFetchRegistration|BatteryManager|BluetoothDevice|BluetoothRemoteGATTCharacteristic|BroadcastChannel|CanvasCaptureMediaStreamTrack|Clipboard|DOMApplicationCache|DataChannel|DedicatedWorkerGlobalScope|EventSource|IDBDatabase|IDBOpenDBRequest|IDBRequest|IDBTransaction|IDBVersionChangeRequest|MIDIAccess|MIDIInput|MIDIOutput|MIDIPort|MediaDevices|MediaKeySession|MediaQueryList|MediaSource|MediaStream|MediaStreamTrack|MojoInterfaceInterceptor|NetworkInformation|Notification|OfflineResourceList|OffscreenCanvas|PaymentRequest|Performance|PermissionStatus|PresentationConnection|PresentationConnectionList|PresentationRequest|RTCDTMFSender|RTCDataChannel|RTCPeerConnection|RemotePlayback|ScreenOrientation|ServiceWorker|ServiceWorkerContainer|ServiceWorkerGlobalScope|ServiceWorkerRegistration|SharedWorker|SharedWorkerGlobalScope|SpeechRecognition|SpeechSynthesis|SpeechSynthesisUtterance|USB|VR|VRDevice|VRDisplay|VRSession|VisualViewport|WebSocket|Worker|WorkerGlobalScope|WorkerPerformance|mozRTCPeerConnection|webkitRTCPeerConnection;EventTarget;eA|eB|eH|eI"},
aC:{"^":"cJ;",$isaC:1,"%":"File"},
dN:{"^":"kq;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.C(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.h("Cannot resize immutable List."))},
A:function(a,b){return a[b]},
$iso:1,
$aso:function(){return[W.aC]},
$isk:1,
$ask:function(){return[W.aC]},
$isq:1,
$asq:function(){return[W.aC]},
$asm:function(){return[W.aC]},
$isj:1,
$asj:function(){return[W.aC]},
$isl:1,
$asl:function(){return[W.aC]},
$isdN:1,
"%":"FileList"},
h8:{"^":"F;",
gfD:function(a){var z,y
z=a.result
if(!!J.y(z).$isfo){y=new Uint8Array(z,0)
return y}return z},
"%":"FileReader"},
nf:{"^":"F;0i:length=","%":"FileWriter"},
nh:{"^":"F;",
l:function(a,b){return a.add(b)},
C:function(a){return a.clear()},
"%":"FontFaceSet"},
nj:{"^":"V;0i:length=","%":"HTMLFormElement"},
aV:{"^":"f;",$isaV:1,"%":"Gamepad"},
nl:{"^":"f;0B:value=","%":"GamepadButton"},
nm:{"^":"d7;0n:x=,0p:y=","%":"Gyroscope"},
nn:{"^":"f;0i:length=","%":"History"},
no:{"^":"kG;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.C(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.h("Cannot resize immutable List."))},
A:function(a,b){return a[b]},
$iso:1,
$aso:function(){return[W.H]},
$isk:1,
$ask:function(){return[W.H]},
$isq:1,
$asq:function(){return[W.H]},
$asm:function(){return[W.H]},
$isj:1,
$asj:function(){return[W.H]},
$isl:1,
$asl:function(){return[W.H]},
"%":"HTMLCollection|HTMLFormControlsCollection|HTMLOptionsCollection"},
cT:{"^":"hF;",
he:function(a,b,c,d,e,f){return a.open(b,c)},
fu:function(a,b,c,d){return a.open(b,c,d)},
$iscT:1,
"%":"XMLHttpRequest"},
hG:{"^":"c;",
$1:function(a){return a.responseText}},
hI:{"^":"c;a,b",
$1:function(a){var z,y,x,w,v
z=this.a
y=z.status
x=y>=200&&y<300
w=y>307&&y<400
y=x||y===0||y===304||w
v=this.b
if(y)v.as(0,z)
else v.bH(a)}},
hF:{"^":"F;","%":"XMLHttpRequestUpload;XMLHttpRequestEventTarget"},
dR:{"^":"f;",$isdR:1,"%":"ImageData"},
nq:{"^":"V;0B:value=","%":"HTMLInputElement"},
d_:{"^":"el;",$isd_:1,"%":"KeyboardEvent"},
nt:{"^":"V;0B:value=","%":"HTMLLIElement"},
nv:{"^":"f;",
k:function(a){return String(a)},
"%":"Location"},
nw:{"^":"d7;0n:x=,0p:y=","%":"Magnetometer"},
nz:{"^":"f;0i:length=","%":"MediaList"},
nA:{"^":"F;0ay:stream=","%":"MediaRecorder"},
nC:{"^":"a7;0ay:stream=","%":"MediaStreamEvent"},
i2:{"^":"a7;",$isi2:1,"%":"MessageEvent"},
nD:{"^":"F;",
cI:function(a,b,c,d){if(b==="message")a.start()
this.dE(a,b,c,!1)},
"%":"MessagePort"},
nE:{"^":"V;0B:value=","%":"HTMLMeterElement"},
nF:{"^":"kO;",
h:function(a,b){return P.aw(a.get(b))},
q:function(a,b){var z,y
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.aw(y.value[1]))}},
ga9:function(a){var z=H.d([],[P.n])
this.q(a,new W.i3(z))
return z},
gi:function(a){return a.size},
gO:function(a){return a.size!==0},
j:function(a,b,c){throw H.a(P.h("Not supported"))},
E:function(a,b){throw H.a(P.h("Not supported"))},
C:function(a){throw H.a(P.h("Not supported"))},
$asO:function(){return[P.n,null]},
$isP:1,
$asP:function(){return[P.n,null]},
"%":"MIDIInputMap"},
i3:{"^":"c:5;a",
$2:function(a,b){return this.a.push(a)}},
nG:{"^":"kP;",
h:function(a,b){return P.aw(a.get(b))},
q:function(a,b){var z,y
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.aw(y.value[1]))}},
ga9:function(a){var z=H.d([],[P.n])
this.q(a,new W.i4(z))
return z},
gi:function(a){return a.size},
gO:function(a){return a.size!==0},
j:function(a,b,c){throw H.a(P.h("Not supported"))},
E:function(a,b){throw H.a(P.h("Not supported"))},
C:function(a){throw H.a(P.h("Not supported"))},
$asO:function(){return[P.n,null]},
$isP:1,
$asP:function(){return[P.n,null]},
"%":"MIDIOutputMap"},
i4:{"^":"c:5;a",
$2:function(a,b){return this.a.push(a)}},
aX:{"^":"f;",$isaX:1,"%":"MimeType"},
nH:{"^":"kR;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.C(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.h("Cannot resize immutable List."))},
A:function(a,b){return a[b]},
$iso:1,
$aso:function(){return[W.aX]},
$isk:1,
$ask:function(){return[W.aX]},
$isq:1,
$asq:function(){return[W.aX]},
$asm:function(){return[W.aX]},
$isj:1,
$asj:function(){return[W.aX]},
$isl:1,
$asl:function(){return[W.aX]},
"%":"MimeTypeArray"},
d3:{"^":"el;",
gfq:function(a){var z,y,x,w,v,u
if(!!a.offsetX)return new P.b_(a.offsetX,a.offsetY,[P.E])
else{z=a.target
if(!J.y(W.eK(z)).$isc1)throw H.a(P.h("offsetX is only supported on elements"))
y=W.eK(z)
z=a.clientX
x=a.clientY
w=[P.E]
v=y.getBoundingClientRect()
u=new P.b_(z,x,w).a1(0,new P.b_(v.left,v.top,w))
return new P.b_(J.dx(u.a),J.dx(u.b),w)}},
$isd3:1,
"%":"DragEvent|MouseEvent|PointerEvent|WheelEvent"},
H:{"^":"F;",
k:function(a){var z=a.nodeValue
return z==null?this.dH(a):z},
$isH:1,
"%":"Document|DocumentFragment|DocumentType|HTMLDocument|ShadowRoot|XMLDocument;Node"},
nN:{"^":"kT;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.C(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.h("Cannot resize immutable List."))},
A:function(a,b){return a[b]},
$iso:1,
$aso:function(){return[W.H]},
$isk:1,
$ask:function(){return[W.H]},
$isq:1,
$asq:function(){return[W.H]},
$asm:function(){return[W.H]},
$isj:1,
$asj:function(){return[W.H]},
$isl:1,
$asl:function(){return[W.H]},
"%":"NodeList|RadioNodeList"},
nS:{"^":"V;0B:value=","%":"HTMLOptionElement"},
nT:{"^":"V;0B:value=","%":"HTMLOutputElement"},
nU:{"^":"V;0B:value=","%":"HTMLParamElement"},
nW:{"^":"f;",
C:function(a){return W.mm(a.clear(),null)},
"%":"PaymentInstruments"},
aZ:{"^":"f;0i:length=",$isaZ:1,"%":"Plugin"},
nX:{"^":"kZ;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.C(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.h("Cannot resize immutable List."))},
A:function(a,b){return a[b]},
$iso:1,
$aso:function(){return[W.aZ]},
$isk:1,
$ask:function(){return[W.aZ]},
$isq:1,
$asq:function(){return[W.aZ]},
$asm:function(){return[W.aZ]},
$isj:1,
$asj:function(){return[W.aZ]},
$isl:1,
$asl:function(){return[W.aZ]},
"%":"PluginArray"},
o_:{"^":"F;0B:value=","%":"PresentationAvailability"},
o0:{"^":"V;0B:value=","%":"HTMLProgressElement"},
ip:{"^":"a7;",$isip:1,"%":"ProgressEvent|ResourceProgressEvent"},
o3:{"^":"l4;",
h:function(a,b){return P.aw(a.get(b))},
q:function(a,b){var z,y
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.aw(y.value[1]))}},
ga9:function(a){var z=H.d([],[P.n])
this.q(a,new W.iF(z))
return z},
gi:function(a){return a.size},
gO:function(a){return a.size!==0},
j:function(a,b,c){throw H.a(P.h("Not supported"))},
E:function(a,b){throw H.a(P.h("Not supported"))},
C:function(a){throw H.a(P.h("Not supported"))},
$asO:function(){return[P.n,null]},
$isP:1,
$asP:function(){return[P.n,null]},
"%":"RTCStatsReport"},
iF:{"^":"c:5;a",
$2:function(a,b){return this.a.push(a)}},
o4:{"^":"V;0i:length=,0B:value=","%":"HTMLSelectElement"},
d7:{"^":"F;","%":"AbsoluteOrientationSensor|AmbientLightSensor|OrientationSensor|RelativeOrientationSensor;Sensor"},
b2:{"^":"F;",$isb2:1,"%":"SourceBuffer"},
o5:{"^":"eB;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.C(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.h("Cannot resize immutable List."))},
A:function(a,b){return a[b]},
$iso:1,
$aso:function(){return[W.b2]},
$isk:1,
$ask:function(){return[W.b2]},
$isq:1,
$asq:function(){return[W.b2]},
$asm:function(){return[W.b2]},
$isj:1,
$asj:function(){return[W.b2]},
$isl:1,
$asl:function(){return[W.b2]},
"%":"SourceBufferList"},
b3:{"^":"f;",$isb3:1,"%":"SpeechGrammar"},
o6:{"^":"l6;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.C(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.h("Cannot resize immutable List."))},
A:function(a,b){return a[b]},
$iso:1,
$aso:function(){return[W.b3]},
$isk:1,
$ask:function(){return[W.b3]},
$isq:1,
$asq:function(){return[W.b3]},
$asm:function(){return[W.b3]},
$isj:1,
$asj:function(){return[W.b3]},
$isl:1,
$asl:function(){return[W.b3]},
"%":"SpeechGrammarList"},
b4:{"^":"f;0i:length=",$isb4:1,"%":"SpeechRecognitionResult"},
o8:{"^":"l9;",
h:function(a,b){return a.getItem(b)},
j:function(a,b,c){a.setItem(b,c)},
E:function(a,b){var z=a.getItem(b)
a.removeItem(b)
return z},
C:function(a){return a.clear()},
q:function(a,b){var z,y
for(z=0;!0;++z){y=a.key(z)
if(y==null)return
b.$2(y,a.getItem(y))}},
ga9:function(a){var z=H.d([],[P.n])
this.q(a,new W.iO(z))
return z},
gi:function(a){return a.length},
gO:function(a){return a.key(0)!=null},
$asO:function(){return[P.n,P.n]},
$isP:1,
$asP:function(){return[P.n,P.n]},
"%":"Storage"},
iO:{"^":"c:17;a",
$2:function(a,b){return this.a.push(a)}},
b6:{"^":"f;",$isb6:1,"%":"CSSStyleSheet|StyleSheet"},
ob:{"^":"V;0B:value=","%":"HTMLTextAreaElement"},
b8:{"^":"F;",$isb8:1,"%":"TextTrack"},
b9:{"^":"F;",$isb9:1,"%":"TextTrackCue|VTTCue"},
od:{"^":"lk;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.C(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.h("Cannot resize immutable List."))},
A:function(a,b){return a[b]},
$iso:1,
$aso:function(){return[W.b9]},
$isk:1,
$ask:function(){return[W.b9]},
$isq:1,
$asq:function(){return[W.b9]},
$asm:function(){return[W.b9]},
$isj:1,
$asj:function(){return[W.b9]},
$isl:1,
$asl:function(){return[W.b9]},
"%":"TextTrackCueList"},
oe:{"^":"eI;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.C(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.h("Cannot resize immutable List."))},
A:function(a,b){return a[b]},
$iso:1,
$aso:function(){return[W.b8]},
$isk:1,
$ask:function(){return[W.b8]},
$isq:1,
$asq:function(){return[W.b8]},
$asm:function(){return[W.b8]},
$isj:1,
$asj:function(){return[W.b8]},
$isl:1,
$asl:function(){return[W.b8]},
"%":"TextTrackList"},
of:{"^":"f;0i:length=","%":"TimeRanges"},
ba:{"^":"f;",$isba:1,"%":"Touch"},
og:{"^":"lp;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.C(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.h("Cannot resize immutable List."))},
A:function(a,b){return a[b]},
$iso:1,
$aso:function(){return[W.ba]},
$isk:1,
$ask:function(){return[W.ba]},
$isq:1,
$asq:function(){return[W.ba]},
$asm:function(){return[W.ba]},
$isj:1,
$asj:function(){return[W.ba]},
$isl:1,
$asl:function(){return[W.ba]},
"%":"TouchList"},
oh:{"^":"f;0i:length=","%":"TrackDefaultList"},
el:{"^":"a7;","%":"CompositionEvent|FocusEvent|TextEvent|TouchEvent;UIEvent"},
oj:{"^":"f;",
k:function(a){return String(a)},
"%":"URL"},
ol:{"^":"f;0n:x=","%":"VRStageBoundsPoint"},
om:{"^":"F;0i:length=","%":"VideoTrackList"},
je:{"^":"F;",
gcJ:function(a){var z,y
z=P.E
y=new P.R(0,$.p,[z])
this.dd(a,new W.jf(new P.eF(y,[z])))
return y},
dd:function(a,b){this.ea(a)
return this.ev(a,W.eQ(b,P.E))},
ev:function(a,b){return a.requestAnimationFrame(H.am(b,1))},
ea:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
"%":"DOMWindow|Window"},
jf:{"^":"c;a",
$1:function(a){this.a.as(0,a)}},
k5:{"^":"lu;0c,a,0b",$iscH:1},
k6:{"^":"b;a",
ff:function(a,b){var z=P.e7(null,null,null,null,!0,W.cH)
W.Y(a,this.a,new W.k7(z),!1)
return new P.ci(z,[H.z(z,0)])},
fe:function(a){return this.ff(a,!1)}},
k7:{"^":"c;a",
$1:function(a){this.a.l(0,new W.k5(a))}},
oq:{"^":"H;0B:value=","%":"Attr"},
or:{"^":"lx;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.C(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.h("Cannot resize immutable List."))},
A:function(a,b){return a[b]},
$iso:1,
$aso:function(){return[W.aT]},
$isk:1,
$ask:function(){return[W.aT]},
$isq:1,
$asq:function(){return[W.aT]},
$asm:function(){return[W.aT]},
$isj:1,
$asj:function(){return[W.aT]},
$isl:1,
$asl:function(){return[W.aT]},
"%":"CSSRuleList"},
os:{"^":"fV;",
k:function(a){return"Rectangle ("+H.e(a.left)+", "+H.e(a.top)+") "+H.e(a.width)+" x "+H.e(a.height)},
M:function(a,b){var z
if(b==null)return!1
if(!H.al(b,"$isQ",[P.E],"$asQ"))return!1
z=J.an(b)
return a.left===z.gal(b)&&a.top===z.gaH(b)&&a.width===z.ga6(b)&&a.height===z.gaf(b)},
gD:function(a){return W.eu(a.left&0x1FFFFFFF,a.top&0x1FFFFFFF,a.width&0x1FFFFFFF,a.height&0x1FFFFFFF)},
gaf:function(a){return a.height},
ga6:function(a){return a.width},
gn:function(a){return a.x},
gp:function(a){return a.y},
"%":"ClientRect|DOMRect"},
ot:{"^":"lz;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.C(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.h("Cannot resize immutable List."))},
A:function(a,b){return a[b]},
$iso:1,
$aso:function(){return[W.aV]},
$isk:1,
$ask:function(){return[W.aV]},
$isq:1,
$asq:function(){return[W.aV]},
$asm:function(){return[W.aV]},
$isj:1,
$asj:function(){return[W.aV]},
$isl:1,
$asl:function(){return[W.aV]},
"%":"GamepadList"},
ou:{"^":"lB;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.C(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.h("Cannot resize immutable List."))},
A:function(a,b){return a[b]},
$iso:1,
$aso:function(){return[W.H]},
$isk:1,
$ask:function(){return[W.H]},
$isq:1,
$asq:function(){return[W.H]},
$asm:function(){return[W.H]},
$isj:1,
$asj:function(){return[W.H]},
$isl:1,
$asl:function(){return[W.H]},
"%":"MozNamedAttrMap|NamedNodeMap"},
ov:{"^":"lD;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.C(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.h("Cannot resize immutable List."))},
A:function(a,b){return a[b]},
$iso:1,
$aso:function(){return[W.b4]},
$isk:1,
$ask:function(){return[W.b4]},
$isq:1,
$asq:function(){return[W.b4]},
$asm:function(){return[W.b4]},
$isj:1,
$asj:function(){return[W.b4]},
$isl:1,
$asl:function(){return[W.b4]},
"%":"SpeechRecognitionResultList"},
ow:{"^":"lF;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.C(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.h("Cannot resize immutable List."))},
A:function(a,b){return a[b]},
$iso:1,
$aso:function(){return[W.b6]},
$isk:1,
$ask:function(){return[W.b6]},
$isq:1,
$asq:function(){return[W.b6]},
$asm:function(){return[W.b6]},
$isj:1,
$asj:function(){return[W.b6]},
$isl:1,
$asl:function(){return[W.b6]},
"%":"StyleSheetList"},
kl:{"^":"d8;$ti",
bT:function(a,b,c,d){return W.Y(this.a,this.b,a,!1)}},
er:{"^":"kl;a,b,c,$ti"},
km:{"^":"iP;a,b,c,d,e",
eI:function(){var z=this.d
if(z!=null&&this.a<=0)J.f5(this.b,this.c,z,!1)},
w:{
Y:function(a,b,c,d){var z=W.eQ(new W.kn(c),W.a7)
z=new W.km(0,a,b,z,!1)
z.eI()
return z}}},
kn:{"^":"c;a",
$1:function(a){return this.a.$1(a)}},
G:{"^":"b;",
gJ:function(a){return new W.h9(a,this.gi(a),-1)},
l:function(a,b){throw H.a(P.h("Cannot add to immutable List."))},
E:function(a,b){throw H.a(P.h("Cannot remove from immutable List."))}},
h9:{"^":"b;a,b,c,0d",
t:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.cy(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gv:function(a){return this.d}},
kd:{"^":"b;a",$isF:1,w:{
ke:function(a){if(a===window)return a
else return new W.kd(a)}}},
lu:{"^":"b;",$isa7:1},
kc:{"^":"f+fG;"},
kg:{"^":"f+m;"},
kh:{"^":"kg+G;"},
ki:{"^":"f+m;"},
kj:{"^":"ki+G;"},
kp:{"^":"f+m;"},
kq:{"^":"kp+G;"},
kF:{"^":"f+m;"},
kG:{"^":"kF+G;"},
kO:{"^":"f+O;"},
kP:{"^":"f+O;"},
kQ:{"^":"f+m;"},
kR:{"^":"kQ+G;"},
kS:{"^":"f+m;"},
kT:{"^":"kS+G;"},
kY:{"^":"f+m;"},
kZ:{"^":"kY+G;"},
l4:{"^":"f+O;"},
eA:{"^":"F+m;"},
eB:{"^":"eA+G;"},
l5:{"^":"f+m;"},
l6:{"^":"l5+G;"},
l9:{"^":"f+O;"},
lj:{"^":"f+m;"},
lk:{"^":"lj+G;"},
eH:{"^":"F+m;"},
eI:{"^":"eH+G;"},
lo:{"^":"f+m;"},
lp:{"^":"lo+G;"},
lw:{"^":"f+m;"},
lx:{"^":"lw+G;"},
ly:{"^":"f+m;"},
lz:{"^":"ly+G;"},
lA:{"^":"f+m;"},
lB:{"^":"lA+G;"},
lC:{"^":"f+m;"},
lD:{"^":"lC+G;"},
lE:{"^":"f+m;"},
lF:{"^":"lE+G;"}}],["","",,P,{"^":"",
aw:function(a){var z,y,x,w,v
if(a==null)return
z=P.L(P.n,null)
y=Object.getOwnPropertyNames(a)
for(x=y.length,w=0;w<y.length;y.length===x||(0,H.bi)(y),++w){v=y[w]
z.j(0,v,a[v])}return z},
m_:function(a){var z,y
z=new P.R(0,$.p,[null])
y=new P.dg(z,[null])
a.then(H.am(new P.m0(y),1))["catch"](H.am(new P.m1(y),1))
return z},
dJ:function(){var z=$.dI
if(z==null){z=J.cC(window.navigator.userAgent,"Opera",0)
$.dI=z}return z},
fR:function(){var z,y
z=$.dF
if(z!=null)return z
y=$.dG
if(y==null){y=J.cC(window.navigator.userAgent,"Firefox",0)
$.dG=y}if(y)z="-moz-"
else{y=$.dH
if(y==null){y=!P.dJ()&&J.cC(window.navigator.userAgent,"Trident/",0)
$.dH=y}if(y)z="-ms-"
else z=P.dJ()?"-o-":"-webkit-"}$.dF=z
return z},
le:{"^":"b;",
aG:function(a){var z,y,x
z=this.a
y=z.length
for(x=0;x<y;++x)if(z[x]===a)return x
z.push(a)
this.b.push(null)
return y},
an:function(a){var z,y,x,w,v
z={}
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
y=J.y(a)
if(!!y.$isc_)return new Date(a.a)
if(!!y.$isaC)return a
if(!!y.$iscJ)return a
if(!!y.$isdN)return a
if(!!y.$isdR)return a
if(!!y.$ise_||!!y.$isd5)return a
if(!!y.$isP){x=this.aG(a)
w=this.b
v=w[x]
z.a=v
if(v!=null)return v
v={}
z.a=v
w[x]=v
y.q(a,new P.lg(z,this))
return z.a}if(!!y.$isl){x=this.aG(a)
v=this.b[x]
if(v!=null)return v
return this.f0(a,x)}throw H.a(P.cf("structured clone of other type"))},
f0:function(a,b){var z,y,x,w
z=J.Z(a)
y=z.gi(a)
x=new Array(y)
this.b[b]=x
for(w=0;w<y;++w)x[w]=this.an(z.h(a,w))
return x}},
lg:{"^":"c:7;a,b",
$2:function(a,b){this.a.a[a]=this.b.an(b)}},
jV:{"^":"b;",
aG:function(a){var z,y,x,w
z=this.a
y=z.length
for(x=0;x<y;++x){w=z[x]
if(w==null?a==null:w===a)return x}z.push(a)
this.b.push(null)
return y},
an:function(a){var z,y,x,w,v,u,t,s,r,q
z={}
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
if(a instanceof Date){y=a.getTime()
x=new P.c_(y,!0)
if(Math.abs(y)<=864e13)w=!1
else w=!0
if(w)H.aa(P.aP("DateTime is outside valid range: "+x.gd4()))
return x}if(a instanceof RegExp)throw H.a(P.cf("structured clone of RegExp"))
if(typeof Promise!="undefined"&&a instanceof Promise)return P.m_(a)
v=Object.getPrototypeOf(a)
if(v===Object.prototype||v===null){u=this.aG(a)
x=this.b
t=x[u]
z.a=t
if(t!=null)return t
t=P.hT()
z.a=t
x[u]=t
this.fd(a,new P.jW(z,this))
return z.a}if(a instanceof Array){s=a
u=this.aG(s)
x=this.b
t=x[u]
if(t!=null)return t
w=J.Z(s)
r=w.gi(s)
t=this.c?new Array(r):s
x[u]=t
for(x=J.a3(t),q=0;q<r;++q)x.j(t,q,this.an(w.h(s,q)))
return t}return a},
bI:function(a,b){this.c=b
return this.an(a)}},
jW:{"^":"c:16;a,b",
$2:function(a,b){var z,y
z=this.a.a
y=this.b.an(b)
J.cz(z,a,y)
return y}},
lf:{"^":"le;a,b"},
df:{"^":"jV;a,b,c",
fd:function(a,b){var z,y,x,w
for(z=Object.keys(a),y=z.length,x=0;x<z.length;z.length===y||(0,H.bi)(z),++x){w=z[x]
b.$2(w,a[w])}}},
m0:{"^":"c:3;a",
$1:function(a){return this.a.as(0,a)}},
m1:{"^":"c:3;a",
$1:function(a){return this.a.bH(a)}}}],["","",,P,{"^":"",
eJ:function(a,b){var z,y
z=new P.R(0,$.p,[b])
y=new P.eF(z,[b])
a.toString
W.Y(a,"success",new P.lH(a,y),!1)
W.Y(a,"error",y.gcL(),!1)
return z},
fH:{"^":"f;","%":";IDBCursor"},
mP:{"^":"fH;",
gB:function(a){return new P.df([],[],!1).bI(a.value,!1)},
"%":"IDBCursorWithValue"},
lH:{"^":"c;a,b",
$1:function(a){this.b.as(0,new P.df([],[],!1).bI(this.a.result,!1))}},
nP:{"^":"f;",
cH:function(a,b,c){var z,y,x,w,v
try{z=null
z=this.dU(a,b)
w=P.eJ(z,null)
return w}catch(v){y=H.ap(v)
x=H.ao(v)
w=P.cR(y,x,null)
return w}},
l:function(a,b){return this.cH(a,b,null)},
C:function(a){var z,y,x,w
try{x=P.eJ(a.clear(),null)
return x}catch(w){z=H.ap(w)
y=H.ao(w)
x=P.cR(z,y,null)
return x}},
dV:function(a,b,c){return a.add(new P.lf([],[]).an(b))},
dU:function(a,b){return this.dV(a,b,null)},
"%":"IDBObjectStore"},
nQ:{"^":"f;0B:value=","%":"IDBObservation"}}],["","",,P,{"^":"",
bw:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
et:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
kI:{"^":"b;",
W:function(){return Math.random()}},
b_:{"^":"b;n:a>,p:b>,$ti",
k:function(a){return"Point("+H.e(this.a)+", "+H.e(this.b)+")"},
M:function(a,b){var z
if(b==null)return!1
if(!H.al(b,"$isb_",[P.E],null))return!1
z=J.an(b)
return J.a5(this.a,z.gn(b))&&J.a5(this.b,z.gp(b))},
gD:function(a){var z,y
z=J.ax(this.a)
y=J.ax(this.b)
return P.et(P.bw(P.bw(0,z),y))},
m:function(a,b){return new P.b_(J.aq(this.a,b.gn(b)),J.aq(this.b,b.gp(b)),this.$ti)},
a1:function(a,b){return new P.b_(J.cx(this.a,b.a),J.cx(this.b,b.b),this.$ti)}},
l_:{"^":"b;$ti",
gbY:function(a){return J.aq(this.a,this.c)},
gbD:function(a){return J.aq(this.b,this.d)},
k:function(a){return"Rectangle ("+H.e(this.a)+", "+H.e(this.b)+") "+H.e(this.c)+" x "+H.e(this.d)},
M:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(!H.al(b,"$isQ",[P.E],"$asQ"))return!1
z=this.a
y=J.an(b)
x=J.y(z)
if(x.M(z,y.gal(b))){w=this.b
v=J.y(w)
z=v.M(w,y.gaH(b))&&J.a5(x.m(z,this.c),y.gbY(b))&&J.a5(v.m(w,this.d),y.gbD(b))}else z=!1
return z},
gD:function(a){var z,y,x,w,v,u
z=this.a
y=J.y(z)
x=y.gD(z)
w=this.b
v=J.y(w)
u=v.gD(w)
z=J.ax(y.m(z,this.c))
w=J.ax(v.m(w,this.d))
return P.et(P.bw(P.bw(P.bw(P.bw(0,x),u),z),w))},
d0:function(a,b){var z,y,x,w
z=this.a
y=b.a
x=J.bS(y)
w=J.aM(z)
if(w.av(z,x.m(y,b.c)))if(x.av(y,w.m(z,this.c))){z=this.b
y=b.b
x=J.bS(y)
w=J.aM(z)
z=w.av(z,x.m(y,b.d))&&x.av(y,w.m(z,this.d))}else z=!1
else z=!1
return z}},
Q:{"^":"l_;al:a>,aH:b>,a6:c>,af:d>,$ti",w:{
aF:function(a,b,c,d,e){var z,y
z=J.eV(c)
z=z.ao(c,0)?J.du(z.aK(c),0):c
y=J.eV(d)
y=y.ao(d,0)?J.du(y.aK(d),0):d
return new P.Q(a,b,z,y,[e])}}}}],["","",,P,{"^":"",mw:{"^":"f;0B:value=","%":"SVGAngle"},mY:{"^":"I;0n:x=,0p:y=","%":"SVGFEBlendElement"},mZ:{"^":"I;0n:x=,0p:y=","%":"SVGFEColorMatrixElement"},n_:{"^":"I;0n:x=,0p:y=","%":"SVGFEComponentTransferElement"},n0:{"^":"I;0n:x=,0p:y=","%":"SVGFECompositeElement"},n1:{"^":"I;0n:x=,0p:y=","%":"SVGFEConvolveMatrixElement"},n2:{"^":"I;0n:x=,0p:y=","%":"SVGFEDiffuseLightingElement"},n3:{"^":"I;0n:x=,0p:y=","%":"SVGFEDisplacementMapElement"},n4:{"^":"I;0n:x=,0p:y=","%":"SVGFEFloodElement"},n5:{"^":"I;0n:x=,0p:y=","%":"SVGFEGaussianBlurElement"},n6:{"^":"I;0n:x=,0p:y=","%":"SVGFEImageElement"},n7:{"^":"I;0n:x=,0p:y=","%":"SVGFEMergeElement"},n8:{"^":"I;0n:x=,0p:y=","%":"SVGFEMorphologyElement"},n9:{"^":"I;0n:x=,0p:y=","%":"SVGFEOffsetElement"},na:{"^":"I;0n:x=,0p:y=","%":"SVGFEPointLightElement"},nb:{"^":"I;0n:x=,0p:y=","%":"SVGFESpecularLightingElement"},nc:{"^":"I;0n:x=,0p:y=","%":"SVGFESpotLightElement"},nd:{"^":"I;0n:x=,0p:y=","%":"SVGFETileElement"},ne:{"^":"I;0n:x=,0p:y=","%":"SVGFETurbulenceElement"},ng:{"^":"I;0n:x=,0p:y=","%":"SVGFilterElement"},ni:{"^":"bm;0n:x=,0p:y=","%":"SVGForeignObjectElement"},hE:{"^":"bm;","%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},bm:{"^":"I;","%":"SVGAElement|SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},np:{"^":"bm;0n:x=,0p:y=","%":"SVGImageElement"},bI:{"^":"f;0B:value=",$isbI:1,"%":"SVGLength"},nu:{"^":"kK;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.C(b,a,null,null,null))
return a.getItem(b)},
j:function(a,b,c){throw H.a(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.h("Cannot resize immutable List."))},
A:function(a,b){return this.h(a,b)},
C:function(a){return a.clear()},
$isk:1,
$ask:function(){return[P.bI]},
$asm:function(){return[P.bI]},
$isj:1,
$asj:function(){return[P.bI]},
$isl:1,
$asl:function(){return[P.bI]},
"%":"SVGLengthList"},ny:{"^":"I;0n:x=,0p:y=","%":"SVGMaskElement"},bL:{"^":"f;0B:value=",$isbL:1,"%":"SVGNumber"},nO:{"^":"kV;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.C(b,a,null,null,null))
return a.getItem(b)},
j:function(a,b,c){throw H.a(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.h("Cannot resize immutable List."))},
A:function(a,b){return this.h(a,b)},
C:function(a){return a.clear()},
$isk:1,
$ask:function(){return[P.bL]},
$asm:function(){return[P.bL]},
$isj:1,
$asj:function(){return[P.bL]},
$isl:1,
$asl:function(){return[P.bL]},
"%":"SVGNumberList"},nV:{"^":"I;0n:x=,0p:y=","%":"SVGPatternElement"},nY:{"^":"f;0n:x=,0p:y=","%":"SVGPoint"},nZ:{"^":"f;0i:length=",
C:function(a){return a.clear()},
"%":"SVGPointList"},o1:{"^":"f;0n:x=,0p:y=","%":"SVGRect"},o2:{"^":"hE;0n:x=,0p:y=","%":"SVGRectElement"},o9:{"^":"ld;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.C(b,a,null,null,null))
return a.getItem(b)},
j:function(a,b,c){throw H.a(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.h("Cannot resize immutable List."))},
A:function(a,b){return this.h(a,b)},
C:function(a){return a.clear()},
$isk:1,
$ask:function(){return[P.n]},
$asm:function(){return[P.n]},
$isj:1,
$asj:function(){return[P.n]},
$isl:1,
$asl:function(){return[P.n]},
"%":"SVGStringList"},I:{"^":"c1;",
gd7:function(a){return new W.er(a,"click",!1,[W.d3])},
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEDropShadowElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGGradientElement|SVGLinearGradientElement|SVGMPathElement|SVGMarkerElement|SVGMetadataElement|SVGRadialGradientElement|SVGScriptElement|SVGSetElement|SVGStopElement|SVGStyleElement|SVGSymbolElement|SVGTitleElement|SVGViewElement;SVGElement"},oa:{"^":"bm;0n:x=,0p:y=","%":"SVGSVGElement"},iU:{"^":"bm;","%":"SVGTextPathElement;SVGTextContentElement"},oc:{"^":"iU;0n:x=,0p:y=","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement"},bN:{"^":"f;",$isbN:1,"%":"SVGTransform"},oi:{"^":"lr;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.C(b,a,null,null,null))
return a.getItem(b)},
j:function(a,b,c){throw H.a(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.h("Cannot resize immutable List."))},
A:function(a,b){return this.h(a,b)},
C:function(a){return a.clear()},
$isk:1,
$ask:function(){return[P.bN]},
$asm:function(){return[P.bN]},
$isj:1,
$asj:function(){return[P.bN]},
$isl:1,
$asl:function(){return[P.bN]},
"%":"SVGTransformList"},ok:{"^":"bm;0n:x=,0p:y=","%":"SVGUseElement"},kJ:{"^":"f+m;"},kK:{"^":"kJ+G;"},kU:{"^":"f+m;"},kV:{"^":"kU+G;"},lc:{"^":"f+m;"},ld:{"^":"lc+G;"},lq:{"^":"f+m;"},lr:{"^":"lq+G;"}}],["","",,P,{"^":"",my:{"^":"f;0i:length=","%":"AudioBuffer"},ff:{"^":"F;","%":"AnalyserNode|AudioBufferSourceNode|AudioChannelMerger|AudioChannelSplitter|AudioDestinationNode|AudioGainNode|AudioPannerNode|AudioScheduledSourceNode|AudioWorkletNode|BiquadFilterNode|ChannelMergerNode|ChannelSplitterNode|ConstantSourceNode|ConvolverNode|DelayNode|DynamicsCompressorNode|GainNode|IIRFilterNode|JavaScriptAudioNode|MediaElementAudioSourceNode|MediaStreamAudioSourceNode|Oscillator|OscillatorNode|PannerNode|RealtimeAnalyserNode|ScriptProcessorNode|StereoPannerNode|WaveShaperNode|webkitAudioPannerNode;AudioNode"},mz:{"^":"f;0B:value=","%":"AudioParam"},mA:{"^":"k3;",
h:function(a,b){return P.aw(a.get(b))},
q:function(a,b){var z,y
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.aw(y.value[1]))}},
ga9:function(a){var z=H.d([],[P.n])
this.q(a,new P.fg(z))
return z},
gi:function(a){return a.size},
gO:function(a){return a.size!==0},
j:function(a,b,c){throw H.a(P.h("Not supported"))},
E:function(a,b){throw H.a(P.h("Not supported"))},
C:function(a){throw H.a(P.h("Not supported"))},
$asO:function(){return[P.n,null]},
$isP:1,
$asP:function(){return[P.n,null]},
"%":"AudioParamMap"},fg:{"^":"c:5;a",
$2:function(a,b){return this.a.push(a)}},mB:{"^":"F;0i:length=","%":"AudioTrackList"},fj:{"^":"F;","%":"AudioContext|webkitAudioContext;BaseAudioContext"},nB:{"^":"ff;0ay:stream=","%":"MediaStreamAudioDestinationNode"},nR:{"^":"fj;0i:length=","%":"OfflineAudioContext"},k3:{"^":"f+O;"}}],["","",,P,{"^":"",dA:{"^":"f;",$isdA:1,"%":"WebGLBuffer"}}],["","",,P,{"^":"",o7:{"^":"l8;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.C(b,a,null,null,null))
return P.aw(a.item(b))},
j:function(a,b,c){throw H.a(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.h("Cannot resize immutable List."))},
A:function(a,b){return this.h(a,b)},
$isk:1,
$ask:function(){return[[P.P,,,]]},
$asm:function(){return[[P.P,,,]]},
$isj:1,
$asj:function(){return[[P.P,,,]]},
$isl:1,
$asl:function(){return[[P.P,,,]]},
"%":"SQLResultSetRowList"},l7:{"^":"f+m;"},l8:{"^":"l7+G;"}}],["","",,D,{"^":"",fn:{"^":"b;a,b,c,d,e,0f,r,x",
gi:function(a){return this.c},
f_:function(a,b,c){var z
for(z=0;z<c;++z)b[z]=a[z]},
aw:function(a){var z,y,x,w,v,u
if(a<0)H.aa(P.aP("should be > 0"))
if(a===this.c)return
z=C.a.I(a+31,32)
y=this.b
x=y.length
if(z>x||z+this.a<x){w=new Uint32Array(z)
y=this.b
x=y.length
this.f_(y,w,z>x?x:z)
this.b=w
y=w}x=this.c
if(a>x){v=C.a.a7(x,32)
if(v>0){u=C.a.I(x+31,32)-1
y[u]=(y[u]&(1<<(v&31)>>>0)-1)>>>0}(y&&C.aa).f9(y,C.a.I(x+31,32),z,0)}this.c=a
this.sdk(0,this.d+1)},
sdk:function(a,b){this.d=b
if(this.e===0&&!0)this.x.l(0,b)},
dQ:function(a,b){this.b=new Uint32Array((a+31)/32|0)
this.c=a
this.d=0},
k:function(a){return H.e(this.c)+" bits, "+H.e(this.cN(!0))+" set"},
h:function(a,b){return(this.b[C.a.I(b,32)]&1<<(b&31))>>>0!==0},
j:function(a,b,c){var z,y
z=this.b
if(c){y=C.a.I(b,32)
z[y]=(z[y]|1<<(b&31))>>>0}else{y=C.a.I(b,32)
z[y]=(z[y]&~(1<<(b&31)))>>>0}this.sdk(0,this.d+1)},
cN:function(a){var z,y,x,w
z=this.c
if(z===0)return 0
if(this.r!==this.d){this.f=0
for(z=C.a.I(z+31,32)-1,y=0;y<z;++y)for(x=this.b[y];x!==0;x=x>>>8)this.f=this.f+$.$get$cI()[x&255]
x=this.b[y]
w=this.c&31
if(w!==0)x=(x&~(4294967295<<w))>>>0
for(;x!==0;x=x>>>8)this.f=this.f+$.$get$cI()[x&255]}z=this.f
return z},
C:function(a){return this.aw(0)},
w:{
w:function(a,b){var z=new D.fn(256,null,null,0,0,-1,new P.en(null,null,0,[null]))
z.dQ(a,!1)
return z}}}}],["","",,G,{"^":"",bF:{"^":"t;B:a>"},at:{"^":"t;bB:a',B:b*,c"},aE:{"^":"t;"},aU:{"^":"t;"},X:{"^":"t;b4:a<"},aA:{"^":"t;aV:a<"},c4:{"^":"t;a,b"},bC:{"^":"t;"},aR:{"^":"t;a,b"}}],["","",,K,{"^":"",c0:{"^":"a8;b,0a",
dw:function(a,b){var z,y
z=a.a
y=this.b
y.b3(0,z,new K.fS())
J.cA(y.h(0,z),b)},
es:function(a,b){J.dw(this.b.h(0,a.a),b)},
fT:[function(a){a.b5(G.aA)
a.e.d.l(0,a)
return a},"$1","ged",4,0,3]},fS:{"^":"c;",
$0:function(){return H.d([],[S.a_])}}}],["","",,X,{"^":"",dQ:{"^":"jH;r,x,0b,0c,0d,0e,0a",
aB:function(a){var z,y
if(this.b.S(a)!=null){z=this.b.b
y=a.a
this.r.j(0,J.bj(z.a[y]),a)}},
l:function(a,b){var z,y
z=this.b.b
y=b.a
this.r.j(0,J.bj(z.a[y]),b)},
bF:function(a){var z,y
if(this.b.S(a)!=null){z=this.b.b
y=a.a
this.r.j(0,J.bj(z.a[y]),a)}},
ak:function(a){var z,y
if(this.b.S(a)!=null){z=this.b.b
y=a.a
this.r.E(0,J.bj(z.a[y]))}},
f3:[function(a){var z,y,x,w,v
z=this.r.h(0,a)
if(z!=null){y=this.c.S(z)==null
if(y&&this.d.S(z)!=null){y=this.e
x=y.b.h(0,z.a)
w=x==null
if(!w)J.ac(x,y.ged())
if(!w)J.cB(x)}else if(!y){y=this.c.b
w=z.a
v=y.a[w].gaV()
this.e.es(v,z)}z.e.e.l(0,z)
return!0}return!1},"$1","gf2",4,0,23]},jH:{"^":"a8;",
u:function(a){this.be(0)
this.b=S.i(this.a,G.bF)
this.c=S.i(this.a,G.aA)
this.d=S.i(this.a,G.aE)
this.e=this.a.z.h(0,new H.r(K.c0))}}}],["","",,A,{"^":"",bs:{"^":"jM;e,f,0b,0c,0a",
aB:function(a){var z,y,x,w,v
if(this.b.S(a)!=null&&this.c.S(a)!=null){z=this.b.b
y=a.a
x=z.a[y]
w=this.c.b.a[y].gb4()
v=w*2
this.d_(0,a,x.a-w,x.b-w,v,v)}},
ak:function(a){if(this.b.S(a)!=null&&this.c.S(a)!=null)this.E(0,a)},
d_:function(a,b,c,d,e,f){var z,y
z=this.e
y=new A.cm(b,P.aF(c,d,e,f,P.D),[H.z(z,0)])
z.cu(y)
this.f.j(0,b,y)
return y},
E:function(a,b){var z=this.f.E(0,b)
if(z!=null)z.c.bu(0,z)},
dr:function(){return J.fd(this.e.bP(),new A.iq())}},iq:{"^":"c;",
$1:function(a){return a.d.length===0}},ag:{"^":"b;a,b,c,d,e,$ti",
gb1:function(a){var z=this.e
return new H.c7(z,new A.iz(),[H.z(z,0),H.z(this,0)])},
c4:function(){var z=this.d
if(z.length===0)return J.a6(this.gb1(this).a)
return J.a6(this.gb1(this).a)+C.b.bQ(z,0,new A.iw(this),P.E)},
bP:function(){var z,y,x
z=this.d
if(z.length!==0){y=[A.ag,H.z(this,0)]
x=H.d([this],[y])
return H.cQ(x,new H.c2(z,new A.iv(),[H.z(z,0),y]),H.z(x,0))}return H.d([this],[[A.ag,H.z(this,0)]])},
ba:function(a){var z,y
z=this.d
if(z.length===0)return this.gb1(this)
y=H.z(z,0)
return this.gb1(this).fc(0,new H.c2(new H.aH(z,new A.ix(a),[y]),new A.iy(a),[y,H.z(this,0)]))},
E:function(a,b){b.c.bu(0,b)},
cu:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.d
if(z.length===0){y=this.e
x=this.b
if(y.length<x){y.push(a)
a.c=this}else{w=this.a
v=w.a
u=w.b
t=w.c/2
s=w.d/2
w=P.D
r=H.z(this,0)
q=[[A.ag,r]]
r=[[A.cm,r]]
p=this.$ti
z.push(new A.ag(P.aF(v,u,t,s,w),x,this,H.d([],q),H.d([],r),p))
o=v+t
z.push(new A.ag(P.aF(o,u,t,s,w),x,this,H.d([],q),H.d([],r),p))
n=u+s
z.push(new A.ag(P.aF(v,n,t,s,w),x,this,H.d([],q),H.d([],r),p))
z.push(new A.ag(P.aF(o,n,t,s,w),x,this,H.d([],q),H.d([],r),p))
r=H.cQ(y,H.d([a],r),H.z(y,0))
m=P.d1(r,!0,H.a4(r,"j",0))
C.b.si(y,0)
C.b.q(m,this.gen())}}else this.eo(a)},
eo:[function(a){var z=this.ct(a.b)
if(z===this){this.e.push(a)
a.c=this}else z.cu(a)},"$1","gen",4,0,13],
bu:function(a,b){var z,y,x,w
z=this.d
if(z.length===0)C.b.cC(this.e,new A.is(b),!0)
else{y=this.ct(b.b)
if(y===this)C.b.cC(this.e,new A.it(b),!0)
else y.bu(0,b)
if(this.c4()<=this.b){x=J.f7(this.bP(),new A.iu(),[A.cm,H.z(this,0)])
w=P.d1(x,!0,H.a4(x,"j",0))
x=this.e
C.b.si(x,0)
C.b.eL(x,w)
C.b.si(z,0)}}},
ct:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=a.a
y=this.a
x=y.a
w=y.c/2
v=J.bS(x)
u=J.aM(z)
t=u.ao(z,v.m(x,w))?0:1
s=a.b
r=y.b
y=y.d/2
q=J.bS(r)
p=J.aM(s)
o=p.ao(s,q.m(r,y))?0:2
n=J.cw(u.m(z,a.c),v.m(x,w))?0:1
m=J.cw(p.m(s,a.d),q.m(r,y))?0:2
if(t===n&&o===m)return this.d[t+o]
return this},
k:function(a){return"QuadTree["+this.a.k(0)+"]["+H.e(this.e)+"]["+H.e(this.d)+"]"}},iz:{"^":"c;",
$1:function(a){return a.a}},iw:{"^":"c;a",
$2:function(a,b){return a+b.c4()},
$S:function(){return{func:1,ret:P.E,args:[P.E,[A.ag,H.z(this.a,0)]]}}},iv:{"^":"c;",
$1:function(a){return a.bP()}},ix:{"^":"c;a",
$1:function(a){return a.a.d0(0,this.a)}},iy:{"^":"c;a",
$1:function(a){return a.ba(this.a)}},is:{"^":"c;a",
$1:function(a){var z,y
z=a.a
y=this.a.a
return z==null?y==null:z===y}},it:{"^":"c;a",
$1:function(a){var z,y
z=a.a
y=this.a.a
return z==null?y==null:z===y}},iu:{"^":"c;",
$1:function(a){return a.e}},cm:{"^":"b;a,b,0c,$ti",
k:function(a){return H.e(this.a)+"@"+this.b.k(0)}},jM:{"^":"a8;",
u:function(a){this.be(0)
this.b=S.i(this.a,F.M)
this.c=S.i(this.a,G.X)}}}],["","",,N,{"^":"",fk:{"^":"jv;",
X:[function(a){var z,y,x,w,v,u,t
z=this.fy.b
y=a.a
x=z.a[y]
w=this.fx.b.a[y].gaV()
v=this.fy.b.a[w.a]
y=x.a
u=y-this.b.cy*v.a/20
t=3.141592653589793*y*y
if(u>0){t=Math.max(0,t-3.141592653589793*u*u)
x.a=u
this.fs(w,a)}else{x.a=0
z=new G.dK()
a.r.N(a,S.ar(z.gL(z)),z)
a.e.d.l(0,a)}z=v.a
v.a=Math.sqrt((3.141592653589793*z*z+t)/3.141592653589793)},"$1","gU",4,0,0]},jv:{"^":"a0;",
u:["dL",function(a){this.P(0)
this.fx=S.i(this.b,G.aA)
this.fy=S.i(this.b,G.X)}]}}],["","",,F,{"^":"",fl:{"^":"jw;",
X:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.fy.b
y=a.a
x=z.a[y]
w=this.go.b.a[y].gb4()
v=w*2
y=this.k2
z=x.a
u=x.b
for(z=y.e.ba(P.aF(z-w,u-w,v,v,P.D)).aI(0,new F.fm(this)),y=J.S(z.a),z=new H.ch(y,z.b);z.t();){u=y.gv(y)
t=this.fy.b
s=u.a
r=t.a[s]
q=this.go.b.a[s].gb4()
p=r.a-x.a
o=r.b-x.b
n=Math.sqrt(p*p+o*o)
if(this.k1.S(u)==null){if(n<w)this.dz(a,u,n,p,o,w,q)
else if(n<w+q/2)this.eO(a,u,n,p,o,w,q)
else if(n<=w+q)this.fL(a,u,n,p,o,w,q)}else if(this.k1.b.a[s].gaV()===a&&n>w-q)this.ft(a,u,n,p,o,w,q)}},"$1","gU",4,0,0]},fm:{"^":"c;a",
$1:function(a){return this.a.id.S(a)!=null}},jw:{"^":"a0;",
u:["dM",function(a){this.P(0)
this.fx=S.i(this.b,G.aE)
this.fy=S.i(this.b,F.M)
this.go=S.i(this.b,G.X)
this.id=S.i(this.b,G.aU)
this.k1=S.i(this.b,G.aA)
this.k2=this.b.z.h(0,new H.r(A.bs))}]}}],["","",,B,{"^":"",fC:{"^":"jz;0fx,0fy,0go,a,0b,c,d,e,f,0r,0x,0y",
X:[function(a){var z,y,x,w,v,u
z=this.fx.b
y=a.a
x=z.a[y]
w=this.fy.b.a[y]
v=x.a
u=x.b
x.a=Math.max(0,Math.min(4369,v+w.b*Math.cos(w.a)*this.b.cy))
y=Math.max(0,Math.min(4369,u+w.b*Math.sin(w.a)*this.b.cy))
x.b=y
if(v!==x.a||u!==y){z=new G.aR(v,u)
a.r.N(a,S.ar(z.gL(z)),z)
a.e.d.l(0,a)}},"$1","gU",4,0,0]},jz:{"^":"a0;",
u:function(a){this.P(0)
this.fx=S.i(this.b,F.M)
this.fy=S.i(this.b,G.at)
this.go=S.i(this.b,G.bC)}}}],["","",,L,{"^":"",ie:{"^":"jL;0fx,0fy,a,0b,c,d,e,f,0r,0x,0y",
X:[function(a){var z,y,x
z=this.fx.b
y=a.a
x=z.a[y]
y=this.b.cy
z=x.a
x.a=Math.sqrt((1-0.001*y)*3.141592653589793*z*z/3.141592653589793)},"$1","gU",4,0,0]},jL:{"^":"a0;",
u:function(a){this.P(0)
this.fx=S.i(this.b,G.X)
this.fy=S.i(this.b,G.aE)}}}],["","",,G,{"^":"",ir:{"^":"jN;0fx,0fy,0go,0id,a,0b,c,d,e,f,0r,0x,0y",
X:[function(a){var z,y,x,w,v
z=this.fy.b
y=a.a
x=z.a[y]
w=this.go.b.a[y].gb4()
v=w*2
y=this.id
y.E(0,a)
y.d_(0,a,x.a-w,x.b-w,v,v)},"$1","gU",4,0,0]},jN:{"^":"a0;",
u:function(a){this.P(0)
this.fx=S.i(this.b,G.aR)
this.fy=S.i(this.b,F.M)
this.go=S.i(this.b,G.X)
this.id=this.b.z.h(0,new H.r(A.bs))}}}],["","",,N,{"^":"",bb:{"^":"b;a,b",
gi:function(a){return this.a.length},
K:function(){var z,y,x
z=this.a
y=this.b
x=y+1
this.b=x
y=z[y]
this.b=x+1
return(y<<8>>>0)+z[x]},
k:function(a){return H.e(this.a)}},dd:{"^":"b;a,b",
bf:function(a,b){this.a[this.b++]=a},
gO:function(a){return this.b>1},
dl:function(a){var z,y,x
z=this.a
y=this.b
x=y+1
this.b=x
z[y]=C.a.bA(a,8)&255
this.b=x+1
z[x]=a&255}}}],["","",,B,{"^":"",W:{"^":"b;a,b",
k:function(a){return this.b}},c8:{"^":"b;a,b",
k:function(a){return this.b}},lY:{"^":"c:15;",
$1:function(a){switch(a){case C.v:return 4
case C.n:return 0}}}}],["","",,F,{"^":"",hk:{"^":"c3;0id,0k1,0k2,k3,a,b,c,d,e,f,r,x,y,z,0Q,0ch,0cx,0cy,db,0dx,0dy,fr,fx,fy,go",
co:function(){var z=this.k1
z.textBaseline="top"
z.font="16px Verdana"}}}],["","",,E,{"^":"",fM:{"^":"jB;y1,y2,ad,ae,aD,0a2,0fx,0fy,0go,0id,0k1,a,0b,c,d,e,f,0r,0x,0y",
fQ:[function(a){this.y2.d6(0,a).bS(new E.fN(this,a))},"$1","ge8",4,0,12],
am:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.b.b.b9(S.ar(C.j))
z=new H.aH(z,new E.fO(),[H.a4(z,"c5",0)])
y=z.gi(z)
z=this.b.b.b9(S.ar(C.p))
z=new H.aH(z,new E.fP(),[H.a4(z,"c5",0)])
x=z.gi(z)
w=this.ae
this.ae=w+this.b.cy
if(C.a.a7(C.c.ag(w),5)===4&&C.a.a7(C.c.ag(this.ae),5)===0){this.aD=window.performance.now()
z=this.y2
v=$.$get$ct().h(0,C.n)
u=J.aq(v,1)
u=new Uint8Array(u)
t=new N.dd(u,0)
t.bf(1,v)
if(z.b)z.c.send(C.o.ah(u,0,t.b))}z=this.go.dr()
s=P.d1(z,!0,H.z(z,0))
r=this.id.aU()
r.cM(r)
z=new T.ai(new Float32Array(4))
z.aM(-1,-1,0,1)
q=r.b7(z)
z=new T.ai(new Float32Array(4))
z.aM(1,1,0,1)
p=r.b7(z)
z=new E.fQ(q,p)
o=new H.aH(s,z,[H.z(s,0)])
v=this.y1
v.save()
v.font="20px Verdana"
v.textBaseline="top"
v.fillStyle="white"
v.strokeStyle="grey"
C.f.a3(v,"Rendered circles: "+y,5,45)
C.f.a3(v,"Moving entities: "+x,5,65)
C.f.a3(v,"QuadTree leaves (visible/total): "+o.gi(o)+"/"+s.length,5,85)
C.f.a3(v,"Received: "+C.d.b6(this.ad/1024,3)+"kB",5,105)
C.f.a3(v,"Rate: "+C.d.b6(this.ad/1024/this.ae,3)+"kB/s ("+C.d.b6(8*this.ad/1024/1024/this.ae,3)+"Mbit/s)",5,125)
u=this.a2
u=u==null?null:C.c.a5(u)
C.f.a3(v,"Ping: "+H.e(u==null?"unknown":u)+"ms",5,145)
C.f.a3(v,"Version: 0.1.0-secret-pre-pre-pre-alpha",5,165)
u=this.k1.b
t=p.a[0]
n=q.a
m=n[0]
l=u/(t-m)
v.transform(l,0,0,-l,-m*l,(600+n[1])*l)
for(u=C.b.gJ(s),z=new H.ch(u,z);z.t();){t=u.gv(u).a
v.strokeRect(t.a,t.b,t.c,t.d)}v.restore()}},fN:{"^":"c;a,b",
$1:function(a){var z=this.a
z.ad=z.ad+a.a.length
if(this.b===C.u)z.a2=window.performance.now()-z.aD}},fO:{"^":"c;",
$1:function(a){return a!=null}},fP:{"^":"c;",
$1:function(a){return a!=null}},fQ:{"^":"c;a,b",
$1:function(a){var z,y,x,w
z=a.a
y=this.a.a
x=y[0]
y=y[1]
w=this.b.a
return z.d0(0,P.aF(x,y,w[0]-x,w[1]-y,P.E))}},jB:{"^":"bc;",
u:function(a){this.P(0)
this.fx=S.i(this.b,G.aU)
this.fy=S.i(this.b,F.M)
this.go=this.b.z.h(0,new H.r(A.bs))
this.id=this.b.z.h(0,new H.r(F.bv))
this.k1=this.b.z.h(0,new H.r(F.aQ))}}}],["","",,F,{"^":"",fD:{"^":"jA;f6,Z,0T,0y1,fx,fy,go,0id,0k1,a,0b,c,d,e,f,0r,0x,0y",
u:function(a){var z
this.dN(0)
z=this.Z
z.toString
W.Y(z,"mousemove",new F.fE(this),!1)},
X:[function(a){var z,y,x,w,v,u,t,s,r,q
z=this.T
if(z!=null){y=this.Z
x=y.width
w=x/2
y=y.height
v=y/2
u=Math.min(x/3,y/3)
t=w-z.a
s=v-z.b
r=C.d.cX(65535*Math.max(0,Math.min(100,100*Math.min(u,Math.sqrt(t*t+s*s))/u))/100)
q=C.d.cX(65536*C.d.a7(6.283185307179586+Math.atan2(v-this.T.b,J.cx(this.T.a,w)),6.283185307179586)/6.283185307179586)
w=this.f6
v=$.$get$ct().h(0,C.v)
z=J.aq(v,1)
z=new Uint8Array(z)
y=new N.dd(z,0)
y.bf(0,v)
y.dl(r)
y.dl(q)
if(w.b)w.c.send(C.o.ah(z,0,y.b))}this.T=null},"$1","gU",4,0,0]},fE:{"^":"c;a",
$1:function(a){this.a.T=J.f8(a)}},ja:{"^":"jT;a2,cT,cU,aE,0at,0fx,0fy,0go,0id,0k1,0k2,0k3,0k4,0r1,0r2,a,0b,c,d,e,f,0r,0x,0y",
u:function(a){var z,y,x,w
this.dO(0)
z=this.cU
y=$.$get$ct().h(0,C.n)
x=J.aq(y,1)
x=new Uint8Array(x)
w=new N.dd(x,0)
w.bf(1,y)
if(z.b)z.c.send(C.o.ah(x,0,w.b))},
h2:[function(a){this.a2.j(0,a,H.d([],[N.bb]))
this.cU.d6(0,a).bS(new F.jb(this,a))},"$1","geE",4,0,12],
am:function(){var z,y,x,w,v
z=this.cT
C.b.q(z,this.k4.gf2())
C.b.si(z,0)
z=this.a2
y=z.gf4(z).aI(0,new F.jc())
for(z=J.S(y.a),x=new H.ch(z,y.b);x.t();){w=z.gv(z)
v=w.a
w=w.b
this.eg(v,w)
J.cB(w)}},
eg:function(a,b){var z,y,x,w
switch(a){case C.F:J.ac(b,this.gei())
break
case C.G:J.ac(b,this.gek())
break
case C.E:J.ac(b,this.gem())
break
case C.H:J.fa(b).q(0,this.geJ())
this.aE.C(0)
break
case C.D:J.ac(b,this.gel())
break
case C.K:case C.L:for(z=J.S(b),y=this.cT;z.t();){x=z.gv(z)
for(;x.b<x.a.length;){w=x.K()
if(!this.k4.f3(w))y.push(w)}}break
case C.I:J.ac(b,this.geK())
break
case C.J:J.ac(b,this.geC())
break
case C.u:break}J.cB(b)},
h4:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
for(z=this.aE,y=G.bC,x=G.at;a.b<a.a.length;){w=a.K()
v=a.K()/15
u=a.K()/15
if(z.l(0,w)){t=this.k4.r.h(0,w)
if(t!=null){s=this.fx.b
r=t.a
q=s.a[r]
p=this.go.b.a[r]
o=q.a
n=q.b
m=p.a
q.a=v
q.b=u
s=u-n
l=v-o
p.a=Math.atan2(s,l)
if(this.id.S(t)!=null){s=t.r
r=new H.r(x)
l=$.$get$aS()
k=l.h(0,r)
if(k==null){k=new S.K(0,0)
j=$.u
k.a=j
$.u=j<<1>>>0
j=$.v
$.v=j+1
k.b=j
l.j(0,r,k)}s.bv(t,k)
s=t.r
r=new H.r(y)
k=l.h(0,r)
if(k==null){k=new S.K(0,0)
j=$.u
k.a=j
$.u=j<<1>>>0
j=$.v
$.v=j+1
k.b=j
l.j(0,r,k)}s.bv(t,k)}else if(this.k2.S(t)!=null){i=Math.sqrt(l*l+s*s)
r=this.k2.b.a[r]
j=J.an(r)
j.sbB(r,Math.atan2(s,l))
j.sB(r,i/this.b.cy)
r.c=(p.a-m)/this.b.cy}s=new G.aR(v,u)
r=t.r
l=s.gL(s)
j=$.$get$aS()
k=j.h(0,l)
if(k==null){k=new S.K(0,0)
h=$.u
k.a=h
$.u=h<<1>>>0
h=$.v
$.v=h+1
k.b=h
j.j(0,l,k)}r.N(t,k,s)
t.e.d.l(0,t)}}}},"$1","geJ",4,0,1],
fV:[function(a){var z,y,x,w,v,u,t,s,r,q
for(z=P.D,y=[S.t];x=a.b,w=a.a,x<w.length;){x=this.b
v=a.K()
u=a.K()
t=a.K()
w=w[a.b++]
s=F.bB(0.35,0.4,0.4,1)
r=new G.au()
r.a=P.bp(64,1,!1,z)
r=H.d([new G.bF(v),new F.M(u/15,t/15),new G.X(w/32),s,new F.af(0),r,new G.aU()],y)
q=x.a.aq()
C.b.q(r,q.gar())
x.c.l(0,q)
x=this.k4
x.r.j(0,J.bj(x.b.b.a[q.a]),q)}},"$1","gei",4,0,1],
fW:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o
for(z=P.D,y=[S.t];x=a.b,w=a.a,x<w.length;){x=this.b
v=a.K()
u=a.K()
t=a.K()
s=a.b
r=s+1
a.b=r
s=w[s]
q=r+1
a.b=q
r=w[r]
a.b=q+1
q=w[q]
w=F.bB(0.35,0.4,0.4,1)
p=new G.au()
p.a=P.bp(64,1,!1,z)
p=H.d([new G.bF(v),new F.M(u/15,t/15),new G.X(s/32),new G.c4(r/32,q/64),w,new F.af(0),p,new G.aU()],y)
o=x.a.aq()
C.b.q(p,o.gar())
x.c.l(0,o)
x=this.k4
x.r.j(0,J.bj(x.b.b.a[o.a]),o)}},"$1","gek",4,0,1],
fY:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
for(z=P.D,y=[S.t];x=a.b,w=a.a,x<w.length;){v=a.K()
x=a.K()
u=a.K()
t=1000*a.K()/65535
s=100*w[a.b++]/255
if(v!==this.at){w=this.b
r=F.bB(s,0.9,0.6,0.4)
q=new G.au()
q.a=P.bp(64,1,!1,z)
p=new G.bl(5)
p.a=P.bp(64,1,!1,z)
p=H.d([new G.bF(v),new F.M(x/15,u/15),new G.X(t),r,new F.af(1.5707963267948966),q,p,new G.cd(),new G.at(0,0,0),new G.aE()],y)
o=w.a.aq()
C.b.q(p,o.gar())
w.c.l(0,o)}else{x=this.k3.b.h(0,"player")
w=new G.bF(this.at)
u=x.r
r=w.gL(w)
q=$.$get$aS()
n=q.h(0,r)
if(n==null){n=new S.K(0,0)
p=$.u
n.a=p
$.u=p<<1>>>0
p=$.v
$.v=p+1
n.b=p
q.j(0,r,n)}u.N(x,n,w)
w=new G.cN()
u=x.r
r=w.gL(w)
n=q.h(0,r)
if(n==null){n=new S.K(0,0)
p=$.u
n.a=p
$.u=p<<1>>>0
p=$.v
$.v=p+1
n.b=p
q.j(0,r,n)}u.N(x,n,w)
w=new G.X(t)
u=x.r
r=w.gL(w)
n=q.h(0,r)
if(n==null){n=new S.K(0,0)
p=$.u
n.a=p
$.u=p<<1>>>0
p=$.v
$.v=p+1
n.b=p
q.j(0,r,n)}u.N(x,n,w)
w=F.bB(s,0.9,0.6,0.4)
u=x.r
r=w.gL(w)
n=q.h(0,r)
if(n==null){n=new S.K(0,0)
p=$.u
n.a=p
$.u=p<<1>>>0
p=$.v
$.v=p+1
n.b=p
q.j(0,r,n)}u.N(x,n,w)
w=new F.af(1.5707963267948966)
u=x.r
r=w.gL(w)
n=q.h(0,r)
if(n==null){n=new S.K(0,0)
p=$.u
n.a=p
$.u=p<<1>>>0
p=$.v
$.v=p+1
n.b=p
q.j(0,r,n)}u.N(x,n,w)
w=new G.au()
w.a=P.bp(64,1,!1,z)
u=x.r
r=w.gL(w)
n=q.h(0,r)
if(n==null){n=new S.K(0,0)
p=$.u
n.a=p
$.u=p<<1>>>0
p=$.v
$.v=p+1
n.b=p
q.j(0,r,n)}u.N(x,n,w)
w=new G.bl(5)
w.a=P.bp(64,1,!1,z)
u=x.r
r=w.gL(w)
n=q.h(0,r)
if(n==null){n=new S.K(0,0)
p=$.u
n.a=p
$.u=p<<1>>>0
p=$.v
$.v=p+1
n.b=p
q.j(0,r,n)}u.N(x,n,w)
w=new G.cd()
u=x.r
r=w.gL(w)
n=q.h(0,r)
if(n==null){n=new S.K(0,0)
p=$.u
n.a=p
$.u=p<<1>>>0
p=$.v
$.v=p+1
n.b=p
q.j(0,r,n)}u.N(x,n,w)
w=new G.at(0,0,0)
u=x.r
r=w.gL(w)
n=q.h(0,r)
if(n==null){n=new S.K(0,0)
p=$.u
n.a=p
$.u=p<<1>>>0
p=$.v
$.v=p+1
n.b=p
q.j(0,r,n)}u.N(x,n,w)
w=new G.aE()
u=x.r
r=w.gL(w)
n=q.h(0,r)
if(n==null){n=new S.K(0,0)
p=$.u
n.a=p
$.u=p<<1>>>0
p=$.v
$.v=p+1
n.b=p
q.j(0,r,n)}u.N(x,n,w)
x.e.d.l(0,x)}}},"$1","gem",4,0,1],
fX:[function(a){this.at=a.K()},"$1","gel",4,0,1],
h5:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o
for(z=G.aA;a.b<a.a.length;){y=a.K()
x=a.K()
w=a.K()
v=this.k4.r.h(0,y)
if(v!=null){if(this.k1.S(v)!=null){u=this.k1.b
t=v.a
s=u.a[t].gaV()
J.dw(this.r2.b.h(0,s.a),v)}u=new G.at(6.283185307179586*w/65536,100*x/65535,0)
t=v.r
r=u.gL(u)
q=$.$get$aS()
p=q.h(0,r)
if(p==null){p=new S.K(0,0)
o=$.u
p.a=o
$.u=o<<1>>>0
o=$.v
$.v=o+1
p.b=o
q.j(0,r,p)}t.N(v,p,u)
u=new G.bC()
t=v.r
r=u.gL(u)
p=q.h(0,r)
if(p==null){p=new S.K(0,0)
o=$.u
p.a=o
$.u=o<<1>>>0
o=$.v
$.v=o+1
p.b=o
q.j(0,r,p)}t.N(v,p,u)
u=v.r
t=new H.r(z)
p=q.h(0,t)
if(p==null){p=new S.K(0,0)
r=$.u
p.a=r
$.u=r<<1>>>0
r=$.v
$.v=r+1
p.b=r
q.j(0,t,p)}u.bv(v,p)
v.e.d.l(0,v)}}},"$1","geK",4,0,1],
h1:[function(a){var z,y,x,w,v,u,t,s,r,q
for(;a.b<a.a.length;){z=a.K()
y=a.K()
x=this.k4.r.h(0,z)
w=this.k4.r.h(0,y)
if(x!=null&&w!=null){v=new G.aA(w)
u=x.r
t=v.gL(v)
s=$.$get$aS()
r=s.h(0,t)
if(r==null){r=new S.K(0,0)
q=$.u
r.a=q
$.u=q<<1>>>0
q=$.v
$.v=q+1
r.b=q
s.j(0,t,r)}u.N(x,r,v)
x.e.d.l(0,x)
this.r2.dw(w,x)}}},"$1","geC",4,0,1],
aT:function(){return!0}},jb:{"^":"c;a,b",
$1:function(a){return J.cA(this.a.a2.h(0,this.b),a)}},jc:{"^":"c;",
$1:function(a){return J.bV(a.b)}},jA:{"^":"hC;",
u:["dN",function(a){this.dG(0)
this.y1=S.i(this.b,G.cN)}]},jT:{"^":"bc;",
u:["dO",function(a){this.P(0)
this.fx=S.i(this.b,F.M)
this.fy=S.i(this.b,G.X)
this.go=S.i(this.b,F.af)
this.id=S.i(this.b,G.bC)
this.k1=S.i(this.b,G.aA)
this.k2=S.i(this.b,G.at)
this.k3=this.b.z.h(0,new H.r(S.b7))
this.k4=this.b.z.h(0,new H.r(X.dQ))
this.r1=this.b.z.h(0,new H.r(A.bs))
this.r2=this.b.z.h(0,new H.r(K.c0))}]}}],["","",,M,{"^":"",id:{"^":"jK;bN,0bO,0cW,0H,0a0,aX,0aF,a8,0r1,0r2,0rx,0ry,0x1,0x2,0y1,z,a$,b$,c$,d$,e$,f$,r$,a,0b,c,d,e,f,0r,0x,0y",
gaa:function(){return 128},
b2:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=this.r1.b
y=b.a
x=z.a[y]
w=this.r2.b.a[y]
v=this.rx.b.a[y]
u=this.ry.b.a[y]
t=this.x1.b.a[y]
s=this.cW.b.a[y]
r=a*129
y=this.a8
q=r*y
p=a*(192*this.bN)
z=this.H
z[q]=x.a
z[q+1]=x.b
z[q+2]=v.a
z[q+3]=v.b
z[q+4]=v.c
z[q+5]=v.d/2
for(z=q+y,o=r+1,n=r+2,m=64*y,l=r+64,k=l+1,l+=2,j=0;j<64;++j){i=z+y*j
h=w.a
g=s.b
f=s.a[j]
e=t.a[j]
d=u.a+6.283185307179586*j/64
this.bJ(i,x,(h-g*f)*e,d,v,j,p,r)
e=this.H
f=i+5
g=e[f]
h=t.a[j]
e[f]=g/h
g=this.a0
f=p+j*9
g[f]=r
e=o+j
g[f+1]=e
c=n+j
g[f+2]=c
i+=m
this.bJ(i,x,w.a*h,d,v,j,p,r)
this.H[i+5]=s.a[j]
h=this.a0
h[f+3]=e
h[f+4]=k+j
g=l+j
h[f+5]=g
h[f+6]=e
h[f+7]=c
h[f+8]=g}this.cP(q,C.a.ag(24),w,t,s,u,x)
this.cP(q,C.a.ag(40),w,t,s,u,x)
z=this.a0
y=p+576
z[y-1]=k
z[y-2]=o
z[y-4]=k
z[y-7]=o},
cP:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t
z=this.a8
y=a+z+z*b
x=c.a
w=e.b
v=e.a[b]
u=d.a[b]
t=f.a+6.283185307179586*b/64
u=(x-w*v)*u*1.1
this.H[y]=g.a+u*Math.cos(t)
this.H[y+1]=g.b+u*Math.sin(t)
y+=64*z
z=c.a*d.a[b]*1.1
this.H[y]=g.a+z*Math.cos(t)
this.H[y+1]=g.b+z*Math.sin(t)},
c3:function(a){this.H=new Float32Array(a*129*this.a8)
this.a0=new Uint16Array(a*(192*this.bN))},
gbR:function(){return 192*this.bN},
gaC:function(){return 64}},hc:{"^":"jG;0bO,0H,0a0,aX,0aF,a8,0r1,0r2,0rx,0ry,0x1,0x2,0y1,z,a$,b$,c$,d$,e$,f$,r$,a,0b,c,d,e,f,0r,0x,0y",
b2:function(a,b){var z,y,x,w
this.dD(a,b)
z=this.aF
y=this.rx.b
x=b.a
w=y.a[x]
this.H[a*(z+1)*this.a8+5]=w.d},
gaC:function(){return 16}},dB:{"^":"jy;0aa:aF<",
b2:["dD",function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.r1.b
y=b.a
x=z.a[y]
w=this.r2.b.a[y]
v=this.rx.b.a[y]
u=this.ry.b.a[y]
t=this.x1.b.a[y]
s=a*(this.gaa()+1)
y=this.a8
r=a*(this.gaa()+1)*y
q=a*this.gaa()*3
z=this.H
z[r]=x.a
z[r+1]=x.b
z[r+2]=v.a
z[r+3]=v.b
z[r+4]=v.c
z[r+5]=v.d/2
for(z=r+y,p=s+1,o=s+2,n=0;n<this.gaa();++n){this.bJ(z+y*n,x,w.a*t.a[n],u.a+6.283185307179586*n/this.gaa(),v,n,q,s)
m=this.a0
l=q+n*3
m[l]=s
m[l+1]=p+n
m[l+2]=o+n}this.a0[q+this.gaa()*3-1]=p}],
bJ:function(a,b,c,d,e,f,g,h){var z,y
this.H[a]=b.a+c*Math.cos(d)
this.H[a+1]=b.b+c*Math.sin(d)
z=this.H
z[a+2]=e.a
z[a+3]=e.b
z[a+4]=e.c
y=Math.abs(f-(this.gaC()/2|0))/(this.gaC()/2|0)
this.H[a+5]=e.d+0.5*y*y},
dc:function(a){var z=this.a$
z.uniformMatrix4fv(z.getUniformLocation(this.b$,"uViewProjection"),!1,this.y1.aU().a)
this.eT(this.aX,this.H,this.a0)
this.a$.drawElements(4,a*this.gbR(),5123,0)},
c3:function(a){var z=this.gaa()
this.H=new Float32Array(a*(z+1)*this.a8)
z=this.gbR()
this.a0=new Uint16Array(a*z)},
gbR:function(){return this.gaa()*3},
gau:function(){return"PositionRenderingSystem"},
gaW:function(){return"PositionRenderingSystem"}},fh:{"^":"ju;",
gau:function(){return"BackgroundRenderingSystem"},
gaW:function(){return"BackgroundRenderingSystem"}},fi:{"^":"fh;a8,f7,f8,cV,0ad,0ae,0aD,0a2,a$,b$,c$,d$,e$,f$,r$,a,0b,c,d,e,f,0r,0x,0y"},iA:{"^":"jO;x2,y1,0fx,0fy,0go,0id,a,0b,c,d,e,f,0r,0x,0y",
cK:function(){C.b.si(this.y1,0)},
X:[function(a){var z,y,x,w,v
z=this.go.b.h(0,"player")
y=this.fy.b
x=a.a
w=y.a[x]
v=(z==null?a==null:z===a)?"you":"someone else"
y=w.a
this.y1.push(new M.bt(v,C.c.I(y*y*3.141592653589793,100)))},"$1","gU",4,0,0],
cR:function(a){var z,y,x,w,v,u,t,s,r
z=this.y1
H.iM(z,new M.iB())
y=this.x2;(y&&C.f).a3(y,"Ranking",this.id.b-200,0)
for(x=z.length,w=0,v=0,u=0;u<z.length;z.length===x||(0,H.bi)(z),++u){t=z[u]
s=t.b
r=y.measureText(""+s).width
w+=20;++v
y.fillText(""+v+". "+t.a,this.id.b-200,w)
y.fillText(""+s,this.id.b-r,w)}}},iB:{"^":"c:18;",
$2:function(a,b){return C.a.eV(b.b,a.b)}},bt:{"^":"b;a,b"},jK:{"^":"dB;",
u:function(a){this.cb(0)
this.bO=S.i(this.b,G.aE)
this.cW=S.i(this.b,G.bl)}},jG:{"^":"dB;",
u:function(a){this.cb(0)
this.bO=S.i(this.b,G.aU)}},jy:{"^":"em;",
u:["cb",function(a){this.ca(0)
this.r1=S.i(this.b,F.M)
this.r2=S.i(this.b,G.X)
this.rx=S.i(this.b,F.az)
this.ry=S.i(this.b,F.af)
this.x1=S.i(this.b,G.au)
this.x2=S.i(this.b,G.aY)
this.y1=this.b.z.h(0,new H.r(F.bv))}]},ju:{"^":"j1;",
u:function(a){this.dK(0)
this.ad=S.i(this.b,F.M)
this.ae=this.b.z.h(0,new H.r(F.bv))
this.aD=this.b.z.h(0,new H.r(S.b7))
this.a2=this.b.z.h(0,new H.r(F.aQ))}},jO:{"^":"a0;",
u:function(a){this.P(0)
this.fx=S.i(this.b,G.aE)
this.fy=S.i(this.b,G.X)
this.go=this.b.z.h(0,new H.r(S.b7))
this.id=this.b.z.h(0,new H.r(F.aQ))}}}],["","",,B,{"^":"",j4:{"^":"b;a,b,c,d",
dS:function(a,b){var z
this.b=!0
z=this.c
W.Y(z,"message",new B.j7(this),!1)
W.Y(z,"close",new B.j8(this),!1)},
d6:function(a,b){return J.fb(this.a.b3(0,b,new B.j9()))},
w:{
j5:function(a,b){var z=new B.j4(P.L(B.W,[P.d9,N.bb]),!1,a,b)
z.dS(a,b)
return z}}},j7:{"^":"c;a",
$1:function(a){var z=new FileReader()
W.Y(z,"load",new B.j6(this.a,z),!1)
z.readAsArrayBuffer(new P.df([],[],!1).bI(a.data,!0))}},j6:{"^":"c;a,b",
$1:function(a){var z,y,x,w
z=C.Y.gfD(this.b)
y=(z&&C.o).dA(z,1)
x=C.t[z[0]]
w=this.a
if(w.d)P.f0(x)
w=w.a.h(0,x)
if(!(w==null))J.cA(w,new N.bb(y,0))}},j8:{"^":"c;a",
$1:function(a){this.a.b=!1}},j9:{"^":"c;",
$0:function(){return new P.en(null,null,0,[N.bb])}}}],["","",,G,{"^":"",cN:{"^":"t;"},au:{"^":"t;0a"},bl:{"^":"t;0a,b"},aY:{"^":"t;"},dK:{"^":"t;"},bJ:{"^":"t;fK:a<,b"},cd:{"^":"t;"},db:{"^":"t;"}}],["","",,Q,{"^":"",ia:{"^":"jI;0fx,0fy,0go,a,0b,c,d,e,f,0r,0x,0y",
am:function(){var z,y,x,w,v,u,t,s
z=this.go.aU()
z.cM(z)
y=new T.ai(new Float32Array(4))
y.aM(-1,-1,0,1)
x=z.b7(y)
y=new T.ai(new Float32Array(4))
y.aM(1,1,0,1)
w=z.b7(y)
y=this.fy
v=x.a
u=v[0]
v=v[1]
t=w.a
s=t[0]
t=t[1]
y.e.ba(P.aF(u,v,s-u,t-v,P.D)).q(0,this.geG())},
h3:[function(a){var z=new G.aY()
a.r.N(a,S.ar(z.gL(z)),z)
a.e.d.l(0,a)},"$1","geG",4,0,0]},hb:{"^":"jF;0fx,0fy,0go,a,0b,c,d,e,f,0r,0x,0y",
X:[function(a){var z,y,x,w
z=this.fy.b
y=a.a
x=z.a[y]
w=this.go.b.a[y]
y=x.a+w.b*this.b.cy
x.a=y
if(y>=w.a){a.b5(G.c4)
a.e.d.l(0,a)}},"$1","gU",4,0,0]},iE:{"^":"jP;0fx,0fy,a,0b,c,d,e,f,0r,0x,0y",
X:[function(a){a.b5(G.aR)
a.b5(G.aY)
a.e.d.l(0,a)},"$1","gU",4,0,0]},fT:{"^":"jC;0aE,0at,0f5,0fx,0fy,a,0b,c,d,e,f,0r,0x,0y",
fs:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.aE.b
y=b.a
x=z.a[y]
w=this.fy.b.a[y]
v=this.at.b.a[a.a]
u=F.cu(v.a,v.b,v.c)
for(z=[S.t],t=0;t<w.a;++t){s=$.$get$bU().W()*2*3.141592653589793
y=this.b
r=H.d([new F.ca(),new F.M(x.a+w.a*Math.cos(s),x.b+w.a*Math.sin(s)),F.bB(u[0],u[1]+0.1,u[2]+0.1,1),new G.bJ(0.1,0.1)],z)
q=y.a.aq()
C.b.q(r,q.gar())
y.c.l(0,q)}}},h7:{"^":"jE;0fx,a,0b,c,d,e,f,0r,0x,0y",
X:[function(a){var z,y,x
z=this.fx.b
y=a.a
x=z.a[y]
y=x.gfK()-this.b.cy
x.a=y
if(y<=0)a.e.e.l(0,a)},"$1","gU",4,0,0]},h3:{"^":"jD;aY,0Z,0T,0H,0a0,0aX,0fx,0fy,0go,0id,0k1,0k2,a,0b,c,d,e,f,0r,0x,0y",
dz:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r
z=this.H.b
y=a.a
x=z.a[y]
w=C.c.a5((Math.atan2(e,d)-x.a)*this.aY)
v=C.d.a5(C.d.I(g/f*64,4))
u=this.Z.b.a[y]
t=(c+g-f)/f
for(s=-v+1,z=v*v;s<=v;++s){r=C.a.a7(w+s,64)
y=u.a
y[r]=Math.max(y[r],1+t*(1-s*s/z))}},
fL:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.H.b
y=a.a
x=z.a[y]
w=C.c.a5((Math.atan2(e,d)-x.a)*this.aY)
v=g/f
u=C.d.a5(C.d.I(v*64,4))
t=this.Z.b.a[y]
s=(f+g-c)/g
r=this.T.b.a[y]
q=u*u*u
p=q*u
for(o=-u+1,z=v*s;o<=u;++o){n=C.a.a7(w+o,64)
y=t.a
m=o*o
y[n]=Math.min(y[n],1-z*(1-m*m/p))
r.a[n]=1-s*(1-Math.abs(m*o)/q)}},
eO:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=this.H.b
y=a.a
x=z.a[y]
w=C.c.a5((Math.atan2(e,d)-x.a)*this.aY)
v=g/f
u=C.d.a5(C.d.I(v*64,4))
t=this.Z.b.a[y]
z=f+g-c
s=z/g
r=this.T.b.a[y]
q=(c+g-f)/f
p=u*u
o=p*u
n=o*u
y=g/2
m=(z-y)/y
m*=m
for(l=-u+1,z=v*s,y=1-m;l<=u;++l){k=C.a.a7(w+l,64)
j=t.a
i=j[k]
h=l*l
j[k]=m*Math.max(i,1+q*(1-h/p))+y*Math.min(i,1-z*(1-h*h/n))
r.a[k]=1-s*(1-Math.abs(h*l)/o)}},
ft:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p
z=this.H.b
y=a.a
x=z.a[y]
w=C.c.a5((Math.atan2(e,d)-x.a)*this.aY)
v=C.d.a5(C.d.I(g/f*64,4))
u=this.Z.b.a[y]
t=this.T.b.a[y]
s=(c+g-f)/f
r=v*v*v
for(q=-v+1;q<=v;++q){p=C.a.a7(w+q,64)
z=u.a
y=s*(1-Math.abs(q*q*q)/r)
z[p]=Math.max(z[p],1+y)
t.a[p]=1-y}}},jg:{"^":"jU;0fx,a,0b,c,d,e,f,0r,0x,0y",
X:[function(a){var z,y,x,w
z=this.fx.b
y=a.a
x=z.a[y].a
for(w=0;w<64;++w)x[w]=0.2+0.8*x[w]},"$1","gU",4,0,0]},ft:{"^":"jx;0fx,a,0b,c,d,e,f,0r,0x,0y",
X:[function(a){var z,y,x,w
z=this.fx.b
y=a.a
x=z.a[y].a
for(z=this.b,w=0;w<64;++w)x[w]=1+(x[w]-1)*(1-0.999*z.cy)},"$1","gU",4,0,0]},iW:{"^":"jR;0fx,0fy,0go,0id,0k1,0k2,0k3,0k4,0r1,a,0b,c,d,e,f,0r,0x,0y",
X:[function(a){var z,y,x,w,v,u,t,s,r,q
z=this.fx.b
y=a.a
x=z.a[y]
w=this.fy.b.a[y]
v=this.go.b.a[y]
u=this.k1.b.a[y]
t=this.k2.b.a[y]
s=this.k3.b.a[y]
r=this.k4.b.a[y]
y=v.a
q=y-u.c*this.b.cy
this.c8(x,w,t,u,s,y+2.356194490192345,q+2.356194490192345,v,r,1)
this.c8(x,w,t,u,s,y-2.356194490192345,q-2.356194490192345,v,r,-1)},"$1","gU",4,0,0],
c8:function(a8,a9,b0,b1,b2,b3,b4,b5,b6,b7){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7
if(b7===1){z=C.a.ag(24)
y=b6.a
x=y[z]
w=y[z+1]}else{v=C.a.ag(40)
y=b6.a
x=y[v]
w=y[v-1]}u=a8.a+b0.a*1.1*Math.cos(b3)*x
t=a8.b+b0.a*1.1*Math.sin(b3)*x
y=a9.a
s=y+b0.a*1.1*Math.cos(b4)*x
r=a9.b
q=r+b0.a*1.1*Math.sin(b4)*x
p=a8.a
o=b0.a
n=b7/32*3.141592653589793
m=b3+n
l=Math.cos(m)
k=a8.b
j=b0.a
m=Math.sin(m)
i=b0.a
n=b4+n
h=Math.cos(n)
g=b0.a
n=Math.sin(n)
f=1.1*b1.c*b0.a
e=b3+1.5707963267948966
d=b1.b*Math.cos(b1.a)-50*Math.cos(b5.a)+f*Math.cos(e)
c=Math.atan2(b1.b*Math.sin(b1.a)-50*Math.sin(b5.a)+f*Math.sin(e),d)
e=Math.cos(c)
b=F.cu(b2.a,b2.b,b2.c)
a=b[2]+0.1
b[2]=a
a0=b[1]+0.3
b[1]=a0
a1=F.dr(b[0],a0,a)
for(p=p+o*l*w-u,m=k+j*m*w-t,h=y+i*h*w-s,n=r+g*n*w-q,e=d/e*0.9,g=c-0.04908738521234052,r=[S.t],a2=0;a2<b0.a/10;++a2){y=$.$get$bU()
a3=y.W()
a4=y.W()
a5=u+a3*p
a6=t+a3*m
o=this.b
l=a1[0]
k=a1[1]
j=a1[2]
i=new F.az(l,k,j,1,null,1)
i.e=F.cu(l,k,j)[2]
i.r=l
i.x=k
i.y=j
j=1+2*y.W()
k=y.W()
k=H.d([new F.M(a5+a4*(s+a3*h-a5),a6+a4*(q+a3*n-a6)),new F.ca(),new G.db(),i,new G.bJ(j,j),new G.at(g+y.W()*3.141592653589793/32,e+k*0.2,0)],r)
a7=o.a.aq()
C.b.q(k,a7.gar())
o.c.l(0,a7)}}},iV:{"^":"jQ;0fx,0fy,0go,a,0b,c,d,e,f,0r,0x,0y",
X:[function(a){var z,y,x,w,v,u,t,s
z=this.fy.b
y=a.a
x=z.a[y]
w=this.go.b.a[y]
v=F.cu(x.r,x.x,x.y)
y=v[0]
z=w.a
u=w.b
y-=0.2*(1-z/u)
v[0]=y
t=v[1]*z/u
v[1]=t
z=v[2]*z/u
v[2]=z
s=F.dr(y,t,z)
x.a=s[0]
x.b=s[1]
x.c=s[2]
x.d=w.a/u},"$1","gU",4,0,0]},jI:{"^":"bc;",
u:function(a){this.P(0)
this.fx=this.b.z.h(0,new H.r(F.aQ))
this.fy=this.b.z.h(0,new H.r(A.bs))
this.go=this.b.z.h(0,new H.r(F.bv))}},jF:{"^":"a0;",
u:function(a){this.P(0)
this.fx=S.i(this.b,G.aU)
this.fy=S.i(this.b,G.X)
this.go=S.i(this.b,G.c4)}},jP:{"^":"a0;",
u:function(a){this.P(0)
this.fx=S.i(this.b,G.aR)
this.fy=S.i(this.b,G.aY)}},jC:{"^":"fk;",
u:function(a){this.dL(0)
this.aE=S.i(this.b,F.M)
this.at=S.i(this.b,F.az)
this.f5=this.b.z.h(0,new H.r(K.c0))}},jE:{"^":"a0;",
u:function(a){this.P(0)
this.fx=S.i(this.b,G.bJ)}},jD:{"^":"fl;",
u:function(a){this.dM(0)
this.Z=S.i(this.b,G.au)
this.T=S.i(this.b,G.bl)
this.H=S.i(this.b,F.af)
this.a0=S.i(this.b,G.aY)
this.aX=this.b.z.h(0,new H.r(S.b7))}},jU:{"^":"a0;",
u:function(a){this.P(0)
this.fx=S.i(this.b,G.au)}},jx:{"^":"a0;",
u:function(a){this.P(0)
this.fx=S.i(this.b,G.bl)}},jR:{"^":"a0;",
u:function(a){this.P(0)
this.fx=S.i(this.b,F.M)
this.fy=S.i(this.b,G.aR)
this.go=S.i(this.b,F.af)
this.id=S.i(this.b,G.cd)
this.k1=S.i(this.b,G.at)
this.k2=S.i(this.b,G.X)
this.k3=S.i(this.b,F.az)
this.k4=S.i(this.b,G.au)
this.r1=S.i(this.b,G.aY)}},jQ:{"^":"a0;",
u:function(a){this.P(0)
this.fx=S.i(this.b,G.db)
this.fy=S.i(this.b,F.az)
this.go=S.i(this.b,G.bJ)}}}],["","",,S,{"^":"",
ar:function(a){var z,y,x
z=$.$get$aS()
y=z.h(0,a)
if(y==null){y=new S.K(0,0)
x=$.u
y.a=x
$.u=x<<1>>>0
x=$.v
$.v=x+1
y.b=x
z.j(0,a,y)}return y},
B:{"^":"b;a,b,c",
G:function(a,b){var z={}
z.a=a
C.b.q(b,new S.fe(z))
return z.a}},
fe:{"^":"c;a",
$1:function(a){var z=this.a
z.a=(z.a|S.ar(a).a)>>>0}},
t:{"^":"b;",
bx:function(){}},
fz:{"^":"a8;b,c,0a",
u:function(a){},
h_:[function(a){this.ec(a,new S.fA(a))
a.c=0},"$1","ger",4,0,0],
N:function(a,b,c){var z,y,x,w,v
z=b.b
y=this.b
y.bk(z)
x=y.a[z]
if(x==null){w=S.t
v=new Array(16)
v.fixed$length=Array
x=new S.T(H.d(v,[w]),0,[w])
y.j(0,z,x)}x.j(0,a.a,c)
y=b.a
a.c=(a.c|y)>>>0},
bv:function(a,b){var z,y,x
if((a.c&b.a)>>>0!==0){z=b.b
y=this.b
x=a.a
J.cy(y.a[z],x).bx()
J.cz(y.a[z],x,null)
x=b.a
a.c=(a.c&~x)>>>0}},
b9:function(a){var z,y,x,w,v
z=a.b
y=this.b
y.bk(z)
x=y.a[z]
if(x==null){w=S.t
v=new Array(16)
v.fixed$length=Array
x=new S.T(H.d(v,[w]),0,[w])
y.j(0,z,x)}return x},
ec:function(a,b){var z,y,x
z=a.c
for(y=this.b,x=0;z>0;){if((z&1)===1)b.$2(y.a[x],x);++x
z=z>>>1}},
ak:function(a){return this.c.l(0,a)}},
fA:{"^":"c:19;a",
$2:function(a,b){var z=this.a.a
a.a[z].bx()
a.j(0,z,null)}},
K:{"^":"b;a,b"},
a_:{"^":"b;a,0b,c,d,e,0f,0r",
k:function(a){return"Entity["+H.e(this.a)+"]"},
h8:[function(a){var z,y,x,w,v,u
z=this.r
y=S.ar(J.dv(a))
x=y.b
z=z.b
z.bk(x)
w=z.a[x]
if(w==null){v=S.t
u=new Array(16)
u.fixed$length=Array
w=new S.T(H.d(u,[v]),0,[v])
z.j(0,x,w)}w.j(0,this.a,a)
z=y.a
this.c=(this.c|z)>>>0},"$1","gar",4,0,20],
b5:function(a){var z,y,x,w
z=this.r
y=S.ar(new H.r(a))
if((this.c&y.a)>>>0!==0){x=y.b
z=z.b
w=this.a
J.cy(z.a[x],w).bx()
J.cz(z.a[x],w,null)
y=y.a
this.c=(this.c&~y)>>>0}}},
h4:{"^":"a8;b,c,d,e,f,r,x,y,0a",
u:function(a){},
aq:function(){var z,y
z=this.c.da(0)
if(z==null){y=this.a
z=new S.a_(this.y.eU(),0,0,y)
z.f=y.a
z.r=y.b}++this.r
y=$.dL
$.dL=y+1
z.b=y
return z},
aB:function(a){++this.e;++this.f
this.b.j(0,a.a,a)},
bM:function(a,b){this.d.j(0,b.a,!1)},
bK:function(a,b){this.d.j(0,b.a,!0)},
ak:function(a){var z=a.a
this.b.j(0,z,null)
this.d.j(0,z,!1)
this.c.l(0,a);--this.e;++this.x}},
kH:{"^":"b;a,b",
eU:function(){var z=this.a
if(z.b>0)return z.da(0)
return this.b++}},
ae:{"^":"b;",
F:function(a){var z,y,x
this.r=this.d===0&&this.f===0
z=new H.r(H.cp(this))
y=$.dj
if(y==null){y=P.L(P.bO,P.A)
$.dj=y}x=y.h(0,z)
if(x==null){y=$.eG
x=C.a.eA(1,y)
$.eG=y+1
$.dj.j(0,z,x)}this.a=x},
cK:function(){},
cR:function(a){},
u:["P",function(a){}],
bh:function(a){var z,y,x,w
if(this.r)return
z=this.a
y=(z&a.d)>>>0===z
z=this.d
x=a.c
w=(z&x)>>>0===z
z=this.f
if(z>0&&w)w=(z&x)>>>0>0
z=this.e
if(z>0&&w)w=(z&x)>>>0===0
if(w&&!y){this.c.l(0,a)
z=this.a
a.d=(a.d|z)>>>0}else if(!w&&y)this.bw(a)},
bw:function(a){var z
this.c.E(0,a)
z=this.a
a.d=(a.d&~z)>>>0},
aB:function(a){return this.bh(a)},
bF:function(a){return this.bh(a)},
bM:function(a,b){return this.bh(b)},
ak:function(a){var z=this.a
if((z&a.d)>>>0===z)this.bw(a)},
bK:function(a,b){var z=this.a
if((z&b.d)>>>0===z)this.bw(b)}},
a8:{"^":"b;",
u:["be",function(a){}],
aB:function(a){},
bF:function(a){},
ak:function(a){},
bK:function(a,b){},
bM:function(a,b){}},
b7:{"^":"a8;b,c,0a",
ak:function(a){var z=this.c.E(0,a)
if(z!=null)this.b.E(0,z)}},
i1:{"^":"b;0a,0b,$ti",
h:function(a,b){var z,y
z=this.b
y=b.a
return z.a[y]},
S:function(a){var z,y
z=this.b
y=a.a
z=z.a
if(y<z.length)return z[y]
return},
w:{
i:function(a,b){var z,y
z=new S.i1([b])
y=S.ar(new H.r(b))
z.a=y
z.b=a.b.b9(y)
return z}}},
a0:{"^":"ae;",
bX:function(a){return a.q(0,this.gU())},
aT:function(){return!0}},
bc:{"^":"ae;",
bX:function(a){return this.am()},
aT:function(){return!0}},
T:{"^":"k4;a,b,$ti",
h:function(a,b){return this.a[b]},
gab:function(a){return this.b},
gR:function(a){return this.gab(this)===0},
da:function(a){var z,y,x
z=this.b
if(z>0){y=this.a;--z
this.b=z
x=y[z]
y[this.gab(this)]=null
return x}return},
E:function(a,b){var z,y,x
for(z=0;z<this.gab(this);++z){y=this.a
if(b===y[z]){x=this.b-1
this.b=x
y[z]=y[x]
y[this.gab(this)]=null
return!0}}return!1},
l:["dC",function(a,b){var z,y
z=this.b
y=this.a.length
if(z===y)this.bo(C.a.I(y*3,2)+1)
z=this.a
y=this.b
this.b=y+1
z[y]=b}],
j:function(a,b,c){if(b>=this.a.length)this.bo(b*2)
if(this.b<=b)this.b=b+1
this.a[b]=c},
bo:function(a){var z,y
z=this.a
y=new Array(a)
y.fixed$length=Array
y=H.d(y,[H.a4(this,"T",0)])
C.b.ax(y,0,z.length,z)
this.a=y},
bk:function(a){if(a>=this.a.length)this.bo(a*2)},
C:function(a){var z,y,x
for(z=this.b,y=this.a,x=0;x<z;++x)y[x]=null
this.b=0},
gJ:function(a){var z=C.b.ah(this.a,0,this.gab(this))
return new J.cF(z,z.length,0)},
gi:function(a){return this.gab(this)},
$isj:1},
x:{"^":"T;c,d,a,b",
l:function(a,b){var z,y
if(this.d)this.aP()
z=b.a
y=this.c
if(z>=y.c)y.aw(C.a.I(z*3,2)+1)
if(!y.h(0,z)){y.j(0,z,!0)
this.dC(0,b)}},
E:function(a,b){var z=this.c.h(0,b.a)
this.eu(b)
return z},
eu:function(a){this.c.j(0,a.a,!1)
this.d=!0},
gab:function(a){if(this.d)this.aP()
return this.b},
C:function(a){this.c.aw(0)
this.d=!0},
gJ:function(a){var z
if(this.d)this.aP()
z=this.a
if(this.d)this.aP()
z=C.b.ah(z,0,this.b)
return new J.cF(z,z.length,0)},
aP:function(){var z,y,x,w
z={}
y=this.c.cN(!0)
this.b=y
y=new Array(y)
y.fixed$length=Array
x=H.d(y,[S.a_])
if(this.b>0){z.a=0
y=this.a
w=H.z(y,0)
new H.aH(new H.iS(y,new S.h0(z,this),[w]),new S.h1(this),[w]).q(0,new S.h2(z,x))}this.a=x
this.d=!1},
$asc5:function(){return[S.a_]},
$asj:function(){return[S.a_]},
$asT:function(){return[S.a_]}},
h0:{"^":"c;a,b",
$1:function(a){return this.a.a<this.b.b}},
h1:{"^":"c;a",
$1:function(a){return this.a.c.h(0,a.a)}},
h2:{"^":"c;a,b",
$1:function(a){this.b[this.a.a++]=a
return a}},
jh:{"^":"b;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
hc:[function(a){return a.u(0)},"$1","gfj",4,0,28],
hd:[function(a){return a.u(0)},"$1","gfk",4,0,22],
ac:function(a){this.z.j(0,new H.r(H.cp(a)),a)
this.Q.l(0,a)
a.a=this},
f1:function(a){var z=this.a.aq()
C.b.q(a,z.gar())
this.c.l(0,z)
return z},
eN:function(a,b,c){a.b=this
a.x=!1
a.y=b
this.x.j(0,J.dv(a),a)
this.y.push(a)
this.cx.b3(0,b,new S.jq())
this.ch.b3(0,b,new S.jr())},
eM:function(a,b){return this.eN(a,b,!1)},
az:function(a,b){a.q(0,new S.jk(this,b))
a.c.aw(0)
a.d=!0},
bW:function(a){var z=this.ch
z.j(0,a,J.aq(z.h(0,a),1))
z=this.cx
z.j(0,a,J.aq(z.h(0,a),this.cy))
this.cw()
z=this.y
new H.aH(z,new S.js(a),[H.z(z,0)]).q(0,new S.jt(this))},
d8:function(){return this.bW(0)},
cw:function(){var z,y
this.az(this.c,new S.jl())
this.az(this.d,new S.jm())
this.az(this.r,new S.jn())
this.az(this.f,new S.jo())
this.az(this.e,new S.jp())
z=this.b
y=z.c
y.q(0,z.ger())
y.c.aw(0)
y.d=!0},
h:function(a,b){return this.db.h(0,b)},
j:function(a,b,c){this.db.j(0,b,c)}},
jq:{"^":"c;",
$0:function(){return 0}},
jr:{"^":"c;",
$0:function(){return 0}},
jk:{"^":"c;a,b",
$1:function(a){var z,y
z=this.a
y=this.b
z.Q.q(0,new S.ji(y,a))
C.b.q(z.y,new S.jj(y,a))}},
ji:{"^":"c;a,b",
$1:function(a){return this.a.$2(a,this.b)}},
jj:{"^":"c;a,b",
$1:function(a){return this.a.$2(a,this.b)}},
js:{"^":"c;a",
$1:function(a){return!a.x&&a.y===this.a}},
jt:{"^":"c;a",
$1:function(a){if(a.aT()){a.cK()
a.bX(a.c)
a.cR(0)}this.a.cw()}},
jl:{"^":"c:2;",
$2:function(a,b){return a.aB(b)}},
jm:{"^":"c:2;",
$2:function(a,b){return a.bF(b)}},
jn:{"^":"c:2;",
$2:function(a,b){return a.bK(0,b)}},
jo:{"^":"c:2;",
$2:function(a,b){return a.bM(0,b)}},
jp:{"^":"c:2;",
$2:function(a,b){return a.ak(b)}},
k4:{"^":"b+c5;"}}],["","",,L,{"^":"",
lL:function(a,b,c){return P.cS(H.d([W.dP("packages/"+a+"/assets/shader/"+b+".vert",null,null),W.dP("packages/"+a+"/assets/shader/"+c+".frag",null,null)],[[P.a1,,]]),null,!1,null).a_(new L.lM(),L.e5)},
hB:{"^":"b;a,b"},
jJ:{"^":"em;",
u:function(a){this.ca(0)
this.r1=S.i(this.b,F.M)
this.r2=S.i(this.b,F.ca)
this.rx=S.i(this.b,F.az)
this.ry=this.b.z.h(0,new H.r(F.bv))
this.x1=this.b.z.h(0,new H.r(S.b7))}},
lM:{"^":"c;",
$1:function(a){var z=J.Z(a)
return new L.e5(z.h(a,0),z.h(a,1))}},
e5:{"^":"b;a,b"},
e2:{"^":"b;"},
hd:{"^":"bc;fx,fy,go,a,0b,c,d,e,f,0r,0x,0y",
am:function(){var z,y
z=this.fx
z[C.a.a7(this.b.ch.h(0,this.y),20)]=this.b.cy
z=C.b.fA(z,new L.hf())
y=this.go
y.save()
y.font="20px Verdana"
y.textBaseline="top"
y.fillStyle=this.fy
C.f.a3(y,"FPS: "+C.d.b6(20/z,2),5,5)
C.f.a3(y,"Entities: "+this.b.a.e,5,25)
y.restore()}},
he:{"^":"c;",
$1:function(a){return 0}},
hf:{"^":"c:24;",
$2:function(a,b){return a+b}},
hC:{"^":"a0;",
u:["dG",function(a){this.k1=W.Y(window,"keydown",this.gfh(),!1)
this.id=W.Y(window,"keyup",new L.hD(this),!1)}],
cY:[function(a,b){this.fy.j(0,a.keyCode,b)
if(!b&&this.go.h(0,a.keyCode)===!0)this.go.j(0,a.keyCode,!1)
if(this.fx.eX(0,a.keyCode))a.preventDefault()},function(a){return this.cY(a,!0)},"h9","$2$keyDown","$1","gfh",4,3,25],
gal:function(a){return this.d1(65)||this.d1(37)},
d1:function(a){return this.fy.h(0,a)===!0&&this.go.h(0,a)!==!0}},
hD:{"^":"c;a",
$1:function(a){return this.a.cY(a,!1)}},
fp:{"^":"bc;fx,fy,a,0b,c,d,e,f,0r,0x,0y",
am:function(){var z,y
z=this.fx
z.toString
y=z.getContext("2d")
y.fillStyle=this.fy
y.clearRect(0,0,z.width,z.height)}},
j2:{"^":"bc;fx,a,0b,c,d,e,f,0r,0x,0y",
u:function(a){this.fx.clearColor(0,0,0,1)},
am:function(){this.fx.clear(16640)}},
de:{"^":"b;",
cZ:function(){var z,y,x,w
z=this.cq(35633,this.c$.a)
y=this.cq(35632,this.c$.b)
x=this.a$.createProgram()
this.b$=x
w=this.a$
w.attachShader(x,z)
w.attachShader(this.b$,y)
w.linkProgram(this.b$)
if(!this.a$.getProgramParameter(this.b$,35714)){P.f0(new H.r(H.cp(this)).k(0)+" - Error linking program: "+H.e(this.a$.getProgramInfoLog(this.b$)))
this.r$=!1}},
cq:function(a,b){var z,y
z=this.a$.createShader(a)
y=this.a$
y.shaderSource(z,b)
y.compileShader(z)
if(!this.a$.getShaderParameter(z,35713)){this.r$=!1
throw H.a(P.aP(this.gL(this).k(0)+" - Error compiling shader "+this.gau()+" or "+this.gaW()+": "+H.e(this.a$.getShaderInfoLog(z))))}return z},
eS:function(a,b,c,d,e){var z,y,x
z=this.f$
y=z.h(0,b)
if(null==y){y=this.a$.createBuffer()
z.j(0,b,y)}x=this.a$.getAttribLocation(this.b$,b)
if(x===-1)throw H.a(P.aP("Attribute "+b+" not found in shader "+this.gau()+"}"))
z=this.a$
z.bindBuffer(34962,y)
z.bufferData(34962,c,e)
z.vertexAttribPointer(x,d,5126,!1,0,0)
z.enableVertexAttribArray(x)},
bE:function(a,b,c,d){return this.eS(a,b,c,d,35048)},
eT:function(a,b,c){var z,y,x,w,v,u,t,s
if(null==this.d$){this.d$=this.a$.createBuffer()
this.e$=this.a$.createBuffer()}z=this.a$
z.bindBuffer(34962,this.d$)
z.bufferData(34962,b,35048)
for(y=0,x=0;x<2;++x)y+=a[x].b
for(z=4*y,w=0,x=0;x<2;++x){v=a[x]
u=v.a
t=this.a$.getAttribLocation(this.b$,u)
if(t===-1)throw H.a(P.aP("Attribute "+u+" not found in shader "+this.gau()+"}"))
u=this.a$
s=v.b
u.vertexAttribPointer(t,s,5126,!1,z,4*w)
u.enableVertexAttribArray(t)
w+=s}z=this.a$
z.bindBuffer(34963,this.e$)
z.bufferData(34963,c,35048)},
gd3:function(){return}},
cG:{"^":"b;a,b"},
em:{"^":"lt;",
u:["ca",function(a){this.cZ()}],
bX:function(a){var z,y
z={}
y=a.gab(a)
if(y>0){this.a$.useProgram(this.b$)
if(y>this.z){this.c3(y)
this.z=y}z.a=0
a.q(0,new L.j3(z,this))
this.dc(y)}},
aT:function(){return this.r$}},
j3:{"^":"c;a,b",
$1:function(a){this.b.b2(this.a.a++,a)}},
j1:{"^":"ls;",
u:["dK",function(a){this.cZ()}],
am:function(){var z,y,x,w,v,u,t,s,r,q,p,o
this.a$.useProgram(this.b$)
z=this.ad
y=this.aD.b.h(0,"player")
z=z.b
y=y.a
x=z.a[y]
y=this.a2
z=y.b
y=y.c
w=Math.max(H.ak(z),H.ak(y))/1
y=x.a
z=this.cV
v=y*z
u=x.b*z
z=-w/2
y=this.a8
t=z+v+y
s=this.f7
z=z+u+s
r=w/2
q=r+u+s
r=r+v+y
p=new Float32Array(H.dk(H.d([t,z,t,q,r,q,r,z],[P.D])))
o=this.ae.cO(v,u)
o.c2(0,v,u)
o.ds(0,1,1)
o.c2(0,-v,-u)
o.c2(0,-y,-s)
s=this.a$
s.uniformMatrix4fv(s.getUniformLocation(this.b$,"uViewProjection"),!1,o.a)
y=this.a$.getUniformLocation(this.b$,"uDimension")
z=this.a2
r=z.b
r.toString
z=z.c
z.toString
s.uniform4f(y,r,z,0,0)
s.uniform4f(this.a$.getUniformLocation(this.b$,"uPosition"),x.a,x.b,0,0)
s.uniform3fv(this.a$.getUniformLocation(this.b$,"uRgb"),this.f8)
s.uniform1f(this.a$.getUniformLocation(this.b$,"uTime"),this.b.cx.h(0,this.y))
this.bE(0,"aPosition",p,2)
this.a$.drawArrays(6,0,4)}},
ib:{"^":"jJ;0Z,0T,0r1,0r2,0rx,0ry,0x1,z,a$,b$,c$,d$,e$,f$,r$,a,0b,c,d,e,f,0r,0x,0y",
b2:function(a,b){var z,y,x,w,v,u
z=this.r1.b
y=b.a
x=z.a[y]
w=this.rx.b.a[y]
v=a*2
u=a*4
y=this.Z
y[v]=x.a
y[v+1]=x.b
y=this.T
y[u]=w.a
y[u+1]=w.b
y[u+2]=w.c
y[u+3]=w.d},
dc:function(a){var z=this.a$
z.uniformMatrix4fv(z.getUniformLocation(this.b$,"uViewProjection"),!1,this.ry.aU().a)
this.bE(0,"aPosition",this.Z,2)
this.bE(0,"aColor",this.T,4)
this.a$.drawArrays(0,0,a)},
c3:function(a){this.Z=new Float32Array(a*2)
this.T=new Float32Array(a*4)},
gau:function(){return"ParticleRenderingSystem"},
gaW:function(){return"ParticleRenderingSystem"},
gd3:function(){return"gamedev_helpers"}},
c3:{"^":"b;",
dR:function(a,b,c,d,e,f,g,a0,a1,a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=this.c
if(z!=null){z.textBaseline="top"
z.font="12px Verdana"}else{z=this.d
if(z!=null){z.enable(3042)
z.blendFunc(770,771)}else this.go=!0}z=this.b
z.toString
W.Y(z,"webkitfullscreenchange",this.gef(),!1)
z=S.a_
y=new Array(16)
y.fixed$length=Array
x=[z]
y=H.d(y,x)
z=[z]
w=new Array(16)
w.fixed$length=Array
w=H.d(w,x)
v=P.aK
u=new Array(16)
u.fixed$length=Array
u=H.d(u,[v])
t=P.A
s=new Array(16)
s.fixed$length=Array
s=new S.h4(new S.T(y,0,z),new S.T(w,0,z),new S.T(u,0,[v]),0,0,0,0,new S.kH(new S.T(H.d(s,[t]),0,[t]),0))
v=[S.T,S.t]
u=new Array(16)
u.fixed$length=Array
u=H.d(u,[v])
z=D.w(16,!1)
w=new Array(16)
w.fixed$length=Array
w=new S.fz(new S.T(u,0,[v]),new S.x(z,!1,H.d(w,x),0))
z=D.w(16,!1)
v=new Array(16)
v.fixed$length=Array
v=H.d(v,x)
u=D.w(16,!1)
y=new Array(16)
y.fixed$length=Array
y=H.d(y,x)
r=D.w(16,!1)
q=new Array(16)
q.fixed$length=Array
q=H.d(q,x)
p=D.w(16,!1)
o=new Array(16)
o.fixed$length=Array
o=H.d(o,x)
n=D.w(16,!1)
m=new Array(16)
m.fixed$length=Array
x=H.d(m,x)
m=P.bO
l=S.ae
k=H.d([],[l])
j=S.a8
i=new Array(16)
i.fixed$length=Array
t=new S.jh(s,w,new S.x(z,!1,v,0),new S.x(u,!1,y,0),new S.x(r,!1,q,0),new S.x(p,!1,o,0),new S.x(n,!1,x,0),P.L(m,l),k,P.L(m,j),new S.T(H.d(i,[j]),0,[j]),P.d0([0,0],t,t),P.d0([0,0],t,P.D),0,P.L(P.n,P.b))
t.ac(s)
t.ac(w)
t.ac(new F.aQ(!1))
this.Q=t
h=document.querySelector("button#fullscreen")
if(null!=h){z=J.f9(h)
W.Y(z.a,z.b,new L.hw(),!1)}},
eh:function(){return this.dY().a_(new L.hr(this),null).a_(new L.hs(this),null).a_(new L.ht(this),null)},
dY:function(){var z=H.d([],[[P.a1,,]])
return P.cS(z,null,!1,null).a_(new L.ho(this),null)},
ej:function(){var z,y,x,w,v,u,t
z=P.n
y=S.a_
x=P.L(z,y)
z=P.L(y,z)
w=this.Q
w.ac(new S.b7(x,z))
w.ac(new F.bv())
v=P.A
w.ac(new K.c0(P.L(v,[P.l,S.a_])))
u=[A.cm,S.a_]
w.ac(new A.bs(new A.ag(C.ab,16,null,H.d([],[[A.ag,S.a_]]),H.d([],[u]),[y]),P.L(y,u)))
w.ac(new X.dQ(P.L(v,y),0))
y=$.$get$bU()
y=H.d([new F.M(4369*y.W(),4369*y.W())],[S.t])
t=this.Q.f1(y)
x.j(0,"player",t)
z.j(0,t,"player")
return this.fi().a_(new L.hq(this),null)},
dv:function(a){return this.eh().a_(new L.hz(this),L.c3)},
eD:function(){var z=window.performance.now()
z.toString
this.dy=z
if(null!=C.b.fb(this.Q.y,new L.hu(),new L.hv()))this.fz()
C.y.dd(window,this.geb())},
fz:[function(){var z,y
z=window.performance.now()
z.toString
y=this.Q
y.cy=(z-this.dy)/1000
this.dy=z
y.bW(1)
y=this.fy
if(!y)P.hg(C.X,this.gfw(),-1)},"$0","gfw",0,0,4],
fS:[function(a){var z
this.by()
this.dx=a/1000
z=this.Q
z.cy=0.016666666666666666
z.d8()
C.y.gcJ(window).a_(new L.hp(this),-1)},"$1","geb",4,0,26],
dj:function(a,b){var z,y
this.by()
z=this.dx
y=this.Q
y.cy=b-z
this.dx=b
y.d8()
z=this.fy
if(!z)C.y.gcJ(window).a_(new L.hA(this),-1)},
fU:[function(a){this.fr=!this.fr
this.by()},"$1","gef",4,0,27],
by:function(){var z,y,x,w
if(null!=this.b){z=document.body
y=z.clientWidth
z=z.clientHeight
x=Math.max(800,H.ak(y))
w=Math.max(450,H.ak(z))
z=x/w
if(z>1.7777777777777777)x=C.a.I(16*w,9)
else if(z<1.7777777777777777)w=C.a.I(9*x,16)
z=this.k2.style
y=""+x+"px"
z.width=y
y=""+w+"px"
z.height=y
this.de(this.id,x,w)
this.co()
this.dF(x,w)}},
ha:["dF",function(a,b){var z
this.de(this.b,a,b)
z=this.Q.z.h(0,new H.r(F.aQ))
z.sa6(0,a)
z.c=b
if(this.fy||!1){z=this.Q
z.cy=0
z.bW(0)}z=this.d
z.viewport(0,0,z.drawingBufferWidth,z.drawingBufferHeight)}],
fi:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
z=H.d([],[[P.a1,,]])
y=this.k3
x=P.A
w=H.d([],[x])
v=P.dW(null,null,null,x)
u=D.w(16,!1)
t=new Array(16)
t.fixed$length=Array
s=[S.a_]
t=new F.ja(P.L(B.W,[P.l,N.bb]),w,y,v,0,new S.x(u,!1,H.d(t,s),0),0,0,0)
t.F(new S.B(0,0,0))
C.b.q(C.t,t.geE())
u=this.id
v=new S.B(0,0,0)
w=[P.bO]
v.a=v.G(0,H.d([C.ad],w))
r=P.hU([38,40,37,39,32],x)
q=P.aK
p=D.w(16,!1)
o=new Array(16)
o.fixed$length=Array
o=new F.fD(y,u,r,P.L(x,q),P.L(x,q),0,new S.x(p,!1,H.d(o,s),0),v.a,v.b,v.c)
o.F(v)
v=new S.B(0,0,0)
v.a=v.G(0,H.d([C.O,C.h,C.af],w))
p=H.d([C.N],w)
v.b=v.G(v.b,p)
p=D.w(16,!1)
q=new Array(16)
q.fixed$length=Array
q=new Q.hb(0,new S.x(p,!1,H.d(q,s),0),v.a,v.b,v.c)
q.F(v)
v=new S.B(0,0,0)
v.a=v.G(0,H.d([C.i,C.Q,C.ac],w))
p=D.w(16,!1)
r=new Array(16)
r.fixed$length=Array
r=new B.fC(0,new S.x(p,!1,H.d(r,s),0),v.a,v.b,v.c)
r.F(v)
v=new S.B(0,0,0)
v.a=v.G(0,H.d([C.h,C.r],w))
p=D.w(16,!1)
u=new Array(16)
u.fixed$length=Array
u=new L.ie(0,new S.x(p,!1,H.d(u,s),0),v.a,v.b,v.c)
u.F(v)
v=new S.B(0,0,0)
v.a=v.G(0,H.d([C.i],w))
p=H.d([C.ae],w)
v.b=v.G(v.b,p)
p=H.d([C.N,C.h],w)
v.a=v.G(v.a,p)
p=D.w(16,!1)
n=new Array(16)
n.fixed$length=Array
n=new Q.fT(0,new S.x(p,!1,H.d(n,s),0),v.a,v.b,v.c)
n.F(v)
v=new S.B(0,0,0)
v.a=v.G(0,H.d([C.p,C.i,C.h],w))
p=D.w(16,!1)
m=new Array(16)
m.fixed$length=Array
m=new G.ir(0,new S.x(p,!1,H.d(m,s),0),v.a,v.b,v.c)
m.F(v)
v=D.w(16,!1)
p=new Array(16)
p.fixed$length=Array
p=new Q.ia(0,new S.x(v,!1,H.d(p,s),0),0,0,0)
p.F(new S.B(0,0,0))
v=new S.B(0,0,0)
v.a=v.G(0,H.d([C.l],w))
l=D.w(16,!1)
k=new Array(16)
k.fixed$length=Array
k=new Q.jg(0,new S.x(l,!1,H.d(k,s),0),v.a,v.b,v.c)
k.F(v)
v=new S.B(0,0,0)
v.a=v.G(0,H.d([C.w],w))
l=D.w(16,!1)
j=new Array(16)
j.fixed$length=Array
j=new Q.ft(0,new S.x(l,!1,H.d(j,s),0),v.a,v.b,v.c)
j.F(v)
v=new S.B(0,0,0)
v.a=v.G(0,H.d([C.l,C.w,C.q,C.j],w))
l=H.d([C.r,C.i,C.h],w)
v.a=v.G(v.a,l)
l=D.w(16,!1)
i=new Array(16)
i.fixed$length=Array
i=new Q.h3(10.185916357881302,0,new S.x(l,!1,H.d(i,s),0),v.a,v.b,v.c)
i.F(v)
v=new S.B(0,0,0)
v.a=v.G(0,H.d([C.i,C.p,C.q,C.aj,C.Q,C.h,C.k,C.l,C.j],w))
l=D.w(16,!1)
h=new Array(16)
h.fixed$length=Array
h=new Q.iW(0,new S.x(l,!1,H.d(h,s),0),v.a,v.b,v.c)
h.F(v)
v=new S.B(0,0,0)
v.a=v.G(0,H.d([C.ai,C.k,C.P],w))
l=D.w(16,!1)
g=new Array(16)
g.fixed$length=Array
g=new Q.iV(0,new S.x(l,!1,H.d(g,s),0),v.a,v.b,v.c)
g.F(v)
v=this.d
l=D.w(16,!1)
f=new Array(16)
f.fixed$length=Array
f=new L.j2(v,0,new S.x(l,!1,H.d(f,s),0),0,0,0)
f.F(new S.B(0,0,0))
l=new S.B(0,0,0)
l.a=l.G(0,H.d([C.O],w))
e=H.d([C.i,C.h,C.k,C.q,C.l,C.j],w)
l.a=l.G(l.a,e)
e=P.n
d=P.dA
c=D.w(16,!1)
b=new Array(16)
b.fixed$length=Array
b=new M.hc(C.C,6,0,null,null,null,null,null,P.L(e,d),!0,0,new S.x(c,!1,H.d(b,s),0),l.a,l.b,l.c)
b.F(l)
b.a$=v
b.aF=b.gaC()
l=new S.B(0,0,0)
l.a=l.G(0,H.d([C.r,C.w],w))
c=H.d([C.i,C.h,C.k,C.q,C.l,C.j],w)
l.a=l.G(l.a,c)
c=D.w(16,!1)
a=new Array(16)
a.fixed$length=Array
a=new M.id(3,C.C,6,0,null,null,null,null,null,P.L(e,d),!0,0,new S.x(c,!1,H.d(a,s),0),l.a,l.b,l.c)
a.F(l)
a.a$=v
a.aF=a.gaC()
l=$.$get$bU()
c=l.W()
a0=l.W()
a1=P.D
a2=new Float32Array(H.dk(H.d([0,0,0],[a1])))
a3=D.w(16,!1)
a4=new Array(16)
a4.fixed$length=Array
a4=new M.fi(-5e5+c*1e6,-5e5+a0*1e6,a2,1,null,null,null,null,null,P.L(e,d),!0,0,new S.x(a3,!1,H.d(a4,s),0),0,0,0)
a4.F(new S.B(0,0,0))
a4.a$=v
a2[0]=l.W()
a2[1]=l.W()
a2[2]=l.W()
a4.cV=0.4
l=new S.B(0,0,0)
l.a=l.G(0,H.d([C.i,C.ah,C.k],w))
a2=D.w(16,!1)
a3=new Array(16)
a3.fixed$length=Array
a3=new L.ib(0,null,null,null,null,null,P.L(e,d),!0,0,new S.x(a2,!1,H.d(a3,s),0),l.a,l.b,l.c)
a3.F(l)
a3.a$=v
v=this.id
l=D.w(16,!1)
a2=new Array(16)
a2.fixed$length=Array
a2=new L.fp(v,"white",0,new S.x(l,!1,H.d(a2,s),0),0,0,0)
a2.F(new S.B(0,0,0))
l=this.k1
v=H.d([],[M.bt])
d=new S.B(0,0,0)
d.a=d.G(0,H.d([C.r,C.h],w))
e=D.w(16,!1)
a0=new Array(16)
a0.fixed$length=Array
a0=new M.iA(l,v,0,new S.x(e,!1,H.d(a0,s),0),d.a,d.b,d.c)
a0.F(d)
d=this.k1
a1=P.hV(20,new L.he(),!1,a1)
e=D.w(16,!1)
v=new Array(16)
v.fixed$length=Array
v=new L.hd(a1,"white",d,0,new S.x(e,!1,H.d(v,s),0),0,0,0)
v.F(new S.B(0,0,0))
e=this.k1
d=D.w(16,!1)
a1=new Array(16)
a1.fixed$length=Array
a1=new E.fM(e,y,0,0,0,0,new S.x(d,!1,H.d(a1,s),0),0,0,0)
a1.F(new S.B(0,0,0))
C.b.q(C.t,a1.ge8())
d=new S.B(0,0,0)
d.a=d.G(0,H.d([C.P],w))
y=D.w(16,!1)
e=new Array(16)
e.fixed$length=Array
e=new Q.h7(0,new S.x(y,!1,H.d(e,s),0),d.a,d.b,d.c)
e.F(d)
d=new S.B(0,0,0)
d.c=d.G(0,H.d([C.p,C.j],w))
w=D.w(16,!1)
y=new Array(16)
y.fixed$length=Array
s=new Q.iE(0,new S.x(w,!1,H.d(y,s),0),d.a,d.b,d.c)
s.F(d)
d=[S.ae]
P.d0([0,H.d([t,o,q,r,u,n,m,p,k,j,i,h,g,f,b,a,a4,a3,a2,a0,v,a1,e,s],d),1,H.d([],d)],x,[P.l,S.ae]).q(0,new L.hy(this,z))
return P.cS(z,null,!1,null)},
de:function(a,b,c){var z,y
a.width=b
a.height=c
z=a.style
y=""+b+"px"
z.width=y
y=""+c+"px"
z.height=y}},
hw:{"^":"c;",
$1:function(a){return document.querySelector("canvas").webkitRequestFullscreen()}},
hr:{"^":"c:9;a",
$1:function(a){return}},
hs:{"^":"c:9;a",
$1:function(a){return this.a.ej()}},
ht:{"^":"c:9;a",
$1:function(a){return}},
ho:{"^":"c;a",
$1:function(a){var z,y
z=this.a
y=z.ch
if(null!=y)J.ac(y,new L.hn(z))}},
hn:{"^":"c:29;a",
$2:function(a,b){var z=this.a
J.ac(b,new L.hm(z.cx.b.h(0,H.e(a)+".png").c.a1(0,z.cx.b.h(0,H.e(a)+".png").d)))}},
hm:{"^":"c;a",
$1:function(a){var z=a.a
z.toString
a.a=new H.c7(z,new L.hl(this.a),[H.z(z,0),T.cg]).c0(0)}},
hl:{"^":"c;a",
$1:function(a){return a.m(0,this.a)}},
hq:{"^":"c:6;a",
$1:function(a){var z=this.a.Q
z.Q.q(0,z.gfj())
C.b.q(z.y,z.gfk())}},
hz:{"^":"c:30;a",
$1:function(a){var z=this.a
z.eD()
return z}},
hu:{"^":"c;",
$1:function(a){return a.y===1}},
hv:{"^":"c;",
$0:function(){return}},
hp:{"^":"c;a",
$1:function(a){return this.a.dj(0,a/1000)}},
hA:{"^":"c;a",
$1:function(a){return this.a.dj(0,a/1000)}},
hy:{"^":"c:31;a,b",
$2:function(a,b){var z,y,x,w,v,u,t,s
for(z=J.S(b),y=this.a,x=this.b,w=y.e.a;z.t();){v=z.gv(z)
y.Q.eM(v,a)
if(!!J.y(v).$isde){u=v.gd3()
t=v.gau()
s=v.gaW()
x.push(L.lL(u==null?w:u,t,s).a_(new L.hx(v),null))}}}},
hx:{"^":"c;a",
$1:function(a){this.a.c$=a}},
ls:{"^":"bc+de;"},
lt:{"^":"ae+de;"}}],["","",,F,{"^":"",
dr:function(a,b,c){var z,y,x,w,v
if(b===0){z=c
y=z
x=y}else{w=c<0.5?c*(1+b):c+b-c*b
v=2*c-w
x=F.dl(v,w,a+0.3333333333333333)
y=F.dl(v,w,a)
z=F.dl(v,w,a-0.3333333333333333)}return H.d([x,y,z],[P.D])},
dl:function(a,b,c){var z
if(c<0)z=c+1
else z=c>1?c-1:c
if(z<0.16666666666666666)return a+(b-a)*6*z
if(z<0.5)return b
if(z<0.6666666666666666)return a+(b-a)*(0.6666666666666666-z)*6
return a},
cu:function(a,b,c){var z,y,x,w,v,u,t
z=Math.max(Math.max(H.ak(a),H.ak(b)),H.ak(c))
y=Math.min(Math.min(H.ak(a),H.ak(b)),H.ak(c))
x=z+y
w=x/2
if(z===y){v=0
u=0}else{t=z-y
u=w>0.5?t/(2-z-y):t/x
if(z===a){x=b<c?6:0
v=(b-c)/t+x}else if(z===b)v=(c-a)/t+2
else v=z===c?(a-b)/t+4:null
v/=6}return H.d([v,u,w],[P.D])},
jS:{"^":"a8;",
u:function(a){this.be(0)
this.b=S.i(this.a,F.M)
this.c=S.i(this.a,F.af)
this.d=this.a.z.h(0,new H.r(F.aQ))
this.e=this.a.z.h(0,new H.r(S.b7))}},
M:{"^":"t;n:a>,p:b>"},
af:{"^":"t;bB:a'"},
ca:{"^":"t;"},
az:{"^":"t;a,b,c,d,e,f,0r,0x,0y",w:{
bB:function(a,b,c,d){var z,y,x,w,v
z=new F.az(null,null,null,d,c,null)
y=F.dr(a,b,c)
x=y[0]
z.a=x
w=y[1]
z.b=w
v=y[2]
z.c=v
z.r=x
z.x=w
z.y=v
z.f=d
return z}}},
aQ:{"^":"a8;0a6:b',0c,d,0a"},
bv:{"^":"jS;0b,0c,0d,0e,0a",
aU:function(){var z,y,x,w
z=this.e.b.h(0,"player")
y=this.b.b
x=z.a
w=y.a[x]
return this.cO(w.a,w.b)},
cO:function(a,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
z=this.e.b.h(0,"player")
this.c.b
z.a
y=new Float32Array(16)
new T.bq(y).bd()
x=new Float32Array(16)
w=new T.bq(x)
w.bd()
v=Math.sin(0)
u=new T.aG(new Float32Array(3))
u.aL(400+100*v,550,-150)
v=new T.aG(new Float32Array(3))
v.aL(400,200,150)
t=new T.aG(new Float32Array(3))
t.aL(0,1,0)
s=u.a1(0,v)
s.bV(0)
r=t.cQ(s)
r.bV(0)
q=s.cQ(r)
q.bV(0)
t=r.bL(u)
v=q.bL(u)
u=s.bL(u)
p=r.a
o=p[0]
n=q.a
m=n[0]
l=s.a
k=l[0]
j=p[1]
i=n[1]
h=l[1]
p=p[2]
n=n[2]
l=l[2]
y[15]=1
y[14]=-u
y[13]=-v
y[12]=-t
y[11]=0
y[10]=l
y[9]=n
y[8]=p
y[7]=0
y[6]=h
y[5]=i
y[4]=j
y[3]=0
y[2]=k
y[1]=m
y[0]=o
g=Math.tan(0.7853981633974483)
w.c7()
x[0]=1/(g*1.3333333333333333)
x[5]=1/g
x[10]=-1.002002002002002
x[11]=-1
x[14]=-2.002002002002002
y=new Float32Array(16)
f=new T.bq(y)
f.bd()
x=this.d
e=x.b/x.c
if(e>1.3333333333333333){d=C.c.ag(600*e)
g=600}else{g=C.a.dP(800,e)
d=800}x=d/2
v=a-x
x=a+x
u=g/2
t=a0-u
u=a0+u
c=x-v
b=u-t
f.c7()
y[0]=2/c
y[5]=2/b
y[10]=0.004
y[12]=-(x+v)/c
y[13]=-(u+t)/b
y[14]=0
y[15]=1
this.d.d
return f}}}],["","",,A,{"^":"",
cq:function(a){var z,y
z=C.a9.bQ(a,0,new A.m7(),P.A)
y=536870911&z+((67108863&z)<<3)
y^=y>>>11
return 536870911&y+((16383&y)<<15)},
m7:{"^":"c:32;",
$2:function(a,b){var z=536870911&a+J.ax(b)
z=536870911&z+((524287&z)<<10)
return z^z>>>6}}}],["","",,T,{"^":"",bq:{"^":"b;a",
V:function(a){var z,y
z=a.a
y=this.a
y[15]=z[15]
y[14]=z[14]
y[13]=z[13]
y[12]=z[12]
y[11]=z[11]
y[10]=z[10]
y[9]=z[9]
y[8]=z[8]
y[7]=z[7]
y[6]=z[6]
y[5]=z[5]
y[4]=z[4]
y[3]=z[3]
y[2]=z[2]
y[1]=z[1]
y[0]=z[0]},
k:function(a){return"[0] "+this.aJ(0).k(0)+"\n[1] "+this.aJ(1).k(0)+"\n[2] "+this.aJ(2).k(0)+"\n[3] "+this.aJ(3).k(0)+"\n"},
h:function(a,b){return this.a[b]},
j:function(a,b,c){this.a[b]=c},
M:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.bq){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]&&z[4]===x[4]&&z[5]===x[5]&&z[6]===x[6]&&z[7]===x[7]&&z[8]===x[8]&&z[9]===x[9]&&z[10]===x[10]&&z[11]===x[11]&&z[12]===x[12]&&z[13]===x[13]&&z[14]===x[14]&&z[15]===x[15]}else z=!1
return z},
gD:function(a){return A.cq(this.a)},
aJ:function(a){var z,y
z=new Float32Array(4)
y=this.a
z[0]=y[a]
z[1]=y[4+a]
z[2]=y[8+a]
z[3]=y[12+a]
return new T.ai(z)},
m:function(a,b){var z=new T.bq(new Float32Array(16))
z.V(this)
z.l(0,b)
return z},
a1:function(a,b){var z,y,x
z=new Float32Array(16)
y=new T.bq(z)
y.V(this)
x=b.a
z[0]=z[0]-x[0]
z[1]=z[1]-x[1]
z[2]=z[2]-x[2]
z[3]=z[3]-x[3]
z[4]=z[4]-x[4]
z[5]=z[5]-x[5]
z[6]=z[6]-x[6]
z[7]=z[7]-x[7]
z[8]=z[8]-x[8]
z[9]=z[9]-x[9]
z[10]=z[10]-x[10]
z[11]=z[11]-x[11]
z[12]=z[12]-x[12]
z[13]=z[13]-x[13]
z[14]=z[14]-x[14]
z[15]=z[15]-x[15]
return y},
fN:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.y(b)
y=!!z.$isai
x=y?b.ghg(b):1
if(!!z.$isaG){w=b.gn(b)
v=b.gp(b)
u=b.gfO(b)}else if(y){w=b.gn(b)
v=b.gp(b)
u=b.gfO(b)}else if(typeof b==="number"){u=d
v=c
w=b}else{w=null
v=null
u=null}z=this.a
y=z[0]
t=z[4]
s=z[8]
r=z[12]
q=z[1]
p=z[5]
o=z[9]
n=z[13]
m=z[2]
l=z[6]
k=z[10]
j=z[14]
i=z[3]
h=z[7]
g=z[11]
f=z[15]
z[12]=y*w+t*v+s*u+r*x
z[13]=q*w+p*v+o*u+n*x
z[14]=m*w+l*v+k*u+j*x
z[15]=i*w+h*v+g*u+f*x},
c2:function(a,b,c){return this.fN(a,b,c,0)},
dt:function(a,b,c,d){var z,y,x,w
if(typeof b==="number"){z=c==null?b:c
y=b
x=y}else{x=null
z=null
y=null}w=this.a
w[0]=w[0]*x
w[1]=w[1]*x
w[2]=w[2]*x
w[3]=w[3]*x
w[4]=w[4]*z
w[5]=w[5]*z
w[6]=w[6]*z
w[7]=w[7]*z
w[8]=w[8]*y
w[9]=w[9]*y
w[10]=w[10]*y
w[11]=w[11]*y
w[12]=w[12]
w[13]=w[13]
w[14]=w[14]
w[15]=w[15]},
ds:function(a,b,c){return this.dt(a,b,c,null)},
c7:function(){var z=this.a
z[0]=0
z[1]=0
z[2]=0
z[3]=0
z[4]=0
z[5]=0
z[6]=0
z[7]=0
z[8]=0
z[9]=0
z[10]=0
z[11]=0
z[12]=0
z[13]=0
z[14]=0
z[15]=0},
bd:function(){var z=this.a
z[0]=1
z[1]=0
z[2]=0
z[3]=0
z[4]=0
z[5]=1
z[6]=0
z[7]=0
z[8]=0
z[9]=0
z[10]=1
z[11]=0
z[12]=0
z[13]=0
z[14]=0
z[15]=1},
cM:function(a8){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7
z=a8.a
y=z[0]
x=z[1]
w=z[2]
v=z[3]
u=z[4]
t=z[5]
s=z[6]
r=z[7]
q=z[8]
p=z[9]
o=z[10]
n=z[11]
m=z[12]
l=z[13]
k=z[14]
j=z[15]
i=y*t-x*u
h=y*s-w*u
g=y*r-v*u
f=x*s-w*t
e=x*r-v*t
d=w*r-v*s
c=q*l-p*m
b=q*k-o*m
a=q*j-n*m
a0=p*k-o*l
a1=p*j-n*l
a2=o*j-n*k
a3=i*a2-h*a1+g*a0+f*a-e*b+d*c
if(a3===0){this.V(a8)
return 0}a4=1/a3
a5=this.a
a5[0]=(t*a2-s*a1+r*a0)*a4
a5[1]=(-x*a2+w*a1-v*a0)*a4
a5[2]=(l*d-k*e+j*f)*a4
a5[3]=(-p*d+o*e-n*f)*a4
a6=-u
a5[4]=(a6*a2+s*a-r*b)*a4
a5[5]=(y*a2-w*a+v*b)*a4
a7=-m
a5[6]=(a7*d+k*g-j*h)*a4
a5[7]=(q*d-o*g+n*h)*a4
a5[8]=(u*a1-t*a+r*c)*a4
a5[9]=(-y*a1+x*a-v*c)*a4
a5[10]=(m*e-l*g+j*i)*a4
a5[11]=(-q*e+p*g-n*i)*a4
a5[12]=(a6*a0+t*b-s*c)*a4
a5[13]=(y*a0-x*b+w*c)*a4
a5[14]=(a7*f+l*h-k*i)*a4
a5[15]=(q*f-p*h+o*i)*a4
return a3},
l:function(a,b){var z,y
z=b.gfZ()
y=this.a
y[0]=C.c.m(y[0],z.h(0,0))
y[1]=C.c.m(y[1],z.h(0,1))
y[2]=C.c.m(y[2],z.h(0,2))
y[3]=C.c.m(y[3],z.h(0,3))
y[4]=C.c.m(y[4],z.h(0,4))
y[5]=C.c.m(y[5],z.h(0,5))
y[6]=C.c.m(y[6],z.h(0,6))
y[7]=C.c.m(y[7],z.h(0,7))
y[8]=C.c.m(y[8],z.h(0,8))
y[9]=C.c.m(y[9],z.h(0,9))
y[10]=C.c.m(y[10],z.h(0,10))
y[11]=C.c.m(y[11],z.h(0,11))
y[12]=C.c.m(y[12],z.h(0,12))
y[13]=C.c.m(y[13],z.h(0,13))
y[14]=C.c.m(y[14],z.h(0,14))
y[15]=C.c.m(y[15],z.h(0,15))},
fM:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
b=new T.ai(new Float32Array(4))
b.V(a)
z=b.a
y=this.a
x=y[0]
w=z[0]
v=y[4]
u=z[1]
t=y[8]
s=z[2]
r=y[12]
q=z[3]
p=y[1]
o=y[5]
n=y[9]
m=y[13]
l=y[2]
k=y[6]
j=y[10]
i=y[14]
h=y[3]
g=y[7]
f=y[11]
y=y[15]
z[0]=x*w+v*u+t*s+r*q
z[1]=p*w+o*u+n*s+m*q
z[2]=l*w+k*u+j*s+i*q
z[3]=h*w+g*u+f*s+y*q
return b},
b7:function(a){return this.fM(a,null)}},cg:{"^":"b;a",
V:function(a){var z,y
z=a.a
y=this.a
y[1]=z[1]
y[0]=z[0]},
k:function(a){var z=this.a
return"["+H.e(z[0])+","+H.e(z[1])+"]"},
M:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.cg){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]}else z=!1
return z},
gD:function(a){return A.cq(this.a)},
a1:function(a,b){var z,y,x
z=new Float32Array(2)
y=new T.cg(z)
y.V(this)
x=b.a
z[0]=z[0]-x[0]
z[1]=z[1]-x[1]
return y},
m:function(a,b){var z=new T.cg(new Float32Array(2))
z.V(this)
z.l(0,b)
return z},
h:function(a,b){return this.a[b]},
j:function(a,b,c){this.a[b]=c},
gi:function(a){var z,y
z=this.a
y=z[0]
z=z[1]
return Math.sqrt(y*y+z*z)},
l:function(a,b){var z,y
z=b.a
y=this.a
y[0]=y[0]+z[0]
y[1]=y[1]+z[1]},
gn:function(a){return this.a[0]},
gp:function(a){return this.a[1]}},aG:{"^":"b;a",
aL:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c},
V:function(a){var z,y
z=a.a
y=this.a
y[0]=z[0]
y[1]=z[1]
y[2]=z[2]},
k:function(a){var z=this.a
return"["+H.e(z[0])+","+H.e(z[1])+","+H.e(z[2])+"]"},
M:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.aG){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]}else z=!1
return z},
gD:function(a){return A.cq(this.a)},
a1:function(a,b){var z,y,x
z=new Float32Array(3)
y=new T.aG(z)
y.V(this)
x=b.a
z[0]=z[0]-x[0]
z[1]=z[1]-x[1]
z[2]=z[2]-x[2]
return y},
m:function(a,b){var z=new T.aG(new Float32Array(3))
z.V(this)
z.l(0,b)
return z},
h:function(a,b){return this.a[b]},
j:function(a,b,c){this.a[b]=c},
gi:function(a){return Math.sqrt(this.gd2())},
gd2:function(){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return y*y+x*x+z*z},
bV:function(a){var z,y,x
z=Math.sqrt(this.gd2())
if(z===0)return 0
y=1/z
x=this.a
x[0]=x[0]*y
x[1]=x[1]*y
x[2]=x[2]*y
return z},
bL:function(a){var z,y
z=a.a
y=this.a
return y[0]*z[0]+y[1]*z[1]+y[2]*z[2]},
cQ:function(a){var z,y,x,w,v,u,t,s
z=this.a
y=z[0]
x=z[1]
w=z[2]
v=a.a
u=v[0]
t=v[1]
s=v[2]
z=new T.aG(new Float32Array(3))
z.aL(x*s-w*t,w*u-y*s,y*t-x*u)
return z},
l:function(a,b){var z,y
z=b.gh6()
y=this.a
y[0]=C.c.m(y[0],z.h(0,0))
y[1]=C.c.m(y[1],z.h(0,1))
y[2]=C.c.m(y[2],z.h(0,2))},
gn:function(a){return this.a[0]},
gp:function(a){return this.a[1]}},ai:{"^":"b;a",
aM:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a},
V:function(a){var z,y
z=a.a
y=this.a
y[3]=z[3]
y[2]=z[2]
y[1]=z[1]
y[0]=z[0]},
k:function(a){var z=this.a
return H.e(z[0])+","+H.e(z[1])+","+H.e(z[2])+","+H.e(z[3])},
M:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.ai){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]}else z=!1
return z},
gD:function(a){return A.cq(this.a)},
a1:function(a,b){var z,y,x
z=new Float32Array(4)
y=new T.ai(z)
y.V(this)
x=b.a
z[0]=z[0]-x[0]
z[1]=z[1]-x[1]
z[2]=z[2]-x[2]
z[3]=z[3]-x[3]
return y},
m:function(a,b){var z=new T.ai(new Float32Array(4))
z.V(this)
z.l(0,b)
return z},
h:function(a,b){return this.a[b]},
j:function(a,b,c){this.a[b]=c},
gi:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(y*y+x*x+w*w+z*z)},
l:function(a,b){var z,y
z=b.gh7()
y=this.a
y[0]=C.c.m(y[0],z.h(0,0))
y[1]=C.c.m(y[1],z.h(0,1))
y[2]=C.c.m(y[2],z.h(0,2))
y[3]=C.c.m(y[3],z.h(0,3))},
gn:function(a){return this.a[0]},
gp:function(a){return this.a[1]}}}],["","",,F,{"^":"",
eZ:function(){var z=W.jd("wss://ws.damacreat.io/v0/",null)
W.Y(z,"open",new F.mi(z),!1)},
mi:{"^":"c;a",
$1:function(a){var z,y,x,w,v,u
z=this.a
y=B.j5(z,!1)
x=P.e7(null,null,null,null,!1,P.aK)
w=document
v=w.querySelector("#game")
u=H.me(w.querySelector("#game"),"$iscM")
u=(u&&C.V).dn(u,"webgl2")
x=new F.hk(y,x,v,null,u,new L.hB("damacreat_io",null),null,null,null,!0,!1,null,!1,!1,!1,!1)
x.dR("damacreat_io","#game",null,!0,null,!1,null,null,!1,!0)
x.k2=w.querySelector("#gamecontainer")
w=w.querySelector("#hud")
x.id=w
w.toString
x.k1=w.getContext("2d")
x.co()
x.dv(0)
C.ak.fe(window).bS(new F.mh(z))}},
mh:{"^":"c;a",
$1:function(a){this.a.close()}}},1]]
setupProgram(dart,0,0)
J.y=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cW.prototype
return J.dU.prototype}if(typeof a=="string")return J.bH.prototype
if(a==null)return J.dV.prototype
if(typeof a=="boolean")return J.hN.prototype
if(a.constructor==Array)return J.bn.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bo.prototype
return a}if(a instanceof P.b)return a
return J.bT(a)}
J.bS=function(a){if(typeof a=="number")return J.aW.prototype
if(typeof a=="string")return J.bH.prototype
if(a==null)return a
if(a.constructor==Array)return J.bn.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bo.prototype
return a}if(a instanceof P.b)return a
return J.bT(a)}
J.Z=function(a){if(typeof a=="string")return J.bH.prototype
if(a==null)return a
if(a.constructor==Array)return J.bn.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bo.prototype
return a}if(a instanceof P.b)return a
return J.bT(a)}
J.a3=function(a){if(a==null)return a
if(a.constructor==Array)return J.bn.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bo.prototype
return a}if(a instanceof P.b)return a
return J.bT(a)}
J.eV=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cW.prototype
return J.aW.prototype}if(a==null)return a
if(!(a instanceof P.b))return J.bP.prototype
return a}
J.aM=function(a){if(typeof a=="number")return J.aW.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.bP.prototype
return a}
J.m5=function(a){if(typeof a=="number")return J.aW.prototype
if(typeof a=="string")return J.bH.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.bP.prototype
return a}
J.an=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.bo.prototype
return a}if(a instanceof P.b)return a
return J.bT(a)}
J.aq=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.bS(a).m(a,b)}
J.a5=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.y(a).M(a,b)}
J.ab=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.aM(a).bb(a,b)}
J.cw=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.aM(a).ao(a,b)}
J.du=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.m5(a).c6(a,b)}
J.cx=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.aM(a).a1(a,b)}
J.cy=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.eY(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.Z(a).h(a,b)}
J.cz=function(a,b,c){if(typeof b==="number")if((a.constructor==Array||H.eY(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.a3(a).j(a,b,c)}
J.cA=function(a,b){return J.a3(a).l(a,b)}
J.f5=function(a,b,c,d){return J.an(a).cI(a,b,c,d)}
J.cB=function(a){return J.a3(a).C(a)}
J.cC=function(a,b,c){return J.Z(a).eY(a,b,c)}
J.f6=function(a,b){return J.a3(a).A(a,b)}
J.f7=function(a,b,c){return J.a3(a).cS(a,b,c)}
J.ac=function(a,b){return J.a3(a).q(a,b)}
J.ax=function(a){return J.y(a).gD(a)}
J.cD=function(a){return J.Z(a).gR(a)}
J.bV=function(a){return J.Z(a).gO(a)}
J.S=function(a){return J.a3(a).gJ(a)}
J.a6=function(a){return J.Z(a).gi(a)}
J.f8=function(a){return J.an(a).gfq(a)}
J.f9=function(a){return J.an(a).gd7(a)}
J.fa=function(a){return J.a3(a).gdf(a)}
J.dv=function(a){return J.y(a).gL(a)}
J.fb=function(a){return J.an(a).gay(a)}
J.bj=function(a){return J.an(a).gB(a)}
J.fc=function(a,b,c){return J.a3(a).bU(a,b,c)}
J.dw=function(a,b){return J.a3(a).E(a,b)}
J.dx=function(a){return J.aM(a).ag(a)}
J.bW=function(a){return J.y(a).k(a)}
J.fd=function(a,b){return J.a3(a).aI(a,b)}
I.bg=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.V=W.cM.prototype
C.f=W.fq.prototype
C.Y=W.h8.prototype
C.Z=W.cT.prototype
C.a_=J.f.prototype
C.b=J.bn.prototype
C.d=J.dU.prototype
C.a=J.cW.prototype
C.z=J.dV.prototype
C.c=J.aW.prototype
C.m=J.bH.prototype
C.a6=J.bo.prototype
C.a9=H.i5.prototype
C.aa=H.i7.prototype
C.o=H.i8.prototype
C.M=J.ic.prototype
C.x=J.bP.prototype
C.y=W.je.prototype
C.T=new H.h_()
C.U=new P.kI()
C.e=new P.l0()
C.W=new P.aB(0)
C.X=new P.aB(5000)
C.a0=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.a1=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
C.A=function(hooks) { return hooks; }

C.a2=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
C.a3=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
C.a4=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
C.a5=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
C.B=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.D=new B.W(0,"MessageToClient.initPlayerId")
C.E=new B.W(1,"MessageToClient.initPlayers")
C.F=new B.W(2,"MessageToClient.initFood")
C.G=new B.W(3,"MessageToClient.initGrowingFood")
C.H=new B.W(4,"MessageToClient.updatePosition")
C.I=new B.W(5,"MessageToClient.addConstantVelocity")
C.J=new B.W(6,"MessageToClient.startDigestion")
C.K=new B.W(7,"MessageToClient.removePlayers")
C.L=new B.W(8,"MessageToClient.deleteEntities")
C.u=new B.W(9,"MessageToClient.pong")
C.t=H.d(I.bg([C.D,C.E,C.F,C.G,C.H,C.I,C.J,C.K,C.L,C.u]),[B.W])
C.S=new L.cG("aPosition",2)
C.R=new L.cG("aColor",4)
C.C=H.d(I.bg([C.S,C.R]),[L.cG])
C.al=H.d(I.bg([]),[S.t])
C.a7=H.d(I.bg([]),[P.N])
C.v=new B.c8(0,"MessageToServer.updateVelocity")
C.n=new B.c8(1,"MessageToServer.ping")
C.a8=H.d(I.bg([C.v,C.n]),[B.c8])
C.ab=new P.Q(0,0,4369,4369,[P.D])
C.w=H.J(G.bl)
C.p=H.J(G.aR)
C.k=H.J(F.az)
C.ac=H.J(G.bC)
C.ad=H.J(G.cN)
C.N=H.J(G.aA)
C.ae=H.J(G.dK)
C.O=H.J(G.aU)
C.af=H.J(G.c4)
C.P=H.J(G.bJ)
C.ag=H.J(P.N)
C.j=H.J(G.aY)
C.q=H.J(F.af)
C.ah=H.J(F.ca)
C.r=H.J(G.aE)
C.i=H.J(F.M)
C.h=H.J(G.X)
C.ai=H.J(G.db)
C.aj=H.J(G.cd)
C.Q=H.J(G.at)
C.l=H.J(G.au)
C.ak=new W.k6("beforeunload")
$.ad=0
$.bk=null
$.dy=null
$.eX=null
$.eR=null
$.f1=null
$.co=null
$.cr=null
$.ds=null
$.be=null
$.bx=null
$.by=null
$.dm=!1
$.p=C.e
$.dI=null
$.dH=null
$.dG=null
$.dF=null
$.u=1
$.v=0
$.dL=0
$.eG=0
$.dj=null
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){var z=$dart_deferred_initializers$[a]
if(z==null)throw"DeferredLoading state error: code with hash '"+a+"' was not loaded"
z($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryParts={}
init.deferredPartUris=[]
init.deferredPartHashes=[];(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["dE","$get$dE",function(){return H.eW("_$dart_dartClosure")},"cX","$get$cX",function(){return H.eW("_$dart_js")},"ea","$get$ea",function(){return H.ah(H.ce({
toString:function(){return"$receiver$"}}))},"eb","$get$eb",function(){return H.ah(H.ce({$method$:null,
toString:function(){return"$receiver$"}}))},"ec","$get$ec",function(){return H.ah(H.ce(null))},"ed","$get$ed",function(){return H.ah(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"eh","$get$eh",function(){return H.ah(H.ce(void 0))},"ei","$get$ei",function(){return H.ah(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"ef","$get$ef",function(){return H.ah(H.eg(null))},"ee","$get$ee",function(){return H.ah(function(){try{null.$method$}catch(z){return z.message}}())},"ek","$get$ek",function(){return H.ah(H.eg(void 0))},"ej","$get$ej",function(){return H.ah(function(){try{(void 0).$method$}catch(z){return z.message}}())},"dh","$get$dh",function(){return P.jX()},"bz","$get$bz",function(){return[]},"dD","$get$dD",function(){return{}},"cI","$get$cI",function(){return H.i6(H.d([0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,4,5,5,6,5,6,6,7,5,6,6,7,6,7,7,8],[P.A]))},"ct","$get$ct",function(){var z=P.hS(null,null,null,B.c8,P.A)
P.hX(z,C.a8,null,new B.lY())
return z},"aS","$get$aS",function(){return P.L(P.bO,S.K)},"bU","$get$bU",function(){return C.U}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[]
init.types=[{func:1,ret:-1,args:[S.a_]},{func:1,ret:-1,args:[N.bb]},{func:1,ret:-1,args:[,,]},{func:1,ret:-1,args:[,]},{func:1,ret:-1},{func:1,ret:-1,args:[P.n,,]},{func:1,ret:P.N,args:[,]},{func:1,ret:P.N,args:[,,]},{func:1,ret:-1,args:[P.b],opt:[P.bu]},{func:1,ret:[P.a1,,],args:[,]},{func:1,args:[,]},{func:1,ret:-1,args:[{func:1,ret:-1}]},{func:1,ret:-1,args:[B.W]},{func:1,ret:-1,args:[P.b]},{func:1,args:[,P.n]},{func:1,ret:P.A,args:[,]},{func:1,args:[,,]},{func:1,ret:-1,args:[P.n,P.n]},{func:1,ret:P.A,args:[M.bt,M.bt]},{func:1,ret:P.N,args:[[S.T,S.t],P.A]},{func:1,ret:-1,args:[S.t]},{func:1,ret:[P.R,,],args:[,]},{func:1,ret:-1,args:[S.ae]},{func:1,ret:P.aK,args:[P.A]},{func:1,ret:P.D,args:[P.D,P.D]},{func:1,ret:-1,args:[W.d_],named:{keyDown:P.aK}},{func:1,ret:-1,args:[P.E]},{func:1,ret:-1,args:[W.a7]},{func:1,ret:-1,args:[S.a8]},{func:1,ret:P.N,args:[P.n,[P.l,L.e2]]},{func:1,ret:L.c3,args:[,]},{func:1,ret:P.N,args:[P.A,[P.l,S.ae]]},{func:1,ret:P.A,args:[P.A,P.b]},{func:1,ret:P.N,args:[,],opt:[,]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
if(x==y)H.mr(d||a)
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.bg=a.bg
Isolate.bA=a.bA
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(F.eZ,[])
else F.eZ([])})})()
//# sourceMappingURL=main.dart.js.map
