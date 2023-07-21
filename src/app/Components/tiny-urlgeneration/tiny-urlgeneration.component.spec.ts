import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinyURLGenerationComponent } from './tiny-urlgeneration.component';

describe('TinyURLGenerationComponent', () => {
  let component: TinyURLGenerationComponent;
  let fixture: ComponentFixture<TinyURLGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TinyURLGenerationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TinyURLGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
