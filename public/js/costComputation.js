/// add form
function toggleShowComputeForm() {
	showCostCompDiv = !showCostCompDiv;
	showComputeForm();
}

function showComputeForm() {
	if (showCostCompDiv) {
		document.getElementById('costComputationDiv').style.display = 'block';
	} else {
		document.getElementById('costComputationDiv').style.display = 'none';
	}
}

function computeAtDate() {
	console.log('computing...');
	showCostCompDiv = true;
	showComputeForm();

	let tbl = document.getElementById('solutionTable');
	while (tbl.firstChild) {
		tbl.removeChild(tbl.firstChild);
	}

	let sol = analyzeData();
	let objArr = sol.objArr; // array of
	let netBalance = sol.netBalance; // print directly - add to table
	if (isNaN(netBalance)) {
		errorMsg(tbl);
		return;
	}

	// net balance
	let tr1 = document.createElement('tr');
	let td1 = document.createElement('td');
	let p = document.createElement('p');
	p.innerHTML = 'Balance';
	td1.appendChild(p);
	tr1.appendChild(td1);

	let td2 = document.createElement('td');
	let p2 = document.createElement('p');
	p2.innerHTML = netBalance;
	td2.appendChild(p2);
	tr1.appendChild(td2);
	tbl.appendChild(tr1);
	console.log(netBalance.toFixed(2));

	// steps taken in func below
	generateTable(tbl, objArr);

	// download button
	testDownload(tbl, objArr, netBalance);
}

function errorMsg(tbl) {
	let tr = document.createElement('tr');
	let td0 = document.createElement('td');
	td0.className = 'errorMsg';
	let p0 = document.createElement('p');
	p0.innerHTML = 'System Message';
	td0.appendChild(p0);
	tr.appendChild(td0);

	let td1 = document.createElement('td');
	td1.className = 'errorMsg';
	let p1 = document.createElement('p');
	p1.innerHTML = 'ENTER A DATE';
	td1.appendChild(p1);
	tr.appendChild(td1);
	tbl.appendChild(tr);
}

function generateTable(tbl, objArr) {
	try {
		let X = document.getElementsByClassName('errorMsg');
		X.forEach((e) => {
			document.removeChild(X);
		});
	} catch (e) {}

	let tr = document.createElement('tr');
	let td1 = document.createElement('td');
	let p1 = document.createElement('p');
	p1.innerHTML = 'Value';
	td1.appendChild(p1);
	tr.appendChild(td1);

	let td2 = document.createElement('td');
	let p2 = document.createElement('p');
	p2.innerHTML = 'Cycles';
	td2.appendChild(p2);
	tr.appendChild(td2);

	let td3 = document.createElement('td');
	let p3 = document.createElement('p');
	p3.innerHTML = 'Balance';
	td3.appendChild(p3);
	tr.appendChild(td3);

	tbl.appendChild(tr);

	objArr.forEach((e) => {
		console.log(e);
		let tr = document.createElement('tr');
		let td1 = document.createElement('td');
		let p1 = document.createElement('p');
		p1.innerHTML = e.val;
		td1.appendChild(p1);
		tr.appendChild(td1);

		let td2 = document.createElement('td');
		let p2 = document.createElement('p');
		p2.innerHTML = e.cycles;
		td2.appendChild(p2);
		tr.appendChild(td2);

		let td3 = document.createElement('td');
		let p3 = document.createElement('p');
		p3.innerHTML = e.balance;
		td3.appendChild(p3);
		tr.appendChild(td3);

		tbl.appendChild(tr);
	});
}

function testDownload(tbl, objArr, netBalance) {
	let s = 'net balance, ' + netBalance.toFixed(2).toString() + '\n';
	s += 'value, cycles, balance\n';
	objArr.forEach((e) => {
		let a = e.val.toFixed(2).toString();
		let b = e.cycles.toFixed(2).toString();
		let c = e.balance.toFixed(2).toString();
		s += a + ',' + b + ',' + c + '\n';
	});

	/// generate button for download in new table below
	let dTbl = document.getElementById('downloadTable');
	let trBtn = document.createElement('tr');
	let tdBtn1 = document.createElement('td');
	tdBtn1.innerHTML = 'Download CSV';
	trBtn.appendChild(tdBtn1);

	let btn = document.createElement('button');
	btn.innerHTML = 'Download';
	btn.className = 'btn btn-standard';
	btn.onclick = function () {
		var content = s;
		var filename = 'accounts.csv';
		var blob = new Blob([content], {
			type: 'text/plain;charset=utf-8',
		});
		saveAs(blob, filename);
	};
	let tdBtn2 = document.createElement('td');
	tdBtn2.appendChild(btn);
	trBtn.appendChild(tdBtn2);
	dTbl.appendChild(trBtn);
}

function analyzeData() {
	let queryDate = document.getElementById('queryDate').value;
	let data = [...jsonData];
	let objArr = [];
	let balance = 0.0;
	data.forEach((x) => {
		let ob = {};
		if (x.moneyType === 'gift') {
			let T = availableFunds(x.incomeDate, x.spendDate, queryDate);
			balance += x.val;
			ob = { val: x.val, cycles: 1, balance: balance };
		} else if (x.moneyType === 'expense') {
			balance -= x.val;
			ob = { val: x.val, cycles: 1, balance: balance };
		} else if (x.moneyType === 'income') {
			let r = getRecurringAmt(x.incomeDate, queryDate, x.val);
			let res = r.res;
			let numCycles = r.numCycles;
			balance += res;
			ob = { val: x.val, cycles: numCycles, balance: balance };
		} else if (x.moneyType === 'debt') {
			let r = getRecurringAmt(x.incomeDate, queryDate, x.val);
			let res = r.res;
			let numCycles = r.numCycles;
			balance -= res;
			ob = { val: x.val, cycles: numCycles, balance: balance };
		}
		objArr.push(ob);
	});
	return { objArr, netBalance: balance };
}

function availableFunds(a, b, r) {
	let A = new Date(a);
	let B = new Date(b);
	let C = new Date(r);
	return B > C ? true : false;
}

function getRecurringAmt(a, b, val) {
	let A = new Date(a);
	let B = new Date(b);
	let utcA = Date.UTC(A.getFullYear(), A.getMonth(), A.getDate());
	let utcB = Date.UTC(B.getFullYear(), B.getMonth(), B.getDate());
	const msPerDay = 1000 * 60 * 60 * 24;
	let daysAB = Math.floor((utcB - utcA) / msPerDay);
	let cycles = 30; // days in each cycle
	let numCycles = Math.floor(daysAB / cycles);
	let res = val * numCycles;
	return { res, numCycles };
}
