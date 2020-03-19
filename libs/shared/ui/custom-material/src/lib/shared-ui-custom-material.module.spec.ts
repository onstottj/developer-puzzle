import { async, TestBed } from '@angular/core/testing';
import { SharedUiCustomMaterialModule } from './shared-ui-custom-material.module';

describe('SharedUiCustomMaterialModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedUiCustomMaterialModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUiCustomMaterialModule).toBeDefined();
  });
});
