import { Component } from '@angular/core';
import { NavigationService } from '../shared/interfaces/navigation/navigation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviseVocabService } from './revise-vocab-service/revise-vocab.service';
import { HttpClientModule } from '@angular/common/http';
import _ from 'lodash';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-revise-vocab',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './revise-vocab.component.html',
  styleUrl: './revise-vocab.component.css',
  providers: [ReviseVocabService]
})
export class ReviseVocabComponent {
  chapterData: any;
  finalShuffledOptions: any[] = [];
  currentQuestionData: any;
  isShowHint: boolean = false;
  incorrectWords: any[] = []; // Holds words that were answered incorrectly
  allVisited: boolean = false; // Controls when to enter Phase 2
  phase: 'phase1' | 'phase2' = 'phase1'; // Tracks current phase (either phase1 or phase2)
  currentQuestion: any = 0;

  constructor(private navService: NavigationService,
    private router: Router, private routeData: ActivatedRoute,
    private reviseService: ReviseVocabService) { }
  currentPageRout: string = 'revise-vocab-card'

  ngOnInit() {
    this.currentPageRout = this.router.url;
    this.routeData.queryParams.subscribe(el => {
      this.reviseService.getChapterData(el['chapterNumber']).subscribe(chapterData => {
        this.chapterData = chapterData;
        let count = 0;
        for (let el of this.chapterData.vocabList) {
          el['index'] = count;
          el['score'] = 10;
          count++;
        }
        this.loadQuestion();
        this.loadOptions();
        console.log(JSON.stringify(this.chapterData.vocabList));
      });
    });
    this.navService.addCurrentPageToNavList(this.currentPageRout);

  }

  /**
   * @important This is main code for generating random options.
   * @param {number} [currentIndex=1]
   * @memberof ReviseVocabComponent
   */
  loadOptions() {
    const filteredArr = _.cloneDeep(this.chapterData.vocabList.filter((el: any) => el.index != this.currentQuestion));
    const correctArr = _.cloneDeep(this.chapterData.vocabList.filter((el: any) => el.index === this.currentQuestion));
    const shuffledOptions = this.durstenfeldShuffle([...this.durstenfeldShuffle(filteredArr).slice(0, 3), ...correctArr])
    this.finalShuffledOptions = shuffledOptions.map(el => el.vocabMeaning);
  }

  /**
   * Algorithm to shuffle array.
   * @template T
   * @param {T[]} array
   * @return {*}  {T[]}
   * @memberof ReviseVocabComponent
   */
  durstenfeldShuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // loadQuestion(questionNumber: number = 0) {
  //   const currentQuestion = this.chapterData.vocabList.filter((el: any) => el.index === questionNumber);
  //   for(let el of this.chapterData.vocabList){
  //     if(el.index === questionNumber){
  //       el['isVisited'] = true;
  //     }
  //   }
  //   this.currentQuestionData = currentQuestion[0];
  // }

  /**
  * Loads the next question in the list or selects a random question in Phase 2.
  * @param {number} [questionNumber=0]
  * @memberof ReviseVocabComponent
  */
  loadQuestion(questionNumber: number = 0) {
    if (this.phase === 'phase1') {
      // Phase 1: Sequential with random incorrect repeats
      if (this.incorrectWords.length > 0 && Math.random() < 0.3) {
        // 30% chance to repeat an incorrect word in Phase 1
        const randomIndex = Math.floor(Math.random() * this.incorrectWords.length);
        this.currentQuestion = randomIndex;
        this.currentQuestionData = this.incorrectWords[randomIndex];
      } else {
        // Continue in sequential order
        const currentQuestion = this.chapterData.vocabList.filter((el: any) => el.index === questionNumber);
        if (currentQuestion.length > 0) {
          this.currentQuestionData = currentQuestion[0];
          this.currentQuestionData.isVisited = true; // Mark word as visited
        }

        // Check if we visited all words
        if (questionNumber >= this.chapterData.vocabList.length - 1) {
          this.allVisited = true;
          this.phase = 'phase2'; // Move to Phase 2
        }
      }
      this.currentQuestion = questionNumber;
    } else if (this.phase === 'phase2') {
      // Phase 2: Random repetition of words with score > 0
      const wordsWithScore = this.chapterData.vocabList.filter((el: any) => el.score > 0);
      if (wordsWithScore.length > 0) {
        const randomIndex = Math.floor(Math.random() * wordsWithScore.length);
        this.currentQuestionData = wordsWithScore[randomIndex];
      } else {
        // All words mastered
        this.currentQuestionData = { vocabText: '', vocabMeaning: 'All words mastered!', index: -1, score: 0 };
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
    }
  }

  handlePrevNavAction() {
    this.router.navigate([`${this.navService.goToPrevPage(this.currentPageRout)}`])
  }

  checkOption(option: string) {
    if (this.currentQuestionData.vocabMeaning === option) {
      this.currentQuestionData.score = Math.max(0, this.currentQuestionData.score - 1); // Reduce score by 1
      this.incorrectWords = this.incorrectWords.filter((word: any) => word.index !== this.currentQuestionData.index); // Remove from incorrectWords list
      this.handleLoadQuestion();
    } else {
      this.isShowHint = true;
      if (!this.incorrectWords.includes(this.currentQuestionData)) {
        this.incorrectWords.push(this.currentQuestionData); // Add to incorrect list
      }
    }
  }

  handleLoadOnHint() {
    this.handleLoadQuestion();
  }

}
