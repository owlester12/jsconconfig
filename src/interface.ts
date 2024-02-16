export interface action{
    name: string;
    type: string; 
    instruction?: string; 
}
export interface file{
    name: string;
    version: string;
    actions: action[]
}
export interface jsonProps{
    config: file;
}

export interface actionProps{
    act: action;
    ind: number;
    change: (ind:number, val:string, target:string) => void
    del: (ind:number) => void
    validName: boolean;
}