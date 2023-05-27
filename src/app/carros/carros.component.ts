import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Carros } from '../carro';
import { CarrosService } from '../carros.service';

@Component({
  selector: 'app-carros',
  templateUrl: './carros.component.html',
  styleUrls: ['./carros.component.css']
})

export class CarrosComponent implements OnInit {
  carros: Carros[] = [];
  isEditing: boolean = false;
  formGroupCarros: FormGroup;
  submitted: boolean = false;

  constructor(private carrosService: CarrosService, private formBuilder: FormBuilder) {
    this.formGroupCarros = this.formBuilder.group({
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

  save() {
    this.submitted = true;

    if (this.formGroupCarros.valid) {
      if (this.isEditing) {
        this.carrosService.update(this.formGroupCarros.value).subscribe({
          next: () => {
            this.loadCarros()
            this.formGroupCarros.reset();
            this.isEditing = false;
            this.submitted = false;
          }
        })
      }
  
      else {
        this.carrosService.save(this.formGroupCarros.value).subscribe({
          next: data => {
            this.carros.push(data);
            this.formGroupCarros.reset();
            this.submitted = false;
          }
        })
      }
    }
  }

  edit(carros: Carros) {
    this.formGroupCarros.setValue(carros);
    this.isEditing = true;
  }

  delete(carros: Carros) {
    this.carrosService.delete(carros).subscribe({
      next: () => this.loadCarros()
    });
  }

  clean() {
    this.formGroupCarros.reset();
    this.submitted = false;
  }

  get title(): any {
    return this.formGroupCarros.get("titulo");
  }
  get price(): any {
    return this.formGroupCarros.get("preco");
  }
  get description(): any {
    return this.formGroupCarros.get("descricao");
  }
  get data(): any {
    return this.formGroupCarros.get("dataValidade");
  }
  get img(): any {
    return this.formGroupCarros.get("img");
  }

  

}
