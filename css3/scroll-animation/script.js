function animate(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.style.animation = entry.target.dataset.animate; // data-animate attribute on element
        } else {
            entry.target.style.animation = 'none';
        }
    });
}

// Using IntersectionObserver https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
var observer = new IntersectionObserver(animate);

var anime = document.querySelectorAll('.animate');
anime.forEach(function(item) {
    observer.observe(item);
});