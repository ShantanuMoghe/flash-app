import { Component, OnDestroy } from '@angular/core';
import { NavigationService } from '../shared/interfaces/navigation/navigation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviseVocabService } from './revise-vocab-service/revise-vocab.service';
import { HttpClientModule } from '@angular/common/http';
import _ from 'lodash';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-revise-vocab',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './revise-vocab.component.html',
  styleUrl: './revise-vocab.component.css',
  providers: [ReviseVocabService]
})
export class ReviseVocabComponent implements OnDestroy {
  chapterData: any;
  finalShuffledOptions: any[] = [];
  currentQuestionData: any;
  isShowHint: boolean = false;
  incorrectWords: any[] = [];
  allVisited: boolean = false;
  phase: 'phase1' | 'phase2' = 'phase1';
  currentQuestion: any = 0;
  selectedOption: string = '';
  showCorrectAnswer: boolean = false; // Variable to trigger correct answer highlight
  reps: number|string = '1';
  isShowPopup: boolean = false;
  isBattleOver: boolean = false;
  mode: number | string = 0; //for Normal vocab, set 1 for kanji
  vocabPracticeMode: number = 0;
  previousData: any;

  constructor(private navService: NavigationService,
    private router: Router, private routeData: ActivatedRoute,
    private reviseService: ReviseVocabService) { }
  currentPageRout: string = 'revise-vocab-card';

  ngOnInit() {
    this.currentPageRout = this.router.url;
    this.routeData.queryParams.subscribe(res => {
      this.vocabPracticeMode = res['mode'];
      this.reviseService.getChapterData(res['chapterNumber']).subscribe(chapterData => {
        this.chapterData = chapterData;
        let count = 0;
        let vocabText = '';
        let vocabMeaning = '';
        for (let el of this.chapterData.vocabList) {
          el['index'] = count;
          el['score'] = this.reps;
          if (res['mode'] === '1') {
            vocabText = el['vocabText'];
            vocabMeaning = el['vocabMeaning'];
            el['vocabText'] = vocabMeaning;
            el['vocabMeaning'] = vocabText
          }
          count++;
        }
        this.loadQuestion();
        this.loadOptions();
      });
    });
    this.navService.addCurrentPageToNavList(this.currentPageRout);
  }

  loadOptions() {
    if (this.currentQuestionData.index === -1 && this.currentQuestionData.score === 0) {
      return;
    }
    const filteredArr = _.cloneDeep(this.chapterData.vocabList.filter((el: any) => el.index != this.currentQuestionData.index));
    const correctArr = _.cloneDeep(this.chapterData.vocabList.filter((el: any) => el.index === this.currentQuestionData.index));
    const shuffledOptions = this.durstenfeldShuffle([...this.durstenfeldShuffle(filteredArr).slice(0, 3), ...correctArr]);
    this.finalShuffledOptions = shuffledOptions.map(el => +this.mode >= 1 ? (this.mode===2 ? el.vocabMeaning : el.vocabText) : el.vocabMeaning);
  }

  durstenfeldShuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  loadQuestion(questionNumber: number = 0) {
    if (this.phase === 'phase1') {
      if (this.chapterData.vocabList.length === 0) {
        console.error('No vocab data found');
        return;
      }
      if (this.incorrectWords.length > 0 && Math.random() < 0.3) {
        const randomIndex = Math.floor(Math.random() * this.incorrectWords.length);
        this.currentQuestionData = this.incorrectWords[randomIndex];
        this.currentQuestion = this.currentQuestionData.index;
      } else {
        const currentQuestion = this.chapterData.vocabList.filter((el: any) => el.index === questionNumber);
        if (currentQuestion.length > 0) {
          this.currentQuestionData = currentQuestion[0];
          this.currentQuestionData.isVisited = true;
        }
        if (questionNumber >= this.chapterData.vocabList.length - 1 && this.incorrectWords.length === 0) {
          this.allVisited = true;
          this.phase = 'phase2';
        }
      }
      this.currentQuestion = questionNumber;
    } else if (this.phase === 'phase2') {
      const wordsWithScore = this.chapterData.vocabList.filter((el: any) => el.score > 0);
      if (wordsWithScore.length > 0) {
        const randomIndex = Math.floor(Math.random() * wordsWithScore.length);
        this.currentQuestionData = wordsWithScore[randomIndex];
      } else {
        this.currentQuestionData = { vocabText: '', vocabMeaning: 'All words mastered!', index: -1, score: 0 };
        this.isShowPopup = true;
        this.isBattleOver = true;
        this.triggerConfetti();
      }
      this.currentQuestion = this.currentQuestionData.index;
    }
  }

