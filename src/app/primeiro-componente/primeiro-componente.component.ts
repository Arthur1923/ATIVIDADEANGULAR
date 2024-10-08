import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pessoa } from '../modelo/Pessoa';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-primeiro-componente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './primeiro-componente.component.html',
  styleUrls: ['./primeiro-componente.component.css']
})
export class PrimeiroComponenteComponent {

  // Objeto de formulário
  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    idade: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(120)]),
    cidade: new FormControl('', [Validators.required, Validators.minLength(3)]),
    sexo: new FormControl('M', [Validators.required])  // Corrigido para Validators.required
  });

  // Visibilidade dos botões
  btnCadastrar: boolean = true;

  // Vetor
  vetor: Pessoa[] = [];

  // Armazenar índice da pessoa selecionada
  indice: number = -1;

  // Função para cadastrar
  cadastrar() {
    // Cadastro no vetor
    this.vetor.push(this.formulario.value as Pessoa);

    // Limpeza dos inputs
    this.formulario.reset();

    // Visualização no console (opcional)
    // console.table(this.vetor);
  }

  // Função para selecionar uma pessoa e preencher o formulário
  selecionar(indice: number) {
    // Atribuir o índice da pessoa
    this.indice = indice;

    // Atribuir os dados da pessoa no formulário
    this.formulario.setValue({
      nome: this.vetor[indice].nome,
      idade: this.vetor[indice].idade,
      cidade: this.vetor[indice].cidade,
      sexo: this.vetor[indice].sexo  // Corrigido para adicionar vírgula
    });

    // Visibilidade dos botões
    this.btnCadastrar = false;
  }

  // Função de alteração (editar uma pessoa existente)
  alterar() {
    // Alterar vetor
    this.vetor[this.indice] = this.formulario.value as Pessoa;

    // Limpar os inputs
    this.formulario.reset();

    // Visibilidade dos botões
    this.btnCadastrar = true;
  }

  // Função para remover uma pessoa do vetor
  remover() {
    // Removendo uma pessoa do vetor
    this.vetor.splice(this.indice, 1);

    // Limpeza de inputs
    this.formulario.reset();

    // Visibilidade dos botões
    this.btnCadastrar = true;
  }

  // Função para cancelar (limpar o formulário)
  cancelar() {
    // Limpeza dos inputs
    this.formulario.reset();

    // Visibilidade dos botões
    this.btnCadastrar = true;
  }
}
