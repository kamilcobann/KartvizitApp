import { Inject, Injectable, inject } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Card } from '../models/card';
@Injectable({
  providedIn: 'root'
})
export class CardService {

  cards!:Card[];
  filteredCards!:Card[];

  constructor(
    private http:HttpClient,
    @Inject('apiUrl') private apiUrl:string
    ) { }

  getCards():void
  {
    this.http.get<Card[]>(this.apiUrl+'/cards').subscribe((response: Card[])=>{
      this.cards = this.filteredCards = response;
    })
  }
  addCard(card:Card):Observable<any>
  {
    return this.http.post(this.apiUrl+"/cards",card)
  }

  updateCard(card:Card,cardId:number):Observable<any>
  {
    return this.http.put(this.apiUrl+"/cards/"+cardId,card)
  }

  
  deleteCard(cardId:number):Observable<any>
  {
    return this.http.delete(this.apiUrl+"/cards/"+cardId)
  }
}
