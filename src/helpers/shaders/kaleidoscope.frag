uniform float uTime;
uniform sampler2D uTexture;
uniform float uSegments;
uniform vec3 uCameraPosition;
uniform vec3 uRotation;

varying vec2 vUv;

mat2 rotate2d(float angle) {
  return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

void main() {
  vec2 uv = vUv - 0.5;
  
  // Apply x-axis rotation
  uv = rotate2d(uRotation.x) * uv;
  
  // Apply z-axis rotation (creates a perspective effect)
  float z = 0.5 * sin(uRotation.z);
  uv *= 1.0 + z;
  uv.x += 0.5 * z * sign(uv.x);
  uv.y += 0.5 * z * sign(uv.y);
  
  // Apply y-axis rotation (this affects the kaleidoscope pattern rotation)
  float angle = atan(uv.y, uv.x) + uRotation.y;
  float radius = length(uv);
  
  // Use camera position to affect the kaleidoscope
  float cameraEffect = sin(uCameraPosition.x * 0.5 + uCameraPosition.y * 0.3 + uCameraPosition.z * 0.2);
  angle = mod(angle + uTime * 0.2 + cameraEffect, 2.0 * 3.14159 / uSegments);
  
  // Add zooming effect based on camera z position
  radius *= 1.0 + sin(uCameraPosition.z * 0.1) * 0.3;
  
  // Add motion effect
  vec2 offset = vec2(sin(uTime * 0.5) * 0.1, cos(uTime * 0.3) * 0.1);
  vec2 st = vec2(cos(angle), sin(angle)) * radius + 0.5 + offset;
  
  // Add color variation based on z position
  vec3 color = texture2D(uTexture, st).rgb;
  color *= vec3(1.0 + sin(uCameraPosition.z * 0.1) * 0.2);
  
  gl_FragColor = vec4(color, 1.0);
}
