function getSelectedShowing() {
   for (const showing of model.data.showings) {
      if (showing.id === model.viewState.selectedShowingId) return showing;
   }
   return undefined;
}

function getTakenSeats(showingId) {
   const takenSeats = [];
   for (const reservation of model.data.reservations) {
      if (reservation.showingId === showingId) {
         for (const seat of reservation.seats) {
            takenSeats.push(seat);
         }
      }
   }
   return takenSeats;
}
