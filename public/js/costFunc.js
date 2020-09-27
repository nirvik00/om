/// initialize
let showEntriesDiv = false;
let showAddDiv = false;
let showCostCompDiv = false;

if (jsonData.length > 0) {
	makeTable(jsonData);
	document.getElementById('sys').innerHTML =
		'System message: DATA - ' + jsonData.length;
} else {
	document.getElementById('sys').innerHTML = 'System message: NO DATA';
}

/// initialize
window.onload = function () {
	showExistingEntries();
	showAddForm();
	showComputeForm();
};

/// show list of entries
function toggleshowExistingEntries() {
	showEntriesDiv = !showEntriesDiv;
	showExistingEntries();
}

function showExistingEntries() {
	if (showEntriesDiv) {
		if (jsonData.length > 0) {
			document.getElementById('EntriesDiv').style.display = 'block';
		} else {
			document.getElementById('EntriesDiv').style.display = 'none';
		}
	} else {
		document.getElementById('EntriesDiv').style.display = 'none';
	}
}

/// add form
function toggleShowAddForm() {
	showAddDiv = !showAddDiv;
	showAddForm();
}

function showAddForm() {
	if (showAddDiv) {
		document.getElementById('AddDiv').style.display = 'block';
	} else {
		document.getElementById('AddDiv').style.display = 'none';
	}
}

/// list all entries
function makeTable(jsondata) {
	let tbl = document.getElementById('tableId');
	let rowId = 0;
	jsondata.forEach((e) => {
		rowId++;
		let tr = document.createElement('tr');
		let td1 = document.createElement('td');
		td1.innerHTML = rowId;
		tr.appendChild(td1);
		tr.class = 'row' + rowId;

		let fields = [e.purpose, e.source, e.name, e.val, e.moneyType];

		fields.forEach((f) => {
			let td = document.createElement('td');
			let input = document.createElement('input');
			input.value = f;
			td.appendChild(input);
			tr.appendChild(td);
		});

		//handle date
		let tdIncDate = addDateToEntryList(e.incomeDate);
		tr.appendChild(tdIncDate);
		let tdExpDate = addDateToEntryList(e.spendDate);
		tr.appendChild(tdExpDate);
		let tdEntryDate = addDateToEntryList(e.date);
		tr.appendChild(tdEntryDate);

		// delete funcionality
		let btn = document.createElement('button');
		btn.innerHTML = 'X';
		btn.className = 'btn btn-danger';
		btn.id = 'delBtn';
		btn.style.marginLeft = '12px';
		btn.addEventListener('click', async function delObj() {
			try {
				await fetch('/finance/' + e._id, { method: 'Delete' });
			} catch (e) {
				console.log('did not go thru');
			}
			showEntriesDiv = false;
			window.location.reload(true);
		});
		let td2 = document.createElement('td');
		td2.appendChild(btn);
		tr.appendChild(td2);

		// add row to table
		tbl.appendChild(tr);
	});
}
33;
/// add form funcationality
function addDateToEntryList(e) {
	let date = new Date(e); //.toUTCString();
	//
	let inpDate = document.createElement('input');
	inpDate.setAttribute('type', 'date');
	inpDate.value =
		date.getFullYear().toString() +
		'-' +
		(date.getMonth() + 1).toString().padStart(2, 0) +
		'-' +
		date.getDate().toString().padStart(2, 0);
	//
	let td = document.createElement('td');
	td.appendChild(inpDate);
	return td;
}
