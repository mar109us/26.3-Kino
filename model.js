const model = {
   app: {
      maxSeatSelection: 6,
   },
   viewState: {
      selectedShowing: undefined,
      selectedSeats: [],
   },
   data: {
      hall: { rows: "ABCDEF", seatsPerRow: 8 },
      seats: [],
      showings: [
         { id: 1, title: "Nordlys", time: "Fredag 20.11 kl. 19:30", price: 140 },
         { id: 2, title: "Fjellbekken", time: "Lørdag 21.11 kl. 16:00", price: 110 },
         { id: 3, title: "Siste stopp", time: "Lørdag 21.11 kl. 21:00", price: 140 },
      ],
   },
};
