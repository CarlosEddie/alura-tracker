import { NotificationType } from "@/interfaces/INotification"
import { store } from "@/store"
import { NOTIFY } from "@/store/mutation-type"

type Notifier = {
    notify: (type: NotificationType, title: string, text: string) => void
}

export default () : Notifier => {
    const notify = (type: NotificationType, title: string, text: string): void => {
        store.commit(NOTIFY, {
            title,
            text,
            type,
        })
    }

    return {
        notify
    }
}