setTimeout(() => {
    document.getElementById('loading').classList.add('hide');
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 300);
}, 2500);


function showToast(type, subText) {
    // Select the toast element based on the type
    const toast = document.querySelector(`.toast.${type}`);

    if (toast) {
        // Update the sub-text
        const subTextElement = toast.querySelector('.sub-text');
        if (subTextElement) {
            subTextElement.innerText = subText;
        }

        // Show the toast with animation
        toast.classList.add('show');

        // Automatically hide the toast after a certain time
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300); // Wait for the animation to finish before removing
        }, 5000); // Show for 5 seconds
    } else {
        console.error(`Toast of type "${type}" not found.`);
    }
}



// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0gE6lonGms-HULa2eNZaE88gXcFRbqIM",
  authDomain: "publish-form-ysj.firebaseapp.com",
  databaseURL: "https://publish-form-ysj-default-rtdb.firebaseio.com",
  projectId: "publish-form-ysj",
  storageBucket: "publish-form-ysj.appspot.com",
  messagingSenderId: "558231726186",
  appId: "1:558231726186:web:0d0615c479ba212098c213",
  measurementId: "G-8ZTYWSZHJ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const email = document.getElementById('email').value;

    // Basic validation to check if the email field is empty
    if (!email) {
        showToast('warning', 'Please enter your email address.');
        return;
    }

    sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            showToast('success', 'A password reset email has been sent. Please check your inbox.');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            // Mapping error codes to user-friendly messages
            const errorMessages = {
                'auth/invalid-email': 'The email address is not valid.',
                'auth/missing-email': 'Please enter your email address.',
                'auth/network-request-failed': 'Network error. Please check your connection.',
                // Add more error codes and messages as needed
            };

            // Alert the user with the corresponding error message
            const userFriendlyMessage = errorMessages[errorCode] || 'An unknown error occurred. Please try again.';
            alert(userFriendlyMessage);
            showToast('error', userFriendlyMessage);

        });
});