//
//
//
class Space{
    constructor(n_, num_, r_, g_, b_, dir){
        this.name=n_;
        this.num=num_;
        this.red=r_;
        this.green=g_;
        this.blue=b_;
        this.dir=dir;
        this.dirStr="";
    }
    
    getDir(){
        return this.dir;
    }

    getDirStr(){
        this.dirStr="";
        if(this.dir.No!==0 && this.dir.No!==undefined) this.dirStr+=".n"+this.dir.No;
        if(this.dir.NW!==0 && this.dir.NW!==undefined) this.dirStr+=".ne"+this.dir.NW;
        if(this.dir.We!==0 && this.dir.We!==undefined) this.dirStr+=".w"+this.dir.We;
        if(this.dir.SW!==0 && this.dir.SW!==undefined) this.dirStr+=".sw"+this.dir.SW;
        if(this.dir.So!==0 && this.dir.So!==undefined) this.dirStr+=".s"+this.dir.So;
        if(this.dir.SE!==0 && this.dir.SE!==undefined) this.dirStr+=".se"+this.dir.SE;
        if(this.dir.Ea!==0 && this.dir.Ea!==undefined) this.dirStr+=".e"+this.dir.Ea;
        if(this.dir.NE!==0 && this.dir.NE!==undefined) this.dirStr+=".ne"+this.dir.NE;
        return this.dirStr;
    }
    getValidDirStr(){
        this.dirStr="";
        if(this.dir.No!==0 && this.dir.No!==undefined) this.dirStr+=".n";
        if(this.dir.NW!==0 && this.dir.NW!==undefined) this.dirStr+=".ne";
        if(this.dir.We!==0 && this.dir.We!==undefined) this.dirStr+=".w";
        if(this.dir.SW!==0 && this.dir.SW!==undefined) this.dirStr+=".sw";
        if(this.dir.So!==0 && this.dir.So!==undefined) this.dirStr+=".s";
        if(this.dir.SE!==0 && this.dir.SE!==undefined) this.dirStr+=".se";
        if(this.dir.Ea!==0 && this.dir.Ea!==undefined) this.dirStr+=".e";
        if(this.dir.NE!==0 && this.dir.NE!==undefined) this.dirStr+=".ne";
        return this.dirStr;
    }


    display(){
        var s=this.name+","+this.num;
        console.log(s);
    }
}

class Rel{
    constructor(a, b, v){
        this.spaceA=a;
        this.spaceB=b;
        this.val=v;
    }
    display(){
        console.log(this.spaceA.name+","+this.spaceB.name+" = "+this.val);
    }
}

class Pt{
    constructor(x,y){
        this.X=x;
        this.Y=y;
    }
    display(){
        console.log(this.X+", "+ this.Y);
    }
}