<<<<<<< HEAD
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
=======
// ===== LabourHub Full JS (incl. footer modal) =====

// --- Worker Data EN/HI ---
const workersEN = [
  { name: "Mohit Sharma", trade: "Plumber", location: "Khucheshar Chopla", rating: 3, experience: "5 years", price: "₹400/day", phone: "7983696037" },
  { name: "Kush Chaudhary", trade: "Carpenter", location: "Garhmukteshwar", rating: 5, experience: "4 years", price: "₹500/day", phone: "8057354320" },
  { name: "Sachin Tomar", trade: "Electrician", location: "Hapur", rating: 5, experience: "8 years", price: "₹550/day", phone: "7088215179" },
  { name: "Anuj Gautam", trade: "Painter", location: "Dehra Kuti", rating: 4, experience: "6 years", price: "₹350/day", phone: "9627521427" },
  { name: "Prince Chaudhary", trade: "Electrician", location: "Nizampur", rating: 5, experience: "4 years", price: "₹600/day", phone: "9634559312" },
  { name: "Ombeer", trade: "Painter", location: "Gulaothi", rating: 5, experience: "3 years", price: "₹450/day", phone: "9876700009" },
  { name: "Cheenu Kumar", trade: "Carpenter", location: "Kastla", rating: 4, experience: "5 years", price: "₹530/day", phone: "918791141490" },
  { name: "Robince Tomar", trade: "Plumber", location: "Ex-Hapur", rating: 3, experience: "7 years", price: "₹400/day", phone: "9368784306" },
  { name: "Ayush Sharma", trade: "Carpenter", location: "Gurgaon", rating: 5, experience: "4 years", price: "₹500/day", phone: "9876543210" },
  { name: "Rahul Yadav", trade: "Electrician", location: "Noida", rating: 5, experience: "8 years", price: "₹550/day", phone: "9810012132" },
  { name: "Ajit Kumar", trade: "Painter", location: "Delhi", rating: 4, experience: "6 years", price: "₹350/day", phone: "9543210000" },
  { name: "Amit Singh", trade: "Electrician", location: "Ghaziabad", rating: 5, experience: "4 years", price: "₹600/day", phone: "+919761803403" },
  { name: "Priya Sharma", trade: "Painter", location: "Faridabad", rating: 5, experience: "3 years", price: "₹450/day", phone: "9876700009" },
  { name: "Sartaj Saifi", trade: "Carpenter", location: "Delhi", rating: 4, experience: "5 years", price: "₹530/day", phone: "918791141490" },
  { name: "Kavita Joshi", trade: "Plumber", location: "Noida", rating: 5, experience: "4 years", price: "₹420/day", phone: "7777788888" },
  { name: "Pushkar Sharma", trade: "Electrician", location: "Hapur", rating: 4, experience: "8 years", price: "₹550/day", phone: "8958768744" }
];
const workersHI = [
  { name: "मोहित शर्मा", trade: "प्लंबर", location: "खुचेसर चोपला", rating: 3, experience: "5 साल", price: "₹400/दिन", phone: "7983696037" },
  { name: "कुश चौधरी", trade: "बढ़ई", location: "गढ़मुक्तेश्वर", rating: 5, experience: "4 साल", price: "₹500/दिन", phone: "8057354320" },
  { name: "सचिन तोमर", trade: "इलेक्ट्रिशियन", location: "हापुड़", rating: 5, experience: "8 साल", price: "₹550/दिन", phone: "7088215179" },
  { name: "अनुज गौतम", trade: "पेंटर", location: "देहरा कुटी", rating: 4, experience: "6 साल", price: "₹350/दिन", phone: "9627521427" },
  { name: "प्रिंस चौधरी", trade: "इलेक्ट्रिशियन", location: "निजामपुर", rating: 5, experience: "4 साल", price: "₹600/दिन", phone: "9634559312" },
  { name: "ओमबीर", trade: "पेंटर", location: "गुलौठी", rating: 5, experience: "3 साल", price: "₹450/दिन", phone: "9876700009" },
  { name: "चीनू कुमार", trade: "बढ़ई", location: "कस्तला", rating: 4, experience: "5 साल", price: "₹530/दिन", phone: "918791141490" },
  { name: "रोबिन्स तोमर", trade: "प्लंबर", location: "पूर्व हापुड़", rating: 3, experience: "7 साल", price: "₹400/दिन", phone: "9368784306" },
  { name: "आयुष शर्मा", trade: "बढ़ई", location: "गुरुग्राम", rating: 5, experience: "4 साल", price: "₹500/दिन", phone: "9876543210" },
  { name: "राहुल यादव", trade: "इलेक्ट्रिशियन", location: "नोएडा", rating: 5, experience: "8 साल", price: "₹550/दिन", phone: "9810012132" },
  { name: "अजीत कुमार", trade: "पेंटर", location: "दिल्ली", rating: 4, experience: "6 साल", price: "₹350/दिन", phone: "9543210000" },
  { name: "अमित सिंह", trade: "इलेक्ट्रिशियन", location: "गाजियाबाद", rating: 5, experience: "4 साल", price: "₹600/दिन", phone: "+919761803403" },
  { name: "प्रिय शर्मा", trade: "पेंटर", location: "फरीदाबाद", rating: 5, experience: "3 साल", price: "₹450/दिन", phone: "9876700009" },
  { name: "सरताज सैफी", trade: "बढ़ई", location: "दिल्ली", rating: 4, experience: "5 साल", price: "₹530/दिन", phone: "918791141490" },
  { name: "कविता जोशी", trade: "प्लंबर", location: "नोएडा", rating: 5, experience: "4 साल", price: "₹420/दिन", phone: "7777788888" },
  { name: "पुष्कर शर्मा", trade: "इलेक्ट्रिशियन", location: "हापुड़", rating: 4, experience: "8 साल", price: "₹550/दिन", phone: "8958768744" }
];

