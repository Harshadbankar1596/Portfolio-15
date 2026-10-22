import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function Scene() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(innerWidth, innerHeight);
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 100);
    camera.position.z = 7;

    scene.add(new THREE.AmbientLight(0xffffff, 1.4));
    const sun = new THREE.DirectionalLight(0xffffff, 2.6); sun.position.set(5, 3, 5); scene.add(sun);
    const rim = new THREE.PointLight(0xff7a1a, 80); rim.position.set(-5, -2, -2); scene.add(rim);

    // globe (tilted) > spin (rotates) > earth model
    const globe = new THREE.Group(); globe.rotation.z = 0.41; scene.add(globe);
    const spin = new THREE.Group(); globe.add(spin);

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(2.05, 64, 64),
      new THREE.ShaderMaterial({
        vertexShader: "varying vec3 vN;void main(){vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
        fragmentShader: "varying vec3 vN;void main(){float i=pow(0.72-dot(vN,vec3(0.,0.,1.)),3.);gl_FragColor=vec4(1.,.48,.1,1.)*i;}",
        blending: THREE.AdditiveBlending, side: THREE.BackSide, transparent: true,
      })
    );
    globe.add(atmosphere);

    new GLTFLoader().load(
      "/Models/scene.gltf",
      (g) => {
        const model = g.scene;
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        model.position.sub(box.getCenter(new THREE.Vector3()));
        const holder = new THREE.Group(); holder.add(model);
        holder.scale.setScalar(3.6 / Math.max(size.x, size.y, size.z)); // auto-fit any model size
        spin.add(holder);
      },
      undefined,
      () => { // fallback if /Models/scene.gltf is missing
        console.warn("Earth model not found at /Models/scene.gltf — put the Models folder inside /public");
        spin.add(new THREE.Mesh(new THREE.IcosahedronGeometry(1.8, 2), new THREE.MeshBasicMaterial({ color: 0xff7a1a, wireframe: true, transparent: true, opacity: 0.3 })));
      }
    );

    const N = 1800, pos = new Float32Array(N * 3);
    for (let i = 0; i < pos.length; i++) pos[i] = (Math.random() - 0.5) * 26;
    const pg = new THREE.BufferGeometry(); pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const pts = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xffffff, size: 0.025, transparent: true, opacity: 0.6 }));
    scene.add(pts);

    const m = { x: 0, y: 0 };
    const onMove = (e) => { m.x = e.clientX / innerWidth - 0.5; m.y = e.clientY / innerHeight - 0.5; };
    const onResize = () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); };
    addEventListener("mousemove", onMove); addEventListener("resize", onResize);

    const clock = new THREE.Clock(); let raf, last = 0;
    const tick = () => {
      const t = clock.getElapsedTime(), dt = t - last; last = t;
      const s = scrollY / Math.max(document.body.scrollHeight - innerHeight, 1);
      const k = innerWidth < 768 ? 0.6 : 1;
      spin.rotation.y += dt * 0.18 + m.x * 0.01;          // earth keeps spinning
      globe.rotation.x = m.y * 0.4;
      globe.position.x = Math.sin(s * Math.PI * 4) * 3.2 * k; // left <-> right on scroll
      globe.position.y = Math.cos(s * Math.PI * 2) * 0.6;
      globe.scale.setScalar(k * (1 + Math.sin(t) * 0.015 + s * 0.15));
      pts.rotation.y = t * 0.03 + m.x * 0.3; pts.rotation.x = m.y * 0.2 + s * 1.2;
      camera.position.z = 7 - s * 1.2;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("mousemove", onMove); removeEventListener("resize", onResize);
      scene.traverse((o) => { o.geometry?.dispose(); [].concat(o.material || []).forEach((x) => x.dispose()); });
      renderer.dispose(); el.removeChild(renderer.domElement);
    };
  }, []);
  return <div ref={ref} className="pointer-events-none fixed inset-0 z-0" />;
}
