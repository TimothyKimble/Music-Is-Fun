export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "200x200");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this.id = data.trackId || data._id;
    this.kind = data.kind || ''
  }

  get Template() {
    return `
    <div class="col-md-12 d-flex  justify-content-between textShadow align-items-center my-3">
    
    <img src="${this.albumArt}" alt="${this.title}">
    <div class="d-flex flex-column">
    <p>${this.title}</p>
    <p>${this.album}</p>
    <p>${this.artist}</p>
    </div>
    ${this.TemplateButton}
</div>
        `;
  }

  get playlistTemplate() {
    return `

        `;
  }

  get TemplateButton() {
    if (this.kind) {
      return `
      <button class="btn btn-info" onclick="app.songsController.previewSong('${this.preview}')">Play</button>
      <button class="btn btn-success btnRound" onclick="app.songsController.addToPlaylist('${this.id}')">+</button>
    `}
    return `<button class="btn btn-danger btnRound" onclick="app.songsController.removeFromPlaylist('${this.id}')">-</button>`
  }
}
