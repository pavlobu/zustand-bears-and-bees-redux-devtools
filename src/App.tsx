import "./App.css";

import { useBearStore } from "./bear-store";
import Bears from "./Bears";

import { useCatStore } from "./cats-store";
import Cats from "./Cats";

let bears;
let cats;

function ShowBears() {
  bears = useBearStore((state) => state.bears);
  return <p>{bears} bears in the forest</p>;
}

function ShowCats() {
  cats = useCatStore((state) => state.cats);
  return <p>{cats} cats in the forest</p>;
}

function AddBear() {
  const incrementBear = useBearStore((state) => state.increasePopulation);
  return <button onClick={() => incrementBear()}>Add bear</button>;
}

function RemoveBear() {
  const removeBear = useBearStore((state) => state.removeBear);

  return <button onClick={() => removeBear()}>Remove bear</button>;
}

function NukeBears() {
  const removeAllBears = useBearStore((state) => state.removeAllBears);
  return <button onClick={() => removeAllBears()}>Nuke all bears</button>;
}

function SpecificBearsAmount() {
  const specificBearsAmount = useBearStore((state) => state.setSpecificBearsAmount);
  return <button onClick={() => specificBearsAmount(25)}>Set 25 Bears</button>;
}


function AddCat() {
  const incrementCat = useCatStore((state) => state.increasePopulation);
  return <button onClick={() => incrementCat()}>Add cat</button>;
}

function RemoveCat() {
  const removeCat = useCatStore((state) => state.removeCat);

  return <button onClick={() => removeCat()}>Remove cat</button>;
}

function NukeCats() {
  const removeAllCats = useCatStore((state) => state.removeAllCats);
  return <button onClick={() => removeAllCats()}>Nuke all cats</button>;
}

function SpecificCatsAmount() {
  const specificCatsAmount = useCatStore((state) => state.setSpecificCatsAmount);
  return <button onClick={() => specificCatsAmount(25)}>Set 25 Cats</button>;
}

function App() {
  return (
    <div className="App">
      <ShowBears />
      <div className="actions">
        {useBearStore((state) => state.bears) !== 0 ? <RemoveBear /> : null}
        <AddBear />
        {useBearStore((state) => state.bears) !== 0 ? <NukeBears /> : null}
        <SpecificBearsAmount />
      </div>
      <br />
      <Bears />
      <br />
      <ShowCats />
      <div className="actions">
        {useCatStore((state) => state.cats) !== 0 ? <RemoveCat /> : null}
        <AddCat />
        {useCatStore((state) => state.cats) !== 0 ? <NukeCats /> : null}
        <SpecificCatsAmount />
      </div>
      <br />
      <Cats />
    </div>
  );
}

export default App;
