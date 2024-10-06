import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { NavigationService } from '../shared/interfaces/navigation/navigation.service';

@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})
export class DashBoardComponent {
  currentPageRout: string = '';

  constructor(private navService: NavigationService) { }

  ngOnInit() {
    this.navService.addCurrentPageToNavList(this.currentPageRout);
  }

  handlePrevNavAction() {
    console.log(this.navService.goToPrevPage(this.currentPageRout));
  }
}
