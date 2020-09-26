let showEntriesDiv = true;
let showAddDiv = false;

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

if (jsonData.length > 0) {
	makeTable(jsonData);
	document.getElementById('sys').innerHTML =
		'System message: DATA - ' + jsonData.length;
} else {
	document.getElementById('sys').innerHTML = 'System message: NO DATA';
}

// list all entries
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
		let date = new Date(e.date).toUTCString();
		date.replace('GMT', '');
		let dateObj = new Date(e.date);
		let date2 = dateObj.toLocaleDateString('en-US');
		let fields = [
			e.purpose,
			e.source,
			e.name,
			e.val,
			e.income,
			e.gift,
			e.expense,
			e.debt,
			date2,
		];
		fields.forEach((f) => {
			let td = document.createElement('td');
			let input = document.createElement('input');
			input.value = f;
			td.appendChild(input);
			tr.appendChild(td);
		});

		let btn = document.createElement('button');
		btn.innerHTML = 'X';
		btn.className = 'btn btn-danger';
		btn.id = 'delBtn';
		btn.style.marginLeft = '12px';
		btn.addEventListener('click', async function delObj(event) {
			try {
				const obj = await fetch('/finance/' + e._id, { method: 'Delete' });
			} catch (e) {
				console.log('did not go thru');
			}
			showEntriesDiv = false;
			window.location.reload(true);
		});
		let td2 = document.createElement('td');
		td2.appendChild(btn);
		tr.appendChild(td2);
		tbl.appendChild(tr);
	});
}

window.onload = function () {
	// document.getElementById("EntriesDiv").style.display = 'none';
	showExistingEntries();
	// document.getElementById("AddDiv").style.display = 'none';
	showAddForm();
};
