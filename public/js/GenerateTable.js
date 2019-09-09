//
//
//
function generateTable(tblname, tdclass){
    let tbl=document.getElementById(tblname);
    while(tbl.hasChildNodes()){
        tbl.removeChild(tbl.firstChild);
    }
    //create header row and cells
    let tr0=document.createElement("tr");

    let tdname=document.createElement("td");
    tdname.innerHTML="NAME";
    tdname.className=tdclass;

    let tda=document.createElement("td");
    tda.innerHTML="a";
    tda.className=tdclass;

    let tdb=document.createElement("td");
    tdb.innerHTML="b";
    tdb.className=tdclass;

    let tdc=document.createElement("td");
    tdc.innerHTML="c";
    tdc.className=tdclass;

    let tdd=document.createElement("td");
    tdd.innerHTML="d";
    tdd.className=tdclass;

    let tde=document.createElement("td");
    tde.innerHTML="e";
    tde.className=tdclass;

    let tdf=document.createElement("td");
    tdf.innerHTML="f";
    tdf.className=tdclass;

    let tdg=document.createElement("td");
    tdg.innerHTML="g";
    tdg.className=tdclass;


    let tdn=document.createElement("td");
    tdn.innerHTML="North";
    tdn.className=tdclass;

    let tdnw=document.createElement("td");
    tdnw.innerHTML="North-West";
    tdnw.className=tdclass;

    let tdw=document.createElement("td");
    tdw.innerHTML="West";
    tdw.className=tdclass;

    let tdsw=document.createElement("td");
    tdsw.innerHTML="South-West";
    tdsw.className=tdclass;

    let tds=document.createElement("td");
    tds.innerHTML="South";
    tds.className=tdclass;

    let tdse=document.createElement("td");
    tdse.innerHTML="South-East";
    tdse.className=tdclass;

    let tdea=document.createElement("td");
    tdea.innerHTML="East";
    tdea.className=tdclass;

    let tdne=document.createElement("td");
    tdne.innerHTML="North-East";
    tdne.className=tdclass;

    let tdnum=document.createElement("td");
    tdnum.innerHTML="Number";
    tdnum.className=tdclass;

    tr0.appendChild(tdname);
    tr0.appendChild(tda);
    tr0.appendChild(tdb);
    tr0.appendChild(tdc);
    tr0.appendChild(tdd);
    tr0.appendChild(tde);
    tr0.appendChild(tdf);
    tr0.appendChild(tdg);
    tr0.appendChild(tdn);
    tr0.appendChild(tdnw);
    tr0.appendChild(tdw);
    tr0.appendChild(tdsw);
    tr0.appendChild(tds);
    tr0.appendChild(tdse);
    tr0.appendChild(tdea);
    tr0.appendChild(tdne);
    tr0.appendChild(tdnum);

    tbl.appendChild(tr0);

    for(let i=0; i<SPACES.length; i++){
        let trI=generateTableVals(SPACES[i], tdclass);
        tbl.appendChild(trI);
    }

    return tbl;
}

// take the space object, and the name {"a"-"g"} from cells 
// check if space object name === ADJREL[i].spaceA or B name 
// check if name from cell === other ADJREL[i].space B or A name
// get the val and return the value
function getAdjValOfSpace(space, name){
    let val=0.0;
    for(let i=0; i<ADJREL.length; i++){
        let u=ADJREL[i].spaceA.name;
        let v=ADJREL[i].spaceB.name;
        if((u===space.name && v===name) || (u===name && v===space.name)) {
            val=ADJREL[i].val;
            break;
        }
    }
    return val;
}

