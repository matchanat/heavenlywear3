// Database Produk - Pastikan ID sinkron dengan detail produk
const productData = [
    { id: 1, name: "Hijab Sport Premium", price: 40000, img: "image/hijab-sport.jpeg" },
    { id: 2, name: "Segi Empat Voal Ultra", price: 35000, img: "image/segiempat-voal.jpeg" },
    { id: 3, name: "Pashmina Viscose Silk", price: 45000, img: "image/pashmina-viscose.jpeg" },
    { id: 4, name: "Pashmina Ceruty Baby Doll", price: 42000, img: "image/pashmina-ceruty.jpeg" }
];

document.addEventListener('DOMContentLoaded', () => {
    renderCatalog();
    initReveal();
    updateCartBadge();
    handlePhotoInput();
});

// Render Katalog ke Home
function renderCatalog() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    grid.innerHTML = productData.map(p => `
        <div class="product-card" data-reveal onclick="goToDetail(${p.id})">
            <img src="${p.img}" alt="${p.name}">
            <div style="padding: 15px 5px; text-align: center;">
                <h3 style="font-size: 1.1rem; margin-bottom: 5px;">${p.name}</h3>
                <p style="color: var(--primary); font-weight: 700;">Rp ${p.price.toLocaleString()}</p>
                <button class="btn secondary" style="width:100%; margin-top:10px; font-size:0.8rem;">Lihat Detail</button>
            </div>
        </div>
    `).join('');
}

// Navigasi ke Halaman Detail
function goToDetail(id) {
    // Mengirim ID produk via URL parameter
    window.location.href = `product-detail.html?id=${id}`;
}

// Toggle Menu Mobile
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

// AI Analysis Logic
function startAIAnalysis() {
    const input = document.getElementById('faceInput');
    if (!input.files[0]) return alert("Mohon unggah foto wajah Anda ✨");

    document.getElementById('aiLoader').style.display = "block";
    document.getElementById('aiResult').style.display = "none";

    setTimeout(() => {
        const isOval = input.files[0].name.length % 2 === 0;
        document.getElementById('faceShape').innerText = isOval ? "Bentuk: Oval" : "Bentuk: Bulat";
        document.getElementById('skinUndertone').innerText = isOval ? "Cool Tone" : "Warm Tone";
        document.getElementById('aiSuggestion').innerText = isOval ? 
            "Gaya Pashmina lilit leher akan sangat mempertegas struktur tulang pipi Anda." : 
            "Model Segiempat dengan lipatan tegak di dahi akan memberikan kesan wajah lebih tirus.";
        
        document.getElementById('aiLoader').style.display = "none";
        document.getElementById('aiResult').style.display = "block";
    }, 2500);
}

// Update Keranjang (Badge Navigasi)
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('heavenlyCart')) || [];
    const badge = document.getElementById('cart-count');
    if (badge) badge.innerText = cart.length;
}

// Preview Foto
function handlePhotoInput() {
    const input = document.getElementById('faceInput');
    if (!input) return;
    input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                document.getElementById('photoPreview').innerHTML = `<img src="${ev.target.result}" style="width:100%; height:100%; object-fit:cover;">`;
            };
            reader.readAsDataURL(file);
        }
    });
}

// Intersection Observer (Animasi Scroll)
function initReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
}
