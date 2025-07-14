document.addEventListener("DOMContentLoaded", function () {
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Smooth scroll with offset for desktop
  function getOffset() {
    // On mobile, account for sticky navbar height
    return window.innerWidth < 992 ? document.querySelector('header').offsetHeight : 100;
  }

  // Custom animated scroll function
  function animatedScrollTo(targetY, duration = 600) {
    const startY = window.scrollY;
    const diff = targetY - startY;
    let start;
    function step(timestamp) {
      if (!start) start = timestamp;
      const time = Math.min(1, (timestamp - start) / duration);
      // Ease in-out cubic
      const ease = time < 0.5 ? 4 * time * time * time : 1 - Math.pow(-2 * time + 2, 3) / 2;
      window.scrollTo(0, startY + diff * ease);
      if (time < 1) {
        window.requestAnimationFrame(step);
      }
    }
    window.requestAnimationFrame(step);
  }

  document.querySelectorAll('.navbar-nav .nav-link').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if (targetId.startsWith('#')) {
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var y = target.getBoundingClientRect().top + window.pageYOffset - getOffset();
          animatedScrollTo(y, 300);
        }
      }
    });
  });
});
