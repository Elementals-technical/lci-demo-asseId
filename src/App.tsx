import { ThreekitProvider, Player, PortalToElement, FlatForm } from "@threekit-tools/treble";
import { Header } from "./components/Header/Header";

const App = () => {
  return (
    <ThreekitProvider>
      <Header />
      <div className="tk-treble-player">
        <Player />
      </div>
      <PortalToElement to="tk-treble-form" strict={true}>
        <FlatForm />
      </PortalToElement>
    </ThreekitProvider>
  );
};

export default App;
