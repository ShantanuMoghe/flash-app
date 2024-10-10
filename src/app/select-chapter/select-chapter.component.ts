import { Component } from '@angular/core';
import { IChapter } from '../shared/interfaces/IChapter';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../shared/interfaces/navigation/navigation.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-chapter',
  standalone: true,
  imports: [CommonModule, CommonModule, FormsModule],
  templateUrl: './select-chapter.component.html',
  styleUrl: './select-chapter.component.css'
})
export class SelectChapterComponent {
  chapterList?: IChapter[];
  currentPageRout: string = 'revise-vocab'
  isShowPopup: any;
  mode: any = 0;
  chapterNumber: number = 1;
  constructor(private navService: NavigationService, private router: Router) { }
  ngOnInit() {
    this.navService.addCurrentPageToNavList(this.currentPageRout)
    this.chapterList = [
      {
        chapterNumber: 1,
        chapterName: 'New Friends',
        imageUrl: 'assets/chapter-1.png',
        vocabList: [
          {
            vocab: 'test 1',
            meaning: 'test'
          }
        ]
      },
      {
        chapterNumber: 2,
        chapterName: 'Shopping',
        imageUrl: 'assets/chapter-2.png',
        vocabList: [
          {
            vocab: 'test 1',
            meaning: 'test'
          }
        ]
      },
      {
        chapterNumber: 3,
        chapterName: 'Making a Date',
        imageUrl: 'assets/chapter-3.png',
        vocabList: [
          {
            vocab: 'test 1',
            meaning: 'test'
          }
        ]
      },
      {
        chapterNumber: 4,
        chapterName: 'The First Date',
        imageUrl: 'assets/chapter-4.png',
        vocabList: [
          {
            vocab: 'test 1',
            meaning: 'test'
          }
        ]
      },
      {
        chapterNumber: 5,
        chapterName: 'A Trip to Okinawa',
        imageUrl: 'assets/chapter-5.png',
        vocabList: [
          {
            vocab: 'test 1',
            meaning: 'test'
          }
        ]
      },
      {
        chapterNumber: 6,
        chapterName: 'A Day in Robert’s Life',
        imageUrl: 'assets/chapter-6.png',
        vocabList: [
          {
            vocab: 'test 1',
            meaning: 'test'
          }
        ]
      },
      {
        chapterNumber: 7,
        chapterName: 'Eating Out',
        imageUrl: 'assets/chapter-7.png',
        vocabList: [
          {
            vocab: 'test 1',
            meaning: 'test'
          }
        ]
      },
      {
        chapterNumber: 8,
        chapterName: 'Barbecue',
        imageUrl: 'assets/chapter-8.png',
        vocabList: [
          {
            vocab: 'test 1',
            meaning: 'test'
          }
        ]
      },
      {
        chapterNumber: 9,
        chapterName: 'Kabuki',
        imageUrl: 'assets/chapter-9.png',
        vocabList: [
          {
            vocab: 'test 1',
            meaning: 'test'
          }
        ]
      },
      {
        chapterNumber: 10,
        chapterName: 'Winter Vacation Plans',
        imageUrl: 'assets/chapter-10.png',
        vocabList: [
          {
            vocab: 'test 1',
            meaning: 'test'
          }
        ]
      },
      {
        chapterNumber: 11,
        chapterName: 'After the Vacation',
        imageUrl: 'assets/chapter-11.png',
        vocabList: [
          {
            vocab: 'test 1',
            meaning: 'test'
          }
        ]
      },
      {
        chapterNumber: 12,
        chapterName: 'Feeling Ill',
        imageUrl: 'assets/chapter-12.png',
        vocabList: [
          {
            vocab: 'test 1',
            meaning: 'test'
          }
        ]
      }
    ]
  }

  opendPopUp(chapterNumber: number) {
    this.chapterNumber = chapterNumber
    this.isShowPopup = true
  }

  handleSelectChapter(chapterNumber: number) {
    this.router.navigate(['/revise-vocab-card'], { queryParams: { chapterNumber: chapterNumber, mode: this.mode } })
  }

  /**
   * Takes to home page.
   * @memberof SelectChapterComponent
   */
  handlePrevNavAction() {
    this.router.navigate(['']);
  }

  closePopup(isConfirm: boolean = false) {
    this.isShowPopup = false;
    if (!isConfirm) return;
    this.handleSelectChapter(this.chapterNumber)

  }
}
