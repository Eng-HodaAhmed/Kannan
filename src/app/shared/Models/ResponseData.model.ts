export class ResponseData{
   public RespCode: string
    public RespMsg:string
    public Token?:string
    public OrgId?:number
    
    constructor(RespCode: string,RespMsg:string) {
        this.RespCode=RespCode,
        this.RespMsg=RespMsg
        
    }
}