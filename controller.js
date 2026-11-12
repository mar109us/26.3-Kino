function reserve() {
   const name = model.viewState.inputName.trim();
   const phone = model.viewState.inputPhone.trim();
   console.log(name, phone);
   const selectedShowingId = model.viewState.selectedShowingId;
   const selectedSeats = model.viewState.selectedSeats;
   if (selectedShowingId === undefined) model.viewState.message = "Ingen film valgt";
   else if (selectedSeats.length === 0) model.viewState.message = "Ingen seter valgt";
   else if (name === "") model.viewState.message = "Navn mangler";
   else if (!isValidName(name))
      model.viewState.message = "Navnet kan bare inneholde bokstaver, mellomrom og bindestrek";
   else if (phone === "") model.viewState.message = "Telefonnummer mangler";
   else if (!isValidPhone(phone)) model.viewState.message = "Telefonnummeret er ikke gyldig";
   else {
      model.viewState.message = `Din reservasjon er fullført, bekreftelse blir sendt til ${phone}`;
   }
   
   updateView();
}

function isValidName(name) {
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

function selectShowing(id) {
   model.viewState.selectedShowingId = id;
   model.viewState.selectedSeats = [];
   model.viewState.message = "";
   console.log("selected showing:", id);
   updateView();
}

function toggleSeat(clickedSeat) {
   const showingId = model.viewState.selectedShowingId;
   if (showingId === undefined) {
      model.viewState.message = "Velg en forestilling før du velger seter";
      updateView();
      return;
   }
   if (getTakenSeats(showingId).includes(clickedSeat)) return;
   const index = model.viewState.selectedSeats.indexOf(clickedSeat);
   const seats = model.viewState.selectedSeats;

   if (seats.includes(clickedSeat)) {
      if (index < 0) return;
      seats.splice(index, 1);
   } else if (seats.length > model.app.maxSeatSelection - 1) {
      model.viewState.message = `Du kan maks velge ${model.app.maxSeatSelection} seter`;
      updateView();
      return;
   } else seats.push(clickedSeat);

   console.table(seats);

   updateView();
}
