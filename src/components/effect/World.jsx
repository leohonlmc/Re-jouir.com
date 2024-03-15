import React, { useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import "../../World.scoped.css";

const World = () => {
  const globeEl = useRef();

  useEffect(() => {
    const globe = globeEl.current;

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.35;

    const CLOUDS_IMG_URL = "./clouds.png";
    const CLOUDS_ALT = 0.004;
    const CLOUDS_ROTATION_SPEED = -0.006;

    new THREE.TextureLoader().load(CLOUDS_IMG_URL, (cloudsTexture) => {
      const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(
          globe.getGlobeRadius() * (1 + CLOUDS_ALT),
          75,
          75
        ),
        new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true })
      );
      globe.scene().add(clouds);

      (function rotateClouds() {
        clouds.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
        requestAnimationFrame(rotateClouds);
      })();
    });

    const adjustCamera = () => {
      if (globe.camera()) {
        globe.camera().position.z = globe.getGlobeRadius() * 2;
      }
    };

    setTimeout(adjustCamera, 1000);
  }, []);

  return (
    <div className="World">
      <Globe
        ref={globeEl}
        animateIn={false}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      />
      <div className="world-text">
        <h3>
          Sending <br /> Christmas monment <br /> to the world. 🦌🎅🏻
        </h3>
      </div>
    </div>
  );
};

export default World;
