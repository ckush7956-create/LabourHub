// Labour data: now with experience and price (prize)
const workers = [
  { name: "Ramesh Kumar", trade: "Plumbing", location: "Delhi NCR", rating: 5, phone: "9999911111", experience: "7 years", price: "₹400/day" },
  { name: "Sita Devi", trade: "Carpentry", location: "Gurgaon", rating: 5, phone: "9876543210", experience: "4 years", price: "₹500/day" },
  { name: "Rahul Yadav", trade: "Electrician", location: "Noida", rating: 5, phone: "9810012132", experience: "8 years", price: "₹550/day" },
  { name: "Ajit Kumar", trade: "Painting", location: "Delhi", rating: 4, phone: "9543210000", experience: "6 years", price: "₹350/day" },
  { name: "Amit Singh", trade: "Electrician", location: "Ghaziabad", rating: 5, phone: "+919761803403", experience: "4 years", price: "₹600/day" },
  { name: "Priya Sharma", trade: "Painter", location: "Faridabad", rating: 5, phone: "9876700009", experience: "3 years", price: "₹450/day" },
  { name: "Sartaj Saifi", trade: "Carpenter", location: "Delhi", rating: 4, phone: "+918791141490", experience: "5 years", price: "₹530/day" },
  { name: "Kavita Joshi", trade: "Plumbing", location: "Noida", rating: 5, phone: "7777788888", experience: "4 years", price: "₹420/day" }
];
let cart = [];

// LOGIN -----
if(sessionStorage.getItem("loggedIn") === "true"){
  showDashboard();
}
document.getElementById('loginForm').onsubmit = function(e) {
  e.preventDefault();
  sessionStorage.setItem("loggedIn", "true");
  document.querySelector('.login-glass').style.animation = "pop-in 0.7s reverse";
  setTimeout(showDashboard, 540);
};
function showDashboard() {
  document.getElementById('login-section').style.display = "none";
  document.getElementById('dashboard-section').style.display = "block";
  renderWorkers(workers);
  renderCartCount();
}
function logout() {
  sessionStorage.removeItem("loggedIn");
  document.getElementById('dashboard-section').style.display = "none";
  document.getElementById('login-section').style.display = "flex";
  document.querySelector('.login-glass').style.animation = "pop-in 1.1s cubic-bezier(.31,1.45,.74,1.02)";
}

// WORKERS RENDER -----
function renderWorkers(list) {
  const workersListDiv = document.getElementById('workersList');
  workersListDiv.innerHTML = '';
  if(list.length === 0) {
    workersListDiv.innerHTML = '<div style="color: #888; text-align:center; width:100%">No workers found.</div>';
    return;
  }
  list.forEach((worker, idx) => {
    workersListDiv.innerHTML += `
      <div class="worker-card" data-index="${idx}">
        <strong>${worker.name}</strong>
        <span style="color: orange;">${'★'.repeat(worker.rating)}</span>
        <div class="worker-meta">Trade: ${worker.trade}</div>
        <div class="worker-meta">Location: ${worker.location}</div>
        <div class="worker-meta">Experience: ${worker.experience}</div>
        <div class="worker-meta">Price: <span class="yellow">${worker.price}</span></div>
      </div>
    `;
  });
  attachCardClicks(list);
}

// SEARCH
function filterWorkers(query) {
  query = query.trim().toLowerCase();
  if(!query) return workers;
  return workers.filter(worker =>
    worker.name.toLowerCase().includes(query) ||
    worker.trade.toLowerCase().includes(query) ||
    worker.location.toLowerCase().includes(query)
  );
}
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', doSearch);
searchInput.addEventListener('keyup', function(e){
  if(e.key === 'Enter') doSearch();
});
function doSearch() {
  const query = searchInput.value;
  const filtered = filterWorkers(query);
  renderWorkers(filtered);
}
document.querySelectorAll('.tag-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const trade = btn.textContent.toLowerCase();
    searchInput.value = trade;
    const filtered = filterWorkers(trade);
    renderWorkers(filtered);
  });
});

// MODAL (DETAIL/POPUP)
function attachCardClicks(workerList) {
  document.querySelectorAll('.worker-card').forEach((card, i) => {
    card.onclick = function(){
      openModal(workerList[i]);
    };
  });
}
function openModal(worker) {
  const modal = document.getElementById('detailModal');
  const modalContent = document.getElementById('modalContent');
  modalContent.innerHTML = `
    <span class="close" id="modalClose">&times;</span>
    <h2>${worker.name}</h2>
    <p><strong>Trade:</strong> ${worker.trade}</p>
    <p><strong>Location:</strong> ${worker.location}</p>
    <p><strong>Experience:</strong> ${worker.experience}</p>
    <p><strong>Price:</strong> <span class="yellow">${worker.price}</span></p>
    <p><strong>Rating:</strong> <span style="color:orange">${'★'.repeat(worker.rating)}</span></p>
    <p><strong>Phone:</strong> <a href="tel:${worker.phone}">${worker.phone}</a></p>
    <div class="modal-btn-row">
      <button id="addCartBtn">Add to Cart</button>
      <button id="callBtn">Call</button>
      <button id="payBtn">Payment</button>
    </div>
  `;
  modal.style.display = "block";
  document.getElementById('addCartBtn').onclick = function(){
    cart.push(worker);
    renderCartCount();
    alert(`${worker.name} added to cart!`);
  };
  document.getElementById('callBtn').onclick = function(){
    window.location.href = `tel:${worker.phone}`;
  };
  document.getElementById('payBtn').onclick = function(){
    alert("Proceeding to payment for " + worker.name);
  };
  document.getElementById('modalClose').onclick = closeModal;
  window.onclick = function(event) { if (event.target === modal) closeModal(); };
}
function closeModal() {
  document.getElementById('detailModal').style.display = "none";
}
// Cart badge
function renderCartCount() {
  let el = document.getElementById("cartCount");
  if (!el) {
    let header = document.querySelector('.logout-btn');
    if (header) {
      header.insertAdjacentHTML('afterend', '<span id="cartCount">0</span>');
      el = document.getElementById("cartCount");
    }
  }
  el.textContent = cart.length;
}