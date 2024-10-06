import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavigationService } from '../shared/interfaces/navigation/navigation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-vocab',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-vocab.component.html',
  styleUrl: './add-vocab.component.css'
})
export class AddVocabComponent {
  myForm: FormGroup;
  currentPageRout: string = 'add-vocab';
  constructor(private fb: FormBuilder,
    private navService: NavigationService,
    private router: Router) {
    this.myForm = this.fb.group({
      vocabText: ['', Validators.required],
      meaningText: ['', Validators.required],
      chapterNumber: [0, Validators.required],
      chapterName: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.navService.addCurrentPageToNavList(this.currentPageRout);
  }

  onSubmit() {
    if (this.myForm.valid) {
      const { vocabText, meaningText, chapterNumber, chapterName } = this.myForm.value;
      console.log(vocabText, meaningText, chapterNumber, chapterName);
    }
    this.myForm.get('vocabText')?.setValue('');
    this.myForm.get('meaningText')?.setValue('');
  }

  handlePrevNavAction() {
    console.log(this.navService.goToPrevPage(this.currentPageRout));
    this.router.navigate([this.navService.goToPrevPage(this.currentPageRout)])
  }
}
