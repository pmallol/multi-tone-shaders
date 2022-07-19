#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

vec2 tile(vec2 st, float zoom){
  st *= zoom;
  return fract(st);
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  // st.y = 1.-st.y;
  st = tile(st,10.);

  vec3 influenced_color = vec3(0.745,0.696,0.529);
  
  vec3 sys1 = vec3(0.2,0.31,0.62); // blue
  vec3 sys3 = vec3(0.95,0.97,1.); // white
  vec3 sys5 = vec3(0.325,0.443,0.239); // green
  vec3 sys7 = vec3(0.905,0.545,0.564); // pink
  
  
  vec3 col1 = mix(
    mix(sys1,sys5,step(.25,st.y)), // row1
    mix(sys1,sys5,step(0.75,st.y)),step(.5,st.y)); // row2
  
  vec3 col2 = mix(
    mix(sys3,sys7,step(.25,st.y)), // row1
    mix(sys3,sys7,step(0.75,st.y)),step(.5,st.y)); // row2

  vec3 col3 = mix(
    mix(sys1,sys7,step(.25,st.y)), // row1
    mix(sys1,sys7,step(0.75,st.y)),step(.5,st.y)); // row2

  vec3 col4 = mix(
    mix(sys3,sys7,step(.25,st.y)), // row1
    mix(sys3,sys7,step(0.75,st.y)),step(.5,st.y)); // row2


  vec3 firstHalf = mix(col1, col2,step(.25,st.x));
  vec3 secondHalf = mix(col3, col4,step(.75,st.x));
  vec3 multitone = mix(firstHalf, secondHalf,step(.5,st.x));

  gl_FragColor = vec4(multitone,1.0);
}