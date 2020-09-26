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

		let fields = [e.purpose, e.source, e.name, e.val, e.moneyType];

		fields.forEach((f) => {
			let td = document.createElement('td');
			let input = document.createElement('input');
			input.value = f;
			td.appendChild(input);
			tr.appendChild(td);
		});

		//handle date
		let tdEntryDate = addDateToEntryList(e.date);
		tr.appendChild(tdEntryDate);

		let tdIncDate = addDateToEntryList(e.incomeDate);
		tr.appendChild(tdIncDate);

		let tdExpDate = addDateToEntryList(e.spendDate);
		tr.appendChild(tdExpDate);

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

function getDateDifference() {
	const _MS_PER_DAY = 1000 * 60 * 60 * 24;

	// a and b are javascript Date objects
	// Discard the time and time-zone information.
	const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
	const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

	return Math.floor((utc2 - utc1) / _MS_PER_DAY);

	// test it
	/*
	const a = new Date('2017-01-01'),
    b = new Date('2017-07-25'),
    difference = dateDiffInDays(a, b);
    */
}

window.onload = function () {
	showExistingEntries();
	showAddForm();
};
