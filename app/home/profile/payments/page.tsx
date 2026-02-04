import UserPaymentsView from "@/views/profile/UserPaymentsView"
import { Metadata } from "next"

export const metadata : Metadata = {
    title: "Ver pagos"
}

export default function page() {
    return (
        <UserPaymentsView />
    )
}
