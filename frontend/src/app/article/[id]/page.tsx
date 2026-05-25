"use client";
import{useEffect,useState}from"react";
import{useParams}from"next/navigation";
import api from "@/services/api";
const ArticlePage=()=>{
    const params = useParams();
    const [article,setArticle] = useState<any>(null);
    useEffect(()=>{
        const fetchArticle=async()=>{
            try{
                const response=await api.get(`/articles/${params.id}`);
                setArticle(response.data);
            }
            catch(error){
                console.error(error);
            }
        };
        fetchArticle();
    },[params.id]);

    if(!article){
        return(<div className="p-10 text-center">Loadingarticle...</div>);
    }
    return(<div className="max-w-4xl mx-auto p-6">
        {article.imageUrl && (<img src={article.imageUrl} alt={article.title} className="w-full rounded-xl mb-6"/>)}
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <div className="text-gray-500 mb-6">{article.source}</div>
        <p className="text-lg leading-8">{article.content}</p></div>);
};
export default ArticlePage;