import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';

// Central Text Animation Class - FIXED VERSION with smooth reverse
class SequentialTypographyTunnel {
  constructor(tunnelScene, onProgressUpdate) {
    this.sentences = [
      'IMMERSIVE',
      'EXPERIENCES',
      'AND I\'M NOT AFRAID',
      'TO CREATE BOLD DESIGNS',
      'THAT PUSH BOUNDARIES'
    ];
    
    this.currentSentenceIndex = 0;
    this.scrollY = 0;
    this.targetScrollY = 0;
    this.isScrolling = false;
    this.rafId = null;
    this.textLayers = [];
    this.tunnelScene = tunnelScene;
    this.onProgressUpdate = onProgressUpdate;
    this.totalSentences = this.sentences.length;
    
    // Smooth animation settings
    this.smoothingFactor = 0.15;
    
    this.init();
  }
  
  init() {
    this.createSentenceLayers();
    this.updateProgressIndicator();
    this.animate();
  }
  
  createSentenceLayers() {
    this.sentences.forEach((sentence, index) => {
      const textLayer = document.createElement('div');
      textLayer.className = 'text-layer';
      textLayer.dataset.sentenceIndex = index;
      textLayer.innerHTML = `<span class="tunnel-text">${sentence}</span>`;
      
      this.tunnelScene.appendChild(textLayer);
      
      this.textLayers.push({
        element: textLayer,
        sentenceIndex: index,
        initialDepth: -5,
        currentDepth: -5
      });
    });
  }
  
  updateFromScroll(normalizedScrollProgress) {
    // Animation config from parent
    const ANIMATION_START_DELAY = 0.01;
    const ANIMATION_END_EARLY = 0.98;
    const SENTENCE_DEPTH_DISTANCE = 8;
    
    // Map the scroll progress to the active animation range
    let activeScrollProgress = 0;
    
    if (normalizedScrollProgress <= ANIMATION_START_DELAY) {
      activeScrollProgress = 0;
    } else if (normalizedScrollProgress >= ANIMATION_END_EARLY) {
      activeScrollProgress = 1;
    } else {
      activeScrollProgress = (normalizedScrollProgress - ANIMATION_START_DELAY) / (ANIMATION_END_EARLY - ANIMATION_START_DELAY);
    }
    
    this.targetScrollY = activeScrollProgress;
    
    // Always keep animation running to prevent frame sticking
    if (!this.isScrolling) {
      this.isScrolling = true;
    }
    this.animate();
    
    // Store SENTENCE_DEPTH_DISTANCE for use in updateTextPositions
    this.SENTENCE_DEPTH_DISTANCE = SENTENCE_DEPTH_DISTANCE;
  }
  
  showCurrentSentence() {
    // Reset all layers first
    this.textLayers.forEach(layer => {
      layer.element.classList.remove('active');
    });
    
    // Show current sentence immediately
    this.textLayers.forEach(layer => {
      if (layer.sentenceIndex === this.currentSentenceIndex) {
        layer.element.classList.add('active');
        layer.element.style.opacity = '1';
      } else {
        layer.element.style.opacity = '0';
      }
    });
  }
  
  updateProgressIndicator() {
    if (this.onProgressUpdate) {
      this.onProgressUpdate(this.currentSentenceIndex + 1);
    }
  }
  
  animate() {
    const lerp = (start, end, factor) => start + (end - start) * factor;
    
    // Consistent smoothing for both forward and reverse
    this.scrollY = lerp(this.scrollY, this.targetScrollY, this.smoothingFactor);
    
    this.updateTextPositions();
    
    const scrollDiff = Math.abs(this.targetScrollY - this.scrollY);
    // Always continue animating to prevent frame sticking
    if (scrollDiff > 0.0001) {
      this.rafId = requestAnimationFrame(() => this.animate());
    } else {
      // Snap to final position
      this.scrollY = this.targetScrollY;
      this.updateTextPositions();
      this.isScrolling = false;
    }
  }
  
