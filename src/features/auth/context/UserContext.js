import { createContext } from "react";
// El contexto ahora puede tener { user, refreshUser }
export const UserContext = createContext({ user: null, refreshUser: () => {} });
