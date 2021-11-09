import { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NoteState from "./contexts/notes/NoteState";
import EditState from "./contexts/editnote/EditState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
// import Alert from "./components/Alert";

function App() {
	const [tok, setTok] = useState(false);
	return (
		<>
			<EditState>
				<NoteState>
					<Router>
						{/* <Alert/> */}
						<Navbar setTok={setTok} tok={tok} />
						<Switch>
							<Route exact path="/">
								<Home />
							</Route>
							<Route exact path="/login">
								<Login setTok={setTok} />
							</Route>
							<Route exact path="/signup">
								<Signup setTok={setTok} />
							</Route>
							<Route exact path="/alert">
								<Alert />
							</Route>
						</Switch>
					</Router>
				</NoteState>
			</EditState>
		</>
	);
}

export default App;
