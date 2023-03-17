import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched,  heroesFetchingError } from '../../actions';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const {heroes, heroesLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()));

        // eslint-disable-next-line
    }, []);
    
    const heroDelete = (e) => {
        const close = e.target.id;
        const newHeroes = heroes.filter(item => item.id !== close);
        request(`http://localhost:3001/heroes/${close}`, 'DELETE')
          .then(data => console.log(data, 'Deleted'))
          .then(dispatch(heroesFetched(newHeroes)))
          .catch(err => console.log(err));
    };

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }
        return arr.map(({id, ...props}) => {
            return (
            <CSSTransition
            key={id}
            timeout={500}
            classNames='item'>
                <HeroesListItem key={id} id={id} {...props} heroDelete={heroDelete} />
            </CSSTransition>
            )
            
        } )
    }
   
    const elements =  renderHeroesList(heroes);
    return (
            <ul>
                <TransitionGroup component={null}l>
                    {elements}
                </TransitionGroup>
            </ul>
        
      
    )
    
}

export default HeroesList;