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

  constructor(private carrosService: CarrosService, private formBuilder: FormBuilder) {
    this.formGroupCarros = this.formBuilder.group({
      id: [''],
      titulo: ['',[Validators.required]],
      descricao: [''],
      preco: [''],
      dataValidade: [''],
      img: [''],
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
    let checkbox = document.getElementById('checkbox') as HTMLInputElement;

    if (this.isEditing) {
      this.carrosService.update(this.formGroupCarros.value).subscribe({
        next: () => {
          this.loadCarros()
          this.formGroupCarros.reset();
          this.isEditing = false;
        }
      })
    }

    else {
      if (checkbox.checked) {
        this.carrosService.save(this.formGroupCarros.value).subscribe({
          next: data => {
            this.carros.push(data);
            this.formGroupCarros.reset();
          }
        })
      }

      else {
        alert ('Para prosseguir com o cadastro, aceite os termos de uso');
      }
    }
    checkbox.checked = false;
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
  }

  loadImg(carros: Carros) {
    this.carrosService.getImg(carros);
  }

}
