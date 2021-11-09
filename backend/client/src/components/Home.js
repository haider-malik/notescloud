import Notesbox from "./Notesbox";
import "../App.css";
import Addnote from "./Addnote";

function Home() {
	document.title = "NotesCloud | Your Notes";
	return (
		<>
			<h2
				className="your-notes text-center"
				style={{
					marginTop: "80px",
					marginBottom: "30px",
				}}
			>
				Your Notes Here
			</h2>
			<Addnote />
			<Notesbox />
		</>
	);
}

export default Home;
