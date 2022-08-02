const CAPSULE_COUNT = 100;
const capNumInput = document.getElementById("bookingCapsule");
const guestNameInput = document.getElementById("guest");
const bookForm = document.getElementById("bookForm");
const messages = document.querySelector("#messages");
const checkoutForm = document.querySelector("#checkoutForm");
const checkoutRoomInput = document.querySelector("#checkoutCapsule");

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

const handleMsgs = (Msg, className) => {
  if (timeout) clearTimeout(timeout);

  messages.innerText = msg;
  messages.className = `alert alert-${type}`;

  setTimeout(() => {
    handleMsgs("", "info");
  }, 5000);
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

  // handleMsgs("Success", "success");
};

bookForm.addEventListener("submit", book);

const checkout = (evt) => {
  evt.preventDefault();

  // Get the checkout room number from the input (select the imput at the top of this page)
  const capNum = capNumInput.value;
  const out = document.querySelector(`#checkOutCapsule`);
  // const capsule = document.querySelector(`#capsuleLabel${capNum}`);
  const capsuleOut = document.querySelector(`#capsuleLabel${capNum}`);
  const guest = document.querySelector(`#guest${capNum}`);

  // capsuleOut = capsule.value;

  // if the room is blank or unoccupied, show an error in messages
  if (!out.value) {
    alert("Please fill in you capsule number.");
  } else if (out.value !== capsuleOut.valueq) {
    alert("idek");
  }

  // make sure room is occupied
  else if (!capsuleOut.classList.contains("badge-danger")) {
    alert("This capsule is not occupied. Please type your capsule number.");
  }

  capsule.classList.remove("badge-danger");
  capsule.classList.add("badge-success");

  // change the label and name back to original state, including classes
  checkoutRoomInput === out;
  guest.innerText = "Unoccupied";
};

checkoutForm.addEventListener("submit", checkout);
