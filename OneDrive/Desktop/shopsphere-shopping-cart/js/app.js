const $ = (s) => document.querySelector(s);

const get = (k, fallback) =>
  JSON.parse(localStorage.getItem(k) || JSON.stringify(fallback));

const set = (k, v) =>
  localStorage.setItem(k, JSON.stringify(v));

const money = (n) => `$${Number(n).toFixed(2)}`;

const user = () => get("shopsphere_user", null);

const loggedIn = () =>
  Boolean(localStorage.getItem("shopsphere_token"));

function guard() {
  if (!loggedIn()) location.replace("login.html");
}

function cart() {
  return get("shopsphere_cart", []);
}

function cartCount() {
  return cart().reduce((a, p) => a + p.qty, 0);
}

function header() {
  const target = $("#siteHeader");
  if (!target) return;

  target.className = "site-header";
  target.innerHTML = `
    <a class="brand" href="index.html">SHOP<span>SPHERE</span></a>
    <div class="header-links">
      <a href="shop.html">Shop</a>
      <a href="profile.html">Profile</a>
      <a class="cart-link" href="cart.html">Bag <b>(${cartCount()})</b></a>
      <a href="#" id="logout">Log out</a>
    </div>
  `;

  $("#logout").onclick = (e) => {
    e.preventDefault();
    localStorage.removeItem("shopsphere_token");
    location = "index.html";
  };
}

function message(text, error = false) {
  const el = $("#formMessage");
  if (el) {
    el.textContent = text;
    el.style.color = error ? "#ae3131" : "#28713d";
  }
}

function toast(text) {
  const el = $("#toast");
  if (!el) return;

  el.textContent = text;
  el.classList.add("show");

  setTimeout(() => el.classList.remove("show"), 2300);
}

function setupAuth() {
  const signup = $("#signupForm"),
    login = $("#loginForm");

  if (signup)
    signup.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = $("#signupName").value.trim(),
        email = $("#signupEmail").value.trim().toLowerCase(),
        password = $("#signupPassword").value;

      if (get("shopsphere_user", null))
        return message(
          "An account already exists. Please sign in.",
          true
        );

      set("shopsphere_user", {
        name,
        email,
        password,
        phone: "",
        address: "",
      });

      localStorage.setItem(
        "shopsphere_token",
        crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now())
      );

      location = "shop.html";
    });

  if (login)
    login.addEventListener("submit", (e) => {
      e.preventDefault();

      const u = user();

      if (
        !u ||
        u.email !== $("#loginEmail").value.trim().toLowerCase() ||
        u.password !== $("#loginPassword").value
      )
        return message("Incorrect email or password.", true);

      localStorage.setItem(
        "shopsphere_token",
        crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now())
      );

      location = "shop.html";
    });
}

