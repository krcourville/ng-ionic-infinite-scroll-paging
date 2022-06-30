import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Person {
  name: string;
}

export interface GetPeopleResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}

@Injectable()
export class SwapiClient {
  constructor(private httpClient: HttpClient) {}

  getPeople(page = 1): Observable<GetPeopleResponse> {
    const url = 'https://swapi.dev/api/people';
    const params = new HttpParams().append('page', page);
    return this.httpClient.request<GetPeopleResponse>('GET', url, { params });
  }
}
