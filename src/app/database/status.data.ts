export interface Status {
    status: string;
    id: string;

}

export class StatusData {
    public static datas: Status[] = [
        {
            status: "All",
            id: "1"
        }, 
        {
            status: "Open",
            id: "2"
        },
        {
            status: "Completed",
            id: "3"
        },
        {
            status: "Cancelled",
            id: "4"
        },
    ];


}