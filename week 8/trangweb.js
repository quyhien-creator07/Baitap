document.addEventListener("DOMContentLoaded", function() {

    // 1. HIỆU ỨNG CUỘN TRANG (Scroll Animation)
    const elementsToAnimate = document.querySelectorAll('.fade-in-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elementsToAnimate.forEach(el => observer.observe(el));


    // 2. ĐỒNG HỒ ĐẾM NGƯỢC
    // Đặt hạn chót là 30 ngày kể từ hôm nay để lúc nào bạn mở lên test đồng hồ cũng chạy
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30); 
    const timeBoxes = document.querySelectorAll('.time-box strong');

    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        if (timeBoxes.length >= 3) {
            timeBoxes[0].innerText = days < 10 ? '0' + days : days;
            timeBoxes[1].innerText = hours < 10 ? '0' + hours : hours;
            timeBoxes[2].innerText = minutes < 10 ? '0' + minutes : minutes;
        }

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.querySelector('.countdown').innerHTML = "<b>SỰ KIỆN ĐANG DIỄN RA!</b>";
        }
    }, 1000);


    // 3. HIỆU ỨNG SỔ XUỐNG CỦA FAQ (Accordion)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            // Đóng các câu hỏi khác trước khi mở câu hỏi được click (tuỳ chọn)
            faqItems.forEach(i => {
                if (i !== this) i.classList.remove('active');
            });
            
            // Đảo ngược trạng thái của câu hỏi hiện tại
            this.classList.toggle('active');
        });
    });

});