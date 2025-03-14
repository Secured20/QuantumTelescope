#version 300 es

precision highp float;
precision mediump int;
precision mediump sampler3D;

in vec2 uv;
out vec4 fragColor;

//===================//
//  Global uniforms  //
//===================//

uniform float uTime;
uniform float uRotationOffset;
uniform vec2 uResolution;
uniform sampler3D uNoiseTexture;

//==========================//
//  Controllable  uniforms  //
//==========================//

uniform float uQuality;
uniform vec3 uPlanetPosition;
uniform float uPlanetRadius;
uniform float uNoiseStrength;
uniform float uCloudsDensity;
uniform float uCloudsScale;
uniform float uCloudsSpeed;
uniform float uTerrainScale;
uniform vec3 uAtmosphereColor;
uniform float uAtmosphereDensity;
uniform float uSunIntensity;
uniform float uAmbientLight;
in vec3 uSunDirection;

//==========================================================//
//  Constants (could be turned into controllable uniforms)  //
//==========================================================//

// Planets geometry
#define ROTATION_SPEED .1
#define PLANET_ROTATION rotateY(uTime * ROTATION_SPEED + uRotationOffset)

#define MOON_RADIUS .08
#define MOON_ROTATION_SPEED - ROTATION_SPEED * 5.
#define MOON_OFFSET vec3(uPlanetRadius * 1.2, uPlanetRadius / 4., 0.)
#define MOON_ROTATION_AXIS (MOON_OFFSET - uPlanetPosition) * rotateZ(PI/2.)

// Planet colors
#define WATER_COLOR_DEEP vec3(0.01, 0.05, 0.15)
#define WATER_COLOR_SURFACE vec3(0.02, 0.12, 0.27)
#define SAND_COLOR vec3(1.0, 1.0, 0.85)
#define TREE_COLOR vec3(.02, .1, .06)
#define ROCK_COLOR vec3(0.15, 0.12, 0.12)
#define ICE_COLOR  vec3(0.8, .9, .9)
#define CLOUD_COLOR  vec3(1., 1., 1.)

#define WATER_SURFACE_LEVEL 0.0
#define SAND_LEVEL .028
#define TREE_LEVEL .03
#define ROCK_LEVEL .1
#define ICE_LEVEL .15
#define TRANSITION .02

// Lighting
#define SUN_COLOR vec3(1.0, 1.0, 0.9)
#define DEEP_SPACE vec3(0., 0., 0.001)

// Ray tracing
#define EPSILON 1e-3
#define INFINITY 1e10
#define CAMERA_POSITION vec3(0., 0., 6.0)

#define PI acos(-1.)

//=========//
//  Types  //
//=========//

struct Material {
  vec3 color;
  float diffuse;
  float specular;
};

struct Hit {
  float len;
  vec3 normal;
  Material material;
};

struct Sphere {
  vec3 position;
  float radius;
};

// Note: I had created a struct for Ray but then deleted it because it caused artifacts on some mobile devices
// because of a precision issue with struct (https://github.com/KhronosGroup/WebGL/issues/3351)
// I use ro and rd instead in this shader.

Hit miss = Hit(INFINITY, vec3(0.), Material(vec3(0.), -1., -1.));

Sphere getPlanet() {
  return Sphere(uPlanetPosition, uPlanetRadius);
}

//===============================================//
//  Generic utilities stolen from smarter people //
//===============================================//

float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}

float noise(vec3 p) {
  return texture(uNoiseTexture, p * .05).r;
}

// https://iquilezles.org/articles/intersectors/
float sphIntersect(in vec3 ro, in vec3 rd, in Sphere sphere) {
  vec3 oc = ro - sphere.position;
  float b = dot(oc, rd);
  float c = dot(oc, oc) - sphere.radius * sphere.radius;
  float h = b * b - c;
  if(h < 0.0)
    return -1.; // no intersection
  return -b - sqrt(h);
}

