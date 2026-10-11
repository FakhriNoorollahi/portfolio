import { useParams } from "react-router-dom";
import NewComponentsMain from "../features/newComponents/components/NewComponentsMain";

function NewComponentsPage() {
  const { id } = useParams();
  console.log(id);

  return <NewComponentsMain />;
}

export default NewComponentsPage;
