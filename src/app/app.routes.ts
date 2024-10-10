import { Routes } from '@angular/router';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { ReviseVocabComponent } from './revise-vocab/revise-vocab.component';
import { SelectChapterComponent } from './select-chapter/select-chapter.component';

export const routes: Routes = [
    { path: '', component: DashBoardComponent },
    { path: 'revise-vocab-card', component: ReviseVocabComponent },
    { path: 'revise-vocab', component: SelectChapterComponent },
];
