import { Component } from '@angular/core';
import { IChapter } from '../shared/interfaces/IChapter';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../shared/interfaces/navigation/navigation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-chapter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-chapter.component.html',
  styleUrl: './select-chapter.component.css'
})
export class SelectChapterComponent {
  chapterList?: IChapter[];
  currentPageRout: string = 'revise-vocab'
  constructor(private navService: NavigationService, private router: Router) { }
  ngOnInit() {
    this.navService.addCurrentPageToNavList(this.currentPageRout)
    this.chapterList = [
      {
        chapterNumber: 1,
        vocabList: [
          {
            vocab: 'test 1',
            meaning: 'test'
          }
        ]
      },
      {
        chapterNumber: 2,
        vocabList: [
          {
            vocab: 'test 1',
            meaning: 'test'
          }
        ]
      },
      {
        chapterNumber: 2,
        vocabList: [
          {
            vocab: 'test 1',
            meaning: 'test'
          }
        ]
      },
      {
        chapterNumber: 3,
        vocabList: [
          {
            vocab: 'test 1',
            meaning: 'test'
          }
        ]
      },
      {
        chapterNumber: 4,
        vocabList: [
          {
            vocab: 'test 1',
            meaning: 'test'
          }
        ]
      },
      {
        chapterNumber: 5,
        vocabList: [
          {
            vocab: 'test 1',
            meaning: 'test'
          }
        ]
      },
      {
        chapterNumber: 6,
        vocabList: [
          {
            vocab: 'test 1',
            meaning: 'test'
          }
        ]
      },
      {
        chapterNumber: 7,
        vocabList: [
          {
            vocab: 'test 1',
            meaning: 'test'
          }
        ]
      }
    ]
  }

  handleSelectChapter(chapterNumber: number) {
    this.router.navigate(['/revise-vocab-card'], { queryParams: { chapterNumber } })
  }
  /**
   * Takes to home page.
   * @memberof SelectChapterComponent
   */
  handlePrevNavAction() {
    this.router.navigate([''])
  }
}
