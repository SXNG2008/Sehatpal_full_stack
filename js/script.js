document.addEventListener('DOMContentLoaded', () => {
// Scroll Reveal Animation
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('visible');
}
});
}, {
threshold: 0.1
});
const sections = document.querySelectorAll('.feature-card, .stat-card, .panel, .hospital-item');
sections.forEach(section => {
section.classList.add('hidden-section');
observer.observe(section);
});
// Smooth scroll for nav links
document.querySelectorAll('.nav-link').forEach(anchor => {
anchor.addEventListener('click', function (e) {
e.preventDefault();
const targetId = this.getAttribute('href');
document.querySelector(targetId).scrollIntoView({
behavior: 'smooth'
});
});
});
});
// Mock Database with Persistence
function initializeDatabase() {
if (!localStorage.getItem('patientData')) {
const initialData = {
"Ritika@123": {
name: "Ritika Singh",
age: 28,
bloodGroup: "B+",
allergies: ["Sulfa Drugs", "Dust Mites"],
conditions: ["Hypothyroidism"],
emergencyContact: "+91 98765 43210",
medications: [
{ name: "Thyronorm", dose: "50mcg", freq: "Once daily", date: "2024-05-10" },
{ name: "Multivitamins", dose: "1 tab", freq: "Once daily", date: "2024-06-01" }
],
records: [
{ id: "rec_1", type: "Prescription", doctor: "Dr. A. Sharma", facility: "City Clinic", date: "2025-01-15" },
{ id: "rec_2", type: "Lab Report", doctor: "Dr. B. Verma", facility: "Max Lab", date: "2024-12-20" }
],
appointments: [
{ date: "20", month: "FEB", doctor: "Dr. A. Sharma", spec: "Endocrinologist", time: "10:00 AM", loc: "City Clinic" }
]
},
"JohnDoe@456": {
name: "John Doe",
age: 45,
bloodGroup: "O+",
allergies: ["Penicillin", "Peanuts"],
conditions: ["Type 2 Diabetes", "Hypertension"],
emergencyContact: "+1 555 0199",
medications: [
{ name: "Aspirin", dose: "100mg", freq: "Once daily", date: "2025-01-15" },
{ name: "Metformin", dose: "500mg", freq: "Twice daily", date: "2025-02-20" },
{ name: "Lisinopril", dose: "10mg", freq: "Once daily", date: "2025-03-10" }
],
records: [
{ id: "rec_3", type: "Prescription", doctor: "Dr. Sarah Smith", facility: "City Hospital", date: "2025-11-10" },
{ id: "rec_4", type: "Lab Report", doctor: "Dr. Michael Chen", facility: "Apollo Lab", date: "2025-11-05" }
],
appointments: [
{ date: "20", month: "NOV", doctor: "Dr. Sarah Smith", spec: "Cardiologist", time: "10:00 AM", loc: "City Hospital" }
]
}
};
localStorage.setItem('patientData', JSON.stringify(initialData));
}
}
// Initialize on load
initializeDatabase();
// Utility Functions
function getPatientData(id) {
const data = JSON.parse(localStorage.getItem('patientData'));
if (!data || !data[id]) return null;
return data[id];
}
function getUrlParameter(name) {
name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
var results = regex.exec(location.search);
return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
function login(userId, password) {
const data = JSON.parse(localStorage.getItem('patientData'));
if (data[userId] && data[userId].password === password) {
localStorage.setItem("currentUser", userId);
return true;
}
return false;
}
function updatePatientData(userId, newData) {
const data = JSON.parse(localStorage.getItem('patientData'));
if (data && data[userId]) {
data[userId] = { ...data[userId], ...newData };
localStorage.setItem('patientData', JSON.stringify(data));
return true;
}
return false;
}
function addMedication(userId, medication) {
const data = JSON.parse(localStorage.getItem('patientData'));
if (data && data[userId]) {
if (!data[userId].medications) data[userId].medications = [];
data[userId].medications.push(medication);
localStorage.setItem('patientData', JSON.stringify(data));
return true;
}
return false;
}
function logout() {
localStorage.removeItem("currentUser");
window.location.href = "../login.html"; // Redirects up to root login
}
function getCurrentUser() {
return localStorage.getItem("currentUser");
}