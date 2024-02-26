import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

interface ICalcGroup {
    first: number;
    second: number;
    operation: CalcOperation;
}

enum CalcOperation {
    plus = "+",
    minus = "-",
    multiply = "*",
    divide = "/",
}

@Component({
  selector: 'my-calculator',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './my-calculator.component.html',
  styleUrl: './my-calculator.component.css'
})
export class MyCalculatorComponent {
  public calcOperation = CalcOperation;


    public x: number = 1;
  public y: number = 1;

  public operation: string = "+";

  public operations: string[] = ["+", "-", "*", "/"];

  public result?: number;

  public calc() {
    switch (this.operation) {
      case "+":
        this.result = this.x + this.y;
        break;
      case "-":
        this.result = this.x - this.y;
        break;
      case "*":
        this.result = this.x * this.y;
        break;
      case "/":
        this.result = this.x / this.y;
        break;
    }
  }

  public handleX(value: string) {
    this.x = Number(value);
  }
}
