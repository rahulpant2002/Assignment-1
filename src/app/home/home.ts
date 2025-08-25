import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss', standalone: true
})

export class Home implements OnInit {
  taskForm : FormGroup;
  isSubmitted = false;
  todayDate: string;
  tasksToday = 0;
  inProgress = 0;
  completed = 0;

  ngOnInit(): void {
    this.calculateParameters(); 
  }

  constructor(private router : Router) {
    this.todayDate = new Date().toISOString().split('T')[0];
    this.taskForm = new FormGroup({
      taskTitle : new FormControl('', [Validators.required, Validators.minLength(3)]),
      dueDate : new FormControl('', Validators.required),
      description : new FormControl(''),
      priority : new FormControl(null, Validators.required),
      status : new FormControl('Pending')
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

  calculateParameters(): void {
    try {
      const storedTasks = localStorage.getItem('taskList');
      if (storedTasks) {
        const taskList = JSON.parse(storedTasks);
        this.tasksToday = taskList.filter((task: { dueDate: string; }) => task.dueDate === this.todayDate).length;
        this.inProgress = taskList.filter((task: { status: string; }) => task.status === 'In Progress').length;
        this.completed = taskList.filter((task: { status: string; }) => task.status === 'Completed').length;
      }
    } catch (e) {
      console.error("Error parsing tasks from localStorage", e);
      this.tasksToday = 0; 
      this.inProgress = 0;
      this.completed = 0;
    }
  }

}
