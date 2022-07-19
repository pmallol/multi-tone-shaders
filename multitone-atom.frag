#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float rect(in vec2 st, in vec2 size){
	size = 0.114-size*-0.510;
    vec2 uv = smoothstep(size,size+size*vec2(0.020,-0.010),st*(1.0-st));
	return uv.x*uv.y;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
	// st.y = 1.-st.y;
    
    vec3 influenced_color = vec3(0.745,0.696,0.529);
    
    vec3 sys1 = vec3(0.418,0.735,0.780); // teal
    vec3 sys3 = vec3(0.065,0.066,0.290); // dark blue
    vec3 sys5 = vec3(0.865,0.842,0.162); // yellow
    vec3 sys7 = vec3(0.980,0.603,0.086); // orange
    
    vec3 color = mix(
        mix(sys1,sys3,step(.25,st.y)),
     		mix(sys5,sys7,step(0.75,st.y)),step(.5,st.y));
    
    color = mix(color,
               1.-color,
				step(.25,st.x));

    gl_FragColor = vec4(color,1.0);
}