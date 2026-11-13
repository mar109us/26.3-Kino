function reserve() {
   const reservationData = {
      id: model.viewState.selectedShowingId,
      name: model.viewState.inputName.trim(),
      phone: model.viewState.inputPhone.trim(),
      seats: model.viewState.selectedSeats,
   };

   const errorMessage = getReservationError(reservationData);
   if (errorMessage !== null) {
      model.viewState.message = errorMessage;
      updateView();
      return;
   }
   saveNewReservation(reservationData);
   clearViewState();
   model.viewState.message = "Reservasjon fullført";
   updateView();
}

function getReservationError(data) {
   if (data.id === undefined) return "Ingen film valgt";
   if (data.seats.length === 0) return "Ingen seter valgt";
   if (data.name === "") return "Navn mangler";
   if (data.phone === "") return "Telefonnummer mangler";
   if (!isValidPhone(data.phone)) return "Telefonnummeret er ikke gyldig, 8 siffer nødvendig";
   return null;
}

function saveNewReservation(data) {
   model.data.reservations.push({
      showingId: data.id,
      name: data.name,
      phone: data.phone,
      seats: [...data.seats],
   });
}

function clearViewState() {
   model.viewState.message = "";
   model.viewState.inputName = "";
   model.viewState.inputPhone = "";
   model.viewState.selectedSeats = [];
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
   updateView();
}

function toggleSeat(clickedSeat) {
   const showingId = model.viewState.selectedShowingId;
   const seats = model.viewState.selectedSeats;

   const errorMessage = getSeatError(showingId, seats, clickedSeat);
   if (errorMessage !== null) {
      model.viewState.message = errorMessage;
      updateView();
      return;
   }
   if (seats.includes(clickedSeat)) seats.splice(seats.indexOf(clickedSeat), 1);
   else seats.push(clickedSeat);
   model.viewState.message = "";
   updateView();
}

function getSeatError(showingId, seats, clickedSeat) {
   if (showingId === undefined) return "Velg en forestilling før du velger seter";
   if (getTakenSeats(showingId).includes(clickedSeat)) return "Valgt sete er allerede reservert";
   if (seats.includes(clickedSeat)) return null;
   if (seats.length >= model.app.maxSeatSelection)
      return `Du kan maks velge ${model.app.maxSeatSelection} seter`;
   else return null;
}
