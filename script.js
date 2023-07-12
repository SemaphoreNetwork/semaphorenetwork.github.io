const speedRandom = Math.random(10) / 10000;

let options = {
  perlin: {
    vel: 0.002,
    speed: 0.00004,
    perlins: 1.0,
    decay: 0.40,
    complex: 0.0,
    waves: 5.0,
    eqcolor: 4,
    fragment: false,
    redhell: false
  },
  rgb: {
    r_color:  0.8,
    g_color: 0.88,
    b_color: 5.1
  },
  cam: {
    zoom: 7
  }
}
class Slider {
  constructor() {
    
    this.bindAll();
    this.flowerMat = null;
    this.flowerMesh = null;
    this.flowerGeo = null;
    this._primitive = null;

    this.start = Date.now()


    this.uniforms = {
      time: {
        type: "f",
        value: 1.0
      },
      pointscale: {
        type: "f",
        value: 1.0
      },
      decay: {
        type: "f",
        value: 2.0
      },
      complex: {
        type: "f",
        value: 2.0
      },
      waves: {
        type: "f",
        value: 3.0
      },
      eqcolor: {
        type: "f",
        value: 3.0
      },
      fragment: {
        type: 'i',
        value: false
      },
      dnoise: {
        type: 'f',
        value: 0.0
      },
      qnoise: {
        type: 'f',
        value: 1.0
      },
      r_color: {
        type: 'f',
        value: 10.0
      },
      g_color: {
        type: 'f',
        value: 10.0
      },
      b_color: {
        type: 'f',
        value: 10.0
      }
    }


    this.vert = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `;

    this.frag = `
    varying vec2 vUv;

    uniform sampler2D texture1;
    uniform sampler2D texture2;
    uniform sampler2D disp;

    uniform float dispPower;
    uniform float intensity;

    uniform vec2 size;
    uniform vec2 res;

    vec2 backgroundCoverUv( vec2 screenSize, vec2 imageSize, vec2 uv ) {
      float screenRatio = screenSize.x / screenSize.y;
      float imageRatio = imageSize.x / imageSize.y;
      vec2 newSize = screenRatio < imageRatio 
          ? vec2(imageSize.x * (screenSize.y / imageSize.y), screenSize.y)
          : vec2(screenSize.x, imageSize.y * (screenSize.x / imageSize.x));
      vec2 newOffset = (screenRatio < imageRatio 
          ? vec2((newSize.x - screenSize.x) / 2.0, 0.0) 
          : vec2(0.0, (newSize.y - screenSize.y) / 2.0)) / newSize;
      return uv * screenSize / newSize + newOffset;
    }

    void main() {
      vec2 uv = vUv;
      
      vec4 disp = texture2D(disp, uv);
      vec2 dispVec = vec2(disp.x, disp.y);
      
      vec2 distPos1 = uv + (dispVec * intensity * dispPower);
      vec2 distPos2 = uv + (dispVec * -(intensity * (1.0 - dispPower)));
      
      vec4 _texture1 = texture2D(texture1, distPos1);
      vec4 _texture2 = texture2D(texture2, distPos2);
      
      gl_FragColor = mix(_texture1, _texture2, dispPower);
    }
    `;

    this.el = document.querySelector('.js-slider');
    this.inner = this.el.querySelector('.js-slider__inner');
    this.slides = [...this.el.querySelectorAll('.js-slide')];
    this.bullets = [...this.el.querySelectorAll('.js-slider-bullet')];

    this.renderer = null;
    this.scene = null;
    this.clock = null;
    this.camera = null;

    this.images = [
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/58281/bg1.jpg',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/58281/bg2.jpg',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/58281/bg3.jpg'];


    this.data = {
      current: 0,
      next: 1,
      total: this.images.length - 1,
      delta: 0 };


    this.state = {
      animating: false,
      text: false,
      initial: true };


    this.textures = null;

    this.init();
  }

  bindAll() {
    ['render', 'nextSlide'].
    forEach(fn => this[fn] = this[fn].bind(this));
  }

  setStyles() {
    this.slides.forEach((slide, index) => {
      if (index === 0) return;

      TweenMax.set(slide, { autoAlpha: 0 });
    });

    this.bullets.forEach((bullet, index) => {
      if (index === 0) return;

      const txt = bullet.querySelector('.js-slider-bullet__text');
      const line = bullet.querySelector('.js-slider-bullet__line');

      TweenMax.set(txt, {
        alpha: 0.25 });

      TweenMax.set(line, {
        scaleX: 0,
        transformOrigin: 'left' });

    });
  }

  cameraSetup() {

    const _width = window.innerWidth;
    const _height= window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(45, _width/_height, 1, 1000);
    this.camera.position.set(0,0,10);
    // this.camera = new THREE.OrthographicCamera(
    // this.el.offsetWidth / -2,
    // this.el.offsetWidth / 2,
    // this.el.offsetHeight / 2,
    // this.el.offsetHeight / -2,
    // 1,
    // 1000);


    this.camera.lookAt(this.scene.position);
    this.camera.position.z = 1;
  }

  setup() {
    this.scene = new THREE.Scene();

    this.scene.fog = new THREE.Fog(0x000000, 5, 15);
    this.scene.background = new THREE.Color(0x191b1f);

    this.clock = new THREE.Clock(true);

    this.renderer = new THREE.WebGLRenderer({ antialias:true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;

    this.renderer.setSize(this.el.offsetWidth, this.el.offsetHeight);

    this.inner.appendChild(this.renderer.domElement);
  }

  loadTextures() {
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = '';

    this.textures = [];
    this.images.forEach((image, index) => {
      const texture = loader.load(image + '?v=' + Date.now(), this.render);

      texture.minFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;

      if (index === 0 && this.mat) {
        this.mat.uniforms.size.value = [
        texture.image.naturalWidth,
        texture.image.naturalHeight];

      }

      this.textures.push(texture);
    });

    this.disp = loader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/58281/rock-_disp.png', this.render);
    this.disp.magFilter = this.disp.minFilter = THREE.LinearFilter;
    this.disp.wrapS = this.disp.wrapT = THREE.RepeatWrapping;
  }

  createMesh() {
    this.mat = new THREE.ShaderMaterial({
      uniforms: {
        dispPower: { type: 'f', value: 0.0 },
        intensity: { type: 'f', value: 0.5 },
        res: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        size: { value: new THREE.Vector2(1, 1) },
        texture1: { type: 't', value: this.textures[0] },
        texture2: { type: 't', value: this.textures[1] },
        disp: { type: 't', value: this.disp } },

      transparent: true,
      vertexShader: this.vert,
      fragmentShader: this.frag });


    const geometry = new THREE.PlaneBufferGeometry(
    this.el.offsetWidth,
    this.el.offsetHeight,
    1);


    const mesh = new THREE.Mesh(geometry, this.mat);

    // this.scene.add(mesh);
  }

  createFlowerElements(){
    this.flowerMesh = new THREE.Object3D();
    console.log(this.flowerMesh.position.set(1,1,1))
    const geo = new THREE.IcosahedronGeometry(1, 6);
    this.flowerMat = new THREE.ShaderMaterial({
      wireframe:false,
      uniforms: this.uniforms,
      vertexShader: document.getElementById( 'vertexShader' ).textContent,
      fragmentShader: document.getElementById( 'fragmentShader' ).textContent
    });
    const flower = new THREE.Mesh(geo, this.flowerMat);
    this.flowerMesh.add(flower)
    // this.mesh.add(this.flowerMesh);
    
  }

  createFlower(){
    this.createFlowerElements();
    this.flowerMesh.scale.set(1,1,1);
    this.scene.add(this.flowerMesh)
  }

  transitionNext() {
    TweenMax.to(this.mat.uniforms.dispPower, 2.5, {
      value: 1,
      ease: Expo.easeInOut,
      onUpdate: this.render,
      onComplete: () => {
        this.mat.uniforms.dispPower.value = 0.0;
        this.changeTexture();
        this.render.bind(this);
        this.state.animating = false;
      } });


    const current = this.slides[this.data.current];
    const next = this.slides[this.data.next];

    const currentImages = current.querySelectorAll('.js-slide__img');
    const nextImages = next.querySelectorAll('.js-slide__img');

    const currentText = current.querySelectorAll('.js-slider__text-line div');
    const nextText = next.querySelectorAll('.js-slider__text-line div');

    const currentBullet = this.bullets[this.data.current];
    const nextBullet = this.bullets[this.data.next];

    const currentBulletTxt = currentBullet.querySelectorAll('.js-slider-bullet__text');
    const nextBulletTxt = nextBullet.querySelectorAll('.js-slider-bullet__text');

    const currentBulletLine = currentBullet.querySelectorAll('.js-slider-bullet__line');
    const nextBulletLine = nextBullet.querySelectorAll('.js-slider-bullet__line');

    const tl = new TimelineMax({ paused: true });

    if (this.state.initial) {
      TweenMax.to('.js-scroll', 1.5, {
        yPercent: 100,
        alpha: 0,
        ease: Power4.easeInOut });


      this.state.initial = false;
    }

    tl.
    staggerFromTo(currentImages, 1.5, {
      yPercent: 0,
      scale: 1 },
    {
      yPercent: -185,
      scaleY: 1.5,
      ease: Expo.easeInOut },
    0.075).
    to(currentBulletTxt, 1.5, {
      alpha: 0.25,
      ease: Linear.easeNone },
    0).
    set(currentBulletLine, {
      transformOrigin: 'right' },
    0).
    to(currentBulletLine, 1.5, {
      scaleX: 0,
      ease: Expo.easeInOut },
    0);

    if (currentText) {
      tl.
      fromTo(currentText, 2, {
        yPercent: 0 },
      {
        yPercent: -100,
        ease: Power4.easeInOut },
      0);
    }

    tl.
    set(current, {
      autoAlpha: 0 }).

    set(next, {
      autoAlpha: 1 },
    1);

    if (nextText) {
      tl.
      fromTo(nextText, 2, {
        yPercent: 100 },
      {
        yPercent: 0,
        ease: Power4.easeOut },
      1.5);
    }

    tl.
    staggerFromTo(nextImages, 1.5, {
      yPercent: 150,
      scaleY: 1.5 },
    {
      yPercent: 0,
      scaleY: 1,
      ease: Expo.easeInOut },
    0.075, 1).
    to(nextBulletTxt, 1.5, {
      alpha: 1,
      ease: Linear.easeNone },
    1).
    set(nextBulletLine, {
      transformOrigin: 'left' },
    1).
    to(nextBulletLine, 1.5, {
      scaleX: 1,
      ease: Expo.easeInOut },
    1);

    tl.play();
  }

  prevSlide() {

  }

  nextSlide() {
    if (this.state.animating) return;

    this.state.animating = true;

    this.transitionNext();

    this.data.current = this.data.current === this.data.total ? 0 : this.data.current + 1;
    this.data.next = this.data.current === this.data.total ? 0 : this.data.current + 1;
  }

  changeTexture() {
    this.mat.uniforms.texture1.value = this.textures[this.data.current];
    this.mat.uniforms.texture2.value = this.textures[this.data.next];
  }


  listeners() {
    window.addEventListener('wheel', this.nextSlide, { passive: true });
    window.addEventListener('scroll', this.nextSlide, { passive: true });
    window.addEventListener('touchmove', this.nextSlide, { passive: true });


  }

  render() {
    this.renderer.render(this.scene, this.camera);
  } 
  createGUI() {
    
    const gui = new dat.GUI();
    console.log(gui.domElement.hidden)
    //hide gui menu
    gui.domElement.hidden = true;
 
    
    console.log(gui)
    var configGUI = gui.addFolder('Setup');
    configGUI.add(options.perlin, 'speed', 0.0, 0.000044);
    configGUI.add(options.cam, 'zoom', 0, 30);
    configGUI.close();
    
    var perlinGUI = gui.addFolder('Perlin');
    perlinGUI.add(options.perlin, 'decay', 0.0, 0.29).name('Decay').listen();
    //perlinGUI.add(options.perlin, 'complex', 0.0, 100.0).name('Complex').listen();
    perlinGUI.add(options.perlin, 'waves', 0.0, 5.0).name('Waves').listen();
    perlinGUI.close();
    
    var colorGUI = gui.addFolder('Color');
    colorGUI.add(options.perlin, 'eqcolor', 3.0, 50.0).name('Color').listen();
    colorGUI.add(options.rgb, 'r_color', 0.0, 10.0).name('Red').listen();
    colorGUI.add(options.rgb, 'g_color', 0.0, 10.0).name('Green').listen();
    colorGUI.add(options.rgb, 'b_color', 0.0, 10.0).name('Blue').listen();
    colorGUI.close();
    
  }
  createLights() {
    //_ambientLights = new THREE.AmbientLight(0xFFFFFF, 1);
    const _ambientLights = new THREE.HemisphereLight(0xFFFFFF, 0x000000, 1.4);
    const _lights = new THREE.PointLight(0xFFFFFF, .5);
    _lights.position.set(20,20,20);
    //scene.add(_lights);
    this.scene.add(_ambientLights);
  }
  

  animation() {
    requestAnimationFrame(this.animation.bind(this));
    
    var time = Date.now() * 0.003;
    
    TweenMax.to(this.camera.position, 1, {z:options.cam.zoom+5});
    
    this.flowerMesh.rotation.y -= 0.001;
    this.flowerMat.uniforms['time'].value = options.perlin.speed * (Date.now() - this.start );
    this.flowerMat.uniforms['pointscale'].value = options.perlin.perlins;
    this.flowerMat.uniforms['decay'].value = options.perlin.decay;
    this.flowerMat.uniforms['complex'].value = options.perlin.complex;
    this.flowerMat.uniforms['waves'].value = options.perlin.waves;
    this.flowerMat.uniforms['eqcolor'].value = options.perlin.eqcolor;
    this.flowerMat.uniforms['r_color'].value = options.rgb.r_color;
    this.flowerMat.uniforms['g_color'].value = options.rgb.g_color;
    this.flowerMat.uniforms['b_color'].value = options.rgb.b_color;
    this.flowerMat.uniforms['fragment'] = options.perlin.fragment;
    //---
    this.render();
  }


  async sleep() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }

  async revealPage(){
    //hide css till page loads
    const taglines = [
      "Universal Basic Internet",
      "DAO-based Internet", 
      "Hardware Wallet Identity",
      "DePIN On Ethereum",
      "Worldwide Availability",

      
    ]
    document.getElementsByTagName("html")[0].style.visibility = "visible";
    document.getElementsByClassName("vert-text")[0].style.visibility = "visible";

    document.getElementsByClassName("movable_tagline")[0].style.visibility = "visible"

    for(const tag of taglines){
      await this.sleep();
      document.getElementsByClassName("movable_tagline")[0].innerText = tag;
    }

    document.getElementsByClassName("movable_tagline")[0].innerText = taglines[0];

  }
    
    

  async init() {
    this.setup();
    this.cameraSetup();
    this.createLights();
    this.loadTextures();
    this.createMesh();
    
    this.createFlower();
    this.setStyles();
    // this.render();
    this.createGUI();
    this.animation();
    this.listeners();

    await this.revealPage();


  }}


// Toggle active link
const links = document.querySelectorAll('.js-nav a');

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    links.forEach(other => other.classList.remove('is-active'));
    link.classList.add('is-active');
  });
});

// Init classes
const slider = new Slider();