const searchSuggestionsEN = ["Plumber","Electrician","Carpenter","Painter","Plumbing","Painting"];
const searchSuggestionsHI = ["प्लंबर","इलेक्ट्रिशियन","बढ़ई","पेंटर","प्लंबिंग","पेंटिंग"];

let langKey = 'english';
let workers = workersEN;
let cart = [];

// --- UI TRANSLATIONS ---

const translations = {
  english: {
    header: {about:"About",jobs:"Jobs",how:"How it works",contact:"Contact",addLabour:"Add Labour",logout:"Logout"},
    main: {
      skilledLabour:"Skilled labour", onDemand:"on demand", nearYou:"near you",
      searchPlaceholder:"Search trades, e.g. plumber, electrician, carpenter", search:"Search",
      tags:["Plumber","Electrician","Carpenter","Painter"],
      findWorkers:"Find workers", region:"Showing available workers in <b>Delhi NCR</b> – verified data",
      whyHeading:"Why LabourHub?",
      whyList:[
        "All labours are <b>verified</b> and <b>experienced</b> in their trades.",
        "Get quick service at competitive rates — price and ratings upfront.",
        "Book with a single click, safe and secure transactions.",
        "Support for urgent and planned jobs across Delhi NCR."
      ],
      whyPara:"Let us take care of your repairs, improvements, and projects. Hire trusted labours, get work done quickly and hassle-free!"
    }
  },
  hindi: {
    header: {about:"परिचय",jobs:"नौकरियां",how:"कैसे काम करता है",contact:"संपर्क",addLabour:"मजदूर जोड़ें",logout:"लॉगआउट"},
    main: {
      skilledLabour:"कुशल मजदूर", onDemand:"मांग पर", nearYou:"आपके पास",
      searchPlaceholder:"कार्य खोजें, जैसे प्लंबर, इलेक्ट्रिशियन, बढ़ई", search:"खोजें",
      tags:["प्लंबर","इलेक्ट्रिशियन","बढ़ई","पेंटर"],
      findWorkers:"मजदूर खोजें", region:"<b>दिल्ली NCR</b> में उपलब्ध मजदूर दिखाए जा रहे हैं – सत्यापित डाटा",
      whyHeading:"LabourHub क्यों?",
      whyList:[
        "सभी मजदूर <b>सत्यापित</b> और अपने कार्य में <b>अनुभवी</b> हैं।",
        "प्रतिस्पर्धी दरों पर तेज़ सेवा पायें — कीमत और रेटिंग पहले ही दिख जाती है।",
        "एक क्लिक में बुक करें, लेनदेन सुरक्षित और आसान है।",
        "दिल्ली NCR में तत्काल और योजना अनुसार कार्य का समर्थन।"
      ],
      whyPara:"अपने मरम्मत, सुधार और प्रोजेक्ट की जिम्मेदारी हमें दें। भरोसेमंद मजदूर रखें, कार्य शीघ्र और बिना परेशानी पूरा करें!"
    }
  }
};

