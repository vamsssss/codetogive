import './App.css'
import Card from "./Card";

function App() {

  return (

      <div className={"container"}>
          <div className={"leftPanel"}>
            Your account and tags
          </div>
          <div className={"right"}>
              <div className={"card-row"}>
                  <Card/>
                  <Card/>
                  <Card/>
              </div>
              <div className={"card-row"}>
                  <Card/>
                  <Card/>
                  <Card/>
              </div>

          </div>
      </div>

  )
}

export default App
