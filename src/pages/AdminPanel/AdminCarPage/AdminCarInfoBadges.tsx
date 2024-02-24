import { FcAutomotive, FcWorkflow, FcMultipleSmartphones } from "react-icons/fc";
import { Badge, Button, Container } from 'react-bootstrap';

const AdminCarInfoBadges: React.FC<{ allCars: number; allModels: number; allColors: number; }> = ({ allCars, allModels, allColors }) => {
	return (
	  <div>
		<Badge className='custom-badge mb-2 mt-5 mx-2' bg="danger">{allCars}<FcAutomotive size={'2em'} />
		  <div>Arabalar</div>
		</Badge>
		<Badge className='custom-badge mx-2' bg="warning">{allModels}<FcWorkflow size={'2em'} />
		  <div>Modeller</div>
		</Badge>
		<Badge className='custom-badge mx-2' bg="primary">{allColors}<FcMultipleSmartphones size={'2em'} />
		  <div>Renkler</div>
		</Badge>
	  </div>
	);
  };

export default AdminCarInfoBadges;