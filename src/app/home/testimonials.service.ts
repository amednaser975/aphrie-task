import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Testimonials } from '../_models/testimonials';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestimonialsService {

  constructor(public _HttpClient: HttpClient) { }

  getTestimonials(): Observable<any> {
    return this._HttpClient.get<any>('https://reqres.in/api/users?page=1');
  }
}
