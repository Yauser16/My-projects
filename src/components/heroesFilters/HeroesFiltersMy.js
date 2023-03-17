
import {useHttp} from '../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import {elementFetched, heroesFetched, heroesFetching, heroesFetchingError} from '../../actions';
import classNames from 'classnames';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом



const HeroesFilters = () => {
    const {filters, element} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();
    

   

    const filtering = (e) => { 
            dispatch(heroesFetching());
            const target = e.target.value;
            request("http://localhost:3001/heroes")
                .then(dispatch(elementFetched(target)))
                .then(data => target !== 'all' ? data.filter((item) => item.element === target) : data)
                .then(data => dispatch(heroesFetched(data)))
                .catch(() => dispatch(heroesFetchingError()));
    };

    let elementClassName;
    let elementName;

    const options = (arr) => {
        return arr.map((item, i) => {
            switch (item) {
                case 'fire':
                    elementClassName = 'btn btn-danger';
                    elementName = 'огонь';
                    break;
                case 'water':
                    elementClassName = 'btn btn-primary';
                    elementName = 'вода';
                    break;
                case 'wind':
                    elementClassName = 'btn btn-success';
                    elementName = 'ветер';
                    break;
                case 'earth':
                    elementClassName = 'btn btn-secondary';
                    elementName = 'земля';
                    break;
                case 'all':
                    elementClassName = 'btn btn-outline-dark';
                    elementName = 'все';
                    break;
                default:
                    elementClassName = 'btn btn-warning';
                    elementName = 'огонь';
            }
            const btn = classNames(elementClassName, {
                'active': element === item}); 
              return  <button onClick={e => filtering(e)} key={i} value={item} className={btn}>{elementName}</button>
            }
    )}
    const elem = options(filters);

  

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elem}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;