// Comes from a course by SimonDev (https://www.youtube.com/channel/UCEwhtpXrg5MmwlH04ANpL8A)
// https://simondev.teachable.com/p/glsl-shaders-from-scratch
float fbm(vec3 p, int octaves, float persistence, float lacunarity, float exponentiation) {
  float amplitude = 0.5;
  float frequency = 3.0;
  float total = 0.0;
  float normalization = 0.0;
  int qualityDegradation = 2 - int(floor(uQuality)); // 0 when quality=optimal, 2 when quality=low
  int octavesWithQuality = max(octaves - qualityDegradation, 1);

  for(int i = 0; i < octavesWithQuality; ++i) {
    float noiseValue = noise(p * frequency);
    total += noiseValue * amplitude;
    normalization += amplitude;
    amplitude *= persistence;
    frequency *= lacunarity;
  }

  total /= normalization;
  total = total * 0.8 + 0.1;
  total = pow(total, exponentiation);

  return total;
}

mat3 rotateY(float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat3(//
    vec3(c, 0, s),//
    vec3(0, 1, 0),//
    vec3(-s, 0, c)//
  );
}

mat3 rotateZ(float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat3(//
    vec3(c, -s, 0),//
    vec3(s, c, 0),//
    vec3(0, 0, 1)//
  );
}

// https://github.com/dmnsgn/glsl-rotate/blob/main/rotation-3d.glsl
mat3 rotate3d(vec3 axis, float angle) {
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1.0 - c;

  return mat3(//
    oc * axis.x * axis.x + c, oc * axis.x * axis.y - axis.z * s, oc * axis.z * axis.x + axis.y * s,//
    oc * axis.x * axis.y + axis.z * s, oc * axis.y * axis.y + c, oc * axis.y * axis.z - axis.x * s,//
    oc * axis.z * axis.x - axis.y * s, oc * axis.y * axis.z + axis.x * s, oc * axis.z * axis.z + c//
  );
}

// nimitz - https://www.shadertoy.com/view/XsyGWV
// I reused the 3D noise texture instead of nimitz's hash function for better performance
vec3 stars(in vec3 p) {
  vec3 c = vec3(0.);
  float res = uResolution.x * uQuality * 0.8;

  for(float i = 0.; i < 3.; i++) {
    vec3 q = fract(p * (.15 * res)) - 0.5;
    vec3 id = floor(p * (.15 * res));
    vec2 rn = vec2(noise(id/2.), noise(id.zyx*2.))*.03;
    float c2 = 1. - smoothstep(0., .6, length(q));
    c2 *= step(rn.x, .003 + i * 0.0005);
    c += c2 * (mix(vec3(1.0, 0.49, 0.1), vec3(0.75, 0.9, 1.), rn.y) * 0.25 + 1.2);
    p *= 1.8;
  }
  return c * c;
}

// Comes from a course by SimonDev (https://www.youtube.com/channel/UCEwhtpXrg5MmwlH04ANpL8A)
// https://simondev.teachable.com/p/glsl-shaders-from-scratch
float domainWarpingFBM(vec3 p, int octaves, float persistence, float lacunarity, float exponentiation) {
  vec3 offset = vec3(//
    fbm(p, octaves, persistence, lacunarity, exponentiation), //
    fbm(p + vec3(43.235, 23.112, 0.0), octaves, persistence, lacunarity, exponentiation), //
    0.0//
  );

  return fbm(p + 1. * offset, 2, persistence, lacunarity, exponentiation);
}

// Zavie - https://www.shadertoy.com/view/lslGzl
vec3 simpleReinhardToneMapping(vec3 color) {
  float exposure = 1.5;
  color *= exposure / (1. + color / exposure);
  color = pow(color, vec3(1. / 2.4));
  return color;
}


//========//
//  Misc  //
//========//

float planetNoise(vec3 p) {
  float fbm = fbm(p * uTerrainScale, 6, .5, 2., 5.) * uNoiseStrength;

  // Flatten the noise on the oceans
  return mix(//
    fbm / 3. + uNoiseStrength / 50., //
    fbm, //
    smoothstep(SAND_LEVEL, SAND_LEVEL + TRANSITION / 2., fbm * 5.)//
  );
}

/**
* Standard ray-sphere intersection but with fbm noise added on the radius.
* Probably not exact (especially near the edges), but it looks good enough
*/
float planetDist(in vec3 ro, in vec3 rd) {
  float smoothSphereDist = sphIntersect(ro, rd, getPlanet());

  vec3 intersection = ro + smoothSphereDist * rd;
  vec3 intersectionWithRotation = PLANET_ROTATION * (intersection - uPlanetPosition) + uPlanetPosition;

  return sphIntersect(ro, rd, Sphere(uPlanetPosition, uPlanetRadius + planetNoise(intersectionWithRotation)));
}

