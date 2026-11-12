function addRandomTakenSeats() {
   for (let showing of model.data.showings) {
      showing.takenSeats = randomSeat()
   }
}
addRandomTakenSeats()

function randomSeat() {
   const seats = [];
   while (seats.length < 10) {
      const row = Math.floor(Math.random() * 6);
      const column = Math.floor(Math.random() * 6) + 1;
      const seat = `${row}-${column}`;
      if (!seats.includes(seat)) {
         seats.push(seat);
      }
   }
   return seats;
}