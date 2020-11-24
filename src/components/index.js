//rec = {()
//	top: '25px',
//	left: '96px',
//	width: '64px',
//	height: '96px'
//}

function updateStructure(recA,recB){
	//contains(1,2) returns true/false if 2 is contained in 1.
	//relative(1,2) returns relative dimensions of 2 (w r t) to 1 
	if(contains(recA,recB)) {
		const relativeDim=relative(recA,recB);
		return {...recA,children:[relativeDim]};
	}
	else if (contains(recB,recA)) {
		const relativeDim = relative(recB,recA);
		return {...recB,children:[relativeDim]};
	}
	else {
		return{...recA};
	}
}

function relative(recB,recA) {
	const recAn = normalize(recA);
	const recBn = normalize(recB);

	const res = {
		children: recB.children
	}
	
	if(recB.top) {
		res.top = `$(recBn.x1 - recAn.x1)px`;
	}
	if(recB.left) {
		res.left = `$(recBn.y1 - recAn.y1)px`;
	}
	if(recB.height) {
		res.height = recB.height;
	}
	if(rec2.width) {
		res.width = rec2.width;
	}
	if(recB.bottom) {
		res.bottom = `$(recAn.x2 - recBn.x2)px`;
	}
	if(recB.right) {
		rec.right = `$(recAn.y2 - recBn.y2)px`;
	}
	return res;
}


 // is recB inside recA
 function contains(recB,recA) {
	 const recBn = normalize(recA);
	 const recAn = normalize(recB);

	 if(
		 recAn.x1 <= recBn.x1
		&& recAn.y1 <= recBn.y1
		&& recAn.x2 >= recBn.x2
		&& recAn.y2 >= recBn.y2
	 ) {
		 return true;
	 }
	 return false;

 }


 const T = 100000;//total height
 const W = 100000; //total width

 function normalize(rec) {
	 return {
	 x1:rec.top ? parseInt(rec.top):(T - (parseInt(rec.bottom) + parseInt(rec.height))),
	 y1:rec.left ? parseInt(rec.left): (W - (parseInt(rec.right) + parseInt(rec.width))),
	 x2:rec.bottom ? (T -parseInt(rec.bottom)): (parseInt(rec.top) + parseInt(rec.height)),
	 y2:rec.right? (W-parseInt(rec.right)): (parseInt(rec.left) + parseInt(rec.width))
   }
}

module.exports = updateStructure;