async function shop() {
  if (!$("#productGrid")) return;

  guard();
  header();

  let products = [];
  let selectedColor = "";

  try {
    const res = await fetch("https://fakestoreapi.com/products");

    if (!res.ok) throw Error();

    products = await res.json();
  } catch {
    products = [
      {
        id: 1,
        title: "Classic cotton tee",
        price: 24.99,
        category: "men's clothing",
        image: "https://via.placeholder.com/300?text=Classic+Tee",
        rating: {
          rate: 4.4,
        },
      },
      {
        id: 2,
        title: "Everyday tote",
        price: 59.99,
        category: "jewelery",
        image: "https://via.placeholder.com/300?text=Everyday+Tote",
        rating: {
          rate: 4.7,
        },
      },
    ];

    toast("Showing our offline sample collection");
  }

  function render() {
    let items = [...products],
      q = $("#searchInput").value.toLowerCase(),
      cats = [
        ...document.querySelectorAll(".category-filter:checked"),
      ].map((x) => x.value),
      max = +$("#priceRange".trim()).value;

    items = items.filter(
      (p) =>
        p.title.toLowerCase().includes(q) &&
        p.price <= max &&
        (!cats.length || cats.includes(p.category))
    );

    let sort = $("#sortSelect").value;

    if (sort === "price-asc")
      items.sort((a, b) => a.price - b.price);

    if (sort === "price-desc")
      items.sort((a, b) => b.price - a.price);

    if (sort === "rating")
      items.sort((a, b) => b.rating.rate - a.rating.rate);

    $("#productGrid").innerHTML = items.length
      ? items
          .map(
            (p) => `
        <article class="product-card">
          <div class="product-image">
            <img src="${p.image}" alt="${p.title}">
          </div>

          <button
            class="add-btn"
            title="Add to cart"
            data-id="${p.id}"
          >
            +
          </button>

          <div class="product-info">
            <span class="category">${p.category}</span>

            <h3 title="${p.title}">
              ${p.title}
            </h3>

            <div>
              <b>${money(p.price)}</b>
              <span class="rating">★ ${p.rating.rate}</span>
            </div>
          </div>
        </article>
      `
          )
          .join("")
      : `<p class="loading">
          No products match those filters.
        </p>`;

    document.querySelectorAll(".add-btn").forEach(
      (b) =>
        (b.onclick = () =>
          add(products.find((p) => p.id == b.dataset.id)))
    );
  }

  function add(p) {
    let c = cart(),
      found = c.find((x) => x.id === p.id);

    if (found) found.qty++;
    else
      c.push({
        ...p,
        qty: 1,
        color: selectedColor,
      });

    set("shopsphere_cart", c);

    header();
    toast(`${p.title} added to your bag`);
  }

  $("#searchInput").oninput = render;
  $("#sortSelect").onchange = render;

  $("#priceRange").oninput = (e) => {
    $("#priceLabel").textContent = `$0 — $${e.target.value}`;
    render();
  };

  document
    .querySelectorAll(".category-filter")
    .forEach((x) => (x.onchange = render));

  document.querySelectorAll(".swatch").forEach((x) => {
    x.onclick = () => {
      document
        .querySelectorAll(".swatch")
        .forEach((s) => s.classList.remove("active"));

      x.classList.add("active");
      selectedColor = x.dataset.color;

      render();
    };
  });

  $("#clearFilters").onclick = () => {
    document
      .querySelectorAll(".category-filter")
      .forEach((x) => (x.checked = false));

    $("#searchInput").value = "";
    $("#priceRange").value = 1000;
    $("#priceLabel").textContent = "$0 — $1000";

    render();
  };

  render();
}

function cartPage() {
  if (!$("#cartItems")) return;

  guard();
  header();

  function render() {
    let c = cart(),
      sub = c.reduce((a, p) => a + p.price * p.qty, 0);

    $("#cartItems").innerHTML = c.length
      ? c
          .map(
            (p) => `
        <article class="cart-item">
          <img src="${p.image}" alt="${p.title}">

          <div>
            <h3>${p.title}</h3>

            <p>
              ${p.category}${
                p.color ? " · " + p.color : ""
              } · Qty ${p.qty}
            </p>
          </div>

          <div class="item-actions">
            <b>${money(p.price * p.qty)}</b><br>

            <button
              class="remove"
              data-id="${p.id}"
            >
              Remove
            </button>
          </div>
        </article>
      `
          )
          .join("")
      : `
        <p class="empty">
          Your bag is empty.
          <a href="shop.html">
            <u>Discover something new</u>
          </a>.
        </p>
      `;

    $("#subtotal").textContent = money(sub);
    $("#total").textContent = money(sub);

    document.querySelectorAll(".remove").forEach(
      (b) =>
        (b.onclick = () => {
          set(
            "shopsphere_cart",
            cart().filter((x) => x.id != b.dataset.id)
          );

          header();
          render();
        })
    );
  }

  render();

  $("#checkoutButton").onclick = () => {
    let total = cart().reduce(
      (a, p) => a + p.price * p.qty,
      0
    );

    if (!total) return toast("Your bag is empty");

    const complete = () => {
      set("shopsphere_cart", []);
      render();
      header();
      toast("Payment successful — thank you!");
    };

    if (window.Razorpay) {
      try {
        new Razorpay({
          key: "rzp_test_REPLACE_WITH_YOUR_KEY",
          amount: Math.round(total * 100),
          currency: "USD",
          name: "ShopSphere",
          description: "Your order",
          handler: complete,
          theme: {
            color: "#171717",
          },
        }).open();
      } catch {
        complete();
      }
    } else {
      complete();
    }
  };
}

function profile() {
  if (!$("#profileForm")) return;

  guard();
  header();

  let u = user();

  $("#profileName").value = u.name || "";
  $("#profileEmail").value = u.email || "";
  $("#profilePhone").value = u.phone || "";
  $("#profileAddress").value = u.address || "";

  $("#profileForm").onsubmit = (e) => {
    e.preventDefault();

    set("shopsphere_user", {
      ...u,
      name: $("#profileName").value.trim(),
      email: $("#profileEmail").value.trim(),
      phone: $("#profilePhone").value.trim(),
      address: $("#profileAddress").value.trim(),
    });

    message("Your profile has been saved.");
  };
}

setupAuth();
shop();
cartPage();
profile();