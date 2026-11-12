const model = {
   app: {
      maxSeatSelection: 6,
   },
   viewState: {
      message: "",
      inputName: "",
      inputPhone: "",
      selectedShowing: undefined,
      selectedSeats: [],
      totalPrice: 0,
   },
   data: {
      hall: { rows: "ABCDEF", seatsPerRow: 8 },
      seats: [],
      showings: [
         { id: 1, title: "Nordlys", time: "Fredag 20.11 kl. 19:30", price: 140, takenSeats: []},
         { id: 2, title: "Fjellbekken", time: "Lørdag 21.11 kl. 16:00", price: 110, takenSeats: []},
         { id: 3, title: "Siste stopp", time: "Lørdag 21.11 kl. 21:00", price: 140, takenSeats: []},
      ],
   },
};
