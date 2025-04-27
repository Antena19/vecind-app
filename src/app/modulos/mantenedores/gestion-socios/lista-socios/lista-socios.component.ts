import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-socios',
  templateUrl: './lista-socios.component.html',
  styleUrls: ['./lista-socios.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, RouterModule]
  
})
export class ListaSociosComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
