import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Widgets from "./components/Widgets";

function App() {
  return (
    <div className="app lg:max-w-6xl mx-auto grid grid-cols-9 max-h-screen overflow-hidden">
      <Sidebar />

      <Feed />

      <Widgets />
    </div>
  );
}

export default App;
