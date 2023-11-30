import Reacte,
{
    Component, useState, ChangeEvent,
    FormEvent, useEffect
} from 'react';
import Footer from './Footer';
import Header from './Header';
import styles from '../App.module.css'
import axios from 'axios';


const Cadastro = () => {












    const [nome, setNome] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [cpf, setCpf] = useState<string>("");
    const [password, setPassword] = useState<string>("");




    const [nomeErro, setNomeErro] = useState<string>("")
    const [emailErro, setEmailErro] = useState<string>("")
    const [cpfErro, setCpfErro] = useState<string>("")
    const [passwordErro, setPasswordErro] = useState<string>("")

    //FormEvent:Monitora os evetos do formulario ex: se alguem digita algo ......
    const cadastrarUsuario = (e: FormEvent) => {
        
setCpfErro("")
setNomeErro("")
setPasswordErro("")
setEmailErro("")


        e.preventDefault();
        const dados = {
            nome: nome,
            email: email,
            cpf: cpf,
            password: password
        }
        //axios:Faz as requisiçoes HTTPS-OU seja, envias as menssagens dos campos para o banco de dados
        axios.post('http://10.137.9.136:8000/api/store',
            dados,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
                //then():Vai ser a resposta de quando cadastramos algo, ex: CADASTRO REALIZADO COM SUCESSO
            }).then(function (response) {



                if (response.data.success == false) {


                    // nome
                    if ('nome' in response.data.error) {
                        setNomeErro(response.data.error.nome[0])
                    }


                    //email
                    if ('email' in response.data.error) {
                        setEmailErro(response.data.error.email[0])
                    }

                    //password
                    if ('password' in response.data.error) {
                        setPasswordErro(response.data.error.password[0])
                    }

                    //cpf
                    if ('cpf' in response.data.error) {
                        setCpfErro(response.data.error.cpf[0])
                    }


                }else{




                window.location.href = "/listagem"
                }
                //cath: Caso der algum erro< vai aparecer uma menssagem ex: algo deu errado, tente novamente
            }).catch(function (error) {
                console.log(error);
            });


    }



    //handlesState:: quando escreve algo em um campo, os caracteres irao apararecer em baixo dos campo
    const handleState = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.name === "nome") {
            setNome(e.target.value);
        }

        if (e.target.name === "cpf") {
            setCpf(e.target.value);
        }

        if (e.target.name === "email") {
            setEmail(e.target.value);
        }

        if (e.target.name === "password") {
            setPassword(e.target.value);
        }
    }

    return (
        <div>
            <Header />
            <main className={styles.main}>

                <div className='container'>
                    <div className='card'>

                        <div className='card-body'>
                            <h5 className='card-title'> Cadastrar Clientes</h5>
                            <form onSubmit={cadastrarUsuario} className='row g-3'>

                                <div className='col-6'> <label htmlFor="nome" className='form-label'>Nome</label>
                                    <input type="text" name="nome" className='form-control' required onChange={handleState} />
                                    <div
                                        className='text-danger'>{nomeErro} 
                                    </div>
                                </div>

                                <div className='col-6'>

                                    <label htmlFor="email" className='form-label'>E-mail</label>
                                    <input type="text" name="email" className='form-control' required onChange={handleState} />

                                    <div
                                        className='text-danger'>{emailErro}
                                    </div>

                                </div>

                                <div className='col-6'>
                                    <label htmlFor="cpf" className='form-label'>CPF</label>
                                    <input type="text" name='cpf' className='form-control' required onChange={handleState} />

                                    <div
                                        className='texte-danger'>{cpfErro}
                                    </div>
                                </div>


                                <div className='col-6'>

                                    <label htmlFor="password" className='form-label'>Senha</label>
                                    <input type="text" name="password" className='form-control' required onChange={handleState} />

                                    <div
                                        className='texte-danger'>{passwordErro}
                                    </div>
                                </div>


                                <div className='col-12' >

                                    <button type='submit' className='btn btn-success btn-sm'>Cadastrar</button>

                                </div>


                            </form>




                        </div>

                    </div>


                </div>

            </main>
            <Footer />

        </div>
    );
}

export default Cadastro;