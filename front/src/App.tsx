import React, { FC } from "react";
import styled from "styled-components";
import {
  Navigate,
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
  useParams,
} from "react-router-dom";
import { colors } from "./theme";
import { Login } from "./views/Login";
import { Register } from "./views/Register";
import logo from "./images/logo.svg";
import powerOff from "./images/power-off.svg";
import { Rooms } from "./views/teacher/Rooms";
import { Answer } from "./views/students/Answer";
import { StudentRooms } from "./views/students/StudentRooms";
import { QuestionsList } from "./views/teacher/QuestionsList";
import { Question } from "./views/teacher/Question";
import { useSession } from "./views/sessionContext";
import { Loader } from "./_components/Loader";

function App() {
  const { session, logout } = useSession();

  return (
    <>
      <Cabecera>
        <Logo src={logo} alt="tlmquizz" />
        {session?.email !== undefined && (
          <LogoutButton onClick={logout}>
            <Logout src={powerOff} alt="Cerrar sesión" />
          </LogoutButton>
        )}
      </Cabecera>
      <CentrameEso>
        {session === undefined ? (
          <Loader />
        ) : (
          <Router>
            <Routes>
              <Route
                path="/login"
                element={
                  <AlreadyAuthenticated>
                    <Login />
                  </AlreadyAuthenticated>
                }
              />
              <Route
                path="/register"
                element={
                  <AlreadyAuthenticated>
                    <Register />
                  </AlreadyAuthenticated>
                }
              />
              <Route path="/" element={<Protected />}>
                <Route path="/" element={<StudentRoutes />}>
                  <Route path="rooms" element={<StudentRooms />} />
                  <Route path="rooms/:id" element={<Answer />} />
                </Route>
                <Route path="teacher" element={<TeacherRoutes />}>
                  <Route path="rooms" element={<Rooms />} />
                  <Route path="rooms/:id" element={<QuestionsList />} />
                  <Route
                    path="rooms/:id/question"
                    element={<RedirectToRoom />}
                  />
                  <Route
                    path="rooms/:id/question/:idQuestion"
                    element={<Question />}
                  />
                </Route>
              </Route>
            </Routes>
          </Router>
        )}
      </CentrameEso>
      <Footer />
    </>
  );
}

const RedirectToRoom = () => {
  const { id } = useParams();
  return <Navigate to={`/teacher/rooms/${id}`} />;
};

const LogoutButton = styled.div`
  background-color: ${colors.azulOscuro};
`;

export const TeacherRoutes: FC = () => {
  const { session } = useSession();

  if (!session.isTeacher) {
    // user is not a teacher
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export const StudentRoutes: FC = () => {
  const { session } = useSession();

  if (session.isTeacher) {
    // user is a teacher
    return <Navigate to="/teacher/rooms" />;
  }

  return <Outlet />;
};

export const Protected: FC = () => {
  const { session } = useSession();

  if (session?.email === undefined) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export const AlreadyAuthenticated: FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { session } = useSession();

  if (session?.email !== undefined) {
    // user is authenticated
    return <Navigate to="/rooms" />;
  }

  return <>{children}</>;
};

const CentrameEso = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 80px;
`;

const Cabecera = styled.header`
  background-color: ${colors.azulOscuro};

  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 55px;
`;

const Logo = styled.img`
  padding: 8px 16px;
`;

const Logout = styled.img`
  padding: 8px 16px;
  width: 32px;
  height: 32px;

  cursor: pointer;
`;

const Footer = styled.footer`
  min-height: 40px;
`;
export default App;
