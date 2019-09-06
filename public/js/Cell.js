//
//
class Cell{
    constructor(n_,i_,x_,y_,l_,w_){
        this.name=n_;
        this.id=i_;
        this.x=x_;
        this.y=y_;
        this.l=l_;
        this.w=w_;
        this.re=255;
        this.gr=255;
        this.bl=255;
        this.mpX=this.x+this.l/2;
        this.mpY=this.y+this.w/2;
        this.spaceObj;
        this.occupied=false;
        this.No=false;
        this.NW=false;
        this.We=false;
        this.SW=false;
        this.So=false;
        this.SE=false;
        this.Ea=false;
        this.NE=false;
        this.dir=[];
    }
    setSpace(t){
        this.spaceObj=t;
        this.name=t.name;
        this.re=t.red;
        this.gr=t.green;
        this.bl=t.blue;
    }

    display(){
        CTX.fillStyle="rgba("+this.re+","+this.gr+","+this.bl+","+0.5+")";
        CTX.fillRect(this.x,this.y,this.l,this.w);

        CTX.strokeStyle="rgb(0,0,0)";
        CTX.lineWidth=1;
        CTX.strokeRect(this.x,this.y,this.l,this.w);

        CTX.fillStyle="rgb(0,0,0)";
        CTX.font="10px Arial";
        let dir=this.getDirString();
        CTX.fillText(this.name + " ("+ this.id + ")", this.x+5, this.y+15);
        CTX.fillText(dir, this.x+3, this.y+25);

    }

    setDir(cells){
        let x=this.mpX;
        let y=this.mpY;
        let l=this.l*(0.5);
        let w=this.w*(0.5);
        let r=Math.sqrt((l*l)+(w*w))*1.15;

        let n_x=x;
        let n_y=y-r;
        this.No=ptInCell(n_x,n_y,cells);
        if(this.No) this.dir.push(this.No);

        let nw_x=x-r;
        let nw_y=y-r;
        this.NW=ptInCell(nw_x,nw_y,cells);
        if(this.NW) this.dir.push(this.NW);

        let w_x=x-r;
        let w_y=y;
        this.We=ptInCell(w_x,w_y,cells);
        if(this.We) this.dir.push(this.We);

        let sw_x=x-r;
        let sw_y=y+r;
        this.SW=ptInCell(sw_x,sw_y,cells);
        if(this.SW) this.dir.push(this.SW);

        let s_x=x;
        let s_y=y+r;
        this.So=ptInCell(s_x,s_y,cells);
        if(this.So) this.dir.push(this.So);
        
        let se_x=x;
        let se_y=y+r;
        this.SE=ptInCell(se_x,se_y,cells);
        if(this.SE) this.dir.push(this.SE);

        let e_x=x+r;
        let e_y=y;
        this.Ea=ptInCell(e_x,e_y,cells);
        if(this.Ea) this.dir.push(this.Ea);

        let ne_x=x+r;
        let ne_y=y-r;
        this.NE=ptInCell(ne_x,ne_y,cells);
        if(this.NE) this.dir.push(this.NE);

    }

    getDirString(){
        let str="";
        if(this.No) str+="n.";
        if(this.NW) str+="nw.";
        if(this.We) str+="w.";
        if(this.SW) str+="sw.";
        if(this.So) str+="s.";
        if(this.SE) str+="se.";
        if(this.Ea) str+="e.";
        if(this.NE) str+="ne.";
        
        return str;
    }
}
//
//

/*
// alternative representaion:
function cell2(x,y,l,w){
    this.x=x;
    this.y=y;
    this.l=l;
    this.w=w;
    this.display=function(){
        CTX.strokeRect(this.x,this.y,this.l,this.w);
    }
}
// called as
var cell=new cell2(0,0,100,100);
cell.display();
*/