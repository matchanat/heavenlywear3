const products = [
    { id: 1, name: "Hijab Sport", price: 40000, img: "image/hijab-sport.jpeg", desc: "Jersey premium untuk olahraga." },
    { id: 2, name: "Segi Empat Voal", price: 35000, img: "image/segiempat-voal.jpeg", desc: "Tegak di dahi dan lembut." },
    { id: 3, name: "Pashmina Viscose", price: 45000, img: "image/pashmina-viscose.jpeg", desc: "Tekstur mewah dan adem." },
    { id: 4, name: "Pashmina Ceruty", price: 42000, img: "image/pashmina-ceruty.jpeg", desc: "Bahan flowy cocok untuk pesta." }
];

// Render Katalog
function renderCatalog() {
    const grid = document.getElementById('productGrid');
    if(!grid) return;
    grid.innerHTML = products.map(p => `
        <div class="product-card" onclick="location.href='product-detail.html?id=${p.id}'">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p style="color: #F06292; font-weight: bold;">Rp ${p.price.toLocaleString()}</p>
        </div>
    `).join('');
}

// Analisis Wajah
document.getElementById('faceInput').onchange = (e) => {
    const file = e.target.files[0];
    if(file) {
        document.getElementById('photoPreview').innerHTML = `<img src="${URL.createObjectURL(file)}" style="width:100%; height:100%; object-fit:cover">`;
    }
};

function startAIAnalysis() {
    const file = document.getElementById('faceInput').files[0];
    if(!file) return alert("Pilih foto dulu!");

    document.getElementById('aiLoader').style.display = "block";
    document.getElementById('aiResult').style.display = "none";

    setTimeout(() => {
        const isOval = file.name.length % 2 === 0;
        document.getElementById('faceShape').innerText = isOval ? "Oval" : "Bulat";
        document.getElementById('skinUndertone').innerText = isOval ? "Cool Tone" : "Warm Tone";
        document.getElementById('aiSuggestion').innerText = isOval ? 
            "Wajah Oval cocok dengan segala jenis hijab. Rekomendasi: Pashmina Ceruty warna Navy." : 
            "Wajah Bulat cocok dengan Segi Empat Voal untuk kesan tirus. Rekomendasi: Warna Earth Tone.";
        
        document.getElementById('aiLoader').style.display = "none";
        document.getElementById('aiResult').style.display = "block";
    }, 2000);
}

// Update Cart Count
function updateCartUI() {
    const cart = JSON.parse(localStorage.getItem('heavenlyCart')) || [];
    const badge = document.getElementById('cart-count');
    if(badge) badge.innerText = cart.length;
}

window.onload = () => {
    renderCatalog();
    updateCartUI();
};
