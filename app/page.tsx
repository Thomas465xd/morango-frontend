import Header from "@/components/home/Header";
import NavBar from "@/components/home/NavBar";
import Divider from "@/components/ui/Divider";

export default function Page() {
    return (
        <main className="flex-grow">
            <NavBar />
            <Header />

            <Divider text="Continue" />
        </main>
    )
}
