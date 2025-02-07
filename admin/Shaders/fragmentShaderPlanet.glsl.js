export default /* glsl */`
   precision mediump float;
      varying vec2 v_uv;


      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_time;

      float inverseLerp(float v, float minValue, float maxValue) {
        return (v - minValue) / (maxValue - minValue);
      }

      float remap(float v, float inMin, float inMax, float outMin, float outMax) {
        float t = inverseLerp(v, inMin, inMax);
        return mix(outMin, outMax, t);
      }

      float saturate(float x) {
        return clamp(x, 0.0, 1.0);
      }
      vec3 mod289(vec3 x)
      {
          return x - floor(x / 289.0) * 289.0;
      }

      vec4 mod289(vec4 x)
      {
          return x - floor(x / 289.0) * 289.0;
      }

      vec4 permute(vec4 x)
      {
          return mod289((x * 34.0 + 1.0) * x);
      }

      vec4 taylorInvSqrt(vec4 r)
      {
          return 1.79284291400159 - r * 0.85373472095314;
      }

      vec4 snoise(vec3 v)
      {
          const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);

          // First corner
          vec3 i  = floor(v + dot(v, vec3(C.y)));
          vec3 x0 = v   - i + dot(i, vec3(C.x));

          // Other corners
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);

          vec3 x1 = x0 - i1 + C.x;
          vec3 x2 = x0 - i2 + C.y;
          vec3 x3 = x0 - 0.5;

          // Permutations
          i = mod289(i); // Avoid truncation effects in permutation
          vec4 p =
            permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0))
                                  + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                                  + i.x + vec4(0.0, i1.x, i2.x, 1.0));

          // Gradients: 7x7 points over a square, mapped onto an octahedron.
          // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
          vec4 j = p - 49.0 * floor(p / 49.0);  // mod(p,7*7)

          vec4 x_ = floor(j / 7.0);
          vec4 y_ = floor(j - 7.0 * x_);

          vec4 x = (x_ * 2.0 + 0.5) / 7.0 - 1.0;
          vec4 y = (y_ * 2.0 + 0.5) / 7.0 - 1.0;

          vec4 h = 1.0 - abs(x) - abs(y);

          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);

          vec4 s0 = floor(b0) * 2.0 + 1.0;
          vec4 s1 = floor(b1) * 2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));

          vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

          vec3 g0 = vec3(a0.xy, h.x);
          vec3 g1 = vec3(a0.zw, h.y);
          vec3 g2 = vec3(a1.xy, h.z);
          vec3 g3 = vec3(a1.zw, h.w);

          // Normalize gradients
          vec4 norm = taylorInvSqrt(vec4(dot(g0, g0), dot(g1, g1), dot(g2, g2), dot(g3, g3)));
          g0 *= norm.x;
          g1 *= norm.y;
          g2 *= norm.z;
          g3 *= norm.w;

          // Compute noise and gradient at P
          vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
          vec4 m2 = m * m;
          vec4 m3 = m2 * m;
          vec4 m4 = m2 * m2;
          vec3 grad =
            -6.0 * m3.x * x0 * dot(x0, g0) + m4.x * g0 +
            -6.0 * m3.y * x1 * dot(x1, g1) + m4.y * g1 +
            -6.0 * m3.z * x2 * dot(x2, g2) + m4.z * g2 +
            -6.0 * m3.w * x3 * dot(x3, g3) + m4.w * g3;
          vec4 px = vec4(dot(x0, g0), dot(x1, g1), dot(x2, g2), dot(x3, g3));
          return 42.0 * vec4(grad, dot(m4, px));
      }
      vec3 hash3( vec3 p ) // replace this by something better
      {
        p = vec3( dot(p,vec3(127.1,311.7, 74.7)),
                  dot(p,vec3(269.5,183.3,246.1)),
                  dot(p,vec3(113.5,271.9,124.6)));

        return -1.0 + 2.0*fract(sin(p)*43758.5453123);
      }

      float noise( in vec3 p )
      {
        vec3 i = floor( p );
        vec3 f = fract( p );

        vec3 u = f*f*(3.0-2.0*f);

        return mix( mix( mix( dot( hash3( i + vec3(0.0,0.0,0.0) ), f - vec3(0.0,0.0,0.0) ),
                              dot( hash3( i + vec3(1.0,0.0,0.0) ), f - vec3(1.0,0.0,0.0) ), u.x),
                         mix( dot( hash3( i + vec3(0.0,1.0,0.0) ), f - vec3(0.0,1.0,0.0) ),
                              dot( hash3( i + vec3(1.0,1.0,0.0) ), f - vec3(1.0,1.0,0.0) ), u.x), u.y),
                    mix( mix( dot( hash3( i + vec3(0.0,0.0,1.0) ), f - vec3(0.0,0.0,1.0) ),
                              dot( hash3( i + vec3(1.0,0.0,1.0) ), f - vec3(1.0,0.0,1.0) ), u.x),
                         mix( dot( hash3( i + vec3(0.0,1.0,1.0) ), f - vec3(0.0,1.0,1.0) ),
                              dot( hash3( i + vec3(1.0,1.0,1.0) ), f - vec3(1.0,1.0,1.0) ), u.x), u.y), u.z );
      }

      float fbm(vec3 p, int octaves, float persistence, float lacunarity, float exponentiation) {
        float amplitude = 0.5;
        float frequency = 1.0;
        float total = 0.0;
        float normalization = 0.0;

        for (int i = 0; i < octaves; ++i) {
          float noiseValue = noise(p * frequency);
          total += noiseValue * amplitude;
          normalization += amplitude;
          amplitude *= persistence;
          frequency *= lacunarity;
        }

        total /= normalization;
        total = total * 0.5 + 0.5;
        total = pow(total, exponentiation);

        return total;
      }

      mat3 rotateY(float radians) {
        float s = sin(radians);
        float c = cos(radians);
        return mat3(
            c, 0.0, s,
            0.0, 1.0, 0.0,
            -s, 0.0, c);
      }

      vec3 GenerateStar(
      vec2 pixelCoords, float cellWidth, float radius, bool twinkle
      )
      {
        vec2 cellCoords = (fract(pixelCoords / cellWidth) - 0.5) * cellWidth;
        vec2 cellID = floor(pixelCoords / cellWidth);
        vec3 starHash = hash3(vec3(cellID, 0.0));

        float starBrightness = saturate(starHash.z);
        vec2 starPos = vec2(0.);
        starPos = starHash.xy * (cellWidth * 0.5 - radius * 4.);
        float distToStar = length(cellCoords - starPos);
        float glow = exp(-2.*distToStar / radius);

        if(twinkle) {
          float twinkleSize = radius * 1.5;
          twinkleSize += remap(sin(u_time * 4.) * 2., -2., 2., radius + 1., radius * 1.);

          vec2 absDist = abs(cellCoords - starPos);
          float twinkleValue = smoothstep(radius * 0.25, 0.0, absDist.y) *
          smoothstep(twinkleSize, 0., absDist.x);

          twinkleValue += smoothstep(radius * 0.25, 0.0, absDist.x) *
          smoothstep(twinkleSize, 0., absDist.y);

          glow += twinkleValue;
        }


        return vec3(glow * starBrightness);
      }

      vec3 DrawStars(vec2 pixelCoords) {
        vec3 stars = vec3(0.);

        float starRadius = 4.;
        float cellWidth = 200.;

        for(float i = 0.; i < 3.; i+=1.) {
          stars += GenerateStar(pixelCoords, cellWidth, starRadius, true);
          starRadius *= 0.5;
          cellWidth *= 0.5;
        }

        for(float i = 3.; i < 7.; i+=1.) {
          stars += GenerateStar(pixelCoords, cellWidth, starRadius, false);
          starRadius *= 0.5;
          cellWidth *= 0.5;
        }



        return stars;

      }


      float sdfCircle(vec2 coords, float d) {
        return length(coords) - d;
      }

      float map(vec3 p) {
        return fbm(p, 6, 0.5, 2.0, 3.0);
      }

      vec3 calcNormal(vec3 pos, vec3 n) {
        vec2 e = vec2(0.0001, 0.);

        return normalize(
          n + -1050. * vec3(
            map(pos + e.xyy) - map(pos - e.xyy),
            map(pos + e.yxy) - map(pos - e.yxy),
            map(pos + e.yyx) - map(pos - e.yyx)
          )
        );
      }

      vec3 DrawPlanet(vec2 pixelCoords, vec3 color) {
        vec3 planetColor = vec3(1.0);
        float minScreenSize = min(u_resolution.x, u_resolution.y);
        float planetRadius = minScreenSize * 0.4;
        float d = sdfCircle(pixelCoords, planetRadius);

        if (d <= 0.0){
          float x = pixelCoords.x / planetRadius;
          float y = pixelCoords.y / planetRadius;
          float z = sqrt(1.0 - x*x - y*y);
          vec3 viewNormal = vec3(x,y,z);
          vec3 wsPosition = rotateY(u_time * 0.2) * viewNormal;
          vec3 wsNormals = normalize(wsPosition);
          vec3 wsViewDir = vec3(0., 0.0, 1.);

          vec3 noiseCoord = wsPosition * 2.;
          float hashSample = fbm(noiseCoord, 6, 0.5, 2.5, 2.);
          float moistureSample = fbm(noiseCoord * 0.5 + vec3(20.), 6, 0.5, 2.5, 1.);


          vec3 waterColor = mix(
            vec3(0.01, 0.09, 0.55),
            vec3(0.09, 0.26, 0.55),
            smoothstep(0.4, 0.65, hashSample * 2.)
          );

          vec3 landColor = mix(
            vec3(0.5, 0.9, 0.3),
            vec3(0.0, 0.9, 0.0),
            smoothstep(0.4, 0.60, hashSample * 2.)
          );
          // Sand
           landColor = mix(
            landColor,
            vec3(1., 0.89, 0.5),
            smoothstep( 0.5, 0.55, moistureSample)
          );
          // Mountains
           landColor = mix(
            landColor,
            vec3(0.5),
            step(0.31, hashSample)
          );
          // Mountains
           landColor = mix(
            landColor,
            vec3(0.9),
            step(0.34, hashSample)
          );
          // Ice Color in the top and bottom
          landColor = mix(
            landColor,
            vec3(0.9),
            smoothstep(0.7, 0.9, abs(viewNormal.y))
          );

          planetColor = mix(
            waterColor,
            landColor,
            step(0.245, hashSample)
          );


          // LIGHT
          vec3 wsSufaceNormal = calcNormal(noiseCoord, wsNormals);

          // -- DirectLight
          vec3 lightPos = normalize(rotateY(u_time * 0.2) *vec3(0.8, 1., 0.7));
          vec3 lightColor = vec3(0.77, 1., 0.7);
          float lightFactor = max(0., dot(lightPos, wsSufaceNormal));
          float dp = lightFactor;
          lightColor *= dp;

          // -- AmbientLight
          vec3 ambientColor = vec3(0.34);

          // --Phong
          vec3 reflectDir = normalize(reflect(-lightPos, wsSufaceNormal));
          float phongValue = max(0., dot(wsViewDir, reflectDir));
          phongValue = pow(phongValue, 3.0);

          vec3 specular = vec3(phongValue);

          vec3 light = lightColor * 1.5 + ambientColor * 0.05;

          planetColor *= light + specular * 0.;

          // Fresnel
          float fresnelVal = smoothstep(1.0, 0.1, wsPosition.z);
          fresnelVal = pow(fresnelVal, 3.0) * dp;
          planetColor = mix(planetColor, vec3(0.0, 0.5, 1.0), fresnelVal);
        }


        return mix(planetColor, color, smoothstep(0., .0001, d));
      }

      void main() {
        vec2 pixelCoords = (v_uv - 0.5) * u_resolution;

        vec3 colour = vec3(0.0);
        //colour = DrawStars(pixelCoords);
        colour = DrawPlanet(pixelCoords, colour);

        gl_FragColor = vec4(pow(colour, vec3(1.0 / 2.2)), 1.0);
      }
`;