// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Cursor animation
var crsr = document.querySelector('#cursor');
var crsrb = document.querySelector('#cursor-b');
document.addEventListener("mousemove", function(dets) {
    crsr.style.left = dets.x + "px";
    crsr.style.top = dets.y + "px";
    crsrb.style.left = dets.x - 99 + "px";
    crsrb.style.top = dets.y - 99 + "px";
});

// GSAP Animations for #nav
gsap.to("#nav", {
    backgroundColor: "Black",
    opacity: 0.98,
    duration: 0.1,
    height: "120px",
    scrollTrigger: {
        trigger: "#nav",
        scroller: "body",
        // markers: true,
        start: "top 0%",
        end: "top -11%",
        scrub: 1
    },
    scale: 1
});

// GSAP Animations for #main
gsap.to("#main", {
    backgroundColor: "Black",
    opacity: 0.98,
    duration: 0.1,
    scrollTrigger: {
        trigger: "#main",
        scroller: "body",
        // markers: true,
        start: "top -25%",
        end: "top -70%",
        scrub: 1
    }
});

// Hover effect for #nav h4 elements
var h4All = document.querySelectorAll("#nav h4");
h4All.forEach(function(elem) {
    elem.addEventListener("mouseenter", function() {
        crsr.style.transform = "scale(2)";
        crsr.style.border = "1px solid #fff";
        crsr.style.backgroundColor = "transparent";
    });

    elem.addEventListener("mouseleave", function() {
        crsr.style.transform = "scale(1)";
        crsr.style.border = "0px solid #95C11E";
        crsr.style.backgroundColor = "#95C11E";
    });
});

// GSAP Animations for #about-us section
gsap.from("#about-us img", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.4,
    scrollTrigger: {
        trigger: "#about-us img",
        scroller: "body",
        start: "top 60%",
        end: "top 58%",
        scrub: 3
    }
});

gsap.from("#about-us-in", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.4,
    scrollTrigger: {
        trigger: "#about-us-in",
        scroller: "body",
        start: "top 60%",
        end: "top 58%",
        scrub: 3
    }
});

// GSAP Animations for .card elements
gsap.from(".card", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.4,
    scrollTrigger: {
        trigger: ".card",
        scroller: "body",
        start: "top 60%",
        end: "top 58%",
        scrub: 3
    }
});

// GSAP Animations for #colon-left and #colon-right
gsap.from("#colon-left", {
    y: -70,
    x: -70,
    scrollTrigger: {
        trigger: "#colon-left",
        scroller: "body",
        start: "top 70%",
        end: "top 59%",
        scrub: 2
    }
});

gsap.from("#colon-right", {
    y: 70,
    x: 70,
    scrollTrigger: {
        trigger: "#colon-right",
        scroller: "body",
        start: "top 70%",
        end: "top 59%",
        scrub: 2
    }
});

// GSAP Animations for #page4 h1
gsap.from("#page4 h1", {
    y: 50,
    scrollTrigger: {
        trigger: "#page4 h1",
        scroller: "body",
        start: "top 75%",
        end: "top 70%",
        scrub: 3
    }
});
