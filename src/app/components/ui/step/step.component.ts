import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit {

  @Input() steps:string[]=[]
  @Input() activeStep: number;
  constructor() { }

  ngOnInit() {
  }

}
