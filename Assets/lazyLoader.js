function initLazyImages() {
	const lazyImages = document.querySelectorAll(".lazy-image");
	const observer = new IntersectionObserver(onIntersection);

	function onIntersection(imageEntities) {
		imageEntities.forEach(image => {
			if (image.isIntersecting) {
				observer.unobserve(image.target);
				image.target.src = image.target.dataset.src;
			}
        });
    }
    lazyImages.forEach(image => {
        observer.observe(image);
    });   
}
