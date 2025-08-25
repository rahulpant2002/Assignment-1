import { Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common'; // Import CommonModule and DatePipe
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dash-board',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dash-board.html',
  styleUrl: './dash-board.scss', standalone: true
})

export class DashBoard implements OnInit {
  
  taskList: any[] = [];
  totalTasks = 0;
  pendingTasks = 0;
  inProgressTasks = 0;
  completedTasks = 0;

  searchText = '';
  selectedStatus = 'All Status';
  selectedPriority = 'All Priorities';
  filteredTaskList: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadTasks();
    this.applyFilters();
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


  applyFilters(): void {
    let filteredData = this.taskList;
      
    const searchText = this.searchText.toLowerCase();
    if(searchText == '' && this.selectedStatus === 'All Status' && this.selectedPriority === 'All Priorities'){
      this.filteredTaskList = this.taskList;
      return;
    }

    if (searchText) {
      filteredData = filteredData.filter(task =>
        task.taskTitle.toLowerCase().includes(searchText)
      );
    }

    // 2. Filter by Status
    if (this.selectedStatus !== 'All Status') {
      filteredData = filteredData.filter(task => task.status === this.selectedStatus);
    }

    // 3. Filter by Priority
    if (this.selectedPriority !== 'All Priorities') {
      filteredData = filteredData.filter(task => task.priority === this.selectedPriority);
    }

    // Update the list that is displayed in the template
    this.filteredTaskList = filteredData;
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
