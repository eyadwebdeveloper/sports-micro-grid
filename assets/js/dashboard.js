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


const profile = document.querySelector('.profile');
const profileDropdown = document.querySelector('.profile-dropdown');
const profileIcon = document.querySelector('.profile i');

// Function to show dropdown and rotate icon
function showDropdown() {
    profileDropdown.classList.add('show-dropdown');
    profileIcon.classList.add('rotate');
}

// Function to hide dropdown and reset icon
function hideDropdown() {
    profileDropdown.classList.remove('show-dropdown');
    profileIcon.classList.remove('rotate');
}

// Add event listeners
profile.addEventListener('mouseover', showDropdown);
profileDropdown.addEventListener('mouseover', showDropdown);
profile.addEventListener('mouseout', hideDropdown);
profileDropdown.addEventListener('mouseout', hideDropdown);


document.querySelector('.edit').addEventListener('click', () => {
    document.querySelector('.profile-card').classList.add('editable');
});

document.getElementById('profile-button').addEventListener('click', (e) => {
    e.preventDefault();
     document.querySelectorAll('.content').forEach(content => {
        content.classList.remove('displayed');
        document.getElementById('profile-content').classList.add('displayed');
     })
});

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const passwordChangeButton = document.getElementById('password-change');

        // Disable the button if current password is empty or new password does not match confirm password
        if (currentPassword === '' || newPassword === ''  || newPassword !== confirmPassword) {
            passwordChangeButton.classList.add('disabled');
            passwordChangeButton.setAttribute('disabled', '');
        } else {
            passwordChangeButton.classList.remove('disabled');
            passwordChangeButton.removeAttribute('disabled', '');
        }
    });
});

document.getElementById('profile-img').addEventListener('click', () => {
    document.getElementById('profile-img-input').click();
});

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Get all button links
    const buttonLinks = document.querySelectorAll('.button-link');
    // Get all content sections
    const contents = document.querySelectorAll('.content');

    // Function to hide all contents
    const hideAllContents = () => {
        contents.forEach(content => {
            content.classList.remove('displayed'); // Hide content
        });
    };

    // Function to show the corresponding content
    const showContent = (contentId) => {
        const contentToShow = document.getElementById(contentId);
        if (contentToShow) {
            contentToShow.classList.add('displayed'); // Show content
        }
    };

    // Add click event listeners to each button link
    buttonLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor behavior

            // Remove active class from all button links
            buttonLinks.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button link
            link.classList.add('active');

            // Hide all contents
            hideAllContents();

            // Determine which content to show based on the clicked link
            const contentId = link.textContent.trim().toLowerCase().replace(/\s+/g, '-') + '-content';
            showContent(contentId);
        });
    });
});


document.getElementById('download-pdf').addEventListener('click', function(e) {
    e.preventDefault();
    const { jsPDF } = window.jspdf;

    // Use html2canvas to capture the content of the element
    html2canvas(document.getElementById('content')).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save('generated.pdf');
    }).catch(error => {
        console.error('Error capturing the content:', error);
    });
});
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, updateProfile, updatePassword, signInWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-storage.js";

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
const storage = getStorage(app);


// const docRef = doc(db, "data", "reads");
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // docSnap.data() will be undefined in this case
//   console.log("No such document!");
// }


onAuthStateChanged(auth, (user) => {
    if (user) {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        let nameInput = document.getElementById('name-input');
        let emailInput = document.getElementById('email-input');
        let nameInHeader = document.getElementById('header-name');
        name.innerHTML = user.displayName;
        nameInHeader.innerHTML = user.displayName;
        email.innerHTML = user.email;
        nameInput.value = user.displayName;
        emailInput.value = user.email;
        if(user.photoURL) {
          document.getElementById('profile-img').src = user.photoURL;
          document.getElementById('user-img').src = user.photoURL; // Update the profile image
        } else {
          document.getElementById('user-img').src = '../images/user.png'; // Update the profile image
          document.getElementById('profile-img').src = '../images/user.png';
        }


        // Move the event listener for updating profile inside this block
        document.getElementById('update-profile').addEventListener('click', () => {      
          // Update profile
          updateProfile(user, {
              displayName: document.getElementById('name-input').value
          }).then(() => {
              showToast('success', 'Profile updated successfully');
              document.querySelector('.profile-card').classList.remove('editable');
          }).catch((error) => {
              console.error(error);
          });
        });
        document.getElementById('password-change').addEventListener('click', () => {
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
        
            // Check if current password is provided and new passwords match
            if (currentPassword !== '' && newPassword !== '' && newPassword === confirmPassword) {
                // Re-authenticate the user
                signInWithEmailAndPassword(auth, user.email, currentPassword)
                    .then(() => {
                        // User re-authenticated, now update password
                        return updatePassword(user, newPassword);
                    })
                    .then(() => {
                        showToast('success', 'Password updated successfully');
                    })
                    .catch((error) => {
                        if (error.code === 'auth/requires-recent-login') {
                            alert('You need to log in again to change your password. Please sign in again.');
                            // Optionally, redirect to login page or show a login modal
                        } else {
                            console.error(error);
                            alert(error.message); // Show other error messages to user
                        }
                    });
            }
        });

    } else {
        console.log('No user signed in');
        window.location.href = './login.html';
    }
});

const signoutBtn = document.getElementById('signout');
  signoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
      console.log('Signed out');
      window.location.href = './login.html';
    }).catch((error) => {
      console.error(error);
    });
});

document.getElementById('profile-img-input').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
      const storageRef = ref(storage, 'profileImages/' + file.name);
      uploadBytes(storageRef, file).then((snapshot) => {
          console.log('Uploaded a profile image!');
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            updateProfile(auth.currentUser, {
              photoURL: downloadURL
          }).then(() => {
              showToast('success', 'Profile image updated successfully');
          }).catch((error) => {
              console.error(error);
          });
              document.getElementById('profile-img').src = downloadURL; // Update the profile image
              document.getElementById('user-img').src = downloadURL; // Update the profile image
          });
      }).catch((error) => {
          console.error('Error uploading profile image:', error);
      });
  }
});