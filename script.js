/**
 * HEAVENLY WEAR - Core Logic Script
 * Menangani: Katalog, Analisis Wajah AI, Keranjang, & Navigasi
 */

// 1. DATABASE PRODUK (Pusat Data)
const products = [
    { 
        id: 1, 
        name: "Hijab Sport", 
        price: 40000, 
        img: "image/hijab-sport.jpeg", 
        category: "Activewear",
        desc: "Didesain dengan bahan jersey premium yang elastis dan breathable. Sangat nyaman untuk aktivitas intens tanpa rasa gerah." 
    },
    { 
        id: 2, 
        name: "Hijab Segi Empat Voal", 
        price: 35000, 
        img: "image/segiempat-voal.jpeg", 
        category: "Daily Wear",
        desc: "Bahan Ultra Fine Voal premium yang tegak di dahi, tidak licin, dan sangat lembut untuk look harian yang elegan." 
    },
    { 
        id: 3, 
        name: "Hijab Pashmina Viscose", 
        price: 45000, 
        img: "image/pashmina-viscose.jpeg", 
        category: "Premium",
        desc: "Tekstur viscose yang mewah dengan efek cooling. Memberikan drape yang cantik dan tidak perlu sering disetrika." 
    },
    { 
        id: 4, 
        name: "Hijab Pashmina Ceruty", 
        price: 42000, 
        img: "image/pashmina-ceruty.jpeg", 
        category: "Formal",
        desc: "Bahan Ceruty Baby Doll yang jatuh (flowy) dan berpasir halus. Sangat anggun untuk acara pesta maupun semi-formal." 
    }
];

// 2. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    initCatalog();
    updateCartBadge();
    initAIPreview();
    
    // Smooth scroll untuk navigasi internal
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});

// 3. CATALOG LOGIC
function initCatalog() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    grid.innerHTML = products.map(p => `
        <div class="product-card" onclick="location.href='product-detail.html?id=${p.id}'">
            <div class="product-badge">${p.category}</div>
            <img src="${p.img}" alt="${p.name}" loading="lazy">
            <div class="product-info">
                <h3>${p.name}</h3>
                <p class="price">Rp ${p.price.toLocaleString()}</p>
                <span class="view-detail">Lihat Detail →</span>
            </div>
        </div>
    `).join('');
}

// 4. AI PERSONAL STYLIST LOGIC (Point 9 - Konsistensi)
function initAIPreview() {
    const input = document.getElementById('faceInput');
    if (input) {
        input.onchange = (e) => {
            const [file] = e.target.files;
            if (file) {
                const preview = document.getElementById('photoPreview');
                preview.innerHTML = `<img src="${URL.createObjectURL(file)}" style="width:100%; height:100%; object-fit:cover;">`;
            }
        };
    }
}

function startAIAnalysis() {
    const input = document.getElementById('faceInput');
    const loader = document.getElementById('aiLoader');
    const result = document.getElementById('aiResult');

    if (!input.files[0]) {
        alert("Mohon unggah foto wajah Anda terlebih dahulu ✨");
        return;
    }

    loader.style.display = "block";
    result.style.display = "none";

    // Simulasi proses AI selama 2.5 detik
    setTimeout(() => {
        const file = input.files[0];
        
        // Logika Konsistensi: Menggunakan pola angka dari panjang nama file
        // Agar foto yang sama selalu menghasilkan rekomendasi yang sama
        const isPatternA = file.name.length % 2 === 0;

        const resShape = document.getElementById('faceShape');
        const resTone = document.getElementById('skinUndertone');
        const resText = document.getElementById('aiSuggestion');

        if (isPatternA) {
            resShape.innerText = "Oval / Long";
            resTone.innerText = "Cool Undertone (Pinkish)";
            resText.innerText = "Rekomendasi: Gunakan Pashmina Ceruty dengan warna Pastel (Pink/Lilac). Tekstur flowy akan menyempurnakan bentuk wajah Anda yang proporsional.";
        } else {
            resShape.innerText = "Round / Heart";
            resTone.innerText = "Warm Undertone (Golden)";
            resText.innerText = "Rekomendasi: Gunakan Segi Empat Voal dengan lipatan tegak. Warna Earth Tone (Milo/Sage) akan memberikan kontras cantik pada kulit Anda.";
        }

        loader.style.display = "none";
        result.style.display = "block";
        result.classList.add('fade-in');
        result.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 2500);
}

// 5. CART SYSTEM LOGIC
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('heavenlyCart')) || [];
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.innerText = cart.length;
        badge.style.display = cart.length > 0 ? "flex" : "none";
    }
}

// Fungsi Tambah ke Keranjang (Digunakan di product-detail.html)
function addToCart(product, color, qty) {
    let cart = JSON.parse(localStorage.getItem('heavenlyCart')) || [];
    
    // Cek apakah item dengan warna yang sama sudah ada
    const existingIndex = cart.findIndex(item => item.id === product.id && item.color === color);
    
    if (existingIndex > -1) {
        cart[existingIndex].qty = parseInt(cart[existingIndex].qty) + parseInt(qty);
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img,
            color: color,
            qty: parseInt(qty)
        });
    }
    
    localStorage.setItem('heavenlyCart', JSON.stringify(cart));
    updateCartBadge();
    
    // Efek toast sederhana (Opsional)
    alert(`Sukses! ${product.name} (${color}) ditambahkan ke keranjang.`);
}

// 6. WHATSAPP CONSULTATION
function openWhatsApp() {
    const message = encodeURIComponent("Halo Admin Heavenly Wear, saya butuh bantuan konsultasi pemilihan hijab yang cocok untuk saya...");
    window.open(`https://wa.me/628123456789?text=${message}`, '_blank');
}

// Ekspor data produk agar bisa diakses di file HTML lain jika diperlukan
window.heavenlyProducts = products;