vec3 planetNormal(vec3 p) {
  vec3 rd = uPlanetPosition - p;
  float dist = planetDist(p, rd);
  // if e is too small it causes artifacts on mobile, so I interpolate 
  // between .01 (large screens) and .03 (small screens)
  vec2 e = vec2(max(.01, .03 * smoothstep(1300., 300., uResolution.x)), 0);

  vec3 normal = dist - vec3(planetDist(p - e.xyy, rd), planetDist(p - e.yxy, rd), planetDist(p + e.yyx, rd));
  return normalize(normal);
}

vec3 currentMoonPosition() {
  mat3 moonRotation = rotate3d(MOON_ROTATION_AXIS, uTime * MOON_ROTATION_SPEED);
  return MOON_OFFSET * moonRotation + uPlanetPosition;
}

vec3 spaceColor(vec3 direction) {
  mat3 backgroundRotation = rotateY(uTime * ROTATION_SPEED / 4.);
  vec3 backgroundCoord = direction * backgroundRotation;
  float spaceNoise = fbm(backgroundCoord * 3., 4, .5, 2., 6.);

  return stars(backgroundCoord) + mix(DEEP_SPACE, uAtmosphereColor / 12., spaceNoise);
}

vec3 atmosphereColor(vec3 ro, vec3 rd, float spaceMask, Hit firstHit) {
  vec3 position = ro + firstHit.len * rd;
  
  float distCameraToPlanetOrigin = length(uPlanetPosition - CAMERA_POSITION);
  float distCameraToPlanetEdge = sqrt(distCameraToPlanetOrigin * distCameraToPlanetOrigin - uPlanetRadius * uPlanetRadius);
  float distCameraToMoon = length(currentMoonPosition() - CAMERA_POSITION);
  float isMoonInFront = smoothstep(-uPlanetRadius/2., uPlanetRadius/2., distCameraToPlanetEdge - distCameraToMoon);

  float moonMask = (1.0 - spaceMask) * step(uPlanetRadius + EPSILON, length(position - uPlanetPosition));
  float planetMask = 1.0 - spaceMask - moonMask;

  vec3 coordFromCenter = (ro + rd * distCameraToPlanetEdge) - uPlanetPosition;
  float distFromEdge = abs(length(coordFromCenter) - uPlanetRadius);
  float planetEdge = max(uPlanetRadius - distFromEdge, 0.) / uPlanetRadius;
  float atmosphereMask = pow(remap(dot(uSunDirection, coordFromCenter), -uPlanetRadius, uPlanetRadius / 2., 0., 1.), 5.);
  atmosphereMask *= uAtmosphereDensity * uPlanetRadius * uSunIntensity;

  vec3 atmosphere = vec3(pow(planetEdge, 120.)) * .5;
  atmosphere += pow(planetEdge, 50.) * .3 * (1.5 - planetMask);
  atmosphere += pow(planetEdge, 15.) * .03;
  atmosphere += pow(planetEdge, 5.) * .04 * planetMask;

  return atmosphere * uAtmosphereColor * atmosphereMask * (1. - moonMask * isMoonInFront);
}

//===============//
//  Ray Tracing  //
//===============//

