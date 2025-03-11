import { Contact } from "./pages/Contact";
import { Features } from "./pages/Features";
import { Home } from "./pages/Home";
import { Resources } from "./pages/Resource";

export function Hero(){
    return(
        <>
            <Home/>
            <Resources/>
            <Features/>
            <Contact/>
        </>
    )
}