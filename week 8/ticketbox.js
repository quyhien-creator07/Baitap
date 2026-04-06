document.addEventListener("DOMContentLoaded", function() {
    
    // --- KHAI BÁO BIẾN ---
    const navItems = document.querySelectorAll('.nav-item');
    const tabHome = document.getElementById('tab-home');
    const tabResults = document.getElementById('tab-results');
    const logoHomeBtn = document.getElementById('logo-home');
    const filtersContainer = document.getElementById('filters-container');
    
    // Biến cho Modal (Popup Bộ Lọc)
    const modalOverlay = document.getElementById('filter-modal');
    const openFilterBtn = document.getElementById('open-filter-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalCatBtns = document.querySelectorAll('.modal-cat-btn');
    const modalApplyBtn = document.getElementById('modal-apply-btn');
    const modalResetBtn = document.getElementById('modal-reset-btn');

    // --- 1. HÀM CHUYỂN MÀN HÌNH ---
    function showTab(tabName) {
        if (tabName === 'results') {
            tabHome.style.display = 'none';
            tabResults.style.display = 'block';
        } else {
            tabHome.style.display = 'block';
            tabResults.style.display = 'none';
            // Về trang chủ thì tắt màu xanh menu và xóa thẻ
            navItems.forEach(nav => nav.classList.remove('active'));
            removeDynamicTag();
        }
    }

    // --- 2. HÀM TẠO THẺ VIỀN XANH [ TÊN ✕ ] ---
    function createDynamicTag(categoryName) {
        removeDynamicTag(); // Xóa thẻ cũ nếu có

        if (!categoryName) return; // Nếu truyền vào rỗng thì không tạo

        const tag = document.createElement('span');
        tag.className = 'filter-btn outline dynamic-tag';
        tag.innerHTML = `${categoryName} ✕`;
        
        // KHI BẤM DẤU ✕ CỦA THẺ NÀY:
        tag.addEventListener('click', function() {
            this.remove(); // Thẻ biến mất
            navItems.forEach(nav => nav.classList.remove('active')); // Mất màu xanh menu
            
            // Xóa chọn trong popup luôn
            modalCatBtns.forEach(btn => btn.classList.remove('selected'));
            
            // LƯU Ý KẾT QUẢ: Màn hình VẪN Ở TRANG KẾT QUẢ (Không gọi showTab('home'))
        });

        filtersContainer.appendChild(tag);
    }

    function removeDynamicTag() {
        const tag = document.querySelector('.dynamic-tag');
        if (tag) tag.remove();
    }


    // --- 3. TƯƠNG TÁC VỚI THANH MENU CHÍNH ---
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault(); 
            
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            const categoryName = this.innerText;
            createDynamicTag(categoryName); // Sinh thẻ [ Tên ✕ ]
            
            // Đồng bộ với Popup (Đổi màu xanh mục tương ứng trong popup)
            modalCatBtns.forEach(btn => {
                btn.classList.remove('selected');
                if (btn.innerText === categoryName) btn.classList.add('selected');
            });

            showTab('results'); // Chuyển sang kết quả
            history.pushState({ page: 'results' }, '', '#results'); // Lưu lịch sử cho nút Back
        });
    });


    // --- 4. TƯƠNG TÁC VỚI POPUP BỘ LỌC ---
    // Mở popup
    openFilterBtn.addEventListener('click', () => modalOverlay.style.display = 'flex');
    // Đóng popup
    closeModalBtn.addEventListener('click', () => modalOverlay.style.display = 'none');
    
    // Chọn 1 mục trong Popup
    modalCatBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            modalCatBtns.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Bấm Nút "Áp dụng" trong Popup
    modalApplyBtn.addEventListener('click', function() {
        const selectedBtn = document.querySelector('.modal-cat-btn.selected');
        if (selectedBtn) {
            const categoryName = selectedBtn.innerText;
            createDynamicTag(categoryName);
            
            // Làm sáng menu bên ngoài tương ứng
            navItems.forEach(nav => {
                nav.classList.remove('active');
                if (nav.innerText === categoryName) nav.classList.add('active');
            });
        }
        modalOverlay.style.display = 'none'; // Tắt popup, VẪN Ở TRANG KẾT QUẢ
    });

    // Bấm Nút "Thiết lập lại" trong Popup
    modalResetBtn.addEventListener('click', function() {
        modalCatBtns.forEach(b => b.classList.remove('selected'));
        removeDynamicTag();
        navItems.forEach(nav => nav.classList.remove('active'));
    });


    // --- 5. LOGO & NÚT MŨI TÊN BACK (QUAY VỀ TRANG CHỦ) ---
    // Bấm logo
    if (logoHomeBtn) {
        logoHomeBtn.addEventListener('click', function() {
            showTab('home');
            history.pushState({ page: 'home' }, '', window.location.pathname);
        });
    }

    // Bấm mũi tên Back của Cốc Cốc / Chrome
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.page === 'results') {
            showTab('results');
        } else {
            showTab('home');
        }
    });

});