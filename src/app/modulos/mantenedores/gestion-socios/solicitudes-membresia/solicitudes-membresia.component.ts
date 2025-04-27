import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-solicitudes-membresia',
  templateUrl: './solicitudes-membresia.component.html',
  styleUrls: ['./solicitudes-membresia.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, RouterModule]
})
export class SolicitudesMembresiaComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
