
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import {useHttp} from '../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import {filtersFetched, heroesFetched} from '../../actions';
import { Formik, Form, Field, ErrorMessage as ErrorMes } from 'formik';
import * as Yup from 'yup';


// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров


const HeroesAddForm = () => {
    const {filters, heroes} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();
    

    useEffect(() => {
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)));
        // eslint-disable-next-line
    }, []);

    const submitForm = (values) => {
        const newHeroy = {
            id: uuidv4(),
            name: values.name,
            description: values.text,
            element: values.element !== "Я владею элементом..." ? values.element : null
        };
        const newHeroyArr = [...heroes, newHeroy];
        
        request(`http://localhost:3001/heroes`, "POST", JSON.stringify(newHeroy))
        .then(res => console.log(res, 'Отправка успешна'))
        .then(dispatch(heroesFetched(newHeroyArr)))
        .catch(err => console.log(err));
        
    };
     const optionContent = (item) => {
        let cont;
        if (item === 'fire') {
            cont = 'огонь';
        } 
        if (item === 'water') {
            cont = 'вода';
        }
        if (item === 'wind') {
            cont = 'ветер';
        }
        if (item === 'earth') {
            cont = 'земля';
        }
        return cont;
    };
    
    const options = (arr) => {
        if (arr && arr.length > 0 ){
        return arr.map((item, i) => { 
            if (item !== 'all') {
              return  <option key={i} value={item}>{optionContent(item)}</option>
            } 
            return null;
    })}}
    const elem = options(filters);

    return (
        <Formik 
        initialValues={{
            name: '',
            text: '',
            element: ''
        }}
        validationSchema={Yup.object({
            name: Yup.string()
            .min(2, 'Минимум 2 символа')
            .required('Обязательное поле!'),
            text: Yup.string()
            .min(2, 'Минимум 2 символа')
            .required('Обязательное поле!'),
            element: Yup.string()
            .required('Выберите элемент')
        })}

        onSubmit={values => submitForm(values)}> 
        <Form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <Field 
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
                    <ErrorMes className='text-danger' name="name" component='p'/>
            </div>
            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <Field
                    as='textarea'
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
                    <ErrorMes className='text-danger' name="text" component='p'/>
            </div>
            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <Field 
                    as='select'
                    className="form-select" 
                    id="element" 
                    name="element">
                    <option value="">Я владею элементом...</option>
                    {elem}
                </Field>
                <ErrorMes className='text-danger' name="element" component='p'/>
            </div>
            <button type="submit" className="btn btn-primary">Создать</button>
            </Form>
        </Formik>
    )
}

export default HeroesAddForm;