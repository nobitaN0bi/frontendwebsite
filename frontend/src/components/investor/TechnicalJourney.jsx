import { customerFilm } from '../../data/cinematicJourneys';
import { FilmJourney } from './FilmJourney';

export const TechnicalJourney = ({ department, industry, onJoin }) => <FilmJourney film={customerFilm('technical', department, industry)} customer onJoin={onJoin} />;