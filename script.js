/**
 * HEAVENLY WEAR - Core Logic Script
 * Handled: Dynamic Catalog, AI Analysis (Consistent), & Cart Management
 */

// 1. DATABASE PRODUK (Data Sentral)
const products = [
    { 
        id: 1, 
        name: "Hijab Sport Premium", 
        price: 40000, 
        img: "image/hijab-sport.jpeg", 
        category: "Active",
        desc: "Bahan Jersey Spandex premium yang dingin dan elastis. Tetap nyaman dan tertutup saat berolahraga." 
    },
    { 
        id: 2, 
        name: "Segi Empat Voal Ultra", 
        price: 35000, 
        img: "image/segiempat-voal.jpeg", 
        category: "Daily",
        desc: "Bahan Ultra Fine Voal yang sangat lembut, tegak sempurna di dahi, dan tersedia dalam 50+ pilihan warna." 
    },
    { 
        id: 3, 
        name: "Pashmina Viscose Silk", 
        price: 45000, 
        img: "image/pashmina-viscose.jpeg", 
        category: "Elegant",
        desc: "Tekstur mewah dengan efek cooling. Memberikan drape yang cantik tanpa harus sering disetrika." 
    },
    { 
        id: 4, 
        name: "Pashmina Ceruty Baby Doll", 
        price: 42000, 
        img: "image/pashmina-ceruty.jpeg", 
        category: "Formal",
        desc: "Bahan jatuh (flowy) yang anggun. Sangat mewah untuk acara pesta maupun semi-formal." 
    }
];

// 2. INITIALIZATION (Dijalankan saat halaman siap)
document.addEventListener('DOMContentLoaded', () => {
    renderCatalog();
    updateCartBadge();
    initImagePreview();
});

// 3. CATALOG RENDERER
function renderCatalog() {
    const grid = document.getElementById('productGrid');
    if (!grid) return; // Keluar jika tidak ada di halaman index

    grid.innerHTML = products.map(p => `
        <div class="product-card" onclick="window.location.href='product-detail.html?id=${p.id}'">
            <img src="${p.img}" alt="${p.name}">
            <div class="product-info">
                <span class="category-tag">${p.category}</span>
                <h3>${p.name}</h3>
                <p class="price">Rp ${p.price.toLocaleString()}</p>
                <button class="btn-view">Detail Produk</button>
            </div>
        </div>
    `).join('');
}

// 4. AI PERSONAL STYLIST (Logic Konsisten)
function initImagePreview() {
    const input = document.getElementById('faceInput');
    const preview = document.getElementById('photoPreview');
    
    if (input && preview) {
        input.onchange = (e) => {
            const [file] = e.target.files;
            if (file) {
                preview.innerHTML = `<img src="${URL.createObjectURL(file)}" style="width:100%; height:100%; object-fit:cover; border-radius:20px;">`;
            }
        };
    }
}

function startAIAnalysis() {
    const fileInput = document.getElementById('faceInput');
    const loader = document.getElementById('aiLoader');
    const resultBox = document.getElementById('aiResult');

    if (!fileInput.files[0]) {
        alert("Mohon pilih atau ambil foto wajah Anda terlebih dahulu ✨");
        return;
    }

    // Tampilkan Animasi Loading
    loader.style.display = "block";
    resultBox.style.display = "none";

    setTimeout(() => {
        const file = fileInput.files[0];
        // Konsistensi Analisis: Dihitung berdasarkan panjang nama file
        const isPatternA = file.name.length % 2 === 0;

        const resShape = document.getElementById('faceShape');
        const resTone = document.getElementById('skinUndertone');
        const resSuggestion = document.getElementById('aiSuggestion');

        if (isPatternA) {
            resShape.innerText = "Oval / Diamond";
            resTone.innerText = "Cool Undertone (Fair)";
            resSuggestion.innerText = "Sangat direkomendasikan menggunakan Pashmina Ceruty warna Pastel seperti Lilac atau Dusty Pink. Bentuk wajah Anda memberikan fleksibilitas tinggi untuk gaya lilit leher yang elegan.";
        } else {
            resShape.innerText = "Round / Heart";
            resTone.innerText = "Warm Undertone (Golden)";
            resSuggestion.innerText = "Segi Empat Voal dengan lipatan tegak akan sangat mempercantik bentuk wajah Anda. Pilihlah warna Earth Tone seperti Milo, Sage Green, atau Terracotta untuk kesan wajah yang lebih segar.";
        }

        loader.style.display = "none";
        resultBox.style.display = "block";
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 2500);
}

// 5. KERANJANG (Cart Management)
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('heavenlyCart')) || [];
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.innerText = cart.length;
        badge.style.display = cart.length > 0 ? "flex" : "none";
    }
}

// 6. WHATSAPP INTEGRATION
function openWhatsApp() {
    const text = encodeURIComponent("Halo Admin Heavenly Wear, saya butuh konsultasi pemilihan warna hijab yang cocok...");
    window.open(`https://wa.me/628123456789?text=${text}`, '_blank');
}

// 7. EXPOSE DATA UNTUK PRODUCT DETAIL
window.heavenlyData = products;