  updateTextPositions() {
    // Calculate sentence and within-sentence progress using smoothed scrollY
    const totalSentenceProgress = this.scrollY * this.totalSentences;
    const currentSentenceFloat = totalSentenceProgress;
    const sentenceIndex = Math.floor(currentSentenceFloat);
    const withinSentenceProgress = currentSentenceFloat - sentenceIndex;
    
    // Determine active sentence index
    const activeSentenceIndex = Math.max(0, Math.min(sentenceIndex, this.totalSentences - 1));
    
    // Dynamic threshold based on scroll direction
    const sentenceChangeThreshold = 0.2; // Wider threshold to prevent sticking
    
    // Detect scroll direction
    const isMovingForward = activeSentenceIndex >= this.currentSentenceIndex;
    
    if (activeSentenceIndex !== this.currentSentenceIndex) {
      let shouldChange = false;
      
      if (isMovingForward) {
        // Moving forward
        shouldChange = withinSentenceProgress > sentenceChangeThreshold;
      } else {
        // Moving backward
        shouldChange = withinSentenceProgress < (1 - sentenceChangeThreshold);
      }
      
      if (shouldChange) {
        this.currentSentenceIndex = activeSentenceIndex;
        this.showCurrentSentence();
        this.updateProgressIndicator();
      }
    }
    
    // Calculate depth progress - always use the current displayed sentence
    const displayProgress = (this.scrollY * this.totalSentences) - this.currentSentenceIndex;
    const clampedProgress = Math.max(0, Math.min(1, displayProgress));
    
    // Equal spacing for each sentence in 3D space
    const tunnelProgress = clampedProgress * (this.SENTENCE_DEPTH_DISTANCE || 8);
    
    this.textLayers.forEach((layer) => {
      if (layer.sentenceIndex === this.currentSentenceIndex) {
        let newZ = layer.initialDepth + tunnelProgress;
        layer.currentDepth = newZ;
        
        const opacity = this.calculateOpacity(newZ, clampedProgress);
        const scale = this.calculateScale(newZ);
        
        this.applyTransform(layer, newZ, opacity, scale);
      } else {
        // Keep non-active sentences completely hidden
        layer.element.style.opacity = '0';
      }
    });
  }
  
  calculateOpacity(depth, sectionProgress = 0.5) {
    let baseOpacity = 1;
    
    // Wider fade zones for smoother reverse scrolling
    const fadeZone = 0.12;
    if (sectionProgress < fadeZone) {
      baseOpacity = Math.max(0.88, sectionProgress / fadeZone);
    } else if (sectionProgress > (1 - fadeZone)) {
      baseOpacity = Math.max(0.88, (1 - sectionProgress) / fadeZone);
    }
    
    // Depth-based opacity - consistent for forward and reverse
    let depthOpacity = 1;
    if (depth > 10) {
      depthOpacity = 0;
    } else if (depth > 5) {
      depthOpacity = Math.max(0, 1 - ((depth - 5) / 5));
    } else if (depth < -20) {
      depthOpacity = Math.max(0, 1 + ((depth + 20) / 10));
    }
    
    return Math.min(baseOpacity, depthOpacity);
  }
  
  calculateScale(depth) {
    if (depth > -2) {
      return 1 + (depth + 2) * 0.05;
    }
    return 1;
  }
  
  applyTransform(layer, depth, opacity, scale = 1) {
    const element = layer.element;
    const transform = `translateX(-50%) translateY(-50%) translateZ(${depth}px) scale(${scale})`;
    
    element.style.transform = transform;
    element.style.opacity = opacity;
    element.style.willChange = 'transform, opacity';
  }
  
  destroy() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    this.textLayers.forEach(layer => {
      if (layer.element.parentNode) {
        layer.element.parentNode.removeChild(layer.element);
      }
    });
  }
}

