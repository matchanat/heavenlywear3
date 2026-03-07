// Simulasi Analisis Wajah
document.getElementById('imageUpload').addEventListener('change', function(e) {
    const resultBox = document.getElementById('analysisResult');
    resultBox.innerHTML = "Menganalisis wajah...";
    
    setTimeout(() => {
        // Logika konsisten sederhana berdasarkan simulasi
        const recommendations = [
            "Undertone: Cool. Rekomendasi Warna: Soft Blue, Lavender, Pink Pastel. Jenis: Pashmina Ceruty (Cocok untuk wajah Oval).",
            "Undertone: Warm. Rekomendasi Warna: Earth Tone, Terracotta, Nude. Jenis: Segi Empat Voal (Cocok untuk wajah Bulat)."
        ];
        const randomRes = recommendations[Math.floor(Math.random() * recommendations.length)];
        resultBox.innerHTML = `<strong>Hasil Analisis:</strong> <br> ${randomRes}`;
    }, 2000);
});

// Keranjang Belanja Sederhana
let cart = [];
function addToCart(productName, price, color) {
    cart.push({name: productName, price: price, color: color, qty: 1});
    updateCartUI();
    alert("Produk dimasukkan ke keranjang!");
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
}

// Navigasi ke Halaman Produk (Contoh Logika Dinamis)
function openProduct(type) {
    // Di dunia nyata, ini akan mengarah ke detail-produk.html?id=...
    window.location.href = `product-detail.html?item=${type}`;
}