// --- FOOTER MODAL CONTENT DATA ---
const footerModalContent = {
  aboutLabourHub: { title: "About LabourHub", body: "LabourHub connects you with skilled, verified workers near you. Our mission is to empower both workers and employers using technology!" },
  careers: { title: "Careers", body: "Join LabourHub and help revolutionize the job hiring space for skilled labours. Check out our openings." },
  communityStories: { title: "Community Stories", body: "Read inspiring stories from workers and employers who found success with LabourHub." },
  media: { title: "Media", body: "Find the latest news and features about LabourHub in the press." },
  facebook: { title: "Facebook", body: "Follow us on Facebook for updates and support." },
  twitter: { title: "Twitter", body: "Follow us on Twitter for job alerts and more." },
  instagram: { title: "Instagram", body: "Connect with us on Instagram!" },
  linkedin: { title: "LinkedIn", body: "Stay updated on LinkedIn with latest jobs and stories." },
  findWorkers: { title: "Find Workers", body: "Search and hire verified skilled workers instantly on LabourHub." },
  postJob: { title: "Post a Job", body: "Need help? Post your job requirements and get matched fast." },
  securePayment: { title: "Secure Payment", body: "We offer safe & secure payment for your hired workers." },
  verification: { title: "Verification", body: "All workers go through our robust verification processes." },
  contact: { title: "Contact Us", body: "You can contact us via email at hello@labourhub.com or call our support line." },
  faq: { title: "FAQ", body: "Frequently Asked Questions about LabourHub's services and processes." },
  privacy: { title: "Privacy Policy", body: "Read our privacy policy to understand how we use and protect your data." },
  terms: { title: "Terms of Service", body: "Read our terms of service before using LabourHub." }
};

// ==== REGISTRATION ====
if (document.getElementById('registerForm')) {
  document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const regEmail = document.getElementById('regEmail').value.trim();
    const regPassword = document.getElementById('regPassword').value.trim();
    const registerMsg = document.getElementById('registerMsg');
    if(regEmail.length < 5 || regPassword.length < 4){
      registerMsg.style.display="block"; registerMsg.style.color="red";
      registerMsg.textContent="Please enter a valid email and password."; return;
    }
    let users = JSON.parse(localStorage.getItem('lhUsers') || "[]");
    const already = users.find(u => u.email === regEmail);
    if(already){
      registerMsg.style.display="block";registerMsg.style.color="red";
      registerMsg.textContent="User already exists!";return;
    }
    users.push({ email: regEmail, password: regPassword });
    localStorage.setItem('lhUsers', JSON.stringify(users));
    registerMsg.style.display="block";registerMsg.style.color="green";
    registerMsg.textContent = "Registration successful! Please login.";
    document.getElementById('registerForm').reset();
  });
}
// ==== LOGIN ====
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = document.getElementById('email').value.trim();
    const passwordInput = document.getElementById('password').value.trim();
    const loginBtn = this.querySelector('button');
    const errorMessage = document.getElementById('loginError');
    loginBtn.textContent = 'Logging in...'; loginBtn.disabled = true;
    errorMessage.style.display = 'none';
    let users = JSON.parse(localStorage.getItem('lhUsers') || "[]");
    const match = users.find(user => user.email === emailInput && user.password === passwordInput);
    setTimeout(() => {
      if (match) {
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("userEmail", emailInput);
        showDashboard();
      } else {
        errorMessage.textContent = 'Incorrect email or password.';
        errorMessage.style.display = 'block';
        loginBtn.textContent = 'Login'; loginBtn.disabled = false;
      }
    }, 700);
  });
}

function showDashboard() {
  if(document.getElementById('registerBox')) document.getElementById('registerBox').style.display = "none";
  document.getElementById('login-section').style.display = "none";
  document.getElementById('dashboard-section').style.display = "block";
  document.getElementById('bgImg').style.display = "none";
  var bgImgDiv = document.getElementById('bgImg');
  if(bgImgDiv) bgImgDiv.style.display = "none";

>>>>>>> 64b22b7329880603aec9c7a072c16c6017c19545
  renderWorkers(workers);
  renderCartCount();
}
function logout() {
  sessionStorage.removeItem("loggedIn");
  document.getElementById('dashboard-section').style.display = "none";
<<<<<<< HEAD
  document.getElementById('login-section').style.display = "flex";
  document.querySelector('.login-glass').style.animation = "pop-in 1.1s cubic-bezier(.31,1.45,.74,1.02)";
}

