import { User } from "./user";

export class UrlLink {
    id: number=0;
    longUrl: string="";
    tinyUrl: string="";
    alias: string="";
    userId!: User;
}
