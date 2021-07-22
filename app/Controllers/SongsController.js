import { ProxyState } from "../AppState.js";
import songService from "../Services/SongsService.js";

//Private
/**Draws the Search results to the page */
function _drawResults() {
  let songs = ProxyState.songs
  let template = ''
  songs.forEach(s => template += s.Template)
  document.getElementById('search').innerHTML = template

}

/**Draws the Users saved songs to the page */
function _drawPlaylist() {
  let songs = ProxyState.playlist
  let template = '<div class="row side-bar-scroll">'
  songs.forEach(s => template += s.Template)
  template += '</div>'
  document.getElementById('playlist').innerHTML = template
}

//Public
export default class SongsController {
  constructor() {
    //TODO Don't forget to register your listeners and get your data
    ProxyState.on('songs', _drawResults)
    ProxyState.on('playlist', _drawPlaylist)

    this.getMySongs()

  }

  /**Takes in the form submission event and sends the query to the service */
  search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    try {
      songService.getMusicByQuery(e.target.query.value);
    } catch (error) {
      console.error(error);
    }
  }

  async getMySongs() {
    try {
      songService.getMySongs()
    } catch (error) {
      console.log("error getting my songs", error);
    }
  }

  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */
  async addToPlaylist(id) {
    try {
      await songService.addToPlaylist(id)
    } catch (error) {
      console.error('Error adding Song')
    }
  }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  async removeFromPlaylist(id) {
    try {
      await songService.removeFromPlaylist(id)
    } catch (error) {
      console.error(error)
    }
  }
}