// 3D Tunnel Animation Component - Integrated into page flow
const TunnelAnimation = ({ sectionRef }) => {
  const containerRef = useRef(null);
  const tunnelSceneRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const textGroupCeilingRef = useRef(null);
  const textGroupFloorRef = useRef(null);
  const textMeshesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const centralTextInstanceRef = useRef(null);
  
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentSentence, setCurrentSentence] = useState(1);
  const [isInView, setIsInView] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  
  // Animation state
  const currentTranslationRef = useRef(0);
  const targetTranslationRef = useRef(0);
  const isLoadedRef = useRef(false);
  const sectionTopRef = useRef(0);
  
  // 🎯 MAIN CONTROLS - Optimized for ultra-smooth animation
  const TOTAL_SECTION_HEIGHT = 2800;     // Increased for more gradual scrolling
  const ANIMATION_START_DELAY = 0.01;    // Start almost immediately
  const ANIMATION_END_EARLY = 0.98;      // End near the bottom
  const TUNNEL_SPEED_MULTIPLIER = 0.22;  // Even slower for ultra-smooth movement
  const SENTENCE_DEPTH_DISTANCE = 8;     // Consistent depth per sentence
  
  const sectionHeightRef = useRef(TOTAL_SECTION_HEIGHT);
  const smoothingFactor = 0.12; // Increased smoothing for 3D tunnel
  
  const tunnelTextContent = [
    'EXPERIENCE', 'EXPERIENCE', 'EXPERIENCE', 'EXPERIENCE',
    'EXPERIENCE', 'EXPERIENCE', 'EXPERIENCE', 'EXPERIENCE',
    'EXPERIENCE', 'EXPERIENCE', 'EXPERIENCE', 'EXPERIENCE',
    'EXPERIENCE', 'EXPERIENCE', 'EXPERIENCE', 'EXPERIENCE',
    'EXPERIENCE', 'EXPERIENCE', 'EXPERIENCE', 'EXPERIENCE',
    'EXPERIENCE', 'EXPERIENCE', 'EXPERIENCE', 'EXPERIENCE',
    'EXPERIENCE', 'EXPERIENCE', 'EXPERIENCE', 'EXPERIENCE',
    'EXPERIENCE', 'EXPERIENCE', 'EXPERIENCE', 'EXPERIENCE',
    'EXPERIENCE', 'EXPERIENCE', 'EXPERIENCE', 'EXPERIENCE',
    'EXPERIENCE', 'EXPERIENCE', 'EXPERIENCE', 'EXPERIENCE',
    'EXPERIENCE', 'EXPERIENCE', 'EXPERIENCE', 'EXPERIENCE',
    'EXPERIENCE', 'EXPERIENCE', 'EXPERIENCE', 'EXPERIENCE',
    'EXPERIENCE', 'EXPERIENCE', 'EXPERIENCE', 'EXPERIENCE',
  ];

  // Create 3D text mesh with grey starting color
  const createText3DMesh = useCallback((text, position, rotation) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = 2048 * pixelRatio;
    canvas.height = 512 * pixelRatio;
    
    context.scale(pixelRatio, pixelRatio);
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    context.fillStyle = 'white';
    context.font = 'normal 400 480px "Bebas Neue", sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    
    const centerX = (canvas.width / pixelRatio) / 2;
    const centerY = (canvas.height / pixelRatio) / 2;
    context.fillText(text, centerX, centerY);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    
    const textWidth = text.length * 2.9;
    const textHeight = 5.5;
    const geometry = new THREE.PlaneGeometry(textWidth, textHeight);
    
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.1,
      side: THREE.DoubleSide,
      color: new THREE.Color(0.3, 0.3, 0.3) // Start with grey color (30% intensity)
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(position);
    mesh.rotation.copy(rotation);
    
    return mesh;
  }, []);

  // Generate 3D text meshes
  const generateText3DMeshes = useCallback(() => {
    if (!textGroupCeilingRef.current || !textGroupFloorRef.current) return;
    
    textMeshesRef.current.forEach(mesh => {
      if (mesh.parent) mesh.parent.remove(mesh);
    });
    textMeshesRef.current = [];
    textGroupCeilingRef.current.clear();
    textGroupFloorRef.current.clear();
    
    const textSpacing = 9; // Increased from 12 for more space between text elements
    
    tunnelTextContent.forEach((text, index) => {
      const zPosition = -index * textSpacing - 50;
      
      const ceilingPosition = new THREE.Vector3(0, 6, zPosition);
      const ceilingRotation = new THREE.Euler(90 * Math.PI / 180, 0, 0);
      const ceilingMesh = createText3DMesh(text, ceilingPosition, ceilingRotation);
      textGroupCeilingRef.current.add(ceilingMesh);
      textMeshesRef.current.push(ceilingMesh);
      
      const floorPosition = new THREE.Vector3(0, -6, zPosition);
      const floorRotation = new THREE.Euler(-90 * Math.PI / 180, 0, 0);
      const floorMesh = createText3DMesh(text, floorPosition, floorRotation);
      textGroupFloorRef.current.add(floorMesh);
      textMeshesRef.current.push(floorMesh);
    });
  }, [createText3DMesh]);

  // Update smooth scroll with color transition
  const updateSmoothScroll = useCallback(() => {
    if (!isLoadedRef.current || !isInView) return;
    
    const translationDiff = targetTranslationRef.current - currentTranslationRef.current;
    currentTranslationRef.current += translationDiff * smoothingFactor;
    
    if (textGroupCeilingRef.current && textGroupFloorRef.current) {
      textGroupCeilingRef.current.position.z = currentTranslationRef.current;
      textGroupFloorRef.current.position.z = currentTranslationRef.current;
    }
    
    textMeshesRef.current.forEach(mesh => {
      const worldPosition = new THREE.Vector3();
      mesh.getWorldPosition(worldPosition);
      
      const isInRange = worldPosition.z > -100 && worldPosition.z < 60;
      mesh.visible = isInRange;
      
      if (isInRange) {
        let scale = 1;
        let colorIntensity = 0.3; // Start with grey (30% intensity)
        
        if (worldPosition.z > -50 && worldPosition.z < 20) {
          const progress = (worldPosition.z + 50) / 70;
          
          if (worldPosition.z > 15) {
            const screenWidthScale = (window.innerWidth / 800);
            scale = Math.max(2, screenWidthScale * 2);
            colorIntensity = 1; // Full white when very close
          } else {
            scale = Math.max(0.8, 1 + progress * 1.5);
            // Smooth color transition from grey to white based on depth
            colorIntensity = Math.max(0.3, 0.3 + progress * 0.7);
          }
        } else if (worldPosition.z > -100) {
          // Far distance - calculate color based on distance
          const distanceProgress = (worldPosition.z + 100) / 50; // 0 at z=-100, 1 at z=-50
          colorIntensity = Math.max(0.2, 0.2 + distanceProgress * 0.1); // Very grey in distance
        }
        
        mesh.scale.setScalar(scale);
        
        // Apply color transition to material
        if (mesh.material && mesh.material.color) {
          mesh.material.color.setRGB(colorIntensity, colorIntensity, colorIntensity);
          mesh.material.needsUpdate = true;
        }
      }
    });
  }, [isInView]);

  // Animation loop
  const animate = useCallback(() => {
    animationFrameRef.current = requestAnimationFrame(animate);
    if (isLoadedRef.current && rendererRef.current && sceneRef.current && cameraRef.current) {
      updateSmoothScroll();
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
  }, [updateSmoothScroll]);

  // Initialize Three.js scene
  const initScene = useCallback(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 0);
    cameraRef.current = camera;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight1.position.set(0, 10, 5);
    scene.add(directionalLight1);
    
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight2.position.set(0, -10, 5);
    scene.add(directionalLight2);
    
    const textGroupCeiling = new THREE.Group();
    const textGroupFloor = new THREE.Group();
    scene.add(textGroupCeiling);
    scene.add(textGroupFloor);
    textGroupCeilingRef.current = textGroupCeiling;
    textGroupFloorRef.current = textGroupFloor;
    
    generateText3DMeshes();
    isLoadedRef.current = true;
    
    if (tunnelSceneRef.current) {
      centralTextInstanceRef.current = new SequentialTypographyTunnel(
        tunnelSceneRef.current,
        setCurrentSentence
      );
    }
    
    animate();
  }, [generateText3DMeshes, animate]);

  // Handle scroll updates
  const updateScrollTarget = useCallback(() => {
    if (!sectionRef.current) return;
    
    const sectionRect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Check if section is in view
    const inView = sectionRect.top < windowHeight && sectionRect.bottom > 0;
    setIsInView(inView);
    
    if (!isLoadedRef.current) return;
    if (inView) {
      // Calculate scroll progress within the section (0 to 1)
      const scrollProgress = Math.max(0, -sectionRect.top);
      const maxScroll = sectionHeightRef.current - windowHeight;
      const clampedProgress = Math.min(scrollProgress, maxScroll);
      
      // Normalized scroll progress (0 to 1)
      const normalizedScrollProgress = clampedProgress / maxScroll;
      
      // Fade-in only at the start of animation
      const fadeInEnd = 0.08; // Fade in during first 8% of scroll
      
      if (normalizedScrollProgress >= fadeInEnd) {
        // Animation is visible and stays visible
        if (!fadeIn) {
          setFadeIn(true);
        }
      } else {
        // Before fade-in threshold - keep hidden/fading
        if (fadeIn) {
          setFadeIn(false);
        }
      }
      
      // Update scroll position for progress bar (0 to 100%)
      const scrollPercent = normalizedScrollProgress * 100;
      setScrollPosition(scrollPercent);
      
      // Update 3D tunnel animation
      const scrollMultiplier = TUNNEL_SPEED_MULTIPLIER;
      targetTranslationRef.current = clampedProgress * scrollMultiplier;
      
      // Update central text animation with normalized progress
      if (centralTextInstanceRef.current) {
        centralTextInstanceRef.current.updateFromScroll(normalizedScrollProgress);
      }
    } else {
      // Section is out of view - ensure fade out
      if (fadeIn) {
        setFadeIn(false);
      }
    }
  }, [sectionRef, fadeIn]);

  // Handle window resize
  const handleResize = useCallback(() => {
    if (cameraRef.current && rendererRef.current) {
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    }
  }, []);

  // Setup event listeners
  useEffect(() => {
    initScene();
    
    const scrollHandler = { passive: true };
    window.addEventListener('scroll', updateScrollTarget, scrollHandler);
    window.addEventListener('resize', handleResize);
    
    // Initial check for fade-in
    setTimeout(() => updateScrollTarget(), 100);
    
    return () => {
      window.removeEventListener('scroll', updateScrollTarget);
      window.removeEventListener('resize', handleResize);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (centralTextInstanceRef.current) {
        centralTextInstanceRef.current.destroy();
      }
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, [initScene, updateScrollTarget, handleResize]);

  return (
    <div ref={sectionRef} className="relative bg-black" style={{ height: `${TOTAL_SECTION_HEIGHT}px` }}>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        
        .text-layer {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          will-change: transform, opacity;
          backface-visibility: hidden;
          transform-style: preserve-3d;
          color: #E8FFCC;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          white-space: nowrap;
          text-align: center;
          opacity: 0;
          transition: opacity 0.6s ease-in-out;
          z-index: 10;
          pointer-events: none;
        }
        
        .tunnel-text {
          display: block;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          text-align: center;
          white-space: nowrap;
          color: #E8FFCC;
          text-shadow: 0 0 20px rgba(232, 255, 204, 0.14);
          font-size: clamp(1.5rem, 6vw, 8rem);
          line-height: 0.9;
        }
        
        .text-layer.active {
          opacity: 1;
        }
        
        .text-layer.active .tunnel-text {
          color: #E8FFCC;
          text-shadow: 0 0 30px rgba(232, 255, 204, 0.5);
          font-weight: 700;
        }
        
        .tunnel-scene {
          position: fixed;
          top: 50%;
          left: 50%;
          width: 100vw;
          height: 100vh;
          perspective: 1px;
          perspective-origin: 50% 50%;
          transform-style: preserve-3d;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 20;
        }
      `}</style>
      
      {/* Three.js Container - Fixed position when in view */}
      <div 
        ref={containerRef} 
        className={`${isInView ? 'fixed' : 'absolute'} top-0 left-0 w-screen h-screen z-10 transition-opacity duration-1200 ease-out ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
        style={{
          position: isInView ? 'fixed' : 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 10
        }} 
      />
      
      {/* Central Text Container - Only when in view */}
      {isInView && (
        <div className={`fixed top-0 left-0 w-screen h-screen bg-transparent overflow-hidden z-20 pointer-events-none transition-opacity duration-1200 ease-out ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
          <div ref={tunnelSceneRef} className="tunnel-scene" />
          
          {/* Progress Indicators */}
          <div className="fixed top-8 left-1/2 transform -translate-x-1/2 text-white text-sm opacity-70 z-30">
            <span>{currentSentence}</span> of <span>5</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TunnelAnimation;