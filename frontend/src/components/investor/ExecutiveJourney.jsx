import { customerFilm } from '../../data/cinematicJourneys';
import { FilmJourney } from './FilmJourney';

export const ExecutiveJourney = ({ department, industry, onJoin }) => <FilmJourney film={customerFilm('executive', department, industry)} customer onJoin={onJoin} />;