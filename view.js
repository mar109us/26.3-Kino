function updateView() {
    document.getElementById('app').innerHTML = /*HTML*/`
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
    let showingsHtml = '';
    for (let i = 0; i < model.data.showings.length; i++) {
        const showing = model.data.showings[i];
        showingsHtml += /*HTML*/`
            <button class="showing">
                <span class="showing-title">${showing.title}</span>
                <span class="showing-time">${showing.time}</span>
            </button>
        `;
    }
    return /*HTML*/`
        <div class="showings">
            ${showingsHtml}
        </div>
    `;
}

function createShowingInfo() {
    return /*HTML*/`
        <div class="showing-info">
            <h2>Ingen forestilling valgt</h2>
            <p>– · – kr per billett</p>
        </div>
    `;
}

function createHall() {
    const hall = model.data.hall;
    let hallHtml = '';
    for (let i = 0; i < hall.rows.length; i++) {
        const row = hall.rows[i];
        let seatsHtml = '';
        for (let number = 1; number <= hall.seatsPerRow; number++) {
            seatsHtml += /*HTML*/`<button class="seat free">${number}</button>`;
        }
        hallHtml += /*HTML*/`
            <div class="row"><span class="row-label">${row}</span>${seatsHtml}</div>
        `;
    }
    return /*HTML*/`
        <div class="screen"></div>
        <div class="screen-label">LERRET</div>
        <div class="hall">
            ${hallHtml}
        </div>
    `;
}

function createLegend() {
    return /*HTML*/`
        <div class="legend">
            <span><span class="seat free"></span>Ledig</span>
            <span><span class="seat selected"></span>Valgt</span>
            <span><span class="seat taken"></span>Opptatt</span>
        </div>
    `;
}

function createSummary() {
    return /*HTML*/`
        <div class="summary">
            <span>Valgte seter: –</span>
            <span>Totalpris: – kr</span>
        </div>
    `;
}

function createForm() {
    return /*HTML*/`
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
    return /*HTML*/`
        <div class="message"></div>
    `;
}
