import { createContext, useContext, useState } from "react";
const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    keywords: "",
    results: [],
  });
  console.log(auth);

  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  );
};

//customHook
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