function generateTableVals(reqSpace, tdclass){
    trI=document.createElement("tr");

    let tdname=document.createElement("td");
    tdname.innerHTML=reqSpace.name;
    tdname.className=tdclass;

    let tda=document.createElement("td");
    tda.innerHTML= getAdjValOfSpace(reqSpace, "a");
    tda.className=tdclass;
    tda.contentEditable='true';


    let tdb=document.createElement("td");
    tdb.innerHTML=getAdjValOfSpace(reqSpace, "b");
    tdb.className=tdclass;
    tdb.contentEditable='true';


    let tdc=document.createElement("td");
    tdc.innerHTML=getAdjValOfSpace(reqSpace, "c");
    tdc.className=tdclass;
    tdc.contentEditable='true';


    let tdd=document.createElement("td");
    tdd.innerHTML=getAdjValOfSpace(reqSpace, "d");
    tdd.className=tdclass;
    tdd.contentEditable='true';


    let tde=document.createElement("td");
    tde.innerHTML=getAdjValOfSpace(reqSpace, "e");
    tde.className=tdclass;
    tde.contentEditable='true';


    let tdf=document.createElement("td");
    tdf.innerHTML=getAdjValOfSpace(reqSpace, "f");
    tdf.className=tdclass;
    tdf.contentEditable='true';


    let tdg=document.createElement("td");
    tdg.innerHTML=getAdjValOfSpace(reqSpace, "g");
    tdg.className=tdclass;
    tdg.contentEditable='true';

    let tdn=document.createElement("td");
    tdn.innerHTML=reqSpace.dir.No;
    tdn.className=tdclass;
    tdn.contentEditable='true';

    let tdnw=document.createElement("td");
    tdnw.innerHTML=reqSpace.dir.NW;
    tdnw.className=tdclass;
    tdnw.contentEditable='true';

    let tdw=document.createElement("td");
    tdw.innerHTML=reqSpace.dir.We;
    tdw.className=tdclass;
    tdw.contentEditable='true';

    let tdsw=document.createElement("td");
    tdsw.innerHTML=reqSpace.dir.SW;
    tdsw.className=tdclass;
    tdsw.contentEditable='true';

    let tds=document.createElement("td");
    tds.innerHTML=reqSpace.dir.So;
    tds.className=tdclass;
    tds.contentEditable='true';

    let tdse=document.createElement("td");
    tdse.innerHTML=reqSpace.dir.SE;
    tdse.className=tdclass;
    tdse.contentEditable='true';

    let tdea=document.createElement("td");
    tdea.innerHTML=reqSpace.dir.Ea;
    tdea.className=tdclass;
    tdea.contentEditable='true';

    let tdne=document.createElement("td");
    tdne.innerHTML=reqSpace.dir.NE;
    tdne.className=tdclass;
    tdne.contentEditable='true';

    let tdnum=document.createElement("td");
    tdnum.innerHTML=reqSpace.num;
    tdnum.className=tdclass;
    tdnum.contentEditable="true";

    trI.appendChild(tdname);
    trI.appendChild(tda);
    trI.appendChild(tdb);
    trI.appendChild(tdc);
    trI.appendChild(tdd);
    trI.appendChild(tde);
    trI.appendChild(tdf);
    trI.appendChild(tdg);
    trI.appendChild(tdn);
    trI.appendChild(tdnw);
    trI.appendChild(tdw);
    trI.appendChild(tdsw);
    trI.appendChild(tds);
    trI.appendChild(tdse);
    trI.appendChild(tdea);
    trI.appendChild(tdne);
    trI.appendChild(tdnum);
    return trI;
}

function getCellVal(t){
    var val=0;
    try{
        val=parseFloat(t.innerHTML);
        if(isNaN(val)) val=0.0;
    }
    catch(Exception){
        // error in ui data
    }
    return val;
}


function getAdjCellVal(space, a, b, c, d, e, f, g){
    var rel=[];
    if(a!==0) rel.push([space.name, "a", a]);
    if(b!==0) rel.push([space.name, "b", b]);
    if(c!==0) rel.push([space.name, "c", c]);
    if(d!==0) rel.push([space.name, "d", d]);
    if(e!==0) rel.push([space.name, "e", e]);
    if(f!==0) rel.push([space.name, "f", f]);
    if(g!==0) rel.push([space.name, "g", g]);
    return rel;
}

