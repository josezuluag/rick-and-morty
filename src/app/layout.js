import '../styles/globals.css'; // Asegúrate de que la ruta sea correcta

export default function Layout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
