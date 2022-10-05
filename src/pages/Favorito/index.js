import { useEffect, useState } from "react";
import './favorito.css';
import { Link } from "react-router-dom";


function Favoritos() {
    const [filmes, setFilmes] = useState([])
    useEffect(() => {
        const minhaLista = localStorage.getItem("@primeflix");
        setFilmes(JSON.parse(minhaLista) || [] )

    }, [])

    function excluirFilme(id) {
        let filtroFilmes = filmes.filter((item) => {
            // vai retornar todos os filmes menos o selecionado
            return(item.id !== id)
        })

        // adiciona o array sem o filme selecionado, ou seja, ele "remove" o antigo
        // por uma substituição
        setFilmes(filtroFilmes);
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
        
    }

    return (
        <div className="meus-filmes">
            <h1>Meus filmes</h1>
            {filmes.length === 0 && <span>Você não tem nenhum filme salvo.</span>}
            <ul>
                {filmes.map((item) => {
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;