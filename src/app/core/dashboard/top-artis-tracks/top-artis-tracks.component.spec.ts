import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopArtisTracksComponent } from './top-artis-tracks.component';

describe('TopArtisTracksComponent', () => {
  let component: TopArtisTracksComponent;
  let fixture: ComponentFixture<TopArtisTracksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopArtisTracksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopArtisTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
