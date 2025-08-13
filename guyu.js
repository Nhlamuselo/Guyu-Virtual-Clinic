// Tab Management
function showTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Remove active class from all nav tabs
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => tab.classList.remove('active'));
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked nav tab
    event.target.classList.add('active');
}

// Sample data for the demo
const sampleDoctors = [
    {
        name: "Dr. Priya Patel",
        specialty: "General Practitioner",
        experience: "8 years experience",
        rating: "4.9/5",
        reviews: "127 reviews",
        specialties: "Family Medicine, Emergency Care, Chronic Disease Management",
        languages: "English, Afrikaans, Zulu"
    },
    {
        name: "Dr. Thabo Mthembu",
        specialty: "Internal Medicine",
        experience: "12 years experience",
        rating: "4.8/5",
        reviews: "89 reviews",
        specialties: "Diabetes Care, Hypertension, General Internal Medicine",
        languages: "English, Zulu, Sotho"
    },
    {
        name: "Dr. Sarah Van Der Merwe",
        specialty: "Family Medicine",
        experience: "6 years experience",
        rating: "4.7/5",
        reviews: "156 reviews",
        specialties: "Pediatrics, Women's Health, Preventive Medicine",
        languages: "English, Afrikaans, Xhosa"
    }
];

// Symptom checker logic
const symptomDatabase = {
    fever: {
        conditions: ["Common Cold", "Flu", "COVID-19", "Malaria"],
        urgency: "medium",
        advice: "Monitor temperature. Stay hydrated. Consider consultation if fever persists over 3 days."
    },
    cough: {
        conditions: ["Common Cold", "Bronchitis", "COVID-19", "Allergies"],
        urgency: "low",
        advice: "Stay hydrated. Use honey for throat soothing. Avoid smoke and irritants."
    },
    chestpain: {
        conditions: ["Chest Infection", "Anxiety", "Muscle Strain", "Serious Heart Condition"],
        urgency: "high",
        advice: "Seek immediate medical attention if severe or accompanied by shortness of breath."
    },
    headache: {
        conditions: ["Tension Headache", "Migraine", "Dehydration", "High Blood Pressure"],
        urgency: "medium",
        advice: "Rest in a quiet, dark room. Stay hydrated. Consider pain relief if needed."
    },
    nausea: {
        conditions: ["Food Poisoning", "Gastroenteritis", "Pregnancy", "Medication Side Effect"],
        urgency: "medium",
        advice: "Stay hydrated with small sips. Eat bland foods. Rest and avoid strong smells."
    },
    fatigue: {
        conditions: ["Viral Infection", "Anemia", "Depression", "Thyroid Issues"],
        urgency: "low",
        advice: "Ensure adequate sleep. Maintain balanced diet. Consider medical evaluation if persistent."
    },
    dizziness: {
        conditions: ["Low Blood Pressure", "Inner Ear Problem", "Dehydration", "Medication Side Effect"],
        urgency: "medium",
        advice: "Sit or lie down immediately. Stay hydrated. Avoid sudden movements."
    },
    sorethroat: {
        conditions: ["Viral Infection", "Strep Throat", "Allergies", "Dry Air"],
        urgency: "low",
        advice: "Gargle with salt water. Stay hydrated. Use throat lozenges for relief."
    },
    rash: {
        conditions: ["Allergic Reaction", "Eczema", "Viral Rash", "Contact Dermatitis"],
        urgency: "medium",
        advice: "Avoid scratching. Use mild soap. Apply cool compress. Seek help if spreading."
    },
    backpain: {
        conditions: ["Muscle Strain", "Poor Posture", "Herniated Disc", "Arthritis"],
        urgency: "low",
        advice: "Apply heat or ice. Gentle stretching. Maintain good posture. Rest as needed."
    }
};

// Patient form submission
document.addEventListener('DOMContentLoaded', function() {
    const patientForm = document.getElementById('patientForm');
    if (patientForm) {
        patientForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('patientName').value,
                age: document.getElementById('patientAge').value,
                gender: document.getElementById('patientGender').value,
                location: document.getElementById('patientLocation').value,
                complaint: document.getElementById('chiefComplaint').value,
                urgency: document.getElementById('urgency').value
            };

            // Show loading state
            const button = e.target.querySelector('button');
            button.innerHTML = '<i class="fas fa-spinner loading"></i> Finding Doctor...';
            button.disabled = true;

            // Simulate doctor matching
            setTimeout(() => {
                const randomDoctor = sampleDoctors[Math.floor(Math.random() * sampleDoctors.length)];
                showPatientMatch(randomDoctor);
                
                // Reset form button
                button.innerHTML = '<i class="fas fa-search"></i> Find Available Doctor';
                button.disabled = false;
            }, 2000);
        });
    }

    // Symptom checker form submission
    const symptomForm = document.getElementById('symptomForm');
    if (symptomForm) {
        symptomForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const selectedSymptoms = Array.from(document.querySelectorAll('input[name="symptoms"]:checked'))
                .map(checkbox => checkbox.value);
            const duration = document.getElementById('duration').value;

            if (selectedSymptoms.length === 0) {
                alert('Please select at least one symptom.');
                return;
            }

            analyzeSymptoms(selectedSymptoms, duration);
        });
    }
});

