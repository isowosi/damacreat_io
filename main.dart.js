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
b6.$isa=b5
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
init.leafTags[b9[b3]]=false}}b6.$deferredAction()}if(b6.$isj)b6.$deferredAction()}var a4=Object.keys(a5.pending)
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
var d=supportsDirectProtoAccess&&b2!="a"
for(var a0=0;a0<f.length;a0++){var a1=f[a0]
var a2=a1.charCodeAt(0)
if(a1==="q"){processStatics(init.statics[b2]=b3.q,b4)
delete b3.q}else if(a2===43){w[g]=a1.substring(1)
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
processClassData(e,d,a5)}}}function addStubs(c0,c1,c2,c3,c4){var g=0,f=g,e=c1[g],d
if(typeof e=="string")d=c1[++g]
else{d=e
e=c2}if(typeof d=="number"){f=d
d=c1[++g]}c0[c2]=c0[e]=d
var a0=[d]
d.$stubName=c2
c4.push(c2)
for(g++;g<c1.length;g++){d=c1[g]
if(typeof d!="function")break
if(!c3)d.$stubName=c1[++g]
a0.push(d)
if(d.$stubName){c0[d.$stubName]=d
c4.push(d.$stubName)}}for(var a1=0;a1<a0.length;g++,a1++)a0[a1].$callName=c1[g]
var a2=c1[g]
c1=c1.slice(++g)
var a3=c1[0]
var a4=(a3&1)===1
a3=a3>>1
var a5=a3>>1
var a6=(a3&1)===1
var a7=a3===3
var a8=a3===1
var a9=c1[1]
var b0=a9>>1
var b1=(a9&1)===1
var b2=a5+b0
var b3=c1[2]
if(typeof b3=="number")c1[2]=b3+c
if(b>0){var b4=3
for(var a1=0;a1<b0;a1++){if(typeof c1[b4]=="number")c1[b4]=c1[b4]+b
b4++}for(var a1=0;a1<b2;a1++){c1[b4]=c1[b4]+b
b4++}}var b5=2*b0+a5+3
if(a2){d=tearOff(a0,f,c1,c3,c2,a4)
c0[c2].$getter=d
d.$getterStub=true
if(c3)c4.push(a2)
c0[a2]=d
a0.push(d)
d.$stubName=a2
d.$callName=null}var b6=c1.length>b5
if(b6){a0[0].$reflectable=1
a0[0].$reflectionInfo=c1
for(var a1=1;a1<a0.length;a1++){a0[a1].$reflectable=2
a0[a1].$reflectionInfo=c1}var b7=c3?init.mangledGlobalNames:init.mangledNames
var b8=c1[b5]
var b9=b8
if(a2)b7[a2]=b9
if(a7)b9+="="
else if(!a8)b9+=":"+(a5+b0)
b7[c2]=b9
a0[0].$reflectionName=b9
for(var a1=b5+1;a1<c1.length;a1++)c1[a1]=c1[a1]+b
a0[0].$metadataIndex=b5+1
if(b0)c0[b8+"*"]=a0[f]}}Function.prototype.$1=function(d){return this(d)}
Function.prototype.$2=function(d,e){return this(d,e)}
Function.prototype.$0=function(){return this()}
Function.prototype.$3=function(d,e,f){return this(d,e,f)}
Function.prototype.$1$1=function(d){return this(d)}
Function.prototype.$2$1=function(d){return this(d)}
Function.prototype.$3$3=function(d,e,f){return this(d,e,f)}
Function.prototype.$2$2=function(d,e){return this(d,e)}
Function.prototype.$4=function(d,e,f,g){return this(d,e,f,g)}
Function.prototype.$3$1=function(d){return this(d)}
Function.prototype.$1$2=function(d,e){return this(d,e)}
Function.prototype.$5=function(d,e,f,g,a0){return this(d,e,f,g,a0)}
Function.prototype.$3$4=function(d,e,f,g){return this(d,e,f,g)}
Function.prototype.$2$4=function(d,e,f,g){return this(d,e,f,g)}
Function.prototype.$1$4=function(d,e,f,g){return this(d,e,f,g)}
Function.prototype.$3$6=function(d,e,f,g,a0,a1){return this(d,e,f,g,a0,a1)}
Function.prototype.$2$5=function(d,e,f,g,a0){return this(d,e,f,g,a0)}
function tearOffGetter(d,e,f,g,a0){return a0?new Function("funcs","applyTrampolineIndex","reflectionInfo","name","H","c","return function tearOff_"+g+y+++"(x) {"+"if (c === null) c = "+"H.f7"+"("+"this, funcs, applyTrampolineIndex, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(d,e,f,g,H,null):new Function("funcs","applyTrampolineIndex","reflectionInfo","name","H","c","return function tearOff_"+g+y+++"() {"+"if (c === null) c = "+"H.f7"+"("+"this, funcs, applyTrampolineIndex, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(d,e,f,g,H,null)}function tearOff(d,e,f,a0,a1,a2){var g
return a0?function(){if(g===void 0)g=H.f7(this,d,e,f,true,[],a1).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.co=function(){}
var dart=[["","",,H,{"^":"",vI:{"^":"a;a"}}],["","",,J,{"^":"",
fd:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
cS:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.fc==null){H.um()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.b(P.cc("Return interceptor for "+H.e(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$ec()]
if(v!=null)return v
v=H.us(a)
if(v!=null)return v
if(typeof a=="function")return C.aZ
y=Object.getPrototypeOf(a)
if(y==null)return C.aj
if(y===Object.prototype)return C.aj
if(typeof w=="function"){Object.defineProperty(w,$.$get$ec(),{value:C.Q,enumerable:false,writable:true,configurable:true})
return C.Q}return C.Q},
j:{"^":"a;",
T:function(a,b){return a===b},
gH:function(a){return H.bb(a)},
k:["h4",function(a){return"Instance of '"+H.c8(a)+"'"}],
dH:["h3",function(a,b){throw H.b(P.hi(a,b.gfm(),b.gfv(),b.gfo(),null))},null,"gfq",5,0,null,15],
"%":"ANGLEInstancedArrays|ANGLE_instanced_arrays|AnimationEffectReadOnly|AnimationEffectTiming|AnimationEffectTimingReadOnly|AnimationTimeline|AnimationWorkletGlobalScope|AudioListener|AudioTrack|AudioWorkletGlobalScope|AudioWorkletProcessor|AuthenticatorAssertionResponse|AuthenticatorAttestationResponse|AuthenticatorResponse|BackgroundFetchFetch|BackgroundFetchManager|BackgroundFetchSettledFetch|BarProp|BarcodeDetector|Bluetooth|BluetoothCharacteristicProperties|BluetoothRemoteGATTServer|BluetoothRemoteGATTService|BluetoothUUID|Body|BudgetService|BudgetState|CSS|CSSVariableReferenceValue|Cache|CacheStorage|CanvasGradient|CanvasPattern|Client|Clients|CookieStore|Coordinates|Credential|CredentialUserData|CredentialsContainer|Crypto|CryptoKey|CustomElementRegistry|DOMError|DOMFileSystem|DOMFileSystemSync|DOMImplementation|DOMMatrix|DOMMatrixReadOnly|DOMParser|DOMQuad|DOMStringMap|DataTransfer|DataTransferItem|Database|DeprecatedStorageInfo|DeprecatedStorageQuota|DeprecationReport|DetectedBarcode|DetectedFace|DetectedText|DeviceRotationRate|DirectoryEntry|DirectoryEntrySync|DirectoryReader|DirectoryReaderSync|DocumentOrShadowRoot|DocumentTimeline|EXTBlendMinMax|EXTColorBufferFloat|EXTColorBufferHalfFloat|EXTDisjointTimerQuery|EXTDisjointTimerQueryWebGL2|EXTFragDepth|EXTShaderTextureLOD|EXTTextureFilterAnisotropic|EXT_blend_minmax|EXT_frag_depth|EXT_sRGB|EXT_shader_texture_lod|EXT_texture_filter_anisotropic|EXTsRGB|Entry|EntrySync|External|FaceDetector|FederatedCredential|FileEntry|FileEntrySync|FileReaderSync|FileWriterSync|FontFace|FontFaceSource|FormData|GamepadPose|Geolocation|HTMLAllCollection|HTMLHyperlinkElementUtils|Headers|IDBFactory|IDBIndex|IDBKeyRange|IDBObserver|IDBObserverChanges|IdleDeadline|ImageBitmapRenderingContext|ImageCapture|InputDeviceCapabilities|IntersectionObserver|IntersectionObserverEntry|InterventionReport|Iterator|KeyframeEffect|KeyframeEffectReadOnly|MediaCapabilities|MediaCapabilitiesInfo|MediaDeviceInfo|MediaError|MediaKeyStatusMap|MediaKeySystemAccess|MediaKeys|MediaKeysPolicy|MediaMetadata|MediaSession|MediaSettingsRange|MemoryInfo|MessageChannel|Metadata|Mojo|MojoHandle|MojoWatcher|MutationObserver|MutationRecord|NFC|NavigationPreloadManager|Navigator|NavigatorAutomationInformation|NavigatorConcurrentHardware|NavigatorCookies|NavigatorUserMediaError|NodeFilter|NodeIterator|NonDocumentTypeChildNode|NonElementParentNode|NoncedElement|OESElementIndexUint|OESStandardDerivatives|OESTextureFloat|OESTextureFloatLinear|OESTextureHalfFloat|OESTextureHalfFloatLinear|OESVertexArrayObject|OES_element_index_uint|OES_standard_derivatives|OES_texture_float|OES_texture_float_linear|OES_texture_half_float|OES_texture_half_float_linear|OES_vertex_array_object|OffscreenCanvasRenderingContext2D|OverconstrainedError|PagePopupController|PaintRenderingContext2D|PaintWorkletGlobalScope|PasswordCredential|Path2D|PaymentAddress|PaymentInstruments|PaymentManager|PaymentResponse|PerformanceEntry|PerformanceLongTaskTiming|PerformanceMark|PerformanceMeasure|PerformanceNavigation|PerformanceNavigationTiming|PerformanceObserver|PerformanceObserverEntryList|PerformancePaintTiming|PerformanceResourceTiming|PerformanceServerTiming|PerformanceTiming|PeriodicWave|Permissions|PhotoCapabilities|Position|PositionError|Presentation|PresentationReceiver|PublicKeyCredential|PushManager|PushMessageData|PushSubscription|PushSubscriptionOptions|RTCCertificate|RTCIceCandidate|RTCLegacyStatsReport|RTCRtpContributingSource|RTCRtpReceiver|RTCRtpSender|RTCSessionDescription|RTCStatsResponse|Range|RelatedApplication|Report|ReportBody|ReportingObserver|Request|ResizeObserver|ResizeObserverEntry|Response|SQLError|SQLResultSet|SQLTransaction|SVGAnimatedAngle|SVGAnimatedBoolean|SVGAnimatedEnumeration|SVGAnimatedInteger|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedPreserveAspectRatio|SVGAnimatedRect|SVGAnimatedString|SVGAnimatedTransformList|SVGMatrix|SVGPreserveAspectRatio|SVGUnitTypes|ScrollState|ScrollTimeline|Selection|SharedArrayBuffer|SpeechRecognitionAlternative|SpeechSynthesisVoice|StaticRange|StorageManager|StyleMedia|StylePropertyMap|StylePropertyMapReadonly|SubtleCrypto|SyncManager|TaskAttributionTiming|TextDetector|TrackDefault|TreeWalker|TrustedHTML|TrustedScriptURL|TrustedURL|URLSearchParams|USBAlternateInterface|USBConfiguration|USBDevice|USBEndpoint|USBInTransferResult|USBInterface|USBIsochronousInTransferPacket|USBIsochronousInTransferResult|USBIsochronousOutTransferPacket|USBIsochronousOutTransferResult|USBOutTransferResult|UnderlyingSourceBase|VRCoordinateSystem|VRDisplayCapabilities|VREyeParameters|VRFrameData|VRFrameOfReference|VRPose|VRStageBounds|VRStageParameters|ValidityState|VideoPlaybackQuality|VideoTrack|WEBGL_compressed_texture_atc|WEBGL_compressed_texture_etc1|WEBGL_compressed_texture_pvrtc|WEBGL_compressed_texture_s3tc|WEBGL_debug_renderer_info|WEBGL_debug_shaders|WEBGL_depth_texture|WEBGL_draw_buffers|WEBGL_lose_context|WebGL|WebGL2RenderingContext|WebGL2RenderingContextBase|WebGLActiveInfo|WebGLCanvas|WebGLColorBufferFloat|WebGLCompressedTextureASTC|WebGLCompressedTextureATC|WebGLCompressedTextureETC|WebGLCompressedTextureETC1|WebGLCompressedTexturePVRTC|WebGLCompressedTextureS3TC|WebGLCompressedTextureS3TCsRGB|WebGLDebugRendererInfo|WebGLDebugShaders|WebGLDepthTexture|WebGLDrawBuffers|WebGLExtensionLoseContext|WebGLFramebuffer|WebGLGetBufferSubDataAsync|WebGLLoseContext|WebGLProgram|WebGLQuery|WebGLRenderbuffer|WebGLRenderingContext|WebGLSampler|WebGLShader|WebGLShaderPrecisionFormat|WebGLSync|WebGLTexture|WebGLTimerQueryEXT|WebGLTransformFeedback|WebGLUniformLocation|WebGLVertexArrayObject|WebGLVertexArrayObjectOES|WebKitMutationObserver|WindowClient|WorkerLocation|WorkerNavigator|Worklet|WorkletAnimation|WorkletGlobalScope|XMLSerializer|XPathEvaluator|XPathExpression|XPathNSResolver|XPathResult|XSLTProcessor|mozRTCIceCandidate|mozRTCSessionDescription"},
m3:{"^":"j;",
k:function(a){return String(a)},
gH:function(a){return a?519018:218159},
$isaG:1},
h1:{"^":"j;",
T:function(a,b){return null==b},
k:function(a){return"null"},
gH:function(a){return 0},
ga4:function(a){return C.bq},
dH:[function(a,b){return this.h3(a,b)},null,"gfq",5,0,null,15],
$isx:1},
de:{"^":"j;",
gH:function(a){return 0},
k:["h6",function(a){return String(a)}],
gdG:function(a){return a.isStable},
gdR:function(a){return a.whenStable},
$isdf:1},
mN:{"^":"de;"},
cd:{"^":"de;"},
c6:{"^":"de;",
k:function(a){var z=a[$.$get$e_()]
if(z==null)return this.h6(a)
return"JavaScript function for "+H.e(J.b5(z))},
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}},
$isc0:1},
c3:{"^":"j;$ti",
l:[function(a,b){if(!!a.fixed$length)H.F(P.h("add"))
a.push(b)},"$1","gj5",5,0,12,3],
kg:function(a,b){if(!!a.fixed$length)H.F(P.h("removeAt"))
if(b<0||b>=a.length)throw H.b(P.bu(b,null,null))
return a.splice(b,1)[0]},
jP:function(a,b,c){var z
if(!!a.fixed$length)H.F(P.h("insert"))
z=a.length
if(b>z)throw H.b(P.bu(b,null,null))
a.splice(b,0,c)},
C:function(a,b){var z
if(!!a.fixed$length)H.F(P.h("remove"))
for(z=0;z<a.length;++z)if(J.a5(a[z],b)){a.splice(z,1)
return!0}return!1},
iD:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(!b.$1(w))z.push(w)
if(a.length!==y)throw H.b(P.a1(a))}v=z.length
if(v===y)return
this.si(a,v)
for(x=0;x<z.length;++x)a[x]=z[x]},
cA:function(a,b){return new H.bf(a,b,[H.q(a,0)])},
f2:function(a,b,c){return new H.d9(a,b,[H.q(a,0),c])},
dh:function(a,b){var z
if(!!a.fixed$length)H.F(P.h("addAll"))
for(z=J.aa(b);z.m();)a.push(z.gu(z))},
ap:function(a){this.si(a,0)},
w:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.b(P.a1(a))}},
aL:function(a,b,c){return new H.bp(a,b,[H.q(a,0),c])},
a3:function(a,b){var z,y
z=new Array(a.length)
z.fixed$length=Array
for(y=0;y<a.length;++y)z[y]=H.e(a[y])
return z.join(b)},
cH:function(a,b){return H.er(a,b,null,H.q(a,0))},
ke:function(a,b){var z,y,x
z=a.length
if(z===0)throw H.b(H.fX())
y=a[0]
for(x=1;x<z;++x){y=b.$2(y,a[x])
if(z!==a.length)throw H.b(P.a1(a))}return y},
bn:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.b(P.a1(a))}return y},
jC:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x))return x
if(a.length!==z)throw H.b(P.a1(a))}return c.$0()},
E:function(a,b){return a[b]},
ag:function(a,b,c){if(b<0||b>a.length)throw H.b(P.M(b,0,a.length,"start",null))
if(c==null)c=a.length
else if(c<b||c>a.length)throw H.b(P.M(c,b,a.length,"end",null))
if(b===c)return H.d([],[H.q(a,0)])
return H.d(a.slice(b,c),[H.q(a,0)])},
gad:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.b(H.fX())},
bT:function(a,b,c,d,e){var z,y,x,w,v
if(!!a.immutable$list)H.F(P.h("setRange"))
P.aE(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
y=J.v(d)
if(!!y.$ism){x=e
w=d}else{w=y.cH(d,e).cu(0,!1)
x=0}y=J.J(w)
if(x+z>y.gi(w))throw H.b(H.fY())
if(x<b)for(v=z-1;v>=0;--v)a[b+v]=y.h(w,x+v)
else for(v=0;v<z;++v)a[b+v]=y.h(w,x+v)},
aR:function(a,b,c,d){return this.bT(a,b,c,d,0)},
bM:function(a,b,c,d){var z
if(!!a.immutable$list)H.F(P.h("fill range"))
P.aE(b,c,a.length,null,null,null)
for(z=b;z.aQ(0,c);z=z.L(0,1))a[z]=d},
fV:function(a,b){if(!!a.immutable$list)H.F(P.h("sort"))
H.nD(a,b==null?J.tl():b)},
ji:function(a,b){var z
for(z=0;z<a.length;++z)if(J.a5(a[z],b))return!0
return!1},
gW:function(a){return a.length===0},
gX:function(a){return a.length!==0},
k:function(a){return P.e7(a,"[","]")},
gI:function(a){return new J.d0(a,a.length,0)},
gH:function(a){return H.bb(a)},
gi:function(a){return a.length},
si:function(a,b){if(!!a.fixed$length)H.F(P.h("set length"))
if(b<0)throw H.b(P.M(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(H.aH(a,b))
if(b>=a.length||b<0)throw H.b(H.aH(a,b))
return a[b]},
j:function(a,b,c){if(!!a.immutable$list)H.F(P.h("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(H.aH(a,b))
if(b>=a.length||b<0)throw H.b(H.aH(a,b))
a[b]=c},
L:function(a,b){var z,y
z=a.length+J.Z(b)
y=H.d([],[H.q(a,0)])
this.si(y,z)
this.aR(y,0,a.length,a)
this.aR(y,a.length,z,b)
return y},
$isw:1,
$asw:I.co,
$isn:1,
$isl:1,
$ism:1,
q:{
m2:function(a,b){if(typeof a!=="number"||Math.floor(a)!==a)throw H.b(P.d_(a,"length","is not an integer"))
if(a<0||a>4294967295)throw H.b(P.M(a,0,4294967295,"length",null))
return J.fZ(new Array(a),b)},
fZ:function(a,b){return J.c4(H.d(a,[b]))},
c4:function(a){a.fixed$length=Array
return a},
h_:function(a){a.fixed$length=Array
a.immutable$list=Array
return a},
vG:[function(a,b){return J.jn(a,b)},"$2","tl",8,0,64]}},
vH:{"^":"c3;$ti"},
d0:{"^":"a;a,b,c,0d",
gu:function(a){return this.d},
m:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.b(H.aA(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
bm:{"^":"j;",
aX:function(a,b){var z
if(typeof b!=="number")throw H.b(H.N(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gcl(b)
if(this.gcl(a)===z)return 0
if(this.gcl(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gcl:function(a){return a===0?1/a<0:a<0},
b6:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.b(P.h(""+a+".toInt()"))},
ao:function(a){var z,y
if(a>=0){if(a<=2147483647){z=a|0
return a===z?z:z+1}}else if(a>=-2147483648)return a|0
y=Math.ceil(a)
if(isFinite(y))return y
throw H.b(P.h(""+a+".ceil()"))},
f7:function(a){var z,y
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){z=a|0
return a===z?z:z-1}y=Math.floor(a)
if(isFinite(y))return y
throw H.b(P.h(""+a+".floor()"))},
a5:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.b(P.h(""+a+".round()"))},
cv:function(a,b){var z
if(b>20)throw H.b(P.M(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gcl(a))return"-"+z
return z},
bQ:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.b(P.M(b,2,36,"radix",null))
z=a.toString(b)
if(C.a.S(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.F(P.h("Unexpected toString result: "+z))
x=J.J(y)
z=x.h(y,1)
w=+x.h(y,3)
if(x.h(y,2)!=null){z+=x.h(y,2)
w-=x.h(y,2).length}return z+C.a.al("0",w)},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gH:function(a){return a&0x1FFFFFFF},
aC:function(a){return-a},
L:function(a,b){if(typeof b!=="number")throw H.b(H.N(b))
return a+b},
at:function(a,b){if(typeof b!=="number")throw H.b(H.N(b))
return a-b},
aB:function(a,b){if(typeof b!=="number")throw H.b(H.N(b))
return a/b},
al:function(a,b){if(typeof b!=="number")throw H.b(H.N(b))
return a*b},
a6:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
hh:function(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.eI(a,b)},
R:function(a,b){return(a|0)===a?a/b|0:this.eI(a,b)},
eI:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.b(P.h("Result of truncating division is "+H.e(z)+": "+H.e(a)+" ~/ "+b))},
iQ:function(a,b){return b>31?0:a<<b>>>0},
aU:function(a,b){var z
if(a>0)z=this.eF(a,b)
else{z=b>31?31:b
z=a>>z>>>0}return z},
iR:function(a,b){if(b<0)throw H.b(H.N(b))
return this.eF(a,b)},
eF:function(a,b){return b>31?0:a>>>b},
aQ:function(a,b){if(typeof b!=="number")throw H.b(H.N(b))
return a<b},
cE:function(a,b){if(typeof b!=="number")throw H.b(H.N(b))
return a>b},
bz:function(a,b){if(typeof b!=="number")throw H.b(H.N(b))
return a<=b},
$isS:1,
$isO:1},
e9:{"^":"bm;",
aC:function(a){return-a},
$isi:1},
h0:{"^":"bm;"},
c5:{"^":"j;",
S:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(H.aH(a,b))
if(b<0)throw H.b(H.aH(a,b))
if(b>=a.length)H.F(H.aH(a,b))
return a.charCodeAt(b)},
J:function(a,b){if(b>=a.length)throw H.b(H.aH(a,b))
return a.charCodeAt(b)},
di:function(a,b,c){var z
if(typeof b!=="string")H.F(H.N(b))
z=b.length
if(c>z)throw H.b(P.M(c,0,b.length,null,null))
return new H.r5(b,a,c)},
eO:function(a,b){return this.di(a,b,0)},
fl:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.b(P.M(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.S(b,c+y)!==this.J(a,y))return
return new H.hy(c,b,a)},
L:function(a,b){if(typeof b!=="string")throw H.b(P.d_(b,null,null))
return a+b},
cb:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.a7(a,y-z)},
bw:function(a,b,c,d){if(typeof b!=="number"||Math.floor(b)!==b)H.F(H.N(b))
c=P.aE(b,c,a.length,null,null,null)
return H.uF(a,b,c,d)},
bb:function(a,b,c){var z
if(typeof c!=="number"||Math.floor(c)!==c)H.F(H.N(c))
if(c<0||c>a.length)throw H.b(P.M(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.jx(b,a,c)!=null},
af:function(a,b){return this.bb(a,b,0)},
B:function(a,b,c){if(typeof b!=="number"||Math.floor(b)!==b)H.F(H.N(b))
if(c==null)c=a.length
if(b<0)throw H.b(P.bu(b,null,null))
if(b>c)throw H.b(P.bu(b,null,null))
if(c>a.length)throw H.b(P.bu(c,null,null))
return a.substring(b,c)},
a7:function(a,b){return this.B(a,b,null)},
kv:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.J(z,0)===133){x=J.m5(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.S(z,w)===133?J.m6(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
al:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.b(C.aL)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
fd:function(a,b,c){var z
if(c<0||c>a.length)throw H.b(P.M(c,0,a.length,null,null))
z=a.indexOf(b,c)
return z},
fc:function(a,b){return this.fd(a,b,0)},
jj:function(a,b,c){if(b==null)H.F(H.N(b))
if(c>a.length)throw H.b(P.M(c,0,a.length,null,null))
return H.uD(a,b,c)},
aX:function(a,b){var z
if(typeof b!=="string")throw H.b(H.N(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
k:function(a){return a},
gH:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gi:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(H.aH(a,b))
if(b>=a.length||b<0)throw H.b(H.aH(a,b))
return a[b]},
$isw:1,
$asw:I.co,
$isf:1,
q:{
h2:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
m5:function(a,b){var z,y
for(z=a.length;b<z;){y=C.a.J(a,b)
if(y!==32&&y!==13&&!J.h2(y))break;++b}return b},
m6:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.a.S(a,z)
if(y!==32&&y!==13&&!J.h2(y))break}return b}}}}],["","",,H,{"^":"",
dG:function(a){var z,y
z=a^48
if(z<=9)return z
y=a|32
if(97<=y&&y<=102)return y-87
return-1},
fX:function(){return new P.bd("No element")},
fY:function(){return new P.bd("Too few elements")},
nD:function(a,b){H.cL(a,0,J.Z(a)-1,b)},
cL:function(a,b,c,d){if(c-b<=32)H.nC(a,b,c,d)
else H.nB(a,b,c,d)},
nC:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.J(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.aJ(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.j(a,w,y.h(a,v))
w=v}y.j(a,w,x)}},
nB:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.c.R(c-b+1,6)
y=b+z
x=c-z
w=C.c.R(b+c,2)
v=w-z
u=w+z
t=J.J(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.aJ(d.$2(s,r),0)){n=r
r=s
s=n}if(J.aJ(d.$2(p,o),0)){n=o
o=p
p=n}if(J.aJ(d.$2(s,q),0)){n=q
q=s
s=n}if(J.aJ(d.$2(r,q),0)){n=q
q=r
r=n}if(J.aJ(d.$2(s,p),0)){n=p
p=s
s=n}if(J.aJ(d.$2(q,p),0)){n=p
p=q
q=n}if(J.aJ(d.$2(r,o),0)){n=o
o=r
r=n}if(J.aJ(d.$2(r,q),0)){n=q
q=r
r=n}if(J.aJ(d.$2(p,o),0)){n=o
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
H.cL(a,b,m-2,d)
H.cL(a,l+2,c,d)
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
break}}H.cL(a,m,l,d)}else H.cL(a,m,l,d)},
ks:{"^":"o4;a",
gi:function(a){return this.a.length},
h:function(a,b){return C.a.S(this.a,b)},
$asn:function(){return[P.i]},
$asp:function(){return[P.i]},
$asl:function(){return[P.i]},
$asm:function(){return[P.i]}},
n:{"^":"l;$ti"},
cC:{"^":"n;$ti",
gI:function(a){return new H.h6(this,this.gi(this),0)},
w:function(a,b){var z,y
z=this.gi(this)
for(y=0;y<z;++y){b.$1(this.E(0,y))
if(z!==this.gi(this))throw H.b(P.a1(this))}},
gW:function(a){return this.gi(this)===0},
a3:function(a,b){var z,y,x,w
z=this.gi(this)
if(b.length!==0){if(z===0)return""
y=H.e(this.E(0,0))
if(z!==this.gi(this))throw H.b(P.a1(this))
for(x=y,w=1;w<z;++w){x=x+b+H.e(this.E(0,w))
if(z!==this.gi(this))throw H.b(P.a1(this))}return x.charCodeAt(0)==0?x:x}else{for(w=0,x="";w<z;++w){x+=H.e(this.E(0,w))
if(z!==this.gi(this))throw H.b(P.a1(this))}return x.charCodeAt(0)==0?x:x}},
cA:function(a,b){return this.h5(0,b)},
aL:function(a,b,c){return new H.bp(this,b,[H.a9(this,"cC",0),c])},
bn:function(a,b,c){var z,y,x
z=this.gi(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.E(0,x))
if(z!==this.gi(this))throw H.b(P.a1(this))}return y},
cu:function(a,b){var z,y
z=H.d([],[H.a9(this,"cC",0)])
C.b.si(z,this.gi(this))
for(y=0;y<this.gi(this);++y)z[y]=this.E(0,y)
return z},
fH:function(a){return this.cu(a,!0)}},
nL:{"^":"cC;a,b,c,$ti",
ghP:function(){var z,y
z=J.Z(this.a)
y=this.c
if(y==null||y>z)return z
return y},
giU:function(){var z,y
z=J.Z(this.a)
y=this.b
if(y>z)return z
return y},
gi:function(a){var z,y,x
z=J.Z(this.a)
y=this.b
if(y>=z)return 0
x=this.c
if(x==null||x>=z)return z-y
return x-y},
E:function(a,b){var z=this.giU()+b
if(b<0||z>=this.ghP())throw H.b(P.P(b,this,"index",null,null))
return J.fj(this.a,z)},
cu:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.b
y=this.a
x=J.J(y)
w=x.gi(y)
v=this.c
if(v!=null&&v<w)w=v
u=w-z
if(u<0)u=0
t=new Array(u)
t.fixed$length=Array
s=H.d(t,this.$ti)
for(r=0;r<u;++r){s[r]=x.E(y,z+r)
if(x.gi(y)<w)throw H.b(P.a1(this))}return s},
q:{
er:function(a,b,c,d){if(c!=null){if(c<0)H.F(P.M(c,0,null,"end",null))
if(b>c)H.F(P.M(b,0,c,"start",null))}return new H.nL(a,b,c,[d])}}},
h6:{"^":"a;a,b,c,0d",
gu:function(a){return this.d},
m:function(){var z,y,x,w
z=this.a
y=J.J(z)
x=y.gi(z)
if(this.b!==x)throw H.b(P.a1(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.E(z,w);++this.c
return!0}},
ef:{"^":"l;a,b,$ti",
gI:function(a){return new H.mp(J.aa(this.a),this.b)},
gi:function(a){return J.Z(this.a)},
gW:function(a){return J.dP(this.a)},
$asl:function(a,b){return[b]},
q:{
eg:function(a,b,c,d){if(!!J.v(a).$isn)return new H.e0(a,b,[c,d])
return new H.ef(a,b,[c,d])}}},
e0:{"^":"ef;a,b,$ti",$isn:1,
$asn:function(a,b){return[b]}},
mp:{"^":"e8;0a,b,c",
m:function(){var z=this.b
if(z.m()){this.a=this.c.$1(z.gu(z))
return!0}this.a=null
return!1},
gu:function(a){return this.a}},
bp:{"^":"cC;a,b,$ti",
gi:function(a){return J.Z(this.a)},
E:function(a,b){return this.b.$1(J.fj(this.a,b))},
$asn:function(a,b){return[b]},
$ascC:function(a,b){return[b]},
$asl:function(a,b){return[b]}},
bf:{"^":"l;a,b,$ti",
gI:function(a){return new H.eE(J.aa(this.a),this.b)},
aL:function(a,b,c){return new H.ef(this,b,[H.q(this,0),c])}},
eE:{"^":"e8;a,b",
m:function(){var z,y
for(z=this.a,y=this.b;z.m();)if(y.$1(z.gu(z)))return!0
return!1},
gu:function(a){var z=this.a
return z.gu(z)}},
d9:{"^":"l;a,b,$ti",
gI:function(a){return new H.lg(J.aa(this.a),this.b,C.aK)},
$asl:function(a,b){return[b]}},
lg:{"^":"a;a,b,c,0d",
gu:function(a){return this.d},
m:function(){var z,y,x
z=this.c
if(z==null)return!1
for(y=this.a,x=this.b;!z.m();){this.d=null
if(y.m()){this.c=null
z=J.aa(x.$1(y.gu(y)))
this.c=z}else return!1}z=this.c
this.d=z.gu(z)
return!0}},
nM:{"^":"l;a,b,$ti",
gI:function(a){return new H.nN(J.aa(this.a),this.b,!1)}},
nN:{"^":"e8;a,b,c",
m:function(){if(this.c)return!1
var z=this.a
if(!z.m()||!this.b.$1(z.gu(z))){this.c=!0
return!1}return!0},
gu:function(a){var z
if(this.c)return
z=this.a
return z.gu(z)}},
l6:{"^":"a;",
m:function(){return!1},
gu:function(a){return}},
e2:{"^":"l;a,b,$ti",
gI:function(a){return new H.lk(J.aa(this.a),this.b)},
gi:function(a){return J.Z(this.a)+J.Z(this.b)},
gW:function(a){return J.dP(this.a)&&J.dP(this.b)},
gX:function(a){return J.cX(this.a)||J.cX(this.b)},
q:{
e3:function(a,b,c){if(H.az(b,"$isn",[c],"$asn"))return new H.l4(a,b,[c])
return new H.e2(a,b,[c])}}},
l4:{"^":"e2;a,b,$ti",$isn:1},
lk:{"^":"a;a,b",
m:function(){if(this.a.m())return!0
var z=this.b
if(z!=null){z=J.aa(z)
this.a=z
this.b=null
return z.m()}return!1},
gu:function(a){var z=this.a
return z.gu(z)}},
fM:{"^":"a;",
si:function(a,b){throw H.b(P.h("Cannot change the length of a fixed-length list"))},
l:function(a,b){throw H.b(P.h("Cannot add to a fixed-length list"))},
C:function(a,b){throw H.b(P.h("Cannot remove from a fixed-length list"))},
ap:function(a){throw H.b(P.h("Cannot clear a fixed-length list"))}},
o5:{"^":"a;",
j:function(a,b,c){throw H.b(P.h("Cannot modify an unmodifiable list"))},
si:function(a,b){throw H.b(P.h("Cannot change the length of an unmodifiable list"))},
l:function(a,b){throw H.b(P.h("Cannot add to an unmodifiable list"))},
C:function(a,b){throw H.b(P.h("Cannot remove from an unmodifiable list"))},
ap:function(a){throw H.b(P.h("Cannot clear an unmodifiable list"))},
bM:function(a,b,c,d){throw H.b(P.h("Cannot modify an unmodifiable list"))}},
o4:{"^":"mg+o5;"},
es:{"^":"a;a",
gH:function(a){var z=this._hashCode
if(z!=null)return z
z=536870911&664597*J.an(this.a)
this._hashCode=z
return z},
k:function(a){return'Symbol("'+H.e(this.a)+'")'},
T:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.es){z=this.a
y=b.a
y=z==null?y==null:z===y
z=y}else z=!1
return z},
$iscb:1}}],["","",,H,{"^":"",
dZ:function(a,b,c){var z,y,x,w,v,u,t,s,r,q
z=P.b9(a.ga_(a),!0,b)
x=z.length
w=0
while(!0){if(!(w<x)){y=!0
break}v=z[w]
if(typeof v!=="string"){y=!1
break}++w}if(y){u={}
for(t=!1,s=null,r=0,w=0;w<z.length;z.length===x||(0,H.aA)(z),++w){v=z[w]
q=a.h(0,v)
if(!J.a5(v,"__proto__")){if(!u.hasOwnProperty(v))++r
u[v]=q}else{s=q
t=!0}}if(t)return new H.ky(s,r+1,u,z,[b,c])
return new H.d5(r,u,z,[b,c])}return new H.fw(P.md(a,b,c),[b,c])},
fx:function(){throw H.b(P.h("Cannot modify unmodifiable Map"))},
dK:function(a){var z=init.mangledGlobalNames[a]
if(typeof z==="string")return z
z="minified:"+a
return z},
ug:[function(a){return init.types[a]},null,null,4,0,null,25],
j1:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.v(a).$isz},
e:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.b5(a)
if(typeof z!=="string")throw H.b(H.N(a))
return z},
bb:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
n1:function(a,b){var z,y,x,w,v,u
if(typeof a!=="string")H.F(H.N(a))
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z==null)return
y=z[3]
if(b==null){if(y!=null)return parseInt(a,10)
if(z[2]!=null)return parseInt(a,16)
return}if(b<2||b>36)throw H.b(P.M(b,2,36,"radix",null))
if(b===10&&y!=null)return parseInt(a,10)
if(b<10||y==null){x=b<=10?47+b:86+b
w=z[1]
for(v=w.length,u=0;u<v;++u)if((C.a.J(w,u)|32)>x)return}return parseInt(a,b)},
c8:function(a){return H.mS(a)+H.iI(H.bh(a),0,null)},
mS:function(a){var z,y,x,w,v,u,t,s,r
z=J.v(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
v=w==null
if(v||z===C.aS||!!z.$iscd){u=C.Y(a)
if(v)w=u
if(u==="Object"){t=a.constructor
if(typeof t=="function"){s=String(t).match(/^\s*function\s*([\w$]*)\s*\(/)
r=s==null?null:s[1]
if(typeof r==="string"&&/^\w+$/.test(r))w=r}}return w}w=w
return H.dK(w.length>1&&C.a.J(w,0)===36?C.a.a7(w,1):w)},
hn:function(a){var z,y,x,w,v
z=J.Z(a)
if(z<=500)return String.fromCharCode.apply(null,a)
for(y="",x=0;x<z;x=w){w=x+500
v=w<z?w:z
y+=String.fromCharCode.apply(null,a.slice(x,v))}return y},
n2:function(a){var z,y,x,w
z=H.d([],[P.i])
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.aA)(a),++x){w=a[x]
if(typeof w!=="number"||Math.floor(w)!==w)throw H.b(H.N(w))
if(w<=65535)z.push(w)
else if(w<=1114111){z.push(55296+(C.c.aU(w-65536,10)&1023))
z.push(56320+(w&1023))}else throw H.b(H.N(w))}return H.hn(z)},
hp:function(a){var z,y,x
for(z=a.length,y=0;y<z;++y){x=a[y]
if(typeof x!=="number"||Math.floor(x)!==x)throw H.b(H.N(x))
if(x<0)throw H.b(H.N(x))
if(x>65535)return H.n2(a)}return H.hn(a)},
n3:function(a,b,c){var z,y,x,w
if(c<=500&&b===0&&c===a.length)return String.fromCharCode.apply(null,a)
for(z=b,y="";z<c;z=x){x=z+500
w=x<c?x:c
y+=String.fromCharCode.apply(null,a.subarray(z,w))}return y},
cI:function(a){var z
if(0<=a){if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.c.aU(z,10))>>>0,56320|z&1023)}}throw H.b(P.M(a,0,1114111,null,null))},
n4:function(a,b,c,d,e,f,g,h){var z,y
z=b-1
if(a<100){a+=400
z-=4800}y=Date.UTC(a,z,c,d,e,f,g)
if(isNaN(y)||y<-864e13||y>864e13)return
return y},
ap:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
n0:function(a){return a.b?H.ap(a).getUTCFullYear()+0:H.ap(a).getFullYear()+0},
mZ:function(a){return a.b?H.ap(a).getUTCMonth()+1:H.ap(a).getMonth()+1},
mV:function(a){return a.b?H.ap(a).getUTCDate()+0:H.ap(a).getDate()+0},
mW:function(a){return a.b?H.ap(a).getUTCHours()+0:H.ap(a).getHours()+0},
mY:function(a){return a.b?H.ap(a).getUTCMinutes()+0:H.ap(a).getMinutes()+0},
n_:function(a){return a.b?H.ap(a).getUTCSeconds()+0:H.ap(a).getSeconds()+0},
mX:function(a){return a.b?H.ap(a).getUTCMilliseconds()+0:H.ap(a).getMilliseconds()+0},
ho:function(a,b,c){var z,y,x
z={}
z.a=0
y=[]
x=[]
if(b!=null){z.a=J.Z(b)
C.b.dh(y,b)}z.b=""
if(c!=null&&!c.gW(c))c.w(0,new H.mU(z,x,y))
return J.jy(a,new H.m4(C.bj,""+"$"+z.a+z.b,0,y,x,0))},
mT:function(a,b){var z,y
if(b!=null)z=b instanceof Array?b:P.b9(b,!0,null)
else z=[]
y=z.length
if(y===0){if(!!a.$0)return a.$0()}else if(y===1){if(!!a.$1)return a.$1(z[0])}else if(y===2){if(!!a.$2)return a.$2(z[0],z[1])}else if(y===3){if(!!a.$3)return a.$3(z[0],z[1],z[2])}else if(y===4){if(!!a.$4)return a.$4(z[0],z[1],z[2],z[3])}else if(y===5)if(!!a.$5)return a.$5(z[0],z[1],z[2],z[3],z[4])
return H.mR(a,z)},
mR:function(a,b){var z,y,x,w,v,u
z=b.length
y=a[""+"$"+z]
if(y==null){y=J.v(a)["call*"]
if(y==null)return H.ho(a,b,null)
x=H.hr(y)
w=x.d
v=w+x.e
if(x.f||w>z||v<z)return H.ho(a,b,null)
b=P.b9(b,!0,null)
for(u=z;u<v;++u)C.b.l(b,init.metadata[x.jq(0,u)])}return y.apply(a,b)},
aH:function(a,b){var z
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aW(!0,b,"index",null)
z=J.Z(a)
if(b<0||b>=z)return P.P(b,a,"index",null,z)
return P.bu(b,"index",null)},
uc:function(a,b,c){if(a>c)return new P.cJ(0,c,!0,a,"start","Invalid value")
if(b!=null)if(b<a||b>c)return new P.cJ(a,c,!0,b,"end","Invalid value")
return new P.aW(!0,b,"end",null)},
N:function(a){return new P.aW(!0,a,null,null)},
cn:function(a){if(typeof a!=="number")throw H.b(H.N(a))
return a},
b:function(a){var z
if(a==null)a=new P.br()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.jk})
z.name=""}else z.toString=H.jk
return z},
jk:[function(){return J.b5(this.dartException)},null,null,0,0,null],
F:function(a){throw H.b(a)},
aA:function(a){throw H.b(P.a1(a))},
a4:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.uH(a)
if(a==null)return
if(a instanceof H.e1)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.c.aU(x,16)&8191)===10)switch(w){case 438:return z.$1(H.ed(H.e(y)+" (Error "+w+")",null))
case 445:case 5007:return z.$1(H.hj(H.e(y)+" (Error "+w+")",null))}}if(a instanceof TypeError){v=$.$get$hC()
u=$.$get$hD()
t=$.$get$hE()
s=$.$get$hF()
r=$.$get$hJ()
q=$.$get$hK()
p=$.$get$hH()
$.$get$hG()
o=$.$get$hM()
n=$.$get$hL()
m=v.aq(y)
if(m!=null)return z.$1(H.ed(y,m))
else{m=u.aq(y)
if(m!=null){m.method="call"
return z.$1(H.ed(y,m))}else{m=t.aq(y)
if(m==null){m=s.aq(y)
if(m==null){m=r.aq(y)
if(m==null){m=q.aq(y)
if(m==null){m=p.aq(y)
if(m==null){m=s.aq(y)
if(m==null){m=o.aq(y)
if(m==null){m=n.aq(y)
l=m!=null}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0
if(l)return z.$1(H.hj(y,m))}}return z.$1(new H.o3(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.hx()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aW(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.hx()
return a},
ae:function(a){var z
if(a instanceof H.e1)return a.b
if(a==null)return new H.ij(a)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.ij(a)},
uz:function(a){if(a==null||typeof a!='object')return J.an(a)
else return H.bb(a)},
iX:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.j(0,a[y],a[x])}return b},
ur:[function(a,b,c,d,e,f){switch(b){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw H.b(P.fK("Unsupported number of arguments for wrapped closure"))},null,null,24,0,null,27,20,12,13,28,19],
b3:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,H.ur)
a.$identity=z
return z},
kr:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.v(d).$ism){z.$reflectionInfo=d
x=H.hr(z).r}else x=d
w=e?Object.create(new H.nE().constructor.prototype):Object.create(new H.dV(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(e)v=function static_tear_off(){this.$initialize()}
else{u=$.aL
$.aL=u+1
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
if(!e){t=f.length==1&&!0
s=H.fu(a,z,t)
s.$reflectionInfo=d}else{w.$static_name=g
s=z
t=!1}if(typeof x=="number")r=function(h,i){return function(){return h(i)}}(H.ug,x)
else if(typeof x=="function")if(e)r=x
else{q=t?H.fr:H.dW
r=function(h,i){return function(){return h.apply({$receiver:i(this)},arguments)}}(x,q)}else throw H.b("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=s,o=1;o<u;++o){n=b[o]
m=n.$callName
if(m!=null){n=e?n:H.fu(a,n,t)
w[m]=n}if(o===c){n.$reflectionInfo=d
p=n}}w["call*"]=p
w.$R=z.$R
w.$D=z.$D
return v},
ko:function(a,b,c,d){var z=H.dW
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
fu:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.kq(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.ko(y,!w,z,b)
if(y===0){w=$.aL
$.aL=w+1
u="self"+H.e(w)
w="return function(){var "+u+" = this."
v=$.bW
if(v==null){v=H.d1("self")
$.bW=v}return new Function(w+H.e(v)+";return "+u+"."+H.e(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aL
$.aL=w+1
t+=H.e(w)
w="return function("+t+"){return this."
v=$.bW
if(v==null){v=H.d1("self")
$.bW=v}return new Function(w+H.e(v)+"."+H.e(z)+"("+t+");}")()},
kp:function(a,b,c,d){var z,y
z=H.dW
y=H.fr
switch(b?-1:a){case 0:throw H.b(H.ny("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
kq:function(a,b){var z,y,x,w,v,u,t,s
z=$.bW
if(z==null){z=H.d1("self")
$.bW=z}y=$.fq
if(y==null){y=H.d1("receiver")
$.fq=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.kp(w,!u,x,b)
if(w===1){z="return function(){return this."+H.e(z)+"."+H.e(x)+"(this."+H.e(y)+");"
y=$.aL
$.aL=y+1
return new Function(z+H.e(y)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
z="return function("+s+"){return this."+H.e(z)+"."+H.e(x)+"(this."+H.e(y)+", "+s+");"
y=$.aL
$.aL=y+1
return new Function(z+H.e(y)+"}")()},
f7:function(a,b,c,d,e,f,g){var z,y
z=J.c4(b)
y=!!J.v(d).$ism?J.c4(d):d
return H.kr(a,z,c,y,!!e,f,g)},
uA:function(a,b){var z=J.J(b)
throw H.b(H.kf(a,z.B(b,3,z.gi(b))))},
up:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.v(a)[b]
else z=!0
if(z)return a
H.uA(a,b)},
f9:function(a){var z
if("$S" in a){z=a.$S
if(typeof z=="number")return init.types[z]
else return a.$S()}return},
bP:function(a,b){var z
if(a==null)return!1
if(typeof a=="function")return!0
z=H.f9(J.v(a))
if(z==null)return!1
return H.iH(z,null,b,null)},
tx:function(a){var z,y
z=J.v(a)
if(!!z.$isc){y=H.f9(z)
if(y!=null)return H.j6(y)
return"Closure"}return H.c8(a)},
uG:function(a){throw H.b(new P.kH(a))},
j_:function(a){return init.getIsolateTag(a)},
u:function(a){return new H.t(a)},
d:function(a,b){a.$ti=b
return a},
bh:function(a){if(a==null)return
return a.$ti},
x2:function(a,b,c){return H.bR(a["$as"+H.e(c)],H.bh(b))},
dE:function(a,b,c,d){var z=H.bR(a["$as"+H.e(c)],H.bh(b))
return z==null?null:z[d]},
a9:function(a,b,c){var z=H.bR(a["$as"+H.e(b)],H.bh(a))
return z==null?null:z[c]},
q:function(a,b){var z=H.bh(a)
return z==null?null:z[b]},
j6:function(a){return H.bg(a,null)},
bg:function(a,b){if(a==null)return"dynamic"
if(a===-1)return"void"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return H.dK(a[0].builtin$cls)+H.iI(a,1,b)
if(typeof a=="function")return H.dK(a.builtin$cls)
if(a===-2)return"dynamic"
if(typeof a==="number"){if(b==null||a<0||a>=b.length)return"unexpected-generic-index:"+H.e(a)
return H.e(b[b.length-a-1])}if('func' in a)return H.tj(a,b)
if('futureOr' in a)return"FutureOr<"+H.bg("type" in a?a.type:null,b)+">"
return"unknown-reified-type"},
tj:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
if("bounds" in a){z=a.bounds
if(b==null){b=H.d([],[P.f])
y=null}else y=b.length
x=b.length
for(w=z.length,v=w;v>0;--v)b.push("T"+(x+v))
for(u="<",t="",v=0;v<w;++v,t=", "){u=C.a.L(u+t,b[b.length-v-1])
s=z[v]
if(s!=null&&s!==P.a)u+=" extends "+H.bg(s,b)}u+=">"}else{u=""
y=null}r=!!a.v?"void":H.bg(a.ret,b)
if("args" in a){q=a.args
for(p=q.length,o="",n="",m=0;m<p;++m,n=", "){l=q[m]
o=o+n+H.bg(l,b)}}else{o=""
n=""}if("opt" in a){k=a.opt
o+=n+"["
for(p=k.length,n="",m=0;m<p;++m,n=", "){l=k[m]
o=o+n+H.bg(l,b)}o+="]"}if("named" in a){j=a.named
o+=n+"{"
for(p=H.ue(j),i=p.length,n="",m=0;m<i;++m,n=", "){h=p[m]
o=o+n+H.bg(j[h],b)+(" "+H.e(h))}o+="}"}if(y!=null)b.length=y
return u+"("+o+") => "+r},
iI:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.aQ("")
for(y=b,x="",w=!0,v="";y<a.length;++y,x=", "){z.a=v+x
u=a[y]
if(u!=null)w=!1
v=z.a+=H.bg(u,c)}return"<"+z.k(0)+">"},
fa:function(a){var z,y,x,w
z=J.v(a)
if(!!z.$isc){y=H.f9(z)
if(y!=null)return y}x=z.constructor
if(a==null)return x
if(typeof a!="object")return x
w=H.bh(a)
if(w!=null){w=w.slice()
w.splice(0,0,x)
x=w}return x},
bR:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
az:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.bh(a)
y=J.v(a)
if(y[b]==null)return!1
return H.iU(H.bR(y[d],z),null,c,null)},
iU:function(a,b,c,d){var z,y
if(c==null)return!0
if(a==null){z=c.length
for(y=0;y<z;++y)if(!H.aF(null,null,c[y],d))return!1
return!0}z=a.length
for(y=0;y<z;++y)if(!H.aF(a[y],b,c[y],d))return!1
return!0},
x0:function(a,b,c){return a.apply(b,H.bR(J.v(b)["$as"+H.e(c)],H.bh(b)))},
aF:function(a,b,c,d){var z,y,x,w,v,u,t,s,r
if(a===c)return!0
if(c==null||c===-1||c.builtin$cls==="a"||c===-2)return!0
if(a===-2)return!0
if(a==null||a===-1||a.builtin$cls==="a"||a===-2){if(typeof c==="number")return!1
if('futureOr' in c)return H.aF(a,b,"type" in c?c.type:null,d)
return!1}if(typeof a==="number")return!1
if(typeof c==="number")return!1
if(a.builtin$cls==="x")return!0
if('func' in c)return H.iH(a,b,c,d)
if('func' in a)return c.builtin$cls==="c0"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
if('futureOr' in c){x="type" in c?c.type:null
if('futureOr' in a)return H.aF("type" in a?a.type:null,b,x,d)
else if(H.aF(a,b,x,d))return!0
else{if(!('$is'+"V" in y.prototype))return!1
w=y.prototype["$as"+"V"]
v=H.bR(w,z?a.slice(1):null)
return H.aF(typeof v==="object"&&v!==null&&v.constructor===Array?v[0]:null,b,x,d)}}u=typeof c==="object"&&c!==null&&c.constructor===Array
t=u?c[0]:c
if(t!==y){s=t.builtin$cls
if(!('$is'+s in y.prototype))return!1
r=y.prototype["$as"+s]}else r=null
if(!u)return!0
z=z?a.slice(1):null
u=c.slice(1)
return H.iU(H.bR(r,z),b,u,d)},
iH:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("bounds" in a){if(!("bounds" in c))return!1
z=a.bounds
y=c.bounds
if(z.length!==y.length)return!1}else if("bounds" in c)return!1
if(!H.aF(a.ret,b,c.ret,d))return!1
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
for(p=0;p<t;++p)if(!H.aF(w[p],d,x[p],b))return!1
for(o=p,n=0;o<s;++n,++o)if(!H.aF(w[o],d,v[n],b))return!1
for(o=0;o<q;++n,++o)if(!H.aF(u[o],d,v[n],b))return!1
m=a.named
l=c.named
if(l==null)return!0
if(m==null)return!1
return H.ux(m,b,l,d)},
ux:function(a,b,c,d){var z,y,x,w
z=Object.getOwnPropertyNames(c)
for(y=z.length,x=0;x<y;++x){w=z[x]
if(!Object.hasOwnProperty.call(a,w))return!1
if(!H.aF(c[w],d,a[w],b))return!1}return!0},
x1:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
us:function(a){var z,y,x,w,v,u
z=$.j0.$1(a)
y=$.dD[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.dH[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.iT.$2(a,z)
if(z!=null){y=$.dD[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.dH[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.dI(x)
$.dD[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.dH[z]=x
return x}if(v==="-"){u=H.dI(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.j3(a,x)
if(v==="*")throw H.b(P.cc(z))
if(init.leafTags[z]===true){u=H.dI(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.j3(a,x)},
j3:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.fd(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
dI:function(a){return J.fd(a,!1,null,!!a.$isz)},
uu:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return H.dI(z)
else return J.fd(z,c,null,null)},
um:function(){if(!0===$.fc)return
$.fc=!0
H.un()},
un:function(){var z,y,x,w,v,u,t,s
$.dD=Object.create(null)
$.dH=Object.create(null)
H.ui()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.j5.$1(v)
if(u!=null){t=H.uu(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
ui:function(){var z,y,x,w,v,u,t
z=C.aW()
z=H.bO(C.aT,H.bO(C.aY,H.bO(C.X,H.bO(C.X,H.bO(C.aX,H.bO(C.aU,H.bO(C.aV(C.Y),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.j0=new H.uj(v)
$.iT=new H.uk(u)
$.j5=new H.ul(t)},
bO:function(a,b){return a(b)||b},
uD:function(a,b,c){var z,y
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.v(b)
if(!!z.$isea){z=C.a.a7(a,c)
y=b.b
return y.test(z)}else{z=z.eO(b,C.a.a7(a,c))
return!z.gW(z)}}},
uE:function(a,b,c){var z,y,x,w
if(typeof b==="string")if(b==="")if(a==="")return c
else{z=a.length
for(y=c,x=0;x<z;++x)y=y+a[x]+c
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))
else if(b instanceof H.ea){w=b.geo()
w.lastIndex=0
return a.replace(w,c.replace(/\$/g,"$$$$"))}else{if(b==null)H.F(H.N(b))
throw H.b("String.replaceAll(Pattern) UNIMPLEMENTED")}},
uF:function(a,b,c,d){var z,y
z=a.substring(0,b)
y=a.substring(c)
return z+d+y},
fw:{"^":"ex;a,$ti"},
kw:{"^":"a;$ti",
gX:function(a){return this.gi(this)!==0},
k:function(a){return P.ee(this)},
j:function(a,b,c){return H.fx()},
C:function(a,b){return H.fx()},
$isQ:1},
d5:{"^":"kw;a,b,c,$ti",
gi:function(a){return this.a},
bi:function(a,b){if(typeof b!=="string")return!1
if("__proto__"===b)return!1
return this.b.hasOwnProperty(b)},
h:function(a,b){if(!this.bi(0,b))return
return this.cZ(b)},
cZ:function(a){return this.b[a]},
w:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.cZ(w))}},
ga_:function(a){return new H.pN(this,[H.q(this,0)])}},
ky:{"^":"d5;d,a,b,c,$ti",
bi:function(a,b){if(typeof b!=="string")return!1
if("__proto__"===b)return!0
return this.b.hasOwnProperty(b)},
cZ:function(a){return"__proto__"===a?this.d:this.b[a]}},
pN:{"^":"l;a,$ti",
gI:function(a){var z=this.a.c
return new J.d0(z,z.length,0)},
gi:function(a){return this.a.c.length}},
m4:{"^":"a;a,b,c,d,e,f",
gfm:function(){var z=this.a
return z},
gfv:function(){var z,y,x,w
if(this.c===1)return C.o
z=this.d
y=z.length-this.e.length-this.f
if(y===0)return C.o
x=[]
for(w=0;w<y;++w)x.push(z[w])
return J.h_(x)},
gfo:function(){var z,y,x,w,v,u,t
if(this.c!==0)return C.a2
z=this.e
y=z.length
x=this.d
w=x.length-y-this.f
if(y===0)return C.a2
v=P.cb
u=new H.bn(0,0,[v,null])
for(t=0;t<y;++t)u.j(0,new H.es(z[t]),x[w+t])
return new H.fw(u,[v,null])}},
nj:{"^":"a;a,b,c,d,e,f,r,0x",
jq:function(a,b){var z=this.d
if(b<z)return
return this.b[3+b-z]},
q:{
hr:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z=J.c4(z)
y=z[0]
x=z[1]
return new H.nj(a,z,(y&2)===2,y>>2,x>>1,(x&1)===1,z[2])}}},
mU:{"^":"c:25;a,b,c",
$2:function(a,b){var z=this.a
z.b=z.b+"$"+H.e(a)
this.b.push(a)
this.c.push(b);++z.a}},
o0:{"^":"a;a,b,c,d,e,f",
aq:function(a){var z,y,x
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
q:{
aR:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=H.d([],[P.f])
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.o0(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
dp:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
hI:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
mJ:{"^":"ac;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.e(this.a)
return"NullError: method not found: '"+z+"' on null"},
q:{
hj:function(a,b){return new H.mJ(a,b==null?null:b.method)}}},
m8:{"^":"ac;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.e(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.e(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.e(this.a)+")"},
q:{
ed:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.m8(a,y,z?null:b.receiver)}}},
o3:{"^":"ac;a",
k:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
e1:{"^":"a;a,b"},
uH:{"^":"c:10;a",
$1:function(a){if(!!J.v(a).$isac)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
ij:{"^":"a;a,0b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z},
$isa6:1},
c:{"^":"a;",
k:function(a){return"Closure '"+H.c8(this).trim()+"'"},
gfQ:function(){return this},
$isc0:1,
gfQ:function(){return this}},
hA:{"^":"c;"},
nE:{"^":"hA;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+H.dK(z)+"'"}},
dV:{"^":"hA;a,b,c,d",
T:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.dV))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gH:function(a){var z,y
z=this.c
if(z==null)y=H.bb(this.a)
else y=typeof z!=="object"?J.an(z):H.bb(z)
return(y^H.bb(this.b))>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.e(this.d)+"' of "+("Instance of '"+H.c8(z)+"'")},
q:{
dW:function(a){return a.a},
fr:function(a){return a.c},
d1:function(a){var z,y,x,w,v
z=new H.dV("self","target","receiver","name")
y=J.c4(Object.getOwnPropertyNames(z))
for(x=y.length,w=0;w<x;++w){v=y[w]
if(z[v]===a)return v}}}},
ke:{"^":"ac;a",
k:function(a){return this.a},
q:{
kf:function(a,b){return new H.ke("CastError: "+H.e(P.c_(a))+": type '"+H.tx(a)+"' is not a subtype of type '"+b+"'")}}},
nx:{"^":"ac;a",
k:function(a){return"RuntimeError: "+H.e(this.a)},
q:{
ny:function(a){return new H.nx(a)}}},
t:{"^":"a;a,0b,0c,0d",
gc5:function(){var z=this.b
if(z==null){z=H.j6(this.a)
this.b=z}return z},
k:function(a){return this.gc5()},
gH:function(a){var z=this.d
if(z==null){z=C.a.gH(this.gc5())
this.d=z}return z},
T:function(a,b){if(b==null)return!1
return b instanceof H.t&&this.gc5()===b.gc5()},
$iscO:1},
bn:{"^":"hc;a,0b,0c,0d,0e,0f,r,$ti",
gi:function(a){return this.a},
gW:function(a){return this.a===0},
gX:function(a){return!this.gW(this)},
ga_:function(a){return new H.mb(this,[H.q(this,0)])},
gkx:function(a){return H.eg(this.ga_(this),new H.m7(this),H.q(this,0),H.q(this,1))},
bi:function(a,b){var z,y
if(typeof b==="string"){z=this.b
if(z==null)return!1
return this.e9(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return this.e9(y,b)}else return this.jQ(b)},
jQ:function(a){var z=this.d
if(z==null)return!1
return this.ck(this.c_(z,this.cj(a)),a)>=0},
h:function(a,b){var z,y,x,w
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.bF(z,b)
x=y==null?null:y.b
return x}else if(typeof b==="number"&&(b&0x3ffffff)===b){w=this.c
if(w==null)return
y=this.bF(w,b)
x=y==null?null:y.b
return x}else return this.jR(b)},
jR:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.c_(z,this.cj(a))
x=this.ck(y,a)
if(x<0)return
return y[x].b},
j:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.d1()
this.b=z}this.dZ(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.d1()
this.c=y}this.dZ(y,b,c)}else this.jT(b,c)},
jT:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.d1()
this.d=z}y=this.cj(a)
x=this.c_(z,y)
if(x==null)this.df(z,y,[this.d2(a,b)])
else{w=this.ck(x,a)
if(w>=0)x[w].b=b
else x.push(this.d2(a,b))}},
dM:function(a,b,c){var z
if(this.bi(0,b))return this.h(0,b)
z=c.$0()
this.j(0,b,z)
return z},
C:function(a,b){if(typeof b==="string")return this.eB(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.eB(this.c,b)
else return this.jS(b)},
jS:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.c_(z,this.cj(a))
x=this.ck(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.eJ(w)
return w.b},
w:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.b(P.a1(this))
z=z.c}},
dZ:function(a,b,c){var z=this.bF(a,b)
if(z==null)this.df(a,b,this.d2(b,c))
else z.b=c},
eB:function(a,b){var z
if(a==null)return
z=this.bF(a,b)
if(z==null)return
this.eJ(z)
this.ed(a,b)
return z.b},
em:function(){this.r=this.r+1&67108863},
d2:function(a,b){var z,y
z=new H.ma(a,b)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.em()
return z},
eJ:function(a){var z,y
z=a.d
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.em()},
cj:function(a){return J.an(a)&0x3ffffff},
ck:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a5(a[y].a,b))return y
return-1},
k:function(a){return P.ee(this)},
bF:function(a,b){return a[b]},
c_:function(a,b){return a[b]},
df:function(a,b,c){a[b]=c},
ed:function(a,b){delete a[b]},
e9:function(a,b){return this.bF(a,b)!=null},
d1:function(){var z=Object.create(null)
this.df(z,"<non-identifier-key>",z)
this.ed(z,"<non-identifier-key>")
return z}},
m7:{"^":"c;a",
$1:[function(a){return this.a.h(0,a)},null,null,4,0,null,21,"call"],
$S:function(){var z=this.a
return{func:1,ret:H.q(z,1),args:[H.q(z,0)]}}},
ma:{"^":"a;a,b,0c,0d"},
mb:{"^":"n;a,$ti",
gi:function(a){return this.a.a},
gW:function(a){return this.a.a===0},
gI:function(a){var z,y
z=this.a
y=new H.mc(z,z.r)
y.c=z.e
return y}},
mc:{"^":"a;a,b,0c,0d",
gu:function(a){return this.d},
m:function(){var z=this.a
if(this.b!==z.r)throw H.b(P.a1(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
uj:{"^":"c:10;a",
$1:function(a){return this.a(a)}},
uk:{"^":"c:24;a",
$2:function(a,b){return this.a(a,b)}},
ul:{"^":"c;a",
$1:function(a){return this.a(a)}},
ea:{"^":"a;a,b,0c,0d",
k:function(a){return"RegExp/"+this.a+"/"},
geo:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.eb(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
gio:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.eb(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
di:function(a,b,c){if(c>b.length)throw H.b(P.M(c,0,b.length,null,null))
return new H.pu(this,b,c)},
eO:function(a,b){return this.di(a,b,0)},
hV:function(a,b){var z,y
z=this.geo()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.i9(this,y)},
hU:function(a,b){var z,y
z=this.gio()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
if(y.pop()!=null)return
return new H.i9(this,y)},
fl:function(a,b,c){if(c<0||c>b.length)throw H.b(P.M(c,0,b.length,null,null))
return this.hU(b,c)},
$isnk:1,
q:{
eb:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.b(P.a_("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
i9:{"^":"a;a,b",
gju:function(a){var z=this.b
return z.index+z[0].length},
h:function(a,b){return this.b[b]},
$isdh:1},
pu:{"^":"m1;a,b,c",
gI:function(a){return new H.pv(this.a,this.b,this.c)},
$asl:function(){return[P.dh]}},
pv:{"^":"a;a,b,c,0d",
gu:function(a){return this.d},
m:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.hV(z,y)
if(x!=null){this.d=x
w=x.gju(x)
this.c=x.b.index===w?w+1:w
return!0}}this.d=null
this.b=null
return!1}},
hy:{"^":"a;a,b,c",
h:function(a,b){if(b!==0)H.F(P.bu(b,null,null))
return this.c},
$isdh:1},
r5:{"^":"l;a,b,c",
gI:function(a){return new H.r6(this.a,this.b,this.c)},
$asl:function(){return[P.dh]}},
r6:{"^":"a;a,b,c,0d",
m:function(){var z,y,x,w,v,u,t
z=this.c
y=this.b
x=y.length
w=this.a
v=w.length
if(z+x>v){this.d=null
return!1}u=w.indexOf(y,z)
if(u<0){this.c=v+1
this.d=null
return!1}t=u+x
this.d=new H.hy(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gu:function(a){return this.d}}}],["","",,H,{"^":"",
ue:function(a){return J.fZ(a?Object.keys(a):[],null)}}],["","",,H,{"^":"",
fe:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",
dz:function(a){var z,y,x
if(!!J.v(a).$isw)return a
z=a.length
y=new Array(z)
y.fixed$length=Array
for(x=0;x<z;++x)y[x]=a[x]
return y},
he:function(a){return new Int8Array(H.dz(a))},
mx:function(a,b,c){return c==null?new Uint8Array(a,b):new Uint8Array(a,b,c)},
aS:function(a,b,c){if(a>>>0!==a||a>=c)throw H.b(H.aH(b,a))},
t8:function(a,b,c){var z
if(!(a>>>0!==a))if(b==null)z=a>c
else z=b>>>0!==b||a>b||b>c
else z=!0
if(z)throw H.b(H.uc(a,b,c))
if(b==null)return c
return b},
hd:{"^":"j;",$ishd:1,$isk9:1,"%":"ArrayBuffer"},
ei:{"^":"j;",
ik:function(a,b,c,d){var z=P.M(b,0,c,d,null)
throw H.b(z)},
e0:function(a,b,c,d){if(b>>>0!==b||b>c)this.ik(a,b,c,d)},
$isei:1,
"%":"DataView;ArrayBufferView;eh|ia|ib|hf|ic|id|aZ"},
eh:{"^":"ei;",
gi:function(a){return a.length},
iP:function(a,b,c,d,e){var z,y,x
z=a.length
this.e0(a,b,z,"start")
this.e0(a,c,z,"end")
if(b>c)throw H.b(P.M(b,0,c,null,null))
y=c-b
x=d.length
if(x-e<y)throw H.b(P.ay("Not enough elements"))
if(e!==0||x!==y)d=d.subarray(e,e+y)
a.set(d,b)},
$isw:1,
$asw:I.co,
$isz:1,
$asz:I.co},
hf:{"^":"ib;",
h:function(a,b){H.aS(b,a,a.length)
return a[b]},
j:function(a,b,c){H.aS(b,a,a.length)
a[b]=c},
$isn:1,
$asn:function(){return[P.S]},
$asp:function(){return[P.S]},
$isl:1,
$asl:function(){return[P.S]},
$ism:1,
$asm:function(){return[P.S]},
"%":"Float64Array"},
aZ:{"^":"id;",
j:function(a,b,c){H.aS(b,a,a.length)
a[b]=c},
bT:function(a,b,c,d,e){if(!!J.v(d).$isaZ){this.iP(a,b,c,d,e)
return}this.h7(a,b,c,d,e)},
aR:function(a,b,c,d){return this.bT(a,b,c,d,0)},
$isn:1,
$asn:function(){return[P.i]},
$asp:function(){return[P.i]},
$isl:1,
$asl:function(){return[P.i]},
$ism:1,
$asm:function(){return[P.i]}},
mv:{"^":"hf;","%":"Float32Array"},
vV:{"^":"aZ;",
h:function(a,b){H.aS(b,a,a.length)
return a[b]},
"%":"Int16Array"},
vW:{"^":"aZ;",
h:function(a,b){H.aS(b,a,a.length)
return a[b]},
"%":"Int32Array"},
vX:{"^":"aZ;",
h:function(a,b){H.aS(b,a,a.length)
return a[b]},
"%":"Int8Array"},
vY:{"^":"aZ;",
h:function(a,b){H.aS(b,a,a.length)
return a[b]},
"%":"Uint16Array"},
mw:{"^":"aZ;",
h:function(a,b){H.aS(b,a,a.length)
return a[b]},
"%":"Uint32Array"},
vZ:{"^":"aZ;",
gi:function(a){return a.length},
h:function(a,b){H.aS(b,a,a.length)
return a[b]},
"%":"CanvasPixelArray|Uint8ClampedArray"},
ej:{"^":"aZ;",
gi:function(a){return a.length},
h:function(a,b){H.aS(b,a,a.length)
return a[b]},
ag:function(a,b,c){return new Uint8Array(a.subarray(b,H.t8(b,c,a.length)))},
h_:function(a,b){return this.ag(a,b,null)},
$isej:1,
$isdq:1,
"%":";Uint8Array"},
ia:{"^":"eh+p;"},
ib:{"^":"ia+fM;"},
ic:{"^":"eh+p;"},
id:{"^":"ic+fM;"}}],["","",,P,{"^":"",
pz:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.tI()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.b3(new P.pB(z),1)).observe(y,{childList:true})
return new P.pA(z,y,x)}else if(self.setImmediate!=null)return P.tJ()
return P.tK()},
wI:[function(a){self.scheduleImmediate(H.b3(new P.pC(a),0))},"$1","tI",4,0,15],
wJ:[function(a){self.setImmediate(H.b3(new P.pD(a),0))},"$1","tJ",4,0,15],
wK:[function(a){P.ew(C.aO,a)},"$1","tK",4,0,15],
ew:function(a,b){var z=C.c.R(a.a,1000)
return P.ri(z<0?0:z,b)},
nY:function(a,b){var z=C.c.R(a.a,1000)
return P.rj(z<0?0:z,b)},
bL:function(a){return new P.pw(new P.dy(new P.R(0,$.r,[a]),[a]),!1,[a])},
bK:function(a,b){a.$2(0,null)
b.b=!0
return b.a.a},
b2:function(a,b){P.t4(a,b)},
bJ:function(a,b){b.ai(0,a)},
bI:function(a,b){b.bh(H.a4(a),H.ae(a))},
t4:function(a,b){var z,y,x,w
z=new P.t5(b)
y=new P.t6(b)
x=J.v(a)
if(!!x.$isR)a.dg(z,y,null)
else if(!!x.$isV)a.bx(z,y,null)
else{w=new P.R(0,$.r,[null])
w.a=4
w.c=a
w.dg(z,null,null)}},
bN:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
return $.r.cq(new P.ty(z),P.x,P.i,null)},
fN:function(a,b,c){var z,y
if(a==null)a=new P.br()
z=$.r
if(z!==C.d){y=z.cc(a,b)
if(y!=null){a=y.a
if(a==null)a=new P.br()
b=y.b}}z=new P.R(0,$.r,[c])
z.e_(a,b)
return z},
lr:function(a,b,c){var z=new P.R(0,$.r,[c])
P.nX(a,new P.ls(z,b))
return z},
e4:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
s=[P.m,d]
r=[s]
y=new P.R(0,$.r,r)
z.a=null
z.b=0
z.c=null
z.d=null
x=new P.lu(z,b,!1,y)
try{for(q=a.length,p=0,o=0;p<a.length;a.length===q||(0,H.aA)(a),++p){w=a[p]
v=o
w.bx(new P.lt(z,v,y,b,!1,d),x,null)
o=++z.b}if(o===0){r=new P.R(0,$.r,r)
r.aT(C.b3)
return r}r=new Array(o)
r.fixed$length=Array
z.a=H.d(r,[d])}catch(n){u=H.a4(n)
t=H.ae(n)
if(z.b===0||!1)return P.fN(u,t,s)
else{z.c=u
z.d=t}}return y},
tb:function(a,b,c){var z=$.r.cc(b,c)
if(z!=null){b=z.a
if(b==null)b=new P.br()
c=z.b}a.a9(b,c)},
iL:function(a,b){if(H.bP(a,{func:1,args:[P.a,P.a6]}))return b.cq(a,null,P.a,P.a6)
if(H.bP(a,{func:1,args:[P.a]}))return b.b4(a,null,P.a)
throw H.b(P.d_(a,"onError","Error handler must accept one Object or one Object and a StackTrace as arguments, and return a a valid result"))},
tp:function(){var z,y
for(;z=$.bM,z!=null;){$.cl=null
y=z.b
$.bM=y
if(y==null)$.ck=null
z.a.$0()}},
wZ:[function(){$.f_=!0
try{P.tp()}finally{$.cl=null
$.f_=!1
if($.bM!=null)$.$get$eI().$1(P.iW())}},"$0","iW",0,0,2],
iQ:function(a){var z=new P.i_(a)
if($.bM==null){$.ck=z
$.bM=z
if(!$.f_)$.$get$eI().$1(P.iW())}else{$.ck.b=z
$.ck=z}},
tw:function(a){var z,y,x
z=$.bM
if(z==null){P.iQ(a)
$.cl=$.ck
return}y=new P.i_(a)
x=$.cl
if(x==null){y.b=z
$.cl=y
$.bM=y}else{y.b=x.b
x.b=y
$.cl=y
if(y.b==null)$.ck=y}},
cp:function(a){var z,y
z=$.r
if(C.d===z){P.f4(null,null,C.d,a)
return}if(C.d===z.gc4().a)y=C.d.gb_()===z.gb_()
else y=!1
if(y){P.f4(null,null,z,z.bv(a,-1))
return}y=$.r
y.aD(y.c7(a))},
wq:function(a){return new P.r4(a,!1)},
eq:function(a,b,c,d,e,f){return e?new P.re(0,b,c,d,a,[f]):new P.pE(0,b,c,d,a,[f])},
cQ:function(a){return},
wS:[function(a){},"$1","tL",4,0,12,3],
tq:[function(a,b){$.r.bo(a,b)},function(a){return P.tq(a,null)},"$2","$1","tM",4,2,11,4,1,2],
wT:[function(){},"$0","iV",0,0,2],
nX:function(a,b){var z=$.r
if(z===C.d)return z.dr(a,b)
return z.dr(a,z.c7(b))},
a7:function(a){if(a.gaM(a)==null)return
return a.gaM(a).gec()},
f1:[function(a,b,c,d,e){var z={}
z.a=d
P.tw(new P.ts(z,e))},"$5","tS",20,0,16],
f2:[1,function(a,b,c,d){var z,y
y=$.r
if(y==null?c==null:y===c)return d.$0()
$.r=c
z=y
try{y=d.$0()
return y}finally{$.r=z}},function(a,b,c,d){return P.f2(a,b,c,d,null)},"$1$4","$4","tX",16,0,21,5,6,7,14],
f3:[1,function(a,b,c,d,e){var z,y
y=$.r
if(y==null?c==null:y===c)return d.$1(e)
$.r=c
z=y
try{y=d.$1(e)
return y}finally{$.r=z}},function(a,b,c,d,e){return P.f3(a,b,c,d,e,null,null)},"$2$5","$5","tZ",20,0,22,5,6,7,14,9],
iM:[1,function(a,b,c,d,e,f){var z,y
y=$.r
if(y==null?c==null:y===c)return d.$2(e,f)
$.r=c
z=y
try{y=d.$2(e,f)
return y}finally{$.r=z}},function(a,b,c,d,e,f){return P.iM(a,b,c,d,e,f,null,null,null)},"$3$6","$6","tY",24,0,18,5,6,7,14,12,13],
tu:[function(a,b,c,d){return d},function(a,b,c,d){return P.tu(a,b,c,d,null)},"$1$4","$4","tV",16,0,66],
tv:[function(a,b,c,d){return d},function(a,b,c,d){return P.tv(a,b,c,d,null,null)},"$2$4","$4","tW",16,0,67],
tt:[function(a,b,c,d){return d},function(a,b,c,d){return P.tt(a,b,c,d,null,null,null)},"$3$4","$4","tU",16,0,68],
wX:[function(a,b,c,d,e){return},"$5","tQ",20,0,69],
f4:[function(a,b,c,d){var z=C.d!==c
if(z)d=!(!z||C.d.gb_()===c.gb_())?c.c7(d):c.dj(d,-1)
P.iQ(d)},"$4","u_",16,0,20],
wW:[function(a,b,c,d,e){e=c.dj(e,-1)
return P.ew(d,e)},"$5","tP",20,0,23],
wV:[function(a,b,c,d,e){e=c.jd(e,null,P.b0)
return P.nY(d,e)},"$5","tO",20,0,70],
wY:[function(a,b,c,d){H.fe(d)},"$4","tT",16,0,71],
wU:[function(a){$.r.fz(0,a)},"$1","tN",4,0,72],
tr:[function(a,b,c,d,e){var z,y,x
$.j4=P.tN()
if(d==null)d=C.bO
if(e==null)z=c instanceof P.eV?c.gel():P.dc(null,null,null,null,null)
else z=P.lT(e,null,null)
y=new P.pP(c,z)
x=d.b
y.a=x!=null?new P.T(y,x):c.gdc()
x=d.c
y.b=x!=null?new P.T(y,x):c.gde()
x=d.d
y.c=x!=null?new P.T(y,x):c.gdd()
x=d.e
y.d=x!=null?new P.T(y,x):c.gey()
x=d.f
y.e=x!=null?new P.T(y,x):c.gez()
x=d.r
y.f=x!=null?new P.T(y,x):c.gex()
x=d.x
y.r=x!=null?new P.T(y,x):c.gee()
x=d.y
y.x=x!=null?new P.T(y,x):c.gc4()
x=d.z
y.y=x!=null?new P.T(y,x):c.gcV()
x=c.gea()
y.z=x
x=c.ger()
y.Q=x
x=c.geh()
y.ch=x
x=d.a
y.cx=x!=null?new P.T(y,x):c.gd0()
return y},"$5","tR",20,0,73,5,6,7,29,30],
uB:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z={}
if(b==null)return P.iN(a,d,c,e)
z.a=null
z.b=null
if(H.bP(b,{func:1,ret:-1,args:[P.a,P.a6]}))z.b=b
else if(H.bP(b,{func:1,ret:-1,args:[P.a]}))z.a=b
else throw H.b(P.ar("onError callback must take either an Object (the error), or both an Object (the error) and a StackTrace."))
w=new P.uC(z)
if(c==null)c=P.eW(null,null,null,null,w,null,null,null,null,null,null,null,null)
else{v=c
u=v.b
t=v.c
s=v.d
r=v.e
q=v.f
p=v.r
o=v.x
n=v.y
m=v.z
l=v.Q
k=v.ch
v=v.cx
c=P.eW(l,m,o,v,w,k,p,r,q,u,s,t,n)}try{v=P.iN(a,d,c,e)
return v}catch(j){y=H.a4(j)
x=H.ae(j)
v=z.b
if(v!=null)v.$2(y,x)
else z.a.$1(y)}return},
iN:function(a,b,c,d){return $.r.dB(c,b).ae(a,d)},
pB:{"^":"c:7;a",
$1:[function(a){var z,y
z=this.a
y=z.a
z.a=null
y.$0()},null,null,4,0,null,0,"call"]},
pA:{"^":"c;a,b,c",
$1:function(a){var z,y
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
pC:{"^":"c:0;a",
$0:[function(){this.a.$0()},null,null,0,0,null,"call"]},
pD:{"^":"c:0;a",
$0:[function(){this.a.$0()},null,null,0,0,null,"call"]},
iq:{"^":"a;a,0b,c",
hq:function(a,b){if(self.setTimeout!=null)this.b=self.setTimeout(H.b3(new P.rl(this,b),0),a)
else throw H.b(P.h("`setTimeout()` not found."))},
hr:function(a,b){if(self.setTimeout!=null)this.b=self.setInterval(H.b3(new P.rk(this,a,Date.now(),b),0),a)
else throw H.b(P.h("Periodic timer."))},
$isb0:1,
q:{
ri:function(a,b){var z=new P.iq(!0,0)
z.hq(a,b)
return z},
rj:function(a,b){var z=new P.iq(!1,0)
z.hr(a,b)
return z}}},
rl:{"^":"c:2;a,b",
$0:[function(){var z=this.a
z.b=null
z.c=1
this.b.$0()},null,null,0,0,null,"call"]},
rk:{"^":"c:0;a,b,c,d",
$0:[function(){var z,y,x,w
z=this.a
y=z.c+1
x=this.b
if(x>0){w=Date.now()-this.c
if(w>(y+1)*x)y=C.c.hh(w,x)}z.c=y
this.d.$1(z)},null,null,0,0,null,"call"]},
pw:{"^":"a;a,b,$ti",
ai:function(a,b){var z
if(this.b)this.a.ai(0,b)
else if(H.az(b,"$isV",this.$ti,"$asV")){z=this.a
b.bx(z.geW(z),z.gc9(),-1)}else P.cp(new P.py(this,b))},
bh:function(a,b){if(this.b)this.a.bh(a,b)
else P.cp(new P.px(this,a,b))}},
py:{"^":"c:0;a,b",
$0:[function(){this.a.a.ai(0,this.b)},null,null,0,0,null,"call"]},
px:{"^":"c:0;a,b,c",
$0:[function(){this.a.a.bh(this.b,this.c)},null,null,0,0,null,"call"]},
t5:{"^":"c:4;a",
$1:[function(a){return this.a.$2(0,a)},null,null,4,0,null,8,"call"]},
t6:{"^":"c:31;a",
$2:[function(a,b){this.a.$2(1,new H.e1(a,b))},null,null,8,0,null,1,2,"call"]},
ty:{"^":"c:39;a",
$2:[function(a,b){this.a(a,b)},null,null,8,0,null,22,8,"call"]},
cg:{"^":"ds;a,$ti"},
pL:{"^":"i2;dx,0dy,0fr,x,0a,0b,0c,d,e,0f,0r,$ti",
d5:function(){},
d6:function(){}},
eJ:{"^":"a;aV:c<,$ti",
gc0:function(){return this.c<4},
hR:function(){var z=this.r
if(z!=null)return z
z=new P.R(0,$.r,[null])
this.r=z
return z},
eC:function(a){var z,y
z=a.fr
y=a.dy
if(z==null)this.d=y
else z.dy=y
if(y==null)this.e=z
else y.fr=z
a.fr=a
a.dy=a},
eG:function(a,b,c,d){var z,y,x,w
if((this.c&4)!==0){if(c==null)c=P.iV()
z=new P.q1($.r,0,c)
z.iL()
return z}z=$.r
y=d?1:0
x=new P.pL(0,this,z,y,this.$ti)
x.dY(a,b,c,d,H.q(this,0))
x.fr=x
x.dy=x
x.dx=this.c&1
w=this.e
this.e=x
x.dy=null
x.fr=w
if(w==null)this.d=x
else w.dy=x
if(this.d===x)P.cQ(this.a)
return x},
eu:function(a){var z
if(a.dy===a)return
z=a.dx
if((z&2)!==0)a.dx=z|4
else{this.eC(a)
if((this.c&2)===0&&this.d==null)this.cM()}return},
ev:function(a){},
ew:function(a){},
cK:["hg",function(){if((this.c&4)!==0)return new P.bd("Cannot add new events after calling close")
return new P.bd("Cannot add new events while doing an addStream")}],
l:function(a,b){if(!this.gc0())throw H.b(this.cK())
this.aG(b)},
jh:function(a){var z
if((this.c&4)!==0)return this.r
if(!this.gc0())throw H.b(this.cK())
this.c|=4
z=this.hR()
this.be()
return z},
eg:function(a){var z,y,x,w
z=this.c
if((z&2)!==0)throw H.b(P.ay("Cannot fire new event. Controller is already firing an event"))
y=this.d
if(y==null)return
x=z&1
this.c=z^3
for(;y!=null;){z=y.dx
if((z&1)===x){y.dx=z|2
a.$1(y)
z=y.dx^=1
w=y.dy
if((z&4)!==0)this.eC(y)
y.dx&=4294967293
y=w}else y=y.dy}this.c&=4294967293
if(this.d==null)this.cM()},
cM:function(){if((this.c&4)!==0&&this.r.a===0)this.r.aT(null)
P.cQ(this.b)}},
cP:{"^":"eJ;a,b,c,0d,0e,0f,0r,$ti",
gc0:function(){return P.eJ.prototype.gc0.call(this)&&(this.c&2)===0},
cK:function(){if((this.c&2)!==0)return new P.bd("Cannot fire new event. Controller is already firing an event")
return this.hg()},
aG:function(a){var z=this.d
if(z==null)return
if(z===this.e){this.c|=2
z.cJ(0,a)
this.c&=4294967293
if(this.d==null)this.cM()
return}this.eg(new P.rc(a))},
be:function(){if(this.d!=null)this.eg(new P.rd())
else this.r.aT(null)}},
rc:{"^":"c;a",
$1:function(a){a.cJ(0,this.a)}},
rd:{"^":"c;",
$1:function(a){a.hD()}},
hZ:{"^":"eJ;a,b,c,0d,0e,0f,0r,$ti",
aG:function(a){var z
for(z=this.d;z!=null;z=z.dy)z.bB(new P.dt(a))},
be:function(){var z=this.d
if(z!=null)for(;z!=null;z=z.dy)z.bB(C.T)
else this.r.aT(null)}},
V:{"^":"a;$ti"},
ls:{"^":"c:0;a,b",
$0:[function(){var z,y,x,w
try{x=this.b.$0()
this.a.bZ(x)}catch(w){z=H.a4(w)
y=H.ae(w)
P.tb(this.a,z,y)}},null,null,0,0,null,"call"]},
lu:{"^":"c:3;a,b,c,d",
$2:[function(a,b){var z,y
z=this.a
y=--z.b
if(z.a!=null){z.a=null
if(z.b===0||this.c)this.d.a9(a,b)
else{z.c=a
z.d=b}}else if(y===0&&!this.c)this.d.a9(z.c,z.d)},null,null,8,0,null,23,24,"call"]},
lt:{"^":"c;a,b,c,d,e,f",
$1:[function(a){var z,y,x
z=this.a
y=--z.b
x=z.a
if(x!=null){x[this.b]=a
if(y===0)this.c.e6(x)}else if(z.b===0&&!this.e)this.c.a9(z.c,z.d)},null,null,4,0,null,3,"call"],
$S:function(){return{func:1,ret:P.x,args:[this.f]}}},
i1:{"^":"a;$ti",
bh:[function(a,b){var z
if(a==null)a=new P.br()
if(this.a.a!==0)throw H.b(P.ay("Future already completed"))
z=$.r.cc(a,b)
if(z!=null){a=z.a
if(a==null)a=new P.br()
b=z.b}this.a9(a,b)},function(a){return this.bh(a,null)},"eX","$2","$1","gc9",4,2,11,4,1,2]},
eH:{"^":"i1;a,$ti",
ai:function(a,b){var z=this.a
if(z.a!==0)throw H.b(P.ay("Future already completed"))
z.aT(b)},
a9:function(a,b){this.a.e_(a,b)}},
dy:{"^":"i1;a,$ti",
ai:[function(a,b){var z=this.a
if(z.a!==0)throw H.b(P.ay("Future already completed"))
z.bZ(b)},function(a){return this.ai(a,null)},"kU","$1","$0","geW",1,2,38,4,3],
a9:function(a,b){this.a.a9(a,b)}},
eM:{"^":"a;0a,b,c,d,e,$ti",
jY:function(a){if(this.c!==6)return!0
return this.b.b.b5(this.d,a.a,P.aG,P.a)},
jI:function(a){var z,y,x
z=this.e
y=P.a
x=this.b.b
if(H.bP(z,{func:1,args:[P.a,P.a6]}))return x.dP(z,a.a,a.b,null,y,P.a6)
else return x.b5(z,a.a,null,y)}},
R:{"^":"a;aV:a<,b,0iI:c<,$ti",
bx:function(a,b,c){var z=$.r
if(z!==C.d){a=z.b4(a,{futureOr:1,type:c},H.q(this,0))
if(b!=null)b=P.iL(b,z)}return this.dg(a,b,c)},
a2:function(a,b){return this.bx(a,null,b)},
dg:function(a,b,c){var z,y
z=new P.R(0,$.r,[c])
y=b==null?1:3
this.bX(new P.eM(z,y,a,b,[H.q(this,0),c]))
return z},
fO:function(a){var z,y
z=$.r
y=new P.R(0,z,this.$ti)
if(z!==C.d)a=z.bv(a,null)
z=H.q(this,0)
this.bX(new P.eM(y,8,a,null,[z,z]))
return y},
bX:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){z=this.c
y=z.a
if(y<4){z.bX(a)
return}this.a=y
this.c=z.c}this.b.aD(new P.qa(this,a))}},
eq:function(a){var z,y,x,w,v,u
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;v=w.a,v!=null;w=v);w.a=x}}else{if(y===2){y=this.c
u=y.a
if(u<4){y.eq(a)
return}this.a=u
this.c=y.c}z.a=this.c3(a)
this.b.aD(new P.qh(z,this))}},
c2:function(){var z=this.c
this.c=null
return this.c3(z)},
c3:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.a
z.a=y}return y},
bZ:function(a){var z,y
z=this.$ti
if(H.az(a,"$isV",z,"$asV"))if(H.az(a,"$isR",z,null))P.du(a,this)
else P.i4(a,this)
else{y=this.c2()
this.a=4
this.c=a
P.bH(this,y)}},
e6:function(a){var z=this.c2()
this.a=4
this.c=a
P.bH(this,z)},
a9:[function(a,b){var z=this.c2()
this.a=8
this.c=new P.bU(a,b)
P.bH(this,z)},function(a){return this.a9(a,null)},"kz","$2","$1","ghG",4,2,11,4,1,2],
aT:function(a){if(H.az(a,"$isV",this.$ti,"$asV")){this.hB(a)
return}this.a=1
this.b.aD(new P.qc(this,a))},
hB:function(a){if(H.az(a,"$isR",this.$ti,null)){if(a.a===8){this.a=1
this.b.aD(new P.qg(this,a))}else P.du(a,this)
return}P.i4(a,this)},
e_:function(a,b){this.a=1
this.b.aD(new P.qb(this,a,b))},
$isV:1,
q:{
q9:function(a,b,c){var z=new P.R(0,b,[c])
z.a=4
z.c=a
return z},
i4:function(a,b){var z,y,x
b.a=1
try{a.bx(new P.qd(b),new P.qe(b),null)}catch(x){z=H.a4(x)
y=H.ae(x)
P.cp(new P.qf(b,z,y))}},
du:function(a,b){var z,y
for(;z=a.a,z===2;)a=a.c
if(z>=4){y=b.c2()
b.a=a.a
b.c=a.c
P.bH(b,y)}else{y=b.c
b.a=2
b.c=a
a.eq(y)}},
bH:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y.b.bo(v.a,v.b)}return}for(;u=b.a,u!=null;b=u){b.a=null
P.bH(z.a,b)}y=z.a
t=y.c
x.a=w
x.b=t
v=!w
if(v){s=b.c
s=(s&1)!==0||s===8}else s=!0
if(s){s=b.b
r=s.b
if(w){y=y.b
y.toString
y=!((y==null?r==null:y===r)||y.gb_()===r.gb_())}else y=!1
if(y){y=z.a
v=y.c
y.b.bo(v.a,v.b)
return}q=$.r
if(q==null?r!=null:q!==r)$.r=r
else q=null
y=b.c
if(y===8)new P.qk(z,x,b,w).$0()
else if(v){if((y&1)!==0)new P.qj(x,b,t).$0()}else if((y&2)!==0)new P.qi(z,x,b).$0()
if(q!=null)$.r=q
y=x.b
if(!!J.v(y).$isV){if(y.a>=4){p=s.c
s.c=null
b=s.c3(p)
s.a=y.a
s.c=y.c
z.a=y
continue}else P.du(y,s)
return}}o=b.b
p=o.c
o.c=null
b=o.c3(p)
y=x.a
v=x.b
if(!y){o.a=4
o.c=v}else{o.a=8
o.c=v}z.a=o
y=o}}}},
qa:{"^":"c:0;a,b",
$0:[function(){P.bH(this.a,this.b)},null,null,0,0,null,"call"]},
qh:{"^":"c:0;a,b",
$0:[function(){P.bH(this.b,this.a.a)},null,null,0,0,null,"call"]},
qd:{"^":"c:7;a",
$1:[function(a){var z=this.a
z.a=0
z.bZ(a)},null,null,4,0,null,3,"call"]},
qe:{"^":"c:46;a",
$2:[function(a,b){this.a.a9(a,b)},function(a){return this.$2(a,null)},"$1",null,null,null,4,2,null,4,1,2,"call"]},
qf:{"^":"c:0;a,b,c",
$0:[function(){this.a.a9(this.b,this.c)},null,null,0,0,null,"call"]},
qc:{"^":"c:0;a,b",
$0:[function(){this.a.e6(this.b)},null,null,0,0,null,"call"]},
qg:{"^":"c:0;a,b",
$0:[function(){P.du(this.b,this.a)},null,null,0,0,null,"call"]},
qb:{"^":"c:0;a,b,c",
$0:[function(){this.a.a9(this.b,this.c)},null,null,0,0,null,"call"]},
qk:{"^":"c:2;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{w=this.c
z=w.b.b.ae(w.d,null)}catch(v){y=H.a4(v)
x=H.ae(v)
if(this.d){w=this.a.a.c.a
u=y
u=w==null?u==null:w===u
w=u}else w=!1
u=this.b
if(w)u.b=this.a.a.c
else u.b=new P.bU(y,x)
u.a=!0
return}if(!!J.v(z).$isV){if(z instanceof P.R&&z.gaV()>=4){if(z.gaV()===8){w=this.b
w.b=z.giI()
w.a=!0}return}t=this.a.a
w=this.b
w.b=z.a2(new P.ql(t),null)
w.a=!1}}},
ql:{"^":"c:59;a",
$1:[function(a){return this.a},null,null,4,0,null,0,"call"]},
qj:{"^":"c:2;a,b,c",
$0:function(){var z,y,x,w
try{x=this.b
this.a.b=x.b.b.b5(x.d,this.c,{futureOr:1,type:H.q(x,1)},H.q(x,0))}catch(w){z=H.a4(w)
y=H.ae(w)
x=this.a
x.b=new P.bU(z,y)
x.a=!0}}},
qi:{"^":"c:2;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.jY(z)&&w.e!=null){v=this.b
v.b=w.jI(z)
v.a=!1}}catch(u){y=H.a4(u)
x=H.ae(u)
w=this.a.a.c
v=w.a
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w
else s.b=new P.bU(y,x)
s.a=!0}}},
i_:{"^":"a;a,0b"},
ep:{"^":"a;$ti",
gi:function(a){var z,y
z={}
y=new P.R(0,$.r,[P.i])
z.a=0
this.cn(new P.nI(z,this),!0,new P.nJ(z,y),y.ghG())
return y}},
nI:{"^":"c;a,b",
$1:[function(a){++this.a.a},null,null,4,0,null,0,"call"],
$S:function(){return{func:1,ret:P.x,args:[H.a9(this.b,"ep",0)]}}},
nJ:{"^":"c:0;a,b",
$0:[function(){this.b.bZ(this.a.a)},null,null,0,0,null,"call"]},
nG:{"^":"a;"},
nH:{"^":"a;"},
ik:{"^":"a;aV:b<,$ti",
giz:function(){if((this.b&8)===0)return this.a
return this.a.gcz()},
hS:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.il(0)
this.a=z}return z}y=this.a
y.gcz()
return y.gcz()},
geH:function(){if((this.b&8)!==0)return this.a.gcz()
return this.a},
hw:function(){if((this.b&4)!==0)return new P.bd("Cannot add event after closing")
return new P.bd("Cannot add event while adding a stream")},
l:function(a,b){var z=this.b
if(z>=4)throw H.b(this.hw())
if((z&1)!==0)this.aG(b)
else if((z&3)===0)this.hS().l(0,new P.dt(b))},
eG:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.b(P.ay("Stream has already been listened to."))
z=$.r
y=d?1:0
x=new P.i2(this,z,y,this.$ti)
x.dY(a,b,c,d,H.q(this,0))
w=this.giz()
y=this.b|=1
if((y&8)!==0){v=this.a
v.scz(x)
C.v.kn(v)}else this.a=x
x.iO(w)
x.i2(new P.r2(this))
return x},
eu:function(a){var z,y
z=null
if((this.b&8)!==0)z=C.v.kT(this.a)
this.a=null
this.b=this.b&4294967286|2
y=new P.r1(this)
if(z!=null)z=z.fO(y)
else y.$0()
return z},
ev:function(a){if((this.b&8)!==0)C.v.l2(this.a)
P.cQ(this.e)},
ew:function(a){if((this.b&8)!==0)C.v.kn(this.a)
P.cQ(this.f)}},
r2:{"^":"c:0;a",
$0:function(){P.cQ(this.a.d)}},
r1:{"^":"c:2;a",
$0:[function(){var z=this.a.c
if(z!=null&&z.a===0)z.aT(null)},null,null,0,0,null,"call"]},
rf:{"^":"a;",
aG:function(a){this.geH().cJ(0,a)}},
pF:{"^":"a;",
aG:function(a){this.geH().bB(new P.dt(a))}},
pE:{"^":"ik+pF;0a,b,0c,d,e,f,r,$ti"},
re:{"^":"ik+rf;0a,b,0c,d,e,f,r,$ti"},
ds:{"^":"r3;a,$ti",
gH:function(a){return(H.bb(this.a)^892482866)>>>0},
T:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.ds))return!1
return b.a===this.a}},
i2:{"^":"eK;x,0a,0b,0c,d,e,0f,0r,$ti",
ep:function(){return this.x.eu(this)},
d5:function(){this.x.ev(this)},
d6:function(){this.x.ew(this)}},
eK:{"^":"a;aV:e<,$ti",
dY:function(a,b,c,d,e){var z,y,x,w
z=a==null?P.tL():a
y=this.d
this.a=y.b4(z,null,H.a9(this,"eK",0))
x=b==null?P.tM():b
if(H.bP(x,{func:1,ret:-1,args:[P.a,P.a6]}))this.b=y.cq(x,null,P.a,P.a6)
else if(H.bP(x,{func:1,ret:-1,args:[P.a]}))this.b=y.b4(x,null,P.a)
else H.F(P.ar("handleError callback must take either an Object (the error), or both an Object (the error) and a StackTrace."))
w=c==null?P.iV():c
this.c=y.bv(w,-1)},
iO:function(a){if(a==null)return
this.r=a
if(a.c!=null){this.e=(this.e|64)>>>0
a.cF(this)}},
hA:function(){var z,y
z=(this.e|8)>>>0
this.e=z
if((z&64)!==0){y=this.r
if(y.a===1)y.a=3}if((z&32)===0)this.r=null
this.f=this.ep()},
cJ:function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.aG(b)
else this.bB(new P.dt(b))},
hD:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.be()
else this.bB(C.T)},
d5:function(){},
d6:function(){},
ep:function(){return},
bB:function(a){var z,y
z=this.r
if(z==null){z=new P.il(0)
this.r=z}z.l(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.cF(this)}},
aG:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.ct(this.a,a,H.a9(this,"eK",0))
this.e=(this.e&4294967263)>>>0
this.e1((z&4)!==0)},
be:function(){var z,y
z=new P.pM(this)
this.hA()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.v(y).$isV&&y!==$.$get$fO())y.fO(z)
else z.$0()},
i2:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.e1((z&4)!==0)},
e1:function(a){var z,y,x
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
if(x)this.d5()
else this.d6()
z=(this.e&4294967263)>>>0
this.e=z}if((z&64)!==0&&z<128)this.r.cF(this)}},
pM:{"^":"c:2;a",
$0:[function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.aO(z.c)
z.e=(z.e&4294967263)>>>0},null,null,0,0,null,"call"]},
r3:{"^":"ep;$ti",
cn:function(a,b,c,d){return this.a.eG(a,d,c,!0===b)},
jW:function(a,b,c){return this.cn(a,null,b,c)},
b2:function(a){return this.cn(a,null,null,null)}},
pX:{"^":"a;0co:a*"},
dt:{"^":"pX;G:b>,0a",
fu:function(a){a.aG(this.b)}},
pW:{"^":"a;",
fu:function(a){a.be()},
gco:function(a){return},
sco:function(a,b){throw H.b(P.ay("No events after a done."))}},
qM:{"^":"a;aV:a<",
cF:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.cp(new P.qN(this,a))
this.a=1}},
qN:{"^":"c:0;a,b",
$0:[function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gco(x)
z.b=w
if(w==null)z.c=null
x.fu(this.b)},null,null,0,0,null,"call"]},
il:{"^":"qM;0b,0c,a",
l:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sco(0,b)
this.c=b}}},
q1:{"^":"a;a,aV:b<,c",
iL:function(){if((this.b&2)!==0)return
this.a.aD(this.giM())
this.b=(this.b|2)>>>0},
be:[function(){var z=(this.b&4294967293)>>>0
this.b=z
if(z>=4)return
this.b=(z|1)>>>0
z=this.c
if(z!=null)this.a.aO(z)},"$0","giM",0,0,2]},
r4:{"^":"a;0a,b,c"},
b0:{"^":"a;"},
bU:{"^":"a;a,b",
k:function(a){return H.e(this.a)},
$isac:1},
T:{"^":"a;a,b"},
eF:{"^":"a;"},
iC:{"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",$iseF:1,q:{
eW:function(a,b,c,d,e,f,g,h,i,j,k,l,m){return new P.iC(e,j,l,k,h,i,g,c,m,b,a,f,d)}}},
I:{"^":"a;"},
o:{"^":"a;"},
iB:{"^":"a;a",
f8:function(a,b,c){var z,y
z=this.a.gd0()
y=z.a
return z.b.$5(y,P.a7(y),a,b,c)},
$isI:1},
eV:{"^":"a;",$iso:1},
pP:{"^":"eV;0dc:a<,0de:b<,0dd:c<,0ey:d<,0ez:e<,0ex:f<,0ee:r<,0c4:x<,0cV:y<,0ea:z<,0er:Q<,0eh:ch<,0d0:cx<,0cy,aM:db>,el:dx<",
gec:function(){var z=this.cy
if(z!=null)return z
z=new P.iB(this)
this.cy=z
return z},
gb_:function(){return this.cx.a},
aO:function(a){var z,y,x
try{this.ae(a,-1)}catch(x){z=H.a4(x)
y=H.ae(x)
this.bo(z,y)}},
ct:function(a,b,c){var z,y,x
try{this.b5(a,b,-1,c)}catch(x){z=H.a4(x)
y=H.ae(x)
this.bo(z,y)}},
dj:function(a,b){return new P.pR(this,this.bv(a,b),b)},
jd:function(a,b,c){return new P.pT(this,this.b4(a,b,c),c,b)},
c7:function(a){return new P.pQ(this,this.bv(a,-1))},
eS:function(a,b){return new P.pS(this,this.b4(a,-1,b),b)},
h:function(a,b){var z,y,x,w
z=this.dx
y=z.h(0,b)
if(y!=null||z.bi(0,b))return y
x=this.db
if(x!=null){w=x.h(0,b)
if(w!=null)z.j(0,b,w)
return w}return},
bo:function(a,b){var z,y,x
z=this.cx
y=z.a
x=P.a7(y)
return z.b.$5(y,x,this,a,b)},
dB:function(a,b){var z,y,x
z=this.ch
y=z.a
x=P.a7(y)
return z.b.$5(y,x,this,a,b)},
ae:function(a,b){var z,y,x
z=this.a
y=z.a
x=P.a7(y)
return z.b.$1$4(y,x,this,a,b)},
b5:function(a,b,c,d){var z,y,x
z=this.b
y=z.a
x=P.a7(y)
return z.b.$2$5(y,x,this,a,b,c,d)},
dP:function(a,b,c,d,e,f){var z,y,x
z=this.c
y=z.a
x=P.a7(y)
return z.b.$3$6(y,x,this,a,b,c,d,e,f)},
bv:function(a,b){var z,y,x
z=this.d
y=z.a
x=P.a7(y)
return z.b.$1$4(y,x,this,a,b)},
b4:function(a,b,c){var z,y,x
z=this.e
y=z.a
x=P.a7(y)
return z.b.$2$4(y,x,this,a,b,c)},
cq:function(a,b,c,d){var z,y,x
z=this.f
y=z.a
x=P.a7(y)
return z.b.$3$4(y,x,this,a,b,c,d)},
cc:function(a,b){var z,y,x
z=this.r
y=z.a
if(y===C.d)return
x=P.a7(y)
return z.b.$5(y,x,this,a,b)},
aD:function(a){var z,y,x
z=this.x
y=z.a
x=P.a7(y)
return z.b.$4(y,x,this,a)},
dr:function(a,b){var z,y,x
z=this.y
y=z.a
x=P.a7(y)
return z.b.$5(y,x,this,a,b)},
fz:function(a,b){var z,y,x
z=this.Q
y=z.a
x=P.a7(y)
return z.b.$4(y,x,this,b)}},
pR:{"^":"c;a,b,c",
$0:function(){return this.a.ae(this.b,this.c)},
$S:function(){return{func:1,ret:this.c}}},
pT:{"^":"c;a,b,c,d",
$1:function(a){return this.a.b5(this.b,a,this.d,this.c)},
$S:function(){return{func:1,ret:this.d,args:[this.c]}}},
pQ:{"^":"c:2;a,b",
$0:[function(){return this.a.aO(this.b)},null,null,0,0,null,"call"]},
pS:{"^":"c;a,b,c",
$1:[function(a){return this.a.ct(this.b,a,this.c)},null,null,4,0,null,9,"call"],
$S:function(){return{func:1,ret:-1,args:[this.c]}}},
ts:{"^":"c:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.br()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.b(z)
x=H.b(z)
x.stack=y.k(0)
throw x}},
qR:{"^":"eV;",
gdc:function(){return C.bK},
gde:function(){return C.bM},
gdd:function(){return C.bL},
gey:function(){return C.bJ},
gez:function(){return C.bD},
gex:function(){return C.bC},
gee:function(){return C.bG},
gc4:function(){return C.bN},
gcV:function(){return C.bF},
gea:function(){return C.bB},
ger:function(){return C.bI},
geh:function(){return C.bH},
gd0:function(){return C.bE},
gaM:function(a){return},
gel:function(){return $.$get$ig()},
gec:function(){var z=$.ie
if(z!=null)return z
z=new P.iB(this)
$.ie=z
return z},
gb_:function(){return this},
aO:function(a){var z,y,x
try{if(C.d===$.r){a.$0()
return}P.f2(null,null,this,a)}catch(x){z=H.a4(x)
y=H.ae(x)
P.f1(null,null,this,z,y)}},
ct:function(a,b){var z,y,x
try{if(C.d===$.r){a.$1(b)
return}P.f3(null,null,this,a,b)}catch(x){z=H.a4(x)
y=H.ae(x)
P.f1(null,null,this,z,y)}},
dj:function(a,b){return new P.qT(this,a,b)},
c7:function(a){return new P.qS(this,a)},
eS:function(a,b){return new P.qU(this,a,b)},
h:function(a,b){return},
bo:function(a,b){P.f1(null,null,this,a,b)},
dB:function(a,b){return P.tr(null,null,this,a,b)},
ae:function(a){if($.r===C.d)return a.$0()
return P.f2(null,null,this,a)},
b5:function(a,b){if($.r===C.d)return a.$1(b)
return P.f3(null,null,this,a,b)},
dP:function(a,b,c){if($.r===C.d)return a.$2(b,c)
return P.iM(null,null,this,a,b,c)},
bv:function(a){return a},
b4:function(a){return a},
cq:function(a){return a},
cc:function(a,b){return},
aD:function(a){P.f4(null,null,this,a)},
dr:function(a,b){return P.ew(a,b)},
fz:function(a,b){H.fe(b)}},
qT:{"^":"c;a,b,c",
$0:function(){return this.a.ae(this.b,this.c)},
$S:function(){return{func:1,ret:this.c}}},
qS:{"^":"c:2;a,b",
$0:[function(){return this.a.aO(this.b)},null,null,0,0,null,"call"]},
qU:{"^":"c;a,b,c",
$1:[function(a){return this.a.ct(this.b,a,this.c)},null,null,4,0,null,9,"call"],
$S:function(){return{func:1,ret:-1,args:[this.c]}}},
uC:{"^":"c;a",
$5:function(a,b,c,d,e){var z,y,x,w,v,u
try{x=this.a
w=-1
v=P.a
if(x.b!=null)a.gaM(a).dP(x.b,d,e,w,v,P.a6)
else a.gaM(a).b5(x.a,d,w,v)}catch(u){z=H.a4(u)
y=H.ae(u)
x=z
if(x==null?d==null:x===d)b.f8(c,d,e)
else b.f8(c,z,y)}}}}],["","",,P,{"^":"",
dc:function(a,b,c,d,e){return new P.qm(0,[d,e])},
h3:function(a,b,c,d,e){return new H.bn(0,0,[d,e])},
bo:function(a,b,c){return H.iX(a,new H.bn(0,0,[b,c]))},
E:function(a,b){return new H.bn(0,0,[a,b])},
h4:function(){return new H.bn(0,0,[null,null])},
mf:function(a){return H.iX(a,new H.bn(0,0,[null,null]))},
h5:function(a,b,c,d){return new P.i7(0,0,[d])},
lT:function(a,b,c){var z=P.dc(null,null,null,b,c)
J.cq(a,new P.lU(z))
return z},
fW:function(a,b,c){var z,y
if(P.f0(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$cm()
y.push(a)
try{P.tm(a,z)}finally{y.pop()}y=P.dn(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
e7:function(a,b,c){var z,y,x
if(P.f0(a))return b+"..."+c
z=new P.aQ(b)
y=$.$get$cm()
y.push(a)
try{x=z
x.sam(P.dn(x.gam(),a,", "))}finally{y.pop()}y=z
y.sam(y.gam()+c)
y=z.gam()
return y.charCodeAt(0)==0?y:y},
f0:function(a){var z,y
for(z=0;y=$.$get$cm(),z<y.length;++z)if(a===y[z])return!0
return!1},
tm:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=J.aa(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.m())return
w=H.e(z.gu(z))
b.push(w)
y+=w.length+2;++x}if(!z.m()){if(x<=5)return
v=b.pop()
u=b.pop()}else{t=z.gu(z);++x
if(!z.m()){if(x<=4){b.push(H.e(t))
return}v=H.e(t)
u=b.pop()
y+=v.length+2}else{s=z.gu(z);++x
for(;z.m();t=s,s=r){r=z.gu(z);++x
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
md:function(a,b,c){var z=P.h3(null,null,null,b,c)
a.w(0,new P.me(z))
return z},
ee:function(a){var z,y,x
z={}
if(P.f0(a))return"{...}"
y=new P.aQ("")
try{$.$get$cm().push(a)
x=y
x.sam(x.gam()+"{")
z.a=!0
J.cq(a,new P.ml(z,y))
z=y
z.sam(z.gam()+"}")}finally{$.$get$cm().pop()}z=y.gam()
return z.charCodeAt(0)==0?z:z},
vN:[function(a){return a},"$1","u3",4,0,10],
mk:function(a,b,c,d){var z,y
for(z=0;z<3;++z){y=b[z]
a.j(0,P.u3().$1(y),d.$1(y))}},
qm:{"^":"hc;a,0b,0c,0d,0e,$ti",
gi:function(a){return this.a},
gX:function(a){return this.a!==0},
ga_:function(a){return new P.qn(this,[H.q(this,0)])},
bi:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
return z==null?!1:z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
return y==null?!1:y[b]!=null}else return this.hI(b)},
hI:function(a){var z=this.d
if(z==null)return!1
return this.aF(this.bE(z,a),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
y=z==null?null:P.eN(z,b)
return y}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
y=x==null?null:P.eN(x,b)
return y}else return this.hZ(0,b)},
hZ:function(a,b){var z,y,x
z=this.d
if(z==null)return
y=this.bE(z,b)
x=this.aF(y,b)
return x<0?null:y[x+1]},
j:function(a,b,c){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.eO()
this.b=z}this.e3(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.eO()
this.c=y}this.e3(y,b,c)}else this.iN(b,c)},
iN:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=P.eO()
this.d=z}y=this.bc(a)
x=z[y]
if(x==null){P.eP(z,y,[a,b]);++this.a
this.e=null}else{w=this.aF(x,a)
if(w>=0)x[w+1]=b
else{x.push(a,b);++this.a
this.e=null}}},
C:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.bD(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bD(this.c,b)
else return this.cT(0,b)},
cT:function(a,b){var z,y,x
z=this.d
if(z==null)return
y=this.bE(z,b)
x=this.aF(y,b)
if(x<0)return;--this.a
this.e=null
return y.splice(x,2)[1]},
w:function(a,b){var z,y,x,w
z=this.e7()
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.h(0,w))
if(z!==this.e)throw H.b(P.a1(this))}},
e7:function(){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.e
if(z!=null)return z
y=new Array(this.a)
y.fixed$length=Array
x=this.b
if(x!=null){w=Object.getOwnPropertyNames(x)
v=w.length
for(u=0,t=0;t<v;++t){y[u]=w[t];++u}}else u=0
s=this.c
if(s!=null){w=Object.getOwnPropertyNames(s)
v=w.length
for(t=0;t<v;++t){y[u]=+w[t];++u}}r=this.d
if(r!=null){w=Object.getOwnPropertyNames(r)
v=w.length
for(t=0;t<v;++t){q=r[w[t]]
p=q.length
for(o=0;o<p;o+=2){y[u]=q[o];++u}}}this.e=y
return y},
e3:function(a,b,c){if(a[b]==null){++this.a
this.e=null}P.eP(a,b,c)},
bD:function(a,b){var z
if(a!=null&&a[b]!=null){z=P.eN(a,b)
delete a[b];--this.a
this.e=null
return z}else return},
bc:function(a){return J.an(a)&0x3ffffff},
bE:function(a,b){return a[this.bc(b)]},
aF:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;y+=2)if(J.a5(a[y],b))return y
return-1},
q:{
eN:function(a,b){var z=a[b]
return z===a?null:z},
eP:function(a,b,c){if(c==null)a[b]=a
else a[b]=c},
eO:function(){var z=Object.create(null)
P.eP(z,"<non-identifier-key>",z)
delete z["<non-identifier-key>"]
return z}}},
qn:{"^":"n;a,$ti",
gi:function(a){return this.a.a},
gW:function(a){return this.a.a===0},
gI:function(a){var z=this.a
return new P.qo(z,z.e7(),0)}},
qo:{"^":"a;a,b,c,0d",
gu:function(a){return this.d},
m:function(){var z,y,x
z=this.b
y=this.c
x=this.a
if(z!==x.e)throw H.b(P.a1(x))
else if(y>=z.length){this.d=null
return!1}else{this.d=z[y]
this.c=y+1
return!0}}},
i7:{"^":"qp;a,0b,0c,0d,0e,0f,r,$ti",
gI:function(a){var z=new P.i8(this,this.r)
z.c=this.e
return z},
gi:function(a){return this.a},
gW:function(a){return this.a===0},
gX:function(a){return this.a!==0},
l:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.eQ()
this.b=z}return this.e2(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.eQ()
this.c=y}return this.e2(y,b)}else return this.hF(0,b)},
hF:function(a,b){var z,y,x
z=this.d
if(z==null){z=P.eQ()
this.d=z}y=this.bc(b)
x=z[y]
if(x==null)z[y]=[this.cS(b)]
else{if(this.aF(x,b)>=0)return!1
x.push(this.cS(b))}return!0},
C:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.bD(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bD(this.c,b)
else return this.cT(0,b)},
cT:function(a,b){var z,y,x
z=this.d
if(z==null)return!1
y=this.bE(z,b)
x=this.aF(y,b)
if(x<0)return!1
this.e5(y.splice(x,1)[0])
return!0},
e2:function(a,b){if(a[b]!=null)return!1
a[b]=this.cS(b)
return!0},
bD:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.e5(z)
delete a[b]
return!0},
e4:function(){this.r=this.r+1&67108863},
cS:function(a){var z,y
z=new P.qz(a)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.e4()
return z},
e5:function(a){var z,y
z=a.c
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.e4()},
bc:function(a){return J.an(a)&0x3ffffff},
bE:function(a,b){return a[this.bc(b)]},
aF:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a5(a[y].a,b))return y
return-1},
q:{
eQ:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
qB:{"^":"i7;a,0b,0c,0d,0e,0f,r,$ti",
bc:function(a){return H.uz(a)&0x3ffffff},
aF:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].a
if(x==null?b==null:x===b)return y}return-1}},
qz:{"^":"a;a,0b,0c"},
i8:{"^":"a;a,b,0c,0d",
gu:function(a){return this.d},
m:function(){var z=this.a
if(this.b!==z.r)throw H.b(P.a1(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}},
q:{
qA:function(a,b){var z=new P.i8(a,b)
z.c=a.e
return z}}},
lU:{"^":"c:3;a",
$2:function(a,b){this.a.j(0,a,b)}},
qp:{"^":"hv;"},
cz:{"^":"a;$ti",
aL:function(a,b,c){return H.eg(this,b,H.a9(this,"cz",0),c)},
w:function(a,b){var z
for(z=this.gI(this);z.m();)b.$1(z.gu(z))},
a3:function(a,b){var z,y
z=this.gI(this)
if(!z.m())return""
if(b===""){y=""
do y+=H.e(z.gu(z))
while(z.m())}else{y=H.e(z.gu(z))
for(;z.m();)y=y+b+H.e(z.gu(z))}return y.charCodeAt(0)==0?y:y},
gi:function(a){var z,y
z=this.gI(this)
for(y=0;z.m();)++y
return y},
gW:function(a){return!this.gI(this).m()},
gX:function(a){return!this.gW(this)},
k:function(a){return P.fW(this,"(",")")}},
m1:{"^":"l;"},
me:{"^":"c:3;a",
$2:function(a,b){this.a.j(0,a,b)}},
mg:{"^":"qC;",$isn:1,$isl:1,$ism:1},
p:{"^":"a;$ti",
gI:function(a){return new H.h6(a,this.gi(a),0)},
E:function(a,b){return this.h(a,b)},
w:function(a,b){var z,y
z=this.gi(a)
for(y=0;y<z;++y){b.$1(this.h(a,y))
if(z!==this.gi(a))throw H.b(P.a1(a))}},
gW:function(a){return this.gi(a)===0},
gX:function(a){return this.gi(a)!==0},
a3:function(a,b){var z
if(this.gi(a)===0)return""
z=P.dn("",a,b)
return z.charCodeAt(0)==0?z:z},
aL:function(a,b,c){return new H.bp(a,b,[H.dE(this,a,"p",0),c])},
bn:function(a,b,c){var z,y,x
z=this.gi(a)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.h(a,x))
if(z!==this.gi(a))throw H.b(P.a1(a))}return y},
cH:function(a,b){return H.er(a,b,null,H.dE(this,a,"p",0))},
l:function(a,b){var z=this.gi(a)
this.si(a,z+1)
this.j(a,z,b)},
C:function(a,b){var z
for(z=0;z<this.gi(a);++z)if(J.a5(this.h(a,z),b)){this.hE(a,z,z+1)
return!0}return!1},
hE:function(a,b,c){var z,y,x
z=this.gi(a)
y=c-b
for(x=c;x<z;++x)this.j(a,x-y,this.h(a,x))
this.si(a,z-y)},
ap:function(a){this.si(a,0)},
L:function(a,b){var z=H.d([],[H.dE(this,a,"p",0)])
C.b.si(z,this.gi(a)+J.Z(b))
C.b.aR(z,0,this.gi(a),a)
C.b.aR(z,this.gi(a),z.length,b)
return z},
bM:function(a,b,c,d){var z
P.aE(b,c,this.gi(a),null,null,null)
for(z=b;z<c;++z)this.j(a,z,d)},
bT:["h7",function(a,b,c,d,e){var z,y,x,w,v
P.aE(b,c,this.gi(a),null,null,null)
z=c-b
if(z===0)return
if(H.az(d,"$ism",[H.dE(this,a,"p",0)],"$asm")){y=e
x=d}else{x=J.jB(d,e).cu(0,!1)
y=0}w=J.J(x)
if(y+z>w.gi(x))throw H.b(H.fY())
if(y<b)for(v=z-1;v>=0;--v)this.j(a,b+v,w.h(x,y+v))
else for(v=0;v<z;++v)this.j(a,b+v,w.h(x,y+v))}],
k:function(a){return P.e7(a,"[","]")}},
hc:{"^":"aD;"},
ml:{"^":"c:3;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.e(a)
z.a=y+": "
z.a+=H.e(b)}},
aD:{"^":"a;$ti",
w:function(a,b){var z,y
for(z=J.aa(this.ga_(a));z.m();){y=z.gu(z)
b.$2(y,this.h(a,y))}},
gi:function(a){return J.Z(this.ga_(a))},
gX:function(a){return J.cX(this.ga_(a))},
k:function(a){return P.ee(a)},
$isQ:1},
rq:{"^":"a;",
j:function(a,b,c){throw H.b(P.h("Cannot modify unmodifiable map"))},
C:function(a,b){throw H.b(P.h("Cannot modify unmodifiable map"))}},
mo:{"^":"a;",
h:function(a,b){return J.cW(this.a,b)},
j:function(a,b,c){J.bS(this.a,b,c)},
w:function(a,b){J.cq(this.a,b)},
gX:function(a){return J.cX(this.a)},
gi:function(a){return J.Z(this.a)},
ga_:function(a){return J.js(this.a)},
C:function(a,b){return J.dR(this.a,b)},
k:function(a){return J.b5(this.a)},
$isQ:1},
ex:{"^":"rr;a,$ti"},
dm:{"^":"a;$ti",
gW:function(a){return this.gi(this)===0},
gX:function(a){return this.gi(this)!==0},
aL:function(a,b,c){return new H.e0(this,b,[H.a9(this,"dm",0),c])},
k:function(a){return P.e7(this,"{","}")},
a3:function(a,b){var z,y
z=this.gI(this)
if(!z.m())return""
if(b===""){y=""
do y+=H.e(z.d)
while(z.m())}else{y=H.e(z.d)
for(;z.m();)y=y+b+H.e(z.d)}return y.charCodeAt(0)==0?y:y},
$isn:1,
$isl:1,
$ishu:1},
hv:{"^":"dm;"},
qC:{"^":"a+p;"},
rr:{"^":"mo+rq;"}}],["","",,P,{"^":"",jS:{"^":"d3;a",
k0:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
d=P.aE(c,d,b.length,null,null,null)
z=$.$get$i0()
for(y=J.J(b),x=c,w=x,v=null,u=-1,t=-1,s=0;x<d;x=r){r=x+1
q=y.J(b,x)
if(q===37){p=r+2
if(p<=d){o=H.dG(C.a.J(b,r))
n=H.dG(C.a.J(b,r+1))
m=o*16+n-(n&256)
if(m===37)m=-1
r=p}else m=-1}else m=q
if(0<=m&&m<=127){l=z[m]
if(l>=0){m=C.a.S("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",l)
if(m===q)continue
q=m}else{if(l===-1){if(u<0){k=v==null?null:v.a.length
if(k==null)k=0
u=k+(x-w)
t=x}++s
if(q===61)continue}q=m}if(l!==-2){if(v==null)v=new P.aQ("")
v.a+=C.a.B(b,w,x)
v.a+=H.cI(q)
w=r
continue}}throw H.b(P.a_("Invalid base64 data",b,x))}if(v!=null){y=v.a+=y.B(b,w,d)
k=y.length
if(u>=0)P.fp(b,t,d,u,s,k)
else{j=C.c.a6(k-1,4)+1
if(j===1)throw H.b(P.a_("Invalid base64 encoding length ",b,d))
for(;j<4;){y+="="
v.a=y;++j}}y=v.a
return C.a.bw(b,c,d,y.charCodeAt(0)==0?y:y)}i=d-c
if(u>=0)P.fp(b,t,d,u,s,i)
else{j=C.c.a6(i,4)
if(j===1)throw H.b(P.a_("Invalid base64 encoding length ",b,d))
if(j>1)b=y.bw(b,d,d,j===2?"==":"=")}return b},
$asd3:function(){return[[P.m,P.i],P.f]},
q:{
fp:function(a,b,c,d,e,f){if(C.c.a6(f,4)!==0)throw H.b(P.a_("Invalid base64 padding, padded length must be multiple of four, is "+f,a,c))
if(d+e!==f)throw H.b(P.a_("Invalid base64 padding, '=' not at the end",a,b))
if(e>2)throw H.b(P.a_("Invalid base64 padding, more than two '=' characters",a,b))}}},jT:{"^":"bY;a",
$asbY:function(){return[[P.m,P.i],P.f]}},d3:{"^":"a;$ti"},bY:{"^":"nH;$ti"},l7:{"^":"d3;",
$asd3:function(){return[P.f,[P.m,P.i]]}},oh:{"^":"l7;a",
jp:function(a,b,c){return new P.hT(!1).bj(b)},
jo:function(a,b){return this.jp(a,b,null)},
gdu:function(){return C.aM}},on:{"^":"bY;",
bI:function(a,b,c){var z,y,x,w
z=a.length
P.aE(b,c,z,null,null,null)
y=z-b
if(y===0)return new Uint8Array(0)
x=new Uint8Array(y*3)
w=new P.rL(0,0,x)
if(w.hW(a,b,z)!==z)w.eL(J.fi(a,z-1),0)
return C.p.ag(x,0,w.b)},
bj:function(a){return this.bI(a,0,null)},
$asbY:function(){return[P.f,[P.m,P.i]]}},rL:{"^":"a;a,b,c",
eL:function(a,b){var z,y,x,w
z=this.c
y=this.b
x=y+1
if((b&64512)===56320){w=65536+((a&1023)<<10)|b&1023
this.b=x
z[y]=240|w>>>18
y=x+1
this.b=y
z[x]=128|w>>>12&63
x=y+1
this.b=x
z[y]=128|w>>>6&63
this.b=x+1
z[x]=128|w&63
return!0}else{this.b=x
z[y]=224|a>>>12
y=x+1
this.b=y
z[x]=128|a>>>6&63
this.b=y+1
z[y]=128|a&63
return!1}},
hW:function(a,b,c){var z,y,x,w,v,u,t,s
if(b!==c&&(J.fi(a,c-1)&64512)===55296)--c
for(z=this.c,y=z.length,x=J.a3(a),w=b;w<c;++w){v=x.J(a,w)
if(v<=127){u=this.b
if(u>=y)break
this.b=u+1
z[u]=v}else if((v&64512)===55296){if(this.b+3>=y)break
t=w+1
if(this.eL(v,C.a.J(a,t)))w=t}else if(v<=2047){u=this.b
s=u+1
if(s>=y)break
this.b=s
z[u]=192|v>>>6
this.b=s+1
z[s]=128|v&63}else{u=this.b
if(u+2>=y)break
s=u+1
this.b=s
z[u]=224|v>>>12
u=s+1
this.b=u
z[s]=128|v>>>6&63
this.b=u+1
z[u]=128|v&63}}return w}},hT:{"^":"bY;a",
bI:function(a,b,c){var z,y,x,w,v
z=P.oi(!1,a,b,c)
if(z!=null)return z
y=J.Z(a)
P.aE(b,c,y,null,null,null)
x=new P.aQ("")
w=new P.rI(!1,x,!0,0,0,0)
w.bI(a,b,y)
w.jD(0,a,y)
v=x.a
return v.charCodeAt(0)==0?v:v},
bj:function(a){return this.bI(a,0,null)},
$asbY:function(){return[[P.m,P.i],P.f]},
q:{
oi:function(a,b,c,d){if(b instanceof Uint8Array)return P.oj(!1,b,c,d)
return},
oj:function(a,b,c,d){var z,y,x
z=$.$get$hU()
if(z==null)return
y=0===c
if(y&&!0)return P.ez(z,b)
x=b.length
d=P.aE(c,d,x,null,null,null)
if(y&&d===x)return P.ez(z,b)
return P.ez(z,b.subarray(c,d))},
ez:function(a,b){if(P.ol(b))return
return P.om(a,b)},
om:function(a,b){var z,y
try{z=a.decode(b)
return z}catch(y){H.a4(y)}return},
ol:function(a){var z,y
z=a.length-2
for(y=0;y<z;++y)if(a[y]===237)if((a[y+1]&224)===160)return!0
return!1},
ok:function(){var z,y
try{z=new TextDecoder("utf-8",{fatal:true})
return z}catch(y){H.a4(y)}return}}},rI:{"^":"a;a,b,c,d,e,f",
jD:function(a,b,c){var z
if(this.e>0){z=P.a_("Unfinished UTF-8 octet sequence",b,c)
throw H.b(z)}},
bI:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.d
y=this.e
x=this.f
this.d=0
this.e=0
this.f=0
w=new P.rK(c)
v=new P.rJ(this,b,c,a)
$label0$0:for(u=J.J(a),t=this.b,s=b;!0;s=n){$label1$1:if(y>0){do{if(s===c)break $label0$0
r=u.h(a,s)
if((r&192)!==128){q=P.a_("Bad UTF-8 encoding 0x"+C.c.bQ(r,16),a,s)
throw H.b(q)}else{z=(z<<6|r&63)>>>0;--y;++s}}while(y>0)
if(z<=C.b0[x-1]){q=P.a_("Overlong encoding of 0x"+C.c.bQ(z,16),a,s-x-1)
throw H.b(q)}if(z>1114111){q=P.a_("Character outside valid Unicode range: 0x"+C.c.bQ(z,16),a,s-x-1)
throw H.b(q)}if(!this.c||z!==65279)t.a+=H.cI(z)
this.c=!1}for(q=s<c;q;){p=w.$2(a,s)
if(p>0){this.c=!1
o=s+p
v.$2(s,o)
if(o===c)break}else o=s
n=o+1
r=u.h(a,o)
if(r<0){m=P.a_("Negative UTF-8 code unit: -0x"+C.c.bQ(-r,16),a,n-1)
throw H.b(m)}else{if((r&224)===192){z=r&31
y=1
x=1
continue $label0$0}if((r&240)===224){z=r&15
y=2
x=2
continue $label0$0}if((r&248)===240&&r<245){z=r&7
y=3
x=3
continue $label0$0}m=P.a_("Bad UTF-8 encoding 0x"+C.c.bQ(r,16),a,n-1)
throw H.b(m)}}break $label0$0}if(y>0){this.d=z
this.e=y
this.f=x}}},rK:{"^":"c:65;a",
$2:function(a,b){var z,y,x,w
z=this.a
for(y=J.J(a),x=b;x<z;++x){w=y.h(a,x)
if((w&127)!==w)return x-b}return z-b}},rJ:{"^":"c:55;a,b,c,d",
$2:function(a,b){this.a.b.a+=P.hz(this.d,a,b)}}}],["","",,P,{"^":"",
cT:function(a,b,c){var z=H.n1(a,c)
if(z!=null)return z
if(b!=null)return b.$1(a)
throw H.b(P.a_(a,null,null))},
ld:function(a){if(a instanceof H.c)return a.k(0)
return"Instance of '"+H.c8(a)+"'"},
h7:function(a,b,c,d){var z,y,x
z=J.m2(a,d)
if(a!==0&&!0)for(y=z.length,x=0;x<y;++x)z[x]=b
return z},
b9:function(a,b,c){var z,y
z=H.d([],[c])
for(y=J.aa(a);y.m();)z.push(y.gu(y))
if(b)return z
return J.c4(z)},
mh:function(a,b){return J.h_(P.b9(a,!1,b))},
hz:function(a,b,c){var z
if(typeof a==="object"&&a!==null&&a.constructor===Array){z=a.length
c=P.aE(b,c,z,null,null,null)
return H.hp(b>0||c<z?C.b.ag(a,b,c):a)}if(!!J.v(a).$isej)return H.n3(a,b,P.aE(b,c,a.length,null,null,null))
return P.nK(a,b,c)},
nK:function(a,b,c){var z,y,x,w
if(b<0)throw H.b(P.M(b,0,J.Z(a),null,null))
z=c==null
if(!z&&c<b)throw H.b(P.M(c,b,J.Z(a),null,null))
y=J.aa(a)
for(x=0;x<b;++x)if(!y.m())throw H.b(P.M(b,0,x,null,null))
w=[]
if(z)for(;y.m();)w.push(y.gu(y))
else for(x=b;x<c;++x){if(!y.m())throw H.b(P.M(c,b,x,null,null))
w.push(y.gu(y))}return H.hp(w)},
el:function(a,b,c){return new H.ea(a,H.eb(a,c,!0,!1))},
c_:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.b5(a)
if(typeof a==="string")return JSON.stringify(a)
return P.ld(a)},
fK:function(a){return new P.q6(a)},
h8:function(a,b,c,d){var z,y,x
if(c){z=H.d([],[d])
C.b.si(z,a)}else{y=new Array(a)
y.fixed$length=Array
z=H.d(y,[d])}for(x=0;x<a;++x)z[x]=b.$1(x)
return z},
oa:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
c=a.length
z=b+5
if(c>=z){y=((J.fh(a,b+4)^58)*3|C.a.J(a,b)^100|C.a.J(a,b+1)^97|C.a.J(a,b+2)^116|C.a.J(a,b+3)^97)>>>0
if(y===0)return P.hO(b>0||c<c?C.a.B(a,b,c):a,5,null).gfL()
else if(y===32)return P.hO(C.a.B(a,z,c),0,null).gfL()}x=new Array(8)
x.fixed$length=Array
w=H.d(x,[P.i])
w[0]=0
x=b-1
w[1]=x
w[2]=x
w[7]=x
w[3]=b
w[4]=b
w[5]=c
w[6]=c
if(P.iO(a,b,c,0,w)>=14)w[7]=c
v=w[1]
if(v>=b)if(P.iO(a,b,v,20,w)===20)w[7]=v
u=w[2]+1
t=w[3]
s=w[4]
r=w[5]
q=w[6]
if(q<r)r=q
if(s<u||s<=v)s=r
if(t<u)t=s
p=w[7]<b
if(p)if(u>v+3){o=null
p=!1}else{x=t>b
if(x&&t+1===s){o=null
p=!1}else{if(!(r<c&&r===s+2&&J.cs(a,"..",s)))n=r>s+2&&J.cs(a,"/..",r-3)
else n=!0
if(n){o=null
p=!1}else{if(v===b+4)if(J.cs(a,"file",b)){if(u<=b){if(!C.a.bb(a,"/",s)){m="file:///"
y=3}else{m="file://"
y=2}a=m+C.a.B(a,s,c)
v-=b
z=y-b
r+=z
q+=z
c=a.length
b=0
u=7
t=7
s=7}else if(s===r)if(b===0&&!0){a=C.a.bw(a,s,r,"/");++r;++q;++c}else{a=C.a.B(a,b,s)+"/"+C.a.B(a,r,c)
v-=b
u-=b
t-=b
s-=b
z=1-b
r+=z
q+=z
c=a.length
b=0}o="file"}else if(C.a.bb(a,"http",b)){if(x&&t+3===s&&C.a.bb(a,"80",t+1))if(b===0&&!0){a=C.a.bw(a,t,s,"")
s-=3
r-=3
q-=3
c-=3}else{a=C.a.B(a,b,t)+C.a.B(a,s,c)
v-=b
u-=b
t-=b
z=3+b
s-=z
r-=z
q-=z
c=a.length
b=0}o="http"}else o=null
else if(v===z&&J.cs(a,"https",b)){if(x&&t+4===s&&J.cs(a,"443",t+1)){z=b===0&&!0
x=J.J(a)
if(z){a=x.bw(a,t,s,"")
s-=4
r-=4
q-=4
c-=3}else{a=x.B(a,b,t)+C.a.B(a,s,c)
v-=b
u-=b
t-=b
z=4+b
s-=z
r-=z
q-=z
c=a.length
b=0}}o="https"}else o=null
p=!0}}}else o=null
if(p){if(b>0||c<a.length){a=J.aK(a,b,c)
v-=b
u-=b
t-=b
s-=b
r-=b
q-=b}return new P.qW(a,v,u,t,s,r,q,o)}return P.rs(a,b,c,v,u,t,s,r,q,o)},
hQ:function(a,b){var z=P.f
return C.b.bn(H.d(a.split("&"),[z]),P.E(z,z),new P.od(b),[P.Q,P.f,P.f])},
o8:function(a,b,c){var z,y,x,w,v,u,t,s
z=new P.o9(a)
y=new Uint8Array(4)
for(x=b,w=x,v=0;x<c;++x){u=C.a.S(a,x)
if(u!==46){if((u^48)>9)z.$2("invalid character",x)}else{if(v===3)z.$2("IPv4 address should contain exactly 4 parts",x)
t=P.cT(C.a.B(a,w,x),null,null)
if(t>255)z.$2("each part must be in the range 0..255",w)
s=v+1
y[v]=t
w=x+1
v=s}}if(v!==3)z.$2("IPv4 address should contain exactly 4 parts",c)
t=P.cT(C.a.B(a,w,c),null,null)
if(t>255)z.$2("each part must be in the range 0..255",w)
y[v]=t
return y},
hP:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
if(c==null)c=a.length
z=new P.ob(a)
y=new P.oc(z,a)
if(a.length<2)z.$1("address is too short")
x=H.d([],[P.i])
for(w=b,v=w,u=!1,t=!1;w<c;++w){s=C.a.S(a,w)
if(s===58){if(w===b){++w
if(C.a.S(a,w)!==58)z.$2("invalid start colon.",w)
v=w}if(w===v){if(u)z.$2("only one wildcard `::` is allowed",w)
x.push(-1)
u=!0}else x.push(y.$2(v,w))
v=w+1}else if(s===46)t=!0}if(x.length===0)z.$1("too few parts")
r=v===c
q=C.b.gad(x)
if(r&&q!==-1)z.$2("expected a part after last `:`",c)
if(!r)if(!t)x.push(y.$2(v,c))
else{p=P.o8(a,v,c)
x.push((p[0]<<8|p[1])>>>0)
x.push((p[2]<<8|p[3])>>>0)}if(u){if(x.length>7)z.$1("an address with a wildcard must have less than 7 parts")}else if(x.length!==8)z.$1("an address without a wildcard must contain exactly 8 parts")
o=new Uint8Array(16)
for(q=x.length,n=9-q,w=0,m=0;w<q;++w){l=x[w]
if(l===-1)for(k=0;k<n;++k){o[m]=0
o[m+1]=0
m+=2}else{o[m]=C.c.aU(l,8)
o[m+1]=l&255
m+=2}}return o},
te:function(){var z,y,x,w,v
z=P.h8(22,new P.tg(),!0,P.dq)
y=new P.tf(z)
x=new P.th()
w=new P.ti()
v=y.$2(0,225)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",1)
x.$3(v,".",14)
x.$3(v,":",34)
x.$3(v,"/",3)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=y.$2(14,225)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",1)
x.$3(v,".",15)
x.$3(v,":",34)
x.$3(v,"/",234)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=y.$2(15,225)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",1)
x.$3(v,"%",225)
x.$3(v,":",34)
x.$3(v,"/",9)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=y.$2(1,225)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",1)
x.$3(v,":",34)
x.$3(v,"/",10)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=y.$2(2,235)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",139)
x.$3(v,"/",131)
x.$3(v,".",146)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=y.$2(3,235)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",11)
x.$3(v,"/",68)
x.$3(v,".",18)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=y.$2(4,229)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",5)
w.$3(v,"AZ",229)
x.$3(v,":",102)
x.$3(v,"@",68)
x.$3(v,"[",232)
x.$3(v,"/",138)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=y.$2(5,229)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",5)
w.$3(v,"AZ",229)
x.$3(v,":",102)
x.$3(v,"@",68)
x.$3(v,"/",138)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=y.$2(6,231)
w.$3(v,"19",7)
x.$3(v,"@",68)
x.$3(v,"/",138)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=y.$2(7,231)
w.$3(v,"09",7)
x.$3(v,"@",68)
x.$3(v,"/",138)
x.$3(v,"?",172)
x.$3(v,"#",205)
x.$3(y.$2(8,8),"]",5)
v=y.$2(9,235)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",11)
x.$3(v,".",16)
x.$3(v,"/",234)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=y.$2(16,235)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",11)
x.$3(v,".",17)
x.$3(v,"/",234)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=y.$2(17,235)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",11)
x.$3(v,"/",9)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=y.$2(10,235)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",11)
x.$3(v,".",18)
x.$3(v,"/",234)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=y.$2(18,235)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",11)
x.$3(v,".",19)
x.$3(v,"/",234)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=y.$2(19,235)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",11)
x.$3(v,"/",234)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=y.$2(11,235)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",11)
x.$3(v,"/",10)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=y.$2(12,236)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",12)
x.$3(v,"?",12)
x.$3(v,"#",205)
v=y.$2(13,237)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",13)
x.$3(v,"?",13)
w.$3(y.$2(20,245),"az",21)
v=y.$2(21,245)
w.$3(v,"az",21)
w.$3(v,"09",21)
x.$3(v,"+-.",21)
return z},
iO:function(a,b,c,d,e){var z,y,x,w,v,u
z=$.$get$iP()
for(y=J.a3(a),x=b;x<c;++x){w=z[d]
v=y.J(a,x)^96
u=w[v>95?31:v]
d=u&31
e[u>>>5]=x}return d},
mI:{"^":"c:37;a,b",
$2:function(a,b){var z,y,x
z=this.b
y=this.a
z.a+=y.a
x=z.a+=H.e(a.a)
z.a=x+": "
z.a+=H.e(P.c_(b))
y.a=", "}},
aG:{"^":"a;"},
"+bool":0,
bZ:{"^":"a;a,b",
l:function(a,b){return P.kJ(this.a+C.c.R(b.a,1000),this.b)},
gfn:function(){return this.a},
T:function(a,b){if(b==null)return!1
if(!(b instanceof P.bZ))return!1
return this.a===b.a&&this.b===b.b},
aX:function(a,b){return C.c.aX(this.a,b.a)},
gH:function(a){var z=this.a
return(z^C.c.aU(z,30))&1073741823},
k:function(a){var z,y,x,w,v,u,t
z=P.kK(H.n0(this))
y=P.cw(H.mZ(this))
x=P.cw(H.mV(this))
w=P.cw(H.mW(this))
v=P.cw(H.mY(this))
u=P.cw(H.n_(this))
t=P.kL(H.mX(this))
if(this.b)return z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t+"Z"
else return z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t},
q:{
kJ:function(a,b){var z,y
z=new P.bZ(a,b)
if(Math.abs(a)<=864e13)y=!1
else y=!0
if(y)H.F(P.ar("DateTime is outside valid range: "+z.gfn()))
return z},
kK:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+z
if(z>=10)return y+"00"+z
return y+"000"+z},
kL:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
cw:function(a){if(a>=10)return""+a
return"0"+a}}},
S:{"^":"O;"},
"+double":0,
as:{"^":"a;a",
L:function(a,b){return new P.as(this.a+b.a)},
at:function(a,b){return new P.as(this.a-b.a)},
al:function(a,b){return new P.as(C.c.a5(this.a*b))},
aQ:function(a,b){return this.a<b.a},
cE:function(a,b){return C.c.cE(this.a,b.gkA())},
bz:function(a,b){return this.a<=b.a},
T:function(a,b){if(b==null)return!1
if(!(b instanceof P.as))return!1
return this.a===b.a},
gH:function(a){return this.a&0x1FFFFFFF},
aX:function(a,b){return C.c.aX(this.a,b.a)},
k:function(a){var z,y,x,w,v
z=new P.l3()
y=this.a
if(y<0)return"-"+new P.as(0-y).k(0)
x=z.$1(C.c.R(y,6e7)%60)
w=z.$1(C.c.R(y,1e6)%60)
v=new P.l2().$1(y%1e6)
return""+C.c.R(y,36e8)+":"+H.e(x)+":"+H.e(w)+"."+H.e(v)},
aC:function(a){return new P.as(0-this.a)},
q:{
l1:function(a,b,c,d,e,f){return new P.as(864e8*a+36e8*b+6e7*e+1e6*f+1000*d+c)}}},
l2:{"^":"c;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
l3:{"^":"c;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
ac:{"^":"a;"},
br:{"^":"ac;",
k:function(a){return"Throw of null."}},
aW:{"^":"ac;a,b,c,d",
gcY:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gcX:function(){return""},
k:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.e(z)
w=this.gcY()+y+x
if(!this.a)return w
v=this.gcX()
u=P.c_(this.b)
return w+v+": "+H.e(u)},
q:{
ar:function(a){return new P.aW(!1,null,null,a)},
d_:function(a,b,c){return new P.aW(!0,a,b,c)}}},
cJ:{"^":"aW;e,f,a,b,c,d",
gcY:function(){return"RangeError"},
gcX:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.e(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.e(z)
else if(x>z)y=": Not in range "+H.e(z)+".."+H.e(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.e(z)}return y},
q:{
ng:function(a){return new P.cJ(null,null,!1,null,null,a)},
bu:function(a,b,c){return new P.cJ(null,null,!0,a,b,"Value not in range")},
M:function(a,b,c,d,e){return new P.cJ(b,c,!0,a,d,"Invalid value")},
aE:function(a,b,c,d,e,f){if(0>a||a>c)throw H.b(P.M(a,0,c,"start",f))
if(b!=null){if(a>b||b>c)throw H.b(P.M(b,a,c,"end",f))
return b}return c}}},
m_:{"^":"aW;e,i:f>,a,b,c,d",
gcY:function(){return"RangeError"},
gcX:function(){if(J.dL(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.e(z)},
q:{
P:function(a,b,c,d,e){var z=e!=null?e:J.Z(b)
return new P.m_(b,z,!0,a,c,"Index out of range")}}},
mH:{"^":"ac;a,b,c,d,e",
k:function(a){var z,y,x,w,v,u,t,s,r,q
z={}
y=new P.aQ("")
z.a=""
for(x=this.c,w=x.length,v=0,u="",t="";v<w;++v,t=", "){s=x[v]
y.a=u+t
u=y.a+=H.e(P.c_(s))
z.a=", "}this.d.w(0,new P.mI(z,y))
r=P.c_(this.a)
q=y.k(0)
x="NoSuchMethodError: method not found: '"+H.e(this.b.a)+"'\nReceiver: "+H.e(r)+"\nArguments: ["+q+"]"
return x},
q:{
hi:function(a,b,c,d,e){return new P.mH(a,b,c,d,e)}}},
o6:{"^":"ac;a",
k:function(a){return"Unsupported operation: "+this.a},
q:{
h:function(a){return new P.o6(a)}}},
o2:{"^":"ac;a",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"},
q:{
cc:function(a){return new P.o2(a)}}},
bd:{"^":"ac;a",
k:function(a){return"Bad state: "+this.a},
q:{
ay:function(a){return new P.bd(a)}}},
kv:{"^":"ac;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.e(P.c_(z))+"."},
q:{
a1:function(a){return new P.kv(a)}}},
mL:{"^":"a;",
k:function(a){return"Out of Memory"},
$isac:1},
hx:{"^":"a;",
k:function(a){return"Stack Overflow"},
$isac:1},
kH:{"^":"ac;a",
k:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+z+"' during its initialization"}},
q6:{"^":"a;a",
k:function(a){return"Exception: "+this.a}},
ln:{"^":"a;a,b,c",
k:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.a
y=z!=null&&""!==z?"FormatException: "+H.e(z):"FormatException"
x=this.c
w=this.b
if(typeof w!=="string")return x!=null?y+(" (at offset "+H.e(x)+")"):y
if(x!=null)z=x<0||x>w.length
else z=!1
if(z)x=null
if(x==null){if(w.length>78)w=C.a.B(w,0,75)+"..."
return y+"\n"+w}for(v=1,u=0,t=!1,s=0;s<x;++s){r=C.a.J(w,s)
if(r===10){if(u!==s||!t)++v
u=s+1
t=!1}else if(r===13){++v
u=s+1
t=!0}}y=v>1?y+(" (at line "+v+", character "+(x-u+1)+")\n"):y+(" (at character "+(x+1)+")\n")
q=w.length
for(s=x;s<w.length;++s){r=C.a.S(w,s)
if(r===10||r===13){q=s
break}}if(q-u>78)if(x-u<75){p=u+75
o=u
n=""
m="..."}else{if(q-x<75){o=q-75
p=q
m=""}else{o=x-36
p=x+36
m="..."}n="..."}else{p=q
o=u
n=""
m=""}l=C.a.B(w,o,p)
return y+n+l+m+"\n"+C.a.al(" ",x-o+n.length)+"^\n"},
q:{
a_:function(a,b,c){return new P.ln(a,b,c)}}},
c0:{"^":"a;"},
i:{"^":"O;"},
"+int":0,
l:{"^":"a;$ti",
jE:function(a,b){var z=H.a9(this,"l",0)
if(H.az(this,"$isn",[z],"$asn"))return H.e3(this,b,z)
return new H.e2(this,b,[z])},
aL:function(a,b,c){return H.eg(this,b,H.a9(this,"l",0),c)},
cA:["h5",function(a,b){return new H.bf(this,b,[H.a9(this,"l",0)])}],
f2:function(a,b,c){return new H.d9(this,b,[H.a9(this,"l",0),c])},
w:function(a,b){var z
for(z=this.gI(this);z.m();)b.$1(z.gu(z))},
a3:function(a,b){var z,y
z=this.gI(this)
if(!z.m())return""
if(b===""){y=""
do y+=H.e(z.gu(z))
while(z.m())}else{y=H.e(z.gu(z))
for(;z.m();)y=y+b+H.e(z.gu(z))}return y.charCodeAt(0)==0?y:y},
gi:function(a){var z,y
z=this.gI(this)
for(y=0;z.m();)++y
return y},
gW:function(a){return!this.gI(this).m()},
gX:function(a){return!this.gW(this)},
E:function(a,b){var z,y,x
if(b<0)H.F(P.M(b,0,null,"index",null))
for(z=this.gI(this),y=0;z.m();){x=z.gu(z)
if(b===y)return x;++y}throw H.b(P.P(b,this,"index",null,y))},
k:function(a){return P.fW(this,"(",")")}},
e8:{"^":"a;"},
m:{"^":"a;$ti",$isn:1,$isl:1},
"+List":0,
Q:{"^":"a;$ti"},
x:{"^":"a;",
gH:function(a){return P.a.prototype.gH.call(this,this)},
k:function(a){return"null"}},
"+Null":0,
O:{"^":"a;"},
"+num":0,
a:{"^":";",
T:function(a,b){return this===b},
gH:function(a){return H.bb(this)},
k:["h8",function(a){return"Instance of '"+H.c8(this)+"'"}],
dH:[function(a,b){throw H.b(P.hi(this,b.gfm(),b.gfv(),b.gfo(),null))},null,"gfq",5,0,null,15],
ga4:function(a){return new H.t(H.fa(this))},
toString:function(){return this.k(this)}},
dh:{"^":"a;"},
hu:{"^":"n;$ti"},
a6:{"^":"a;"},
r9:{"^":"a;a",
k:function(a){return this.a},
$isa6:1},
f:{"^":"a;"},
"+String":0,
aQ:{"^":"a;am:a@",
gi:function(a){return this.a.length},
k:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
q:{
dn:function(a,b,c){var z=J.aa(b)
if(!z.m())return a
if(c.length===0){do a+=H.e(z.gu(z))
while(z.m())}else{a+=H.e(z.gu(z))
for(;z.m();)a=a+c+H.e(z.gu(z))}return a}}},
cb:{"^":"a;"},
cO:{"^":"a;"},
od:{"^":"c:26;a",
$2:function(a,b){var z,y,x,w
z=J.J(b).fc(b,"=")
if(z===-1){if(b!=="")J.bS(a,P.eT(b,0,b.length,this.a,!0),"")}else if(z!==0){y=C.a.B(b,0,z)
x=C.a.a7(b,z+1)
w=this.a
J.bS(a,P.eT(y,0,y.length,w,!0),P.eT(x,0,x.length,w,!0))}return a}},
o9:{"^":"c:27;a",
$2:function(a,b){throw H.b(P.a_("Illegal IPv4 address, "+a,this.a,b))}},
ob:{"^":"c:34;a",
$2:function(a,b){throw H.b(P.a_("Illegal IPv6 address, "+a,this.a,b))},
$1:function(a){return this.$2(a,null)}},
oc:{"^":"c:35;a,b",
$2:function(a,b){var z
if(b-a>4)this.a.$2("an IPv6 part can only contain a maximum of 4 hex digits",a)
z=P.cT(C.a.B(this.b,a,b),null,16)
if(z<0||z>65535)this.a.$2("each part must be in the range of `0x0..0xFFFF`",a)
return z}},
ir:{"^":"a;dW:a<,b,c,d,dI:e>,f,r,0x,0y,0z,0Q,0ch",
gfM:function(){return this.b},
gdD:function(a){var z=this.c
if(z==null)return""
if(C.a.af(z,"["))return C.a.B(z,1,z.length-1)
return z},
gdJ:function(a){var z=this.d
if(z==null)return P.is(this.a)
return z},
gdN:function(a){var z=this.f
return z==null?"":z},
gdC:function(){var z=this.r
return z==null?"":z},
gfB:function(){var z,y
z=this.Q
if(z==null){z=this.f
y=P.f
y=new P.ex(P.hQ(z==null?"":z,C.m),[y,y])
this.Q=y
z=y}return z},
gf9:function(){return this.c!=null},
gfb:function(){return this.f!=null},
gfa:function(){return this.r!=null},
k:function(a){var z,y,x,w
z=this.y
if(z==null){z=this.a
y=z.length!==0?H.e(z)+":":""
x=this.c
w=x==null
if(!w||z==="file"){z=y+"//"
y=this.b
if(y.length!==0)z=z+H.e(y)+"@"
if(!w)z+=x
y=this.d
if(y!=null)z=z+":"+H.e(y)}else z=y
z+=H.e(this.e)
y=this.f
if(y!=null)z=z+"?"+y
y=this.r
if(y!=null)z=z+"#"+y
z=z.charCodeAt(0)==0?z:z
this.y=z}return z},
T:function(a,b){var z,y
if(b==null)return!1
if(this===b)return!0
if(!!J.v(b).$isey){z=this.a
y=b.gdW()
if(z==null?y==null:z===y)if(this.c!=null===b.gf9()){z=this.b
y=b.gfM()
if(z==null?y==null:z===y){z=this.gdD(this)
y=b.gdD(b)
if(z==null?y==null:z===y){z=this.gdJ(this)
y=b.gdJ(b)
if(z==null?y==null:z===y){z=this.e
y=b.gdI(b)
if(z==null?y==null:z===y){z=this.f
y=z==null
if(!y===b.gfb()){if(y)z=""
if(z===b.gdN(b)){z=this.r
y=z==null
if(!y===b.gfa()){if(y)z=""
z=z===b.gdC()}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1
return z}return!1},
gH:function(a){var z=this.z
if(z==null){z=C.a.gH(this.k(0))
this.z=z}return z},
$isey:1,
q:{
eU:function(a,b,c,d){var z,y,x,w,v
if(c===C.m){z=$.$get$ix().b
if(typeof b!=="string")H.F(H.N(b))
z=z.test(b)}else z=!1
if(z)return b
y=c.gdu().bj(b)
for(z=y.length,x=0,w="";x<z;++x){v=y[x]
if(v<128&&(a[v>>>4]&1<<(v&15))!==0)w+=H.cI(v)
else w=d&&v===32?w+"+":w+"%"+"0123456789ABCDEF"[v>>>4&15]+"0123456789ABCDEF"[v&15]}return w.charCodeAt(0)==0?w:w},
rs:function(a,b,c,d,e,f,g,h,i,j){var z,y,x,w,v,u,t
if(j==null)if(d>b)j=P.rC(a,b,d)
else{if(d===b)P.ci(a,b,"Invalid empty scheme")
j=""}if(e>b){z=d+3
y=z<e?P.rD(a,z,e-1):""
x=P.rx(a,e,f,!1)
w=f+1
v=w<g?P.rA(P.cT(J.aK(a,w,g),new P.rt(a,f),null),j):null}else{y=""
x=null
v=null}u=P.ry(a,g,h,null,j,x!=null)
t=h<i?P.rB(a,h+1,i,null):null
return new P.ir(j,y,x,v,u,t,i<c?P.rw(a,i+1,c):null)},
is:function(a){if(a==="http")return 80
if(a==="https")return 443
return 0},
ci:function(a,b,c){throw H.b(P.a_(c,a,b))},
rA:function(a,b){if(a!=null&&a===P.is(b))return
return a},
rx:function(a,b,c,d){var z,y
if(a==null)return
if(b===c)return""
if(C.a.S(a,b)===91){z=c-1
if(C.a.S(a,z)!==93)P.ci(a,b,"Missing end `]` to match `[` in host")
P.hP(a,b+1,z)
return C.a.B(a,b,c).toLowerCase()}for(y=b;y<c;++y)if(C.a.S(a,y)===58){P.hP(a,b,c)
return"["+a+"]"}return P.rF(a,b,c)},
rF:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p
for(z=b,y=z,x=null,w=!0;z<c;){v=C.a.S(a,z)
if(v===37){u=P.iz(a,z,!0)
t=u==null
if(t&&w){z+=3
continue}if(x==null)x=new P.aQ("")
s=C.a.B(a,y,z)
r=x.a+=!w?s.toLowerCase():s
if(t){u=C.a.B(a,z,z+3)
q=3}else if(u==="%"){u="%25"
q=1}else q=3
x.a=r+u
z+=q
y=z
w=!0}else if(v<127&&(C.b8[v>>>4]&1<<(v&15))!==0){if(w&&65<=v&&90>=v){if(x==null)x=new P.aQ("")
if(y<z){x.a+=C.a.B(a,y,z)
y=z}w=!1}++z}else if(v<=93&&(C.Z[v>>>4]&1<<(v&15))!==0)P.ci(a,z,"Invalid character")
else{if((v&64512)===55296&&z+1<c){p=C.a.S(a,z+1)
if((p&64512)===56320){v=65536|(v&1023)<<10|p&1023
q=2}else q=1}else q=1
if(x==null)x=new P.aQ("")
s=C.a.B(a,y,z)
x.a+=!w?s.toLowerCase():s
x.a+=P.it(v)
z+=q
y=z}}if(x==null)return C.a.B(a,b,c)
if(y<c){s=C.a.B(a,y,c)
x.a+=!w?s.toLowerCase():s}t=x.a
return t.charCodeAt(0)==0?t:t},
rC:function(a,b,c){var z,y,x
if(b===c)return""
if(!P.iv(J.a3(a).J(a,b)))P.ci(a,b,"Scheme not starting with alphabetic character")
for(z=b,y=!1;z<c;++z){x=C.a.J(a,z)
if(!(x<128&&(C.a_[x>>>4]&1<<(x&15))!==0))P.ci(a,z,"Illegal scheme character")
if(65<=x&&x<=90)y=!0}a=C.a.B(a,b,c)
return P.ru(y?a.toLowerCase():a)},
ru:function(a){if(a==="http")return"http"
if(a==="file")return"file"
if(a==="https")return"https"
if(a==="package")return"package"
return a},
rD:function(a,b,c){if(a==null)return""
return P.cj(a,b,c,C.b6)},
ry:function(a,b,c,d,e,f){var z,y,x,w
z=e==="file"
y=z||f
x=a==null
if(x&&d==null)return z?"/":""
x=!x
if(x&&d!=null)throw H.b(P.ar("Both path and pathSegments specified"))
if(x)w=P.cj(a,b,c,C.a1)
else{d.toString
w=new H.bp(d,new P.rz(),[H.q(d,0),P.f]).a3(0,"/")}if(w.length===0){if(z)return"/"}else if(y&&!C.a.af(w,"/"))w="/"+w
return P.rE(w,e,f)},
rE:function(a,b,c){var z=b.length===0
if(z&&!c&&!C.a.af(a,"/"))return P.rG(a,!z||c)
return P.rH(a)},
rB:function(a,b,c,d){if(a!=null)return P.cj(a,b,c,C.A)
return},
rw:function(a,b,c){if(a==null)return
return P.cj(a,b,c,C.A)},
iz:function(a,b,c){var z,y,x,w,v,u
z=b+2
if(z>=a.length)return"%"
y=J.a3(a).S(a,b+1)
x=C.a.S(a,z)
w=H.dG(y)
v=H.dG(x)
if(w<0||v<0)return"%"
u=w*16+v
if(u<127&&(C.b7[C.c.aU(u,4)]&1<<(u&15))!==0)return H.cI(c&&65<=u&&90>=u?(u|32)>>>0:u)
if(y>=97||x>=97)return C.a.B(a,b,b+3).toUpperCase()
return},
it:function(a){var z,y,x,w,v,u
if(a<128){z=new Array(3)
z.fixed$length=Array
y=H.d(z,[P.i])
y[0]=37
y[1]=C.a.J("0123456789ABCDEF",a>>>4)
y[2]=C.a.J("0123456789ABCDEF",a&15)}else{if(a>2047)if(a>65535){x=240
w=4}else{x=224
w=3}else{x=192
w=2}z=new Array(3*w)
z.fixed$length=Array
y=H.d(z,[P.i])
for(v=0;--w,w>=0;x=128){u=C.c.iR(a,6*w)&63|x
y[v]=37
y[v+1]=C.a.J("0123456789ABCDEF",u>>>4)
y[v+2]=C.a.J("0123456789ABCDEF",u&15)
v+=3}}return P.hz(y,0,null)},
cj:function(a,b,c,d){var z=P.iy(a,b,c,d,!1)
return z==null?J.aK(a,b,c):z},
iy:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q
for(z=!e,y=J.a3(a),x=b,w=x,v=null;x<c;){u=y.S(a,x)
if(u<127&&(d[u>>>4]&1<<(u&15))!==0)++x
else{if(u===37){t=P.iz(a,x,!1)
if(t==null){x+=3
continue}if("%"===t){t="%25"
s=1}else s=3}else if(z&&u<=93&&(C.Z[u>>>4]&1<<(u&15))!==0){P.ci(a,x,"Invalid character")
t=null
s=null}else{if((u&64512)===55296){r=x+1
if(r<c){q=C.a.S(a,r)
if((q&64512)===56320){u=65536|(u&1023)<<10|q&1023
s=2}else s=1}else s=1}else s=1
t=P.it(u)}if(v==null)v=new P.aQ("")
v.a+=C.a.B(a,w,x)
v.a+=H.e(t)
x+=s
w=x}}if(v==null)return
if(w<c)v.a+=y.B(a,w,c)
z=v.a
return z.charCodeAt(0)==0?z:z},
iw:function(a){if(J.a3(a).af(a,"."))return!0
return C.a.fc(a,"/.")!==-1},
rH:function(a){var z,y,x,w,v,u
if(!P.iw(a))return a
z=H.d([],[P.f])
for(y=a.split("/"),x=y.length,w=!1,v=0;v<x;++v){u=y[v]
if(J.a5(u,"..")){if(z.length!==0){z.pop()
if(z.length===0)z.push("")}w=!0}else if("."===u)w=!0
else{z.push(u)
w=!1}}if(w)z.push("")
return C.b.a3(z,"/")},
rG:function(a,b){var z,y,x,w,v,u
if(!P.iw(a))return!b?P.iu(a):a
z=H.d([],[P.f])
for(y=a.split("/"),x=y.length,w=!1,v=0;v<x;++v){u=y[v]
if(".."===u)if(z.length!==0&&C.b.gad(z)!==".."){z.pop()
w=!0}else{z.push("..")
w=!1}else if("."===u)w=!0
else{z.push(u)
w=!1}}y=z.length
if(y!==0)y=y===1&&z[0].length===0
else y=!0
if(y)return"./"
if(w||C.b.gad(z)==="..")z.push("")
if(!b)z[0]=P.iu(z[0])
return C.b.a3(z,"/")},
iu:function(a){var z,y,x
z=a.length
if(z>=2&&P.iv(J.fh(a,0)))for(y=1;y<z;++y){x=C.a.J(a,y)
if(x===58)return C.a.B(a,0,y)+"%3A"+C.a.a7(a,y+1)
if(x>127||(C.a_[x>>>4]&1<<(x&15))===0)break}return a},
rv:function(a,b){var z,y,x,w
for(z=J.a3(a),y=0,x=0;x<2;++x){w=z.S(a,b+x)
if(48<=w&&w<=57)y=y*16+w-48
else{w|=32
if(97<=w&&w<=102)y=y*16+w-87
else throw H.b(P.ar("Invalid URL encoding"))}}return y},
eT:function(a,b,c,d,e){var z,y,x,w,v,u
y=J.a3(a)
x=b
while(!0){if(!(x<c)){z=!0
break}w=y.S(a,x)
if(w<=127)if(w!==37)v=e&&w===43
else v=!0
else v=!0
if(v){z=!1
break}++x}if(z){if(C.m!==d)v=!1
else v=!0
if(v)return y.B(a,b,c)
else u=new H.ks(y.B(a,b,c))}else{u=H.d([],[P.i])
for(x=b;x<c;++x){w=y.S(a,x)
if(w>127)throw H.b(P.ar("Illegal percent encoding in URI"))
if(w===37){if(x+3>a.length)throw H.b(P.ar("Truncated URI"))
u.push(P.rv(a,x+1))
x+=2}else if(e&&w===43)u.push(32)
else u.push(w)}}return d.jo(0,u)},
iv:function(a){var z=a|32
return 97<=z&&z<=122}}},
rt:{"^":"c;a,b",
$1:function(a){throw H.b(P.a_("Invalid port",this.a,this.b+1))}},
rz:{"^":"c;",
$1:[function(a){return P.eU(C.b9,a,C.m,!1)},null,null,4,0,null,17,"call"]},
o7:{"^":"a;a,b,c",
gfL:function(){var z,y,x,w,v
z=this.c
if(z!=null)return z
z=this.a
y=this.b[0]+1
x=J.jv(z,"?",y)
w=z.length
if(x>=0){v=P.cj(z,x+1,w,C.A)
w=x}else v=null
z=new P.pV(this,"data",null,null,null,P.cj(z,y,w,C.a1),v,null)
this.c=z
return z},
k:function(a){var z=this.a
return this.b[0]===-1?"data:"+H.e(z):z},
q:{
hO:function(a,b,c){var z,y,x,w,v,u,t,s,r
z=H.d([b-1],[P.i])
for(y=a.length,x=b,w=-1,v=null;x<y;++x){v=C.a.J(a,x)
if(v===44||v===59)break
if(v===47){if(w<0){w=x
continue}throw H.b(P.a_("Invalid MIME type",a,x))}}if(w<0&&x>b)throw H.b(P.a_("Invalid MIME type",a,x))
for(;v!==44;){z.push(x);++x
for(u=-1;x<y;++x){v=C.a.J(a,x)
if(v===61){if(u<0)u=x}else if(v===59||v===44)break}if(u>=0)z.push(u)
else{t=C.b.gad(z)
if(v!==44||x!==t+7||!C.a.bb(a,"base64",t+1))throw H.b(P.a_("Expecting '='",a,x))
break}}z.push(x)
s=x+1
if((z.length&1)===1)a=C.aI.k0(0,a,s,y)
else{r=P.iy(a,s,y,C.A,!0)
if(r!=null)a=C.a.bw(a,s,y,r)}return new P.o7(a,z,c)}}},
tg:{"^":"c;",
$1:function(a){return new Uint8Array(96)}},
tf:{"^":"c:36;a",
$2:function(a,b){var z=this.a[a]
J.jq(z,0,96,b)
return z}},
th:{"^":"c;",
$3:function(a,b,c){var z,y
for(z=b.length,y=0;y<z;++y)a[C.a.J(b,y)^96]=c}},
ti:{"^":"c;",
$3:function(a,b,c){var z,y
for(z=C.a.J(b,0),y=C.a.J(b,1);z<=y;++z)a[(z^96)>>>0]=c}},
qW:{"^":"a;a,b,c,d,e,f,r,x,0y",
gf9:function(){return this.c>0},
gjJ:function(){return this.c>0&&this.d+1<this.e},
gfb:function(){return this.f<this.r},
gfa:function(){return this.r<this.a.length},
gil:function(){return this.b===4&&J.cr(this.a,"file")},
gej:function(){return this.b===4&&J.cr(this.a,"http")},
gek:function(){return this.b===5&&J.cr(this.a,"https")},
gdW:function(){var z,y
z=this.b
if(z<=0)return""
y=this.x
if(y!=null)return y
if(this.gej()){this.x="http"
z="http"}else if(this.gek()){this.x="https"
z="https"}else if(this.gil()){this.x="file"
z="file"}else if(z===7&&J.cr(this.a,"package")){this.x="package"
z="package"}else{z=J.aK(this.a,0,z)
this.x=z}return z},
gfM:function(){var z,y
z=this.c
y=this.b+3
return z>y?J.aK(this.a,y,z-1):""},
gdD:function(a){var z=this.c
return z>0?J.aK(this.a,z,this.d):""},
gdJ:function(a){if(this.gjJ())return P.cT(J.aK(this.a,this.d+1,this.e),null,null)
if(this.gej())return 80
if(this.gek())return 443
return 0},
gdI:function(a){return J.aK(this.a,this.e,this.f)},
gdN:function(a){var z,y
z=this.f
y=this.r
return z<y?J.aK(this.a,z+1,y):""},
gdC:function(){var z,y
z=this.r
y=this.a
return z<y.length?J.fl(y,z+1):""},
gfB:function(){if(!(this.f<this.r))return C.bc
var z=P.f
return new P.ex(P.hQ(this.gdN(this),C.m),[z,z])},
gH:function(a){var z=this.y
if(z==null){z=J.an(this.a)
this.y=z}return z},
T:function(a,b){var z,y
if(b==null)return!1
if(this===b)return!0
if(!!J.v(b).$isey){z=this.a
y=b.k(0)
return z==null?y==null:z===y}return!1},
k:function(a){return this.a},
$isey:1},
pV:{"^":"ir;cx,a,b,c,d,e,f,r,0x,0y,0z,0Q,0ch"}}],["","",,W,{"^":"",
ud:function(){return document},
fS:function(a,b,c){return W.lY(a,null,null,b,null,null,null,c).a2(new W.lX(),P.f)},
lY:function(a,b,c,d,e,f,g,h){var z,y,x,w
z=W.e6
y=new P.R(0,$.r,[z])
x=new P.eH(y,[z])
w=new XMLHttpRequest()
C.aR.k9(w,"GET",a,!0)
if(f!=null)w.responseType=f
W.ai(w,"load",new W.lZ(w,x),!1)
W.ai(w,"error",x.gc9(),!1)
w.send()
return y},
oG:function(a,b){return new WebSocket(a)},
dv:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
i6:function(a,b,c,d){var z,y
z=W.dv(W.dv(W.dv(W.dv(0,a),b),c),d)
y=536870911&z+((67108863&z)<<3)
y^=y>>>11
return 536870911&y+((16383&y)<<15)},
td:function(a){if(a==null)return
return W.eL(a)},
iF:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.eL(a)
if(!!J.v(z).$isU)return z
return}else return a},
iS:function(a,b){var z=$.r
if(z===C.d)return a
return z.eS(a,b)},
a2:{"^":"b7;","%":"HTMLBRElement|HTMLBaseElement|HTMLBodyElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLFrameSetElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMetaElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLParagraphElement|HTMLPictureElement|HTMLPreElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSlotElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTimeElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement;HTMLElement"},
uI:{"^":"en;0n:x=,0p:y=","%":"Accelerometer|LinearAccelerationSensor"},
uJ:{"^":"j;0i:length=",
C:function(a,b){return a.remove(b)},
"%":"AccessibleNodeList"},
jD:{"^":"a2;",
k:function(a){return String(a)},
"%":"HTMLAnchorElement"},
uL:{"^":"a2;",
k:function(a){return String(a)},
"%":"HTMLAreaElement"},
dS:{"^":"ag;",$isdS:1,"%":"BeforeUnloadEvent"},
dU:{"^":"j;",$isdU:1,"%":";Blob"},
uQ:{"^":"j;0G:value=","%":"BluetoothRemoteGATTDescriptor"},
k8:{"^":"a2;0G:value%","%":"HTMLButtonElement"},
dX:{"^":"a2;0v:height=,0t:width=",
dT:function(a,b,c){var z=a.getContext(b,P.u4(c,null))
return z},
$isdX:1,
"%":"HTMLCanvasElement"},
kd:{"^":"j;",
jB:function(a,b,c,d,e){a.fillText(b,c,d)},
ac:function(a,b,c,d){return this.jB(a,b,c,d,null)},
"%":"CanvasRenderingContext2D"},
uR:{"^":"G;0i:length=","%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
kn:{"^":"ag;",$iskn:1,"%":"CloseEvent"},
uS:{"^":"cv;0G:value%","%":"CSSKeywordValue"},
kE:{"^":"cv;",
l:function(a,b){return a.add(b)},
"%":";CSSNumericValue"},
uT:{"^":"d6;0i:length=","%":"CSSPerspective"},
uU:{"^":"cv;0n:x%,0p:y%","%":"CSSPositionValue"},
uV:{"^":"d6;0bg:angle},0n:x%,0p:y%","%":"CSSRotation"},
bj:{"^":"j;",$isbj:1,"%":"CSSCharsetRule|CSSConditionRule|CSSFontFaceRule|CSSGroupingRule|CSSImportRule|CSSKeyframeRule|CSSKeyframesRule|CSSMediaRule|CSSNamespaceRule|CSSPageRule|CSSRule|CSSStyleRule|CSSSupportsRule|CSSViewportRule|MozCSSKeyframeRule|MozCSSKeyframesRule|WebKitCSSKeyframeRule|WebKitCSSKeyframesRule"},
uW:{"^":"d6;0n:x%,0p:y%","%":"CSSScale"},
uX:{"^":"pO;0i:length=",
b8:function(a,b){var z=a.getPropertyValue(this.hx(a,b))
return z==null?"":z},
hx:function(a,b){var z,y
z=$.$get$fA()
y=z[b]
if(typeof y==="string")return y
y=this.iV(a,b)
z[b]=y
return y},
iV:function(a,b){var z
if(b.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,function(c,d){return d.toUpperCase()}) in a)return b
z=P.kS()+b
if(z in a)return z
return b},
gc8:function(a){return a.bottom},
gv:function(a){return a.height},
gbu:function(a){return a.left},
gbP:function(a){return a.right},
gaP:function(a){return a.top},
gt:function(a){return a.width},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
kF:{"^":"a;",
gc8:function(a){return this.b8(a,"bottom")},
gv:function(a){return this.b8(a,"height")},
gbu:function(a){return this.b8(a,"left")},
gbP:function(a){return this.b8(a,"right")},
gaP:function(a){return this.b8(a,"top")},
gt:function(a){return this.b8(a,"width")}},
cv:{"^":"j;","%":"CSSImageValue|CSSResourceValue|CSSURLImageValue;CSSStyleValue"},
d6:{"^":"j;","%":"CSSMatrixComponent|CSSSkew;CSSTransformComponent"},
uY:{"^":"cv;0i:length=","%":"CSSTransformValue"},
uZ:{"^":"d6;0n:x%,0p:y%","%":"CSSTranslation"},
v_:{"^":"kE;0G:value%","%":"CSSUnitValue"},
v0:{"^":"cv;0i:length=","%":"CSSUnparsedValue"},
v2:{"^":"a2;0G:value%","%":"HTMLDataElement"},
v3:{"^":"j;0i:length=",
eM:function(a,b,c){return a.add(b,c)},
l:function(a,b){return a.add(b)},
C:function(a,b){return a.remove(b)},
h:function(a,b){return a[b]},
"%":"DataTransferItemList"},
v4:{"^":"j;0n:x=,0p:y=","%":"DeviceAcceleration"},
kV:{"^":"G;",
jn:function(a,b,c,d){var z=a.createElementNS(b,c)
return z},
au:function(a,b,c){return this.jn(a,b,c,null)},
"%":"XMLDocument;Document"},
v5:{"^":"j;",
k:function(a){return String(a)},
"%":"DOMException"},
v6:{"^":"kX;",
gn:function(a){return a.x},
sn:function(a,b){a.x=b},
gp:function(a){return a.y},
sp:function(a,b){a.y=b},
"%":"DOMPoint"},
kX:{"^":"j;",
gn:function(a){return a.x},
gp:function(a){return a.y},
"%":";DOMPointReadOnly"},
v7:{"^":"pZ;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.P(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(P.h("Cannot resize immutable List."))},
E:function(a,b){return a[b]},
$isw:1,
$asw:function(){return[[P.ah,P.O]]},
$isn:1,
$asn:function(){return[[P.ah,P.O]]},
$isz:1,
$asz:function(){return[[P.ah,P.O]]},
$asp:function(){return[[P.ah,P.O]]},
$isl:1,
$asl:function(){return[[P.ah,P.O]]},
$ism:1,
$asm:function(){return[[P.ah,P.O]]},
"%":"ClientRectList|DOMRectList"},
kY:{"^":"j;",
k:function(a){return"Rectangle ("+H.e(a.left)+", "+H.e(a.top)+") "+H.e(this.gt(a))+" x "+H.e(this.gv(a))},
T:function(a,b){var z
if(b==null)return!1
if(!H.az(b,"$isah",[P.O],"$asah"))return!1
z=J.a8(b)
return a.left===z.gbu(b)&&a.top===z.gaP(b)&&this.gt(a)===z.gt(b)&&this.gv(a)===z.gv(b)},
gH:function(a){return W.i6(a.left&0x1FFFFFFF,a.top&0x1FFFFFFF,this.gt(a)&0x1FFFFFFF,this.gv(a)&0x1FFFFFFF)},
gc8:function(a){return a.bottom},
gv:function(a){return a.height},
gbu:function(a){return a.left},
gbP:function(a){return a.right},
gaP:function(a){return a.top},
gt:function(a){return a.width},
gn:function(a){return a.x},
gp:function(a){return a.y},
$isah:1,
$asah:function(){return[P.O]},
"%":";DOMRectReadOnly"},
v8:{"^":"q0;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.P(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(P.h("Cannot resize immutable List."))},
E:function(a,b){return a[b]},
$isw:1,
$asw:function(){return[P.f]},
$isn:1,
$asn:function(){return[P.f]},
$isz:1,
$asz:function(){return[P.f]},
$asp:function(){return[P.f]},
$isl:1,
$asl:function(){return[P.f]},
$ism:1,
$asm:function(){return[P.f]},
"%":"DOMStringList"},
v9:{"^":"j;0i:length=,0G:value%",
l:function(a,b){return a.add(b)},
C:function(a,b){return a.remove(b)},
"%":"DOMTokenList"},
b7:{"^":"G;",
geV:function(a){return new W.q2(a)},
k:function(a){return a.localName},
gfs:function(a){return new W.i3(a,"click",!1,[W.di])},
$isb7:1,
"%":";Element"},
va:{"^":"a2;0v:height=,0t:width=","%":"HTMLEmbedElement"},
ag:{"^":"j;0fJ:type=",$isag:1,"%":"AbortPaymentEvent|AnimationEvent|AnimationPlaybackEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|BackgroundFetchClickEvent|BackgroundFetchEvent|BackgroundFetchFailEvent|BackgroundFetchedEvent|BeforeInstallPromptEvent|BlobEvent|CanMakePaymentEvent|ClipboardEvent|CustomEvent|DeviceMotionEvent|DeviceOrientationEvent|ErrorEvent|ExtendableEvent|ExtendableMessageEvent|FetchEvent|FontFaceSetLoadEvent|ForeignFetchEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MojoInterfaceRequestEvent|MutationEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PaymentRequestEvent|PaymentRequestUpdateEvent|PopStateEvent|PresentationConnectionAvailableEvent|PresentationConnectionCloseEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCPeerConnectionIceEvent|RTCTrackEvent|SecurityPolicyViolationEvent|SensorErrorEvent|SpeechRecognitionError|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|SyncEvent|TrackEvent|TransitionEvent|USBConnectionEvent|VRDeviceEvent|VRDisplayEvent|VRSessionEvent|WebGLContextEvent|WebKitTransitionEvent;Event|InputEvent"},
U:{"^":"j;",
c6:["h1",function(a,b,c,d){if(c!=null)this.ht(a,b,c,d)},function(a,b,c){return this.c6(a,b,c,null)},"aW",null,null,"gkS",9,2,null],
ht:function(a,b,c,d){return a.addEventListener(b,H.b3(c,1),d)},
$isU:1,
"%":"AccessibleNode|AnalyserNode|Animation|ApplicationCache|AudioBufferSourceNode|AudioChannelMerger|AudioChannelSplitter|AudioDestinationNode|AudioGainNode|AudioNode|AudioPannerNode|AudioScheduledSourceNode|AudioWorkletNode|BackgroundFetchRegistration|BatteryManager|BiquadFilterNode|BluetoothDevice|BluetoothRemoteGATTCharacteristic|BroadcastChannel|CanvasCaptureMediaStreamTrack|ChannelMergerNode|ChannelSplitterNode|Clipboard|ConstantSourceNode|ConvolverNode|DOMApplicationCache|DataChannel|DedicatedWorkerGlobalScope|DelayNode|DynamicsCompressorNode|EventSource|GainNode|IDBDatabase|IDBOpenDBRequest|IDBRequest|IDBTransaction|IDBVersionChangeRequest|IIRFilterNode|JavaScriptAudioNode|MIDIAccess|MIDIInput|MIDIOutput|MIDIPort|MediaDevices|MediaElementAudioSourceNode|MediaKeySession|MediaQueryList|MediaRecorder|MediaSource|MediaStream|MediaStreamAudioDestinationNode|MediaStreamAudioSourceNode|MediaStreamTrack|MojoInterfaceInterceptor|NetworkInformation|Notification|OfflineResourceList|Oscillator|OscillatorNode|PannerNode|PaymentRequest|Performance|PermissionStatus|PresentationConnection|PresentationConnectionList|PresentationRequest|RTCDTMFSender|RTCDataChannel|RTCPeerConnection|RealtimeAnalyserNode|RemotePlayback|ScreenOrientation|ScriptProcessorNode|ServiceWorker|ServiceWorkerContainer|ServiceWorkerGlobalScope|ServiceWorkerRegistration|SharedWorker|SharedWorkerGlobalScope|SpeechRecognition|SpeechSynthesis|SpeechSynthesisUtterance|StereoPannerNode|USB|VR|VRDevice|VRDisplay|VRSession|WaveShaperNode|WebSocket|Worker|WorkerGlobalScope|WorkerPerformance|mozRTCPeerConnection|webkitAudioPannerNode|webkitRTCPeerConnection;EventTarget;ih|ii|io|ip"},
b8:{"^":"dU;",$isb8:1,"%":"File"},
fL:{"^":"q8;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.P(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(P.h("Cannot resize immutable List."))},
E:function(a,b){return a[b]},
$isw:1,
$asw:function(){return[W.b8]},
$isn:1,
$asn:function(){return[W.b8]},
$isz:1,
$asz:function(){return[W.b8]},
$asp:function(){return[W.b8]},
$isl:1,
$asl:function(){return[W.b8]},
$ism:1,
$asm:function(){return[W.b8]},
$isfL:1,
"%":"FileList"},
li:{"^":"U;",
gkm:function(a){var z=a.result
if(!!J.v(z).$isk9)return H.mx(z,0,null)
return z},
"%":"FileReader"},
vt:{"^":"U;0i:length=","%":"FileWriter"},
vv:{"^":"U;",
l:function(a,b){return a.add(b)},
"%":"FontFaceSet"},
vx:{"^":"a2;0i:length=","%":"HTMLFormElement"},
bl:{"^":"j;",$isbl:1,"%":"Gamepad"},
vy:{"^":"j;0G:value=","%":"GamepadButton"},
vz:{"^":"en;0n:x=,0p:y=","%":"Gyroscope"},
vA:{"^":"j;0i:length=","%":"History"},
vB:{"^":"qr;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.P(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(P.h("Cannot resize immutable List."))},
E:function(a,b){return a[b]},
$isw:1,
$asw:function(){return[W.G]},
$isn:1,
$asn:function(){return[W.G]},
$isz:1,
$asz:function(){return[W.G]},
$asp:function(){return[W.G]},
$isl:1,
$asl:function(){return[W.G]},
$ism:1,
$asm:function(){return[W.G]},
"%":"HTMLCollection|HTMLFormControlsCollection|HTMLOptionsCollection"},
lV:{"^":"kV;","%":"HTMLDocument"},
e6:{"^":"lW;",
l1:function(a,b,c,d,e,f){return a.open(b,c)},
k9:function(a,b,c,d){return a.open(b,c,d)},
$ise6:1,
"%":"XMLHttpRequest"},
lX:{"^":"c;",
$1:[function(a){return a.responseText},null,null,4,0,null,26,"call"]},
lZ:{"^":"c;a,b",
$1:function(a){var z,y,x,w,v
z=this.a
y=z.status
x=y>=200&&y<300
w=y>307&&y<400
y=x||y===0||y===304||w
v=this.b
if(y)v.ai(0,z)
else v.eX(a)}},
lW:{"^":"U;","%":"XMLHttpRequestUpload;XMLHttpRequestEventTarget"},
vC:{"^":"a2;0v:height=,0t:width=","%":"HTMLIFrameElement"},
vD:{"^":"j;0v:height=,0t:width=","%":"ImageBitmap"},
fU:{"^":"j;0v:height=,0t:width=",$isfU:1,"%":"ImageData"},
vE:{"^":"a2;0v:height=,0t:width=","%":"HTMLImageElement"},
m0:{"^":"a2;0v:height=,0G:value%,0t:width=","%":"HTMLInputElement"},
vJ:{"^":"a2;0G:value%","%":"HTMLLIElement"},
vL:{"^":"j;",
k:function(a){return String(a)},
"%":"Location"},
vM:{"^":"en;0n:x=,0p:y=","%":"Magnetometer"},
mr:{"^":"a2;","%":"HTMLAudioElement;HTMLMediaElement"},
vP:{"^":"j;0i:length=","%":"MediaList"},
ms:{"^":"ag;",$isms:1,"%":"MessageEvent"},
vQ:{"^":"U;",
c6:function(a,b,c,d){if(b==="message")a.start()
this.h1(a,b,c,!1)},
"%":"MessagePort"},
vR:{"^":"a2;0G:value%","%":"HTMLMeterElement"},
vS:{"^":"qD;",
h:function(a,b){return P.b4(a.get(b))},
w:function(a,b){var z,y
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.b4(y.value[1]))}},
ga_:function(a){var z=H.d([],[P.f])
this.w(a,new W.mt(z))
return z},
gi:function(a){return a.size},
gX:function(a){return a.size!==0},
j:function(a,b,c){throw H.b(P.h("Not supported"))},
C:function(a,b){throw H.b(P.h("Not supported"))},
$asaD:function(){return[P.f,null]},
$isQ:1,
$asQ:function(){return[P.f,null]},
"%":"MIDIInputMap"},
mt:{"^":"c:9;a",
$2:function(a,b){return this.a.push(a)}},
vT:{"^":"qE;",
h:function(a,b){return P.b4(a.get(b))},
w:function(a,b){var z,y
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.b4(y.value[1]))}},
ga_:function(a){var z=H.d([],[P.f])
this.w(a,new W.mu(z))
return z},
gi:function(a){return a.size},
gX:function(a){return a.size!==0},
j:function(a,b,c){throw H.b(P.h("Not supported"))},
C:function(a,b){throw H.b(P.h("Not supported"))},
$asaD:function(){return[P.f,null]},
$isQ:1,
$asQ:function(){return[P.f,null]},
"%":"MIDIOutputMap"},
mu:{"^":"c:9;a",
$2:function(a,b){return this.a.push(a)}},
bq:{"^":"j;",$isbq:1,"%":"MimeType"},
vU:{"^":"qG;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.P(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(P.h("Cannot resize immutable List."))},
E:function(a,b){return a[b]},
$isw:1,
$asw:function(){return[W.bq]},
$isn:1,
$asn:function(){return[W.bq]},
$isz:1,
$asz:function(){return[W.bq]},
$asp:function(){return[W.bq]},
$isl:1,
$asl:function(){return[W.bq]},
$ism:1,
$asm:function(){return[W.bq]},
"%":"MimeTypeArray"},
di:{"^":"hN;",
gk6:function(a){var z,y,x,w,v,u
if(!!a.offsetX)return new P.aO(a.offsetX,a.offsetY,[P.O])
else{z=a.target
if(!J.v(W.iF(z)).$isb7)throw H.b(P.h("offsetX is only supported on elements"))
y=W.iF(z)
z=a.clientX
x=a.clientY
w=[P.O]
v=y.getBoundingClientRect()
u=new P.aO(z,x,w).at(0,new P.aO(v.left,v.top,w))
return new P.aO(J.fm(u.a),J.fm(u.b),w)}},
$isdi:1,
"%":"WheelEvent;DragEvent|MouseEvent"},
G:{"^":"U;",
kf:function(a){var z=a.parentNode
if(z!=null)z.removeChild(a)},
kj:function(a,b){var z,y
try{z=a.parentNode
J.jl(z,b,a)}catch(y){H.a4(y)}return a},
k:function(a){var z=a.nodeValue
return z==null?this.h4(a):z},
iE:function(a,b,c){return a.replaceChild(b,c)},
$isG:1,
"%":"DocumentFragment|DocumentType|ShadowRoot;Node"},
w_:{"^":"qI;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.P(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(P.h("Cannot resize immutable List."))},
E:function(a,b){return a[b]},
$isw:1,
$asw:function(){return[W.G]},
$isn:1,
$asn:function(){return[W.G]},
$isz:1,
$asz:function(){return[W.G]},
$asp:function(){return[W.G]},
$isl:1,
$asl:function(){return[W.G]},
$ism:1,
$asm:function(){return[W.G]},
"%":"NodeList|RadioNodeList"},
w1:{"^":"a2;0v:height=,0t:width=","%":"HTMLObjectElement"},
w5:{"^":"U;0v:height=,0t:width=","%":"OffscreenCanvas"},
w6:{"^":"a2;0G:value%","%":"HTMLOptionElement"},
w7:{"^":"a2;0G:value%","%":"HTMLOutputElement"},
w8:{"^":"j;0v:height=,0t:width=","%":"PaintSize"},
w9:{"^":"a2;0G:value%","%":"HTMLParamElement"},
bt:{"^":"j;0i:length=",$isbt:1,"%":"Plugin"},
wb:{"^":"qP;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.P(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(P.h("Cannot resize immutable List."))},
E:function(a,b){return a[b]},
$isw:1,
$asw:function(){return[W.bt]},
$isn:1,
$asn:function(){return[W.bt]},
$isz:1,
$asz:function(){return[W.bt]},
$asp:function(){return[W.bt]},
$isl:1,
$asl:function(){return[W.bt]},
$ism:1,
$asm:function(){return[W.bt]},
"%":"PluginArray"},
we:{"^":"di;0v:height=,0t:width=","%":"PointerEvent"},
wf:{"^":"U;0G:value=","%":"PresentationAvailability"},
wg:{"^":"a2;0G:value%","%":"HTMLProgressElement"},
n5:{"^":"ag;",$isn5:1,"%":"ProgressEvent|ResourceProgressEvent"},
wj:{"^":"qV;",
h:function(a,b){return P.b4(a.get(b))},
w:function(a,b){var z,y
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.b4(y.value[1]))}},
ga_:function(a){var z=H.d([],[P.f])
this.w(a,new W.nw(z))
return z},
gi:function(a){return a.size},
gX:function(a){return a.size!==0},
j:function(a,b,c){throw H.b(P.h("Not supported"))},
C:function(a,b){throw H.b(P.h("Not supported"))},
$asaD:function(){return[P.f,null]},
$isQ:1,
$asQ:function(){return[P.f,null]},
"%":"RTCStatsReport"},
nw:{"^":"c:9;a",
$2:function(a,b){return this.a.push(a)}},
wk:{"^":"j;0v:height=,0t:width=","%":"Screen"},
wl:{"^":"a2;0i:length=,0G:value%","%":"HTMLSelectElement"},
en:{"^":"U;","%":"AbsoluteOrientationSensor|AmbientLightSensor|OrientationSensor|RelativeOrientationSensor;Sensor"},
bv:{"^":"U;",$isbv:1,"%":"SourceBuffer"},
wm:{"^":"ii;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.P(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(P.h("Cannot resize immutable List."))},
E:function(a,b){return a[b]},
$isw:1,
$asw:function(){return[W.bv]},
$isn:1,
$asn:function(){return[W.bv]},
$isz:1,
$asz:function(){return[W.bv]},
$asp:function(){return[W.bv]},
$isl:1,
$asl:function(){return[W.bv]},
$ism:1,
$asm:function(){return[W.bv]},
"%":"SourceBufferList"},
bw:{"^":"j;",$isbw:1,"%":"SpeechGrammar"},
wn:{"^":"qY;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.P(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(P.h("Cannot resize immutable List."))},
E:function(a,b){return a[b]},
$isw:1,
$asw:function(){return[W.bw]},
$isn:1,
$asn:function(){return[W.bw]},
$isz:1,
$asz:function(){return[W.bw]},
$asp:function(){return[W.bw]},
$isl:1,
$asl:function(){return[W.bw]},
$ism:1,
$asm:function(){return[W.bw]},
"%":"SpeechGrammarList"},
bx:{"^":"j;0i:length=",$isbx:1,"%":"SpeechRecognitionResult"},
wp:{"^":"r0;",
h:function(a,b){return a.getItem(b)},
j:function(a,b,c){a.setItem(b,c)},
C:function(a,b){var z=a.getItem(b)
a.removeItem(b)
return z},
w:function(a,b){var z,y
for(z=0;!0;++z){y=a.key(z)
if(y==null)return
b.$2(y,a.getItem(y))}},
ga_:function(a){var z=H.d([],[P.f])
this.w(a,new W.nF(z))
return z},
gi:function(a){return a.length},
gX:function(a){return a.key(0)!=null},
$asaD:function(){return[P.f,P.f]},
$isQ:1,
$asQ:function(){return[P.f,P.f]},
"%":"Storage"},
nF:{"^":"c:74;a",
$2:function(a,b){return this.a.push(a)}},
by:{"^":"j;",$isby:1,"%":"CSSStyleSheet|StyleSheet"},
wt:{"^":"a2;0G:value%","%":"HTMLTextAreaElement"},
wu:{"^":"j;0t:width=","%":"TextMetrics"},
bA:{"^":"U;",$isbA:1,"%":"TextTrack"},
bB:{"^":"U;",$isbB:1,"%":"TextTrackCue|VTTCue"},
ww:{"^":"rh;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.P(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(P.h("Cannot resize immutable List."))},
E:function(a,b){return a[b]},
$isw:1,
$asw:function(){return[W.bB]},
$isn:1,
$asn:function(){return[W.bB]},
$isz:1,
$asz:function(){return[W.bB]},
$asp:function(){return[W.bB]},
$isl:1,
$asl:function(){return[W.bB]},
$ism:1,
$asm:function(){return[W.bB]},
"%":"TextTrackCueList"},
wx:{"^":"ip;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.P(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(P.h("Cannot resize immutable List."))},
E:function(a,b){return a[b]},
$isw:1,
$asw:function(){return[W.bA]},
$isn:1,
$asn:function(){return[W.bA]},
$isz:1,
$asz:function(){return[W.bA]},
$asp:function(){return[W.bA]},
$isl:1,
$asl:function(){return[W.bA]},
$ism:1,
$asm:function(){return[W.bA]},
"%":"TextTrackList"},
wy:{"^":"j;0i:length=","%":"TimeRanges"},
bC:{"^":"j;",$isbC:1,"%":"Touch"},
nZ:{"^":"hN;",$isnZ:1,"%":"TouchEvent"},
o_:{"^":"rn;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.P(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(P.h("Cannot resize immutable List."))},
gad:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.b(P.ay("No elements"))},
E:function(a,b){return a[b]},
$isw:1,
$asw:function(){return[W.bC]},
$isn:1,
$asn:function(){return[W.bC]},
$isz:1,
$asz:function(){return[W.bC]},
$asp:function(){return[W.bC]},
$isl:1,
$asl:function(){return[W.bC]},
$ism:1,
$asm:function(){return[W.bC]},
"%":"TouchList"},
wz:{"^":"j;0i:length=","%":"TrackDefaultList"},
hN:{"^":"ag;","%":"CompositionEvent|FocusEvent|KeyboardEvent|TextEvent;UIEvent"},
wB:{"^":"j;",
k:function(a){return String(a)},
"%":"URL"},
wD:{"^":"j;0n:x=","%":"VRStageBoundsPoint"},
wE:{"^":"mr;0v:height=,0t:width=","%":"HTMLVideoElement"},
wF:{"^":"U;0i:length=","%":"VideoTrackList"},
wG:{"^":"U;0v:height=,0t:width=","%":"VisualViewport"},
wH:{"^":"j;0t:width=","%":"VTTRegion"},
oH:{"^":"U;",
geP:function(a){var z,y
z=P.O
y=new P.R(0,$.r,[z])
this.fE(a,new W.oI(new P.dy(y,[z])))
return y},
fE:function(a,b){this.hT(a)
return this.iF(a,W.iS(b,P.O))},
iF:function(a,b){return a.requestAnimationFrame(H.b3(b,1))},
hT:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
gaP:function(a){return W.td(a.top)},
"%":"DOMWindow|Window"},
oI:{"^":"c;a",
$1:[function(a){this.a.ai(0,a)},null,null,4,0,null,10,"call"]},
pI:{"^":"rU;0c,a,0b",$isdS:1},
pJ:{"^":"a;a",
jH:function(a,b){var z=P.eq(null,null,null,null,!0,W.dS)
W.ai(a,this.a,new W.pK(z),!1)
return new P.ds(z,[H.q(z,0)])},
jG:function(a){return this.jH(a,!1)}},
pK:{"^":"c;a",
$1:function(a){this.a.l(0,new W.pI(a))}},
wL:{"^":"G;0G:value%","%":"Attr"},
wM:{"^":"rW;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.P(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(P.h("Cannot resize immutable List."))},
E:function(a,b){return a[b]},
$isw:1,
$asw:function(){return[W.bj]},
$isn:1,
$asn:function(){return[W.bj]},
$isz:1,
$asz:function(){return[W.bj]},
$asp:function(){return[W.bj]},
$isl:1,
$asl:function(){return[W.bj]},
$ism:1,
$asm:function(){return[W.bj]},
"%":"CSSRuleList"},
wN:{"^":"kY;",
k:function(a){return"Rectangle ("+H.e(a.left)+", "+H.e(a.top)+") "+H.e(a.width)+" x "+H.e(a.height)},
T:function(a,b){var z
if(b==null)return!1
if(!H.az(b,"$isah",[P.O],"$asah"))return!1
z=J.a8(b)
return a.left===z.gbu(b)&&a.top===z.gaP(b)&&a.width===z.gt(b)&&a.height===z.gv(b)},
gH:function(a){return W.i6(a.left&0x1FFFFFFF,a.top&0x1FFFFFFF,a.width&0x1FFFFFFF,a.height&0x1FFFFFFF)},
gv:function(a){return a.height},
gt:function(a){return a.width},
gn:function(a){return a.x},
sn:function(a,b){a.x=b},
gp:function(a){return a.y},
sp:function(a,b){a.y=b},
"%":"ClientRect|DOMRect"},
wO:{"^":"rY;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.P(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(P.h("Cannot resize immutable List."))},
E:function(a,b){return a[b]},
$isw:1,
$asw:function(){return[W.bl]},
$isn:1,
$asn:function(){return[W.bl]},
$isz:1,
$asz:function(){return[W.bl]},
$asp:function(){return[W.bl]},
$isl:1,
$asl:function(){return[W.bl]},
$ism:1,
$asm:function(){return[W.bl]},
"%":"GamepadList"},
wP:{"^":"t_;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.P(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(P.h("Cannot resize immutable List."))},
E:function(a,b){return a[b]},
$isw:1,
$asw:function(){return[W.G]},
$isn:1,
$asn:function(){return[W.G]},
$isz:1,
$asz:function(){return[W.G]},
$asp:function(){return[W.G]},
$isl:1,
$asl:function(){return[W.G]},
$ism:1,
$asm:function(){return[W.G]},
"%":"MozNamedAttrMap|NamedNodeMap"},
wQ:{"^":"t1;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.P(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(P.h("Cannot resize immutable List."))},
E:function(a,b){return a[b]},
$isw:1,
$asw:function(){return[W.bx]},
$isn:1,
$asn:function(){return[W.bx]},
$isz:1,
$asz:function(){return[W.bx]},
$asp:function(){return[W.bx]},
$isl:1,
$asl:function(){return[W.bx]},
$ism:1,
$asm:function(){return[W.bx]},
"%":"SpeechRecognitionResultList"},
wR:{"^":"t3;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.P(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(P.h("Cannot resize immutable List."))},
E:function(a,b){return a[b]},
$isw:1,
$asw:function(){return[W.by]},
$isn:1,
$asn:function(){return[W.by]},
$isz:1,
$asz:function(){return[W.by]},
$asp:function(){return[W.by]},
$isl:1,
$asl:function(){return[W.by]},
$ism:1,
$asm:function(){return[W.by]},
"%":"StyleSheetList"},
q2:{"^":"fy;a",
ar:function(){var z,y,x,w,v
z=P.h5(null,null,null,P.f)
for(y=this.a.className.split(" "),x=y.length,w=0;w<x;++w){v=J.fn(y[w])
if(v.length!==0)z.l(0,v)}return z},
dS:function(a){this.a.className=a.a3(0," ")},
gi:function(a){return this.a.classList.length},
gW:function(a){return this.a.classList.length===0},
gX:function(a){return this.a.classList.length!==0},
l:function(a,b){var z,y
z=this.a.classList
y=z.contains(b)
z.add(b)
return!y},
C:function(a,b){var z,y,x
if(typeof b==="string"){z=this.a.classList
y=z.contains(b)
z.remove(b)
x=y}else x=!1
return x}},
q3:{"^":"ep;$ti",
cn:function(a,b,c,d){return W.ai(this.a,this.b,a,!1)}},
i3:{"^":"q3;a,b,c,$ti"},
q4:{"^":"nG;a,b,c,d,e",
iX:function(){var z=this.d
if(z!=null&&this.a<=0)J.jm(this.b,this.c,z,!1)},
q:{
ai:function(a,b,c,d){var z=new W.q4(0,a,b,c==null?null:W.iS(new W.q5(c),W.ag),!1)
z.iX()
return z}}},
q5:{"^":"c;a",
$1:[function(a){return this.a.$1(a)},null,null,4,0,null,16,"call"]},
W:{"^":"a;",
gI:function(a){return new W.lj(a,this.gi(a),-1)},
l:function(a,b){throw H.b(P.h("Cannot add to immutable List."))},
C:function(a,b){throw H.b(P.h("Cannot remove from immutable List."))},
bM:function(a,b,c,d){throw H.b(P.h("Cannot modify an immutable List."))}},
lj:{"^":"a;a,b,c,0d",
m:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.cW(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gu:function(a){return this.d}},
pU:{"^":"a;a",
gaP:function(a){return W.eL(this.a.top)},
$isU:1,
q:{
eL:function(a){if(a===window)return a
else return new W.pU(a)}}},
rU:{"^":"a;",
gfJ:function(a){return J.fk(this.a)},
$isag:1},
pO:{"^":"j+kF;"},
pY:{"^":"j+p;"},
pZ:{"^":"pY+W;"},
q_:{"^":"j+p;"},
q0:{"^":"q_+W;"},
q7:{"^":"j+p;"},
q8:{"^":"q7+W;"},
qq:{"^":"j+p;"},
qr:{"^":"qq+W;"},
qD:{"^":"j+aD;"},
qE:{"^":"j+aD;"},
qF:{"^":"j+p;"},
qG:{"^":"qF+W;"},
qH:{"^":"j+p;"},
qI:{"^":"qH+W;"},
qO:{"^":"j+p;"},
qP:{"^":"qO+W;"},
qV:{"^":"j+aD;"},
ih:{"^":"U+p;"},
ii:{"^":"ih+W;"},
qX:{"^":"j+p;"},
qY:{"^":"qX+W;"},
r0:{"^":"j+aD;"},
rg:{"^":"j+p;"},
rh:{"^":"rg+W;"},
io:{"^":"U+p;"},
ip:{"^":"io+W;"},
rm:{"^":"j+p;"},
rn:{"^":"rm+W;"},
rV:{"^":"j+p;"},
rW:{"^":"rV+W;"},
rX:{"^":"j+p;"},
rY:{"^":"rX+W;"},
rZ:{"^":"j+p;"},
t_:{"^":"rZ+W;"},
t0:{"^":"j+p;"},
t1:{"^":"t0+W;"},
t2:{"^":"j+p;"},
t3:{"^":"t2+W;"}}],["","",,P,{"^":"",
b4:function(a){var z,y,x,w,v
if(a==null)return
z=P.E(P.f,null)
y=Object.getOwnPropertyNames(a)
for(x=y.length,w=0;w<y.length;y.length===x||(0,H.aA)(y),++w){v=y[w]
z.j(0,v,a[v])}return z},
u4:function(a,b){var z={}
a.w(0,new P.u5(z))
return z},
u6:function(a){var z,y
z=new P.R(0,$.r,[null])
y=new P.eH(z,[null])
a.then(H.b3(new P.u7(y),1))["catch"](H.b3(new P.u8(y),1))
return z},
fF:function(){var z=$.fE
if(z==null){z=J.dO(window.navigator.userAgent,"Opera",0)
$.fE=z}return z},
kS:function(){var z,y
z=$.fB
if(z!=null)return z
y=$.fC
if(y==null){y=J.dO(window.navigator.userAgent,"Firefox",0)
$.fC=y}if(y)z="-moz-"
else{y=$.fD
if(y==null){y=!P.fF()&&J.dO(window.navigator.userAgent,"Trident/",0)
$.fD=y}if(y)z="-ms-"
else z=P.fF()?"-o-":"-webkit-"}$.fB=z
return z},
ra:{"^":"a;",
bN:function(a){var z,y,x
z=this.a
y=z.length
for(x=0;x<y;++x)if(z[x]===a)return x
z.push(a)
this.b.push(null)
return y},
aA:function(a){var z,y,x,w,v
z={}
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
y=J.v(a)
if(!!y.$isbZ)return new Date(a.a)
if(!!y.$isnk)throw H.b(P.cc("structured clone of RegExp"))
if(!!y.$isb8)return a
if(!!y.$isdU)return a
if(!!y.$isfL)return a
if(!!y.$isfU)return a
if(!!y.$ishd||!!y.$isei)return a
if(!!y.$isQ){x=this.bN(a)
w=this.b
v=w[x]
z.a=v
if(v!=null)return v
v={}
z.a=v
w[x]=v
y.w(a,new P.rb(z,this))
return z.a}if(!!y.$ism){x=this.bN(a)
v=this.b[x]
if(v!=null)return v
return this.jl(a,x)}throw H.b(P.cc("structured clone of other type"))},
jl:function(a,b){var z,y,x,w
z=J.J(a)
y=z.gi(a)
x=new Array(y)
this.b[b]=x
for(w=0;w<y;++w)x[w]=this.aA(z.h(a,w))
return x}},
rb:{"^":"c:3;a,b",
$2:function(a,b){this.a.a[a]=this.b.aA(b)}},
ps:{"^":"a;",
bN:function(a){var z,y,x,w
z=this.a
y=z.length
for(x=0;x<y;++x){w=z[x]
if(w==null?a==null:w===a)return x}z.push(a)
this.b.push(null)
return y},
aA:function(a){var z,y,x,w,v,u,t,s,r,q
z={}
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
if(a instanceof Date){y=a.getTime()
x=new P.bZ(y,!0)
if(Math.abs(y)<=864e13)w=!1
else w=!0
if(w)H.F(P.ar("DateTime is outside valid range: "+x.gfn()))
return x}if(a instanceof RegExp)throw H.b(P.cc("structured clone of RegExp"))
if(typeof Promise!="undefined"&&a instanceof Promise)return P.u6(a)
v=Object.getPrototypeOf(a)
if(v===Object.prototype||v===null){u=this.bN(a)
x=this.b
t=x[u]
z.a=t
if(t!=null)return t
t=P.h4()
z.a=t
x[u]=t
this.jF(a,new P.pt(z,this))
return z.a}if(a instanceof Array){s=a
u=this.bN(s)
x=this.b
t=x[u]
if(t!=null)return t
w=J.J(s)
r=w.gi(s)
t=this.c?new Array(r):s
x[u]=t
for(x=J.aq(t),q=0;q<r;++q)x.j(t,q,this.aA(w.h(s,q)))
return t}return a},
dm:function(a,b){this.c=b
return this.aA(a)}},
pt:{"^":"c:5;a,b",
$2:function(a,b){var z,y
z=this.a.a
y=this.b.aA(b)
J.bS(z,a,y)
return y}},
u5:{"^":"c:3;a",
$2:function(a,b){this.a[a]=b}},
eR:{"^":"ra;a,b"},
eG:{"^":"ps;a,b,c",
jF:function(a,b){var z,y,x,w
for(z=Object.keys(a),y=z.length,x=0;x<z.length;z.length===y||(0,H.aA)(z),++x){w=z[x]
b.$2(w,a[w])}}},
u7:{"^":"c:4;a",
$1:[function(a){return this.a.ai(0,a)},null,null,4,0,null,8,"call"]},
u8:{"^":"c:4;a",
$1:[function(a){return this.a.eX(a)},null,null,4,0,null,8,"call"]},
fy:{"^":"hv;",
eK:function(a){var z=$.$get$fz().b
if(typeof a!=="string")H.F(H.N(a))
if(z.test(a))return a
throw H.b(P.d_(a,"value","Not a valid class token"))},
k:function(a){return this.ar().a3(0," ")},
gI:function(a){var z=this.ar()
return P.qA(z,z.r)},
a3:function(a,b){return this.ar().a3(0,b)},
aL:function(a,b,c){var z=this.ar()
return new H.e0(z,b,[H.a9(z,"dm",0),c])},
gW:function(a){return this.ar().a===0},
gX:function(a){return this.ar().a!==0},
gi:function(a){return this.ar().a},
l:function(a,b){this.eK(b)
return this.jZ(0,new P.kD(b))},
C:function(a,b){var z,y
this.eK(b)
if(typeof b!=="string")return!1
z=this.ar()
y=z.C(0,b)
this.dS(z)
return y},
jZ:function(a,b){var z,y
z=this.ar()
y=b.$1(z)
this.dS(z)
return y},
$asn:function(){return[P.f]},
$asdm:function(){return[P.f]},
$asl:function(){return[P.f]},
$ashu:function(){return[P.f]}},
kD:{"^":"c;a",
$1:function(a){return a.l(0,this.a)}}}],["","",,P,{"^":"",
t9:function(a,b){var z,y
z=new P.R(0,$.r,[b])
y=new P.dy(z,[b])
a.toString
W.ai(a,"success",new P.ta(a,y),!1)
W.ai(a,"error",y.gc9(),!1)
return z},
kG:{"^":"j;","%":";IDBCursor"},
v1:{"^":"kG;",
gG:function(a){return new P.eG([],[],!1).dm(a.value,!1)},
"%":"IDBCursorWithValue"},
ta:{"^":"c:8;a,b",
$1:function(a){this.b.ai(0,new P.eG([],[],!1).dm(this.a.result,!1))}},
w2:{"^":"j;",
eM:function(a,b,c){var z,y,x,w,v
try{z=null
z=this.i9(a,b)
w=P.t9(z,null)
return w}catch(v){y=H.a4(v)
x=H.ae(v)
w=P.fN(y,x,null)
return w}},
l:function(a,b){return this.eM(a,b,null)},
ia:function(a,b,c){return a.add(new P.eR([],[]).aA(b))},
i9:function(a,b){return this.ia(a,b,null)},
"%":"IDBObjectStore"},
w3:{"^":"j;0G:value=","%":"IDBObservation"}}],["","",,P,{"^":"",
tc:function(a){var z,y
z=a.$dart_jsFunction
if(z!=null)return z
y=function(b,c){return function(){return b(c,Array.prototype.slice.apply(arguments))}}(P.t7,a)
y[$.$get$e_()]=a
a.$dart_jsFunction=y
return y},
t7:[function(a,b){var z=H.mT(a,b)
return z},null,null,8,0,null,11,32],
aT:function(a){if(typeof a=="function")return a
else return P.tc(a)}}],["","",,P,{"^":"",
nf:function(a){return C.U},
ch:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
i5:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
qv:{"^":"a;",
k_:function(a){if(a<=0||a>4294967296)throw H.b(P.ng("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
Y:function(){return Math.random()}},
aO:{"^":"a;n:a>,p:b>,$ti",
k:function(a){return"Point("+H.e(this.a)+", "+H.e(this.b)+")"},
T:function(a,b){var z
if(b==null)return!1
if(!H.az(b,"$isaO",[P.O],null))return!1
z=J.a8(b)
return J.a5(this.a,z.gn(b))&&J.a5(this.b,z.gp(b))},
gH:function(a){var z,y
z=J.an(this.a)
y=J.an(this.b)
return P.i5(P.ch(P.ch(0,z),y))},
L:function(a,b){return new P.aO(J.aj(this.a,b.a),J.aj(this.b,b.b),this.$ti)},
at:function(a,b){return new P.aO(J.dM(this.a,b.a),J.dM(this.b,b.b),this.$ti)},
al:function(a,b){return new P.aO(J.cV(this.a,b),J.cV(this.b,b),this.$ti)}},
qQ:{"^":"a;$ti",
gbP:function(a){return J.aj(this.a,this.c)},
gc8:function(a){return J.aj(this.b,this.d)},
k:function(a){return"Rectangle ("+H.e(this.a)+", "+H.e(this.b)+") "+H.e(this.c)+" x "+H.e(this.d)},
T:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(!H.az(b,"$isah",[P.O],"$asah"))return!1
z=this.a
y=J.a8(b)
x=J.v(z)
if(x.T(z,y.gbu(b))){w=this.b
v=J.v(w)
z=v.T(w,y.gaP(b))&&J.a5(x.L(z,this.c),y.gbP(b))&&J.a5(v.L(w,this.d),y.gc8(b))}else z=!1
return z},
gH:function(a){var z,y,x,w,v,u
z=this.a
y=J.v(z)
x=y.gH(z)
w=this.b
v=J.v(w)
u=v.gH(w)
z=J.an(y.L(z,this.c))
w=J.an(v.L(w,this.d))
return P.i5(P.ch(P.ch(P.ch(P.ch(0,x),u),z),w))},
fi:function(a,b){var z,y,x,w
z=this.a
y=b.a
x=J.cR(y)
w=J.aI(z)
if(w.bz(z,x.L(y,b.c)))if(x.bz(y,w.L(z,this.c))){z=this.b
y=b.b
x=J.cR(y)
w=J.aI(z)
z=w.bz(z,x.L(y,b.d))&&x.bz(y,w.L(z,this.d))}else z=!1
else z=!1
return z}},
ah:{"^":"qQ;bu:a>,aP:b>,t:c>,v:d>,$ti",q:{
bc:function(a,b,c,d,e){var z,y
z=J.iY(c)
z=z.aQ(c,0)?J.cV(z.aC(c),0):c
y=J.iY(d)
y=y.aQ(d,0)?J.cV(y.aC(d),0):d
return new P.ah(a,b,z,y,[e])}}}}],["","",,P,{"^":"",uK:{"^":"j;0G:value%","%":"SVGAngle"},vb:{"^":"Y;0v:height=,0t:width=,0n:x=,0p:y=","%":"SVGFEBlendElement"},vc:{"^":"Y;0v:height=,0t:width=,0n:x=,0p:y=","%":"SVGFEColorMatrixElement"},vd:{"^":"Y;0v:height=,0t:width=,0n:x=,0p:y=","%":"SVGFEComponentTransferElement"},ve:{"^":"Y;0v:height=,0t:width=,0n:x=,0p:y=","%":"SVGFECompositeElement"},vf:{"^":"Y;0v:height=,0t:width=,0n:x=,0p:y=","%":"SVGFEConvolveMatrixElement"},vg:{"^":"Y;0v:height=,0t:width=,0n:x=,0p:y=","%":"SVGFEDiffuseLightingElement"},vh:{"^":"Y;0v:height=,0t:width=,0n:x=,0p:y=","%":"SVGFEDisplacementMapElement"},vi:{"^":"Y;0v:height=,0t:width=,0n:x=,0p:y=","%":"SVGFEFloodElement"},vj:{"^":"Y;0v:height=,0t:width=,0n:x=,0p:y=","%":"SVGFEGaussianBlurElement"},vk:{"^":"Y;0v:height=,0t:width=,0n:x=,0p:y=","%":"SVGFEImageElement"},vl:{"^":"Y;0v:height=,0t:width=,0n:x=,0p:y=","%":"SVGFEMergeElement"},vm:{"^":"Y;0v:height=,0t:width=,0n:x=,0p:y=","%":"SVGFEMorphologyElement"},vn:{"^":"Y;0v:height=,0t:width=,0n:x=,0p:y=","%":"SVGFEOffsetElement"},vo:{"^":"Y;0n:x=,0p:y=","%":"SVGFEPointLightElement"},vp:{"^":"Y;0v:height=,0t:width=,0n:x=,0p:y=","%":"SVGFESpecularLightingElement"},vq:{"^":"Y;0n:x=,0p:y=","%":"SVGFESpotLightElement"},vr:{"^":"Y;0v:height=,0t:width=,0n:x=,0p:y=","%":"SVGFETileElement"},vs:{"^":"Y;0v:height=,0t:width=,0n:x=,0p:y=","%":"SVGFETurbulenceElement"},vu:{"^":"Y;0v:height=,0t:width=,0n:x=,0p:y=","%":"SVGFilterElement"},vw:{"^":"c1;0v:height=,0t:width=,0n:x=,0p:y=","%":"SVGForeignObjectElement"},lS:{"^":"c1;","%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},c1:{"^":"Y;","%":"SVGAElement|SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},vF:{"^":"c1;0v:height=,0t:width=,0n:x=,0p:y=","%":"SVGImageElement"},cA:{"^":"j;0G:value%",$iscA:1,"%":"SVGLength"},vK:{"^":"qy;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.P(b,a,null,null,null))
return a.getItem(b)},
j:function(a,b,c){throw H.b(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(P.h("Cannot resize immutable List."))},
E:function(a,b){return this.h(a,b)},
ap:function(a){return a.clear()},
$isn:1,
$asn:function(){return[P.cA]},
$asp:function(){return[P.cA]},
$isl:1,
$asl:function(){return[P.cA]},
$ism:1,
$asm:function(){return[P.cA]},
"%":"SVGLengthList"},vO:{"^":"Y;0v:height=,0t:width=,0n:x=,0p:y=","%":"SVGMaskElement"},cH:{"^":"j;0G:value%",$iscH:1,"%":"SVGNumber"},w0:{"^":"qL;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.P(b,a,null,null,null))
return a.getItem(b)},
j:function(a,b,c){throw H.b(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(P.h("Cannot resize immutable List."))},
E:function(a,b){return this.h(a,b)},
ap:function(a){return a.clear()},
$isn:1,
$asn:function(){return[P.cH]},
$asp:function(){return[P.cH]},
$isl:1,
$asl:function(){return[P.cH]},
$ism:1,
$asm:function(){return[P.cH]},
"%":"SVGNumberList"},wa:{"^":"Y;0v:height=,0t:width=,0n:x=,0p:y=","%":"SVGPatternElement"},wc:{"^":"j;0n:x%,0p:y%","%":"SVGPoint"},wd:{"^":"j;0i:length=","%":"SVGPointList"},wh:{"^":"j;0v:height=,0t:width=,0n:x%,0p:y%","%":"SVGRect"},wi:{"^":"lS;0v:height=,0t:width=,0n:x=,0p:y=","%":"SVGRectElement"},wr:{"^":"r8;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.P(b,a,null,null,null))
return a.getItem(b)},
j:function(a,b,c){throw H.b(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(P.h("Cannot resize immutable List."))},
E:function(a,b){return this.h(a,b)},
ap:function(a){return a.clear()},
$isn:1,
$asn:function(){return[P.f]},
$asp:function(){return[P.f]},
$isl:1,
$asl:function(){return[P.f]},
$ism:1,
$asm:function(){return[P.f]},
"%":"SVGStringList"},jO:{"^":"fy;a",
ar:function(){var z,y,x,w,v,u
z=this.a.getAttribute("class")
y=P.h5(null,null,null,P.f)
if(z==null)return y
for(x=z.split(" "),w=x.length,v=0;v<w;++v){u=J.fn(x[v])
if(u.length!==0)y.l(0,u)}return y},
dS:function(a){this.a.setAttribute("class",a.a3(0," "))}},Y:{"^":"b7;",
geV:function(a){return new P.jO(a)},
gfs:function(a){return new W.i3(a,"click",!1,[W.di])},
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEDropShadowElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGGradientElement|SVGLinearGradientElement|SVGMPathElement|SVGMarkerElement|SVGMetadataElement|SVGRadialGradientElement|SVGScriptElement|SVGSetElement|SVGStopElement|SVGStyleElement|SVGSymbolElement|SVGTitleElement|SVGViewElement;SVGElement"},ws:{"^":"c1;0v:height=,0t:width=,0n:x=,0p:y=","%":"SVGSVGElement"},nT:{"^":"c1;","%":"SVGTextPathElement;SVGTextContentElement"},wv:{"^":"nT;0n:x=,0p:y=","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement"},cN:{"^":"j;",$iscN:1,"%":"SVGTransform"},wA:{"^":"rp;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.P(b,a,null,null,null))
return a.getItem(b)},
j:function(a,b,c){throw H.b(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(P.h("Cannot resize immutable List."))},
E:function(a,b){return this.h(a,b)},
ap:function(a){return a.clear()},
$isn:1,
$asn:function(){return[P.cN]},
$asp:function(){return[P.cN]},
$isl:1,
$asl:function(){return[P.cN]},
$ism:1,
$asm:function(){return[P.cN]},
"%":"SVGTransformList"},wC:{"^":"c1;0v:height=,0t:width=,0n:x=,0p:y=","%":"SVGUseElement"},qx:{"^":"j+p;"},qy:{"^":"qx+W;"},qK:{"^":"j+p;"},qL:{"^":"qK+W;"},r7:{"^":"j+p;"},r8:{"^":"r7+W;"},ro:{"^":"j+p;"},rp:{"^":"ro+W;"}}],["","",,P,{"^":"",dq:{"^":"a;",$isn:1,
$asn:function(){return[P.i]},
$isl:1,
$asl:function(){return[P.i]},
$ism:1,
$asm:function(){return[P.i]}}}],["","",,P,{"^":"",uM:{"^":"j;0i:length=","%":"AudioBuffer"},uN:{"^":"j;0G:value%","%":"AudioParam"},uO:{"^":"pG;",
h:function(a,b){return P.b4(a.get(b))},
w:function(a,b){var z,y
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.b4(y.value[1]))}},
ga_:function(a){var z=H.d([],[P.f])
this.w(a,new P.jP(z))
return z},
gi:function(a){return a.size},
gX:function(a){return a.size!==0},
j:function(a,b,c){throw H.b(P.h("Not supported"))},
C:function(a,b){throw H.b(P.h("Not supported"))},
$asaD:function(){return[P.f,null]},
$isQ:1,
$asQ:function(){return[P.f,null]},
"%":"AudioParamMap"},jP:{"^":"c:9;a",
$2:function(a,b){return this.a.push(a)}},uP:{"^":"U;0i:length=","%":"AudioTrackList"},jU:{"^":"U;","%":"AudioContext|webkitAudioContext;BaseAudioContext"},w4:{"^":"jU;0i:length=","%":"OfflineAudioContext"},pG:{"^":"j+aD;"}}],["","",,P,{"^":"",fs:{"^":"j;",$isfs:1,"%":"WebGLBuffer"}}],["","",,P,{"^":"",wo:{"^":"r_;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.P(b,a,null,null,null))
return P.b4(a.item(b))},
j:function(a,b,c){throw H.b(P.h("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(P.h("Cannot resize immutable List."))},
E:function(a,b){return this.h(a,b)},
$isn:1,
$asn:function(){return[[P.Q,,,]]},
$asp:function(){return[[P.Q,,,]]},
$isl:1,
$asl:function(){return[[P.Q,,,]]},
$ism:1,
$asm:function(){return[[P.Q,,,]]},
"%":"SQLResultSetRowList"},qZ:{"^":"j+p;"},r_:{"^":"qZ+W;"}}],["","",,G,{"^":"",
u9:function(){var z=new G.ua(C.U)
return H.e(z.$0())+H.e(z.$0())+H.e(z.$0())},
nU:{"^":"a;"},
ua:{"^":"c:19;a",
$0:function(){return H.cI(97+this.a.k_(26))}}}],["","",,Y,{"^":"",
uv:[function(a){return new Y.qu(a==null?C.t:a)},function(){return Y.uv(null)},"$1","$0","uw",0,2,17],
qu:{"^":"c2;0b,0c,0d,0e,0f,0r,0x,0y,0z,a",
bs:function(a,b){var z
if(a===C.at){z=this.b
if(z==null){z=new T.jZ()
this.b=z}return z}if(a===C.aA)return this.b1(C.ar)
if(a===C.ar){z=this.c
if(z==null){z=new R.l_()
this.c=z}return z}if(a===C.F){z=this.d
if(z==null){z=Y.mz(!1)
this.d=z}return z}if(a===C.ah){z=this.e
if(z==null){z=G.u9()
this.e=z}return z}if(a===C.bl){z=this.f
if(z==null){z=new M.dY()
this.f=z}return z}if(a===C.bw){z=this.r
if(z==null){z=new G.nU()
this.r=z}return z}if(a===C.aC){z=this.x
if(z==null){z=new D.et(this.b1(C.F),0,!0,!1,H.d([],[P.c0]))
z.j4()
this.x=z}return z}if(a===C.as){z=this.y
if(z==null){z=N.le(this.b1(C.ai),this.b1(C.F))
this.y=z}return z}if(a===C.ai){z=this.z
if(z==null){z=H.d([new L.kW(),new N.m9()],[N.d8])
this.z=z}return z}if(a===C.x)return this
return b}}}],["","",,G,{"^":"",
tz:function(a){var z,y,x,w,v,u
z={}
y=$.iK
if(y==null){x=new D.hB(new H.bn(0,0,[null,D.et]),new D.qJ())
if($.ff==null)$.ff=new A.l0(document.head,new P.qB(0,0,[P.f]))
y=new K.k_()
x.b=y
y.ja(x)
y=P.a
y=P.bo([C.aB,x],y,y)
y=new A.mn(y,C.t)
$.iK=y}w=Y.uw().$1(y)
z.a=null
y=P.bo([C.ap,new G.tA(z),C.bk,new G.tB()],P.a,{func:1,ret:P.a})
v=a.$1(new G.qw(y,w==null?C.t:w))
u=w.as(0,C.F)
return u.f.ae(new G.tC(z,u,v,w),M.aY)},
tA:{"^":"c:28;a",
$0:function(){return this.a.a}},
tB:{"^":"c:29;",
$0:function(){return $.aU}},
tC:{"^":"c:30;a,b,c,d",
$0:[function(){var z,y,x
z=this.c
this.a.a=Y.jI(this.b,z.as(0,C.at),z)
y=z.as(0,C.ah)
x=z.as(0,C.aA)
$.aU=new Q.cY(y,this.d.as(0,C.as),x)
return z},null,null,0,0,null,"call"]},
qw:{"^":"c2;b,a",
bs:function(a,b){var z=this.b.h(0,a)
if(z==null){if(a===C.x)return this
return b}return z.$0()}}}],["","",,K,{"^":"",cG:{"^":"a;a,b,c",
sbO:function(a){var z,y,x,w,v
if(!Q.aV(this.c,a))return
z=this.b
if(a){y=this.a
z.toString
x=y.a
w=x.c
v=y.b.$2(w,x.a)
v.aY(0,w.f,w.a.e)
z.jc(v.a.b.a,z.gi(z))}else z.ap(0)
this.c=a}}}],["","",,Y,{"^":"",cZ:{"^":"kh;y,z,Q,ch,cx,0cy,0db,0a,0b,0c,d,e,f,r,x",
hi:function(a,b,c){var z,y
z=this.cx
y=z.d
this.cy=new P.cg(y,[H.q(y,0)]).b2(new Y.jJ(this))
z=z.b
this.db=new P.cg(z,[H.q(z,0)]).b2(new Y.jK(this))},
je:function(a,b){return this.ae(new Y.jM(this,a,b),[D.bX,b])},
im:function(a,b){var z,y,x
this.z.push(a)
z=a.a
y=z.a.b.a.a
x=y.x
if(x==null){x=H.d([],[{func:1,ret:-1}])
y.x=x
y=x}else y=x
y.push(new Y.jL(this,a,b))
this.e.push(z.a.b)
this.kq()},
hN:function(a){if(!C.b.C(this.z,a))return
C.b.C(this.e,a.a.a.b)},
q:{
jI:function(a,b,c){var z=new Y.cZ(H.d([],[{func:1,ret:-1}]),H.d([],[[D.bX,-1]]),b,c,a,!1,H.d([],[S.ft]),H.d([],[{func:1,ret:-1,args:[[S.A,-1],W.b7]}]),H.d([],[[S.A,-1]]),H.d([],[W.b7]))
z.hi(a,b,c)
return z}}},jJ:{"^":"c;a",
$1:[function(a){this.a.Q.$3(a.a,new P.r9(C.b.a3(a.b,"\n")),null)},null,null,4,0,null,16,"call"]},jK:{"^":"c:13;a",
$1:[function(a){var z=this.a
z.cx.f.aO(z.gkp())},null,null,4,0,null,0,"call"]},jM:{"^":"c;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p
z=this.b
y=this.a
x=y.ch
w=z.b.$2(null,null)
v=w.a
v.f=x
v.e=C.o
u=w.V()
v=document
t=v.querySelector(z.a)
if(t!=null){s=u.c
z=s.id
if(z==null||z.length===0)s.id=t.id
J.jA(t,s)
z=s
r=z}else{z=v.body
v=u.c
z.appendChild(v)
z=v
r=null}v=u.a
q=u.b
p=new G.fH(v,q,C.t).cB(0,C.aC,null)
if(p!=null)x.as(0,C.aB).a.j(0,z,p)
y.im(u,r)
return u},
$S:function(){return{func:1,ret:[D.bX,this.c]}}},jL:{"^":"c:0;a,b,c",
$0:function(){this.a.hN(this.b)
var z=this.c
if(!(z==null))J.jz(z)}}}],["","",,S,{"^":"",ft:{"^":"a;"}}],["","",,M,{"^":"",kh:{"^":"a;",
kq:[function(){var z,y,x
try{$.d2=this
this.d=!0
this.iJ()}catch(x){z=H.a4(x)
y=H.ae(x)
if(!this.iK())this.Q.$3(z,y,"DigestTick")
throw x}finally{$.d2=null
this.d=!1
this.eD()}},"$0","gkp",0,0,2],
iJ:function(){var z,y,x
z=this.e
y=z.length
for(x=0;x<y;++x)z[x].a.aw()},
iK:function(){var z,y,x,w
z=this.e
y=z.length
for(x=0;x<y;++x){w=z[x].a
this.a=w
w.aw()}return this.hC()},
hC:function(){var z=this.a
if(z!=null){this.kk(z,this.b,this.c)
this.eD()
return!0}return!1},
eD:function(){this.c=null
this.b=null
this.a=null},
kk:function(a,b,c){a.a.seU(2)
this.Q.$3(b,c,null)},
ae:function(a,b){var z,y
z={}
y=new P.R(0,$.r,[b])
z.a=null
this.cx.f.ae(new M.kk(z,this,a,new P.eH(y,[b]),b),P.x)
z=z.a
return!!J.v(z).$isV?y:z}},kk:{"^":"c:0;a,b,c,d,e",
$0:[function(){var z,y,x,w,v,u
try{w=this.c.$0()
this.a.a=w
if(!!J.v(w).$isV){z=w
v=this.d
z.bx(new M.ki(v,this.e),new M.kj(this.b,v),null)}}catch(u){y=H.a4(u)
x=H.ae(u)
this.b.Q.$3(y,x,null)
throw u}},null,null,0,0,null,"call"]},ki:{"^":"c;a,b",
$1:[function(a){this.a.ai(0,a)},null,null,4,0,null,8,"call"],
$S:function(){return{func:1,ret:P.x,args:[this.b]}}},kj:{"^":"c:3;a,b",
$2:[function(a,b){var z=b
this.b.bh(a,z)
this.a.Q.$3(a,z,null)},null,null,8,0,null,16,17,"call"]}}],["","",,S,{"^":"",ek:{"^":"a;a,$ti",
k:function(a){return this.h8(0)}}}],["","",,S,{"^":"",
iG:function(a){var z,y,x,w
if(a instanceof V.bF){z=a.d
y=a.e
if(y!=null)for(x=y.length-1;x>=0;--x){w=a.e[x].a.y
if(w.length!==0)z=S.iG((w&&C.b).gad(w))}}else z=a
return z},
eY:function(a,b){var z,y,x,w,v,u
z=a.length
for(y=0;y<z;++y){x=a[y]
if(x instanceof V.bF){b.push(x.d)
w=x.e
if(w!=null)for(v=w.length,u=0;u<v;++u)S.eY(w[u].a.y,b)}else b.push(x)}return b},
iJ:function(a,b){var z,y,x,w
z=a.parentNode
y=b.length
if(y!==0&&z!=null){x=a.nextSibling
if(x!=null)for(w=0;w<y;++w)z.insertBefore(b[w],x)
else for(w=0;w<y;++w)z.appendChild(b[w])}},
B:function(a,b,c){var z=a.createElement(b)
return c.appendChild(z)},
au:function(a,b){var z=a.createElement("div")
return b.appendChild(z)},
ub:function(a,b){var z=a.createElement("span")
return b.appendChild(z)},
eX:function(a){var z,y,x,w
z=a.length
for(y=0;y<z;++y){x=a[y]
w=x.parentNode
if(w!=null)w.removeChild(x)
$.f8=!0}},
jE:{"^":"a;a,b,c,0d,0e,0f,0r,0x,0y,0z,Q,ch,cx,cy",
seU:function(a){if(this.cy!==a){this.cy=a
this.kw()}},
kw:function(){var z=this.ch
this.cx=z===4||z===2||this.cy===2},
aj:function(){var z,y,x
z=this.x
if(z!=null)for(y=z.length,x=0;x<y;++x)this.x[x].$0()
return},
q:{
aw:function(a,b,c,d){return new S.jE(c,new L.ov(a),!1,d,b,!1,0)}}},
A:{"^":"a;$ti",
ba:function(a){var z,y,x
if(!a.r){z=$.ff
a.toString
y=H.d([],[P.f])
x=a.a
a.ef(x,a.d,y)
z.j7(y)
if(a.c===C.r){a.f="_nghost-"+x
a.e="_ngcontent-"+x}a.r=!0}this.d=a},
aY:function(a,b,c){this.f=b
this.a.e=c
return this.V()},
V:function(){return},
bq:function(a){var z=this.a
z.y=[a]
z.a},
bp:function(a,b){var z=this.a
z.y=a
z.r=b
z.a},
j6:function(a,b,c){var z,y
S.iJ(a,b)
z=this.a
y=z.z
if(y==null)z.z=b
else C.b.dh(y,b)},
eN:function(a,b){return this.j6(a,b,!1)},
kh:function(a,b){var z,y,x
S.eX(a)
z=this.a.z
for(y=z.length-1;y>=0;--y){x=z[y]
if(C.b.ji(a,x))C.b.C(z,x)}},
fC:function(a){return this.kh(a,!1)},
dF:function(a,b,c){var z,y,x
A.dB(a)
for(z=C.j,y=this;z===C.j;){if(b!=null)z=y.fg(a,b,C.j)
if(z===C.j){x=y.a.f
if(x!=null)z=x.cB(0,a,c)}b=y.a.Q
y=y.c}A.dC(a)
return z},
ci:function(a,b){return this.dF(a,b,C.j)},
fg:function(a,b,c){return c},
aj:function(){var z=this.a
if(z.c)return
z.c=!0
z.aj()
this.av()},
av:function(){},
aw:function(){if(this.a.cx)return
var z=$.d2
if((z==null?null:z.a)!=null)this.js()
else this.ak()
z=this.a
if(z.ch===1){z.ch=2
z.cx=!0}z.seU(1)},
js:function(){var z,y,x,w
try{this.ak()}catch(x){z=H.a4(x)
y=H.ae(x)
w=$.d2
w.a=this
w.b=z
w.c=y}},
ak:function(){},
fk:function(){var z,y,x,w
for(z=this;z!=null;){y=z.a
x=y.ch
if(x===4)break
if(x===2)if(x!==1){y.ch=1
w=y.cy===2
y.cx=w}if(y.a===C.n)z=z.c
else{y=y.d
z=y==null?null:y.c}}},
br:function(a){var z=this.d.f
if(z!=null)a.classList.add(z)
return a},
D:function(a){var z=this.d.e
if(z!=null)a.classList.add(z)},
K:function(a){var z=this.d.e
if(z!=null)J.jr(a).l(0,z)},
dv:function(a,b){return new S.jF(this,a,b)},
cd:function(a,b,c){return new S.jH(this,a,b)}},
jF:{"^":"c;a,b,c",
$1:[function(a){this.a.fk()
$.aU.b.a.f.aO(this.b)},null,null,4,0,null,18,"call"],
$S:function(){return{func:1,ret:P.x,args:[this.c]}}},
jH:{"^":"c;a,b,c",
$1:[function(a){this.a.fk()
$.aU.b.a.f.aO(new S.jG(this.b,a))},null,null,4,0,null,18,"call"],
$S:function(){return{func:1,ret:P.x,args:[this.c]}}},
jG:{"^":"c:2;a,b",
$0:[function(){return this.a.$1(this.b)},null,null,0,0,null,"call"]}}],["","",,Q,{"^":"",
uq:function(a){return a},
aV:function(a,b){return a!==b},
cY:{"^":"a;a,b,c",
bl:function(a,b,c){var z,y
z=H.e(this.a)+"-"
y=$.fo
$.fo=y+1
return new A.nm(z+y,a,b,c,!1)}}}],["","",,D,{"^":"",bX:{"^":"a;a,b,c,d,$ti"},fv:{"^":"a;a,b,$ti"}}],["","",,M,{"^":"",dY:{"^":"a;"}}],["","",,L,{"^":"",nA:{"^":"a;"}}],["","",,D,{"^":"",cM:{"^":"a;a,b"}}],["","",,V,{"^":"",bF:{"^":"dY;a,b,c,d,0e,0f,0r",
gi:function(a){var z=this.e
return z==null?0:z.length},
bK:function(){var z,y,x
z=this.e
if(z==null)return
for(y=z.length,x=0;x<y;++x)z[x].aw()},
bJ:function(){var z,y,x
z=this.e
if(z==null)return
for(y=z.length,x=0;x<y;++x)z[x].aj()},
C:function(a,b){this.f0(b===-1?this.gi(this)-1:b).aj()},
ap:function(a){var z,y,x
for(z=this.gi(this)-1;z>=0;--z){if(z===-1){y=this.e
x=(y==null?0:y.length)-1}else x=z
this.f0(x).aj()}},
jc:function(a,b){var z,y,x
if(a.a.a===C.n)throw H.b(P.ay("Component views can't be moved!"))
z=this.e
if(z==null)z=H.d([],[[S.A,,]])
C.b.jP(z,b,a)
if(b>0){y=z[b-1].a.y
x=S.iG(y.length!==0?(y&&C.b).gad(y):null)}else x=this.d
this.e=z
if(x!=null){S.iJ(x,S.eY(a.a.y,H.d([],[W.G])))
$.f8=!0}a.a.d=this},
f0:function(a){var z,y
z=this.e
y=(z&&C.b).kg(z,a)
z=y.a
if(z.a===C.n)throw H.b(P.ay("Component views can't be moved!"))
S.eX(S.eY(z.y,H.d([],[W.G])))
z=y.a.z
if(z!=null)S.eX(z)
y.a.d=null
return y}}}],["","",,L,{"^":"",ov:{"^":"a;a",$isft:1}}],["","",,R,{"^":"",eB:{"^":"a;a,b",
k:function(a){return this.b}}}],["","",,A,{"^":"",op:{"^":"a;a,b",
k:function(a){return this.b}}}],["","",,A,{"^":"",nm:{"^":"a;a,b,c,d,0e,0f,r",
ef:function(a,b,c){var z,y,x,w,v
z=J.J(b)
y=z.gi(b)
for(x=0;x<y;++x){w=z.h(b,x)
if(!!J.v(w).$ism)this.ef(a,w,c)
else{v=$.$get$iE()
w.toString
c.push(H.uE(w,v,a))}}return c}}}],["","",,E,{"^":"",nz:{"^":"a;"}}],["","",,D,{"^":"",et:{"^":"a;a,b,c,d,e",
j4:function(){var z,y
z=this.a
y=z.a
new P.cg(y,[H.q(y,0)]).b2(new D.nR(this))
z.e.ae(new D.nS(this),null)},
jU:[function(a){return this.c&&this.b===0&&!this.a.x},"$0","gdG",1,0,32],
eE:function(){if(this.jU(0))P.cp(new D.nO(this))
else this.d=!0},
l7:[function(a,b){this.e.push(b)
this.eE()},"$1","gdR",5,0,33,11]},nR:{"^":"c:13;a",
$1:[function(a){var z=this.a
z.d=!0
z.c=!1},null,null,4,0,null,0,"call"]},nS:{"^":"c:0;a",
$0:[function(){var z,y
z=this.a
y=z.a.c
new P.cg(y,[H.q(y,0)]).b2(new D.nQ(z))},null,null,0,0,null,"call"]},nQ:{"^":"c:13;a",
$1:[function(a){if(J.a5($.r.h(0,"isAngularZone"),!0))H.F(P.fK("Expected to not be in Angular Zone, but it is!"))
P.cp(new D.nP(this.a))},null,null,4,0,null,0,"call"]},nP:{"^":"c:0;a",
$0:[function(){var z=this.a
z.c=!0
z.eE()},null,null,0,0,null,"call"]},nO:{"^":"c:0;a",
$0:[function(){var z,y
for(z=this.a,y=z.e;y.length!==0;)y.pop().$1(z.d)
z.d=!1},null,null,0,0,null,"call"]},hB:{"^":"a;a,b"},qJ:{"^":"a;",
dz:function(a,b){return}}}],["","",,Y,{"^":"",hg:{"^":"a;a,b,c,d,0e,0f,r,x,y,z,Q,ch,cx,cy",
hn:function(a){var z=$.r
this.e=z
this.f=this.hK(z,this.giy())},
hK:function(a,b){return a.dB(P.eW(null,this.gir(),null,null,b,null,null,null,null,this.gis(),this.giu(),this.giv(),this.gix()),P.mf(["isAngularZone",!0]))},
kM:[function(a,b,c,d){var z,y
if(this.cx===0){this.r=!0
this.cR()}++this.cx
z=b.a.gc4()
y=z.a
z.b.$4(y,P.a7(y),c,new Y.mG(this,d))},"$4","gix",16,0,20],
it:[function(a,b,c,d,e){var z,y
z=b.a.gdc()
y=z.a
return z.b.$1$4(y,P.a7(y),c,new Y.mF(this,d,e),e)},function(a,b,c,d){return this.it(a,b,c,d,null)},"kJ","$1$4","$4","gis",16,0,21],
iw:[function(a,b,c,d,e,f,g){var z,y
z=b.a.gde()
y=z.a
return z.b.$2$5(y,P.a7(y),c,new Y.mE(this,d,g,f),e,f,g)},function(a,b,c,d,e){return this.iw(a,b,c,d,e,null,null)},"kL","$2$5","$5","giv",20,0,22],
kK:[function(a,b,c,d,e,f,g,h,i){var z,y
z=b.a.gdd()
y=z.a
return z.b.$3$6(y,P.a7(y),c,new Y.mD(this,d,h,i,g),e,f,g,h,i)},"$3$6","giu",24,0,18],
d3:function(){++this.z
if(this.y){this.y=!1
this.Q=!0
this.a.l(0,null)}},
d4:function(){--this.z
this.cR()},
kN:[function(a,b,c,d,e){this.d.l(0,new Y.hh(d,[J.b5(e)]))},"$5","giy",20,0,16,5,6,7,1,31],
kI:[function(a,b,c,d,e){var z,y,x,w,v
z={}
z.a=null
y=new Y.mB(z,this)
x=b.a.gcV()
w=x.a
v=new Y.iA(x.b.$5(w,P.a7(w),c,d,new Y.mC(e,y)),d,y)
z.a=v
this.cy.push(v)
this.x=!0
return z.a},"$5","gir",20,0,23],
cR:function(){var z=this.z
if(z===0)if(!this.r&&!this.y)try{this.z=z+1
this.Q=!1
this.b.l(0,null)}finally{--this.z
if(!this.r)try{this.e.ae(new Y.mA(this),null)}finally{this.y=!0}}},
q:{
mz:function(a){var z=[-1]
z=new Y.hg(new P.cP(null,null,0,z),new P.cP(null,null,0,z),new P.cP(null,null,0,z),new P.cP(null,null,0,[Y.hh]),!1,!1,!0,0,!1,!1,0,H.d([],[Y.iA]))
z.hn(!1)
return z}}},mG:{"^":"c:0;a,b",
$0:[function(){try{this.b.$0()}finally{var z=this.a
if(--z.cx===0){z.r=!1
z.cR()}}},null,null,0,0,null,"call"]},mF:{"^":"c;a,b,c",
$0:[function(){try{this.a.d3()
var z=this.b.$0()
return z}finally{this.a.d4()}},null,null,0,0,null,"call"],
$S:function(){return{func:1,ret:this.c}}},mE:{"^":"c;a,b,c,d",
$1:[function(a){var z
try{this.a.d3()
z=this.b.$1(a)
return z}finally{this.a.d4()}},null,null,4,0,null,9,"call"],
$S:function(){return{func:1,ret:this.d,args:[this.c]}}},mD:{"^":"c;a,b,c,d,e",
$2:[function(a,b){var z
try{this.a.d3()
z=this.b.$2(a,b)
return z}finally{this.a.d4()}},null,null,8,0,null,12,13,"call"],
$S:function(){return{func:1,ret:this.e,args:[this.c,this.d]}}},mB:{"^":"c:0;a,b",
$0:function(){var z,y
z=this.b
y=z.cy
C.b.C(y,this.a.a)
z.x=y.length!==0}},mC:{"^":"c:0;a,b",
$0:[function(){try{this.a.$0()}finally{this.b.$0()}},null,null,0,0,null,"call"]},mA:{"^":"c:0;a",
$0:[function(){this.a.c.l(0,null)},null,null,0,0,null,"call"]},iA:{"^":"a;a,b,c",$isb0:1},hh:{"^":"a;a,b"}}],["","",,A,{"^":"",
dB:function(a){return},
dC:function(a){return},
uy:function(a){return new P.aW(!1,null,null,"No provider found for "+a.k(0))}}],["","",,G,{"^":"",fH:{"^":"c2;b,c,0d,a",
aK:function(a,b){return this.b.dF(a,this.c,b)},
ff:function(a){return this.aK(a,C.j)},
dE:function(a,b){var z=this.b
return z.c.dF(a,z.a.Q,b)},
bs:function(a,b){return H.F(P.cc(null))},
gaM:function(a){var z,y
z=this.d
if(z==null){z=this.b
y=z.c
z=z.a.Q
z=new G.fH(y,z,C.t)
this.d=z}return z}}}],["","",,R,{"^":"",l5:{"^":"c2;a",
bs:function(a,b){return a===C.x?this:b},
dE:function(a,b){var z=this.a
if(z==null)return b
return z.aK(a,b)}}}],["","",,E,{"^":"",c2:{"^":"aY;aM:a>",
jN:function(a){var z
A.dB(a)
z=this.ff(a)
if(z===C.j)return M.jj(this,a)
A.dC(a)
return z},
b1:function(a){return this.jN(a,null)},
aK:function(a,b){var z
A.dB(a)
z=this.bs(a,b)
if(z==null?b==null:z===b)z=this.dE(a,b)
A.dC(a)
return z},
ff:function(a){return this.aK(a,C.j)},
dE:function(a,b){return this.gaM(this).aK(a,b)}}}],["","",,M,{"^":"",
jj:function(a,b){throw H.b(A.uy(b))},
aY:{"^":"a;",
cB:function(a,b,c){var z
A.dB(b)
z=this.aK(b,c)
if(z===C.j)return M.jj(this,b)
A.dC(b)
return z},
as:function(a,b){return this.cB(a,b,C.j)}}}],["","",,A,{"^":"",mn:{"^":"c2;b,a",
bs:function(a,b){var z=this.b.h(0,a)
if(z==null){if(a===C.x)return this
z=b}return z}}}],["","",,U,{"^":"",lf:{"^":"a;"}}],["","",,T,{"^":"",jZ:{"^":"a;",
$3:function(a,b,c){var z,y
window
z="EXCEPTION: "+H.e(a)+"\n"
if(b!=null){z+="STACKTRACE: \n"
y=J.v(b)
z+=H.e(!!y.$isl?y.a3(b,"\n\n-----async gap-----\n"):y.k(b))+"\n"}if(c!=null)z+="REASON: "+c+"\n"
if(typeof console!="undefined")window.console.error(z.charCodeAt(0)==0?z:z)
return},
$1:function(a){return this.$3(a,null,null)},
$2:function(a,b){return this.$3(a,b,null)}}}],["","",,K,{"^":"",k_:{"^":"a;",
ja:function(a){var z,y,x
z=self.self.ngTestabilityRegistries
if(z==null){z=[]
self.self.ngTestabilityRegistries=z
self.self.getAngularTestability=P.aT(new K.k4())
y=new K.k5()
self.self.getAllAngularTestabilities=P.aT(y)
x=P.aT(new K.k6(y))
if(!("frameworkStabilizers" in self.self))self.self.frameworkStabilizers=[]
J.dN(self.self.frameworkStabilizers,x)}J.dN(z,this.hL(a))},
dz:function(a,b){var z
if(b==null)return
z=a.a.h(0,b)
return z==null?this.dz(a,b.parentElement):z},
hL:function(a){var z={}
z.getAngularTestability=P.aT(new K.k1(a))
z.getAllAngularTestabilities=P.aT(new K.k2(a))
return z}},k4:{"^":"c:40;",
$2:[function(a,b){var z,y,x,w,v
z=self.self.ngTestabilityRegistries
for(y=J.J(z),x=0;x<y.gi(z);++x){w=y.h(z,x)
v=w.getAngularTestability.apply(w,[a])
if(v!=null)return v}throw H.b(P.ay("Could not find testability for element."))},function(a){return this.$2(a,!0)},"$1",null,null,null,4,2,null,48,33,34,"call"]},k5:{"^":"c:41;",
$0:[function(){var z,y,x,w,v,u,t,s
z=self.self.ngTestabilityRegistries
y=[]
for(x=J.J(z),w=0;w<x.gi(z);++w){v=x.h(z,w)
u=v.getAllAngularTestabilities.apply(v,[])
t=u.length
for(s=0;s<t;++s)y.push(u[s])}return y},null,null,0,0,null,"call"]},k6:{"^":"c:7;a",
$1:[function(a){var z,y,x,w,v
z={}
y=this.a.$0()
x=J.J(y)
z.a=x.gi(y)
z.b=!1
w=new K.k3(z,a)
for(x=x.gI(y);x.m();){v=x.gu(x)
v.whenStable.apply(v,[P.aT(w)])}},null,null,4,0,null,11,"call"]},k3:{"^":"c;a,b",
$1:[function(a){var z,y
z=this.a
y=z.b||a
z.b=y
if(--z.a===0)this.b.$1(y)},null,null,4,0,null,35,"call"]},k1:{"^":"c;a",
$1:[function(a){var z,y
z=this.a
y=z.b.dz(z,a)
return y==null?null:{isStable:P.aT(y.gdG(y)),whenStable:P.aT(y.gdR(y))}},null,null,4,0,null,36,"call"]},k2:{"^":"c:42;a",
$0:[function(){var z=this.a.a
z=z.gkx(z)
z=P.b9(z,!0,H.a9(z,"l",0))
return new H.bp(z,new K.k0(),[H.q(z,0),U.df]).fH(0)},null,null,0,0,null,"call"]},k0:{"^":"c;",
$1:[function(a){return{isStable:P.aT(a.gdG(a)),whenStable:P.aT(a.gdR(a))}},null,null,4,0,null,37,"call"]}}],["","",,L,{"^":"",kW:{"^":"d8;0a"}}],["","",,N,{"^":"",fJ:{"^":"a;a,0b,0c",
hk:function(a,b){var z,y,x
for(z=J.J(a),y=z.gi(a),x=0;x<y;++x)z.h(a,x).sjX(this)
this.b=a
this.c=P.E(P.f,N.d8)},
q:{
le:function(a,b){var z=new N.fJ(b)
z.hk(a,b)
return z}}},d8:{"^":"a;0jX:a?"}}],["","",,N,{"^":"",m9:{"^":"d8;0a"}}],["","",,A,{"^":"",l0:{"^":"a;a,b",
j7:function(a){var z,y,x,w,v,u
z=a.length
y=this.b
x=this.a
w=0
for(;w<z;++w){v=a[w]
if(y.l(0,v)){u=document.createElement("style")
u.textContent=v
x.appendChild(u)}}}}}],["","",,Z,{"^":"",kZ:{"^":"a;"}}],["","",,R,{"^":"",l_:{"^":"a;"}}],["","",,U,{"^":"",df:{"^":"de;","%":""}}],["","",,O,{"^":"",
x_:[function(){var z,y,x,w
z=O.tk()
if(z==null)return
y=$.iR
if(y==null){x=document.createElement("a")
$.iR=x
y=x}y.href=z
w=y.pathname
return w.length===0||w[0]==="/"?w:"/"+H.e(w)},"$0","u1",0,0,19],
tk:function(){var z=$.iD
if(z==null){z=document.querySelector("base")
$.iD=z
if(z==null)return}return z.getAttribute("href")}}],["","",,M,{"^":"",k7:{"^":"hl;0a,0b"}}],["","",,O,{"^":"",e5:{"^":"ha;a,b",
ft:function(a){var z=this.a.a.hash
if(z==null)z=""
return z.length===0?z:C.a.a7(z,1)},
fw:function(a){var z,y
z=V.hb(this.b,a)
if(z.length===0){y=this.a
y=H.e(y.a.pathname)+H.e(y.a.search)}else y="#"+H.e(z)
return y},
ki:function(a,b,c,d,e){var z,y
z=this.fw(d+(e.length===0||C.a.af(e,"?")?e:"?"+e))
y=this.a.b
y.toString
y.replaceState(new P.eR([],[]).aA(b),c,z)}}}],["","",,V,{"^":"",
f5:function(a,b){var z=a.length
if(z!==0&&J.cr(b,a))return J.fl(b,z)
return b},
dA:function(a){if(J.a3(a).cb(a,"/index.html"))return C.a.B(a,0,a.length-11)
return a},
h9:{"^":"a;a,b,c",
hm:function(a){this.a.a.toString
C.H.c6(window,"popstate",new V.mj(this),!1)},
k5:function(a){var z
if(a==null)return
z=this.a instanceof O.e5
if(!z&&!C.a.af(a,"/"))a="/"+a
if(z&&C.a.af(a,"/"))a=C.a.a7(a,1)
return C.a.cb(a,"/")?C.a.B(a,0,a.length-1):a},
q:{
mi:function(a){var z=new V.h9(a,P.eq(null,null,null,null,!1,null),V.dg(V.dA(a.b)))
z.hm(a)
return z},
hb:function(a,b){var z
if(a.length===0)return b
if(b.length===0)return a
z=J.jo(a,"/")?1:0
if(C.a.af(b,"/"))++z
if(z===2)return a+C.a.a7(b,1)
if(z===1)return a+b
return a+"/"+b},
dg:function(a){return J.a3(a).cb(a,"/")?C.a.B(a,0,a.length-1):a}}},
mj:{"^":"c:8;a",
$1:[function(a){var z=this.a
z.b.l(0,P.bo(["url",V.dg(V.f5(z.c,V.dA(z.a.ft(0)))),"pop",!0,"type",J.fk(a)],P.f,P.a))},null,null,4,0,null,38,"call"]}}],["","",,X,{"^":"",ha:{"^":"a;"}}],["","",,X,{"^":"",hl:{"^":"a;"}}],["","",,N,{"^":"",dl:{"^":"a;"}}],["","",,Q,{"^":"",my:{"^":"a;a,b,c,d,e",
eQ:function(){return}}}],["","",,Z,{"^":"",cF:{"^":"a;a,b",
k:function(a){return this.b}},hs:{"^":"a;"}}],["","",,Z,{"^":"",no:{"^":"hs;a,b,c,0d,e,0f,0r,x",
ho:function(a,b){var z=this.b
$.hS=z.a instanceof O.e5
z=z.b
new P.ds(z,[H.q(z,0)]).jW(new Z.nu(this),null,null)},
hQ:function(a,b){var z,y
z=Z.cF
y=new P.R(0,$.r,[z])
this.x=this.x.a2(new Z.nr(this,a,b,new P.dy(y,[z])),-1)
return y},
ah:function(a,b,c){return this.iq(a,b,c)},
ip:function(a,b){return this.ah(a,b,!1)},
iq:function(a,b,c){var z=0,y=P.bL(Z.cF),x,w=this,v,u,t,s,r,q,p,o,n
var $async$ah=P.bN(function(d,e){if(d===1)return P.bI(e,y)
while(true)switch(z){case 0:z=!c?3:4
break
case 3:z=5
return P.b2(w.cP(),$async$ah)
case 5:if(!e){x=C.C
z=1
break}case 4:if(!(b==null))b.eQ()
z=6
return P.b2(null,$async$ah)
case 6:v=e
a=v==null?a:v
u=w.b
a=u.k5(a)
z=7
return P.b2(null,$async$ah)
case 7:t=e
b=t==null?b:t
s=b==null
if(!s)b.eQ()
r=s?null:b.a
if(r==null){q=P.f
r=P.E(q,q)}q=w.d
if(q!=null)if(a===q.b){p=s?null:b.b
if(p==null)p=""
q=p===q.a&&C.bb.jv(r,q.c)}else q=!1
else q=!1
if(q){x=C.ag
z=1
break}z=8
return P.b2(w.iG(a,b),$async$ah)
case 8:o=e
if(o==null||o.d.length===0){x=C.bf
z=1
break}q=o.d
if(q.length!==0){q=w.ah(w.i_(C.b.gad(q).l4(o.c),o.V()),b,!0)
x=q
z=1
break}z=9
return P.b2(w.cO(o),$async$ah)
case 9:if(!e){x=C.C
z=1
break}z=10
return P.b2(w.cN(o),$async$ah)
case 10:if(!e){x=C.C
z=1
break}z=11
return P.b2(w.bW(o),$async$ah)
case 11:if(s||!1){n=o.V().dQ(0)
u=u.a
n=u.fw(n)
u=u.a.b
u.toString
u.pushState(new P.eR([],[]).aA(null),"",n)}x=C.ag
z=1
break
case 1:return P.bJ(x,y)}})
return P.bK($async$ah,y)},
i_:function(a,b){var z
if(a.af(0,"./")){z=b.d
return V.hb(H.er(z,0,z.length-1,H.q(z,0)).bn(0,"",new Z.ns(b),P.f),a.a7(0,2))}return a},
iG:function(a,b){return this.da(this.r,a).a2(new Z.nt(this,a,b),M.dj)},
da:function(a,b){return this.iH(a,b)},
iH:function(a,b){var z=0,y=P.bL(M.dj),x,w,v
var $async$da=P.bN(function(c,d){if(c===1)return P.bI(d,y)
while(true)switch(z){case 0:if(b===""){w=[D.bX,,]
v=P.f
x=new M.dj(H.d([],[w]),P.E(w,[D.fv,,]),P.E(v,v),H.d([],[N.dl]),"","",P.E(v,v))
z=1
break}z=1
break
case 1:return P.bJ(x,y)}})
return P.bK($async$da,y)},
i1:function(a){var z=a.gkV()
return z},
bY:function(a){return this.hv(a)},
hv:function(a){var z=0,y=P.bL(M.dj),x,w=this,v
var $async$bY=P.bN(function(b,c){if(b===1)return P.bI(c,y)
while(true)switch(z){case 0:v=a.d
z=!(v.length===0)?3:4
break
case 3:z=5
return P.b2(w.i1(C.b.gad(v)),$async$bY)
case 5:if(c==null){x=a
z=1
break}C.b.gad(a.a).gjO().as(0,C.az).gko()
case 4:x=a
z=1
break
case 1:return P.bJ(x,y)}})
return P.bK($async$bY,y)},
cP:function(){var z=0,y=P.bL(P.aG),x,w=this,v,u,t
var $async$cP=P.bN(function(a,b){if(a===1)return P.bI(b,y)
while(true)switch(z){case 0:for(v=w.e,u=v.length,t=0;t<v.length;v.length===u||(0,H.aA)(v),++t)v[t].gcU()
x=!0
z=1
break
case 1:return P.bJ(x,y)}})
return P.bK($async$cP,y)},
cO:function(a){return this.hz(a)},
hz:function(a){var z=0,y=P.bL(P.aG),x,w=this,v,u,t
var $async$cO=P.bN(function(b,c){if(b===1)return P.bI(c,y)
while(true)switch(z){case 0:a.V()
for(v=w.e,u=v.length,t=0;t<v.length;v.length===u||(0,H.aA)(v),++t)v[t].gcU()
x=!0
z=1
break
case 1:return P.bJ(x,y)}})
return P.bK($async$cO,y)},
cN:function(a){return this.hy(a)},
hy:function(a){var z=0,y=P.bL(P.aG),x,w,v,u
var $async$cN=P.bN(function(b,c){if(b===1)return P.bI(c,y)
while(true)switch(z){case 0:a.V()
for(w=a.a,v=w.length,u=0;u<w.length;w.length===v||(0,H.aA)(w),++u)w[u].gcU()
x=!0
z=1
break
case 1:return P.bJ(x,y)}})
return P.bK($async$cN,y)},
bW:function(a){return this.hs(a)},
hs:function(a){var z=0,y=P.bL(null),x=this,w,v,u,t,s,r,q,p,o
var $async$bW=P.bN(function(b,c){if(b===1)return P.bI(c,y)
while(true)switch(z){case 0:w=a.V()
for(v=x.e,u=v.length,t=0;t<v.length;v.length===u||(0,H.aA)(v),++t)v[t].gcU()
s=x.r
v=a.a,r=v.length,u=a.b,q=0
case 2:if(!(q<r)){z=4
break}p=u.h(0,v[q])
z=5
return P.b2(s.kQ(p,x.d,w),$async$bW)
case 5:o=s.l3(p)
v[q]=o
s=o.gjO().as(0,C.az).gko()
o.gkZ().l0(0,x.d,w)
case 3:++q
z=2
break
case 4:x.a.l(0,w)
x.d=w
x.e=v
return P.bJ(null,y)}})
return P.bK($async$bW,y)},
q:{
np:function(a,b){var z,y
z=H.d([],[[D.bX,,]])
y=new P.R(0,$.r,[-1])
y.aT(null)
y=new Z.no(new P.cP(null,null,0,[M.em]),a,b,z,y)
y.ho(a,b)
return y}}},nu:{"^":"c:7;a",
$1:[function(a){var z,y,x,w,v,u,t
z=this.a
y=z.b
x=y.a
w=x.ft(0)
y=y.c
v=P.oa(V.dg(V.f5(y,V.dA(w))),0,null)
u=F.oe(v.gdI(v),v.gdC(),v.gfB())
t=$.hS?u.a:F.of(V.dg(V.f5(y,V.dA(x.a.a.hash))))
z.hQ(u.b,new Q.my(u.c,t,!1,!1,!1)).a2(new Z.nq(z),null)},null,null,4,0,null,0,"call"]},nq:{"^":"c;a",
$1:[function(a){var z,y
if(a===C.C){z=this.a
y=z.d.dQ(0)
z.b.a.ki(0,null,"",y,"")}},null,null,4,0,null,39,"call"]},nr:{"^":"c:43;a,b,c,d",
$1:[function(a){var z,y,x,w,v
z=this.d
y=this.a.ip(this.b,this.c).a2(z.geW(z),-1)
x=z.gc9()
z=H.q(y,0)
w=$.r
v=new P.R(0,w,[z])
if(w!==C.d)x=P.iL(x,w)
y.bX(new P.eM(v,2,null,x,[z,z]))
return v},null,null,4,0,null,0,"call"]},ns:{"^":"c:44;a",
$2:function(a,b){return J.aj(a,C.v.l5(b,this.a.e))}},nt:{"^":"c;a,b,c",
$1:[function(a){var z
if(a!=null){a.f=this.b
z=this.c
if(z!=null){a.e=z.b
a.r=z.a}return this.a.bY(a)}},null,null,4,0,null,40,"call"]}}],["","",,S,{"^":"",nv:{"^":"a;"}}],["","",,M,{"^":"",em:{"^":"hR;d,e,0f,a,b,c",
k:function(a){return"#"+C.bt.k(0)+" {"+this.h9(0)+"}"}},dj:{"^":"a;a,b,c,d,e,f,r",
V:function(){var z,y,x,w,v,u
z=this.f
y=this.d
y=H.d(y.slice(0),[H.q(y,0)])
x=this.e
w=this.r
v=P.f
u=H.dZ(this.c,v,v)
y=P.mh(y,N.dl)
if(z==null)z=""
if(x==null)x=""
return new M.em(y,u,x,z,H.dZ(w,v,v))}}}],["","",,B,{"^":"",nn:{"^":"a;"}}],["","",,F,{"^":"",hR:{"^":"a;a,b,c",
dQ:function(a){var z,y,x
z=this.b
y=this.c
x=y.gX(y)
if(x)z=P.dn(z+"?",J.jw(y.ga_(y),new F.og(this),null),"&")
y=this.a
if(y.length!==0)z=z+"#"+y
return z.charCodeAt(0)==0?z:z},
k:["h9",function(a){return this.dQ(0)}],
q:{
of:function(a){if(J.a3(a).af(a,"#"))return C.a.a7(a,1)
return a},
oe:function(a,b,c){var z,y,x,w
z=a==null?"":a
y=b==null?"":b
x=c==null?P.h4():c
w=P.f
return new F.hR(y,z,H.dZ(x,w,w))}}},og:{"^":"c;a",
$1:[function(a){var z=this.a.c.h(0,a)
a=P.eU(C.a0,a,C.m,!1)
return z!=null?H.e(a)+"="+H.e(P.eU(C.a0,z,C.m,!1)):a},null,null,4,0,null,41,"call"]}}],["","",,D,{"^":"",jY:{"^":"a;a,b,c,d,e,0f,r,x",
gi:function(a){return this.c},
jk:function(a,b,c){var z
for(z=0;z<c;++z)b[z]=a[z]},
cG:function(a){var z,y,x,w,v,u
if(a<0)H.F(P.ar("should be > 0"))
if(a===this.c)return
z=C.c.R(a+31,32)
y=this.b
x=y.length
if(z>x||z+this.a<x){w=new Uint32Array(z)
y=this.b
x=y.length
this.jk(y,w,z>x?x:z)
this.b=w
y=w}x=this.c
if(a>x){v=C.c.a6(x,32)
if(v>0){u=C.c.R(x+31,32)-1
y[u]=(y[u]&(1<<(v&31)>>>0)-1)>>>0}(y&&C.be).bM(y,C.c.R(x+31,32),z,0)}this.c=a
this.sfN(0,this.d+1)},
sfN:function(a,b){this.d=b
if(this.e===0&&!0)this.x.l(0,b)},
hj:function(a,b){this.b=new Uint32Array((a+31)/32|0)
this.c=a
this.d=0},
k:function(a){return H.e(this.c)+" bits, "+H.e(this.eY(!0))+" set"},
h:function(a,b){return(this.b[C.c.R(b,32)]&1<<(b&31))>>>0!==0},
j:function(a,b,c){var z,y
z=this.b
if(c){y=C.c.R(b,32)
z[y]=(z[y]|1<<(b&31))>>>0}else{y=C.c.R(b,32)
z[y]=(z[y]&~(1<<(b&31)))>>>0}this.sfN(0,this.d+1)},
eY:function(a){var z,y,x,w
z=this.c
if(z===0)return 0
if(this.r!==this.d){this.f=0
for(z=C.c.R(z+31,32)-1,y=0;y<z;++y)for(x=this.b[y];x!==0;x=x>>>8)this.f=this.f+$.$get$dT()[x&255]
x=this.b[y]
w=this.c&31
if(w!==0)x=(x&~(4294967295<<w))>>>0
for(;x!==0;x=x>>>8)this.f=this.f+$.$get$dT()[x&255]}z=this.f
return z},
q:{
C:function(a,b){var z=new D.jY(256,null,null,0,0,-1,new P.hZ(null,null,0,[null]))
z.hj(a,!1)
return z}}}}],["","",,U,{"^":"",kR:{"^":"a;"},dw:{"^":"a;a,b,G:c>",
gH:function(a){return 3*J.an(this.b)+7*J.an(this.c)&2147483647},
T:function(a,b){if(b==null)return!1
return b instanceof U.dw&&J.a5(this.b,b.b)&&J.a5(this.c,b.c)}},mm:{"^":"a;a,b",
jv:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
z=a.gi(a)
y=b.gi(b)
if(z==null?y!=null:z!==y)return!1
x=P.dc(null,null,null,U.dw,P.i)
for(y=J.aa(a.ga_(a));y.m();){w=y.gu(y)
v=new U.dw(this,w,a.h(0,w))
u=x.h(0,v)
x.j(0,v,(u==null?0:u)+1)}for(y=J.aa(b.ga_(b));y.m();){w=y.gu(y)
v=new U.dw(this,w,b.h(0,w))
u=x.h(0,v)
if(u==null||u===0)return!1
x.j(0,v,u-1)}return!0}}}],["","",,G,{"^":"",dd:{"^":"y;G:a*,b"},b1:{"^":"y;bg:a',G:b*,cs:c?"},ba:{"^":"y;fp:a<,0b"},aX:{"^":"y;a,b,c"},ad:{"^":"y;aN:a@"},bk:{"^":"y;ca:a<"},cy:{"^":"y;a,b"},bi:{"^":"y;"},aB:{"^":"y;a,b"},ox:{"^":"y;"}}],["","",,K,{"^":"",d7:{"^":"p7;d,0b,0a",
fX:function(a,b){var z,y
z=a.a
y=this.d
y.dM(0,z,new K.kT())
J.dN(y.h(0,z),b)},
jt:function(a,b){var z,y,x
z=this.d.h(0,a.a)
if(z!=null){for(y=J.aq(z),x=y.gI(z);x.m();)this.en(x.gu(x),b)
y.ap(z)}},
iB:function(a,b){J.dR(this.d.h(0,a.a),b)},
en:function(a,b){var z
if(this.b.Z(a)!=null){z=new G.bi()
a.r.a8(a,S.aC(z.ga4(z)),z)}if(b===C.bi){z=new G.ox()
a.r.a8(a,S.aC(z.ga4(z)),z)}a.cr(G.bk)
a.e.d.l(0,a)}},kT:{"^":"c:45;",
$0:function(){return H.d([],[S.af])}},ht:{"^":"a;a,b",
k:function(a){return this.b}},p7:{"^":"at;",
A:function(a){this.bU(0)
this.b=S.k(this.a,G.aX)}}}],["","",,X,{"^":"",fT:{"^":"pd;r,x,0b,0c,0d,0e,0a",
bH:function(a){var z,y
if(this.b.Z(a)!=null){z=this.b.b
y=a.a
this.r.j(0,J.bT(z.a[y]),a)}},
l:function(a,b){var z,y
z=this.b.b
y=b.a
this.r.j(0,J.bT(z.a[y]),b)},
dl:function(a){var z,y
if(this.b.Z(a)!=null){z=this.b.b
y=a.a
this.r.j(0,J.bT(z.a[y]),a)}},
aZ:function(a){var z,y,x
if(this.b.Z(a)!=null){z=this.b.b
y=a.a
x=z.a[y]
this.r.C(0,x.a)
x.b}},
jr:function(a,b){var z,y,x,w
z=this.r.h(0,a)
if(z!=null){if(this.c.Z(z)!=null){y=this.c.b
x=z.a
w=y.a[x].gca()
this.e.iB(w,z)}if(this.d.Z(z)!=null)this.e.jt(z,b)
z.e.e.l(0,z)
return!0}return!1}},pd:{"^":"at;",
A:function(a){this.bU(0)
this.b=S.k(this.a,G.dd)
this.c=S.k(this.a,G.bk)
this.d=S.k(this.a,G.ba)
this.e=this.a.z.h(0,new H.t(K.d7))}}}],["","",,A,{"^":"",c9:{"^":"pj;e,f,0b,0c,0a",
bH:function(a){var z,y,x,w,v
if(this.b.Z(a)!=null&&this.c.Z(a)!=null){z=this.b.b
y=a.a
x=z.a[y]
w=this.c.b.a[y].gaN()
v=w*2
this.fh(0,a,x.a-w,x.b-w,v,v)}},
aZ:function(a){if(this.b.Z(a)!=null&&this.c.Z(a)!=null)this.C(0,a)},
fh:function(a,b,c,d,e,f){var z,y
z=this.e
y=new A.dx(b,P.bc(c,d,e,f,P.S),[H.q(z,0)])
z.ei(y)
this.f.j(0,b,y)
return y},
C:function(a,b){var z=this.f.C(0,b)
if(z!=null)z.c.eA(0,z)},
fT:function(){return J.jC(this.e.dA(),new A.n6())}},n6:{"^":"c;",
$1:function(a){return a.d.length===0}},aP:{"^":"a;a,b,c,d,e,$ti",
gcm:function(a){var z=this.e
return new H.bp(z,new A.ne(),[H.q(z,0),H.q(this,0)])},
dU:function(){var z=this.d
if(z.length===0)return J.Z(this.gcm(this).a)
return J.Z(this.gcm(this).a)+C.b.bn(z,0,new A.nb(this),P.O)},
dA:function(){var z,y,x
z=this.d
if(z.length!==0){y=[A.aP,H.q(this,0)]
x=H.d([this],[y])
return H.e3(x,new H.d9(z,new A.na(),[H.q(z,0),y]),H.q(x,0))}return H.d([this],[[A.aP,H.q(this,0)]])},
cD:function(a){var z,y
z=this.d
if(z.length===0)return this.gcm(this)
y=H.q(z,0)
return this.gcm(this).jE(0,new H.d9(new H.bf(z,new A.nc(a),[y]),new A.nd(a),[y,H.q(this,0)]))},
C:function(a,b){b.c.eA(0,b)},
ei:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.d
if(z.length===0){y=this.e
x=this.b
if(y.length<x){y.push(a)
a.c=this}else{w=this.a
v=w.a
u=w.b
t=J.fg(w.c,2)
s=J.fg(w.d,2)
w=P.S
r=H.q(this,0)
q=[[A.aP,r]]
r=[[A.dx,r]]
p=this.$ti
z.push(new A.aP(P.bc(v,u,t,s,w),x,this,H.d([],q),H.d([],r),p))
o=v+t
z.push(new A.aP(P.bc(o,u,t,s,w),x,this,H.d([],q),H.d([],r),p))
n=u+s
z.push(new A.aP(P.bc(v,n,t,s,w),x,this,H.d([],q),H.d([],r),p))
z.push(new A.aP(P.bc(o,n,t,s,w),x,this,H.d([],q),H.d([],r),p))
r=H.e3(y,H.d([a],r),H.q(y,0))
m=P.b9(r,!0,H.a9(r,"l",0))
C.b.si(y,0)
C.b.w(m,this.gii())}}else this.ij(a)},
ij:[function(a){var z=this.i0(a.b)
if(z===this){this.e.push(a)
a.c=this}else z.ei(a)},"$1","gii",4,0,12],
eA:function(a,b){var z,y,x,w,v
z=this.e
C.b.iD(z,new A.n8(b),!0)
y=this.d
if(y.length!==0&&this.dU()<=this.b){x=J.jp(this.dA(),new A.n9(),[A.dx,H.q(this,0)])
w=P.b9(x,!0,H.a9(x,"l",0))
C.b.si(z,0)
C.b.dh(z,w)
for(z=w.length,v=0;v<w.length;w.length===z||(0,H.aA)(w),++v)w[v].shH(this)
C.b.si(y,0)}},
i0:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=a.a
y=this.a
x=y.a
w=y.c
v=J.aI(w)
u=J.cR(x)
t=J.aI(z)
s=t.aQ(z,u.L(x,v.aB(w,2)))?0:1
r=a.b
q=y.b
y=y.d
p=J.aI(y)
o=J.cR(q)
n=J.aI(r)
m=n.aQ(r,o.L(q,p.aB(y,2)))?0:2
l=J.dL(t.L(z,a.c),u.L(x,v.aB(w,2)))?0:1
k=J.dL(n.L(r,a.d),o.L(q,p.aB(y,2)))?0:2
if(s===l&&m===k)return this.d[s+m]
return this},
k:function(a){return"QuadTree["+this.a.k(0)+"]["+H.e(this.e)+"]["+H.e(this.d)+"]"}},ne:{"^":"c;",
$1:[function(a){return a.a},null,null,4,0,null,42,"call"]},nb:{"^":"c;a",
$2:function(a,b){return a+b.dU()},
$S:function(){return{func:1,ret:P.O,args:[P.O,[A.aP,H.q(this.a,0)]]}}},na:{"^":"c;",
$1:function(a){return a.dA()}},nc:{"^":"c;a",
$1:function(a){return a.a.fi(0,this.a)}},nd:{"^":"c;a",
$1:function(a){return a.cD(this.a)}},n8:{"^":"c;a",
$1:function(a){var z,y
z=a.a
y=this.a.a
return z==null?y==null:z===y}},n9:{"^":"c;",
$1:function(a){return a.e}},dx:{"^":"a;a,b,0hH:c?,$ti",
k:function(a){return H.e(this.a)+"@"+this.b.k(0)}},pj:{"^":"at;",
A:function(a){this.bU(0)
this.b=S.k(this.a,F.X)
this.c=S.k(this.a,G.ad)}}}],["","",,N,{"^":"",jV:{"^":"oY;",
a1:[function(a){var z,y,x,w,v,u,t
z=this.fy.b
y=a.a
x=z.a[y]
w=this.fx.b.a[y].gca()
v=this.fy.b.a[w.a]
y=x.a
u=y-this.b.cy*v.a/20
t=3.141592653589793*y*y
if(u>0){t=Math.max(0,t-3.141592653589793*u*u)
x.a=u
this.k7(w,a)}else{x.a=0
z=new G.fG()
a.r.a8(a,S.aC(z.ga4(z)),z)
a.e.d.l(0,a)}z=v.a
v.a=Math.sqrt((3.141592653589793*z*z+t)/3.141592653589793)},"$1","ga0",4,0,1]},oY:{"^":"ab;",
A:["hb",function(a){this.U(0)
this.fx=S.k(this.b,G.bk)
this.fy=S.k(this.b,G.ad)}]}}],["","",,F,{"^":"",jW:{"^":"oZ;",
a1:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.fy.b
y=a.a
x=z.a[y]
w=this.go.b.a[y].gaN()
v=w*2
y=this.k2
z=x.a
u=x.b
for(z=y.e.cD(P.bc(z-w,u-w,v,v,P.S)).cA(0,new F.jX(a)),y=J.aa(z.a),z=new H.eE(y,z.b),u=w*0.9;z.m();){t=y.gu(y)
s=this.go.b
r=t.a
q=s.a[r].gaN()
if(this.id.Z(a)!=null||q<u){p=this.fy.b.a[r]
o=p.a-x.a
n=p.b-x.b
m=Math.sqrt(o*o+n*n)
l=w+q
if(this.k1.Z(t)==null){if(m<w)this.fY(a,t,m,o,n,w,q)
else if(m<w+q/2)this.jb(a,t,m,o,n,w,q)
else if(m<=l)this.kr(a,t,m,o,n,w,q)}else if(!(m>l+q))if(this.k1.b.a[r].gca()===a&&m>w-q)this.k8(a,t,m,o,n,w,q)}}},"$1","ga0",4,0,1]},jX:{"^":"c;a",
$1:function(a){var z=this.a
return a==null?z!=null:a!==z}},oZ:{"^":"ab;",
A:["hc",function(a){this.U(0)
this.fx=S.k(this.b,G.ba)
this.fy=S.k(this.b,F.X)
this.go=S.k(this.b,G.ad)
this.id=S.k(this.b,G.aX)
this.k1=S.k(this.b,G.bk)
this.k2=this.b.z.h(0,new H.t(A.c9))}]}}],["","",,B,{"^":"",kx:{"^":"p3;0fx,0fy,0go,a,0b,c,d,e,f,0r,0x,0y",
a1:[function(a){var z,y,x,w,v,u,t,s
z=this.fx.b
y=a.a
x=z.a[y]
w=this.fy.b.a[y]
v=x.a
u=x.b
t=v+w.b*Math.cos(w.a)*this.b.cy
s=u+w.b*Math.sin(w.a)*this.b.cy
if(t<0||t>4369)w.a=3.141592653589793-w.a
if(s<0||s>4369)w.a=-w.a
z=Math.max(0,Math.min(4369,t))
x.a=z
y=Math.max(0,Math.min(4369,s))
x.b=y
if(v!==z||u!==y){z=new G.aB(v,u)
a.r.a8(a,S.aC(z.ga4(z)),z)
a.e.d.l(0,a)}},"$1","ga0",4,0,1]},p3:{"^":"ab;",
A:function(a){this.U(0)
this.fx=S.k(this.b,F.X)
this.fy=S.k(this.b,G.b1)
this.go=S.k(this.b,G.bi)}}}],["","",,L,{"^":"",mQ:{"^":"pi;0fx,0fy,a,0b,c,d,e,f,0r,0x,0y",
a1:[function(a){var z,y,x
z=this.fx.b
y=a.a
x=z.a[y]
y=this.b.cy
z=x.a
x.a=Math.sqrt((1-0.001*y)*3.141592653589793*z*z/3.141592653589793)},"$1","ga0",4,0,1]},pi:{"^":"ab;",
A:function(a){this.U(0)
this.fx=S.k(this.b,G.ad)
this.fy=S.k(this.b,G.ba)}}}],["","",,G,{"^":"",n7:{"^":"pk;0fx,0fy,0go,0id,a,0b,c,d,e,f,0r,0x,0y",
a1:[function(a){var z,y,x,w,v
z=this.fy.b
y=a.a
x=z.a[y]
w=this.go.b.a[y].gaN()
v=w*2
y=this.id
y.C(0,a)
y.fh(0,a,x.a-w,x.b-w,v,v)},"$1","ga0",4,0,1]},pk:{"^":"ab;",
A:function(a){this.U(0)
this.fx=S.k(this.b,G.aB)
this.fy=S.k(this.b,F.X)
this.go=S.k(this.b,G.ad)
this.id=this.b.z.h(0,new H.t(A.c9))}}}],["","",,N,{"^":"",o1:{"^":"a;a,b",
gi:function(a){return this.a.length},
kc:function(){return this.a[this.b++]},
F:function(){var z,y,x
z=this.a
y=this.b
x=y+1
this.b=x
y=z[y]
this.b=x+1
return(y<<8>>>0)+z[x]},
kd:function(){var z,y,x
z=this.kc()
if(z>0){y=this.b
x=C.p.ag(this.a,y,y+z)
this.b+=z
return x}return new Uint8Array(H.dz(H.d([],[P.i])))},
k:function(a){return H.e(this.a)}},dr:{"^":"a;a,b",
bV:function(a,b){this.a[this.b++]=a},
fP:function(a){var z,y,x
z=this.a
y=this.b
x=y+1
this.b=x
z[y]=C.c.aU(a,8)&255
this.b=x+1
z[x]=a&255}}}],["","",,B,{"^":"",al:{"^":"a;a,b",
k:function(a){return this.b}},cE:{"^":"a;a,b",
k:function(a){return this.b},
bt:function(a){return this.l_.$1(a)}},u2:{"^":"c:47;",
$1:function(a){switch(a){case C.L:return 0
case C.M:return 4
case C.B:return 0}}}}],["","",,S,{}],["","",,Q,{"^":"",av:{"^":"a;a"}}],["","",,V,{"^":"",
x3:[function(a,b){var z=new V.rM(P.E(P.f,null),a)
z.a=S.aw(z,3,C.z,b)
z.d=$.ce
return z},"$2","tD",8,0,6],
x4:[function(a,b){var z=new V.rN(P.E(P.f,null),a)
z.a=S.aw(z,3,C.z,b)
z.d=$.ce
return z},"$2","tE",8,0,6],
x5:[function(a,b){var z=new V.rO(P.E(P.f,null),a)
z.a=S.aw(z,3,C.z,b)
z.d=$.ce
return z},"$2","tF",8,0,6],
x6:[function(a,b){var z=new V.rP(P.E(P.f,null),a)
z.a=S.aw(z,3,C.z,b)
z.d=$.ce
return z},"$2","tG",8,0,6],
x7:[function(a,b){var z=new V.rQ(P.E(P.f,null),a)
z.a=S.aw(z,3,C.bz,b)
return z},"$2","tH",8,0,6],
oo:{"^":"A;0r,0x,0y,0z,0Q,0ch,0cx,0cy,0db,0dx,0dy,0a,b,c,0d,0e,0f",
V:function(){var z,y,x,w
z=this.br(this.e)
y=document
x=S.au(y,z)
this.r=x
x.setAttribute("id","gamecontainer")
this.D(this.r)
x=S.B(y,"canvas",this.r)
this.x=x
x.setAttribute("id","game")
this.D(this.x)
x=S.B(y,"canvas",this.r)
this.y=x
x.setAttribute("id","hud")
this.D(this.y)
x=$.$get$f6()
w=x.cloneNode(!1)
this.r.appendChild(w)
w=new V.bF(3,0,this,w)
this.z=w
this.Q=new K.cG(new D.cM(w,V.tD()),w,!1)
w=x.cloneNode(!1)
this.r.appendChild(w)
w=new V.bF(4,0,this,w)
this.ch=w
this.cx=new K.cG(new D.cM(w,V.tE()),w,!1)
w=x.cloneNode(!1)
this.r.appendChild(w)
w=new V.bF(5,0,this,w)
this.cy=w
this.db=new K.cG(new D.cM(w,V.tF()),w,!1)
x=x.cloneNode(!1)
this.r.appendChild(x)
x=new V.bF(6,0,this,x)
this.dx=x
this.dy=new K.cG(new D.cM(x,V.tG()),x,!1)
this.bp(C.o,null)
return},
ak:function(){var z,y,x,w
z=this.f
y=this.Q
x=z.a
w=x.x
y.sbO(w.b===C.u)
this.cx.sbO(x.c)
this.db.sbO(x.d)
this.dy.sbO(w.b===C.u)
this.z.bK()
this.ch.bK()
this.cy.bK()
this.dx.bK()},
av:function(){var z=this.z
if(!(z==null))z.bJ()
z=this.ch
if(!(z==null))z.bJ()
z=this.cy
if(!(z==null))z.bJ()
z=this.dx
if(!(z==null))z.bJ()},
$asA:function(){return[Q.av]}},
rM:{"^":"A;0r,0x,0y,0a,b,c,0d,0e,0f",
V:function(){var z,y
z=new F.or(!1,!1,P.E(P.f,null),this)
z.a=S.aw(z,3,C.n,0)
y=document.createElement("game-menu")
z.e=y
y=$.eA
if(y==null){y=$.aU
y=y.bl(null,C.r,$.$get$ja())
$.eA=y}z.ba(y)
this.x=z
z=z.e
this.r=z
this.D(z)
z=this.c
z=new Q.cx(z.c.ci(C.w,z.a.Q))
this.y=z
this.x.aY(0,z,[])
this.bq(this.r)
return},
ak:function(){this.x.aw()},
av:function(){var z=this.x
if(!(z==null))z.aj()},
$asA:function(){return[Q.av]}},
rN:{"^":"A;0r,0x,0y,0a,b,c,0d,0e,0f",
V:function(){var z,y
z=new G.oq(P.E(P.f,null),this)
z.a=S.aw(z,3,C.n,0)
y=document.createElement("game-error")
z.e=y
y=$.hV
if(y==null){y=$.aU
y=y.bl(null,C.r,$.$get$j9())
$.hV=y}z.ba(y)
this.x=z
z=z.e
this.r=z
this.D(z)
z=this.c
z=new Q.fP(z.c.ci(C.w,z.a.Q))
this.y=z
this.x.aY(0,z,[])
this.bq(this.r)
return},
ak:function(){this.x.aw()},
av:function(){var z=this.x
if(!(z==null))z.aj()},
$asA:function(){return[Q.av]}},
rO:{"^":"A;0r,0x,0y,0a,b,c,0d,0e,0f",
V:function(){var z,y
z=new Q.ou(P.E(P.f,null),this)
z.a=S.aw(z,3,C.n,0)
y=document.createElement("privacy-policy")
z.e=y
y=$.hY
if(y==null){y=$.aU
y=y.bl(null,C.r,$.$get$jd())
$.hY=y}z.ba(y)
this.x=z
z=z.e
this.r=z
this.D(z)
z=this.c
z=new U.hq(z.c.ci(C.w,z.a.Q))
this.y=z
this.x.aY(0,z,[])
this.bq(this.r)
return},
ak:function(){this.x.aw()},
av:function(){var z=this.x
if(!(z==null))z.aj()},
$asA:function(){return[Q.av]}},
rP:{"^":"A;0r,0x,0y,0a,b,c,0d,0e,0f",
V:function(){var z,y
z=new B.ot(P.E(P.f,null),this)
z.a=S.aw(z,3,C.n,0)
y=document.createElement("page-footer")
z.e=y
y=$.hX
if(y==null){y=$.aU
y=y.bl(null,C.r,$.$get$jc())
$.hX=y}z.ba(y)
this.x=z
z=z.e
this.r=z
this.D(z)
z=this.c
z=z.c.ci(C.w,z.a.Q)
y=H.n4(2018,9,13,0,0,0,0,!0)
if(typeof y!=="number"||Math.floor(y)!==y)H.F(H.N(y))
z=new F.hk(new P.bZ(y,!0),new P.bZ(Date.now(),!1),z)
this.y=z
this.x.aY(0,z,[])
this.bq(this.r)
return},
ak:function(){this.x.aw()},
av:function(){var z=this.x
if(!(z==null))z.aj()},
$asA:function(){return[Q.av]}},
rQ:{"^":"A;0r,0x,0y,0z,0Q,0a,b,c,0d,0e,0f",
V:function(){var z,y,x
z=new V.oo(P.E(P.f,null),this)
z.a=S.aw(z,3,C.n,0)
y=document.createElement("my-app")
z.e=y
y=$.ce
if(y==null){y=$.aU
y=y.bl(null,C.r,$.$get$j8())
$.ce=y}z.ba(y)
this.r=z
this.e=z.e
y=new E.cK(!0,!1,!0)
this.x=y
x=new M.db(C.u)
this.y=x
x=new L.fQ(C.al,!1,!1,y,x)
this.z=x
x=new Q.av(x)
this.Q=x
z.aY(0,x,this.a.e)
this.bq(this.e)
return new D.bX(this,0,this.e,this.Q,[Q.av])},
fg:function(a,b,c){if(a===C.bv&&0===b)return this.x
if(a===C.bo&&0===b)return this.y
if(a===C.w&&0===b)return this.z
return c},
ak:function(){var z=this.a.cy
if(z===0)this.Q.a.fZ()
this.r.aw()},
av:function(){var z=this.r
if(!(z==null))z.aj()},
$asA:function(){return[Q.av]}}}],["","",,F,{"^":"",lv:{"^":"da;0id,0k1,0k2,k3,k4,r1,a,b,c,d,e,f,r,x,y,z,0Q,0ch,0cx,0cy,db,0dx,0dy,fr,fx,fy,go",
e8:function(){var z=this.k1
z.textBaseline="top"
z.font="16px Verdana"},
bt:function(a){var z,y,x,w,v,u,t
z=J.aK(a,0,Math.min(20,a.length))
y=C.m.gdu().bj(z)
z=this.k3
x=y.length
w=J.aj($.$get$cU().h(0,C.L),1+x)
v=J.aj(w,1)
v=new Uint8Array(v)
u=new N.dr(v,0)
u.bV(0,w)
w=u.b
t=w+1
u.b=t
v[w]=x&255
if(x!==0){C.p.aR(v,t,t+x,y)
x=u.b+=x}else x=t
if(z.b)z.c.send(C.p.ag(v,0,x))}}}],["","",,E,{"^":"",kM:{"^":"p6;y2,ax,aI,aJ,ay,0f3,0fx,0fy,0go,0id,0k1,0k2,a,0b,c,d,e,f,0r,0x,0y",
hJ:function(){var z=this.ax.a
new P.cg(z,[H.q(z,0)]).b2(new E.kN(this))},
b3:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=this.b.b.cC(S.aC(C.q))
z=new H.bf(z,new E.kO(),[H.a9(z,"cz",0)])
y=z.gi(z)
z=this.b.b.cC(S.aC(C.D))
z=new H.bf(z,new E.kP(),[H.a9(z,"cz",0)])
x=z.gi(z)
w=this.aJ
this.aJ=w+this.b.cy
if(C.c.a6(C.e.b6(w),5)===4&&C.c.a6(C.e.b6(this.aJ),5)===0){this.ay=window.performance.now()
z=this.ax
v=J.aj($.$get$cU().h(0,C.B),1)
u=J.aj(v,1)
u=new Uint8Array(u)
t=new N.dr(u,0)
t.bV(2,v)
if(z.b)z.c.send(C.p.ag(u,0,t.b))}z=this.go.fT()
s=P.b9(z,!0,H.q(z,0))
r=this.id.bk()
r.dn(r)
z=new T.am(new Float32Array(4))
z.b9(-1,-1,0,1)
q=r.by(z)
z=new T.am(new Float32Array(4))
z.b9(1,1,0,1)
p=r.by(z)
z=new E.kQ(q,p)
o=new H.bf(s,z,[H.q(s,0)])
v=this.k1
n=v.b
m=v.c
v=this.y2
v.save()
v.font="10px Verdana"
v.textBaseline="top"
v.fillStyle="grey"
v.strokeStyle="grey"
C.h.ac(v,"Entities: "+this.b.a.e,5,15)
C.h.ac(v,"Rendered circles: "+y,5,25)
C.h.ac(v,"Moving entities: "+x,5,35)
C.h.ac(v,"QuadTree leaves (visible/total): "+o.gi(o)+"/"+s.length,5,45)
C.h.ac(v,"Received: "+C.f.cv(this.aI/1024,3)+"kB",5,55)
C.h.ac(v,"Rate: "+C.f.cv(this.aI/1024/this.aJ,3)+"kB/s ("+C.f.cv(8*this.aI/1024/1024/this.aJ,3)+"Mbit/s)",5,65)
u=this.f3
u=u==null?null:C.e.a5(u)
C.h.ac(v,"Ping: "+H.e(u==null?"unknown":u)+"ms",5,75)
C.h.ac(v,"Version: 0.5.0",5,85)
C.h.ac(v,"Resolution: "+H.e(n)+":"+H.e(m),5,95)
u=p.a[0]
t=q.a
l=t[0]
k=n/(u-l)
v.transform(k,0,0,-k,-l*k,(m/k+t[1])*k)
for(u=C.b.gI(s),z=new H.eE(u,z);z.m();){t=u.gu(u).a
v.strokeRect(t.a,t.b,t.c,t.d)}v.restore()},
aH:function(){return this.k2.c}},kN:{"^":"c;a",
$1:[function(a){var z=this.a
z.aI=z.aI+a.b.a.length
if(a.a===C.K)z.f3=window.performance.now()-z.ay},null,null,4,0,null,43,"call"]},kO:{"^":"c;",
$1:function(a){return a!=null}},kP:{"^":"c;",
$1:function(a){return a!=null}},kQ:{"^":"c;a,b",
$1:function(a){var z,y,x,w
z=a.a
y=this.a.a
x=y[0]
y=y[1]
w=this.b.a
return z.fi(0,P.bc(x,y,w[0]-x,w[1]-y,P.O))}},kI:{"^":"p5;0x1,fx,fy,go,a,0b,c,d,e,f,0r,0x,0y",
aH:function(){return this.x1.b}},p6:{"^":"bG;",
A:function(a){this.U(0)
this.fx=S.k(this.b,G.aX)
this.fy=S.k(this.b,F.X)
this.go=this.b.z.h(0,new H.t(A.c9))
this.id=this.b.z.h(0,new H.t(F.be))
this.k1=this.b.z.h(0,new H.t(F.ax))
this.k2=this.b.z.h(0,new H.t(E.cK))}},p5:{"^":"lo;",
A:function(a){this.U(0)
this.x1=this.b.z.h(0,new H.t(E.cK))}}}],["","",,F,{"^":"",kz:{"^":"p4;ry,x1,0x2,0fx,0fy,a,0b,c,d,e,f,0r,0x,0y",
A:function(a){var z
this.he(0)
z=this.x1
z.toString
W.ai(z,"mousemove",new F.kA(this),!1)
W.ai(z,"touchmove",new F.kB(this),!1)
W.ai(z,"touchstart",new F.kC(this),!1)},
a1:[function(a){var z,y,x,w,v,u,t,s,r,q
z=this.x2
if(z!=null){y=this.x1
x=y.width
w=x/2
y=y.height
v=y/2
u=Math.min(x/3,y/3)
t=w-z.a
s=v-z.b
r=C.f.f7(65535*Math.max(0,Math.min(500,100*Math.min(u,Math.sqrt(t*t+s*s))/u))/500)
q=C.f.f7(65536*C.f.a6(6.283185307179586+Math.atan2(v-this.x2.b,J.dM(this.x2.a,w)),6.283185307179586)/6.283185307179586)
w=this.ry
v=J.aj($.$get$cU().h(0,C.M),1)
z=J.aj(v,1)
z=new Uint8Array(z)
y=new N.dr(z,0)
y.bV(1,v)
y.fP(r)
y.fP(q)
if(w.b)w.c.send(C.p.ag(z,0,y.b))}this.x2=null},"$1","ga0",4,0,1],
aH:function(){return this.fy.b===C.W}},kA:{"^":"c;a",
$1:function(a){this.a.x2=J.jt(a)}},kB:{"^":"c;a",
$1:function(a){var z=a.touches
z=(z&&C.ao).gad(z)
this.a.x2=new P.aO(C.e.a5(z.pageX),C.e.a5(z.pageY),[P.O])}},kC:{"^":"c;a",
$1:function(a){var z=a.touches
z=(z&&C.ao).gad(z)
this.a.x2=new P.aO(C.e.a5(z.pageX),C.e.a5(z.pageY),[P.O])
a.preventDefault()}},oF:{"^":"pq;f4,cf,0bm,0fx,0fy,0go,0id,0k1,0k2,0k3,0k4,0r1,0r2,0rx,0ry,a,0b,c,d,e,f,0r,0x,0y",
A:function(a){var z,y,x,w
this.hf(0)
z=this.cf
y=z.a
new P.cg(y,[H.q(y,0)]).b2(C.b.gj5(this.f4))
y=J.aj($.$get$cU().h(0,C.B),1)
x=J.aj(y,1)
x=new Uint8Array(x)
w=new N.dr(x,0)
w.bV(2,y)
if(z.b)z.c.send(C.p.ag(x,0,w.b))},
b3:function(){var z=this.f4
C.b.w(z,this.gi4())
C.b.si(z,0)},
kD:[function(a){var z,y
z=a.a
y=a.b
switch(z){case C.a8:this.ic(y)
break
case C.a9:this.ig(y)
break
case C.a4:this.ih(y)
break
case C.aa:this.iY(y)
break
case C.ab:this.iZ(y)
break
case C.ac:this.j0(y)
break
case C.ad:this.j_(y)
break
case C.a3:this.bm=y.F()
break
case C.a6:case C.a7:this.hM(y)
break
case C.af:case C.ae:this.j1(y)
break
case C.a5:this.iS(y)
break
case C.K:break}},"$1","gi4",4,0,48],
hM:function(a){var z,y
for(z=a.a.length;a.b<z;){y=a.F()
if(!this.r1.jr(y,C.ak))throw H.b(P.ay("ErrorCode: 42 - existential crisis"))
if(y===this.bm)this.ry.b=C.u}},
iY:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
for(z=a.a.length,y=G.bi,x=G.b1;a.b<z;){w=a.F()
v=a.F()/15
u=a.F()/15
t=this.r1.r.h(0,w)
if(t!=null){s=this.fx.b
r=t.a
q=s.a[r]
p=q.a
o=q.b
q.a=v
q.b=u
if(this.id.Z(t)!=null){s=t.r
r=new H.t(x)
n=$.$get$aM()
m=n.h(0,r)
if(m==null){m=new S.ao(0,0)
l=$.K
m.a=l
$.K=l<<1>>>0
l=$.L
$.L=l+1
m.b=l
n.j(0,r,m)}s.bG(t,m)
s=t.r
r=new H.t(y)
m=n.h(0,r)
if(m==null){m=new S.ao(0,0)
l=$.K
m.a=l
$.K=l<<1>>>0
l=$.L
$.L=l+1
m.b=l
n.j(0,r,m)}s.bG(t,m)}else if(this.k2.Z(t)!=null){s=v-p
n=u-o
k=Math.sqrt(s*s+n*n)
r=this.k2.b.a[r]
l=J.a8(r)
l.sbg(r,Math.atan2(n,s))
l.sG(r,k/this.b.cy)
r.scs(0)}s=new G.aB(v,u)
r=t.r
n=s.ga4(s)
l=$.$get$aM()
m=l.h(0,n)
if(m==null){m=new S.ao(0,0)
j=$.K
m.a=j
$.K=j<<1>>>0
j=$.L
$.L=j+1
m.b=j
l.j(0,n,m)}r.a8(t,m,s)
t.e.d.l(0,t)}}},
j0:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
for(z=a.a.length,y=G.bi,x=G.b1;a.b<z;){w=a.F()
v=a.F()/15
u=a.F()/15
t=a.F()
s=this.r1.r.h(0,w)
if(s!=null){r=this.fy.b
q=s.a
r.a[q].saN(1000*t/65535)
p=this.fx.b.a[q]
o=p.a
n=p.b
p.a=v
p.b=u
if(this.id.Z(s)!=null){t=s.r
r=new H.t(x)
q=$.$get$aM()
m=q.h(0,r)
if(m==null){m=new S.ao(0,0)
l=$.K
m.a=l
$.K=l<<1>>>0
l=$.L
$.L=l+1
m.b=l
q.j(0,r,m)}t.bG(s,m)
t=s.r
r=new H.t(y)
m=q.h(0,r)
if(m==null){m=new S.ao(0,0)
l=$.K
m.a=l
$.K=l<<1>>>0
l=$.L
$.L=l+1
m.b=l
q.j(0,r,m)}t.bG(s,m)}else if(this.k2.Z(s)!=null){t=v-o
r=u-n
k=Math.sqrt(t*t+r*r)
q=this.k2.b.a[q]
l=J.a8(q)
l.sbg(q,Math.atan2(r,t))
l.sG(q,k/this.b.cy)
q.scs(0)}t=new G.aB(v,u)
r=s.r
q=t.ga4(t)
l=$.$get$aM()
m=l.h(0,q)
if(m==null){m=new S.ao(0,0)
j=$.K
m.a=j
$.K=j<<1>>>0
j=$.L
$.L=j+1
m.b=j
l.j(0,q,m)}r.a8(s,m,t)
s.e.d.l(0,s)}}},
iZ:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
for(z=a.a.length;a.b<z;){y=a.F()
x=a.F()/15
w=a.F()/15
v=a.F()
u=this.r1.r.h(0,y)
if(u!=null){t=this.fx.b
s=u.a
r=t.a[s]
q=this.go.b.a[s]
p=r.a
o=r.b
n=q.a
r.a=x
r.b=w
q.a=6.283185307179586*v/65536
v=x-p
t=w-o
m=Math.sqrt(v*v+t*t)
s=this.k2.b.a[s]
l=J.a8(s)
l.sbg(s,Math.atan2(t,v))
l.sG(s,m/this.b.cy)
s.scs((q.a-n)/this.b.cy)
s=new G.aB(x,w)
l=u.r
v=s.ga4(s)
t=$.$get$aM()
k=t.h(0,v)
if(k==null){k=new S.ao(0,0)
j=$.K
k.a=j
$.K=j<<1>>>0
j=$.L
$.L=j+1
k.b=j
t.j(0,v,k)}l.a8(u,k,s)
u.e.d.l(0,u)}}},
j_:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
for(z=a.a.length;a.b<z;){y=a.F()
x=a.F()/15
w=a.F()/15
v=a.F()
u=a.F()
t=this.r1.r.h(0,y)
if(t!=null){s=this.fy.b
r=t.a
s.a[r].saN(1000*u/65535)
q=this.fx.b.a[r]
p=this.go.b.a[r]
o=q.a
n=q.b
m=p.a
q.a=x
q.b=w
p.a=6.283185307179586*v/65536
v=x-o
u=w-n
l=Math.sqrt(v*v+u*u)
r=this.k2.b.a[r]
s=J.a8(r)
s.sbg(r,Math.atan2(u,v))
s.sG(r,l/this.b.cy)
r.scs((p.a-m)/this.b.cy)
r=new G.aB(x,w)
s=t.r
v=r.ga4(r)
u=$.$get$aM()
k=u.h(0,v)
if(k==null){k=new S.ao(0,0)
j=$.K
k.a=j
$.K=j<<1>>>0
j=$.L
$.L=j+1
k.b=j
u.j(0,v,k)}s.a8(t,k,r)
t.e.d.l(0,t)}}},
ic:function(a){var z,y,x,w,v,u,t,s,r,q,p
for(z=a.a,y=z.length,x=[S.y];a.b<y;){w=a.F()
v=this.b
u=a.F()
t=a.F()
s=z[a.b++]
r=F.d4(0.35,0.4,0.4,1)
q=$.$get$bQ()
q=H.d([new G.dd(w,!0),new F.X(u/15,t/15),new G.ad(s/32),r,new G.aX(q.Y()*6.283185307179586,q.Y()*6.283185307179586,q.Y()*6.283185307179586)],x)
p=v.a.bd()
C.b.w(q,p.gbf())
v.c.l(0,p)
v=this.r1
v.r.j(0,J.bT(v.b.b.a[p.a]),p)}},
ig:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
for(z=a.a,y=z.length,x=[S.y];a.b<y;){w=a.F()
v=this.b
u=a.F()
t=a.F()
s=a.b
r=s+1
a.b=r
s=z[s]
q=r+1
a.b=q
r=z[r]
a.b=q+1
q=z[q]
p=F.d4(0.35,0.4,0.4,1)
o=$.$get$bQ()
o=H.d([new G.dd(w,!0),new F.X(u/15,t/15),new G.ad(s/32),new G.cy(r/32,q/64),p,new G.aX(o.Y()*6.283185307179586,o.Y()*6.283185307179586,o.Y()*6.283185307179586)],x)
n=v.a.bd()
C.b.w(o,n.gbf())
v.c.l(0,n)
v=this.r1
v.r.j(0,J.bT(v.b.b.a[n.a]),n)}},
ih:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
for(z=a.a,y=z.length,x=P.S,w=[S.y];a.b<y;){v=a.F()
u=a.F()/15
t=a.F()/15
s=a.F()
r=a.F()
q=z[a.b++]
p=a.kd()
o=new P.hT(!1).bj(p)
q=F.d4(q/255,0.9,0.6,0.4)
n=new G.cf()
n.a=P.h7(64,1,!1,x)
m=new G.ct(5)
m.a=P.h7(64,1,!1,x)
l=new G.ba(o)
l.b=C.m.gdu().bj(o)
k=H.d([new G.dd(v,!0),new F.X(u,t),new G.aB(u,t),new G.ad(1000*r/65535),q,new F.bs(6.283185307179586*s/65536),n,m,new G.eu(),new G.b1(0,0,0),l],w)
if(this.bm===v)k.push(new G.cu())
s=this.b
j=s.a.bd()
C.b.w(k,j.gbf())
s.c.l(0,j)
s=this.r1
s.r.j(0,J.bT(s.b.b.a[j.a]),j)}},
j1:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
for(z=a.a.length;a.b<z;){y=a.F()
x=a.F()
w=a.F()
v=this.r1.r.h(0,y)
if(v!=null){if(this.k1.Z(v)!=null){u=this.k1.b
t=v.a
s=u.a[t].gca()
t=this.rx
J.dR(t.d.h(0,s.a),v)
t.en(v,C.ak)}if(this.k3.Z(v)!=null){u=new G.b1(6.283185307179586*w/65536,500*x/65535,0)
t=v.r
r=u.ga4(u)
q=$.$get$aM()
p=q.h(0,r)
if(p==null){p=new S.ao(0,0)
o=$.K
p.a=o
$.K=o<<1>>>0
o=$.L
$.L=o+1
p.b=o
q.j(0,r,p)}t.a8(v,p,u)
u=new G.bi()
t=v.r
r=u.ga4(u)
p=q.h(0,r)
if(p==null){p=new S.ao(0,0)
o=$.K
p.a=o
$.K=o<<1>>>0
o=$.L
$.L=o+1
p.b=o
q.j(0,r,p)}t.a8(v,p,u)
v.e.d.l(0,v)}}}},
iS:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
for(z=a.a.length,y=G.cy;a.b<z;){x=a.F()
w=a.F()
v=this.r1.r.h(0,x)
u=this.r1.r.h(0,w)
if(v!=null&&u!=null){t=new G.bk(u)
s=v.r
r=t.ga4(t)
q=$.$get$aM()
p=q.h(0,r)
if(p==null){p=new S.ao(0,0)
o=$.K
p.a=o
$.K=o<<1>>>0
o=$.L
$.L=o+1
p.b=o
q.j(0,r,p)}s.a8(v,p,t)
t=v.r
s=new H.t(y)
p=q.h(0,s)
if(p==null){p=new S.ao(0,0)
r=$.K
p.a=r
$.K=r<<1>>>0
r=$.L
$.L=r+1
p.b=r
q.j(0,s,p)}t.bG(v,p)
v.e.d.l(0,v)
this.rx.fX(u,v)}}},
aH:function(){return!0}},p4:{"^":"ab;",
A:["he",function(a){this.U(0)
this.fx=S.k(this.b,G.cu)
this.fy=this.b.z.h(0,new H.t(M.db))}]},pq:{"^":"bG;",
A:["hf",function(a){this.U(0)
this.fx=S.k(this.b,F.X)
this.fy=S.k(this.b,G.ad)
this.go=S.k(this.b,F.bs)
this.id=S.k(this.b,G.bi)
this.k1=S.k(this.b,G.bk)
this.k2=S.k(this.b,G.b1)
this.k3=S.k(this.b,G.aX)
this.k4=this.b.z.h(0,new H.t(S.bz))
this.r1=this.b.z.h(0,new H.t(X.fT))
this.r2=this.b.z.h(0,new H.t(A.c9))
this.rx=this.b.z.h(0,new H.t(K.d7))
this.ry=this.b.z.h(0,new H.t(M.db))}]}}],["","",,M,{"^":"",mP:{"^":"ph;ce,0jA,0f6,0O,0ab,dw,0jx,b0,0r1,0r2,0rx,0ry,0x1,0x2,0y1,z,a$,b$,c$,d$,e$,f$,r$,a,0b,c,d,e,f,0r,0x,0y",
cp:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=this.r1.b
y=b.a
x=z.a[y]
w=this.r2.b.a[y]
v=this.rx.b.a[y]
u=this.ry.b.a[y]
t=this.x1.b.a[y]
s=this.f6.b.a[y]
r=a*129
y=this.b0
q=r*y
p=a*(192*this.ce)
z=this.O
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
this.dq(i,x,(h-g*f)*e,d,v,j,p,r)
e=this.O
f=i+5
g=e[f]
h=t.a[j]
e[f]=g/h
g=this.ab
f=p+j*9
g[f]=r
e=o+j
g[f+1]=e
c=n+j
g[f+2]=c
i+=m
this.dq(i,x,w.a*h,d,v,j,p,r)
this.O[i+5]=s.a[j]
h=this.ab
h[f+3]=e
h[f+4]=k+j
g=l+j
h[f+5]=g
h[f+6]=e
h[f+7]=c
h[f+8]=g}this.f_(q,C.c.b6(24),w,t,s,u,x)
this.f_(q,C.c.b6(40),w,t,s,u,x)
z=this.ab
y=p+576
z[y-1]=k
z[y-2]=o
z[y-4]=k
z[y-7]=o},
f_:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t
z=this.b0
y=a+z+z*b
x=c.a
w=e.b
v=e.a[b]
u=d.a[b]
t=f.a+6.283185307179586*b/64
u=(x-w*v)*u*1.1
this.O[y]=g.a+u*Math.cos(t)
this.O[y+1]=g.b+u*Math.sin(t)
y+=64*z
z=c.a*d.a[b]*1.1
this.O[y]=g.a+z*Math.cos(t)
this.O[y+1]=g.b+z*Math.sin(t)},
cw:function(a){this.O=new Float32Array(a*129*this.b0)
this.ab=new Uint16Array(a*(192*this.ce))}},lm:{"^":"pc;0aa,0O,ab,0r1,0r2,0rx,0ry,0x1,0x2,z,a$,b$,c$,d$,e$,f$,r$,a,0b,c,d,e,f,0r,0x,0y",
cp:function(a,b){var z,y,x,w,v,u
z=this.r2.b
y=b.a
x=z.a[y]
w=this.rx.b.a[y]
v=this.r1.b.a[y]
u=a*6
y=this.O
y[u]=x.a
y[u+1]=x.b
y[u+2]=w.a/this.x2.r
y[u+3]=v.a
y[u+4]=v.b
y[u+5]=v.c
this.aa[a]=a},
dO:function(a){var z=this.a$
z.uniformMatrix4fv(z.getUniformLocation(this.b$,"uViewProjection"),!1,this.x1.bk().a)
z.uniform1f(this.a$.getUniformLocation(this.b$,"uTime"),this.b.cx.h(0,this.y))
this.eT(this.ab,this.O,this.aa)
this.a$.drawElements(0,a,5123,0)},
cw:function(a){this.O=new Float32Array(a*6)
this.aa=new Uint16Array(a)},
gb7:function(){return"FoodRenderingSystem"},
gbL:function(){return"FoodRenderingSystem"}},kl:{"^":"p2;",
cp:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.r1.b
y=b.a
x=z.a[y]
w=this.r2.b.a[y]
v=this.rx.b.a[y]
u=this.ry.b.a[y]
t=this.x1.b.a[y]
s=a*129
y=this.b0
r=s*y
q=a*128*3
z=this.O
z[r]=x.a
z[r+1]=x.b
z[r+2]=v.a
z[r+3]=v.b
z[r+4]=v.c
z[r+5]=v.d/2
for(z=r+y,p=s+1,o=s+2,n=0;n<128;++n){this.dq(z+y*n,x,w.a*t.a[n],u.a+6.283185307179586*n/128,v,n,q,s)
m=this.ab
l=q+n*3
m[l]=s
m[l+1]=p+n
m[l+2]=o+n}this.ab[q+384-1]=p},
dq:function(a,b,c,d,e,f,g,h){var z,y
this.O[a]=b.a+c*Math.cos(d)
this.O[a+1]=b.b+c*Math.sin(d)
z=this.O
z[a+2]=e.a
z[a+3]=e.b
z[a+4]=e.c
y=Math.abs(f-32)/32
z[a+5]=e.d+0.5*y*y},
dO:function(a){var z=this.a$
z.uniformMatrix4fv(z.getUniformLocation(this.b$,"uViewProjection"),!1,this.y1.bk().a)
this.eT(this.dw,this.O,this.ab)
this.a$.drawElements(4,a*(192*this.ce),5123,0)},
cw:function(a){this.O=new Float32Array(a*129*this.b0)
this.ab=new Uint16Array(a*(192*this.ce))},
gb7:function(){return"PositionRenderingSystem"},
gbL:function(){return"PositionRenderingSystem"}},jQ:{"^":"oX;",
gb7:function(){return"BackgroundRenderingSystem"},
gbL:function(){return"BackgroundRenderingSystem"}},jR:{"^":"jQ;b0,jy,jz,f5,0ax,0aI,0aJ,0ay,a$,b$,c$,d$,e$,f$,r$,a,0b,c,d,e,f,0r,0x,0y"},nh:{"^":"pl;x1,x2,0fx,0fy,0go,a,0b,c,d,e,f,0r,0x,0y",
eR:function(){C.b.si(this.x2,0)},
a1:[function(a){var z,y,x
z=this.fy.b
y=a.a
x=z.a[y]
this.x2.push(new M.ca(this.fx.b.a[y].gfp(),x.a))},"$1","ga0",4,0,1],
f1:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.x2
C.b.fV(z,new M.ni())
y=this.x1
y.save()
y.strokeStyle="white"
x=y.measureText("Leaderboard").width
w=this.go.b-(250+x)/2
y.beginPath()
y.lineWidth=1
C.h.ac(y,"Leaderboard",w,5)
y.moveTo(w,24)
y.lineTo(w+x,24)
y.closePath()
y.stroke()
y.beginPath()
y.lineWidth=2
y.moveTo(this.go.b-250,28)
y.lineTo(this.go.b,28)
y.closePath()
y.stroke()
for(v=z.length,u=7,t=0,s=0;s<z.length;z.length===v||(0,H.aA)(z),++s){r=z[s]
q=C.e.R(r.b,1)
p=y.measureText(H.e(q)).width
u+=20;++t
o=y.measureText(""+t+". ").width
y.fillText(""+t+". ",this.go.b-250-o,u)
y.fillText(r.a,this.go.b-250,u)
y.fillText(H.e(q),this.go.b-p-5,u)}}},ni:{"^":"c:49;",
$2:function(a,b){return C.e.aX(b.b,a.b)}},ca:{"^":"a;a,aN:b@"},mO:{"^":"pg;ax,0fx,0fy,0go,0id,0k1,0k2,0k3,a,0b,c,d,e,f,0r,0x,0y",
a1:[function(a){var z,y,x,w,v,u,t,s,r,q
z=this.fx.b
y=a.a
x=z.a[y].gfp()
w=this.fy.b.a[y].gaN()
v=this.go.b.a[y]
u=this.k1.bk()
u.dn(u)
z=new T.am(new Float32Array(4))
z.b9(-1,-1,0,1)
t=u.by(z)
z=new T.am(new Float32Array(4))
z.b9(1,1,0,1)
s=u.by(z)
z=t.a
r=this.k2.b/(s.a[0]-z[0])
y=this.ax
y.save()
y.transform(r,0,0,r,-z[0]*r,(this.k2.c/r+z[1])*r)
y.font=H.e(Math.max(14,this.k2.d*w/3))+"px Verdana"
y.textBaseline="top"
y.fillStyle="white"
q=this.ax.measureText(x).width
y=this.ax;(y&&C.h).ac(y,x,v.a-q/2,-v.b)
y.restore()},"$1","ga0",4,0,1],
aH:function(){return this.k3.d}},ph:{"^":"kl;",
A:function(a){this.hd(0)
this.jA=S.k(this.b,G.ba)
this.f6=S.k(this.b,G.ct)}},pc:{"^":"eD;",
A:function(a){this.cI(0)
this.r1=S.k(this.b,G.aX)
this.r2=S.k(this.b,F.X)
this.rx=S.k(this.b,G.ad)
this.ry=S.k(this.b,G.b_)
this.x1=this.b.z.h(0,new H.t(F.be))
this.x2=this.b.z.h(0,new H.t(F.ax))}},p2:{"^":"eD;",
A:["hd",function(a){this.cI(0)
this.r1=S.k(this.b,F.X)
this.r2=S.k(this.b,G.ad)
this.rx=S.k(this.b,F.b6)
this.ry=S.k(this.b,F.bs)
this.x1=S.k(this.b,G.cf)
this.x2=S.k(this.b,G.b_)
this.y1=this.b.z.h(0,new H.t(F.be))}]},oX:{"^":"ow;",
A:function(a){this.ha(0)
this.ax=S.k(this.b,F.X)
this.aI=this.b.z.h(0,new H.t(F.be))
this.aJ=this.b.z.h(0,new H.t(S.bz))
this.ay=this.b.z.h(0,new H.t(F.ax))}},pl:{"^":"ab;",
A:function(a){this.U(0)
this.fx=S.k(this.b,G.ba)
this.fy=S.k(this.b,G.ad)
this.go=this.b.z.h(0,new H.t(F.ax))}},pg:{"^":"ab;",
A:function(a){this.U(0)
this.fx=S.k(this.b,G.ba)
this.fy=S.k(this.b,G.ad)
this.go=S.k(this.b,F.X)
this.id=S.k(this.b,G.b_)
this.k1=this.b.z.h(0,new H.t(F.be))
this.k2=this.b.z.h(0,new H.t(F.ax))
this.k3=this.b.z.h(0,new H.t(E.cK))}}}],["","",,B,{"^":"",oA:{"^":"a;a,b,c,d",
hp:function(a,b){var z
this.b=!0
z=this.c
W.ai(z,"message",new B.oD(this),!1)
W.ai(z,"close",new B.oE(this),!1)},
q:{
oB:function(a,b){var z=new B.oA(new P.hZ(null,null,0,[B.cD]),!1,a,b)
z.hp(a,b)
return z}}},oD:{"^":"c;a",
$1:function(a){var z=new FileReader()
W.ai(z,"load",new B.oC(this.a,z),!1)
z.readAsArrayBuffer(new P.eG([],[],!1).dm(a.data,!0))}},oC:{"^":"c;a,b",
$1:function(a){var z,y,x,w
z=C.aQ.gkm(this.b)
y=(z&&C.p).h_(z,1)
x=C.ba[z[0]]
w=this.a.a
if((w.c&4)===0)w.l(0,new B.cD(x,new N.o1(y,0)))}},oE:{"^":"c;a",
$1:function(a){var z=this.a
z.b=!1
z.a.jh(0)}},cD:{"^":"a;a,b"}}],["","",,N,{"^":"",km:{"^":"a;"}}],["","",,F,{}],["","",,Q,{"^":"",fP:{"^":"a;a"}}],["","",,G,{"^":"",oq:{"^":"A;0r,0x,0y,0z,0Q,0ch,0cx,0cy,0db,0dx,0dy,0fr,0fx,0fy,0go,0a,b,c,0d,0e,0f",
V:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.br(this.e)
y=document
x=S.au(y,z)
this.r=x
x.className="container"
this.D(x)
x=S.au(y,this.r)
this.x=x
x.className="info"
this.D(x)
x=S.au(y,this.x)
this.y=x
this.D(x)
w=y.createTextNode("Something went horribly wrong :/.")
this.y.appendChild(w)
x=S.au(y,this.x)
this.z=x
this.D(x)
v=y.createTextNode("An error occured and the game cannot be played.")
this.z.appendChild(v)
x=S.au(y,this.x)
this.Q=x
this.D(x)
u=y.createTextNode("Please open an issue or message isowosi (")
this.Q.appendChild(u)
x=S.B(y,"a",this.Q)
this.ch=x
x.setAttribute("href","https://github.com/isowosi/damacreat_io/issues")
this.D(this.ch)
t=y.createTextNode("Github")
this.ch.appendChild(t)
s=y.createTextNode("/")
this.Q.appendChild(s)
x=S.B(y,"a",this.Q)
this.cx=x
x.setAttribute("href","https://twitter.com/isowosi")
this.D(this.cx)
r=y.createTextNode("Twitter")
this.cx.appendChild(r)
q=y.createTextNode("/")
this.Q.appendChild(q)
x=S.B(y,"a",this.Q)
this.cy=x
x.setAttribute("href","https://reddit.com/user/isowosi")
this.D(this.cy)
p=y.createTextNode("Reddit")
this.cy.appendChild(p)
o=y.createTextNode(") to get it fixed.")
this.Q.appendChild(o)
x=S.au(y,this.x)
this.db=x
this.D(x)
n=y.createTextNode("You can try refreshing the browser if this error occured while playing.")
this.db.appendChild(n)
x=S.au(y,this.r)
this.dx=x
x.className="info"
this.D(x)
x=y.createTextNode("")
this.dy=x
this.dx.appendChild(x)
x=S.B(y,"pre",this.r)
this.fr=x
this.K(x)
x=y.createTextNode("")
this.fx=x
this.fr.appendChild(x)
this.bp(C.o,null)
return},
ak:function(){var z,y,x
z=this.f.a
y=J.b5(z.e)
if(y==null)y=""
if(Q.aV(this.fy,y)){this.dy.textContent=y
this.fy=y}x=J.b5(z.f)
if(x==null)x=""
if(Q.aV(this.go,x)){this.fx.textContent=x
this.go=x}},
$asA:function(){return[Q.fP]}}}],["","",,T,{}],["","",,Q,{"^":"",cx:{"^":"a;a",
bt:function(a){this.a.bt(a)},
gaS:function(){return this.a.r}}}],["","",,F,{"^":"",
x8:[function(a,b){var z=new F.rR(P.E(P.f,null),a)
z.a=S.aw(z,3,C.z,b)
z.d=$.eA
return z},"$2","uf",8,0,50],
or:{"^":"A;0r,0hO:x<,0y,0z,0Q,0ch,0cx,0cy,0db,0dx,0dy,0fr,0fx,0fy,0go,0id,0k1,0k2,k3,k4,0r1,0r2,0rx,0a,b,c,0d,0e,0f",
V:function(){var z,y,x,w,v,u,t,s,r,q
z=this.br(this.e)
y=document
x=S.au(y,z)
this.r=x
x.setAttribute("id","main")
this.D(this.r)
x=S.B(y,"input",this.r)
this.x=x
x.setAttribute("placeholder","Nickname")
this.x.setAttribute("type","text")
this.D(this.x)
w=y.createTextNode(" ")
this.r.appendChild(w)
x=$.$get$f6()
v=x.cloneNode(!1)
this.r.appendChild(v)
v=new V.bF(3,0,this,v)
this.y=v
this.z=new K.cG(new D.cM(v,F.uf()),v,!1)
v=x.cloneNode(!1)
this.Q=v
this.r.appendChild(v)
x=x.cloneNode(!1)
this.cy=x
this.r.appendChild(x)
x=S.au(y,z)
this.dy=x
x.setAttribute("id","settings")
this.D(this.dy)
x=S.B(y,"label",this.dy)
this.fr=x
this.K(x)
x=S.B(y,"input",this.fr)
this.fx=x
x.setAttribute("type","checkbox")
this.D(this.fx)
u=y.createTextNode(" show nicknames")
this.fr.appendChild(u)
t=y.createTextNode(" ")
this.dy.appendChild(t)
x=S.B(y,"label",this.dy)
this.fy=x
this.K(x)
x=S.B(y,"input",this.fy)
this.go=x
x.setAttribute("type","checkbox")
this.D(this.go)
s=y.createTextNode(" show FPS")
this.fy.appendChild(s)
r=y.createTextNode(" ")
this.dy.appendChild(r)
x=S.B(y,"label",this.dy)
this.id=x
this.K(x)
x=S.B(y,"input",this.id)
this.k1=x
x.setAttribute("type","checkbox")
this.D(this.k1)
q=y.createTextNode(" show debug info")
this.id.appendChild(q)
x=this.fx
v=W.ag;(x&&C.J).aW(x,"change",this.cd(this.gi7(),v,v))
x=this.go;(x&&C.J).aW(x,"change",this.cd(this.gi5(),v,v))
x=this.k1;(x&&C.J).aW(x,"change",this.cd(this.gi6(),v,v))
this.bp([],null)
return},
ak:function(){var z,y,x,w,v,u,t,s,r,q
z=this.f
y=this.z
x=z.a
y.sbO(x.b===C.am)
w=x.b===C.al
if(Q.aV(this.k3,w)){if(w){v=document
y=v.createElement("div")
this.ch=y
y.className="connecting"
this.D(y)
y=v.createTextNode("Connecting to server...")
this.cx=y
this.ch.appendChild(y)
this.eN(this.Q,H.d([this.ch],[W.G]))}else this.fC(H.d([this.ch],[W.G]))
this.k3=w}u=x.b===C.an
if(Q.aV(this.k4,u)){if(u){v=document
y=v.createElement("div")
this.db=y
y.className="connectionerror"
this.D(y)
y=v.createTextNode("Server could not be reached.")
this.dx=y
this.db.appendChild(y)
this.eN(this.cy,H.d([this.db],[W.G]))}else this.fC(H.d([this.db],[W.G]))
this.k4=u}this.y.bK()
z.toString
if(Q.aV(this.k2,20)){y=this.x
t=C.c.k(20)
y.setAttribute("maxlength",t)
$.f8=!0
this.k2=20}y=x.r
s=y.d
if(Q.aV(this.r1,s)){this.fx.checked=s
this.r1=s}r=y.b
if(Q.aV(this.r2,r)){this.go.checked=r
this.r2=r}q=y.c
if(Q.aV(this.rx,q)){this.k1.checked=q
this.rx=q}},
av:function(){var z=this.y
if(!(z==null))z.bJ()},
kG:[function(a){this.f.gaS().d=!this.f.gaS().d},"$1","gi7",4,0,4],
kE:[function(a){this.f.gaS().b=!this.f.gaS().b},"$1","gi5",4,0,4],
kF:[function(a){this.f.gaS().c=!this.f.gaS().c},"$1","gi6",4,0,4],
$asA:function(){return[Q.cx]}},
rR:{"^":"A;0r,0a,b,c,0d,0e,0f",
V:function(){var z,y,x,w
z=document
y=z.createElement("button")
this.r=y
this.D(y)
x=z.createTextNode("Join Game")
this.r.appendChild(x)
y=this.r
w=W.ag;(y&&C.I).aW(y,"click",this.cd(this.gi8(),w,w))
this.bq(this.r)
return},
kH:[function(a){var z=this.c.ghO()
this.f.bt(z.value)},"$1","gi8",4,0,4],
$asA:function(){return[Q.cx]}}}],["","",,L,{"^":"",fQ:{"^":"a;0a,b,c,d,0e,0f,aS:r<,x",
fZ:function(){P.uB(new L.lQ(this),new L.lR(this),null,null,P.x)},
bt:function(a){if(!this.c&&this.x.b===C.u){this.a.bt(a)
this.x.b=C.W}},
fI:[function(){this.d=!this.d},"$0","gbR",0,0,2]},lQ:{"^":"c:0;a",
$0:[function(){var z,y
z=W.oG("wss://ws.damacreat.io/v0/",null)
y=this.a
W.ai(z,"open",new L.lO(y,z),!1)
W.ai(z,"error",new L.lP(y),!1)},null,null,0,0,null,"call"]},lO:{"^":"c:8;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r
z=this.a
z.b=C.am
y=this.b
x=B.oB(y,!1)
w=P.eq(null,null,null,null,!1,P.aG)
v=document
u=v.querySelector("#game")
t=H.up(v.querySelector("#game"),"$isdX")
t.toString
s=P.bo(["alpha",!0,"depth",!0,"stencil",!1,"antialias",!0,"premultipliedAlpha",!0,"preserveDrawingBuffer",!1],P.f,null)
r=(t&&C.V).dT(t,"webgl",s)
if(r==null)r=C.V.dT(t,"experimental-webgl",s)
t=r
t=new F.lv(x,z.r,z.x,w,u,null,t,new L.lM("damacreat_io",null),null,null,null,!0,!1,null,!1,!1,!1,!1)
t.hl("damacreat_io","#game",null,!0,null,!1,null,null,!1,!0)
t.k2=v.querySelector("#gamecontainer")
v=v.querySelector("#hud")
t.id=v
v.toString
t.k1=v.getContext("2d")
t.e8()
t.fW(0)
z.a=t
C.bA.jG(window).b2(new L.lN(y))}},lN:{"^":"c:8;a",
$1:[function(a){this.a.close()},null,null,4,0,null,0,"call"]},lP:{"^":"c:8;a",
$1:function(a){this.a.b=C.an}},lR:{"^":"c:3;a",
$2:[function(a,b){var z=this.a
z.c=!0
z.e=a
z.f=b},null,null,8,0,null,44,2,"call"]},eo:{"^":"a;a,b",
k:function(a){return this.b}}}],["","",,G,{}],["","",,F,{"^":"",hk:{"^":"a;a,b,c",
fI:[function(){var z=this.c
z.d=!z.d
return},"$0","gbR",0,0,2],
fS:function(){var z=C.c.R(P.l1(0,0,0,this.b.a-this.a.a,0,0).a,864e8)
if(z>1)return""+z+" days ago"
else if(z===1)return"yesterday"
return"today"}}}],["","",,B,{"^":"",ot:{"^":"A;0r,0x,0y,0z,0Q,0ch,0cx,0cy,0db,0dx,0a,b,c,0d,0e,0f",
V:function(){var z,y,x,w,v,u,t,s
z=this.br(this.e)
y=document
x=S.au(y,z)
this.r=x
x.className="privacy"
this.D(x)
x=S.B(y,"a",this.r)
this.x=x
x.setAttribute("href","#")
this.D(this.x)
w=y.createTextNode("Privacy Policy")
this.x.appendChild(w)
x=S.ub(y,this.r)
this.y=x
x.className="lastupdate"
this.K(x)
v=y.createTextNode("(updated ")
this.y.appendChild(v)
x=y.createTextNode("")
this.z=x
this.y.appendChild(x)
u=y.createTextNode(")")
this.y.appendChild(u)
x=S.B(y,"a",z)
this.Q=x
x.className="logo"
x.setAttribute("href","https://isowosi.com/")
this.Q.setAttribute("target","_blank")
this.D(this.Q)
x=new S.os(P.E(P.f,null),this)
x.a=S.aw(x,3,C.n,8)
t=y.createElement("isowosi-logo")
x.e=t
t=$.hW
if(t==null){t=$.aU
t=t.bl(null,C.r,$.$get$jb())
$.hW=t}x.ba(t)
this.cx=x
x=x.e
this.ch=x
this.Q.appendChild(x)
this.D(this.ch)
x=new U.fV()
this.cy=x
this.cx.aY(0,x,[])
z.appendChild(y.createTextNode(" "))
x=S.B(y,"a",z)
this.db=x
x.className="imprint"
x.setAttribute("href","https://isowosi.com/impressum")
this.db.setAttribute("target","_blank")
this.D(this.db)
s=y.createTextNode("Imprint")
this.db.appendChild(s)
x=this.x;(x&&C.aE).aW(x,"click",this.dv(this.f.gbR(),W.ag))
this.bp(C.o,null)
return},
ak:function(){var z=Q.uq(this.f.fS())
if(Q.aV(this.dx,z)){this.z.textContent=z
this.dx=z}this.cx.aw()},
av:function(){var z=this.cx
if(!(z==null))z.aj()},
$asA:function(){return[F.hk]}}}],["","",,F,{}],["","",,U,{"^":"",hq:{"^":"a;a",
fI:[function(){var z=this.a
z.d=!z.d
return},"$0","gbR",0,0,2]}}],["","",,Q,{"^":"",ou:{"^":"A;0r,0x,0y,0z,0Q,0ch,0cx,0cy,0db,0dx,0dy,0fr,0fx,0fy,0go,0id,0k1,0k2,0k3,0k4,0a,b,c,0d,0e,0f",
V:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=this.br(this.e)
y=document
x=S.au(y,z)
this.r=x
x.className="exit"
this.D(x)
x=S.B(y,"button",this.r)
this.x=x
this.D(x)
w=y.createTextNode("Close")
this.x.appendChild(w)
x=S.B(y,"h2",z)
this.y=x
this.K(x)
v=y.createTextNode("Privacy Policy")
this.y.appendChild(v)
x=S.B(y,"h3",z)
this.z=x
this.K(x)
u=y.createTextNode("General")
this.z.appendChild(u)
x=S.B(y,"h4",z)
this.Q=x
this.K(x)
t=y.createTextNode("Data Processing by isowosi UG (haftungsbeschr\xe4nkt)")
this.Q.appendChild(t)
x=S.B(y,"p",z)
this.ch=x
this.K(x)
s=y.createTextNode("While using this website, only the technical data required to deliver the requested resources and play the game is processed.")
this.ch.appendChild(s)
x=S.B(y,"ul",this.ch)
this.cx=x
this.D(x)
x=S.B(y,"li",this.cx)
this.cy=x
this.K(x)
r=y.createTextNode("IP-address to deliver resources to the user")
this.cy.appendChild(r)
x=S.B(y,"li",this.cx)
this.db=x
this.K(x)
q=y.createTextNode("data which is send by the browser by default (HTTP Request Header)")
this.db.appendChild(q)
x=S.B(y,"li",this.cx)
this.dx=x
this.K(x)
p=y.createTextNode("inputs you provide to play the game (mouse movement, touch screen input, etc.)")
this.dx.appendChild(p)
x=S.B(y,"h4",z)
this.dy=x
this.K(x)
o=y.createTextNode("Data Storage by isowosi UG (haftungsbeschr\xe4nkt)")
this.dy.appendChild(o)
x=S.B(y,"p",z)
this.fr=x
this.K(x)
n=y.createTextNode("No data is stored while using this website (no logs, no profiling, no tracking).")
this.fr.appendChild(n)
x=S.B(y,"h3",z)
this.fx=x
this.K(x)
m=y.createTextNode("External Providers")
this.fx.appendChild(m)
x=S.B(y,"h4",z)
this.fy=x
this.K(x)
l=y.createTextNode("Hosting")
this.fy.appendChild(l)
x=S.B(y,"p",z)
this.go=x
this.K(x)
k=y.createTextNode("To host this website, the infrastructure of GitHub is used. GitHub is certified under the US Privacy Shield and complies with the GDPR.")
this.go.appendChild(k)
x=S.B(y,"p",z)
this.id=x
this.K(x)
j=y.createTextNode("For the serverside game logic the game connects to the infrastructure of Digitial Ocean. Digitial Ocean is certified under the US Privacy Shield and complies with the GDPR.")
this.id.appendChild(j)
x=S.B(y,"h4",z)
this.k1=x
this.K(x)
i=y.createTextNode("Google Fonts")
this.k1.appendChild(i)
x=S.B(y,"p",z)
this.k2=x
this.K(x)
h=y.createTextNode("This website uses the font Roboto provided by Google Fonts. Google Fonts limits the processing and storing of personally identifiable information to the minimum needed to efficiently use fonts. No authentification is required and no cookies are stored. Google Fonts is certified under the US Privacy Shield and complies with the GDPR.")
this.k2.appendChild(h)
x=S.au(y,z)
this.k3=x
x.className="exit"
this.D(x)
x=S.B(y,"button",this.k3)
this.k4=x
this.D(x)
g=y.createTextNode("Close")
this.k4.appendChild(g)
x=this.x
f=W.ag;(x&&C.I).aW(x,"click",this.dv(this.f.gbR(),f))
x=this.k4;(x&&C.I).aW(x,"click",this.dv(this.f.gbR(),f))
this.bp(C.o,null)
return},
$asA:function(){return[U.hq]}}}],["","",,G,{"^":"",cu:{"^":"y;"},cf:{"^":"y;0a"},ct:{"^":"y;0a,b"},b_:{"^":"y;"},fG:{"^":"y;"},cB:{"^":"y;fG:a@,b"},eu:{"^":"y;"},ev:{"^":"y;"}}],["","",,M,{"^":"",db:{"^":"at;b,0a"},fR:{"^":"a;a,b",
k:function(a){return this.b}}}],["","",,E,{"^":"",cK:{"^":"at;b,c,d,0a"}}],["","",,Q,{"^":"",mK:{"^":"pe;0fx,0fy,0go,a,0b,c,d,e,f,0r,0x,0y",
b3:function(){var z,y,x,w,v,u,t,s
z=this.go.bk()
z.dn(z)
y=new T.am(new Float32Array(4))
y.b9(-1,-1,0,1)
x=z.by(y)
y=new T.am(new Float32Array(4))
y.b9(1,1,0,1)
w=z.by(y)
y=this.fy
v=x.a
u=v[0]
v=v[1]
t=w.a
s=t[0]
t=t[1]
y.e.cD(P.bc(u,v,s-u,t-v,P.S)).w(0,this.giW())},
kP:[function(a){var z=new G.b_()
a.r.a8(a,S.aC(z.ga4(z)),z)
a.e.d.l(0,a)},"$1","giW",4,0,1]},ll:{"^":"pb;0fx,0fy,0go,a,0b,c,d,e,f,0r,0x,0y",
a1:[function(a){var z,y,x,w
z=this.fy.b
y=a.a
x=z.a[y]
w=this.go.b.a[y]
y=x.a+w.b*this.b.cy
x.a=y
z=w.a
if(y>=z){x.a=z
a.cr(G.cy)
a.e.d.l(0,a)}},"$1","ga0",4,0,1]},nl:{"^":"pm;0fx,0fy,a,0b,c,d,e,f,0r,0x,0y",
a1:[function(a){a.cr(G.aB)
a.cr(G.b_)
a.e.d.l(0,a)},"$1","ga0",4,0,1]},kU:{"^":"p8;0cf,0bm,0jw,0fx,0fy,a,0b,c,d,e,f,0r,0x,0y",
k7:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.cf.b
y=b.a
x=z.a[y]
w=this.fy.b.a[y]
v=this.bm.b.a[a.a]
u=F.dJ(v.a,v.b,v.c)
for(z=[S.y],t=0;t<w.a;++t){s=$.$get$bQ().Y()*2*3.141592653589793
y=this.b
r=H.d([new F.dk(),new F.X(x.a+w.a*Math.cos(s),x.b+w.a*Math.sin(s)),F.d4(u[0],u[1]+0.1,u[2]+0.1,1),new G.cB(0.1,0.1)],z)
q=y.a.bd()
C.b.w(r,q.gbf())
y.c.l(0,q)}}},lh:{"^":"pa;0fx,a,0b,c,d,e,f,0r,0x,0y",
a1:[function(a){var z,y,x
z=this.fx.b
y=a.a
x=z.a[y]
x.sfG(x.gfG()-this.b.cy)
if(x.a<=0)a.e.e.l(0,a)},"$1","ga0",4,0,1]},lb:{"^":"p9;cg,0az,0aa,0O,0ab,0dw,0fx,0fy,0go,0id,0k1,0k2,a,0b,c,d,e,f,0r,0x,0y",
fY:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r
z=this.O.b
y=a.a
x=z.a[y]
w=C.e.a5((Math.atan2(e,d)-x.a)*this.cg)
v=C.f.a5(C.f.R(g/f*64,4))
u=this.az.b.a[y]
t=(c+g-f)/f
for(s=-v+1,z=v*v;s<=v;++s){r=C.c.a6(w+s,64)
y=u.a
y[r]=Math.max(y[r],1+t*(1-s*s/z))}},
kr:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.O.b
y=a.a
x=z.a[y]
w=C.e.a5((Math.atan2(e,d)-x.a)*this.cg)
v=g/f
u=C.f.a5(C.f.R(v*64,4))
t=this.az.b.a[y]
s=(f+g-c)/g
r=this.aa.b.a[y]
q=u*u*u
p=q*u
for(o=-u+1,z=v*s;o<=u;++o){n=C.c.a6(w+o,64)
y=t.a
m=o*o
y[n]=Math.min(y[n],1-z*(1-m*m/p))
r.a[n]=1-s*(1-Math.abs(m*o)/q)}},
jb:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=this.O.b
y=a.a
x=z.a[y]
w=C.e.a5((Math.atan2(e,d)-x.a)*this.cg)
v=g/f
u=C.f.a5(C.f.R(v*64,4))
t=this.az.b.a[y]
z=f+g-c
s=z/g
r=this.aa.b.a[y]
q=(c+g-f)/f
p=u*u
o=p*u
n=o*u
y=g/2
m=(z-y)/y
m*=m
for(l=-u+1,z=v*s,y=1-m;l<=u;++l){k=C.c.a6(w+l,64)
j=t.a
i=j[k]
h=l*l
j[k]=m*Math.max(i,1+q*(1-h/p))+y*Math.min(i,1-z*(1-h*h/n))
r.a[k]=1-s*(1-Math.abs(h*l)/o)}},
k8:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p
z=this.O.b
y=a.a
x=z.a[y]
w=C.e.a5((Math.atan2(e,d)-x.a)*this.cg)
v=C.f.a5(C.f.R(g/f*64,4))
u=this.az.b.a[y]
t=this.aa.b.a[y]
s=(c+g-f)/f
r=v*v*v
for(q=-v+1;q<=v;++q){p=C.c.a6(w+q,64)
z=u.a
y=s*(1-Math.abs(q*q*q)/r)
z[p]=Math.max(z[p],1+y)
t.a[p]=1-y}}},oJ:{"^":"pr;0fx,a,0b,c,d,e,f,0r,0x,0y",
a1:[function(a){var z,y,x,w
z=this.fx.b
y=a.a
x=z.a[y].a
for(w=0;w<64;++w)x[w]=0.2+0.8*x[w]},"$1","ga0",4,0,1]},kg:{"^":"p1;0fx,a,0b,c,d,e,f,0r,0x,0y",
a1:[function(a){var z,y,x,w
z=this.fx.b
y=a.a
x=z.a[y].a
for(z=this.b,w=0;w<64;++w)x[w]=1+(x[w]-1)*(1-0.999*z.cy)},"$1","ga0",4,0,1]},nW:{"^":"po;0fx,0fy,0go,0id,0k1,0k2,0k3,0k4,0r1,a,0b,c,d,e,f,0r,0x,0y",
a1:[function(a){var z,y,x,w,v,u,t,s,r,q
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
this.dX(x,w,t,u,s,y+2.356194490192345,q+2.356194490192345,v,r,1)
this.dX(x,w,t,u,s,y-2.356194490192345,q-2.356194490192345,v,r,-1)},"$1","ga0",4,0,1],
dX:function(a8,a9,b0,b1,b2,b3,b4,b5,b6,b7){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7
if(b7===1){z=C.c.b6(24)
y=b6.a
x=y[z]
w=y[z+1]}else{v=C.c.b6(40)
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
b=F.dJ(b2.a,b2.b,b2.c)
a=b[2]+0.1
b[2]=a
a0=b[1]+0.3
b[1]=a0
a1=F.fb(b[0],a0,a)
for(p=p+o*l*w-u,m=k+j*m*w-t,h=y+i*h*w-s,n=r+g*n*w-q,e=d/e*0.9,g=c-0.04908738521234052,r=[S.y],a2=0;a2<b0.a/10;++a2){y=$.$get$bQ()
a3=y.Y()
a4=y.Y()
a5=u+a3*p
a6=t+a3*m
o=this.b
l=a1[0]
k=a1[1]
j=a1[2]
i=new F.b6(l,k,j,1,null,1)
i.e=F.dJ(l,k,j)[2]
i.r=l
i.x=k
i.y=j
j=1+2*y.Y()
k=y.Y()
k=H.d([new F.X(a5+a4*(s+a3*h-a5),a6+a4*(q+a3*n-a6)),new F.dk(),new G.ev(),i,new G.cB(j,j),new G.b1(g+y.Y()*3.141592653589793/32,e+k*0.2,0)],r)
a7=o.a.bd()
C.b.w(k,a7.gbf())
o.c.l(0,a7)}}},nV:{"^":"pn;0fx,0fy,0go,a,0b,c,d,e,f,0r,0x,0y",
a1:[function(a){var z,y,x,w,v,u,t,s
z=this.fy.b
y=a.a
x=z.a[y]
w=this.go.b.a[y]
v=F.dJ(x.r,x.x,x.y)
y=v[0]
z=w.a
u=w.b
y-=0.2*(1-z/u)
v[0]=y
t=v[1]*z/u
v[1]=t
z=v[2]*z/u
v[2]=z
s=F.fb(y,t,z)
x.a=s[0]
x.b=s[1]
x.c=s[2]
x.d=w.a/u},"$1","ga0",4,0,1]},kb:{"^":"p0;0fx,0fy,0go,a,0b,c,d,e,f,0r,0x,0y",
a1:[function(a){var z,y,x
z=this.fy.b
y=a.a
x=z.a[y]
this.go.r=0.6+Math.sqrt(x.a/300)},"$1","ga0",4,0,1]},ka:{"^":"p_;0fx,0fy,0go,a,0b,c,d,e,f,0r,0x,0y",
a1:[function(a){var z,y,x,w
z=this.fy
y=z.b
x=a.a
w=y.a[x]
x=this.go.b.h(0,"camera")
z=z.b
x=x.a
x=z.a[x]
z=J.a8(x)
z.sn(x,w.a)
z.sp(x,w.b)},"$1","ga0",4,0,1]},pe:{"^":"bG;",
A:function(a){this.U(0)
this.fx=this.b.z.h(0,new H.t(F.ax))
this.fy=this.b.z.h(0,new H.t(A.c9))
this.go=this.b.z.h(0,new H.t(F.be))}},pb:{"^":"ab;",
A:function(a){this.U(0)
this.fx=S.k(this.b,G.aX)
this.fy=S.k(this.b,G.ad)
this.go=S.k(this.b,G.cy)}},pm:{"^":"ab;",
A:function(a){this.U(0)
this.fx=S.k(this.b,G.aB)
this.fy=S.k(this.b,G.b_)}},p8:{"^":"jV;",
A:function(a){this.hb(0)
this.cf=S.k(this.b,F.X)
this.bm=S.k(this.b,F.b6)
this.jw=this.b.z.h(0,new H.t(K.d7))}},pa:{"^":"ab;",
A:function(a){this.U(0)
this.fx=S.k(this.b,G.cB)}},p9:{"^":"jW;",
A:function(a){this.hc(0)
this.az=S.k(this.b,G.cf)
this.aa=S.k(this.b,G.ct)
this.O=S.k(this.b,F.bs)
this.ab=S.k(this.b,G.b_)
this.dw=this.b.z.h(0,new H.t(S.bz))}},pr:{"^":"ab;",
A:function(a){this.U(0)
this.fx=S.k(this.b,G.cf)}},p1:{"^":"ab;",
A:function(a){this.U(0)
this.fx=S.k(this.b,G.ct)}},po:{"^":"ab;",
A:function(a){this.U(0)
this.fx=S.k(this.b,F.X)
this.fy=S.k(this.b,G.aB)
this.go=S.k(this.b,F.bs)
this.id=S.k(this.b,G.eu)
this.k1=S.k(this.b,G.b1)
this.k2=S.k(this.b,G.ad)
this.k3=S.k(this.b,F.b6)
this.k4=S.k(this.b,G.cf)
this.r1=S.k(this.b,G.b_)}},pn:{"^":"ab;",
A:function(a){this.U(0)
this.fx=S.k(this.b,G.ev)
this.fy=S.k(this.b,F.b6)
this.go=S.k(this.b,G.cB)}},p0:{"^":"ab;",
A:function(a){this.U(0)
this.fx=S.k(this.b,G.cu)
this.fy=S.k(this.b,G.ad)
this.go=this.b.z.h(0,new H.t(F.ax))}},p_:{"^":"ab;",
A:function(a){this.U(0)
this.fx=S.k(this.b,G.cu)
this.fy=S.k(this.b,F.X)
this.go=this.b.z.h(0,new H.t(S.bz))}}}],["","",,S,{"^":"",
aC:function(a){var z,y,x
z=$.$get$aM()
y=z.h(0,a)
if(y==null){y=new S.ao(0,0)
x=$.K
y.a=x
$.K=x<<1>>>0
x=$.L
$.L=x+1
y.b=x
z.j(0,a,y)}return y},
H:{"^":"a;a,b,c",
N:function(a,b){var z={}
z.a=a
C.b.w(b,new S.jN(z))
return z.a}},
jN:{"^":"c;a",
$1:function(a){var z=this.a
z.a=(z.a|S.aC(a).a)>>>0}},
y:{"^":"a;",
d8:function(){}},
kt:{"^":"at;b,c,0a",
A:function(a){},
kO:[function(a){this.hY(a,new S.ku(a))
a.c=0},"$1","giA",4,0,1],
a8:function(a,b,c){var z,y,x,w,v
z=b.b
y=this.b
y.cW(z)
x=y.a[z]
if(x==null){w=S.y
v=new Array(16)
v.fixed$length=Array
x=new S.ak(H.d(v,[w]),0,[w])
y.j(0,z,x)}x.j(0,a.a,c)
y=b.a
a.c=(a.c|y)>>>0},
bG:function(a,b){var z,y,x
if((a.c&b.a)>>>0!==0){z=b.b
y=this.b
x=a.a
J.cW(y.a[z],x).d8()
J.bS(y.a[z],x,null)
x=b.a
a.c=(a.c&~x)>>>0}},
cC:function(a){var z,y,x,w,v
z=a.b
y=this.b
y.cW(z)
x=y.a[z]
if(x==null){w=S.y
v=new Array(16)
v.fixed$length=Array
x=new S.ak(H.d(v,[w]),0,[w])
y.j(0,z,x)}return x},
hY:function(a,b){var z,y,x
z=a.c
for(y=this.b,x=0;z>0;){if((z&1)===1)b.$2(y.a[x],x);++x
z=z>>>1}},
aZ:function(a){return this.c.l(0,a)}},
ku:{"^":"c:76;a",
$2:function(a,b){var z=this.a.a
a.a[z].d8()
a.j(0,z,null)}},
ao:{"^":"a;a,b"},
af:{"^":"a;a,0b,c,d,e,0f,0r",
k:function(a){return"Entity["+H.e(this.a)+"]"},
kR:[function(a){var z,y,x,w,v,u
z=this.r
y=S.aC(J.dQ(a))
x=y.b
z=z.b
z.cW(x)
w=z.a[x]
if(w==null){v=S.y
u=new Array(16)
u.fixed$length=Array
w=new S.ak(H.d(u,[v]),0,[v])
z.j(0,x,w)}w.j(0,this.a,a)
z=y.a
this.c=(this.c|z)>>>0},"$1","gbf",4,0,51],
cr:function(a){var z,y,x,w
z=this.r
y=S.aC(new H.t(a))
if((this.c&y.a)>>>0!==0){x=y.b
z=z.b
w=this.a
J.cW(z.a[x],w).d8()
J.bS(z.a[x],w,null)
y=y.a
this.c=(this.c&~y)>>>0}}},
lc:{"^":"at;b,c,d,e,f,r,x,y,0a",
A:function(a){},
bd:function(){var z,y
z=this.c.fD(0)
if(z==null){y=this.a
z=new S.af(this.y.jg(),0,0,y)
z.f=y.a
z.r=y.b}++this.r
y=$.fI
$.fI=y+1
z.b=y
return z},
bH:function(a){++this.e;++this.f
this.b.j(0,a.a,a)},
dt:function(a,b){this.d.j(0,b.a,!1)},
ds:function(a,b){this.d.j(0,b.a,!0)},
aZ:function(a){var z=a.a
this.b.j(0,z,null)
this.d.j(0,z,!1)
this.c.l(0,a);--this.e;++this.x}},
qs:{"^":"a;a,b",
jg:function(){var z=this.a
if(z.b>0)return z.fD(0)
return this.b++}},
aN:{"^":"a;",
M:function(a){var z,y,x
this.r=this.d===0&&this.f===0
z=new H.t(H.fa(this))
y=$.eS
if(y==null){y=P.E(P.cO,P.i)
$.eS=y}x=y.h(0,z)
if(x==null){y=$.im
x=C.c.iQ(1,y)
$.im=y+1
$.eS.j(0,z,x)}this.a=x},
eR:function(){},
f1:function(a){},
A:["U",function(a){}],
cQ:function(a){var z,y,x,w
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
a.d=(a.d|z)>>>0}else if(!w&&y)this.d7(a)},
d7:function(a){var z
this.c.C(0,a)
z=this.a
a.d=(a.d&~z)>>>0},
bH:function(a){return this.cQ(a)},
dl:function(a){return this.cQ(a)},
dt:function(a,b){return this.cQ(b)},
aZ:function(a){var z=this.a
if((z&a.d)>>>0===z)this.d7(a)},
ds:function(a,b){var z=this.a
if((z&b.d)>>>0===z)this.d7(b)}},
at:{"^":"a;",
A:["bU",function(a){}],
bH:function(a){},
dl:function(a){},
aZ:function(a){},
ds:function(a,b){},
dt:function(a,b){}},
bz:{"^":"at;b,c,0a",
aZ:function(a){var z=this.c.C(0,a)
if(z!=null)this.b.C(0,z)}},
mq:{"^":"a;0a,0b,$ti",
h:function(a,b){var z,y
z=this.b
y=b.a
return z.a[y]},
Z:function(a){var z,y
z=this.b
y=a.a
z=z.a
if(y<z.length)return z[y]
return},
q:{
k:function(a,b){var z,y
z=new S.mq([b])
y=S.aC(new H.t(b))
z.a=y
z.b=a.b.cC(y)
return z}}},
ab:{"^":"aN;",
dL:function(a){return a.w(0,this.ga0())},
aH:function(){return!0}},
bG:{"^":"aN;",
dL:function(a){return this.b3()},
aH:function(){return!0}},
ak:{"^":"pH;a,b,$ti",
h:function(a,b){return this.a[b]},
gaE:function(a){return this.b},
gW:function(a){return this.gaE(this)===0},
fD:function(a){var z,y,x
z=this.b
if(z>0){y=this.a;--z
this.b=z
x=y[z]
y[this.gaE(this)]=null
return x}return},
C:function(a,b){var z,y,x
for(z=0;z<this.gaE(this);++z){y=this.a
if(b===y[z]){x=this.b-1
this.b=x
y[z]=y[x]
y[this.gaE(this)]=null
return!0}}return!1},
l:["h0",function(a,b){var z,y
z=this.b
y=this.a.length
if(z===y)this.d_(C.c.R(y*3,2)+1)
z=this.a
y=this.b
this.b=y+1
z[y]=b}],
j:function(a,b,c){if(b>=this.a.length)this.d_(b*2)
if(this.b<=b)this.b=b+1
this.a[b]=c},
d_:function(a){var z,y
z=this.a
y=new Array(a)
y.fixed$length=Array
y=H.d(y,[H.a9(this,"ak",0)])
C.b.aR(y,0,z.length,z)
this.a=y},
cW:function(a){if(a>=this.a.length)this.d_(a*2)},
gI:function(a){var z=C.b.ag(this.a,0,this.gaE(this))
return new J.d0(z,z.length,0)},
gi:function(a){return this.gaE(this)},
$isl:1},
D:{"^":"ak;c,d,a,b",
l:function(a,b){var z,y
if(this.d)this.c1()
z=b.a
y=this.c
if(z>=y.c)y.cG(C.c.R(z*3,2)+1)
if(!y.h(0,z)){y.j(0,z,!0)
this.h0(0,b)}},
C:function(a,b){var z=this.c.h(0,b.a)
this.iC(b)
return z},
iC:function(a){this.c.j(0,a.a,!1)
this.d=!0},
gaE:function(a){if(this.d)this.c1()
return this.b},
gI:function(a){var z
if(this.d)this.c1()
z=this.a
if(this.d)this.c1()
z=C.b.ag(z,0,this.b)
return new J.d0(z,z.length,0)},
c1:function(){var z,y,x,w
z={}
y=this.c.eY(!0)
this.b=y
y=new Array(y)
y.fixed$length=Array
x=H.d(y,[S.af])
if(this.b>0){z.a=0
y=this.a
w=H.q(y,0)
new H.bf(new H.nM(y,new S.l8(z,this),[w]),new S.l9(this),[w]).w(0,new S.la(z,x))}this.a=x
this.d=!1},
$ascz:function(){return[S.af]},
$asl:function(){return[S.af]},
$asak:function(){return[S.af]}},
l8:{"^":"c;a,b",
$1:function(a){return this.a.a<this.b.b}},
l9:{"^":"c;a",
$1:function(a){return this.a.c.h(0,a.a)}},
la:{"^":"c;a,b",
$1:function(a){this.b[this.a.a++]=a
return a}},
oK:{"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
kX:[function(a){return a.A(0)},"$1","gjL",4,0,52],
kY:[function(a){return a.A(0)},"$1","gjM",4,0,53],
an:function(a){this.z.j(0,J.dQ(a),a)
this.Q.l(0,a)
a.a=this},
jm:function(a){var z=this.a.bd()
C.b.w(a,z.gbf())
this.c.l(0,z)
return z},
j9:function(a,b,c){a.b=this
a.x=!1
a.y=b
this.x.j(0,J.dQ(a),a)
this.y.push(a)
this.cx.dM(0,b,new S.oT())
this.ch.dM(0,b,new S.oU())},
j8:function(a,b){return this.j9(a,b,!1)},
bC:function(a,b){a.w(0,new S.oN(this,b))
a.c.cG(0)
a.d=!0},
dK:function(a){var z=this.ch
z.j(0,a,J.aj(z.h(0,a),1))
z=this.cx
z.j(0,a,J.aj(z.h(0,a),this.cy))
this.es()
z=this.y
new H.bf(z,new S.oV(a),[H.q(z,0)]).w(0,new S.oW(this))},
fA:function(){return this.dK(0)},
es:function(){var z,y
this.bC(this.c,new S.oO())
this.bC(this.d,new S.oP())
this.bC(this.r,new S.oQ())
this.bC(this.f,new S.oR())
this.bC(this.e,new S.oS())
z=this.b
y=z.c
y.w(0,z.giA())
y.c.cG(0)
y.d=!0},
h:function(a,b){return this.db.h(0,b)},
j:function(a,b,c){this.db.j(0,b,c)}},
oT:{"^":"c:54;",
$0:function(){return 0}},
oU:{"^":"c:75;",
$0:function(){return 0}},
oN:{"^":"c;a,b",
$1:function(a){var z,y
z=this.a
y=this.b
z.Q.w(0,new S.oL(y,a))
C.b.w(z.y,new S.oM(y,a))}},
oL:{"^":"c;a,b",
$1:function(a){return this.a.$2(a,this.b)}},
oM:{"^":"c;a,b",
$1:function(a){return this.a.$2(a,this.b)}},
oV:{"^":"c;a",
$1:function(a){return!a.x&&a.y===this.a}},
oW:{"^":"c;a",
$1:function(a){if(a.aH()){a.eR()
a.dL(a.c)
a.f1(0)}this.a.es()}},
oO:{"^":"c:5;",
$2:function(a,b){return a.bH(b)}},
oP:{"^":"c:5;",
$2:function(a,b){return a.dl(b)}},
oQ:{"^":"c:5;",
$2:function(a,b){return a.ds(0,b)}},
oR:{"^":"c:5;",
$2:function(a,b){return a.dt(0,b)}},
oS:{"^":"c:5;",
$2:function(a,b){return a.aZ(b)}},
pH:{"^":"a+cz;"}}],["","",,L,{"^":"",
tn:function(a,b,c){return P.e4(H.d([W.fS("packages/"+a+"/assets/shader/"+b+".vert",null,null),W.fS("packages/"+a+"/assets/shader/"+c+".frag",null,null)],[[P.V,,]]),null,!1,null).a2(new L.to(),L.hw)},
lM:{"^":"a;a,b"},
pf:{"^":"eD;",
A:function(a){this.cI(0)
this.r1=S.k(this.b,F.X)
this.r2=S.k(this.b,F.dk)
this.rx=S.k(this.b,F.b6)
this.ry=this.b.z.h(0,new H.t(F.be))
this.x1=this.b.z.h(0,new H.t(S.bz))}},
to:{"^":"c;",
$1:[function(a){var z=J.J(a)
return new L.hw(z.h(a,0),z.h(a,1))},null,null,4,0,null,45,"call"]},
hw:{"^":"a;a,b"},
hm:{"^":"a;"},
lo:{"^":"bG;",
b3:function(){var z,y
z=this.fx
z[C.c.a6(this.b.ch.h(0,this.y),20)]=this.b.cy
z=C.b.ke(z,new L.lq())
y=this.go
y.save()
y.font="10px Verdana"
y.textBaseline="top"
y.fillStyle=this.fy
C.h.ac(y,"FPS: "+C.f.cv(20/z,2),5,5)
y.restore()}},
lp:{"^":"c;",
$1:function(a){return 0}},
lq:{"^":"c:56;",
$2:function(a,b){return a+b}},
kc:{"^":"bG;fx,fy,a,0b,c,d,e,f,0r,0x,0y",
b3:function(){var z,y
z=this.fx
z.toString
y=z.getContext("2d")
y.fillStyle=this.fy
y.clearRect(0,0,z.width,z.height)}},
oy:{"^":"bG;fx,a,0b,c,d,e,f,0r,0x,0y",
A:function(a){this.fx.clearColor(0,0,0,1)},
b3:function(){this.fx.clear(16640)}},
eC:{"^":"a;",
fe:function(){var z,y,x,w,v
z=this.eb(35633,this.c$.a)
y=this.eb(35632,this.c$.b)
x=this.a$.createProgram()
this.b$=x
w=this.a$
w.attachShader(x,z)
w.attachShader(this.b$,y)
w.linkProgram(this.b$)
if(!this.a$.getProgramParameter(this.b$,35714)){v=new H.t(H.fa(this)).k(0)+" - Error linking program: "+H.e(this.a$.getProgramInfoLog(this.b$))
x=$.j4
if(x==null)H.fe(v)
else x.$1(v)
this.r$=!1}},
eb:function(a,b){var z,y
z=this.a$.createShader(a)
y=this.a$
y.shaderSource(z,b)
y.compileShader(z)
if(!this.a$.getShaderParameter(z,35713)){this.r$=!1
throw H.b(P.ar(this.ga4(this).k(0)+" - Error compiling shader "+this.gb7()+" or "+this.gbL()+": "+H.e(this.a$.getShaderInfoLog(z))))}return z},
jf:function(a,b,c,d,e){var z,y,x
z=this.f$
y=z.h(0,b)
if(null==y){y=this.a$.createBuffer()
z.j(0,b,y)}x=this.a$.getAttribLocation(this.b$,b)
if(x===-1)throw H.b(P.ar("Attribute "+b+" not found in shader "+this.gb7()+"}"))
z=this.a$
z.bindBuffer(34962,y)
z.bufferData(34962,c,e)
z.vertexAttribPointer(x,d,5126,!1,0,0)
z.enableVertexAttribArray(x)},
dk:function(a,b,c,d){return this.jf(a,b,c,d,35048)},
eT:function(a,b,c){var z,y,x,w,v,u,t,s,r
if(null==this.d$){this.d$=this.a$.createBuffer()
this.e$=this.a$.createBuffer()}z=this.a$
z.bindBuffer(34962,this.d$)
z.bufferData(34962,b,35048)
for(z=a.length,y=0,x=0;x<z;++x)y+=a[x].b
for(w=4*y,v=0,x=0;x<z;++x){u=a[x]
t=u.a
s=this.a$.getAttribLocation(this.b$,t)
if(s===-1)throw H.b(P.ar("Attribute "+t+" not found in shader "+this.gb7()+"}"))
t=this.a$
r=u.b
t.vertexAttribPointer(s,r,5126,!1,w,4*v)
t.enableVertexAttribArray(s)
v+=r}z=this.a$
z.bindBuffer(34963,this.e$)
z.bufferData(34963,c,35048)},
gfj:function(){return}},
bV:{"^":"a;a,b"},
eD:{"^":"rT;",
A:["cI",function(a){this.fe()}],
dL:function(a){var z,y
z={}
y=a.gaE(a)
if(y>0){this.a$.useProgram(this.b$)
if(y>this.z){this.cw(y)
this.z=y}z.a=0
a.w(0,new L.oz(z,this))
this.dO(y)}},
aH:function(){return this.r$}},
oz:{"^":"c;a,b",
$1:function(a){this.b.cp(this.a.a++,a)}},
ow:{"^":"rS;",
A:["ha",function(a){this.fe()}],
b3:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
this.a$.useProgram(this.b$)
z=this.ay.r
y=this.ax
x=this.aJ.b.h(0,"camera")
y=y.b
x=x.a
w=y.a[x]
x=this.ay
v=C.e.ao(x.b*x.d)*z
x=this.ay
u=C.e.ao(x.c*x.d)*z
x=w.a
y=this.f5
t=x*y
s=w.b*y
y=this.b0
x=-v/2+t+y
r=this.jy
q=-u/2+s+r
p=u/2+s+r
o=v/2+t+y
n=new Float32Array(H.dz(H.d([x,q,x,p,o,p,o,q],[P.S])))
m=this.aI.eZ(t,s)
m.kt(0,-y,-r)
r=this.a$
r.uniformMatrix4fv(r.getUniformLocation(this.b$,"uViewProjection"),!1,m.a)
y=this.a$.getUniformLocation(this.b$,"uDimension")
q=this.ay
q=C.e.ao(q.b*q.d)
o=this.ay
r.uniform4f(y,q,C.e.ao(o.c*o.d),0,0)
r.uniform3fv(this.a$.getUniformLocation(this.b$,"uRgb"),this.jz)
r.uniform1f(this.a$.getUniformLocation(this.b$,"uTime"),this.b.cx.h(0,this.y))
this.dk(0,"aPosition",n,2)
this.a$.drawArrays(6,0,4)}},
mM:{"^":"pf;0az,0aa,0r1,0r2,0rx,0ry,0x1,z,a$,b$,c$,d$,e$,f$,r$,a,0b,c,d,e,f,0r,0x,0y",
cp:function(a,b){var z,y,x,w,v,u
z=this.r1.b
y=b.a
x=z.a[y]
w=this.rx.b.a[y]
v=a*2
u=a*4
y=this.az
y[v]=x.a
y[v+1]=x.b
y=this.aa
y[u]=w.a
y[u+1]=w.b
y[u+2]=w.c
y[u+3]=w.d},
dO:function(a){var z=this.a$
z.uniformMatrix4fv(z.getUniformLocation(this.b$,"uViewProjection"),!1,this.ry.bk().a)
this.dk(0,"aPosition",this.az,2)
this.dk(0,"aColor",this.aa,4)
this.a$.drawArrays(0,0,a)},
cw:function(a){this.az=new Float32Array(a*2)
this.aa=new Float32Array(a*4)},
gb7:function(){return"ParticleRenderingSystem"},
gbL:function(){return"ParticleRenderingSystem"},
gfj:function(){return"gamedev_helpers"}},
da:{"^":"a;",
hl:function(a,b,c,d,e,f,a0,a1,a2,a3){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=this.c
if(z!=null){z.textBaseline="top"
z.font="12px Verdana"}else{z=this.d
if(z!=null){z.enable(3042)
z.blendFunc(770,771)}else this.go=!0}z=this.b
z.toString
W.ai(z,"webkitfullscreenchange",this.gi3(),!1)
y=S.af
x=new Array(16)
x.fixed$length=Array
w=[y]
x=H.d(x,w)
y=[y]
v=new Array(16)
v.fixed$length=Array
v=H.d(v,w)
u=P.aG
t=new Array(16)
t.fixed$length=Array
t=H.d(t,[u])
s=P.i
r=new Array(16)
r.fixed$length=Array
r=new S.lc(new S.ak(x,0,y),new S.ak(v,0,y),new S.ak(t,0,[u]),0,0,0,0,new S.qs(new S.ak(H.d(r,[s]),0,[s]),0))
u=[S.ak,S.y]
t=new Array(16)
t.fixed$length=Array
t=H.d(t,[u])
y=D.C(16,!1)
v=new Array(16)
v.fixed$length=Array
v=new S.kt(new S.ak(t,0,[u]),new S.D(y,!1,H.d(v,w),0))
y=D.C(16,!1)
u=new Array(16)
u.fixed$length=Array
u=H.d(u,w)
t=D.C(16,!1)
x=new Array(16)
x.fixed$length=Array
x=H.d(x,w)
q=D.C(16,!1)
p=new Array(16)
p.fixed$length=Array
p=H.d(p,w)
o=D.C(16,!1)
n=new Array(16)
n.fixed$length=Array
n=H.d(n,w)
m=D.C(16,!1)
l=new Array(16)
l.fixed$length=Array
w=H.d(l,w)
l=P.cO
k=S.aN
j=H.d([],[k])
i=S.at
h=new Array(16)
h.fixed$length=Array
s=new S.oK(r,v,new S.D(y,!1,u,0),new S.D(t,!1,x,0),new S.D(q,!1,p,0),new S.D(o,!1,n,0),new S.D(m,!1,w,0),P.E(l,k),j,P.E(l,i),new S.ak(H.d(h,[i]),0,[i]),P.bo([0,0],s,s),P.bo([0,0],s,P.S),0,P.E(P.f,P.a))
s.an(r)
s.an(v)
z=new F.ax(z.width,z.height,!1,1000,1)
z.cL()
s.an(z)
this.Q=s
g=document.querySelector("button#fullscreen")
if(null!=g){z=J.ju(g)
W.ai(z.a,z.b,new L.lH(),!1)}},
ib:function(){return this.hu().a2(new L.lC(this),null).a2(new L.lD(this),null).a2(new L.lE(this),null)},
hu:function(){var z=H.d([],[[P.V,,]])
return P.e4(z,null,!1,null).a2(new L.lz(this),null)},
ie:function(){var z,y,x,w,v,u,t
this.Q.z.h(0,new H.t(F.ax)).sfR(0.6)
z=P.f
y=S.af
x=P.E(z,y)
z=P.E(y,z)
w=this.Q
w.an(new S.bz(x,z))
w.an(this.k4)
w.an(this.r1)
w.an(new F.be(1000))
v=P.i
w.an(new K.d7(P.E(v,[P.m,S.af])))
u=[A.dx,S.af]
w.an(new A.c9(new A.aP(C.bh,16,null,H.d([],[[A.aP,S.af]]),H.d([],[u]),[y]),P.E(y,u)))
w.an(new X.fT(P.E(v,y),new N.km()))
y=$.$get$bQ()
y=H.d([new F.X(4369*y.Y(),4369*y.Y())],[S.y])
t=this.Q.jm(y)
x.j(0,"camera",t)
z.j(0,t,"camera")
return this.jK().a2(new L.lB(this),null)},
fW:function(a){return this.ib().a2(new L.lK(this),L.da)},
iT:function(){var z=window.performance.now()
z.toString
this.dy=z
if(null!=C.b.jC(this.Q.y,new L.lF(),new L.lG()))this.kb()
C.H.fE(window,this.ghX())},
kb:[function(){var z,y
z=window.performance.now()
z.toString
y=this.Q
y.cy=(z-this.dy)/1000
this.dy=z
y.dK(1)
y=this.fy
if(!y)P.lr(C.aP,this.gka(),-1)},"$0","gka",0,0,2],
kB:[function(a){var z
this.d9()
this.dx=a/1000
z=this.Q
z.cy=0.016666666666666666
z.fA()
C.H.geP(window).a2(new L.lA(this),-1)},"$1","ghX",4,0,57,10],
fK:function(a,b){var z,y
this.d9()
z=this.dx
y=this.Q
y.cy=b-z
this.dx=b
y.fA()
z=this.fy
if(!z)C.H.geP(window).a2(new L.lL(this),-1)},
kC:[function(a){this.fr=!this.fr
this.d9()},"$1","gi3",4,0,58],
d9:function(){var z,y,x,w,v
if(null!=this.b){z=document.body
y=z.clientWidth
z=z.clientHeight
x=F.ax
w=this.Q.z.h(0,new H.t(x))
w.sj3(y)
w.cL()
w.sj2(z)
w.cL()
v=this.Q.z.h(0,new H.t(x))
x=this.k2.style
w=H.e(v.b)+"px"
x.width=w
z=H.e(v.c)+"px"
x.height=z
this.fF(this.id,!0)
this.e8()
this.h2()}},
kW:["h2",function(){this.kl(this.b)
if(this.fy||!1){var z=this.Q
z.cy=0
z.dK(0)}z=this.d
z.viewport(0,0,z.drawingBufferWidth,z.drawingBufferHeight)}],
jK:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5
z=H.d([],[[P.V,,]])
y=this.k3
x=H.d([],[B.cD])
w=D.C(16,!1)
v=new Array(16)
v.fixed$length=Array
u=[S.af]
v=new F.oF(x,y,0,new S.D(w,!1,H.d(v,u),0),0,0,0)
v.M(new S.H(0,0,0))
w=this.id
x=new S.H(0,0,0)
t=[P.cO]
x.a=x.N(0,H.d([C.O],t))
s=D.C(16,!1)
r=new Array(16)
r.fixed$length=Array
r=new F.kz(y,w,0,new S.D(s,!1,H.d(r,u),0),x.a,x.b,x.c)
r.M(x)
x=new S.H(0,0,0)
x.a=x.N(0,H.d([C.au,C.i,C.bp],t))
s=H.d([C.aq],t)
x.b=x.N(x.b,s)
s=D.C(16,!1)
w=new Array(16)
w.fixed$length=Array
w=new Q.ll(0,new S.D(s,!1,H.d(w,u),0),x.a,x.b,x.c)
w.M(x)
x=new S.H(0,0,0)
x.a=x.N(0,H.d([C.k,C.aD,C.bm],t))
s=D.C(16,!1)
q=new Array(16)
q.fixed$length=Array
q=new B.kx(0,new S.D(s,!1,H.d(q,u),0),x.a,x.b,x.c)
q.M(x)
x=new S.H(0,0,0)
x.a=x.N(0,H.d([C.i,C.y],t))
s=D.C(16,!1)
p=new Array(16)
p.fixed$length=Array
p=new L.mQ(0,new S.D(s,!1,H.d(p,u),0),x.a,x.b,x.c)
p.M(x)
x=new S.H(0,0,0)
x.a=x.N(0,H.d([C.k],t))
s=H.d([C.bn],t)
x.b=x.N(x.b,s)
s=H.d([C.aq,C.i],t)
x.a=x.N(x.a,s)
s=D.C(16,!1)
o=new Array(16)
o.fixed$length=Array
o=new Q.kU(0,new S.D(s,!1,H.d(o,u),0),x.a,x.b,x.c)
o.M(x)
x=new S.H(0,0,0)
x.a=x.N(0,H.d([C.O,C.k],t))
s=D.C(16,!1)
n=new Array(16)
n.fixed$length=Array
n=new Q.ka(0,new S.D(s,!1,H.d(n,u),0),x.a,x.b,x.c)
n.M(x)
x=new S.H(0,0,0)
x.a=x.N(0,H.d([C.O,C.i],t))
s=D.C(16,!1)
m=new Array(16)
m.fixed$length=Array
m=new Q.kb(0,new S.D(s,!1,H.d(m,u),0),x.a,x.b,x.c)
m.M(x)
x=new S.H(0,0,0)
x.a=x.N(0,H.d([C.D,C.k,C.i],t))
s=D.C(16,!1)
l=new Array(16)
l.fixed$length=Array
l=new G.n7(0,new S.D(s,!1,H.d(l,u),0),x.a,x.b,x.c)
l.M(x)
x=D.C(16,!1)
s=new Array(16)
s.fixed$length=Array
s=new Q.mK(0,new S.D(x,!1,H.d(s,u),0),0,0,0)
s.M(new S.H(0,0,0))
x=new S.H(0,0,0)
x.a=x.N(0,H.d([C.G],t))
k=D.C(16,!1)
j=new Array(16)
j.fixed$length=Array
j=new Q.oJ(0,new S.D(k,!1,H.d(j,u),0),x.a,x.b,x.c)
j.M(x)
x=new S.H(0,0,0)
x.a=x.N(0,H.d([C.N],t))
k=D.C(16,!1)
i=new Array(16)
i.fixed$length=Array
i=new Q.kg(0,new S.D(k,!1,H.d(i,u),0),x.a,x.b,x.c)
i.M(x)
x=new S.H(0,0,0)
x.a=x.N(0,H.d([C.G,C.N,C.P,C.q],t))
k=H.d([C.y,C.k,C.i],t)
x.a=x.N(x.a,k)
k=D.C(16,!1)
h=new Array(16)
h.fixed$length=Array
h=new Q.lb(10.185916357881302,0,new S.D(k,!1,H.d(h,u),0),x.a,x.b,x.c)
h.M(x)
x=new S.H(0,0,0)
x.a=x.N(0,H.d([C.k,C.D,C.P,C.by,C.aD,C.i,C.E,C.G,C.q],t))
k=D.C(16,!1)
g=new Array(16)
g.fixed$length=Array
g=new Q.nW(0,new S.D(k,!1,H.d(g,u),0),x.a,x.b,x.c)
g.M(x)
x=new S.H(0,0,0)
x.a=x.N(0,H.d([C.bx,C.E,C.av],t))
k=D.C(16,!1)
f=new Array(16)
f.fixed$length=Array
f=new Q.nV(0,new S.D(k,!1,H.d(f,u),0),x.a,x.b,x.c)
f.M(x)
x=this.d
k=D.C(16,!1)
e=new Array(16)
e.fixed$length=Array
e=new L.oy(x,0,new S.D(k,!1,H.d(e,u),0),0,0,0)
e.M(new S.H(0,0,0))
k=new S.H(0,0,0)
k.a=k.N(0,H.d([C.au,C.k,C.i,C.q],t))
d=P.f
c=P.fs
b=D.C(16,!1)
a=new Array(16)
a.fixed$length=Array
a=new M.lm(C.b_,0,null,null,null,null,null,P.E(d,c),!0,0,new S.D(b,!1,H.d(a,u),0),k.a,k.b,k.c)
a.M(k)
a.a$=x
k=new S.H(0,0,0)
k.a=k.N(0,H.d([C.y,C.N],t))
b=H.d([C.k,C.i,C.E,C.P,C.G,C.q],t)
k.a=k.N(k.a,b)
b=D.C(16,!1)
a0=new Array(16)
a0.fixed$length=Array
a0=new M.mP(3,C.b2,6,0,null,null,null,null,null,P.E(d,c),!0,0,new S.D(b,!1,H.d(a0,u),0),k.a,k.b,k.c)
a0.M(k)
a0.a$=x
a0.jx=64
k=$.$get$bQ()
b=k.Y()
a1=k.Y()
a2=P.S
a3=new Float32Array(H.dz(H.d([0,0,0],[a2])))
a4=D.C(16,!1)
a5=new Array(16)
a5.fixed$length=Array
a5=new M.jR(-5e5+b*1e6,-5e5+a1*1e6,a3,1,null,null,null,null,null,P.E(d,c),!0,0,new S.D(a4,!1,H.d(a5,u),0),0,0,0)
a5.M(new S.H(0,0,0))
a5.a$=x
a3[0]=k.Y()
a3[1]=k.Y()
a3[2]=k.Y()
a5.f5=0.4
k=new S.H(0,0,0)
k.a=k.N(0,H.d([C.k,C.br,C.E],t))
a3=D.C(16,!1)
a4=new Array(16)
a4.fixed$length=Array
a4=new L.mM(0,null,null,null,null,null,P.E(d,c),!0,0,new S.D(a3,!1,H.d(a4,u),0),k.a,k.b,k.c)
a4.M(k)
a4.a$=x
x=this.id
k=D.C(16,!1)
a3=new Array(16)
a3.fixed$length=Array
a3=new L.kc(x,"white",0,new S.D(k,!1,H.d(a3,u),0),0,0,0)
a3.M(new S.H(0,0,0))
k=this.k1
x=new S.H(0,0,0)
x.a=x.N(0,H.d([C.y,C.i,C.k,C.q],t))
c=D.C(16,!1)
d=new Array(16)
d.fixed$length=Array
d=new M.mO(k,0,new S.D(c,!1,H.d(d,u),0),x.a,x.b,x.c)
d.M(x)
x=this.k1
c=H.d([],[M.ca])
k=new S.H(0,0,0)
k.a=k.N(0,H.d([C.y,C.i],t))
a1=D.C(16,!1)
b=new Array(16)
b.fixed$length=Array
b=new M.nh(x,c,0,new S.D(a1,!1,H.d(b,u),0),k.a,k.b,k.c)
b.M(k)
k=this.k1
a2=P.h8(20,new L.lp(),!1,a2)
a1=D.C(16,!1)
c=new Array(16)
c.fixed$length=Array
c=new E.kI(a2,"grey",k,0,new S.D(a1,!1,H.d(c,u),0),0,0,0)
c.M(new S.H(0,0,0))
a1=this.k1
k=D.C(16,!1)
a2=new Array(16)
a2.fixed$length=Array
a2=new E.kM(a1,y,0,0,0,0,new S.D(k,!1,H.d(a2,u),0),0,0,0)
a2.M(new S.H(0,0,0))
a2.hJ()
k=new S.H(0,0,0)
k.a=k.N(0,H.d([C.av],t))
y=D.C(16,!1)
a1=new Array(16)
a1.fixed$length=Array
a1=new Q.lh(0,new S.D(y,!1,H.d(a1,u),0),k.a,k.b,k.c)
a1.M(k)
k=new S.H(0,0,0)
k.c=k.N(0,H.d([C.D,C.q],t))
t=D.C(16,!1)
y=new Array(16)
y.fixed$length=Array
u=new Q.nl(0,new S.D(t,!1,H.d(y,u),0),k.a,k.b,k.c)
u.M(k)
k=[S.aN]
P.bo([0,H.d([v,r,w,q,p,o,n,m,l,s,j,i,h,g,f,e,a,a0,a5,a4,a3,d,b,c,a2,a1,u],k),1,H.d([],k)],P.i,[P.m,S.aN]).w(0,new L.lJ(this,z))
return P.e4(z,null,!1,null)},
fF:function(a,b){var z,y,x
z=this.Q.z.h(0,new H.t(F.ax))
a.width=b?z.b:C.e.ao(z.b*z.d)
a.height=b?z.c:C.e.ao(z.c*z.d)
y=a.style
x=H.e(z.b)+"px"
y.width=x
x=H.e(z.c)+"px"
y.height=x},
kl:function(a){return this.fF(a,!1)}},
lH:{"^":"c;",
$1:function(a){return document.querySelector("canvas").webkitRequestFullscreen()}},
lC:{"^":"c:14;a",
$1:[function(a){return},null,null,4,0,null,0,"call"]},
lD:{"^":"c:14;a",
$1:[function(a){return this.a.ie()},null,null,4,0,null,0,"call"]},
lE:{"^":"c:14;a",
$1:[function(a){return},null,null,4,0,null,0,"call"]},
lz:{"^":"c;a",
$1:[function(a){var z,y
z=this.a
y=z.ch
if(null!=y)J.cq(y,new L.ly(z))},null,null,4,0,null,0,"call"]},
ly:{"^":"c:60;a",
$2:function(a,b){var z=this.a
J.cq(b,new L.lx(z.cx.b.h(0,H.e(a)+".png").c.at(0,z.cx.b.h(0,H.e(a)+".png").d)))}},
lx:{"^":"c;a",
$1:function(a){var z=a.a
z.toString
a.a=new H.bp(z,new L.lw(this.a),[H.q(z,0),T.bD]).fH(0)}},
lw:{"^":"c;a",
$1:[function(a){return a.L(0,this.a)},null,null,4,0,null,46,"call"]},
lB:{"^":"c:7;a",
$1:[function(a){var z=this.a.Q
z.Q.w(0,z.gjL())
C.b.w(z.y,z.gjM())},null,null,4,0,null,0,"call"]},
lK:{"^":"c:61;a",
$1:[function(a){var z=this.a
z.iT()
return z},null,null,4,0,null,0,"call"]},
lF:{"^":"c;",
$1:function(a){return a.y===1}},
lG:{"^":"c:0;",
$0:function(){return}},
lA:{"^":"c;a",
$1:[function(a){return this.a.fK(0,a/1000)},null,null,4,0,null,10,"call"]},
lL:{"^":"c;a",
$1:[function(a){return this.a.fK(0,a/1000)},null,null,4,0,null,10,"call"]},
lJ:{"^":"c:62;a,b",
$2:function(a,b){var z,y,x,w,v,u,t,s
for(z=J.aa(b),y=this.a,x=this.b,w=y.e.a;z.m();){v=z.gu(z)
y.Q.j8(v,a)
if(!!J.v(v).$iseC){u=v.gfj()
t=v.gb7()
s=v.gbL()
x.push(L.tn(u==null?w:u,t,s).a2(new L.lI(v),null))}}}},
lI:{"^":"c;a",
$1:[function(a){this.a.c$=a},null,null,4,0,null,47,"call"]},
rS:{"^":"bG+eC;"},
rT:{"^":"aN+eC;"}}],["","",,F,{"^":"",
fb:function(a,b,c){var z,y,x,w,v
if(b===0){z=c
y=z
x=y}else{w=c<0.5?c*(1+b):c+b-c*b
v=2*c-w
x=F.eZ(v,w,a+0.3333333333333333)
y=F.eZ(v,w,a)
z=F.eZ(v,w,a-0.3333333333333333)}return H.d([x,y,z],[P.S])},
eZ:function(a,b,c){var z
if(c<0)z=c+1
else z=c>1?c-1:c
if(z<0.16666666666666666)return a+(b-a)*6*z
if(z<0.5)return b
if(z<0.6666666666666666)return a+(b-a)*(0.6666666666666666-z)*6
return a},
dJ:function(a,b,c){var z,y,x,w,v,u,t
z=Math.max(Math.max(H.cn(a),H.cn(b)),H.cn(c))
y=Math.min(Math.min(H.cn(a),H.cn(b)),H.cn(c))
x=z+y
w=x/2
if(z===y){v=0
u=0}else{t=z-y
u=w>0.5?t/(2-z-y):t/x
if(z===a){x=b<c?6:0
v=(b-c)/t+x}else if(z===b)v=(c-a)/t+2
else v=z===c?(a-b)/t+4:null
v/=6}return H.d([v,u,w],[P.S])},
pp:{"^":"at;",
A:function(a){this.bU(0)
this.b=S.k(this.a,F.X)
this.c=S.k(this.a,F.bs)
this.d=this.a.z.h(0,new H.t(F.ax))
this.e=this.a.z.h(0,new H.t(S.bz))}},
X:{"^":"y;n:a*,p:b*"},
bs:{"^":"y;bg:a'"},
dk:{"^":"y;"},
b6:{"^":"y;a,b,c,d,e,f,0r,0x,0y",q:{
d4:function(a,b,c,d){var z,y,x,w,v
z=new F.b6(null,null,null,d,c,null)
y=F.fb(a,b,c)
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
ax:{"^":"at;j3:b?,j2:c?,0d,e,f,fR:r?,0a",
gt:function(a){return C.e.ao(this.b*this.d)},
gv:function(a){return C.e.ao(this.c*this.d)},
cL:function(){var z,y
z=this.b
y=this.c
if(z>y)this.d=this.f/z
else if(y>=z)this.d=this.f/y}},
be:{"^":"pp;r,0b,0c,0d,0e,0a",
bk:function(){var z,y,x,w
z=this.e.b.h(0,"camera")
y=this.b.b
x=z.a
w=y.a[x]
return this.eZ(w.a,w.b)},
eZ:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.e.b.h(0,"camera")
this.c.b
z.a
y=new Float32Array(16)
y[0]=1
y[1]=0
y[2]=0
y[3]=0
y[4]=0
y[5]=1
y[6]=0
y[7]=0
y[8]=0
y[9]=0
y[10]=1
y[11]=0
y[12]=0
y[13]=0
y[14]=0
y[15]=1
x=this.d
x=C.e.ao(x.b*x.d)
w=this.d
v=w.r
w=C.e.ao(w.c*w.d)
u=this.d
v=x*v/2
x=a-v
v=a+v
w=w*u.r/2
t=b-w
w=b+w
s=v-x
r=w-t
y[0]=0
y[1]=0
y[2]=0
y[3]=0
y[4]=0
y[5]=0
y[6]=0
y[7]=0
y[8]=0
y[9]=0
y[10]=0
y[11]=0
y[12]=0
y[13]=0
y[14]=0
y[15]=0
y[0]=2/s
y[5]=2/r
y[10]=1
y[12]=-(v+x)/s
y[13]=-(w+t)/r
y[14]=0
y[15]=1
u.e
return new T.c7(y)}}}],["","",,K,{}],["","",,U,{"^":"",fV:{"^":"a;"}}],["","",,S,{"^":"",os:{"^":"A;0r,0x,0y,0z,0Q,0ch,0cx,0cy,0db,0a,b,c,0d,0e,0f",
V:function(){var z,y,x
z=this.br(this.e)
y=document
x=C.l.au(y,"http://www.w3.org/2000/svg","svg")
this.r=x
z.appendChild(x)
this.r.setAttribute("height","20px")
this.r.setAttribute("version","1.1")
this.r.setAttribute("viewBox","0 0 128 32")
this.r.setAttribute("xmlns","http://www.w3.org/2000/svg")
this.K(this.r)
x=C.l.au(y,"http://www.w3.org/2000/svg","g")
this.x=x
this.r.appendChild(x)
this.K(this.x)
x=C.l.au(y,"http://www.w3.org/2000/svg","path")
this.y=x
this.x.appendChild(x)
this.y.setAttribute("class","isowosi1")
this.y.setAttribute("d","m 4.73407,8.75 h 3.59375 v 21.875 h -3.59375 z m 0,-8.51562 h 3.59375 v 4.55078 h -3.59375 z")
this.K(this.y)
x=C.l.au(y,"http://www.w3.org/2000/svg","path")
this.z=x
this.x.appendChild(x)
this.z.setAttribute("class","isowosi2")
this.z.setAttribute("d","m 12.39814,9.39453 v 3.39844 q 1.52344,-0.78125 3.16406,-1.17187 1.64063,-0.39063 3.39844,-0.39063 2.67578,0 4.02344,0.82031 1.32812,0.82032 1.32812,2.46094 0,1.25 -0.95703,1.97266 -0.95703,0.70312 -3.84766,1.34765 l -1.23047,0.27344 q -3.82812,0.82031 -5.42968,2.32422 -1.6211,1.48438 -1.6211,4.16016 0,3.04687 2.42188,4.82422 2.40234,1.77734 6.62109,1.77734 1.75781,0 3.67188,-0.35156 1.89453,-0.33203 4.0039,-1.01563 v -3.71094 q -1.99218,1.03516 -3.92578,1.5625 -1.93359,0.50782 -3.82812,0.50782 -2.53907,0 -3.90625,-0.85938 -1.36719,-0.8789 -1.36719,-2.46094 0,-1.46484 0.99609,-2.24609 0.97657,-0.78125 4.31641,-1.50391 l 1.25,-0.29296 q 3.33984,-0.70313 4.82422,-2.14844 1.48437,-1.46485 1.48437,-4.00391 0,-3.08594 -2.1875,-4.76562 -2.1875,-1.67969 -6.21093,-1.67969 -1.99219,0 -3.75,0.29297 -1.75782,0.29297 -3.24219,0.8789 z")
this.K(this.z)
x=C.l.au(y,"http://www.w3.org/2000/svg","path")
this.Q=x
this.x.appendChild(x)
this.Q.setAttribute("class","isowosi3")
this.Q.setAttribute("d","m 40.16376,11.26953 q -2.89063,0 -4.57032,2.26563 -1.67968,2.24609 -1.67968,6.17187 0,3.92579 1.66015,6.19141 1.67969,2.24609 4.58985,2.24609 2.87109,0 4.55078,-2.26562 1.67969,-2.26563 1.67969,-6.17188 0,-3.88671 -1.67969,-6.15234 -1.67969,-2.28516 -4.55078,-2.28516 z m 0,-3.04687 q 4.6875,0 7.36328,3.04687 2.67578,3.04688 2.67578,8.4375 0,5.3711 -2.67578,8.4375 -2.67578,3.04688 -7.36328,3.04688 -4.70703,0 -7.38282,-3.04688 -2.65625,-3.0664 -2.65625,-8.4375 0,-5.39062 2.65625,-8.4375 2.67579,-3.04687 7.38282,-3.04687 z")
this.K(this.Q)
x=C.l.au(y,"http://www.w3.org/2000/svg","path")
this.ch=x
this.x.appendChild(x)
this.ch.setAttribute("class","isowosi4")
this.ch.setAttribute("d","m 50.05048,8.75 h 3.59375 l 4.49218,17.07032 4.47266,-17.07032 h 4.23828 l 4.49219,17.07032 4.47265,-17.07032 h 3.59375 l -5.72265,21.875 h -4.23828 l -4.70703,-17.92968 -4.72657,17.92968 h -4.23828 z")
this.K(this.ch)
x=C.l.au(y,"http://www.w3.org/2000/svg","path")
this.cx=x
this.x.appendChild(x)
this.cx.setAttribute("class","isowosi5")
this.cx.setAttribute("d","m 89.35126,11.26953 q -2.89063,0 -4.57032,2.26563 -1.67968,2.24609 -1.67968,6.17187 0,3.92579 1.66015,6.19141 1.67969,2.24609 4.58985,2.24609 2.87109,0 4.55078,-2.26562 1.67969,-2.26563 1.67969,-6.17188 0,-3.88671 -1.67969,-6.15234 -1.67969,-2.28516 -4.55078,-2.28516 z m 0,-3.04687 q 4.6875,0 7.36328,3.04687 2.67578,3.04688 2.67578,8.4375 0,5.3711 -2.67578,8.4375 -2.67578,3.04688 -7.36328,3.04688 -4.70703,0 -7.38282,-3.04688 -2.65625,-3.0664 -2.65625,-8.4375 0,-5.39062 2.65625,-8.4375 2.67579,-3.04687 7.38282,-3.04687 z")
this.K(this.cx)
x=C.l.au(y,"http://www.w3.org/2000/svg","path")
this.cy=x
this.x.appendChild(x)
this.cy.setAttribute("class","isowosi6")
this.cy.setAttribute("d","m 117.27313,9.39453 v 3.39844 q -1.52344,-0.78125 -3.16406,-1.17187 -1.64063,-0.39063 -3.39844,-0.39063 -2.67578,0 -4.02344,0.82031 -1.32812,0.82032 -1.32812,2.46094 0,1.25 0.95703,1.97266 0.95703,0.70312 3.84766,1.34765 l 1.23047,0.27344 q 3.82812,0.82031 5.42968,2.32422 1.6211,1.48438 1.6211,4.16016 0,3.04687 -2.42188,4.82422 -2.40234,1.77734 -6.62109,1.77734 -1.75781,0 -3.67188,-0.35156 -1.89453,-0.33203 -4.0039,-1.01563 v -3.71094 q 1.99218,1.03516 3.92578,1.5625 1.93359,0.50782 3.82812,0.50782 2.53907,0 3.90625,-0.85938 1.36719,-0.8789 1.36719,-2.46094 0,-1.46484 -0.99609,-2.24609 -0.97657,-0.78125 -4.31641,-1.50391 l -1.25,-0.29296 q -3.33984,-0.70313 -4.82422,-2.14844 -1.48437,-1.46485 -1.48437,-4.00391 0,-3.08594 2.1875,-4.76562 2.1875,-1.67969 6.21093,-1.67969 1.99219,0 3.75,0.29297 1.75782,0.29297 3.24219,0.8789 z")
this.K(this.cy)
x=C.l.au(y,"http://www.w3.org/2000/svg","path")
this.db=x
this.x.appendChild(x)
this.db.setAttribute("class","isowosi7")
this.db.setAttribute("d","m 121.18719,8.75 h 3.59375 v 21.875 h -3.59375 z m 0,-8.51562 h 3.59375 v 4.55078 h -3.59375 z")
this.K(this.db)
this.bp(C.o,null)
return},
$asA:function(){return[U.fV]}}}],["","",,A,{"^":"",
dF:function(a){var z,y
z=C.bd.bn(a,0,new A.uh(),P.i)
y=536870911&z+((67108863&z)<<3)
y^=y>>>11
return 536870911&y+((16383&y)<<15)},
uh:{"^":"c:63;",
$2:function(a,b){var z=536870911&a+J.an(b)
z=536870911&z+((524287&z)<<10)
return z^z>>>6}}}],["","",,T,{"^":"",c7:{"^":"a;a",
P:function(a){var z,y
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
k:function(a){return"[0] "+this.bS(0).k(0)+"\n[1] "+this.bS(1).k(0)+"\n[2] "+this.bS(2).k(0)+"\n[3] "+this.bS(3).k(0)+"\n"},
h:function(a,b){return this.a[b]},
j:function(a,b,c){this.a[b]=c},
T:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.c7){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]&&z[4]===x[4]&&z[5]===x[5]&&z[6]===x[6]&&z[7]===x[7]&&z[8]===x[8]&&z[9]===x[9]&&z[10]===x[10]&&z[11]===x[11]&&z[12]===x[12]&&z[13]===x[13]&&z[14]===x[14]&&z[15]===x[15]}else z=!1
return z},
gH:function(a){return A.dF(this.a)},
bS:function(a){var z,y
z=new Float32Array(4)
y=this.a
z[0]=y[a]
z[1]=y[4+a]
z[2]=y[8+a]
z[3]=y[12+a]
return new T.am(z)},
aC:function(a){var z,y
z=new Float32Array(16)
y=new T.c7(z)
y.P(this)
z[0]=-z[0]
z[1]=-z[1]
z[2]=-z[2]
z[3]=-z[3]
z[4]=-z[4]
z[5]=-z[5]
z[6]=-z[6]
z[7]=-z[7]
z[8]=-z[8]
z[9]=-z[9]
z[10]=-z[10]
z[11]=-z[11]
z[12]=-z[12]
z[13]=-z[13]
z[14]=-z[14]
z[15]=-z[15]
return y},
al:function(a,b){var z,y
if(typeof b==="number"){z=new Float32Array(16)
y=new T.c7(z)
y.P(this)
z[0]=z[0]*b
z[1]=z[1]*b
z[2]=z[2]*b
z[3]=z[3]*b
z[4]=z[4]*b
z[5]=z[5]*b
z[6]=z[6]*b
z[7]=z[7]*b
z[8]=z[8]*b
z[9]=z[9]*b
z[10]=z[10]*b
z[11]=z[11]*b
z[12]=z[12]
z[13]=z[13]
z[14]=z[14]
z[15]=z[15]
return y}throw H.b(P.ar(b))},
L:function(a,b){var z=new T.c7(new Float32Array(16))
z.P(this)
z.l(0,b)
return z},
at:function(a,b){var z,y,x
z=new Float32Array(16)
y=new T.c7(z)
y.P(this)
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
ku:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.v(b)
y=!!z.$isam
x=y?b.gl6(b):1
if(!!z.$isbE){w=b.gn(b)
v=b.gp(b)
u=b.gky(b)}else if(y){w=b.gn(b)
v=b.gp(b)
u=b.gky(b)}else if(typeof b==="number"){u=d
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
kt:function(a,b,c){return this.ku(a,b,c,0)},
dn:function(a8){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7
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
if(a3===0){this.P(a8)
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
z=b.a
y=this.a
y[0]=y[0]+z[0]
y[1]=y[1]+z[1]
y[2]=y[2]+z[2]
y[3]=y[3]+z[3]
y[4]=y[4]+z[4]
y[5]=y[5]+z[5]
y[6]=y[6]+z[6]
y[7]=y[7]+z[7]
y[8]=y[8]+z[8]
y[9]=y[9]+z[9]
y[10]=y[10]+z[10]
y[11]=y[11]+z[11]
y[12]=y[12]+z[12]
y[13]=y[13]+z[13]
y[14]=y[14]+z[14]
y[15]=y[15]+z[15]},
ks:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
b=new T.am(new Float32Array(4))
b.P(a)
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
by:function(a){return this.ks(a,null)},
gbP:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=new T.bE(new Float32Array(3))
z.fU(y,x,w)
return z}},bD:{"^":"a;a",
P:function(a){var z,y
z=a.a
y=this.a
y[1]=z[1]
y[0]=z[0]},
k:function(a){var z=this.a
return"["+H.e(z[0])+","+H.e(z[1])+"]"},
T:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.bD){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]}else z=!1
return z},
gH:function(a){return A.dF(this.a)},
aC:function(a){var z,y
z=new Float32Array(2)
y=new T.bD(z)
y.P(this)
z[1]=-z[1]
z[0]=-z[0]
return y},
at:function(a,b){var z,y,x
z=new Float32Array(2)
y=new T.bD(z)
y.P(this)
x=b.a
z[0]=z[0]-x[0]
z[1]=z[1]-x[1]
return y},
L:function(a,b){var z=new T.bD(new Float32Array(2))
z.P(this)
z.l(0,b)
return z},
aB:function(a,b){var z=new T.bD(new Float32Array(2))
z.P(this)
z.bA(0,1/b)
return z},
al:function(a,b){var z=new T.bD(new Float32Array(2))
z.P(this)
z.bA(0,b)
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
bA:function(a,b){var z=this.a
z[1]=z[1]*b
z[0]=z[0]*b},
sn:function(a,b){this.a[0]=b
return b},
sp:function(a,b){this.a[1]=b
return b},
gn:function(a){return this.a[0]},
gp:function(a){return this.a[1]}},bE:{"^":"a;a",
fU:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c},
P:function(a){var z,y
z=a.a
y=this.a
y[0]=z[0]
y[1]=z[1]
y[2]=z[2]},
k:function(a){var z=this.a
return"["+H.e(z[0])+","+H.e(z[1])+","+H.e(z[2])+"]"},
T:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.bE){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]}else z=!1
return z},
gH:function(a){return A.dF(this.a)},
aC:function(a){var z,y
z=new Float32Array(3)
y=new T.bE(z)
y.P(this)
z[2]=-z[2]
z[1]=-z[1]
z[0]=-z[0]
return y},
at:function(a,b){var z,y,x
z=new Float32Array(3)
y=new T.bE(z)
y.P(this)
x=b.a
z[0]=z[0]-x[0]
z[1]=z[1]-x[1]
z[2]=z[2]-x[2]
return y},
L:function(a,b){var z=new T.bE(new Float32Array(3))
z.P(this)
z.l(0,b)
return z},
aB:function(a,b){return this.dV(1/b)},
al:function(a,b){return this.dV(b)},
h:function(a,b){return this.a[b]},
j:function(a,b,c){this.a[b]=c},
gi:function(a){return Math.sqrt(this.gjV())},
gjV:function(){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return y*y+x*x+z*z},
l:function(a,b){var z,y
z=b.a
y=this.a
y[0]=y[0]+z[0]
y[1]=y[1]+z[1]
y[2]=y[2]+z[2]},
dV:function(a){var z,y
z=new Float32Array(3)
y=new T.bE(z)
y.P(this)
z[2]=z[2]*a
z[1]=z[1]*a
z[0]=z[0]*a
return y},
sn:function(a,b){this.a[0]=b
return b},
sp:function(a,b){this.a[1]=b
return b},
gn:function(a){return this.a[0]},
gp:function(a){return this.a[1]}},am:{"^":"a;a",
b9:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a},
P:function(a){var z,y
z=a.a
y=this.a
y[3]=z[3]
y[2]=z[2]
y[1]=z[1]
y[0]=z[0]},
k:function(a){var z=this.a
return H.e(z[0])+","+H.e(z[1])+","+H.e(z[2])+","+H.e(z[3])},
T:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.am){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]}else z=!1
return z},
gH:function(a){return A.dF(this.a)},
aC:function(a){var z,y
z=new Float32Array(4)
y=new T.am(z)
y.P(this)
z[0]=-z[0]
z[1]=-z[1]
z[2]=-z[2]
z[3]=-z[3]
return y},
at:function(a,b){var z,y,x
z=new Float32Array(4)
y=new T.am(z)
y.P(this)
x=b.a
z[0]=z[0]-x[0]
z[1]=z[1]-x[1]
z[2]=z[2]-x[2]
z[3]=z[3]-x[3]
return y},
L:function(a,b){var z=new T.am(new Float32Array(4))
z.P(this)
z.l(0,b)
return z},
aB:function(a,b){var z=new T.am(new Float32Array(4))
z.P(this)
z.bA(0,1/b)
return z},
al:function(a,b){var z=new T.am(new Float32Array(4))
z.P(this)
z.bA(0,b)
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
z=b.a
y=this.a
y[0]=y[0]+z[0]
y[1]=y[1]+z[1]
y[2]=y[2]+z[2]
y[3]=y[3]+z[3]},
bA:function(a,b){var z=this.a
z[0]=z[0]*b
z[1]=z[1]*b
z[2]=z[2]*b
z[3]=z[3]*b},
sn:function(a,b){this.a[0]=b
return b},
sp:function(a,b){this.a[1]=b
return b},
gn:function(a){return this.a[0]},
gp:function(a){return this.a[1]}}}],["","",,F,{"^":"",
j2:function(){G.tz(K.ut()).as(0,C.ap).je(C.aN,Q.av)}},1],["","",,K,{"^":"",
uo:[function(a){return new K.qt(a)},function(){return K.uo(null)},"$1","$0","ut",0,2,17],
qt:{"^":"c2;0b,0c,0d,0e,a",
bs:function(a,b){var z,y
if(a===C.aw){z=this.b
if(z==null){z=this.b1(C.ay)
y=this.aK(C.bg,null)
z=new O.e5(z,y==null?"":y)
this.b=z}return z}if(a===C.ay){z=this.c
if(z==null){z=new M.k7()
$.u0=O.u1()
z.a=window.location
z.b=window.history
this.c=z}return z}if(a===C.ax){z=this.d
if(z==null){z=V.mi(this.b1(C.aw))
this.d=z}return z}if(a===C.bu){z=this.e
if(z==null){z=Z.np(this.b1(C.ax),this.aK(C.bs,null))
this.e=z}return z}if(a===C.x)return this
return b}}}]]
setupProgram(dart,0,0)
J.v=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.e9.prototype
return J.h0.prototype}if(typeof a=="string")return J.c5.prototype
if(a==null)return J.h1.prototype
if(typeof a=="boolean")return J.m3.prototype
if(a.constructor==Array)return J.c3.prototype
if(typeof a!="object"){if(typeof a=="function")return J.c6.prototype
return a}if(a instanceof P.a)return a
return J.cS(a)}
J.cR=function(a){if(typeof a=="number")return J.bm.prototype
if(typeof a=="string")return J.c5.prototype
if(a==null)return a
if(a.constructor==Array)return J.c3.prototype
if(typeof a!="object"){if(typeof a=="function")return J.c6.prototype
return a}if(a instanceof P.a)return a
return J.cS(a)}
J.J=function(a){if(typeof a=="string")return J.c5.prototype
if(a==null)return a
if(a.constructor==Array)return J.c3.prototype
if(typeof a!="object"){if(typeof a=="function")return J.c6.prototype
return a}if(a instanceof P.a)return a
return J.cS(a)}
J.aq=function(a){if(a==null)return a
if(a.constructor==Array)return J.c3.prototype
if(typeof a!="object"){if(typeof a=="function")return J.c6.prototype
return a}if(a instanceof P.a)return a
return J.cS(a)}
J.iY=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.e9.prototype
return J.bm.prototype}if(a==null)return a
if(!(a instanceof P.a))return J.cd.prototype
return a}
J.aI=function(a){if(typeof a=="number")return J.bm.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.cd.prototype
return a}
J.iZ=function(a){if(typeof a=="number")return J.bm.prototype
if(typeof a=="string")return J.c5.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.cd.prototype
return a}
J.a3=function(a){if(typeof a=="string")return J.c5.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.cd.prototype
return a}
J.a8=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.c6.prototype
return a}if(a instanceof P.a)return a
return J.cS(a)}
J.aj=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.cR(a).L(a,b)}
J.fg=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.aI(a).aB(a,b)}
J.a5=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.v(a).T(a,b)}
J.aJ=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.aI(a).cE(a,b)}
J.dL=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.aI(a).aQ(a,b)}
J.cV=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.iZ(a).al(a,b)}
J.dM=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.aI(a).at(a,b)}
J.cW=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.j1(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.J(a).h(a,b)}
J.bS=function(a,b,c){if(typeof b==="number")if((a.constructor==Array||H.j1(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.aq(a).j(a,b,c)}
J.fh=function(a,b){return J.a3(a).J(a,b)}
J.jl=function(a,b,c){return J.a8(a).iE(a,b,c)}
J.dN=function(a,b){return J.aq(a).l(a,b)}
J.jm=function(a,b,c,d){return J.a8(a).c6(a,b,c,d)}
J.fi=function(a,b){return J.a3(a).S(a,b)}
J.jn=function(a,b){return J.iZ(a).aX(a,b)}
J.dO=function(a,b,c){return J.J(a).jj(a,b,c)}
J.fj=function(a,b){return J.aq(a).E(a,b)}
J.jo=function(a,b){return J.a3(a).cb(a,b)}
J.jp=function(a,b,c){return J.aq(a).f2(a,b,c)}
J.jq=function(a,b,c,d){return J.aq(a).bM(a,b,c,d)}
J.cq=function(a,b){return J.aq(a).w(a,b)}
J.jr=function(a){return J.a8(a).geV(a)}
J.an=function(a){return J.v(a).gH(a)}
J.dP=function(a){return J.J(a).gW(a)}
J.cX=function(a){return J.J(a).gX(a)}
J.aa=function(a){return J.aq(a).gI(a)}
J.js=function(a){return J.a8(a).ga_(a)}
J.Z=function(a){return J.J(a).gi(a)}
J.jt=function(a){return J.a8(a).gk6(a)}
J.ju=function(a){return J.a8(a).gfs(a)}
J.dQ=function(a){return J.v(a).ga4(a)}
J.fk=function(a){return J.a8(a).gfJ(a)}
J.bT=function(a){return J.a8(a).gG(a)}
J.jv=function(a,b,c){return J.J(a).fd(a,b,c)}
J.jw=function(a,b,c){return J.aq(a).aL(a,b,c)}
J.jx=function(a,b,c){return J.a3(a).fl(a,b,c)}
J.jy=function(a,b){return J.v(a).dH(a,b)}
J.jz=function(a){return J.aq(a).kf(a)}
J.dR=function(a,b){return J.aq(a).C(a,b)}
J.jA=function(a,b){return J.a8(a).kj(a,b)}
J.jB=function(a,b){return J.aq(a).cH(a,b)}
J.cr=function(a,b){return J.a3(a).af(a,b)}
J.cs=function(a,b,c){return J.a3(a).bb(a,b,c)}
J.fl=function(a,b){return J.a3(a).a7(a,b)}
J.aK=function(a,b,c){return J.a3(a).B(a,b,c)}
J.fm=function(a){return J.aI(a).b6(a)}
J.b5=function(a){return J.v(a).k(a)}
J.fn=function(a){return J.a3(a).kv(a)}
J.jC=function(a,b){return J.aq(a).cA(a,b)}
I.a0=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.aE=W.jD.prototype
C.I=W.k8.prototype
C.V=W.dX.prototype
C.h=W.kd.prototype
C.aQ=W.li.prototype
C.l=W.lV.prototype
C.aR=W.e6.prototype
C.J=W.m0.prototype
C.aS=J.j.prototype
C.b=J.c3.prototype
C.f=J.h0.prototype
C.c=J.e9.prototype
C.v=J.h1.prototype
C.e=J.bm.prototype
C.a=J.c5.prototype
C.aZ=J.c6.prototype
C.bd=H.mv.prototype
C.be=H.mw.prototype
C.p=H.ej.prototype
C.aj=J.mN.prototype
C.ao=W.o_.prototype
C.Q=J.cd.prototype
C.H=W.oH.prototype
C.aJ=new P.jT(!1)
C.aI=new P.jS(C.aJ)
C.aK=new H.l6()
C.j=new P.a()
C.aL=new P.mL()
C.aM=new P.on()
C.T=new P.pW()
C.U=new P.qv()
C.d=new P.qR()
C.aN=new D.fv("my-app",V.tH(),[Q.av])
C.aO=new P.as(0)
C.aP=new P.as(5000)
C.t=new R.l5(null)
C.u=new M.fR(0,"GameState.menu")
C.W=new M.fR(1,"GameState.playing")
C.aT=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.aU=function(hooks) {
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
C.X=function(hooks) { return hooks; }

C.aV=function(getTagFallback) {
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
C.aW=function() {
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
C.aX=function(hooks) {
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
C.aY=function(hooks) {
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
C.Y=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.R=new L.bV("aPosition",2)
C.aH=new L.bV("aRadius",1)
C.aF=new L.bV("aColorMod",3)
C.b_=H.d(I.a0([C.R,C.aH,C.aF]),[L.bV])
C.b0=H.d(I.a0([127,2047,65535,1114111]),[P.i])
C.Z=H.d(I.a0([0,0,32776,33792,1,10240,0,0]),[P.i])
C.A=H.d(I.a0([0,0,65490,45055,65535,34815,65534,18431]),[P.i])
C.a_=H.d(I.a0([0,0,26624,1023,65534,2047,65534,2047]),[P.i])
C.a0=H.d(I.a0([0,0,26498,1023,65534,34815,65534,18431]),[P.i])
C.L=new B.cE(0,"MessageToServer.joinGame")
C.M=new B.cE(1,"MessageToServer.updateVelocity")
C.B=new B.cE(2,"MessageToServer.ping")
C.b1=H.d(I.a0([C.L,C.M,C.B]),[B.cE])
C.aG=new L.bV("aColor",4)
C.b2=H.d(I.a0([C.R,C.aG]),[L.bV])
C.bP=H.d(I.a0([]),[S.y])
C.b3=H.d(I.a0([]),[P.x])
C.o=I.a0([])
C.b6=H.d(I.a0([0,0,32722,12287,65534,34815,65534,18431]),[P.i])
C.b7=H.d(I.a0([0,0,24576,1023,65534,34815,65534,18431]),[P.i])
C.b8=H.d(I.a0([0,0,32754,11263,65534,34815,65534,18431]),[P.i])
C.b9=H.d(I.a0([0,0,32722,12287,65535,34815,65534,18431]),[P.i])
C.a1=H.d(I.a0([0,0,65490,12287,65535,34815,65534,18431]),[P.i])
C.a3=new B.al(0,"MessageToClient.initPlayerId")
C.a4=new B.al(1,"MessageToClient.initPlayers")
C.a8=new B.al(2,"MessageToClient.initFood")
C.a9=new B.al(3,"MessageToClient.initGrowingFood")
C.aa=new B.al(4,"MessageToClient.updatePosition")
C.ab=new B.al(5,"MessageToClient.updatePositionAndOrientation")
C.ac=new B.al(6,"MessageToClient.updatePositionAndSize")
C.ad=new B.al(7,"MessageToClient.updatePositionAndOrientationAndSize")
C.ae=new B.al(8,"MessageToClient.vomit")
C.af=new B.al(9,"MessageToClient.addConstantVelocity")
C.a5=new B.al(10,"MessageToClient.startDigestion")
C.a6=new B.al(11,"MessageToClient.removePlayers")
C.a7=new B.al(12,"MessageToClient.deleteEntities")
C.K=new B.al(13,"MessageToClient.pong")
C.ba=H.d(I.a0([C.a3,C.a4,C.a8,C.a9,C.aa,C.ab,C.ac,C.ad,C.ae,C.af,C.a5,C.a6,C.a7,C.K]),[B.al])
C.S=new U.kR()
C.bb=new U.mm(C.S,C.S)
C.b4=H.d(I.a0([]),[P.f])
C.bc=new H.d5(0,{},C.b4,[P.f,P.f])
C.b5=H.d(I.a0([]),[P.cb])
C.a2=new H.d5(0,{},C.b5,[P.cb,null])
C.ag=new Z.cF(0,"NavigationResult.SUCCESS")
C.C=new Z.cF(1,"NavigationResult.BLOCKED_BY_GUARD")
C.bf=new Z.cF(2,"NavigationResult.INVALID_ROUTE")
C.ah=new S.ek("APP_ID",[P.f])
C.ai=new S.ek("EventManagerPlugins",[null])
C.bg=new S.ek("appBaseHref",[P.f])
C.bh=new P.ah(0,0,4369,4369,[P.S])
C.bi=new K.ht(0,"RuntimeEnvironment.server")
C.ak=new K.ht(1,"RuntimeEnvironment.client")
C.al=new L.eo(0,"ServerConnectionState.connecting")
C.am=new L.eo(1,"ServerConnectionState.connected")
C.an=new L.eo(2,"ServerConnectionState.error")
C.bj=new H.es("call")
C.bk=H.u(Q.cY)
C.ap=H.u(Y.cZ)
C.N=H.u(G.ct)
C.D=H.u(G.aB)
C.E=H.u(F.b6)
C.bl=H.u(M.dY)
C.bm=H.u(G.bi)
C.O=H.u(G.cu)
C.aq=H.u(G.bk)
C.bn=H.u(G.fG)
C.ar=H.u(Z.kZ)
C.as=H.u(N.fJ)
C.at=H.u(U.lf)
C.au=H.u(G.aX)
C.w=H.u(L.fQ)
C.bo=H.u(M.db)
C.bp=H.u(G.cy)
C.x=H.u(M.aY)
C.av=H.u(G.cB)
C.aw=H.u(X.ha)
C.ax=H.u(V.h9)
C.F=H.u(Y.hg)
C.bq=H.u(P.x)
C.q=H.u(G.b_)
C.P=H.u(F.bs)
C.br=H.u(F.dk)
C.ay=H.u(X.hl)
C.y=H.u(G.ba)
C.k=H.u(F.X)
C.bs=H.u(B.nn)
C.az=H.u(S.nv)
C.bt=H.u(M.em)
C.bu=H.u(Z.hs)
C.aA=H.u(E.nz)
C.bv=H.u(E.cK)
C.i=H.u(G.ad)
C.bw=H.u(L.nA)
C.aB=H.u(D.hB)
C.aC=H.u(D.et)
C.bx=H.u(G.ev)
C.by=H.u(G.eu)
C.aD=H.u(G.b1)
C.G=H.u(G.cf)
C.m=new P.oh(!1)
C.r=new A.op(0,"ViewEncapsulation.Emulated")
C.bz=new R.eB(0,"ViewType.host")
C.n=new R.eB(1,"ViewType.component")
C.z=new R.eB(2,"ViewType.embedded")
C.bA=new W.pJ("beforeunload")
C.bB=new P.T(C.d,P.tO())
C.bC=new P.T(C.d,P.tU())
C.bD=new P.T(C.d,P.tW())
C.bE=new P.T(C.d,P.tS())
C.bF=new P.T(C.d,P.tP())
C.bG=new P.T(C.d,P.tQ())
C.bH=new P.T(C.d,P.tR())
C.bI=new P.T(C.d,P.tT())
C.bJ=new P.T(C.d,P.tV())
C.bK=new P.T(C.d,P.tX())
C.bL=new P.T(C.d,P.tY())
C.bM=new P.T(C.d,P.tZ())
C.bN=new P.T(C.d,P.u_())
C.bO=new P.iC(null,null,null,null,null,null,null,null,null,null,null,null,null)
$.j4=null
$.aL=0
$.bW=null
$.fq=null
$.j0=null
$.iT=null
$.j5=null
$.dD=null
$.dH=null
$.fc=null
$.bM=null
$.ck=null
$.cl=null
$.f_=!1
$.r=C.d
$.ie=null
$.fE=null
$.fD=null
$.fC=null
$.fB=null
$.iK=null
$.d2=null
$.f8=!1
$.aU=null
$.fo=0
$.ff=null
$.iR=null
$.iD=null
$.u0=null
$.hS=!1
$.ce=null
$.hV=null
$.eA=null
$.hX=null
$.hY=null
$.K=1
$.L=0
$.fI=0
$.im=0
$.eS=null
$.hW=null
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
I.$lazy(y,x,w)}})(["e_","$get$e_",function(){return H.j_("_$dart_dartClosure")},"ec","$get$ec",function(){return H.j_("_$dart_js")},"hC","$get$hC",function(){return H.aR(H.dp({
toString:function(){return"$receiver$"}}))},"hD","$get$hD",function(){return H.aR(H.dp({$method$:null,
toString:function(){return"$receiver$"}}))},"hE","$get$hE",function(){return H.aR(H.dp(null))},"hF","$get$hF",function(){return H.aR(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"hJ","$get$hJ",function(){return H.aR(H.dp(void 0))},"hK","$get$hK",function(){return H.aR(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"hH","$get$hH",function(){return H.aR(H.hI(null))},"hG","$get$hG",function(){return H.aR(function(){try{null.$method$}catch(z){return z.message}}())},"hM","$get$hM",function(){return H.aR(H.hI(void 0))},"hL","$get$hL",function(){return H.aR(function(){try{(void 0).$method$}catch(z){return z.message}}())},"eI","$get$eI",function(){return P.pz()},"fO","$get$fO",function(){return P.q9(null,C.d,P.x)},"ig","$get$ig",function(){return P.dc(null,null,null,null,null)},"cm","$get$cm",function(){return[]},"hU","$get$hU",function(){return P.ok()},"i0","$get$i0",function(){return H.he(H.d([-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-1,-2,-2,-2,-2,-2,62,-2,62,-2,63,52,53,54,55,56,57,58,59,60,61,-2,-2,-2,-1,-2,-2,-2,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-2,-2,-2,-2,63,-2,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-2,-2,-2,-2,-2],[P.i]))},"ix","$get$ix",function(){return P.el("^[\\-\\.0-9A-Z_a-z~]*$",!0,!1)},"iP","$get$iP",function(){return P.te()},"fA","$get$fA",function(){return{}},"fz","$get$fz",function(){return P.el("^\\S+$",!0,!1)},"f6","$get$f6",function(){var z=W.ud()
return z.createComment("")},"iE","$get$iE",function(){return P.el("%ID%",!0,!1)},"dT","$get$dT",function(){return H.he(H.d([0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,4,5,5,6,5,6,6,7,5,6,6,7,6,7,7,8],[P.i]))},"cU","$get$cU",function(){var z=P.h3(null,null,null,B.cE,P.i)
P.mk(z,C.b1,null,new B.u2())
return z},"ji","$get$ji",function(){return["#gamecontainer._ngcontent-%ID%{position:relative;display:grid;grid-template-columns:1fr 210px 200px 210px 1fr;grid-template-rows:1fr 200px 1fr 30px;width:100vw;height:100vh;z-index:0;}#gamecontainer._ngcontent-%ID% > *._ngcontent-%ID%{z-index:3;}game-error._ngcontent-%ID%,privacy-policy._ngcontent-%ID%{grid-column:1/ 6;grid-row:1/ 4;}game-menu._ngcontent-%ID%{grid-column:2/ 5;grid-row:2/ 3;}page-footer._ngcontent-%ID%{grid-column:1/ 7;grid-row:4/ 5;}canvas._ngcontent-%ID%{grid-column:1/ 6;grid-row:1/ 5;z-index:1;}canvas#hud._ngcontent-%ID%{z-index:2;}@media screen AND (max-width:630px), screen AND (max-height:320px) AND (max-width:630px) AND (orientation:landscape){#gamecontainer._ngcontent-%ID%{grid-template-columns:1fr 200px 1fr;grid-template-rows:1fr 200px 1fr 100px;}game-menu._ngcontent-%ID%{grid-column:2/ 3;grid-row:2/ 3;}page-footer._ngcontent-%ID%{grid-column:1/ 4;grid-row:4/ 5;}}"]},"j8","$get$j8",function(){return[$.$get$ji()]},"jg","$get$jg",function(){return["._nghost-%ID%{display:flex;justify-content:center;align-items:center;}div.container._ngcontent-%ID%{background-color:#966;border:1px solid #f20d0d;margin:10px;width:100vw;text-align:left;}div.info._ngcontent-%ID%{margin:10px;}pre._ngcontent-%ID%{margin:0 10px;overflow:auto;}"]},"j9","$get$j9",function(){return[$.$get$jg()]},"jh","$get$jh",function(){return["._nghost-%ID%{display:grid;justify-content:stretch;align-content:stretch;grid-template-columns:200px 200px 200px;grid-template-rows:200px;grid-column-gap:10px;column-gap:10px;}@media screen AND (max-width:630px), screen AND (max-height:320px) AND (max-width:630px) AND (orientation:landscape){._nghost-%ID%{grid-template-columns:200px;grid-template-rows:200px;grid-column-gap:0;column-gap:0;}._nghost-%ID% div#main._ngcontent-%ID%{grid-column:1/ 2;grid-row:1/ 2;}._nghost-%ID% div#settings._ngcontent-%ID%{display:none;}}div._ngcontent-%ID%{background-color:rgba(89, 13, 242, .4);border:1px solid rgba(89, 13, 242, .9);border-radius:50px;}button._ngcontent-%ID%{font-family:inherit;font-size:100%;line-height:1.15;margin:0;overflow:visible;text-transform:none;-webkit-appearance:button;}input:focus._ngcontent-%ID%{outline:none;}div#main._ngcontent-%ID%{grid-column:2/ 3;grid-row:1/ 2;text-align:center;}div#main._ngcontent-%ID% input._ngcontent-%ID%{margin-top:40px;line-height:normal;border-radius:10px;border:2px solid #6226d9;height:25px;padding:2px 10px;width:150px;}div#main._ngcontent-%ID% button._ngcontent-%ID%{width:90px;height:90px;border-radius:50px;margin-top:10px;background:radial-gradient(#0ac20a, #3df53d);border:4px solid #089108;outline:none;opacity:.9;font-size:20px;font-weight:bold;}div#main._ngcontent-%ID% button:hover._ngcontent-%ID%{background:radial-gradient(#0c0, #3f3);border:4px solid #0ac20a;}div#settings._ngcontent-%ID%{grid-column:3/ 4;grid-row:1/ 2;padding:30px 20px;}div#settings._ngcontent-%ID% label._ngcontent-%ID%{display:block;font-size:16px;color:gainsboro;user-select:none;}.connecting._ngcontent-%ID%,.connectionerror._ngcontent-%ID%{width:150px;height:75px;border-radius:10px;margin-left:20px;margin-top:10px;display:flex;align-items:center;color:gainsboro;}.connecting._ngcontent-%ID%{background-color:#bb5a00;}.connectionerror._ngcontent-%ID%{background-color:darkred;}"]},"ja","$get$ja",function(){return[$.$get$jh()]},"je","$get$je",function(){return['._nghost-%ID%{display:grid;background-color:gainsboro;grid-template-columns:250px auto 250px;grid-template-areas:"privacy logo imprint";align-items:center;}.privacy._ngcontent-%ID%{grid-area:privacy;text-align:left;}.logo._ngcontent-%ID%{grid-area:logo;text-align:center;}.imprint._ngcontent-%ID%{grid-area:imprint;text-align:right;}a._ngcontent-%ID%{margin:0 10px;color:#2900ae;text-decoration:none;}a:hover._ngcontent-%ID%{text-decoration:underline;}a:visited._ngcontent-%ID%{color:#80007e;}span.lastupdate._ngcontent-%ID%{font-size:12px;color:gray;}@media screen AND (max-width:630px), screen AND (max-height:320px) AND (max-width:630px) AND (orientation:landscape){._nghost-%ID%{grid-template-columns:auto;grid-template-rows:auto;grid-template-areas:"logo" "privacy" "imprint";height:100px;align-content:space-evenly;}.privacy._ngcontent-%ID%,.imprint._ngcontent-%ID%{text-align:center;}.lastupdate._ngcontent-%ID%{display:block;}}']},"jc","$get$jc",function(){return[$.$get$je()]},"jf","$get$jf",function(){return["._nghost-%ID%{position:absolute;background-color:gainsboro;height:calc(100vh - 70px);overflow-y:auto;margin:10px;padding:10px;}@media screen AND (max-width:630px), screen AND (max-height:320px) AND (max-width:630px) AND (orientation:landscape){._nghost-%ID%{height:calc(100vh - 140px);}}.exit._ngcontent-%ID%{text-align:center;}"]},"jd","$get$jd",function(){return[$.$get$jf()]},"aM","$get$aM",function(){return P.E(P.cO,S.ao)},"bQ","$get$bQ",function(){return P.nf(null)},"j7","$get$j7",function(){return["._nghost-%ID%{display:block;}path._ngcontent-%ID%{stroke:black;}.isowosi1._ngcontent-%ID%{fill:#fffc01;}.isowosi2._ngcontent-%ID%{fill:#66d800;}.isowosi3._ngcontent-%ID%{fill:#2900ae;}.isowosi4._ngcontent-%ID%{fill:#80007e;}.isowosi5._ngcontent-%ID%{fill:#ae0000;}.isowosi6._ngcontent-%ID%{fill:#d87600;}.isowosi7._ngcontent-%ID%{fill:#fffc01;}"]},"jb","$get$jb",function(){return[$.$get$j7()]}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=["_","error","stackTrace","value",null,"self","parent","zone","result","arg","time","callback","arg1","arg2","f","invocation","e","s","event","arg4","numberOfArguments","each","errorCode","theError","theStackTrace","index","xhr","closure","arg3","specification","zoneValues","trace","arguments","elem","findInAncestors","didWork_","element","t","ev","navigationResult","routerState","k","item","message","errorMessage","shaders","vertex","shaderSource",!0]
init.types=[{func:1,ret:P.x},{func:1,ret:-1,args:[S.af]},{func:1,ret:-1},{func:1,ret:P.x,args:[,,]},{func:1,ret:-1,args:[,]},{func:1,args:[,,]},{func:1,ret:[S.A,Q.av],args:[[S.A,,],P.i]},{func:1,ret:P.x,args:[,]},{func:1,ret:P.x,args:[W.ag]},{func:1,ret:-1,args:[P.f,,]},{func:1,args:[,]},{func:1,ret:-1,args:[P.a],opt:[P.a6]},{func:1,ret:-1,args:[P.a]},{func:1,ret:P.x,args:[-1]},{func:1,ret:[P.V,,],args:[,]},{func:1,ret:-1,args:[{func:1,ret:-1}]},{func:1,ret:-1,args:[P.o,P.I,P.o,,P.a6]},{func:1,ret:M.aY,opt:[M.aY]},{func:1,bounds:[P.a,P.a,P.a],ret:0,args:[P.o,P.I,P.o,{func:1,ret:0,args:[1,2]},1,2]},{func:1,ret:P.f},{func:1,ret:-1,args:[P.o,P.I,P.o,{func:1,ret:-1}]},{func:1,bounds:[P.a],ret:0,args:[P.o,P.I,P.o,{func:1,ret:0}]},{func:1,bounds:[P.a,P.a],ret:0,args:[P.o,P.I,P.o,{func:1,ret:0,args:[1]},1]},{func:1,ret:P.b0,args:[P.o,P.I,P.o,P.as,{func:1,ret:-1}]},{func:1,args:[,P.f]},{func:1,ret:P.x,args:[P.f,,]},{func:1,ret:[P.Q,P.f,P.f],args:[[P.Q,P.f,P.f],P.f]},{func:1,ret:-1,args:[P.f,P.i]},{func:1,ret:Y.cZ},{func:1,ret:Q.cY},{func:1,ret:M.aY},{func:1,ret:P.x,args:[,P.a6]},{func:1,ret:P.aG},{func:1,ret:-1,args:[P.c0]},{func:1,ret:-1,args:[P.f],opt:[,]},{func:1,ret:P.i,args:[P.i,P.i]},{func:1,ret:P.dq,args:[,,]},{func:1,ret:P.x,args:[P.cb,,]},{func:1,ret:-1,opt:[P.a]},{func:1,ret:P.x,args:[P.i,,]},{func:1,args:[W.b7],opt:[P.aG]},{func:1,ret:[P.m,,]},{func:1,ret:[P.m,U.df]},{func:1,ret:[P.V,-1],args:[-1]},{func:1,ret:P.f,args:[P.f,N.dl]},{func:1,ret:[P.m,S.af]},{func:1,ret:P.x,args:[,],opt:[,]},{func:1,ret:P.i,args:[,]},{func:1,ret:-1,args:[B.cD]},{func:1,ret:P.i,args:[M.ca,M.ca]},{func:1,ret:[S.A,Q.cx],args:[[S.A,,],P.i]},{func:1,ret:-1,args:[S.y]},{func:1,ret:-1,args:[S.at]},{func:1,ret:-1,args:[S.aN]},{func:1,ret:P.S},{func:1,ret:-1,args:[P.i,P.i]},{func:1,ret:P.S,args:[P.S,P.S]},{func:1,ret:-1,args:[P.O]},{func:1,ret:-1,args:[W.ag]},{func:1,ret:[P.R,,],args:[,]},{func:1,ret:P.x,args:[P.f,[P.m,L.hm]]},{func:1,ret:L.da,args:[,]},{func:1,ret:P.x,args:[P.i,[P.m,S.aN]]},{func:1,ret:P.i,args:[P.i,P.a]},{func:1,ret:P.i,args:[,,]},{func:1,ret:P.i,args:[[P.m,P.i],P.i]},{func:1,bounds:[P.a],ret:{func:1,ret:0},args:[P.o,P.I,P.o,{func:1,ret:0}]},{func:1,bounds:[P.a,P.a],ret:{func:1,ret:0,args:[1]},args:[P.o,P.I,P.o,{func:1,ret:0,args:[1]}]},{func:1,bounds:[P.a,P.a,P.a],ret:{func:1,ret:0,args:[1,2]},args:[P.o,P.I,P.o,{func:1,ret:0,args:[1,2]}]},{func:1,ret:P.bU,args:[P.o,P.I,P.o,P.a,P.a6]},{func:1,ret:P.b0,args:[P.o,P.I,P.o,P.as,{func:1,ret:-1,args:[P.b0]}]},{func:1,ret:-1,args:[P.o,P.I,P.o,P.f]},{func:1,ret:-1,args:[P.f]},{func:1,ret:P.o,args:[P.o,P.I,P.o,P.eF,[P.Q,,,]]},{func:1,ret:-1,args:[P.f,P.f]},{func:1,ret:P.i},{func:1,ret:P.x,args:[[S.ak,S.y],P.i]}]
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
if(x==y)H.uG(d||a)
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
Isolate.a0=a.a0
Isolate.co=a.co
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
if(typeof dartMainRunner==="function")dartMainRunner(F.j2,[])
else F.j2([])})})()
//# sourceMappingURL=main.dart.js.map
