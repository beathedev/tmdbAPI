import { useEffect, useState } from "react";
import api from '../../services/api';
import { Link } from "react-router-dom";
import './home.css';

// /movie/now_playing?api_key=f3cfddbd740c74cb1f5dff19175b8b92


function Home() {
    //state pros filmes
    const [filmes, setFilmes] = useState([]);
    //state pro load dos filmes
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        //faz uma requisiçao assincrona pra api
        async function loadFilmes() {
            const response = await api.get("/movie/now_playing", {
                params:{
                    api_key: "f3cfddbd740c74cb1f5dff19175b8b92",
                    language: "pt-BR",
                    page: 1,
                }
            })

            //após obter a resposta da requisicao, ela é armazenada num estado
            // e o state de loading é atualizado
            setFilmes(response.data.results.slice(0, 10))
            setLoading(false)
        }   

        loadFilmes();
    });

    if(loading){
        return(
            <div className="loading">
                <h2>Carregando filmes..</h2>
            </div>
        )
    }
    
    // retorno da página Home
    return (
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme) => {
                    return(
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https:image.tmdb.org/t/p/original${filme.poster_path}`} />
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}


export default Home;