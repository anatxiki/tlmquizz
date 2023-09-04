import { FC, useState } from "react";
import { Input } from "../_components/Input";
import { Button } from "../_components/Button";
import styled from "styled-components";
import { Link } from "../_components/Link";
import { colors } from "../theme";
import { RadioInput } from "../_components/RadioInput";
import { myApi } from "../myApi";
import { useSession } from "./sessionContext";

interface Props {}

export const Register: FC<Props> = ({ ...props }) => {
  const { login } = useSession();
  const [correo, setCorreo] = useState("");
  const [passwd, setPasswd] = useState("");
  const [rol, setRol] = useState("student");
  const [hasError, setHasError] = useState(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await myApi.post("/register", {
        email: correo,
        passwd: passwd,
        rol: rol,
      });

      if (response.status === 204) {
        login(correo, rol === "teacher");
        return;
      }

      if (response.status === 400) {
        setHasError(true);
      }
    } catch (error) {
      alert("Ha ocurrido un error");
    }
  };

  return (
    <div>
      <Titulo>Registro</Titulo>

      <Formulario onSubmit={onSubmit}>
        <Campos>
          <div>
            <Label htmlFor="correo">Correo electrónico</Label>
            <Input
              name="correo"
              onChange={(e) => {
                setCorreo(e.target.value);
                setHasError(false);
              }}
            />
          </div>
          <div>
            <Label htmlFor="pass">Contraseña</Label>
            <Input
              type="password"
              name="pass"
              onChange={(e) => setPasswd(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="pass2">Repetir contraseña</Label>
            <Input type="password" name="pass2" />
          </div>

          <div>
            <Label htmlFor="rol">Rol</Label>
            <RadioContainer>
              <RadioInput
                value="student"
                name="rol"
                onChange={() => setRol("student")}
                defaultChecked
              >
                Estudiante
              </RadioInput>
              <RadioInput
                value="teacher"
                name="rol"
                onChange={() => setRol("teacher")}
              >
                Docente
              </RadioInput>
            </RadioContainer>
          </div>
        </Campos>

        {hasError && <ErrorMessage>El usuario ya existe</ErrorMessage>}
        <Button width="130px" type="submit">
          Registrarme
        </Button>
      </Formulario>

      <Separator />

      <Div>
        <Span>
          ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
        </Span>
      </Div>
    </div>
  );
};

const ErrorMessage = styled.p`
  color: ${colors.rojo};
`;

const RadioContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  max-width: 370px;

  margin-top: 4px;
`;

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

const Formulario = styled.form`
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
