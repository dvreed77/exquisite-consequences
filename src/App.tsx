import React from "react";
import { TextResponse } from "./components/TextResponse";
import { ColorPicker } from "./components/ColorPicker";
import { DrawingArea } from "./components/DrawingArea";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BottomNav } from "./components/BottomNav";
import { About } from "./About";
import { Final } from "./Final";
import { Output } from "./Output";
import { DrawingArea2 } from "./components/DrawingArea2";

export function App({ db }: { db: firebase.firestore.Firestore }) {
  const [stroke, setStroke] = React.useState<number[][]>([]);
  const [color, setColor] = React.useState<string>("");
  const [text, setText] = React.useState<string>("");

  const [lastStroke, setLastStroke] = React.useState<number[][]>([]);
  const [lastColor, setLastColor] = React.useState<string>("red");
  const [lastText, setLastText] = React.useState<string>("");

  const [canvasSize, setCanvasSize] = React.useState<number>(300);

  React.useEffect(() => {
    db.collection("test")
      .orderBy("createdAt", "desc")
      .limit(1)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setLastStroke(JSON.parse(data.stroke));
          setLastColor(data.color);
          setColor(data.color);
          setLastText(data.text);
        });
      });
  }, []);

  function onSubmit() {
    const normalizeStroke = stroke.map(([x, y]) => [
      x / (canvasSize as number),
      y / (canvasSize as number),
    ]);

    console.log(`
    Writting to DB: 
    nPts: ${stroke.length}
    color: ${color}
    text: ${text}`);

    db.collection("test")
      .add({
        stroke: JSON.stringify(normalizeStroke),
        color,
        text,
        createdAt: new Date(),
      })
      .then(function (docRef) {
        console.log("Document written with IDs: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  return (
    <div className="lg:w-1/2 mx-3 lg:mx-auto flex flex-col select-none">
      <Router>
        <Link to="/">
          <h1 className="text-3xl text-center text-gray-800">
            Exquisite Consequences
          </h1>
        </Link>

        <div className="flex-grow overflow-auto select-none">
          <Switch>
            <Route exact path="/">
              <About />
            </Route>
            <Route exact path="/language">
              <TextResponse text={text} setText={setText} />
            </Route>
            <Route exact path="/draw">
              <DrawingArea
                lastColor={lastColor}
                lastStroke={lastStroke}
                canvasSize={canvasSize}
                setCanvasSize={setCanvasSize}
                stroke={setText}
                setStroke={setStroke}
                color={color}
                setColor={setColor}
              />
            </Route>
            <Route exact path="/draw2">
              <DrawingArea2 />
            </Route>
            <Route exact path="/output">
              <Output db={db} />
            </Route>
          </Switch>
        </div>
        <BottomNav onSubmit={onSubmit} />
      </Router>
    </div>
  );
}
