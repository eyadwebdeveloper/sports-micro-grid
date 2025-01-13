
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



// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, updateProfile, updatePassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

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
const db = getDatabase(app);

const dbRef = ref(db);
// const docRef = doc(db, "data", "reads");
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // docSnap.data() will be undefined in this case
//   console.log("No such document!");
// }

// Initial data
let MainChartSeriesData = [
    {
        name: "Solar Irradiance",
        data: [],
        color: "#1A56DB",
    }
];
let SecondChartSeriesData = [
    {
        name: "Solar Irradiance",
        data: [],
        color: "#1A56DB",
    }
];
let ThirdChartSeriesData = [
    {
        name: "Solar Irradiance",
        data: [],
        color: "#1A56DB",
    }
];
let MainChartTwoSeriesData = [
    {
        name: "Solar Irradiance",
        data: [],
        color: "#1A56DB",
    }
];
let SecondChartTwoSeriesData = [
    {
        name: "Solar Irradiance",
        data: [],
        color: "#1A56DB",
    }
];
let ThirdChartTwoSeriesData = [
    {
        name: "Solar Irradiance",
        data: [],
        color: "#1A56DB",
    }
];
let MainChartThreeSeriesData = [
    {
        name: "Solar Irradiance",
        data: [],
        color: "#1A56DB",
    }
];
let SecondChartThreeSeriesData = [
    {
        name: "Solar Irradiance",
        data: [],
        color: "#1A56DB",
    }
];



const MainChartOptions = {
    yaxis: {
        show: false,
        labels: {
            formatter: function (value) {
                return value + ' W/m²'; // Assuming Solar Irradiance is in W/m²
            }
        }
    },
    chart: {
        height: "320px",
        maxWidth: "100%",
        type: "area",
        fontFamily: "Poppins, sans-serif",
        dropShadow: {
            enabled: false,
        },
        toolbar: {
            show: true,
        },
        animations: {
            enabled: false,
            easing: 'easein',
            speed: 800,
            dynamicAnimation: {
                speed: 350
            }
        }
    },
    tooltip: {
        enabled: true,
        x: {
            show: false,
        },
    },
    fill: {
        type: "gradient",
        gradient: {
            opacityFrom: 0.55,
            opacityTo: 0,
            shade: "#1C64F2",
            gradientToColors: ["#1C64F2"],
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 6,
    },
    grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
            left: 2,
            right: 2,
            top: -26
        },
    },
    series: MainChartSeriesData,
    xaxis: {
        categories: [],
        labels: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
};

const SecondChartOptions = {
    yaxis: {
        show: false,
        labels: {
            formatter: function (value) {
                return value + ' W/m²'; // Assuming Solar Irradiance is in W/m²
            }
        }
    },
    chart: {
        height: "320px",
        maxWidth: "100%",
        type: "area",
        fontFamily: "Poppins, sans-serif",
        dropShadow: {
            enabled: false,
        },
        toolbar: {
            show: true,
        },
        animations: {
            enabled: false,
            easing: 'easein',
            speed: 800,
            dynamicAnimation: {
                speed: 350
            }
        }
    },
    tooltip: {
        enabled: true,
        x: {
            show: false,
        },
    },
    fill: {
        type: "gradient",
        gradient: {
            opacityFrom: 0.55,
            opacityTo: 0,
            shade: "#1C64F2",
            gradientToColors: ["#1C64F2"],
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 6,
    },
    grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
            left: 2,
            right: 2,
            top: -26
        },
    },
    series: SecondChartSeriesData,
    xaxis: {
        categories: [],
        labels: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
};

