// Database Produk Lokal
const products = [
    { id: 1, name: "Hijab Sport Premium", price: 40000, img: "image/hijab-sport.jpeg" },
    { id: 2, name: "Segi Empat Voal", price: 35000, img: "image/segiempat-voal.jpeg" },
    { id: 3, name: "Pashmina Viscose", price: 45000, img: "image/pashmina-viscose.jpeg" },
    { id: 4, name: "Pashmina Ceruty", price: 42000, img: "image/pashmina-ceruty.jpeg" }
];

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    initReveal();
    handlePhotoPreview();
});

// Toggle Menu Mobile
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

// Render Produk ke UI
function renderProducts() {
    const grid = document.getElementById('productGrid');
    if(!grid) return;
    grid.innerHTML = products.map(p => `
        <div class="product-card" data-reveal>
            <img src="${p.img}" alt="${p.name}">
            <h3 style="margin-top:15px; font-size:1.1rem;">${p.name}</h3>
            <p style="color:var(--primary); font-weight:700;">Rp ${p.price.toLocaleString()}</p>
            <button class="btn secondary" style="margin-top:10px; width:100%;" onclick="addToCart(${p.id})">Tambah Keranjang</button>
        </div>
    `).join('');
}

// Animasi Muncul Saat Scroll
function initReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
}

// Handle Preview Foto AI
function handlePhotoPreview() {
    const input = document.getElementById('faceInput');
    input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                document.getElementById('photoPreview').innerHTML = `<img src="${event.target.result}" style="width:100%; height:100%; object-fit:cover;">`;
            };
            reader.readAsDataURL(file);
        }
    });
}

// AI Analysis Logic
function startAIAnalysis() {
    const input = document.getElementById('faceInput');
    if(!input.files[0]) return alert("Silakan pilih foto dulu ya Sis!");

    document.getElementById('aiLoader').style.display = "block";
    document.getElementById('aiResult').style.display = "none";

    setTimeout(() => {
        const isOval = input.files[0].name.length % 2 === 0;
        document.getElementById('faceShape').innerText = isOval ? "Oval" : "Bulat";
        document.getElementById('skinUndertone').innerText = isOval ? "Cool Tone" : "Warm Tone";
        document.getElementById('aiSuggestion').innerText = isOval ? 
            "Pashmina lilit leher sangat cocok untuk mempertegas dagu Anda." : 
            "Segiempat dengan lipatan dahi tegak akan memberikan kesan wajah lebih tirus.";
        
        document.getElementById('aiLoader').style.display = "none";
        document.getElementById('aiResult').style.display = "block";
    }, 2500);
}

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem('heavenlyCart')) || [];
    cart.push(id);
    localStorage.setItem('heavenlyCart', JSON.stringify(cart));
    document.getElementById('cart-count').innerText = cart.length;
    alert("Produk berhasil ditambah! ✨");
}
