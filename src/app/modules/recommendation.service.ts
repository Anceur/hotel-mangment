import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, getDoc, getDocs, DocumentSnapshot, QuerySnapshot, DocumentData, Query, query, orderBy,where } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../models/client';
import { Recommendation } from '../models/recommendation';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  private collectionName = 'recommendations';

  constructor(private firestore: Firestore) {}

  async getRecommendations(): Promise<any[]> {
    const q = query(collection(this.firestore, this.collectionName));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc: any) => {
      return { id: doc.id, ...doc.data() } as Recommendation;
    });
  }

}
