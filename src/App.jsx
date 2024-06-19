import { useContext } from "react";
import RoutesMain from "./routes/RoutesMain";
import "./styles/globalStyles.scss";
import { Spinner } from "react-loading-io";
import TemplatePage from "./pages/TemplatePages";
import { UserContext } from "./providers/UserContext";


const App = () => {
  const { isLoading, isUser } = useContext(UserContext);
  const spinnerCfg = { transform: "translateY(100%)"};

  return (
    <TemplatePage >
      

      {isLoading ? <Spinner style={spinnerCfg} /> : <RoutesMain />}

      
    </TemplatePage>
  )
};

export default App;