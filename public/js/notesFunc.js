/// add form
addNotestoPage();
///
function showNotesForm() {
	if (showNotesDiv) {
		document.getElementById('notesDiv').style.display = 'block';
	} else {
		document.getElementById('notesDiv').style.display = 'none';
	}
}

function toggleNotesForm() {
	showNotesDiv = !showNotesDiv;
	showNotesForm();
}

function addNotestoPage() {
	let notes = [...noteData];
	let tbl = document.getElementById('notesTbl');

	notes.forEach((note) => {
		let tr = document.createElement('tr');
		let td = document.createElement('td');
		td.innerHTML = note.content;
		tr.appendChild(td);
		//
		// edit funcionality
		//

		let btnEdit = document.createElement('button');
		btnEdit.innerHTML = 'O';
		btnEdit.className = 'btn btn-warning';
		btnEdit.id = 'editBtn2';
		btnEdit.style.marginLeft = '12px';
		btnEdit.addEventListener('click', function () {
			updateEditNoteVals(note);
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
				await fetch('/notes/' + note._id, { method: 'Delete' });
			} catch (e) {
				console.log('did not go thru');
			}
			window.location.reload(true);
		});
		let td2 = document.createElement('td');
		td2.appendChild(btn);
		tr.appendChild(td2);
		//

		tbl.appendChild(tr);
	});
}

function updateEditNoteVals(note) {
	showNotesDiv = true;
	document.getElementById('editFloatingNoteDiv').style.display = 'block';
	placeDiv(x_pos, y_pos);
	//
	document.getElementById('editContent').value = note.content;
	document.editNoteFormX.action = '/notes/' + note._id + '?_method=PUT';
	//
	//
	var viewportOffset = document
		.getElementById('notesTbl')
		.getBoundingClientRect();
	// these are relative to the viewport, i.e. the window
	var top = viewportOffset.top;
	var left = viewportOffset.left;
	placeDiv(left, top);
}

function closeNoteEditForm() {
	document.getElementById('editFloatingNoteDiv').style.display = 'none';
}

function placeDiv(x_pos, y_pos) {
	var d = document.getElementById('editFloatingNoteDiv');
	d.style.position = 'absolute';
	d.style.left = x_pos + 'px';
	d.style.top = y_pos + 'px';
	console.log(x_pos, y_pos, d.id);
	return d;
}