// WORKERS RENDER -----
=======
  if(document.getElementById('registerBox'))
    document.getElementById('registerBox').style.display = "block";
  document.getElementById('login-section').style.display = "flex";
  document.getElementById('bgImg').style.display = "block";

var bgImgDiv = document.getElementById('bgImg');
  if(bgImgDiv) bgImgDiv.style.display = "block";

  document.getElementById('loginForm').reset();
  document.getElementById('loginError').style.display = 'none';
}

// ==== LANGUAGE DROPDOWN ====
document.getElementById('langDropdownBtn').onclick = function(e) {
  e.stopPropagation();
  const menu = document.getElementById('langDropdownMenu');
  menu.style.display = (menu.style.display === "none" || !menu.style.display) ? "block" : "none";
};
document.body.onclick = function(e) {
  if (!e.target.closest('.lang-dropdown')) {
    if(document.getElementById('langDropdownMenu'))document.getElementById('langDropdownMenu').style.display = "none";
  }
};
function updateLanguage(key) {
  langKey = key;
  workers = (key === 'english') ? workersEN : workersHI;
  document.getElementById('aboutNav').textContent = translations[key].header.about;
  document.getElementById('jobsNav').textContent = translations[key].header.jobs;
  document.getElementById('howNav').textContent = translations[key].header.how;
  document.getElementById('contactNav').textContent = translations[key].header.contact;
  document.getElementById('addLabourBtn').textContent = translations[key].header.addLabour;
  document.querySelector('.logout-btn').textContent = translations[key].header.logout;
  document.querySelector('main h1').innerHTML = `<span class="blue">${translations[key].main.skilledLabour}</span><span class="yellow">${translations[key].main.onDemand}</span> <span class="blue">${translations[key].main.nearYou}</span>`;
  document.getElementById('searchInput').placeholder = translations[key].main.searchPlaceholder;
  document.getElementById('searchBtn').textContent = translations[key].main.search;
  document.querySelectorAll('.tag-btn').forEach((btn, i) => { btn.textContent = translations[key].main.tags[i]; });
  document.getElementById('workerFooter').innerHTML = `<strong>${translations[key].main.findWorkers}</strong> ${translations[key].main.region}`;
  document.querySelector('.feature-section h2').textContent = translations[key].main.whyHeading;
  document.querySelectorAll('.feature-section ul li').forEach((li, i) => { li.innerHTML = translations[key].main.whyList[i]; });
  document.querySelector('.feature-section p .yellow').textContent = translations[key].main.whyPara;
  document.getElementById('langEnglish').classList.toggle('active', key === 'english');
  document.getElementById('langHindi').classList.toggle('active', key === 'hindi');
  renderWorkers(workers);
  setSuggestions(key === 'english' ? searchSuggestionsEN : searchSuggestionsHI);
}
updateLanguage('english');
document.getElementById('langEnglish').onclick = function() { updateLanguage('english'); document.getElementById('langDropdownMenu').style.display = "none"; };
document.getElementById('langHindi').onclick = function() { updateLanguage('hindi'); document.getElementById('langDropdownMenu').style.display = "none"; };

// ==== SEARCH SUGGESTIONS ====
function setSuggestions(arr) {
  const datalist = document.getElementById('searchSuggestions');
  datalist.innerHTML = '';
  arr.forEach(s => {
    const option = document.createElement('option');
    option.value = s;
    datalist.appendChild(option);
  });
}
setSuggestions(searchSuggestionsEN);
document.getElementById('searchInput').addEventListener('input', function() {
  const value = this.value.toLowerCase();
  const arr = langKey === 'english' ? searchSuggestionsEN : searchSuggestionsHI;
  const datalist = document.getElementById('searchSuggestions');
  datalist.innerHTML = '';
  if (value.length > 0) {
    arr.forEach(item => {
      if (item.toLowerCase().includes(value)) {
        const option = document.createElement('option');
        option.value = item;
        datalist.appendChild(option);
      }
    });
  }
});

