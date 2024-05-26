import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from "firebase/app";
import { environment } from 'src/environments/environment';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, setDoc, updateDoc, where } from "firebase/firestore";
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  app: FirebaseApp | undefined
  db: any
  loading: HTMLIonLoadingElement | undefined;
  constructor(private loadingCtrl: LoadingController) { }
  initializeFirebase() {
    this.app = initializeApp(environment.firebase_dev)
    this.db = getFirestore(this.app)
  }


  /** 
   * Players Services
   * **/

  createPlayer(name: string): Observable<any> {
    return new Observable((observer) => {
      try {
        addDoc(collection(this.db, "players"), {
          name: name
        })
          .then(docRef => {
            observer.next(docRef)
          })
      } catch (e) {
      }
    })
  }

  async getAllPlayers() {
    return (await (await getDocs(collection(this.db, "players"))).docs.map(data => ({ id: data.id, name: data.data()['name'], current_team_id: data.data()['current_team_id'] })))
  }

  async getTeamPlayers(team_id: string) {
    const q = query(collection(this.db, "players"), where("current_team_id", "==", team_id));
    return (await (await getDocs(q)).docs.map(data => ({ id: data.id, name: data.data()['name'], current_team_id: data.data()['current_team_id'] })))
  }


  async getTeamPlayersWithMatchStat(team_id: any, match_id: any) {
    try {
      const players_query = query(collection(this.db, "players"), where("current_team_id", "==", team_id));
      const playerSnapShot = await getDocs(players_query)
      const players: any = [];
      playerSnapShot.forEach(doc => {
        players.push({ id: doc.id, ...doc.data() });
      });
      for (const player of players) {
        const stats_query = query(collection(this.db, "player_stats"), where("player_id", "==", player.id), where("match_id", "==", match_id));
        let statSnapShot = await getDocs(stats_query)
        let stats: any = []
        statSnapShot.forEach(doc => {
          stats.push({ id: doc.id, ...doc.data() });
        });
        if(stats.length == 0){
          const stat = {
            id: null,
            player_id: null,
            match_id: null,
            tournament_id: null,
            played_from_team_name: null,
            played_from_team_id: null,
            played_against_team_name: null,
            played_against_team_id: null,
            runs: null,
            wickets: null
          }
          stats.push(stat)
        }
        player.stats = stats;
      }
      return players;
    } catch (error) {
    }
  }
  async updatePlayerInfo(player_id: string, info: any) {
    const playerInfoRef = doc(this.db, "players", player_id);
    return await updateDoc(playerInfoRef, info)
  }

  // async updatePlayerStats(player_id:string, info:any){

  //   const playerInfoRef = doc(this.db, "players", player_id);
  //   return await updateDoc(playerInfoRef,{
  //     stats:arrayUnion(info)
  //   })
  // }

  // async addPlayerStats(stats:any){

  //   const playerInfoRef = doc(this.db, "player_stats");
  //   return await updateDoc(playerInfoRef,{
  //     stats
  //   })
  // }

  addPlayerStats(stats: any): Observable<any> {
    return new Observable((observer) => {
      try {
        addDoc(collection(this.db, "player_stats"), stats)
          .then(docRef => {
            observer.next(docRef)
          })
      } catch (e) {
      }
    })
  }

  async updatePlayerStats(stats_id: string, info: any) {
    const playerInfoRef = doc(this.db, "player_stats", stats_id);
    return await updateDoc(playerInfoRef, info)
  }


  //----------------------------------------


  // async getPlayerStats(player_id:string , match_id:string) {
  //   const q = query(collection(this.db, "player_stats"), where("player_id", "==", player_id), where("match_id", "==", match_id));
  //   return( await (await getDocs(q)).docs.map( data => ( {id:data.id,name:data.data()})))
  // }

  createMatch(match: any): Observable<any> {
    return new Observable((observer) => {
      try {
        addDoc(collection(this.db, "matches"), match)
          .then(docRef => {
            observer.next(docRef)
          })
      } catch (e) {
      }
    })
  }

  createTournament(name: string): Observable<any> {
    return new Observable((observer) => {
      try {
        addDoc(collection(this.db, "tournaments"), {
          name: name
        })
          .then(docRef => {
            observer.next(docRef)
          })
      } catch (e) {
      }
    })
  }

  addTeam(team: any): Observable<any> {
    return new Observable((observer) => {
      try {
        addDoc(collection(this.db, "teams"), team)
          .then(docRef => {
            observer.next(docRef)
          })
      } catch (e) {
      }
    })

  }

  addPlayer(player_info: any) {
    return new Observable((observer) => {
      addDoc(collection(this.db, "players"), player_info).then(docRef => {
        observer.next(docRef)
      })
    })
  }

  async getTournaments() {
    return (await (await getDocs(collection(this.db, "tournaments"))).docs.map(data => ({ id: data.id, name: data.data()['name'] })))
  }

  async getTournamentTeams(tournament_id: string) {
    const q = query(collection(this.db, "teams"), where("tournament_id", "==", tournament_id));
    return (await (await getDocs(q)).docs.map(data => ({ id: data.id, name: data.data()['name'] })))
  }

  async getAllTeams() {
    return (await (await getDocs(collection(this.db, "teams"))).docs.map(data => ({ id: data.id, name: data.data()['name'] })))
  }

  async getTournamentMatches(tournament_id: string) {
    const q = query(collection(this.db, "matches"), where("tournament_id", "==", tournament_id));
    return (await (await getDocs(q)).docs.map(data => ({ id: data.id, data: data.data() })))
  }

  async getAllMatches() {
    const q = query(collection(this.db, "matches"));
    return (await (await getDocs(q)).docs.map(data => ({ id: data.id, data: data.data() })))
  }

  async deletePlayer(player_id: string) {
    await deleteDoc(doc(this.db, "players", player_id));
  }

  async getPlayersByTeam(team_id: string) {
    const q = query(collection(this.db, "players"), where("team_id", "==", team_id));
    return (await (await getDocs(q)).docs.map(data => ({ id: data.id, data: data.data() })))
  }




  /*
    User Services
  */

  async createUser(user: any) {
    return await addDoc(collection(this.db, "users"), user)
  }

  async getUser(email: string, password: string) {
    const q = query(collection(this.db, "users"), where("email", "==", email), where("password", "==", password));
    return (await (await getDocs(q)).docs.map(data => ({ id: data.id })))
  }

  async getTeamPlayerTournamentStats(team_id: any, tournament_id: any) {
    try {
      const players_query = query(collection(this.db, "players"), where("current_team_id", "==", team_id));
      const playerSnapShot = await getDocs(players_query)
      const players: any = [];
      playerSnapShot.forEach(doc => {
        players.push({ id: doc.id, ...doc.data() });
      });
      for (const player of players) {
        const stats_query = query(collection(this.db, "player_stats"), where("player_id", "==", player.id), where("tournament_id", "==", tournament_id));
        let statSnapShot = await getDocs(stats_query)
        let stats: any = []
        statSnapShot.forEach(doc => {
          stats.push({ id: doc.id, ...doc.data() });
        });
        player.stats = stats;
      }
      return players;
    } catch (error) {
    }
  }


  async showLoading() {
    this.loading = await this.loadingCtrl.create({});
    this.loading.present();
  }
  dismissLoading() {
    if(this.loading != null && this.loading != undefined){
      this.loading.dismiss()
    }
  }
}
