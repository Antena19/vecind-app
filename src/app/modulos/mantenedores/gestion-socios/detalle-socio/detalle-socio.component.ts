import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-detalle-socio',
  templateUrl: './detalle-socio.component.html',
  styleUrls: ['./detalle-socio.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, RouterModule]
})
export class DetalleSocioComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
