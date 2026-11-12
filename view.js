function updateView() {
   document.getElementById("app").innerHTML = /*HTML*/ `
        <div class="page">
            <h1>Kino</h1>
            ${createShowings()}
            ${createShowingInfo()}
            ${createHall()}
            ${createLegend()}
            ${createSummary()}
            ${createForm()}
            ${createMessage()}
        </div>
    `;
}

function createShowings() {
   let selection = model.viewState.selectedShowing;
   let showingsHtml = "";
   for (let i = 0; i < model.data.showings.length; i++) {
      const showing = model.data.showings[i];
      if (selection === undefined) {
         showingsHtml += /*HTML*/ `
            <button class="showing" onclick="selectedShowing('${showing.id}')">
                <span class="showing-title">${showing.title}</span>
                <span class="showing-time">${showing.time}</span>
            </button>
        `;
      } else {
         showingsHtml += /*HTML*/ `
            <button class="showing ${selection.id == showing.id ? "selected" : ""}" onclick="selectedShowing('${showing.id}')">
                <span class="showing-title">${showing.title}</span>
                <span class="showing-time">${showing.time}</span>
            </button>
        `;
      }
   }
   return /*HTML*/ `
        <div class="showings">
            ${showingsHtml}
        </div>
    `;
}

function selectedShowing(id) {
   const showings = model.data.showings;
   for (let movie of showings) {
      if (movie.id == id) {
         model.viewState.selectedShowing = { ...movie };
         console.table(movie);
      }
   }
   updateView();
}

function createShowingInfo() {
   const selectedShowing = model.viewState.selectedShowing;
   if (selectedShowing === undefined) {
      return /*HTML*/ `
         <div class="showing-info">
            <h2>Ingen forestilling valgt</h2>
         </div>`;
   }
   return /*HTML*/ `
        <div class="showing-info">
            <h2>${selectedShowing.title}</h2>
            <p>${selectedShowing.price} kr per billett</p>
        </div>`;
}

function createHall() {
   const hall = model.data.hall;
   let hallHtml = "";
   for (let i = 0; i < hall.rows.length; i++) {
      const row = hall.rows[i];
      let seatsHtml = "";
      for (let number = 1; number <= hall.seatsPerRow; number++) {
         let currentSeat = `${i}-${number}`;
         seatsHtml += /*HTML*/ `
         <button 
            onclick="getSeat('${currentSeat}')"
            class="seat ${getSeatStatus(`${currentSeat}`)}">
               ${number}
         </button>`;
      }
      hallHtml += /*HTML*/ `
            <div class="row"><span class="row-label">${row}</span>${seatsHtml}</div>
        `;
   }
   return /*HTML*/ `
        <div class="screen"></div>
        <div class="screen-label">LERRET</div>
        <div class="hall">
            ${hallHtml}
        </div>
    `;
}

function getSeat(clickedSeat) {
   const index = model.viewState.selectedSeats.indexOf(clickedSeat);
   const seats = model.viewState.selectedSeats;
   if (seats.includes(clickedSeat)) {
      if (index < 0) return;
      seats.splice(index, 1);
   } else if (seats.length > model.app.maxSeatSelection - 1) {
      console.log("max seat is: ", model.app.maxSeatSelection);
      return;
   } else seats.push(clickedSeat);

   console.table(seats);

   updateView();
}

function getSeatStatus(seat) {
   for (let storedSeats of model.viewState.selectedSeats) {
      if (storedSeats === seat) {
         console.log(storedSeats);
         return "selected";
      }
   }
}

function createLegend() {
   return /*HTML*/ `
        <div class="legend">
            <span><span class="seat free"></span>Ledig</span>
            <span><span class="seat selected"></span>Valgt</span>
            <span><span class="seat taken"></span>Opptatt</span>
        </div>
    `;
}

function createSummary() {
   return /*HTML*/ `
        <div class="summary">
            <span>Valgte seter: –</span>
            <span>Totalpris: – kr</span>
        </div>
    `;
}

function createForm() {
   return /*HTML*/ `
        <div class="form">
            <label>Navn
                <input type="text">
            </label>
            <label>Telefonnummer
                <input type="text">
            </label>
            <button class="reserve">Reserver</button>
        </div>
    `;
}

function createMessage() {
   return /*HTML*/ `
        <div class="message"></div>
    `;
}
