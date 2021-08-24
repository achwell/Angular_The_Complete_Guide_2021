import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ServerElementComponent implements OnInit, OnChanges, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, DoCheck, OnDestroy {
  @Input('srvElement') element: { name: string };
  @Input() name: string;
  @ViewChild('heading') header: ElementRef;
  @ContentChild('contentParagraph') paragraph: ElementRef

  constructor() {
    console.log("Constructor Called");
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy Called");
  }

  ngOnInit(): void {
    console.log("ngOnInit Called");
    console.log('Text content: ' + this.header.nativeElement.textContent);
    console.log('Text content of paragraph: ' + this.paragraph.nativeElement.textContent);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("ngOnChanges Called");
    console.log(changes);
  }

  ngDoCheck() {
    console.log("ngDoCheck Called");
  }

  ngAfterContentChecked() {
    console.log("ngAfterContentChecked Called");
  }

  ngAfterContentInit() {
    console.log("ngAfterContentInit Called");
    console.log('Text content of paragraph: ' + this.paragraph.nativeElement.textContent);
  }

  ngAfterViewChecked() {
    console.log("ngAfterViewChecked Called");
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit Called");
    console.log('Text content: ' + this.header.nativeElement.textContent);
  }

}
