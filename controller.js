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

function reserveSeats(event) {
   event.preventDefault();
   const form = event.target;
   const name = form.name.value;
   const phone = form.phone.value;
   console.log(name, phone);

   if (name === "") model.viewState.message = "Navn mangler";
   else if (phone === "") model.viewState.message = "Telefonnummer mangler";
   createMessage();
   updateView()
}
