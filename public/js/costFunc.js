/// initialize
let showEntriesDiv = true;
let showAddDiv = false;
let showCostCompDiv = false;
let showNotesDiv = false;

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
	showNotesForm();
};

/// show list of entries
function toggleshowExistingEntries() {
	showEntriesDiv = !showEntriesDiv;
	showExistingEntries();
}

///
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

///
function showAddForm() {
	if (showAddDiv) {
		document.getElementById('AddDiv').style.display = 'block';
	} else {
		document.getElementById('AddDiv').style.display = 'none';
	}
}

///
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

		let form = document.createElement('form');
		let fields = [e.purpose, e.source, e.name, e.val, e.moneyType];
		let fieldName = ['purpose', 'source', 'name', 'val', 'moneyType'];
		fields.forEach((f) => {
			let td = document.createElement('td');
			//let input = document.createElement('input');
			td.innerHTML = f;
			//td.appendChild(input);
			tr.appendChild(td);
		});

		//
		// handle date
		//

		let tdIncDate = document.createElement('td');
		tdIncDate.innerHTML = getDateVal2(e.incomeDate);
		tr.appendChild(tdIncDate);

		let tdExpDate = document.createElement('td');
		tdExpDate.innerHTML = getDateVal2(e.spendDate);
		tr.appendChild(tdExpDate);

		let tdEntryDate = document.createElement('td');
		tdEntryDate.innerHTML = getDateVal2(e.date);
		tr.appendChild(tdEntryDate);

		//
		// edit funcionality
		//
		let btnEdit = document.createElement('button');
		btnEdit.innerHTML = 'O';
		btnEdit.className = 'btn btn-warning';
		btnEdit.id = 'editBtn';
		btnEdit.style.marginLeft = '12px';
		btnEdit.addEventListener('click', function () {
			updateEditFormVals(e);
		});
		let tdEdit = document.createElement('td');
		tdEdit.appendChild(btnEdit);
		tr.appendChild(tdEdit);

		//
		// delete funcionality
		//
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
		//
		// add row to table
		tbl.appendChild(tr);
		//
		//
	});
}
///
///
function updateEditFormVals(arr) {
	console.log('update --> ', arr);
	//
	document.getElementById('editFloatingDiv').style.display = 'block';
	//
	document.getElementById('editPurpose').value = arr.purpose;
	document.getElementById('editSource').value = arr.source;
	document.getElementById('editName').value = arr.name;
	document.getElementById('editVal').value = arr.val;
	document.getElementById('editMoneyType').value = arr.moneyType;
	//
	document.getElementById('editIncomeDate').value = getDateVal(arr.incomeDate);
	document.getElementById('editSpendDate').value = getDateVal(arr.spendDate);
	document.getElementById('editDate').value = getDateVal(arr.date);
	//
	document.editFormX.action = '/finance/' + arr._id + '?_method=put';
	//
	let form = document.editFormX;
	console.log(form.action);
}
///
/// date display funcationality
///
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
///
///
function getDateVal(e) {
	let date = new Date(e); //.toUTCString();
	//
	let value =
		date.getFullYear().toString() +
		'-' +
		(date.getMonth() + 1).toString().padStart(2, 0) +
		'-' +
		date.getDate().toString().padStart(2, 0);
	//
	return value;
}
///
///
function getDateVal2(e) {
	let date = new Date(e); //.toUTCString();
	//
	let value =
		(date.getMonth() + 1).toString().padStart(2, 0) +
		'-' +
		(date.getDate() + 1).toString().padStart(2, 0) +
		'-' +
		date.getFullYear().toString();
	//
	return value;
}
///
///
function closeEditDiv() {
	document.getElementById('editFloatingDiv').style.display = 'none';
}