// ==== WORKERS RENDER ====
>>>>>>> 64b22b7329880603aec9c7a072c16c6017c19545
function renderWorkers(list) {
  const workersListDiv = document.getElementById('workersList');
  workersListDiv.innerHTML = '';
  if(list.length === 0) {
<<<<<<< HEAD
    workersListDiv.innerHTML = '<div style="color: #888; text-align:center; width:100%">No workers found.</div>';
=======
    workersListDiv.innerHTML = langKey === 'hindi'
      ? '<div style="color: #888; text-align:center; width:100%">कोई मजदूर नहीं मिला।</div>'
      : '<div style="color: #888; text-align:center; width:100%">No workers found.</div>';
>>>>>>> 64b22b7329880603aec9c7a072c16c6017c19545
    return;
  }
  list.forEach((worker, idx) => {
    workersListDiv.innerHTML += `
      <div class="worker-card" data-index="${idx}">
        <strong>${worker.name}</strong>
        <span style="color: orange;">${'★'.repeat(worker.rating)}</span>
<<<<<<< HEAD
        <div class="worker-meta">Trade: ${worker.trade}</div>
        <div class="worker-meta">Location: ${worker.location}</div>
        <div class="worker-meta">Experience: ${worker.experience}</div>
        <div class="worker-meta">Price: <span class="yellow">${worker.price}</span></div>
=======
        <div class="worker-meta">${langKey === 'hindi' ? "कार्यः " : "Trade:"} ${worker.trade}</div>
        <div class="worker-meta">${langKey === 'hindi' ? "स्थानः " : "Location:"} ${worker.location}</div>
        <div class="worker-meta">${langKey === 'hindi' ? "अनुभवः " : "Experience:"} ${worker.experience}</div>
        <div class="worker-meta">${langKey === 'hindi' ? "मूल्यः " : "Price:"} <span class="yellow">${worker.price}</span></div>
>>>>>>> 64b22b7329880603aec9c7a072c16c6017c19545
      </div>
    `;
  });
  attachCardClicks(list);
}

<<<<<<< HEAD
// SEARCH
=======
// ==== SEARCH + TAGS ====
>>>>>>> 64b22b7329880603aec9c7a072c16c6017c19545
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
<<<<<<< HEAD
searchInput.addEventListener('keyup', function(e){
  if(e.key === 'Enter') doSearch();
});
function doSearch() {
  const query = searchInput.value;
  const filtered = filterWorkers(query);
  renderWorkers(filtered);
}
=======
searchInput.addEventListener('keyup', function(e){ if(e.key === 'Enter') doSearch(); });
function doSearch() { renderWorkers(filterWorkers(searchInput.value)); }
>>>>>>> 64b22b7329880603aec9c7a072c16c6017c19545
document.querySelectorAll('.tag-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const trade = btn.textContent.toLowerCase();
    searchInput.value = trade;
<<<<<<< HEAD
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
=======
    renderWorkers(filterWorkers(trade));
  });
});

// ==== CARD MODALS ====
function attachCardClicks(workerList) {
  document.querySelectorAll('.worker-card').forEach((card, i) => {
    card.onclick = function(){ openModal(workerList[i]); };
  });
}
function openModal(worker) {
  const detailModal = document.getElementById('detailModal');
>>>>>>> 64b22b7329880603aec9c7a072c16c6017c19545
  const modalContent = document.getElementById('modalContent');
  modalContent.innerHTML = `
    <span class="close" id="modalClose">&times;</span>
    <h2>${worker.name}</h2>
<<<<<<< HEAD
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
=======
    <p><strong>${langKey === 'hindi' ? "कार्यः" : "Trade:"}</strong> ${worker.trade}</p>
    <p><strong>${langKey === 'hindi' ? "स्थानः" : "Location:"}</strong> ${worker.location}</p>
    <p><strong>${langKey === 'hindi' ? "अनुभवः" : "Experience:"}</strong> ${worker.experience}</p>
    <p><strong>${langKey === 'hindi' ? "मूल्यः" : "Price:"}</strong> <span class="yellow">${worker.price}</span></p>
    <p><strong>${langKey === 'hindi' ? "रेटिंगः" : "Rating:"}</strong> <span style="color:orange">${'★'.repeat(worker.rating)}</span></p>
    <p><strong>${langKey === 'hindi' ? "फ़ोन:" : "Phone:"}</strong> <a href="tel:${worker.phone}">${worker.phone}</a></p>
    <div class="modal-btn-row">
      <button id="addCartBtn">${langKey === 'hindi' ? "कार्ट में जोड़ें" : "Add to Cart"}</button>
      <button id="callBtn">${langKey === 'hindi' ? "कॉल करें" : "Call"}</button>
      <button id="payBtn">${langKey === 'hindi' ? "भुगतान" : "Payment"}</button>
    </div>
  `;
  detailModal.style.display = "block";
  document.getElementById('addCartBtn').onclick = function(){
    cart.push(worker); renderCartCount();
    alert(`${worker.name} ${langKey === 'hindi' ? "कार्ट में जुड़ गया!" : "added to cart!"}`);
  };
  document.getElementById('callBtn').onclick = function(){ window.location.href = `tel:${worker.phone||''};` };
  document.getElementById('payBtn').onclick = function(){ closeModalById('detailModal'); openPaymentModal(worker); };
  document.getElementById('modalClose').onclick = () => closeModalById('detailModal');
}
function openPaymentModal(worker) {
  const paymentModal = document.getElementById('paymentModal');
  paymentModal.style.display = 'block';
  const confirmPayBtn = document.getElementById('confirmPayBtn');
  confirmPayBtn.onclick = () => {
    alert(langKey === 'hindi' ? "भुगतान सफलता!" : `Payment for ${worker.name} confirmed!`);
    closeModalById('paymentModal');
  };
}
function closeModalById(modalId) {
  document.getElementById(modalId).style.display = 'none';
}
window.onclick = function(event) { 
  ['detailModal','paymentModal','addLabourModal','footerModal','contactInfoModal'].forEach(id => {
    const modalEl = document.getElementById(id);
    if (event.target === modalEl) closeModalById(id);
  });
};
function renderCartCount() {
  const el = document.getElementById("cartCount");
  if (el) el.textContent = cart.length;
}

