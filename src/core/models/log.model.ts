import { BaseEntity } from "./website";

export interface SystemLog extends BaseEntity {
    detail: string;
}