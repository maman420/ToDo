import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import todoItem from '../models/todoItem.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  url = "https://localhost:7281/ToDo/";

  constructor(private http: HttpClient) { }

  getTask(id: string){
    return this.http.get<todoItem>(this.url + id);
  } 
  
  getAll(){
    return this.http.get<todoItem[]>(this.url);
  }

  post(todoItem: todoItem){
    return this.http.post<todoItem>(this.url, todoItem);
  }

  put(id: string, todoItem: todoItem){
    return this.http.put(this.url + id, todoItem);
  }

  delete(id: number){
    return this.http.delete(this.url + id);
  }
}
