import { customerFilm } from '../../data/cinematicJourneys';
import { FilmJourney } from './FilmJourney';

export const TechnicalJourney = ({ department, industry, problem, onJoin }) => <FilmJourney film={customerFilm('technical', department, industry, problem)} customer onJoin={onJoin} />;