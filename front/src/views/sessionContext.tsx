import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { myApi } from "../myApi";

const SessionContext = createContext<any>(undefined);

interface Props {
  children: ReactNode;
}

export const SessionContextProvider = (props: Props) => {
  const [session, setSession] = useState<any>(undefined);

  const login = (email: string, isTeacher: boolean) =>
    setSession({ email, isTeacher });
  const logout = () => {
    myApi.post("/logout");
    setSession({});
  };

  useEffect(() => {
    const loadSession = async () => {
      const serverSession = await myApi.get("/session");
      login(serverSession?.user?.email, serverSession?.user?.is_teacher);
    };
    loadSession();
  }, []);

  return (
    <SessionContext.Provider value={{ session, login, logout }}>
      {props.children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
