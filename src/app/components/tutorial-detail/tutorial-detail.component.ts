import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorial-detail',
  templateUrl: './tutorial-detail.component.html',
  styleUrls: ['./tutorial-detail.component.scss']
})
export class TutorialDetailComponent implements OnInit {
  @Input() tutorial?: Tutorial;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentTutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };
  message = '';

  constructor(private tutorialService: TutorialService) { }
  ngOnInit(): void {
    this.message
    this.currentTutorial = {...this.tutorial};
  }

  updatePublished(status: boolean): void {
    if(this.currentTutorial.id) {
      this.tutorialService.update(this.currentTutorial.id, {published: status})
      .then(() => {
        this.currentTutorial.published = status;
        this.message = 'The status was updated successfully!';
      })
      .catch(error => console.error(error))
    }
  }
  updateTutorial(): void {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description
    };
    if(this.currentTutorial.id) {
      this.tutorialService.update(this.currentTutorial.id, data)
      .then(() => this.message = 'the tutorial was updated successfully!')
      .catch(error => console.error(error));
    }
  }
  deleteTutorial(): void {
    if(this.currentTutorial.id) {
      this.tutorialService.delete(this.currentTutorial.id)
      .then(() => {
        this.refreshList.emit();
        this.message = 'The tutorial was updated successfully!';
      })
      .catch(error => console.error(error))
    }
  }
}
