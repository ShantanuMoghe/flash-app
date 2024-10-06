import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectChapterComponent } from './select-chapter.component';

describe('SelectChapterComponent', () => {
  let component: SelectChapterComponent;
  let fixture: ComponentFixture<SelectChapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectChapterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
