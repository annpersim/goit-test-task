import UserCard from "./components/UserCard";
import css from "./App.module.css";

function App() {
  return (
    <>
      <div className={css.layout}>
        <UserCard />
      </div>
    </>
  );
}

export default App;
