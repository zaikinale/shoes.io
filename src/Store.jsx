import { useState, useEffect } from 'react';
import { getGoods } from "./api/auth.js";
import { useNavigate } from 'react-router-dom';
import Card from "./Card.jsx";
import { useStore } from './store/useUserContext.jsx'; 

export default function Store() {
    const navigate = useNavigate();
    const userRole = useStore((state) => state.user?.role);
    const [goods, setGoods] = useState([]);

    useEffect(() => {
        const loadGoods = async () => {
            try {
                const data = await getGoods();
                setGoods(data);
            } catch (error) {
                console.error('Ошибка загрузки товаров:', error);
            }
        };

        loadGoods();
    }, []);

    const filter = () => {
        return (
            <select>
                <option value="Random" selected>Random</option>
                <option value="Alphabet">Alphabet</option>
            </select>
        )
    }

    const navigateTo = (path) => {
        return (<button className='nav' onClick={() => navigate(`/${path}`)}>{path}</button>)
    }

    if(userRole === "USER") {
        return (
            <section className="store">
                <h1 className='head'>
                    <span>Store</span> 
                    {navigateTo("basket")}
                </h1>
                <div className="container">
                    {goods.length > 0 ? (
                        goods.map((good) => (
                            <Card
                                key={good.id}
                                id={good.id}
                                title={good.title}
                                desc={good.desc}
                                price={good.price}
                                image={good.image}
                                type={'user'}
                            />
                        ))
                    ) : (
                        <p>Нет товаров</p>
                    )}
                </div>
            </section>
        );
    } else if (userRole === "MANAGER") {
        return (
            <section className="store">
                <h1 className='head'>
                    <span>Store</span> 
                    {navigateTo("orders")}
                </h1>
                <div className="filter">
                    <h2>Filter Manager</h2>
                    {filter()}
                </div>
                <div className="container">
                    {goods.length > 0 ? (
                        goods.map((good) => (
                            <Card
                                key={good.id}
                                id={good.id}
                                title={good.title}
                                desc={good.desc}
                                price={good.price}
                                image={good.image}
                                type={'manager'}
                            />
                        ))
                    ) : (
                        <p>Нет товаров</p>
                    )}
                </div>
            </section>
        );
    } else if (userRole === "ADMIN") {
        return (
            <section className="store">
                <h1>Store</h1>
                <div className="filter">
                    <h2>Filter Admina</h2>
                    {filter()}
                </div>
                <div className="container">
                    {goods.length > 0 ? (
                        goods.map((good) => (
                            <Card
                                key={good.id}
                                id={good.id}
                                title={good.title}
                                desc={good.desc}
                                price={good.price}
                                image={good.image}
                                type={'admin'}
                            />
                        ))
                    ) : (
                        <p>Нет товаров</p>
                    )}
                </div>
            </section>
        );
    } else {
        return (
            <section className="store">
                <h1>Store</h1>
                <div className="container">
                    {goods.length > 0 ? (
                        goods.map((good) => (
                            <Card
                                key={good.id}
                                id={good.id}
                                title={good.title}
                                desc={good.desc}
                                price={good.price}
                                image={good.image}
                                type={'login'}
                            />
                        ))
                    ) : (
                        <p>Нет товаров</p>
                    )}
                </div>
            </section>
        );
    }
}