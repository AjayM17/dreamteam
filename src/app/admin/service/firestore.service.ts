import { Injectable } from '@angular/core';
// import { FirebaseFirestore } from '@capacitor-firebase/firestore';
import { FirebaseApp, initializeApp } from "firebase/app";
import { environment } from 'src/environments/environment';
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, getFirestore, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  app: FirebaseApp | undefined
  db: any
  constructor() { }
  initializeFirebase() {
    this.app = initializeApp(environment.firebase)
    this.db = getFirestore(this.app)
    //  this.addPlayer()

  }

   addTeam(name: string):Observable<any> {
    return new Observable( (observer) => {
      try {
        addDoc(collection(this.db, "teams"), {
          name: name
        })
        .then( docRef => {
          observer.next(docRef)
        })
      } catch (e) {
      }
    })

  }

   addPlayer(player_info:any) {
    return new Observable((observer) => {
       addDoc(collection(this.db, "players"), player_info).then( docRef => {
        observer.next(docRef)
      })
    })
 
  }

  async getAllTeams() {
    return( await (await getDocs(collection(this.db, "teams"))).docs.map( data => ( {id:data.id,name:data.data()['name']})))
  }

  async getAllPlayers() {
    return( await (await getDocs(collection(this.db, "players"))).docs.map( data => ( {id:data.id,data:data.data()})))
  }

  async updatePlayerInfo(player_id:string, info:any){
    const playerInfoRef = doc(this.db, "players", player_id);
    return await updateDoc(playerInfoRef,info)
  }

  async deletePlayer(player_id:string){
    await deleteDoc(doc(this.db, "players", player_id));
  }

  async getPlayersByTeam(team_id:string){
   const q = query(collection(this.db, "players"), where("team_id", "==", team_id));
  return(await (await getDocs(q)).docs.map(data => ({id:data.id,data:data.data()})))
  }
}
