//rec = {
//	top: '25px',
//	left: '96px',
//	width: '64px',
//	height: '96px'
//}

const { container } = require("webpack");

function updateStructure(recA,recB){
	//write your code
	//contains(A,B) returns true/false if B is contained in A
	//relative(A,B) returs relative dimensions of B with respect to A
	if(contains(recA,recB)){
		const relativeDim = relative(recA,recB);
		return {...recA,children: [relativeDim]};
	}else if(contains(recB,recA)){
		const relativeDim = relative(recB,recA);
		return {...recB,children: [relativeDim]};
	}
	else{
		return {...recA};
	}
}

//relative dimensions of recB w.r.t to recA
function relative(recA,recB){
	const recAn=normalize(recA);
	const recBn=normalize(recB);
	
	const res={
		children: recB.children
	}
	if(recB.top){
		res.top=`${recBn.x1 - recAn.x1}px`;
	}
	if(recB.left){
		res.left=`${recBn.y1 - recAn.y1}px`;
	}
	if(recB.height){
		res.height=recB.height;
	}
	if(recB.width){
		res.width=recB.width;
	}
	if(recB.bottom){
		res.bottom=`${recAn.x2 - recBn.x2}px`;
	}
	if(recB.right){
		res.right=`${recAn.y2 - recBn.y2}px`;
	}
	return res;
}

//is recB inside recA
function contains(recA,recB){
	const recAn=normalize(recA);
	const recBn=normalize(recB);

	if(recAn.x1<=recBn.x1 && recAn.y1<=recBn.y1 && recAn.x2>=recBn.x2 && recAn.y2>=recBn.y2){
		return true;
	}
	return false;
}

const T=0;//total height
const W=0;//total width

function normalize(rec){
	return{
		x1: rec.top ? parseInt(rec.top) : (T-(parseInt(rec.bottom)+parseInt(rec.height))),
		y1: rec.left ? parseInt(rec.left) : (W-(parseInt(rec.right)+parseInt(rec.width))),
		x2: rec.bottom ? (T-parseInt(rec.bottom)):(parseInt(rec.top)+parseInt(rec.height)),
		y2: rec.right ? (W-parseInt(rec.right)): (parseInt(rec.left) + parseInt(rec.width))
	}
}

module.exports = updateStructure;