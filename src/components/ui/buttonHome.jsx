import { Home } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ButtonHome() {
    function handleCickRefHome() {
        window.location.href = '/'
    }
    return (
        <Button onClick={handleCickRefHome} variant="ghost" >
            <Home ></Home>
        </Button>
    )
}
