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
if(a1==="B"){processStatics(init.statics[b2]=b3.B,b4)
delete b3.B}else if(a2===43){w[g]=a1.substring(1)
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
d.$callName=null}}function tearOffGetter(d,e,f,g,a0){return a0?new Function("funcs","applyTrampolineIndex","reflectionInfo","name","H","c","return function tearOff_"+g+y+++"(x) {"+"if (c === null) c = "+"H.dd"+"("+"this, funcs, applyTrampolineIndex, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(d,e,f,g,H,null):new Function("funcs","applyTrampolineIndex","reflectionInfo","name","H","c","return function tearOff_"+g+y+++"() {"+"if (c === null) c = "+"H.dd"+"("+"this, funcs, applyTrampolineIndex, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(d,e,f,g,H,null)}function tearOff(d,e,f,a0,a1,a2){var g
return a0?function(){if(g===void 0)g=H.dd(this,d,e,f,true,[],a1).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.bx=function(){}
var dart=[["","",,H,{"^":"",ng:{"^":"b;a"}}],["","",,J,{"^":"",
di:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bS:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.dh==null){H.m3()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.a(P.cd("Return interceptor for "+H.e(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$cL()]
if(v!=null)return v
v=H.m7(a)
if(v!=null)return v
if(typeof a=="function")return C.aa
y=Object.getPrototypeOf(a)
if(y==null)return C.P
if(y===Object.prototype)return C.P
if(typeof w=="function"){Object.defineProperty(w,$.$get$cL(),{value:C.x,enumerable:false,writable:true,configurable:true})
return C.x}return C.x},
f:{"^":"b;",
O:function(a,b){return a===b},
gD:function(a){return H.aZ(a)},
k:["dl",function(a){return"Instance of '"+H.bo(a)+"'"}],
"%":"ANGLEInstancedArrays|ANGLE_instanced_arrays|AnimationEffectReadOnly|AnimationEffectTiming|AnimationEffectTimingReadOnly|AnimationTimeline|AnimationWorkletGlobalScope|AudioListener|AudioTrack|AudioWorkletGlobalScope|AudioWorkletProcessor|AuthenticatorAssertionResponse|AuthenticatorAttestationResponse|AuthenticatorResponse|BackgroundFetchFetch|BackgroundFetchManager|BackgroundFetchSettledFetch|BarProp|BarcodeDetector|Bluetooth|BluetoothCharacteristicProperties|BluetoothRemoteGATTServer|BluetoothRemoteGATTService|BluetoothUUID|Body|BudgetService|BudgetState|CSS|CSSVariableReferenceValue|Cache|CacheStorage|CanvasGradient|CanvasPattern|Client|Clients|CookieStore|Coordinates|Credential|CredentialUserData|CredentialsContainer|Crypto|CryptoKey|CustomElementRegistry|DOMError|DOMFileSystem|DOMFileSystemSync|DOMImplementation|DOMMatrix|DOMMatrixReadOnly|DOMParser|DOMQuad|DOMStringMap|DataTransfer|DataTransferItem|Database|DeprecatedStorageInfo|DeprecatedStorageQuota|DeprecationReport|DetectedBarcode|DetectedFace|DetectedText|DeviceRotationRate|DirectoryEntry|DirectoryEntrySync|DirectoryReader|DirectoryReaderSync|DocumentOrShadowRoot|DocumentTimeline|EXTBlendMinMax|EXTColorBufferFloat|EXTColorBufferHalfFloat|EXTDisjointTimerQuery|EXTDisjointTimerQueryWebGL2|EXTFragDepth|EXTShaderTextureLOD|EXTTextureFilterAnisotropic|EXT_blend_minmax|EXT_frag_depth|EXT_sRGB|EXT_shader_texture_lod|EXT_texture_filter_anisotropic|EXTsRGB|Entry|EntrySync|External|FaceDetector|FederatedCredential|FileEntry|FileEntrySync|FileReaderSync|FileWriterSync|FontFace|FontFaceSource|FormData|GamepadPose|Geolocation|HTMLAllCollection|HTMLHyperlinkElementUtils|Headers|IDBFactory|IDBIndex|IDBKeyRange|IDBObserver|IDBObserverChanges|IdleDeadline|ImageBitmap|ImageBitmapRenderingContext|ImageCapture|InputDeviceCapabilities|IntersectionObserver|IntersectionObserverEntry|InterventionReport|Iterator|KeyframeEffect|KeyframeEffectReadOnly|MediaCapabilities|MediaCapabilitiesInfo|MediaDeviceInfo|MediaError|MediaKeyStatusMap|MediaKeySystemAccess|MediaKeys|MediaKeysPolicy|MediaMetadata|MediaSession|MediaSettingsRange|MemoryInfo|MessageChannel|Metadata|Mojo|MojoHandle|MojoWatcher|MutationObserver|MutationRecord|NFC|NavigationPreloadManager|Navigator|NavigatorAutomationInformation|NavigatorConcurrentHardware|NavigatorCookies|NavigatorUserMediaError|NodeFilter|NodeIterator|NonDocumentTypeChildNode|NonElementParentNode|NoncedElement|OESElementIndexUint|OESStandardDerivatives|OESTextureFloat|OESTextureFloatLinear|OESTextureHalfFloat|OESTextureHalfFloatLinear|OESVertexArrayObject|OES_element_index_uint|OES_standard_derivatives|OES_texture_float|OES_texture_float_linear|OES_texture_half_float|OES_texture_half_float_linear|OES_vertex_array_object|OffscreenCanvasRenderingContext2D|OverconstrainedError|PagePopupController|PaintRenderingContext2D|PaintSize|PaintWorkletGlobalScope|PasswordCredential|Path2D|PaymentAddress|PaymentInstruments|PaymentManager|PaymentResponse|PerformanceEntry|PerformanceLongTaskTiming|PerformanceMark|PerformanceMeasure|PerformanceNavigation|PerformanceNavigationTiming|PerformanceObserver|PerformanceObserverEntryList|PerformancePaintTiming|PerformanceResourceTiming|PerformanceServerTiming|PerformanceTiming|PeriodicWave|Permissions|PhotoCapabilities|Position|PositionError|Presentation|PresentationReceiver|PublicKeyCredential|PushManager|PushMessageData|PushSubscription|PushSubscriptionOptions|RTCCertificate|RTCIceCandidate|RTCLegacyStatsReport|RTCRtpContributingSource|RTCRtpReceiver|RTCRtpSender|RTCSessionDescription|RTCStatsResponse|Range|RelatedApplication|Report|ReportBody|ReportingObserver|Request|ResizeObserver|ResizeObserverEntry|Response|SQLError|SQLResultSet|SQLTransaction|SVGAnimatedAngle|SVGAnimatedBoolean|SVGAnimatedEnumeration|SVGAnimatedInteger|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedPreserveAspectRatio|SVGAnimatedRect|SVGAnimatedString|SVGAnimatedTransformList|SVGMatrix|SVGPreserveAspectRatio|SVGUnitTypes|Screen|ScrollState|ScrollTimeline|Selection|SharedArrayBuffer|SpeechRecognitionAlternative|SpeechSynthesisVoice|StaticRange|StorageManager|StyleMedia|StylePropertyMap|StylePropertyMapReadonly|SubtleCrypto|SyncManager|TaskAttributionTiming|TextDetector|TextMetrics|TrackDefault|TreeWalker|TrustedHTML|TrustedScriptURL|TrustedURL|URLSearchParams|USBAlternateInterface|USBConfiguration|USBDevice|USBEndpoint|USBInTransferResult|USBInterface|USBIsochronousInTransferPacket|USBIsochronousInTransferResult|USBIsochronousOutTransferPacket|USBIsochronousOutTransferResult|USBOutTransferResult|UnderlyingSourceBase|VRCoordinateSystem|VRDisplayCapabilities|VREyeParameters|VRFrameData|VRFrameOfReference|VRPose|VRStageBounds|VRStageParameters|VTTRegion|ValidityState|VideoPlaybackQuality|VideoTrack|WEBGL_compressed_texture_atc|WEBGL_compressed_texture_etc1|WEBGL_compressed_texture_pvrtc|WEBGL_compressed_texture_s3tc|WEBGL_debug_renderer_info|WEBGL_debug_shaders|WEBGL_depth_texture|WEBGL_draw_buffers|WEBGL_lose_context|WebGL|WebGL2RenderingContext|WebGL2RenderingContextBase|WebGLActiveInfo|WebGLCanvas|WebGLColorBufferFloat|WebGLCompressedTextureASTC|WebGLCompressedTextureATC|WebGLCompressedTextureETC|WebGLCompressedTextureETC1|WebGLCompressedTexturePVRTC|WebGLCompressedTextureS3TC|WebGLCompressedTextureS3TCsRGB|WebGLDebugRendererInfo|WebGLDebugShaders|WebGLDepthTexture|WebGLDrawBuffers|WebGLExtensionLoseContext|WebGLFramebuffer|WebGLGetBufferSubDataAsync|WebGLLoseContext|WebGLProgram|WebGLQuery|WebGLRenderbuffer|WebGLRenderingContext|WebGLSampler|WebGLShader|WebGLShaderPrecisionFormat|WebGLSync|WebGLTexture|WebGLTimerQueryEXT|WebGLTransformFeedback|WebGLUniformLocation|WebGLVertexArrayObject|WebGLVertexArrayObjectOES|WebKitMutationObserver|WindowClient|WorkerLocation|WorkerNavigator|Worklet|WorkletAnimation|WorkletGlobalScope|XMLSerializer|XPathEvaluator|XPathExpression|XPathNSResolver|XPathResult|XSLTProcessor|mozRTCIceCandidate|mozRTCSessionDescription"},
hA:{"^":"f;",
k:function(a){return String(a)},
gD:function(a){return a?519018:218159},
$isaJ:1},
dN:{"^":"f;",
O:function(a,b){return null==b},
k:function(a){return"null"},
gD:function(a){return 0},
gG:function(a){return C.ao},
$isM:1},
cM:{"^":"f;",
gD:function(a){return 0},
k:["dn",function(a){return String(a)}]},
hY:{"^":"cM;"},
bN:{"^":"cM;"},
bn:{"^":"cM;",
k:function(a){var z=a[$.$get$dt()]
if(z==null)return this.dn(a)
return"JavaScript function for "+H.e(J.bU(z))},
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}}},
bm:{"^":"f;$ti",
l:[function(a,b){if(!!a.fixed$length)H.a8(P.i("add"))
a.push(b)},"$1","gex",5,0,11],
E:function(a,b){var z
if(!!a.fixed$length)H.a8(P.i("remove"))
for(z=0;z<a.length;++z)if(J.a2(a[z],b)){a.splice(z,1)
return!0}return!1},
co:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(!b.$1(w))z.push(w)
if(a.length!==y)throw H.a(P.a_(a))}v=z.length
if(v===y)return
this.si(a,v)
for(x=0;x<z.length;++x)a[x]=z[x]},
b5:function(a,b){return new H.aG(a,b,[H.z(a,0)])},
cG:function(a,b,c){return new H.c0(a,b,[H.z(a,0),c])},
ey:function(a,b){var z,y
if(!!a.fixed$length)H.a8(P.i("addAll"))
for(z=b.length,y=0;y<b.length;b.length===z||(0,H.by)(b),++y)a.push(b[y])},
ad:function(a){this.si(a,0)},
q:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.a(P.a_(a))}},
fm:function(a,b){var z,y,x
z=a.length
if(z===0)throw H.a(H.hx())
y=a[0]
for(x=1;x<z;++x){y=b.$2(y,a[x])
if(z!==a.length)throw H.a(P.a_(a))}return y},
bG:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.a(P.a_(a))}return y},
f0:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x))return x
if(a.length!==z)throw H.a(P.a_(a))}return c.$0()},
C:function(a,b){return a[b]},
aa:function(a,b,c){var z=a.length
if(b>z)throw H.a(P.ap(b,0,a.length,"start",null))
if(c==null)c=a.length
else if(c<b||c>a.length)throw H.a(P.ap(c,b,a.length,"end",null))
if(b===c)return H.d([],[H.z(a,0)])
return H.d(a.slice(b,c),[H.z(a,0)])},
da:function(a,b,c,d,e){var z,y,x
if(!!a.immutable$list)H.a8(P.i("setRange"))
P.dV(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
y=J.a7(d)
if(e+z>y.gi(d))throw H.a(H.hy())
if(e<b)for(x=z-1;x>=0;--x)a[b+x]=y.h(d,e+x)
else for(x=0;x<z;++x)a[b+x]=y.h(d,e+x)},
av:function(a,b,c,d){return this.da(a,b,c,d,0)},
k:function(a){return P.cJ(a,"[","]")},
gN:function(a){return new J.cw(a,a.length,0)},
gD:function(a){return H.aZ(a)},
gi:function(a){return a.length},
si:function(a,b){if(!!a.fixed$length)H.a8(P.i("set length"))
if(b<0)throw H.a(P.ap(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.a(H.aM(a,b))
if(b>=a.length||b<0)throw H.a(H.aM(a,b))
return a[b]},
j:function(a,b,c){if(!!a.immutable$list)H.a8(P.i("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.a(H.aM(a,b))
if(b>=a.length||b<0)throw H.a(H.aM(a,b))
a[b]=c},
n:function(a,b){var z,y
z=C.a.n(a.length,b.gi(b))
y=H.d([],[H.z(a,0)])
this.si(y,z)
this.av(y,0,a.length,a)
this.av(y,a.length,z,b)
return y},
$isr:1,
$asr:I.bx,
$isk:1,
$isj:1,
$isl:1,
B:{
hz:function(a,b){if(typeof a!=="number"||Math.floor(a)!==a)throw H.a(P.cv(a,"length","is not an integer"))
if(a<0||a>4294967295)throw H.a(P.ap(a,0,4294967295,"length",null))
return J.dL(new Array(a),b)},
dL:function(a,b){return J.bE(H.d(a,[b]))},
bE:function(a){a.fixed$length=Array
return a}}},
nf:{"^":"bm;$ti"},
cw:{"^":"b;a,b,c,0d",
gw:function(a){return this.d},
v:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.a(H.by(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aV:{"^":"f;",
eI:function(a,b){var z
if(typeof b!=="number")throw H.a(H.aq(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gaX(b)
if(this.gaX(a)===z)return 0
if(this.gaX(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gaX:function(a){return a===0?1/a<0:a<0},
aj:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.a(P.i(""+a+".toInt()"))},
cL:function(a){var z,y
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){z=a|0
return a===z?z:z-1}y=Math.floor(a)
if(isFinite(y))return y
throw H.a(P.i(""+a+".floor()"))},
W:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.a(P.i(""+a+".round()"))},
b1:function(a,b){var z
if(b>20)throw H.a(P.ap(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gaX(a))return"-"+z
return z},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gD:function(a){return a&0x1FFFFFFF},
aH:function(a){return-a},
n:function(a,b){if(typeof b!=="number")throw H.a(H.aq(b))
return a+b},
a4:function(a,b){if(typeof b!=="number")throw H.a(H.aq(b))
return a-b},
bU:function(a,b){if(typeof b!=="number")throw H.a(H.aq(b))
return a*b},
a2:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
K:function(a,b){return(a|0)===a?a/b|0:this.eo(a,b)},
eo:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.a(P.i("Result of truncating division is "+H.e(z)+": "+H.e(a)+" ~/ "+b))},
ei:function(a,b){return b>31?0:a<<b>>>0},
bv:function(a,b){var z
if(a>0)z=this.ej(a,b)
else{z=b>31?31:b
z=a>>z>>>0}return z},
ej:function(a,b){return b>31?0:a>>>b},
am:function(a,b){if(typeof b!=="number")throw H.a(H.aq(b))
return a<b},
b8:function(a,b){if(typeof b!=="number")throw H.a(H.aq(b))
return a>b},
au:function(a,b){if(typeof b!=="number")throw H.a(H.aq(b))
return a<=b},
$isI:1,
$isC:1},
cK:{"^":"aV;",
aH:function(a){return-a},
$isA:1},
dM:{"^":"aV;"},
bF:{"^":"f;",
dN:function(a,b){if(b>=a.length)throw H.a(H.aM(a,b))
return a.charCodeAt(b)},
n:function(a,b){if(typeof b!=="string")throw H.a(P.cv(b,null,null))
return a+b},
bW:function(a,b,c){if(c==null)c=a.length
if(b>c)throw H.a(P.cU(b,null,null))
if(c>a.length)throw H.a(P.cU(c,null,null))
return a.substring(b,c)},
dg:function(a,b){return this.bW(a,b,null)},
eL:function(a,b,c){if(c>a.length)throw H.a(P.ap(c,0,a.length,null,null))
return H.me(a,b,c)},
k:function(a){return a},
gD:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gi:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.a(H.aM(a,b))
if(b>=a.length||b<0)throw H.a(H.aM(a,b))
return a[b]},
$isr:1,
$asr:I.bx,
$isp:1}}],["","",,H,{"^":"",
hx:function(){return new P.b2("No element")},
hy:function(){return new P.b2("Too few elements")},
ix:function(a,b){H.bK(a,0,J.an(a)-1,b)},
bK:function(a,b,c,d){if(c-b<=32)H.iw(a,b,c,d)
else H.iv(a,b,c,d)},
iw:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.a7(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.a9(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.j(a,w,y.h(a,v))
w=v}y.j(a,w,x)}},
iv:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.a.K(c-b+1,6)
y=b+z
x=c-z
w=C.a.K(b+c,2)
v=w-z
u=w+z
t=J.a7(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.a9(d.$2(s,r),0)){n=r
r=s
s=n}if(J.a9(d.$2(p,o),0)){n=o
o=p
p=n}if(J.a9(d.$2(s,q),0)){n=q
q=s
s=n}if(J.a9(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a9(d.$2(s,p),0)){n=p
p=s
s=n}if(J.a9(d.$2(q,p),0)){n=p
p=q
q=n}if(J.a9(d.$2(r,o),0)){n=o
o=r
r=n}if(J.a9(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a9(d.$2(p,o),0)){n=o
o=p
p=n}t.j(a,y,s)
t.j(a,w,q)
t.j(a,x,o)
t.j(a,v,t.h(a,b))
t.j(a,u,t.h(a,c))
m=b+1
l=c-1
if(J.a2(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.h(a,k)
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
H.bK(a,b,m-2,d)
H.bK(a,l+2,c,d)
if(f)return
if(m<y&&l>x){for(;J.a2(d.$2(t.h(a,m),r),0);)++m
for(;J.a2(d.$2(t.h(a,l),p),0);)--l
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
break}}H.bK(a,m,l,d)}else H.bK(a,m,l,d)},
k:{"^":"j;$ti"},
cP:{"^":"k;$ti",
gN:function(a){return new H.dO(this,this.gi(this),0)},
q:function(a,b){var z,y
z=this.gi(this)
for(y=0;y<z;++y){b.$1(this.C(0,y))
if(z!==this.gi(this))throw H.a(P.a_(this))}},
b5:function(a,b){return this.dm(0,b)},
fA:function(a,b){var z,y
z=H.d([],[H.al(this,"cP",0)])
C.b.si(z,this.gi(this))
for(y=0;y<this.gi(this);++y)z[y]=this.C(0,y)
return z},
fz:function(a){return this.fA(a,!0)}},
dO:{"^":"b;a,b,c,0d",
gw:function(a){return this.d},
v:function(){var z,y,x,w
z=this.a
y=J.a7(z)
x=y.gi(z)
if(this.b!==x)throw H.a(P.a_(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.C(z,w);++this.c
return!0}},
dQ:{"^":"cP;a,b,$ti",
gi:function(a){return J.an(this.a)},
C:function(a,b){return this.b.$1(J.eX(this.a,b))},
$ask:function(a,b){return[b]},
$ascP:function(a,b){return[b]},
$asj:function(a,b){return[b]}},
aG:{"^":"j;a,b,$ti",
gN:function(a){return new H.d3(J.a0(this.a),this.b)}},
d3:{"^":"dK;a,b",
v:function(){var z,y
for(z=this.a,y=this.b;z.v();)if(y.$1(z.gw(z)))return!0
return!1},
gw:function(a){var z=this.a
return z.gw(z)}},
c0:{"^":"j;a,b,$ti",
gN:function(a){return new H.fU(J.a0(this.a),this.b,C.X)},
$asj:function(a,b){return[b]}},
fU:{"^":"b;a,b,c,0d",
gw:function(a){return this.d},
v:function(){var z,y,x
z=this.c
if(z==null)return!1
for(y=this.a,x=this.b;!z.v();){this.d=null
if(y.v()){this.c=null
z=J.a0(x.$1(y.gw(y)))
this.c=z}else return!1}z=this.c
this.d=z.gw(z)
return!0}},
iD:{"^":"j;a,b,$ti",
gN:function(a){return new H.iE(J.a0(this.a),this.b,!1)}},
iE:{"^":"dK;a,b,c",
v:function(){if(this.c)return!1
var z=this.a
if(!z.v()||!this.b.$1(z.gw(z))){this.c=!0
return!1}return!0},
gw:function(a){var z
if(this.c)return
z=this.a
return z.gw(z)}},
fN:{"^":"b;",
v:function(){return!1},
gw:function(a){return}},
cF:{"^":"j;a,b,$ti",
gN:function(a){return new H.fY(J.a0(this.a),this.b)},
gi:function(a){return J.an(this.a)+J.an(this.b)},
B:{
cG:function(a,b,c){if(H.aj(b,"$isk",[c],"$ask"))return new H.fM(a,b,[c])
return new H.cF(a,b,[c])}}},
fM:{"^":"cF;a,b,$ti",$isk:1},
fY:{"^":"b;a,b",
v:function(){if(this.a.v())return!0
var z=this.b
if(z!=null){z=J.a0(z)
this.a=z
this.b=null
return z.v()}return!1},
gw:function(a){var z=this.a
return z.gw(z)}},
dD:{"^":"b;",
si:function(a,b){throw H.a(P.i("Cannot change the length of a fixed-length list"))},
l:function(a,b){throw H.a(P.i("Cannot add to a fixed-length list"))},
E:function(a,b){throw H.a(P.i("Cannot remove from a fixed-length list"))},
ad:function(a){throw H.a(P.i("Cannot clear a fixed-length list"))}}}],["","",,H,{"^":"",
cp:function(a){var z=init.mangledGlobalNames[a]
if(typeof z==="string")return z
z="minified:"+a
return z},
lY:function(a){return init.types[a]},
eN:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.y(a).$isu},
e:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.bU(a)
if(typeof z!=="string")throw H.a(H.aq(a))
return z},
aZ:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
bo:function(a){return H.i0(a)+H.eB(H.aO(a),0,null)},
i0:function(a){var z,y,x,w,v,u,t,s,r
z=J.y(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
v=w==null
if(v||z===C.a3||!!z.$isbN){u=C.C(a)
if(v)w=u
if(u==="Object"){t=a.constructor
if(typeof t=="function"){s=String(t).match(/^\s*function\s*([\w$]*)\s*\(/)
r=s==null?null:s[1]
if(typeof r==="string"&&/^\w+$/.test(r))w=r}}return w}w=w
return H.cp(w.length>1&&C.k.dN(w,0)===36?C.k.dg(w,1):w)},
aY:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
i7:function(a){var z=H.aY(a).getUTCFullYear()+0
return z},
i5:function(a){var z=H.aY(a).getUTCMonth()+1
return z},
i1:function(a){var z=H.aY(a).getUTCDate()+0
return z},
i2:function(a){var z=H.aY(a).getUTCHours()+0
return z},
i4:function(a){var z=H.aY(a).getUTCMinutes()+0
return z},
i6:function(a){var z=H.aY(a).getUTCSeconds()+0
return z},
i3:function(a){var z=H.aY(a).getUTCMilliseconds()+0
return z},
aM:function(a,b){var z
if(typeof b!=="number"||Math.floor(b)!==b)return new P.av(!0,b,"index",null)
z=J.an(a)
if(b<0||b>=z)return P.E(b,a,"index",null,z)
return P.cU(b,"index",null)},
lT:function(a,b,c){if(a>c)return new P.ca(0,c,!0,a,"start","Invalid value")
if(b!=null)if(b<a||b>c)return new P.ca(a,c,!0,b,"end","Invalid value")
return new P.av(!0,b,"end",null)},
aq:function(a){return new P.av(!0,a,null,null)},
aK:function(a){if(typeof a!=="number")throw H.a(H.aq(a))
return a},
a:function(a){var z
if(a==null)a=new P.c8()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.eT})
z.name=""}else z.toString=H.eT
return z},
eT:function(){return J.bU(this.dartException)},
a8:function(a){throw H.a(a)},
by:function(a){throw H.a(P.a_(a))},
at:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.mg(a)
if(a==null)return
if(a instanceof H.dB)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.a.bv(x,16)&8191)===10)switch(w){case 438:return z.$1(H.cN(H.e(y)+" (Error "+w+")",null))
case 445:case 5007:return z.$1(H.dT(H.e(y)+" (Error "+w+")",null))}}if(a instanceof TypeError){v=$.$get$e0()
u=$.$get$e1()
t=$.$get$e2()
s=$.$get$e3()
r=$.$get$e7()
q=$.$get$e8()
p=$.$get$e5()
$.$get$e4()
o=$.$get$ea()
n=$.$get$e9()
m=v.a0(y)
if(m!=null)return z.$1(H.cN(y,m))
else{m=u.a0(y)
if(m!=null){m.method="call"
return z.$1(H.cN(y,m))}else{m=t.a0(y)
if(m==null){m=s.a0(y)
if(m==null){m=r.a0(y)
if(m==null){m=q.a0(y)
if(m==null){m=p.a0(y)
if(m==null){m=s.a0(y)
if(m==null){m=o.a0(y)
if(m==null){m=n.a0(y)
l=m!=null}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0
if(l)return z.$1(H.dT(y,m))}}return z.$1(new H.iO(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.dX()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.av(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.dX()
return a},
as:function(a){var z
if(a instanceof H.dB)return a.b
if(a==null)return new H.es(a)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.es(a)},
lV:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.j(0,a[y],a[x])}return b},
m6:function(a,b,c,d,e,f){switch(b){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw H.a(new P.ka("Unsupported number of arguments for wrapped closure"))},
aL:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,H.m6)
a.$identity=z
return z},
fl:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.y(d).$isl){z.$reflectionInfo=d
x=H.io(z).r}else x=d
w=e?Object.create(new H.iy().constructor.prototype):Object.create(new H.cA(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(e)v=function static_tear_off(){this.$initialize()}
else{u=$.ab
$.ab=u+1
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
if(!e){t=f.length==1&&!0
s=H.dr(a,z,t)
s.$reflectionInfo=d}else{w.$static_name=g
s=z
t=!1}if(typeof x=="number")r=function(h,i){return function(){return h(i)}}(H.lY,x)
else if(typeof x=="function")if(e)r=x
else{q=t?H.dp:H.cB
r=function(h,i){return function(){return h.apply({$receiver:i(this)},arguments)}}(x,q)}else throw H.a("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=s,o=1;o<u;++o){n=b[o]
m=n.$callName
if(m!=null){n=e?n:H.dr(a,n,t)
w[m]=n}if(o===c){n.$reflectionInfo=d
p=n}}w["call*"]=p
w.$R=z.$R
w.$D=z.$D
return v},
fi:function(a,b,c,d){var z=H.cB
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
dr:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.fk(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.fi(y,!w,z,b)
if(y===0){w=$.ab
$.ab=w+1
u="self"+H.e(w)
w="return function(){var "+u+" = this."
v=$.bi
if(v==null){v=H.bW("self")
$.bi=v}return new Function(w+H.e(v)+";return "+u+"."+H.e(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.ab
$.ab=w+1
t+=H.e(w)
w="return function("+t+"){return this."
v=$.bi
if(v==null){v=H.bW("self")
$.bi=v}return new Function(w+H.e(v)+"."+H.e(z)+"("+t+");}")()},
fj:function(a,b,c,d){var z,y
z=H.cB
y=H.dp
switch(b?-1:a){case 0:throw H.a(H.is("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
fk:function(a,b){var z,y,x,w,v,u,t,s
z=$.bi
if(z==null){z=H.bW("self")
$.bi=z}y=$.dn
if(y==null){y=H.bW("receiver")
$.dn=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.fj(w,!u,x,b)
if(w===1){z="return function(){return this."+H.e(z)+"."+H.e(x)+"(this."+H.e(y)+");"
y=$.ab
$.ab=y+1
return new Function(z+H.e(y)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
z="return function("+s+"){return this."+H.e(z)+"."+H.e(x)+"(this."+H.e(y)+", "+s+");"
y=$.ab
$.ab=y+1
return new Function(z+H.e(y)+"}")()},
dd:function(a,b,c,d,e,f,g){var z,y
z=J.bE(b)
y=!!J.y(d).$isl?J.bE(d):d
return H.fl(a,z,c,y,!!e,f,g)},
md:function(a,b){var z=J.a7(b)
throw H.a(H.fe(a,z.bW(b,3,z.gi(b))))},
m5:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.y(a)[b]
else z=!0
if(z)return a
H.md(a,b)},
de:function(a){var z
if("$S" in a){z=a.$S
if(typeof z=="number")return init.types[z]
else return a.$S()}return},
bQ:function(a,b){var z
if(a==null)return!1
if(typeof a=="function")return!0
z=H.de(J.y(a))
if(z==null)return!1
return H.eA(z,null,b,null)},
lH:function(a){var z,y
z=J.y(a)
if(!!z.$isc){y=H.de(z)
if(y!=null)return H.eR(y)
return"Closure"}return H.bo(a)},
mf:function(a){throw H.a(new P.fw(a))},
eL:function(a){return init.getIsolateTag(a)},
J:function(a){return new H.q(a)},
d:function(a,b){a.$ti=b
return a},
aO:function(a){if(a==null)return
return a.$ti},
ol:function(a,b,c){return H.bf(a["$as"+H.e(c)],H.aO(b))},
lX:function(a,b,c,d){var z=H.bf(a["$as"+H.e(c)],H.aO(b))
return z==null?null:z[d]},
al:function(a,b,c){var z=H.bf(a["$as"+H.e(b)],H.aO(a))
return z==null?null:z[c]},
z:function(a,b){var z=H.aO(a)
return z==null?null:z[b]},
eR:function(a){return H.aI(a,null)},
aI:function(a,b){if(a==null)return"dynamic"
if(a===-1)return"void"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return H.cp(a[0].builtin$cls)+H.eB(a,1,b)
if(typeof a=="function")return H.cp(a.builtin$cls)
if(a===-2)return"dynamic"
if(typeof a==="number"){if(b==null||a<0||a>=b.length)return"unexpected-generic-index:"+H.e(a)
return H.e(b[b.length-a-1])}if('func' in a)return H.lx(a,b)
if('futureOr' in a)return"FutureOr<"+H.aI("type" in a?a.type:null,b)+">"
return"unknown-reified-type"},
lx:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
if("bounds" in a){z=a.bounds
if(b==null){b=H.d([],[P.p])
y=null}else y=b.length
x=b.length
for(w=z.length,v=w;v>0;--v)b.push("T"+(x+v))
for(u="<",t="",v=0;v<w;++v,t=", "){u=C.k.n(u+t,b[b.length-v-1])
s=z[v]
if(s!=null&&s!==P.b)u+=" extends "+H.aI(s,b)}u+=">"}else{u=""
y=null}r=!!a.v?"void":H.aI(a.ret,b)
if("args" in a){q=a.args
for(p=q.length,o="",n="",m=0;m<p;++m,n=", "){l=q[m]
o=o+n+H.aI(l,b)}}else{o=""
n=""}if("opt" in a){k=a.opt
o+=n+"["
for(p=k.length,n="",m=0;m<p;++m,n=", "){l=k[m]
o=o+n+H.aI(l,b)}o+="]"}if("named" in a){j=a.named
o+=n+"{"
for(p=H.lU(j),i=p.length,n="",m=0;m<i;++m,n=", "){h=p[m]
o=o+n+H.aI(j[h],b)+(" "+H.e(h))}o+="}"}if(y!=null)b.length=y
return u+"("+o+") => "+r},
eB:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.cX("")
for(y=b,x="",w=!0,v="";y<a.length;++y,x=", "){z.a=v+x
u=a[y]
if(u!=null)w=!1
v=z.a+=H.aI(u,c)}return"<"+z.k(0)+">"},
ck:function(a){var z,y,x,w
z=J.y(a)
if(!!z.$isc){y=H.de(z)
if(y!=null)return y}x=z.constructor
if(a==null)return x
if(typeof a!="object")return x
w=H.aO(a)
if(w!=null){w=w.slice()
w.splice(0,0,x)
x=w}return x},
bf:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
aj:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.aO(a)
y=J.y(a)
if(y[b]==null)return!1
return H.eH(H.bf(y[d],z),null,c,null)},
eH:function(a,b,c,d){var z,y
if(c==null)return!0
if(a==null){z=c.length
for(y=0;y<z;++y)if(!H.a6(null,null,c[y],d))return!1
return!0}z=a.length
for(y=0;y<z;++y)if(!H.a6(a[y],b,c[y],d))return!1
return!0},
oj:function(a,b,c){return a.apply(b,H.bf(J.y(b)["$as"+H.e(c)],H.aO(b)))},
a6:function(a,b,c,d){var z,y,x,w,v,u,t,s,r
if(a===c)return!0
if(c==null||c===-1||c.builtin$cls==="b"||c===-2)return!0
if(a===-2)return!0
if(a==null||a===-1||a.builtin$cls==="b"||a===-2){if(typeof c==="number")return!1
if('futureOr' in c)return H.a6(a,b,"type" in c?c.type:null,d)
return!1}if(typeof a==="number")return!1
if(typeof c==="number")return!1
if(a.builtin$cls==="M")return!0
if('func' in c)return H.eA(a,b,c,d)
if('func' in a)return c.builtin$cls==="n8"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
if('futureOr' in c){x="type" in c?c.type:null
if('futureOr' in a)return H.a6("type" in a?a.type:null,b,x,d)
else if(H.a6(a,b,x,d))return!0
else{if(!('$is'+"V" in y.prototype))return!1
w=y.prototype["$as"+"V"]
v=H.bf(w,z?a.slice(1):null)
return H.a6(typeof v==="object"&&v!==null&&v.constructor===Array?v[0]:null,b,x,d)}}u=typeof c==="object"&&c!==null&&c.constructor===Array
t=u?c[0]:c
if(t!==y){s=t.builtin$cls
if(!('$is'+s in y.prototype))return!1
r=y.prototype["$as"+s]}else r=null
if(!u)return!0
z=z?a.slice(1):null
u=c.slice(1)
return H.eH(H.bf(r,z),b,u,d)},
eA:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("bounds" in a){if(!("bounds" in c))return!1
z=a.bounds
y=c.bounds
if(z.length!==y.length)return!1}else if("bounds" in c)return!1
if(!H.a6(a.ret,b,c.ret,d))return!1
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
for(p=0;p<t;++p)if(!H.a6(w[p],d,x[p],b))return!1
for(o=p,n=0;o<s;++n,++o)if(!H.a6(w[o],d,v[n],b))return!1
for(o=0;o<q;++n,++o)if(!H.a6(u[o],d,v[n],b))return!1
m=a.named
l=c.named
if(l==null)return!0
if(m==null)return!1
return H.mb(m,b,l,d)},
mb:function(a,b,c,d){var z,y,x,w
z=Object.getOwnPropertyNames(c)
for(y=z.length,x=0;x<y;++x){w=z[x]
if(!Object.hasOwnProperty.call(a,w))return!1
if(!H.a6(c[w],d,a[w],b))return!1}return!0},
ok:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
m7:function(a){var z,y,x,w,v,u
z=$.eM.$1(a)
y=$.cj[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.cl[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.eG.$2(a,z)
if(z!=null){y=$.cj[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.cl[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.cm(x)
$.cj[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.cl[z]=x
return x}if(v==="-"){u=H.cm(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.eP(a,x)
if(v==="*")throw H.a(P.cd(z))
if(init.leafTags[z]===true){u=H.cm(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.eP(a,x)},
eP:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.di(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
cm:function(a){return J.di(a,!1,null,!!a.$isu)},
ma:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return H.cm(z)
else return J.di(z,c,null,null)},
m3:function(){if(!0===$.dh)return
$.dh=!0
H.m4()},
m4:function(){var z,y,x,w,v,u,t,s
$.cj=Object.create(null)
$.cl=Object.create(null)
H.m_()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.eQ.$1(v)
if(u!=null){t=H.ma(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
m_:function(){var z,y,x,w,v,u,t
z=C.a7()
z=H.bd(C.a4,H.bd(C.a9,H.bd(C.B,H.bd(C.B,H.bd(C.a8,H.bd(C.a5,H.bd(C.a6(C.C),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.eM=new H.m0(v)
$.eG=new H.m1(u)
$.eQ=new H.m2(t)},
bd:function(a,b){return a(b)||b},
me:function(a,b,c){var z=a.indexOf(b,c)
return z>=0},
im:{"^":"b;a,b,c,d,e,f,r,0x",B:{
io:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z=J.bE(z)
y=z[0]
x=z[1]
return new H.im(a,z,(y&2)===2,y>>2,x>>1,(x&1)===1,z[2])}}},
iL:{"^":"b;a,b,c,d,e,f",
a0:function(a){var z,y,x
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
B:{
af:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=H.d([],[P.p])
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.iL(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
cc:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
e6:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
hV:{"^":"U;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.e(this.a)
return"NullError: method not found: '"+z+"' on null"},
B:{
dT:function(a,b){return new H.hV(a,b==null?null:b.method)}}},
hB:{"^":"U;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.e(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.e(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.e(this.a)+")"},
B:{
cN:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.hB(a,y,z?null:b.receiver)}}},
iO:{"^":"U;a",
k:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
dB:{"^":"b;"},
mg:{"^":"c:5;a",
$1:function(a){if(!!J.y(a).$isU)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
es:{"^":"b;a,0b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z},
$isbr:1},
c:{"^":"b;",
k:function(a){return"Closure '"+H.bo(this).trim()+"'"},
gd5:function(){return this},
gd5:function(){return this}},
e_:{"^":"c;"},
iy:{"^":"e_;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+H.cp(z)+"'"}},
cA:{"^":"e_;a,b,c,d",
O:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.cA))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gD:function(a){var z,y
z=this.c
if(z==null)y=H.aZ(this.a)
else y=typeof z!=="object"?J.au(z):H.aZ(z)
return(y^H.aZ(this.b))>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.e(this.d)+"' of "+("Instance of '"+H.bo(z)+"'")},
B:{
cB:function(a){return a.a},
dp:function(a){return a.c},
bW:function(a){var z,y,x,w,v
z=new H.cA("self","target","receiver","name")
y=J.bE(Object.getOwnPropertyNames(z))
for(x=y.length,w=0;w<x;++w){v=y[w]
if(z[v]===a)return v}}}},
fd:{"^":"U;a",
k:function(a){return this.a},
B:{
fe:function(a,b){return new H.fd("CastError: "+H.e(P.cE(a))+": type '"+H.lH(a)+"' is not a subtype of type '"+b+"'")}}},
ir:{"^":"U;a",
k:function(a){return"RuntimeError: "+H.e(this.a)},
B:{
is:function(a){return new H.ir(a)}}},
q:{"^":"b;a,0b,0c,0d",
gaQ:function(){var z=this.b
if(z==null){z=H.eR(this.a)
this.b=z}return z},
k:function(a){return this.gaQ()},
gD:function(a){var z=this.d
if(z==null){z=C.k.gD(this.gaQ())
this.d=z}return z},
O:function(a,b){if(b==null)return!1
return b instanceof H.q&&this.gaQ()===b.gaQ()},
$isbM:1},
c3:{"^":"hK;a,0b,0c,0d,0e,0f,r,$ti",
gi:function(a){return this.a},
gag:function(a){return new H.hD(this,[H.z(this,0)])},
eM:function(a,b){var z,y
if(typeof b==="string"){z=this.b
if(z==null)return!1
return this.c8(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return this.c8(y,b)}else return this.fa(b)},
fa:function(a){var z=this.d
if(z==null)return!1
return this.aW(this.aL(z,this.aV(a)),a)>=0},
h:function(a,b){var z,y,x,w
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.ay(z,b)
x=y==null?null:y.b
return x}else if(typeof b==="number"&&(b&0x3ffffff)===b){w=this.c
if(w==null)return
y=this.ay(w,b)
x=y==null?null:y.b
return x}else return this.fb(b)},
fb:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.aL(z,this.aV(a))
x=this.aW(y,a)
if(x<0)return
return y[x].b},
j:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.bm()
this.b=z}this.bZ(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.bm()
this.c=y}this.bZ(y,b,c)}else this.fd(b,c)},
fd:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.bm()
this.d=z}y=this.aV(a)
x=this.aL(z,y)
if(x==null)this.bu(z,y,[this.bn(a,b)])
else{w=this.aW(x,a)
if(w>=0)x[w].b=b
else x.push(this.bn(a,b))}},
bL:function(a,b,c){var z
if(this.eM(0,b))return this.h(0,b)
z=c.$0()
this.j(0,b,z)
return z},
E:function(a,b){if(typeof b==="string")return this.cn(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cn(this.c,b)
else return this.fc(b)},
fc:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.aL(z,this.aV(a))
x=this.aW(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.cr(w)
return w.b},
q:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.a(P.a_(this))
z=z.c}},
bZ:function(a,b,c){var z=this.ay(a,b)
if(z==null)this.bu(a,b,this.bn(b,c))
else z.b=c},
cn:function(a,b){var z
if(a==null)return
z=this.ay(a,b)
if(z==null)return
this.cr(z)
this.ca(a,b)
return z.b},
cf:function(){this.r=this.r+1&67108863},
bn:function(a,b){var z,y
z=new H.hC(a,b)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.cf()
return z},
cr:function(a){var z,y
z=a.d
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.cf()},
aV:function(a){return J.au(a)&0x3ffffff},
aW:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a2(a[y].a,b))return y
return-1},
k:function(a){return P.dP(this)},
ay:function(a,b){return a[b]},
aL:function(a,b){return a[b]},
bu:function(a,b,c){a[b]=c},
ca:function(a,b){delete a[b]},
c8:function(a,b){return this.ay(a,b)!=null},
bm:function(){var z=Object.create(null)
this.bu(z,"<non-identifier-key>",z)
this.ca(z,"<non-identifier-key>")
return z}},
hC:{"^":"b;a,b,0c,0d"},
hD:{"^":"k;a,$ti",
gi:function(a){return this.a.a},
gN:function(a){var z,y
z=this.a
y=new H.hE(z,z.r)
y.c=z.e
return y}},
hE:{"^":"b;a,b,0c,0d",
gw:function(a){return this.d},
v:function(){var z=this.a
if(this.b!==z.r)throw H.a(P.a_(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
m0:{"^":"c:5;a",
$1:function(a){return this.a(a)}},
m1:{"^":"c:12;a",
$2:function(a,b){return this.a(a,b)}},
m2:{"^":"c;a",
$1:function(a){return this.a(a)}}}],["","",,H,{"^":"",
lU:function(a){return J.dL(a?Object.keys(a):[],null)}}],["","",,H,{"^":"",
mc:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",
d9:function(a){var z,y,x
if(!!J.y(a).$isr)return a
z=a.length
y=new Array(z)
y.fixed$length=Array
for(x=0;x<z;++x)y[x]=a[x]
return y},
hS:function(a){return new Int8Array(H.d9(a))},
ai:function(a,b,c){if(a>>>0!==a||a>=c)throw H.a(H.aM(b,a))},
lt:function(a,b,c){var z
if(!(a>>>0!==a))if(b==null)z=a>c
else z=b>>>0!==b||a>b||b>c
else z=!0
if(z)throw H.a(H.lT(a,b,c))
if(b==null)return c
return b},
dR:{"^":"f;",$isdR:1,$isfa:1,"%":"ArrayBuffer"},
cT:{"^":"f;",$iscT:1,"%":"DataView;ArrayBufferView;cS|em|en|dS|eo|ep|aA"},
cS:{"^":"cT;",
gi:function(a){return a.length},
$isr:1,
$asr:I.bx,
$isu:1,
$asu:I.bx},
dS:{"^":"en;",
h:function(a,b){H.ai(b,a,a.length)
return a[b]},
j:function(a,b,c){H.ai(b,a,a.length)
a[b]=c},
$isk:1,
$ask:function(){return[P.I]},
$asm:function(){return[P.I]},
$isj:1,
$asj:function(){return[P.I]},
$isl:1,
$asl:function(){return[P.I]},
"%":"Float64Array"},
aA:{"^":"ep;",
j:function(a,b,c){H.ai(b,a,a.length)
a[b]=c},
$isk:1,
$ask:function(){return[P.A]},
$asm:function(){return[P.A]},
$isj:1,
$asj:function(){return[P.A]},
$isl:1,
$asl:function(){return[P.A]}},
hR:{"^":"dS;","%":"Float32Array"},
nt:{"^":"aA;",
h:function(a,b){H.ai(b,a,a.length)
return a[b]},
"%":"Int16Array"},
nu:{"^":"aA;",
h:function(a,b){H.ai(b,a,a.length)
return a[b]},
"%":"Int32Array"},
nv:{"^":"aA;",
h:function(a,b){H.ai(b,a,a.length)
return a[b]},
"%":"Int8Array"},
nw:{"^":"aA;",
h:function(a,b){H.ai(b,a,a.length)
return a[b]},
"%":"Uint16Array"},
hT:{"^":"aA;",
h:function(a,b){H.ai(b,a,a.length)
return a[b]},
"%":"Uint32Array"},
nx:{"^":"aA;",
gi:function(a){return a.length},
h:function(a,b){H.ai(b,a,a.length)
return a[b]},
"%":"CanvasPixelArray|Uint8ClampedArray"},
hU:{"^":"aA;",
gi:function(a){return a.length},
h:function(a,b){H.ai(b,a,a.length)
return a[b]},
aa:function(a,b,c){return new Uint8Array(a.subarray(b,H.lt(b,c,a.length)))},
df:function(a,b){return this.aa(a,b,null)},
"%":";Uint8Array"},
em:{"^":"cS+m;"},
en:{"^":"em+dD;"},
eo:{"^":"cS+m;"},
ep:{"^":"eo+dD;"}}],["","",,P,{"^":"",
jI:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.lI()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.aL(new P.jK(z),1)).observe(y,{childList:true})
return new P.jJ(z,y,x)}else if(self.setImmediate!=null)return P.lJ()
return P.lK()},
o7:[function(a){self.scheduleImmediate(H.aL(new P.jL(a),0))},"$1","lI",4,0,10],
o8:[function(a){self.setImmediate(H.aL(new P.jM(a),0))},"$1","lJ",4,0,10],
o9:[function(a){P.cZ(C.a_,a)},"$1","lK",4,0,10],
cZ:function(a,b){var z=C.a.K(a.a,1000)
return P.l9(z<0?0:z,b)},
dE:function(a,b,c){var z
if(a==null)a=new P.c8()
z=$.t
if(z!==C.d)z.toString
z=new P.N(0,z,[c])
z.c_(a,b)
return z},
h3:function(a,b,c){var z=new P.N(0,$.t,[c])
P.iI(a,new P.h4(z,b))
return z},
cH:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
s=[P.l,d]
r=[s]
y=new P.N(0,$.t,r)
z.a=null
z.b=0
z.c=null
z.d=null
x=new P.h6(z,b,!1,y)
try{for(q=a.length,p=0,o=0;p<a.length;a.length===q||(0,H.by)(a),++p){w=a[p]
v=o
w.bQ(new P.h5(z,v,y,b,!1,d),x,null)
o=++z.b}if(o===0){r=new P.N(0,$.t,r)
r.aw(C.ad)
return r}r=new Array(o)
r.fixed$length=Array
z.a=H.d(r,[d])}catch(n){u=H.at(n)
t=H.as(n)
if(z.b===0||!1)return P.dE(u,t,s)
else{z.c=u
z.d=t}}return y},
lw:function(a,b,c){$.t.toString
a.V(b,c)},
lD:function(a,b){if(H.bQ(a,{func:1,args:[P.b,P.br]}))return b.cW(a)
if(H.bQ(a,{func:1,args:[P.b]}))return a
throw H.a(P.cv(a,"onError","Error handler must accept one Object or one Object and a StackTrace as arguments, and return a a valid result"))},
lB:function(){var z,y
for(;z=$.bc,z!=null;){$.bv=null
y=z.b
$.bc=y
if(y==null)$.bu=null
z.a.$0()}},
oi:[function(){$.db=!0
try{P.lB()}finally{$.bv=null
$.db=!1
if($.bc!=null)$.$get$d5().$1(P.eJ())}},"$0","eJ",0,0,3],
eE:function(a){var z=new P.ec(a)
if($.bc==null){$.bu=z
$.bc=z
if(!$.db)$.$get$d5().$1(P.eJ())}else{$.bu.b=z
$.bu=z}},
lG:function(a){var z,y,x
z=$.bc
if(z==null){P.eE(a)
$.bv=$.bu
return}y=new P.ec(a)
x=$.bv
if(x==null){y.b=z
$.bv=y
$.bc=y}else{y.b=x.b
x.b=y
$.bv=y
if(y.b==null)$.bu=y}},
eS:function(a){var z=$.t
if(C.d===z){P.aH(null,null,C.d,a)
return}z.toString
P.aH(null,null,z,z.bw(a))},
dY:function(a,b,c,d,e,f){return e?new P.l4(0,b,c,d,a,[f]):new P.jN(0,b,c,d,a,[f])},
bP:function(a){return},
lC:[function(a,b){var z=$.t
z.toString
P.bO(null,null,z,a,b)},function(a){return P.lC(a,null)},"$2","$1","lL",4,2,7],
oh:[function(){},"$0","eI",0,0,3],
iI:function(a,b){var z=$.t
if(z===C.d){z.toString
return P.cZ(a,b)}return P.cZ(a,z.bw(b))},
bO:function(a,b,c,d,e){var z={}
z.a=d
P.lG(new P.lE(z,e))},
eC:function(a,b,c,d){var z,y
y=$.t
if(y===c)return d.$0()
$.t=c
z=y
try{y=d.$0()
return y}finally{$.t=z}},
eD:function(a,b,c,d,e){var z,y
y=$.t
if(y===c)return d.$1(e)
$.t=c
z=y
try{y=d.$1(e)
return y}finally{$.t=z}},
lF:function(a,b,c,d,e,f){var z,y
y=$.t
if(y===c)return d.$2(e,f)
$.t=c
z=y
try{y=d.$2(e,f)
return y}finally{$.t=z}},
aH:function(a,b,c,d){var z=C.d!==c
if(z)d=!(!z||!1)?c.bw(d):c.eC(d)
P.eE(d)},
jK:{"^":"c:6;a",
$1:function(a){var z,y
z=this.a
y=z.a
z.a=null
y.$0()}},
jJ:{"^":"c;a,b,c",
$1:function(a){var z,y
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
jL:{"^":"c;a",
$0:function(){this.a.$0()}},
jM:{"^":"c;a",
$0:function(){this.a.$0()}},
l8:{"^":"b;a,0b,c",
dB:function(a,b){if(self.setTimeout!=null)this.b=self.setTimeout(H.aL(new P.la(this,b),0),a)
else throw H.a(P.i("`setTimeout()` not found."))},
B:{
l9:function(a,b){var z=new P.l8(!0,0)
z.dB(a,b)
return z}}},
la:{"^":"c;a,b",
$0:function(){var z=this.a
z.b=null
z.c=1
this.b.$0()}},
ee:{"^":"d6;a,$ti"},
jV:{"^":"eg;dx,0dy,0fr,x,0a,0b,0c,d,e,0f,0r",
bo:function(){},
bp:function(){}},
jU:{"^":"b;ac:c<,$ti",
gce:function(){return this.c<4},
dT:function(){var z=this.r
if(z!=null)return z
z=new P.N(0,$.t,[null])
this.r=z
return z},
ec:function(a){var z,y
z=a.fr
y=a.dy
if(z==null)this.d=y
else z.dy=y
if(y==null)this.e=z
else y.fr=z
a.fr=a
a.dy=a},
cp:function(a,b,c,d){var z,y,x
if((this.c&4)!==0){if(c==null)c=P.eI()
z=new P.k6($.t,0,c)
z.ef()
return z}z=$.t
y=new P.jV(0,this,z,d?1:0)
y.bX(a,b,c,d)
y.fr=y
y.dy=y
y.dx=this.c&1
x=this.e
this.e=y
y.dy=null
y.fr=x
if(x==null)this.d=y
else x.dy=y
if(this.d===y)P.bP(this.a)
return y},
ck:function(a){var z
if(a.dy===a)return
z=a.dx
if((z&2)!==0)a.dx=z|4
else{this.ec(a)
if((this.c&2)===0&&this.d==null)this.dJ()}return},
cl:function(a){},
cm:function(a){},
bY:function(){if((this.c&4)!==0)return new P.b2("Cannot add new events after calling close")
return new P.b2("Cannot add new events while doing an addStream")},
l:function(a,b){if(!this.gce())throw H.a(this.bY())
this.ab(b)},
eH:function(a){var z
if((this.c&4)!==0)return this.r
if(!this.gce())throw H.a(this.bY())
this.c|=4
z=this.dT()
this.aP()
return z},
dJ:function(){if((this.c&4)!==0&&this.r.a===0)this.r.aw(null)
P.bP(this.b)}},
eb:{"^":"jU;a,b,c,0d,0e,0f,0r,$ti",
ab:function(a){var z
for(z=this.d;z!=null;z=z.dy)z.aJ(new P.cf(a))},
aP:function(){var z=this.d
if(z!=null)for(;z!=null;z=z.dy)z.aJ(C.Y)
else this.r.aw(null)}},
V:{"^":"b;$ti"},
h4:{"^":"c;a,b",
$0:function(){var z,y,x,w
try{x=this.b.$0()
this.a.aK(x)}catch(w){z=H.at(w)
y=H.as(w)
P.lw(this.a,z,y)}}},
h6:{"^":"c:2;a,b,c,d",
$2:function(a,b){var z,y
z=this.a
y=--z.b
if(z.a!=null){z.a=null
if(z.b===0||this.c)this.d.V(a,b)
else{z.c=a
z.d=b}}else if(y===0&&!this.c)this.d.V(z.c,z.d)}},
h5:{"^":"c;a,b,c,d,e,f",
$1:function(a){var z,y,x
z=this.a
y=--z.b
x=z.a
if(x!=null){x[this.b]=a
if(y===0)this.c.c5(x)}else if(z.b===0&&!this.e)this.c.V(z.c,z.d)},
$S:function(){return{func:1,ret:P.M,args:[this.f]}}},
ef:{"^":"b;$ti",
eJ:[function(a,b){if(a==null)a=new P.c8()
if(this.a.a!==0)throw H.a(P.bs("Future already completed"))
$.t.toString
this.V(a,b)},function(a){return this.eJ(a,null)},"cA","$2","$1","gcz",4,2,7]},
ed:{"^":"ef;a,$ti",
aA:function(a,b){var z=this.a
if(z.a!==0)throw H.a(P.bs("Future already completed"))
z.aw(b)},
V:function(a,b){this.a.c_(a,b)}},
ev:{"^":"ef;a,$ti",
aA:function(a,b){var z=this.a
if(z.a!==0)throw H.a(P.bs("Future already completed"))
z.aK(b)},
V:function(a,b){this.a.V(a,b)}},
ei:{"^":"b;0a,b,c,d,e",
ff:function(a){if(this.c!==6)return!0
return this.b.b.bP(this.d,a.a)},
f5:function(a){var z,y
z=this.e
y=this.b.b
if(H.bQ(z,{func:1,args:[P.b,P.br]}))return y.fs(z,a.a,a.b)
else return y.bP(z,a.a)}},
N:{"^":"b;ac:a<,b,0ee:c<,$ti",
bQ:function(a,b,c){var z=$.t
if(z!==C.d){z.toString
if(b!=null)b=P.lD(b,z)}return this.ep(a,b,c)},
X:function(a,b){return this.bQ(a,null,b)},
ep:function(a,b,c){var z=new P.N(0,$.t,[c])
this.be(new P.ei(z,b==null?1:3,a,b))
return z},
d3:function(a){var z,y
z=$.t
y=new P.N(0,z,this.$ti)
if(z!==C.d)z.toString
this.be(new P.ei(y,8,a,null))
return y},
be:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){z=this.c
y=z.a
if(y<4){z.be(a)
return}this.a=y
this.c=z.c}z=this.b
z.toString
P.aH(null,null,z,new P.ke(this,a))}},
ci:function(a){var z,y,x,w,v,u
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;v=w.a,v!=null;w=v);w.a=x}}else{if(y===2){y=this.c
u=y.a
if(u<4){y.ci(a)
return}this.a=u
this.c=y.c}z.a=this.aO(a)
y=this.b
y.toString
P.aH(null,null,y,new P.kl(z,this))}},
aN:function(){var z=this.c
this.c=null
return this.aO(z)},
aO:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.a
z.a=y}return y},
aK:function(a){var z,y
z=this.$ti
if(H.aj(a,"$isV",z,"$asV"))if(H.aj(a,"$isN",z,null))P.cg(a,this)
else P.ej(a,this)
else{y=this.aN()
this.a=4
this.c=a
P.bb(this,y)}},
c5:function(a){var z=this.aN()
this.a=4
this.c=a
P.bb(this,z)},
V:[function(a,b){var z=this.aN()
this.a=8
this.c=new P.bV(a,b)
P.bb(this,z)},function(a){return this.V(a,null)},"fF","$2","$1","gdQ",4,2,7],
aw:function(a){var z
if(H.aj(a,"$isV",this.$ti,"$asV")){this.dL(a)
return}this.a=1
z=this.b
z.toString
P.aH(null,null,z,new P.kg(this,a))},
dL:function(a){var z
if(H.aj(a,"$isN",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.aH(null,null,z,new P.kk(this,a))}else P.cg(a,this)
return}P.ej(a,this)},
c_:function(a,b){var z
this.a=1
z=this.b
z.toString
P.aH(null,null,z,new P.kf(this,a,b))},
$isV:1,
B:{
kd:function(a,b,c){var z=new P.N(0,b,[c])
z.a=4
z.c=a
return z},
ej:function(a,b){var z,y,x
b.a=1
try{a.bQ(new P.kh(b),new P.ki(b),null)}catch(x){z=H.at(x)
y=H.as(x)
P.eS(new P.kj(b,z,y))}},
cg:function(a,b){var z,y
for(;z=a.a,z===2;)a=a.c
if(z>=4){y=b.aN()
b.a=a.a
b.c=a.c
P.bb(b,y)}else{y=b.c
b.a=2
b.c=a
a.ci(y)}},
bb:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=v.a
v=v.b
y.toString
P.bO(null,null,y,u,v)}return}for(;t=b.a,t!=null;b=t){b.a=null
P.bb(z.a,b)}y=z.a
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
P.bO(null,null,y,v,u)
return}p=$.t
if(p==null?r!=null:p!==r)$.t=r
else p=null
y=b.c
if(y===8)new P.ko(z,x,b,w).$0()
else if(v){if((y&1)!==0)new P.kn(x,b,s).$0()}else if((y&2)!==0)new P.km(z,x,b).$0()
if(p!=null)$.t=p
y=x.b
if(!!J.y(y).$isV){if(y.a>=4){o=u.c
u.c=null
b=u.aO(o)
u.a=y.a
u.c=y.c
z.a=y
continue}else P.cg(y,u)
return}}n=b.b
o=n.c
n.c=null
b=n.aO(o)
y=x.a
v=x.b
if(!y){n.a=4
n.c=v}else{n.a=8
n.c=v}z.a=n
y=n}}}},
ke:{"^":"c;a,b",
$0:function(){P.bb(this.a,this.b)}},
kl:{"^":"c;a,b",
$0:function(){P.bb(this.b,this.a.a)}},
kh:{"^":"c:6;a",
$1:function(a){var z=this.a
z.a=0
z.aK(a)}},
ki:{"^":"c:13;a",
$2:function(a,b){this.a.V(a,b)},
$1:function(a){return this.$2(a,null)}},
kj:{"^":"c;a,b,c",
$0:function(){this.a.V(this.b,this.c)}},
kg:{"^":"c;a,b",
$0:function(){this.a.c5(this.b)}},
kk:{"^":"c;a,b",
$0:function(){P.cg(this.b,this.a)}},
kf:{"^":"c;a,b,c",
$0:function(){this.a.V(this.b,this.c)}},
ko:{"^":"c;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{w=this.c
z=w.b.b.d_(w.d)}catch(v){y=H.at(v)
x=H.as(v)
if(this.d){w=this.a.a.c.a
u=y
u=w==null?u==null:w===u
w=u}else w=!1
u=this.b
if(w)u.b=this.a.a.c
else u.b=new P.bV(y,x)
u.a=!0
return}if(!!J.y(z).$isV){if(z instanceof P.N&&z.gac()>=4){if(z.gac()===8){w=this.b
w.b=z.gee()
w.a=!0}return}t=this.a.a
w=this.b
w.b=z.X(new P.kp(t),null)
w.a=!1}}},
kp:{"^":"c:14;a",
$1:function(a){return this.a}},
kn:{"^":"c;a,b,c",
$0:function(){var z,y,x,w
try{x=this.b
this.a.b=x.b.b.bP(x.d,this.c)}catch(w){z=H.at(w)
y=H.as(w)
x=this.a
x.b=new P.bV(z,y)
x.a=!0}}},
km:{"^":"c;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.ff(z)&&w.e!=null){v=this.b
v.b=w.f5(z)
v.a=!1}}catch(u){y=H.at(u)
x=H.as(u)
w=this.a.a.c
v=w.a
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w
else s.b=new P.bV(y,x)
s.a=!0}}},
ec:{"^":"b;a,0b"},
cW:{"^":"b;$ti",
gi:function(a){var z,y
z={}
y=new P.N(0,$.t,[P.A])
z.a=0
this.bI(new P.iB(z,this),!0,new P.iC(z,y),y.gdQ())
return y}},
iB:{"^":"c;a,b",
$1:function(a){++this.a.a},
$S:function(){return{func:1,ret:P.M,args:[H.al(this.b,"cW",0)]}}},
iC:{"^":"c;a,b",
$0:function(){this.b.aK(this.a.a)}},
iA:{"^":"b;"},
et:{"^":"b;ac:b<,$ti",
ge8:function(){if((this.b&8)===0)return this.a
return this.a.gb4()},
dU:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.eu(0)
this.a=z}return z}y=this.a
y.gb4()
return y.gb4()},
gcq:function(){if((this.b&8)!==0)return this.a.gb4()
return this.a},
dH:function(){if((this.b&4)!==0)return new P.b2("Cannot add event after closing")
return new P.b2("Cannot add event while adding a stream")},
l:function(a,b){var z=this.b
if(z>=4)throw H.a(this.dH())
if((z&1)!==0)this.ab(b)
else if((z&3)===0)this.dU().l(0,new P.cf(b))},
cp:function(a,b,c,d){var z,y,x,w
if((this.b&3)!==0)throw H.a(P.bs("Stream has already been listened to."))
z=$.t
y=new P.eg(this,z,d?1:0)
y.bX(a,b,c,d)
x=this.ge8()
z=this.b|=1
if((z&8)!==0){w=this.a
w.sb4(y)
w.fp(0)}else this.a=y
y.eh(x)
y.dZ(new P.kY(this))
return y},
ck:function(a){var z,y
z=null
if((this.b&8)!==0)z=C.r.fQ(this.a)
this.a=null
this.b=this.b&4294967286|2
y=new P.kX(this)
if(z!=null)z=z.d3(y)
else y.$0()
return z},
cl:function(a){if((this.b&8)!==0)C.r.fX(this.a)
P.bP(this.e)},
cm:function(a){if((this.b&8)!==0)C.r.fp(this.a)
P.bP(this.f)}},
kY:{"^":"c;a",
$0:function(){P.bP(this.a.d)}},
kX:{"^":"c;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.aw(null)}},
l5:{"^":"b;",
ab:function(a){this.gcq().dG(0,a)}},
jO:{"^":"b;",
ab:function(a){this.gcq().aJ(new P.cf(a))}},
jN:{"^":"et+jO;0a,b,0c,d,e,f,r,$ti"},
l4:{"^":"et+l5;0a,b,0c,d,e,f,r,$ti"},
d6:{"^":"kZ;a,$ti",
gD:function(a){return(H.aZ(this.a)^892482866)>>>0},
O:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.d6))return!1
return b.a===this.a}},
eg:{"^":"jW;x,0a,0b,0c,d,e,0f,0r",
cg:function(){return this.x.ck(this)},
bo:function(){this.x.cl(this)},
bp:function(){this.x.cm(this)}},
jW:{"^":"b;ac:e<",
bX:function(a,b,c,d){var z,y
z=this.d
z.toString
this.a=a
y=b==null?P.lL():b
if(H.bQ(y,{func:1,ret:-1,args:[P.b,P.br]}))this.b=z.cW(y)
else if(H.bQ(y,{func:1,ret:-1,args:[P.b]}))this.b=y
else H.a8(P.aQ("handleError callback must take either an Object (the error), or both an Object (the error) and a StackTrace."))
this.c=c==null?P.eI():c},
eh:function(a){if(a==null)return
this.r=a
if(a.c!=null){this.e=(this.e|64)>>>0
a.b9(this)}},
dK:function(){var z,y
z=(this.e|8)>>>0
this.e=z
if((z&64)!==0){y=this.r
if(y.a===1)y.a=3}if((z&32)===0)this.r=null
this.f=this.cg()},
dG:function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.ab(b)
else this.aJ(new P.cf(b))},
bo:function(){},
bp:function(){},
cg:function(){return},
aJ:function(a){var z,y
z=this.r
if(z==null){z=new P.eu(0)
this.r=z}z.l(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.b9(this)}},
ab:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.d0(this.a,a)
this.e=(this.e&4294967263)>>>0
this.c0((z&4)!==0)},
aP:function(){var z,y
z=new P.jX(this)
this.dK()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.y(y).$isV&&y!==$.$get$dF())y.d3(z)
else z.$0()},
dZ:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.c0((z&4)!==0)},
c0:function(a){var z,y,x
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
if(x)this.bo()
else this.bp()
z=(this.e&4294967263)>>>0
this.e=z}if((z&64)!==0&&z<128)this.r.b9(this)}},
jX:{"^":"c;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.bO(z.c)
z.e=(z.e&4294967263)>>>0}},
kZ:{"^":"cW;",
bI:function(a,b,c,d){return this.a.cp(a,d,c,!0===b)},
bH:function(a){return this.bI(a,null,null,null)}},
k1:{"^":"b;0aZ:a*"},
cf:{"^":"k1;A:b>,0a",
cU:function(a){a.ab(this.b)}},
k0:{"^":"b;",
cU:function(a){a.aP()},
gaZ:function(a){return},
saZ:function(a,b){throw H.a(P.bs("No events after a done."))}},
kI:{"^":"b;ac:a<",
b9:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.eS(new P.kJ(this,a))
this.a=1}},
kJ:{"^":"c;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gaZ(x)
z.b=w
if(w==null)z.c=null
x.cU(this.b)}},
eu:{"^":"kI;0b,0c,a",
l:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.saZ(0,b)
this.c=b}}},
k6:{"^":"b;a,ac:b<,c",
ef:function(){if((this.b&2)!==0)return
var z=this.a
z.toString
P.aH(null,null,z,this.geg())
this.b=(this.b|2)>>>0},
aP:[function(){var z=(this.b&4294967293)>>>0
this.b=z
if(z>=4)return
this.b=(z|1)>>>0
this.a.bO(this.c)},"$0","geg",0,0,3]},
bV:{"^":"b;a,b",
k:function(a){return H.e(this.a)},
$isU:1},
li:{"^":"b;"},
lE:{"^":"c;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.c8()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.a(z)
x=H.a(z)
x.stack=y.k(0)
throw x}},
kN:{"^":"li;",
bO:function(a){var z,y,x
try{if(C.d===$.t){a.$0()
return}P.eC(null,null,this,a)}catch(x){z=H.at(x)
y=H.as(x)
P.bO(null,null,this,z,y)}},
fv:function(a,b){var z,y,x
try{if(C.d===$.t){a.$1(b)
return}P.eD(null,null,this,a,b)}catch(x){z=H.at(x)
y=H.as(x)
P.bO(null,null,this,z,y)}},
d0:function(a,b){return this.fv(a,b,null)},
eD:function(a){return new P.kP(this,a)},
eC:function(a){return this.eD(a,null)},
bw:function(a){return new P.kO(this,a)},
eE:function(a,b){return new P.kQ(this,a,b)},
h:function(a,b){return},
fq:function(a){if($.t===C.d)return a.$0()
return P.eC(null,null,this,a)},
d_:function(a){return this.fq(a,null)},
fu:function(a,b){if($.t===C.d)return a.$1(b)
return P.eD(null,null,this,a,b)},
bP:function(a,b){return this.fu(a,b,null,null)},
ft:function(a,b,c){if($.t===C.d)return a.$2(b,c)
return P.lF(null,null,this,a,b,c)},
fs:function(a,b,c){return this.ft(a,b,c,null,null,null)},
fn:function(a){return a},
cW:function(a){return this.fn(a,null,null,null)}},
kP:{"^":"c;a,b",
$0:function(){return this.a.d_(this.b)}},
kO:{"^":"c;a,b",
$0:function(){return this.a.bO(this.b)}},
kQ:{"^":"c;a,b,c",
$1:function(a){return this.a.d0(this.b,a)},
$S:function(){return{func:1,ret:-1,args:[this.c]}}}}],["","",,P,{"^":"",
hF:function(a,b,c,d,e){return new H.c3(0,0,[d,e])},
c4:function(a,b,c){return H.lV(a,new H.c3(0,0,[b,c]))},
O:function(a,b){return new H.c3(0,0,[a,b])},
hG:function(){return new H.c3(0,0,[null,null])},
hH:function(a,b,c,d){return new P.kx(0,0,[d])},
dJ:function(a,b,c){var z,y
if(P.dc(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bw()
y.push(a)
try{P.ly(a,z)}finally{y.pop()}y=P.dZ(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
cJ:function(a,b,c){var z,y,x
if(P.dc(a))return b+"..."+c
z=new P.cX(b)
y=$.$get$bw()
y.push(a)
try{x=z
x.a=P.dZ(x.gan(),a,", ")}finally{y.pop()}y=z
y.a=y.gan()+c
y=z.gan()
return y.charCodeAt(0)==0?y:y},
dc:function(a){var z,y
for(z=0;y=$.$get$bw(),z<y.length;++z)if(a===y[z])return!0
return!1},
ly:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=J.a0(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.v())return
w=H.e(z.gw(z))
b.push(w)
y+=w.length+2;++x}if(!z.v()){if(x<=5)return
v=b.pop()
u=b.pop()}else{t=z.gw(z);++x
if(!z.v()){if(x<=4){b.push(H.e(t))
return}v=H.e(t)
u=b.pop()
y+=v.length+2}else{s=z.gw(z);++x
for(;z.v();t=s,s=r){r=z.gw(z);++x
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
hI:function(a,b){var z,y
z=P.hH(null,null,null,b)
for(y=0;y<5;++y)z.l(0,a[y])
return z},
dP:function(a){var z,y,x
z={}
if(P.dc(a))return"{...}"
y=new P.cX("")
try{$.$get$bw().push(a)
x=y
x.a=x.gan()+"{"
z.a=!0
J.bT(a,new P.hM(z,y))
z=y
z.a=z.gan()+"}"}finally{$.$get$bw().pop()}z=y.gan()
return z.charCodeAt(0)==0?z:z},
nl:[function(a){return a},"$1","lN",4,0,5],
hL:function(a,b,c,d){var z,y
for(z=0;z<2;++z){y=b[z]
a.j(0,P.lN().$1(y),d.$1(y))}},
kx:{"^":"kq;a,0b,0c,0d,0e,0f,r,$ti",
gN:function(a){var z=new P.kz(this,this.r)
z.c=this.e
return z},
gi:function(a){return this.a},
eK:function(a,b){var z
if(typeof b==="number"&&(b&0x3ffffff)===b){z=this.c
if(z==null)return!1
return z[b]!=null}else return this.dR(b)},
dR:function(a){var z=this.d
if(z==null)return!1
return this.bk(this.cb(z,a),a)>=0},
l:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.d7()
this.b=z}return this.c1(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.d7()
this.c=y}return this.c1(y,b)}else return this.dO(0,b)},
dO:function(a,b){var z,y,x
z=this.d
if(z==null){z=P.d7()
this.d=z}y=this.c6(b)
x=z[y]
if(x==null)z[y]=[this.bg(b)]
else{if(this.bk(x,b)>=0)return!1
x.push(this.bg(b))}return!0},
E:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.c3(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.c3(this.c,b)
else return this.dP(0,b)},
dP:function(a,b){var z,y,x
z=this.d
if(z==null)return!1
y=this.cb(z,b)
x=this.bk(y,b)
if(x<0)return!1
this.c4(y.splice(x,1)[0])
return!0},
c1:function(a,b){if(a[b]!=null)return!1
a[b]=this.bg(b)
return!0},
c3:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.c4(z)
delete a[b]
return!0},
c2:function(){this.r=this.r+1&67108863},
bg:function(a){var z,y
z=new P.ky(a)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.c2()
return z},
c4:function(a){var z,y
z=a.c
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.c2()},
c6:function(a){return J.au(a)&0x3ffffff},
cb:function(a,b){return a[this.c6(b)]},
bk:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a2(a[y].a,b))return y
return-1},
B:{
d7:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
ky:{"^":"b;a,0b,0c"},
kz:{"^":"b;a,b,0c,0d",
gw:function(a){return this.d},
v:function(){var z=this.a
if(this.b!==z.r)throw H.a(P.a_(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
kq:{"^":"it;"},
c2:{"^":"b;$ti",
q:function(a,b){var z
for(z=this.gN(this);z.v();)b.$1(z.gw(z))},
gi:function(a){var z,y
z=this.gN(this)
for(y=0;z.v();)++y
return y},
k:function(a){return P.dJ(this,"(",")")}},
m:{"^":"b;$ti",
gN:function(a){return new H.dO(a,this.gi(a),0)},
C:function(a,b){return this.h(a,b)},
q:function(a,b){var z,y
z=this.gi(a)
for(y=0;y<z;++y){b.$1(this.h(a,y))
if(z!==this.gi(a))throw H.a(P.a_(a))}},
bG:function(a,b,c){var z,y,x
z=this.gi(a)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.h(a,x))
if(z!==this.gi(a))throw H.a(P.a_(a))}return y},
l:function(a,b){var z=this.gi(a)
this.si(a,z+1)
this.j(a,z,b)},
E:function(a,b){var z
for(z=0;z<this.gi(a);++z)if(J.a2(this.h(a,z),b)){this.dM(a,z,z+1)
return!0}return!1},
dM:function(a,b,c){var z,y,x
z=this.gi(a)
y=c-b
for(x=c;x<z;++x)this.j(a,x-y,this.h(a,x))
this.si(a,z-y)},
ad:function(a){this.si(a,0)},
n:function(a,b){var z=H.d([],[H.lX(this,a,"m",0)])
C.b.si(z,C.a.n(this.gi(a),b.gi(b)))
C.b.av(z,0,this.gi(a),a)
C.b.av(z,this.gi(a),z.length,b)
return z},
eZ:function(a,b,c,d){var z
P.dV(b,c,this.gi(a),null,null,null)
for(z=b;z<c;++z)this.j(a,z,d)},
k:function(a){return P.cJ(a,"[","]")}},
hK:{"^":"a5;"},
hM:{"^":"c:2;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.e(a)
z.a=y+": "
z.a+=H.e(b)}},
a5:{"^":"b;$ti",
q:function(a,b){var z,y
for(z=J.a0(this.gag(a));z.v();){y=z.gw(z)
b.$2(y,this.h(a,y))}},
gi:function(a){return J.an(this.gag(a))},
k:function(a){return P.dP(a)},
$isP:1},
iu:{"^":"b;$ti",
k:function(a){return P.cJ(this,"{","}")},
$isk:1,
$isj:1},
it:{"^":"iu;"}}],["","",,P,{"^":"",
fT:function(a){if(a instanceof H.c)return a.k(0)
return"Instance of '"+H.bo(a)+"'"},
c5:function(a,b,c,d){var z,y,x
z=J.hz(a,d)
if(a!==0&&!0)for(y=z.length,x=0;x<y;++x)z[x]=b
return z},
cQ:function(a,b,c){var z,y
z=H.d([],[c])
for(y=J.a0(a);y.v();)z.push(y.gw(y))
return z},
cE:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.bU(a)
if(typeof a==="string")return JSON.stringify(a)
return P.fT(a)},
hJ:function(a,b,c,d){var z,y,x
z=new Array(a)
z.fixed$length=Array
y=H.d(z,[d])
for(x=0;x<a;++x)y[x]=b.$1(x)
return y},
aJ:{"^":"b;"},
"+bool":0,
bY:{"^":"b;a,b",
l:function(a,b){return P.fx(C.a.n(this.a,b.gfT()),!0)},
gcS:function(){return this.a},
O:function(a,b){if(b==null)return!1
if(!(b instanceof P.bY))return!1
return this.a===b.a&&!0},
gD:function(a){var z=this.a
return(z^C.a.bv(z,30))&1073741823},
k:function(a){var z,y,x,w,v,u,t,s
z=P.fy(H.i7(this))
y=P.bB(H.i5(this))
x=P.bB(H.i1(this))
w=P.bB(H.i2(this))
v=P.bB(H.i4(this))
u=P.bB(H.i6(this))
t=P.fz(H.i3(this))
s=z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t+"Z"
return s},
B:{
fx:function(a,b){var z,y
z=new P.bY(a,!0)
if(Math.abs(a)<=864e13)y=!1
else y=!0
if(y)H.a8(P.aQ("DateTime is outside valid range: "+z.gcS()))
return z},
fy:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+z
if(z>=10)return y+"00"+z
return y+"000"+z},
fz:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bB:function(a){if(a>=10)return""+a
return"0"+a}}},
I:{"^":"C;"},
"+double":0,
ay:{"^":"b;a",
n:function(a,b){return new P.ay(this.a+b.a)},
a4:function(a,b){return new P.ay(this.a-b.a)},
bU:function(a,b){return new P.ay(C.a.W(this.a*b))},
am:function(a,b){return this.a<b.a},
b8:function(a,b){return C.a.b8(this.a,b.gfG())},
au:function(a,b){return this.a<=b.a},
O:function(a,b){if(b==null)return!1
if(!(b instanceof P.ay))return!1
return this.a===b.a},
gD:function(a){return this.a&0x1FFFFFFF},
k:function(a){var z,y,x,w,v
z=new P.fL()
y=this.a
if(y<0)return"-"+new P.ay(0-y).k(0)
x=z.$1(C.a.K(y,6e7)%60)
w=z.$1(C.a.K(y,1e6)%60)
v=new P.fK().$1(y%1e6)
return""+C.a.K(y,36e8)+":"+H.e(x)+":"+H.e(w)+"."+H.e(v)},
aH:function(a){return new P.ay(0-this.a)}},
fK:{"^":"c;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
fL:{"^":"c;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
U:{"^":"b;"},
c8:{"^":"U;",
k:function(a){return"Throw of null."}},
av:{"^":"U;a,b,c,d",
gbj:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gbi:function(){return""},
k:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.e(z)
w=this.gbj()+y+x
if(!this.a)return w
v=this.gbi()
u=P.cE(this.b)
return w+v+": "+H.e(u)},
B:{
aQ:function(a){return new P.av(!1,null,null,a)},
cv:function(a,b,c){return new P.av(!0,a,b,c)}}},
ca:{"^":"av;e,f,a,b,c,d",
gbj:function(){return"RangeError"},
gbi:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.e(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.e(z)
else if(x>z)y=": Not in range "+H.e(z)+".."+H.e(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.e(z)}return y},
B:{
cU:function(a,b,c){return new P.ca(null,null,!0,a,b,"Value not in range")},
ap:function(a,b,c,d,e){return new P.ca(b,c,!0,a,d,"Invalid value")},
dV:function(a,b,c,d,e,f){if(0>a||a>c)throw H.a(P.ap(a,0,c,"start",f))
if(a>b||b>c)throw H.a(P.ap(b,a,c,"end",f))
return b}}},
hw:{"^":"av;e,i:f>,a,b,c,d",
gbj:function(){return"RangeError"},
gbi:function(){if(J.cq(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.e(z)},
B:{
E:function(a,b,c,d,e){var z=e!=null?e:J.an(b)
return new P.hw(b,z,!0,a,c,"Index out of range")}}},
iP:{"^":"U;a",
k:function(a){return"Unsupported operation: "+this.a},
B:{
i:function(a){return new P.iP(a)}}},
iN:{"^":"U;a",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"},
B:{
cd:function(a){return new P.iN(a)}}},
b2:{"^":"U;a",
k:function(a){return"Bad state: "+this.a},
B:{
bs:function(a){return new P.b2(a)}}},
fo:{"^":"U;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.e(P.cE(z))+"."},
B:{
a_:function(a){return new P.fo(a)}}},
dX:{"^":"b;",
k:function(a){return"Stack Overflow"},
$isU:1},
fw:{"^":"U;a",
k:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+z+"' during its initialization"}},
ka:{"^":"b;a",
k:function(a){return"Exception: "+this.a}},
A:{"^":"C;"},
"+int":0,
j:{"^":"b;$ti",
f1:function(a,b){var z=H.al(this,"j",0)
if(H.aj(this,"$isk",[z],"$ask"))return H.cG(this,b,z)
return new H.cF(this,b,[z])},
b5:["dm",function(a,b){return new H.aG(this,b,[H.al(this,"j",0)])}],
cG:function(a,b,c){return new H.c0(this,b,[H.al(this,"j",0),c])},
q:function(a,b){var z
for(z=this.gN(this);z.v();)b.$1(z.gw(z))},
gi:function(a){var z,y
z=this.gN(this)
for(y=0;z.v();)++y
return y},
C:function(a,b){var z,y,x
if(b<0)H.a8(P.ap(b,0,null,"index",null))
for(z=this.gN(this),y=0;z.v();){x=z.gw(z)
if(b===y)return x;++y}throw H.a(P.E(b,this,"index",null,y))},
k:function(a){return P.dJ(this,"(",")")}},
dK:{"^":"b;"},
l:{"^":"b;$ti",$isk:1,$isj:1},
"+List":0,
P:{"^":"b;$ti"},
M:{"^":"b;",
gD:function(a){return P.b.prototype.gD.call(this,this)},
k:function(a){return"null"}},
"+Null":0,
C:{"^":"b;"},
"+num":0,
b:{"^":";",
O:function(a,b){return this===b},
gD:function(a){return H.aZ(this)},
k:function(a){return"Instance of '"+H.bo(this)+"'"},
gG:function(a){return new H.q(H.ck(this))},
toString:function(){return this.k(this)}},
br:{"^":"b;"},
p:{"^":"b;"},
"+String":0,
cX:{"^":"b;an:a<",
gi:function(a){return this.a.length},
k:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
B:{
dZ:function(a,b,c){var z=J.a0(b)
if(!z.v())return a
if(c.length===0){do a+=H.e(z.gw(z))
while(z.v())}else{a+=H.e(z.gw(z))
for(;z.v();)a=a+c+H.e(z.gw(z))}return a}}},
bM:{"^":"b;"}}],["","",,W,{"^":"",
dG:function(a,b,c){return W.hu(a,null,null,b,null,null,null,c).X(new W.ht(),P.p)},
hu:function(a,b,c,d,e,f,g,h){var z,y,x,w
z=W.cI
y=new P.N(0,$.t,[z])
x=new P.ed(y,[z])
w=new XMLHttpRequest()
C.a2.fj(w,"GET",a,!0)
if(f!=null)w.responseType=f
W.S(w,"load",new W.hv(w,x),!1)
W.S(w,"error",x.gcz(),!1)
w.send()
return y},
iZ:function(a,b){return new WebSocket(a)},
ch:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
el:function(a,b,c,d){var z,y
z=W.ch(W.ch(W.ch(W.ch(0,a),b),c),d)
y=536870911&z+((67108863&z)<<3)
y^=y>>>11
return 536870911&y+((16383&y)<<15)},
ez:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.k_(a)
if(!!J.y(z).$isK)return z
return}else return a},
eF:function(a,b){var z=$.t
if(z===C.d)return a
return z.eE(a,b)},
W:{"^":"c_;","%":"HTMLAudioElement|HTMLBRElement|HTMLBaseElement|HTMLBodyElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLEmbedElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLFrameSetElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLIFrameElement|HTMLImageElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMediaElement|HTMLMenuElement|HTMLMetaElement|HTMLModElement|HTMLOListElement|HTMLObjectElement|HTMLOptGroupElement|HTMLParagraphElement|HTMLPictureElement|HTMLPreElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSlotElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTimeElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|HTMLVideoElement;HTMLElement"},
mh:{"^":"cV;0m:x=,0p:y=","%":"Accelerometer|LinearAccelerationSensor"},
mi:{"^":"f;0i:length=",
E:function(a,b){return a.remove(b)},
"%":"AccessibleNodeList"},
mj:{"^":"W;",
k:function(a){return String(a)},
"%":"HTMLAnchorElement"},
ml:{"^":"W;",
k:function(a){return String(a)},
"%":"HTMLAreaElement"},
cx:{"^":"ad;",$iscx:1,"%":"BeforeUnloadEvent"},
cz:{"^":"f;",$iscz:1,"%":";Blob"},
mq:{"^":"f;0A:value=","%":"BluetoothRemoteGATTDescriptor"},
mr:{"^":"W;0A:value=","%":"HTMLButtonElement"},
cC:{"^":"W;",
bS:function(a,b,c){var z=a.getContext(b,P.lO(c,null))
return z},
$iscC:1,
"%":"HTMLCanvasElement"},
fc:{"^":"f;",
f_:function(a,b,c,d,e){a.fillText(b,c,d)},
a_:function(a,b,c,d){return this.f_(a,b,c,d,null)},
"%":"CanvasRenderingContext2D"},
ms:{"^":"G;0i:length=","%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
fh:{"^":"ad;",$isfh:1,"%":"CloseEvent"},
mt:{"^":"bA;0A:value=","%":"CSSKeywordValue"},
ft:{"^":"bA;",
l:function(a,b){return a.add(b)},
"%":";CSSNumericValue"},
mu:{"^":"bX;0i:length=","%":"CSSPerspective"},
mv:{"^":"bA;0m:x=,0p:y=","%":"CSSPositionValue"},
mw:{"^":"bX;0ar:angle},0m:x=,0p:y=","%":"CSSRotation"},
aS:{"^":"f;",$isaS:1,"%":"CSSCharsetRule|CSSConditionRule|CSSFontFaceRule|CSSGroupingRule|CSSImportRule|CSSKeyframeRule|CSSKeyframesRule|CSSMediaRule|CSSNamespaceRule|CSSPageRule|CSSRule|CSSStyleRule|CSSSupportsRule|CSSViewportRule|MozCSSKeyframeRule|MozCSSKeyframesRule|WebKitCSSKeyframeRule|WebKitCSSKeyframesRule"},
mx:{"^":"bX;0m:x=,0p:y=","%":"CSSScale"},
my:{"^":"jY;0i:length=",
d7:function(a,b){var z=a.getPropertyValue(this.dI(a,b))
return z==null?"":z},
dI:function(a,b){var z,y
z=$.$get$ds()
y=z[b]
if(typeof y==="string")return y
y=this.em(a,b)
z[b]=y
return y},
em:function(a,b){var z
if(b.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,function(c,d){return d.toUpperCase()}) in a)return b
z=P.fF()+b
if(z in a)return z
return b},
gbx:function(a){return a.bottom},
ga8:function(a){return a.height},
gah:function(a){return a.left},
gbN:function(a){return a.right},
gaF:function(a){return a.top},
ga1:function(a){return a.width},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
fu:{"^":"b;",
gah:function(a){return this.d7(a,"left")}},
bA:{"^":"f;","%":"CSSImageValue|CSSResourceValue|CSSURLImageValue;CSSStyleValue"},
bX:{"^":"f;","%":"CSSMatrixComponent|CSSSkew;CSSTransformComponent"},
mz:{"^":"bA;0i:length=","%":"CSSTransformValue"},
mA:{"^":"bX;0m:x=,0p:y=","%":"CSSTranslation"},
mB:{"^":"ft;0A:value=","%":"CSSUnitValue"},
mC:{"^":"bA;0i:length=","%":"CSSUnparsedValue"},
mE:{"^":"W;0A:value=","%":"HTMLDataElement"},
mF:{"^":"f;0i:length=",
cs:function(a,b,c){return a.add(b,c)},
l:function(a,b){return a.add(b)},
E:function(a,b){return a.remove(b)},
h:function(a,b){return a[b]},
"%":"DataTransferItemList"},
mG:{"^":"f;0m:x=,0p:y=","%":"DeviceAcceleration"},
mH:{"^":"f;",
k:function(a){return String(a)},
"%":"DOMException"},
mI:{"^":"fI;",
gm:function(a){return a.x},
gp:function(a){return a.y},
"%":"DOMPoint"},
fI:{"^":"f;",
gm:function(a){return a.x},
gp:function(a){return a.y},
"%":";DOMPointReadOnly"},
mJ:{"^":"k3;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.E(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.i("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.i("Cannot resize immutable List."))},
C:function(a,b){return a[b]},
$isr:1,
$asr:function(){return[[P.Q,P.C]]},
$isk:1,
$ask:function(){return[[P.Q,P.C]]},
$isu:1,
$asu:function(){return[[P.Q,P.C]]},
$asm:function(){return[[P.Q,P.C]]},
$isj:1,
$asj:function(){return[[P.Q,P.C]]},
$isl:1,
$asl:function(){return[[P.Q,P.C]]},
"%":"ClientRectList|DOMRectList"},
fJ:{"^":"f;",
k:function(a){return"Rectangle ("+H.e(a.left)+", "+H.e(a.top)+") "+H.e(this.ga1(a))+" x "+H.e(this.ga8(a))},
O:function(a,b){var z
if(b==null)return!1
if(!H.aj(b,"$isQ",[P.C],"$asQ"))return!1
z=J.a1(b)
return a.left===z.gah(b)&&a.top===z.gaF(b)&&this.ga1(a)===z.ga1(b)&&this.ga8(a)===z.ga8(b)},
gD:function(a){return W.el(a.left&0x1FFFFFFF,a.top&0x1FFFFFFF,this.ga1(a)&0x1FFFFFFF,this.ga8(a)&0x1FFFFFFF)},
gbx:function(a){return a.bottom},
ga8:function(a){return a.height},
gah:function(a){return a.left},
gbN:function(a){return a.right},
gaF:function(a){return a.top},
ga1:function(a){return a.width},
gm:function(a){return a.x},
gp:function(a){return a.y},
$isQ:1,
$asQ:function(){return[P.C]},
"%":";DOMRectReadOnly"},
mK:{"^":"k5;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.E(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.i("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.i("Cannot resize immutable List."))},
C:function(a,b){return a[b]},
$isr:1,
$asr:function(){return[P.p]},
$isk:1,
$ask:function(){return[P.p]},
$isu:1,
$asu:function(){return[P.p]},
$asm:function(){return[P.p]},
$isj:1,
$asj:function(){return[P.p]},
$isl:1,
$asl:function(){return[P.p]},
"%":"DOMStringList"},
mL:{"^":"f;0i:length=,0A:value=",
l:function(a,b){return a.add(b)},
E:function(a,b){return a.remove(b)},
"%":"DOMTokenList"},
c_:{"^":"G;",
k:function(a){return a.localName},
gcT:function(a){return new W.eh(a,"click",!1,[W.cR])},
$isc_:1,
"%":";Element"},
ad:{"^":"f;",$isad:1,"%":"AbortPaymentEvent|AnimationEvent|AnimationPlaybackEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|BackgroundFetchClickEvent|BackgroundFetchEvent|BackgroundFetchFailEvent|BackgroundFetchedEvent|BeforeInstallPromptEvent|BlobEvent|CanMakePaymentEvent|ClipboardEvent|CustomEvent|DeviceMotionEvent|DeviceOrientationEvent|ErrorEvent|ExtendableEvent|ExtendableMessageEvent|FetchEvent|FontFaceSetLoadEvent|ForeignFetchEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MojoInterfaceRequestEvent|MutationEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PaymentRequestEvent|PaymentRequestUpdateEvent|PopStateEvent|PresentationConnectionAvailableEvent|PresentationConnectionCloseEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCPeerConnectionIceEvent|RTCTrackEvent|SecurityPolicyViolationEvent|SensorErrorEvent|SpeechRecognitionError|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|SyncEvent|TrackEvent|TransitionEvent|USBConnectionEvent|VRDeviceEvent|VRDisplayEvent|VRSessionEvent|WebGLContextEvent|WebKitTransitionEvent;Event|InputEvent"},
K:{"^":"f;",
ct:["di",function(a,b,c,d){if(c!=null)this.dE(a,b,c,!1)}],
dE:function(a,b,c,d){return a.addEventListener(b,H.aL(c,1),!1)},
$isK:1,
"%":"AccessibleNode|AnalyserNode|Animation|ApplicationCache|AudioBufferSourceNode|AudioChannelMerger|AudioChannelSplitter|AudioDestinationNode|AudioGainNode|AudioNode|AudioPannerNode|AudioScheduledSourceNode|AudioWorkletNode|BackgroundFetchRegistration|BatteryManager|BiquadFilterNode|BluetoothDevice|BluetoothRemoteGATTCharacteristic|BroadcastChannel|CanvasCaptureMediaStreamTrack|ChannelMergerNode|ChannelSplitterNode|Clipboard|ConstantSourceNode|ConvolverNode|DOMApplicationCache|DataChannel|DedicatedWorkerGlobalScope|DelayNode|DynamicsCompressorNode|EventSource|GainNode|IDBDatabase|IDBOpenDBRequest|IDBRequest|IDBTransaction|IDBVersionChangeRequest|IIRFilterNode|JavaScriptAudioNode|MIDIAccess|MIDIInput|MIDIOutput|MIDIPort|MediaDevices|MediaElementAudioSourceNode|MediaKeySession|MediaQueryList|MediaRecorder|MediaSource|MediaStream|MediaStreamAudioDestinationNode|MediaStreamAudioSourceNode|MediaStreamTrack|MojoInterfaceInterceptor|NetworkInformation|Notification|OfflineResourceList|OffscreenCanvas|Oscillator|OscillatorNode|PannerNode|PaymentRequest|Performance|PermissionStatus|PresentationConnection|PresentationConnectionList|PresentationRequest|RTCDTMFSender|RTCDataChannel|RTCPeerConnection|RealtimeAnalyserNode|RemotePlayback|ScreenOrientation|ScriptProcessorNode|ServiceWorker|ServiceWorkerContainer|ServiceWorkerGlobalScope|ServiceWorkerRegistration|SharedWorker|SharedWorkerGlobalScope|SpeechRecognition|SpeechSynthesis|SpeechSynthesisUtterance|StereoPannerNode|USB|VR|VRDevice|VRDisplay|VRSession|VisualViewport|WaveShaperNode|WebSocket|Worker|WorkerGlobalScope|WorkerPerformance|mozRTCPeerConnection|webkitAudioPannerNode|webkitRTCPeerConnection;EventTarget;eq|er|ex|ey"},
az:{"^":"cz;",$isaz:1,"%":"File"},
dC:{"^":"kc;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.E(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.i("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.i("Cannot resize immutable List."))},
C:function(a,b){return a[b]},
$isr:1,
$asr:function(){return[W.az]},
$isk:1,
$ask:function(){return[W.az]},
$isu:1,
$asu:function(){return[W.az]},
$asm:function(){return[W.az]},
$isj:1,
$asj:function(){return[W.az]},
$isl:1,
$asl:function(){return[W.az]},
$isdC:1,
"%":"FileList"},
fW:{"^":"K;",
gfo:function(a){var z,y
z=a.result
if(!!J.y(z).$isfa){y=new Uint8Array(z,0)
return y}return z},
"%":"FileReader"},
n3:{"^":"K;0i:length=","%":"FileWriter"},
n5:{"^":"K;",
l:function(a,b){return a.add(b)},
"%":"FontFaceSet"},
n7:{"^":"W;0i:length=","%":"HTMLFormElement"},
aU:{"^":"f;",$isaU:1,"%":"Gamepad"},
n9:{"^":"f;0A:value=","%":"GamepadButton"},
na:{"^":"cV;0m:x=,0p:y=","%":"Gyroscope"},
nb:{"^":"f;0i:length=","%":"History"},
nc:{"^":"ks;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.E(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.i("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.i("Cannot resize immutable List."))},
C:function(a,b){return a[b]},
$isr:1,
$asr:function(){return[W.G]},
$isk:1,
$ask:function(){return[W.G]},
$isu:1,
$asu:function(){return[W.G]},
$asm:function(){return[W.G]},
$isj:1,
$asj:function(){return[W.G]},
$isl:1,
$asl:function(){return[W.G]},
"%":"HTMLCollection|HTMLFormControlsCollection|HTMLOptionsCollection"},
cI:{"^":"hs;",
fW:function(a,b,c,d,e,f){return a.open(b,c)},
fj:function(a,b,c,d){return a.open(b,c,d)},
$iscI:1,
"%":"XMLHttpRequest"},
ht:{"^":"c;",
$1:function(a){return a.responseText}},
hv:{"^":"c;a,b",
$1:function(a){var z,y,x,w,v
z=this.a
y=z.status
x=y>=200&&y<300
w=y>307&&y<400
y=x||y===0||y===304||w
v=this.b
if(y)v.aA(0,z)
else v.cA(a)}},
hs:{"^":"K;","%":"XMLHttpRequestUpload;XMLHttpRequestEventTarget"},
dI:{"^":"f;",$isdI:1,"%":"ImageData"},
ne:{"^":"W;0A:value=","%":"HTMLInputElement"},
cO:{"^":"d_;",$iscO:1,"%":"KeyboardEvent"},
nh:{"^":"W;0A:value=","%":"HTMLLIElement"},
nj:{"^":"f;",
k:function(a){return String(a)},
"%":"Location"},
nk:{"^":"cV;0m:x=,0p:y=","%":"Magnetometer"},
nn:{"^":"f;0i:length=","%":"MediaList"},
hO:{"^":"ad;",$ishO:1,"%":"MessageEvent"},
no:{"^":"K;",
ct:function(a,b,c,d){if(b==="message")a.start()
this.di(a,b,c,!1)},
"%":"MessagePort"},
np:{"^":"W;0A:value=","%":"HTMLMeterElement"},
nq:{"^":"kA;",
h:function(a,b){return P.ar(a.get(b))},
q:function(a,b){var z,y
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.ar(y.value[1]))}},
gag:function(a){var z=H.d([],[P.p])
this.q(a,new W.hP(z))
return z},
gi:function(a){return a.size},
j:function(a,b,c){throw H.a(P.i("Not supported"))},
E:function(a,b){throw H.a(P.i("Not supported"))},
$asa5:function(){return[P.p,null]},
$isP:1,
$asP:function(){return[P.p,null]},
"%":"MIDIInputMap"},
hP:{"^":"c:4;a",
$2:function(a,b){return this.a.push(a)}},
nr:{"^":"kB;",
h:function(a,b){return P.ar(a.get(b))},
q:function(a,b){var z,y
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.ar(y.value[1]))}},
gag:function(a){var z=H.d([],[P.p])
this.q(a,new W.hQ(z))
return z},
gi:function(a){return a.size},
j:function(a,b,c){throw H.a(P.i("Not supported"))},
E:function(a,b){throw H.a(P.i("Not supported"))},
$asa5:function(){return[P.p,null]},
$isP:1,
$asP:function(){return[P.p,null]},
"%":"MIDIOutputMap"},
hQ:{"^":"c:4;a",
$2:function(a,b){return this.a.push(a)}},
aW:{"^":"f;",$isaW:1,"%":"MimeType"},
ns:{"^":"kD;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.E(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.i("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.i("Cannot resize immutable List."))},
C:function(a,b){return a[b]},
$isr:1,
$asr:function(){return[W.aW]},
$isk:1,
$ask:function(){return[W.aW]},
$isu:1,
$asu:function(){return[W.aW]},
$asm:function(){return[W.aW]},
$isj:1,
$asj:function(){return[W.aW]},
$isl:1,
$asl:function(){return[W.aW]},
"%":"MimeTypeArray"},
cR:{"^":"d_;",
gfg:function(a){var z,y,x,w,v,u
if(!!a.offsetX)return new P.aE(a.offsetX,a.offsetY,[P.C])
else{z=a.target
if(!J.y(W.ez(z)).$isc_)throw H.a(P.i("offsetX is only supported on elements"))
y=W.ez(z)
z=a.clientX
x=a.clientY
w=[P.C]
v=y.getBoundingClientRect()
u=new P.aE(z,x,w).a4(0,new P.aE(v.left,v.top,w))
return new P.aE(J.dm(u.a),J.dm(u.b),w)}},
$iscR:1,
"%":"DragEvent|MouseEvent|PointerEvent|WheelEvent"},
G:{"^":"K;",
k:function(a){var z=a.nodeValue
return z==null?this.dl(a):z},
$isG:1,
"%":"Document|DocumentFragment|DocumentType|HTMLDocument|ShadowRoot|XMLDocument;Node"},
ny:{"^":"kF;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.E(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.i("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.i("Cannot resize immutable List."))},
C:function(a,b){return a[b]},
$isr:1,
$asr:function(){return[W.G]},
$isk:1,
$ask:function(){return[W.G]},
$isu:1,
$asu:function(){return[W.G]},
$asm:function(){return[W.G]},
$isj:1,
$asj:function(){return[W.G]},
$isl:1,
$asl:function(){return[W.G]},
"%":"NodeList|RadioNodeList"},
nD:{"^":"W;0A:value=","%":"HTMLOptionElement"},
nE:{"^":"W;0A:value=","%":"HTMLOutputElement"},
nF:{"^":"W;0A:value=","%":"HTMLParamElement"},
aX:{"^":"f;0i:length=",$isaX:1,"%":"Plugin"},
nH:{"^":"kL;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.E(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.i("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.i("Cannot resize immutable List."))},
C:function(a,b){return a[b]},
$isr:1,
$asr:function(){return[W.aX]},
$isk:1,
$ask:function(){return[W.aX]},
$isu:1,
$asu:function(){return[W.aX]},
$asm:function(){return[W.aX]},
$isj:1,
$asj:function(){return[W.aX]},
$isl:1,
$asl:function(){return[W.aX]},
"%":"PluginArray"},
nK:{"^":"K;0A:value=","%":"PresentationAvailability"},
nL:{"^":"W;0A:value=","%":"HTMLProgressElement"},
i8:{"^":"ad;",$isi8:1,"%":"ProgressEvent|ResourceProgressEvent"},
nO:{"^":"kR;",
h:function(a,b){return P.ar(a.get(b))},
q:function(a,b){var z,y
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.ar(y.value[1]))}},
gag:function(a){var z=H.d([],[P.p])
this.q(a,new W.iq(z))
return z},
gi:function(a){return a.size},
j:function(a,b,c){throw H.a(P.i("Not supported"))},
E:function(a,b){throw H.a(P.i("Not supported"))},
$asa5:function(){return[P.p,null]},
$isP:1,
$asP:function(){return[P.p,null]},
"%":"RTCStatsReport"},
iq:{"^":"c:4;a",
$2:function(a,b){return this.a.push(a)}},
nP:{"^":"W;0i:length=,0A:value=","%":"HTMLSelectElement"},
cV:{"^":"K;","%":"AbsoluteOrientationSensor|AmbientLightSensor|OrientationSensor|RelativeOrientationSensor;Sensor"},
b_:{"^":"K;",$isb_:1,"%":"SourceBuffer"},
nQ:{"^":"er;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.E(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.i("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.i("Cannot resize immutable List."))},
C:function(a,b){return a[b]},
$isr:1,
$asr:function(){return[W.b_]},
$isk:1,
$ask:function(){return[W.b_]},
$isu:1,
$asu:function(){return[W.b_]},
$asm:function(){return[W.b_]},
$isj:1,
$asj:function(){return[W.b_]},
$isl:1,
$asl:function(){return[W.b_]},
"%":"SourceBufferList"},
b0:{"^":"f;",$isb0:1,"%":"SpeechGrammar"},
nR:{"^":"kT;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.E(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.i("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.i("Cannot resize immutable List."))},
C:function(a,b){return a[b]},
$isr:1,
$asr:function(){return[W.b0]},
$isk:1,
$ask:function(){return[W.b0]},
$isu:1,
$asu:function(){return[W.b0]},
$asm:function(){return[W.b0]},
$isj:1,
$asj:function(){return[W.b0]},
$isl:1,
$asl:function(){return[W.b0]},
"%":"SpeechGrammarList"},
b1:{"^":"f;0i:length=",$isb1:1,"%":"SpeechRecognitionResult"},
nT:{"^":"kW;",
h:function(a,b){return a.getItem(b)},
j:function(a,b,c){a.setItem(b,c)},
E:function(a,b){var z=a.getItem(b)
a.removeItem(b)
return z},
q:function(a,b){var z,y
for(z=0;!0;++z){y=a.key(z)
if(y==null)return
b.$2(y,a.getItem(y))}},
gag:function(a){var z=H.d([],[P.p])
this.q(a,new W.iz(z))
return z},
gi:function(a){return a.length},
$asa5:function(){return[P.p,P.p]},
$isP:1,
$asP:function(){return[P.p,P.p]},
"%":"Storage"},
iz:{"^":"c:15;a",
$2:function(a,b){return this.a.push(a)}},
b3:{"^":"f;",$isb3:1,"%":"CSSStyleSheet|StyleSheet"},
nW:{"^":"W;0A:value=","%":"HTMLTextAreaElement"},
b5:{"^":"K;",$isb5:1,"%":"TextTrack"},
b6:{"^":"K;",$isb6:1,"%":"TextTrackCue|VTTCue"},
nY:{"^":"l7;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.E(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.i("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.i("Cannot resize immutable List."))},
C:function(a,b){return a[b]},
$isr:1,
$asr:function(){return[W.b6]},
$isk:1,
$ask:function(){return[W.b6]},
$isu:1,
$asu:function(){return[W.b6]},
$asm:function(){return[W.b6]},
$isj:1,
$asj:function(){return[W.b6]},
$isl:1,
$asl:function(){return[W.b6]},
"%":"TextTrackCueList"},
nZ:{"^":"ey;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.E(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.i("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.i("Cannot resize immutable List."))},
C:function(a,b){return a[b]},
$isr:1,
$asr:function(){return[W.b5]},
$isk:1,
$ask:function(){return[W.b5]},
$isu:1,
$asu:function(){return[W.b5]},
$asm:function(){return[W.b5]},
$isj:1,
$asj:function(){return[W.b5]},
$isl:1,
$asl:function(){return[W.b5]},
"%":"TextTrackList"},
o_:{"^":"f;0i:length=","%":"TimeRanges"},
b7:{"^":"f;",$isb7:1,"%":"Touch"},
iJ:{"^":"d_;",$isiJ:1,"%":"TouchEvent"},
iK:{"^":"lc;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.E(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.i("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.i("Cannot resize immutable List."))},
gfe:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.a(P.bs("No elements"))},
C:function(a,b){return a[b]},
$isr:1,
$asr:function(){return[W.b7]},
$isk:1,
$ask:function(){return[W.b7]},
$isu:1,
$asu:function(){return[W.b7]},
$asm:function(){return[W.b7]},
$isj:1,
$asj:function(){return[W.b7]},
$isl:1,
$asl:function(){return[W.b7]},
"%":"TouchList"},
o0:{"^":"f;0i:length=","%":"TrackDefaultList"},
d_:{"^":"ad;","%":"CompositionEvent|FocusEvent|TextEvent;UIEvent"},
o2:{"^":"f;",
k:function(a){return String(a)},
"%":"URL"},
o4:{"^":"f;0m:x=","%":"VRStageBoundsPoint"},
o6:{"^":"K;0i:length=","%":"VideoTrackList"},
j_:{"^":"K;",
gcu:function(a){var z,y
z=P.C
y=new P.N(0,$.t,[z])
this.cY(a,new W.j0(new P.ev(y,[z])))
return y},
cY:function(a,b){this.dV(a)
return this.ed(a,W.eF(b,P.C))},
ed:function(a,b){return a.requestAnimationFrame(H.aL(b,1))},
dV:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
"%":"DOMWindow|Window"},
j0:{"^":"c;a",
$1:function(a){this.a.aA(0,a)}},
jR:{"^":"lh;0c,a,0b",$iscx:1},
jS:{"^":"b;a",
f4:function(a,b){var z=P.dY(null,null,null,null,!0,W.cx)
W.S(a,this.a,new W.jT(z),!1)
return new P.d6(z,[H.z(z,0)])},
f3:function(a){return this.f4(a,!1)}},
jT:{"^":"c;a",
$1:function(a){this.a.l(0,new W.jR(a))}},
oa:{"^":"G;0A:value=","%":"Attr"},
ob:{"^":"lk;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.E(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.i("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.i("Cannot resize immutable List."))},
C:function(a,b){return a[b]},
$isr:1,
$asr:function(){return[W.aS]},
$isk:1,
$ask:function(){return[W.aS]},
$isu:1,
$asu:function(){return[W.aS]},
$asm:function(){return[W.aS]},
$isj:1,
$asj:function(){return[W.aS]},
$isl:1,
$asl:function(){return[W.aS]},
"%":"CSSRuleList"},
oc:{"^":"fJ;",
k:function(a){return"Rectangle ("+H.e(a.left)+", "+H.e(a.top)+") "+H.e(a.width)+" x "+H.e(a.height)},
O:function(a,b){var z
if(b==null)return!1
if(!H.aj(b,"$isQ",[P.C],"$asQ"))return!1
z=J.a1(b)
return a.left===z.gah(b)&&a.top===z.gaF(b)&&a.width===z.ga1(b)&&a.height===z.ga8(b)},
gD:function(a){return W.el(a.left&0x1FFFFFFF,a.top&0x1FFFFFFF,a.width&0x1FFFFFFF,a.height&0x1FFFFFFF)},
ga8:function(a){return a.height},
ga1:function(a){return a.width},
gm:function(a){return a.x},
gp:function(a){return a.y},
"%":"ClientRect|DOMRect"},
od:{"^":"lm;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.E(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.i("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.i("Cannot resize immutable List."))},
C:function(a,b){return a[b]},
$isr:1,
$asr:function(){return[W.aU]},
$isk:1,
$ask:function(){return[W.aU]},
$isu:1,
$asu:function(){return[W.aU]},
$asm:function(){return[W.aU]},
$isj:1,
$asj:function(){return[W.aU]},
$isl:1,
$asl:function(){return[W.aU]},
"%":"GamepadList"},
oe:{"^":"lo;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.E(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.i("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.i("Cannot resize immutable List."))},
C:function(a,b){return a[b]},
$isr:1,
$asr:function(){return[W.G]},
$isk:1,
$ask:function(){return[W.G]},
$isu:1,
$asu:function(){return[W.G]},
$asm:function(){return[W.G]},
$isj:1,
$asj:function(){return[W.G]},
$isl:1,
$asl:function(){return[W.G]},
"%":"MozNamedAttrMap|NamedNodeMap"},
of:{"^":"lq;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.E(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.i("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.i("Cannot resize immutable List."))},
C:function(a,b){return a[b]},
$isr:1,
$asr:function(){return[W.b1]},
$isk:1,
$ask:function(){return[W.b1]},
$isu:1,
$asu:function(){return[W.b1]},
$asm:function(){return[W.b1]},
$isj:1,
$asj:function(){return[W.b1]},
$isl:1,
$asl:function(){return[W.b1]},
"%":"SpeechRecognitionResultList"},
og:{"^":"ls;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.E(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.a(P.i("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.i("Cannot resize immutable List."))},
C:function(a,b){return a[b]},
$isr:1,
$asr:function(){return[W.b3]},
$isk:1,
$ask:function(){return[W.b3]},
$isu:1,
$asu:function(){return[W.b3]},
$asm:function(){return[W.b3]},
$isj:1,
$asj:function(){return[W.b3]},
$isl:1,
$asl:function(){return[W.b3]},
"%":"StyleSheetList"},
k7:{"^":"cW;$ti",
bI:function(a,b,c,d){return W.S(this.a,this.b,a,!1)}},
eh:{"^":"k7;a,b,c,$ti"},
k8:{"^":"iA;a,b,c,d,e",
eq:function(){var z=this.d
if(z!=null&&this.a<=0)J.eV(this.b,this.c,z,!1)},
B:{
S:function(a,b,c,d){var z=W.eF(new W.k9(c),W.ad)
z=new W.k8(0,a,b,z,!1)
z.eq()
return z}}},
k9:{"^":"c;a",
$1:function(a){return this.a.$1(a)}},
F:{"^":"b;",
gN:function(a){return new W.fX(a,this.gi(a),-1)},
l:function(a,b){throw H.a(P.i("Cannot add to immutable List."))},
E:function(a,b){throw H.a(P.i("Cannot remove from immutable List."))}},
fX:{"^":"b;a,b,c,0d",
v:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.cs(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gw:function(a){return this.d}},
jZ:{"^":"b;a",$isK:1,B:{
k_:function(a){if(a===window)return a
else return new W.jZ(a)}}},
lh:{"^":"b;",$isad:1},
jY:{"^":"f+fu;"},
k2:{"^":"f+m;"},
k3:{"^":"k2+F;"},
k4:{"^":"f+m;"},
k5:{"^":"k4+F;"},
kb:{"^":"f+m;"},
kc:{"^":"kb+F;"},
kr:{"^":"f+m;"},
ks:{"^":"kr+F;"},
kA:{"^":"f+a5;"},
kB:{"^":"f+a5;"},
kC:{"^":"f+m;"},
kD:{"^":"kC+F;"},
kE:{"^":"f+m;"},
kF:{"^":"kE+F;"},
kK:{"^":"f+m;"},
kL:{"^":"kK+F;"},
kR:{"^":"f+a5;"},
eq:{"^":"K+m;"},
er:{"^":"eq+F;"},
kS:{"^":"f+m;"},
kT:{"^":"kS+F;"},
kW:{"^":"f+a5;"},
l6:{"^":"f+m;"},
l7:{"^":"l6+F;"},
ex:{"^":"K+m;"},
ey:{"^":"ex+F;"},
lb:{"^":"f+m;"},
lc:{"^":"lb+F;"},
lj:{"^":"f+m;"},
lk:{"^":"lj+F;"},
ll:{"^":"f+m;"},
lm:{"^":"ll+F;"},
ln:{"^":"f+m;"},
lo:{"^":"ln+F;"},
lp:{"^":"f+m;"},
lq:{"^":"lp+F;"},
lr:{"^":"f+m;"},
ls:{"^":"lr+F;"}}],["","",,P,{"^":"",
ar:function(a){var z,y,x,w,v
if(a==null)return
z=P.O(P.p,null)
y=Object.getOwnPropertyNames(a)
for(x=y.length,w=0;w<y.length;y.length===x||(0,H.by)(y),++w){v=y[w]
z.j(0,v,a[v])}return z},
lO:function(a,b){var z={}
a.q(0,new P.lP(z))
return z},
lQ:function(a){var z,y
z=new P.N(0,$.t,[null])
y=new P.ed(z,[null])
a.then(H.aL(new P.lR(y),1))["catch"](H.aL(new P.lS(y),1))
return z},
dy:function(){var z=$.dx
if(z==null){z=J.cu(window.navigator.userAgent,"Opera",0)
$.dx=z}return z},
fF:function(){var z,y
z=$.du
if(z!=null)return z
y=$.dv
if(y==null){y=J.cu(window.navigator.userAgent,"Firefox",0)
$.dv=y}if(y)z="-moz-"
else{y=$.dw
if(y==null){y=!P.dy()&&J.cu(window.navigator.userAgent,"Trident/",0)
$.dw=y}if(y)z="-ms-"
else z=P.dy()?"-o-":"-webkit-"}$.du=z
return z},
l1:{"^":"b;",
aE:function(a){var z,y,x
z=this.a
y=z.length
for(x=0;x<y;++x)if(z[x]===a)return x
z.push(a)
this.b.push(null)
return y},
al:function(a){var z,y,x,w,v
z={}
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
y=J.y(a)
if(!!y.$isbY)return new Date(a.a)
if(!!y.$isaz)return a
if(!!y.$iscz)return a
if(!!y.$isdC)return a
if(!!y.$isdI)return a
if(!!y.$isdR||!!y.$iscT)return a
if(!!y.$isP){x=this.aE(a)
w=this.b
v=w[x]
z.a=v
if(v!=null)return v
v={}
z.a=v
w[x]=v
y.q(a,new P.l3(z,this))
return z.a}if(!!y.$isl){x=this.aE(a)
v=this.b[x]
if(v!=null)return v
return this.eO(a,x)}throw H.a(P.cd("structured clone of other type"))},
eO:function(a,b){var z,y,x,w
z=J.a7(a)
y=z.gi(a)
x=new Array(y)
this.b[b]=x
for(w=0;w<y;++w)x[w]=this.al(z.h(a,w))
return x}},
l3:{"^":"c:2;a,b",
$2:function(a,b){this.a.a[a]=this.b.al(b)}},
jG:{"^":"b;",
aE:function(a){var z,y,x,w
z=this.a
y=z.length
for(x=0;x<y;++x){w=z[x]
if(w==null?a==null:w===a)return x}z.push(a)
this.b.push(null)
return y},
al:function(a){var z,y,x,w,v,u,t,s,r,q
z={}
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
if(a instanceof Date){y=a.getTime()
x=new P.bY(y,!0)
if(Math.abs(y)<=864e13)w=!1
else w=!0
if(w)H.a8(P.aQ("DateTime is outside valid range: "+x.gcS()))
return x}if(a instanceof RegExp)throw H.a(P.cd("structured clone of RegExp"))
if(typeof Promise!="undefined"&&a instanceof Promise)return P.lQ(a)
v=Object.getPrototypeOf(a)
if(v===Object.prototype||v===null){u=this.aE(a)
x=this.b
t=x[u]
z.a=t
if(t!=null)return t
t=P.hG()
z.a=t
x[u]=t
this.f2(a,new P.jH(z,this))
return z.a}if(a instanceof Array){s=a
u=this.aE(s)
x=this.b
t=x[u]
if(t!=null)return t
w=J.a7(s)
r=w.gi(s)
t=this.c?new Array(r):s
x[u]=t
for(x=J.ak(t),q=0;q<r;++q)x.j(t,q,this.al(w.h(s,q)))
return t}return a},
bA:function(a,b){this.c=b
return this.al(a)}},
jH:{"^":"c:16;a,b",
$2:function(a,b){var z,y
z=this.a.a
y=this.b.al(b)
J.ct(z,a,y)
return y}},
lP:{"^":"c:2;a",
$2:function(a,b){this.a[a]=b}},
l2:{"^":"l1;a,b"},
d4:{"^":"jG;a,b,c",
f2:function(a,b){var z,y,x,w
for(z=Object.keys(a),y=z.length,x=0;x<z.length;z.length===y||(0,H.by)(z),++x){w=z[x]
b.$2(w,a[w])}}},
lR:{"^":"c:8;a",
$1:function(a){return this.a.aA(0,a)}},
lS:{"^":"c:8;a",
$1:function(a){return this.a.cA(a)}}}],["","",,P,{"^":"",
lu:function(a,b){var z,y
z=new P.N(0,$.t,[b])
y=new P.ev(z,[b])
a.toString
W.S(a,"success",new P.lv(a,y),!1)
W.S(a,"error",y.gcz(),!1)
return z},
fv:{"^":"f;","%":";IDBCursor"},
mD:{"^":"fv;",
gA:function(a){return new P.d4([],[],!1).bA(a.value,!1)},
"%":"IDBCursorWithValue"},
lv:{"^":"c;a,b",
$1:function(a){this.b.aA(0,new P.d4([],[],!1).bA(this.a.result,!1))}},
nA:{"^":"f;",
cs:function(a,b,c){var z,y,x,w,v
try{z=null
z=this.dC(a,b)
w=P.lu(z,null)
return w}catch(v){y=H.at(v)
x=H.as(v)
w=P.dE(y,x,null)
return w}},
l:function(a,b){return this.cs(a,b,null)},
dD:function(a,b,c){return a.add(new P.l2([],[]).al(b))},
dC:function(a,b){return this.dD(a,b,null)},
"%":"IDBObjectStore"},
nB:{"^":"f;0A:value=","%":"IDBObservation"}}],["","",,P,{"^":"",
bt:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
ek:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
ku:{"^":"b;",
M:function(){return Math.random()}},
aE:{"^":"b;m:a>,p:b>,$ti",
k:function(a){return"Point("+H.e(this.a)+", "+H.e(this.b)+")"},
O:function(a,b){var z
if(b==null)return!1
if(!H.aj(b,"$isaE",[P.C],null))return!1
z=J.a1(b)
return J.a2(this.a,z.gm(b))&&J.a2(this.b,z.gp(b))},
gD:function(a){var z,y
z=J.au(this.a)
y=J.au(this.b)
return P.ek(P.bt(P.bt(0,z),y))},
n:function(a,b){return new P.aE(J.am(this.a,b.gm(b)),J.am(this.b,b.gp(b)),this.$ti)},
a4:function(a,b){return new P.aE(J.cr(this.a,b.a),J.cr(this.b,b.b),this.$ti)}},
kM:{"^":"b;$ti",
gbN:function(a){return J.am(this.a,this.c)},
gbx:function(a){return J.am(this.b,this.d)},
k:function(a){return"Rectangle ("+H.e(this.a)+", "+H.e(this.b)+") "+H.e(this.c)+" x "+H.e(this.d)},
O:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(!H.aj(b,"$isQ",[P.C],"$asQ"))return!1
z=this.a
y=J.a1(b)
x=J.y(z)
if(x.O(z,y.gah(b))){w=this.b
v=J.y(w)
z=v.O(w,y.gaF(b))&&J.a2(x.n(z,this.c),y.gbN(b))&&J.a2(v.n(w,this.d),y.gbx(b))}else z=!1
return z},
gD:function(a){var z,y,x,w,v,u
z=this.a
y=J.y(z)
x=y.gD(z)
w=this.b
v=J.y(w)
u=v.gD(w)
z=J.au(y.n(z,this.c))
w=J.au(v.n(w,this.d))
return P.ek(P.bt(P.bt(P.bt(P.bt(0,x),u),z),w))},
cP:function(a,b){var z,y,x,w
z=this.a
y=b.a
x=J.bR(y)
w=J.aN(z)
if(w.au(z,x.n(y,b.c)))if(x.au(y,w.n(z,this.c))){z=this.b
y=b.b
x=J.bR(y)
w=J.aN(z)
z=w.au(z,x.n(y,b.d))&&x.au(y,w.n(z,this.d))}else z=!1
else z=!1
return z}},
Q:{"^":"kM;ah:a>,aF:b>,a1:c>,a8:d>,$ti",B:{
aF:function(a,b,c,d,e){var z,y
z=J.eK(c)
z=z.am(c,0)?J.dj(z.aH(c),0):c
y=J.eK(d)
y=y.am(d,0)?J.dj(y.aH(d),0):d
return new P.Q(a,b,z,y,[e])}}}}],["","",,P,{"^":"",mk:{"^":"f;0A:value=","%":"SVGAngle"},mM:{"^":"H;0m:x=,0p:y=","%":"SVGFEBlendElement"},mN:{"^":"H;0m:x=,0p:y=","%":"SVGFEColorMatrixElement"},mO:{"^":"H;0m:x=,0p:y=","%":"SVGFEComponentTransferElement"},mP:{"^":"H;0m:x=,0p:y=","%":"SVGFECompositeElement"},mQ:{"^":"H;0m:x=,0p:y=","%":"SVGFEConvolveMatrixElement"},mR:{"^":"H;0m:x=,0p:y=","%":"SVGFEDiffuseLightingElement"},mS:{"^":"H;0m:x=,0p:y=","%":"SVGFEDisplacementMapElement"},mT:{"^":"H;0m:x=,0p:y=","%":"SVGFEFloodElement"},mU:{"^":"H;0m:x=,0p:y=","%":"SVGFEGaussianBlurElement"},mV:{"^":"H;0m:x=,0p:y=","%":"SVGFEImageElement"},mW:{"^":"H;0m:x=,0p:y=","%":"SVGFEMergeElement"},mX:{"^":"H;0m:x=,0p:y=","%":"SVGFEMorphologyElement"},mY:{"^":"H;0m:x=,0p:y=","%":"SVGFEOffsetElement"},mZ:{"^":"H;0m:x=,0p:y=","%":"SVGFEPointLightElement"},n_:{"^":"H;0m:x=,0p:y=","%":"SVGFESpecularLightingElement"},n0:{"^":"H;0m:x=,0p:y=","%":"SVGFESpotLightElement"},n1:{"^":"H;0m:x=,0p:y=","%":"SVGFETileElement"},n2:{"^":"H;0m:x=,0p:y=","%":"SVGFETurbulenceElement"},n4:{"^":"H;0m:x=,0p:y=","%":"SVGFilterElement"},n6:{"^":"bl;0m:x=,0p:y=","%":"SVGForeignObjectElement"},hr:{"^":"bl;","%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},bl:{"^":"H;","%":"SVGAElement|SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},nd:{"^":"bl;0m:x=,0p:y=","%":"SVGImageElement"},bG:{"^":"f;0A:value=",$isbG:1,"%":"SVGLength"},ni:{"^":"kw;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.E(b,a,null,null,null))
return a.getItem(b)},
j:function(a,b,c){throw H.a(P.i("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.i("Cannot resize immutable List."))},
C:function(a,b){return this.h(a,b)},
ad:function(a){return a.clear()},
$isk:1,
$ask:function(){return[P.bG]},
$asm:function(){return[P.bG]},
$isj:1,
$asj:function(){return[P.bG]},
$isl:1,
$asl:function(){return[P.bG]},
"%":"SVGLengthList"},nm:{"^":"H;0m:x=,0p:y=","%":"SVGMaskElement"},bJ:{"^":"f;0A:value=",$isbJ:1,"%":"SVGNumber"},nz:{"^":"kH;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.E(b,a,null,null,null))
return a.getItem(b)},
j:function(a,b,c){throw H.a(P.i("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.i("Cannot resize immutable List."))},
C:function(a,b){return this.h(a,b)},
ad:function(a){return a.clear()},
$isk:1,
$ask:function(){return[P.bJ]},
$asm:function(){return[P.bJ]},
$isj:1,
$asj:function(){return[P.bJ]},
$isl:1,
$asl:function(){return[P.bJ]},
"%":"SVGNumberList"},nG:{"^":"H;0m:x=,0p:y=","%":"SVGPatternElement"},nI:{"^":"f;0m:x=,0p:y=","%":"SVGPoint"},nJ:{"^":"f;0i:length=","%":"SVGPointList"},nM:{"^":"f;0m:x=,0p:y=","%":"SVGRect"},nN:{"^":"hr;0m:x=,0p:y=","%":"SVGRectElement"},nU:{"^":"l0;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.E(b,a,null,null,null))
return a.getItem(b)},
j:function(a,b,c){throw H.a(P.i("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.i("Cannot resize immutable List."))},
C:function(a,b){return this.h(a,b)},
ad:function(a){return a.clear()},
$isk:1,
$ask:function(){return[P.p]},
$asm:function(){return[P.p]},
$isj:1,
$asj:function(){return[P.p]},
$isl:1,
$asl:function(){return[P.p]},
"%":"SVGStringList"},H:{"^":"c_;",
gcT:function(a){return new W.eh(a,"click",!1,[W.cR])},
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEDropShadowElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGGradientElement|SVGLinearGradientElement|SVGMPathElement|SVGMarkerElement|SVGMetadataElement|SVGRadialGradientElement|SVGScriptElement|SVGSetElement|SVGStopElement|SVGStyleElement|SVGSymbolElement|SVGTitleElement|SVGViewElement;SVGElement"},nV:{"^":"bl;0m:x=,0p:y=","%":"SVGSVGElement"},iF:{"^":"bl;","%":"SVGTextPathElement;SVGTextContentElement"},nX:{"^":"iF;0m:x=,0p:y=","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement"},bL:{"^":"f;",$isbL:1,"%":"SVGTransform"},o1:{"^":"le;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.E(b,a,null,null,null))
return a.getItem(b)},
j:function(a,b,c){throw H.a(P.i("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.i("Cannot resize immutable List."))},
C:function(a,b){return this.h(a,b)},
ad:function(a){return a.clear()},
$isk:1,
$ask:function(){return[P.bL]},
$asm:function(){return[P.bL]},
$isj:1,
$asj:function(){return[P.bL]},
$isl:1,
$asl:function(){return[P.bL]},
"%":"SVGTransformList"},o3:{"^":"bl;0m:x=,0p:y=","%":"SVGUseElement"},kv:{"^":"f+m;"},kw:{"^":"kv+F;"},kG:{"^":"f+m;"},kH:{"^":"kG+F;"},l_:{"^":"f+m;"},l0:{"^":"l_+F;"},ld:{"^":"f+m;"},le:{"^":"ld+F;"}}],["","",,P,{"^":"",mm:{"^":"f;0i:length=","%":"AudioBuffer"},mn:{"^":"f;0A:value=","%":"AudioParam"},mo:{"^":"jP;",
h:function(a,b){return P.ar(a.get(b))},
q:function(a,b){var z,y
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.ar(y.value[1]))}},
gag:function(a){var z=H.d([],[P.p])
this.q(a,new P.f2(z))
return z},
gi:function(a){return a.size},
j:function(a,b,c){throw H.a(P.i("Not supported"))},
E:function(a,b){throw H.a(P.i("Not supported"))},
$asa5:function(){return[P.p,null]},
$isP:1,
$asP:function(){return[P.p,null]},
"%":"AudioParamMap"},f2:{"^":"c:4;a",
$2:function(a,b){return this.a.push(a)}},mp:{"^":"K;0i:length=","%":"AudioTrackList"},f5:{"^":"K;","%":"AudioContext|webkitAudioContext;BaseAudioContext"},nC:{"^":"f5;0i:length=","%":"OfflineAudioContext"},jP:{"^":"f+a5;"}}],["","",,P,{"^":"",dq:{"^":"f;",$isdq:1,"%":"WebGLBuffer"}}],["","",,P,{"^":"",nS:{"^":"kV;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.E(b,a,null,null,null))
return P.ar(a.item(b))},
j:function(a,b,c){throw H.a(P.i("Cannot assign element of immutable List."))},
si:function(a,b){throw H.a(P.i("Cannot resize immutable List."))},
C:function(a,b){return this.h(a,b)},
$isk:1,
$ask:function(){return[[P.P,,,]]},
$asm:function(){return[[P.P,,,]]},
$isj:1,
$asj:function(){return[[P.P,,,]]},
$isl:1,
$asl:function(){return[[P.P,,,]]},
"%":"SQLResultSetRowList"},kU:{"^":"f+m;"},kV:{"^":"kU+F;"}}],["","",,D,{"^":"",f9:{"^":"b;a,b,c,d,e,0f,r,x",
gi:function(a){return this.c},
eN:function(a,b,c){var z
for(z=0;z<c;++z)b[z]=a[z]},
ba:function(a){var z,y,x,w,v,u
if(a<0)H.a8(P.aQ("should be > 0"))
if(a===this.c)return
z=C.a.K(a+31,32)
y=this.b
x=y.length
if(z>x||z+this.a<x){w=new Uint32Array(z)
y=this.b
x=y.length
this.eN(y,w,z>x?x:z)
this.b=w
y=w}x=this.c
if(a>x){v=C.a.a2(x,32)
if(v>0){u=C.a.K(x+31,32)-1
y[u]=(y[u]&(1<<(v&31)>>>0)-1)>>>0}(y&&C.ah).eZ(y,C.a.K(x+31,32),z,0)}this.c=a
this.sd2(0,this.d+1)},
sd2:function(a,b){this.d=b
if(this.e===0&&!0)this.x.l(0,b)},
dw:function(a,b){this.b=new Uint32Array((a+31)/32|0)
this.c=a
this.d=0},
k:function(a){return H.e(this.c)+" bits, "+H.e(this.cC(!0))+" set"},
h:function(a,b){return(this.b[C.a.K(b,32)]&1<<(b&31))>>>0!==0},
j:function(a,b,c){var z,y
z=this.b
if(c){y=C.a.K(b,32)
z[y]=(z[y]|1<<(b&31))>>>0}else{y=C.a.K(b,32)
z[y]=(z[y]&~(1<<(b&31)))>>>0}this.sd2(0,this.d+1)},
cC:function(a){var z,y,x,w
z=this.c
if(z===0)return 0
if(this.r!==this.d){this.f=0
for(z=C.a.K(z+31,32)-1,y=0;y<z;++y)for(x=this.b[y];x!==0;x=x>>>8)this.f=this.f+$.$get$cy()[x&255]
x=this.b[y]
w=this.c&31
if(w!==0)x=(x&~(4294967295<<w))>>>0
for(;x!==0;x=x>>>8)this.f=this.f+$.$get$cy()[x&255]}z=this.f
return z},
B:{
w:function(a,b){var z=new D.f9(256,null,null,0,0,-1,new P.eb(null,null,0,[null]))
z.dw(a,!1)
return z}}}}],["","",,G,{"^":"",bD:{"^":"v;A:a>"},ah:{"^":"v;ar:a',A:b*,c"},aD:{"^":"v;"},aT:{"^":"v;a,b,c"},R:{"^":"v;at:a@"},ax:{"^":"v;aS:a<"},bC:{"^":"v;a,b"},bk:{"^":"v;"},aa:{"^":"v;a,b"}}],["","",,K,{"^":"",bZ:{"^":"a4;b,0a",
dd:function(a,b){var z,y
z=a.a
y=this.b
y.bL(0,z,new K.fG())
J.eU(y.h(0,z),b)},
ea:function(a,b){J.dl(this.b.h(0,a.a),b)},
fI:[function(a){a.b0(G.ax)
a.e.d.l(0,a)
return a},"$1","gdY",4,0,8]},fG:{"^":"c;",
$0:function(){return H.d([],[S.X])}}}],["","",,X,{"^":"",dH:{"^":"js;r,x,0b,0c,0d,0e,0a",
az:function(a){var z,y
if(this.b.P(a)!=null){z=this.b.b
y=a.a
this.r.j(0,J.bg(z.a[y]),a)}},
l:function(a,b){this.r.j(0,J.bg(this.b.b.a[b.a]),b)},
bz:function(a){var z,y
if(this.b.P(a)!=null){z=this.b.b
y=a.a
this.r.j(0,J.bg(z.a[y]),a)}},
ae:function(a){var z,y
if(this.b.P(a)!=null){z=this.b.b
y=a.a
this.r.E(0,J.bg(z.a[y]))}},
eR:[function(a){var z,y,x,w,v
z=this.r.h(0,a)
if(z!=null){y=this.c.P(z)==null
if(y&&this.d.P(z)!=null){y=this.e
x=y.b.h(0,z.a)
w=x==null
if(!w)J.bT(x,y.gdY())
if(!w)J.eW(x)}else if(!y){y=this.c.b
w=z.a
v=y.a[w].gaS()
this.e.ea(v,z)}z.e.e.l(0,z)
return!0}return!1},"$1","geQ",4,0,17]},js:{"^":"a4;",
t:function(a){this.bb(0)
this.b=S.h(this.a,G.bD)
this.c=S.h(this.a,G.ax)
this.d=S.h(this.a,G.aD)
this.e=this.a.z.h(0,new H.q(K.bZ))}}}],["","",,A,{"^":"",bp:{"^":"jx;e,f,0b,0c,0a",
az:function(a){var z,y,x,w,v
if(this.b.P(a)!=null&&this.c.P(a)!=null){z=this.b.b
y=a.a
x=z.a[y]
w=this.c.b.a[y].gat()
v=w*2
this.cO(0,a,x.a-w,x.b-w,v,v)}},
ae:function(a){if(this.b.P(a)!=null&&this.c.P(a)!=null)this.E(0,a)},
cO:function(a,b,c,d,e,f){var z,y
z=this.e
y=new A.ci(b,P.aF(c,d,e,f,P.I),[H.z(z,0)])
z.cd(y)
this.f.j(0,b,y)
return y},
E:function(a,b){var z=this.f.E(0,b)
if(z!=null)z.c.bq(0,z)},
d6:function(){return J.f0(this.e.bF(),new A.i9())}},i9:{"^":"c;",
$1:function(a){return a.d.length===0}},ae:{"^":"b;a,b,c,d,e,$ti",
gaY:function(a){var z=this.e
return new H.dQ(z,new A.ij(),[H.z(z,0),H.z(this,0)])},
bT:function(){var z=this.d
if(z.length===0)return J.an(this.gaY(this).a)
return J.an(this.gaY(this).a)+C.b.bG(z,0,new A.ig(this),P.C)},
bF:function(){var z,y,x
z=this.d
if(z.length!==0){y=[A.ae,H.z(this,0)]
x=H.d([this],[y])
return H.cG(x,new H.c0(z,new A.ie(),[H.z(z,0),y]),H.z(x,0))}return H.d([this],[[A.ae,H.z(this,0)]])},
b7:function(a){var z,y
z=this.d
if(z.length===0)return this.gaY(this)
y=H.z(z,0)
return this.gaY(this).f1(0,new H.c0(new H.aG(z,new A.ih(a),[y]),new A.ii(a),[y,H.z(this,0)]))},
E:function(a,b){b.c.bq(0,b)},
cd:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.d
if(z.length===0){y=this.e
x=this.b
if(y.length<x){y.push(a)
a.c=this}else{w=this.a
v=w.a
u=w.b
t=w.c/2
s=w.d/2
w=P.I
r=H.z(this,0)
q=[[A.ae,r]]
r=[[A.ci,r]]
p=this.$ti
z.push(new A.ae(P.aF(v,u,t,s,w),x,this,H.d([],q),H.d([],r),p))
o=v+t
z.push(new A.ae(P.aF(o,u,t,s,w),x,this,H.d([],q),H.d([],r),p))
n=u+s
z.push(new A.ae(P.aF(v,n,t,s,w),x,this,H.d([],q),H.d([],r),p))
z.push(new A.ae(P.aF(o,n,t,s,w),x,this,H.d([],q),H.d([],r),p))
r=H.cG(y,H.d([a],r),H.z(y,0))
m=P.cQ(r,!0,H.al(r,"j",0))
C.b.si(y,0)
C.b.q(m,this.ge6())}}else this.e7(a)},
e7:[function(a){var z=this.cc(a.b)
if(z===this){this.e.push(a)
a.c=this}else z.cd(a)},"$1","ge6",4,0,11],
bq:function(a,b){var z,y,x,w
z=this.d
if(z.length===0)C.b.co(this.e,new A.ib(b),!0)
else{y=this.cc(b.b)
if(y===this)C.b.co(this.e,new A.ic(b),!0)
else y.bq(0,b)
if(this.bT()<=this.b){x=J.eY(this.bF(),new A.id(),[A.ci,H.z(this,0)])
w=P.cQ(x,!0,H.al(x,"j",0))
x=this.e
C.b.si(x,0)
C.b.ey(x,w)
C.b.si(z,0)}}},
cc:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=a.a
y=this.a
x=y.a
w=y.c/2
v=J.bR(x)
u=J.aN(z)
t=u.am(z,v.n(x,w))?0:1
s=a.b
r=y.b
y=y.d/2
q=J.bR(r)
p=J.aN(s)
o=p.am(s,q.n(r,y))?0:2
n=J.cq(u.n(z,a.c),v.n(x,w))?0:1
m=J.cq(p.n(s,a.d),q.n(r,y))?0:2
if(t===n&&o===m)return this.d[t+o]
return this},
k:function(a){return"QuadTree["+this.a.k(0)+"]["+H.e(this.e)+"]["+H.e(this.d)+"]"}},ij:{"^":"c;",
$1:function(a){return a.a}},ig:{"^":"c;a",
$2:function(a,b){return a+b.bT()},
$S:function(){return{func:1,ret:P.C,args:[P.C,[A.ae,H.z(this.a,0)]]}}},ie:{"^":"c;",
$1:function(a){return a.bF()}},ih:{"^":"c;a",
$1:function(a){return a.a.cP(0,this.a)}},ii:{"^":"c;a",
$1:function(a){return a.b7(this.a)}},ib:{"^":"c;a",
$1:function(a){var z,y
z=a.a
y=this.a.a
return z==null?y==null:z===y}},ic:{"^":"c;a",
$1:function(a){var z,y
z=a.a
y=this.a.a
return z==null?y==null:z===y}},id:{"^":"c;",
$1:function(a){return a.e}},ci:{"^":"b;a,b,0c,$ti",
k:function(a){return H.e(this.a)+"@"+this.b.k(0)}},jx:{"^":"a4;",
t:function(a){this.bb(0)
this.b=S.h(this.a,F.L)
this.c=S.h(this.a,G.R)}}}],["","",,N,{"^":"",f6:{"^":"jg;",
U:[function(a){var z,y,x,w,v,u,t
z=this.fy.b
y=a.a
x=z.a[y]
w=this.fx.b.a[y].gaS()
v=this.fy.b.a[w.a]
y=x.a
u=y-this.b.cy*v.a/20
t=3.141592653589793*y*y
if(u>0){t=Math.max(0,t-3.141592653589793*u*u)
x.a=u
this.fh(w,a)}else{x.a=0
z=new G.dz()
a.r.J(a,S.ao(z.gG(z)),z)
a.e.d.l(0,a)}z=v.a
v.a=Math.sqrt((3.141592653589793*z*z+t)/3.141592653589793)},"$1","gT",4,0,0]},jg:{"^":"Y;",
t:["dr",function(a){this.R(0)
this.fx=S.h(this.b,G.ax)
this.fy=S.h(this.b,G.R)}]}}],["","",,F,{"^":"",f7:{"^":"jh;",
U:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.fy.b
y=a.a
x=z.a[y]
w=this.go.b.a[y].gat()
v=w*2
y=this.k2
z=x.a
u=x.b
for(z=y.e.b7(P.aF(z-w,u-w,v,v,P.I)).b5(0,new F.f8(this)),y=J.a0(z.a),z=new H.d3(y,z.b);z.v();){u=y.gw(y)
t=this.fy.b
s=u.a
r=t.a[s]
q=this.go.b.a[s].gat()
p=r.a-x.a
o=r.b-x.b
n=Math.sqrt(p*p+o*o)
m=w+q
if(this.k1.P(u)==null){if(n<w)this.de(a,u,n,p,o,w,q)
else if(n<w+q/2)this.eB(a,u,n,p,o,w,q)
else if(n<=m)this.fB(a,u,n,p,o,w,q)}else if(!(n>m+q))if(this.k1.b.a[s].gaS()===a&&n>w-q)this.fi(a,u,n,p,o,w,q)}},"$1","gT",4,0,0]},f8:{"^":"c;a",
$1:function(a){return this.a.id.P(a)!=null}},jh:{"^":"Y;",
t:["ds",function(a){this.R(0)
this.fx=S.h(this.b,G.aD)
this.fy=S.h(this.b,F.L)
this.go=S.h(this.b,G.R)
this.id=S.h(this.b,G.aT)
this.k1=S.h(this.b,G.ax)
this.k2=this.b.z.h(0,new H.q(A.bp))}]}}],["","",,B,{"^":"",fp:{"^":"jk;0fx,0fy,0go,a,0b,c,d,e,f,0r,0x,0y",
U:[function(a){var z,y,x,w,v,u,t,s
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
if(v!==z||u!==y){z=new G.aa(v,u)
a.r.J(a,S.ao(z.gG(z)),z)
a.e.d.l(0,a)}},"$1","gT",4,0,0]},jk:{"^":"Y;",
t:function(a){this.R(0)
this.fx=S.h(this.b,F.L)
this.fy=S.h(this.b,G.ah)
this.go=S.h(this.b,G.bk)}}}],["","",,L,{"^":"",i_:{"^":"jw;0fx,0fy,a,0b,c,d,e,f,0r,0x,0y",
U:[function(a){var z,y,x
z=this.fx.b
y=a.a
x=z.a[y]
y=this.b.cy
z=x.a
x.a=Math.sqrt((1-0.001*y)*3.141592653589793*z*z/3.141592653589793)},"$1","gT",4,0,0]},jw:{"^":"Y;",
t:function(a){this.R(0)
this.fx=S.h(this.b,G.R)
this.fy=S.h(this.b,G.aD)}}}],["","",,G,{"^":"",ia:{"^":"jy;0fx,0fy,0go,0id,a,0b,c,d,e,f,0r,0x,0y",
U:[function(a){var z,y,x,w,v
z=this.fy.b
y=a.a
x=z.a[y]
w=this.go.b.a[y].gat()
v=w*2
y=this.id
y.E(0,a)
y.cO(0,a,x.a-w,x.b-w,v,v)},"$1","gT",4,0,0]},jy:{"^":"Y;",
t:function(a){this.R(0)
this.fx=S.h(this.b,G.aa)
this.fy=S.h(this.b,F.L)
this.go=S.h(this.b,G.R)
this.id=this.b.z.h(0,new H.q(A.bp))}}}],["","",,N,{"^":"",iM:{"^":"b;a,b",
gi:function(a){return this.a.length},
u:function(){var z,y,x
z=this.a
y=this.b
x=y+1
this.b=x
y=z[y]
this.b=x+1
return(y<<8>>>0)+z[x]},
k:function(a){return H.e(this.a)}},d0:{"^":"b;a,b",
bd:function(a,b){this.a[this.b++]=a},
d4:function(a){var z,y,x
z=this.a
y=this.b
x=y+1
this.b=x
z[y]=C.a.bv(a,8)&255
this.b=x+1
z[x]=a&255}}}],["","",,B,{"^":"",Z:{"^":"b;a,b",
k:function(a){return this.b}},c7:{"^":"b;a,b",
k:function(a){return this.b}},lM:{"^":"c:18;",
$1:function(a){switch(a){case C.u:return 4
case C.l:return 0}}}}],["","",,F,{"^":"",h7:{"^":"c1;0id,0k1,0k2,k3,a,b,c,d,e,f,r,x,y,z,0Q,0ch,0cx,0cy,db,0dx,0dy,fr,fx,fy,go",
c7:function(){var z=this.k1
z.textBaseline="top"
z.font="16px Verdana"}}}],["","",,E,{"^":"",fA:{"^":"jm;y1,y2,a6,a7,aD,0a3,0fx,0fy,0go,0id,0k1,a,0b,c,d,e,f,0r,0x,0y",
dS:function(){var z=this.y2.a
new P.ee(z,[H.z(z,0)]).bH(new E.fB(this))},
ai:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=this.b.b.b6(S.ao(C.j))
z=new H.aG(z,new E.fC(),[H.al(z,"c2",0)])
y=z.gi(z)
z=this.b.b.b6(S.ao(C.n))
z=new H.aG(z,new E.fD(),[H.al(z,"c2",0)])
x=z.gi(z)
w=this.a7
this.a7=w+this.b.cy
if(C.a.a2(C.c.aj(w),5)===4&&C.a.a2(C.c.aj(this.a7),5)===0){this.aD=window.performance.now()
z=this.y2
v=$.$get$cn().h(0,C.l)
u=J.am(v,1)
u=new Uint8Array(u)
t=new N.d0(u,0)
t.bd(1,v)
if(z.b)z.c.send(C.m.aa(u,0,t.b))}z=this.go.d6()
s=P.cQ(z,!0,H.z(z,0))
r=this.id.aB()
r.cB(r)
z=new T.ag(new Float32Array(4))
z.aI(-1,-1,0,1)
q=r.b2(z)
z=new T.ag(new Float32Array(4))
z.aI(1,1,0,1)
p=r.b2(z)
z=new E.fE(q,p)
o=new H.aG(s,z,[H.z(s,0)])
v=this.y1
v.save()
v.font="20px Verdana"
v.textBaseline="top"
v.fillStyle="white"
v.strokeStyle="grey"
C.f.a_(v,"Rendered circles: "+y,5,45)
C.f.a_(v,"Moving entities: "+x,5,65)
C.f.a_(v,"QuadTree leaves (visible/total): "+o.gi(o)+"/"+s.length,5,85)
C.f.a_(v,"Received: "+C.e.b1(this.a6/1024,3)+"kB",5,105)
C.f.a_(v,"Rate: "+C.e.b1(this.a6/1024/this.a7,3)+"kB/s ("+C.e.b1(8*this.a6/1024/1024/this.a7,3)+"Mbit/s)",5,125)
u=this.a3
u=u==null?null:C.c.W(u)
C.f.a_(v,"Ping: "+H.e(u==null?"unknown":u)+"ms",5,145)
C.f.a_(v,"Version: 0.2.0",5,165)
u=this.k1
t=u.b
n=p.a[0]
m=q.a
l=m[0]
k=t/(n-l)
v.transform(k,0,0,-k,-l*k,(u.c/k+m[1])*k)
for(u=C.b.gN(s),z=new H.d3(u,z);z.v();){t=u.gw(u).a
v.strokeRect(t.a,t.b,t.c,t.d)}v.restore()}},fB:{"^":"c;a",
$1:function(a){var z=this.a
z.a6=z.a6+a.b.a.length
if(a.a===C.t)z.a3=window.performance.now()-z.aD}},fC:{"^":"c;",
$1:function(a){return a!=null}},fD:{"^":"c;",
$1:function(a){return a!=null}},fE:{"^":"c;a,b",
$1:function(a){var z,y,x,w
z=a.a
y=this.a.a
x=y[0]
y=y[1]
w=this.b.a
return z.cP(0,P.aF(x,y,w[0]-x,w[1]-y,P.C))}},jm:{"^":"b8;",
t:function(a){this.R(0)
this.fx=S.h(this.b,G.aT)
this.fy=S.h(this.b,F.L)
this.go=this.b.z.h(0,new H.q(A.bp))
this.id=this.b.z.h(0,new H.q(F.b9))
this.k1=this.b.z.h(0,new H.q(F.aR))}}}],["","",,F,{"^":"",fq:{"^":"jl;eU,S,0L,0y1,fx,fy,go,0id,0k1,a,0b,c,d,e,f,0r,0x,0y",
t:function(a){var z
this.du(0)
z=this.S
z.toString
W.S(z,"mousemove",new F.fr(this),!1)
W.S(z,"touchmove",new F.fs(this),!1)},
U:[function(a){var z,y,x,w,v,u,t,s,r,q
z=this.L
if(z!=null){y=this.S
x=y.width
w=x/2
y=y.height
v=y/2
u=Math.min(x/3,y/3)
t=w-z.a
s=v-z.b
r=C.e.cL(65535*Math.max(0,Math.min(100,100*Math.min(u,Math.sqrt(t*t+s*s))/u))/100)
q=C.e.cL(65536*C.e.a2(6.283185307179586+Math.atan2(v-this.L.b,J.cr(this.L.a,w)),6.283185307179586)/6.283185307179586)
w=this.eU
v=$.$get$cn().h(0,C.u)
z=J.am(v,1)
z=new Uint8Array(z)
y=new N.d0(z,0)
y.bd(0,v)
y.d4(r)
y.d4(q)
if(w.b)w.c.send(C.m.aa(z,0,y.b))}this.L=null},"$1","gT",4,0,0]},fr:{"^":"c;a",
$1:function(a){this.a.L=J.eZ(a)}},fs:{"^":"c;a",
$1:function(a){var z=a.touches
z=(z&&C.aj).gfe(z)
this.a.L=new P.aE(C.c.W(z.pageX),C.c.W(z.pageY),[P.C])}},iY:{"^":"jE;a3,cH,eS,0as,0fx,0fy,0go,0id,0k1,0k2,0k3,0k4,0r1,0r2,a,0b,c,d,e,f,0r,0x,0y",
t:function(a){var z,y,x,w
this.dv(0)
z=this.eS
y=z.a
new P.ee(y,[H.z(y,0)]).bH(C.b.gex(this.a3))
y=$.$get$cn().h(0,C.l)
x=J.am(y,1)
x=new Uint8Array(x)
w=new N.d0(x,0)
w.bd(1,y)
if(z.b)z.c.send(C.m.aa(x,0,w.b))},
ai:function(){var z=this.cH
C.b.q(z,this.k4.geQ())
C.b.si(z,0)
z=this.a3
C.b.q(z,this.ge0())
C.b.si(z,0)},
fK:[function(a){var z,y,x,w,v
z=a.a
y=a.b
switch(z){case C.H:this.e2(y)
break
case C.I:this.e4(y)
break
case C.E:this.e5(y)
break
case C.J:this.er(y)
break
case C.K:this.es(y)
break
case C.L:this.ev(y)
break
case C.M:this.eu(y)
break
case C.D:this.as=y.u()
break
case C.F:case C.G:for(x=y.a.length,w=this.cH;y.b<x;){v=y.u()
if(!this.k4.eR(v))w.push(v)}break
case C.N:this.ew(y)
break
case C.O:this.ek(y)
break
case C.t:break}},"$1","ge0",4,0,19],
er:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
for(z=a.a.length,y=G.bk,x=G.ah;a.b<z;){w=a.u()
v=a.u()/15
u=a.u()/15
t=this.k4.r.h(0,w)
if(t!=null){s=this.fx.b
r=t.a
q=s.a[r]
p=q.a
o=q.b
q.a=v
q.b=u
if(this.id.P(t)!=null){s=t.r
r=new H.q(x)
n=$.$get$a3()
m=n.h(0,r)
if(m==null){m=new S.B(0,0)
l=$.n
m.a=l
$.n=l<<1>>>0
l=$.o
$.o=l+1
m.b=l
n.j(0,r,m)}s.ap(t,m)
s=t.r
r=new H.q(y)
m=n.h(0,r)
if(m==null){m=new S.B(0,0)
l=$.n
m.a=l
$.n=l<<1>>>0
l=$.o
$.o=l+1
m.b=l
n.j(0,r,m)}s.ap(t,m)}else if(this.k2.P(t)!=null){s=v-p
n=u-o
k=Math.sqrt(s*s+n*n)
r=this.k2.b.a[r]
l=J.a1(r)
l.sar(r,Math.atan2(n,s))
l.sA(r,k/this.b.cy)
r.c=0}s=new G.aa(v,u)
r=t.r
n=s.gG(s)
l=$.$get$a3()
m=l.h(0,n)
if(m==null){m=new S.B(0,0)
j=$.n
m.a=j
$.n=j<<1>>>0
j=$.o
$.o=j+1
m.b=j
l.j(0,n,m)}r.J(t,m,s)
t.e.d.l(0,t)}}},
ev:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
for(z=a.a.length,y=G.bk,x=G.ah;a.b<z;){w=a.u()
v=a.u()/15
u=a.u()/15
t=a.u()
s=this.k4.r.h(0,w)
if(s!=null){r=this.fy.b
q=s.a
r.a[q].sat(1000*t/65535)
p=this.fx.b.a[q]
o=p.a
n=p.b
p.a=v
p.b=u
if(this.id.P(s)!=null){t=s.r
r=new H.q(x)
q=$.$get$a3()
m=q.h(0,r)
if(m==null){m=new S.B(0,0)
l=$.n
m.a=l
$.n=l<<1>>>0
l=$.o
$.o=l+1
m.b=l
q.j(0,r,m)}t.ap(s,m)
t=s.r
r=new H.q(y)
m=q.h(0,r)
if(m==null){m=new S.B(0,0)
l=$.n
m.a=l
$.n=l<<1>>>0
l=$.o
$.o=l+1
m.b=l
q.j(0,r,m)}t.ap(s,m)}else if(this.k2.P(s)!=null){t=v-o
r=u-n
k=Math.sqrt(t*t+r*r)
q=this.k2.b.a[q]
l=J.a1(q)
l.sar(q,Math.atan2(r,t))
l.sA(q,k/this.b.cy)
q.c=0}t=new G.aa(v,u)
r=s.r
q=t.gG(t)
l=$.$get$a3()
m=l.h(0,q)
if(m==null){m=new S.B(0,0)
j=$.n
m.a=j
$.n=j<<1>>>0
j=$.o
$.o=j+1
m.b=j
l.j(0,q,m)}r.J(s,m,t)
s.e.d.l(0,s)}}},
es:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
for(z=a.a.length;a.b<z;){y=a.u()
x=a.u()/15
w=a.u()/15
v=a.u()
u=this.k4.r.h(0,y)
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
l=J.a1(s)
l.sar(s,Math.atan2(t,v))
l.sA(s,m/this.b.cy)
s.c=(q.a-n)/this.b.cy
s=new G.aa(x,w)
l=u.r
v=s.gG(s)
t=$.$get$a3()
k=t.h(0,v)
if(k==null){k=new S.B(0,0)
j=$.n
k.a=j
$.n=j<<1>>>0
j=$.o
$.o=j+1
k.b=j
t.j(0,v,k)}l.J(u,k,s)
u.e.d.l(0,u)}}},
eu:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
for(z=a.a.length;a.b<z;){y=a.u()
x=a.u()/15
w=a.u()/15
v=a.u()
u=a.u()
t=this.k4.r.h(0,y)
if(t!=null){s=this.fy.b
r=t.a
s.a[r].sat(1000*u/65535)
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
s=J.a1(r)
s.sar(r,Math.atan2(u,v))
s.sA(r,l/this.b.cy)
r.c=(p.a-m)/this.b.cy
r=new G.aa(x,w)
s=t.r
v=r.gG(r)
u=$.$get$a3()
k=u.h(0,v)
if(k==null){k=new S.B(0,0)
j=$.n
k.a=j
$.n=j<<1>>>0
j=$.o
$.o=j+1
k.b=j
u.j(0,v,k)}s.J(t,k,r)
t.e.d.l(0,t)}}},
e2:function(a){var z,y,x,w,v,u,t,s,r,q,p
for(z=a.a,y=z.length,x=[S.v];a.b<y;){w=this.b
v=a.u()
u=a.u()
t=a.u()
s=z[a.b++]
r=F.bz(0.35,0.4,0.4,1)
q=$.$get$be()
q=H.d([new G.bD(v),new F.L(u/15,t/15),new G.R(s/32),r,new G.aT(q.M()*6.283185307179586,q.M()*6.283185307179586,q.M()*6.283185307179586)],x)
p=w.a.ao()
C.b.q(q,p.gaq())
w.c.l(0,p)
w=this.k4
w.r.j(0,J.bg(w.b.b.a[p.a]),p)}},
e4:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
for(z=a.a,y=z.length,x=[S.v];a.b<y;){w=this.b
v=a.u()
u=a.u()
t=a.u()
s=a.b
r=s+1
a.b=r
s=z[s]
q=r+1
a.b=q
r=z[r]
a.b=q+1
q=z[q]
p=F.bz(0.35,0.4,0.4,1)
o=$.$get$be()
o=H.d([new G.bD(v),new F.L(u/15,t/15),new G.R(s/32),new G.bC(r/32,q/64),p,new G.aT(o.M()*6.283185307179586,o.M()*6.283185307179586,o.M()*6.283185307179586)],x)
n=w.a.ao()
C.b.q(o,n.gaq())
w.c.l(0,n)
w=this.k4
w.r.j(0,J.bg(w.b.b.a[n.a]),n)}},
e5:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
for(z=a.a,y=z.length,x=P.I,w=[S.v];a.b<y;){v=a.u()
u=a.u()
t=a.u()
s=6.283185307179586*a.u()/65536
r=1000*a.u()/65535
q=z[a.b++]/255
if(v!==this.as){p=this.b
o=F.bz(q,0.9,0.6,0.4)
n=new G.ba()
n.a=P.c5(64,1,!1,x)
m=new G.bj(5)
m.a=P.c5(64,1,!1,x)
m=H.d([new G.bD(v),new F.L(u/15,t/15),new G.R(r),o,new F.aC(s),n,m,new G.cb(),new G.ah(0,0,0),new G.aD()],w)
l=p.a.ao()
C.b.q(m,l.gaq())
p.c.l(0,l)}else{u=this.k3.b.h(0,"player")
t=new G.bD(this.as)
p=u.r
o=t.gG(t)
n=$.$get$a3()
k=n.h(0,o)
if(k==null){k=new S.B(0,0)
m=$.n
k.a=m
$.n=m<<1>>>0
m=$.o
$.o=m+1
k.b=m
n.j(0,o,k)}p.J(u,k,t)
t=new G.cD()
p=u.r
o=t.gG(t)
k=n.h(0,o)
if(k==null){k=new S.B(0,0)
m=$.n
k.a=m
$.n=m<<1>>>0
m=$.o
$.o=m+1
k.b=m
n.j(0,o,k)}p.J(u,k,t)
t=new G.R(r)
p=u.r
o=t.gG(t)
k=n.h(0,o)
if(k==null){k=new S.B(0,0)
m=$.n
k.a=m
$.n=m<<1>>>0
m=$.o
$.o=m+1
k.b=m
n.j(0,o,k)}p.J(u,k,t)
t=F.bz(q,0.9,0.6,0.4)
p=u.r
o=t.gG(t)
k=n.h(0,o)
if(k==null){k=new S.B(0,0)
m=$.n
k.a=m
$.n=m<<1>>>0
m=$.o
$.o=m+1
k.b=m
n.j(0,o,k)}p.J(u,k,t)
t=new F.aC(s)
p=u.r
o=t.gG(t)
k=n.h(0,o)
if(k==null){k=new S.B(0,0)
m=$.n
k.a=m
$.n=m<<1>>>0
m=$.o
$.o=m+1
k.b=m
n.j(0,o,k)}p.J(u,k,t)
t=new G.ba()
t.a=P.c5(64,1,!1,x)
p=u.r
o=t.gG(t)
k=n.h(0,o)
if(k==null){k=new S.B(0,0)
m=$.n
k.a=m
$.n=m<<1>>>0
m=$.o
$.o=m+1
k.b=m
n.j(0,o,k)}p.J(u,k,t)
t=new G.bj(5)
t.a=P.c5(64,1,!1,x)
p=u.r
o=t.gG(t)
k=n.h(0,o)
if(k==null){k=new S.B(0,0)
m=$.n
k.a=m
$.n=m<<1>>>0
m=$.o
$.o=m+1
k.b=m
n.j(0,o,k)}p.J(u,k,t)
t=new G.cb()
p=u.r
o=t.gG(t)
k=n.h(0,o)
if(k==null){k=new S.B(0,0)
m=$.n
k.a=m
$.n=m<<1>>>0
m=$.o
$.o=m+1
k.b=m
n.j(0,o,k)}p.J(u,k,t)
t=new G.ah(0,0,0)
p=u.r
o=t.gG(t)
k=n.h(0,o)
if(k==null){k=new S.B(0,0)
m=$.n
k.a=m
$.n=m<<1>>>0
m=$.o
$.o=m+1
k.b=m
n.j(0,o,k)}p.J(u,k,t)
t=new G.aD()
p=u.r
o=t.gG(t)
k=n.h(0,o)
if(k==null){k=new S.B(0,0)
m=$.n
k.a=m
$.n=m<<1>>>0
m=$.o
$.o=m+1
k.b=m
n.j(0,o,k)}p.J(u,k,t)
u.e.d.l(0,u)}}},
ew:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
for(z=a.a.length,y=G.ax;a.b<z;){x=a.u()
w=a.u()
v=a.u()
u=this.k4.r.h(0,x)
if(u!=null){if(this.k1.P(u)!=null){t=this.k1.b
s=u.a
r=t.a[s].gaS()
J.dl(this.r2.b.h(0,r.a),u)}t=new G.ah(6.283185307179586*v/65536,100*w/65535,0)
s=u.r
q=t.gG(t)
p=$.$get$a3()
o=p.h(0,q)
if(o==null){o=new S.B(0,0)
n=$.n
o.a=n
$.n=n<<1>>>0
n=$.o
$.o=n+1
o.b=n
p.j(0,q,o)}s.J(u,o,t)
t=new G.bk()
s=u.r
q=t.gG(t)
o=p.h(0,q)
if(o==null){o=new S.B(0,0)
n=$.n
o.a=n
$.n=n<<1>>>0
n=$.o
$.o=n+1
o.b=n
p.j(0,q,o)}s.J(u,o,t)
t=u.r
s=new H.q(y)
o=p.h(0,s)
if(o==null){o=new S.B(0,0)
q=$.n
o.a=q
$.n=q<<1>>>0
q=$.o
$.o=q+1
o.b=q
p.j(0,s,o)}t.ap(u,o)
u.e.d.l(0,u)}}},
ek:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
for(z=a.a.length,y=G.bC;a.b<z;){x=a.u()
w=a.u()
v=this.k4.r.h(0,x)
u=this.k4.r.h(0,w)
if(v!=null&&u!=null){t=new G.ax(u)
s=v.r
r=t.gG(t)
q=$.$get$a3()
p=q.h(0,r)
if(p==null){p=new S.B(0,0)
o=$.n
p.a=o
$.n=o<<1>>>0
o=$.o
$.o=o+1
p.b=o
q.j(0,r,p)}s.J(v,p,t)
t=v.r
s=new H.q(y)
p=q.h(0,s)
if(p==null){p=new S.B(0,0)
r=$.n
p.a=r
$.n=r<<1>>>0
r=$.o
$.o=r+1
p.b=r
q.j(0,s,p)}t.ap(v,p)
v.e.d.l(0,v)
this.r2.dd(u,v)}}},
aR:function(){return!0}},jl:{"^":"hp;",
t:["du",function(a){this.dk(0)
this.y1=S.h(this.b,G.cD)}]},jE:{"^":"b8;",
t:["dv",function(a){this.R(0)
this.fx=S.h(this.b,F.L)
this.fy=S.h(this.b,G.R)
this.go=S.h(this.b,F.aC)
this.id=S.h(this.b,G.bk)
this.k1=S.h(this.b,G.ax)
this.k2=S.h(this.b,G.ah)
this.k3=this.b.z.h(0,new H.q(S.b4))
this.k4=this.b.z.h(0,new H.q(X.dH))
this.r1=this.b.z.h(0,new H.q(A.bp))
this.r2=this.b.z.h(0,new H.q(K.bZ))}]}}],["","",,M,{"^":"",hZ:{"^":"jv;aT,0eY,0cK,0I,0Z,bE,0eV,af,0r1,0r2,0rx,0ry,0x1,0x2,0y1,z,a$,b$,c$,d$,e$,f$,r$,a,0b,c,d,e,f,0r,0x,0y",
b_:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=this.r1.b
y=b.a
x=z.a[y]
w=this.r2.b.a[y]
v=this.rx.b.a[y]
u=this.ry.b.a[y]
t=this.x1.b.a[y]
s=this.cK.b.a[y]
r=a*129
y=this.af
q=r*y
p=a*(192*this.aT)
z=this.I
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
this.bB(i,x,(h-g*f)*e,d,v,j,p,r)
e=this.I
f=i+5
g=e[f]
h=t.a[j]
e[f]=g/h
g=this.Z
f=p+j*9
g[f]=r
e=o+j
g[f+1]=e
c=n+j
g[f+2]=c
i+=m
this.bB(i,x,w.a*h,d,v,j,p,r)
this.I[i+5]=s.a[j]
h=this.Z
h[f+3]=e
h[f+4]=k+j
g=l+j
h[f+5]=g
h[f+6]=e
h[f+7]=c
h[f+8]=g}this.cE(q,C.a.aj(24),w,t,s,u,x)
this.cE(q,C.a.aj(40),w,t,s,u,x)
z=this.Z
y=p+576
z[y-1]=k
z[y-2]=o
z[y-4]=k
z[y-7]=o},
cE:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t
z=this.af
y=a+z+z*b
x=c.a
w=e.b
v=e.a[b]
u=d.a[b]
t=f.a+6.283185307179586*b/64
u=(x-w*v)*u*1.1
this.I[y]=g.a+u*Math.cos(t)
this.I[y+1]=g.b+u*Math.sin(t)
y+=64*z
z=c.a*d.a[b]*1.1
this.I[y]=g.a+z*Math.cos(t)
this.I[y+1]=g.b+z*Math.sin(t)},
b3:function(a){this.I=new Float32Array(a*129*this.af)
this.Z=new Uint16Array(a*(192*this.aT))}},h_:{"^":"jr;0S,0L,I,0r1,0r2,0rx,0ry,0x1,z,a$,b$,c$,d$,e$,f$,r$,a,0b,c,d,e,f,0r,0x,0y",
b_:function(a,b){var z,y,x,w,v,u
z=this.r2.b
y=b.a
x=z.a[y]
w=this.rx.b.a[y]
v=this.r1.b.a[y]
u=a*6
y=this.L
y[u]=x.a
y[u+1]=x.b
y[u+2]=w.a
y[u+3]=v.a
y[u+4]=v.b
y[u+5]=v.c
this.S[a]=a},
bM:function(a){var z=this.a$
z.uniformMatrix4fv(z.getUniformLocation(this.b$,"uViewProjection"),!1,this.x1.aB().a)
z.uniform1f(this.a$.getUniformLocation(this.b$,"uTime"),this.b.cx.h(0,this.y))
this.cw(this.I,this.L,this.S)
this.a$.drawElements(0,a,5123,0)},
b3:function(a){this.L=new Float32Array(a*6)
this.S=new Uint16Array(a)},
gak:function(){return"FoodRenderingSystem"},
gaC:function(){return"FoodRenderingSystem"}},fg:{"^":"jj;",
b_:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.r1.b
y=b.a
x=z.a[y]
w=this.r2.b.a[y]
v=this.rx.b.a[y]
u=this.ry.b.a[y]
t=this.x1.b.a[y]
s=a*129
y=this.af
r=s*y
q=a*128*3
z=this.I
z[r]=x.a
z[r+1]=x.b
z[r+2]=v.a
z[r+3]=v.b
z[r+4]=v.c
z[r+5]=v.d/2
for(z=r+y,p=s+1,o=s+2,n=0;n<128;++n){this.bB(z+y*n,x,w.a*t.a[n],u.a+6.283185307179586*n/128,v,n,q,s)
m=this.Z
l=q+n*3
m[l]=s
m[l+1]=p+n
m[l+2]=o+n}this.Z[q+384-1]=p},
bB:function(a,b,c,d,e,f,g,h){var z,y
this.I[a]=b.a+c*Math.cos(d)
this.I[a+1]=b.b+c*Math.sin(d)
z=this.I
z[a+2]=e.a
z[a+3]=e.b
z[a+4]=e.c
y=Math.abs(f-32)/32
z[a+5]=e.d+0.5*y*y},
bM:function(a){var z=this.a$
z.uniformMatrix4fv(z.getUniformLocation(this.b$,"uViewProjection"),!1,this.y1.aB().a)
this.cw(this.bE,this.I,this.Z)
this.a$.drawElements(4,a*(192*this.aT),5123,0)},
b3:function(a){this.I=new Float32Array(a*129*this.af)
this.Z=new Uint16Array(a*(192*this.aT))},
gak:function(){return"PositionRenderingSystem"},
gaC:function(){return"PositionRenderingSystem"}},f3:{"^":"jf;",
gak:function(){return"BackgroundRenderingSystem"},
gaC:function(){return"BackgroundRenderingSystem"}},f4:{"^":"f3;af,eW,eX,cJ,0a6,0a7,0aD,0a3,a$,b$,c$,d$,e$,f$,r$,a,0b,c,d,e,f,0r,0x,0y"},ik:{"^":"jz;x2,y1,0fx,0fy,0go,0id,a,0b,c,d,e,f,0r,0x,0y",
cv:function(){C.b.si(this.y1,0)},
U:[function(a){var z,y,x,w,v
z=this.go.b.h(0,"player")
y=this.fy.b
x=a.a
w=y.a[x]
v=(z==null?a==null:z===a)?"you":"someone else"
y=w.a
this.y1.push(new M.bq(v,C.c.K(y*y*3.141592653589793,100)))},"$1","gT",4,0,0],
cF:function(a){var z,y,x,w,v,u,t,s,r
z=this.y1
H.ix(z,new M.il())
y=this.x2;(y&&C.f).a_(y,"Ranking",this.id.b-200,0)
for(x=z.length,w=0,v=0,u=0;u<z.length;z.length===x||(0,H.by)(z),++u){t=z[u]
s=t.b
r=y.measureText(""+s).width
w+=20;++v
y.fillText(""+v+". "+t.a,this.id.b-200,w)
y.fillText(""+s,this.id.b-r,w)}}},il:{"^":"c:20;",
$2:function(a,b){return C.a.eI(b.b,a.b)}},bq:{"^":"b;a,b"},jv:{"^":"fg;",
t:function(a){this.dt(0)
this.eY=S.h(this.b,G.aD)
this.cK=S.h(this.b,G.bj)}},jr:{"^":"d2;",
t:function(a){this.bc(0)
this.r1=S.h(this.b,G.aT)
this.r2=S.h(this.b,F.L)
this.rx=S.h(this.b,G.R)
this.ry=S.h(this.b,G.aB)
this.x1=this.b.z.h(0,new H.q(F.b9))}},jj:{"^":"d2;",
t:["dt",function(a){this.bc(0)
this.r1=S.h(this.b,F.L)
this.r2=S.h(this.b,G.R)
this.rx=S.h(this.b,F.aw)
this.ry=S.h(this.b,F.aC)
this.x1=S.h(this.b,G.ba)
this.x2=S.h(this.b,G.aB)
this.y1=this.b.z.h(0,new H.q(F.b9))}]},jf:{"^":"iQ;",
t:function(a){this.dq(0)
this.a6=S.h(this.b,F.L)
this.a7=this.b.z.h(0,new H.q(F.b9))
this.aD=this.b.z.h(0,new H.q(S.b4))
this.a3=this.b.z.h(0,new H.q(F.aR))}},jz:{"^":"Y;",
t:function(a){this.R(0)
this.fx=S.h(this.b,G.aD)
this.fy=S.h(this.b,G.R)
this.go=this.b.z.h(0,new H.q(S.b4))
this.id=this.b.z.h(0,new H.q(F.aR))}}}],["","",,B,{"^":"",iT:{"^":"b;a,b,c,d",
dA:function(a,b){var z
this.b=!0
z=this.c
W.S(z,"message",new B.iW(this),!1)
W.S(z,"close",new B.iX(this),!1)},
B:{
iU:function(a,b){var z=new B.iT(new P.eb(null,null,0,[B.bI]),!1,a,b)
z.dA(a,b)
return z}}},iW:{"^":"c;a",
$1:function(a){var z=new FileReader()
W.S(z,"load",new B.iV(this.a,z),!1)
z.readAsArrayBuffer(new P.d4([],[],!1).bA(a.data,!0))}},iV:{"^":"c;a,b",
$1:function(a){var z,y
z=C.a1.gfo(this.b)
y=(z&&C.m).df(z,1)
this.a.a.l(0,new B.bI(C.ae[z[0]],new N.iM(y,0)))}},iX:{"^":"c;a",
$1:function(a){var z=this.a
z.b=!1
z.a.eH(0)}},bI:{"^":"b;a,b"}}],["","",,G,{"^":"",cD:{"^":"v;"},ba:{"^":"v;0a"},bj:{"^":"v;0a,b"},aB:{"^":"v;"},dz:{"^":"v;"},bH:{"^":"v;fw:a<,b"},cb:{"^":"v;"},cY:{"^":"v;"}}],["","",,Q,{"^":"",hW:{"^":"jt;0fx,0fy,0go,a,0b,c,d,e,f,0r,0x,0y",
ai:function(){var z,y,x,w,v,u,t,s
z=this.go.aB()
z.cB(z)
y=new T.ag(new Float32Array(4))
y.aI(-1,-1,0,1)
x=z.b2(y)
y=new T.ag(new Float32Array(4))
y.aI(1,1,0,1)
w=z.b2(y)
y=this.fy
v=x.a
u=v[0]
v=v[1]
t=w.a
s=t[0]
t=t[1]
y.e.b7(P.aF(u,v,s-u,t-v,P.I)).q(0,this.gen())},
fN:[function(a){var z=new G.aB()
a.r.J(a,S.ao(z.gG(z)),z)
a.e.d.l(0,a)},"$1","gen",4,0,0]},fZ:{"^":"jq;0fx,0fy,0go,a,0b,c,d,e,f,0r,0x,0y",
U:[function(a){var z,y,x,w
z=this.fy.b
y=a.a
x=z.a[y]
w=this.go.b.a[y]
y=x.a+w.b*this.b.cy
x.a=y
z=w.a
if(y>=z){x.a=z
a.b0(G.bC)
a.e.d.l(0,a)}},"$1","gT",4,0,0]},ip:{"^":"jA;0fx,0fy,a,0b,c,d,e,f,0r,0x,0y",
U:[function(a){a.b0(G.aa)
a.b0(G.aB)
a.e.d.l(0,a)},"$1","gT",4,0,0]},fH:{"^":"jn;0as,0cI,0eT,0fx,0fy,a,0b,c,d,e,f,0r,0x,0y",
fh:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.as.b
y=b.a
x=z.a[y]
w=this.fy.b.a[y]
v=this.cI.b.a[a.a]
u=F.co(v.a,v.b,v.c)
for(z=[S.v],t=0;t<w.a;++t){s=$.$get$be().M()*2*3.141592653589793
y=this.b
r=H.d([new F.c9(),new F.L(x.a+w.a*Math.cos(s),x.b+w.a*Math.sin(s)),F.bz(u[0],u[1]+0.1,u[2]+0.1,1),new G.bH(0.1,0.1)],z)
q=y.a.ao()
C.b.q(r,q.gaq())
y.c.l(0,q)}}},fV:{"^":"jp;0fx,a,0b,c,d,e,f,0r,0x,0y",
U:[function(a){var z,y,x
z=this.fx.b
y=a.a
x=z.a[y]
y=x.gfw()-this.b.cy
x.a=y
if(y<=0)a.e.e.l(0,a)},"$1","gT",4,0,0]},fR:{"^":"jo;aU,0S,0L,0I,0Z,0bE,0fx,0fy,0go,0id,0k1,0k2,a,0b,c,d,e,f,0r,0x,0y",
de:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r
z=this.I.b
y=a.a
x=z.a[y]
w=C.c.W((Math.atan2(e,d)-x.a)*this.aU)
v=C.e.W(C.e.K(g/f*64,4))
u=this.S.b.a[y]
t=(c+g-f)/f
for(s=-v+1,z=v*v;s<=v;++s){r=C.a.a2(w+s,64)
y=u.a
y[r]=Math.max(y[r],1+t*(1-s*s/z))}},
fB:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.I.b
y=a.a
x=z.a[y]
w=C.c.W((Math.atan2(e,d)-x.a)*this.aU)
v=g/f
u=C.e.W(C.e.K(v*64,4))
t=this.S.b.a[y]
s=(f+g-c)/g
r=this.L.b.a[y]
q=u*u*u
p=q*u
for(o=-u+1,z=v*s;o<=u;++o){n=C.a.a2(w+o,64)
y=t.a
m=o*o
y[n]=Math.min(y[n],1-z*(1-m*m/p))
r.a[n]=1-s*(1-Math.abs(m*o)/q)}},
eB:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=this.I.b
y=a.a
x=z.a[y]
w=C.c.W((Math.atan2(e,d)-x.a)*this.aU)
v=g/f
u=C.e.W(C.e.K(v*64,4))
t=this.S.b.a[y]
z=f+g-c
s=z/g
r=this.L.b.a[y]
q=(c+g-f)/f
p=u*u
o=p*u
n=o*u
y=g/2
m=(z-y)/y
m*=m
for(l=-u+1,z=v*s,y=1-m;l<=u;++l){k=C.a.a2(w+l,64)
j=t.a
i=j[k]
h=l*l
j[k]=m*Math.max(i,1+q*(1-h/p))+y*Math.min(i,1-z*(1-h*h/n))
r.a[k]=1-s*(1-Math.abs(h*l)/o)}},
fi:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p
z=this.I.b
y=a.a
x=z.a[y]
w=C.c.W((Math.atan2(e,d)-x.a)*this.aU)
v=C.e.W(C.e.K(g/f*64,4))
u=this.S.b.a[y]
t=this.L.b.a[y]
s=(c+g-f)/f
r=v*v*v
for(q=-v+1;q<=v;++q){p=C.a.a2(w+q,64)
z=u.a
y=s*(1-Math.abs(q*q*q)/r)
z[p]=Math.max(z[p],1+y)
t.a[p]=1-y}}},j1:{"^":"jF;0fx,a,0b,c,d,e,f,0r,0x,0y",
U:[function(a){var z,y,x,w
z=this.fx.b
y=a.a
x=z.a[y].a
for(w=0;w<64;++w)x[w]=0.2+0.8*x[w]},"$1","gT",4,0,0]},ff:{"^":"ji;0fx,a,0b,c,d,e,f,0r,0x,0y",
U:[function(a){var z,y,x,w
z=this.fx.b
y=a.a
x=z.a[y].a
for(z=this.b,w=0;w<64;++w)x[w]=1+(x[w]-1)*(1-0.999*z.cy)},"$1","gT",4,0,0]},iH:{"^":"jC;0fx,0fy,0go,0id,0k1,0k2,0k3,0k4,0r1,a,0b,c,d,e,f,0r,0x,0y",
U:[function(a){var z,y,x,w,v,u,t,s,r,q
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
this.bV(x,w,t,u,s,y+2.356194490192345,q+2.356194490192345,v,r,1)
this.bV(x,w,t,u,s,y-2.356194490192345,q-2.356194490192345,v,r,-1)},"$1","gT",4,0,0],
bV:function(a8,a9,b0,b1,b2,b3,b4,b5,b6,b7){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7
if(b7===1){z=C.a.aj(24)
y=b6.a
x=y[z]
w=y[z+1]}else{v=C.a.aj(40)
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
b=F.co(b2.a,b2.b,b2.c)
a=b[2]+0.1
b[2]=a
a0=b[1]+0.3
b[1]=a0
a1=F.dg(b[0],a0,a)
for(p=p+o*l*w-u,m=k+j*m*w-t,h=y+i*h*w-s,n=r+g*n*w-q,e=d/e*0.9,g=c-0.04908738521234052,r=[S.v],a2=0;a2<b0.a/10;++a2){y=$.$get$be()
a3=y.M()
a4=y.M()
a5=u+a3*p
a6=t+a3*m
o=this.b
l=a1[0]
k=a1[1]
j=a1[2]
i=new F.aw(l,k,j,1,null,1)
i.e=F.co(l,k,j)[2]
i.r=l
i.x=k
i.y=j
j=1+2*y.M()
k=y.M()
k=H.d([new F.L(a5+a4*(s+a3*h-a5),a6+a4*(q+a3*n-a6)),new F.c9(),new G.cY(),i,new G.bH(j,j),new G.ah(g+y.M()*3.141592653589793/32,e+k*0.2,0)],r)
a7=o.a.ao()
C.b.q(k,a7.gaq())
o.c.l(0,a7)}}},iG:{"^":"jB;0fx,0fy,0go,a,0b,c,d,e,f,0r,0x,0y",
U:[function(a){var z,y,x,w,v,u,t,s
z=this.fy.b
y=a.a
x=z.a[y]
w=this.go.b.a[y]
v=F.co(x.r,x.x,x.y)
y=v[0]
z=w.a
u=w.b
y-=0.2*(1-z/u)
v[0]=y
t=v[1]*z/u
v[1]=t
z=v[2]*z/u
v[2]=z
s=F.dg(y,t,z)
x.a=s[0]
x.b=s[1]
x.c=s[2]
x.d=w.a/u},"$1","gT",4,0,0]},jt:{"^":"b8;",
t:function(a){this.R(0)
this.fx=this.b.z.h(0,new H.q(F.aR))
this.fy=this.b.z.h(0,new H.q(A.bp))
this.go=this.b.z.h(0,new H.q(F.b9))}},jq:{"^":"Y;",
t:function(a){this.R(0)
this.fx=S.h(this.b,G.aT)
this.fy=S.h(this.b,G.R)
this.go=S.h(this.b,G.bC)}},jA:{"^":"Y;",
t:function(a){this.R(0)
this.fx=S.h(this.b,G.aa)
this.fy=S.h(this.b,G.aB)}},jn:{"^":"f6;",
t:function(a){this.dr(0)
this.as=S.h(this.b,F.L)
this.cI=S.h(this.b,F.aw)
this.eT=this.b.z.h(0,new H.q(K.bZ))}},jp:{"^":"Y;",
t:function(a){this.R(0)
this.fx=S.h(this.b,G.bH)}},jo:{"^":"f7;",
t:function(a){this.ds(0)
this.S=S.h(this.b,G.ba)
this.L=S.h(this.b,G.bj)
this.I=S.h(this.b,F.aC)
this.Z=S.h(this.b,G.aB)
this.bE=this.b.z.h(0,new H.q(S.b4))}},jF:{"^":"Y;",
t:function(a){this.R(0)
this.fx=S.h(this.b,G.ba)}},ji:{"^":"Y;",
t:function(a){this.R(0)
this.fx=S.h(this.b,G.bj)}},jC:{"^":"Y;",
t:function(a){this.R(0)
this.fx=S.h(this.b,F.L)
this.fy=S.h(this.b,G.aa)
this.go=S.h(this.b,F.aC)
this.id=S.h(this.b,G.cb)
this.k1=S.h(this.b,G.ah)
this.k2=S.h(this.b,G.R)
this.k3=S.h(this.b,F.aw)
this.k4=S.h(this.b,G.ba)
this.r1=S.h(this.b,G.aB)}},jB:{"^":"Y;",
t:function(a){this.R(0)
this.fx=S.h(this.b,G.cY)
this.fy=S.h(this.b,F.aw)
this.go=S.h(this.b,G.bH)}}}],["","",,S,{"^":"",
ao:function(a){var z,y,x
z=$.$get$a3()
y=z.h(0,a)
if(y==null){y=new S.B(0,0)
x=$.n
y.a=x
$.n=x<<1>>>0
x=$.o
$.o=x+1
y.b=x
z.j(0,a,y)}return y},
D:{"^":"b;a,b,c",
H:function(a,b){var z={}
z.a=a
C.b.q(b,new S.f1(z))
return z.a}},
f1:{"^":"c;a",
$1:function(a){var z=this.a
z.a=(z.a|S.ao(a).a)>>>0}},
v:{"^":"b;",
bs:function(){}},
fm:{"^":"a4;b,c,0a",
t:function(a){},
fM:[function(a){this.dX(a,new S.fn(a))
a.c=0},"$1","ge9",4,0,0],
J:function(a,b,c){var z,y,x,w,v
z=b.b
y=this.b
y.bh(z)
x=y.a[z]
if(x==null){w=S.v
v=new Array(16)
v.fixed$length=Array
x=new S.T(H.d(v,[w]),0,[w])
y.j(0,z,x)}x.j(0,a.a,c)
y=b.a
a.c=(a.c|y)>>>0},
ap:function(a,b){var z,y,x
if((a.c&b.a)>>>0!==0){z=b.b
y=this.b
x=a.a
J.cs(y.a[z],x).bs()
J.ct(y.a[z],x,null)
x=b.a
a.c=(a.c&~x)>>>0}},
b6:function(a){var z,y,x,w,v
z=a.b
y=this.b
y.bh(z)
x=y.a[z]
if(x==null){w=S.v
v=new Array(16)
v.fixed$length=Array
x=new S.T(H.d(v,[w]),0,[w])
y.j(0,z,x)}return x},
dX:function(a,b){var z,y,x
z=a.c
for(y=this.b,x=0;z>0;){if((z&1)===1)b.$2(y.a[x],x);++x
z=z>>>1}},
ae:function(a){return this.c.l(0,a)}},
fn:{"^":"c:21;a",
$2:function(a,b){var z=this.a.a
a.a[z].bs()
a.j(0,z,null)}},
B:{"^":"b;a,b"},
X:{"^":"b;a,0b,c,d,e,0f,0r",
k:function(a){return"Entity["+H.e(this.a)+"]"},
fP:[function(a){var z,y,x,w,v,u
z=this.r
y=S.ao(J.dk(a))
x=y.b
z=z.b
z.bh(x)
w=z.a[x]
if(w==null){v=S.v
u=new Array(16)
u.fixed$length=Array
w=new S.T(H.d(u,[v]),0,[v])
z.j(0,x,w)}w.j(0,this.a,a)
z=y.a
this.c=(this.c|z)>>>0},"$1","gaq",4,0,22],
b0:function(a){var z,y,x,w
z=this.r
y=S.ao(new H.q(a))
if((this.c&y.a)>>>0!==0){x=y.b
z=z.b
w=this.a
J.cs(z.a[x],w).bs()
J.ct(z.a[x],w,null)
y=y.a
this.c=(this.c&~y)>>>0}}},
fS:{"^":"a4;b,c,d,e,f,r,x,y,0a",
t:function(a){},
ao:function(){var z,y
z=this.c.cX(0)
if(z==null){y=this.a
z=new S.X(this.y.eG(),0,0,y)
z.f=y.a
z.r=y.b}++this.r
y=$.dA
$.dA=y+1
z.b=y
return z},
az:function(a){++this.e;++this.f
this.b.j(0,a.a,a)},
bD:function(a,b){this.d.j(0,b.a,!1)},
bC:function(a,b){this.d.j(0,b.a,!0)},
ae:function(a){var z=a.a
this.b.j(0,z,null)
this.d.j(0,z,!1)
this.c.l(0,a);--this.e;++this.x}},
kt:{"^":"b;a,b",
eG:function(){var z=this.a
if(z.b>0)return z.cX(0)
return this.b++}},
ac:{"^":"b;",
F:function(a){var z,y,x
this.r=this.d===0&&this.f===0
z=new H.q(H.ck(this))
y=$.d8
if(y==null){y=P.O(P.bM,P.A)
$.d8=y}x=y.h(0,z)
if(x==null){y=$.ew
x=C.a.ei(1,y)
$.ew=y+1
$.d8.j(0,z,x)}this.a=x},
cv:function(){},
cF:function(a){},
t:["R",function(a){}],
bf:function(a){var z,y,x,w
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
a.d=(a.d|z)>>>0}else if(!w&&y)this.br(a)},
br:function(a){var z
this.c.E(0,a)
z=this.a
a.d=(a.d&~z)>>>0},
az:function(a){return this.bf(a)},
bz:function(a){return this.bf(a)},
bD:function(a,b){return this.bf(b)},
ae:function(a){var z=this.a
if((z&a.d)>>>0===z)this.br(a)},
bC:function(a,b){var z=this.a
if((z&b.d)>>>0===z)this.br(b)}},
a4:{"^":"b;",
t:["bb",function(a){}],
az:function(a){},
bz:function(a){},
ae:function(a){},
bC:function(a,b){},
bD:function(a,b){}},
b4:{"^":"a4;b,c,0a",
ae:function(a){var z=this.c.E(0,a)
if(z!=null)this.b.E(0,z)}},
hN:{"^":"b;0a,0b,$ti",
h:function(a,b){var z,y
z=this.b
y=b.a
return z.a[y]},
P:function(a){var z,y
z=this.b
y=a.a
z=z.a
if(y<z.length)return z[y]
return},
B:{
h:function(a,b){var z,y
z=new S.hN([b])
y=S.ao(new H.q(b))
z.a=y
z.b=a.b.b6(y)
return z}}},
Y:{"^":"ac;",
bK:function(a){return a.q(0,this.gT())},
aR:function(){return!0}},
b8:{"^":"ac;",
bK:function(a){return this.ai()},
aR:function(){return!0}},
T:{"^":"jQ;a,b,$ti",
h:function(a,b){return this.a[b]},
ga9:function(a){return this.b},
cX:function(a){var z,y,x
z=this.b
if(z>0){y=this.a;--z
this.b=z
x=y[z]
y[this.ga9(this)]=null
return x}return},
E:function(a,b){var z,y,x
for(z=0;z<this.ga9(this);++z){y=this.a
if(b===y[z]){x=this.b-1
this.b=x
y[z]=y[x]
y[this.ga9(this)]=null
return!0}}return!1},
l:["dh",function(a,b){var z,y
z=this.b
y=this.a.length
if(z===y)this.bl(C.a.K(y*3,2)+1)
z=this.a
y=this.b
this.b=y+1
z[y]=b}],
j:function(a,b,c){if(b>=this.a.length)this.bl(b*2)
if(this.b<=b)this.b=b+1
this.a[b]=c},
bl:function(a){var z,y
z=this.a
y=new Array(a)
y.fixed$length=Array
y=H.d(y,[H.al(this,"T",0)])
C.b.av(y,0,z.length,z)
this.a=y},
bh:function(a){if(a>=this.a.length)this.bl(a*2)},
gN:function(a){var z=C.b.aa(this.a,0,this.ga9(this))
return new J.cw(z,z.length,0)},
gi:function(a){return this.ga9(this)},
$isj:1},
x:{"^":"T;c,d,a,b",
l:function(a,b){var z,y
if(this.d)this.aM()
z=b.a
y=this.c
if(z>=y.c)y.ba(C.a.K(z*3,2)+1)
if(!y.h(0,z)){y.j(0,z,!0)
this.dh(0,b)}},
E:function(a,b){var z=this.c.h(0,b.a)
this.eb(b)
return z},
eb:function(a){this.c.j(0,a.a,!1)
this.d=!0},
ga9:function(a){if(this.d)this.aM()
return this.b},
gN:function(a){var z
if(this.d)this.aM()
z=this.a
if(this.d)this.aM()
z=C.b.aa(z,0,this.b)
return new J.cw(z,z.length,0)},
aM:function(){var z,y,x,w
z={}
y=this.c.cC(!0)
this.b=y
y=new Array(y)
y.fixed$length=Array
x=H.d(y,[S.X])
if(this.b>0){z.a=0
y=this.a
w=H.z(y,0)
new H.aG(new H.iD(y,new S.fO(z,this),[w]),new S.fP(this),[w]).q(0,new S.fQ(z,x))}this.a=x
this.d=!1},
$asc2:function(){return[S.X]},
$asj:function(){return[S.X]},
$asT:function(){return[S.X]}},
fO:{"^":"c;a,b",
$1:function(a){return this.a.a<this.b.b}},
fP:{"^":"c;a",
$1:function(a){return this.a.c.h(0,a.a)}},
fQ:{"^":"c;a,b",
$1:function(a){this.b[this.a.a++]=a
return a}},
j2:{"^":"b;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
fU:[function(a){return a.t(0)},"$1","gf8",4,0,23],
fV:[function(a){return a.t(0)},"$1","gf9",4,0,24],
a5:function(a){this.z.j(0,new H.q(H.ck(a)),a)
this.Q.l(0,a)
a.a=this},
eP:function(a){var z=this.a.ao()
C.b.q(a,z.gaq())
this.c.l(0,z)
return z},
eA:function(a,b,c){a.b=this
a.x=!1
a.y=b
this.x.j(0,J.dk(a),a)
this.y.push(a)
this.cx.bL(0,b,new S.jb())
this.ch.bL(0,b,new S.jc())},
ez:function(a,b){return this.eA(a,b,!1)},
ax:function(a,b){a.q(0,new S.j5(this,b))
a.c.ba(0)
a.d=!0},
bJ:function(a){var z=this.ch
z.j(0,a,J.am(z.h(0,a),1))
z=this.cx
z.j(0,a,J.am(z.h(0,a),this.cy))
this.cj()
z=this.y
new H.aG(z,new S.jd(a),[H.z(z,0)]).q(0,new S.je(this))},
cV:function(){return this.bJ(0)},
cj:function(){var z,y
this.ax(this.c,new S.j6())
this.ax(this.d,new S.j7())
this.ax(this.r,new S.j8())
this.ax(this.f,new S.j9())
this.ax(this.e,new S.ja())
z=this.b
y=z.c
y.q(0,z.ge9())
y.c.ba(0)
y.d=!0},
h:function(a,b){return this.db.h(0,b)},
j:function(a,b,c){this.db.j(0,b,c)}},
jb:{"^":"c;",
$0:function(){return 0}},
jc:{"^":"c;",
$0:function(){return 0}},
j5:{"^":"c;a,b",
$1:function(a){var z,y
z=this.a
y=this.b
z.Q.q(0,new S.j3(y,a))
C.b.q(z.y,new S.j4(y,a))}},
j3:{"^":"c;a,b",
$1:function(a){return this.a.$2(a,this.b)}},
j4:{"^":"c;a,b",
$1:function(a){return this.a.$2(a,this.b)}},
jd:{"^":"c;a",
$1:function(a){return!a.x&&a.y===this.a}},
je:{"^":"c;a",
$1:function(a){if(a.aR()){a.cv()
a.bK(a.c)
a.cF(0)}this.a.cj()}},
j6:{"^":"c:1;",
$2:function(a,b){return a.az(b)}},
j7:{"^":"c:1;",
$2:function(a,b){return a.bz(b)}},
j8:{"^":"c:1;",
$2:function(a,b){return a.bC(0,b)}},
j9:{"^":"c:1;",
$2:function(a,b){return a.bD(0,b)}},
ja:{"^":"c:1;",
$2:function(a,b){return a.ae(b)}},
jQ:{"^":"b+c2;"}}],["","",,L,{"^":"",
lz:function(a,b,c){return P.cH(H.d([W.dG("packages/"+a+"/assets/shader/"+b+".vert",null,null),W.dG("packages/"+a+"/assets/shader/"+c+".frag",null,null)],[[P.V,,]]),null,!1,null).X(new L.lA(),L.dW)},
ho:{"^":"b;a,b"},
ju:{"^":"d2;",
t:function(a){this.bc(0)
this.r1=S.h(this.b,F.L)
this.r2=S.h(this.b,F.c9)
this.rx=S.h(this.b,F.aw)
this.ry=this.b.z.h(0,new H.q(F.b9))
this.x1=this.b.z.h(0,new H.q(S.b4))}},
lA:{"^":"c;",
$1:function(a){var z=J.a7(a)
return new L.dW(z.h(a,0),z.h(a,1))}},
dW:{"^":"b;a,b"},
dU:{"^":"b;"},
h0:{"^":"b8;fx,fy,go,a,0b,c,d,e,f,0r,0x,0y",
ai:function(){var z,y
z=this.fx
z[C.a.a2(this.b.ch.h(0,this.y),20)]=this.b.cy
z=C.b.fm(z,new L.h2())
y=this.go
y.save()
y.font="20px Verdana"
y.textBaseline="top"
y.fillStyle=this.fy
C.f.a_(y,"FPS: "+C.e.b1(20/z,2),5,5)
C.f.a_(y,"Entities: "+this.b.a.e,5,25)
y.restore()}},
h1:{"^":"c;",
$1:function(a){return 0}},
h2:{"^":"c:25;",
$2:function(a,b){return a+b}},
hp:{"^":"Y;",
t:["dk",function(a){this.k1=W.S(window,"keydown",this.gf6(),!1)
this.id=W.S(window,"keyup",new L.hq(this),!1)}],
cM:[function(a,b){this.fy.j(0,a.keyCode,b)
if(!b&&this.go.h(0,a.keyCode)===!0)this.go.j(0,a.keyCode,!1)
if(this.fx.eK(0,a.keyCode))a.preventDefault()},function(a){return this.cM(a,!0)},"fR","$2$keyDown","$1","gf6",4,3,26],
gah:function(a){return this.cQ(65)||this.cQ(37)},
cQ:function(a){return this.fy.h(0,a)===!0&&this.go.h(0,a)!==!0}},
hq:{"^":"c;a",
$1:function(a){return this.a.cM(a,!1)}},
fb:{"^":"b8;fx,fy,a,0b,c,d,e,f,0r,0x,0y",
ai:function(){var z,y
z=this.fx
z.toString
y=z.getContext("2d")
y.fillStyle=this.fy
y.clearRect(0,0,z.width,z.height)}},
iR:{"^":"b8;fx,a,0b,c,d,e,f,0r,0x,0y",
t:function(a){this.fx.clearColor(0,0,0,1)},
ai:function(){this.fx.clear(16640)}},
d1:{"^":"b;",
cN:function(){var z,y,x,w
z=this.c9(35633,this.c$.a)
y=this.c9(35632,this.c$.b)
x=this.a$.createProgram()
this.b$=x
w=this.a$
w.attachShader(x,z)
w.attachShader(this.b$,y)
w.linkProgram(this.b$)
if(!this.a$.getProgramParameter(this.b$,35714)){H.mc(new H.q(H.ck(this)).k(0)+" - Error linking program: "+H.e(this.a$.getProgramInfoLog(this.b$)))
this.r$=!1}},
c9:function(a,b){var z,y
z=this.a$.createShader(a)
y=this.a$
y.shaderSource(z,b)
y.compileShader(z)
if(!this.a$.getShaderParameter(z,35713)){this.r$=!1
throw H.a(P.aQ(this.gG(this).k(0)+" - Error compiling shader "+this.gak()+" or "+this.gaC()+": "+H.e(this.a$.getShaderInfoLog(z))))}return z},
eF:function(a,b,c,d,e){var z,y,x
z=this.f$
y=z.h(0,b)
if(null==y){y=this.a$.createBuffer()
z.j(0,b,y)}x=this.a$.getAttribLocation(this.b$,b)
if(x===-1)throw H.a(P.aQ("Attribute "+b+" not found in shader "+this.gak()+"}"))
z=this.a$
z.bindBuffer(34962,y)
z.bufferData(34962,c,e)
z.vertexAttribPointer(x,d,5126,!1,0,0)
z.enableVertexAttribArray(x)},
by:function(a,b,c,d){return this.eF(a,b,c,d,35048)},
cw:function(a,b,c){var z,y,x,w,v,u,t,s,r
if(null==this.d$){this.d$=this.a$.createBuffer()
this.e$=this.a$.createBuffer()}z=this.a$
z.bindBuffer(34962,this.d$)
z.bufferData(34962,b,35048)
for(z=a.length,y=0,x=0;x<z;++x)y+=a[x].b
for(w=4*y,v=0,x=0;x<z;++x){u=a[x]
t=u.a
s=this.a$.getAttribLocation(this.b$,t)
if(s===-1)throw H.a(P.aQ("Attribute "+t+" not found in shader "+this.gak()+"}"))
t=this.a$
r=u.b
t.vertexAttribPointer(s,r,5126,!1,w,4*v)
t.enableVertexAttribArray(s)
v+=r}z=this.a$
z.bindBuffer(34963,this.e$)
z.bufferData(34963,c,35048)},
gcR:function(){return}},
bh:{"^":"b;a,b"},
d2:{"^":"lg;",
t:["bc",function(a){this.cN()}],
bK:function(a){var z,y
z={}
y=a.ga9(a)
if(y>0){this.a$.useProgram(this.b$)
if(y>this.z){this.b3(y)
this.z=y}z.a=0
a.q(0,new L.iS(z,this))
this.bM(y)}},
aR:function(){return this.r$}},
iS:{"^":"c;a,b",
$1:function(a){this.b.b_(this.a.a++,a)}},
iQ:{"^":"lf;",
t:["dq",function(a){this.cN()}],
ai:function(){var z,y,x,w,v,u,t,s,r,q,p,o
this.a$.useProgram(this.b$)
z=this.a6
y=this.aD.b.h(0,"player")
z=z.b
y=y.a
x=z.a[y]
y=this.a3
z=y.b
y=y.c
w=Math.max(H.aK(z),H.aK(y))/1
y=x.a
z=this.cJ
v=y*z
u=x.b*z
z=-w/2
y=this.af
t=z+v+y
s=this.eW
z=z+u+s
r=w/2
q=r+u+s
r=r+v+y
p=new Float32Array(H.d9(H.d([t,z,t,q,r,q,r,z],[P.I])))
o=this.a7.cD(v,u)
o.bR(0,v,u)
o.d8(0,1,1)
o.bR(0,-v,-u)
o.bR(0,-y,-s)
s=this.a$
s.uniformMatrix4fv(s.getUniformLocation(this.b$,"uViewProjection"),!1,o.a)
y=this.a$.getUniformLocation(this.b$,"uDimension")
z=this.a3
r=z.b
r.toString
z=z.c
z.toString
s.uniform4f(y,r,z,0,0)
s.uniform4f(this.a$.getUniformLocation(this.b$,"uPosition"),x.a,x.b,0,0)
s.uniform3fv(this.a$.getUniformLocation(this.b$,"uRgb"),this.eX)
s.uniform1f(this.a$.getUniformLocation(this.b$,"uTime"),this.b.cx.h(0,this.y))
this.by(0,"aPosition",p,2)
this.a$.drawArrays(6,0,4)}},
hX:{"^":"ju;0S,0L,0r1,0r2,0rx,0ry,0x1,z,a$,b$,c$,d$,e$,f$,r$,a,0b,c,d,e,f,0r,0x,0y",
b_:function(a,b){var z,y,x,w,v,u
z=this.r1.b
y=b.a
x=z.a[y]
w=this.rx.b.a[y]
v=a*2
u=a*4
y=this.S
y[v]=x.a
y[v+1]=x.b
y=this.L
y[u]=w.a
y[u+1]=w.b
y[u+2]=w.c
y[u+3]=w.d},
bM:function(a){var z=this.a$
z.uniformMatrix4fv(z.getUniformLocation(this.b$,"uViewProjection"),!1,this.ry.aB().a)
this.by(0,"aPosition",this.S,2)
this.by(0,"aColor",this.L,4)
this.a$.drawArrays(0,0,a)},
b3:function(a){this.S=new Float32Array(a*2)
this.L=new Float32Array(a*4)},
gak:function(){return"ParticleRenderingSystem"},
gaC:function(){return"ParticleRenderingSystem"},
gcR:function(){return"gamedev_helpers"}},
c1:{"^":"b;",
dz:function(a,b,c,d,e,f,g,a0,a1,a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=this.c
if(z!=null){z.textBaseline="top"
z.font="12px Verdana"}else{z=this.d
if(z!=null){z.enable(3042)
z.blendFunc(770,771)}else this.go=!0}z=this.b
z.toString
W.S(z,"webkitfullscreenchange",this.ge_(),!1)
z=S.X
y=new Array(16)
y.fixed$length=Array
x=[z]
y=H.d(y,x)
z=[z]
w=new Array(16)
w.fixed$length=Array
w=H.d(w,x)
v=P.aJ
u=new Array(16)
u.fixed$length=Array
u=H.d(u,[v])
t=P.A
s=new Array(16)
s.fixed$length=Array
s=new S.fS(new S.T(y,0,z),new S.T(w,0,z),new S.T(u,0,[v]),0,0,0,0,new S.kt(new S.T(H.d(s,[t]),0,[t]),0))
v=[S.T,S.v]
u=new Array(16)
u.fixed$length=Array
u=H.d(u,[v])
z=D.w(16,!1)
w=new Array(16)
w.fixed$length=Array
w=new S.fm(new S.T(u,0,[v]),new S.x(z,!1,H.d(w,x),0))
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
m=P.bM
l=S.ac
k=H.d([],[l])
j=S.a4
i=new Array(16)
i.fixed$length=Array
t=new S.j2(s,w,new S.x(z,!1,v,0),new S.x(u,!1,y,0),new S.x(r,!1,q,0),new S.x(p,!1,o,0),new S.x(n,!1,x,0),P.O(m,l),k,P.O(m,j),new S.T(H.d(i,[j]),0,[j]),P.c4([0,0],t,t),P.c4([0,0],t,P.I),0,P.O(P.p,P.b))
t.a5(s)
t.a5(w)
t.a5(new F.aR(!1))
this.Q=t
h=document.querySelector("button#fullscreen")
if(null!=h){z=J.f_(h)
W.S(z.a,z.b,new L.hj(),!1)}},
e1:function(){return this.dF().X(new L.he(this),null).X(new L.hf(this),null).X(new L.hg(this),null)},
dF:function(){var z=H.d([],[[P.V,,]])
return P.cH(z,null,!1,null).X(new L.hb(this),null)},
e3:function(){var z,y,x,w,v,u,t
z=P.p
y=S.X
x=P.O(z,y)
z=P.O(y,z)
w=this.Q
w.a5(new S.b4(x,z))
w.a5(new F.b9())
v=P.A
w.a5(new K.bZ(P.O(v,[P.l,S.X])))
u=[A.ci,S.X]
w.a5(new A.bp(new A.ae(C.ai,16,null,H.d([],[[A.ae,S.X]]),H.d([],[u]),[y]),P.O(y,u)))
w.a5(new X.dH(P.O(v,y),0))
y=$.$get$be()
y=H.d([new F.L(4369*y.M(),4369*y.M())],[S.v])
t=this.Q.eP(y)
x.j(0,"player",t)
z.j(0,t,"player")
return this.f7().X(new L.hd(this),null)},
dc:function(a){return this.e1().X(new L.hm(this),L.c1)},
el:function(){var z=window.performance.now()
z.toString
this.dy=z
if(null!=C.b.f0(this.Q.y,new L.hh(),new L.hi()))this.fl()
C.y.cY(window,this.gdW())},
fl:[function(){var z,y
z=window.performance.now()
z.toString
y=this.Q
y.cy=(z-this.dy)/1000
this.dy=z
y.bJ(1)
y=this.fy
if(!y)P.h3(C.a0,this.gfk(),-1)},"$0","gfk",0,0,3],
fH:[function(a){var z
this.bt()
this.dx=a/1000
z=this.Q
z.cy=0.016666666666666666
z.cV()
C.y.gcu(window).X(new L.hc(this),-1)},"$1","gdW",4,0,27],
d1:function(a,b){var z,y
this.bt()
z=this.dx
y=this.Q
y.cy=b-z
this.dx=b
y.cV()
z=this.fy
if(!z)C.y.gcu(window).X(new L.hn(this),-1)},
fJ:[function(a){this.fr=!this.fr
this.bt()},"$1","ge_",4,0,28],
bt:function(){var z,y,x,w
if(null!=this.b){z=document.body
y=z.clientWidth
z=z.clientHeight
x=this.k2.style
w=H.e(y)+"px"
x.width=w
w=H.e(z)+"px"
x.height=w
this.cZ(this.id,y,z)
this.c7()
this.dj(y,z)}},
fS:["dj",function(a,b){var z
this.cZ(this.b,a,b)
z=this.Q.z.h(0,new H.q(F.aR))
z.sa1(0,a)
z.c=b
if(this.fy||!1){z=this.Q
z.cy=0
z.bJ(0)}z=this.d
z.viewport(0,0,z.drawingBufferWidth,z.drawingBufferHeight)}],
f7:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
z=H.d([],[[P.V,,]])
y=this.k3
x=H.d([],[B.bI])
w=P.A
v=H.d([],[w])
u=D.w(16,!1)
t=new Array(16)
t.fixed$length=Array
s=[S.X]
t=new F.iY(x,v,y,0,new S.x(u,!1,H.d(t,s),0),0,0,0)
t.F(new S.D(0,0,0))
u=this.id
v=new S.D(0,0,0)
x=[P.bM]
v.a=v.H(0,H.d([C.al],x))
r=P.hI([38,40,37,39,32],w)
q=P.aJ
p=D.w(16,!1)
o=new Array(16)
o.fixed$length=Array
o=new F.fq(y,u,r,P.O(w,q),P.O(w,q),0,new S.x(p,!1,H.d(o,s),0),v.a,v.b,v.c)
o.F(v)
v=new S.D(0,0,0)
v.a=v.H(0,H.d([C.R,C.h,C.an],x))
p=H.d([C.Q],x)
v.b=v.H(v.b,p)
p=D.w(16,!1)
q=new Array(16)
q.fixed$length=Array
q=new Q.fZ(0,new S.x(p,!1,H.d(q,s),0),v.a,v.b,v.c)
q.F(v)
v=new S.D(0,0,0)
v.a=v.H(0,H.d([C.i,C.T,C.ak],x))
p=D.w(16,!1)
r=new Array(16)
r.fixed$length=Array
r=new B.fp(0,new S.x(p,!1,H.d(r,s),0),v.a,v.b,v.c)
r.F(v)
v=new S.D(0,0,0)
v.a=v.H(0,H.d([C.h,C.p],x))
p=D.w(16,!1)
u=new Array(16)
u.fixed$length=Array
u=new L.i_(0,new S.x(p,!1,H.d(u,s),0),v.a,v.b,v.c)
u.F(v)
v=new S.D(0,0,0)
v.a=v.H(0,H.d([C.i],x))
p=H.d([C.am],x)
v.b=v.H(v.b,p)
p=H.d([C.Q,C.h],x)
v.a=v.H(v.a,p)
p=D.w(16,!1)
n=new Array(16)
n.fixed$length=Array
n=new Q.fH(0,new S.x(p,!1,H.d(n,s),0),v.a,v.b,v.c)
n.F(v)
v=new S.D(0,0,0)
v.a=v.H(0,H.d([C.n,C.i,C.h],x))
p=D.w(16,!1)
m=new Array(16)
m.fixed$length=Array
m=new G.ia(0,new S.x(p,!1,H.d(m,s),0),v.a,v.b,v.c)
m.F(v)
v=D.w(16,!1)
p=new Array(16)
p.fixed$length=Array
p=new Q.hW(0,new S.x(v,!1,H.d(p,s),0),0,0,0)
p.F(new S.D(0,0,0))
v=new S.D(0,0,0)
v.a=v.H(0,H.d([C.q],x))
l=D.w(16,!1)
k=new Array(16)
k.fixed$length=Array
k=new Q.j1(0,new S.x(l,!1,H.d(k,s),0),v.a,v.b,v.c)
k.F(v)
v=new S.D(0,0,0)
v.a=v.H(0,H.d([C.v],x))
l=D.w(16,!1)
j=new Array(16)
j.fixed$length=Array
j=new Q.ff(0,new S.x(l,!1,H.d(j,s),0),v.a,v.b,v.c)
j.F(v)
v=new S.D(0,0,0)
v.a=v.H(0,H.d([C.q,C.v,C.w,C.j],x))
l=H.d([C.p,C.i,C.h],x)
v.a=v.H(v.a,l)
l=D.w(16,!1)
i=new Array(16)
i.fixed$length=Array
i=new Q.fR(10.185916357881302,0,new S.x(l,!1,H.d(i,s),0),v.a,v.b,v.c)
i.F(v)
v=new S.D(0,0,0)
v.a=v.H(0,H.d([C.i,C.n,C.w,C.ar,C.T,C.h,C.o,C.q,C.j],x))
l=D.w(16,!1)
h=new Array(16)
h.fixed$length=Array
h=new Q.iH(0,new S.x(l,!1,H.d(h,s),0),v.a,v.b,v.c)
h.F(v)
v=new S.D(0,0,0)
v.a=v.H(0,H.d([C.aq,C.o,C.S],x))
l=D.w(16,!1)
g=new Array(16)
g.fixed$length=Array
g=new Q.iG(0,new S.x(l,!1,H.d(g,s),0),v.a,v.b,v.c)
g.F(v)
v=this.d
l=D.w(16,!1)
f=new Array(16)
f.fixed$length=Array
f=new L.iR(v,0,new S.x(l,!1,H.d(f,s),0),0,0,0)
f.F(new S.D(0,0,0))
l=new S.D(0,0,0)
l.a=l.H(0,H.d([C.R,C.i,C.h,C.j],x))
e=P.p
d=P.dq
c=D.w(16,!1)
b=new Array(16)
b.fixed$length=Array
b=new M.h_(C.ab,0,null,null,null,null,null,P.O(e,d),!0,0,new S.x(c,!1,H.d(b,s),0),l.a,l.b,l.c)
b.F(l)
b.a$=v
l=new S.D(0,0,0)
l.a=l.H(0,H.d([C.p,C.v],x))
c=H.d([C.i,C.h,C.o,C.w,C.q,C.j],x)
l.a=l.H(l.a,c)
c=D.w(16,!1)
a=new Array(16)
a.fixed$length=Array
a=new M.hZ(3,C.ac,6,0,null,null,null,null,null,P.O(e,d),!0,0,new S.x(c,!1,H.d(a,s),0),l.a,l.b,l.c)
a.F(l)
a.a$=v
a.eV=64
l=$.$get$be()
c=l.M()
a0=l.M()
a1=P.I
a2=new Float32Array(H.d9(H.d([0,0,0],[a1])))
a3=D.w(16,!1)
a4=new Array(16)
a4.fixed$length=Array
a4=new M.f4(-5e5+c*1e6,-5e5+a0*1e6,a2,1,null,null,null,null,null,P.O(e,d),!0,0,new S.x(a3,!1,H.d(a4,s),0),0,0,0)
a4.F(new S.D(0,0,0))
a4.a$=v
a2[0]=l.M()
a2[1]=l.M()
a2[2]=l.M()
a4.cJ=0.4
l=new S.D(0,0,0)
l.a=l.H(0,H.d([C.i,C.ap,C.o],x))
a2=D.w(16,!1)
a3=new Array(16)
a3.fixed$length=Array
a3=new L.hX(0,null,null,null,null,null,P.O(e,d),!0,0,new S.x(a2,!1,H.d(a3,s),0),l.a,l.b,l.c)
a3.F(l)
a3.a$=v
v=this.id
l=D.w(16,!1)
a2=new Array(16)
a2.fixed$length=Array
a2=new L.fb(v,"white",0,new S.x(l,!1,H.d(a2,s),0),0,0,0)
a2.F(new S.D(0,0,0))
l=this.k1
v=H.d([],[M.bq])
d=new S.D(0,0,0)
d.a=d.H(0,H.d([C.p,C.h],x))
e=D.w(16,!1)
a0=new Array(16)
a0.fixed$length=Array
a0=new M.ik(l,v,0,new S.x(e,!1,H.d(a0,s),0),d.a,d.b,d.c)
a0.F(d)
d=this.k1
a1=P.hJ(20,new L.h1(),!1,a1)
e=D.w(16,!1)
v=new Array(16)
v.fixed$length=Array
v=new L.h0(a1,"white",d,0,new S.x(e,!1,H.d(v,s),0),0,0,0)
v.F(new S.D(0,0,0))
e=this.k1
d=D.w(16,!1)
a1=new Array(16)
a1.fixed$length=Array
a1=new E.fA(e,y,0,0,0,0,new S.x(d,!1,H.d(a1,s),0),0,0,0)
a1.F(new S.D(0,0,0))
a1.dS()
d=new S.D(0,0,0)
d.a=d.H(0,H.d([C.S],x))
y=D.w(16,!1)
e=new Array(16)
e.fixed$length=Array
e=new Q.fV(0,new S.x(y,!1,H.d(e,s),0),d.a,d.b,d.c)
e.F(d)
d=new S.D(0,0,0)
d.c=d.H(0,H.d([C.n,C.j],x))
x=D.w(16,!1)
y=new Array(16)
y.fixed$length=Array
s=new Q.ip(0,new S.x(x,!1,H.d(y,s),0),d.a,d.b,d.c)
s.F(d)
d=[S.ac]
P.c4([0,H.d([t,o,q,r,u,n,m,p,k,j,i,h,g,f,b,a,a4,a3,a2,a0,v,a1,e,s],d),1,H.d([],d)],w,[P.l,S.ac]).q(0,new L.hl(this,z))
return P.cH(z,null,!1,null)},
cZ:function(a,b,c){var z,y
a.width=b
a.height=c
z=a.style
y=H.e(b)+"px"
z.width=y
y=H.e(c)+"px"
z.height=y}},
hj:{"^":"c;",
$1:function(a){return document.querySelector("canvas").webkitRequestFullscreen()}},
he:{"^":"c:9;a",
$1:function(a){return}},
hf:{"^":"c:9;a",
$1:function(a){return this.a.e3()}},
hg:{"^":"c:9;a",
$1:function(a){return}},
hb:{"^":"c;a",
$1:function(a){var z,y
z=this.a
y=z.ch
if(null!=y)J.bT(y,new L.ha(z))}},
ha:{"^":"c:29;a",
$2:function(a,b){var z=this.a
J.bT(b,new L.h9(z.cx.b.h(0,H.e(a)+".png").c.a4(0,z.cx.b.h(0,H.e(a)+".png").d)))}},
h9:{"^":"c;a",
$1:function(a){var z=a.a
z.toString
a.a=new H.dQ(z,new L.h8(this.a),[H.z(z,0),T.ce]).fz(0)}},
h8:{"^":"c;a",
$1:function(a){return a.n(0,this.a)}},
hd:{"^":"c:6;a",
$1:function(a){var z=this.a.Q
z.Q.q(0,z.gf8())
C.b.q(z.y,z.gf9())}},
hm:{"^":"c:30;a",
$1:function(a){var z=this.a
z.el()
return z}},
hh:{"^":"c;",
$1:function(a){return a.y===1}},
hi:{"^":"c;",
$0:function(){return}},
hc:{"^":"c;a",
$1:function(a){return this.a.d1(0,a/1000)}},
hn:{"^":"c;a",
$1:function(a){return this.a.d1(0,a/1000)}},
hl:{"^":"c:31;a,b",
$2:function(a,b){var z,y,x,w,v,u,t,s
for(z=J.a0(b),y=this.a,x=this.b,w=y.e.a;z.v();){v=z.gw(z)
y.Q.ez(v,a)
if(!!J.y(v).$isd1){u=v.gcR()
t=v.gak()
s=v.gaC()
x.push(L.lz(u==null?w:u,t,s).X(new L.hk(v),null))}}}},
hk:{"^":"c;a",
$1:function(a){this.a.c$=a}},
lf:{"^":"b8+d1;"},
lg:{"^":"ac+d1;"}}],["","",,F,{"^":"",
dg:function(a,b,c){var z,y,x,w,v
if(b===0){z=c
y=z
x=y}else{w=c<0.5?c*(1+b):c+b-c*b
v=2*c-w
x=F.da(v,w,a+0.3333333333333333)
y=F.da(v,w,a)
z=F.da(v,w,a-0.3333333333333333)}return H.d([x,y,z],[P.I])},
da:function(a,b,c){var z
if(c<0)z=c+1
else z=c>1?c-1:c
if(z<0.16666666666666666)return a+(b-a)*6*z
if(z<0.5)return b
if(z<0.6666666666666666)return a+(b-a)*(0.6666666666666666-z)*6
return a},
co:function(a,b,c){var z,y,x,w,v,u,t
z=Math.max(Math.max(H.aK(a),H.aK(b)),H.aK(c))
y=Math.min(Math.min(H.aK(a),H.aK(b)),H.aK(c))
x=z+y
w=x/2
if(z===y){v=0
u=0}else{t=z-y
u=w>0.5?t/(2-z-y):t/x
if(z===a){x=b<c?6:0
v=(b-c)/t+x}else if(z===b)v=(c-a)/t+2
else v=z===c?(a-b)/t+4:null
v/=6}return H.d([v,u,w],[P.I])},
jD:{"^":"a4;",
t:function(a){this.bb(0)
this.b=S.h(this.a,F.L)
this.c=S.h(this.a,F.aC)
this.d=this.a.z.h(0,new H.q(F.aR))
this.e=this.a.z.h(0,new H.q(S.b4))}},
L:{"^":"v;m:a>,p:b>"},
aC:{"^":"v;ar:a'"},
c9:{"^":"v;"},
aw:{"^":"v;a,b,c,d,e,f,0r,0x,0y",B:{
bz:function(a,b,c,d){var z,y,x,w,v
z=new F.aw(null,null,null,d,c,null)
y=F.dg(a,b,c)
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
aR:{"^":"a4;0a1:b',0c,d,0a"},
b9:{"^":"jD;0b,0c,0d,0e,0a",
aB:function(){var z,y,x,w
z=this.e.b.h(0,"player")
y=this.b.b
x=z.a
w=y.a[x]
return this.cD(w.a,w.b)},
cD:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.e.b.h(0,"player")
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
w=x.b/2
v=a-w
w=a+w
u=x.c/2
t=b-u
u=b+u
s=w-v
r=u-t
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
y[10]=0.004
y[12]=-(w+v)/s
y[13]=-(u+t)/r
y[14]=0
y[15]=1
x.d
return new T.c6(y)}}}],["","",,A,{"^":"",
df:function(a){var z,y
z=C.ag.bG(a,0,new A.lZ(),P.A)
y=536870911&z+((67108863&z)<<3)
y^=y>>>11
return 536870911&y+((16383&y)<<15)},
lZ:{"^":"c:32;",
$2:function(a,b){var z=536870911&a+J.au(b)
z=536870911&z+((524287&z)<<10)
return z^z>>>6}}}],["","",,T,{"^":"",c6:{"^":"b;a",
Y:function(a){var z,y
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
k:function(a){return"[0] "+this.aG(0).k(0)+"\n[1] "+this.aG(1).k(0)+"\n[2] "+this.aG(2).k(0)+"\n[3] "+this.aG(3).k(0)+"\n"},
h:function(a,b){return this.a[b]},
j:function(a,b,c){this.a[b]=c},
O:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.c6){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]&&z[4]===x[4]&&z[5]===x[5]&&z[6]===x[6]&&z[7]===x[7]&&z[8]===x[8]&&z[9]===x[9]&&z[10]===x[10]&&z[11]===x[11]&&z[12]===x[12]&&z[13]===x[13]&&z[14]===x[14]&&z[15]===x[15]}else z=!1
return z},
gD:function(a){return A.df(this.a)},
aG:function(a){var z,y
z=new Float32Array(4)
y=this.a
z[0]=y[a]
z[1]=y[4+a]
z[2]=y[8+a]
z[3]=y[12+a]
return new T.ag(z)},
n:function(a,b){var z=new T.c6(new Float32Array(16))
z.Y(this)
z.l(0,b)
return z},
a4:function(a,b){var z,y,x
z=new Float32Array(16)
y=new T.c6(z)
y.Y(this)
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
fD:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.y(b)
y=!!z.$isag
x=y?b.gfY(b):1
if(!!z.$iso5){w=b.gm(b)
v=b.gp(b)
u=b.gfE(b)}else if(y){w=b.gm(b)
v=b.gp(b)
u=b.gfE(b)}else if(typeof b==="number"){u=d
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
bR:function(a,b,c){return this.fD(a,b,c,0)},
d9:function(a,b,c,d){var z,y,x,w
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
d8:function(a,b,c){return this.d9(a,b,c,null)},
cB:function(a8){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7
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
if(a3===0){this.Y(a8)
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
z=b.gfL()
y=this.a
y[0]=C.c.n(y[0],z.h(0,0))
y[1]=C.c.n(y[1],z.h(0,1))
y[2]=C.c.n(y[2],z.h(0,2))
y[3]=C.c.n(y[3],z.h(0,3))
y[4]=C.c.n(y[4],z.h(0,4))
y[5]=C.c.n(y[5],z.h(0,5))
y[6]=C.c.n(y[6],z.h(0,6))
y[7]=C.c.n(y[7],z.h(0,7))
y[8]=C.c.n(y[8],z.h(0,8))
y[9]=C.c.n(y[9],z.h(0,9))
y[10]=C.c.n(y[10],z.h(0,10))
y[11]=C.c.n(y[11],z.h(0,11))
y[12]=C.c.n(y[12],z.h(0,12))
y[13]=C.c.n(y[13],z.h(0,13))
y[14]=C.c.n(y[14],z.h(0,14))
y[15]=C.c.n(y[15],z.h(0,15))},
fC:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
b=new T.ag(new Float32Array(4))
b.Y(a)
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
b2:function(a){return this.fC(a,null)}},ce:{"^":"b;a",
Y:function(a){var z,y
z=a.a
y=this.a
y[1]=z[1]
y[0]=z[0]},
k:function(a){var z=this.a
return"["+H.e(z[0])+","+H.e(z[1])+"]"},
O:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.ce){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]}else z=!1
return z},
gD:function(a){return A.df(this.a)},
a4:function(a,b){var z,y,x
z=new Float32Array(2)
y=new T.ce(z)
y.Y(this)
x=b.a
z[0]=z[0]-x[0]
z[1]=z[1]-x[1]
return y},
n:function(a,b){var z=new T.ce(new Float32Array(2))
z.Y(this)
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
gm:function(a){return this.a[0]},
gp:function(a){return this.a[1]}},ag:{"^":"b;a",
aI:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a},
Y:function(a){var z,y
z=a.a
y=this.a
y[3]=z[3]
y[2]=z[2]
y[1]=z[1]
y[0]=z[0]},
k:function(a){var z=this.a
return H.e(z[0])+","+H.e(z[1])+","+H.e(z[2])+","+H.e(z[3])},
O:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.ag){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]}else z=!1
return z},
gD:function(a){return A.df(this.a)},
a4:function(a,b){var z,y,x
z=new Float32Array(4)
y=new T.ag(z)
y.Y(this)
x=b.a
z[0]=z[0]-x[0]
z[1]=z[1]-x[1]
z[2]=z[2]-x[2]
z[3]=z[3]-x[3]
return y},
n:function(a,b){var z=new T.ag(new Float32Array(4))
z.Y(this)
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
z=b.gfO()
y=this.a
y[0]=C.c.n(y[0],z.h(0,0))
y[1]=C.c.n(y[1],z.h(0,1))
y[2]=C.c.n(y[2],z.h(0,2))
y[3]=C.c.n(y[3],z.h(0,3))},
gm:function(a){return this.a[0]},
gp:function(a){return this.a[1]}}}],["","",,F,{"^":"",
eO:function(){var z=W.iZ("wss://ws.damacreat.io/v1/",null)
W.S(z,"open",new F.m9(z),!1)},
m9:{"^":"c;a",
$1:function(a){var z,y,x,w,v,u,t,s
z=this.a
y=B.iU(z,!1)
x=P.dY(null,null,null,null,!1,P.aJ)
w=document
v=w.querySelector("#game")
u=H.m5(w.querySelector("#game"),"$iscC")
u.toString
t=P.c4(["alpha",!0,"depth",!0,"stencil",!1,"antialias",!0,"premultipliedAlpha",!0,"preserveDrawingBuffer",!1],P.p,null)
s=(u&&C.A).bS(u,"webgl",t)
if(s==null)s=C.A.bS(u,"experimental-webgl",t)
u=s
u=new F.h7(y,x,v,null,u,new L.ho("damacreat_io",null),null,null,null,!0,!1,null,!1,!1,!1,!1)
u.dz("damacreat_io","#game",null,!0,null,!1,null,null,!1,!0)
u.k2=w.querySelector("#gamecontainer")
w=w.querySelector("#hud")
u.id=w
w.toString
u.k1=w.getContext("2d")
u.c7()
u.dc(0)
C.as.f3(window).bH(new F.m8(z))}},
m8:{"^":"c;a",
$1:function(a){this.a.close()}}},1]]
setupProgram(dart,0,0)
J.y=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cK.prototype
return J.dM.prototype}if(typeof a=="string")return J.bF.prototype
if(a==null)return J.dN.prototype
if(typeof a=="boolean")return J.hA.prototype
if(a.constructor==Array)return J.bm.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bn.prototype
return a}if(a instanceof P.b)return a
return J.bS(a)}
J.bR=function(a){if(typeof a=="number")return J.aV.prototype
if(typeof a=="string")return J.bF.prototype
if(a==null)return a
if(a.constructor==Array)return J.bm.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bn.prototype
return a}if(a instanceof P.b)return a
return J.bS(a)}
J.a7=function(a){if(typeof a=="string")return J.bF.prototype
if(a==null)return a
if(a.constructor==Array)return J.bm.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bn.prototype
return a}if(a instanceof P.b)return a
return J.bS(a)}
J.ak=function(a){if(a==null)return a
if(a.constructor==Array)return J.bm.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bn.prototype
return a}if(a instanceof P.b)return a
return J.bS(a)}
J.eK=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cK.prototype
return J.aV.prototype}if(a==null)return a
if(!(a instanceof P.b))return J.bN.prototype
return a}
J.aN=function(a){if(typeof a=="number")return J.aV.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.bN.prototype
return a}
J.lW=function(a){if(typeof a=="number")return J.aV.prototype
if(typeof a=="string")return J.bF.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.bN.prototype
return a}
J.a1=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.bn.prototype
return a}if(a instanceof P.b)return a
return J.bS(a)}
J.am=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.bR(a).n(a,b)}
J.a2=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.y(a).O(a,b)}
J.a9=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.aN(a).b8(a,b)}
J.cq=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.aN(a).am(a,b)}
J.dj=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.lW(a).bU(a,b)}
J.cr=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.aN(a).a4(a,b)}
J.cs=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.eN(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.a7(a).h(a,b)}
J.ct=function(a,b,c){if(typeof b==="number")if((a.constructor==Array||H.eN(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.ak(a).j(a,b,c)}
J.eU=function(a,b){return J.ak(a).l(a,b)}
J.eV=function(a,b,c,d){return J.a1(a).ct(a,b,c,d)}
J.eW=function(a){return J.ak(a).ad(a)}
J.cu=function(a,b,c){return J.a7(a).eL(a,b,c)}
J.eX=function(a,b){return J.ak(a).C(a,b)}
J.eY=function(a,b,c){return J.ak(a).cG(a,b,c)}
J.bT=function(a,b){return J.ak(a).q(a,b)}
J.au=function(a){return J.y(a).gD(a)}
J.a0=function(a){return J.ak(a).gN(a)}
J.an=function(a){return J.a7(a).gi(a)}
J.eZ=function(a){return J.a1(a).gfg(a)}
J.f_=function(a){return J.a1(a).gcT(a)}
J.dk=function(a){return J.y(a).gG(a)}
J.bg=function(a){return J.a1(a).gA(a)}
J.dl=function(a,b){return J.ak(a).E(a,b)}
J.dm=function(a){return J.aN(a).aj(a)}
J.bU=function(a){return J.y(a).k(a)}
J.f0=function(a,b){return J.ak(a).b5(a,b)}
I.aP=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.A=W.cC.prototype
C.f=W.fc.prototype
C.a1=W.fW.prototype
C.a2=W.cI.prototype
C.a3=J.f.prototype
C.b=J.bm.prototype
C.e=J.dM.prototype
C.a=J.cK.prototype
C.r=J.dN.prototype
C.c=J.aV.prototype
C.k=J.bF.prototype
C.aa=J.bn.prototype
C.ag=H.hR.prototype
C.ah=H.hT.prototype
C.m=H.hU.prototype
C.P=J.hY.prototype
C.aj=W.iK.prototype
C.x=J.bN.prototype
C.y=W.j_.prototype
C.X=new H.fN()
C.Y=new P.k0()
C.Z=new P.ku()
C.d=new P.kN()
C.a_=new P.ay(0)
C.a0=new P.ay(5000)
C.a4=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.a5=function(hooks) {
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
C.B=function(hooks) { return hooks; }

C.a6=function(getTagFallback) {
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
C.a7=function() {
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
C.a8=function(hooks) {
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
C.a9=function(hooks) {
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
C.C=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.z=new L.bh("aPosition",2)
C.W=new L.bh("aRadius",1)
C.U=new L.bh("aColorMod",3)
C.ab=H.d(I.aP([C.z,C.W,C.U]),[L.bh])
C.V=new L.bh("aColor",4)
C.ac=H.d(I.aP([C.z,C.V]),[L.bh])
C.at=H.d(I.aP([]),[S.v])
C.ad=H.d(I.aP([]),[P.M])
C.D=new B.Z(0,"MessageToClient.initPlayerId")
C.E=new B.Z(1,"MessageToClient.initPlayers")
C.H=new B.Z(2,"MessageToClient.initFood")
C.I=new B.Z(3,"MessageToClient.initGrowingFood")
C.J=new B.Z(4,"MessageToClient.updatePosition")
C.K=new B.Z(5,"MessageToClient.updatePositionAndOrientation")
C.L=new B.Z(6,"MessageToClient.updatePositionAndSize")
C.M=new B.Z(7,"MessageToClient.updatePositionAndOrientationAndSize")
C.N=new B.Z(8,"MessageToClient.addConstantVelocity")
C.O=new B.Z(9,"MessageToClient.startDigestion")
C.F=new B.Z(10,"MessageToClient.removePlayers")
C.G=new B.Z(11,"MessageToClient.deleteEntities")
C.t=new B.Z(12,"MessageToClient.pong")
C.ae=H.d(I.aP([C.D,C.E,C.H,C.I,C.J,C.K,C.L,C.M,C.N,C.O,C.F,C.G,C.t]),[B.Z])
C.u=new B.c7(0,"MessageToServer.updateVelocity")
C.l=new B.c7(1,"MessageToServer.ping")
C.af=H.d(I.aP([C.u,C.l]),[B.c7])
C.ai=new P.Q(0,0,4369,4369,[P.I])
C.v=H.J(G.bj)
C.n=H.J(G.aa)
C.o=H.J(F.aw)
C.ak=H.J(G.bk)
C.al=H.J(G.cD)
C.Q=H.J(G.ax)
C.am=H.J(G.dz)
C.R=H.J(G.aT)
C.an=H.J(G.bC)
C.S=H.J(G.bH)
C.ao=H.J(P.M)
C.j=H.J(G.aB)
C.w=H.J(F.aC)
C.ap=H.J(F.c9)
C.p=H.J(G.aD)
C.i=H.J(F.L)
C.h=H.J(G.R)
C.aq=H.J(G.cY)
C.ar=H.J(G.cb)
C.T=H.J(G.ah)
C.q=H.J(G.ba)
C.as=new W.jS("beforeunload")
$.ab=0
$.bi=null
$.dn=null
$.eM=null
$.eG=null
$.eQ=null
$.cj=null
$.cl=null
$.dh=null
$.bc=null
$.bu=null
$.bv=null
$.db=!1
$.t=C.d
$.dx=null
$.dw=null
$.dv=null
$.du=null
$.n=1
$.o=0
$.dA=0
$.ew=0
$.d8=null
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
I.$lazy(y,x,w)}})(["dt","$get$dt",function(){return H.eL("_$dart_dartClosure")},"cL","$get$cL",function(){return H.eL("_$dart_js")},"e0","$get$e0",function(){return H.af(H.cc({
toString:function(){return"$receiver$"}}))},"e1","$get$e1",function(){return H.af(H.cc({$method$:null,
toString:function(){return"$receiver$"}}))},"e2","$get$e2",function(){return H.af(H.cc(null))},"e3","$get$e3",function(){return H.af(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"e7","$get$e7",function(){return H.af(H.cc(void 0))},"e8","$get$e8",function(){return H.af(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"e5","$get$e5",function(){return H.af(H.e6(null))},"e4","$get$e4",function(){return H.af(function(){try{null.$method$}catch(z){return z.message}}())},"ea","$get$ea",function(){return H.af(H.e6(void 0))},"e9","$get$e9",function(){return H.af(function(){try{(void 0).$method$}catch(z){return z.message}}())},"d5","$get$d5",function(){return P.jI()},"dF","$get$dF",function(){return P.kd(null,C.d,P.M)},"bw","$get$bw",function(){return[]},"ds","$get$ds",function(){return{}},"cy","$get$cy",function(){return H.hS(H.d([0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,4,5,5,6,5,6,6,7,5,6,6,7,6,7,7,8],[P.A]))},"cn","$get$cn",function(){var z=P.hF(null,null,null,B.c7,P.A)
P.hL(z,C.af,null,new B.lM())
return z},"a3","$get$a3",function(){return P.O(P.bM,S.B)},"be","$get$be",function(){return C.Z}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[]
init.types=[{func:1,ret:-1,args:[S.X]},{func:1,ret:-1,args:[,,]},{func:1,ret:P.M,args:[,,]},{func:1,ret:-1},{func:1,ret:-1,args:[P.p,,]},{func:1,args:[,]},{func:1,ret:P.M,args:[,]},{func:1,ret:-1,args:[P.b],opt:[P.br]},{func:1,ret:-1,args:[,]},{func:1,ret:[P.V,,],args:[,]},{func:1,ret:-1,args:[{func:1,ret:-1}]},{func:1,ret:-1,args:[P.b]},{func:1,args:[,P.p]},{func:1,ret:P.M,args:[,],opt:[,]},{func:1,ret:[P.N,,],args:[,]},{func:1,ret:-1,args:[P.p,P.p]},{func:1,args:[,,]},{func:1,ret:P.aJ,args:[P.A]},{func:1,ret:P.A,args:[,]},{func:1,ret:-1,args:[B.bI]},{func:1,ret:P.A,args:[M.bq,M.bq]},{func:1,ret:P.M,args:[[S.T,S.v],P.A]},{func:1,ret:-1,args:[S.v]},{func:1,ret:-1,args:[S.a4]},{func:1,ret:-1,args:[S.ac]},{func:1,ret:P.I,args:[P.I,P.I]},{func:1,ret:-1,args:[W.cO],named:{keyDown:P.aJ}},{func:1,ret:-1,args:[P.C]},{func:1,ret:-1,args:[W.ad]},{func:1,ret:P.M,args:[P.p,[P.l,L.dU]]},{func:1,ret:L.c1,args:[,]},{func:1,ret:P.M,args:[P.A,[P.l,S.ac]]},{func:1,ret:P.A,args:[P.A,P.b]}]
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
if(x==y)H.mf(d||a)
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
Isolate.aP=a.aP
Isolate.bx=a.bx
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
if(typeof dartMainRunner==="function")dartMainRunner(F.eO,[])
else F.eO([])})})()
//# sourceMappingURL=main.dart.js.map
