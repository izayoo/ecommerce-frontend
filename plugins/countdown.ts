export default defineNuxtPlugin((nuxtApp) => {
    function countDown(date: string, elId:string) {
        // Set the date we're counting down to
        var countDownDate = new Date(date).getTime();

        // Update the count down every 1 second
        var x = setInterval(function () {

            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            // var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + (days * 24);
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in an element with id
            const element = document.getElementById(elId);
            if (element) {
                if (days < 7) {
                    element.innerHTML =  hours.toString().padStart(2, '0') + ":"
                        + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');
                    // If the count down is over, write some text
                    if (distance < 0) {
                        clearInterval(x);
                        element.innerHTML = 'End date is done.'
                    }
                } else {
                    element.closest('.campaign-count-down').style.display = 'none';
                }

            }



        }, 1000);
    }
    return { provide: { countDown } };
})