import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  Renderer2,
} from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { SwitchService } from '../switch.service';
import { Notes } from '../notes';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent implements OnInit {
  constructor(
    public switchService: SwitchService,
    private renderer: Renderer2
  ) {}

  @ViewChild('truncator')
  truncator!: ElementRef<HTMLElement>;
  @ViewChild('bodyText') bodyText!: ElementRef<HTMLElement>;

  @Input() note!: Notes;
  @Output() newItemEvent = new EventEmitter<Notes>();

  ngOnInit(): void {}

  ngAfterViewInit() {
    const style = window.getComputedStyle(this.bodyText.nativeElement, null);
    const viewableHeight = parseInt(style.getPropertyValue('height'), 10);

    if (this.bodyText.nativeElement.scrollHeight > viewableHeight) {
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    } else {
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
    }
  }

  removeItem(event: MouseEvent): void {
    event.stopPropagation();
    this.newItemEvent.emit(this.note);
  }
}
