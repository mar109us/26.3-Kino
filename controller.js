function addRandomTakenSeats() {
   for (let showing of model.data.showings) {
      showing.takenSeats = randomSeat();
   }
}
addRandomTakenSeats();

function randomSeat() {
   const seats = [];
   while (seats.length < Math.floor(Math.random() * 5) + 20) {
      const row = Math.floor(Math.random() * 6);
      const column = Math.floor(Math.random() * 8) + 1;
      const seat = `${row}-${column}`;
      if (!seats.includes(seat)) {
         seats.push(seat);
      }
   }
   return seats;
}

function reserve(event) {
   event.preventDefault();
   const name = model.viewState.inputName.trim();
   const phone = model.viewState.inputPhone.trim();
   console.log(name, phone);
   const selectedShowing = model.viewState.selectedShowing;
   const selectedSeats = model.viewState.selectedSeats;
   if (!selectedShowing) model.viewState.message = "Ingen film valgt";
   else if (selectedSeats.length === 0) model.viewState.message = "Ingen seter valgt";
   else if (name === "") model.viewState.message = "Navn mangler";
   else if (!isValidName(name))
      model.viewState.message = "Navnet kan bare inneholde bokstaver, mellomrom og bindestrek";
   else if (phone === "") model.viewState.message = "Telefonnummer mangler";
   else if (!isValidPhone(phone)) model.viewState.message = "Telefonnummeret er ikke gyldig";
   else
      model.viewState.message = `Din reservasjon er fullført, bekreftelse blir sendt til ${phone}`;
   updateView();
}

function isValidName(name) {
   if (name.length < 2) return false;
   const allowedCharacters = "abcdefghijklmnopqrstuvwxyzæøå -";
   for (const character of name.toLowerCase()) {
      if (!allowedCharacters.includes(character)) return false;
   }
   return true;
}

function isValidPhone(phone) {
   if (phone.length !== 8) return false;
   const numbers = "0123456789";
   for (const character of phone) {
      if (!numbers.includes(character)) return false;
   }
   return true;
}
