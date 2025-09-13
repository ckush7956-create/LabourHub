// Labour data: now with experience and price (prize)
const workers = [
  { name: "Mohit Sharma ", trade: "Plumber", location: "Khucheshar Chopla", rating: 3, phone: "7983696037", experience: "5 years", price: "₹400/day" },
  { name: "Kush Chaudhary", trade: "Carpenter", location: "Garhmukteshwar", rating: 5, phone: "8057354320", experience: "4 years", price: "₹500/day" },
  { name: "Sachin Tomar", trade: "Electrician", location: "Hapur", rating: 5, phone: "7088215179", experience: "8 years", price: "₹550/day" },
  { name: "Anuj Gautam", trade: "Painter", location: "Dehra Kuti", rating: 4, phone: "9627521427", experience: "6 years", price: "₹350/day" },
  { name: "Prince Chaudhary", trade: "Electrician", location: "Nizampur", rating: 5, phone: "9634559312", experience: "4 years", price: "₹600/day" },
  { name: "Ombeer", trade: "Painter", location: "Gulaothi", rating: 5, phone: "9876700009", experience: "3 years", price: "₹450/day" },
  { name: "Cheenu Kumar", trade: "Carpenter", location: "Kastla", rating: 4, phone: "918791141490", experience: "5 years", price: "₹530/day" },
  { name: "Robince Tomar ", trade: "Plumber", location: "Ex-Hapur", rating: 3, phone: "9368784306", experience: "7 years", price: "₹400/day" },
  { name: "Ayush Sharma", trade: "Carpenter", "location": "Gurgaon", rating: 5, phone: "9876543210", experience: "4 years", price: "₹500/day" },
  { name: "Rahul Yadav", trade: "Electrician", location: "Noida", rating: 5, phone: "9810012132", experience: "8 years", price: "₹550/day" },
  { name: "Ajit Kumar", trade: "Painter", location: "Delhi", rating: 4, phone: "9543210000", experience: "6 years", price: "₹350/day" },
  { name: "Amit Singh", trade: "Electrician", location: "Ghaziabad", rating: 5, phone: "+919761803403", experience: "4 years", price: "₹600/day" },
  { name: "Priya Sharma", trade: "Painter", location: "Faridabad", rating: 5, phone: "9876700009", experience: "3 years", price: "₹450/day" },
  { name: "Sartaj Saifi", trade: "Carpenter", location: "Delhi", rating: 4, phone: "+918791141490", experience: "5 years", price: "₹530/day" },
  { name: "Kavita Joshi", trade: "Plumber", location: "Noida", rating: 5, phone: "7777788888", experience: "4 years", price: "₹420/day" },
  { name: "Pushkar sharma", trade: "Electrician", location: "hapur", rating: 4, phone: "8958768744", experience: "8 years", price: "₹550/day" }
 
];
let cart = [];

const fakeUser = {
  email: "robince@email.com",
  password: "password123"
};

// LOGIN -----
if (sessionStorage.getItem("loggedIn") === "true") {
  showDashboard();
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const loginBtn = this.querySelector('button');
  const errorMessage = document.getElementById('loginError');
  
  loginBtn.textContent = 'Logging in...';
  loginBtn.disabled = true;
  errorMessage.style.display = 'none';

  // --- BACKEND INTEGRATION POINT for Login ---
  setTimeout(() => {
    if (emailInput.value === fakeUser.email && passwordInput.value === fakeUser.password) {
      sessionStorage.setItem("loggedIn", "true");
      document.getElementById('login-section').style.animation = "pop-in 0.7s reverse";
      setTimeout(showDashboard, 540);
    } else {
      errorMessage.textContent = 'Incorrect email or password.';
      errorMessage.style.display = 'block';
      loginBtn.textContent = 'Login';
      loginBtn.disabled = false;
    }
  }, 1000);
});

function showDashboard() {
  document.getElementById('login-section').style.display = "none";
  document.getElementById('dashboard-section').style.display = "block";
  // --- BACKEND INTEGRATION POINT for fetching workers ---
  renderWorkers(workers);
  renderCartCount();
}