function analyzeSymptoms(symptoms, duration) {
    const resultDiv = document.getElementById('symptomResult');
    let analysis = '';
    let maxUrgency = 'low';
    let possibleConditions = new Set();

    symptoms.forEach(symptom => {
        if (symptomDatabase[symptom]) {
            const data = symptomDatabase[symptom];
            data.conditions.forEach(condition => possibleConditions.add(condition));
            
            if (data.urgency === 'high') maxUrgency = 'high';
            else if (data.urgency === 'medium' && maxUrgency !== 'high') maxUrgency = 'medium';
        }
    });

    const urgencyClass = maxUrgency === 'high' ? 'alert-warning' : 'alert-success';
    const urgencyIcon = maxUrgency === 'high' ? '⚠️' : '✅';
    const urgencyText = maxUrgency === 'high' ? 'Requires Medical Attention' : 
                      maxUrgency === 'medium' ? 'Monitor Closely' : 'Generally Mild';

    analysis = `
        <div class="alert ${urgencyClass}">
            <h3>${urgencyIcon} Assessment Complete</h3>
            <p><strong>Urgency Level:</strong> ${urgencyText}</p>
            <p><strong>Duration:</strong> ${duration}</p>
            <p><strong>Possible Conditions:</strong> ${Array.from(possibleConditions).join(', ')}</p>
        </div>
        <div class="feature-card" style="margin-top: 1rem;">
            <h4>Recommendations:</h4>
            <ul style="margin-left: 20px; margin-top: 10px;">
                ${symptoms.map(symptom => 
                    symptomDatabase[symptom] ? `<li>${symptomDatabase[symptom].advice}</li>` : ''
                ).join('')}
                <li>Consider scheduling a consultation with a doctor for proper diagnosis.</li>
                <li>If symptoms worsen or new symptoms appear, seek immediate medical attention.</li>
            </ul>
            <button class="btn btn-primary" onclick="showTab('patient')" style="margin-top: 1rem; width: 100%;">
                <i class="fas fa-user-md"></i> Consult with Doctor Now
            </button>
        </div>
    `;

    resultDiv.innerHTML = analysis;
    resultDiv.style.display = 'block';
    
    // Scroll to results
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}

function showPatientMatch(doctor) {
    document.getElementById('matchedDoctorName').textContent = doctor.name;
    document.getElementById('matchedDoctorInfo').textContent = `${doctor.specialty} • ${doctor.experience}`;
    document.getElementById('doctorSpecialties').textContent = doctor.specialties;
    document.getElementById('patientMatchModal').style.display = 'block';
}

function closePatientMatch() {
    document.getElementById('patientMatchModal').style.display = 'none';
}

function startPatientConsultation() {
    closePatientMatch();
    const patientName = document.getElementById('patientName').value || 'Patient';
    startConsultation(patientName);
}

// Consultation functionality
function startConsultation(patientName) {
    document.getElementById('consultationTitle').textContent = `Consultation with ${patientName}`;
    document.getElementById('consultationModal').style.display = 'block';
    
    // Clear previous messages except the first one
    const chatMessages = document.getElementById('chatMessages');
    const firstMessage = chatMessages.firstElementChild;
    chatMessages.innerHTML = '';
    chatMessages.appendChild(firstMessage);
}

function closeConsultation() {
    document.getElementById('consultationModal').style.display = 'none';
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (message) {
        const chatMessages = document.getElementById('chatMessages');
        
        // Add patient message
        const patientMessage = document.createElement('div');
        patientMessage.className = 'message message-patient';
        patientMessage.innerHTML = `<strong>You:</strong> ${message}`;
        chatMessages.appendChild(patientMessage);
        
        // Simulate doctor response
        setTimeout(() => {
            const doctorResponses = [
                "Thank you for sharing that information. Can you tell me more about when this started?",
                "I understand your concern. Let me ask a few more questions to better assess your condition.",
                "Based on what you've told me, this sounds like it could be managed with proper care. Let me explain...",
                "I recommend that we monitor this closely. Here's what I suggest for your treatment plan...",
                "This is quite common and treatable. I'll provide you with some recommendations and a prescription if needed.",
                "Have you experienced any other symptoms alongside this? Any changes in appetite or sleep?",
                "Let me check your medical history. Are you currently taking any medications?",
                "I'd like to schedule a follow-up in a few days to monitor your progress."
            ];
            
            const randomResponse = doctorResponses[Math.floor(Math.random() * doctorResponses.length)];
            const doctorMessage = document.createElement('div');
            doctorMessage.className = 'message message-doctor';
            doctorMessage.innerHTML = `<strong>Dr. Patel:</strong> ${randomResponse}`;
            chatMessages.appendChild(doctorMessage);
            
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1500);
        
        input.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Close modals when clicking outside
window.onclick = function(event) {
    const consultationModal = document.getElementById('consultationModal');
    const patientMatchModal = document.getElementById('patientMatchModal');
    
    if (event.target === consultationModal) {
        consultationModal.style.display = 'none';
    }
    if (event.target === patientMatchModal) {
        patientMatchModal.style.display = 'none';
    }
}

// Simulate real-time updates for doctor dashboard
function updateDashboard() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        if (stat.textContent.includes('R')) return; // Skip currency values
        if (stat.textContent.includes('.')) return; // Skip ratings
        if (stat.textContent.includes('%')) return; // Skip percentages
        
        let currentValue = parseInt(stat.textContent);
        if (Math.random() < 0.3) { // 30% chance to update
            currentValue += Math.floor(Math.random() * 3);
            stat.textContent = currentValue;
        }
    });
}

// Update dashboard stats every 30 seconds
setInterval(updateDashboard, 30000);

// Add some animation on page load
window.addEventListener('load', function() {
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 100);
    });
});

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});