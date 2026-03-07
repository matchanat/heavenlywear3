// Database Produk
const products = [
    { id: 1, name: "Hijab Sport", price: 40000, img: "image/hijab-sport.jpeg", desc: "Bahan jersey premium, menyerap keringat, anti pusing saat olahraga." },
    { id: 2, name: "Segi Empat Voal", price: 35000, img: "image/segiempat-voal.jpeg", desc: "Bahan Ultra Fine Voal, tegak di dahi, tidak licin, sangat lembut." },
    { id: 3, name: "Pashmina Viscose", price: 45000, img: "image/pashmina-viscose.jpeg", desc: "Bahan Viscose bertekstur, adem, tidak perlu disetrika sering-sering." },
    { id: 4, name: "Pashmina Ceruty", price: 42000, img: "image/pashmina-ceruty.jpeg", desc: "Baby Doll Ceruty pilihan, jatuh (flowy), mewah untuk acara formal." }
];

// Inisialisasi Katalog
const productGrid = document.getElementById('productGrid');
if(productGrid) {
    products.forEach(p => {
        productGrid.innerHTML += `
            <div class="product-card" onclick="goToDetail(${p.id})">
                <img src="${p.img}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p>Rp ${p.price.toLocaleString()}</p>
                <small>Klik untuk detail & warna</small>
            </div>
        `;
    });
}

// Analisis Wajah (Konsisten & Simpel)
function analyzeFace() {
    const file = document.getElementById('faceInput').files[0];
    const resultDiv = document.getElementById('aiResult');
    
    if(!file) { alert("Pilih foto dulu!"); return; }

    resultDiv.style.display = "block";
    resultDiv.innerHTML = "Menganalisis fitur wajah...";

    setTimeout(() => {
        // Logika konsisten: Jika nama file mengandung 'a' (contoh acak)
        const isWarm = file.name.length % 2 === 0;
        const resultText = isWarm ? 
            "<strong>Hasil:</strong> Undertone Warm, Wajah Oval. <br> Rekomendasi: <b>Pashmina Ceruty warna Earth Tone</b>." : 
            "<strong>Hasil:</strong> Undertone Cool, Wajah Bulat. <br> Rekomendasi: <b>Segi Empat Voal warna Pastel</b>.";
        resultDiv.innerHTML = resultText;
    }, 2000);
}

function goToDetail(id) {
    window.location.href = `product-detail.html?id=${id}`;
}

// Update Counter Keranjang
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('heavenlyCart')) || [];
    document.getElementById('cart-count').innerText = cart.length;
}
updateCartCount();
