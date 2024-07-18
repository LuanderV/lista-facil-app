import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { entrarGoogle, loginUsuario } from "../firebase/auth";
import toast from "react-hot-toast";

function Login() {
  const {register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();

  function entrar(data) {
    loginUsuario(data.email, data.senha).then(() => {
      toast.success("Bem-vindo(a)!");
      navigate("/lista");
    })
    .catch(() => {
      toast.error("Email ou Senha incorretos!");
    });
  }

  function handleEntrarGoogle() {
    entrarGoogle().then(() => {
      toast.success("Bem vindo(a)!");
      navigate("/lista");
    })
    .catch((error) => {
      toast.error("Ocorreu um erro ao fazer login com o Google.");
      console.error("Erro ao fazer login com o Google:", error);
    });
  }
    
  return (
    <>
      <main>
        <form className="form-section" onSubmit={handleSubmit(entrar)}>
            <h1>Login</h1>
            <hr />
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" className="form-control" {...register("email", { required: "O email é obrigatório" })}
            />
            {errors.email && (
            <small className="invalid">{errors.email.message}</small>
          )}
            </div>
            <div>
                <label htmlFor="senha">Senha</label>
                <input type="password" id="senha" className="form-control" {...register("senha", {required: "A senha é obrigatória", minLength: { value: 6, message: "Mínimo de 6 caracteres." },
            })}/>
            {errors.senha && (
            <small className="invalid">{errors.senha.message}</small>
          )}
            </div>
            <Button className="mt-1 w-100" type="submit">Entrar</Button>
            <Button onClick={handleEntrarGoogle} className="mt-1 w-100" type="button">Entrar com o Google</Button>
        </form>
      </main>
    </>
  );
};

export default Login;