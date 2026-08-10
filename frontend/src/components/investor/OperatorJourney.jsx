import { investorFilms } from '../../data/cinematicJourneys';
import { FilmJourney } from './FilmJourney';

export const OperatorJourney = ({ onJoin }) => <FilmJourney film={investorFilms.operator} onJoin={onJoin} />;