function updateDataFromTable(){
    
    clearAllGlobalParams();

    var adjrel=[];
    var allnums=0;
    let tbl=document.getElementById("editTable");
    for(var i=1; i<tbl.rows.length; i++){
        var cols=tbl.rows.item(i).cells;
        var name=cols.item(0).innerHTML;
        var a=getCellVal(cols.item(1));
        var b=getCellVal(cols.item(2));
        var c=getCellVal(cols.item(3));
        var d=getCellVal(cols.item(4));
        var e=getCellVal(cols.item(5));
        var f=getCellVal(cols.item(6));
        var g=getCellVal(cols.item(7));

        var no=getCellVal(cols.item(8));
        var nw=getCellVal(cols.item(9));
        var we=getCellVal(cols.item(10));
        var sw=getCellVal(cols.item(11));
        var so=getCellVal(cols.item(12));
        var se=getCellVal(cols.item(13));
        var ea=getCellVal(cols.item(14));
        var ne=getCellVal(cols.item(15));
        var num=getCellVal(cols.item(16));
        allnums+=parseFloat(num);

        var dir={"No":no, "NW":nw, "We":we, "SW":sw, "So":so, "SE":se, "Ea":ea, "NE":ne};

        // dummy values to build adj relations
        let dirBlank={"No":0, "NW":0, "We":0, "SW":0, "So":0, "SE":0, "Ea":0, "NE":0};
        var A=new Space("a", 7, 200,0,0, dirBlank);
        var B=new Space("b", 7, 200,0,200, dirBlank);
        var C=new Space("c", 7, 255,255,0, dirBlank);
        var D=new Space("d", 7, 0,0,200, dirBlank);
        var E=new Space("e", 7, 0,200,0, dirBlank);
        var F=new Space("f", 7, 100,200,200, dirBlank);
        var G=new Space("g", 10, 250,200,200, dirBlank);

        var space;
        if(name==="a"){
            space=new Space("a", num, 200,0,0,dir);
        }
        else if(name === "b"){
            space=new Space("b", num, 200,0,200,dir);
        }
        else if(name === "c"){
            space=new Space("c", num, 255,255,0,dir);
        }
        else if(name==="d"){
            space=new Space("d", num, 0,0,200, dir);
        }
        else if(name==="e"){
            space=new Space("e", num, 0,200,0, dir);
        }
        else if(name==="f"){
            space=new Space("f", num, 100,200,200, dir);
        }
        else if(name==="g"){
            space=new Space("g", num, 250,200,200, dir);
        }
        var rel=getAdjCellVal(space, a, b, c, d, e, f, g); // returns array[3]
        for(let j=0; j<rel.length; j++){
            adjrel.push(rel[j]);
        }
        SPACES.push(space);
    }

    if(allnums!=52){
        document.getElementById("sysmsg").innerHTML="sum of nums is not 52. default numbers are set";
        setDefaultNumbers();
    }

    // at this point spaces have been correctly defined
    // construct adj relationship by taking string names
    // check and define adj rel with space object
    ADJREL=genAdjRelFromSpaceNames(adjrel);

    initSys(false);
}

function setDefaultNumbers(){
    let tbl=document.getElementById("editTable");
    for(var i=1; i<tbl.rows.length; i++){
        var cols=tbl.rows.item(i).cells;
        if(i<tbl.rows.length-1){
            cols.item(16).innerHTML=7;
        }else{
            cols.item(16).innerHTML=10;
        }
    }
    updateDataFromTable();
}

function genAdjRelFromSpaceNames(adjrel){
    ADJREL=[]
    for(var i=0; i<adjrel.length; i++){
        var a=adjrel[i][0]; // name space A 
        var b=adjrel[i][1]; // name space B
        var v=adjrel[i][2]; // val 
        for(var j=0; j<SPACES.length; j++){
            for(var k=0; k<SPACES.length; k++){
                var A=SPACES[j].name;
                var B=SPACES[k].name;
                if((a===A && b===B) || (a===B && b===A)){
                    var t=checkDoubleAdjRel(a,b);
                    if(t===false){
                        var rel=new Rel(SPACES[j], SPACES[k], v);
                        ADJREL.push(rel);
                        break;
                    }
                }
            }
        }
    }
    return ADJREL;
}

function checkDoubleAdjRel(u,v){
    var t=false;
    if(ADJREL.length<1) return t;
    for(var i=0; i<ADJREL.length; i++){
        var a=ADJREL[i].spaceA.name;
        var b=ADJREL[i].spaceB.name;
        if((u===a && v===b) || (u===b && v===a)){
            t=true; //exists already
            break;
        }
    }
    return t;
}