// ==== ADD LABOUR ====
if(document.getElementById('addLabourBtn')) {
document.getElementById('addLabourBtn').addEventListener('click', () => {
  document.getElementById('addLabourModal').style.display = 'block';
});
}
if(document.getElementById('addLabourForm')) {
document.getElementById('addLabourForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const newLabour = {
    name: document.getElementById('addName').value,
    trade: document.getElementById('addTrade').value,
    location: document.getElementById('addLocation').value,
    experience: document.getElementById('addExperience').value,
    price: document.getElementById('addPrice').value,
    phone: document.getElementById('addPhone').value,
    rating: 5
  };
  const submitBtn = document.getElementById('submitLabourBtn');
  submitBtn.textContent = langKey === 'hindi' ? 'सबमिट हो रहा है...' : 'Submitting...';
  submitBtn.disabled = true;
  setTimeout(() => {
    (langKey === 'english' ? workersEN : workersHI).push(newLabour);
    renderWorkers(langKey === 'english' ? workersEN : workersHI);
    alert(langKey === 'hindi' ? 'नया मजदूर सफलतापूर्वक जुड़ गया!' : 'New labour added successfully!');
    closeModalById('addLabourModal');
    this.reset();
    submitBtn.textContent = 'Submit';
    submitBtn.disabled = false;
  }, 1500);
});
}

// ==== OTHER NAV/POPUP ====
if(document.getElementById('aboutNav')) {
  document.getElementById('aboutNav').onclick = function(e) {
    e.preventDefault();
    document.getElementById('mainFooter').scrollIntoView({ behavior: 'smooth' });
  };
}
if(document.getElementById('howNav')) {
  document.getElementById('howNav').onclick = function(e) {
    e.preventDefault();
    document.getElementById('howItWorksBox').style.display = 'block';
  };
}
if(document.getElementById('closeHowWorks')) {
  document.getElementById('closeHowWorks').onclick = function() {
    document.getElementById('howItWorksBox').style.display = 'none';
  };
}
if(document.getElementById('contactNav')) {
  document.getElementById('contactNav').onclick = function(e) {
    e.preventDefault();
    document.getElementById('contactInfoModal').style.display = 'block';
  };
}
if(document.getElementById('contactInfoClose')) {
  document.getElementById('contactInfoClose').onclick = function() {
    document.getElementById('contactInfoModal').style.display = "none";
  };
}

// ==== FOOTER MODALS ====
document.querySelectorAll('.footer-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const modalKey = this.getAttribute('data-modal');
    const content = footerModalContent[modalKey];
    if(content) {
      document.getElementById('footerModalTitle').textContent = content.title;
      document.getElementById('footerModalBody').textContent = content.body;
      document.getElementById('footerModal').style.display = 'block';
    }
  });
});
if(document.getElementById('footerModalClose')) {
document.getElementById('footerModalClose').onclick = function() {
  document.getElementById('footerModal').style.display = "none";
};
}
>>>>>>> 64b22b7329880603aec9c7a072c16c6017c19545
