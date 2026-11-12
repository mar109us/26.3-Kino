const model = {
   app: {
      maxSeatSelection: 6,
   },
   viewState: {
      message: "",
      inputName: "",
      inputPhone: "",
      selectedShowingId: undefined,
      selectedSeats: [],
   },
   data: {
      hall: { rows: "ABCDEF", seatsPerRow: 8 },
      showings: [
         { id: 1, title: "Nordlys", time: "Fredag 20.11 kl. 19:30", price: 140 },
         { id: 2, title: "Fjellbekken", time: "Lørdag 21.11 kl. 16:00", price: 110 },
         { id: 3, title: "Siste stopp", time: "Lørdag 21.11 kl. 21:00", price: 140 },
      ],
      reservations: [
         {
            showingId: 1,
            name: "Kari Nordmann",
            phone: "41234567",
            seats: ["E3", "E4", "E5"],
         },
         {
            showingId: 1,
            name: "Per Hansen",
            phone: "92345678",
            seats: ["F3", "F4"],
         },
         {
            showingId: 2,
            name: "Lise Berg",
            phone: "47654321",
            seats: ["F3", "F4", "F5", "F6"],
         },
         {
            showingId: 1,
            name: "Ingrid Solberg",
            phone: "48123456",
            seats: ["F6", "F7"],
         },
         {
            showingId: 1,
            name: "Ola Johansen",
            phone: "93456789",
            seats: ["D4", "D5", "D6"],
         },
         {
            showingId: 2,
            name: "Nora Lie",
            phone: "45678912",
            seats: ["E2", "E3"],
         },
         {
            showingId: 2,
            name: "Erik Dahl",
            phone: "98765432",
            seats: ["E5", "E6", "E7"],
         },
         {
            showingId: 3,
            name: "Sofie Haugen",
            phone: "46789123",
            seats: ["F3", "F4", "F5"],
         },
         {
            showingId: 3,
            name: "Martin Bakke",
            phone: "91234876",
            seats: ["E4", "E5"],
         },
         {
            showingId: 1,
            name: "Hanne Moen",
            phone: "47321654",
            seats: ["B4"],
         },
         {
            showingId: 1,
            name: "Jonas Strand",
            phone: "95187263",
            seats: ["C5", "C6"],
         },
         {
            showingId: 2,
            name: "Tone Vik",
            phone: "41928374",
            seats: ["A5"],
         },
         {
            showingId: 2,
            name: "Anders Lund",
            phone: "90817263",
            seats: ["C3", "C4"],
         },
         {
            showingId: 3,
            name: "Maria Eide",
            phone: "46372819",
            seats: ["B5", "B6"],
         },
         {
            showingId: 3,
            name: "Henrik Berge",
            phone: "92736451",
            seats: ["C3"],
         },
      ],
   },
};
