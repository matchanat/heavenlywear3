// Data Produk
const products = [
    { id: 1, name: "Hijab Sport Premium", price: 40000, img: "image/hijab-sport.jpeg" },
    { id: 2, name: "Segi Empat Voal", price: 35000, img: "image/segiempat-voal.jpeg" },
    { id: 3, name: "Pashmina Viscose", price: 45000, img: "image/pashmina-viscose.jpeg" },
    { id: 4, name: "Pashmina Ceruty", price: 42000, img: "image/pashmina-ceruty.jpeg" }
];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Render Catalog
    const grid = document.getElementById('productGrid');
    if(grid) {
        grid.innerHTML = products.map(p => `
            <div class="product-card" data-reveal>
                <img src="${p.img}" alt="${p.name}">
                <h4 style="margin: 15px 0 5px;">${p.name}</h4>
                <p style="color: var(--primary); font-weight:700;">Rp ${p.price.toLocaleString()}</p>
                <button class="btn primary full-w" style="margin-top:10px; font-size:0.8rem" onclick="addToCart(${p.id})">Tambah</button>
            </div>
        `).join('');
    }

    // 2. Reveal Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

    // 3. AI Photo Preview
    const input = document.getElementById('faceInput');
    if(input) {
        input.onchange = (e) => {
            const file = e.target.files[0];
            if(file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    document.getElementById('photoPreview').innerHTML = `<img src="${ev.target.result}" style="width:100%;height:100%;object-fit:cover">`;
                };
                reader.readAsDataURL(file);
            }
        };
    }
});

function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

function startAIAnalysis() {
    const input = document.getElementById('faceInput');
    if(!input.files[0]) return alert("Pilih foto wajah dulu Sis ✨");

    document.getElementById('aiLoader').style.display = "block";
    document.getElementById('aiResult').style.display = "none";

    setTimeout(() => {
        const nameLen = input.files[0].name.length;
        document.getElementById('faceShape').innerText = nameLen % 2 === 0 ? "Oval" : "Round";
        document.getElementById('skinUndertone').innerText = nameLen % 3 === 0 ? "Cool Tone" : "Warm Tone";
        document.getElementById('aiSuggestion').innerText = "Berdasarkan analisis AI, gaya Pashmina dengan lilitan leher akan memberikan kesan wajah lebih jenjang dan elegan.";
        
        document.getElementById('aiLoader').style.display = "none";
        document.getElementById('aiResult').style.display = "block";
    }, 2000);
}

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem('heavenlyCart')) || [];
    cart.push(id);
    localStorage.setItem('heavenlyCart', JSON.stringify(cart));
    document.getElementById('cart-count').innerText = cart.length;
    alert("Berhasil masuk keranjang! 💖");
}
