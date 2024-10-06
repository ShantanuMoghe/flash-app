import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVocabComponent } from './add-vocab.component';

describe('AddVocabComponent', () => {
  let component: AddVocabComponent;
  let fixture: ComponentFixture<AddVocabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVocabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVocabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
