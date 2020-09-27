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
	let form = document.getElementById('editNoteForm');
	form.action = '/notes/' + note._id + '?_method=PUT';
	document.getElementById('content').value = note.content;
}

function closeNoteEditForm() {
	document.getElementById('editFloatingNoteDiv').style.display = 'none';
}
