//service worker pwa
if ('serviceWorker' in navigator) {
    console.log('SERVICE WORKER OK');
    navigator.serviceWorker.register('./sw.js').then(res => {
        console.log('service worker is running....', res);
    }).catch(err => {
        console.log('service worker failed', err);
    })
} else {
    console.log('SERVICE WORKER FAILED');
}

//scroll
$(document).ready(function () {
    $("#menu a").click(function (e) {
        e.preventDefault();

        $("html, body").animate({
            scrollTop: $($(this).attr('href')).offset().top
        });

        return false;
    });
});