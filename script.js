const products = [
  {
    name: "NordVPN",
    cat: "VPN",
    price: 4000,
    icon: "assets/nordvpn.png",
    desc: "Authorized VPN subscription/service for secure and private internet use.",
    opts: ["Basic — ₦4,000", "High — ₦7,500"]
  },
  {
    name: "ExpressVPN",
    cat: "VPN",
    price: 4000,
    icon: "assets/expressvpn.png",
    desc: "ExpressVPN option for compatible devices and secure browsing.",
    opts: ["PC — ₦4,000", "Phone — ₦4,500"]
  },
  {
    name: "Proton VPN",
    cat: "VPN",
    price: 3500,
    icon: "assets/proton-vpn.png",
    desc: "Authorized Proton VPN service for privacy and secure browsing.",
    opts: ["Standard — ₦3,500", "Premium — ₦6,000"]
  },
  {
    name: "Instagram Services",
    cat: "Social Media",
    price: 3500,
    icon: "assets/instagram.png",
    desc: "Legitimate Instagram management and marketing packages.",
    opts: [
      "Starter — ₦3,500",
      "Growth — ₦5,200",
      "Premium — ₦7,200"
    ]
  },
  {
    name: "TikTok Services",
    cat: "Social Media",
    price: 4270,
    icon: "assets/tiktok.png",
    desc: "Legitimate TikTok management and marketing packages.",
    opts: [
      "Starter — ₦4,270",
      "Growth — ₦5,570",
      "Premium — ₦7,320"
    ]
  },
  {
    name: "Google Voice Services",
    cat: "Other",
    price: 8000,
    icon: "assets/google-voice.png",
    desc: "Legitimate Google Voice setup and support services.",
    opts: ["Contact support for availability"]
  },
  {
    name: "Facebook Page Services",
    cat: "Social Media",
    price: 4300,
    icon: "assets/facebook.png",
    desc: "Authorized services for Facebook Page owners and legitimate projects.",
    opts: ["Setup / management — contact support"]
  },
  {
    name: "AI Video Call Tools",
    cat: "AI Tools",
    price: 0,
    icon: "assets/ai-video.png",
    desc: "AI-assisted video-call and communication tools for educational purposes.",
    opts: ["Contact for current pricing"]
  }
];

let cat = "All";
let cur = null;

const grid = document.getElementById("grid");
const search = document.getElementById("search");
const filters = document.getElementById("filters");
const modal = document.getElementById("modal");
const mi = document.getElementById("mi");
const mt = document.getElementById("mn");
const md = document.getElementById("md");
const mp = document.getElementById("mp");
const mo = document.getElementById("modalContent");

const money = n =>
  n ? "₦" + n.toLocaleString("en-NG") : "Contact for price";

function filtersDraw() {
  filters.innerHTML = [
    "All",
    "VPN",
    "Social Media",
    "AI Tools",
    "Other"
  ]
    .map(
      x =>
        `<button class="filter ${
          x === cat ? "active" : ""
        }" onclick="setCat('${x}')">${x}</button>`
    )
    .join("");
}

function setCat(x) {
  cat = x;
  filtersDraw();
  draw();
}

function draw() {
  const q = search.value.toLowerCase().trim();

  const list = products.filter(
    p =>
      (cat === "All" || p.cat === cat) &&
      (p.name + " " + p.desc).toLowerCase().includes(q)
  );

  grid.innerHTML =
    list
      .map(
        p => `
        <article class="product">

          <div class="product-icon">
            <img
              src="${p.icon}"
              alt="${p.name} logo"
              onerror="this.style.display='none';this.parentElement.textContent='${p.name.charAt(
                0
              )}'"
            >
          </div>

          <h3>${p.name}</h3>

          <p>${p.desc}</p>

          <div class="product-bottom">
            <span class="price">${money(p.price)}</span>

            <a
              class="view"
              href="#"
              onclick="openProduct('${p.name.replace(/'/g, "\\'")}');return false;"
            >
              VIEW →
            </a>
          </div>

        </article>
      `
      )
      .join("") || "<p>No services found.</p>";
}

function openProduct(name) {
  cur = products.find(p => p.name === name);

  if (!cur) return;

  mi.innerHTML = `
    <img
      src="${cur.icon}"
      alt="${cur.name} logo"
      style="width:52px;height:52px;object-fit:contain"
      onerror="this.style.display='none'"
    >
  `;

  mt.textContent = cur.name;
  md.textContent = cur.desc;
  mp.textContent = money(cur.price);

  mo.innerHTML = cur.opts
    .map(option => `<div class="option">${option}</div>`)
    .join("");

  modal.classList.add("open");
}

function closeModal() {
  modal.classList.remove("open");
}

function buy() {
  if (!cur) return;

  closeModal();

  const product = encodeURIComponent(cur.name);

  window.open(
    "https://t.me/biglogs1?text=" +
      encodeURIComponent(
        "Hello BIGLOGSTORE, I would like to order: " + cur.name
      ),
    "_blank"
  );
}

function toast(message) {
  let t = document.getElementById("toast");

  if (!t) return;

  t.textContent = message;
  t.classList.add("show");

  clearTimeout(window.tt);

  window.tt = setTimeout(() => {
    t.classList.remove("show");
  }, 2500);
}

function amt(n) {
  const amount = document.getElementById("amount");

  if (amount) {
    amount.value = n;
  }
}

function fund() {
  const amount = document.getElementById("amount");

  if (!amount) return;

  const n = Number(
    amount.value.replace(/[^0-9]/g, "")
  );

  if (n < 1000) {
    toast("Minimum wallet funding is ₦1,000.");
    return;
  }

  toast(
    "Payment successful — ₦" +
      n.toLocaleString("en-NG") +
      " added to your demo wallet."
  );
}

search.addEventListener("input", draw);

modal.addEventListener("click", event => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeModal();
  }
});

filtersDraw();
draw();
