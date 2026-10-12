import { useParams } from "react-router-dom";
import NewComponentsMain from "../features/newComponents/components/NewComponentsMain";

function NewComponentsPage() {
  const params = useParams();
  console.log(params);

  return <NewComponentsMain />;
}

export default NewComponentsPage;
