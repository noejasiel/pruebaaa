import { HoverEffect } from "../components/ui/card-hover-efect";
import { CardStack } from "../components/ui/card-stack";

const projects = [
    {
      title: "Stripe",
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "https://stripe.com",
    },
    {
      title: "Netflix",
      description:
        "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
      link: "https://netflix.com",
    },
    {
      title: "Google",
      description:
        "A multinational technology company that specializes in Internet-related services and products.",
      link: "https://google.com",
    },
    {
      title: "Meta",
      description:
        "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
      link: "https://meta.com",
    },
    {
      title: "Amazon",
      description:
        "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
      link: "https://amazon.com",
    },
    {
      title: "Microsoft",
      description:
        "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
      link: "https://microsoft.com",
    },
  ];

  interface DataItem {
    userId: number;
    id: number;
    title: string;
    body: string;
}


const Dashboard: React.FC = async () => {
    const groupByUserId = (data: DataItem[]): DataItem[][] => {
        // Crear un objeto para agrupar los datos
        const grouped: Record<number, DataItem[]> = data.reduce((acc, item) => {
            // Verificar si el userId ya existe en el acumulador
            if (!acc[item.userId]) {
                // Si no existe, inicializar con un array vacío
                acc[item.userId] = [];
            }
            // Añadir el objeto al array correspondiente
            acc[item.userId].push(item);
            return acc;
        }, {} as Record<number, DataItem[]>);
    
        // Convertir el objeto agrupado en un array de arrays
        return Object.values(grouped);
    };
    const dashboard = await fetch("https://jsonplaceholder.typicode.com/posts");
    const  data: DataItem[] = await dashboard.json();
    const newData = groupByUserId(data);
    
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <p className="text-lg">Welcome to your dashboard page</p>
            <p className="text-lg">you can see all post</p>

            <div className="flex flex-col items-center justify-center mt-4">
                {/* {data.map((post: any) => (
                    <div key={post.id} className="flex flex-col items-center justify-center mt-4">
                        <h2 className="text-2xl font-bold">{post.title}</h2>
                        <p className="text-lg">{post.body}</p>
                    </div>
                ))} */}
                <HoverEffect items={newData}      /> 
                         {/* <CardStack items={newData} /> */}
            </div>

        </div>
    );
};

export default Dashboard;