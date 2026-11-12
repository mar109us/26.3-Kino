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
   let showingsHtml = "";
   for (const showing of model.data.showings) {
      const isSelected = showing.id === model.viewState.selectedShowingId;
      showingsHtml += /*HTML*/ `
            <button class="showing ${isSelected ? "selected" : ""}" onclick="selectShowing(${showing.id})">
                <span class="showing-title">${showing.title}</span>
                <span class="showing-time">${showing.time}</span>
            </button>
        `;
   }
   return /*HTML*/ `
        <div class="showings">
            ${showingsHtml}
        </div>
    `;
}

function createShowingInfo() {
   const selectedShowing = getSelectedShowing();
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
         const currentSeat = `${row}${number}`;
         seatsHtml += /*HTML*/ `
         <button 
            onclick="toggleSeat('${currentSeat}')"
            class="seat ${getSeatStatus(currentSeat)}">
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

function getSeatStatus(seat) {
   const showingId = model.viewState.selectedShowingId;
   if (showingId === undefined) return "taken";

   if (getTakenSeats(showingId).includes(seat)) return "taken";
   if (model.viewState.selectedSeats.includes(seat)) return "selected";
   return "free";
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
   const selectedSeatsAmount = model.viewState.selectedSeats.length;
   let moviePrice = 0;
   const selectedShowing = getSelectedShowing();
   if (selectedShowing !== undefined) {
      moviePrice = selectedShowing.price;
   }
   return /*HTML*/ `
        <div class="summary">
            <span>Valgte seter: ${selectedSeatsAmount}</span>
            <span>Totalpris: ${moviePrice * selectedSeatsAmount}</span>
        </div>
    `;
}

function createForm() {
   return /*HTML*/ `
      <form class="form" onsubmit="event.preventDefault(); reserve()">
         <label for="name">Navn</label>
         <input 
            id="name" 
            type="text" 
            value="${model.viewState.inputName}" 
            oninput="model.viewState.inputName = this.value">
         <br>
         <label for="phone">Telefonnummer</label>
         <input 
            id="phone" 
            type="tel"
            value="${model.viewState.inputPhone}"
            oninput="model.viewState.inputPhone = this.value">
         <br>
         <button class="reserve" type="submit">Reserver</button>
      </form>`;
}

function createMessage() {
   return /*HTML*/ `
        <div id="message" class="message">${model.viewState.message}</div>
    `;
}
