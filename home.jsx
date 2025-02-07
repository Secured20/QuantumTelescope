window.onload = function () {
  
gsap.timeline()
    .set('.img-fluid', { rotationY:-180, cursor:'grab' }) //set initial rotationY so the parallax jump happens off screen
    .set('.img-fluid',  { // apply transform rotations to each image
      rotateY: (i)=> i*-36,
      transformOrigin: '50% 50% 100%',
      z: -500,
      backfaceVisibility:'hidden'
    })    
    .from('.img-fluid', {
      duration:1.5,
      y:200,
      opacity:0,
      stagger:0.1,
      ease:'expo',
      zIndex:1
    })
    .add(()=>{
      $('.img-fluid').on('mouseenter', (e)=>{
        let current = e.currentTarget;
        gsap.to('.img-fluid', {zIndex:(i,t)=>(t==current)? 2:1, ease:'power3'})
        gsap.to('.img-fluid', {y:(i,t)=>(t==current)? -1:1, ease:'power3'})
        gsap.to('.img-fluid', {rotateY:(i,t)=>(t==current)? 10:1, ease:'power3'})
      })
      $('.img').on('mouseleave', (e)=>{
        let current = e.currentTarget;
        gsap.to('.img-fluid', {zIndex:1, ease:'power2.inOut'})
        gsap.to('.img-fluid', {y:1, ease:'power2.inOut'})
        gsap.to('.img-fluid', {rotateY:(i,t)=>(t==current)? 1:1, ease:'power2.inOut'})
      })
    }, '-=0.5')
    .from('.btn--neon', {
      duration:0.5,
      zIndex:100
    }).add(()=>{
 
    }, '-=0.5')

  gsap.to(".banner", {
    opacity: 1,
    scrollTrigger: {
      trigger: ".main-txt",
      start: "center+=" + 100 + " center",
      end: "top",
      markers: false,
      scrub: 1,
         width: "100vw",
    height: "100vh"
    }
  });

  gsap.timeline();
  gsap.registerPlugin(ScrollTrigger);
  var $animeCard = document.querySelector(".anime-card-inner");
  //loader img
  gsap.set($animeCard, {
    rotationY: 90,
    top: "50%",
    left: "50%",
    xPercent: -50,
    yPercent: -50,
    width: "40vh",
    height: "40vh",
    scale: 1
  });
  //Main card-wrapper
  gsap.set(".anime-card", { x: "50%", y: "50%" });
 //img set
  gsap.set(".anime-card-front img", {
    attr: { src: $('.anime-card-ship img').attr('src') }
  });
  gsap.set(".anime-card-back img", {
    attr: { src: $('.anime-card-ship img').attr('src') }
  });

  // Main-text animation
  //Main text load
  gsap.set(".main-txt", { opacity: 0, yPercent: 50 });
  const mainTxt = gsap.timeline();
  mainTxt.to(".main-txt", { opacity: 1, yPercent: -50, duration: 0.5 });

  //Main text opacity down
  const mainTxt2 = gsap.timeline({
    scrollTrigger: {
      duration: 0.1,
      trigger: ".main-txt",
      start: "center center",
      end: "+=100",
      markers: false,
      scrub: 1
    }
  });
  mainTxt2.to(".main-txt", { opacity: 0, ease: "linear",zIndex:0 });

  //loader to scale
  const tl = gsap.timeline();
  tl.to($animeCard, {
    rotationY: 0,
    //ease: Expo.easeIn,
    duration: 0.1,
    scale: 1,
    width: "100vw",
    height: "100vh"
  });

  //Banner one image scale down
  const t2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".banner",
      start: "center center",
      end: "+=600",
      markers: false,
      scrub: 1
    }
  });
  if (window.innerWidth >= 1200 && window.innerWidth <= 1499) {
    t2.to($animeCard, {
      height: "60vh",
      width: "472.5px",
      left: "calc(243.75px + (50% - 585px) + 682.5px)"
    });
  } else if (window.innerWidth >= 992 && window.innerWidth <= 1199) {
    t2.to($animeCard, {
      height: "60vh",
      width: "465px",
      left: "calc(240px + (50% - 480px) + 480px)"
    });
  } else if (window.innerWidth >= 768 && window.innerWidth <= 991) {
    t2.to($animeCard, {
      height: "60vh",
      width: "345px",
      left: "calc(180px + (50% - 360px) + 360px)"
    });
  } else if (window.innerWidth <= 767) {
    t2.to($animeCard, {
      height: "calc(100vh - 340px)",
      width: "95%",
      left: "50%",
      top: "calc(100% - 40px)",
      yPercent: -100
    });
  } else {
    t2.to($animeCard, {
      height: "60vh",
      width: "535px",
      left: "calc(275px + (50% - 660px) + 770px)"
    });
  }
  //Banner text-animation
  gsap.set(".banner-content", { opacity: 0, yPercent: 50 });
  gsap.to(".banner-content", {
    ease: "linear",
    yPercent: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: ".banner",
      start: "center+=" + 300 + " center",
      end: "+=200",
      markers: false,
      scrub: 1
    }
  });

  //Banner animation
  gsap.to(".banner", {
    ease: "linear",
    scrollTrigger: {
      trigger: ".banner",
      start: "center center",
      end: "+=600",
      markers: false,
      pin: true,
      pinSpacing: true,
      scrub: 1
    },
    onUpdate: () => {
        gsap.set(".anime-card-front img", {
          attr: { src: $('.anime-card-ship img').attr('src') }
        });
        gsap.set(".anime-card-back img", {
          attr: { src: $('.anime-card-one img').attr('src') }
        });
    }
  });

  //Banner two animation
  gsap.to(".banner-two", {
    ease: "linear",
    scrollTrigger: {
      trigger: ".banner-two",
      start: "center center",
      end: "+=600",
      markers: false,
      pin: true,
      pinSpacing: true,
      scrub: 1
    },
    onUpdate: () => {
        gsap.set(".anime-card-front img", {
          attr: { src: $('.anime-card-one img').attr('src') }
        });
        gsap.set(".anime-card-back img", {
          attr: { src: $('.anime-card-one img').attr('src') }
        });
    }
  });

  //Banner two image rotation
  const t3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".banner-two",
      start: "top center",
      end: "+=600",
      markers: false,
      scrub: 1
    },
    onUpdate: () => {
        gsap.set(".anime-card-front img", {
          attr: { src: $('.anime-card-one img').attr('src') }
        });
        gsap.set(".anime-card-back img", {
          attr: { src: $('.anime-card-one img').attr('src') }
        });
    }
  });
  if (window.innerWidth <= 767) {
    /*
    t3.to($animeCard, {
      rotationY: -180,
      height: "100vh",
      width: "100vw",
      left: "50%",
      top: "50%",
      //yPercent: -50
    });*/
  } else {
    t3.to($animeCard, {
      //rotationY: -180,
      height: "100vh",
      width: "100vw",
      left: "50%"
    });
  }

  //Banner three animation
  gsap.to(".banner-three", {
    ease: "linear",
    scrollTrigger: {
      trigger: ".banner-three",
      start: "center center",
      end: "+=600",
      markers: false,
      pin: true,
      pinSpacing: true,
      scrub: 1
    }
  });

  //Banner three image rotation
  const t4 = gsap.timeline({
    scrollTrigger: {
      trigger: ".banner-three",
      start: "top center",
      end: "+=600",
      markers: false,
      scrub: 1
    },
    onUpdate: () => {
        gsap.set(".anime-card-front img", {
          attr: { src: $('.anime-card-three img').attr('src') }
        });
        gsap.set(".anime-card-back img", {
          attr: { src: $('.anime-card-four img').attr('src') }
        });
    }
  });
  if (window.innerWidth >= 1200 && window.innerWidth <= 1499) {
    t4.to($animeCard, {
      rotationY: -360,
      height: "60vh",
      width: "472.5px",
      xwleft: "calc((50% - 585px) + 243.75px)"
    });
  } else if (window.innerWidth >= 992 && window.innerWidth <= 1199) {
    t4.to($animeCard, {
      rotationY: -360,
      height: "60vh",
      width: "465px",
      left: "calc((50% - 465px) + 240px)"
    });
  } else if (window.innerWidth >= 768 && window.innerWidth <= 991) {
    t4.to($animeCard, {
      rotationY: -360,
      height: "60vh",
      width: "345px",
      left: "calc((50% - 360px) + 180px)"
    });
  } else if (window.innerWidth <= 767) {
    t4.to($animeCard, {
      rotationY: -360,
      height: "calc(100vh - 340px)",
      width: "95%",
      left: "50%",
      top: "calc(100% - 40px)",
      yPercent: -100
    });
  } else {
    t4.to($animeCard, {
      rotationY: -360,
      height: "60vh",
      width: "535px",
      left: "calc((50% - 660px) + 275px)"
    });
  }

  //Banner four animation
  gsap.to(".banner-four", {
    ease: "linear",
    scrollTrigger: {
      trigger: ".banner-four",
      start: "center center",
      end: "+=600",
      markers: false,
      pin: true,
      pinSpacing: true,
      scrub: 1
    },
    onUpdate: () => {
        gsap.set(".anime-card-front img", {
          attr: { src: $('.anime-card-four img').attr('src') }
        });
        gsap.set(".anime-card-back img", {
          attr: { src: $('.anime-card-four img').attr('src') }
        });
    }
  });

  //Banner four image rotation
  const t5 = gsap.timeline({
    scrollTrigger: {
      trigger: ".banner-four",
      start: "top center",
      end: "+=600",
      markers: false,
      scrub: 1
    },
    onUpdate: () => {
        gsap.set(".anime-card-front img", {
          attr: { src: $('.anime-card-four img').attr('src') }
        });
        gsap.set(".anime-card-back img", {
          attr: { src: $('.anime-card-four img').attr('src') }
        });
    }
  });
  if (window.innerWidth <= 767) {
    t5.to($animeCard, {
      rotationY: -180,
      height: "100vh",
      width: "100vw",
      left: "50%",
      top: "50%",
      yPercent: -50
    });
  } else {
    t5.to($animeCard, {
      rotationY: -180,
      height: "100vh",
      width: "100vw",
      left: "50%"
    });
  }

  // Main wrapper card
  gsap.to(".anime-card", {
    ease: "linear",
    scrollTrigger: {
      trigger: ".anime-card",
      start: "top top",
      end: "top bottom",
      endTrigger: ".slider-card ",
      markers: false,
      pin: true,
      pinSpacing: false,
      scrub: 1
    }
  });

  //slider-left img animation
  gsap.set(".slider-left img:first-child", { xPercent: 50 });
  gsap.set(".slider-left img:not(:first-child)", { xPercent: 100 });
  gsap.to(".slider-left .img-1", {
    ease: "none",
    xPercent: -95,
    scale: 0.6,
    scrollTrigger: {
      trigger: ".slider-card",
      start: "center+=" + 180 + " center",
      end: "center+=" + 900 + " center",
      markers: false,
      scrub: 1
    }
  });
  gsap.to(".slider-left .img-2", {
    ease: "none",
    xPercent: -70,
    scale: 0.7,
    scrollTrigger: {
      trigger: ".slider-card",
      start: "center+=" + 360 + " center",
      end: "center+=" + 900 + " center",
      markers: false,
      scrub: 1
    }
  });
  gsap.to(".slider-left .img-3", {
    ease: "none",
    xPercent: -40,
    scale: 0.8,
    scrollTrigger: {
      trigger: ".slider-card",
      start: "center+=" + 540 + " center",
      end: "center+=" + 900 + " center",
      markers: false,
      scrub: 1
    }
  });
  gsap.to(".slider-left .img-4", {
    ease: "none",
    xPercent: -10,
    scale: 0.9,
    scrollTrigger: {
      trigger: ".slider-card",
      start: "center+=" + 720 + " center",
      end: "center+=" + 900 + " center",
      markers: false,
      scrub: 1
    }
  });
  gsap.to(".slider-left .img-5", {
    ease: "none",
    xPercent: 20,
    scale: 1,
    scrollTrigger: {
      trigger: ".slider-card",
      start: "center+=" + 800 + " center",
      end: "center+=" + 900 + " center",
      markers: false,
      scrub: 1
    }
  });

  // slider right img animation
  gsap.set(".slider-right img:first-child", { xPercent: -50 });
  gsap.set(".slider-right img:not(:first-child)", { xPercent: -100 });
  gsap.to(".slider-right .img-1", {
    ease: "none",
    xPercent: 95,
    scale: 0.6,
    scrollTrigger: {
      trigger: ".slider-card ",
      start: "center+=" + 180 + " center",
      end: "center+=" + 900 + " center",
      markers: false,
      scrub: 1
    }
  });
  gsap.to(".slider-right .img-2", {
    ease: "none",
    xPercent: 70,
    scale: 0.7,
    scrollTrigger: {
      trigger: ".slider-card ",
      start: "center+=" + 360 + " center",
      end: "center+=" + 900 + " center",
      markers: false,
      scrub: 1
    }
  });
  gsap.to(".slider-right .img-3", {
    ease: "none",
    xPercent: 40,
    scale: 0.8,
    scrollTrigger: {
      trigger: ".slider-card ",
      start: "center+=" + 540 + " center",
      end: "center+=" + 900 + " center",
      markers: false,
      scrub: 1
    }
  });
  gsap.to(".slider-right .img-4", {
    ease: "none",
    xPercent: 10,
    scale: 0.9,
    scrollTrigger: {
      trigger: ".slider-card ",
      start: "center+=" + 720 + " center",
      end: "center+=" + 900 + " center",
      markers: false,
      scrub: 1
    }
  });
  gsap.to(".slider-right .img-5", {
    ease: "none",
    xPercent: -20,
    scale: 1,
    scrollTrigger: {
      trigger: ".slider-card ",
      start: "center+=" + 800 + " center",
      end: "center+=" + 900 + " center",
      markers: false,
      scrub: 1
    }
  });

  //slider card
  gsap.to(".slider-card", {
    ease: "linear",
    scrollTrigger: {
      trigger: ".slider-card",
      start: "center center",
      end: "+=1000",
      markers: false,
      pin: true,
      pinSpacing: true,
      scrub: 1
    }
  });
 //Start button
  $(".btn--neon").on('mouseenter', (e)=>{
      gsap.from($(".btn--neon"), {
        duration:0.1,
        onComplete: () => {
            $('#auth').modal('show')
        }
      });
  })
  $(".btn--neon").on('mouseleave', (e)=>{
     //$('#auth').modal('hide')
  })
  $('#auth').on('shown.bs.modal', function () {
    $('#send').trigger('focus')
  })
  // Upload
  document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-zone");

  dropZoneElement.addEventListener("click", (e) => {
    inputElement.click();
  });

  inputElement.addEventListener("change", (e) => {
    if (inputElement.files.length) {
      updateThumbnail(dropZoneElement, inputElement.files[0]);
    }
  });

  dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone--over");
  });

  ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });

  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
    }

    dropZoneElement.classList.remove("drop-zone--over");
  });
});

/**
 * Updates the thumbnail on a drop zone element.
 *
 * @param {HTMLElement} dropZoneElement
 * @param {File} file
 */
function updateThumbnail(dropZoneElement, file) {
  let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

  // First time - remove the prompt
  if (dropZoneElement.querySelector(".drop-zone__prompt")) {
    dropZoneElement.querySelector(".drop-zone__prompt").remove();
  }

  // First time - there is no thumbnail element, so lets create it
  if (!thumbnailElement) {
    thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add("drop-zone__thumb");
    dropZoneElement.appendChild(thumbnailElement);
  }

  thumbnailElement.dataset.label = file.name;

  // Show thumbnail for image files
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
    };
  } else {
    thumbnailElement.style.backgroundImage = null;
  }
}

};
