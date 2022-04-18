import { Component, OnInit } from '@angular/core';
import { AlunosService } from '../alunos.service';
import { AlunoModel } from './aluno.model';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  //Instanciando objeto aluno para a adição de registros via POST
  aluno: AlunoModel = new AlunoModel();

  //Criando um array que recebe os registros via GET
  alunos: Array<any> = new Array();
  
  constructor(private alunosService: AlunosService) { }

  ngOnInit() {
    //A função é chamada ao carregar a tela
    this.listarAlunos();
  }

  //Atualiza um registro via PUT
  atualizar(id: number){
    this.alunosService.atualizarAluno(id, this.aluno).subscribe(aluno => { 
      this.aluno = new AlunoModel();
      this.listarAlunos()
    }, err => { 
        console.log("Erro ao atualizar o aluno", err) 
    })
  }

  //Remove um registro via DELETE
  remover(id:number){
    this.alunosService.removerAluno(id).subscribe(aluno => {
      this.aluno = new AlunoModel();
      this.listarAlunos()
    }, err => {
      console.log("Erro ao remover o aluno", err)
    })
  }
  
  //Cadastra um novo registro via POST
  cadastrar(){
    this.alunosService.cadastrarAluno(this.aluno).subscribe(aluno => { 
      this.aluno = new AlunoModel();
      this.listarAlunos()
    }, err => { 
        console.log("Erro ao cadastrar o aluno", err) 
    })
  }

  //Lista os registros salvos via GET
  listarAlunos(){
    this.alunosService.listarAlunos().subscribe(alunos => {
      this.alunos = alunos;
    }, err => {
      console.log("Erro ao listar os alunos", err);
    })
  }

}
