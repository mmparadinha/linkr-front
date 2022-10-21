import { useState } from "react";
import axios from "axios";

export default function UserRegistration({SignupComponents, DescriptionComponents, RegistrationData, setClicado}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [url, setUrl] = useState('');

    function handleForm(e) {
        e.preventDefault();
        const dadosDeCadastro = {
            email,
            password,
            username,
            url
        };
        const promise = axios.post('http://localhost:4000/signup', dadosDeCadastro);

        promise.then((res) => {
            restForm();
        });
        promise.catch((err) => {
            alert("Esse endereço de email já está cadastrado!")
        })
    }

    function restForm() {
        setEmail('');
        setPassword('');
        setUsername('');
        setUrl('');
    }

    return (
        <SignupComponents>
            <DescriptionComponents>
                <div className="description">
                    <h1>linkr</h1>
                    <p>save, share and discover the best links on the web</p>
                </div>
            </DescriptionComponents>
            <RegistrationData>
                <form onSubmit={handleForm}>
                    <label>
                        <input 
                            type="text"
                            name='email'
                            placeholder="e-mail"
                            onChange={(e) => {setEmail(e.target.value)}}
                            value={email}
                            required
                        />
                    </label>
                    <label>
                        <input 
                            type="password"
                            name='password'
                            placeholder="password"
                            onChange={(e) => {setPassword(e.target.value)}}
                            value={password}
                            required
                        />
                    </label>
                    <label>
                        <input 
                            type="text"
                            name='name'
                            placeholder="username"
                            onChange={(e) => {setUsername(e.target.value)}}
                            value={username}
                            required
                        />
                    </label>
                    <label>
                        <input 
                            type="text"
                            name='url'
                            placeholder="picture url"
                            onChange={(e) => {setUrl(e.target.value)}}
                            value={url}
                            required
                        />
                    </label>
                    <button>Sign Up</button>
                    <p onClick={() => {
                        setClicado(false);
                        }}>Switch back to log in</p>
                </form>
            </RegistrationData>
        </SignupComponents>
    );
}
