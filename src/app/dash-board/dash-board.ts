import { Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common'; // Import CommonModule and DatePipe
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dash-board',
  imports: [CommonModule, FormsModule],
  templateUrl: './dash-board.html',
  styleUrl: './dash-board.scss', standalone: true
})

export class DashBoard implements OnInit {
  
  taskList: any[] = [];
  totalTasks = 0;
  pendingTasks = 0;
  inProgressTasks = 0;
  completedTasks = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    try {
      const storedTasks = localStorage.getItem('taskList');
      if (storedTasks) {
        this.taskList = JSON.parse(storedTasks);
        this.calculateTaskCounts();
      }
    } catch (e) {
      console.error("Error parsing tasks from localStorage", e);
      this.taskList = []; 
    }
  }

  saveTasks(): void {
    try {
      localStorage.setItem('taskList', JSON.stringify(this.taskList));
      this.calculateTaskCounts();
    } catch (e) {
      console.error("Error saving tasks to localStorage", e);
    }
  }

  calculateTaskCounts(): void {
    this.totalTasks = this.taskList.length;

    this.pendingTasks = this.taskList.filter(task => task.status === 'Pending').length;
    this.inProgressTasks = this.taskList.filter(task => task.status === 'In Progress').length;
    this.completedTasks = this.taskList.filter(task => task.status === 'Completed').length;
  }

  goBackHome(): void {
    this.router.navigate(['/']);
  }

  deleteItem(i:number): void {
    this.taskList.splice(i, 1);
    this.saveTasks();
  }
}
