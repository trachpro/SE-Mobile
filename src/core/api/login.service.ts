import { MainApiService } from './../util/main-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '../util/storage.service';


@Injectable()
export class LoginService {

  constructor(
    private mainApi: MainApiService,
    private storageService: StorageService,
  ) { }

  login(params): Observable<any> {

    return this.mainApi.post('login', params);
  }


  refreshKey(): Observable<any> {

    return new Observable( observer => {

      this.mainApi.get('refreshToken?token='+this.storageService.get('token')).subscribe( data => {

        this.storageService.set('token',data.token);
        
        observer.next();
        observer.complete();
      }, error => {

        observer.error();
        observer.complete();
      })
    })
  }
}
