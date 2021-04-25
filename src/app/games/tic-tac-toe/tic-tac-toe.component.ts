import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {

  title = 'Tic Tac Toe!'
  player: 'Circle' | 'Cross';
  winner = 'rinebob';
  winMessage = '';
  isCross = false;

  squares: string[] = new Array(9).fill('empty');

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  handleClick(itemNumber: number) {
    if (this.winMessage) {
      return this.toastr.success(this.winMessage);

    }
    if (this.squares[itemNumber] === 'empty') {
      this.squares[itemNumber] = this.isCross ? 'cross' : 'circle';
      this.isCross = !this.isCross;
      this.player = this.isCross ? 'Cross' : 'Circle';
    } else {
      return this.toastr.info(
        'Already filled',
        'Status', {positionClass: 'toast-top-right'});
    }
    console.log('squares array: ', this.squares);
    this.checkIsWinner();
  }

  reloadGame = () => {
    this.winMessage = '';
    this.isCross = false;
    this.squares = new Array(9).fill('empty');
  }

  checkIsWinner = () => {
    if (
      this.squares[0] === this.squares[1] &&
      this.squares[0] === this.squares[2] &&
      this.squares[0] !== 'empty'
    ) {
      this.winMessage = `${this.squares[0]} won`
    } else if (
      this.squares[3] !== 'empty' &&
      this.squares[3] === this.squares[4] &&
      this.squares[4] === this.squares[5]
    ) {
      this.winMessage = `${this.squares[3]} won`;
    } else if (
      this.squares[6] !== 'empty' &&
      this.squares[6] === this.squares[7] &&
      this.squares[7] === this.squares[8]
    ) {
      this.winMessage = `${this.squares[6]} won`;
    } else if (
      this.squares[0] !== 'empty' &&
      this.squares[0] === this.squares[3] &&
      this.squares[3] === this.squares[6]
    ) {
      this.winMessage = `${this.squares[0]} won`;
    } else if (
      this.squares[1] !== 'empty' &&
      this.squares[1] === this.squares[4] &&
      this.squares[4] === this.squares[7]
    ) {
      this.winMessage = `${this.squares[1]} won`;
    } else if (
      this.squares[2] !== 'empty' &&
      this.squares[2] === this.squares[5] &&
      this.squares[5] === this.squares[8]
    ) {
      this.winMessage = `${this.squares[2]} won`;
    } else if (
      this.squares[0] !== 'empty' &&
      this.squares[0] === this.squares[4] &&
      this.squares[4] === this.squares[8]
    ) {
      this.winMessage = `${this.squares[0]} won`;
    } else if (
      this.squares[2] !== 'empty' &&
      this.squares[2] === this.squares[4] &&
      this.squares[4] === this.squares[6]
    ) {
      this.winMessage = `${this.squares[2]} won`;
    }
}

}
