import "../globals.css";

export default function AuthLayout({ children }) {
    return (
        <html>
            <body>
                {children}
            </body>
        </html>
    );
}
