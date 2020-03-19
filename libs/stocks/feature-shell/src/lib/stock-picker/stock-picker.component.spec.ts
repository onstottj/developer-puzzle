import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedUiCustomMaterialModule } from '@coding-challenge/shared/ui/custom-material';
import { StockPickerComponent } from './stock-picker.component';

describe('StockPickerComponent', () => {
  let component: StockPickerComponent;
  let fixture: ComponentFixture<StockPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StockPickerComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        SharedUiCustomMaterialModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
