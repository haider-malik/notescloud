import Notesbox from "./Notesbox";
import "../App.css";
import Addnote from "./Addnote";

function Home() {
	document.title = "NotesCloud | Your Notes";
	return (
		<div id="home">
			<h2 className="your-notes text-center">Your Notes Here</h2>
			<Addnote />
			<Notesbox />
		</div>
	);
}

export default Home;
