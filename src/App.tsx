import { PersonComponent } from "./components/PersonComponent";
import { TableComponent } from "./components/TableComponent";
import "datatables.net-dt/css/jquery.dataTables.css";
import { useAppSelector } from "./store/hooks";

function App() {
	const persons = useAppSelector((state) => state.person.persons);
	return (
		<div className="App p-4">
			<div className="p-4 flex text-center">
				<img
					src="https://www.onito.io/assets/img/onito-onlyname-logo-removebg.png"
					alt="logo"
				/>
			</div>
			<PersonComponent />
			<div>
				{!!persons && persons.length > 0 && (
					<TableComponent data={persons} retrieve lengthChange />
				)}
			</div>
		</div>
	);
}

export default App;
