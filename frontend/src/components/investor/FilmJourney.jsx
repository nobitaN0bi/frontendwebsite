import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Seo } from '../Seo';
import { FilmStage } from './FilmStage';
import { useCinematicScenes } from './useCinematicScenes';
import { useInvestorReducedMotion } from './useInvestorReducedMotion';

export const FilmJourney = ({ film, customer = false, onJoin }) => {
  const { ref, active, goTo } = useCinematicScenes(film.scenes.length);
  const reduced = useInvestorReducedMotion();
  const scene = film.scenes[active];
  return <div className={`cinematic-journey cinematic-${film.variant}`} data-testid={`${film.id}-destination-page`}>
    <Seo title={`${film.label} — Acoord Ahi`} description={film.scenes[0].body} path={film.path} />
    <section ref={ref} className="film-scroll" style={{ '--scene-count': film.scenes.length }} data-testid={`${film.id}-film-scroll`}>
      <div className="film-sticky">
        <header className="film-header"><Link to={customer ? '/investor/customer' : '/investor?intent=investor'} data-testid={`${film.id}-back-link`}><ArrowLeft size={14} /> Change lens</Link><div><span>{film.label}</span>{film.context && <b data-testid={`${film.id}-context-label`}>{film.context.toUpperCase()}</b>}<em>{String(active + 1).padStart(2, '0')} / {String(film.scenes.length).padStart(2, '0')}</em></div></header>
        <div className="film-composition">
          <div className="film-caption" data-testid={`${film.id}-scene-caption`}>
            <AnimatePresence mode="wait"><motion.div key={active} initial={reduced ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -16 }} transition={{ duration: reduced ? 0 : .45, ease: [0.16, 1, 0.3, 1] }}><p>{scene.eyebrow}</p><h1 data-testid={`${film.id}-title`}>{scene.title}</h1><span>{scene.body}</span></motion.div></AnimatePresence>
          </div>
          <FilmStage variant={film.variant} active={active} signal={scene.signal} />
        </div>
        <footer className="film-controls"><div className="film-progress" aria-hidden="true"><motion.i animate={{ scaleX: (active + 1) / film.scenes.length }} /></div><nav aria-label={`${film.label} scenes`}>{film.scenes.map((item, index) => <button key={item.eyebrow} type="button" className={active === index ? 'active' : ''} onClick={() => goTo(index)} data-testid={`${film.id}-scene-${index + 1}-button`}><span>{String(index + 1).padStart(2, '0')}</span><b>{item.eyebrow.split('/ ')[1]}</b></button>)}</nav></footer>
      </div>
    </section>
    <section className="film-proof" data-testid={`${film.id}-proof-boundary`}><div><span>BUILT</span><p>{film.proof.built}</p></div><div><span>ARCHITECTURE</span><p>{film.proof.architecture}</p></div>{customer && <div><span>MODELED</span><p>{film.proof.modeled}</p></div>}</section>
    <section className="film-close" data-testid={`${film.id}-close-section`}><p>NEXT / HUMAN CONVERSATION</p><h2>{film.close}</h2><div><a href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid={`${film.id}-book-link`}>Book a working session <ArrowUpRight size={15} /></a><button type="button" onClick={onJoin} data-testid={`${film.id}-waitlist-button`}><Download size={14} /> Join the desktop waitlist</button></div></section>
  </div>;
};