const ThirdChartOptions = {
    yaxis: {
        show: false,
        labels: {
            formatter: function (value) {
                return value + ' W/m²'; // Assuming Solar Irradiance is in W/m²
            }
        }
    },
    chart: {
        height: "320px",
        maxWidth: "100%",
        type: "area",
        fontFamily: "Poppins, sans-serif",
        dropShadow: {
            enabled: false,
        },
        toolbar: {
            show: true,
        },
        animations: {
            enabled: false,
            easing: 'easein',
            speed: 800,
            dynamicAnimation: {
                speed: 350
            }
        }
    },
    tooltip: {
        enabled: true,
        x: {
            show: false,
        },
    },
    fill: {
        type: "gradient",
        gradient: {
            opacityFrom: 0.55,
            opacityTo: 0,
            shade: "#1C64F2",
            gradientToColors: ["#1C64F2"],
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 6,
    },
    grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
            left: 2,
            right: 2,
            top: -26
        },
    },
    series: ThirdChartSeriesData,
    xaxis: {
        categories: [],
        labels: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
};

const MainChartTwoOptions = {
    yaxis: {
        show: false,
        labels: {
            formatter: function (value) {
                return value + ' W/m²'; // Assuming Solar Irradiance is in W/m²
            }
        }
    },
    chart: {
        height: "320px",
        maxWidth: "100%",
        type: "area",
        fontFamily: "Poppins, sans-serif",
        dropShadow: {
            enabled: false,
        },
        toolbar: {
            show: true,
        },
        animations: {
            enabled: false,
            easing: 'easein',
            speed: 800,
            dynamicAnimation: {
                speed: 350
            }
        }
    },
    tooltip: {
        enabled: true,
        x: {
            show: false,
        },
    },
    fill: {
        type: "gradient",
        gradient: {
            opacityFrom: 0.55,
            opacityTo: 0,
            shade: "#1C64F2",
            gradientToColors: ["#1C64F2"],
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 6,
    },
    grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
            left: 2,
            right: 2,
            top: -26
        },
    },
    series: MainChartTwoSeriesData,
    xaxis: {
        categories: [],
        labels: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
};

const SecondChartTwoOptions = {
    yaxis: {
        show: false,
        labels: {
            formatter: function (value) {
                return value + ' W/m²'; // Assuming Solar Irradiance is in W/m²
            }
        }
    },
    chart: {
        height: "320px",
        maxWidth: "100%",
        type: "area",
        fontFamily: "Poppins, sans-serif",
        dropShadow: {
            enabled: false,
        },
        toolbar: {
            show: true,
        },
        animations: {
            enabled: false,
            easing: 'easein',
            speed: 800,
            dynamicAnimation: {
                speed: 350
            }
        }
    },
    tooltip: {
        enabled: true,
        x: {
            show: false,
        },
    },
    fill: {
        type: "gradient",
        gradient: {
            opacityFrom: 0.55,
            opacityTo: 0,
            shade: "#1C64F2",
            gradientToColors: ["#1C64F2"],
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 6,
    },
    grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
            left: 2,
            right: 2,
            top: -26
        },
    },
    series: SecondChartTwoSeriesData,
    xaxis: {
        categories: [],
        labels: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
};

const ThirdChartTwoOptions = {
    yaxis: {
        show: false,
        labels: {
            formatter: function (value) {
                return value + ' W/m²'; // Assuming Solar Irradiance is in W/m²
            }
        }
    },
    chart: {
        height: "320px",
        maxWidth: "100%",
        type: "area",
        fontFamily: "Poppins, sans-serif",
        dropShadow: {
            enabled: false,
        },
        toolbar: {
            show: true,
        },
        animations: {
            enabled: false,
            easing: 'easein',
            speed: 800,
            dynamicAnimation: {
                speed: 350
            }
        }
    },
    tooltip: {
        enabled: true,
        x: {
            show: false,
        },
    },
    fill: {
        type: "gradient",
        gradient: {
            opacityFrom: 0.55,
            opacityTo: 0,
            shade: "#1C64F2",
            gradientToColors: ["#1C64F2"],
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 6,
    },
    grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
            left: 2,
            right: 2,
            top: -26
        },
    },
    series: ThirdChartTwoSeriesData,
    xaxis: {
        categories: [],
        labels: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
};



