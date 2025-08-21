import { ThreekitProvider, Player, PortalToElement, FlatForm, TrebleApp } from "@threekit-tools/treble";
import { Header } from "./components/Header/Header";
import { THREEKIT_PARAMS } from "./config/threekit/threekitConfig";

const App = () => {
  return (
    <TrebleApp threekitEnv={THREEKIT_PARAMS.THREEKIT_ENV} />

    // <ThreekitProvider>
    //   <Header />
    //   <div className="tk-treble-player">
    //     <Player />
    //   </div>
    //   <PortalToElement to="tk-treble-form" strict={true}>
    //     <FlatForm />
    //   </PortalToElement>
    // </ThreekitProvider>
  );
};

export default App;
