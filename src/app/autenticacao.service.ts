import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './acesso/usuario.model';
import *as firebase from 'firebase';


@Injectable()
export class Autenticacao {

    public toke_id: string

    constructor(private route: Router) {

    }

    public cadastrarUsuario(usuario: Usuario): Promise<any> {
        //console.log('chegamos ate o serviço', usuario);

        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resposta) => {
                // remove a senha do atributo senha do objeto usuario
                delete usuario.senha

                // registrando dados complementares do usuario no path email na base64

                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set({ usuario })
            })
            .catch((error: Error) => {
                console.log(error)
            })
    }

    public autenticar(email: string, senha: string): void {

        console.log('email:', email)
        console.log('senha:', senha)

        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta: any) => {
                firebase.auth().currentUser.getIdToken()
                    .then((idToken: string) => {
                        this.toke_id = idToken
                        localStorage.setItem('idToken', idToken)
                        this.route.navigate(['/home'])
                    })
            })

            .catch((error: Error) => console.log(error))
    }

    public autenticado(): boolean {

        if (this.toke_id === undefined && localStorage.getItem('idToken') != null) {
            this.toke_id = localStorage.getItem('idToken')
        }

        if(this.toke_id == undefined){

            this.route.navigate(['/'])
        }

        return this.toke_id !== undefined
    }

    public sair(): void {
        firebase.auth().signOut()
            .then(() => {
                localStorage.removeItem('idToken')
                this.toke_id = undefined 
                this.route.navigate(['/'])
            })
    }
}