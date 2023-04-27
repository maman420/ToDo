import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import todoItem from 'src/app/models/todoItem.model';
import { ToDoService } from 'src/app/services/to-do.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  taskList: todoItem[] = [];

  constructor(private todoService: ToDoService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.todoService.getAll().subscribe((items)=>{
      this.taskList = items;
    })
  }

  delete(id: number) {
    this.todoService.delete(id).subscribe();
  }
}
