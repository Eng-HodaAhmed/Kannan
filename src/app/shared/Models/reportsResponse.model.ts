export class ReportsResponse{
    RespCode: string
    RespMsg: string
    Details: [
        {
            EmployeeName: string,
            LateMins: number,
            AbsenceWithExecuse: number,
            AbsenceWithoutExecuse: number
        },
    ]
}