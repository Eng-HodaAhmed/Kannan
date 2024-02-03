export class SubscriptionModel{
    OrgId: number
    Token: string
    Amount: number
    TransferImage: string
    Year: string
    SubscriptionType: string

    /**
     *
     */
    constructor(orgId,token,amount,transfereImg,year,subscriptionType) {
        this.OrgId=orgId;
        this.Token=token;
        this.Amount=amount;
        this.TransferImage=transfereImg;
        this.Year=year;
        this.SubscriptionType=subscriptionType;
        
    }
}