import Navbar from "@/components/Navbar";
import "../globals.css";

export default function ProtectedLayout({ children }) {
    return (
        <html>
            <body>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
