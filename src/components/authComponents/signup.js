import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserRegistration({
  SignupComponents,
  DescriptionComponents,
  RegistrationData,
  setClicado,
}) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [url, setUrl] = useState("");

  function handleForm(e) {
    e.preventDefault();
    const dadosDeCadastro = {
      email,
      password,
      username,
      pictureUrl: url,
    };

        const promise = axios.post(`${process.env.REACT_APP_BACK_END_URL}/signup`, dadosDeCadastro);

        promise.then((res) => {
            restForm();
            setClicado(false);
        });
        promise.catch((err) => {
            alert(err.response.data.message);
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
                    <p>save, share and discover<br/>the best links on the web</p>
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

    promise.then((res) => {
      restForm();
      navigate("/");
    });
    promise.catch((err) => {
      alert(err.response.data.message);
    });
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
          <p>save, share and discover<br />the best links on the web</p>
        </div>
      </DescriptionComponents>
      <RegistrationData>
        <form onSubmit={handleForm}>
          <label>
            <input
              type="text"
              name='email'
              placeholder="e-mail"
              onChange={(e) => { setEmail(e.target.value) }}
              value={email}
              required
            />
          </label>
          <label>
            <input
              type="password"
              name='password'
              placeholder="password"
              onChange={(e) => { setPassword(e.target.value) }}
              value={password}
              required
            />
          </label>
          <label>
            <input
              type="text"
              name='name'
              placeholder="username"
              onChange={(e) => { setUsername(e.target.value) }}
              value={username}
              required
            />
          </label>
          <label>
            <input
              type="text"
              name='url'
              placeholder="picture url"
              onChange={(e) => { setUrl(e.target.value) }}
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


};

// return (
//   <SignupComponents>
//     <DescriptionComponents>
//       <div className="description">
//         <h1>linkr</h1>
//         <p>
//           save, share and discover
//           <br />
//           the best links on the web
//         </p>
//       </div>
//     </DescriptionComponents>
//     <RegistrationData>
//       <form onSubmit={handleForm}>
//         <label>
//           <input
//             type="text"
//             name="email"
//             placeholder="e-mail"
//             onChange={(e) => {
//               setEmail(e.target.value);
//             }}
//             value={email}
//             required
//           />
//         </label>
//         <label>
//           <input
//             type="password"
//             name="password"
//             placeholder="password"
//             onChange={(e) => {
//               setPassword(e.target.value);
//             }}
//             value={password}
//             required
//           />
//         </label>
//         <label>
//           <input
//             type="text"
//             name="name"
//             placeholder="username"
//             onChange={(e) => {
//               setUsername(e.target.value);
//             }}
//             value={username}
//             required
//           />
//         </label>
//         <label>
//           <input
//             type="text"
//             name="url"
//             placeholder="picture url"
//             onChange={(e) => {
//               setUrl(e.target.value);
//             }}
//             value={url}
//             required
//           />
//         </label>
//         <button>Sign Up</button>
//         <p
//           onClick={() => {
//             setClicado(false);
//           }}
//         >
//           Switch back to log in
//         </p>
//       </form>
//     </RegistrationData>
//   </SignupComponents>
// );
// }
