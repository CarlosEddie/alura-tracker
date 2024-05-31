export enum NotificationType {
    SUCCESS,
    FAILURE,
    ATTENTION,
}

export interface INotification {
    title: string
    text: string
    type: NotificationType
    id: number
}