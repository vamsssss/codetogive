import './App.css'
import Card from "./Card";

function App() {

  return (

      <div className={"container"}>
          <div className={"leftPanel"}>
            Your account and tags
          </div>
          <div className={"right"}>
              <Card description="This is the first card." />
          </div>
      </div>

  )
}

export default App