function logout() {
  sessionStorage.removeItem("loggedIn");
  document.getElementById('dashboard-section').style.display = "none";
  document.getElementById('login-section').style.display = "flex";
  document.getElementById('login-section').style.animation = "pop-in 1.1s cubic-bezier(.31,1.45,.74,1.02)";
  document.getElementById('loginForm').reset();
  document.getElementById('loginError').style.display = 'none';
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
  // --- BACKEND INTEGRATION POINT for search ---
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

// MODALS (DETAIL & PAYMENT)
function attachCardClicks(workerList) {
  document.querySelectorAll('.worker-card').forEach((card, i) => {
    card.onclick = function(){
      openModal(workerList[i]);
    };
  });
}

function openModal(worker) {
  const detailModal = document.getElementById('detailModal');
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
  detailModal.style.display = "block";
  document.getElementById('addCartBtn').onclick = function(){
    cart.push(worker);
    renderCartCount();
    alert(worker.name + " added to cart!");
  };
  document.getElementById('callBtn').onclick = function(){
    window.location.href = `tel:${worker.phone}`;
  };
  document.getElementById('payBtn').onclick = function(){
    closeModalById('detailModal');
    openPaymentModal(worker);
  };
  document.getElementById('modalClose').onclick = () => closeModalById('detailModal');
}

function openPaymentModal(worker) {
  const paymentModal = document.getElementById('paymentModal');
  paymentModal.style.display = 'block';

  const confirmPayBtn = document.getElementById('confirmPayBtn');
  confirmPayBtn.onclick = () => {
    // --- BACKEND INTEGRATION POINT for payment ---
    alert(`Payment for ${worker.name} confirmed! This would be handled by a payment gateway.);
    closeModalById('paymentModal'`);
  };
}

function closeModalById(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

// Close modals when clicking outside
window.onclick = function(event) { 
  const detailModal = document.getElementById('detailModal');
  const paymentModal = document.getElementById('paymentModal');
  const addLabourModal = document.getElementById('addLabourModal');
  if (event.target === detailModal) {
    closeModalById('detailModal');
  }
  if (event.target === paymentModal) {
    closeModalById('paymentModal');
  }
  if (event.target === addLabourModal) {
    closeModalById('addLabourModal');
  }
};

// Cart badge
function renderCartCount() {
  const el = document.getElementById("cartCount");
  if (el) {
    el.textContent = cart.length;
  }
}

// ADD LABOUR FUNCTIONALITY
document.getElementById('addLabourBtn').addEventListener('click', () => {
  openAddLabourModal();
});

function openAddLabourModal() {
  document.getElementById('addLabourModal').style.display = 'block';
}

document.getElementById('addLabourForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const newLabour = {
    name: document.getElementById('addName').value,
    trade: document.getElementById('addTrade').value,
    location: document.getElementById('addLocation').value,
    experience: document.getElementById('addExperience').value,
    price: document.getElementById('addPrice').value,
    phone: document.getElementById('addPhone').value,
    rating: 5 // Default rating for new labour
  };

  const submitBtn = document.getElementById('submitLabourBtn');
  submitBtn.textContent = 'Submitting...';
  submitBtn.disabled = true;

  // --- BACKEND INTEGRATION POINT for adding new labour ---
  // Here, you would send the newLabour object to your backend API.
  // The backend would handle validation and permanent storage in a database.
  // Example: fetch('/api/add-labour', { method: 'POST', body: JSON.stringify(newLabour) }).then(...)
  setTimeout(() => {
    // On success, add the new labour to the front-end list and re-render
    workers.push(newLabour);
    renderWorkers(workers);
    alert('New labour added successfully!');
    
    // Close the modal and reset the form
    closeModalById('addLabourModal');
    this.reset();
    submitBtn.textContent = 'Submit';
    submitBtn.disabled = false;
  }, 1500); // Simulate network delay
});