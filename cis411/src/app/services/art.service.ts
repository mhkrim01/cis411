import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Art } from '../models/art.model';
import { environment } from 'src/environments/environment';
import { SearchCriteria } from '../models/search-criteria.model';

@Injectable()
export class ArtService {
    private _httpClient: HttpClient;
    private defaultSearchCriteria: SearchCriteria = new SearchCriteria();
    public searchCriteria: BehaviorSubject<SearchCriteria> = new BehaviorSubject<SearchCriteria>(this.defaultSearchCriteria);

    constructor(httpClient: HttpClient) {
        this._httpClient = httpClient;
    }

    getArtByClassificationCulture(searchCriteria: SearchCriteria, pageNumber: number):Observable<any>{
        return this._httpClient
        .get<any>(`${environment.baseHarvardApi}object?apikey=${environment.harvardApiKey}&q=culture:${searchCriteria.Culture}&classification=${searchCriteria.Classification}&period=${searchCriteria.Period}&size=20&page=${pageNumber}`);
    }

    getArtByObjectNumber(objectNumber: string){
        this._httpClient
        .get<any>(`${environment.baseHarvardApi}object?apikey=${environment.harvardApiKey}&objectnumber=${objectNumber}`);
    }

    getClassifications(page: number){
        return this._httpClient
        .get<any>(`${environment.baseHarvardApi}classification?apikey=${environment.harvardApiKey}&size=300&page=${page}`);
    }

    getCultures(page: number){
        return this._httpClient
        .get<any>(`${environment.baseHarvardApi}culture?apikey=${environment.harvardApiKey}&size=300&page=${page}`)
    }

    getPeriods(page: number){
        return this._httpClient
        .get<any>(`${environment.baseHarvardApi}period?apikey=${environment.harvardApiKey}&size=300&page=${page}`);
    }
}