  handleLoadQuestion() {
    if (this.currentQuestionData.index !== -1) {
      this.currentQuestion = this.currentQuestionData.index + 1;
      this.loadQuestion(this.currentQuestion);
      this.loadOptions();
      this.isShowHint = false;
      this.selectedOption = '';
      this.showCorrectAnswer = false; // Reset the correct answer display
    }
  }

  handlePrevNavAction() {
    if(this.navService.goToPrevPage(this.currentPageRout)){
      this.router.navigate([`${this.navService.goToPrevPage(this.currentPageRout)}`]);
    } else {
      this.router.navigate([`revise-vocab`]);
    }
  }

  checkOption(option: string) {
    this.selectedOption = option;
    if ((+this.mode === 0 || +this.mode === 2) && this.currentQuestionData.vocabMeaning === option) {
      this.currentQuestionData.score = Math.max(0, this.currentQuestionData.score - 1);
      this.incorrectWords = this.incorrectWords.filter((word: any) => word.index !== this.currentQuestionData.index);
      this.handleLoadQuestion();
    } else {
      this.isShowHint = true;
      this.showCorrectAnswer = true; // Show correct answer when wrong option is selected
      if (!this.incorrectWords.some(word => word.index === this.currentQuestionData.index)) {
        this.incorrectWords.push(this.currentQuestionData);
      }
    }
    if(+this.mode === 1) {
      if (this.currentQuestionData.vocabText === option) {
        this.currentQuestionData.score = Math.max(0, this.currentQuestionData.score - 1);
        this.incorrectWords = this.incorrectWords.filter((word: any) => word.index !== this.currentQuestionData.index);
        this.handleLoadQuestion();
      } else {
        this.isShowHint = true;
        this.showCorrectAnswer = true; // Show correct answer when wrong option is selected
        if (!this.incorrectWords.some(word => word.index === this.currentQuestionData.index)) {
          this.incorrectWords.push(this.currentQuestionData);
        }
      }
    }
  }

  handleLoadOnHint() {
    this.handleLoadQuestion();
  }

  openPopUp() {
    this.isShowPopup = true;
  }

  closePopup(reset: boolean = false) {
    this.isShowPopup = false;
    if (!reset) {
      this.mode = '0';
      this.reps = '1';
      if (this.previousData && this.previousData.vocabList.length > 0) {
        this.chapterData = this.previousData;
      }
      return;
    } else if (+this.mode >= 1) {
      this.previousData = _.cloneDeep(this.chapterData);
      this.chapterData.vocabList = this.chapterData.vocabList.filter((el: any) => el.vocabKanji);
    }
    let count = 0;
    for (let el of this.chapterData.vocabList) {
      el['index'] = count;
      el['score'] = this.reps;
      count++;
    }
    this.loadQuestion();
    this.loadOptions();
  }

  triggerConfetti() {
    const confettiElement = document.getElementById('confetti');
    if (confettiElement) {
      confettiElement.classList.add('active');
    }
  }

  generateRandomStyle() {
    const size = Math.floor(Math.random() * 10) + 5; // Size between 5px and 15px
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random hue for color
    const left = `${Math.random() * 100}vw`; // Random horizontal position
    const delay = `${Math.random() * 2}s`; // Random animation delay
    const duration = `${Math.random() * 2 + 3}s`; // Random duration between 3s to 5s

    return {
      'width': `${size}px`,
      'height': `${size}px`,
      'background-color': color,
      'left': left,
      'animation-delay': delay,
      'animation-duration': duration,
    };
  }

  ngOnDestroy() {
    this.chapterData = undefined;
  }

  showMode(modeNum: number) {
    if (modeNum === 0) {
      return 'Normal Vocab';
    }
    if (modeNum === 1) {
      return 'Kanji あ';
    }
    if (modeNum === 2) {
      return 'Kanji'
    }
    return '';
  }
}