const MainChartThreeOptions = {
    yaxis: {
        show: false,
        labels: {
            formatter: function (value) {
                return value + ' W/m²'; // Assuming Solar Irradiance is in W/m²
            }
        }
    },
    chart: {
        height: "320px",
        maxWidth: "100%",
        type: "area",
        fontFamily: "Poppins, sans-serif",
        dropShadow: {
            enabled: false,
        },
        toolbar: {
            show: true,
        },
        animations: {
            enabled: false,
            easing: 'easein',
            speed: 800,
            dynamicAnimation: {
                speed: 350
            }
        }
    },
    tooltip: {
        enabled: true,
        x: {
            show: false,
        },
    },
    fill: {
        type: "gradient",
        gradient: {
            opacityFrom: 0.55,
            opacityTo: 0,
            shade: "#1C64F2",
            gradientToColors: ["#1C64F2"],
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 6,
    },
    grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
            left: 2,
            right: 2,
            top: -26
        },
    },
    series: MainChartThreeSeriesData,
    xaxis: {
        categories: [],
        labels: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
};

const SecondChartThreeOptions = {
    yaxis: {
        show: false,
        labels: {
            formatter: function (value) {
                return value + ' W/m²'; // Assuming Solar Irradiance is in W/m²
            }
        }
    },
    chart: {
        height: "320px",
        maxWidth: "100%",
        type: "area",
        fontFamily: "Poppins, sans-serif",
        dropShadow: {
            enabled: false,
        },
        toolbar: {
            show: true,
        },
        animations: {
            enabled: false,
            easing: 'easein',
            speed: 800,
            dynamicAnimation: {
                speed: 350
            }
        }
    },
    tooltip: {
        enabled: true,
        x: {
            show: false,
        },
    },
    fill: {
        type: "gradient",
        gradient: {
            opacityFrom: 0.55,
            opacityTo: 0,
            shade: "#1C64F2",
            gradientToColors: ["#1C64F2"],
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 6,
    },
    grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
            left: 2,
            right: 2,
            top: -26
        },
    },
    series: SecondChartThreeSeriesData,
    xaxis: {
        categories: [],
        labels: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
};



const mainChart = new ApexCharts(document.getElementById("main-chart"), MainChartOptions);
const secondChart = new ApexCharts(document.getElementById("second-chart"), SecondChartOptions);
const thirdChart = new ApexCharts(document.getElementById("third-chart"), ThirdChartOptions);
const mainChartTwo = new ApexCharts(document.getElementById("main-chart-two"), MainChartTwoOptions);
const secondChartTwo = new ApexCharts(document.getElementById("second-chart-two"), SecondChartTwoOptions);
const thirdChartTwo = new ApexCharts(document.getElementById("third-chart-two"), ThirdChartTwoOptions);
const mainChartThree = new ApexCharts(document.getElementById("main-chart-three"), MainChartThreeOptions);
const secondChartThree = new ApexCharts(document.getElementById("second-chart-three"), SecondChartThreeOptions);

mainChart.render();
secondChart.render();
thirdChart.render();
mainChartTwo.render();
secondChartTwo.render();
thirdChartTwo.render();
mainChartThree.render();
secondChartThree.render();


