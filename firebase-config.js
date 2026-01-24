/**
 * Firebase Configuration & Helper Functions
 * 
 * INSTRUCTIONS FOR USER:
 * 1. Go to your Firebase Console (console.firebase.google.com).
 * 2. Create a new project (or use existing).
 * 3. Go to Project Settings > General > Your apps > Add app > Web.
 * 4. Copy the "firebaseConfig" object and paste it below to replace the placeholder.
 * 5. Enable "Firestore Database" in the Firebase Console (in Test Mode for now).
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getFirestore, collection, doc, getDoc, setDoc, updateDoc, arrayUnion, getDocs } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// --- PASTE YOUR CONFIG HERE ---
const firebaseConfig = {
    apiKey: "AIzaSyAymIyfZavwLcC2CZPjG7vSNNk-PbGpmww",
    authDomain: "cgpa-calculator-9ce70.firebaseapp.com",
    projectId: "cgpa-calculator-9ce70",
    storageBucket: "cgpa-calculator-9ce70.firebasestorage.app",
    messagingSenderId: "466983466930",
    appId: "1:466983466930:web:80faf9753da953464c56ab"
};
// ------------------------------

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Collection References
const STUDENTS_COLLECTION = "Students";
const RESULTS_COLLECTION = "results";

/**
 * Login Student: Checks if Roll No exists in 'students' collection.
 * @param {string} name - Student Name (for verification/first time add if allowed, strictly we check rollNo)
 * @param {string} rollNo - Roll Number (Unique ID)
 * @returns {Promise<boolean>} - True if login success
 */
export async function loginStudent(name, rollNo) {
    if (!rollNo) return false;

    const studentRef = doc(db, STUDENTS_COLLECTION, rollNo);
    const snap = await getDoc(studentRef);

    if (snap.exists()) {
        // Student exists, allow login
        // Optionally verify name match if needed, for now we trust Roll No access as per request
        const data = snap.data();
        sessionStorage.setItem('res_user', JSON.stringify({
            name: data.name,
            rollNo: rollNo,
            isLoggedIn: true
        }));
        return true;
    } else {
        // User said: "if student roll number are there go this home page otherwie not permit"
        // So we do NOT auto-create account on login page.
        // HOWEVER, for testing, we might need a way to seed data.
        // For now, return false.
        console.warn("Roll Number not found in database.");
        return false;
    }
}

/**
 * Login Admin: Checks if username/password matches a document in 'admins' collection.
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<boolean>}
 */
export async function loginAdmin(username, password) {
    try {
        const adminRef = doc(db, "admins", username);
        const snap = await getDoc(adminRef);

        if (snap.exists()) {
            const data = snap.data();
            // In a real app, hash passwords! For now, simple string match as requested to replace hardcode.
            if (data.password === password) {
                return true;
            }
        }
        return false;
    } catch (error) {
        console.error("Admin login error:", error);
        return false;
    }
}

/**
 * Save Result: Updates the student's result record in Firestore.
 * @param {string} rollNo 
 * @param {number} sem 
 * @param {string} sgpa 
 * @param {string} cgpa 
 * @param {number} totalCredits 
 */
export async function saveResultToFirebase(rollNo, sem, sgpa, cgpa, totalCredits, year, section) {
    if (!rollNo) return;

    // We store results in a subcollection or a main 'results' collection.
    // Let's store in the 'students' document itself to keep it atomic and easy to query for CGPA.

    const studentRef = doc(db, STUDENTS_COLLECTION, rollNo);

    try {
        // 1. Get current data to calculate/update CGPA if needed (though passed in)
        // We will update the semester result map

        const updatePayload = {
            [`results.sem_${sem}`]: {
                sgpa: sgpa,
                credits: totalCredits,
                timestamp: new Date().toISOString()
            },
            currentCGPA: cgpa,
            lastUpdated: new Date().toISOString()
        };

        if (year) updatePayload.year = year;
        if (section) updatePayload.section = section;

        await updateDoc(studentRef, updatePayload);
        console.log("Result saved to Firebase");
    } catch (error) {
        console.error("Error saving result:", error);
        alert("Failed to save result online. Please check internet connection.");
    }
}

/**
 * Get All Results (For Admin)
 */
export async function getAllStudentResults() {
    try {
        const querySnapshot = await getDocs(collection(db, STUDENTS_COLLECTION));
        const students = [];
        querySnapshot.forEach((doc) => {
            students.push({ id: doc.id, ...doc.data() });
        });
        return students;
    } catch (error) {
        console.error("Error fetching students:", error);
        return [];
    }
}

/**
 * Get results for a specific student (For History Sync)
 */
export async function getStudentResults(rollNo) {
    if (!rollNo) return [];
    try {
        const docRef = doc(db, STUDENTS_COLLECTION, rollNo);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            // Convert results map to array format expected by history
            const resultsMap = data.results || {};
            const history = [];

            for (const [key, val] of Object.entries(resultsMap)) {
                // key is like "sem_3"
                const semStr = key.split('_')[1];
                const sem = parseInt(semStr);

                history.push({
                    sem: sem,
                    rollNo: rollNo, // Bind to student
                    result: val.sgpa || "0.00",
                    type: "SGPA", // Default to SGPA for history display
                    credits: val.credits || 0,
                    timestamp: val.timestamp ? new Date(val.timestamp).getTime() : 0,
                    date: val.timestamp ? new Date(val.timestamp).toLocaleDateString() : 'Unknown'
                });
            }
            return history;
        }
        return [];
    } catch (e) {
        console.error("Error syncing history:", e);
        return [];
    }
}

// Helper to check session
export function checkAuth() {
    const user = sessionStorage.getItem('res_user');
    if (!user) {
        window.location.href = 'login.html';
    }
    return JSON.parse(user);
}

export function logout() {
    sessionStorage.removeItem('res_user');
    window.location.href = 'login.html';
}
