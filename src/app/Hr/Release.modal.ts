export class Release{
    public id:number;
    public releaseDate:string;
    public releaseReason:string
    /**
     *
     */
    constructor(id:number,date:string,reason:string) {
        this.id=id;
        this.releaseDate=date;
        this.releaseReason=reason;
        
    }
}