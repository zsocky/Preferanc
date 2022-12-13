Scrollbar.init(document.querySelector("main"), {
  speed: 0.7,
  damping: 0.1,
});

// Wrap every letter in a span

var textWrapper = document.querySelector(".subtitle");
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime
  .timeline({
    loop: false,
  })
  .add({
    targets: ".subtitle .letter",
    opacity: [0, 1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (el, i) => 150 * (i + 1),
  })
  .add({
    targets: ".subtitle",
    opacity: 0,
    duration: Infinity,
    easing: "easeOutExpo",
    delay: 1000,
  });