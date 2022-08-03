const CAPSULE_COUNT = 100;
const capNumInput = document.getElementById("bookingCapsule");
const guestNameInput = document.getElementById("guest");
const bookForm = document.getElementById("bookForm");
const messages = document.querySelector("#messages");
const checkoutForm = document.querySelector("#checkoutForm");
const checkoutRoomInput = document.querySelector("#checkOutCapsule");

function init() {
  const capsuleContainer = document.getElementById("capsules");
  let html = "";
  for (let i = 0; i < CAPSULE_COUNT; i++) {
    html += `<div>
            <span id="capsuleLabel${
              i + 1
            }" class="badge badge-pill badge-success">Capsule #${i + 1}</span>
            &nbsp;<span id="guest${i + 1}">Unoccupied</span>
        </div>`;
  }
  capsuleContainer.innerHTML = html;
}

init();

let timeout;

const handleMsgs = (msg, className) => {
  if (timeout) clearTimeout(timeout);

  messages.innerText = msg;
  // messages.className = `alert alert-${type}`;

  setTimeout(() => {
    handleMsgs("", "info");
  }, 6000);
};

const book = (evt) => {
  evt.preventDefault();

  const capNum = capNumInput.value;
  const guestName = guestNameInput.value;

  const capsule = document.querySelector(`#capsuleLabel${capNum}`);
  const guest = document.querySelector(`#guest${capNum}`);

  // Check to make sure the form fields are filled out
  // make sure room input is filled out
  if (!guestNameInput.value || !capNumInput.value) {
    // creating an error message goes in here
    return alert("Please enter your name and pick an unoccupied capsule.");
  }
  // Check to make sure the capsule exists
  else if (capNumInput.value > CAPSULE_COUNT) {
    return alert("This capsule does not exist.");
  }
  // Check to make sure the capsule is available
  else if (!capsule.classList.contains("badge-success")) {
    return alert(
      "This capsule is occupied. Please pick an unoccupied capsule."
    );
  }
  // If either of these is false messages.innerText = error
  // messages.classList.add('alert-danger') and .remove(alert-info)

  capsule.classList.remove("badge-success");
  capsule.classList.add("badge-danger");

  guest.innerText = guestName;

  evt.target.reset();

  handleMsgs(`Successfully checked into capsule #${capNum}`, `success`);
};

bookForm.addEventListener("submit", book);

const checkout = (evt) => {
  evt.preventDefault();

  // Get the checkout room number from the input (select the imput at the top of this page)
  const capNum = checkoutRoomInput.value;
  const capsuleOut = document.querySelector(`#capsuleLabel${capNum}`);
  const guest = document.querySelector(`#guest${capNum}`);

  // if the room is blank or unoccupied, show an error in messages
  if (!capNum) {
    alert("Please fill in you capsule number.");
  } else if (capNum > CAPSULE_COUNT) {
    alert("This capsule doesn't exist.");
  }
  // if checkout input is not equal to occupied capsule #

  // make sure room is occupied
  else if (!capsuleOut.classList.contains("badge-danger")) {
    alert("This capsule is not occupied. Please type your capsule number.");
  }

  capsuleOut.classList.remove("badge-danger");
  capsuleOut.classList.add("badge-success");

  // change the label and name back to original state, including classes

  guest.innerText = "Unoccupied";

  handleMsgs(`Successfully checked out of capsule #${capNum}`, `success`);

  evt.target.reset();
};

checkoutForm.addEventListener("submit", checkout);
