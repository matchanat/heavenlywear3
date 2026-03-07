/**
 * HEAVENLY WEAR - Core Logic Script
 * Menangani Katalog, AI Analysis, dan Keranjang Belanja
 */

// 1. DATABASE PRODUK
const products = [
    { 
        id: 1, 
        name: "Hijab Sport", 
        price: 40000, 
        img: "image/hijab-sport.jpeg", 
        desc: "Bahan jersey premium, menyerap keringat, anti pusing saat olahraga.",
        category: "Sport"
    },
    { 
        id: 2, 
        name: "Segi Empat Voal", 
        price: 35000, 
        img: "image/segiempat-voal.jpeg", 
        desc: "Bahan Ultra Fine Voal, tegak di dahi, tidak licin, sangat lembut.",
        category: "Daily"
    },
    { 
        id: 3, 
        name: "Pashmina Viscose", 
        price: 45000, 
        img: "image/pashmina-viscose.jpeg", 
        desc: "Bahan Viscose bertekstur, adem, tidak perlu disetrika sering-sering.",
        category: "Elegant"
    },
    { 
        id: 4, 
        name: "Pashmina Ceruty", 
        price: 42000, 
        img: "image/pashmina-ceruty.jpeg", 
        desc: "Baby Doll Ceruty pilihan, jatuh (flowy), mewah untuk acara formal.",
        category: "Formal"
    }
];

// 2. INISIALISASI HALAMAN
document.addEventListener('DOMContentLoaded', () => {
    renderCatalog();
    updateCartCount();
    setupImagePreview();
});

// 3. RENDER KATALOG (Hanya di index.html)
function renderCatalog() {
    const grid = document.getElementById('productGrid');
    if (!grid) return; // Keluar jika bukan di halaman index

    grid.innerHTML = products.map(p => `
        <div class="product-card" onclick="goToDetail(${p.id})">
            <div class="product-badge">${p.category}</div>
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p class="price">Rp ${p.price.toLocaleString()}</p>
            <button class="btn-detail">Lihat Detail</button>
        </div>
    `).join('');
}

function goToDetail(id) {
    window.location.href = `product-detail.html?id=${id}`;
}

// 4. SISTEM AI PERSONAL STYLIST (Analisis Wajah)
function setupImagePreview() {
    const input = document.getElementById('faceInput');
    if (input) {
        input.onchange = (e) => {
            const [file] = e.target.files;
            if (file) {
                const preview = document.getElementById('photoPreview');
                preview.innerHTML = `<img src="${URL.createObjectURL(file)}" style="width:100%; height:100%; object-fit:cover; border-radius:20px;">`;
            }
        };
    }
}

function startAIAnalysis() {
    const fileInput = document.getElementById('faceInput');
    const resultDiv = document.getElementById('aiResult');
    const loader = document.getElementById('aiLoader');

    if (!fileInput.files[0]) {
        alert("Silakan unggah foto wajah Anda terlebih dahulu (Galeri/Kamera).");
        return;
    }

    loader.style.display = 'block';
    resultDiv.style.display = 'none';

    setTimeout(() => {
        const file = fileInput.files[0];
        // Logika Konsisten: Menggunakan panjang nama file sebagai seed analisis
        const isWarm = file.name.length % 2 === 0;
        
        const resShape = document.getElementById('faceShape');
        const resTone = document.getElementById('skinUndertone');
        const resText = document.getElementById('aiSuggestion');

        if (isWarm) {
            resShape.innerText = "Oval / Diamond";
            resTone.innerText = "Warm Undertone";
            resText.innerText = "Warna Earth Tone (Milo, Terracotta, Sage) sangat cocok untuk kulit Anda. Gunakan Pashmina Ceruty untuk menonjolkan garis rahang yang elegan.";
        } else {
            resShape.innerText = "Round / Square";
            resTone.innerText = "Cool Undertone";
            resText.innerText = "Warna Pastel (Pink, Lilac, Blue) akan membuat wajah Anda lebih cerah. Rekomendasi: Segi Empat Voal agar dahi terlihat lebih proporsional.";
        }

        loader.style.display = 'none';
        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    }, 2500);
}

// 5. MANAJEMEN KERANJANG (Cart System)
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('heavenlyCart')) || [];
    const countEl = document.getElementById('cart-count');
    if (countEl) countEl.innerText = cart.length;
}

// Fitur Konsultasi WA Langsung
function contactAdmin() {
    const message = encodeURIComponent("Halo Admin Heavenly Wear, saya ingin konsultasi mengenai produk hijab...");
    window.location.href = `https://wa.me/628123456789?text=${message}`;
}

// Fitur Mobile Menu (Opsional jika Anda menambah hamburger menu)
function toggleMenu() {
    const links = document.querySelector('.nav-links');
    links.classList.toggle('active');
}
