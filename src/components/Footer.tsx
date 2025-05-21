import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#144', padding: '2rem', color: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div>
          <p>Hecho con ❤️ en Ecuador</p>
          <p>Este sitio es de acceso libre y educativo</p>
        </div>
        <div>
          <strong>Mapa del Sitio</strong><br />
          <Link href="/equipo">Equipo</Link><br />
          <Link href="/metodologia">Metodología</Link><br />
          <Link href="/entrevistas">Entrevistas</Link><br />
          <Link href="/difunde">Difunde</Link><br />
          <Link href="/recursos">Recursos</Link>
        </div>
        <div>
          <strong>Redes Sociales</strong><br />
          <p>Twitter</p>
          <p>TikTok</p>
          <p>Youtube</p>
          <p>Facebook</p>
          <p>Instagram</p>
        </div>
      </div>
    </footer>
  );
}
