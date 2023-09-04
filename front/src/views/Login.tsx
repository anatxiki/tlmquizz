import { FC, useState } from "react";
import { Input } from "../_components/Input";
import { Button } from "../_components/Button";
import styled from "styled-components";
import { colors } from "../theme";
import { Link } from "../_components/Link";
import { myApi } from "../myApi";
import { useNavigate } from "react-router-dom";
import { useSession } from "./sessionContext";

export const Login: FC = () => {
  const { login } = useSession();
  const [user, setUser] = useState("");
  const [passwd, setPasswd] = useState("");
  const [wrongCredentialsError, setWrongCredentialsError] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (e: any) => {
    setWrongCredentialsError(false);

    e.preventDefault();

    try {
      const response = await myApi.post("/login", {
        email: user,
        passwd: passwd,
      });

      if (response.status === 401) {
        setWrongCredentialsError(true);
        setUser("");
        setPasswd("");
        return;
      }

      const data = await response.json();
      login(data.user.email, data.user.is_teacher);
      navigate("/rooms");
    } catch (error) {
      console.log(error);
    }
  };

  const isSubmitDisabled = user === "" || passwd === "";

  return (
    <div>
      <Titulo>Iniciar sesión</Titulo>

      <form onSubmit={onSubmit}>
        <Formulario>
          <Campos>
            <div>
              <Label htmlFor="usuario">Usuario</Label>
              <Input
                name="usuario"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="pass">Contraseña</Label>
              <Input
                type="password"
                name="pass"
                value={passwd}
                onChange={(e) => setPasswd(e.target.value)}
              />
            </div>
          </Campos>

          <Button width="100px" type="submit" ariaDisabled={isSubmitDisabled}>
            Entrar
          </Button>
        </Formulario>
        {wrongCredentialsError && <p>Error de credenciales</p>}
      </form>

      <Separator />

      <Div>
        <Span>
          ¿No tienes una cuenta? <Link to="/register">Crear cuenta</Link>
        </Span>
      </Div>
    </div>
  );
};

const Titulo = styled.h1`
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;

  margin-bottom: 40px;
`;

const Label = styled.label`
  font-weight: 600;
  text-align: left;
`;

const Formulario = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0 24px;
`;

const Campos = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 24px;

  gap: 24px;
`;

const Separator = styled.hr`
  margin-top: 40px;
  margin-bottom: 40px;
  border-top: 1px solid ${colors.azulOscuro};
`;

const Span = styled.span`
  font-weight: 600;
`;

const Div = styled.div`
  text-align: center;
`;