async function fetchDataAndUpdateChart() {
    try {
        let timeCounter = 0; // Initialize timeCounter at the beginning

        get(child(dbRef, `data`)).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val(); // Get the data from the snapshot
                console.log(data); // Log the data for debugging

                // Update MainChart
                MainChartSeriesData[0].data.push(data.GeneratedVoltage);
                MainChartOptions.xaxis.categories.push(timeCounter);
                if (MainChartSeriesData[0].data.length > 7) {
                    MainChartSeriesData[0].data.shift();
                    MainChartOptions.xaxis.categories.shift();
                }
                mainChart.updateSeries(MainChartSeriesData);
                mainChart.updateOptions(MainChartOptions);

                // Update SecondChart
                SecondChartSeriesData[0].data.push(data.GeneratedCurrent);
                SecondChartOptions.xaxis.categories.push(timeCounter);
                if (SecondChartSeriesData[0].data.length > 7) {
                    SecondChartSeriesData[0].data.shift();
                    SecondChartOptions.xaxis.categories.shift();
                }
                secondChart.updateSeries(SecondChartSeriesData);
                secondChart.updateOptions(SecondChartOptions);

                // Update ThirdChart
                ThirdChartSeriesData[0].data.push(data.GeneratedPower); // Replace with actual data field
                ThirdChartOptions.xaxis.categories.push(timeCounter);
                if (ThirdChartSeriesData[0].data.length > 7) {
                    ThirdChartSeriesData[0].data.shift();
                    ThirdChartOptions.xaxis.categories.shift();
                }
                thirdChart.updateSeries(ThirdChartSeriesData);
                thirdChart.updateOptions(ThirdChartOptions);

                // Update MainChartTwo
                MainChartTwoSeriesData[0].data.push(data.BatteryCurrent); // Replace with actual data field
                MainChartTwoOptions.xaxis.categories.push(timeCounter);
                if (MainChartTwoSeriesData[0].data.length > 7) {
                    MainChartTwoSeriesData[0].data.shift();
                    MainChartTwoOptions.xaxis.categories.shift();
                }
                mainChartTwo.updateSeries(MainChartTwoSeriesData);
                mainChartTwo.updateOptions(MainChartTwoOptions);

                // Update SecondChartTwo
                SecondChartTwoSeriesData[0].data.push(data.BatteryVoltage); // Replace with actual data field
                SecondChartTwoOptions.xaxis.categories.push(timeCounter);
                if (SecondChartTwoSeriesData[0].data.length > 7) {
                    SecondChartTwoSeriesData[0].data.shift();
                    SecondChartTwoOptions.xaxis.categories.shift();
                }
                secondChartTwo.updateSeries(SecondChartTwoSeriesData);
                secondChartTwo.updateOptions(SecondChartTwoOptions);

                // Update ThirdChartTwo
                ThirdChartTwoSeriesData[0].data.push(data.ConsumedPower); // Replace with actual data field
                ThirdChartTwoOptions.xaxis.categories.push(timeCounter);
                if (ThirdChartTwoSeriesData[0].data.length > 7) {
                    ThirdChartTwoSeriesData[0].data.shift();
                    ThirdChartTwoOptions.xaxis.categories.shift();
                }
                thirdChartTwo.updateSeries(ThirdChartTwoSeriesData);
                thirdChartTwo.updateOptions(ThirdChartTwoOptions);

                // Update MainChartThree
                MainChartThreeSeriesData[0].data.push(data.BatteryCharge); // Replace with actual data field
                MainChartThreeOptions.xaxis.categories.push(timeCounter);
                if (MainChartThreeSeriesData[0].data.length > 7) {
                    MainChartThreeSeriesData[0].data.shift();
                    MainChartThreeOptions.xaxis.categories.shift();
                }
                mainChartThree.updateSeries(MainChartThreeSeriesData);
                mainChartThree.updateOptions(MainChartThreeOptions);

                // Update SecondChartThree
                SecondChartThreeSeriesData[0].data.push(data.StorageUnitTemperature); // Replace with actual data field
                SecondChartThreeOptions.xaxis.categories.push(timeCounter);
                if (SecondChartThreeSeriesData[0].data.length > 7) {
                    SecondChartThreeSeriesData[0].data.shift();
                    SecondChartThreeOptions.xaxis.categories.shift();
                }
                secondChartThree.updateSeries(SecondChartThreeSeriesData);
                secondChartThree.updateOptions(SecondChartThreeOptions);

                // Increment timeCounter
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Fetch data and update the chart every 2 seconds
setInterval(fetchDataAndUpdateChart, 2000);

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

