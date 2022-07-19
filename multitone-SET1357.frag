#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

vec2 tile(vec2 st, float zoom){
  st *= zoom; // Scale up the space by x
  return fract(st); // Wrap around 1.0 by computing the fractional part of the argument (x, y)
  // Now you end up having x spaces that go from 0-1
  // https://thebookofshaders.com/09/
  // https://thebookofshaders.com/glossary/?search=fract
}

void main() {
  // Normalized coordinate system variable
  // It will map the x/y pixel in the canvas to the x/y coord of the shader
  vec2 st = gl_FragCoord.xy/u_resolution.xy; 

  // Multiply the space coordinates (between 0.0 and 1.0),
  // so that the shapes we draw between the values 0.0 and 1.0 will be repeated to make a grid
  st = tile(st,10.);

  // Colors
  vec3 sys1 = vec3(0.2,0.31,0.62); // blue
  vec3 sys3 = vec3(0.95,0.97,1.); // white
  vec3 sys5 = vec3(0.325,0.443,0.239); // green
  vec3 sys7 = vec3(0.905,0.545,0.564); // pink
  
  // Draw 1st column
  // 1. Using the mix() fn, it interpolates 2 colors in the first bottom half of the y axis
  // 2. Using the mix() fn again, it interpolates 2 colors in the second top half of the y axis
  // 3. Wrapping up both halfs by using another mix() fn, it interpolates both rows in the middle of the y axis
  // mix(): Constrain a value to lie between two further values
  // https://thebookofshaders.com/glossary/?search=mix

  vec3 col1 = mix(
      mix(sys1,sys5,step(.25,st.y)), // row1
      mix(sys1,sys5,step(0.75,st.y)),step(.5,st.y)); // row2
  
  // Draw 2nd column
  // Repeats the same steps as col1 and uses other colors
  vec3 col2 = mix(
      mix(sys3,sys7,step(.25,st.y)), // row1
      mix(sys3,sys7,step(0.75,st.y)),step(.5,st.y)); // row2
  
  // Combine both columns to generate the atom for the multitone
  // 1. Using the mix() fn, it interpolates 2 columns in the middle of the x axis
  vec3 multitone = mix(col1, col2,step(.5,st.x));

  // Draws in the canvas
  gl_FragColor = vec4(multitone,1.0);
}