Hit intersectPlanet(vec3 ro, vec3 rd) {
  float len = sphIntersect(ro, rd, getPlanet());

  if(len < 0.) {
    return miss;
  }

  vec3 position = ro + len * rd;
  vec3 rotatedCoord = PLANET_ROTATION * (position - uPlanetPosition) + uPlanetPosition;
  float altitude = 5. * planetNoise(rotatedCoord);

  vec3 normal = planetNormal(position);

  vec3 color = mix(WATER_COLOR_DEEP, WATER_COLOR_SURFACE, smoothstep(WATER_SURFACE_LEVEL, WATER_SURFACE_LEVEL + TRANSITION, altitude));
  color = mix(color, SAND_COLOR, smoothstep(SAND_LEVEL, SAND_LEVEL + TRANSITION / 2., altitude));
  color = mix(color, TREE_COLOR, smoothstep(TREE_LEVEL, TREE_LEVEL + TRANSITION, altitude));
  color = mix(color, ROCK_COLOR, smoothstep(ROCK_LEVEL, ROCK_LEVEL + TRANSITION, altitude));
  color = mix(color, ICE_COLOR, smoothstep(ICE_LEVEL, ICE_LEVEL + TRANSITION, altitude));

  vec3 cloudsCoord = (rotatedCoord + vec3(uTime * .008 * uCloudsSpeed)) * uCloudsScale;
  float cloudsDensity = remap(domainWarpingFBM(cloudsCoord, 3, .3, 5., uCloudsScale), -1.0, 1.0, 0.0, 1.0);
  float cloudsThreshold = 1. - uCloudsDensity * .5;
  cloudsDensity *= smoothstep(cloudsThreshold, cloudsThreshold + .1, cloudsDensity);
  cloudsDensity *= smoothstep(ROCK_LEVEL, (ROCK_LEVEL + TREE_LEVEL) / 2., altitude);
  color = mix(color, CLOUD_COLOR, cloudsDensity);

  float specular = smoothstep(SAND_LEVEL + TRANSITION, SAND_LEVEL, altitude);

  return Hit(len, normal, Material(color, 1., specular));
}

Hit intersectMoon(vec3 ro, vec3 rd) {
  vec3 moonPosition = currentMoonPosition();
  float length = sphIntersect(ro, rd, Sphere(moonPosition, MOON_RADIUS));

  if(length < 0.) {
    return miss;
  }

  vec3 position = ro + length * rd;
  vec3 originalPosition = position * rotate3d(MOON_ROTATION_AXIS, -uTime * MOON_ROTATION_SPEED);
  vec3 color = vec3(sqrt(fbm(originalPosition * 12., 6, .5, 2., 5.)));
  vec3 normal = normalize(position - moonPosition);

  return Hit(length, normal, Material(color, 1., 0.));
}

Hit intersectScene(vec3 ro, vec3 rd) {
  Hit planetHit = intersectPlanet(ro, rd);
  Hit moonHit = intersectMoon(ro, rd);

  if(moonHit.len < planetHit.len) {
    return moonHit;
  }

  return planetHit;
}

vec3 radiance(vec3 ro, vec3 rd) {
  vec3 color = vec3(0.);
  float spaceMask = 1.;
  Hit hit = intersectScene(ro, rd);

  if(hit.len < INFINITY) {
    spaceMask = 0.;

    vec3 hitPosition = ro + hit.len * rd;
    Hit shadowHit = intersectScene(hitPosition + EPSILON * uSunDirection, uSunDirection);
    float hitDirectLight = clamp(
      step(INFINITY, shadowHit.len) 
      + step(length(hitPosition - uPlanetPosition) - uPlanetRadius, .1), // don't cast shadow on the planet, only the moon
      0., 
      1.
    );

    // Diffuse
    float directLightIntensity = pow(clamp(dot(hit.normal, uSunDirection), 0.0, 1.0), 2.) * uSunIntensity; // the power softens the shadow. Not physically accurate but it looks better to me
    vec3 diffuseLight = hitDirectLight * directLightIntensity * SUN_COLOR;
    vec3 diffuseColor = hit.material.color.rgb * (uAmbientLight + diffuseLight);

    // Phong specular
    vec3 reflected = normalize(reflect(-uSunDirection, hit.normal));
    float phongValue = pow(max(0.0, dot(rd, reflected)), 10.) * .2 * uSunIntensity;
    vec3 specularColor = hit.material.specular * vec3(phongValue);

    color = diffuseColor + specularColor;
  } else {
    color = spaceColor(rd);
  }
  
  return color + atmosphereColor(ro, rd, spaceMask, hit);
}

//========//
//  Main  //
//========//

void main() {
  vec3 ro = vec3(CAMERA_POSITION);
  vec3 rd = normalize(vec3(uv, -1));

  vec3 color = radiance(ro, rd);

  // color grading
  color = simpleReinhardToneMapping(color);

  // vignette
  color *= 1. - 0.5 * pow(length(uv), 3.);

  fragColor = vec4(color, 1.0);
}