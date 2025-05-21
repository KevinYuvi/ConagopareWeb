import dynamic from 'next/dynamic';

const PaginaProblemas = dynamic(() => import('../components/PaginaProblemas'), {
  ssr: false
});

export default function ProblemasPage() {
  return <PaginaProblemas />;
}
