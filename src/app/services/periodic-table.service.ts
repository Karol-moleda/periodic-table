import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PeriodicTableElement } from '../models/elements-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PeriodicTableService {
  // private apiUrl = 'elements.json';
  private apiUrl = 'http://localhost:3000/elements' 
  

  constructor(private http: HttpClient) {}

  getElements() {
    return this.http.get<PeriodicTableElement[]>(this.apiUrl);
  }

  updateElement(element: PeriodicTableElement): Observable<PeriodicTableElement> {
    return this.http.put<PeriodicTableElement>(`${this.apiUrl}/${element.position}`, element);
  }
}
