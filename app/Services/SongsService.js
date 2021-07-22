import { ProxyState } from "../AppState.js";
import Song from "../Models/Song.js";
import { sandBoxApi } from "./AxiosService.js";

class SongsService {
  /**
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  getMusicByQuery(query) {
    //NOTE You will not need to change this method
    let url = "https://itunes.apple.com/search?callback=?&term=" + query;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        console.log(res.results)
        ProxyState.songs = res.results.map(rawData => new Song(rawData));
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  /**
   * Retrieves the saved list of songs from the sandbox
   */
  async getMySongs() {
    //TODO What are you going to do with this result
    const res = await sandBoxApi.get()
    console.log(res.data)
    ProxyState.playlist = res.data.map(s => new Song(s))
  }

  /**
   * Takes in a song id and sends it from the search results to the sandbox to be saved.
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async addToPlaylist(id) {
    console.log('Im adding a song')
    let foundSong = ProxyState.songs.find(s => s.id == id)
    let exist = ProxyState.playlist.find(s => s.title == foundSong.title)
    //TODO you only have an id, you will need to find it in the store before you can post it
    //TODO After posting it what should you do?
    if (!exist) {


      const res = await sandBoxApi.post('', foundSong)
      ProxyState.playlist = [...ProxyState.playlist, new Song(res.data)]
      console.log('I added this song', res.data)
    }
  }

  /**
   * Sends a delete request to the sandbox to remove a song from the playlist
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async removeFromPlaylist(id) {
    //TODO Send the id to be deleted from the server then update the store
    let foundSong = ProxyState.playlist.find(s => s.id == id)


    const res = await sandBoxApi.delete('/' + foundSong.id, foundSong)
    ProxyState.playlist = ProxyState.playlist.filter(s => s.id != id)
    console.log("i removed this song", res.data)
  }


}

const service = new SongsService();
export default service;
