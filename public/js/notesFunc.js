//
// add form
addNotestoPage();
//
//
function showNotesForm() {
	if (showNotesDiv) {
		document.getElementById('notesDiv').style.display = 'block';
	} else {
		document.getElementById('notesDiv').style.display = 'none';
	}
}
//
//
function toggleNotesForm() {
	showNotesDiv = !showNotesDiv;
	showNotesForm();
}
//
//
function addNotestoPage() {
	let notes = [...noteData];
	let tbl = document.getElementById('notesTbl');
	while (tbl.hasChildNodes()) {
		tbl.removeChild(tbl.firstChild);
	}
	let rowId = 0;
	notes.forEach((note) => {
		rowId++;
		console.log(note);
		let tr = document.createElement('tr');
		let td_id = document.createElement('td');
		td_id.innerHTML = note._id;
		td_id.className = 'note-id';
		td_id.style.display = 'none';
		tr.appendChild(td_id);

		let td = document.createElement('td');
		let inp = document.createElement('input');
		inp.id = 'note' + rowId;
		inp.value = note.content;
		inp.className = 'notes-content';
		td.appendChild(inp);
		tr.appendChild(td);
		//
		// edit funcionality
		//
		let btnEdit = document.createElement('button');
		btnEdit.innerHTML = 'O';
		btnEdit.className = 'btn btn-warning editBtn-Note';
		btnEdit.style.marginLeft = '12px';
		let tdEdit = document.createElement('td');
		tdEdit.appendChild(btnEdit);
		tr.appendChild(tdEdit);

		//
		// delete funcionality
		//
		let btn = document.createElement('button');
		btn.innerHTML = 'X';
		btn.className = 'btn btn-danger delete-button';
		btn.style.marginLeft = '12px';
		let td2 = document.createElement('td');
		td2.appendChild(btn);
		tr.appendChild(td2);
		//

		tbl.appendChild(tr);
	});
}
//
//
$(function () {
	$('#create-form').on('submit', function (evt) {
		evt.preventDefault();
		var createInput = $('#create-input');
		console.log(createInput.val());
		$.ajax({
			url: '/notes',
			method: 'POST',
			contentType: 'application/JSON',
			data: JSON.stringify({ content: createInput.val() }),
			success: function (response) {
				console.log(response);
				createInput.val('');
				noteData.push(response);
				addNotestoPage();
			},
		});
	});

	$('table').on('click', '.editBtn-Note', function () {
		var rowEl = $(this).closest('tr');
		var id = rowEl.find('.note-id').text();
		var newContent = rowEl.find('.notes-content').val();
		console.log('id', id, newContent);
		$.ajax({
			url: '/notes/' + id,
			method: 'PUT',
			contentType: 'application/JSON',
			data: JSON.stringify({ content: newContent }),
			success: function () {
				console.log('success find');
			},
		});
	});

	$('table').on('click', '.delete-button', function () {
		var rowEl = $(this).closest('tr');
		var id = rowEl.find('.note-id').text();
		console.log('id', id);
		$.ajax({
			url: '/notes/' + id,
			method: 'DELETE',
			contentType: 'application/JSON',
			success: function () {
				console.log('success delete');
				for (let i = 0; i < noteData.length; i++) {
					if (noteData.length > 1) {
						if (noteData[i]._id === id) {
							noteData.splice(i, 1);
							break;
						}
					} else {
						noteData.pop();
					}
				}
				addNotestoPage();
			},
		});
	});
});
