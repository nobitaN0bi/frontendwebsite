import { investorFilms } from '../../data/cinematicJourneys';
import { FilmJourney } from './FilmJourney';

export const VentureJourney = ({ onJoin }) => <FilmJourney film={investorFilms.venture} onJoin={onJoin} />;