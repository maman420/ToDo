import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import todoItem from 'src/app/models/todoItem.model';
import { ToDoService } from 'src/app/services/to-do.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  task: todoItem = new todoItem();
  taskId: string = "";

  constructor(private todoService: ToDoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id'] != undefined) {
        this.taskId = params['id'];
        this.todoService.getTask(this.taskId).subscribe((data) => {
          this.task = data;
        });
      }
    });
  }

  onSubmitHandler() {
    if (this.taskId == "") {
      this.todoService.post(this.task).subscribe();
    } else {
      this.todoService.put(this.taskId, this.task).subscribe();
    }
    this.router.navigate(['/'], { queryParams: { refresh: true } });
  }
}
