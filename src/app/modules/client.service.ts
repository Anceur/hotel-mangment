import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, getDoc, getDocs, DocumentSnapshot, QuerySnapshot, DocumentData, Query, query, orderBy,where,updateDoc, arrayUnion } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../models/client';
import { tap } from 'rxjs/operators';
import { Recommendation } from '../models/recommendation';




@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private collectionName = 'clients';

  constructor(private firestore: Firestore) {}


  async getClients(): Promise<any[]> {
    const q = query(collection(this.firestore, this.collectionName), orderBy('nom'));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc:any) => {
      return { id: doc.id, ...doc.data() };
    });
  }

  async getClientById(id: string): Promise<Client | undefined> {
    const q = query(
      collection(this.firestore, this.collectionName),
      where('__name__', '==', id)
    );

    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const docSnap = snapshot.docs[0];
      return { id: docSnap.id, ...docSnap.data() } as Client;
    } else {
      return undefined;
    }
  }
  addClient(client: Client): Observable<Client> {
    const clientCollection = collection(this.firestore, this.collectionName);
    return from(addDoc(clientCollection, client)).pipe(
      map((docRef: any) => {
        return { ...client, id: docRef.id };
      })
    );
  }
  addRecommendationToClient(clientId: string, rec: Recommendation) {
    const clientRef = doc(this.firestore, `clients/${clientId}`);
    return from(updateDoc(clientRef, {
      recommendations: arrayUnion(rec)
    }));
  }


  searchClients(term: string): Observable<{ nom: string; id: string }[]> {
    const clientsRef = collection(this.firestore, this.collectionName);
    return from(getDocs(clientsRef)).pipe(
      map((snapshot: QuerySnapshot<DocumentData>) => {
        const results: { nom: string; id: string }[] = [];
        snapshot.forEach((docSnap: DocumentSnapshot<DocumentData>) => {
          const data = docSnap.data() as Client;
          const fullName = `${data.prenom} ${data.nom}`.toLowerCase();
          if (fullName.includes(term.toLowerCase())) {
            results.push({ nom: fullName, id: docSnap.id });
          }
        });
        return results;
      })
    );
  }



}
