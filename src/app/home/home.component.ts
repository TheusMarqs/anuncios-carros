import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarrosService } from '../carros.service';
import { Carros } from '../carro';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  carros: Carros[] = [];
  isEditing: boolean = false;
  formGroupCarros: FormGroup;
  submitted: boolean = false;

  constructor(private carrosService: CarrosService, private formBuilder: FormBuilder) {
    this.formGroupCarros = formBuilder.group({
      id: [''],
      titulo: ['', [Validators.required]],
      preco: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      dataValidade: ['', [Validators.required]],
      img: ['', [Validators.required]],
      status: ['']
    });
  }
  ngOnInit(): void {
    this.loadCarros();
  }

  loadCarros() {
    this.carrosService.getCarros().subscribe({
      next: data => this.carros = data
    });
  }

  statusAtivo: boolean = false;
  get status() : any{
    let status = this.formGroupCarros.get("status");
    if (status?.value === 'true') {
      return true;
    }
    
  }  

}