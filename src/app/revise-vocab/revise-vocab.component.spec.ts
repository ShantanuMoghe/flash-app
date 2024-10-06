import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviseVocabComponent } from './revise-vocab.component';

describe('ReviseVocabComponent', () => {
  let component: ReviseVocabComponent;
  let fixture: ComponentFixture<ReviseVocabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviseVocabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviseVocabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
