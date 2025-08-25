import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss', standalone: true
})

export class Home {
  taskForm : FormGroup;
  isSubmitted = false;

  constructor(private router : Router) {
    this.taskForm = new FormGroup({
      taskTitle : new FormControl('', [Validators.required, Validators.minLength(3)]),
      dueDate : new FormControl('', Validators.required),
      description : new FormControl(''),
      priority : new FormControl('', Validators.required)
    });
  }

  onSubmit() {
  if (this.taskForm.valid) {
    let taskList = [];

    try {
      const existingTasksString = localStorage.getItem('taskList');
      existingTasksString ? taskList = JSON.parse(existingTasksString) : taskList = [];
    } catch (e) {
      console.error("Error parsing taskList from localStorage", e);
      taskList = [];
    }

    taskList.push(this.taskForm.value);
    localStorage.setItem('taskList', JSON.stringify(taskList));
    
    this.isSubmitted = true;
    this.taskForm.reset();
    console.log('Task added successfully!');

  } else {
    console.log("Form is not valid");
  }
}
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

}
