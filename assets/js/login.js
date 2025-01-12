setTimeout(() => {
  document.getElementById('loading').classList.add('hide');
  setTimeout(() => {
      document.getElementById('loading').style.display = 'none';
  }, 300);
}, 2500);


const showPasswordCheckbox = document.getElementById('cbx');
const passwordInput = document.getElementById('password'); // Get the password input direc
showPasswordCheckbox.addEventListener('change', () => {
    // Toggle the type of the password input based on the checkbox state
    passwordInput.type = showPasswordCheckbox.checked ? 'text' : 'password';
});

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
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

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
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log('Signed in Successfully');
            window.location.href = './Dashboard.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode);
            console.error(errorMessage);

            // Mapping error codes to user-friendly messages
            const errorMessages = {
                'auth/invalid-email': 'The email address is not valid.',
                'auth/user-disabled': 'The user corresponding to the email has been disabled.',
                'auth/user-not-found': 'No user found with this email address.',
                'auth/wrong-password': 'The password is incorrect.',
                'auth/too-many-requests': 'Too many requests. Please try again later.',
                'auth/network-request-failed': 'Network error. Please check your connection.',
                // Add more error codes and messages as needed
            };

            // Alert the user with the corresponding error message
            const userFriendlyMessage = errorMessages[errorCode] || 'An unknown error occurred. Please try again.';
            showToast('error', userFriendlyMessage);

            const button = document.querySelector("button[type='submit']");
            button.innerHTML = 'Submit';
            button.classList.remove('loading-btn'); // Remove loading class if it was added
            button.ariaDisabled = false;
        });
});
const provider = new GoogleAuthProvider();
const googleButton = document.getElementById('google');
googleButton.addEventListener('click', () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    window.location.href = './dashboard.html';
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
})