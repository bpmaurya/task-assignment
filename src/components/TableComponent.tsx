import { Config } from "datatables.net-dt";
import { useEffect, useState } from "react";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { Person } from "../features/personSlice";

export function TableComponent({ ...props }: Config) {
	const [tabData, setTabData] = useState<any>([]);
	useEffect(() => {
		$(document).ready(function () {
			$("#table_id").DataTable({
				retrieve: true,
				searching: true,
				paging: false,
			});
		});
		if (props.data) setTabData(props.data);
		else setTabData([]);
	}, [props.data]);

	const tabledata = tabData!.map((obj: Person) => {
		return (
			<tr>
				<td>{obj.name}</td>
				<td>{obj.age}</td>
				<td>{obj.sex}</td>
				<td>{obj.mobile}</td>
				<td>{obj.govIdType}</td>
				<td>{obj.govId}</td>
				<td>{obj.address}</td>
				<td>{obj.city}</td>
				<td>{obj.country}</td>
				<td>{obj.pincode}</td>
				<td>{obj.state}</td>
			</tr>
		);
	});

	return (
		<table id="table_id" style={{ width: "100%" }}>
			<thead>
				<tr>
					<th> Name</th>
					<th> Age</th>
					<th> Sex</th>
					<th> Mobile</th>
					<th> Id Type</th>
					<th> Id </th>
					<th> Address </th>
					<th> City </th>
					<th> Country </th>
					<th> Pincode </th>
					<th> State </th>
				</tr>
			</thead>
			<tbody>{tabledata}</tbody>
		</table>
	);
}
