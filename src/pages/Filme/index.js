import { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import api from '../../services/api';
import './filme.css';
import { toast } from "react-toastify";


//api_key=f3cfddbd740c74cb1f5dff19175b8b92

function Filme() {

    const { id } = useParams();
    const navigation = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme() {
            await api.get(`movie/${id}`, {
                params:{
                    api_key:"f3cfddbd740c74cb1f5dff19175b8b92",
                    language: "pt-BR",
                }
            })
            .then((response) => {
               setFilme(response.data)
               setLoading(false)
            })
            .catch(()=> {
                console.log("filme não encontrado")
                navigation("/", { replace: true})
                return;
            })
        }

        loadFilme();

        return () => {
            console.log("componente foi desmontado")
        }

    }, [navigation, id])

    function salvarFilme() {
        const minhaLista = localStorage.getItem("@primeflix");
        
        let filmesSalvos = JSON.parse(minhaLista) || [];
        
        // Verifica se o filme já está salvo
        const temFilme = filmesSalvos.some( (filmeSalvo) => filmeSalvo.id === filme.id)
        if(temFilme) {
            toast.warn("Esse filme já está salvo na sua lista.")
            return;
        }

        //Se não estiver salvo, ele salva.
        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
        toast.success("Filme salvo com sucesso!")

    }

    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando detalhes..</h1>
            </div>
        )
    }

    return (
        <div className="filme-info">
            <img src={`https:image.tmdb.org/t/p/original${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10 </strong>
            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results/?search_query=${filme.title} Trailer`}>Trailer</a>
                </button>
            </div>
        </div>
    )
}

export default Filme;